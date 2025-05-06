import { dbConnection } from "@/lib/db-conn";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import LifestyleHero from "@/components/landing/lifestyle/LifestyleHero";

export default async function LifestylePage() {
  const result = await dbConnection.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await dbConnection.queries.landing({
    relativePath: "lifestyle.md",
  });

  return (
    <section className="-mt-16">
      {query?.data?.landing?.blocks?.map((block, i) => {
        if (!block) return <></>;
        switch (block.__typename) {
          case "LandingBlocksWelcomeHero":
            return (
              <section key={i}>
                <LifestyleHero {...block} />
              </section>
            );
          default:
            return <></>;
        }
      })}

      <section className="my-[120px]">
        <section className="mb-[50px]">
          <SectionHeading
            topText="Blog Section"
            heading="Guides & Tips"
            description="Discover mindful approaches to create a balanced and fulfilling everyday life."
          />
        </section>
        <CategoryBlogList
          category="Lifestyle"
          blogPosts={allBlogs as Blogs[]}
        />
      </section>
    </section>
  );
}

