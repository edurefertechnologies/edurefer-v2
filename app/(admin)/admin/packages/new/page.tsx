import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

import { getProducts } from "@/actions/admin/products/get-products";
import CreatePackagePageForm from "@/components/admin/packages/create-package-page-form";

export default async function NewPackagePage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center gap-4">

        <Link
          href="/admin/packages"
          className="flex h-10 w-10 items-center justify-center rounded-lg border transition hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div>

          <div className="flex items-center gap-2">

            <Package className="h-6 w-6 text-primary" />

            <h1 className="text-2xl font-bold">
              Create Package
            </h1>

          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Create a bundle using your existing products.
          </p>

        </div>

      </div>

      {/* Form */}

      <CreatePackagePageForm
        products={products}
      />

    </div>
  );
}