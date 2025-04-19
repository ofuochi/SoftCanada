import HeroSection from "@/components/landing/HeroSection";
import budgetTools from "../../../../public/images/landing/budgetTools.png";
import investmentTips from "../../../../public/images/landing/investementTips.png";
import { dbConnection } from "@/lib/db-conn";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";

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

      <section className="w-full mx-auto max-w-[1400px] px-5">
        <section className="mt-[100px] mb-10">
          <SectionHeading
            topText=""
            heading="Finance Resources"
            description="Take control of your finances with tools and resources tailored for newcomers. Learn how to manage your money, secure loans, and grow your wealth while settling into your new life."
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <section className="space-y-[30px]">
            <div className="w-full h-fit rounded-3xl">
              <Image
                width={483}
                height={364}
                alt="budgetTools"
                src={budgetTools}
                className="object-cover"
              />
            </div>
            <section className="space-y-6">
              <div className="space-y-3">
                <p className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                  Budget Tools
                </p>
                <p className="text-black text-xl">
                  {" "}
                  Track and plan your expenses effortlessly.{" "}
                </p>
              </div>
              <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
                Explore
              </button>
            </section>
          </section>

          <section className="space-y-[30px]">
            <div className="w-full h-fit rounded-3xl">
              <Image
                width={483}
                height={364}
                alt="investmentTips"
                src={investmentTips}
                className="object-cover"
              />
            </div>
            <section className="space-y-6">
              <div className="space-y-3">
                <p className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                  Investment Tips
                </p>
                <p className="text-black text-xl">
                  {" "}
                  Discover the basics of growing your savings.
                </p>
              </div>
              <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
                Explore
              </button>
            </section>
          </section>

          <section className="space-y-[30px]">
            <div className="w-full h-fit rounded-3xl">
              <Image
                width={483}
                height={364}
                alt="budgetTools"
                src={budgetTools}
                className="object-cover"
              />
            </div>
            <section className="space-y-6">
              <div className="space-y-3">
                <p className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                  Financial resources
                </p>
                <p className="text-black text-xl">
                  {" "}
                  Explore guides to managing your money better.
                </p>
              </div>
              <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
                Explore
              </button>
            </section>
          </section>
        </section>
      </section>

      <section className="my-[120px]">
        <section className="mb-[50px]">
          <SectionHeading
            topText="Blog Section"
            heading="Guides & Tips"
            description="Explore key factors to consider when funding your next rental."
          />
        </section>
        <CategoryBlogList category="" blogPosts={allBlogs as Blogs[]} />
      </section>
    </section>
  );
}
