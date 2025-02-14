"use client";

import React, { useState } from "react";
import { TabsProps, message } from "antd";
import { HiMiniUsers } from "react-icons/hi2";
import { LuCalendarDays, LuCalendarClock } from "react-icons/lu";
import { Advisor } from "@/app/types/advisor";
import { ScheduleMeetingModal } from "@/components/dashboard/advisor/ScheduleMeetingModal";
import ListAdvisors from "@/components/dashboard/advisor/ListAdvisors";
import ListBookings from "@/components/dashboard/advisor/ListBookings";
import { Tabs } from "antd";
import { Availability } from "@/app/types/availability";
import { TimeSlot } from "@/app/types/timeSlot";
import { useApiClient } from "@/hooks/api-hook";

export type MeetingType = {
  advisor: Advisor;
  availability: Availability;
  timeSlot: TimeSlot;
  date: Date;
};

export default function CareerAdvisorPage() {
  const [showMeetingScheduleModal, setShowMeetingScheduleModal] =
    useState(false);
  const { post } = useApiClient();
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleBookSessionClicked = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setShowMeetingScheduleModal(true);
  };

  const confirmMeetingSchedule = async (meeting: MeetingType) => {
    await post(`/api/career-advisors/${meeting.advisor.id}/book`, {
      availabilityId: meeting.availability.id,
      timeSlotId: meeting.timeSlot.id,
      date: meeting.date.toISOString(),
    });
    messageApi.success("Booking confirmed!");
    setShowMeetingScheduleModal(false);
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="pl-3">Career Advisors</span>,
      icon: <HiMiniUsers size={20} className="-mb-5" />,
      children: <ListAdvisors onBookSessionClick={handleBookSessionClicked} />,
    },
    {
      key: "2",
      label: <span className="pl-3">Upcoming Sessions</span>,
      icon: <LuCalendarDays size={20} className="-mb-5" />,
      children: <ListBookings />,
    },
    {
      key: "3",
      label: <span className="pl-3">Past Sessions</span>,
      icon: <LuCalendarClock size={20} className="-mb-5" />,
      children: <p>Past sessions will go here.</p>,
    },
  ];

  return (
    <>
      <div className="p-6 bg-white min-h-[360px] sticky top-0 z-10">
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

