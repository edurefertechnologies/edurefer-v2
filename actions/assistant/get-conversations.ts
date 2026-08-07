"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getConversations() {

  const session = await getSession();

  if (!session) {
    return [];
  }

  return prisma.aIConversation.findMany({

    where: {
      userId: session.user.id,
    },

    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },

  });

}