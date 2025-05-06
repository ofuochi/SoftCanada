"use client";

import ContactModal from "@/components/modals/ContactModal";
import { useState } from "react";
import HeroSection from "../HeroSection";
import { LandingBlocksWelcomeHero } from "@/tina/__generated__/types";
import ImmigrationFormModal from "@/components/modals/ImmigrationFormModal";

type Props = LandingBlocksWelcomeHero;

const ImmigrationHero: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);
  return (
    <>
      <HeroSection {...props} handleCallToActionClick={handleClick} />
      <ImmigrationFormModal
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
      />
    </>
  );
};

export default ImmigrationHero;

