import HeroSection from "@/components/landing/HeroSection";
import featuredProperty from "../../../../public/images/landing/featuredProperty.png";
import bed from "../../../../public/images/icons/bed.svg";
import location from "../../../../public/images/icons/location.svg";
import arrowWithCircle from "../../../../public/images/icons/arrowWithCircle.svg";
import client from "@/tina/__generated__/client";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { Blogs } from "@/tina/__generated__/types";
import { SectionHeading } from "@/components/app/SectionHeading";
import Image from "next/image";
import RealEstateHero from "@/components/landing/real-estate/RealEstateHero";

export default async function RealEstatePage() {
  const result = await client.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await client.queries.landing({
    relativePath: "real-estate.md",
  });
  return (
    <section className="">
      {query?.data?.landing?.blocks?.map((block, i) => {
        if (!block) return <></>;
        switch (block.__typename) {
          case "LandingBlocksWelcomeHero":
            return (
              <section key={i}>
                <RealEstateHero {...block} />
              </section>
            );
          default:
            return <></>;
        }
      })}

      <section className="my-[120px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full max-w-[1400px] px-5">
        <section className="border-[0.3px] border-[#4F4F4F] rounded-lg py-5 px-3 space-y-5">
          <div className="w-full max-w-[305px] h-[203px] overflow-clip">
            <Image
              width={305}
              height={203}
              src={featuredProperty}
              alt="featuredProperty"
            />
          </div>
          <p className="text-[#010B18] font-lato font-semibold text-2xl">
            {" "}
            Maple Haven Apartments{" "}
          </p>
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <Image width={24} height={24} src={location} alt="location" />
              <span className="font-poppins text-lg text-[#808080]">
                {" "}
                Toronto, ON{" "}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image width={24} height={24} src={bed} alt="bed" />
              <span className="font-poppins text-lg text-[#808080]">
                {" "}
                1 bedroom{" "}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2.5">
            <span className="font-poppins text-[#010309] font-semibold text-2xl">
              {" "}
              $1,800/month{" "}
            </span>
            <Image
              width={62}
              height={62}
              src={arrowWithCircle}
              alt="arrowWithCircle"
            />
          </div>
        </section>
        <section className="border-[0.3px] border-[#4F4F4F] rounded-lg py-5 px-3 space-y-5">
          <div className="w-full max-w-[305px] h-[203px] overflow-clip">
            <Image
              width={305}
              height={203}
              src={featuredProperty}
              alt="featuredProperty"
            />
          </div>
          <p className="text-[#010B18] font-lato font-semibold text-2xl">
            {" "}
            Maple Haven Apartments{" "}
          </p>
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <Image width={24} height={24} src={location} alt="location" />
              <span className="font-poppins text-lg text-[#808080]">
                {" "}
                Toronto, ON{" "}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image width={24} height={24} src={bed} alt="bed" />
              <span className="font-poppins text-lg text-[#808080]">
                {" "}
                1 bedroom{" "}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2.5">
            <span className="font-poppins text-[#010309] font-semibold text-2xl">
              {" "}
              $1,800/month{" "}
            </span>
            <Image
              width={62}
              height={62}
              src={arrowWithCircle}
              alt="arrowWithCircle"
            />
          </div>
        </section>
        <section className="border-[0.3px] border-[#4F4F4F] rounded-lg py-5 px-3 space-y-5">
          <div className="w-full max-w-[305px] h-[203px] overflow-clip">
            <Image
              width={305}
              height={203}
              src={featuredProperty}
              alt="featuredProperty"
            />
          </div>
          <p className="text-[#010B18] font-lato font-semibold text-2xl">
            {" "}
            Maple Haven Apartments{" "}
          </p>
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <Image width={24} height={24} src={location} alt="location" />
              <span className="font-poppins text-lg text-[#808080]">
                {" "}
                Toronto, ON{" "}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image width={24} height={24} src={bed} alt="bed" />
              <span className="font-poppins text-lg text-[#808080]">
                {" "}
                1 bedroom{" "}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2.5">
            <span className="font-poppins text-[#010309] font-semibold text-2xl">
              {" "}
              $1,800/month{" "}
            </span>
            <Image
              width={62}
              height={62}
              src={arrowWithCircle}
              alt="arrowWithCircle"
            />
          </div>
        </section>
        <section className="border-[0.3px] border-[#4F4F4F] rounded-lg py-5 px-3 space-y-5">
          <div className="w-full max-w-[305px] h-[203px] overflow-clip">
            <Image
              width={305}
              height={203}
              src={featuredProperty}
              alt="featuredProperty"
            />
          </div>
          <p className="text-[#010B18] font-lato font-semibold text-2xl">
            {" "}
            Maple Haven Apartments{" "}
          </p>
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <Image width={24} height={24} src={location} alt="location" />
              <span className="font-poppins text-lg text-[#808080]">
                {" "}
                Toronto, ON{" "}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image width={24} height={24} src={bed} alt="bed" />
              <span className="font-poppins text-lg text-[#808080]">
                {" "}
                1 bedroom{" "}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2.5">
            <span className="font-poppins text-[#010309] font-semibold text-2xl">
              {" "}
              $1,800/month{" "}
            </span>
            <Image
              width={62}
              height={62}
              src={arrowWithCircle}
              alt="arrowWithCircle"
            />
          </div>
        </section>
      </section>

      <section className="my-[120px]">
        <section className="mb-[50px]">
          <SectionHeading
            topText="Blog Section"
            heading="Guides & Tips"
            description="Explore key factors to consider when selecting your next property."
          />
        </section>
        <CategoryBlogList
          category="Real Estate"
          blogPosts={allBlogs as Blogs[]}
        />
      </section>
    </section>
  );
}

