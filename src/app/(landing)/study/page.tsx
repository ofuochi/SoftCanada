import GrantsHero from "@/components/landing/grants/GrantsHero";
import { GrantsPageComponent } from "@/components/landing/grants/GrantsPageComponent";
import { dbConnection } from "@/lib/db-conn";
import { Blogs, LandingBlocksFeatureSection } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// Fallback image for the grant
const fallbackGrantImage = "/images/landing/undergraduateGrant.png";

const FeatureSectionBlock = ({
  block,
}: {
  block: LandingBlocksFeatureSection;
}) => {
  const imageSrc = block.image || fallbackGrantImage;
  const imageAlt = block.imageAlt || block.title || "Feature image";
  const imagePosition = block.imagePosition || "left"; // Default to left if not specified

  const content = (
    <section className="w-full max-w-[550px] space-y-6"> {/* Adjusted max-width for grant layout potentially */}
      {block.buttonText && (
         <button className="bg-[#FCFBE7] py-1.5 px-2.5 rounded-md mb-4"> {/* Styling from original commented code */}
           {block.buttonText}
         </button>
      )}
      <div className="space-y-3">
        <h2 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl lg:text-4xl"> {/* Adjusted heading size */}
          {block.title}
        </h2>
        {block.text && <TinaMarkdown content={block.text} />}
      </div>
      {/* Original button was outside the main text div, if buttonLink is used by CMS, it would be here */}
      {block.buttonText && block.buttonLink && block.buttonLink !== "#" && (
         <Link href={block.buttonLink}>
           <Button size="large" className="!shadow-none !font-dm_sans mt-4">
             {block.buttonText} {/* Re-using buttonText if link exists and is not just # */}
           </Button>
         </Link>
       )}
    </section>
  );

  const imageElement = (
    <div className="w-full max-w-[743px] h-auto md:h-[502px] rounded-xl overflow-clip"> {/* Adjusted for grant image aspect */}
      <Image
        width={743}
        height={502}
        src={imageSrc}
        alt={imageAlt}
        className="rounded-xl object-cover w-full h-full"
      />
    </div>
  );

  return (
    <section className="py-[50px] md:py-[100px] bg-[#FFD7D752] px-5"> {/* Background from original commented code */}
      <section
        className={`w-full max-w-[1400px] gap-8 md:gap-16 mx-auto flex flex-col ${
          imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse" // Standard image left/right logic
        } items-center`}
      >
        {imagePosition === "left" ? (
          <>
            {imageElement}
            {content}
          </>
        ) : (
          <>
            {content}
            {imageElement}
          </>
        )}
      </section>
    </section>
  );
};

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
              <FeatureSectionBlock key={i} block={block} />
            ))}
          </div>
        </section>
      )}

      <GrantsPageComponent blogs={allBlogs as Blogs[]} />
    </div>
  );
}

