import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import CreateProductPageForm from "@/components/admin/products/create-product-page-form";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            nativeButton={false}
            render={
              <Link
                href="/admin/products"
                aria-label="Back to products"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            }
          />

          <div>
            <h1 className="text-3xl font-bold">
              Create Product
            </h1>

            <p className="text-muted-foreground">
              Add a new product to Edurefer.
            </p>
          </div>
        </div>
      </div>

      <CreateProductPageForm />
    </div>
  );
}