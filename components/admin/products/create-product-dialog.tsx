"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProductForm from "./product-form";
import { createProduct } from "@/actions/admin/products/create-product";
import type { CreateProductOutput } from "@/schemas/admin/product";

export default function CreateProductDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(values: CreateProductOutput) {
    try {
      setLoading(true);

      const result = await createProduct(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("CREATE_PRODUCT_CLIENT_ERROR:", error);

      toast.error("Something went wrong while creating the product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="
          inline-flex h-9 items-center justify-center gap-2
          rounded-md bg-primary px-4
          text-sm font-medium text-primary-foreground
          transition-colors hover:bg-primary/90
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring
          disabled:pointer-events-none disabled:opacity-50
        "
      >
        <Plus className="h-4 w-4" />
        Create Product
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>

        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}