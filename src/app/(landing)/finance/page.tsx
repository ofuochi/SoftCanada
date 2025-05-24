import { dbConnection } from "@/lib/db-conn";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs, LandingBlocksResourceCardsSection } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import { SectionHeading } from "@/components/app/SectionHeading";
import FinanceHero from "@/components/landing/finance/FinanceHero";
import { dbConnection } from "@/lib/db-conn";
import { Blogs, LandingBlocksResourceCardsSection } from "@/tina/__generated__/types";
import ResourceCardsSectionBlockClient from "@/components/app/ResourceCardsSectionBlock"; // Import the new client component

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
            // Pass the block data to the client component
            return <ResourceCardsSectionBlockClient key={`resourceCards-${i}`} block={block} />;
          default:
            return <div key={`default-${i}`}></div>; // Or null, or some other fallback
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

