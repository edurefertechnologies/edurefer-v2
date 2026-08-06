"use client";

import { ColumnDef } from "@tanstack/react-table";
import RoleBadge from "./role-badge";
import StatusBadge from "./status-badge";
import UserActions from "./user-actions";

export type UserColumn = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  role: "ADMIN" | "STUDENT";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: Date;
  lastLogin: Date | null;
  wallet: {
    balance: unknown;
  } | null;
  aiWallet: {
    balance: number;
  } | null;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          {row.original.firstName} {row.original.lastName ?? ""}
        </div>

        <div className="text-xs text-muted-foreground">
          {row.original.email}
        </div>
      </div>
    ),
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <RoleBadge role={row.original.role} />
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} />
    ),
  },

  {
    accessorKey: "wallet",
    header: "Wallet",
    cell: ({ row }) => (
      <>
        ₹
        {Number(
          row.original.wallet?.balance ?? 0
        ).toLocaleString("en-IN")}
      </>
    ),
  },

  {
    accessorKey: "aiWallet",
    header: "AI Credits",
    cell: ({ row }) => (
      <>{Number(
        row.original.aiWallet?.balance ?? 0
      )}
      </>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <>
        {new Date(row.original.createdAt).toLocaleDateString()}
      </>
    ),
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <UserActions
        userId={row.original.id}
        role={row.original.role}
        status={row.original.status}
      />
    ),
  },
];