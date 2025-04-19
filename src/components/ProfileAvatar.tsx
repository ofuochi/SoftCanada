import { LOGOUT_PATH } from "@/constants/paths";
import { getRoleDescription } from "@/lib/abilities";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import type { AvatarSize } from "antd/es/avatar/AvatarContext";
import Link from "next/link";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";

const { Text } = Typography;

type Props = {
  size?: AvatarSize;
  theme?: "light" | "dark";
};
export const ProfileAvatar: React.FC<Props> = ({
  size = "large",
  theme = "light",
}) => {
  const { user } = useUser();

  if (!user) return null;

  const profileMenu: MenuProps = {
    items: [
      {
        key: "0",
        label: (
          <Link href="/resumes" className="!font-dm_sans">
            <Space>
              <LuLayoutDashboard /> Dashboard
            </Space>
          </Link>
        ),
      },
      {
        key: "1",
        label: (
          <Link href="/dashboard/settings" className="!font-dm_sans">
            My Profile
          </Link>
        ),
      },
      { key: "2", label: <span className="!font-dm_sans">Settings</span> },
      { key: "divider", type: "divider" },
      {
        key: "3",
        label: (
          <Link href={LOGOUT_PATH} className="!font-dm_sans">
            Logout
          </Link>
        ),
      },
    ],
  };

  return (
    <Dropdown menu={profileMenu} trigger={["click"]} placement="bottomLeft">
      <Space className="cursor-pointer px-3">
        <Avatar
          size={size}
          icon={<UserOutlined />}
          src={user?.picture}
          alt={user?.name || "User"}
        />
        <div className="text-sm">
          <Text
            className={`block capitalize ${
              theme === "dark" ? "!text-white" : ""
            }`}
            color="white"
          >
            {user?.given_name || user?.nickname}
          </Text>
          <Text
            type="secondary"
            className={`block !text-xs ${
              theme === "dark" ? "!text-gray-100" : ""
            }`}
          >
            {getRoleDescription(user)}
          </Text>
        </div>
        <DownOutlined
          className={`text-sm ${theme === "dark" ? "!text-white" : ""}`}
        />
      </Space>
    </Dropdown>
  );
};
