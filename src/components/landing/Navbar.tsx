"use client";

import Logo from "@/components/Logo";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import type { MenuProps } from "antd";
export default function Navbar() {
  const [navbarStyle, setNavbarStyle] = useState("bg-transparent");
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          Services{" "}
          <span className="hidden md:inline">
            <DownOutlined />
          </span>
        </>
      ),
      children: [
        { key: "career", label: <Link href="/career">Career</Link> },
        {
          key: "real-estate",
          label: <Link href="/real-estate">Real Estate</Link>,
        },
      ],
    },
    {
      key: "resources",
      label: (
        <>
          Resources{" "}
          <span className="hidden md:inline">
            <DownOutlined />
          </span>
        </>
      ),
      children: [
        { key: "deals", label: <Link href="/deals">Deals</Link> },
        { key: "finance", label: <Link href="/finance">Finance</Link> },
        {
          key: "immigration",
          label: <Link href="/immigration">Immigration</Link>,
        },
        { key: "grants", label: <Link href="/grants">Grants & Studies</Link> },
      ],
    },
    {
      key: "mortgage",
      label: <Link href="/mortgage-calculator">Mortgage Calculator</Link>,
    },
    { key: "cv-builder", label: <Link href="/cv-builder">CV Builder</Link> },
    { key: "faq", label: <Link href="/faq">FAQ</Link> },
    { key: "contact", label: <Link href="/contact">Contact</Link> },
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
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
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
              className="transparent-menu"
              theme={menuTheme}
              selectable={false}
            />
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="font-semibold">Sign In</Button>
            <Button type="primary" className="font-bold" danger={isNavbarDark}>
              Register Now!
            </Button>
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
          <div className="flex flex-col items-start p-4">
            <Button className="w-full mb-2">Sign In</Button>
            <Button className="w-full" type="primary">
              Register Now!
            </Button>
          </div>
        </Drawer>
      </nav>
    </>
  );
}
