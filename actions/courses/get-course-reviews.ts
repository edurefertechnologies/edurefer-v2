"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getCourseReviews(
  courseId: string
) {
  const session = await getSession();

  const reviews = await prisma.courseReview.findMany({
    where: {
      courseId,
    },

    orderBy: {
      updatedAt: "desc",
    },

    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      updatedAt: true,

      user: {
        select: {
          firstName: true,
          lastName: true,
          image: true,
        },
      },
    },
  });

  const aggregate =
    await prisma.courseReview.aggregate({
      where: {
        courseId,
      },

      _avg: {
        rating: true,
      },

      _count: {
        rating: true,
      },
    });

  let myReview = null;
  let canReview = false;

  if (session?.user?.id) {
    const [existingReview, enrollment] =
      await Promise.all([
        prisma.courseReview.findUnique({
          where: {
            userId_courseId: {
              userId: session.user.id,
              courseId,
            },
          },

          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            updatedAt: true,
          },
        }),

        prisma.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId: session.user.id,
              courseId,
            },
          },

          select: {
            status: true,
          },
        }),
      ]);

    myReview = existingReview;

    canReview =
      enrollment?.status === "ACTIVE" ||
      enrollment?.status === "COMPLETED";
  }

  return {
    reviews,

    averageRating:
      aggregate._avg.rating ?? 0,

    reviewCount:
      aggregate._count.rating,

    myReview,

    canReview,
  };
}