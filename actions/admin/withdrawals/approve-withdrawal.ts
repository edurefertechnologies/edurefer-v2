"use server";

import { revalidatePath } from "next/cache";
import { WithdrawalStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function approveWithdrawal(
  withdrawalId: string
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

    const result =
      await prisma.withdrawal.updateMany({
        where: {
          id: withdrawalId,
          status:
            WithdrawalStatus.PENDING,
        },

        data: {
          status:
            WithdrawalStatus.APPROVED,
        },
      });

    if (result.count !== 1) {
      return {
        success: false as const,
        message:
          "Withdrawal is no longer pending.",
      };
    }

    revalidatePath(
      "/admin/withdrawals"
    );

    return {
      success: true as const,
      message:
        "Withdrawal approved successfully.",
    };
  } catch (error) {
    console.error(
      "APPROVE_WITHDRAWAL_ERROR:",
      error
    );

    return {
      success: false as const,
      message:
        "Unable to approve withdrawal.",
    };
  }
}