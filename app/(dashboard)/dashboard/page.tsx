import { getSession } from "@/lib/auth-server";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome {session?.user.firstName}
          </h1>

          <p className="text-muted-foreground">
            {session?.user.email}
          </p>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}