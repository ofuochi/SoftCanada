import HeroSection from "@/components/landing/HeroSection";
import { dbConnection } from "@/lib/db-conn";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";
import ImmigrationHero from "@/components/landing/immigration/ImmigrationHero";
import GetGuidance from "@/components/immigration/GetGuidance";

export default async function ImmigrationPage() {
  const result = await dbConnection.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await dbConnection.queries.landing({
    relativePath: "immigration.md",
  });
  return (
    <section className="-mt-16">
      {query?.data?.landing?.blocks?.map((block, i) => {
        if (!block) return <></>;
        switch (block.__typename) {
          case "LandingBlocksWelcomeHero":
            return (
              <section key={i}>
                <ImmigrationHero {...block} />
              </section>
            );
          default:
            return <></>;
        }
      })}

      <section className="w-full max-w-[700px] mx-auto my-[100px]">
        <SectionHeading
          topText="How it Works"
          heading="Your Journey to a New Home Made Simple"
          description="Relocating to a new country can feel overwhelming — but it doesn't have to be. Follow our easy 4-step guide to navigate your immigration journey in Canada. From gathering the right documents to finding community support, we're here to walk with you, every step of the way."
        />
      </section>

      <section className="space-y-[90px]">
        <section className=" flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
          <section className="w-full max-w-[360px] space-y-6">
            <div className="space-y-3">
              <p className="text-[#4F4F4F] font-lato text-xl md:text-2xl">
                Choose Your Destination
              </p>
              <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                {" "}
                Decide Where to Begin
              </h4>
              <p className="text-black font-poppins text-xl">
                {" "}
                Decide where in Canada you'd like to begin your journey. Whether
                it's a bustling city or a serene town, we'll help you explore
                rental options tailored to your needs.{" "}
              </p>
            </div>

            {/* <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
              Explore Cities Now!
            </button> */}
          </section>

          <div className="w-full max-w-[500px] h-[500px]">
            <Image
              width={500}
              height={500}
              src="/images/landing/chooseDestination.png"
              alt="chooseDestination"
            />
          </div>
        </section>

        <section className=" flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
          <div className="w-full max-w-[500px] h-[500px]">
            <Image
              width={500}
              height={500}
              src="/images/landing/gatherDocuments.png"
              alt="gatherDocuments"
            />
          </div>

          <section className="w-full max-w-[360px] space-y-6">
            <div className="space-y-3">
              <p className="text-[#4F4F4F] font-lato text-xl md:text-2xl">
                Gather Required Documents
              </p>
              <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                Prepare What You Need
              </h4>
              <p className="text-black font-poppins text-xl">
                Ensure you have all necessary immigration paperwork ready —
                including identification, proof of funds, academic records, or
                work experience documentation. Use our checklist to stay
                organized and increase your chances of a smooth application
                process.
              </p>
            </div>

            <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
              View Checklist
            </button>
          </section>
        </section>

        <section className=" flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
          <GetGuidance />

          <div className="w-full max-w-[500px] h-[500px]">
            <Image
              width={500}
              height={500}
              src="/images/landing/dreamRental.png"
              alt="dreamRental"
            />
          </div>
        </section>

        <section className=" flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
          <div className="w-full max-w-[500px] h-[500px]">
            <Image
              width={500}
              height={500}
              src="/images/landing/dreamRental.png"
              alt="dreamRental"
            />
          </div>

          <section className="w-full max-w-[360px] space-y-6">
            <div className="space-y-3">
              <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                Move In and Settle Down
              </h4>
              <p className="text-black font-poppins text-xl">
                Welcome to Canada You've made it — now it's time to feel at
                home. Explore our curated tips on settling into Canadian life,
                including finding a doctor, understanding public transportation,
                registering for healthcare, and connecting with local
                communities.
              </p>
            </div>

            <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
              Access Tips
            </button>
          </section>
        </section>
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

