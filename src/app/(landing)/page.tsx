import HeroSection from "@/components/landing/HeroSection";
import CallToActionSection from "@/components/landing/home/CallToActionSection";
import FeaturesSection from "@/components/landing/home/FeaturesSection";
import HowItWorksSection from "@/components/landing/home/HowItWorksSection";
import { dbConnection } from "@/lib/db-conn";
import Image from "next/image";

export default async function Home() {
  const query = await dbConnection.queries.landing({ relativePath: "home.md" });
  return (
    <>
      {query?.data?.landing?.blocks?.map((block, i) => {
        if (!block) return <></>;
        switch (block.__typename) {
          case "LandingBlocksWelcomeHero":
            return (
              <section key={i}>
                <HeroSection {...block} cmsQuery={query} />
              </section>
            );
          case "LandingBlocksHomepageFeatureBlock":
            return (
              <section
                key={i}
                className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20"
              >
                <FeaturesSection {...block} cmsQuery={query} />
              </section>
            );
          case "LandingBlocksHowItWorksBlock":
            return (
              <section
                key={i}
                className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20"
              >
                <HowItWorksSection {...block} cmsQuery={query} />
              </section>
            );
          case "LandingBlocksCallToActionBlock":
            return (
              <section key={i}>
                <CallToActionSection {...block} cmsQuery={query} />
              </section>
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}
