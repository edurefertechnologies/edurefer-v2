"use server";

import { revalidatePath } from "next/cache";
import {
  TransactionType,
  WalletTransactionSource,
  WithdrawalStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function rejectWithdrawal(
  withdrawalId: string,
  remarks?: string
) {
  try {
    const session = await getSession();

    if (
      !session?.user?.id ||
      session.user.role !== "ADMIN"
    ) {
      return {
        success: false as const,
        message: "Unauthorized.",
      };
    }

    await prisma.$transaction(
      async (tx) => {
        const withdrawal =
          await tx.withdrawal.findUnique({
            where: {
              id: withdrawalId,
            },

            select: {
              id: true,
              walletId: true,
              amount: true,
              status: true,
            },
          });

        if (!withdrawal) {
          throw new Error(
            "WITHDRAWAL_NOT_FOUND"
          );
        }

        if (
          withdrawal.status !==
            WithdrawalStatus.PENDING &&
          withdrawal.status !==
            WithdrawalStatus.APPROVED
        ) {
          throw new Error(
            "INVALID_STATUS"
          );
        }

        // Conditional update protects
        // against duplicate processing.
        const updated =
          await tx.withdrawal.updateMany({
            where: {
              id: withdrawal.id,
              status:
                withdrawal.status,
            },

            data: {
              status:
                WithdrawalStatus.REJECTED,

              remarks:
                remarks?.trim() ||
                "Withdrawal rejected.",

              processedAt:
                new Date(),
            },
          });

        if (updated.count !== 1) {
          throw new Error(
            "ALREADY_PROCESSED"
          );
        }

        // Return reserved money.
        await tx.wallet.update({
          where: {
            id: withdrawal.walletId,
          },

          data: {
            balance: {
              increment:
                withdrawal.amount,
            },
          },
        });

        await tx.walletTransaction.create({
          data: {
            walletId:
              withdrawal.walletId,

            amount:
              withdrawal.amount,

            type:
              TransactionType.CREDIT,

            source:
              WalletTransactionSource.REFUND,

            description:
              `Refund for rejected withdrawal ${withdrawal.id}`,
          },
        });
      },
      {
        timeout: 15000,
      }
    );

    revalidatePath(
      "/admin/withdrawals"
    );
    revalidatePath("/wallet");

    return {
      success: true as const,
      message:
        "Withdrawal rejected and balance refunded.",
    };
  } catch (error) {
    console.error(
      "REJECT_WITHDRAWAL_ERROR:",
      error
    );

    if (
      error instanceof Error &&
      [
        "INVALID_STATUS",
        "ALREADY_PROCESSED",
      ].includes(error.message)
    ) {
      return {
        success: false as const,
        message:
          "This withdrawal has already been processed.",
      };
    }

    if (
      error instanceof Error &&
      error.message ===
        "WITHDRAWAL_NOT_FOUND"
    ) {
      return {
        success: false as const,
        message:
          "Withdrawal not found.",
      };
    }

    return {
      success: false as const,
      message:
        "Unable to reject withdrawal.",
    };
  }
}