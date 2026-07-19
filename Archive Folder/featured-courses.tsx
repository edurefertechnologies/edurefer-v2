"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Signal,
  Star,
} from "lucide-react";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Full Stack Web Development",
    description:
      "Master HTML, CSS, JavaScript, React, Next.js, Node.js, Express, PostgreSQL & deployment.",
    level: "Beginner to Advanced",
    duration: "24 Weeks",
    rating: 4.9,
    students: "1200+",
    href: "/courses/full-stack",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Python & AI Development",
    description:
      "Learn Python, Automation, Machine Learning, AI, APIs and real-world projects.",
    level: "Intermediate",
    duration: "20 Weeks",
    rating: 4.8,
    students: "900+",
    href: "/courses/python-ai",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "Java Backend Development",
    description:
      "Build enterprise applications using Java, Spring Boot, REST APIs, SQL and Microservices.",
    level: "Intermediate",
    duration: "22 Weeks",
    rating: 4.9,
    students: "800+",
    href: "/courses/java",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function FeaturedCourses() {
  return (
    <section className="section">
      <Container>
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Featured Courses
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Learn Skills That
            <span className="text-gradient">
              {" "}
              Companies Actually Hire For
            </span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Industry-focused programs designed with practical learning,
            live projects, mentorship, and career support.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.article
              key={course.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="glass-card hover-lift overflow-hidden"
            >
              {/* Top Banner */}

              <div
                className={`h-2 rounded-full bg-gradient-to-r ${course.gradient}`}
              />

              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {course.level}
                </span>

                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />

                  <span className="text-sm font-medium">
                    {course.rating}
                  </span>
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {course.title}
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-primary" />

                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Signal className="h-5 w-5 text-primary" />

                  <span>{course.level}</span>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />

                  <span>{course.students} Students</span>
                </div>
              </div>

              <Link
                href={course.href}
                className="mt-8 block"
              >
                <Button className="w-full">
                  View Course

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-14 text-center">
          <Link href="/courses">
            <Button
              variant="outline"
              size="lg"
            >
              View All Courses

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}