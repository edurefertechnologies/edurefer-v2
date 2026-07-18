import Container from "@/components/layout/container";
import CourseCard from "./course-card";
import { courses } from "@/data/courses";

export default function CourseGrid() {
  return (
    <section className="pb-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}