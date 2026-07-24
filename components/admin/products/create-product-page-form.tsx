"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ProductForm from "./product-form";
import { createProduct } from "@/actions/admin/products/create-product";
import type { CreateProductOutput } from "@/schemas/admin/product";

export default function CreateProductPageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: CreateProductOutput) {
    try {
      setLoading(true);

      const result = await createProduct(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("CREATE_PRODUCT_PAGE_ERROR:", error);

      toast.error(
        "Something went wrong while creating the product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductForm
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}