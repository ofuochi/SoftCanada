"use client";

import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ErrorProvider } from "@/contexts/ErrorContext";
import {
  CalendarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import { breadcrumbConfig } from "./BreadcrumbConfig";
import SideBar from "./SideBar";
import { DashboardProvider } from "@/contexts/DashboardContext";

const { Header, Footer, Content } = Layout;

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const breadcrumbs = breadcrumbConfig[pathname] || [
    { title: "Home", path: "/" },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // const notificationMenu: MenuProps = {
  //   items: [
  //     { key: "1", label: "Notification 1" },
  //     { key: "2", label: "Notification 2" },
  //     { key: "3", label: "Notification 3" },
  //   ],
  // };

  return (
    <>
      <DashboardProvider>
        <Layout style={{ minHeight: "100vh" }}>
          <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
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
                {/* <Dropdown
              menu={notificationMenu}
              placement="bottomRight"
              trigger={["click"]}
              arrow
              >
              <Badge count={5}>
              <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
              </Badge>
              </Dropdown> */}
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
                <div className="w-full max-w-[1320px]">{children}</div>
              </Content>
            </ErrorProvider>

            {/* Footer */}
            <Footer className="text-center font-dm_sans">
              SoftCanada ©{new Date().getFullYear()} Created by Your Company
            </Footer>
          </Layout>
        </Layout>
      </DashboardProvider>
    </>
  );
}

