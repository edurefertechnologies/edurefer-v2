import { getCurrentUser } from "@/lib/auth-server";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.firstName} 👋
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage Edurefer from one place.
        </p>
      </div>
    </div>
  );
}