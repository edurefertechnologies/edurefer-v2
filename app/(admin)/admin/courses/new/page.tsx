import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAvailableCourseProducts } from "@/actions/admin/courses/get-available-course-products";
import CreateCoursePageForm from "@/components/admin/courses/create-course-page-form";

export default async function NewCoursePage() {
  const products = await getAvailableCourseProducts();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
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
            Create Course
          </h1>

          <p className="text-muted-foreground">
            Create a course from an existing course product.
          </p>
        </div>
      </div>

      {/* No available course products */}
      {products.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <BookOpen className="h-7 w-7" />
          </div>

          <h2 className="text-lg font-semibold">
            No course products available
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Create a product with the type Course first,
            or all existing course products are already
            connected to courses.
          </p>

          <Button
            className="mt-5"
            nativeButton={false}
            render={
              <Link href="/admin/products/new">
                Create Course Product
              </Link>
            }
          />
        </div>
      ) : (
        <CreateCoursePageForm products={products} />
      )}
    </div>
  );
}