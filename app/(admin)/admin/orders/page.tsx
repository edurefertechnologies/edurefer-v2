import Link from "next/link";

import {
  CheckCircle2,
  Clock3,
  Eye,
  Package,
  ReceiptText,
  ShoppingCart,
  XCircle,
} from "lucide-react";

import { getOrders } from "@/actions/admin/orders/get-orders";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  const paidOrders = orders.filter(
    (order: any) =>
      order.status === "PAID" &&
      order.payment?.status === "SUCCESS"
  );

  const pendingOrders = orders.filter(
    (order: any) =>
      order.status === "PENDING" ||
      order.payment?.status === "PENDING"
  );

  const failedOrders = orders.filter(
    (order: any) =>
      order.payment?.status === "FAILED"
  );

  const revenue = paidOrders.reduce(
    (total: number, order: any) =>
      total + Number(order.total),
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage customer purchases and
          payment transactions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={orders.length.toString()}
          icon={ShoppingCart}
        />

        <StatCard
          title="Paid Orders"
          value={paidOrders.length.toString()}
          icon={CheckCircle2}
        />

        <StatCard
          title="Pending"
          value={pendingOrders.length.toString()}
          icon={Clock3}
        />

        <StatCard
          title="Revenue"
          value={`₹${revenue.toLocaleString("en-IN")}`}
          icon={ReceiptText}
        />
      </div>

      {/* Failed summary */}
      {failedOrders.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <XCircle className="h-5 w-5 shrink-0 text-destructive" />

          <p className="text-sm">
            <span className="font-semibold">
              {failedOrders.length}
            </span>{" "}
            failed{" "}
            {failedOrders.length === 1
              ? "payment"
              : "payments"}{" "}
            require attention.
          </p>
        </div>
      )}

      {/* Orders */}
      {orders.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-card p-6 text-center">
          <div className="rounded-full bg-muted p-4">
            <ShoppingCart className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Customer purchases will appear
            here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-5 py-4 text-left font-medium">
                    Order
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Items
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order: any) => {
                  const studentName = [
                    order.user.firstName,
                    order.user.lastName,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <tr
                      key={order.id}
                      className="border-b last:border-b-0"
                    >
                      {/* Order */}
                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {order.orderNumber}
                        </p>

                        <div className="mt-2">
                          <OrderStatusBadge
                            status={order.status}
                          />
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {studentName ||
                            "Customer"}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {order.user.email}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />

                          <span>
                            {order.items.length}{" "}
                            {order.items.length ===
                            1
                              ? "item"
                              : "items"}
                          </span>
                        </div>

                        {order.items[0] && (
                          <p className="mt-1 max-w-48 truncate text-xs text-muted-foreground">
                            {order.items[0]
                              .product?.name ??
                              order.items[0]
                                .bundle?.name ??
                              "Order Item"}
                          </p>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          ₹
                          {Number(
                            order.total
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        {Number(
                          order.discount
                        ) > 0 && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Discount ₹
                            {Number(
                              order.discount
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        )}
                      </td>

                      {/* Payment */}
                      <td className="px-5 py-4">
                        {order.payment ? (
                          <div>
                            <PaymentStatusBadge
                              status={
                                order.payment
                                  .status
                              }
                            />

                            {order.payment
                              .method && (
                              <p className="mt-2 text-xs text-muted-foreground">
                                {
                                  order
                                    .payment
                                    .method
                                }
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            No payment
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {formatDate(
                          order.payment
                            ?.paidAt ??
                            order.createdAt
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 font-medium transition hover:bg-muted"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {value}
          </p>
        </div>

        <div className="rounded-full bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

function OrderStatusBadge({
  status,
}: {
  status: string;
}) {
  if (status === "PAID") {
    return (
      <span className="inline-flex rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
        Paid
      </span>
    );
  }

  if (status === "CANCELLED") {
    return (
      <span className="inline-flex rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
        Cancelled
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
      {status}
    </span>
  );
}

function PaymentStatusBadge({
  status,
}: {
  status: string;
}) {
  if (status === "SUCCESS") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Success
      </span>
    );
  }

  if (status === "FAILED") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
        <XCircle className="h-3.5 w-3.5" />
        Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
      <Clock3 className="h-3.5 w-3.5" />
      Pending
    </span>
  );
}

function formatDate(
  value: Date | string
) {
  return new Date(
    value
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}