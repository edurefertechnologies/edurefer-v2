import Image from "next/image";
import Link from "next/link";

import {
  Bookmark,
  BookOpen,
  Clock3,
  Users,
} from "lucide-react";

import { getSavedCourses } from "@/actions/courses/get-saved-courses";
import SaveCourseButton from "@/components/courses/save-course-button";

export default async function SavedCoursesPage() {
  const savedCourses =
    await getSavedCourses();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Saved Courses
        </h1>

        <p className="mt-2 text-muted-foreground">
          Courses you've saved for later.
        </p>
      </div>

      {savedCourses.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-card p-6 text-center">
          <div className="rounded-full bg-muted p-4">
            <Bookmark className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No saved courses
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Save courses you're interested in and
            they'll appear here.
          </p>

          <Link
            href="/courses"
            className="mt-5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {savedCourses.map((saved: any) => {
            const course = saved.course;

            const originalPrice =
              Number(course.product.price);

            const discountPrice =
              course.product.discountPrice
                ? Number(
                    course.product.discountPrice
                  )
                : null;

            const sellingPrice =
              discountPrice &&
              discountPrice > 0 &&
              discountPrice < originalPrice
                ? discountPrice
                : originalPrice;

            return (
              <article
                key={saved.id}
                className="overflow-hidden rounded-2xl border bg-card"
              >
                <Link
                  href={`/courses/${course.slug}`}
                  className="block"
                >
                  <Image
                    src={
                      course.thumbnail ||
                      "/courses/fullstack.jpg"
                    }
                    alt={course.title}
                    width={600}
                    height={350}
                    className="aspect-video w-full object-cover"
                  />
                </Link>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {course.level ??
                        "Course"}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {
                        course._count
                          .reviews
                      }{" "}
                      Reviews
                    </span>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                  >
                    <h2 className="mt-4 line-clamp-2 text-lg font-semibold transition hover:text-primary">
                      {course.title}
                    </h2>
                  </Link>

                  {course.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {course.description}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" />

                      <span>
                        {course.duration ||
                          "Self-paced"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />

                      <span>
                        {
                          course._count
                            .enrollments
                        }{" "}
                        Students
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-2xl font-bold text-primary">
                      ₹
                      {sellingPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {sellingPrice <
                      originalPrice && (
                      <span className="pb-1 text-sm text-muted-foreground line-through">
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Course
                    </Link>

                    <SaveCourseButton
                      courseId={course.id}
                      initialSaved={true}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}