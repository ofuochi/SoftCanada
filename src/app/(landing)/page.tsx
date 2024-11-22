"use client";

import Navbar from "@/components/landing/Navbar";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import {Button} from 'antd';

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="relative min-h-screen bg-white px-28">
        {/* Hero Section */}
        <section
          className="relative w-full mx-auto mt-8 sm:mt-12 rounded-xl overflow-hidden shadow-lg bg-white"
          style={{height: "80vh"}}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/landing/hero_section_bg.jpg')`,
            }}
          />

          {/* Overlay for Contrast */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content */}
          <div className="relative flex flex-col justify-end items-start pb-10 h-full px-8 sm:px-16 text-white z-10">
            <h1 className="text-3xl sm:text-5xl font-bold leading-snug">
              All-in-One Support for <br/> New Canadians
            </h1>
            <p className="mt-4 text-lg">
              Explore tools, resources, and expert guidance to help you succeed
              in your Canadian journey.
            </p>
            <Link
              href="/login"
              className="mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-3 shadow-md cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-12 w-full">
          <div className="text-center">
            <p className="text-sm md:text-base text-gray-600 mb-5">Key Features</p>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
              Everything You Need for a <span className="block">Smooth Transition</span>
            </h3>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
            {/* First Card */}
            <div className="bg-gray-50 px-12 md:px-14 w-full md:w-1/2 pt-12 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  Jobs and <span className="block">Careers Advice</span>
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-4">
                  Build your Canadian CV, prepare for interviews, <span className="block">
            and access career advice tailored to the
          </span>
                  <span className="block">Canadian job market.</span>
                </p>
                <Button
                  type="primary"
                  ghost
                  className="mt-5 inline-flex items-center justify-center"
                >
                  Learn More
                </Button>
              </div>
              <Image
                src="/images/landing/career_feature.svg"
                alt="career feature"
                width={500}
                height={500}
                className="w-full mt-14"
              />
            </div>

            {/* Second Card */}
            <div className="bg-gray-50 w-full md:w-1/2 py-12 flex flex-col justify-between h-full">
              <Image
                src="/images/landing/rental_listing_feature.svg"
                alt="rental listing feature"
                width={500}
                height={500}
                className="w-full"
              />
              <div className="px-12 md:px-14">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  Real Estate &<span className="block">Housing</span>
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-4">
                  Explore properties, calculate mortgages, <span className="block">
            and find the perfect place to call home
          </span>
                  <span className="block">in Canada.</span>
                </p>
                <Button
                  type="primary"
                  ghost
                  className="mt-5 inline-flex items-center justify-center"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}
