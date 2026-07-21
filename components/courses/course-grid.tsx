import Container from "@/components/layout/container";
import CourseCard from "./course-card";
import type { CourseCardType } from "@/types/course";

type CourseGridProps = {
  courses: CourseCardType[];
};

export default function CourseGrid({
  courses,
}: CourseGridProps) {
  return (
    <section className="pb-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}