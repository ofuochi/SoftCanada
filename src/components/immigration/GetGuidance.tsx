"use client";

import { useState } from "react";
import ImmigrationFormModal from "../modals/ImmigrationFormModal";

const GetGuidance = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  return (
    <>
      <section className="w-full max-w-[360px] space-y-6">
        <div className="space-y-3">
          <p className="text-[#4F4F4F] font-lato text-xl md:text-2xl">
            Get Guidance
          </p>
          <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
            You're Not Alone, Let's Walk Together
          </h4>
          <p className="text-black font-poppins text-xl">
            Unsure where to start or which immigration path is right for you?
            Book a personalized session with one of our trusted advisors. We'll
            help you clarify your goals, understand your options, and feel more
            confident about your next steps.
          </p>
        </div>

        <button
          onClick={handleShowModal}
          className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[200px] flex items-center justify-center"
        >
          Book a Free Session
        </button>
      </section>
      <ImmigrationFormModal
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
      />
    </>
  );
};

export default GetGuidance;

