"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createProductSchema } from "@/schemas/admin/product";

export async function updateProduct(
  productId: string,
  values: unknown
) {
  try {
    const result = createProductSchema.safeParse(values);

    if (!result.success) {
      return {
        success: false,
        message: "Please check the entered product details.",
      };
    }

    const data = result.data;

    // Make sure product exists
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    // Check whether another product already uses this slug
    const existingProduct = await prisma.product.findFirst({
      where: {
        slug: data.slug,
        id: {
          not: productId,
        },
      },
    });

    if (existingProduct) {
      return {
        success: false,
        message: "A product with this slug already exists.",
      };
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: data.name,
        slug: data.slug,

        description:
          data.description || null,

        shortDescription:
          data.shortDescription || null,

        thumbnail:
          data.thumbnail || null,

        price: data.price,

        credits:
          data.type === "AI_CREDITS"
            ? data.credits ?? null
            : null,

        discountPrice:
          data.discountPrice &&
            data.discountPrice > 0
            ? data.discountPrice
            : null,

        type: data.type,
        status: data.status,
        isFeatured: data.isFeatured,

        // Set date when publishing for the first time.
        // Keep existing publishedAt if already published.
        publishedAt:
          data.status === "PUBLISHED"
            ? product.publishedAt ?? new Date()
            : null,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(
      `/admin/products/${productId}/edit`
    );
    revalidatePath("/courses");

    return {
      success: true,
      message: "Product updated successfully.",
    };
  } catch (error) {
    console.error("UPDATE_PRODUCT_ERROR:", error);

    return {
      success: false,
      message: "Failed to update product.",
    };
  }
}