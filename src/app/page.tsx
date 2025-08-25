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
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
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
      </main>
      <Footer />
    </div>
  );
}
