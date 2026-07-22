import { getUsers } from "@/actions/admin/users";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="text-muted-foreground">
            Manage all users.
          </p>
        </div>

      </div>

      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>

    </div>
  );
}