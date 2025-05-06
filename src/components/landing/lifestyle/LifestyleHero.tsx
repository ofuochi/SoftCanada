"use client";

import HeroSection from "../HeroSection";
import { LandingBlocksWelcomeHero } from "@/tina/__generated__/types";

type Props = LandingBlocksWelcomeHero;

const LifestyleHero: React.FC<Props> = (props) => {
  return (
    <>
      <HeroSection {...props} />
    </>
  );
};

export default LifestyleHero;

