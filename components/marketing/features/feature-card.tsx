import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="card-hover group rounded-3xl border border-[rgba(212,175,55,.15)] bg-[var(--card)] p-8">
      <div className="mb-6 inline-flex rounded-2xl bg-green-600/10 p-4 text-green-500 transition group-hover:bg-[rgba(212,175,55,.15)] group-hover:text-[var(--gold)]">
        <Icon size={28} />
      </div>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}