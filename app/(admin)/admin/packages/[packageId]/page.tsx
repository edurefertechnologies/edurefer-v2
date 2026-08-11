import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

import { getPackage } from "@/actions/admin/packages/get-package";
import { getProducts } from "@/actions/admin/products/get-products";

import EditPackagePageForm from "@/components/admin/packages/edit-package-page-form";

interface PageProps {
  params: Promise<{
    packageId: string;
  }>;
}

export default async function EditPackagePage({
  params,
}: PageProps) {
  const { packageId } = await params;

  const [packageData, products] =
    await Promise.all([
      getPackage(packageId),
      getProducts(),
    ]);

  if (!packageData) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/packages"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Packages
        </Link>

        <div className="rounded-2xl border bg-background p-12 text-center">
          <Package className="mx-auto h-10 w-10 text-muted-foreground" />

          <h2 className="mt-4 text-xl font-semibold">
            Package not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The package you are trying to edit does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

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
              Edit Package
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Update package details and included products.
          </p>
        </div>

      </div>

      <EditPackagePageForm
        packageData={packageData}
        products={products}
      />

    </div>
  );
}