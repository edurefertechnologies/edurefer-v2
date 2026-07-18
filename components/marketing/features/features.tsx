import Container from "@/components/layout/container";
import { features } from "@/data/features";
import FeatureCard from "./feature-card";

export default function Features() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-[rgba(212,175,55,.2)] px-4 py-2 text-sm font-medium text-[var(--gold)]">
            Why Choose Edurefer?
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Everything You Need to{" "}
            <span className="gradient-text">Learn, Build & Grow</span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            From beginner to professional, Edurefer provides everything you need
            to learn modern technologies and advance your career.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}