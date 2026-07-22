import {
  Users,
  Package,
  BookOpen,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

import StatsCard from "./stats-card";

interface Props {
  stats: {
    totalUsers: number;
    totalProducts: number;
    totalCourses: number;
    totalOrders: number;
    totalRevenue: number;
  };
}

export default function StatsGrid({
  stats,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      <StatsCard
        title="Users"
        value={stats.totalUsers}
        icon={Users}
      />

      <StatsCard
        title="Products"
        value={stats.totalProducts}
        icon={Package}
      />

      <StatsCard
        title="Courses"
        value={stats.totalCourses}
        icon={BookOpen}
      />

      <StatsCard
        title="Orders"
        value={stats.totalOrders}
        icon={ShoppingCart}
      />

      <StatsCard
        title="Revenue"
        value={`₹${stats.totalRevenue.toLocaleString()}`}
        icon={IndianRupee}
      />
    </div>
  );
}