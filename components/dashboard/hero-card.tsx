import {
  Brain,
  Award,
  Flame,
  ArrowRight,
  Sparkles,
  UserPlus,
} from "lucide-react";

interface HeroCardProps {
  name: string;
  wallet: number;
  aiCredits: number;
  courses: number;
  certificates: number;
  progress: number;
}

export function HeroCard({
  name,
  wallet,
  aiCredits,
  courses,
  certificates,
  progress,
}: HeroCardProps) {

  const greetingMessage =
    courses === 0
      ? "Let's start your learning journey 🚀"
      : progress === 100
        ? "Amazing work! 🎉"
        : `You're ${progress}% closer to your goal`;

  const primaryButtonText =
    courses === 0
      ? "Explore Courses"
      : "Continue Learning";

  const aiButtonText =
    aiCredits === 0
      ? "Buy AI Credits"
      : "Open AI Assistant";

  const referralButtonText =
    wallet >= 500
      ? "Withdraw Earnings"
      : "Invite Friends";

  let heroMessage = "";

  if (courses === 0) {
    heroMessage =
      "Start your AI-powered learning journey and unlock certificates.";
  } else if (progress === 100) {
    heroMessage =
      "Congratulations! You've completed your learning goal.";
  } else {
    heroMessage =
      "Continue building your career through AI-powered learning, certifications and industry-ready skill development.";
  }

  let nextGoalTitle = "";
  let nextGoalDescription = "";

  if (courses === 0) {
    nextGoalTitle = "Enroll in your first course";
    nextGoalDescription =
      "Browse our premium courses and start your learning journey.";
  } else if (progress < 100) {
    nextGoalTitle = "Complete your current course";
    nextGoalDescription =
      "Finish your lessons to unlock your certificate.";
  } else {
    nextGoalTitle = "Claim your certificate";
    nextGoalDescription =
      "Congratulations! Download and share your certificate.";
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#11253E] via-[#0D1C2F] to-[#081421] p-8 shadow-2xl">

      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:42px_42px]" />

      {/* Background Glow */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_280px]">

        <div className="absolute right-40 top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute bottom-10 left-1/2 h-52 w-52 rounded-full bg-emerald-400/10 blur-[140px]" />

        {/* LEFT */}
        <div>

          <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
            {greetingMessage}
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight lg:text-6xl">

            <span className="text-white">
              Welcome back,
            </span>

            <br />

            <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              {name}
            </span>

            <span className="ml-2">
              👋
            </span>

          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            {heroMessage}
          </p>

          {/* Stats */}

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              className="
    rounded-xl
    bg-gradient-to-r
    from-blue-600
    to-emerald-500
    px-6
    py-3
    font-semibold
    text-white
    shadow-lg
    transition
    hover:scale-105
    hover:shadow-blue-500/30">
              <div className="flex items-center gap-2">
                {primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>

            <button
              className="
    rounded-xl
    border
    border-white/10
    bg-white/5
    px-6
    py-3
    font-semibold
    text-white
    backdrop-blur-xl
    transition
    hover:bg-white/10
    "
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {aiButtonText}
              </div>
            </button>

            <button
              className="
    rounded-xl
    border
    border-emerald-400/20
    bg-emerald-500/10
    px-6
    py-3
    font-semibold
    text-emerald-300
    transition
    hover:bg-emerald-500/20
    "
            >
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {referralButtonText}
              </div>
            </button>

            <div className="mt-8 flex flex-wrap gap-3">

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
                🎓 Industry Ready
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
                🤖 AI Powered
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
                📜 Lifetime Certificate
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <h3 className="text-lg font-semibold text-white">
              Learning Progress
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Track your journey in real time
            </p>

            <Flame className="h-6 w-6 text-orange-400" />

          </div>

          <div className="mt-8 flex justify-center">

            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full"
              style={{ background: `conic-gradient( #10B981 ${progress * 3.6}deg,rgba(255,255,255,.08) 0deg)`, }}>
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-[#102238]">
                <p className="text-5xl font-black text-white">
                  {progress}%
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                  Completed
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">

            <p className="text-xs uppercase tracking-widest text-emerald-300">
              Next Goal
            </p>

            <h4 className="mt-2 text-lg font-semibold text-white">
              {nextGoalTitle}
            </h4>

            <p className="mt-2 text-sm text-slate-300">
              {nextGoalDescription}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}