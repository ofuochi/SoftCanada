import HeroSection from "@/components/landing/HeroSection";
import client from "@/tina/__generated__/client";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";

export default async function ImmigrationPage() {
  const result = await client.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await client.queries.landing({
    relativePath: "immigration.md",
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

      <section>
        <SectionHeading
          topText="How it Works"
          heading="Your Journey to a New Home Made Simple"
          description="Relocating can be overwhelming, but we're here to make it effortless. Follow our easy 4-step process to find and secure the perfect rental home in Canada. From choosing your destination to moving in, we'll guide you every step of the way"
        />
      </section>

      <section className="flex justify-between items-center gap-5">
        <section className="w-full max-w-[360px]">
          <div className="">
            <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
              {" "}
              Choose Your Destination{" "}
            </h4>
            <p className="text-black font-poppins text-xl">
              {" "}
              Decide where in Canada you'd like to begin your journey. Whether
              it's a bustling city or a serene town, we'll help you explore
              rental options tailored to your needs.{" "}
            </p>
          </div>

          <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[172px]">
            Explore Cities Now!
          </button>
        </section>

        <div className="w-full max-w-[500px] h-[500px]">
          <Image
            width={500}
            height={500}
            src={"./landing/chooseDestination.png"}
            alt="chooseDestination"
          />
        </div>
      </section>

      <section className="my-[120px]">
        <section className="mb-[50px]">
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

