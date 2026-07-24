"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function reorderModule(
  courseId: string,
  moduleId: string,
  direction: "UP" | "DOWN"
) {
  try {
    const modules = await prisma.courseModule.findMany({
      where: {
        courseId,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        sortOrder: true,
      },
    });

    const currentIndex = modules.findIndex(
      (module) => module.id === moduleId
    );

    if (currentIndex === -1) {
      return {
        success: false,
        message: "Module not found.",
      };
    }

    const targetIndex =
      direction === "UP"
        ? currentIndex - 1
        : currentIndex + 1;

    // Already at first/last position
    if (
      targetIndex < 0 ||
      targetIndex >= modules.length
    ) {
      return {
        success: false,
        message:
          direction === "UP"
            ? "Module is already at the top."
            : "Module is already at the bottom.",
      };
    }

    const currentModule = modules[currentIndex];
    const targetModule = modules[targetIndex];

    // Swap sortOrder safely in one transaction
    await prisma.$transaction([
      prisma.courseModule.update({
        where: {
          id: currentModule.id,
        },
        data: {
          sortOrder: targetModule.sortOrder,
        },
      }),

      prisma.courseModule.update({
        where: {
          id: targetModule.id,
        },
        data: {
          sortOrder: currentModule.sortOrder,
        },
      }),
    ]);

    revalidatePath(
      `/admin/courses/${courseId}/curriculum`
    );

    return {
      success: true,
      message: "Module order updated.",
    };
  } catch (error) {
    console.error("REORDER_MODULE_ERROR:", error);

    return {
      success: false,
      message: "Failed to reorder module.",
    };
  }
}