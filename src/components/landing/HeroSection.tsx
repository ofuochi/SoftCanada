import Link from "next/link";
import React from "react";

interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  buttonLink,
}) => {
  return (
    <section
      className="relative w-full mx-auto mt-8 sm:mt-12 rounded-xl overflow-hidden shadow-lg bg-white"
      style={{ height: "80vh" }}
      id="hero-section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex flex-col justify-end items-start pb-10 h-full px-8 sm:px-16 text-white z-10">
        <div className="w-full sm:max-w-[50%]">
          <h1 className="text-3xl sm:text-5xl font-bold leading-snug break-words">
            {title}
          </h1>
          <p className="mt-4 text-lg break-words">{subtitle}</p>
          <div className="mt-8">
            <Link
              href={buttonLink}
              className="bg-red-600 hover:bg-red-500 text-nowrap text-white font-semibold px-10 py-3 shadow-md cursor-pointer"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
