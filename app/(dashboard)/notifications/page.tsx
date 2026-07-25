import Link from "next/link";
import {
  Bell
} from "lucide-react";

import { getNotifications } from "@/actions/notifications/get-notifications";
import MarkAllReadButton from "@/components/notifications/mark-all-read-button";
import NotificationItem from "@/components/notifications/notification-item";

export default async function NotificationsPage() {
  const {
    notifications,
    unreadCount,
  } = await getNotifications(50);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Notifications
          </h1>

          <p className="mt-2 text-muted-foreground">
            Stay updated with your courses,
            payments, certificates and rewards.
          </p>
        </div>

        {unreadCount > 0 && (
          <MarkAllReadButton />
        )}
      </div>

      {/* Summary */}
      <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Bell className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="font-semibold">
            {unreadCount > 0
              ? `${unreadCount} unread ${
                  unreadCount === 1
                    ? "notification"
                    : "notifications"
                }`
              : "You're all caught up"}
          </p>

          <p className="mt-0.5 text-sm text-muted-foreground">
            {notifications.length} total{" "}
            {notifications.length === 1
              ? "notification"
              : "notifications"}
          </p>
        </div>
      </div>

      {/* List */}
      {notifications.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border bg-card p-6 text-center">
          <div className="rounded-full bg-muted p-4">
            <Bell className="h-8 w-8 text-muted-foreground" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No notifications yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Course updates, payments,
            certificates and referral rewards
            will appear here.
          </p>

          <Link
            href="/dashboard"
            className="mt-5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-card">
          {notifications.map(
            (notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}