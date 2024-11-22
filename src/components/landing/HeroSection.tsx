import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative w-full mx-auto mt-8 sm:mt-12 rounded-xl overflow-hidden shadow-lg bg-white"
      style={{ height: "80vh" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/landing/hero_section_bg.jpg')`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Content */}
      <div className="relative flex flex-col justify-end items-start pb-10 h-full px-8 sm:px-16 text-white z-10">
        <h1 className="text-3xl sm:text-5xl font-bold leading-snug">
          All-in-One Support for <span className="block">New Canadians</span>
        </h1>
        <p className="mt-4 text-lg">
          Explore tools, resources, and expert guidance to help you succeed in
          your Canadian journey.
        </p>
        <Link
          href="/login"
          className="mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-3 shadow-md cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
