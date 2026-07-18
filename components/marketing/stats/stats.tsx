import Container from "@/components/layout/container";

const stats = [
  {
    value: "10K+",
    label: "Active Students",
  },
  {
    value: "50+",
    label: "Professional Courses",
  },
  {
    value: "200+",
    label: "Learning Resources",
  },
  {
    value: "95%",
    label: "Placement Success",
  },
];

export default function Stats() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-6 rounded-3xl border border-[rgba(212,175,55,.15)] bg-[rgba(17,24,39,.55)] p-8 backdrop-blur-xl md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-[var(--gold)]">
                {item.value}
              </h2>

              <p className="mt-2 text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}