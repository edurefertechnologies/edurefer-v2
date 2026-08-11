"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, IndianRupee, Package, Save } from "lucide-react";

import {
  createProductSchema,
  CreateProductInput,
  CreateProductOutput,
} from "@/schemas/admin/product";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/shared/image-upload";

interface ProductFormProps {
  defaultValues?: Partial<CreateProductInput>;
  onSubmit: (values: CreateProductOutput) => Promise<void>;
  loading?: boolean;
  mode?: "create" | "edit";
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  loading = false,
  mode = "create",
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
      thumbnail: null,
      type: "COURSE",
      status: "DRAFT",
      isFeatured: false,
      ...defaultValues,
    },
  });

  const productName = form.watch("name");

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
      className="space-y-6"
    >
      {/* Basic Information */}
      <section className="rounded-xl border bg-background">
        <div className="flex items-center gap-3 border-b px-6 py-5">
          <div className="rounded-lg bg-muted p-2">
            <Package className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold">
              Basic Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter the main details of your product.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-5 md:grid-cols-2">
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

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Slug
              </label>

              <Input
                placeholder="full-stack-web-development"
                {...form.register("slug")}
              />

              <p className="text-xs text-muted-foreground">
                Automatically generated from product name.
              </p>

              {form.formState.errors.slug && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.slug.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Short Description
            </label>

            <textarea
              {...form.register("shortDescription")}
              placeholder="A short summary shown in product cards."
              rows={2}
              className="flex w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              {...form.register("description")}
              placeholder="Write a detailed description of the product..."
              rows={5}
              className="flex w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </section>

      {/* Pricing + Thumbnail */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border bg-background">
          <div className="flex items-center gap-3 border-b px-6 py-5">
            <div className="rounded-lg bg-muted p-2">
              <IndianRupee className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                Pricing
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure product pricing.
              </p>
            </div>
          </div>

          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Regular Price (₹)
              </label>

              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="4999"
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

              <p className="text-xs text-muted-foreground">
                Leave empty if there is no discount.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-background">
          <div className="flex items-center gap-3 border-b px-6 py-5">
            <div className="rounded-lg bg-muted p-2">
              <ImageIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                Product Thumbnail
              </h2>
              <p className="text-sm text-muted-foreground">
                Upload the product cover image.
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

            {form.formState.errors.thumbnail && (
              <p className="mt-2 text-sm text-destructive">
                {form.formState.errors.thumbnail.message}
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Product Settings */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-6 py-5">
          <h2 className="font-semibold">
            Product Settings
          </h2>

          <p className="text-sm text-muted-foreground">
            Configure the product type, visibility and status.
          </p>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Product Type
              </label>

              <select
                {...form.register("type")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="PACKAGE">
                  Package / Bundle
                </option>

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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/40">
            <input
              type="checkbox"
              {...form.register("isFeatured")}
              className="mt-1 h-4 w-4"
            />

            <div>
              <p className="text-sm font-medium">
                Featured Product
              </p>

              <p className="text-xs text-muted-foreground">
                Highlight this product in featured sections
                across the platform.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <Link href="/admin/products">
              Cancel
            </Link>
          }
        />

        <Button
          type="submit"
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />

          {loading
            ? mode === "edit"
              ? "Updating Product..."
              : "Creating Product..."
            : mode === "edit"
              ? "Update Product"
              : "Create Product"}
        </Button>
      </div>
    </form>
  );
}