import HeroSection from "@/components/landing/HeroSection";
import client from "@/tina/__generated__/client";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";

export default async function RealEstatePage() {
  const result = await client.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await client.queries.landing({
    relativePath: "career.md",
  });
  return (
    <section className="">
      {query?.data?.landing?.blocks?.map((block, i) => {
        if (!block) return <></>;
        switch (block.__typename) {
          case "LandingBlocksWelcomeHero":
            return (
              <section key={i}>
                <HeroSection {...block} cmsQuery={query} />
              </section>
            );
          default:
            return <></>;
        }
      })}

      <section className="my-[120px]">
        <section className="mb-[50px]">
          <SectionHeading
            topText="Guides & Tips"
            heading="Career Tips"
            description="Explore key factors to consider when selecting your next property."
          />
        </section>
        <CategoryBlogList category="Careers" blogPosts={allBlogs as Blogs[]} />
      </section>
    </section>
  );
}

