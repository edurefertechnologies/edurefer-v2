import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock3,
  CreditCard,
  GraduationCap,
  Mail,
  Package,
  Phone,
  ReceiptText,
  User,
  XCircle,
} from "lucide-react";

import { getOrderDetails } from "@/actions/admin/orders/get-order-details";

interface Props {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function AdminOrderDetailsPage({
  params,
}: Props) {
  const { orderId } = await params;

  const order =
    await getOrderDetails(orderId);

  if (!order) {
    notFound();
  }

  const customerName = [
    order.user.firstName,
    order.user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {order.orderNumber}
            </h1>

            <p className="mt-2 text-muted-foreground">
              Created{" "}
              {formatDateTime(
                order.createdAt
              )}
            </p>
          </div>

          <OrderStatusBadge
            status={order.status}
          />
        </div>
      </div>

      {/* Customer + Payment */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer */}
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Customer
              </p>

              <h2 className="text-lg font-semibold">
                {customerName ||
                  "Customer"}
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm">
                {order.user.email}
              </span>
            </div>

            {order.user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />

                <span className="text-sm">
                  {order.user.phone}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Payment */}
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-semibold">
              Payment
            </h2>
          </div>

          {order.payment ? (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Status
                </span>

                <PaymentStatusBadge
                  status={
                    order.payment.status
                  }
                />
              </div>

              <DetailRow
                label="Amount"
                value={`₹${Number(
                  order.payment.amount
                ).toLocaleString(
                  "en-IN"
                )}`}
              />

              <DetailRow
                label="Method"
                value={
                  order.payment.method ??
                  "—"
                }
              />

              {order.payment
                .razorpayOrderId && (
                <DetailRow
                  label="Razorpay Order ID"
                  value={
                    order.payment
                      .razorpayOrderId
                  }
                />
              )}

              {order.payment
                .razorpayPaymentId && (
                <DetailRow
                  label="Payment ID"
                  value={
                    order.payment
                      .razorpayPaymentId
                  }
                />
              )}

              {order.payment.paidAt && (
                <DetailRow
                  label="Paid On"
                  value={formatDateTime(
                    order.payment.paidAt
                  )}
                />
              )}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              No payment record exists for
              this order.
            </p>
          )}
        </section>
      </div>

      {/* Items */}
      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b p-6">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-primary" />

            <div>
              <h2 className="text-lg font-semibold">
                Order Items
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {order.items.length}{" "}
                {order.items.length === 1
                  ? "item"
                  : "items"}
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {order.items.map(
            (item: any) => {
              const name =
                item.product?.course
                  ?.title ??
                item.product?.name ??
                item.bundle?.name ??
                "Order Item";

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {name}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {item.product
                        ?.type && (
                        <span>
                          {
                            item.product
                              .type
                          }
                        </span>
                      )}

                      {item.product
                        ?.sku && (
                        <span>
                          SKU:{" "}
                          {
                            item.product
                              .sku
                          }
                        </span>
                      )}

                      <span>
                        Qty:{" "}
                        {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="font-semibold">
                      ₹
                      {Number(
                        item.totalPrice
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      ₹
                      {Number(
                        item.unitPrice
                      ).toLocaleString(
                        "en-IN"
                      )}{" "}
                      each
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* Summary + Enrollment */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Summary */}
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <ReceiptText className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-semibold">
              Order Summary
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            <MoneyRow
              label="Subtotal"
              value={order.subtotal}
            />

            <MoneyRow
              label="Discount"
              value={order.discount}
              prefix="-"
            />

            <MoneyRow
              label="Tax"
              value={order.tax}
            />

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  ₹
                  {Number(
                    order.total
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
            </div>

            {order.notes && (
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Notes
                </p>

                <p className="mt-2 text-sm">
                  {order.notes}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Enrollment */}
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-semibold">
              Linked Enrollment
            </h2>
          </div>

          {order.Enrollment.length >
          0 ? (
            <div className="mt-6 space-y-4">
              {order.Enrollment.map(
                (enrollment: any) => (
                  <div
                    key={enrollment.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">
                          {
                            enrollment
                              .course
                              .title
                          }
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Enrolled{" "}
                          {formatDate(
                            enrollment.enrolledAt
                          )}
                        </p>
                      </div>

                      <span className="text-sm font-semibold">
                        {Math.round(
                          enrollment.progress
                        )}
                        %
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              enrollment.progress
                            )
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href={`/admin/enrollments/${enrollment.id}`}
                        className="rounded-md border px-3 py-2 text-xs font-medium transition hover:bg-muted"
                      >
                        View Enrollment
                      </Link>

                      {enrollment.certificate && (
                        <Link
                          href={`/verify-certificate/${encodeURIComponent(
                            enrollment
                              .certificate
                              .certificateNo
                          )}`}
                          target="_blank"
                          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition hover:bg-muted"
                        >
                          <Award className="h-3.5 w-3.5" />
                          Verify Certificate
                        </Link>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              No enrollment is linked to
              this order.
            </p>
          )}
        </section>
      </div>

      {/* Invoice */}
      {order.status === "PAID" &&
        order.payment?.status ===
          "SUCCESS" && (
          <div className="flex justify-end">
            <a
              href={`/api/orders/${order.id}/invoice`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <ReceiptText className="h-4 w-4" />
              Download Invoice
            </a>
          </div>
        )}
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 text-sm">
      <span className="shrink-0 text-muted-foreground">
        {label}
      </span>

      <span className="break-all text-right font-medium">
        {value}
      </span>
    </div>
  );
}

function MoneyRow({
  label,
  value,
  prefix = "",
}: {
  label: string;
  value: number;
  prefix?: string;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span>
        {prefix}₹
        {Number(value).toLocaleString(
          "en-IN"
        )}
      </span>
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
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-600">
        <CheckCircle2 className="h-4 w-4" />
        Paid
      </span>
    );
  }

  if (status === "CANCELLED") {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive">
        <XCircle className="h-4 w-4" />
        Cancelled
      </span>
    );
  }

  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
      <Clock3 className="h-4 w-4" />
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
      {status}
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

function formatDateTime(
  value: Date | string
) {
  return new Date(
    value
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}