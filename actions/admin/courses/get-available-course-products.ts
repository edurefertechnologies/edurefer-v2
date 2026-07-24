"use server";

import { prisma } from "@/lib/prisma";

export async function getAvailableCourseProducts() {
  const products = await prisma.product.findMany({
    where: {
      type: "COURSE",
      isDeleted: false,

      // Product ला आधीच Course जोडलेला नसावा
      course: {
        is: null,
      },
    },

    select: {
      id: true,
      name: true,
      slug: true,
      thumbnail: true,
      price: true,
      discountPrice: true,
      status: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return JSON.parse(
    JSON.stringify(products, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}