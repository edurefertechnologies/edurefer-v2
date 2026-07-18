import {
  Award,
  BookOpen,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";

export default function HeroImage() {
  return (
    <div className="relative mx-auto w-full max-w-xl hero-glow">

      {/* Main Dashboard */}
      <div className="glass gold-border rounded-3xl p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Welcome Back 👋
            </p>

            <h3 className="mt-1 text-xl font-bold text-white">
              Student Dashboard
            </h3>
          </div>

          <div className="rounded-xl bg-green-600/20 p-3">
            <BrainCircuit
              className="text-green-500"
              size={24}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">

          <Card
            icon={<BookOpen size={20} />}
            title="Courses"
            value="24"
          />

          <Card
            icon={<Award size={20} />}
            title="Certificates"
            value="12"
          />

          <Card
            icon={<TrendingUp size={20} />}
            title="Progress"
            value="92%"
          />

          <Card
            icon={<BrainCircuit size={20} />}
            title="AI Score"
            value="A+"
          />

        </div>

        {/* Progress */}
        <div className="mt-8">

          <div className="mb-2 flex justify-between">
            <span className="text-sm text-slate-400">
              Full Stack Development
            </span>

            <span className="text-sm font-semibold text-[var(--gold)]">
              85%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">

            <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-green-500 to-[var(--gold)]" />

          </div>

        </div>

      </div>

      {/* Floating Card */}
      <div className="absolute -right-8 -top-8 rounded-2xl border border-[rgba(212,175,55,.2)] bg-slate-900/80 p-4 backdrop-blur-xl">

        <p className="text-xs text-slate-400">
          AI Recommendation
        </p>

        <p className="mt-2 font-semibold text-white">
          Learn React Next ⚡
        </p>

      </div>

      {/* Floating Card */}
      <div className="absolute -bottom-6 -left-8 rounded-2xl border border-green-500/20 bg-slate-900/80 p-4 backdrop-blur-xl">

        <p className="text-xs text-slate-400">
          Certificate Earned
        </p>

        <p className="mt-2 font-semibold text-[var(--gold)]">
          ✔ UI/UX Design
        </p>

      </div>

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[rgba(212,175,55,.1)] bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]">

      <div className="mb-4 text-green-500">
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h4 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h4>

    </div>
  );
}