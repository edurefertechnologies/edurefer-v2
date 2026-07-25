"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/shared/image-upload";

import { updateCourse } from "@/actions/admin/courses/update-course";

type Course = {
  id: string;
  productId: string;
  title: string;
  slug: string;
  description: string | null;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | null;
  duration: string | null;
  thumbnail: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";

  product: {
    id: string;
    name: string;
    price: number;
    discountPrice: number | null;
  };
};

interface Props {
  course: Course;
}

export default function EditCourseForm({
  course,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(course.title);
  const [slug, setSlug] = useState(course.slug);
  const [description, setDescription] = useState(
    course.description ?? ""
  );

  const [level, setLevel] = useState<
    "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | ""
  >(course.level ?? "");

  const [duration, setDuration] = useState(
    course.duration ?? ""
  );

  const [thumbnail, setThumbnail] = useState<string | null>(
    course.thumbnail
  );

  const [status, setStatus] = useState<
    "DRAFT" | "PUBLISHED" | "ARCHIVED"
  >(course.status);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setLoading(true);

      const result = await updateCourse(
        course.id,
        {
          productId: course.productId,
          title,
          slug,
          description,

          level:
            level === ""
              ? null
              : level,

          duration,
          thumbnail,
          status,
        }
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/admin/courses");
      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE_COURSE_CLIENT_ERROR:",
        error
      );

      toast.error(
        "Something went wrong while updating the course."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Course Product */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-6 py-5">
          <h2 className="font-semibold">
            Course Product
          </h2>

          <p className="text-sm text-muted-foreground">
            The product connected to this course.
          </p>
        </div>

        <div className="p-6">
          <Input
            value={course.product.name}
            disabled
          />

          <p className="mt-2 text-xs text-muted-foreground">
            The connected product cannot be changed after
            the course is created.
          </p>
        </div>
      </section>

      {/* Basic Information */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-6 py-5">
          <h2 className="font-semibold">
            Course Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Update the main course information.
          </p>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Course Title
              </label>

              <Input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Slug
              </label>

              <Input
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={5}
              disabled={loading}
              className="flex w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </section>

      {/* Settings + Thumbnail */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border bg-background">
          <div className="border-b px-6 py-5">
            <h2 className="font-semibold">
              Course Settings
            </h2>

            <p className="text-sm text-muted-foreground">
              Configure level, duration and status.
            </p>
          </div>

          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Level
              </label>

              <select
                value={level}
                onChange={(e) =>
                  setLevel(
                    e.target.value as
                      | "BEGINNER"
                      | "INTERMEDIATE"
                      | "ADVANCED"
                      | ""
                  )
                }
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">
                  Select level
                </option>

                <option value="BEGINNER">
                  Beginner
                </option>

                <option value="INTERMEDIATE">
                  Intermediate
                </option>

                <option value="ADVANCED">
                  Advanced
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Duration
              </label>

              <Input
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
                placeholder="e.g. 20 Hours"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | "DRAFT"
                      | "PUBLISHED"
                      | "ARCHIVED"
                  )
                }
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="DRAFT">
                  Draft
                </option>

                <option value="PUBLISHED">
                  Published
                </option>

                <option value="ARCHIVED">
                  Archived
                </option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-background">
          <div className="border-b px-6 py-5">
            <h2 className="font-semibold">
              Course Thumbnail
            </h2>

            <p className="text-sm text-muted-foreground">
              Update the course thumbnail.
            </p>
          </div>

          <div className="p-6">
            <ImageUpload
              value={thumbnail}
              onChange={(url) =>
                setThumbnail(url || null)
              }
            />
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() =>
            router.push("/admin/courses")
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={
            loading ||
            title.trim().length < 3 ||
            slug.trim().length < 3
          }
        >
          {loading
            ? "Saving Changes..."
            : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}