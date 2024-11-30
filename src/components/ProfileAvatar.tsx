import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import type { AvatarSize } from "antd/es/avatar/AvatarContext";
import { useSession, signOut } from "next-auth/react";
import React from "react";

type Props = {
  size?: AvatarSize;
};
export const ProfileAvatar: React.FC<Props> = ({ size = "large" }) => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }
  const profileMenu: MenuProps = {
    items: [
      { key: "1", label: "Profile" },
      { key: "2", label: "Settings" },
      { key: "divider", type: "divider" },
      {
        key: "3",
        label: "Logout",
        onClick: () => signOut({ redirectTo: "/" }),
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
        src={session.user?.image}
        alt={session.user?.name || "User"}
        className="cursor-pointer"
      />
    </Dropdown>
  );
};
