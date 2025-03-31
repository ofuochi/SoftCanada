import HeroSection from "@/components/landing/HeroSection";
import CallToActionSection from "@/components/landing/home/CallToActionSection";
import FeaturesSection from "@/components/landing/home/FeaturesSection";
import HowItWorksSection from "@/components/landing/home/HowItWorksSection";
import client from "@/tina/__generated__/client";

export default async function Home() {
  const query = await client.queries.landing({relativePath: "home.md"});
  return (
    <>
      {query?.data?.landing?.blocks?.map((block) => {
        if (!block) return <></>;
        switch (block.__typename) {
          case "LandingBlocksWelcomeHero":
            return (
              <section key={block.message} className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
                <HeroSection {...block} cmsQuery={query}/>
              </section>
            );
          case "LandingBlocksHomepageFeatureBlock":
            return (
              <section key={block.sectionTitle} className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
                <FeaturesSection {...block} cmsQuery={query}/>
              </section>
            )
          default:
            return <></>;
        }
      })}
      {/*<section className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">*/}
      {/*  <FeaturesSection/>*/}
      {/*</section>*/}
      <section className="mt-10">
        <HowItWorksSection/>
      </section>
      <section className="mb-12 mt-10">
        <CallToActionSection/>
      </section>
    </>
  );
}

