import { prisma } from "@/lib/prisma";
import { CourseStatus } from "@prisma/client";

export async function getPublishedCourses() {
  const courses = await prisma.course.findMany({
    where: {
      status: CourseStatus.PUBLISHED,
    },
    include: {
      product: true,
      enrollments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return courses.map((course) => ({
    ...course,
    product: {
      ...course.product,
      price: Number(course.product.price),
      discountPrice: course.product.discountPrice
        ? Number(course.product.discountPrice)
        : null,
    },
  }));
}