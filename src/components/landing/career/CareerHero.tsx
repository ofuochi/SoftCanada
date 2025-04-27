"use client";

import ContactModal from "@/components/modals/ContactModal";
import { useState } from "react";
import HeroSection from "../HeroSection";
import { LandingBlocksWelcomeHero } from "@/tina/__generated__/types";

type Props = LandingBlocksWelcomeHero;

const CareerHero: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);
  return (
    <section>
      <HeroSection {...props} handleClick={handleClick} />
      <ContactModal
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
        formType="career"
      />
    </section>
  );
};

export default CareerHero;
