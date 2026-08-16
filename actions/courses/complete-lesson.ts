"use server";

import crypto from "crypto";
import { revalidatePath } from "next/cache";
import {
  EnrollmentStatus,
  NotificationType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { createNotificationTx } from "@/lib/notifications";

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
              title: true,

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

    if (!allLessonIds.includes(lessonId)) {
      return {
        success: false,
        message:
          "Lesson does not belong to this course.",
      };
    }

    await prisma.$transaction(async (tx) => {
      // 1. Mark lesson complete
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

      // 2. Count completed lessons
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

      const totalLessons =
        allLessonIds.length;

      // 3. Calculate progress
      const progress =
        totalLessons > 0
          ? Math.min(
            100,
            (completedLessons /
              totalLessons) *
            100
          )
          : 0;

      const isCompleted =
        totalLessons > 0 &&
        progress >= 100;

      // 4. Update enrollment
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

      // 5. Generate certificate only once
      if (isCompleted) {
        const existingCertificate =
          await tx.certificate.findUnique({
            where: {
              enrollmentId,
            },

            select: {
              id: true,
              certificateNo: true,
            },
          });

        if (!existingCertificate) {
          const certificateNo =
            `EDU-${new Date().getFullYear()}-${crypto
              .randomUUID()
              .replace(/-/g, "")
              .slice(0, 10)
              .toUpperCase()}`;

          const certificate =
            await tx.certificate.create({
              data: {
                enrollmentId,
                certificateNo,
              },
            });

          // Notification is also created only once
          await createNotificationTx(tx, {
            userId: session.user.id,
            title: "Certificate Earned",
            message: `Congratulations! You have successfully completed ${enrollment.course.title}. Your certificate is now available.`,
            type: NotificationType.SUCCESS,
            actionUrl: `/api/certificates/${encodeURIComponent(
              certificate.certificateNo
            )}/download`,
            preference: "course",
          });
        }
      }
    });

    revalidatePath(
      `/learn/${enrollment.course.slug}`
    );

    revalidatePath("/my-courses");
    revalidatePath("/dashboard");
    revalidatePath("/notifications");

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