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
    <div
      className="
  relative
  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-white/[0.04]
  backdrop-blur-xl
  p-7
  transition-all
  duration-300
  hover:border-cyan-500/20
  hover:shadow-[0_0_40px_rgba(59,130,246,.12)]
  "
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest updates from your account
          </p>
        </div>

        <div
          className="
rounded-full
border
border-emerald-500/20
bg-emerald-500/10
px-3
py-1
text-xs
font-semibold
text-emerald-300
">
          {recent.length} Updates
        </div>

        <Link
          href="/notifications"
          className="text-sm font-semibold text-cyan-300 transition hover:text-white"
        >
          View Timeline →
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="py-12 text-center">

          <Wallet className="mx-auto h-12 w-12 text-slate-500" />

          <h3 className="mt-5 text-lg font-semibold text-white">

            No Recent Activity

          </h3>

          <p className="mt-2 text-sm text-slate-400">

            Your learning, wallet and orders will appear here.

          </p>

        </div>
      ) : (
        <div className="space-y-4">
          {recent.map((activity) => (
            <div
              key={`${activity.title}-${activity.id}`}
              className="flex items-start gap-3"
            >
              <div className="
flex
h-11
w-11
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-blue-500/20
to-emerald-500/20
ring-1
ring-white/10
">
                <activity.icon className="h-5 w-5 text-cyan-300" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {activity.description}
                </p>
              </div>

              <span
                className="
rounded-full
border
border-white/10
bg-white/5
px-3
py-1
text-[11px]
font-medium
text-slate-400
">
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