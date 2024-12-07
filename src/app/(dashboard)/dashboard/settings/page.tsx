"use client";

import AccountSettings from "@/components/dashboard/settings/AccountSettings";
import {
  LockOutlined,
  NotificationOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tabs, TabsProps } from "antd";

export default function SettingsPage() {
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Account",
      icon: <UserOutlined />,
      children: <AccountSettings />,
    },
    {
      key: "2",
      label: "Notifications",
      icon: <NotificationOutlined />,
      children: <p>Notifications settings go here.</p>,
    },
    {
      key: "3",
      label: "Bills",
      icon: <ProfileOutlined />,
      children: <p>Bills settings go here.</p>,
    },
    {
      key: "4",
      label: "Security",
      icon: <LockOutlined />,
      children: <p>Security settings go here.</p>,
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabItems} />;
}
