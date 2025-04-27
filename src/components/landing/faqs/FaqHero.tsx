"use client";

import { Button, Input } from "antd";
import React from "react";

interface FaqHeroProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

const FaqHero: React.FC<FaqHeroProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <section
      className="relative w-full mx-auto overflow-hidden shadow-lg bg-white"
      style={{ height: "80vh" }}
      id="hero-section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/landing/faqHero.jpg')` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative flex flex-col justify-end items-start pb-10 h-full px-8 sm:px-16 text-white z-10">
        <div className="w-full max-w-[1000px] space-y-6">
          <h1 className="text-3xl sm:text-5xl font-bold leading-snug break-words sm:max-w-[50%]">
            Frequently Asked Questions
          </h1>

          <div className="w-full rounded-md bg-white min-h-[82px] px-4 md:px-8 py-4 flex flex-col md:flex-row items-center gap-5 md:gap-10 justify-between">
            <Input
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="h-full !border-none !ring-0 placeholder:text-[#808080] font-medium !font-dm_sans !text-base w-full"
              placeholder="Search FAQs by keyword (e.g., rentals, grants, finance)."
            />

            <Button
              className="w-full max-w-[184px] !h-12 !font-semibold !font-poppins"
              type="primary"
              //TODO: hook this up to analytics
            >
              Search
            </Button>
          </div>

          <p className="text-lg mt-4 break-words sm:max-w-[700px]">
            Find answers to common questions about our services, tools, and
            resources. Still need help? Reach out to us directly!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqHero;
