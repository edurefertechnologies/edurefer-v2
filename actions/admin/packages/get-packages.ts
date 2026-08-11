"use server";

import { prisma } from "@/lib/prisma";

export async function getPackages() {
  const packages = await prisma.package.findMany({
    where: {
      status: {
        not: "ARCHIVED",
      },
    },
    include: {
      items: {
        include: {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return JSON.parse(
    JSON.stringify(packages, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}