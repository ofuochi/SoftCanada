"use client";

import Logo from "@/components/Logo";
import { MenuOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import type { MenuProps } from "antd";
import { Button, Drawer, Menu } from "antd";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LOGIN_PATH } from "@/constants/paths";
import { ProfileAvatar } from "../ProfileAvatar";
import { usePathname } from "next/navigation";
import { logPageView } from "@/utils/analytics";

export default function Navbar() {
  const [navbarStyle, setNavbarStyle] = useState("bg-transparent");
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight =
        document.querySelector("#hero-section")?.clientHeight ||
        document.querySelector(".dark")?.clientHeight ||
        0;

      if (window.scrollY === 0) {
        if (pathname.startsWith("/blogs/")) {
          setNavbarStyle("bg-gray-900 shadow-lg");
          setIsNavbarDark(true);
          return;
        }
        setNavbarStyle("bg-transparent");
        setIsNavbarDark(false);
        setIsAtTop(true);
      } else if (window.scrollY > heroSectionHeight) {
        setNavbarStyle("bg-gray-900 shadow-lg");
        setIsNavbarDark(true);
        setIsAtTop(false);
      } else {
        setNavbarStyle("bg-white bg-opacity-70 backdrop-blur-md");
        setIsNavbarDark(false);
        setIsAtTop(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavigate = () => {
    setIsMobileMenuOpen(false);
  };

  const logPageViewEvent = (path: string) => () => logPageView(path);
  const menuItems: MenuProps["items"] = [
    {
      key: "career",
      label: (
        <Link
          href="/career"
          onClick={logPageViewEvent("/career")}
          className={`font-dm_sans ${
            isAtTop && !isMobileMenuOpen
              ? "!text-white"
              : isNavbarDark
              ? "text-black md:!text-white"
              : "!text-black"
          }`}
        >
          Career
        </Link>
      ),
    },
    {
      key: "/immigration",
      label: (
        <Link
          href="/immigration"
          onClick={logPageViewEvent("/immigration")}
          className={`font-dm_sans ${
            isAtTop && !isMobileMenuOpen
              ? "!text-white"
              : isNavbarDark
              ? "text-black md:!text-white"
              : "!text-black"
          }`}
        >
          Immigration
        </Link>
      ),
    },
    {
      key: "/finance",
      label: (
        <Link
          href="/finance"
          onClick={logPageViewEvent("/finance")}
          className={`font-dm_sans ${
            isAtTop && !isMobileMenuOpen
              ? "!text-white"
              : isNavbarDark
              ? "text-black md:!text-white"
              : "!text-black"
          }`}
        >
          Finance
        </Link>
      ),
    },
    {
      key: "/grants",
      label: (
        <Link
          href="/study"
          onClick={logPageViewEvent("/study")}
          className={`font-dm_sans ${
            isAtTop && !isMobileMenuOpen
              ? "!text-white"
              : isNavbarDark
              ? "text-black md:!text-white"
              : "!text-black"
          }`}
        >
          Study
        </Link>
      ),
    },

    {
      key: "/lifestyle",
      label: (
        <Link
          href="/lifestyle"
          onClick={logPageViewEvent("/lifestyle")}
          className={`font-dm_sans ${
            isAtTop && !isMobileMenuOpen
              ? "!text-white"
              : isNavbarDark
              ? "text-black md:!text-white"
              : "!text-black"
          }`}
        >
          Lifestyle
        </Link>
      ),
    },
    {
      key: "/blogs",
      label: (
        <Link
          href="/blogs"
          onClick={logPageViewEvent("/blogs")}
          className={`font-dm_sans ${
            isAtTop && !isMobileMenuOpen
              ? "!text-white"
              : isNavbarDark
              ? "text-black md:!text-white"
              : "!text-black"
          }`}
        >
          Blogs
        </Link>
      ),
    },
    {
      key: "/contact",
      label: (
        <Link
          href="/contact"
          onClick={logPageViewEvent("/contact")}
          className={`font-dm_sans ${
            isAtTop && !isMobileMenuOpen
              ? "!text-white"
              : isNavbarDark
              ? "text-black md:!text-white"
              : "!text-black"
          }`}
        >
          Contact
        </Link>
      ),
    },
    {
      key: "/faqs",
      label: (
        <Link
          href="/faqs"
          onClick={logPageViewEvent("/faqs")}
          className={`font-dm_sans ${
            isAtTop && !isMobileMenuOpen
              ? "!text-white"
              : isNavbarDark
              ? "text-black md:!text-white"
              : "!text-black"
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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    const basePath = `/${pathname.split("/")[1]}`;
    const activeKey = menuItems.find(
      (item) => item?.key?.toString() === basePath
    )?.key;
    if (activeKey !== undefined)
      setSelectedKeys(activeKey ? [activeKey.toString()] : []);
    if (pathname === "/") setSelectedKeys([]);
  }, [pathname]);

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
          }

          .ant-menu {
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
              "hidden md:flex flex-1 items-center justify-center",
              "navbar-menu-container"
            )}`}
          >
            <Menu
              mode="horizontal"
              items={menuItems}
              theme={menuTheme}
              selectedKeys={selectedKeys}
              onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
              forceSubMenuRender
              selectable
              className="transparent-menu !flex-1"
            />
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <ProfileAvatar
                theme={isNavbarDark || isAtTop ? "dark" : "light"}
              />
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
                    isAtTop || isNavbarDark ? "!text-white" : "text-black"
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
            onClick={handleNavigate}
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

