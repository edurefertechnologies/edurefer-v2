"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getWithdrawals() {
  const session = await getSession();

  if (
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ) {
    return [];
  }

  const withdrawals =
    await prisma.withdrawal.findMany({
      select: {
        id: true,
        amount: true,
        status: true,

        payoutMode: true,
        upiId: true,

        accountName: true,
        accountNumber: true,
        ifscCode: true,
        bankName: true,

        remarks: true,
        transactionId: true,
        processedAt: true,
        createdAt: true,
        updatedAt: true,

        wallet: {
          select: {
            id: true,
            balance: true,

            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return withdrawals.map(
    (withdrawal) => ({
      ...withdrawal,
      amount: Number(
        withdrawal.amount
      ),

      wallet: {
        ...withdrawal.wallet,
        balance: Number(
          withdrawal.wallet.balance
        ),
      },
    })
  );
}