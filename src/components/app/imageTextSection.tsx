// ImageTextSection.tsx
import React from "react";
import Image from "next/image";

type ImageTextSectionProps = {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  onButtonClick?: () => void;
};

export const ImageTextSection = ({
  title,
  description,
  buttonText,
  imageSrc,
  imageAlt,
  onButtonClick = () => {},
}: ImageTextSectionProps) => {
  return (
    <section
      className={`flex justify-between items-center gap-5 w-full max-w-[1200px] mx-auto`}
    >
      <section className="w-full max-w-[360px] space-y-6">
        <div className="space-y-3">
          <h4 className="text-black font-dm_sans font-semibold text-2xl md:text-3xl">
            {title}
          </h4>
          <p className="text-black font-poppins text-xl">{description}</p>
        </div>
        <button
          onClick={onButtonClick}
          className="border-[0.3px] border-[#808080] py-3 px-2.5 rounded-[6px] h-[43px] w-full max-w-[172px] flex items-center justify-center"
        >
          {buttonText}
        </button>
      </section>
      <div className="w-full max-w-[500px] h-[500px]">
        <Image width={500} height={500} src={imageSrc} alt={imageAlt} />
      </div>
    </section>
  );
};
