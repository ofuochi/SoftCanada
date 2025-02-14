"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Button, Layout, Menu, MenuProps } from "antd";
import Logo from "@/components/Logo";
import Link from "next/link";
import {
  CalendarOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { PiSuitcaseSimple } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

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

const SideBar: React.FC<SideBarProps> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setAdvisorType } = useDashboard();
  const [advisorIndex, setAdvisorIndex] = useState(0);
  const [showAdvisorImage, setShowAdvisorImage] = useState(true);

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
      key: "career",
      icon: (
        <PiSuitcaseSimple
          className={`${
            pathname.includes("career") ? "!text-[#010309]" : "!text-[#808080]"
          }`}
          size={pathname.includes("career") ? "24px" : "18px"}
        />
      ),
      label: (
        <span
          className={`font-dm_sans ${
            pathname.includes("career")
              ? "text-[#010309] text-xl"
              : "!text-[#808080] text-sm"
          }`}
        >
          Career
        </span>
      ),
      children: [
        {
          key: "/dashboard/career/resumes",
          label: (
            <Link
              href="/dashboard/career/resumes"
              className={`font-dm_sans bg-transparent text-sm ${
                pathname === "/dashboard/career/resumes"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Resumes
            </Link>
          ),
        },
        {
          key: "/dashboard/career/jobs",
          label: (
            <Link
              href="/dashboard/career/jobs"
              className={`font-dm_sans bg-transparent text-sm ${
                pathname === "/dashboard/career/jobs"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Job Listings
            </Link>
          ),
        },
        {
          key: "/dashboard/career/career-advisor",
          label: (
            <Link
              href="/dashboard/career/career-advisor"
              className={`font-dm_sans text-sm ${
                pathname === "/dashboard/career/career-advisor"
                  ? "!text-[#010309]"
                  : "!text-[#808080]"
              }`}
            >
              Career Advisors
            </Link>
          ),
        },
      ],
    },
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
    <>
      {/* Collapsible Sider */}
      <Sider
        collapsible
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
          <Logo size={collapsed ? "small" : "medium"} path="/dashboard" />
        </div>
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[pathname]}
          defaultOpenKeys={[pathname.split("/").slice(0, 3).join("/")]}
          className="space-y-5"
        />

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
      </Sider>
    </>
  );
};

export default SideBar;

