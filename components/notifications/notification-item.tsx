"use client";

import {
  AlertTriangle,
  CheckCircle2,
  CircleX,
  Info,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { markNotificationRead } from "@/actions/notifications/mark-notification-read";

type NotificationItemType = {
  id: string;
  title: string;
  message: string;

  type:
    | "INFO"
    | "SUCCESS"
    | "WARNING"
    | "ERROR";

  isRead: boolean;
  actionUrl: string | null;
  createdAt: Date | string;
};

interface Props {
  notification: NotificationItemType;
}

export default function NotificationItem({
  notification,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const handleClick = () => {
    startTransition(async () => {
      if (!notification.isRead) {
        await markNotificationRead(
          notification.id
        );
      }

      if (notification.actionUrl) {
        router.push(
          notification.actionUrl
        );
      } else {
        router.refresh();
      }
    });
  };

  const Icon =
    notification.type === "SUCCESS"
      ? CheckCircle2
      : notification.type === "WARNING"
        ? AlertTriangle
        : notification.type === "ERROR"
          ? CircleX
          : Info;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={`flex w-full items-start gap-4 border-b p-4 text-left transition last:border-b-0 hover:bg-muted/50 sm:p-5 ${
        !notification.isRead
          ? "bg-primary/5"
          : ""
      }`}
    >
      {/* Icon */}
      <div className="relative shrink-0">
        <div className="rounded-full bg-muted p-2.5">
          <Icon className="h-5 w-5" />
        </div>

        {!notification.isRead && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <p
            className={
              notification.isRead
                ? "font-medium"
                : "font-semibold"
            }
          >
            {notification.title}
          </p>

          <time className="shrink-0 text-xs text-muted-foreground">
            {formatNotificationDate(
              notification.createdAt
            )}
          </time>
        </div>

        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          {notification.message}
        </p>

        {notification.actionUrl && (
          <p className="mt-2 text-xs font-medium text-primary">
            View details →
          </p>
        )}
      </div>
    </button>
  );
}

function formatNotificationDate(
  value: Date | string
) {
  const date = new Date(value);

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}