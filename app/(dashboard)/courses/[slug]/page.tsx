import { notFound } from "next/navigation";

import CourseDetailsHero from "@/components/courses/course-details-hero";
import CourseOverview from "@/components/courses/course-overview";
import Curriculum from "@/components/courses/curriculum";
import LearningOutcomes from "@/components/courses/learning-outcomes";
import Instructor from "@/components/courses/instructor";
import PricingCard from "@/components/courses/pricing-card";
import CourseFaq from "@/components/courses/course-faq";
import RelatedCourses from "@/components/courses/related-courses";

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

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    include: {
      product: true,
      enrollments: true,
      modules: {
        include: {
          lessons: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <>
      <CourseOverview course={course} />
      <Curriculum course={course} />
      <LearningOutcomes course={course} />
      <Instructor course={course} />
      <PricingCard course={course} />
      <CourseFaq course={course} />
      <RelatedCourses currentCourseId={course.id} />
    </>
  );
}