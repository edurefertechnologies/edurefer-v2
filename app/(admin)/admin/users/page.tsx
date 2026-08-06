import { getUsers } from "@/actions/admin/users";
import { UsersTable } from "@/components/admin/users/users-table";
import { UsersToolbar } from "@/components/admin/users/users-toolbar";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <p className="text-muted-foreground">
          Manage users, roles and account status.
        </p>
      </div>
      <UsersToolbar />
      <UsersTable users={users} />
    </div>
  );
}