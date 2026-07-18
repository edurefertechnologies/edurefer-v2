import Link from "next/link";

import { Button } from "@/components/ui/button";
import { heroData } from "@/data/hero";
import HeroBadge from "./hero-badge";

export default function HeroContent() {
  return (
    <div className="flex flex-col items-start justify-center">
      <HeroBadge />

      <h1 className="mt-8 max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
        {heroData.title.split(heroData.highlight)[0]}
        <span className="gradient-text">{heroData.highlight}</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
        {heroData.description}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          size="lg"
          className="rounded-xl bg-[var(--emerald)] px-8 py-6 text-base font-semibold text-white hover:bg-green-700"
        >
          <Link href={heroData.primaryButton.href}>
            {heroData.primaryButton.title}
          </Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-xl border-[var(--gold)] bg-transparent px-8 py-6 text-base font-semibold text-[var(--gold)] hover:bg-[rgba(212,175,55,.08)]"
        >
          <Link href={heroData.secondaryButton.href}>
            {heroData.secondaryButton.title}
          </Link>
        </Button>
      </div>

      <div className="mt-12 flex flex-wrap gap-10">
        {heroData.stats.map((item) => (
          <div key={item.label}>
            <h3 className="text-3xl font-bold text-[var(--gold)]">
              {item.value}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}