import GrantsHero from "@/components/landing/grants/GrantsHero";
import { GrantsPageComponent } from "@/components/landing/grants/GrantsPageComponent";
import { dbConnection } from "@/lib/db-conn";
import { Blogs, LandingBlocksFeatureSection } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import GrantsHero from "@/components/landing/grants/GrantsHero";
import { GrantsPageComponent } from "@/components/landing/grants/GrantsPageComponent";
import { dbConnection } from "@/lib/db-conn";
import { Blogs, LandingBlocksFeatureSection } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import FeatureSectionBlockClient from "@/components/app/FeatureSectionBlock"; // Import the new client component

// Fallback image for the grant - can be passed to the client component
const fallbackGrantImage = "/images/landing/undergraduateGrant.png";


export default async function GrantsPage() {
  const result = await dbConnection.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await dbConnection.queries.landing({
    relativePath: "grants.md",
  });

  const welcomeHeroBlock = query?.data?.landing?.blocks?.find(
    (b) => b?.__typename === "LandingBlocksWelcomeHero"
  );
  const featureSectionBlocks = query?.data?.landing?.blocks?.filter(
    (b) => b?.__typename === "LandingBlocksFeatureSection"
  ) as LandingBlocksFeatureSection[] | undefined;

  return (
    <div className="-mt-16">
      {welcomeHeroBlock && (
        <section>
          <GrantsHero {...welcomeHeroBlock} />
        </section>
      )}

      {featureSectionBlocks && featureSectionBlocks.length > 0 && (
        <section className="my-10 md:my-16">
          <SectionHeading
            topText=""
            heading="Popular Grants"
            description=""
          />
          <div className="space-y-10 md:space-y-16 mt-8 md:mt-12">
            {featureSectionBlocks.map((block, i) => (
              // Apply specific styling for this page's FeatureSectionBlock if needed,
              // or pass props to the client component to handle variations.
              // The bg-[#FFD7D752] and py-[50px/100px] was part of the old local component.
              // This should ideally be handled by client component or a wrapper.
              // For now, wrapping with a section to apply the background.
              <section key={i} className="py-[50px] md:py-[100px] bg-[#FFD7D752] px-5">
                <FeatureSectionBlockClient block={block} defaultImage={fallbackGrantImage} />
              </section>
            ))}
          </div>
        </section>
      )}

      <GrantsPageComponent blogs={allBlogs as Blogs[]} />
    </div>
  );
}

