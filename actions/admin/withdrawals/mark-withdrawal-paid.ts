"use server";

import { revalidatePath } from "next/cache";
import { WithdrawalStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function markWithdrawalPaid(
  withdrawalId: string,
  transactionId: string
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

    const reference =
      transactionId.trim();

    if (!reference) {
      return {
        success: false as const,
        message:
          "Transaction ID is required.",
      };
    }

    const result =
      await prisma.withdrawal.updateMany({
        where: {
          id: withdrawalId,
          status:
            WithdrawalStatus.APPROVED,
        },

        data: {
          status:
            WithdrawalStatus.PAID,

          transactionId: reference,
          processedAt: new Date(),
        },
      });

    if (result.count !== 1) {
      return {
        success: false as const,
        message:
          "Only approved withdrawals can be marked as paid.",
      };
    }

    revalidatePath(
      "/admin/withdrawals"
    );
    revalidatePath("/wallet");

    return {
      success: true as const,
      message:
        "Withdrawal marked as paid.",
    };
  } catch (error) {
    console.error(
      "MARK_WITHDRAWAL_PAID_ERROR:",
      error
    );

    return {
      success: false as const,
      message:
        "Unable to mark withdrawal as paid.",
    };
  }
}