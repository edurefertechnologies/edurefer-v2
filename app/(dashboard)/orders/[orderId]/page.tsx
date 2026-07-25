import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  Package,
  ReceiptText,
  XCircle,
} from "lucide-react";

import { getOrderDetails } from "@/actions/orders/get-order-details";

interface Props {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderDetailsPage({
  params,
}: Props) {
  const { orderId } = await params;

  const order =
    await getOrderDetails(orderId);

  if (!order) {
    notFound();
  }

  const paid =
    order.status === "PAID" &&
    order.payment?.status === "SUCCESS";

  const failed =
    order.payment?.status === "FAILED";

  const orderDate = new Date(
    order.payment?.paidAt ??
      order.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Order Details
            </h1>

            <p className="mt-2 text-muted-foreground">
              {order.orderNumber}
            </p>
          </div>

          {paid ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              Payment Successful
            </span>
          ) : failed ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive">
              <XCircle className="h-4 w-4" />
              Payment Failed
            </span>
          ) : (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
              <Clock3 className="h-4 w-4" />
              Payment Pending
            </span>
          )}
        </div>
      </div>

      {/* Order Info */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />

            <h2 className="font-semibold">
              Order Information
            </h2>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Order Number
              </span>

              <span className="text-right font-medium">
                {order.orderNumber}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Order Date
              </span>

              <span>{orderDate}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Status
              </span>

              <span className="font-medium">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5 text-primary" />

            <h2 className="font-semibold">
              Payment Information
            </h2>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Payment Status
              </span>

              <span className="font-medium">
                {order.payment?.status ??
                  "PENDING"}
              </span>
            </div>

            {order.payment?.method && (
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  Payment Method
                </span>

                <span className="font-medium">
                  {order.payment.method}
                </span>
              </div>
            )}

            {order.payment
              ?.razorpayPaymentId && (
              <div>
                <p className="text-muted-foreground">
                  Payment ID
                </p>

                <p className="mt-1 break-all font-mono text-xs">
                  {
                    order.payment
                      .razorpayPaymentId
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">
          Order Items
        </h2>

        <div className="mt-5 divide-y">
          {order.items.map((item: any) => {
            const title =
              item.product?.course?.title ??
              item.product?.name ??
              item.bundle?.name ??
              "Order Item";

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="font-medium">
                    {title}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>

                  {item.product?.course && (
                    <Link
                      href={`/courses/${item.product.course.slug}`}
                      className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      View Course
                    </Link>
                  )}
                </div>

                <p className="shrink-0 font-semibold">
                  ₹
                  {Number(
                    item.totalPrice
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Summary */}
      <div className="ml-auto max-w-md rounded-xl border bg-card p-6">
        <h2 className="font-semibold">
          Payment Summary
        </h2>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Subtotal
            </span>

            <span>
              ₹
              {Number(
                order.subtotal
              ).toLocaleString("en-IN")}
            </span>
          </div>

          {Number(order.discount) > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Discount
              </span>

              <span>
                -₹
                {Number(
                  order.discount
                ).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {Number(order.tax) > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Tax
              </span>

              <span>
                ₹
                {Number(
                  order.tax
                ).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div className="flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>

            <span>
              ₹
              {Number(
                order.total
              ).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {paid && (
          <a
            href={`/api/orders/${order.id}/invoice`}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download Invoice
          </a>
        )}
      </div>
    </div>
  );
}