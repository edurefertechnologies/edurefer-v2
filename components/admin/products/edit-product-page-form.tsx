"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ProductForm from "./product-form";
import { updateProduct } from "@/actions/admin/products/update-product";
import type {
  CreateProductInput,
  CreateProductOutput,
} from "@/schemas/admin/product";

interface EditProductPageFormProps {
  productId: string;
  defaultValues: Partial<CreateProductInput>;
}

export default function EditProductPageForm({
  productId,
  defaultValues,
}: EditProductPageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: CreateProductOutput) {
    try {
      setLoading(true);

      const result = await updateProduct(
        productId,
        values
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE_PRODUCT_CLIENT_ERROR:",
        error
      );

      toast.error(
        "Something went wrong while updating the product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      loading={loading}
      mode="edit"
    />
  );
}