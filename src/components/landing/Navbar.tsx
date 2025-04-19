"use client";

import Logo from "@/components/Logo";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import type { MenuProps } from "antd";
import { Button, Drawer, Menu } from "antd";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LOGIN_PATH } from "@/constants/paths";
import { ProfileAvatar } from "../ProfileAvatar";

export default function Navbar() {
  const [navbarStyle, setNavbarStyle] = useState("bg-transparent");
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight =
        document.querySelector("#hero-section")?.clientHeight ||
        document.querySelector(".dark")?.clientHeight ||
        0;

      if (window.scrollY > heroSectionHeight) {
        setNavbarStyle("bg-gray-900 shadow-lg");
        setIsNavbarDark(true);
      } else if (window.scrollY > 0) {
        setNavbarStyle("bg-white bg-opacity-70 backdrop-blur-md");
        setIsNavbarDark(false);
      } else {
        setNavbarStyle("bg-transparent");
        setIsNavbarDark(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems: MenuProps["items"] = [
    {
      key: "services",
      label: (
        <>
          <span
            className={`font-dm_sans ${
              isNavbarDark ? "text-black md:!text-white" : "!text-black"
            }`}
          >
            Services{" "}
          </span>
          <span className="hidden md:inline">
            <DownOutlined
              className={`${
                isNavbarDark ? "text-black md:!text-white" : "!text-black"
              }`}
            />
          </span>
        </>
      ),
      children: [
        {
          key: "career",
          label: (
            <Link href="/dashboard/advisor" className={`font-dm_sans`}>
              Career
            </Link>
          ),
        },
        {
          key: "real-estate",
          label: (
            <Link
              href="/dashboard/real-estate/properties"
              className={`font-dm_sans`}
            >
              Real Estate
            </Link>
          ),
        },
      ],
    },
    {
      key: "cv-builder",
      label: (
        <Link
          href="/dashboard/resumes"
          className={`font-dm_sans ${
            isNavbarDark ? "text-black md:!text-white" : "!text-black"
          }`}
        >
          CV Builder
        </Link>
      ),
    },
    {
      key: "mortgage",
      label: (
        <Link
          href="/mortgage-calculator"
          className={`font-dm_sans ${
            isNavbarDark ? "text-black md:!text-white" : "!text-black"
          }`}
        >
          Mortgage Calculator
        </Link>
      ),
    },
    {
      key: "blogs",
      label: (
        <Link
          href="/blogs"
          className={`font-dm_sans ${
            isNavbarDark ? "text-black md:!text-white" : "!text-black"
          }`}
        >
          Blogs
        </Link>
      ),
    },
    {
      key: "contact",
      label: (
        <Link
          href="/contact"
          className={`font-dm_sans ${
            isNavbarDark ? "text-black md:!text-white" : "!text-black"
          }`}
        >
          Contact
        </Link>
      ),
    },
    {
      key: "faq",
      label: (
        <Link
          href="/faqs"
          className={`font-dm_sans ${
            isNavbarDark ? "text-black md:!text-white" : "!text-black"
          }`}
        >
          FAQs
        </Link>
      ),
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuTheme = isNavbarDark ? "dark" : "light";

  return (
    <>
      <style>
        {`
          .transparent-menu {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }

          .navbar-menu-container .ant-menu {
            justify-content: center;
            width: 100%;
          }
        `}
      </style>

      <nav
        className={classNames(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20",
          navbarStyle
        )}
      >
        <div className="mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo
              size="large"
              src={"/softCanadaMain.svg"}
              theme={isNavbarDark ? "light" : "dark"}
            />
          </div>

          {/* Desktop Menu */}
          <div
            className={`${classNames(
              "hidden md:flex flex-grow items-center justify-center",
              "navbar-menu-container"
            )}`}
          >
            <Menu
              mode="horizontal"
              items={menuItems}
              theme={menuTheme}
              selectable={false}
              forceSubMenuRender
              className="transparent-menu"
            />
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <ProfileAvatar theme={isNavbarDark ? "dark" : "light"} />
            ) : (
              <>
                <Link href={LOGIN_PATH}>
                  <Button size="large" className="!font-semibold !font-dm_sans">
                    Sign In
                  </Button>
                </Link>
                <Link href={`${LOGIN_PATH}?screen_hint=signup`}>
                  <Button
                    size="large"
                    type="primary"
                    className="!font-semibold !border-none !font-dm_sans !shadow-none"
                    danger={isNavbarDark}
                  >
                    Register Now!
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <Button
              type="text"
              icon={
                <MenuOutlined
                  className={classNames(
                    "text-xl",
                    isNavbarDark ? "!text-white" : "text-black"
                  )}
                />
              }
              onClick={toggleMobileMenu}
            />
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          closable={true}
          onClose={toggleMobileMenu}
          open={isMobileMenuOpen}
          styles={{ body: { padding: 0 } }}
        >
          <Menu
            mode="vertical"
            items={menuItems}
            theme="light"
            selectable={false}
          />
          <div className="flex flex-col items-start p-4 gap-2.5">
            {user ? (
              <ProfileAvatar theme={isNavbarDark ? "dark" : "light"} />
            ) : (
              <>
                <Link href={LOGIN_PATH} className="block w-full">
                  <Button className="w-full !shadow-none !border-black !font-dm_sans !py-5">
                    Sign In
                  </Button>
                </Link>
                <Link
                  href={`${LOGIN_PATH}?screen_hint=signup`}
                  className="block w-full"
                >
                  <Button
                    className="w-full !shadow-none !font-dm_sans !py-5"
                    type="primary"
                  >
                    Register Now!
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Drawer>
      </nav>
    </>
  );
}

