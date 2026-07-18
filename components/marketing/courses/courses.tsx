import Container from "@/components/layout/container";
import { courses } from "@/data/courses";
import CourseCard from "./course-card";

export default function Courses() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center">
          <span className="rounded-full border border-[rgba(212,175,55,.2)] px-4 py-2 text-sm text-[var(--gold)]">
            Popular Courses
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Learn the Most
            <span className="gradient-text"> In-Demand Skills</span>
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            Industry-focused courses designed to help you build practical skills
            and accelerate your career.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </Container>
    </section>
  );
}