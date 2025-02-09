"use client";

import { Advisor } from "@/app/types/advisor";
import { ScheduleMeetingModal } from "@/components/dashboard/advisor/ScheduleMeetingModal";
import { useApiClient } from "@/hooks/api-hook";
import { ArrowRightOutlined, StarFilled } from "@ant-design/icons";
import { Button, Card, Image, message, Segmented, Tabs, TabsProps } from "antd";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { LuCalendarClock, LuCalendarDays } from "react-icons/lu";
import useSWR from "swr";
const { Meta } = Card;
export default function CareerAdvisorPage() {
  const [showMeetingScheduleModal, setShowMeetingScheduleModal] =
    useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor>();
  const { get } = useApiClient();
  const {
    data: careerAdvisors,
    error,
    isLoading,
  } = useSWR<Advisor[]>("/api/career-advisors", { fetcher: get });

  const [messageApi, contextHolder] = message.useMessage();

  const confirmMeetingSchedule = (
    date: Dayjs,
    time: string,
    timezone: string
  ) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {careerAdvisors?.map((advisor) => (
            <Card
              key={advisor.id}
              hoverable={false}
              className="max-w-sm mx-auto"
              cover={
                <div className="w-full h-56 flex items-center justify-center bg-gray-100 rounded-t-lg">
                  <Image
                    alt={advisor.name}
                    src={advisor.profilePictureUrl}
                    className="w-full h-full object-contain"
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
                    <span className="text-yellow-500 flex items-center justify-center gap-1">
                      <StarFilled />
                      {advisor.rating.toFixed(1)}
                    </span>
                  </div>
                }
              />

              {/* Expertise Tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {advisor.expertise.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* Book Session Button */}
              <div className="mt-6">
                <Button
                  color="default"
                  variant="filled"
                  block
                  size="large"
                  onClick={() => handleBookSessionClicked(advisor)}
                >
                  Book Session <ArrowRightOutlined />
                </Button>
              </div>
            </Card>
          ))}
        </div>
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
        <Segmented
          style={{ marginBottom: 8 }}
          options={["Advisors", "Upcoming Meetings", "Past Meetings"]}
        />
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
