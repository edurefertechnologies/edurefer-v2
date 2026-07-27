"use server";

import { revalidatePath } from "next/cache";
import {
  TransactionType,
  WalletTransactionSource,
  WithdrawalStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

const MIN_WITHDRAWAL = 600;

type WithdrawalInput =
  | {
      payoutMode: "UPI";
      amount: number;
      upiId: string;
    }
  | {
      payoutMode: "BANK";
      amount: number;
      accountName: string;
      accountNumber: string;
      ifscCode: string;
      bankName: string;
    };

export async function requestWithdrawal(
  input: WithdrawalInput
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message: "Unauthorized.",
      };
    }

    const amount = Number(input.amount);

    if (
      !Number.isFinite(amount) ||
      amount < MIN_WITHDRAWAL
    ) {
      return {
        success: false as const,
        message:
          "Minimum withdrawal amount is ₹600.",
      };
    }

    // Keep monetary values to max 2 decimal places.
    if (
      Math.round(amount * 100) !==
      amount * 100
    ) {
      return {
        success: false as const,
        message:
          "Amount can contain maximum 2 decimal places.",
      };
    }

    if (input.payoutMode === "UPI") {
      const upiId = input.upiId
        .trim()
        .toLowerCase();

      const upiPattern =
        /^[a-z0-9.\-_]{2,256}@[a-z]{2,64}$/i;

      if (!upiPattern.test(upiId)) {
        return {
          success: false as const,
          message:
            "Please enter a valid UPI ID.",
        };
      }
    }

    if (input.payoutMode === "BANK") {
      const accountName =
        input.accountName.trim();

      const accountNumber =
        input.accountNumber
          .replace(/\s/g, "")
          .trim();

      const ifscCode = input.ifscCode
        .replace(/\s/g, "")
        .toUpperCase();

      const bankName =
        input.bankName.trim();

      if (
        !accountName ||
        !accountNumber ||
        !ifscCode ||
        !bankName
      ) {
        return {
          success: false as const,
          message:
            "Please enter all bank details.",
        };
      }

      if (
        !/^\d{6,18}$/.test(
          accountNumber
        )
      ) {
        return {
          success: false as const,
          message:
            "Please enter a valid account number.",
        };
      }

      if (
        !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
          ifscCode
        )
      ) {
        return {
          success: false as const,
          message:
            "Please enter a valid IFSC code.",
        };
      }
    }

    const result =
      await prisma.$transaction(
        async (tx) => {
          const wallet =
            await tx.wallet.findUnique({
              where: {
                userId:
                  session.user.id,
              },

              select: {
                id: true,
                balance: true,
              },
            });

          if (!wallet) {
            throw new Error(
              "WALLET_NOT_FOUND"
            );
          }

          /*
           * Atomic balance reservation.
           *
           * updateMany ensures the balance
           * cannot fall below the requested
           * withdrawal amount even if two
           * requests arrive together.
           */
          const balanceUpdate =
            await tx.wallet.updateMany({
              where: {
                id: wallet.id,

                balance: {
                  gte: amount,
                },
              },

              data: {
                balance: {
                  decrement: amount,
                },
              },
            });

          if (
            balanceUpdate.count !== 1
          ) {
            throw new Error(
              "INSUFFICIENT_BALANCE"
            );
          }

          const withdrawal =
            await tx.withdrawal.create({
              data: {
                walletId: wallet.id,
                amount,

                status:
                  WithdrawalStatus.PENDING,

                payoutMode:
                  input.payoutMode,

                ...(input.payoutMode ===
                "UPI"
                  ? {
                      upiId:
                        input.upiId
                          .trim()
                          .toLowerCase(),
                    }
                  : {
                      accountName:
                        input.accountName.trim(),

                      accountNumber:
                        input.accountNumber
                          .replace(
                            /\s/g,
                            ""
                          )
                          .trim(),

                      ifscCode:
                        input.ifscCode
                          .replace(
                            /\s/g,
                            ""
                          )
                          .toUpperCase(),

                      bankName:
                        input.bankName.trim(),
                    }),
              },
            });

          await tx.walletTransaction.create({
            data: {
              walletId: wallet.id,
              amount,

              type:
                TransactionType.DEBIT,

              source:
                WalletTransactionSource.WITHDRAWAL,

              description: `Withdrawal request ${withdrawal.id}`,
            },
          });

          return withdrawal;
        },
        {
          timeout: 15000,
        }
      );

    revalidatePath("/wallet");
    revalidatePath("/dashboard");

    return {
      success: true as const,
      message:
        "Withdrawal request submitted successfully.",
      withdrawalId: result.id,
    };
  } catch (error) {
    console.error(
      "REQUEST_WITHDRAWAL_ERROR:",
      error
    );

    if (
      error instanceof Error &&
      error.message ===
        "INSUFFICIENT_BALANCE"
    ) {
      return {
        success: false as const,
        message:
          "Insufficient wallet balance.",
      };
    }

    if (
      error instanceof Error &&
      error.message ===
        "WALLET_NOT_FOUND"
    ) {
      return {
        success: false as const,
        message:
          "Wallet could not be found.",
      };
    }

    return {
      success: false as const,
      message:
        "Unable to submit withdrawal request.",
    };
  }
}