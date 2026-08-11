"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Package, Search } from "lucide-react";

import {
  createPackageSchema,
  type CreatePackageInput,
  type CreatePackageOutput,
} from "@/schemas/admin/package";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductOption {
  id: string;
  name: string;
  type: "PDF" | "COURSE" | "AI_CREDITS";
  price: number;
  discountPrice: number | null;
}

interface PackageFormProps {
  products: ProductOption[];
  onSubmit: (values: CreatePackageOutput) => Promise<void>;
  loading?: boolean;

  initialData?: Partial<CreatePackageOutput>;
}

export default function PackageForm({
  products,
  onSubmit,
  loading = false,
  initialData,
}: PackageFormProps) {
  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePackageInput, any, CreatePackageOutput>({
    resolver: zodResolver(createPackageSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      description: initialData?.description ?? "",
      shortDescription:
        initialData?.shortDescription ?? "",
      price: initialData?.price ?? 0,
      discountPrice:
        initialData?.discountPrice ?? null,
      thumbnail:
        initialData?.thumbnail ?? null,
      status:
        initialData?.status ?? "DRAFT",
      isFeatured:
        initialData?.isFeatured ?? false,
      items:
        initialData?.items ?? [],
    },
  });

  const selectedItems = watch("items") || [];

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.type
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  function toggleProduct(productId: string) {
    const exists = selectedItems.some(
      (item) => item.productId === productId
    );

    if (exists) {
      setValue(
        "items",
        selectedItems.filter(
          (item) => item.productId !== productId
        ),
        { shouldValidate: true }
      );
    } else {
      setValue(
        "items",
        [
          ...selectedItems,
          {
            productId,
            quantity: 1,
          },
        ],
        { shouldValidate: true }
      );
    }
  }

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Basic Information */}

      <div className="rounded-2xl border bg-background p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Package className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">
              Package Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Enter the basic package details.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Name */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Package Name
            </label>

            <Input
              {...register("name")}
              placeholder="Career Bundle"
              onChange={(event) => {
                register("name").onChange(event);

                setValue(
                  "slug",
                  generateSlug(event.target.value)
                );
              }}
            />

            {errors.name && (
              <p className="text-xs text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Slug */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Slug
            </label>

            <Input
              {...register("slug")}
              placeholder="career-bundle"
            />

            {errors.slug && (
              <p className="text-xs text-destructive">
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* Short Description */}

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">
              Short Description
            </label>

            <Input
              {...register("shortDescription")}
              placeholder="Complete career-ready learning bundle"
            />
          </div>

          {/* Description */}

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <Textarea
              {...register("description")}
              placeholder="Describe what this package includes..."
              rows={5}
            />
          </div>

        </div>
      </div>

      {/* Pricing */}

      <div className="rounded-2xl border bg-background p-6">
        <h2 className="mb-6 font-semibold">
          Pricing
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Original Price
            </label>

            <Input
              type="number"
              min="1"
              step="0.01"
              {...register("price", {
                valueAsNumber: true,
              })}
              placeholder="6500"
            />

            {errors.price && (
              <p className="text-xs text-destructive">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Discount Price
            </label>

            <Input
              type="number"
              min="0"
              step="0.01"
              {...register("discountPrice", {
                setValueAs: (value) =>
                  value === ""
                    ? null
                    : Number(value),
              })}
              placeholder="5500"
            />

            {errors.discountPrice && (
              <p className="text-xs text-destructive">
                {errors.discountPrice.message}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Products */}

      <div className="rounded-2xl border bg-background p-6">

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">
              Package Products
            </h2>

            <p className="text-sm text-muted-foreground">
              Select products included in this package.
            </p>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {selectedItems.length} Selected
          </span>
        </div>

        {/* Search */}

        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            className="pl-9"
          />
        </div>

        {/* Product List */}

        <div className="grid gap-3 md:grid-cols-2">

          {filteredProducts.map((product) => {
            const selected =
              selectedItems.some(
                (item) =>
                  item.productId === product.id
              );

            return (
              <button
                key={product.id}
                type="button"
                onClick={() =>
                  toggleProduct(product.id)
                }
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${selected
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted/50"
                  }`}
              >
                <div className="min-w-0">

                  <p className="truncate font-medium">
                    {product.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      {product.type}
                    </span>

                    <span>•</span>

                    <span>
                      ₹
                      {(
                        product.discountPrice ??
                        product.price
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>

                </div>

                <div
                  className={`ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30"
                    }`}
                >
                  {selected && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              </button>
            );
          })}

        </div>

        {filteredProducts.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No products found.
          </p>
        )}

        {errors.items && (
          <p className="mt-3 text-xs text-destructive">
            {errors.items.message}
          </p>
        )}
      </div>

      {/* Settings */}

      <div className="rounded-2xl border bg-background p-6">

        <h2 className="mb-6 font-semibold">
          Package Settings
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Status */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Status
            </label>

            <select
              {...register("status")}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
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

          {/* Featured */}

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="h-4 w-4"
            />

            <div>
              <p className="text-sm font-medium">
                Featured Package
              </p>

              <p className="text-xs text-muted-foreground">
                Highlight this package on the pricing page.
              </p>
            </div>
          </label>

        </div>
      </div>

      {/* Submit */}

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() =>
            window.history.back()
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Package"}
        </Button>

      </div>

    </form>
  );
}