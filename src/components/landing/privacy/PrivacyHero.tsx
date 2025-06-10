"use client";

import React from "react";

const PrivacyHero: React.FC = () => {
  return (
    <section
      className="relative w-full mx-auto overflow-hidden shadow-lg bg-white"
      style={{ height: "80vh" }}
      id="hero-section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/landing/hero_section_bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative flex flex-col justify-end items-start pb-10 h-full px-8 sm:px-16 text-white z-10">
        <div className="w-full max-w-[1000px] space-y-6">
          <h1 className="text-3xl sm:text-5xl font-bold leading-snug break-words">
            Privacy Policy
          </h1>
          <p className="text-lg mt-4 break-words sm:max-w-[700px]">
            Learn how SoftCanada collects, uses and protects your data.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyHero;
