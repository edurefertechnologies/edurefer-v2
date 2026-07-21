import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const relatedCourses = [
  {
    title: "Java Full Stack Development",
    slug: "java-full-stack-development",
    level: "Intermediate",
  },
  {
    title: "Python Full Stack Development",
    slug: "python-full-stack-development",
    level: "Beginner",
  },
  {
    title: "Data Science & AI",
    slug: "data-science-ai",
    level: "Advanced",
  },
];

interface Props {
  currentCourseId: string;
}

export default function RelatedCourses({
  currentCourseId,
}: Props) {
  void currentCourseId;
  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">
              Related Courses
            </h2>

            <p className="mt-3 text-muted-foreground">
              Continue your learning journey with our most popular
              professional courses.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedCourses.map((course) => (
              <div
                key={course.slug}
                className="rounded-2xl border bg-background p-6 transition-all hover:shadow-lg"
              >
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {course.level}
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  {course.title}
                </h3>

                <Link href={`/courses/${course.slug}`}>
                  <Button
                    variant="ghost"
                    className="mt-6 px-0"
                  >
                    View Course
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}