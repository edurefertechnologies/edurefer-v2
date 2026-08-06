"use server";

import { prisma } from "@/lib/prisma";

export async function getFeaturedCourses() {
  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
      product: {
        status: "PUBLISHED",
        type: "COURSE",
      },
    },

    include: {
      product: {
        select: {
          price: true,
          discountPrice: true,
          thumbnail: true,
        },
      },
    },

    take: 3,

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