export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,.2)] bg-[rgba(17,24,39,.6)] px-5 py-2 backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

      <span className="text-sm font-medium text-[var(--gold)]">
        AI Powered Learning Platform
      </span>
    </div>
  );
}