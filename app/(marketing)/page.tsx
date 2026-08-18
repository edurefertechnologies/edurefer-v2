import Hero from "@/components/home/hero";
import Stats from "@/components/home/stats";
import LearningProcess from "@/components/home/learning-process";
import Testimonials from "@/components/home/testimonials";
import PlacementPartners from "@/components/home/placement-partners";
import CTA from "@/components/home/cta";
import FAQ from "@/components/home/faq";
import Newsletter from "@/components/home/newsletter";
import Pricing from "@/components/home/pricing";
import Footer from "@/components/layout/footer";

import { getPricingProducts } from "@/actions/products/get-pricing-products";

export default async function HomePage() {
  const pricingData =
    await getPricingProducts();

  return (
    <>
      <Hero />

      <Stats />

      <LearningProcess />

      <Pricing data={pricingData} />

      <Testimonials />

      <PlacementPartners />

      <CTA />

      <FAQ />

      <Newsletter />

      <Footer />
    </>
  );
}