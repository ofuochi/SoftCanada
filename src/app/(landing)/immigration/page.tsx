import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { SectionHeading } from "@/components/app/SectionHeading";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { SectionHeading } from "@/components/app/SectionHeading";
import GetGuidance from "@/components/immigration/GetGuidance";
import ImmigrationHero from "@/components/landing/immigration/ImmigrationHero";
import { dbConnection } from "@/lib/db-conn";
import { Blogs, LandingBlocksFeatureSection } from "@/tina/__generated__/types";
import GetGuidance from "@/components/immigration/GetGuidance";
import ImmigrationHero from "@/components/landing/immigration/ImmigrationHero";
import { dbConnection } from "@/lib/db-conn";
import { Blogs, LandingBlocksFeatureSection } from "@/tina/__generated__/types";
import FeatureSectionBlockClient from "@/components/app/FeatureSectionBlock"; // Import the new client component

// Define fallback images - these might be better passed to the client component or handled there if generic
const pageSpecificFallbackImages: Record<string, string> = {
  "Decide Where to Begin": "/images/landing/chooseDestination.png",
  "Prepare What You Need": "/images/landing/gatherDocuments.png",
  "Find Your Dream Rental": "/images/landing/dreamRental.png",
  "Move In and Settle Down": "/images/landing/dreamRental.png",
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
          if (!block) return <div key={i}></div>;
          // Special handling for the "Find Your Dream Rental" section remains in the server component
          // as it involves server-side component GetGuidance
          if (block.title === "Find Your Dream Rental") {
            const imageSrc = block.image || pageSpecificFallbackImages[block.title || ""] || "/images/placeholder.png";
            const imageAlt = block.imageAlt || block.title || "Feature image";
            return (
              <section key={i} className="flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
                <GetGuidance />
                <div className="w-full max-w-[500px] h-[500px]">
                  <Image width={500} height={500} src={imageSrc} alt={imageAlt} />
                </div>
              </section>
            );
          }
          return <FeatureSectionBlockClient key={i} block={block} defaultImage={pageSpecificFallbackImages[block.title || ""]} />;
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
