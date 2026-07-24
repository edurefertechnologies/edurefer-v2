"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createCourseSchema } from "@/schemas/admin/course";

export async function createCourse(values: unknown) {
  try {
    const result = createCourseSchema.safeParse(values);

    if (!result.success) {
      return {
        success: false,
        message: "Please check the entered course details.",
      };
    }

    const data = result.data;

    // Check selected product
    const product = await prisma.product.findFirst({
      where: {
        id: data.productId,
        type: "COURSE",
        isDeleted: false,
      },
      select: {
        id: true,
        course: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Selected course product was not found.",
      };
    }

    // One Product can have only one Course
    if (product.course) {
      return {
        success: false,
        message: "This product is already linked to a course.",
      };
    }

    // Check duplicate course slug
    const existingSlug = await prisma.course.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingSlug) {
      return {
        success: false,
        message: "A course with this slug already exists.",
      };
    }

    const course = await prisma.course.create({
      data: {
        productId: data.productId,
        title: data.title,
        slug: data.slug,

        description:
          data.description || null,

        level:
          data.level || null,

        duration:
          data.duration || null,

        thumbnail:
          data.thumbnail || null,

        status: data.status,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/admin/courses");
    revalidatePath("/courses");

    return {
      success: true,
      message: "Course created successfully.",
      courseId: course.id,
    };
  } catch (error) {
    console.error("CREATE_COURSE_ERROR:", error);

    return {
      success: false,
      message: "Failed to create course.",
    };
  }
}