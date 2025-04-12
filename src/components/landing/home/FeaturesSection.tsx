"use client";

import React from "react";
import { Button } from "antd";
import Image from "next/image";
import {
  LandingBlocksHomepageFeatureBlock,
  LandingQuery,
} from "@/tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useRouter } from "next/navigation";

type Props = LandingBlocksHomepageFeatureBlock & {
  cmsQuery?: any;
};
export default function FeaturesSection(props: Props) {
  const { data } = useTina<LandingQuery>(props.cmsQuery);
  const { push } = useRouter();
  const featuresBlock = data?.landing?.blocks?.find(
    (b) => b?.__typename === "LandingBlocksHomepageFeatureBlock"
  );
  const content = featuresBlock ?? props;

  return (
    <>
      {/* Features Section 1*/}
      <section className="mt-12 w-full">
        <div
          className="text-center"
          data-tina-field={tinaField(content, "sectionTitle")}
        >
          <TinaMarkdown
            content={content.sectionTitle}
            components={{
              h3: (props) => (
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-center mx-auto max-w-[12ch] md:max-w-[20ch] lg:max-w-[30ch] px-4 leading-tight"
                  {...props}
                />
              ),
              p: (props) => (
                <p
                  className="text-sm md:text-base text-gray-600 mb-5"
                  {...props}
                />
              ),
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4">
          {/* Jobs Card */}
          <div className="bg-gray-50 px-4 sm:px-8 md:px-14 w-full pt-12 flex flex-col flex-1">
            <div>
              <div data-tina-field={tinaField(content, "jobFeature")}>
                <TinaMarkdown
                  content={content.jobFeature?.heading}
                  components={{
                    h3: (props) => (
                      <h3
                        className="text-xl md:text-2xl lg:text-3xl font-semibold"
                        {...props}
                      />
                    ),
                    p: (props) => (
                      <p
                        className="text-sm md:text-base lg:text-lg text-gray-400 mt-4"
                        {...props}
                      />
                    ),
                  }}
                />
              </div>
              <Button
                type="default"
                onClick={() => push(content.jobFeature!.buttonLink!)}
                data-tina-field={tinaField(content, "jobFeature")}
                className="mt-5 shadow-none !font-dm_sans border !border-black"
              >
                {content.jobFeature?.buttonText}
              </Button>
            </div>
            <Image
              src={content.jobFeature!.image!}
              data-tina-field={tinaField(content, "jobFeature")}
              alt="career feature"
              width={10}
              height={10}
              className="w-full mt-14 flex-shrink-0"
            />
          </div>

          {/* Real Estate Card */}
          <div className="bg-gray-50 w-full py-12 flex flex-col flex-1">
            <Image
              src={
                content.realEstateFeature?.image ||
                "/images/landing/real_estate_feature.jpg"
              }
              data-tina-field={tinaField(content, "realEstateFeature")}
              alt="rental listing feature"
              width={10}
              height={10}
              className="w-full flex-shrink-0"
            />
            <div className="px-4 sm:px-8 md:px-14 mt-auto">
              <div data-tina-field={tinaField(content, "realEstateFeature")}>
                <TinaMarkdown
                  content={content.realEstateFeature?.heading}
                  components={{
                    h3: (props) => (
                      <h3
                        className="text-xl md:text-2xl lg:text-3xl font-semibold"
                        {...props}
                      />
                    ),
                    p: (props) => (
                      <p
                        className="text-sm md:text-base lg:text-lg text-gray-400 mt-4"
                        {...props}
                      />
                    ),
                  }}
                />
              </div>
              <Button
                type="default"
                onClick={() => push(content.realEstateFeature!.buttonLink!)}
                data-tina-field={tinaField(content, "realEstateFeature")}
                className="mt-5 shadow-none !font-dm_sans border !border-black"
              >
                {content.realEstateFeature?.buttonText}
              </Button>
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
              src={
                content.financeFeature?.image ||
                "/images/landing/finance_feature.jpg"
              }
              data-tina-field={tinaField(content, "financeFeature")}
              alt="finance feature"
              width={10}
              height={10}
              className="w-full px-4 sm:px-8 md:px-14 flex-shrink-0"
            />
            <div className="px-4 sm:px-8 md:px-14">
              <div data-tina-field={tinaField(content, "financeFeature")}>
                <TinaMarkdown
                  content={content.financeFeature?.heading}
                  components={{
                    h3: (props) => (
                      <h3
                        className="text-xl md:text-2xl lg:text-3xl font-semibold"
                        {...props}
                      />
                    ),
                    p: (props) => (
                      <p
                        className="text-sm md:text-base lg:text-lg text-gray-400 mt-4"
                        {...props}
                      />
                    ),
                  }}
                />
              </div>
              <div className="flex">
                <Button
                  type="default"
                  data-tina-field={tinaField(content, "financeFeature")}
                  onClick={() => push(content.financeFeature!.buttonLink!)}
                  className="mt-5 shadow-none !font-dm_sans border !border-black"
                >
                  {content.financeFeature?.buttonText}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[65%] flex flex-col gap-4">
            {/* Immigration News Card */}
            <div className="bg-gray-50 pt-10 flex flex-col flex-1">
              <div className="px-4 sm:px-8 md:px-14 flex-1">
                <div data-tina-field={tinaField(content, "immigrationFeature")}>
                  <TinaMarkdown
                    content={content.immigrationFeature?.heading}
                    components={{
                      h3: (props) => (
                        <h3
                          className="text-xl md:text-2xl lg:text-3xl font-semibold"
                          {...props}
                        />
                      ),
                      p: (props) => (
                        <p
                          className="text-sm md:text-base lg:text-lg text-gray-400 mt-4"
                          {...props}
                        />
                      ),
                    }}
                  />
                </div>
                <Button
                  type="default"
                  data-tina-field={tinaField(content, "immigrationFeature")}
                  onClick={() => push(content.immigrationFeature!.buttonLink!)}
                  className="mt-5 shadow-none !font-dm_sans border !border-black"
                >
                  {content.immigrationFeature?.buttonText}
                </Button>
              </div>
              <div
                className="flex-1 relative"
                data-tina-field={tinaField(content, "immigrationFeature")}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent z-10"></div>
                <Image
                  src={
                    content.immigrationFeature?.image ||
                    "/images/landing/immigration_feature.jpg"
                  }
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
                src={
                  content.grantsFeature?.image ||
                  "/images/landing/grant_feature.jpg"
                }
                data-tina-field={tinaField(content, "grantsFeature")}
                alt="grant feature"
                height={200}
                width={400}
                className="flex-1 w-full md:w-1/2 h-auto object-contain flex-shrink-0"
              />
              {/* Text Content on the Right */}
              <div className="flex-1 px-4 sm:px-8 md:px-14 mt-5 pb-5">
                <div data-tina-field={tinaField(content, "grantsFeature")}>
                  <TinaMarkdown
                    content={content.grantsFeature?.heading}
                    components={{
                      h3: (props) => (
                        <h3
                          className="text-xl md:text-2xl lg:text-3xl font-semibold"
                          {...props}
                        />
                      ),
                      p: (props) => (
                        <p
                          className="text-sm md:text-base lg:text-lg text-gray-400 mt-4"
                          {...props}
                        />
                      ),
                    }}
                  />
                </div>
                <div className="flex">
                  <Button
                    onClick={() => push(content.grantsFeature!.buttonLink!)}
                    data-tina-field={tinaField(content, "grantsFeature")}
                    type="default"
                    className="mt-5 shadow-none !font-dm_sans border !border-black"
                  >
                    {content.grantsFeature?.buttonText}
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

