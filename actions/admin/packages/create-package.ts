"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createPackageSchema } from "@/schemas/admin/package";

export async function createPackage(
  values: unknown
) {
  try {
    const result =
      createPackageSchema.safeParse(values);

    if (!result.success) {
      return {
        success: false,
        message:
          "Please check the package details.",
      };
    }

    const data = result.data;

    const existing =
      await prisma.package.findUnique({
        where: {
          slug: data.slug,
        },
      });

    if (existing) {
      return {
        success: false,
        message:
          "A package with this slug already exists.",
      };
    }

    const productIds = data.items.map(
      (item) => item.productId
    );

    const products =
      await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
          isDeleted: false,
        },
        select: {
          id: true,
        },
      });

    if (
      products.length !==
      productIds.length
    ) {
      return {
        success: false,
        message:
          "One or more selected products are invalid.",
      };
    }

    await prisma.package.create({
      data: {
        name: data.name,
        slug: data.slug,
        description:
          data.description || null,
        shortDescription:
          data.shortDescription || null,
        price: data.price,
        discountPrice:
          data.discountPrice &&
          data.discountPrice > 0
            ? data.discountPrice
            : null,
        thumbnail:
          data.thumbnail || null,
        status: data.status,
        isFeatured: data.isFeatured,
        publishedAt:
          data.status === "PUBLISHED"
            ? new Date()
            : null,

        items: {
          create: data.items.map(
            (item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })
          ),
        },
      },
    });

    revalidatePath("/admin/packages");
    revalidatePath("/pricing");
    revalidatePath("/");

    return {
      success: true,
      message:
        "Package created successfully.",
    };
  } catch (error) {
    console.error(
      "CREATE_PACKAGE_ERROR:",
      error
    );

    return {
      success: false,
      message:
        "Failed to create package.",
    };
  }
}