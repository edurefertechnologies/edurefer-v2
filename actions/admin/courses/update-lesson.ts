"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type UpdateLessonInput = {
  title: string;
  description?: string;
  videoUrl?: string;
  videoDuration?: number | null;
  attachmentUrl?: string;
  duration?: number | null;
  isPreview?: boolean;
};

export async function updateLesson(
  courseId: string,
  moduleId: string,
  lessonId: string,
  values: UpdateLessonInput
) {
  try {
    const title = values.title.trim();

    if (title.length < 3) {
      return {
        success: false,
        message: "Lesson title must be at least 3 characters.",
      };
    }

    // Verify lesson belongs to the module and course
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

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title,

        description:
          values.description?.trim() || null,

        videoUrl:
          values.videoUrl?.trim() || null,

        videoDuration:
          values.videoDuration &&
          values.videoDuration > 0
            ? values.videoDuration
            : null,

        attachmentUrl:
          values.attachmentUrl?.trim() || null,

        duration:
          values.duration &&
          values.duration > 0
            ? values.duration
            : null,

        isPreview:
          values.isPreview ?? false,
      },
    });

    revalidatePath(
      `/admin/courses/${courseId}/curriculum`
    );

    return {
      success: true,
      message: "Lesson updated successfully.",
    };
  } catch (error) {
    console.error("UPDATE_LESSON_ERROR:", error);

    return {
      success: false,
      message: "Failed to update lesson.",
    };
  }
}