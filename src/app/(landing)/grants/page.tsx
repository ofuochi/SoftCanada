import HeroSection from "@/components/landing/HeroSection";
import cheveningSchorlarships from "../../../../public/images/landing/cheveningScholarships.png";
import irelandSchorlarship from "../../../../public/images/landing/irelandScholarships.png";
import queenMary from "../../../../public/images/landing/queenMary.png";
import client from "@/tina/__generated__/client";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";

export default async function GrantsPage() {
  const result = await client.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await client.queries.landing({
    relativePath: "grants.md",
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

      <section className="w-full mx-auto max-w-[1400px] px-5">
        <section className="mt-[100px] mb-10">
          <SectionHeading
            topText=""
            heading="Scholarships Available"
            description="Find fully funded scholarships for various programs."
          />
          <div className="flex justify-center">
            <button className="bg-[#010309] w-full max-w-[300px] mx-auto text-white font-lato  py-4 px-6 rounded-xl mt-5">
              {" "}
              Discover Opportunities{" "}
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <section className="space-y-[30px]">
            <div className="w-full h-[250px] overflow-clip rounded-3xl">
              <Image
                width={483}
                height={364}
                alt="cheveningSchorlarships"
                src={cheveningSchorlarships}
                className="object-cover"
              />
            </div>
            <section className="space-y-6">
              <div className="space-y-3">
                <p className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                  Chevening Scholarship
                </p>
                <p className="text-black text-xl"> Chevening Scholarship</p>
              </div>
              <button className="border-[0.3px] border-[#FFD7D7] bg-[#FFD7D7] font-poppins font-semibold py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
                Apply Now
              </button>
            </section>
          </section>

          <section className="space-y-[30px]">
            <div className="w-full h-[250px] overflow-clip rounded-3xl">
              <Image
                width={483}
                height={364}
                alt="irelandSchorlarship"
                src={irelandSchorlarship}
                className="object-cover"
              />
            </div>
            <section className="space-y-6">
              <div className="space-y-3">
                <p className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                  Government of Ireland
                </p>
                <p className="text-black text-xl"> Ireland Scholarships</p>
              </div>
              <button className="border-[0.3px] border-[#FFD7D7] bg-[#FFD7D7] font-poppins font-semibold py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
                Apply Now
              </button>
            </section>
          </section>

          <section className="space-y-[30px]">
            <div className="w-full h-[250px] overflow-clip rounded-3xl">
              <Image
                width={483}
                height={364}
                alt="queenMary"
                src={queenMary}
                className="object-cover"
              />
            </div>
            <section className="space-y-6">
              <div className="space-y-3">
                <p className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                  Queen Maryland- Australia
                </p>
                <p className="text-black text-xl"> Queen Maryland University</p>
              </div>
              <button className="border-[0.3px] border-[#FFD7D7] bg-[#FFD7D7] font-poppins font-semibold py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
                Apply Now
              </button>
            </section>
          </section>
        </section>
      </section>

      <section className="my-[120px]">
        <section className="mb-[50px]">
          <SectionHeading
            topText="Blog Section"
            heading="Study Tips"
            description="Maximize your study efforts with our expert advice."
          />
        </section>
        <CategoryBlogList category="" blogPosts={allBlogs as Blogs[]} />
      </section>
    </section>
  );
}

