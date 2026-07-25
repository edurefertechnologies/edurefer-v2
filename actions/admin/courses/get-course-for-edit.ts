"use server";

import { prisma } from "@/lib/prisma";

export async function getCourseForEdit(courseId: string) {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },

    select: {
      id: true,
      productId: true,
      title: true,
      slug: true,
      description: true,
      level: true,
      duration: true,
      thumbnail: true,
      status: true,

      product: {
        select: {
          id: true,
          name: true,
          price: true,
          discountPrice: true,
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(course, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}