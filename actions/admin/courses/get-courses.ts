"use server";

import { prisma } from "@/lib/prisma";

export async function getCourses() {
  const courses = await prisma.course.findMany({
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          discountPrice: true,
          status: true,
        },
      },

      _count: {
        select: {
          modules: true,
          enrollments: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return JSON.parse(
    JSON.stringify(courses, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}