import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getFeaturedCourses } from "@/actions/public/get-featured-courses";

export default async function Courses() {
  const courses = await getFeaturedCourses();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container-custom">

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Popular Learning Paths
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Learn Skills That Companies Need
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Practical courses built with projects, AI assistance and career-focused learning.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {courses.map((course: any) => (
            <div
              key={course.id}
              className="relative rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {course.product.thumbnail ? (
                <img
                  src={course.product.thumbnail}
                  alt={course.title}
                  className="mb-6 h-48 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="mb-6 flex h-48 items-center justify-center rounded-xl bg-muted">
                  <span className="text-muted-foreground">
                    No Image
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold">
                {course.title}
              </h3>

              <p className="mt-4 line-clamp-3 text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-8 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />

                  {course.duration ?? "Self Paced"}
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />

                  {course.level ?? "Beginner"}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">

                <div>
                  {course.product.discountPrice ? (
                    <div className="flex items-center gap-2">

                      <span className="text-3xl font-bold">
                        ₹{course.product.discountPrice}
                      </span>

                      <span className="text-sm text-muted-foreground line-through">
                        ₹{course.product.price}
                      </span>

                    </div>
                  ) : (
                    <span className="text-3xl font-bold">
                      ₹{course.product.price}
                    </span>
                  )}
                </div>

                <Link href={`/courses/${course.slug}`}>
                  <Button>
                    View
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

              </div>

            </div>
          ))}

        </div>

        <div className="mt-14 text-center">

          <Link href="/courses">
            <Button
              size="lg"
              variant="outline"
            >
              View All Courses

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

        </div>

      </div>
    </section>
  );
}