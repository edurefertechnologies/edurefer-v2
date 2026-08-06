"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getMyOrders() {
  const session = await getSession();

  if (!session?.user?.id) {
    return [];
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },

    orderBy: {
      createdAt: "desc",
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
      createdAt: true,

      payment: {
        select: {
          status: true,
          razorpayPaymentId: true,
          amount: true,
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
              thumbnail: true,

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

  // Prisma Decimal cannot be passed directly
  // from Server Components to Client Components.
  return JSON.parse(
    JSON.stringify(orders, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}