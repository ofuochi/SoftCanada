"use client";

import { Button, Input, Select } from "antd";

const FaqHero = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
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
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex flex-col justify-end items-start pb-10 h-full px-8 sm:px-16 text-white z-10">
        <div className="w-full max-w-[1000px] space-y-6">
          <h1 className="text-3xl sm:text-5xl font-bold leading-snug break-words sm:max-w-[50%]">
            Frequently Asked Questions
          </h1>

          <div className="w-full rounded-md bg-white min-h-[82px] px-4 md:px-8 py-4 flex flex-col md:flex-row items-center gap-5 md:gap-10">
            <Input
              className="h-full !border-none !ring-0 placeholder:text-[#808080] font-medium !font-dm_sans !text-base  w-full md:max-w-[41.1%]"
              placeholder="Search FAQs by keyword (e.g., rentals, grants, finance)."
            />

            <Select
              placeholder="FAQ Categories"
              onChange={handleChange}
              className="!font-lato font-medium !text-xl w-full md:max-w-[41.4%]"
              options={[
                { value: "Category1", label: "Category1" },
                { value: "Category2", label: "Category2" },
                { value: "Category3", label: "Category3" },
              ]}
            />

            <Button className="w-full max-w-[184px] !bg-black !border-black !py-3 !px-2.5 !text-white !h-12 !rounded-md !font-semibold !text-base !font-poppins">
              Search
            </Button>
          </div>

          <p className="text-lg mt-4 break-words sm:max-w-[700px]">
            Find answers to common questions about our services, tools, and
            resources. Still need help? Reach out to us directly!
          </p>

          <br />
        </div>
      </div>
    </section>
  );
};

export default FaqHero;
