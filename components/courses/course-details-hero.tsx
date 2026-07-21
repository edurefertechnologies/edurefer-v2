"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock3,
  Signal,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { CourseDetailsType } from "@/types/course";

interface Props {
  course: CourseDetailsType;
}

export default function CourseDetailsHero({
  course,
}: Props) {
  return (
    <section className="section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {course.level ?? "Course"}
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              {course.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {course.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>{course.enrollments.length} Students</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-primary" />
                <span>{course.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <Signal className="h-5 w-5 text-primary" />
                <span>Beginner</span>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <Button size="lg">
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
              >
                View Curriculum
              </Button>
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card overflow-hidden"
          >
            <Image
              src={course.thumbnail || "/courses/fullstack.jpg"}
              alt={course.title}
              width={700}
              height={500}
              className="aspect-video w-full object-cover"
            />

            <div className="space-y-5 p-8">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Course Fee
                </span>

                <span className="text-3xl font-bold text-primary">
                  ₹{Number(course.product.price).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Duration
                </span>

                <span>24 Weeks</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Mode
                </span>

                <span>Online / Offline</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Projects
                </span>

                <span>15+ Real Projects</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Certificate
                </span>

                <span>Included</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Placement Assistance
                </span>

                <span>Included</span>
              </div>

              <Button className="mt-6 w-full">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}