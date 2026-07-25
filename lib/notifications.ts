import {
  NotificationType,
  Prisma,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  actionUrl?: string;
}

export async function createNotification({
  userId,
  title,
  message,
  type = NotificationType.INFO,
  actionUrl,
}: CreateNotificationParams) {
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

/*
 * Use this inside an existing Prisma transaction.
 * Example:
 *
 * await createNotificationTx(tx, {...})
 */
export async function createNotificationTx(
  tx: Prisma.TransactionClient,
  {
    userId,
    title,
    message,
    type = NotificationType.INFO,
    actionUrl,
  }: CreateNotificationParams
) {
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