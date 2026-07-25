import { notFound } from "next/navigation";

import CourseOverview from "@/components/courses/course-overview";
import Curriculum from "@/components/courses/curriculum";
import LearningOutcomes from "@/components/courses/learning-outcomes";
import Instructor from "@/components/courses/instructor";
import PricingCard from "@/components/courses/pricing-card";
import CourseFaq from "@/components/courses/course-faq";
import RelatedCourses from "@/components/courses/related-courses";
import CourseDetailsHero from "@/components/courses/course-details-hero";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const courseData = await prisma.course.findUnique({
    where: {
      slug,
    },
    include: {
      product: true,
      enrollments: true,

      modules: {
        include: {
          lessons: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },

        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!courseData) {
    notFound();
  }

  // Convert Prisma Decimal objects into plain numbers
  // before passing data to Client Components.
  const course = JSON.parse(
    JSON.stringify(courseData, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );

  return (
    <>
      <CourseDetailsHero course={course} />

      <CourseOverview course={course} />

      <Curriculum course={course} />

      <LearningOutcomes course={course} />

      <Instructor course={course} />

      <PricingCard course={course} />

      <CourseFaq course={course} />

      <RelatedCourses
        currentCourseId={course.id}
      />
    </>
  );
}