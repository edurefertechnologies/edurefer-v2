import { getDashboardStats } from "@/actions/admin/dashboard";
import StatsGrid from "@/components/admin/dashboard/stats-grid";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome to Edurefer Admin Panel
        </p>
      </div>

      <StatsGrid stats={stats} />
    </div>
  );
}