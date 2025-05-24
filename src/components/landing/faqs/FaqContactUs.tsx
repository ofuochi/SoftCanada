"use client"; // This component might not need "use client" if it just displays props

import Link from "next/link";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

interface FaqContactUsProps {
  title?: string | null;
  text?: TinaMarkdownContent | string | null; // Can be rich text or simple string
  buttonText?: string | null;
  buttonLink?: string | null;
}

const FaqContactUs: React.FC<FaqContactUsProps> = ({
  title,
  text,
  buttonText,
  buttonLink,
}) => {
  return (
    <section
      className="w-full relative bg-cover max-md:bg-center bg-no-repeat px-5 h-svh"
      style={{
        backgroundImage: `url('/images/landing/faqContactUsImage.jpg')`, // Static background
      }}
    >
      <div className="absolute inset-0 bg-[#00000080]" />
      <section className="w-full h-full max-w-[715px] mx-auto flex flex-col gap-5 justify-center items-center relative">
        {title && (
          <h1 className="text-3xl text-center sm:text-5xl font-bold leading-snug break-words text-white">
            {title.split("<br />").map((line, index, arr) => (
              <React.Fragment key={index}>
                {line}
                {index < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
        )}
        <br /> {/* This <br /> was present in the original static version */}
        {text && (
          <div className="text-lg mt-4 break-words sm:max-w-[700px] text-white text-center">
            {typeof text === 'string' ? <p>{text}</p> : <TinaMarkdown content={text} />}
          </div>
        )}

        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="bg-red-600 hover:bg-red-500 text-nowrap text-white font-semibold px-10 py-3 shadow-md cursor-pointer mt-4" // Added mt-4 for spacing
          >
            {buttonText}
          </Link>
        )}
      </section>
    </section>
  );
};

export default FaqContactUs;
