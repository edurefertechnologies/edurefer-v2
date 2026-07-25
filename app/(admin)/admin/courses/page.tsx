import Link from "next/link";
import {
  BookOpen,
  Layers,
  Plus,
  Users,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCourses } from "@/actions/admin/courses/get-courses";
import CourseActions from "@/components/admin/courses/course-actions";

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Courses
          </h1>

          <p className="text-muted-foreground">
            Manage courses, curriculum and student enrollments.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Link>
          }
        />
      </div>

      {/* Empty State */}
      {courses.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <BookOpen className="h-7 w-7" />
          </div>

          <h2 className="text-lg font-semibold">
            No courses yet
          </h2>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Create a course from an existing COURSE product
            to start building its curriculum.
          </p>
        </div>
      ) : (
        /* Courses Table */
        <div className="overflow-hidden rounded-xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">
                    Course
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Level
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Modules
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Students
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Price
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course: any) => (
                  <tr
                    key={course.id}
                    className="border-b last:border-b-0"
                  >
                    {/* Course */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <BookOpen className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {course.title}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {course.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Level */}
                    <td className="px-4 py-4">
                      {course.level ?? "—"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
                        {course.status}
                      </span>
                    </td>

                    {/* Modules */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-muted-foreground" />

                        {course._count.modules}
                      </div>
                    </td>

                    {/* Students */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />

                        {course._count.enrollments}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4">
                      ₹
                      {course.product.discountPrice ??
                        course.product.price}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <CourseActions
                        courseId={course.id}
                        courseTitle={course.title}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}