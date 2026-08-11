"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PackageForm from "./package-form";
import type { CreatePackageOutput } from "@/schemas/admin/package";
import { updatePackage } from "@/actions/admin/packages/update-package";

interface ProductOption {
  id: string;
  name: string;
  type: "PDF" | "COURSE" | "AI_CREDITS";
  price: number;
  discountPrice: number | null;
}

interface PackageData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  discountPrice: number | null;
  thumbnail: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  isFeatured: boolean;
  items: {
    productId: string;
    quantity: number;
  }[];
}

interface Props {
  packageData: PackageData;
  products: ProductOption[];
}

export default function EditPackagePageForm({
  packageData,
  products,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: CreatePackageOutput
  ) {
    try {
      setLoading(true);

      const result = await updatePackage(
        packageData.id,
        values
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        "Package updated successfully."
      );

      router.push("/admin/packages");
      router.refresh();
    } catch (error) {
      console.error(
        "EDIT_PACKAGE_ERROR:",
        error
      );

      toast.error(
        "Failed to update package."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PackageForm
      products={products}
      onSubmit={handleSubmit}
      loading={loading}
      initialData={{
        name: packageData.name,
        slug: packageData.slug,
        description:
          packageData.description ?? "",
        shortDescription:
          packageData.shortDescription ?? "",
        price: packageData.price,
        discountPrice:
          packageData.discountPrice,
        thumbnail:
          packageData.thumbnail,
        status: packageData.status,
        isFeatured:
          packageData.isFeatured,
        items: packageData.items,
      }}
    />
  );
}