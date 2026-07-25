"use server";

import { prisma } from "@/lib/prisma";

export async function getPublishedCourses() {
  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",

      product: {
        isDeleted: false,
        status: "PUBLISHED",
      },
    },

    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      level: true,
      duration: true,
      thumbnail: true,

      product: {
        select: {
          id: true,
          name: true,
          price: true,
          discountPrice: true,
          thumbnail: true,
        },
      },

      modules: {
        select: {
          id: true,

          lessons: {
            select: {
              id: true,
              duration: true,
            },
          },
        },
      },

      _count: {
        select: {
          enrollments: true,
          modules: true,
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