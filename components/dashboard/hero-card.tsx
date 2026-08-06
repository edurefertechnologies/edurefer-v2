import {
  Brain,
  CreditCard,
  GraduationCap,
  Award,
  Flame,
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
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#11253E] via-[#0D1C2F] to-[#081421] p-8 shadow-2xl">

      {/* Background Glow */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_280px]">

        {/* LEFT */}
        <div>

          <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
            {greeting}
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-white lg:text-5xl">
            Welcome back,
            <br />
            {name} 👋
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Continue building your career through AI-powered learning,
            certifications and industry-ready skill development.
          </p>

          {/* Stats */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">

                <CreditCard className="h-5 w-5 text-emerald-400" />

                <span className="text-sm text-slate-300">
                  Wallet
                </span>

              </div>

              <p className="mt-3 text-3xl font-bold text-white">
                ₹{wallet}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <Brain className="h-5 w-5 text-violet-400" />

                <span className="text-sm text-slate-300">
                  AI Credits
                </span>

              </div>

              <p className="mt-3 text-3xl font-bold text-white">
                {aiCredits}
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <GraduationCap className="h-5 w-5 text-cyan-400" />

                <span className="text-sm text-slate-300">
                  Courses
                </span>

              </div>

              <p className="mt-3 text-3xl font-bold text-white">
                {courses}
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <Award className="h-5 w-5 text-yellow-400" />

                <span className="text-sm text-slate-300">
                  Certificates
                </span>

              </div>

              <p className="mt-3 text-3xl font-bold text-white">
                {certificates}
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <h3 className="text-lg font-semibold text-white">
              Learning Progress
            </h3>

            <Flame className="h-6 w-6 text-orange-400" />

          </div>

          <div className="mt-8 flex justify-center">

            <div className="flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-blue-500/30">

              <div className="text-center">

                <p className="text-5xl font-black text-white">
                  {progress}%
                </p>

                <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">
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
              Complete your first course
            </h4>

            <p className="mt-2 text-sm text-slate-300">
              Finish your first course to unlock your certificate
              and referral rewards.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}