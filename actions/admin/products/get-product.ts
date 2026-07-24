"use server";

import { prisma } from "@/lib/prisma";

export async function getProduct(productId: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      shortDescription: true,
      price: true,
      discountPrice: true,
      thumbnail: true,
      type: true,
      status: true,
      isFeatured: true,
      stock: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  if (!product) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(product, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}