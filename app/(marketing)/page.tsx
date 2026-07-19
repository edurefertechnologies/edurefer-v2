import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import Trusted from "@/components/home/trusted";
import Footer from "@/components/layout/footer";
import Features from "@/components/home/features";
import Courses from "@/components/home/courses";
import AITools from "@/components/home/ai-tools";
import Pricing from "@/components/home/pricing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <Courses />
      <AITools />
      <Pricing />
      <Footer />
    </>
  );
}