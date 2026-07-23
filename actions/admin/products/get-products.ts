"use server";

import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      type: true,
      status: true,
      price: true,
      discountPrice: true,
      thumbnail: true,
      isFeatured: true,
      stock: true,
      publishedAt: true,
      createdAt: true,
      course: {
        select: {
          id: true,
          title: true,
        },
      },
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