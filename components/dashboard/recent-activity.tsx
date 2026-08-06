import {
  BookOpen,
  Bell,
  CreditCard,
  Wallet,
} from "lucide-react";

import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function RecentActivity() {
  const session = await getSession();

  if (!session?.user?.id) {
    return null;
  }

  const [orders, enrollments, notifications, wallet] =
    await Promise.all([
      prisma.order.findMany({
        where: {
          userId: session.user.id,
        },

        take: 3,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.enrollment.findMany({
        where: {
          userId: session.user.id,
        },

        include: {
          course: true,
        },

        take: 3,

        orderBy: {
          enrolledAt: "desc",
        },
      }),

      prisma.notification.findMany({
        where: {
          userId: session.user.id,
        },

        take: 3,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.wallet.findUnique({
        where: {
          userId: session.user.id,
        },

        include: {
          transactions: {
            take: 3,

            orderBy: {
              createdAt: "desc",
            },
          },
        },
      }),
    ]);

  const activities = [...orders.map((order) => ({
    id: order.id,
    icon: CreditCard,
    title: "Order Placed",
    description: `Order #${order.orderNumber}`,
    date: order.createdAt,
  })),

  ...enrollments.map((enrollment) => ({
    id: enrollment.id,
    icon: BookOpen,
    title: "Course Enrolled",
    description: enrollment.course.title,
    date: enrollment.enrolledAt,
  })),

  ...(wallet?.transactions ?? []).map(
    (transaction) => ({
      id: transaction.id,
      icon: Wallet,
      title:
        transaction.type === "CREDIT"
          ? "Wallet Credited"
          : "Wallet Debited",

      description:
        transaction.description ??
        `₹${Number(
          transaction.amount
        ).toFixed(2)}`,

      date: transaction.createdAt,
    })
  ),

  ...notifications.map(
    (notification) => ({
      id: notification.id,
      icon: Bell,
      title: notification.title,
      description: notification.message,
      date: notification.createdAt,
    })
  ),
  ].sort(
    (a, b) =>
      b.date.getTime() - a.date.getTime()
  );

  const recent = activities.slice(0, 8);

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Activity
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest updates from your account
          </p>
        </div>

        <Link
          href="/notifications"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No activity yet.
        </p>
      ) : (
        <div className="space-y-4">
          {recent.map((activity) => (
            <div
              key={`${activity.title}-${activity.id}`}
              className="flex items-start gap-3"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <activity.icon className="h-4 w-4 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium">
                  {activity.title}
                </p>

                <p className="truncate text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(
                  activity.date
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}