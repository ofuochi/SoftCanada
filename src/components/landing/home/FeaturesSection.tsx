import React from "react";
import { Button } from "antd";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <>
      {/* Features Section 1*/}
      <section className="mt-12 w-full">
        <div className="text-center">
          <p className="text-sm md:text-base text-gray-600 mb-5">
            Key Features
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
            Everything You Need for a{" "}
            <span className="block">Smooth Transition</span>
          </h3>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4">
          {/* Jobs Card */}
          <div className="bg-gray-50 px-4 sm:px-8 md:px-14 w-full pt-12 flex flex-col flex-1">
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
                Jobs and <span className="">Careers Advice</span>
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-4 text-center">
                Build your Canadian CV, prepare for interviews, and access
                career advice tailored to the Canadian job market
              </p>
              <div className="flex justify-center">
                <Button
                  type="default"
                  className="mt-5 shadow-none !font-dm_sans border !border-black"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <Image
              src="/images/landing/career_feature.svg"
              alt="career feature"
              width={10}
              height={10}
              className="w-full mt-14 flex-shrink-0"
            />
          </div>

          {/* Real Estate Card */}
          <div className="bg-gray-50 w-full py-12 flex flex-col flex-1">
            <Image
              src="/images/landing/rental_listing_feature.svg"
              alt="rental listing feature"
              width={10}
              height={10}
              className="w-full flex-shrink-0"
            />
            <div className="px-4 sm:px-8 md:px-14 mt-auto">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
                Real Estate & Housing
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-4 text-center">
                Explore properties, calculate mortgages, and find the perfect
                place to call home in Canada.
              </p>
              <div className="flex justify-center">
                <Button
                  type="default"
                  className="mt-5 shadow-none !font-dm_sans border !border-black"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section 2*/}
      <section className="mt-4 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4">
          {/* Finance Card */}
          <div className="bg-gray-50 w-full lg:w-1/2 py-12 flex flex-col flex-1">
            <Image
              src="/images/landing/finance_feature.svg"
              alt="finance feature"
              width={10}
              height={10}
              className="w-full px-4 sm:px-8 md:px-14 flex-shrink-0"
            />
            <div className="px-4 sm:px-8 md:px-14">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold pt-10">
                Finance
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-4 text-left">
                Learn tips on how to manage your finances, access loans, and
                understand the Canadian banking system to help you attain your
                financial goals.
              </p>
              <div className="flex">
                <Button
                  type="default"
                  className="mt-5 shadow-none !font-dm_sans border !border-black"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[65%] flex flex-col gap-4">
            {/* Immigration News Card */}
            <div className="bg-gray-50 pt-10 flex flex-col flex-1">
              <div className="px-4 sm:px-8 md:px-14 flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold pt-10">
                  Immigration News & Pathways
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-4">
                  Stay updated on the latest immigration policies and discover
                  the best and comprehensive pathways to a Canadian permanent
                  residency or citizenship.
                </p>
                <div className="flex">
                  <Button
                    type="default"
                    className="mt-5 shadow-none !font-dm_sans border !border-black"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent z-10"></div>
                <Image
                  src="/images/landing/immigration_news_feature.jpg"
                  alt="immigration news feature"
                  width={2000}
                  height={2000}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              </div>
            </div>
            {/* Grants Card */}
            <div className="bg-gray-50 flex flex-col md:flex-row justify-between items-center flex-1">
              {/* Image on the Left */}
              <Image
                src="/images/landing/grant_feature.jpg"
                alt="grant feature"
                height={200}
                width={400}
                className="flex-1 w-full md:w-1/2 h-auto object-contain flex-shrink-0"
              />
              {/* Text Content on the Right */}
              <div className="flex-1 px-4 sm:px-8 md:px-14 mt-5 pb-5">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  Grants
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-4">
                  Explore opportunities for starting your own business in
                  Canada, learn about grants, and find networking events to help
                  you connect with other entrepreneurs.
                </p>
                <div className="flex">
                  <Button
                    type="default"
                    className="mt-5 shadow-none !font-dm_sans border !border-black"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

