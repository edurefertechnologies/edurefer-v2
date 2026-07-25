"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getSavedCourses() {
  const session = await getSession();

  if (!session?.user?.id) {
    return [];
  }

  const savedCourses =
    await prisma.courseWishlist.findMany({
      where: {
        userId: session.user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        createdAt: true,

        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            thumbnail: true,
            level: true,
            duration: true,
            status: true,

            product: {
              select: {
                price: true,
                discountPrice: true,
              },
            },

            _count: {
              select: {
                enrollments: true,
                reviews: true,
              },
            },
          },
        },
      },
    });

  return JSON.parse(
    JSON.stringify(savedCourses, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}