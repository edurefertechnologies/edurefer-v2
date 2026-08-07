"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function sendMessage(
  conversationId: string,
  message: string
) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  // Save User Message

  await prisma.aIMessage.create({
    data: {
      conversationId,
      role: "USER",
      content: message,
    },
  });

  // Temporary Reply

  const reply =
    "Hello 👋 I'm Edurefer Assistant. AI integration is coming soon.";

  await prisma.aIMessage.create({
    data: {
      conversationId,
      role: "ASSISTANT",
      content: reply,
    },
  });

  const blocked = [
    "weather",
    "ipl",
    "cricket",
    "movie",
    "girlfriend",
    "boyfriend",
    "politics",
  ];

  if (
    blocked.some((word) =>
      message.toLowerCase().includes(word)
    )
  ) {
    return {
      reply:
        "I'm Edurefer Assistant. I can help only with Edurefer courses, wallet, certificates, referrals, orders and career services.",
    };
  }

  return {
    reply,
  };
}