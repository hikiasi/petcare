import { Hero } from '@/components/landing/Hero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { ComparisonSection } from '@/components/landing/ComparisonSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ProcessSection />
      <FeaturesSection />
      <ComparisonSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQ />
      <FinalCTA />
    </>
  );
}