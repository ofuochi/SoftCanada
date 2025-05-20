"use client";
import { CategoryBlogList } from "@/components/app/CategoryBlogList";
import { SectionHeading } from "@/components/app/SectionHeading";
import ApplicationFormModal from "@/components/modals/ApplicationFormModal";
import React from "react";
import Image from "next/image";
import { Blogs } from "@/tina/__generated__/types";

type Props = {
  blogs: Blogs[];
};

export const GrantsPageComponent: React.FC<Props> = ({ blogs }) => {
  const [showApplicationForm, setShowApplicationForm] = React.useState(false);
  return (
    <>
      <section className="w-full mx-auto max-w-[1400px] px-5">
        <section className="mt-[100px] mb-10">
          <SectionHeading
            topText=""
            heading="Scholarships Available"
            description="Find fully funded scholarships for various programs."
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <section className="space-y-5">
            <div className="w-full h-[200px] md:h-[250px] overflow-clip rounded-3xl">
              <Image
                width={483}
                height={300}
                alt="cheveningSchorlarships"
                src="/images/landing/ontario_uni.jpg"
                className="object-cover"
              />
            </div>
            <section className="space-y-3">
              <div className="">
                <p className="text-black font-dm_sans font-semibold text-xl md:text-2xl">
                  Ontario Graduate Scholarships
                </p>
              </div>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="border-[0.3px] border-[#FFD7D7] bg-[#FFD7D7] font-poppins font-medium py-2.5 px-2 rounded-[6px] h-[40px] w-full max-w-[180px] flex items-center justify-center"
              >
                Apply Now
              </button>
            </section>
          </section>

          <section className="space-y-5">
            <div className="w-full h-[200px] md:h-[250px] overflow-clip rounded-3xl">
              <Image
                width={483}
                height={300}
                alt="queenMary"
                src="/images/landing/bc_uni.png"
                className="object-cover"
              />
            </div>
            <section className="space-y-3">
              <div className="">
                <p className="text-black font-dm_sans font-semibold text-xl md:text-2xl">
                  University of British Columbia
                </p>
              </div>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="border-[0.3px] border-[#FFD7D7] bg-[#FFD7D7] font-poppins font-medium py-2.5 px-2 rounded-[6px] h-[40px] w-full max-w-[180px] flex items-center justify-center"
              >
                Apply Now
              </button>
            </section>
          </section>

          <section className="space-y-5">
            <div className="w-full h-[200px] md:h-[250px] overflow-clip rounded-3xl">
              <Image
                width={483}
                height={300}
                alt="irelandSchorlarship"
                src="/images/landing/otherProvincesImg.jpg"
                className="object-cover"
              />
            </div>
            <section className="space-y-3">
              <div className="">
                <p className="text-black font-dm_sans font-semibold text-xl md:text-2xl">
                  Other Provinces
                </p>
              </div>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="border-[0.3px] border-[#FFD7D7] bg-[#FFD7D7] font-poppins font-medium py-2.5 px-2 rounded-[6px] h-[40px] w-full max-w-[180px] flex items-center justify-center"
              >
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
        <CategoryBlogList category="Study" blogPosts={blogs} />
      </section>
      <ApplicationFormModal
        isModalOpen={showApplicationForm}
        setIsModalOpen={setShowApplicationForm}
      />
    </>
  );
};

