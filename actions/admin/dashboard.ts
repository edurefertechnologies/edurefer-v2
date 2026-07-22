"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function getDashboardStats() {
  const [
    totalUsers,
    totalProducts,
    totalCourses,
    totalOrders,
    revenue,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        isDeleted: false,
      },
    }),

    prisma.product.count({
      where: {
        isDeleted: false,
      },
    }),

    prisma.course.count(),

    prisma.order.count(),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: OrderStatus.PAID,
      },
    }),
  ]);

  return {
    totalUsers,
    totalProducts,
    totalCourses,
    totalOrders,
    totalRevenue: Number(revenue._sum.total ?? 0),
  };
}