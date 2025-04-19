import HeroSection from "@/components/landing/HeroSection";
import queenMary from "../../../../public/images/landing/queenMary.png";
import undergraduateGrant from "../../../../public/images/landing/undergraduateGrant.png";
import irelandSchorlarship from "../../../../public/images/landing/irelandScholarships.png";
import cheveningSchorlarships from "../../../../public/images/landing/cheveningScholarships.png";
import { dbConnection } from "@/lib/db-conn";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";

export default async function GrantsPage() {
  const result = await dbConnection.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await dbConnection.queries.landing({
    relativePath: "grants.md",
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

      <section className="">
        <h2 className="text-center text-2xl text-black font-semibold my-16 font-lato text-[36px] md:text-[42px] lg:text-[48px] leading-[120%]">
          Popular Grants
        </h2>

        <section className="py-[100px] bg-[#FFD7D752] px-5">
          <section className="w-full max-w-[1400px] gap-16 mx-auto flex flex-col md:flex-row items-center">
            <section className="w-full overflow-clip max-w-[743px] h-[502px] rounded-xl">
              <Image
                width={743}
                height={502}
                src={undergraduateGrant}
                alt="undergraduateGrant"
                className="rounded-xl"
              />
            </section>

            <section className="space-y-8">
              <button className="bg-[#FCFBE7] py-1.5 px-2.5 rounded-md">
                {" "}
                Apply Now!{" "}
              </button>
              <div className="space-y-4">
                <h2 className="text-black font-dm_sans text-[36px] md:text-[42px] lg:text-[48px] leading-[120%]">
                  {" "}
                  Undergraduate Grant{" "}
                </h2>
                <p className="text-[#808080] font-poppins text-lg">
                  {" "}
                  Pursue your academic dreams with financial support tailored
                  for undergraduate students. Apply for grants designed to cover
                  tuition fees, books, and living expenses, helping you focus on
                  what matters most—your education.{" "}
                </p>
              </div>
            </section>
          </section>
        </section>
      </section>

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
