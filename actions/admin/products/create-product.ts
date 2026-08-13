"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createProductSchema } from "@/schemas/admin/product";

export async function createProduct(values: unknown) {
  try {
    const result = createProductSchema.safeParse(values);

    if (!result.success) {
      return {
        success: false,
        message: "Please check the entered product details.",
      };
    }

    const data = result.data;

    // Check duplicate slug
    const existingProduct = await prisma.product.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingProduct) {
      return {
        success: false,
        message: "A product with this slug already exists.",
      };
    }

    await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        shortDescription: data.shortDescription || null,

        thumbnail: data.thumbnail || null,

        price: data.price,

        credits:
          data.type === "AI_CREDITS"
            ? data.credits ?? null
            : null,

        discountPrice:
          data.discountPrice && data.discountPrice > 0
            ? data.discountPrice
            : null,

        type: data.type,
        status: data.status,
        isFeatured: data.isFeatured,

        publishedAt:
          data.status === "PUBLISHED"
            ? new Date()
            : null,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/courses");

    return {
      success: true,
      message: "Product created successfully.",
    };
  } catch (error) {
    console.error("CREATE_PRODUCT_ERROR:", error);

    return {
      success: false,
      message: "Failed to create product.",
    };
  }
}