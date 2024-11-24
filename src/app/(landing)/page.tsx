import HeroSection from "@/components/landing/HeroSection";
import CallToActionSection from "@/components/landing/home/CallToActionSection";
import FeaturesSection from "@/components/landing/home/FeaturesSection";
import HowItWorksSection from "@/components/landing/home/HowItWorksSection";

export default function Home() {
  return (
    <>
      <HeroSection
        backgroundImage="/images/landing/hero_section_bg.jpg"
        title="All-in-One Support for New Canadians"
        subtitle="Explore tools, resources, and expert guidance to help you succeed in your Canadian journey."
        buttonText="Get Started"
        buttonLink="/login"
      />
      <FeaturesSection />
      <HowItWorksSection />
      <div className="-mx-28 mb-12">
        <CallToActionSection />
      </div>
    </>
  );
}
