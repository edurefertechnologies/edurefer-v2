import FounderCard from "./founder-card";
import { founders } from "@/data/founders";

export default function Founders() {
  return (
    <section className="py-32">

      <div className="container mx-auto px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Leadership
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">

            Meet Our{" "}

            <span className="bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              Founders
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">

            Edurefer is driven by a shared vision of transforming education through innovation,
            technology, and practical learning experiences.

          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {founders.map((founder) => (
            <FounderCard
              key={founder.name}
              founder={founder}
            />
          ))}

        </div>

      </div>

    </section>
  );
}