import { getProducts } from "@/actions/admin/products/get-products";
import ProductsTable from "@/components/admin/products/products-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-muted-foreground">
            Manage all products.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Product
            </Link>
          }
        />
      </div>

      <ProductsTable products={products} />
    </div>
  );
}