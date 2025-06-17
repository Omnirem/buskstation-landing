import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ProblemSolutionSection from '../components/landing/ProblemSolutionSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowToSection from '../components/landing/HowToSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import TeamSection from '../components/landing/TeamSection';
import CtaSection from '../components/landing/CtaSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <HowToSection />
        <BenefitsSection />
        <TeamSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
