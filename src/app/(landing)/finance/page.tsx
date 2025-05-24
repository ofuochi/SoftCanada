import { dbConnection } from "@/lib/db-conn";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs, LandingBlocksResourceCardsSection } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";
import FinanceHero from "@/components/landing/finance/FinanceHero";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const ResourceCardsSectionBlock = ({
  block,
}: {
  block: LandingBlocksResourceCardsSection;
}) => {
  return (
    <section className="w-full mx-auto max-w-[1400px] px-5">
      <section className="mt-[100px] mb-10">
        {block.heading && (
          <SectionHeading
            topText=""
            heading={block.heading}
            description={block.description ? <TinaMarkdown content={block.description} /> : ""}
          />
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {block.cards?.map((card, index) => {
          if (!card) return <div key={index}></div>;
          const imageSrc = card.image || "/images/landing/mortgageCalculator.jpg"; // Fallback image
          const imageAlt = card.imageAlt || card.title || "Resource card image";

          return (
            <section key={index} className="space-y-[30px]">
              <div className="w-full h-fit rounded-3xl">
                <Image
                  width={483}
                  height={364}
                  alt={imageAlt}
                  src={imageSrc}
                  className="object-cover"
                />
              </div>
              <section className="space-y-6">
                <div className="space-y-3">
                  <p className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                    {card.title}
                  </p>
                  <p className="text-black text-xl">{card.text}</p>
                </div>
                {card.buttonText && card.buttonLink && (
                  <Link
                    href={card.buttonLink}
                    className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center"
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

export default async function FinancePage() {
  const result = await dbConnection.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await dbConnection.queries.landing({
    relativePath: "finance.md",
  });

  return (
    <section className="-mt-16">
      {query?.data?.landing?.blocks?.map((block, i) => {
        if (!block) return <div key={i}></div>;
        switch (block.__typename) {
          case "LandingBlocksWelcomeHero":
            return (
              <section key={`welcomeHero-${i}`}>
                <FinanceHero {...block} />
              </section>
            );
          case "LandingBlocksResourceCardsSection":
            return <ResourceCardsSectionBlock key={`resourceCards-${i}`} block={block} />;
          default:
            return <div key={`default-${i}`}></div>;
        }
      })}

      <section className="my-[120px]">
        <section className="mb-[50px]">
          <SectionHeading
            topText="Blog Section"
            heading="Guides & Tips"
            description="Explore key factors to consider when funding your next rental."
          />
        </section>
        <CategoryBlogList category="Finance" blogPosts={allBlogs as Blogs[]} />
      </section>
    </section>
  );
}

