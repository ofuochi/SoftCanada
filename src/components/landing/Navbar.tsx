"use client";

import Logo from "@/components/Logo";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Drawer, Menu, Space } from "antd";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LOGIN_PATH } from "@/constants/paths";
import type { MenuProps } from "antd";
import { LuLayoutDashboard } from "react-icons/lu";
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
            <Link href="/dashboard/career/jobs" className={`font-dm_sans`}>
              Career
            </Link>
          ),
        },
        {
          key: "real-estate",
          label: (
            <Link href="/real-estate" className={`font-dm_sans`}>
              Real Estate
            </Link>
          ),
        },
      ],
    },
    {
      key: "resources",
      label: (
        <>
          <span
            className={`font-dm_sans ${
              isNavbarDark ? "text-black md:!text-white" : "text-black"
            }`}
          >
            Resources{" "}
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
          key: "deals",
          label: (
            <Link href="/deals" className={`font-dm_sans`}>
              Deals
            </Link>
          ),
        },
        {
          key: "finance",
          label: (
            <Link href="/finance" className={`font-dm_sans`}>
              Finance
            </Link>
          ),
        },
        {
          key: "immigration",
          label: (
            <Link href="/immigration" className={`font-dm_sans`}>
              Immigration
            </Link>
          ),
        },
        {
          key: "grants",
          label: (
            <Link href="/grants" className={`font-dm_sans`}>
              Grants & Studies
            </Link>
          ),
        },
      ],
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
    // {
    //   key: "cv-builder",
    //   label: (
    //     <Link
    //       href="/dashboard/career/resumes"
    //       className={`font-dm_sans ${
    //         isNavbarDark ? "text-black md:!text-white" : "!text-black"
    //       }`}
    //     >
    //       CV Builder
    //     </Link>
    //   ),
    // },

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
          href="/posts"
          className={`font-dm_sans ${
            isNavbarDark ? "text-black md:!text-white" : "!text-black"
          }`}
        >
          Blogs
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
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Logo theme={isNavbarDark ? "light" : "dark"} />
          </div>

          {/* Desktop Menu */}
          <div
            className={classNames(
              "hidden md:flex flex-grow items-center justify-center",
              "navbar-menu-container"
            )}
          >
            <Menu
              mode="horizontal"
              items={menuItems}
              className="transparent-menu flex-wrap"
              theme={menuTheme}
              selectable={false}
            />
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Space size="middle">
                <Link href="/dashboard">
                  <Button
                    size="small"
                    icon={<LuLayoutDashboard />}
                    title="Dashboard"
                  />
                </Link>
                <ProfileAvatar />
              </Space>
            ) : (
              <>
                <Link href={`${LOGIN_PATH}`}>
                  <Button className="font-semibold !border-none !font-dm_sans !bg-white !shadow-none">
                    Sign In
                  </Button>
                </Link>
                <Link href={`${LOGIN_PATH}`}>
                  <Button
                    type="primary"
                    className="font-bold !border-none !font-dm_sans !shadow-none"
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
                    isNavbarDark ? "text-white" : "text-black"
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
            <Button className="w-full !shadow-none !border-black !font-dm_sans !py-5">
              Sign In
            </Button>
            <Button
              className="w-full !shadow-none !font-dm_sans !py-5"
              type="primary"
            >
              Register Now!
            </Button>
          </div>
        </Drawer>
      </nav>
    </>
  );
}
