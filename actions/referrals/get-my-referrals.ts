"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getMyReferrals() {
  const session = await getSession();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      referralCode: true,
    },
  });

  if (!user) {
    return null;
  }

  const qualifyingOrder =
    await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        status: "PAID",

        items: {
          some: {
            OR: [
              {
                productId: {
                  not: null,
                },
              },
              {
                packageId: {
                  not: null,
                },
              },
            ],
          },
        },
      },

      select: {
        id: true,
      },
    });

  if (!qualifyingOrder) {
    return {
      eligible: false,
      referralCode: user.referralCode,
      referrals: [],
      transactions: [],
      stats: {
        totalReferrals: 0,
        successfulReferrals: 0,
        pendingReferrals: 0,
        totalEarnings: 0,
      },
    };
  }

  const referrals = await prisma.referral.findMany({
    where: {
      referrerId: session.user.id,
    },
    select: {
      id: true,
      isRewarded: true,
      rewardedAt: true,
      rewardedOrderId: true,
      createdAt: true,

      referee: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const transactions =
    await prisma.walletTransaction.findMany({
      where: {
        wallet: {
          userId: session.user.id,
        },
        type: "CREDIT",
        source: "REFERRAL",
      },
      select: {
        id: true,
        amount: true,
        description: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const totalEarnings = transactions.reduce(
    (total, transaction) =>
      total + Number(transaction.amount),
    0
  );

  return {
    eligible: true,
    referralCode: user.referralCode,
    referrals,
    transactions: transactions.map(
      (transaction) => ({
        ...transaction,
        amount: Number(transaction.amount),
      })
    ),
    stats: {
      totalReferrals: referrals.length,
      successfulReferrals:
        referrals.filter(
          (referral) => referral.isRewarded
        ).length,
      pendingReferrals:
        referrals.filter(
          (referral) => !referral.isRewarded
        ).length,
      totalEarnings,
    },
  };
}