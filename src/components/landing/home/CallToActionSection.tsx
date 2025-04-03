"use client";

import {
  LandingBlocksCallToActionBlock,
  LandingQuery,
} from "@/tina/__generated__/types";
import { Button } from "antd";
import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = LandingBlocksCallToActionBlock & {
  cmsQuery: any;
};

export default function CallToActionSection(props: Props) {
  const { data } = useTina<LandingQuery>(props.cmsQuery);
  const callToActionBlock = data?.landing?.blocks?.find(
    (b) => b?.__typename === "LandingBlocksCallToActionBlock"
  );
  const content = callToActionBlock ?? props;
  const bgImage = content?.bgImage || "/images/landing/cta_section_bg.jpg";
  return (
    <section
      className="relative h-[75vh] w-full bg-cover bg-center"
      data-tina-field={tinaField(content, "bgImage")}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-10">
        <div data-tina-field={tinaField(content, "heading")}>
          <TinaMarkdown
            content={content.heading}
            components={{
              h1: (props: any) => (
                <h1
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
                  {...props}
                />
              ),
              p: (props: any) => (
                <p
                  className="text-base md:text-lg lg:text-xl mb-8"
                  {...props}
                />
              ),
            }}
          />
        </div>

        <Button
          size="large"
          data-tina-field={tinaField(content, "buttonText")}
          className="!shadow-none !font-dm_sans"
          style={{ fontWeight: 600 }}
        >
          {content.buttonText}
        </Button>
      </div>
    </section>
  );
}
