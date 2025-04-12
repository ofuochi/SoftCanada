"use client";

import Logo from "@/components/Logo";
import { useDashboard } from "@/contexts/DashboardContext";
import { defineAbilityFor, getRoles, UserRoleKey } from "@/lib/abilities";
import {
  CalendarOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { Can } from "@casl/react";
import { Layout, Menu, MenuProps } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { FileUser, UserPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
const { Sider } = Layout;

const advisors = [
  {
    id: 0,
    advisorType: "Career",
    title: " Want to Become a Career Advisor?",
    content: "Share Your Expertise - Empower Careers!",
    imgUrl: "/images/career-advisor/facetime.svg",
  },
  {
    id: 1,
    advisorType: "Real-Estate",
    title: " Want to Become a Real-Estate Advisor?",
    content: "Share Your Expertise - Empower Careers!",
    imgUrl: "/images/career-advisor/facetime.svg",
  },
  {
    id: 2,
    advisorType: "Immigration",
    title: " Want to Become a Immigration Advisor?",
    content: "Share Your Expertise - Empower Careers!",
    imgUrl: "/images/career-advisor/facetime.svg",
  },
  {
    id: 3,
    advisorType: "Financial",
    title: " Want to Become a Financial Advisor?",
    content: "Share Your Expertise - Empower Careers!",
    imgUrl: "/images/career-advisor/facetime.svg",
  },
];

type SideBarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

interface CustomMenuProps extends Omit<MenuProps, "items"> {
  items?: MenuProps["items"];
}

const CustomMenu: React.FC<CustomMenuProps> = ({ items, ...props }) => {
  // Apply custom styling to each menu item
  const enhancedItems = items?.map((item) => {
    if (!item) return item;

    // Apply different focus styling for parent items vs submenu items
    const isSubmenuItem =
      typeof item.key === "string" && item.key.includes("/real-estate/");
    const focusClass = isSubmenuItem
      ? "focus-within:bg-blue-300 focus-within:outline focus-within:outline-2 focus-within:outline-blue-600 focus-within:outline-offset-[-2px] rounded"
      : "focus-within:bg-blue-100 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-[-2px] rounded";

    // Type guard to check if the item has children
    if ("children" in item && item.children) {
      const enhancedChildren = item.children.map((child) => {
        if (!child) return child;

        return {
          ...child,
          className:
            "focus-within:bg-blue-300 focus-within:outline focus-within:outline-2 focus-within:outline-blue-600 focus-within:outline-offset-[-2px] rounded",
        };
      });

      return {
        ...item,
        children: enhancedChildren,
        className: focusClass,
      };
    }

    return {
      ...item,
      className: focusClass,
    };
  });

  return <Menu items={enhancedItems} {...props} />;
};

const SideBar: React.FC<SideBarProps> = ({ collapsed, setCollapsed }) => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { setAdvisorType } = useDashboard();

  const [advisorIndex, setAdvisorIndex] = useState(0);
  const [showAdvisorImage, setShowAdvisorImage] = useState(true);
  const [userAbility, setUserAbility] = useState(defineAbilityFor());

  useEffect(() => {
    if (!user) return;
    const userRoles = getRoles(user);
    if (userRoles.length) setUserAbility(defineAbilityFor(userRoles));
  }, [user?.[UserRoleKey]]);

  const handlePrevious = () => {
    setAdvisorIndex((index) => Math.max(index - 1, 0));
  };

  const handleNext = () => {
    setAdvisorIndex((index) => Math.min(index + 1, 3));
  };

  const handleGetStarted = (advisorType: string) => () => {
    setAdvisorType(advisorType);
    router.push("/dashboard/advisor-application");
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
      key: "/dashboard/resumes",
      icon: (
        <FileUser
          strokeWidth={1}
          color={`${pathname === "/dashboard/resumes" ? "#010309" : "#808080"}`}
          size={pathname === "/dashboard/resumes" ? 28 : 24}
        />
      ),
      label: (
        <Link
          href="/dashboard/resumes"
          className={`font-dm_sans bg-transparent text-sm ${
            pathname === "/dashboard/resumes"
              ? "!text-[#010309] text-xl"
              : "!text-[#808080] text-sm"
          }`}
        >
          Resumes
        </Link>
      ),
    },
    {
      key: "/dashboard/advisor",
      icon: (
        <UserPen
          color={`${pathname === "/dashboard/advisor" ? "#010309" : "#808080"}`}
          strokeWidth={1}
          size={pathname === "/dashboard/advisor" ? 28 : 24}
        />
      ),
      label: (
        <Link
          href="/dashboard/advisor"
          className={`font-dm_sans text-sm ${
            pathname === "/dashboard/advisor"
              ? "!text-[#010309] text-xl"
              : "!text-[#808080] text-sm"
          }`}
        >
          Advisors
        </Link>
      ),
    },
    // {
    //   key: "career",
    //   icon: (
    //     <PiSuitcaseSimple
    //       className={`${
    //         pathname.includes("career") ? "!text-[#010309]" : "!text-[#808080]"
    //       }`}
    //       size={pathname.includes("career") ? "24px" : "18px"}
    //     />
    //   ),
    //   label: (
    //     <span
    //       className={`font-dm_sans ${
    //         pathname.includes("career")
    //           ? "text-[#010309] text-xl"
    //           : "!text-[#808080] text-sm"
    //       }`}
    //     >
    //       Career
    //     </span>
    //   ),
    //   children: [],
    // },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAdvisorImage((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Sider
      collapsible
      trigger={null}
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
        <Logo
          src={"/softCanadaMain.svg"}
          size={collapsed ? "small" : "medium"}
          path="/dashboard"
        />
      </div>
      <CustomMenu
        mode="inline"
        items={menuItems}
        forceSubMenuRender
        className="space-y-5"
        selectedKeys={[pathname]}
      />
      {/* <Can I="read" a="publicContent" ability={userAbility}>
        {collapsed && (
          <section className="w-full px-4 ml-2.5 mt-10">
            <Image
              width={120}
              height={120}
              alt="advisorImage"
              src={"/images/advisorImage.svg"}
              className={`w-[120px] h-[120px] ${
                showAdvisorImage ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            />
            <Image
              width={120}
              height={120}
              alt="realEstateImage"
              src={"/images/realEstateImage.svg"}
              className={`w-[120px] h-[120px] ${
                showAdvisorImage ? "opacity-0 hidden" : "opacity-100 block"
              }`}
            />
          </section>
        )}
        <section
          className={`w-full max-w-[230px] h-[278px] ${
            collapsed ? "opacity-0" : "opacity-100"
          } border border-[#CBCBCB] !rounded-xl bg-[#F5F5F5] mt-10 px-4 ml-2.5`}
        >
          <div className="flex justify-between">
            <div
              className={`${
                advisorIndex === 0 ? "bg-[#CBCBCB] p-2.5" : "bg-[#010309] p-3"
              } h-fit flex justify-center items-center rounded-full mt-5 cursor-pointer`}
              onMouseDown={handlePrevious}
            >
              <ChevronLeft color="#ffffff" size={16} />
            </div>

            <div className="">
              <Image
                width={122}
                height={122}
                alt="facetime"
                src={"/images/career-advisor/facetime.svg"}
                className={""}
              />
            </div>

            <div
              className={`${
                advisorIndex === 3 ? "bg-[#CBCBCB] p-2.5" : "bg-[#010309] p-3"
              } flex h-fit justify-center items-center rounded-full mt-3.5 cursor-pointer`}
              onMouseDown={handleNext}
            >
              <ChevronRight color="#ffffff" size={24} />
            </div>
          </div>

          <div className="flex items-center gap-[3px] w-fit mx-auto mt-2">
            {advisors.map((advisor) => {
              if (advisorIndex === advisor.id) {
                return (
                  <div
                    key={advisor.id}
                    className="w-[5px] h-[5px] bg-[#010309] rounded-full"
                  />
                );
              }
              return (
                <div
                  key={advisor.id}
                  className="w-[5px] h-[5px] bg-[#72FA32] rounded-full"
                />
              );
            })}
          </div>

          <section className="mt-2">
            <div className={""}>
              <div className="mt-2 flex flex-col gap-2.5">
                <h4 className="font-lato font-semibold text-center text-base text-black">
                  {advisors[advisorIndex].title}
                </h4>
                <span className="text-[11px] font-lato font-medium text-center text-[#4F4F4F]">
                  {advisors[advisorIndex].content}
                </span>
              </div>
              <div className="flex justify-center mt-2">
                <Button
                  onMouseDown={handleGetStarted(
                    advisors[advisorIndex].advisorType
                  )}
                  className="bg-white w-full max-w-[166px] rounded-md !border !border-white !shadow-none py-2 px-2.5 min-h-[35px] text-[#010309] hover:!text-[#010309] !font-semibold text-[13px] font-poppins flex justify-center items-center"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </section>
        </section>
      </Can> */}
    </Sider>
  );
};

export default SideBar;

