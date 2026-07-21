"use client";

import Link from "next/link";
import { Clock, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CourseCardType } from "@/types/course";

interface Props {
  course: CourseCardType;
}

export default function CourseCard({
  course,
}: Props) {
  return (
    <div className="glass-card hover-lift">
      <div className="aspect-video rounded-xl bg-muted" />

      <h3 className="mt-6 text-2xl font-bold">
        {course.title}
      </h3>

      <p className="mt-3 text-muted-foreground">
        {course.description}
      </p>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Clock size={16} />
          {course.duration}
        </div>

        <div className="flex items-center gap-2">
          <Users size={16} />
          {course.enrollments.length} Students
        </div>

        <div className="flex items-center gap-2">
          <Star size={16} />
          New Course
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-2xl font-bold">
          ₹{Number(course.product.price).toLocaleString()}
        </span>

        <Link href={`/courses/${course.slug}`}>
          <Button>View Course</Button>
        </Link>
      </div>
    </div>
  );
}