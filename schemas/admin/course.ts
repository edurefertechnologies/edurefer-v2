import { z } from "zod";

export const createCourseSchema = z.object({
  productId: z
    .string()
    .min(1, "Please select a course product."),

  title: z
    .string()
    .min(3, "Course title must be at least 3 characters."),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters."),

  description: z
    .string()
    .optional(),

  level: z
    .enum([
      "BEGINNER",
      "INTERMEDIATE",
      "ADVANCED",
    ])
    .nullable()
    .optional(),

  duration: z
    .string()
    .optional(),

  thumbnail: z
    .string()
    .nullable()
    .optional(),

  status: z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]),
});

export type CreateCourseInput =
  z.input<typeof createCourseSchema>;

export type CreateCourseOutput =
  z.output<typeof createCourseSchema>;