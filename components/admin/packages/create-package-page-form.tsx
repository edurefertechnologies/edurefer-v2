"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PackageForm from "./package-form";
import { createPackage } from "@/actions/admin/packages/create-package";
import type { CreatePackageOutput } from "@/schemas/admin/package";

interface ProductOption {
  id: string;
  name: string;
  type: "PDF" | "COURSE" | "AI_CREDITS";
  price: number;
  discountPrice: number | null;
}

interface CreatePackagePageFormProps {
  products: ProductOption[];
}

export default function CreatePackagePageForm({
  products,
}: CreatePackagePageFormProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    values: CreatePackageOutput
  ) {
    try {
      setLoading(true);

      const result =
        await createPackage(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/admin/packages");
      router.refresh();
    } catch (error) {
      console.error(
        "CREATE_PACKAGE_PAGE_ERROR:",
        error
      );

      toast.error(
        "Something went wrong while creating the package."
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
    />
  );
}