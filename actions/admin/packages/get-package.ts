"use server";

import { prisma } from "@/lib/prisma";

export async function getPackage(
  packageId: string
) {
  const pkg = await prisma.package.findUnique({
    where: {
      id: packageId,
    },
    include: {
      items: {
        select: {
          productId: true,
          quantity: true,
        },
      },
    },
  });

  if (!pkg) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(pkg, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}