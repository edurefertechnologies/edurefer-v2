"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type ProductStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export async function updateProductStatus(
  productId: string,
  status: ProductStatus
) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
      },
      select: {
        id: true,
        publishedAt: true,
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        status,

        publishedAt:
          status === "PUBLISHED"
            ? product.publishedAt ?? new Date()
            : status === "DRAFT"
              ? null
              : product.publishedAt,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/courses");

    return {
      success: true,
      message:
        status === "PUBLISHED"
          ? "Product published successfully."
          : status === "DRAFT"
            ? "Product moved to draft."
            : "Product archived successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_PRODUCT_STATUS_ERROR:",
      error
    );

    return {
      success: false,
      message: "Failed to update product status.",
    };
  }
}