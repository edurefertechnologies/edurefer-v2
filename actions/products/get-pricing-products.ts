"use server";

import { prisma } from "@/lib/prisma";

export async function getPricingProducts() {
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      price: true,
      discountPrice: true,
      thumbnail: true,
      type: true,
      isFeatured: true,
    },
    orderBy: [
      {
        isFeatured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const packages = await prisma.package.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      price: true,
      discountPrice: true,
      thumbnail: true,
      isFeatured: true,
      items: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      },
    },
    orderBy: [
      {
        isFeatured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return JSON.parse(
    JSON.stringify(
      {
        products,
        packages,
      },
      (_, value) =>
        value?.constructor?.name === "Decimal"
          ? Number(value)
          : value
    )
  );
}