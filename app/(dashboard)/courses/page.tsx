import Image from "next/image";
import Link from "next/link";

import {
  BookOpen,
  Clock,
  GraduationCap,
  Layers,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPublishedCourses } from "@/actions/admin/courses/get-published-courses";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Explore Courses
        </h1>

        <p className="mt-2 text-muted-foreground">
          Learn new skills with structured courses designed
          to help you grow.
        </p>
      </div>

      {/* Empty State */}
      {courses.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <BookOpen className="h-7 w-7" />
          </div>

          <h2 className="text-lg font-semibold">
            No courses available
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Published courses will appear here once they
            become available.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course: any) => {
            const thumbnail =
              course.thumbnail ??
              course.product.thumbnail;

            const lessonCount =
              course.modules.reduce(
                (total: number, module: any) =>
                  total + module.lessons.length,
                0
              );

            const price = Number(course.product.price);

            const discountPrice =
              course.product.discountPrice !== null
                ? Number(course.product.discountPrice)
                : null;

            const hasDiscount =
              discountPrice !== null &&
              discountPrice > 0 &&
              discountPrice < price;

            return (
              <article
                key={course.id}
                className="group overflow-hidden rounded-xl border bg-background transition-shadow hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="space-y-4 p-5">
                  {/* Level */}
                  {course.level && (
                    <span className="inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
                      {course.level}
                    </span>
                  )}

                  {/* Title */}
                  <div>
                    <h2 className="line-clamp-2 text-lg font-semibold">
                      {course.title}
                    </h2>

                    {course.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {course.description}
                      </p>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                    {course.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      <span>
                        {course._count.modules} Modules
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>
                        {lessonCount} Lessons
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {course._count.enrollments} Students
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="border-t pt-4">
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">
                        ₹
                        {hasDiscount
                          ? discountPrice
                          : price}
                      </span>

                      {hasDiscount && (
                        <span className="pb-1 text-sm text-muted-foreground line-through">
                          ₹{price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View */}
                  <Button
                    className="w-full"
                    nativeButton={false}
                    render={
                      <Link
                        href={`/courses/${course.slug}`}
                      >
                        View Course
                      </Link>
                    }
                  />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}