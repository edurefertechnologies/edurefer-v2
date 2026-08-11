"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function deletePackage(
  packageId: string
) {
  try {
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

    await prisma.package.update({
      where: {
        id: packageId,
      },
      data: {
        status: "ARCHIVED",
        isFeatured: false,
      },
    });

    revalidatePath("/admin/packages");
    revalidatePath("/pricing");
    revalidatePath("/");

    return {
      success: true,
      message:
        "Package archived successfully.",
    };
  } catch (error) {
    console.error(
      "DELETE_PACKAGE_ERROR:",
      error
    );

    return {
      success: false,
      message:
        "Failed to archive package.",
    };
  }
}