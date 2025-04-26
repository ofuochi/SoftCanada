"use client";

import SampleModal from "@/components/modals/SampleModal";
import { useState } from "react";
import HeroSection from "../HeroSection";
import { LandingBlocksWelcomeHero } from "@/tina/__generated__/types";

type Props = LandingBlocksWelcomeHero;

const CareerHero: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);
  return (
    <>
      <HeroSection {...props} handleClick={handleClick} />
      <SampleModal isModalOpen={showModal} setIsModalOpen={setShowModal} />
    </>
  );
};

export default CareerHero;
