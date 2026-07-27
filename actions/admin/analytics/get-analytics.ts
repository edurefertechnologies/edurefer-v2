"use server";

import {
  OrderStatus,
  PaymentStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getAnalytics() {
  const session = await getSession();

  if (
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ) {
    return null;
  }

  const [
    totalUsers,
    totalEnrollments,
    completedEnrollments,
    paidOrders,
    successfulPayments,
    withdrawals,
    referrals,
    courses,
  ] = await Promise.all([
    // Users
    prisma.user.count({
      where: {
        isDeleted: false,
      },
    }),

    // Enrollments
    prisma.enrollment.count(),

    // Completed courses
    prisma.enrollment.count({
      where: {
        status: "COMPLETED",
      },
    }),

    // Paid orders
    prisma.order.findMany({
      where: {
        status: OrderStatus.PAID,
      },

      select: {
        id: true,
        total: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    }),

    // Successful payments
    prisma.payment.findMany({
      where: {
        status: PaymentStatus.SUCCESS,
      },

      select: {
        id: true,
        amount: true,
        paidAt: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    }),

    // Withdrawals
    prisma.withdrawal.findMany({
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
        processedAt: true,
      },
    }),

    // Referrals
    prisma.referral.findMany({
      select: {
        id: true,
        isRewarded: true,
        rewardedAt: true,
      },
    }),

    // Course performance
    prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,

        enrollments: {
          select: {
            status: true,
          },
        },

        reviews: {
          select: {
            rating: true,
          },
        },

        product: {
          select: {
            price: true,
            discountPrice: true,
          },
        },
      },
    }),
  ]);

  /*
   * Revenue
   *
   * Payment records are the financial
   * source of truth for received money.
   */
  const totalRevenue =
    successfulPayments.reduce(
      (total, payment) =>
        total + Number(payment.amount),
      0
    );

  const totalPaidOrders =
    paidOrders.length;

  const averageOrderValue =
    totalPaidOrders > 0
      ? totalRevenue / totalPaidOrders
      : 0;

  // Withdrawals
  const paidWithdrawals =
    withdrawals.filter(
      (withdrawal) =>
        withdrawal.status === "PAID"
    );

  const pendingWithdrawals =
    withdrawals.filter(
      (withdrawal) =>
        withdrawal.status === "PENDING" ||
        withdrawal.status === "APPROVED"
    );

  const totalWithdrawn =
    paidWithdrawals.reduce(
      (total, withdrawal) =>
        total + Number(withdrawal.amount),
      0
    );

  const pendingWithdrawalAmount =
    pendingWithdrawals.reduce(
      (total, withdrawal) =>
        total + Number(withdrawal.amount),
      0
    );

  // Referral stats
  const rewardedReferrals =
    referrals.filter(
      (referral) =>
        referral.isRewarded
    );

  /*
   * Don't calculate referral payout as
   * rewardedReferrals.length * 300 here.
   *
   * Wallet transactions are a better
   * financial source because the reward
   * amount may change in future.
   */
  const referralTransactions =
    await prisma.walletTransaction.findMany({
      where: {
        type: "CREDIT",
        source: "REFERRAL",
      },

      select: {
        amount: true,
      },
    });

  const totalReferralRewards =
    referralTransactions.reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  // Course analytics
  const coursePerformance =
    courses
      .map((course) => {
        const enrollmentCount =
          course.enrollments.length;

        const completedCount =
          course.enrollments.filter(
            (enrollment) =>
              enrollment.status ===
              "COMPLETED"
          ).length;

        const completionRate =
          enrollmentCount > 0
            ? (completedCount /
                enrollmentCount) *
              100
            : 0;

        const reviewCount =
          course.reviews.length;

        const averageRating =
          reviewCount > 0
            ? course.reviews.reduce(
                (total, review) =>
                  total +
                  review.rating,
                0
              ) / reviewCount
            : 0;

        return {
          id: course.id,
          title: course.title,
          slug: course.slug,

          enrollments:
            enrollmentCount,

          completions:
            completedCount,

          completionRate,

          reviewCount,
          averageRating,

          price: Number(
            course.product
              .discountPrice ??
              course.product.price
          ),
        };
      })
      .sort(
        (a, b) =>
          b.enrollments -
          a.enrollments
      );

  // Monthly revenue
  const monthlyRevenueMap =
    new Map<
      string,
      {
        month: string;
        revenue: number;
        payments: number;
      }
    >();

  for (const payment of successfulPayments) {
    const date =
      payment.paidAt ??
      payment.createdAt;

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const label =
      date.toLocaleDateString(
        "en-IN",
        {
          month: "short",
          year: "numeric",
        }
      );

    const current =
      monthlyRevenueMap.get(key) ?? {
        month: label,
        revenue: 0,
        payments: 0,
      };

    current.revenue += Number(
      payment.amount
    );

    current.payments += 1;

    monthlyRevenueMap.set(
      key,
      current
    );
  }

  const monthlyRevenue =
    Array.from(
      monthlyRevenueMap.entries()
    )
      .sort(([a], [b]) =>
        a.localeCompare(b)
      )
      .map(([, value]) => value);

  return {
    overview: {
      totalRevenue,
      totalPaidOrders,
      averageOrderValue,

      totalUsers,
      totalEnrollments,
      completedEnrollments,

      totalReferrals:
        referrals.length,

      rewardedReferrals:
        rewardedReferrals.length,

      totalReferralRewards,

      totalWithdrawn,
      pendingWithdrawalAmount,
    },

    monthlyRevenue,
    coursePerformance,

    withdrawals: {
      total: withdrawals.length,
      pending:
        pendingWithdrawals.length,
      paid: paidWithdrawals.length,

      rejected:
        withdrawals.filter(
          (withdrawal) =>
            withdrawal.status ===
            "REJECTED"
        ).length,
    },
  };
}