"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Full Stack Web Development",
    description:
      "HTML, CSS, JavaScript, React, Next.js, Node.js, Prisma & PostgreSQL.",
    level: "Beginner to Advanced",
    duration: "12 Weeks",
    price: "₹5,000",
    featured: true,
  },
  {
    title: "Python with AI",
    description:
      "Master Python, AI fundamentals, automation and real-world projects.",
    level: "Intermediate",
    duration: "10 Weeks",
    price: "₹5,000",
    featured: false,
  },
  {
    title: "Automation Testing",
    description:
      "Selenium, Playwright, API Testing, Pytest and industry workflows.",
    level: "Intermediate",
    duration: "8 Weeks",
    price: "₹5,000",
    featured: false,
  },
];

export default function Courses() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Popular Learning Paths
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Learn Skills That Companies Need
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Practical courses built with projects, AI assistance and career-focused learning.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                course.featured ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {course.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold">
                {course.title}
              </h3>

              <p className="mt-4 text-muted-foreground leading-7">
                {course.description}
              </p>

              <div className="mt-8 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {course.duration}
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  {course.level}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-3xl font-bold">
                  {course.price}
                </span>

                <Link href="/courses">
                  <Button>
                    View
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/courses">
            <Button size="lg" variant="outline">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}