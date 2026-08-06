"use server";

import { prisma } from "@/lib/prisma";

export async function getOrders() {
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      orderNumber: true,
      status: true,
      subtotal: true,
      discount: true,
      tax: true,
      total: true,
      currency: true,
      createdAt: true,

      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },

      payment: {
        select: {
          id: true,
          status: true,
          method: true,
          razorpayPaymentId: true,
          paidAt: true,
        },
      },

      items: {
        select: {
          id: true,
          quantity: true,
          unitPrice: true,
          totalPrice: true,

          product: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },

          package: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },

      _count: {
        select: {
          Enrollment: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  // Decimal values cannot safely cross
  // Server -> Client boundaries.
  return JSON.parse(
    JSON.stringify(orders, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}