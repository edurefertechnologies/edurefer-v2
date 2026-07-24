"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import ProductTypeBadge from "./product-type-badge";
import ProductStatusBadge from "./product-status-badge";
import ProductActions from "./product-actions";

export type ProductColumn = {
  thumbnail: any;
  id: string;
  name: string;
  slug: string;
  type: "PDF" | "COURSE" | "AI_CREDITS";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  price: unknown;
  discountPrice: unknown | null;
  isFeatured: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "thumbnail",
    header: "Logo",
    cell: ({ row }) => (
      <div className="h-12 w-12 overflow-hidden rounded-lg border bg-muted">
        {row.original.thumbnail ? (
          <Image
            src={row.original.thumbnail}
            alt={row.original.name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No Image
          </div>
        )}
      </div>
    ),
  },

  {

    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          {row.original.name}
        </div>

        <div className="text-xs text-muted-foreground">
          {row.original.slug}
        </div>
      </div>
    ),
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <ProductTypeBadge
        type={row.original.type}
      />
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <ProductStatusBadge
        status={row.original.status}
      />
    ),
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price as number;

      return (
        <>₹{price.toLocaleString("en-IN")}</>
      );
    }
  },

  {
    accessorKey: "discountPrice",
    header: "Discount",
    cell: ({ row }) => {
      const discount = row.original.discountPrice as number | null;

      return discount
        ? <>₹{discount.toLocaleString("en-IN")}</>
        : <>—</>;
    }
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) =>
      row.original.isFeatured ? (
        <Badge>Featured</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <ProductActions
        productId={row.original.id}
        status={row.original.status}
      />
    ),
  },
];