"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createPackageSchema } from "@/schemas/admin/package";

export async function updatePackage(
  packageId: string,
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
          id: packageId,
        },
      });

    if (!existing) {
      return {
        success: false,
        message: "Package not found.",
      };
    }

    const duplicate =
      await prisma.package.findFirst({
        where: {
          slug: data.slug,
          NOT: {
            id: packageId,
          },
        },
      });

    if (duplicate) {
      return {
        success: false,
        message:
          "Another package already uses this slug.",
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

    await prisma.$transaction(
      async (tx) => {
        await tx.package.update({
          where: {
            id: packageId,
          },
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
            isFeatured:
              data.isFeatured,
            publishedAt:
              data.status === "PUBLISHED"
                ? existing.publishedAt ??
                  new Date()
                : null,
          },
        });

        await tx.packageItem.deleteMany({
          where: {
            packageId,
          },
        });

        await tx.packageItem.createMany({
          data: data.items.map(
            (item) => ({
              packageId,
              productId: item.productId,
              quantity: item.quantity,
            })
          ),
        });
      }
    );

    revalidatePath("/admin/packages");
    revalidatePath(
      `/admin/packages/${packageId}`
    );
    revalidatePath("/pricing");
    revalidatePath("/");

    return {
      success: true,
      message:
        "Package updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_PACKAGE_ERROR:",
      error
    );

    return {
      success: false,
      message:
        "Failed to update package.",
    };
  }
}