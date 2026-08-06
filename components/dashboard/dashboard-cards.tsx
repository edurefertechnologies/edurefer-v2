import {
  BookOpen,
  Brain,
  CreditCard,
  Users,
  Award,
  ShoppingCart,
  GraduationCap,
  Package,
} from "lucide-react";

type DashboardStats = {
  walletBalance: number;
  aiCredits: number;

  totalCourses: number;
  activeCourses: number;
  completedCourses: number;

  successfulReferrals: number;
  pendingReferrals: number;

  totalOrders: number;
  totalCertificates: number;
};

interface Props {
  stats: DashboardStats;
}

export function DashboardCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Courses",
      value: stats.totalCourses,
      subtitle: `${stats.activeCourses} Active`,
      icon: GraduationCap,
      glow: "from-blue-500/25 via-cyan-400/15 to-transparent",
      iconColor: "text-blue-300",
    },
    {
      title: "Wallet",
      value: `₹${stats.walletBalance}`,
      subtitle: "Available Balance",
      icon: CreditCard,
      glow: "from-emerald-500/25 via-green-400/15 to-transparent",
      iconColor: "text-emerald-300",
    },
    {
      title: "AI Credits",
      value: stats.aiCredits,
      subtitle: "Credits Remaining",
      icon: Brain,
      glow: "from-violet-500/25 via-blue-400/15 to-transparent",
      iconColor: "text-violet-300",
    },
    {
      title: "Certificates",
      value: stats.totalCertificates,
      subtitle: "Issued",
      icon: Award,
      glow: "from-amber-500/25 via-yellow-400/15 to-transparent",
      iconColor: "text-yellow-300",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      subtitle: "Purchases",
      icon: ShoppingCart,
      glow: "from-sky-500/25 via-cyan-400/15 to-transparent",
      iconColor: "text-sky-300",
    },
    {
      title: "Referrals",
      value: stats.successfulReferrals,
      subtitle: `${stats.pendingReferrals} Pending`,
      icon: Users,
      glow: "from-emerald-500/25 via-teal-400/15 to-transparent",
      iconColor: "text-emerald-300",
    },
    {
      title: "Completed",
      value: stats.completedCourses,
      subtitle: "Courses Finished",
      icon: BookOpen,
      glow: "from-indigo-500/25 via-blue-400/15 to-transparent",
      iconColor: "text-indigo-300",
    },
    {
      title: "Packages",
      value: stats.totalOrders,
      subtitle: "Career Packs",
      icon: Package,
      glow: "from-fuchsia-500/25 via-violet-400/15 to-transparent",
      iconColor: "text-fuchsia-300",
    },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-emerald-400 to-cyan-400" />
      {cards.map((card) => (
        <div
          key={card.title}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#11253E]/95 via-[#0D1C2F]/95 to-[#081421]/95 backdrop-blur-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/20 hover:shadow-[0_20px_60px_rgba(0,0,0,.35)]">
          {/* Glow */}
          <div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${card.glow} blur-3xl opacity-0 transition-all duration-700 group-hover:opacity-100`} />

          <div className="relative z-10 flex items-start justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                {card.title}
              </p>

              <h2 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight text-white">
                {card.value}
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                {card.subtitle}
              </p>

              <div className="mt-5">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
                  Live Data
                </span>
              </div>

            </div>

            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <card.icon className={`h-8 w-8 ${card.iconColor}`} />
            </div>

          </div>

        </div>
      ))}
    </div>
  );
}