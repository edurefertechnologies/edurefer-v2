"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteModule(
  courseId: string,
  moduleId: string
) {
  try {
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

    await prisma.courseModule.delete({
      where: {
        id: moduleId,
      },
    });

    revalidatePath(
      `/admin/courses/${courseId}/curriculum`
    );

    return {
      success: true,
      message: "Module deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE_MODULE_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete module.",
    };
  }
}