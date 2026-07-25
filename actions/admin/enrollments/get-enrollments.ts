"use server";

import { prisma } from "@/lib/prisma";

export async function getEnrollments() {
  const enrollments =
    await prisma.enrollment.findMany({
      select: {
        id: true,
        progress: true,
        status: true,
        enrolledAt: true,
        completedAt: true,

        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },

        course: {
          select: {
            id: true,
            title: true,
            slug: true,

            modules: {
              select: {
                lessons: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },

        order: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
          },
        },

        certificate: {
          select: {
            id: true,
            certificateNo: true,
            issuedAt: true,
          },
        },

        lessonProgress: {
          where: {
            completed: true,
          },

          select: {
            lessonId: true,
          },
        },
      },

      orderBy: {
        enrolledAt: "desc",
      },
    });

  return enrollments;
}