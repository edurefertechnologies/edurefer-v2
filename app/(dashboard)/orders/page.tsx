import Link from "next/link";
import {
  Package,
  ReceiptText,
} from "lucide-react";

import { getMyOrders } from "@/actions/orders/get-my-orders";
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge";

export default async function OrdersPage() {
  const orders = await getMyOrders();

  type Order = Awaited<
    ReturnType<typeof getMyOrders>
  >[number];

  type OrderItem = Order["items"][number];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          My Orders
        </h1>

        <p className="mt-2 text-muted-foreground">
          View your purchases, payments and invoices.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-card p-6 text-center">
          <div className="rounded-full bg-muted p-4">
            <Package className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No purchases yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Start learning today by exploring our courses and career packages.
          </p>

          <Link
            href="/courses"
            className="mt-5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: Order) => {
            return (
              <article
                key={order.id}
                className="rounded-xl border bg-card p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-semibold">
                        {order.orderNumber}
                      </h2>

                      <OrderStatusBadge
                        status={order.status}
                        paymentStatus={order.payment?.status}
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {new Date(
                        order.payment?.paidAt ??
                        order.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-muted-foreground">
                      Total
                    </p>

                    <p className="text-xl font-bold">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 border-t pt-5">
                  {order.items.map((item: OrderItem) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {item.product?.course?.title ??
                            item.product?.name ??
                            item.package?.name ??
                            "Order Item"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-medium">
                        ₹
                        {Number(
                          item.totalPrice
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {order.payment?.razorpayPaymentId && (
                  <div className="mt-5 border-t pt-4">
                    <p className="break-all text-xs text-muted-foreground">
                      Order Number:{" "}
                      {order.orderNumber}
                      <br />

                      Payment ID:{" "}
                      {order.payment.razorpayPaymentId}

                      Purchase Date:{" "}
                      {new Date(
                        order.payment.paidAt ?? order.createdAt
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                  >
                    View Details
                  </Link>

                  {order.status === "PAID" &&
                    order.payment?.status === "SUCCESS" && (
                      <a
                        href={`/api/orders/${order.id}/invoice`}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                      >
                        <ReceiptText className="h-4 w-4" />
                        Download Invoice
                      </a>
                    )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}