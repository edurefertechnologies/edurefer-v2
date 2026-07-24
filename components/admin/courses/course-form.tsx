"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, ImageIcon, Settings } from "lucide-react";

import {
  createCourseSchema,
  CreateCourseInput,
  CreateCourseOutput,
} from "@/schemas/admin/course";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/shared/image-upload";

type CourseProduct = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string | null;
  price: number;
  discountPrice: number | null;
};

interface CourseFormProps {
  products: CourseProduct[];
  onSubmit: (values: CreateCourseOutput) => Promise<void>;
  loading?: boolean;
}

export default function CourseForm({
  products,
  onSubmit,
  loading = false,
}: CourseFormProps) {
  const form = useForm<
    CreateCourseInput,
    unknown,
    CreateCourseOutput
  >({
    resolver: zodResolver(createCourseSchema),

    defaultValues: {
      productId: "",
      title: "",
      slug: "",
      description: "",
      level: null,
      duration: "",
      thumbnail: null,
      status: "DRAFT",
    },
  });

  const title = form.watch("title");
  const productId = form.watch("productId");

  // Auto-generate slug
  useEffect(() => {
    const slug = String(title ?? "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    form.setValue("slug", slug, {
      shouldValidate: true,
    });
  }, [title, form]);

  // Auto-fill details from selected product
  useEffect(() => {
    if (!productId) return;

    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) return;

    form.setValue("title", product.name, {
      shouldDirty: true,
      shouldValidate: true,
    });

    form.setValue(
      "thumbnail",
      product.thumbnail ?? null,
      {
        shouldDirty: true,
      }
    );
  }, [productId, products, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Course Information */}
      <section className="rounded-xl border bg-background">
        <div className="flex items-center gap-3 border-b px-6 py-5">
          <div className="rounded-lg bg-muted p-2">
            <BookOpen className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold">
              Course Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Configure the main details of this course.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          {/* Product */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Course Product
            </label>

            <select
              {...form.register("productId")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">
                Select a course product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name} — ₹
                  {product.discountPrice ??
                    product.price}
                </option>
              ))}
            </select>

            {form.formState.errors.productId && (
              <p className="text-sm text-destructive">
                {
                  form.formState.errors.productId
                    .message
                }
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Course Title
              </label>

              <Input
                placeholder="AI Tools and Prompts"
                {...form.register("title")}
              />

              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {
                    form.formState.errors.title
                      .message
                  }
                </p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Slug
              </label>

              <Input
                placeholder="ai-tools-and-prompts"
                {...form.register("slug")}
              />

              {form.formState.errors.slug && (
                <p className="text-sm text-destructive">
                  {
                    form.formState.errors.slug
                      .message
                  }
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              {...form.register("description")}
              placeholder="Describe what students will learn in this course..."
              rows={5}
              className="flex w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course Settings */}
        <section className="rounded-xl border bg-background">
          <div className="flex items-center gap-3 border-b px-6 py-5">
            <div className="rounded-lg bg-muted p-2">
              <Settings className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                Course Settings
              </h2>

              <p className="text-sm text-muted-foreground">
                Level, duration and publication status.
              </p>
            </div>
          </div>

          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Level
              </label>

              <select
                {...form.register("level", {
                  setValueAs: (value) =>
                    value === "" ? null : value,
                })}
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
                placeholder="e.g. 8 Weeks / 40 Hours"
                {...form.register("duration")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Status
              </label>

              <select
                {...form.register("status")}
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

        {/* Thumbnail */}
        <section className="rounded-xl border bg-background">
          <div className="flex items-center gap-3 border-b px-6 py-5">
            <div className="rounded-lg bg-muted p-2">
              <ImageIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                Course Thumbnail
              </h2>

              <p className="text-sm text-muted-foreground">
                Uses the product thumbnail by default.
              </p>
            </div>
          </div>

          <div className="p-6">
            <ImageUpload
              value={form.watch("thumbnail")}
              onChange={(url) => {
                form.setValue(
                  "thumbnail",
                  url || null,
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  }
                );
              }}
            />
          </div>
        </section>
      </div>

      {/* Submit */}
      <div className="flex justify-end border-t pt-6">
        <Button
          type="submit"
          disabled={loading}
        >
          <BookOpen className="mr-2 h-4 w-4" />

          {loading
            ? "Creating Course..."
            : "Create Course"}
        </Button>
      </div>
    </form>
  );
}