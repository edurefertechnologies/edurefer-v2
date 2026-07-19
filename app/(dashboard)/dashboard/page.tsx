import { getSession } from "@/lib/auth-server";
import { getDashboardStats } from "@/lib/dashboard";

import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { ContinueLearning } from "@/components/dashboard/continue-learning";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) return null;

  const stats = await getDashboardStats(session.user.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session.user.firstName} 👋
        </h1>

        <p className="text-muted-foreground">
          Here's an overview of your account.
        </p>
      </div>

      <DashboardCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContinueLearning />
        </div>

        <QuickActions />
      </div>

      <RecentActivity />
    </div>
  );
}