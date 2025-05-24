"use client"; // Retaining "use client" if search term is passed and used for filtering

import React from "react";
import FaqAccordion from "./FaqAccordion";
import { Faq as FaqType } from "@/tina/__generated__/types";

interface FaqAccordionSectionProps {
  introTitle?: string | null;
  introSubtitle?: string | null;
  faqs?: FaqType['faqs'] | null; // Array of FAQ items from CMS
  searchTerm?: string; // Search term is still passed down
}

const FaqAccordionSection: React.FC<FaqAccordionSectionProps> = ({
  introTitle,
  introSubtitle,
  faqs,
  searchTerm,
}) => {
  return (
    <section className="py-[114px] px-5">
      <section className="flex flex-col items-center gap-6 w-full max-w-[650px] mx-auto">
        <div className="bg-[#FAF2324D] w-full max-w-[147px] h-[42px] rounded py-2">
          <span className="block text-center font-dm_sans text-xl text-black">
            FAQ
          </span>
        </div>

        {introTitle && (
          <h2 className="text-black text-center text-3xl font-dm_sans font-medium md:text-5xl">
            {introTitle.split("<br />").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < introTitle.split("<br />").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        )}
        {introSubtitle && (
          <p className="font-poppins font-semibold text-xl text-black text-center">
            {introSubtitle}
          </p>
        )}
      </section>

      <section className="w-full mx-auto max-w-[984px] mt-[73px]">
        {/* Pass the faqs list from CMS to the accordion */}
        <FaqAccordion faqs={faqs} searchTerm={searchTerm} />
      </section>
    </section>
  );
};

export default FaqAccordionSection;
