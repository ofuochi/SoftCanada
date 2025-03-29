import { LOGOUT_PATH } from "@/constants/paths";
import { getRoleDescription, UserRoleKey } from "@/lib/abilities";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import type { AvatarSize } from "antd/es/avatar/AvatarContext";
import Link from "next/link";
import React from "react";
const { Text } = Typography;

type Props = {
  size?: AvatarSize;
};
export const ProfileAvatar: React.FC<Props> = ({ size = "large" }) => {
  const { user } = useUser();

  if (!user) {
    return null;
  }
  const profileMenu: MenuProps = {
    items: [
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
          <Link href={`${LOGOUT_PATH}`} className="!font-dm_sans">
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
          <Text className="capitalize">{user?.nickname}</Text>
          <Text type="secondary" className="block !text-xs">
            {getRoleDescription(user)}
          </Text>
        </div>
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

