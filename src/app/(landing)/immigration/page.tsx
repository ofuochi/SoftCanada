import HeroSection from "@/components/landing/HeroSection";
import client from "@/tina/__generated__/client";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";
import chooseDestination from "../../../../public/images/landing/chooseDestination.png";
import gatherDocuments from "../../../../public/images/landing/gatherDocuments.png";
import dreamRental from "../../../../public/images/landing/dreamRental.png";
import moveIn from "../../../../public/images/landing/moveIn.png";
import ImmigrationHero from "@/components/landing/immigration/ImmigrationHero";

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
          description="Relocating can be overwhelming, but we're here to make it effortless. Follow our easy 4-step process to find and secure the perfect rental home in Canada. From choosing your destination to moving in, we'll guide you every step of the way"
        />
      </section>

      <section className="space-y-[90px]">
        <section className=" flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
          <section className="w-full max-w-[360px] space-y-6">
            <div className="space-y-3">
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

            <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
              Explore Cities Now!
            </button>
          </section>

          <div className="w-full max-w-[500px] h-[500px]">
            <Image
              width={500}
              height={500}
              src={chooseDestination}
              alt="chooseDestination"
            />
          </div>
        </section>

        <section className=" flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
          <div className="w-full max-w-[500px] h-[500px]">
            <Image
              width={500}
              height={500}
              src={gatherDocuments}
              alt="gatherDocuments"
            />
          </div>

          <section className="w-full max-w-[360px] space-y-6">
            <div className="space-y-3">
              <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                Gather Required Documents
              </h4>
              <p className="text-black font-poppins text-xl">
                Ensure you have all necessary paperwork, such as identification,
                proof of income, and references, to streamline your rental
                application process.
              </p>
            </div>

            <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
              View Checklist
            </button>
          </section>
        </section>

        <section className=" flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
          <section className="w-full max-w-[360px] space-y-6">
            <div className="space-y-3">
              <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                Apply for Your Dream Rental
              </h4>
              <p className="text-black font-poppins text-xl">
                Submit your rental application with ease. Our platform provides
                a secure way to connect with landlords and finalize your new
                home.
              </p>
            </div>

            <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
              Start Your Application
            </button>
          </section>

          <div className="w-full max-w-[500px] h-[500px]">
            <Image
              width={500}
              height={500}
              src={dreamRental}
              alt="dreamRental"
            />
          </div>
        </section>

        <section className=" flex flex-col md:flex-row justify-between items-center gap-5 w-full max-w-[1200px] mx-auto px-5">
          <div className="w-full max-w-[500px] h-[500px]">
            <Image
              width={500}
              height={500}
              src={dreamRental}
              alt="dreamRental"
            />
          </div>

          <section className="w-full max-w-[360px] space-y-6">
            <div className="space-y-3">
              <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
                Move In and Settle Down
              </h4>
              <p className="text-black font-poppins text-xl">
                Congratulations! You're now ready to settle into your new home.
                Explore neighborhood guides and resources to make your
                transition smooth.
              </p>
            </div>

            <button className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center">
              Access Move-In Tips
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

