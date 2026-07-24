"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateModule(
  courseId: string,
  moduleId: string,
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

    await prisma.courseModule.update({
      where: {
        id: moduleId,
      },
      data: {
        title: cleanTitle,
      },
    });

    revalidatePath(
      `/admin/courses/${courseId}/curriculum`
    );

    return {
      success: true,
      message: "Module updated successfully.",
    };
  } catch (error) {
    console.error("UPDATE_MODULE_ERROR:", error);

    return {
      success: false,
      message: "Failed to update module.",
    };
  }
}