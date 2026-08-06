import UserActions from "./user-actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import RoleBadge from "@/components/admin/users/role-badge";
import StatusBadge from "@/components/admin/users/status-badge";

type User = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  provider: string;
  createdAt: Date;
  wallet: {
    balance: number;
  } | null;
};

interface UsersTableProps {
  users: User[];
}

export function UsersTable({
  users,
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-10 text-center">
        <h3 className="text-lg font-semibold">
          No Users Found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Users will appear here once they register.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead>User</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Wallet</TableHead>

            <TableHead>Role</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Provider</TableHead>

            <TableHead>Joined</TableHead>

            <TableHead className="w-[70px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => {
            const initials = `${user.firstName.charAt(
              0
            )}${user.lastName?.charAt(0) ?? ""}`;

            return (
              <TableRow
                key={user.id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 font-semibold text-primary ring-1 ring-primary/20">
                      {initials.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium">
                        {user.firstName}{" "}
                        {user.lastName ?? ""}
                      </p>

                      {user.phone && (
                        <p className="text-xs text-muted-foreground">
                          {user.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>
                  ₹
                  {Number(
                    user.wallet?.balance ?? 0
                  ).toLocaleString("en-IN")}
                </TableCell>

                <TableCell>
                  <RoleBadge role={user.role as "ADMIN" | "STUDENT"} />
                </TableCell>

                <TableCell>
                  <StatusBadge
                    status={
                      user.status as
                      | "ACTIVE"
                      | "INACTIVE"
                      | "SUSPENDED"
                    }
                  />
                </TableCell>

                <TableCell>
                  {user.provider}
                </TableCell>

                <TableCell>
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </TableCell>

                <TableCell>
                  <UserActions
                    userId={user.id}
                    role={user.role}
                    status={user.status}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}