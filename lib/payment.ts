import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentStatus, NotificationType } from "@prisma/client";
import { REFERRAL } from "@/lib/constants";

import { createNotificationTx } from "@/lib/notifications";

interface CompletePaymentParams {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export async function completePayment({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: CompletePaymentParams) {
  const payment = await prisma.payment.findUnique({
    where: {
      razorpayOrderId,
    },
    include: {
      order: {
        include: {
          items: {
            include: {
              product: {
                include: {
                  course: true,
                },
              },
              package: {
                include: {
                  items: {
                    include: {
                      product: {
                        include: {
                          course: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  // Idempotency
  if (payment.status === PaymentStatus.SUCCESS) {
    return payment;
  }

  const orderItem = payment.order.items[0];

  if (!orderItem) {
    throw new Error("Order item not found.");
  }

  const product = orderItem.product;
  const course = product?.course;
  const packageData = orderItem.package;

  return prisma.$transaction(async (tx) => {
    const updatedPayment = await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.SUCCESS,
        razorpayPaymentId,
        razorpaySignature,
        paidAt: new Date(),
      },
    });

    await tx.order.update({
      where: {
        id: payment.order.id,
      },
      data: {
        status: OrderStatus.PAID,
      },
    });

    if (course) {
      const existingEnrollment =
        await tx.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId: payment.order.userId,
              courseId: course.id,
            },
          },
        });

      if (!existingEnrollment) {
        await tx.enrollment.create({
          data: {
            userId: payment.order.userId,
            courseId: course.id,
            orderId: payment.order.id,
          },
        });

        await createNotificationTx(tx, {
          userId: payment.order.userId,
          title: "Course Enrollment Successful",
          message: `You have successfully enrolled in ${course.title}.`,
          type: NotificationType.SUCCESS,
          actionUrl: `/learn/${course.slug}`,
        });
      }
    }

    if (
      product?.type === "AI_CREDITS" &&
      product.credits &&
      product.credits > 0
    ) {
      const wallet = await tx.aIWallet.upsert({
        where: {
          userId: payment.order.userId,
        },

        create: {
          userId: payment.order.userId,
          balance: product.credits,
        },

        update: {
          balance: {
            increment: product.credits,
          },
        },
      });

      await tx.aITransaction.create({
        data: {
          walletId: wallet.id,
          type: "CREDIT",
          credits: product.credits,
          reason: "PRODUCT_PURCHASE",
          description: `AI credits purchased with order ${payment.order.orderNumber}`,
        },
      });

      await createNotificationTx(tx, {
        userId: payment.order.userId,
        title: "AI Credits Added",
        message: `${product.credits} AI credits have been added to your AI wallet.`,
        type: NotificationType.SUCCESS,
        actionUrl: "/ai",
      });
    }

    if (packageData) {
      for (const packageItem of packageData.items) {
        const packageProduct =
          packageItem.product;

        // AI Credits included in package
        if (
          packageProduct.type === "AI_CREDITS" &&
          packageProduct.credits &&
          packageProduct.credits > 0
        ) {
          const totalCredits =
            packageProduct.credits *
            packageItem.quantity;

          const wallet =
            await tx.aIWallet.upsert({
              where: {
                userId:
                  payment.order.userId,
              },

              create: {
                userId:
                  payment.order.userId,
                balance: totalCredits,
              },

              update: {
                balance: {
                  increment: totalCredits,
                },
              },
            });

          await tx.aITransaction.create({
            data: {
              walletId: wallet.id,
              type: "CREDIT",
              credits: totalCredits,
              reason: "PRODUCT_PURCHASE",
              description:
                `AI credits included in package ${packageData.name} - order ${payment.order.orderNumber}`,
            },
          });
        }

        // Course included in package
        if (packageProduct.course) {
          const existingEnrollment =
            await tx.enrollment.findUnique({
              where: {
                userId_courseId: {
                  userId:
                    payment.order.userId,
                  courseId:
                    packageProduct.course.id,
                },
              },
            });

          if (!existingEnrollment) {
            await tx.enrollment.create({
              data: {
                userId:
                  payment.order.userId,
                courseId:
                  packageProduct.course.id,
                orderId:
                  payment.order.id,
              },
            });

            await createNotificationTx(
              tx,
              {
                userId:
                  payment.order.userId,

                title:
                  "Course Added From Package",

                message:
                  `${packageProduct.course.title} has been added to your courses.`,

                type:
                  NotificationType.SUCCESS,

                actionUrl:
                  `/learn/${packageProduct.course.slug}`,
              }
            );
          }
        }
      }
    }

    const referral = await tx.referral.findUnique({
      where: {
        refereeId: payment.order.userId,
      },
    });

    if (referral && !referral.isRewarded) {
      const wallet = await tx.wallet.findUnique({
        where: {
          userId: referral.referrerId,
        },
      });

      if (wallet) {
        await tx.wallet.update({
          where: {
            id: wallet.id,
          },

          data: {
            balance: {
              increment: REFERRAL.REWARD,
            },
          },
        });

        await tx.walletTransaction.create({
          data: {
            walletId: wallet.id,
            amount: REFERRAL.REWARD,
            type: "CREDIT",
            source: "REFERRAL",
            description: `Referral bonus for order ${payment.order.orderNumber}`,
          },
        });

        await createNotificationTx(tx, {
          userId: referral.referrerId,
          title: "Referral Reward Credited",
          message: `₹${REFERRAL.REWARD} referral reward has been credited to your wallet.`,
          type: NotificationType.SUCCESS,
          actionUrl: "/wallet",
        });
      }

      await tx.referral.update({
        where: {
          id: referral.id,
        },

        data: {
          isRewarded: true,
          rewardedOrderId:
            payment.order.id,
          rewardedAt: new Date(),
        },
      });
    }

    // IMPORTANT: outside referral condition
    return updatedPayment;
  },
    {
      timeout: 15000, // 15 seconds
    });
}