import { FeaturedRequestsSection } from "@/components/importbase/landing/featured-requests";
import { FinalCtaSection } from "@/components/importbase/landing/final-cta";
import { HeroSection } from "@/components/importbase/landing/hero";
import { HowItWorksSection } from "@/components/importbase/landing/how-it-works";
import { MarketplacePreviewSection } from "@/components/importbase/landing/marketplace-preview";
import { TestimonialsSection } from "@/components/importbase/landing/testimonials";
import { TrustBarSection } from "@/components/importbase/landing/trust-bar";
import { VehicleShowcaseSection } from "@/components/importbase/landing/vehicle-showcase";
import { WhyGradeFiveSection } from "@/components/importbase/landing/why-importbase";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VehicleShowcaseSection />
      <TrustBarSection />
      <HowItWorksSection />
      <WhyGradeFiveSection />
      <MarketplacePreviewSection />
      <FeaturedRequestsSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
