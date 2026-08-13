"use server";

import { prisma } from "@/lib/prisma";

export async function getPricingData() {
  const [products, packages] = await Promise.all([
    prisma.product.findMany({
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
    }),

    prisma.package.findMany({
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
    }),
  ]);

  return {
    packages: packages.map((item) => ({
      ...item,
      price: Number(item.price),
      discountPrice: item.discountPrice
        ? Number(item.discountPrice)
        : null,
    })),

    courses: products
      .filter((item) => item.type === "COURSE")
      .map((item) => ({
        ...item,
        price: Number(item.price),
        discountPrice: item.discountPrice
          ? Number(item.discountPrice)
          : null,
      })),

    aiCredits: products
      .filter((item) => item.type === "AI_CREDITS")
      .map((item) => ({
        ...item,
        price: Number(item.price),
        discountPrice: item.discountPrice
          ? Number(item.discountPrice)
          : null,
      })),

    pdfs: products
      .filter((item) => item.type === "PDF")
      .map((item) => ({
        ...item,
        price: Number(item.price),
        discountPrice: item.discountPrice
          ? Number(item.discountPrice)
          : null,
      })),
  };
}