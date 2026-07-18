"use client";

import Container from "@/components/layout/container";

export default function CourseHero() {
return (
<section className="section">
  <Container>
    <div className="mx-auto max-w-4xl text-center">
      <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
        Explore Courses
      </span>

      <h1 className="mt-6 text-5xl font-bold">
        Learn Skills That
        <span className="text-gradient">
          {" "}
          Build Your Career
        </span>
      </h1>

      <p className="mt-6 text-lg text-muted-foreground">
        Explore industry-ready courses designed by experts with
        projects, mentorship and placement assistance.
      </p>
    </div>
  </Container>
</section>
);
}