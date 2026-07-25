"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createCourseSchema } from "@/schemas/admin/course";

export async function updateCourse(
  courseId: string,
  values: unknown
) {
  try {
    const result = createCourseSchema.safeParse(values);

    if (!result.success) {
      return {
        success: false,
        message: "Please check the entered course details.",
      };
    }

    const data = result.data;

    // Make sure course exists
    const existingCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        productId: true,
      },
    });

    if (!existingCourse) {
      return {
        success: false,
        message: "Course not found.",
      };
    }

    // Course's product should not be changed during edit
    if (existingCourse.productId !== data.productId) {
      return {
        success: false,
        message: "Course product cannot be changed.",
      };
    }

    // Check slug conflict with another course
    const slugConflict = await prisma.course.findFirst({
      where: {
        slug: data.slug,

        NOT: {
          id: courseId,
        },
      },
      select: {
        id: true,
      },
    });

    if (slugConflict) {
      return {
        success: false,
        message: "Another course already uses this slug.",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
      },

      data: {
        title: data.title,
        slug: data.slug,

        description:
          data.description?.trim() || null,

        level:
          data.level || null,

        duration:
          data.duration?.trim() || null,

        thumbnail:
          data.thumbnail || null,

        status: data.status,
      },
    });

    revalidatePath("/admin/courses");
    revalidatePath(
      `/admin/courses/${courseId}/edit`
    );
    revalidatePath(
      `/admin/courses/${courseId}/curriculum`
    );
    revalidatePath("/courses");

    return {
      success: true,
      message: "Course updated successfully.",
    };
  } catch (error) {
    console.error("UPDATE_COURSE_ERROR:", error);

    return {
      success: false,
      message: "Failed to update course.",
    };
  }
}