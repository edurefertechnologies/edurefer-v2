import { prisma } from "@/lib/prisma";

export async function getDashboardStats(userId: string) {
  const [
    wallet,
    aiWallet,
    totalCourses,
    activeCourses,
    completedCourses,
    totalOrders,
    successfulReferrals,
    pendingReferrals,
    certificates,
  ] = await Promise.all([
    prisma.wallet.findUnique({
      where: {
        userId,
      },

      select: {
        balance: true,
      },
    }),

    prisma.aIWallet.findUnique({
      where: {
        userId,
      },

      select: {
        balance: true,
      },
    }),

    prisma.enrollment.count({
      where: {
        userId,
      },
    }),

    prisma.enrollment.count({
      where: {
        userId,
        status: "ACTIVE",
      },
    }),

    prisma.enrollment.count({
      where: {
        userId,
        status: "COMPLETED",
      },
    }),

    prisma.order.count({
      where: {
        userId,
        status: "PAID",
      },
    }),

    prisma.referral.count({
      where: {
        referrerId: userId,
        isRewarded: true,
      },
    }),

    prisma.referral.count({
      where: {
        referrerId: userId,
        isRewarded: false,
      },
    }),

    prisma.certificate.count({
      where: {
        enrollment: {
          userId,
        },
      },
    }),
  ]);
  return {
    walletBalance: wallet
      ? Number(wallet.balance)
      : 0,

    aiCredits: aiWallet?.balance ?? 0,

    totalCourses,

    activeCourses,

    completedCourses,

    totalOrders,

    successfulReferrals,

    pendingReferrals,

    totalCertificates: certificates,
  };
}