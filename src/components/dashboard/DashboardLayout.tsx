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
      icon: <MdDashboard />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "career",
      icon: <PiSuitcaseSimple />,
      label: "Career",
      children: [
        {
          key: "/dashboard/career/cv-builder",
          label: <Link href="/dashboard/career/cv-builder">CV Builder</Link>,
        },
        {
          key: "/dashboard/career/jobs",
          label: <Link href="/dashboard/career/jobs">Job Listings</Link>,
        },
        {
          key: "/dashboard/career/career-advisor",
          label: <Link href="/dashboard/career/career-advisor">Advisor</Link>,
        },
      ],
    },
    {
      key: "/dashboard/real-estate",
      icon: <HomeOutlined />,
      label: "Real Estate",
      children: [
        {
          key: "/dashboard/real-estate/properties",
          label: (
            <Link href="/dashboard/real-estate/properties">Properties</Link>
          ),
        },
        {
          key: "/dashboard/real-estate/agents",
          label: <Link href="/dashboard/real-estate/agents">Agents</Link>,
        },
        {
          key: "/dashboard/real-estate/transactions",
          label: (
            <Link href="/dashboard/real-estate/transactions">Transactions</Link>
          ),
        },
      ],
    },
    {
      key: "/dashboard/calendar",
      icon: <CalendarOutlined />,
      label: (
        <Badge dot>
          <Link href="/dashboard/calendar">Calendar</Link>
        </Badge>
      ),
    },
    {
      key: "/dashboard/settings",
      icon: <SettingOutlined />,
      label: <Link href="/dashboard/settings">Settings</Link>,
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
        width={200}
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
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
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
        <div className="px-6 py-4">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Content */}
        <ErrorProvider>
          <Content className="m-5 overflow-initial">{children}</Content>
        </ErrorProvider>

        {/* Footer */}
        <Footer className="text-center">
          SoftCanada ©{new Date().getFullYear()} Created by Your Company
        </Footer>
      </Layout>
    </Layout>
  );
}
