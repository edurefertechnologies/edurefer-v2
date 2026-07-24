"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteLesson(
  courseId: string,
  moduleId: string,
  lessonId: string
) {
  try {
    // Verify ownership
    const lesson = await prisma.lesson.findFirst({
      where: {
        id: lessonId,
        moduleId,
        module: {
          courseId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!lesson) {
      return {
        success: false,
        message: "Lesson not found.",
      };
    }

    await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });

    revalidatePath(
      `/admin/courses/${courseId}/curriculum`
    );

    return {
      success: true,
      message: "Lesson deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE_LESSON_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete lesson.",
    };
  }
}