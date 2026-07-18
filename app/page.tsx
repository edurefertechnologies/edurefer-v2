import Hero from "@/components/home/hero";
import PoweredBy from "@/components/home/powered-by";
import Stats from "@/components/home/stats";
import WhyEdurefer from "@/components/home/why-edurefer";
import FeaturedCourses from "@/components/home/featured-courses";
import LearningProcess from "@/components/home/learning-process";
import Testimonials from "@/components/home/testimonials";
import PlacementPartners from "@/components/home/placement-partners";
import CTA from "@/components/home/cta";
import FAQ from "@/components/home/faq";
import Newsletter from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PoweredBy />
      <Stats />
      <WhyEdurefer />
      <FeaturedCourses />
      <LearningProcess />
      <Testimonials />
      <PlacementPartners />
      <CTA />
      <FAQ />
      <Newsletter />
    </>
  );
}