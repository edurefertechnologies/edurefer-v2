"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getReferrals() {
  const session = await getSession();

  if (
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ) {
    return [];
  }

  const referrals =
    await prisma.referral.findMany({
      select: {
        id: true,
        isRewarded: true,
        rewardedAt: true,
        rewardedOrderId: true,
        createdAt: true,

        referrer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            referralCode: true,
          },
        },

        referee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return referrals;
}