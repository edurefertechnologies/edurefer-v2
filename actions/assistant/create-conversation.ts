"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function createConversation() {

  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return prisma.aIConversation.create({
    data: {
      userId: session.user.id,
      service: "EDUREFER_ASSISTANT",
      title: "New Conversation",
    },
  });

}