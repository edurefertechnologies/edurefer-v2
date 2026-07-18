import Container from "@/components/layout/container";
import HeroContent from "./hero-content";
import HeroImage from "./hero-image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}