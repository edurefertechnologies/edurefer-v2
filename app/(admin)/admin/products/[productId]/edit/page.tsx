import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProduct } from "@/actions/admin/products/get-product";
import EditProductPageForm from "@/components/admin/products/edit-product-page-form";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {
  const { productId } = await params;

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
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
            Edit Product
          </h1>

          <p className="text-muted-foreground">
            Update {product.name}.
          </p>
        </div>
      </div>

      <EditProductPageForm
        productId={product.id}
        defaultValues={{
          name: product.name,
          slug: product.slug,
          description: product.description ?? "",
          shortDescription:
            product.shortDescription ?? "",
          price: product.price,
          discountPrice: product.discountPrice,
          thumbnail: product.thumbnail,
          type: product.type,
          status: product.status,
          isFeatured: product.isFeatured,
        }}
      />
    </div>
  );
}