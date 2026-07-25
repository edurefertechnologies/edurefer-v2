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

  const course = payment.order.items[0]?.product?.course;

  if (!course) {
    throw new Error("Course not found.");
  }

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