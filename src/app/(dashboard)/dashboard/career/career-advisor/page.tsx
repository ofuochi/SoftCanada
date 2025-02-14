"use client";

import { Advisor, Availability, TimeSlot } from "@/app/types/advisor";
import { Booking } from "@/app/types/booking";
import ListAdvisors from "@/components/dashboard/advisor/ListAdvisors";
import ListBookings, {
  ListBookingsRef,
} from "@/components/dashboard/advisor/ListBookings";
import { ScheduleMeetingModal } from "@/components/dashboard/advisor/ScheduleMeetingModal";
import { useApiClient } from "@/hooks/api-hook";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Space,
  Tabs,
  TabsProps,
  Typography,
  message,
} from "antd";
import { Dayjs } from "dayjs";
import { useRef, useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { LuCalendarClock, LuCalendarDays } from "react-icons/lu";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { useUser } from "@auth0/nextjs-auth0/client";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const { Text, Title } = Typography;

export type MeetingType = {
  advisor: Advisor;
  availability: Availability;
  timeSlot: TimeSlot;
  date: Dayjs;
  purpose?: string;
};

export default function CareerAdvisorPage() {
  const { user } = useUser();

  const [showMeetingScheduleModal, setShowMeetingScheduleModal] =
    useState(false);
  const { post } = useApiClient();
  const [showMeetingDetailsDrawer, setShowMeetingDetailsDrawer] =
    useState(false);
  const bookingsRef = useRef<ListBookingsRef>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor>();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedBooking, setSelectedBooking] = useState<Booking>();

  const handleBookSessionClicked = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setShowMeetingScheduleModal(true);
  };

  const confirmMeetingSchedule = async (meeting: MeetingType) => {
    await post(`/api/career-advisors/${meeting.advisor.id}/book`, {
      availabilityId: meeting.availability.id,
      timeSlotId: meeting.timeSlot.id,
      note: meeting.purpose,
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

  const handleShowMeetingInfo = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowMeetingDetailsDrawer(true);
  };
  const closeDrawer = () => {
    setShowMeetingDetailsDrawer(false);
    setSelectedBooking(undefined);
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
      children: (
        <ListBookings ref={bookingsRef} onDetails={handleShowMeetingInfo} />
      ),
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

      <Drawer
        title="Meeting Details"
        onClose={() => setShowMeetingDetailsDrawer(false)}
        open={showMeetingDetailsDrawer}
      >
        {selectedBooking && (
          <div className="flex flex-col items-center space-y-4 py-4">
            {/* Avatars of Advisor + User */}
            <Avatar.Group size="large">
              <Avatar
                src={selectedBooking.advisorImageUrl}
                style={{ border: "2px solid #1890ff" }}
              />
              <Avatar
                src={user?.picture}
                style={{ border: "2px solid #1890ff" }}
              />
            </Avatar.Group>

            {/* Meeting Headline */}
            <Space direction="vertical" align="center">
              <Title level={5} className="m-0 !mb-2">
                {`Meeting with ${selectedBooking.advisorName}`}
              </Title>
              <Text type="secondary" className="capitalize">
                Hosted on Google Meet
              </Text>
            </Space>

            <Divider />

            {/* Meeting Date & Time */}
            <Space direction="vertical" align="center">
              <Text strong>Date & Time</Text>
              <Text>
                {dayjs.utc(selectedBooking.date).local().format("MMM D, YYYY")}{" "}
                at {dayjs.utc(selectedBooking.date).local().format("hh:mm A")}
              </Text>
            </Space>

            <Divider />

            {/* Notes */}
            {selectedBooking.notes && (
              <Space direction="vertical" align="start" className="w-full">
                <Text strong>Notes</Text>
                <Text>{selectedBooking.notes}</Text>
              </Space>
            )}

            {/* (Optional) Some action button in the Drawer */}
            <Button type="primary" block onClick={() => closeDrawer()}>
              Got It
            </Button>
          </div>
        )}
      </Drawer>

      {contextHolder}
    </>
  );
}
