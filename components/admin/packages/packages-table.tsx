"use client";

import Link from "next/link";
import {
  Package,
} from "lucide-react";

import PackageActions from "./package-actions";

interface PackageItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    type: string;
  };
}

interface PackageData {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  status: string;
  isFeatured: boolean;
  items: PackageItem[];
}

interface PackagesTableProps {
  packages: PackageData[];
}

export default function PackagesTable({
  packages,
}: PackagesTableProps) {
  if (packages.length === 0) {
    return (
      <div className="rounded-xl border bg-background p-12 text-center">
        <Package className="mx-auto h-10 w-10 text-muted-foreground" />

        <h3 className="mt-4 font-semibold">
          No packages found
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your first learning package.
        </p>

        <Link
          href="/admin/packages/new"
          className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Create Package
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="border-b bg-muted/40">

            <tr>
              <th className="px-6 py-4 text-left font-medium">
                Package
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Products
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Price
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Status
              </th>

              <th className="px-6 py-4 text-right font-medium">
                Action
              </th>
            </tr>

          </thead>

          <tbody className="divide-y">

            {packages.map((pkg) => (
              <tr
                key={pkg.id}
                className="transition-colors hover:bg-muted/30"
              >

                <td className="px-6 py-4">

                  <div>
                    <p className="font-medium">
                      {pkg.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      /{pkg.slug}
                    </p>

                    {pkg.isFeatured && (
                      <span className="mt-1 inline-block text-xs font-medium text-primary">
                        Featured
                      </span>
                    )}
                  </div>

                </td>

                <td className="px-6 py-4">

                  <div className="space-y-1">

                    <p className="font-medium">
                      {pkg.items.length} product
                      {pkg.items.length !== 1
                        ? "s"
                        : ""}
                    </p>

                    <p className="max-w-xs truncate text-xs text-muted-foreground">
                      {pkg.items
                        .map(
                          (item) =>
                            item.product.name
                        )
                        .join(", ")}
                    </p>

                  </div>

                </td>

                <td className="px-6 py-4">

                  <div>
                    <p className="font-semibold">
                      ₹
                      {(
                        pkg.discountPrice ??
                        pkg.price
                      ).toLocaleString("en-IN")}
                    </p>

                    {pkg.discountPrice && (
                      <p className="text-xs text-muted-foreground line-through">
                        ₹
                        {pkg.price.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    )}
                  </div>

                </td>

                <td className="px-6 py-4">

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${pkg.status ===
                      "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : pkg.status ===
                        "ARCHIVED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {pkg.status}
                  </span>

                </td>

                <td className="px-6 py-4 text-right">

                  <PackageActions packageId={pkg.id} />

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}