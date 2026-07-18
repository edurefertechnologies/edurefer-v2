import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Founder } from "@/data/founders";

interface Props {
  founder: Founder;
}

export default function FounderCard({ founder }: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/40 hover:bg-white/10">

      <div className="relative h-80 w-full overflow-hidden">

        <Image
          src={founder.image}
          alt={founder.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

      </div>

      <div className="space-y-5 p-8">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">
            {founder.role}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {founder.name}
          </h3>

          <p className="mt-2 text-gold-400">
            {founder.designation}
          </p>

        </div>

        <p className="leading-8 text-slate-300">
          {founder.bio}
        </p>

        <div className="flex flex-wrap gap-3">

          {founder.expertise.map((item) => (

            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300"
            >
              <BadgeCheck size={16} />
              {item}
            </span>

          ))}

        </div>

      </div>

    </div>
  );
}