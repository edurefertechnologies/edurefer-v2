"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getNotifications(
  limit = 10
) {
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      notifications: [],
      unreadCount: 0,
    };
  }

  const safeLimit = Math.min(
    Math.max(limit, 1),
    50
  );

  const [notifications, unreadCount] =
    await Promise.all([
      prisma.notification.findMany({
        where: {
          userId: session.user.id,
        },

        orderBy: {
          createdAt: "desc",
        },

        take: safeLimit,

        select: {
          id: true,
          title: true,
          message: true,
          type: true,
          isRead: true,
          actionUrl: true,
          createdAt: true,
        },
      }),

      prisma.notification.count({
        where: {
          userId: session.user.id,
          isRead: false,
        },
      }),
    ]);

  return {
    notifications,
    unreadCount,
  };
}