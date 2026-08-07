import {
  GraduationCap,
  Wallet,
  Award,
  CreditCard,
  Users,
  Briefcase,
} from "lucide-react";

export function AssistantHeader() {
  return (
    <section
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-gradient-to-br
      from-[#11253E]
      via-[#0D1C2F]
      to-[#081421]
      p-8
      shadow-2xl
      "
    >
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10">

        <span
          className="
          inline-flex
          rounded-full
          border
          border-emerald-400/20
          bg-emerald-500/10
          px-4
          py-1
          text-xs
          font-semibold
          uppercase
          tracking-widest
          text-emerald-300
          "
        >
          Edurefer Assistant
        </span>

        <h1 className="mt-5 text-4xl font-black text-white">
          How can we help you today?
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Get help with your courses, orders, certificates,
          wallet, referrals and career guidance.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">

          <Chip
            icon={<GraduationCap size={16} />}
            text="Courses"
          />

          <Chip
            icon={<CreditCard size={16} />}
            text="Orders"
          />

          <Chip
            icon={<Award size={16} />}
            text="Certificates"
          />

          <Chip
            icon={<Wallet size={16} />}
            text="Wallet"
          />

          <Chip
            icon={<Users size={16} />}
            text="Referral"
          />

          <Chip
            icon={<Briefcase size={16} />}
            text="Career"
          />

        </div>

      </div>

    </section>
  );
}

function Chip({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-xl
      border
      border-white/10
      bg-white/5
      px-4
      py-2
      text-sm
      text-white
      backdrop-blur-xl
      "
    >
      {icon}
      {text}
    </div>
  );
}