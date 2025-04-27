"use client";

import React from "react";
import FaqAccordion from "./FaqAccordion";

interface FaqAccordionSectionProps {
  searchTerm: string;
}

const FaqAccordionSection: React.FC<FaqAccordionSectionProps> = ({
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

        <h2 className="text-black text-center text-3xl font-dm_sans font-medium md:text-5xl">
          In case you were <br /> wondering
        </h2>
        <p className="font-poppins font-semibold text-xl text-black">
          Here are some of the most common things people ask about us.
        </p>
      </section>

      <section className="w-full mx-auto max-w-[984px] mt-[73px]">
        <FaqAccordion searchTerm={searchTerm} />
      </section>
    </section>
  );
};

export default FaqAccordionSection;
