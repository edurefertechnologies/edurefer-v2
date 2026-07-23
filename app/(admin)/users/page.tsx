import { getUsers } from "@/actions/admin/users/get-users";
import UsersTable from "@/components/admin/users/users-table";
import CreateUserDialog from "@/components/admin/users/create-user-dialog";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <p className="text-muted-foreground">
          Manage all registered users.
        </p>
      </div>

      <UsersTable users={users} />
      <CreateUserDialog />
    </div>
  );
}