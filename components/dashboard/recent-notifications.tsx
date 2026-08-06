import Link from "next/link";
import {
  Bell,
  BookOpen,
  Award,
  Wallet,
  Brain,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import { getNotifications } from "@/actions/notifications/get-notifications";


function getNotificationConfig(type: string) {
  switch (type) {
    case "SUCCESS":
      return {
        icon: CheckCircle2,
        bg: "from-emerald-500/20 to-green-500/10",
        color: "text-emerald-300",
      };

    case "WARNING":
      return {
        icon: AlertTriangle,
        bg: "from-yellow-500/20 to-orange-500/10",
        color: "text-yellow-300",
      };

    case "ERROR":
      return {
        icon: XCircle,
        bg: "from-red-500/20 to-rose-500/10",
        color: "text-red-300",
      };

    default:
      return {
        icon: Bell,
        bg: "from-blue-500/20 to-cyan-500/10",
        color: "text-cyan-300",
      };
  }
}

export async function RecentNotifications() {
  const { notifications } =
    await getNotifications(5);

  function formatDate(date: Date | string) {
    const value = new Date(date);

    const diff = Date.now() - value.getTime();

    const mins = Math.floor(diff / 60000);

    if (mins < 1) return "Now";

    if (mins < 60) return `${mins}m`;

    const hrs = Math.floor(mins / 60);

    if (hrs < 24) return `${hrs}h`;

    const days = Math.floor(hrs / 24);

    if (days < 7) return `${days}d`;

    return value.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  }

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
">

      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Notifications
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest updates
          </p>
        </div>

        <Link href="/notifications" className="text-sm font-semibold text-cyan-300 transition hover:text-white">
          View All →
        </Link>
      </div>

      {notifications.length === 0 ? (
        <div
          className="
rounded-3xl
border
border-dashed
border-white/10
bg-white/5
backdrop-blur-xl
p-10
text-center
">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

            <Bell className="h-8 w-8 text-cyan-300" />

          </div>

          <>
            <h3 className="mt-5 text-lg font-semibold text-white">
              You're All Caught Up
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              New notifications about your courses, wallet and certificates will appear here.
            </p>
          </>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(
            (notification) => {
              const config = getNotificationConfig(notification.type);

              const Icon = config.icon;
              return (
                <div key={notification.id} className={`
group
relative
rounded-2xl
border
p-5
transition-all
duration-300
hover:-translate-y-1
hover:border-cyan-500/20
hover:shadow-[0_0_30px_rgba(59,130,246,.18)]
${notification.isRead
                    ? "border-white/10 bg-white/5"
                    : "border-emerald-500/20 bg-emerald-500/5"}`}>
                  {!notification.isRead && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-emerald-400" />
                  )}
                  <div className="flex items-start gap-4">

                    {/* Icon */}
                    <div
                      className="
    flex
    h-12
    w-12
    shrink-0
    items-center
    justify-center
    rounded-2xl
    bg-gradient-to-br
    ${config.bg}
    ring-1
    ring-white/10
    "
                    >
                      <Icon className={`h-6 w-6 ${config.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <h3 className="truncate font-semibold text-white">
                            {notification.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                            {notification.message}
                          </p>

                        </div>

                        <span
                          className="
        shrink-0
        rounded-full
        border
        border-white/10
        bg-white/5
        px-3
        py-1
        text-[11px]
        font-medium
        text-slate-400
        "
                        >
                          {formatDate(notification.createdAt)}
                        </span>

                      </div>

                    </div>

                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
};