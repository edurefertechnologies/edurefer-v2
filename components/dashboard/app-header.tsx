"use client";

import {
  Bell,
  CheckCheck,
  Search,
} from "lucide-react";

import {
  useState,
  useTransition,
} from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { markNotificationRead } from "@/actions/notifications/mark-notification-read";
import { markAllNotificationsRead } from "@/actions/notifications/mark-all-notifications-read";

type NotificationItem = {
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

type AppHeaderProps = {
  name: string;
  user: {
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
  };
  notifications: NotificationItem[];
  unreadCount: number;
};

export function AppHeader({
  name,
  user,
  notifications: initialNotifications,
  unreadCount: initialUnreadCount,
}: AppHeaderProps) {
  const router = useRouter();

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [unreadCount, setUnreadCount] =
    useState(initialUnreadCount);

  const [isPending, startTransition] =
    useTransition();

  const handleNotificationClick = (
    notification: NotificationItem
  ) => {
    if (!notification.isRead) {
      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? {
              ...item,
              isRead: true,
            }
            : item
        )
      );

      setUnreadCount((current) =>
        Math.max(0, current - 1)
      );

      startTransition(async () => {
        await markNotificationRead(
          notification.id
        );

        router.refresh();
      });
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const handleMarkAllRead = () => {
    if (unreadCount === 0) {
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );

    setUnreadCount(0);

    startTransition(async () => {
      await markAllNotificationsRead();
      router.refresh();
    });
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="w-72 pl-9"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="relative rounded-md p-2 outline-none transition hover:bg-accent"
            aria-label="Notifications"
          >
            <Bell className="size-5" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-none text-destructive-foreground">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[calc(100vw-2rem)] max-w-96 p-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <h3 className="text-base font-semibold">
                  Notifications
                </h3>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {unreadCount > 0
                    ? `${unreadCount} unread`
                    : "You're all caught up"}
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  disabled={isPending}
                  className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-primary hover:underline disabled:opacity-50"
                >
                  <CheckCheck className="size-4" />
                  Mark all read
                </button>
              )}
            </div>

            <DropdownMenuSeparator className="m-0" />

            {/* Notifications */}
            {notifications.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <Bell className="mx-auto size-8 text-muted-foreground" />

                <p className="mt-3 font-medium">
                  No notifications
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Updates about your courses,
                  payments and rewards will
                  appear here.
                </p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(
                  (notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      onSelect={(event) => {
                        event.preventDefault();

                        handleNotificationClick(
                          notification
                        );
                      }}
                      className="cursor-pointer rounded-none border-b p-0 last:border-b-0"
                    >
                      <div
                        className={`flex w-full gap-3 px-4 py-3 ${!notification.isRead
                          ? "bg-primary/5"
                          : ""
                          }`}
                      >
                        {/* Unread dot */}
                        <div className="pt-2">
                          <span
                            className={`block size-2 rounded-full ${notification.isRead
                              ? "bg-transparent"
                              : "bg-primary"
                              }`}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm ${notification.isRead
                                ? "font-medium"
                                : "font-semibold"
                                }`}
                            >
                              {
                                notification.title
                              }
                            </p>

                            <span className="shrink-0 text-[10px] text-muted-foreground">
                              {formatNotificationTime(
                                notification.createdAt
                              )}
                            </span>
                          </div>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                            {
                              notification.message
                            }
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  )
                )}
              </div>
            )}

            <DropdownMenuSeparator className="m-0" />

            {/* Footer */}
            <Link
              href="/notifications"
              className="block px-4 py-3 text-center text-sm font-medium text-primary transition hover:bg-accent"
            >
              View All Notifications
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-semibold sm:size-10">
            {user.image ? (
              <Image
                src={user.image}
                alt={
                  user.firstName
                    ? `${user.firstName}'s profile`
                    : "Profile"
                }
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-cyan-300">
                {user.firstName
                  ?.charAt(0)
                  ?.toUpperCase() || "S"}
              </span>
            )}
          </div>
          <div className="hidden md:block">
            <p className="font-semibold">
              {name}
            </p>

            <p className="text-xs text-muted-foreground">
              Student
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function formatNotificationTime(
  value: Date | string
) {
  const date = new Date(value);
  const now = new Date();

  const diff =
    now.getTime() - date.getTime();

  const minutes = Math.floor(
    diff / 60000
  );

  if (minutes < 1) {
    return "Now";
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days < 7) {
    return `${days}d`;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
    }
  );
}