"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function reorderLesson(
  courseId: string,
  moduleId: string,
  lessonId: string,
  direction: "UP" | "DOWN"
) {
  try {
    // Verify module belongs to course
    const module = await prisma.courseModule.findFirst({
      where: {
        id: moduleId,
        courseId,
      },
      select: {
        id: true,
      },
    });

    if (!module) {
      return {
        success: false,
        message: "Module not found.",
      };
    }

    const lessons = await prisma.lesson.findMany({
      where: {
        moduleId,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        sortOrder: true,
      },
    });

    const currentIndex = lessons.findIndex(
      (lesson) => lesson.id === lessonId
    );

    if (currentIndex === -1) {
      return {
        success: false,
        message: "Lesson not found.",
      };
    }

    const targetIndex =
      direction === "UP"
        ? currentIndex - 1
        : currentIndex + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= lessons.length
    ) {
      return {
        success: false,
        message:
          direction === "UP"
            ? "Lesson is already at the top."
            : "Lesson is already at the bottom.",
      };
    }

    const currentLesson = lessons[currentIndex];
    const targetLesson = lessons[targetIndex];

    await prisma.$transaction([
      prisma.lesson.update({
        where: {
          id: currentLesson.id,
        },
        data: {
          sortOrder: targetLesson.sortOrder,
        },
      }),

      prisma.lesson.update({
        where: {
          id: targetLesson.id,
        },
        data: {
          sortOrder: currentLesson.sortOrder,
        },
      }),
    ]);

    revalidatePath(
      `/admin/courses/${courseId}/curriculum`
    );

    return {
      success: true,
      message: "Lesson order updated.",
    };
  } catch (error) {
    console.error("REORDER_LESSON_ERROR:", error);

    return {
      success: false,
      message: "Failed to reorder lesson.",
    };
  }
}