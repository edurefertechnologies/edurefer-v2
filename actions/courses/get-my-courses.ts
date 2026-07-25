"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getMyCourses() {
  const session = await getSession();

  if (!session?.user?.id) {
    return [];
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: session.user.id,
      status: {
        in: ["ACTIVE", "COMPLETED"],
      },
    },

    select: {
      id: true,
      progress: true,
      status: true,
      enrolledAt: true,
      completedAt: true,

      certificate: {
        select: {
          id: true,
          certificateNo: true,
          issuedAt: true,
          pdfUrl: true,
        },
      },

      lessonProgress: {
        where: {
          completed: true,
        },

        select: {
          lessonId: true,
          completedAt: true,
        },

        orderBy: {
          completedAt: "desc",
        },
      },

      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnail: true,
          duration: true,

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
    },

    orderBy: {
      enrolledAt: "desc",
    },
  });

  return enrollments;
}