"use client";

import Link from "next/link";

const FaqContactUs = () => {
  return (
    <section
      className="w-full relative bg-cover max-md:bg-center bg-no-repeat px-5 h-svh"
      style={{
        backgroundImage: `url('/images/landing/faqContactUsImage.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-[#00000080]" />
      <section className="w-full h-full max-w-[715px] mx-auto flex flex-col gap-5 justify-center items-center relative">
        <h1 className="text-3xl text-center sm:text-5xl font-bold leading-snug break-words text-white">
          Can't Find What You're <br /> Looking For?
        </h1>
        <br />
        <p className="text-lg mt-4 break-words sm:max-w-[700px] text-white text-center">
          Take the first step toward all the answers you need.
        </p>

        <Link
          href="/contact"
          className="bg-red-600 hover:bg-red-500 text-nowrap text-white font-semibold px-10 py-3 shadow-md cursor-pointer"
        >
          Contact Us
        </Link>
      </section>
    </section>
  );
};

export default FaqContactUs;
