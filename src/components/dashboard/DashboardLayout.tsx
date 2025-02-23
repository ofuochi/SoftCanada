"use client";

import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, MenuProps } from "antd";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { breadcrumbConfig } from "./BreadcrumbConfig";
import SideBar from "./SideBar";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { ResumeDownloadProvider } from "@/contexts/ResumeDownloadContext";
import { SWRConfig } from "swr";

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
            <div className="px-5 md:px-10 lg:px-[60px] xl:px-[80px] 2xl:px-[105px] mt-5">
              <Breadcrumb items={breadcrumbs} className="!font-dm_sans" />
            </div>

            {/* Content */}
            <SWRConfig
              value={{
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
                revalidateIfStale: false,
                shouldRetryOnError: false,
              }}
            >
              <ErrorProvider>
                <Content className="px-5 md:px-10 lg:px-[60px] xl:px-[80px] 2xl:px-[105px] mt-5">
                  <ResumeDownloadProvider>{children}</ResumeDownloadProvider>
                </Content>
              </ErrorProvider>
            </SWRConfig>

            {/* Footer */}
            <Footer className="text-center font-dm_sans">
              SoftCanada ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </DashboardProvider>
    </>
  );
}
