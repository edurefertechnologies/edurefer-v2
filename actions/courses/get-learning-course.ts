"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getLearningCourse(slug: string) {
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      success: false as const,
      reason: "UNAUTHORIZED" as const,
    };
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: session.user.id,

      course: {
        slug,
      },

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

      // Actual lesson progress
      lessonProgress: {
        select: {
          id: true,
          lessonId: true,
          completed: true,
          watchedSeconds: true,
          completedAt: true,
        },
      },

      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          level: true,
          duration: true,
          thumbnail: true,

          modules: {
            orderBy: {
              sortOrder: "asc",
            },

            select: {
              id: true,
              title: true,
              sortOrder: true,

              lessons: {
                orderBy: {
                  sortOrder: "asc",
                },

                select: {
                  id: true,
                  title: true,
                  description: true,
                  videoUrl: true,
                  videoDuration: true,
                  attachmentUrl: true,
                  duration: true,
                  isPreview: true,
                  sortOrder: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!enrollment) {
    return {
      success: false as const,
      reason: "NOT_ENROLLED" as const,
    };
  }

  return {
    success: true as const,

    enrollment: {
      id: enrollment.id,
      progress: enrollment.progress,
      status: enrollment.status,
      enrolledAt: enrollment.enrolledAt,
      completedAt: enrollment.completedAt,

      lessonProgress: enrollment.lessonProgress,

      course: enrollment.course,
    },
  };
}