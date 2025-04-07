"use client";

import { ProfileAvatar } from "@/components/ProfileAvatar";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { ResumeDownloadProvider } from "@/contexts/ResumeDownloadContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { Breadcrumb, Button, Layout, MenuProps } from "antd";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { SWRConfig } from "swr";
import { breadcrumbConfig } from "./BreadcrumbConfig";
import SideBar from "./SideBar";
import useMobile from "@/hooks/useMobile";

const { Header, Footer, Content } = Layout;

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const isMobile = useMobile();
  const { user } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();

  const breadcrumbs = breadcrumbConfig[pathname] || [
    { title: "Home", path: "/" },
  ];

  const toggleCollapsed = () => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed((collapsed) => !collapsed);
    }
  };

  // const notificationMenu: MenuProps = {
  //   items: [
  //     { key: "1", label: "Notification 1" },
  //     { key: "2", label: "Notification 2" },
  //     { key: "3", label: "Notification 3" },
  //   ],
  // };
  const profileItems: MenuProps["items"] = [
    { key: "1", label: "Notification 1" },
    { key: "2", label: "Notification 2" },
    { key: "3", label: "Notification 3" },
  ];

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
                justifyContent: isMobile ? "end" : "space-between",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {!isMobile && (
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={toggleCollapsed}
                  style={{ fontSize: "16px" }}
                />
              )}
              <div className="flex items-center gap-8">
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

