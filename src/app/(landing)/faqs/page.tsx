"use client";

import { useState } from "react";
import FaqHero from "@/components/landing/faqs/FaqHero";
import FaqAccordionSection from "@/components/landing/faqs/FaqAccordionSection";
import FaqContactUs from "@/components/landing/faqs/FaqContactUs";

const Faqs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="-mt-16">
      <FaqHero searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <FaqAccordionSection searchTerm={searchTerm} />
      <FaqContactUs />
    </div>
  );
};

export default Faqs;
