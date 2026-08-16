"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getSettings() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      email: true,
      phone: true,
      emailVerified: true,

      settings: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const settings = user.settings;

  return {
    email: user.email,
    phone: user.phone ?? "",
    emailVerified: user.emailVerified,

    courseNotifications:
      settings?.courseNotifications ?? true,

    referralNotifications:
      settings?.referralNotifications ?? true,

    orderNotifications:
      settings?.orderNotifications ?? true,

    systemNotifications:
      settings?.systemNotifications ?? true,

    theme: settings?.theme ?? "system",
    language: settings?.language ?? "en",
  };
}