import { getSession } from "@/lib/auth-server";
import { getDashboardStats } from "@/lib/dashboard";

import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { ContinueLearning } from "@/components/dashboard/continue-learning";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentNotifications } from "@/components/dashboard/recent-notifications";
import { RecentCertificates } from "@/components/dashboard/recent-certificates";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { WalletSummary } from "@/components/dashboard/wallet-summary";
import { HeroCard } from "@/components/dashboard/hero-card";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const stats = await getDashboardStats(
    session.user.id
  );

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <HeroCard
        name={session.user.firstName ?? "Student"}
        wallet={stats.walletBalance}
        aiCredits={stats.aiCredits}
        courses={stats.totalCourses}
        certificates={stats.totalCertificates}
        progress={0}
      />

      {/* Stats */}
      <DashboardCards stats={stats} />

      {/* Continue Learning + Quick Actions */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ContinueLearning />
        </div>

        <QuickActions />
      </div>

      {/* Orders + Wallet */}
      <div className="grid gap-6 xl:grid-cols-2">
        <RecentOrders />

        <WalletSummary />
      </div>

      {/*Certificates + Activity */}
      <div className="grid gap-6 xl:grid-cols-2">
        <RecentCertificates />
        <RecentNotifications />
      </div>
    </div>
  );
}