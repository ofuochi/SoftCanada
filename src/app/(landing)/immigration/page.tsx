import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { SectionHeading } from "@/components/app/SectionHeading";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { SectionHeading } from "@/components/app/SectionHeading";
import GetGuidance from "@/components/immigration/GetGuidance";
import ImmigrationHero from "@/components/landing/immigration/ImmigrationHero";
import { dbConnection } from "@/lib/db-conn";
import { Blogs, LandingBlocksFeatureSection } from "@/tina/__generated__/types";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// Define fallback images
const fallbackImages: Record<string, string> = {
  "Decide Where to Begin": "/images/landing/chooseDestination.png",
  "Prepare What You Need": "/images/landing/gatherDocuments.png",
  "Find Your Dream Rental": "/images/landing/dreamRental.png",
  "Move In and Settle Down": "/images/landing/dreamRental.png", // This uses the same image as "Find Your Dream Rental"
};

const FeatureSectionBlock = ({
  block,
}: {
  block: LandingBlocksFeatureSection;
}) => {
  const imageSrc = block.image || fallbackImages[block.title || ""] || "/images/placeholder.png"; // Added a general placeholder
  const imageAlt = block.imageAlt || block.title || "Feature image";
  const imagePosition = block.imagePosition || "left";

  const content = (
    <section className="w-full max-w-[360px] space-y-6">
      <div className="space-y-3">
        {block.text ? (
          <TinaMarkdown content={block.text} />
        ) : (
          <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
            {block.title}
          </h4>
        )}
      </div>
      {block.buttonText && block.buttonLink && (
        <Link href={block.buttonLink}>
          <Button size="large" className="!shadow-none !font-dm_sans">
            {block.buttonText}
          </Button>
        </Link>
      )}
    </section>
  );

  const imageElement = (
    <div className="w-full max-w-[500px] h-[500px]">
      <Image width={500} height={500} src={imageSrc} alt={imageAlt} />
    </div>
  );

  // Special handling for the section that includes GetGuidance
  if (block.title === "Find Your Dream Rental") {
    return (
      <section className="flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
        <GetGuidance />
        {imageElement}
      </section>
    );
  }

  return (
    <section
      className={`flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5 ${
        imagePosition === "left" ? "md:flex-row-reverse" : ""
      }`}
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

export default async function ImmigrationPage() {
  const result = await dbConnection.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await dbConnection.queries.landing({
    relativePath: "immigration.md",
  });

  const welcomeHeroBlock = query?.data?.landing?.blocks?.find(
    (block) => block?.__typename === "LandingBlocksWelcomeHero"
  );
  const featureSectionBlocks = query?.data?.landing?.blocks?.filter(
    (block) => block?.__typename === "LandingBlocksFeatureSection"
  ) as LandingBlocksFeatureSection[] | undefined;

  return (
    <section className="-mt-16">
      {welcomeHeroBlock && welcomeHeroBlock.__typename === "LandingBlocksWelcomeHero" && (
        <section>
          <ImmigrationHero {...welcomeHeroBlock} />
        </section>
      )}

      <section className="w-full max-w-[700px] mx-auto my-[100px]">
        <SectionHeading
          topText="How it Works"
          heading="Your Journey to a New Home Made Simple"
          description="Relocating to a new country can feel overwhelming — but it doesn't have to be. Follow our easy 4-step guide to navigate your immigration journey in Canada. From gathering the right documents to finding community support, we're here to walk with you, every step of the way."
        />
      </section>

      <section className="space-y-[90px]">
        {featureSectionBlocks?.map((block, i) => {
          if (!block) return <div key={i}></div>; // Should not happen with filter
          return <FeatureSectionBlock key={i} block={block} />;
        })}
      </section>

      <section className="my-[120px]">
        <section className="mb-[50px]">
          <SectionHeading topText="" heading="Resources" description="" />
        </section>
        <SectionHeading topText="" heading="Resources" description="" />
        </section>
        <CategoryBlogList
          category="Immigration"
          blogPosts={allBlogs as Blogs[]}
        />
      </section>
    </section>
  );
}
