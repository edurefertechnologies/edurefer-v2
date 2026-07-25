"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function markNotificationRead(
  notificationId: string
) {
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      success: false as const,
    };
  }

  const result =
    await prisma.notification.updateMany({
      where: {
        id: notificationId,

        // Security:
        // user can only update their own notification.
        userId: session.user.id,
      },

      data: {
        isRead: true,
      },
    });

  revalidatePath("/dashboard");
  revalidatePath("/notifications");

  return {
    success: result.count > 0,
  };
}