"use client";

import { Advisor, Availability, TimeSlot } from "@/app/types/advisor";
import ListAdvisors from "@/components/dashboard/advisor/ListAdvisors";
import ListBookings, {
  ListBookingsRef,
} from "@/components/dashboard/advisor/ListBookings";
import { ScheduleMeetingModal } from "@/components/dashboard/advisor/ScheduleMeetingModal";
import { useApiClient } from "@/hooks/api-hook";
import { Tabs, TabsProps, message } from "antd";
import { Dayjs } from "dayjs";
import { useRef, useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { LuCalendarClock, LuCalendarDays } from "react-icons/lu";

export type MeetingType = {
  advisor: Advisor;
  availability: Availability;
  timeSlot: TimeSlot;
  date: Dayjs;
};

export default function CareerAdvisorPage() {
  const [showMeetingScheduleModal, setShowMeetingScheduleModal] =
    useState(false);
  const { post } = useApiClient();
  const bookingsRef = useRef<ListBookingsRef>(null);
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

  const handleTabChange = (key: string) => {
    if (key === "current_sessions_list") {
      bookingsRef.current?.handleShow();
    }
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "advisors_list",
      label: <span className="pl-3">Career Advisors</span>,
      icon: <HiMiniUsers size={20} className="-mb-5" />,
      children: <ListAdvisors onBookSessionClick={handleBookSessionClicked} />,
    },
    {
      key: "current_sessions_list",
      label: <span className="pl-3">Upcoming Sessions</span>,
      icon: <LuCalendarDays size={20} className="-mb-5" />,
      children: <ListBookings ref={bookingsRef} />,
    },
    {
      key: "past_sessions_list",
      label: <span className="pl-3">Past Sessions</span>,
      icon: <LuCalendarClock size={20} className="-mb-5" />,
      children: <p>Past sessions will go here.</p>,
    },
  ];

  return (
    <>
      <div className="p-6 bg-white min-h-[360px]">
        <Tabs items={tabItems} onChange={handleTabChange} />
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
