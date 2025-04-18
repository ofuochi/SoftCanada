// SectionHeading.tsx
import React from "react";

type SectionHeadingProps = {
  topText: string;
  heading: string;
  description: string;
};

export const SectionHeading = ({
  topText,
  heading,
  description,
}: SectionHeadingProps) => {
  return (
    <section className={`space-y-6 text-center`}>
      <p className="text-[#4F4F4F] font-lato text-xl md:text-2xl">{topText}</p>
      <h2 className="text-2xl font-semibold mb-6 font-lato text-[36px] md:text-[42px] lg:text-[48px]">
        {heading}
      </h2>
      <p className="font-poppins text-lg md:text-[22px] text-[#808080]">
        {description}
      </p>
    </section>
  );
};

