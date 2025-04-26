import FaqAccordionSection from "@/components/landing/faqs/FaqAccordionSection";
import FaqContactUs from "@/components/landing/faqs/FaqContactUs";
import FaqHero from "@/components/landing/faqs/FaqHero";

const Faqs = () => {
  return (
    <div className="-mt-16">
      <FaqHero />
      <FaqAccordionSection />
      <FaqContactUs />
    </div>
  );
};

export default Faqs;

