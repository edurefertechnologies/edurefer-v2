import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters"),

  slug: z
    .string()
    .min(3),

  description: z.string().optional(),

  shortDescription: z.string().optional(),

  price: z.coerce
    .number()
    .positive(),

  discountPrice: z.coerce
    .number()
    .nullable()
    .optional(),

  thumbnail: z
    .string()
    .url("Invalid thumbnail URL")
    .nullable()
    .optional(),

  type: z.enum([
    "PDF",
    "COURSE",
    "AI_CREDITS",
  ]),

  status: z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]),

  isFeatured: z.boolean(),
});

export type CreateProductInput =
  z.input<typeof createProductSchema>;

export type CreateProductOutput =
  z.output<typeof createProductSchema>;