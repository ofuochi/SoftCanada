"use client";

import ApplicationFormModal from "@/components/modals/ApplicationFormModal";
import { LandingBlocksWelcomeHero } from "@/tina/__generated__/types";
import { useState } from "react";
import HeroSection from "../HeroSection";

type Props = LandingBlocksWelcomeHero;

const GrantsHero: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);
  return (
    <>
      <HeroSection {...props} handleCallToActionClick={handleClick} />
      <ApplicationFormModal
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
      />
    </>
  );
};

export default GrantsHero;

