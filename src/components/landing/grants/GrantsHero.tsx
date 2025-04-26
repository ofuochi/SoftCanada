"use client";

import { useState } from "react";
import HeroSection from "../HeroSection";
import { LandingBlocksWelcomeHero } from "@/tina/__generated__/types";
import ApplicationFormModal from "@/components/modals/ApplicationFormModal";

type Props = LandingBlocksWelcomeHero;

const GrantsHero: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);
  return (
    <>
      <HeroSection {...props} handleClick={handleClick} />
      <ApplicationFormModal
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
      />
    </>
  );
};

export default GrantsHero;

