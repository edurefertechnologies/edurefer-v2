import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  XCircle,
  ShoppingCart,
  BookOpen,
  Package,
} from "lucide-react";

import { getMyOrders } from "@/actions/orders/get-my-orders";

export async function RecentOrders() {
  const orders = await getMyOrders();

  type RecentOrder = Awaited<
    ReturnType<typeof getMyOrders>
  >[number];

  const recentOrders = orders.slice(0, 5);

  function getStatusBadge(status: string) {
    switch (status) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Paid
          </span>
        );

      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-500/10 border border-yellow-500/20">
            <Clock3 className="h-3 w-3" />
            Pending
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-red-700 bg-red-500/10 border border-red-500/20">
            <XCircle className="h-3 w-3" />
            Failed
          </span>
        );
    }
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
"
    >

      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest purchases
          </p>
        </div>

        <Link href="/orders" className="text-sm font-semibold text-cyan-300 transition hover:text-white">
          View All →
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div
          className="
rounded-3xl
border
border-dashed
border-white/10
bg-white/5
p-10
text-center
backdrop-blur-xl
">
          <p className="text-sm text-muted-foreground">
            <ShoppingCart className="mx-auto h-10 w-10 text-cyan-300" />
            No Orders Yet
          </p>

          <p className="mt-2 text-sm text-slate-400">

            Purchase your first course to begin your learning journey.

          </p>

          <Link href="/courses" className="mt-4 inline-flex items-center gap-2 text-primary">
            Browse Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {recentOrders.map((order: RecentOrder) => {
            const item = order.items[0];

            const title =
              item?.product?.course?.title ??
              item?.product?.name ??
              item?.package?.name ??
              "Purchase";
            return (
              <div key={order.id}
                className="
group
flex
items-center
justify-between
rounded-2xl
border
border-white/10
bg-white/5
p-5
transition-all
duration-300
hover:-translate-y-1
hover:border-cyan-500/20
hover:shadow-[0_0_25px_rgba(59,130,246,.15)]
">
                <div
                  className="
mr-4
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-blue-500/20
to-emerald-500/20
"
                >

                  {item?.package ? (

                    <Package className="h-7 w-7 text-cyan-300" />

                  ) : (

                    <BookOpen className="h-7 w-7 text-cyan-300" />

                  )}

                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold text-white">
                    {title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Order #{order.orderNumber}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">
                      ₹{order.total}
                    </p>

                    <div className="mt-1 flex justify-end">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  <Link href={`/orders/${order.id}`} className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 border-0 px-4 py-2 font-semibold text-white shadow-lg transition hover:scale-105 px-3 py-2 text-sm transition hover:bg-muted">
                    Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}