import CourseHero from "@/components/courses/course-hero";
import CourseGrid from "@/components/courses/course-grid";
import { getPublishedCourses } from "@/lib/course";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <>
      <CourseHero />
      <CourseGrid courses={courses} />
    </>
  );
}