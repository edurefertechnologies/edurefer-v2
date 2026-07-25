import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import EditCourseForm from "@/components/admin/courses/edit-course-form";
import { getCourseForEdit } from "@/actions/admin/courses/get-course-for-edit";

type Props = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function EditCoursePage({
  params,
}: Props) {
  const { courseId } = await params;

  const course = await getCourseForEdit(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          nativeButton={false}
          render={
            <Link
              href="/admin/courses"
              aria-label="Back to courses"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />

        <div>
          <h1 className="text-3xl font-bold">
            Edit Course
          </h1>

          <p className="text-muted-foreground">
            Update {course.title}.
          </p>
        </div>
      </div>

      <EditCourseForm course={course} />
    </div>
  );
}