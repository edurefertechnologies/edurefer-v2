"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getAIWallet() {

  const session = await getSession();

  if (!session) return null;

  return prisma.aIWallet.findUnique({

    where: {
      userId: session.user.id,
    },

    include: {
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },

  });

}