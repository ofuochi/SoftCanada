"use client";

import Logo from "@/components/Logo";
import { FooterQuery } from "@/tina/__generated__/types";
import Link from "next/link";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";

type Props = FooterQuery & {
  cmsQuery?: any;
};

export const FooterComponent = (props: Props) => {
  const { data } = useTina<FooterQuery>(props.cmsQuery);
  const footerBlock = data?.footer || props;

  return (
    <footer className="bg-white w-full py-10 max-w-7xl mx-auto">
      <div className="flex px-4 sm:px-6 md:px-10 lg:px-14 xl:px-0 max-md:flex-col flex-wrap justify-between gap-8 md:items-start items-center text-center md:text-left">
        {/* Logo Section */}
        <div
          className="flex flex-col items-center md:items-start"
          data-tina-field={tinaField(footerBlock, "logo")}
        >
          <Logo size="large" src={footerBlock?.logo} />
        </div>

        {/* Dynamic Sections */}
        {footerBlock.sections?.map((section, index) => (
          <div
            key={index}
            className="flex flex-col"
            data-tina-field={tinaField(section)}
          >
            {section?.title && (
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
            )}

            {section?.type === "links" && (
              <ul className="space-y-2">
                {section.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link?.url || "#"}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {section?.type === "socials" && (
              <>
                {section.description && (
                  <p className="mb-4">{section.description}</p>
                )}
                <div className="flex justify-center md:justify-start space-x-4 text-lg text-gray-600">
                  {footerBlock.socials?.map((social, socialIndex) => (
                    <Link
                      key={socialIndex}
                      href={social?.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-tina-field={tinaField(social)}
                    >
                      <Image
                        src={social?.icon || ""}
                        alt="Social Icon"
                        width={24}
                        height={24}
                        className="hover:opacity-80"
                      />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

