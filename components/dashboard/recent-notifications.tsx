import Link from "next/link";
import { Bell } from "lucide-react";

import { getNotifications } from "@/actions/notifications/get-notifications";

export async function RecentNotifications() {
  const { notifications } =
    await getNotifications(5);

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Notifications
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest updates
          </p>
        </div>

        <Link href="/notifications" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <Bell className="mx-auto h-8 w-8 text-muted-foreground" />

          <p className="mt-3 text-sm text-muted-foreground">
            No notifications available.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(
            (notification) => (
              <div key={notification.id} className={`rounded-xl border p-4 transition ${notification.isRead ? ""
                : "border-primary/30 bg-primary/5"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}

                      <h3 className="truncate font-semibold">
                        {notification.title}
                      </h3>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(
                      notification.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}