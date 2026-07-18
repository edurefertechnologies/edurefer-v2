interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <span className="inline-flex rounded-full border border-[rgba(212,175,55,.18)] bg-[rgba(212,175,55,.06)] px-4 py-2 text-sm font-medium text-[var(--gold)]">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
        {title}{" "}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}