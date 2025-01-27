import HeroSection from "@/components/landing/HeroSection";
import CallToActionSection from "@/components/landing/home/CallToActionSection";
import FeaturesSection from "@/components/landing/home/FeaturesSection";
import HowItWorksSection from "@/components/landing/home/HowItWorksSection";

export default function Home() {
  return (
    <>
      <section className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <HeroSection
          backgroundImage="/images/landing/hero_section_bg.jpg"
          title="All-in-One Support for New Canadians"
          subtitle="Explore tools, resources, and expert guidance to help you succeed in your Canadian journey."
          buttonText="Get Started"
          buttonLink="/login"
        />
      </section>
      <section className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <FeaturesSection />
      </section>
      <section className="mt-10">
        <HowItWorksSection />
      </section>
      <section className="mb-12 mt-10">
        <CallToActionSection />
      </section>
    </>
  );
}

