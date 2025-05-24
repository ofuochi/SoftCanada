"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingBlocksFeatureSection } from "@/tina/__generated__/types";

// Define fallback images (can be expanded or passed as props if needed)
const fallbackImages: Record<string, string> = {
  default: "/images/placeholder.png", // A general default
  // Specific defaults can be added if a common pattern emerges
};

interface FeatureSectionBlockProps {
  block: LandingBlocksFeatureSection;
  defaultImage?: string; // Optional prop for a page-specific default image
}

const FeatureSectionBlockClient: React.FC<FeatureSectionBlockProps> = ({ block, defaultImage }) => {
  const imageSrc = block.image || defaultImage || fallbackImages[block.title || ""] || fallbackImages.default;
  const imageAlt = block.imageAlt || block.title || "Feature image";
  const imagePosition = block.imagePosition || "left";

  const content = (
    <section className="w-full max-w-[550px] space-y-6"> {/* Adjusted max-width from study grant, seems reasonable */}
      {/* Render button if text and link exist - allowing button to be styled by page if needed */}
      {block.buttonText && block.buttonLink && block.buttonLink !== "#" && (
         <Link href={block.buttonLink}>
           <Button size="large" className="!shadow-none !font-dm_sans mb-4"> {/* Basic button styling */}
             {block.buttonText}
           </Button>
         </Link>
       )}
      <div className="space-y-3">
        <h2 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl lg:text-4xl">
          {block.title}
        </h2>
        {block.text ? (
          <TinaMarkdown content={block.text} />
        ) : null}
      </div>
       {/* Secondary button rendering option (if buttonLink is not #), or different styling needed by page */}
       {/* This part might be redundant if the above button is always sufficient */}
    </section>
  );

  const imageElement = (
    <div className="w-full max-w-[743px] h-auto md:h-[502px] rounded-xl overflow-clip">
      <Image
        width={743} // Max width from study grant image
        height={502} // Max height from study grant image
        src={imageSrc}
        alt={imageAlt}
        className="rounded-xl object-cover w-full h-full"
      />
    </div>
  );

  return (
    // Basic section structure, page-specific styling (like bg color) will be handled in the page
    <section
      className={`w-full max-w-[1400px] gap-8 md:gap-16 mx-auto flex flex-col ${
        imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
      } items-center px-5 py-10 md:py-16`} // Added padding
    >
      {imagePosition === "left" ? (
        <>
          {content}
          {imageElement}
        </>
      ) : (
        <>
          {imageElement}
          {content}
        </>
      )}
    </section>
  );
};

export default FeatureSectionBlockClient;
