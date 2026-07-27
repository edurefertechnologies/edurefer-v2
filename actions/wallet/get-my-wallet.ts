"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getMyWallet() {
  const session = await getSession();

  if (!session?.user?.id) {
    return null;
  }

  // Wallet may not exist for older users,
  // so create it safely when first opened.
  const wallet = await prisma.wallet.upsert({
    where: {
      userId: session.user.id,
    },

    create: {
      userId: session.user.id,
    },

    update: {},

    select: {
      id: true,
      balance: true,
      createdAt: true,
      updatedAt: true,

      transactions: {
        select: {
          id: true,
          amount: true,
          type: true,
          source: true,
          description: true,
          createdAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },

      withdrawals: {
        select: {
          id: true,
          amount: true,
          status: true,
          payoutMode: true,
          upiId: true,
          bankName: true,
          accountName: true,
          accountNumber: true,
          ifscCode: true,
          transactionId: true,
          remarks: true,
          processedAt: true,
          createdAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

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
          id: true,
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

  const totalReferralEarnings =
    wallet.transactions
      .filter(
        (transaction) =>
          transaction.type === "CREDIT" &&
          transaction.source === "REFERRAL"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );

  const totalWithdrawn =
    wallet.withdrawals
      .filter(
        (withdrawal) =>
          withdrawal.status === "PAID"
      )
      .reduce(
        (total, withdrawal) =>
          total + Number(withdrawal.amount),
        0
      );

  const pendingWithdrawalAmount =
    wallet.withdrawals
      .filter(
        (withdrawal) =>
          withdrawal.status === "PENDING" ||
          withdrawal.status === "APPROVED"
      )
      .reduce(
        (total, withdrawal) =>
          total + Number(withdrawal.amount),
        0
      );

  return {
    wallet: {
      ...wallet,
      balance: Number(wallet.balance),

      transactions:
        wallet.transactions.map(
          (transaction) => ({
            ...transaction,
            amount: Number(
              transaction.amount
            ),
          })
        ),

      withdrawals:
        wallet.withdrawals.map(
          (withdrawal) => ({
            ...withdrawal,
            amount: Number(
              withdrawal.amount
            ),
          })
        ),
    },

    referrals,

    stats: {
      totalReferralEarnings,
      totalWithdrawn,
      pendingWithdrawalAmount,
      totalReferrals: referrals.length,

      rewardedReferrals:
        referrals.filter(
          (referral) =>
            referral.isRewarded
        ).length,
    },
  };
}