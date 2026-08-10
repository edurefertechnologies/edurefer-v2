"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getProfile() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      profile: true,
      wallet: true,
      aiWallet: true,

      enrollments: {
        include: {
          certificate: true,
          course: true,
        },
      },

      notifications: {
        where: {
          isRead: false,
        },
      },

      orders: true,

      referralsMade: true,
    },
  });

  if (!profile) {
    throw new Error("User not found");
  }

  return profile;
}