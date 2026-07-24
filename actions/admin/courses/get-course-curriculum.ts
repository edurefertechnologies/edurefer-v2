"use server";

import { prisma } from "@/lib/prisma";

export async function getCourseCurriculum(
  courseId: string
) {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },

    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      level: true,
      duration: true,

      product: {
        select: {
          id: true,
          name: true,
        },
      },

      modules: {
        orderBy: {
          sortOrder: "asc",
        },

        select: {
          id: true,
          title: true,
          sortOrder: true,

          lessons: {
            orderBy: {
              sortOrder: "asc",
            },

            select: {
              id: true,
              title: true,
              description: true,
              videoUrl: true,
              videoDuration: true,
              attachmentUrl: true,
              duration: true,
              isPreview: true,
              sortOrder: true,
            },
          },
        },
      },
    },
  });

  return course;
}