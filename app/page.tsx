import Hero from "@/components/home/hero";
import Stats from "@/components/home/stats";
import LearningProcess from "@/components/home/learning-process";
import Testimonials from "@/components/home/testimonials";
import PlacementPartners from "@/components/home/placement-partners";
import CTA from "@/components/home/cta";
import FAQ from "@/components/home/faq";
import Newsletter from "@/components/home/newsletter";
import HomeNavbar from "@/components/home/home-navbar";

export default function HomePage() {
  return (
    <>
      <HomeNavbar />
      <Hero />
      <Stats />
      <LearningProcess />
      <Testimonials />
      <PlacementPartners />
      <CTA />
      <FAQ />
      <Newsletter />
    </>
  );
}