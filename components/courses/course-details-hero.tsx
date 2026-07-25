"use client";

import Image from "next/image";
import Link from "next/link";
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
import SaveCourseButton from "@/components/courses/save-course-button";

interface Props {
  course: CourseDetailsType;

  enrollmentStatus:
  | "ACTIVE"
  | "COMPLETED"
  | "EXPIRED"
  | null;

  averageRating: number;
  reviewCount: number;
  isWishlisted: boolean;
}

export default function CourseDetailsHero({
  course,
  enrollmentStatus,
  averageRating,
  reviewCount,
  isWishlisted,
}: Props) {
  const isEnrolled =
    enrollmentStatus === "ACTIVE" ||
    enrollmentStatus === "COMPLETED";

  const isCompleted =
    enrollmentStatus === "COMPLETED";

  const learningHref =
    isCompleted
      ? "#reviews"
      : isEnrolled
        ? `/learn/${course.slug}`
        : `/checkout/${course.slug}`;

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

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              {course.title}
            </h1>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {course.description}
            </p>

            {/* Course Stats */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>
                  {course.enrollments.length} Students
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                <span>
                  {reviewCount > 0 ? (
                    <>
                      {averageRating.toFixed(1)}

                      <span className="text-muted-foreground">
                        {" "}
                        ({reviewCount}{" "}
                        {reviewCount === 1
                          ? "Review"
                          : "Reviews"})
                      </span>
                    </>
                  ) : (
                    "No Reviews Yet"
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-primary" />

                <span>
                  {course.duration || "Self-paced"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Signal className="h-5 w-5 text-primary" />

                <span className="capitalize">
                  {course.level
                    ? course.level.toLowerCase()
                    : "All Levels"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <Link href={learningHref}>
                    {isCompleted
                      ? "Review Course"
                      : isEnrolled
                        ? "Continue Learning"
                        : "Enroll Now"}

                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                }
              />

              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                render={
                  <a href="#curriculum">
                    View Curriculum
                  </a>
                }
              />
              <SaveCourseButton
                courseId={course.id}
                initialSaved={isWishlisted}
              />
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
              src={
                course.thumbnail ||
                "/courses/fullstack.jpg"
              }
              alt={course.title}
              width={700}
              height={500}
              className="aspect-video w-full object-cover"
            />

            <div className="space-y-5 p-5 sm:p-8">
              {/* Price */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Course Fee
                </span>

                <div className="text-right">
                  {course.product.discountPrice &&
                    Number(
                      course.product.discountPrice
                    ) <
                    Number(
                      course.product.price
                    ) ? (
                    <>
                      <span className="text-3xl font-bold text-primary">
                        ₹
                        {Number(
                          course.product
                            .discountPrice
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        ₹
                        {Number(
                          course.product.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      ₹
                      {Number(
                        course.product.price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Duration
                </span>

                <span className="text-right">
                  {course.duration ||
                    "Self-paced"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Mode
                </span>

                <span>Online</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Projects
                </span>

                <span className="text-right">
                  15+ Real Projects
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Certificate
                </span>

                <span>Included</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Placement Assistance
                </span>

                <span>Included</span>
              </div>

              {/* Main CTA */}
              <Button
                className="mt-6 w-full"
                nativeButton={false}
                render={
                  <Link href={learningHref}>
                    <BookOpen className="mr-2 h-5 w-5" />

                    {isCompleted
                      ? "Review Course"
                      : isEnrolled
                        ? "Continue Learning"
                        : "Enroll Now"}
                  </Link>
                }
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}