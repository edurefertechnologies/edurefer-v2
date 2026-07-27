"use server";

import { prisma } from "@/lib/prisma";

export async function getOrderDetails(
  orderId: string
) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
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
      updatedAt: true,

      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
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
              slug: true,
              sku: true,
              type: true,

              course: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                },
              },
            },
          },

          bundle: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },

      payment: {
        select: {
          id: true,
          amount: true,
          currency: true,
          method: true,
          status: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
          paidAt: true,
          createdAt: true,
        },
      },

      Enrollment: {
        select: {
          id: true,
          progress: true,
          status: true,
          enrolledAt: true,
          completedAt: true,

          course: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },

          certificate: {
            select: {
              certificateNo: true,
              issuedAt: true,
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