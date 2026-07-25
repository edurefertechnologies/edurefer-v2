"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function markAllNotificationsRead() {
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      success: false as const,
    };
  }

  await prisma.notification.updateMany({
    where: {
      userId: session.user.id,
      isRead: false,
    },

    data: {
      isRead: true,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/notifications");

  return {
    success: true as const,
  };
}