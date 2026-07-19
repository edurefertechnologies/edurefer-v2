import {
  BookOpen,
  Brain,
  CreditCard,
  Users,
} from "lucide-react";

type DashboardStats = {
  walletBalance: number;
  aiCredits: number;
  courses: number;
  referrals: number;
};

export function DashboardCards({
  stats,
}: {
  stats: DashboardStats;
}) {
  const cards = [
    {
      title: "Wallet Balance",
      value: `₹${stats.walletBalance}`,
      icon: CreditCard,
    },
    {
      title: "AI Credits",
      value: stats.aiCredits,
      icon: Brain,
    },
    {
      title: "Courses",
      value: stats.courses,
      icon: BookOpen,
    },
    {
      title: "Referrals",
      value: stats.referrals,
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-muted-foreground">
              {card.title}
            </h3>

            <card.icon className="size-5 text-primary" />
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}