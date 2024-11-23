import CallToActionSection from "@/components/landing/CallToActionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

export default function Home() {
  return (
      <>
        <HeroSection/>
        <FeaturesSection/>
        <HowItWorksSection/>
        <div className="-mx-28 mb-12">
          <CallToActionSection/>
        </div>
      </>
  );
}
