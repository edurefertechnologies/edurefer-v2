"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProductSchema,
  CreateProductInput,
  CreateProductOutput,
} from "@/schemas/admin/product";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  defaultValues?: Partial<CreateProductInput>;
  onSubmit: (values: CreateProductOutput) => Promise<void>;
  loading?: boolean;
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  loading = false,
}: ProductFormProps) {
  const form = useForm<
    CreateProductInput,
    unknown,
    CreateProductOutput
  >({
    resolver: zodResolver(createProductSchema),

    defaultValues: {
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      price: 0,
      discountPrice: null,
      type: "COURSE",
      status: "DRAFT",
      isFeatured: false,
      ...defaultValues,
    },
  });

  const productName = form.watch("name");

  // Auto-generate slug from product name
  useEffect(() => {
    if (defaultValues?.slug) return;

    const slug = String(productName ?? "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    form.setValue("slug", slug, {
      shouldValidate: true,
    });
  }, [productName, defaultValues?.slug, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Product Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Product Name
        </label>

        <Input
          placeholder="Full Stack Web Development"
          {...form.register("name")}
        />

        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Slug
        </label>

        <Input
          placeholder="full-stack-web-development"
          {...form.register("slug")}
        />

        {form.formState.errors.slug && (
          <p className="text-sm text-destructive">
            {form.formState.errors.slug.message}
          </p>
        )}
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Short Description
        </label>

        <textarea
          {...form.register("shortDescription")}
          placeholder="Short summary of the product"
          rows={2}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Description
        </label>

        <textarea
          {...form.register("description")}
          placeholder="Detailed product description"
          rows={4}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Price */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Price (₹)
          </label>

          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="49999"
            {...form.register("price", {
              valueAsNumber: true,
            })}
          />

          {form.formState.errors.price && (
            <p className="text-sm text-destructive">
              {form.formState.errors.price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Discount Price (₹)
          </label>

          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="Optional"
            {...form.register("discountPrice", {
              setValueAs: (value) =>
                value === "" ? null : Number(value),
            })}
          />
        </div>
      </div>

      {/* Type + Status */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Product Type
          </label>

          <select
            {...form.register("type")}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="COURSE">
              Course
            </option>

            <option value="PDF">
              PDF / Digital Kit
            </option>

            <option value="AI_CREDITS">
              AI Credits
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Status
          </label>

          <select
            {...form.register("status")}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

      {/* Featured */}
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
        <input
          type="checkbox"
          {...form.register("isFeatured")}
          className="h-4 w-4"
        />

        <div>
          <p className="text-sm font-medium">
            Featured Product
          </p>

          <p className="text-xs text-muted-foreground">
            Highlight this product on the platform.
          </p>
        </div>
      </label>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Product"}
      </Button>
    </form>
  );
}