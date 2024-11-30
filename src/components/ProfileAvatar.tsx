import { UserOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, Dropdown, MenuProps } from "antd";
import type { AvatarSize } from "antd/es/avatar/AvatarContext";
import React from "react";

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
      { key: "1", label: "Profile" },
      { key: "2", label: "Settings" },
      { key: "divider", type: "divider" },
      {
        key: "3",
        label: <a href="/api/auth/logout">Logout</a>,
      },
    ],
  };

  return (
    <Dropdown
      menu={profileMenu}
      trigger={["click"]}
      placement="bottomLeft"
      arrow
    >
      <Avatar
        size={size}
        icon={<UserOutlined />}
        src={user?.picture}
        alt={user?.name || "User"}
        className="cursor-pointer"
      />
    </Dropdown>
  );
};
