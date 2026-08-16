"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export interface UpdateSettingsInput {
  courseNotifications: boolean;
  referralNotifications: boolean;
  orderNotifications: boolean;
  systemNotifications: boolean;

  theme: "system" | "light" | "dark";

  language: "en" | "hi" | "mr";
}

export async function updateSettings(
  values: UpdateSettingsInput
) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.userSettings.upsert({
    where: {
      userId: session.user.id,
    },

    update: {
      courseNotifications:
        values.courseNotifications,

      referralNotifications:
        values.referralNotifications,

      orderNotifications:
        values.orderNotifications,

      systemNotifications:
        values.systemNotifications,

      theme: values.theme,
      language: values.language,
    },

    create: {
      userId: session.user.id,

      courseNotifications:
        values.courseNotifications,

      referralNotifications:
        values.referralNotifications,

      orderNotifications:
        values.orderNotifications,

      systemNotifications:
        values.systemNotifications,

      theme: values.theme,
      language: values.language,
    },
  });

  revalidatePath("/settings");

  return {
    success: true,
  };
}