import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  XCircle,
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
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            <CheckCircle2 className="h-3 w-3" />
            Paid
          </span>
        );

      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
            <Clock3 className="h-3 w-3" />
            Pending
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            <XCircle className="h-3 w-3" />
            Failed
          </span>
        );
    }
  }

  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Orders
          </h2>

          <p className="text-sm text-muted-foreground">
            Your latest purchases
          </p>
        </div>

        <Link href="/orders" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No purchases yet.
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
                className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-muted/40">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {title}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Order #{order.orderNumber}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
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
                    <p className="font-semibold">
                      ₹{order.total}
                    </p>

                    <div className="mt-1 flex justify-end">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  <Link href={`/orders/${order.id}`} className="rounded-lg border px-3 py-2 text-sm transition hover:bg-muted">
                    View
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