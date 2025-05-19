import GrantsHero from "@/components/landing/grants/GrantsHero";
import { GrantsPageComponent } from "@/components/landing/grants/GrantsPageComponent";
import { dbConnection } from "@/lib/db-conn";
import { Blogs } from "@/tina/__generated__/types";

export default async function GrantsPage() {
  const result = await dbConnection.queries.blogsConnection();
  const allBlogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const query = await dbConnection.queries.landing({
    relativePath: "grants.md",
  });
  return (
    <div className="-mt-16">
      {query?.data?.landing?.blocks?.map((block, i) => {
        if (!block) return <></>;

        switch (block.__typename) {
          case "LandingBlocksWelcomeHero":
            return (
              <section key={i}>
                <GrantsHero {...block} />
              </section>
            );
          default:
            return <></>;
        }
      })}

      {/* <section className="">
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
      </section> */}

      <GrantsPageComponent blogs={allBlogs as Blogs[]} />
    </div>
  );
}

