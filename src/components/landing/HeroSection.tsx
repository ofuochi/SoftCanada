"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  LandingBlocksWelcomeHero,
  LandingQuery,
} from "@/tina/__generated__/types";
import Link from "next/link";
import React, { useState } from "react";
import SampleModal from "../modals/SampleModal";

type Props = LandingBlocksWelcomeHero & {
  cmsQuery?: any;
};

const HeroSection: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  // Re-hydrate Tina content on client (only in edit mode)
  const { data } = useTina<LandingQuery>(props.cmsQuery);

  const heroBlock = data?.landing?.blocks?.find(
    (b) => b?.__typename === "LandingBlocksWelcomeHero"
  );

  const { backgroundImage, message, buttonLink, buttonText } =
    heroBlock ?? props;

  return (
    <section
      className="relative w-full mx-auto overflow-hidden shadow-lg bg-white"
      style={{ height: "80vh" }}
      id="hero-section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        data-tina-field={tinaField(heroBlock, "backgroundImage")}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex flex-col justify-end items-start pb-10 h-full px-8 sm:px-16 text-white z-10">
        <div className="w-full sm:max-w-[50%]">
          <div data-tina-field={tinaField(heroBlock, "message")}>
            <TinaMarkdown
              content={message}
              components={{
                h1: (p: any) => (
                  <h1
                    className="text-3xl sm:text-5xl font-bold leading-snug break-words"
                    {...p}
                  />
                ),
                p: (p: any) => (
                  <p className="text-lg mt-4 break-words" {...p} />
                ),
                break: () => <br />,
              }}
            />
          </div>

          <div className="mt-8">
            {/* <Link
              href={buttonLink}
              data-tina-field={tinaField(heroBlock, "buttonText")}
              className="bg-red-600 hover:bg-red-500 text-nowrap text-white font-semibold px-10 py-3 shadow-md cursor-pointer"
            >
              {buttonText}
            </Link> */}
            <span
              onClick={() => setShowModal(true)}
              data-tina-field={tinaField(heroBlock, "buttonText")}
              className="bg-red-600 hover:bg-red-500 text-nowrap text-white font-semibold px-10 py-3 shadow-md cursor-pointer"
            >
              {buttonText}
            </span>
          </div>
        </div>
      </div>
      <SampleModal isModalOpen={showModal} setIsModalOpen={setShowModal} />
    </section>
  );
};

export default HeroSection;

