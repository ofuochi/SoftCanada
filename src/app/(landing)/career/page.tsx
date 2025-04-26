import client from "@/tina/__generated__/client";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import CareerHero from "@/components/landing/career/CareerHero";

export default async function CareerPage() {
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
                <CareerHero {...block} />
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
        <CategoryBlogList category="" blogPosts={allBlogs as Blogs[]} />
      </section>
    </section>
  );
}

