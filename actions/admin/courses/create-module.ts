"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function createModule(
  courseId: string,
  title: string
) {
  try {
    const cleanTitle = title.trim();

    if (cleanTitle.length < 3) {
      return {
        success: false,
        message: "Module title must be at least 3 characters.",
      };
    }

    // Make sure course exists
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
      },
    });

    if (!course) {
      return {
        success: false,
        message: "Course not found.",
      };
    }

    // Find the last module to determine next sort order
    const lastModule = await prisma.courseModule.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        sortOrder: "desc",
      },
      select: {
        sortOrder: true,
      },
    });

    const nextSortOrder =
      (lastModule?.sortOrder ?? 0) + 1;

    const module = await prisma.courseModule.create({
      data: {
        courseId,
        title: cleanTitle,
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
      message: "Module created successfully.",
      module,
    };
  } catch (error) {
    console.error("CREATE_MODULE_ERROR:", error);

    return {
      success: false,
      message: "Failed to create module.",
    };
  }
}