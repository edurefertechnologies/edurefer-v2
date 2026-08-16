import {
  NotificationType,
  Prisma,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type NotificationPreference =
  | "course"
  | "referral"
  | "order"
  | "system";

interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  actionUrl?: string;
  preference?: NotificationPreference;
}

async function isNotificationEnabled(
  db:
    | typeof prisma
    | Prisma.TransactionClient,
  userId: string,
  preference?: NotificationPreference
) {
  if (!preference) {
    return true;
  }

  const settings =
    await db.userSettings.findUnique({
      where: {
        userId,
      },
      select: {
        courseNotifications: true,
        referralNotifications: true,
        orderNotifications: true,
        systemNotifications: true,
      },
    });

  // If settings do not exist yet, use defaults.
  if (!settings) {
    return true;
  }

  switch (preference) {
    case "course":
      return settings.courseNotifications;

    case "referral":
      return settings.referralNotifications;

    case "order":
      return settings.orderNotifications;

    case "system":
      return settings.systemNotifications;

    default:
      return true;
  }
}

export async function createNotification({
  userId,
  title,
  message,
  type = NotificationType.INFO,
  actionUrl,
  preference,
}: CreateNotificationParams) {
  const enabled =
    await isNotificationEnabled(
      prisma,
      userId,
      preference
    );

  if (!enabled) {
    return null;
  }

  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
      actionUrl,
    },
  });
}

export async function createNotificationTx(
  tx: Prisma.TransactionClient,
  {
    userId,
    title,
    message,
    type = NotificationType.INFO,
    actionUrl,
    preference,
  }: CreateNotificationParams
) {
  const enabled =
    await isNotificationEnabled(
      tx,
      userId,
      preference
    );

  if (!enabled) {
    return null;
  }

  return tx.notification.create({
    data: {
      userId,
      title,
      message,
      type,
      actionUrl,
    },
  });
} 