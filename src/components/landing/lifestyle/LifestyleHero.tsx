"use client";

import ContactModal from "@/components/modals/ContactModal";
import HeroSection from "../HeroSection";
import { LandingBlocksWelcomeHero } from "@/tina/__generated__/types";
import { useState } from "react";

type Props = LandingBlocksWelcomeHero;

const LifestyleHero: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ContactModal
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
        formType="lifestyle"
      />
      <HeroSection
        {...props}
        handleCallToActionClick={() => setShowModal(true)}
      />
    </>
  );
};

export default LifestyleHero;
