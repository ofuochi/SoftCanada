"use client";

import type {MenuProps} from "antd";
import {Button, Menu} from "antd";
import classNames from "classnames";
import React, {useState} from "react";
import {FaCanadianMapleLeaf, FaChevronDown} from "react-icons/fa";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Define the dropdown menu items
  const menuItems: MenuProps["items"] = [
    {
      key: "services",
      label: (
        <div
          className="flex items-center cursor-pointer"
          onMouseEnter={() => setActiveDropdown("services")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          Services
          <FaChevronDown
            className={classNames(
              "ml-2 transition-transform",
              activeDropdown === "services" ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      ),
      children: [
        {key: "service-1", label: "Service 1"},
        {key: "service-2", label: "Service 2"},
      ],
    },
    {
      key: "resources",
      label: (
        <div
          className="flex items-center cursor-pointer"
          onMouseEnter={() => setActiveDropdown("resources")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          Resources
          <FaChevronDown
            className={classNames(
              "ml-2 transition-transform",
              activeDropdown === "resources" ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      ),
      children: [
        {key: "resource-1", label: "Resource 1"},
        {key: "resource-2", label: "Resource 2"},
      ],
    },
    {key: "mortgage", label: "Mortgage Calculator"},
    {key: "co-builder", label: "Co Builder"},
    {key: "faq", label: "FAQ"},
    {key: "contact", label: "Contact"},
  ];

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center p-4 shadow-md bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">Soft</h1>
        <FaCanadianMapleLeaf className="text-red-600 text-lg"/>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="horizontal"
        items={menuItems}
        className="flex-1 justify-center border-none"
        style={{
          border: "none", // Removes the border
          boxShadow: "none", // Removes any shadow applied
        }}
      />

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <Button color="default" className="font-semibold" variant="outlined">
          Sign In
        </Button>
        <Button color="default" className="font-bold" variant="solid">
          Register Now!
        </Button>
      </div>
    </div>
  );
};