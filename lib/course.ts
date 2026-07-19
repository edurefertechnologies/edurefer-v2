import { prisma } from "@/lib/prisma";
import { CourseStatus } from "@prisma/client";

export async function getPublishedCourses() {
  return prisma.course.findMany({
    where: {
      status: CourseStatus.PUBLISHED,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}