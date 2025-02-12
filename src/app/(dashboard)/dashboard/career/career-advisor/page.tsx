"use client";

import { Advisor } from "@/app/types/advisor";
import { PaginatedList } from "@/app/types/paginatedResponse";
import { ScheduleMeetingModal } from "@/components/dashboard/advisor/ScheduleMeetingModal";
import { useApiClient } from "@/hooks/api-hook";
import { ArrowRightOutlined, StarFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Image,
  message,
  Space,
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from "antd";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { LuCalendarClock, LuCalendarDays } from "react-icons/lu";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";

export type MeetingType = {
  date: Dayjs;
  time: string;
  timezone: string;
  advisor: Advisor;
};

const { Title, Paragraph, Text, Link } = Typography;
const { Meta } = Card;

export default function CareerAdvisorPage() {
  const [showMeetingScheduleModal, setShowMeetingScheduleModal] =
    useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor>();
  const [messageApi, contextHolder] = message.useMessage();

  const getKey = (
    pageIndex: number,
    previousPageData: PaginatedList<Advisor>
  ) =>
    previousPageData && !previousPageData.items.length
      ? null
      : `/api/career-advisors?pageNumber=${pageIndex + 1}&pageSize=10`;

  const { get } = useApiClient();

  const {
    data: pages,
    error,
    isLoading,
    size,
    setSize,
  } = useSWRInfinite<PaginatedList<Advisor>>(getKey, get);
  const advisors = pages ? pages.flatMap((page) => page.items) : [];
  const hasMore =
    pages && pages.length > 0 ? pages[0].totalPages > pages.length : false;

  const confirmMeetingSchedule = (meeting: MeetingType) => {
    console.log(meeting);
    messageApi.success(
      "Meeting scheduled successfully. You will receive an email confirmation."
    );
    setShowMeetingScheduleModal(false);
  };

  const handleBookSessionClicked = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setShowMeetingScheduleModal(true);
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="pl-3">Career Advisors</span>,
      icon: <HiMiniUsers size={20} className="-mb-5" />,
      children: (
        <InfiniteScroll
          dataLength={advisors.length}
          next={() => setSize(size + 1)}
          hasMore={hasMore}
          loader={
            <div className="text-center p-4">Loading more advisors...</div>
          }
          endMessage={
            <p className="text-center p-4 text-gray-500">
              {isLoading ? "Loading..." : "No more advisors to show."}
            </p>
          }
          scrollableTarget="scrollableContainer"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 p-4">
            {advisors.map((advisor) => (
              <Card
                key={advisor.id}
                hoverable={false}
                className="w-full max-w-[300px] mx-auto flex flex-col"
                cover={
                  <div className="w-full h-56 flex items-center justify-center bg-gray-100 rounded-t-lg">
                    <Image
                      alt={advisor.name}
                      src={advisor.profilePictureUrl}
                      className="!w-full !h-full !object-contain"
                    />
                  </div>
                }
              >
                <Meta
                  title={
                    <div className="text-center font-semibold">
                      {advisor.name}
                    </div>
                  }
                  description={
                    <div className="text-center text-gray-600 text-sm">
                      <Space className="font-bold text-nowrap">
                        <PiSuitcaseSimpleFill />
                        <span className="text-sm truncate whitespace-nowrap overflow-hidden">
                          {advisor.title}
                        </span>
                      </Space>

                      <span className="text-yellow-500 flex items-center justify-center gap-1">
                        <StarFilled />
                        {(advisor.rating || 5).toFixed(1)}
                      </span>
                    </div>
                  }
                />

                {/* Expertise Tags */}
                <div className="mt-4 flex flex-wrap justify-center gap-1">
                  {advisor.expertise.map((skill) => (
                    <Tag key={skill.id} className="inline-flex">
                      {skill.name}
                    </Tag>
                  ))}
                </div>

                <Button
                  color="default"
                  variant="filled"
                  block
                  className="!font-dm_sans !font-semibold mt-5"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  onClick={() => handleBookSessionClicked(advisor)}
                >
                  Book Session
                </Button>
              </Card>
            ))}
          </div>
        </InfiniteScroll>
      ),
    },
    {
      key: "2",
      label: <span className="pl-3">Upcoming Sessions</span>,
      icon: <LuCalendarDays size={20} className="-mb-5" />,
      children: <p>Notifications settings go here.</p>,
    },
    {
      key: "3",
      label: <span className="pl-3">Past Sessions</span>,
      icon: <LuCalendarClock size={20} className="-mb-5" />,
      children: <p>Bills settings go here.</p>,
    },
  ];

  return (
    <>
      <div className="p-6 bg-white min-h-[360px]">
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>

      {selectedAdvisor && (
        <ScheduleMeetingModal
          open={showMeetingScheduleModal}
          advisor={selectedAdvisor}
          onCancel={() => setShowMeetingScheduleModal(false)}
          onSave={confirmMeetingSchedule}
        />
      )}

      {contextHolder}
    </>
  );
}
