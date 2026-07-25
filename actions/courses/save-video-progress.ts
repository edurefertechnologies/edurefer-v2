"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function saveVideoProgress(
  enrollmentId: string,
  lessonId: string,
  watchedSeconds: number
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const seconds = Math.max(
      0,
      Math.floor(watchedSeconds)
    );

    const enrollment =
      await prisma.enrollment.findFirst({
        where: {
          id: enrollmentId,
          userId: session.user.id,

          status: {
            in: ["ACTIVE", "COMPLETED"],
          },

          course: {
            modules: {
              some: {
                lessons: {
                  some: {
                    id: lessonId,
                  },
                },
              },
            },
          },
        },

        select: {
          id: true,
        },
      });

    if (!enrollment) {
      return {
        success: false,
        message: "Course access denied.",
      };
    }

    const existing =
      await prisma.lessonProgress.findUnique({
        where: {
          enrollmentId_lessonId: {
            enrollmentId,
            lessonId,
          },
        },

        select: {
          watchedSeconds: true,
        },
      });

    // Don't move saved progress backwards.
    const savedSeconds = Math.max(
      existing?.watchedSeconds ?? 0,
      seconds
    );

    await prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId,
          lessonId,
        },
      },

      create: {
        enrollmentId,
        lessonId,
        watchedSeconds: savedSeconds,
      },

      update: {
        watchedSeconds: savedSeconds,
      },
    });

    return {
      success: true,
      watchedSeconds: savedSeconds,
    };
  } catch (error) {
    console.error(
      "SAVE_VIDEO_PROGRESS_ERROR:",
      error
    );

    return {
      success: false,
      message: "Unable to save video progress.",
    };
  }
}