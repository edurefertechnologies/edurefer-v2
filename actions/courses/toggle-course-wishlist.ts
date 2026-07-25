"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function toggleCourseWishlist(
  courseId: string
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message:
          "Please log in to save courses.",
      };
    }

    const course =
      await prisma.course.findUnique({
        where: {
          id: courseId,
        },

        select: {
          id: true,
          slug: true,
        },
      });

    if (!course) {
      return {
        success: false as const,
        message: "Course not found.",
      };
    }

    const existing =
      await prisma.courseWishlist.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId,
          },
        },

        select: {
          id: true,
        },
      });

    if (existing) {
      await prisma.courseWishlist.delete({
        where: {
          id: existing.id,
        },
      });

      revalidatePath(
        `/courses/${course.slug}`
      );

      revalidatePath("/saved-courses");

      return {
        success: true as const,
        saved: false,
        message:
          "Course removed from saved courses.",
      };
    }

    await prisma.courseWishlist.create({
      data: {
        userId: session.user.id,
        courseId,
      },
    });

    revalidatePath(
      `/courses/${course.slug}`
    );

    revalidatePath("/saved-courses");

    return {
      success: true as const,
      saved: true,
      message: "Course saved successfully.",
    };
  } catch (error) {
    console.error(
      "TOGGLE_COURSE_WISHLIST_ERROR:",
      error
    );

    return {
      success: false as const,
      message:
        "Unable to update saved courses.",
    };
  }
}