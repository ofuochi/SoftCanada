"use client";

import Image from "next/image";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingBlocksResourceCardsSection } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading"; // Assuming SectionHeading is a client component or can be used in one

interface ResourceCardsSectionBlockProps {
  block: LandingBlocksResourceCardsSection;
}

const ResourceCardsSectionBlockClient: React.FC<ResourceCardsSectionBlockProps> = ({ block }) => {
  return (
    <section className="w-full mx-auto max-w-[1400px] px-5 py-10 md:py-16"> {/* Added padding */}
      <section className="mb-10">
        {block.heading && ( // block.heading is rich-text
          <SectionHeading
            topText="" // topText can be configured if needed or removed
            // For heading, if SectionHeading expects string, we might need to adjust
            // or pass a specific part of the rich text. For now, assuming it can handle it or content is simple.
            // If SectionHeading's `heading` prop is string, and block.heading is rich-text,
            // this might not render complex rich text.
            // A better approach would be for SectionHeading to accept TinaMarkdownContent for its 'heading' prop
            // or render TinaMarkdown directly here for the heading.
            // For now, let's assume simple text in heading or SectionHeading handles it.
            // heading={block.heading} // This will pass the rich-text object
            // A simple way if heading is just a simple H2:
            heading={<TinaMarkdown content={block.heading} />} // Render heading as TinaMarkdown
            description={block.description ? <TinaMarkdown content={block.description} /> : ""}
          />
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {block.cards?.map((card, index) => {
          if (!card) return <div key={index}></div>;
          // Fallback image specific to mortgage calculator or a general one
          const imageSrc = card.image || "/images/landing/mortgageCalculator.jpg";
          const imageAlt = card.imageAlt || card.title || "Resource card image";

          return (
            <section key={index} className="space-y-[30px]">
              <div className="w-full h-fit rounded-3xl overflow-clip"> {/* Added overflow-clip */}
                <Image
                  width={483}
                  height={364}
                  alt={imageAlt}
                  src={imageSrc}
                  className="object-cover w-full h-full"
                />
              </div>
              <section className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl"> {/* Changed p to h3 for semantics */}
                    {card.title}
                  </h3>
                  {card.text && <p className="text-black text-xl">{card.text}</p>}
                </div>
                {card.buttonText && card.buttonLink && (
                  <Link
                    href={card.buttonLink}
                    className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center hover:bg-gray-100 transition-colors" // Added hover effect
                  >
                    {card.buttonText}
                  </Link>
                )}
              </section>
            </section>
          );
        })}
      </section>
    </section>
  );
};

export default ResourceCardsSectionBlockClient;
