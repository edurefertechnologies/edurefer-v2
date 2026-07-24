"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CourseForm from "./course-form";
import { createCourse } from "@/actions/admin/courses/create-course";
import type { CreateCourseOutput } from "@/schemas/admin/course";

type CourseProduct = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string | null;
  price: number;
  discountPrice: number | null;
};

interface Props {
  products: CourseProduct[];
}

export default function CreateCoursePageForm({
  products,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: CreateCourseOutput
  ) {
    try {
      setLoading(true);

      const result = await createCourse(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      // For now go back to Courses listing.
      // Curriculum Builder route will be connected next.
      router.push("/admin/courses");
      router.refresh();
    } catch (error) {
      console.error(
        "CREATE_COURSE_CLIENT_ERROR:",
        error
      );

      toast.error(
        "Something went wrong while creating the course."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <CourseForm
      products={products}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}