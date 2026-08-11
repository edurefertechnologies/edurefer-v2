import Link from "next/link";
import { Plus, Package } from "lucide-react";

import { getPackages } from "@/actions/admin/packages/get-packages";
import PackagesTable from "@/components/admin/packages/packages-table";
import { Button } from "@/components/ui/button";

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between gap-4">

        <div>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />

            <h1 className="text-2xl font-bold">
              Packages
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage learning packages and bundles.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link href="/admin/packages/new">
              <Plus className="mr-2 h-4 w-4" />
              New Package
            </Link>
          }
        />

      </div>

      {/* Table */}

      <PackagesTable packages={packages} />

    </div>
  );
}