import CallToActionSection from "@/components/landing/CallToActionSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Navbar from "@/components/landing/Navbar";
import FeaturesSection from "@/components/landing/FeaturesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-white px-28">
        <HeroSection />

        {/* Call to Action Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Call to Action Section */}
        <div className="-mx-28 mb-12">
          <CallToActionSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
