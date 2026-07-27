"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getWallets() {
  const session = await getSession();

  if (
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ) {
    return [];
  }

  const wallets = await prisma.wallet.findMany({
    select: {
      id: true,
      balance: true,
      createdAt: true,
      updatedAt: true,

      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          referralCode: true,
        },
      },

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
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },
  });

  return wallets.map((wallet) => {
    const transactions =
      wallet.transactions.map(
        (transaction) => ({
          ...transaction,
          amount: Number(
            transaction.amount
          ),
        })
      );

    const withdrawals =
      wallet.withdrawals.map(
        (withdrawal) => ({
          ...withdrawal,
          amount: Number(
            withdrawal.amount
          ),
        })
      );

    const totalCredits =
      transactions
        .filter(
          (transaction) =>
            transaction.type === "CREDIT"
        )
        .reduce(
          (total, transaction) =>
            total + transaction.amount,
          0
        );

    const totalDebits =
      transactions
        .filter(
          (transaction) =>
            transaction.type === "DEBIT"
        )
        .reduce(
          (total, transaction) =>
            total + transaction.amount,
          0
        );

    return {
      ...wallet,

      balance: Number(wallet.balance),

      transactions,
      withdrawals,

      totalCredits,
      totalDebits,

      pendingWithdrawals:
        withdrawals.filter(
          (withdrawal) =>
            withdrawal.status ===
              "PENDING" ||
            withdrawal.status ===
              "APPROVED"
        ).length,
    };
  });
}