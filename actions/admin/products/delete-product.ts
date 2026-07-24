"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteProduct(productId: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
      },
      select: {
        id: true,
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
        isDeleted: true,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/courses");

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE_PRODUCT_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete product.",
    };
  }
}