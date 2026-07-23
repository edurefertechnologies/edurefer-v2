"use client";

import { DataTable } from "@/components/data-table/data-table";
import { columns, UserColumn } from "./column";

interface Props {
  users: UserColumn[];
}

export default function UsersTable({ users }: Props) {
  return (
    <DataTable
      columns={columns}
      data={users}
    />
  );
}