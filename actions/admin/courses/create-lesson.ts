"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

type CreateLessonInput = {
  title: string;
  description?: string;
  videoUrl?: string;
  videoDuration?: number | null;
  attachmentUrl?: string;
  duration?: number | null;
  isPreview?: boolean;
};

export async function createLesson(
  courseId: string,
  moduleId: string,
  values: CreateLessonInput
) {
  try {
    const title = values.title.trim();

    if (title.length < 3) {
      return {
        success: false,
        message: "Lesson title must be at least 3 characters.",
      };
    }

    // Verify module belongs to this course
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
        message: "Course module not found.",
      };
    }

    // Calculate next lesson order
    const lastLesson = await prisma.lesson.findFirst({
      where: {
        moduleId,
      },
      orderBy: {
        sortOrder: "desc",
      },
      select: {
        sortOrder: true,
      },
    });

    const nextSortOrder =
      (lastLesson?.sortOrder ?? 0) + 1;

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,

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

        sortOrder: nextSortOrder,
      },

      select: {
        id: true,
        title: true,
        sortOrder: true,
      },
    });

    revalidatePath(
      `/admin/courses/${courseId}/curriculum`
    );

    return {
      success: true,
      message: "Lesson created successfully.",
      lesson,
    };
  } catch (error) {
    console.error("CREATE_LESSON_ERROR:", error);

    return {
      success: false,
      message: "Failed to create lesson.",
    };
  }
}