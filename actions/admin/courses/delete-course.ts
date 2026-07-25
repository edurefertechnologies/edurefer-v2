"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteCourse(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!course) {
      return {
        success: false,
        message: "Course not found.",
      };
    }

    // Don't delete courses that already have students.
    if (course._count.enrollments > 0) {
      return {
        success: false,
        message:
          "This course has enrolled students and cannot be deleted. Archive it instead.",
      };
    }

    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    revalidatePath("/admin/courses");
    revalidatePath("/admin/products");
    revalidatePath("/courses");

    return {
      success: true,
      message: "Course deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE_COURSE_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete course.",
    };
  }
}