"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getDashboard() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const [
    enrollments,
    wallet,
    aiWallet,
    referrals,
    certificates,
    orders,
  ] = await Promise.all([
    prisma.enrollment.findMany({
      where: {
        userId,
      },

      select: {
        id: true,
        progress: true,
        status: true,

        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
          },
        },
      },
    }),

    prisma.wallet.findUnique({
      where: {
        userId,
      },

      include: {
        transactions: true,
        withdrawals: true,
      },
    }),

    prisma.aIWallet.findUnique({
      where: {
        userId,
      },
    }),

    prisma.referral.findMany({
      where: {
        referrerId: userId,
      },

      include: {
        referee: true,
      },
    }),

    prisma.certificate.findMany({
      where: {
        enrollment: {
          userId,
        },
      },

      include: {
        enrollment: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },

      orderBy: {
        issuedAt: "desc",
      },

      take: 5,
    }),

    prisma.order.findMany({
      where: {
        userId,
      },

      include: {
        items: {
          include: {
            product: true,
            package: true,
          },
        },

        payment: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    }),
  ]);
  const activeCourses = enrollments.filter(
    (course) => course.status === "ACTIVE"
  ).length;

  const completedCourses = enrollments.filter(
    (course) => course.status === "COMPLETED"
  ).length;

  const walletBalance = Number(
    wallet?.balance ?? 0
  );

  const aiCredits =
    aiWallet?.balance ?? 0;

  const successfulReferrals =
    referrals.filter(
      (referral) => referral.isRewarded
    ).length;

  const pendingReferrals =
    referrals.length -
    successfulReferrals;

  const totalOrders = orders.length;

  const totalCertificates =
    certificates.length;

  const latestCourse =
    enrollments.find(
      (course) =>
        course.status === "ACTIVE"
    ) ?? null;

  const latestOrder =
    orders[0] ?? null;

  const latestCertificate =
    certificates[0] ?? null;

  const recentOrders = orders.map(
    (order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      total: Number(order.total),
      createdAt: order.createdAt,
      items: order.items,
    })
  );

  const recentCertificates =
    certificates.map(
      (certificate) => ({
        id: certificate.id,
        certificateNo:
          certificate.certificateNo,
        issuedAt:
          certificate.issuedAt,
        pdfUrl: certificate.pdfUrl,

        course:
          certificate.enrollment
            .course,
      })
    );
  const activePackage = await prisma.orderItem.findFirst({
    where: {
      order: {
        userId,
        status: "PAID",
      },
      packageId: {
        not: null,
      },
    },

    include: {
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

    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    stats: {
      walletBalance,
      aiCredits,

      totalCourses: enrollments.length,
      activeCourses,
      completedCourses,

      successfulReferrals,
      pendingReferrals,

      totalOrders,
      totalCertificates,
    },

    latestCourse,

    latestOrder,

    latestCertificate,

    recentOrders,

    recentCertificates,

    activePackage: activePackage?.package ?? null,

    wallet: wallet
      ? {
        id: wallet.id,
        balance: Number(wallet.balance),
        updatedAt: wallet.updatedAt,
      }
      : null,

    aiWallet: aiWallet
      ? {
        id: aiWallet.id,
        balance: aiWallet.balance,
        updatedAt: aiWallet.updatedAt,
      }
      : null,

    referrals: {
      total: referrals.length,

      successful:
        successfulReferrals,

      pending:
        pendingReferrals,

      canWithdraw:
        successfulReferrals >= 2,
    },

    user: {
      id: session.user.id,

      firstName:
        session.user.firstName,

      email:
        session.user.email,
    },
  };
}