"use server";

import { revalidatePath } from "next/cache";
import {
  EnrollmentStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function completeLesson(
  enrollmentId: string,
  lessonId: string
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    // Verify that this enrollment belongs to
    // the logged-in user.
    const enrollment =
      await prisma.enrollment.findFirst({
        where: {
          id: enrollmentId,
          userId: session.user.id,
          status: EnrollmentStatus.ACTIVE,
        },

        select: {
          id: true,
          courseId: true,

          course: {
            select: {
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
        },
      });

    if (!enrollment) {
      return {
        success: false,
        message: "Enrollment not found.",
      };
    }

    const allLessonIds =
      enrollment.course.modules.flatMap(
        (module) =>
          module.lessons.map(
            (lesson) => lesson.id
          )
      );

    // Prevent completing a lesson from
    // another course.
    if (!allLessonIds.includes(lessonId)) {
      return {
        success: false,
        message:
          "Lesson does not belong to this course.",
      };
    }

    await prisma.$transaction(async (tx) => {
      // Upsert makes this operation idempotent.
      await tx.lessonProgress.upsert({
        where: {
          enrollmentId_lessonId: {
            enrollmentId,
            lessonId,
          },
        },

        create: {
          enrollmentId,
          lessonId,
          completed: true,
          completedAt: new Date(),
        },

        update: {
          completed: true,
          completedAt: new Date(),
        },
      });

      const completedLessons =
        await tx.lessonProgress.count({
          where: {
            enrollmentId,
            completed: true,
            lessonId: {
              in: allLessonIds,
            },
          },
        });

      const totalLessons = allLessonIds.length;

      const progress =
        totalLessons > 0
          ? Math.min(
              100,
              (completedLessons /
                totalLessons) *
                100
            )
          : 0;

      const isCompleted = progress >= 100;

      await tx.enrollment.update({
        where: {
          id: enrollmentId,
        },

        data: {
          progress,

          status: isCompleted
            ? EnrollmentStatus.COMPLETED
            : EnrollmentStatus.ACTIVE,

          completedAt: isCompleted
            ? new Date()
            : null,
        },
      });
    });

    revalidatePath(
      `/learn/${enrollment.course.slug}`
    );

    return {
      success: true,
      message: "Lesson completed.",
    };
  } catch (error) {
    console.error(
      "COMPLETE_LESSON_ERROR:",
      error
    );

    return {
      success: false,
      message:
        "Unable to update lesson progress.",
    };
  }
}