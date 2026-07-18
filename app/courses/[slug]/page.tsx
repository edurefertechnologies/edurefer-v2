import CourseDetailsHero from "@/components/courses/course-details-hero";
import CourseOverview from "@/components/courses/course-overview";
import Curriculum from "@/components/courses/curriculum";
import LearningOutcomes from "@/components/courses/learning-outcomes";
import Instructor from "@/components/courses/instructor";
import PricingCard from "@/components/courses/pricing-card";
import CourseFaq from "@/components/courses/course-faq";
import RelatedCourses from "@/components/courses/related-courses";

export default function CourseDetailsPage() {
  return (
    <>
      <CourseDetailsHero />
      <CourseOverview />
      <Curriculum />
      <LearningOutcomes />
      <Instructor />
      <PricingCard />
      <CourseFaq />
      <RelatedCourses />
    </>
  );
}