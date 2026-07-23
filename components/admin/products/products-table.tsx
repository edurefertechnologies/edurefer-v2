"use client";

import { DataTable } from "@/components/data-table/data-table";
import { columns, ProductColumn } from "./columns";

interface Props {
  products: ProductColumn[];
}

export default function ProductsTable({
  products,
}: Props) {
  return (
    <DataTable
      columns={columns}
      data={products}
    />
  );
}