import { z } from "zod";

export const createPackageSchema = z.object({
  name: z
    .string()
    .min(3, "Package name must be at least 3 characters"),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters"),

  description: z
    .string()
    .optional(),

  shortDescription: z
    .string()
    .optional(),

  price: z.coerce
    .number()
    .positive("Price must be greater than 0"),

  discountPrice: z
    .coerce
    .number()
    .positive()
    .nullable()
    .optional(),

  thumbnail: z
    .string()
    .url("Invalid thumbnail URL")
    .nullable()
    .optional(),

  status: z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]),

  isFeatured: z.boolean(),

  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z
          .number()
          .int()
          .positive(),
      })
    )
    .min(1, "Select at least one product"),
});

export type CreatePackageInput =
  z.input<typeof createPackageSchema>;

export type CreatePackageOutput =
  z.output<typeof createPackageSchema>;