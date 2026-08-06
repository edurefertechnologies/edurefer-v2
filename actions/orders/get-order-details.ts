"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getOrderDetails(
  orderId: string
) {
  const session = await getSession();

  if (!session?.user?.id) {
    return null;
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
    },

    select: {
      id: true,
      orderNumber: true,
      status: true,
      subtotal: true,
      discount: true,
      tax: true,
      total: true,
      currency: true,
      notes: true,
      createdAt: true,

      payment: {
        select: {
          status: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
          amount: true,
          currency: true,
          method: true,
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

              course: {
                select: {
                  title: true,
                  slug: true,
                },
              },
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
    },
  });

  if (!order) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(order, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}