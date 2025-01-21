"use client";

import Logo from "@/components/Logo";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ErrorProvider } from "@/contexts/ErrorContext";
import {
  BellOutlined,
  CalendarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
} from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import { breadcrumbConfig } from "./BreadcrumbConfig";

const { Header, Footer, Sider, Content } = Layout;

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const breadcrumbs = breadcrumbConfig[pathname] || [
    { title: "Home", path: "/" },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: (
        <MdDashboard
          className={`${
            pathname === "/dashboard" ? "!text-[#010309]" : "!text-[#808080]"
          }`}
          size={pathname === "/dashboard" ? "24px" : "18px"}
        />
      ),
      label: (
        <Link
          href="/dashboard"
          className={`font-dm_sans ${
            pathname === "/dashboard"
              ? "!text-[#010309] text-xl"
              : "!text-[#808080] text-sm"
          }`}
        >
          Dashboard
        </Link>
      ),
    },
    {
      key: "career",
      icon: (
        <PiSuitcaseSimple
          className={`${
            pathname.includes("career") ? "!text-[#010309]" : "!text-[#808080]"
          }`}
          size={pathname.includes("career") ? "24px" : "18px"}
        />
      ),
      label: (
        <span
          className={`font-dm_sans ${
            pathname.includes("career")
              ? "text-[#010309] text-xl"
              : "!text-[#808080] text-sm"
          }`}
        >
          Career
        </span>
      ),
      children: [
        {
          key: "/dashboard/career/resumes",
          label: (
            <Link
              href="/dashboard/career/resumes"
              className={`font-dm_sans bg-transparent text-sm ${
                pathname === "/dashboard/career/resumes"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Resumes
            </Link>
          ),
        },
        {
          key: "/dashboard/career/jobs",
          label: (
            <Link
              href="/dashboard/career/jobs"
              className={`font-dm_sans bg-transparent text-sm ${
                pathname === "/dashboard/career/jobs"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Job Listings
            </Link>
          ),
        },
        {
          key: "/dashboard/career/career-advisor",
          label: (
            <Link
              href="/dashboard/career/career-advisor"
              className={`font-dm_sans text-sm ${
                pathname === "/dashboard/career/career-advisor"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Advisor
            </Link>
          ),
        },
      ],
    },
    {
      key: "/dashboard/real-estate",
      icon: (
        <HomeOutlined
          className={`${
            pathname.includes("estate") ? "!text-[#010309]" : "!text-[#808080]"
          }`}
          size={pathname.includes("estate") ? 24 : 18}
        />
      ),
      label: (
        <span
          className={`font-dm_sans ${
            pathname.includes("estate")
              ? "text-[#010309] text-xl"
              : "!text-[#808080] text-sm"
          }`}
        >
          Real Estate
        </span>
      ),
      children: [
        {
          key: "/dashboard/real-estate/properties",
          label: (
            <Link
              href="/dashboard/real-estate/properties"
              className={`font-dm_sans text-sm ${
                pathname === "/dashboard/real-estate/properties"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Properties
            </Link>
          ),
        },
        {
          key: "/dashboard/real-estate/agents",
          label: (
            <Link
              href="/dashboard/real-estate/agents"
              className={`font-dm_sans text-sm ${
                pathname === "/dashboard/real-estate/agents"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Agents
            </Link>
          ),
        },
        {
          key: "/dashboard/real-estate/transactions",
          label: (
            <Link
              href="/dashboard/real-estate/transactions"
              className={`font-dm_sans text-sm ${
                pathname === "/dashboard/real-estate/transactions"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Transactions
            </Link>
          ),
        },
      ],
    },
    {
      key: "/dashboard/calendar",
      icon: (
        <CalendarOutlined
          className={`${
            pathname === "/dashboard/calendar"
              ? "!text-[#010309]"
              : "!text-[#808080]"
          }`}
          size={pathname === "/dashboard/calendar" ? 24 : 18}
        />
      ),
      label: (
        <Link
          href="/dashboard/calendar"
          className={`font-dm_sans text-sm ${
            pathname === "/dashboard/calendar"
              ? "!text-[#010309] text-xl"
              : "!text-[#808080] text-sm"
          }`}
        >
          Calendar
        </Link>
      ),
    },
    {
      key: "/dashboard/settings",
      icon: (
        <SettingOutlined
          className={`${
            pathname === "/dashboard/settings"
              ? "!text-[#010309]"
              : "!text-[#808080]"
          }`}
          size={pathname === "/dashboard/settings" ? 24 : 18}
        />
      ),
      label: (
        <Link
          href="/dashboard/settings"
          className={`font-dm_sans text-sm ${
            pathname === "/dashboard/settings"
              ? "!text-[#010309] text-xl"
              : "!text-[#808080] text-sm"
          }`}
        >
          Settings
        </Link>
      ),
    },
  ];

  const notificationMenu: MenuProps = {
    items: [
      { key: "1", label: "Notification 1" },
      { key: "2", label: "Notification 2" },
      { key: "3", label: "Notification 3" },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Collapsible Sider */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        theme="light"
        width={250}
        collapsedWidth="80"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          overflow: "auto",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <div className="h-16 m-4 text-center align-middle">
          <Logo size={collapsed ? "small" : "medium"} path="/dashboard" />
        </div>
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[pathname]}
          defaultOpenKeys={[pathname.split("/").slice(0, 3).join("/")]}
          className="space-y-5"
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "margin-left 0.2s ease",
        }}
      >
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: "16px" }}
          />
          <div className="flex items-center gap-8">
            <Dropdown
              menu={notificationMenu}
              placement="bottomRight"
              trigger={["click"]}
              arrow
            >
              <Badge count={5}>
                <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
              </Badge>
            </Dropdown>
            <ProfileAvatar />
          </div>
        </Header>

        {/* Breadcrumb */}
        <div className="px-5 lg:px-8 xl:px-10 2xl:px-12 mt-5">
          <Breadcrumb items={breadcrumbs} className="!font-dm_sans" />
        </div>

        {/* Content */}
        <ErrorProvider>
          <Content className="px-5 lg:px-8 xl:px-10 2xl:px-12 mt-5">
            {children}
          </Content>
        </ErrorProvider>

        {/* Footer */}
        <Footer className="text-center font-dm_sans">
          SoftCanada ©{new Date().getFullYear()} Created by Your Company
        </Footer>
      </Layout>
    </Layout>
  );
}

