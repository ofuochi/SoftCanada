import { MeetingType } from "@/app/(dashboard)/dashboard/career/career-advisor/page";
import { Advisor } from "@/app/types/advisor";
import {
  Button,
  Calendar,
  Divider,
  Flex,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
const { Title, Text } = Typography;
const { Option } = Select;

interface RescheduleMeetingModalProps {
  open: boolean;
  advisor: Advisor;
  onCancel: () => void;
  onSave: (meeting: MeetingType) => void;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "05:00 PM",
];

export const ScheduleMeetingModal: React.FC<RescheduleMeetingModalProps> = ({
  open,
  onCancel,
  advisor,
  onSave,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>("12:00 PM");
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    "America/Toronto (UTC -05:00)"
  );

  const handleDateSelect = (date: Dayjs) => setSelectedDate(date);
  const handleTimeSelect = (time: string) => setSelectedTime(time);
  const handleTimezoneChange = (value: string) => setSelectedTimezone(value);

  const handleSave = (advisor: Advisor) =>
    onSave({
      date: selectedDate,
      time: selectedTime,
      advisor,
      timezone: selectedTimezone,
    });

  return (
    <Modal
      open={open}
      title={
        <>
          <Title level={3}>Book a session with {advisor.name}</Title>
          <Divider />
        </>
      }
      onCancel={onCancel}
      footer={null}
      width={900}
    >
      <div className="flex flex-col md:flex-row gap-6 mt-5 p-5">
        <div className="w-full md:w-[35%] border-b md:border-r md:border-b-0 pr-6 pb-6 md:pb-0">
          {advisor.expertise.length && (
            <div>
              <Text strong className="block">
                Advisor's Expertise:
              </Text>
              <Text>{advisor.expertise.map((e) => e.name).join(",")}</Text>
            </div>
          )}
          <div className="mt-6">
            <Text strong className="block">
              Duration:
            </Text>
            <Text>
              <Space>
                <FaRegClock /> 30 mins
              </Space>
            </Text>
          </div>

          <div className="mt-6">
            <Text strong className="block">
              Language:
            </Text>
            <Text>English only</Text>
          </div>

          <div className="mt-6">
            <Text strong className="block">
              Venue:
            </Text>
            <Text>Google Meet</Text>
          </div>

          <Text type="secondary" className="block mt-6 text-pretty">
            Note: The advisor will be notified fo this meeting schedule.
          </Text>
        </div>

        {/* Right Column (65%) */}
        <div className="w-full md:w-[65%]">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Calendar Section */}
            <div className="flex-1 min-w-[280px]">
              <Text strong className="block mb-4">
                Select a new date &amp; time
              </Text>
              <Select
                className="w-full mb-4"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
              >
                <Option value="America/Toronto (UTC -05:00)">
                  America/Toronto (UTC -05:00)
                </Option>
                <Option value="Africa/Lagos (UTC +01:00)">
                  Africa/Lagos (UTC +01:00)
                </Option>
                <Option value="Europe/London (UTC +00:00)">
                  Europe/London (UTC +00:00)
                </Option>
              </Select>

              <Calendar
                fullscreen={false}
                value={selectedDate}
                onSelect={handleDateSelect}
                className="ant-picker-calendar-mini w-full"
              />
              <div className="mt-6 space-y-4">
                <Button
                  size="large"
                  block
                  type="primary"
                  onClick={() => handleSave(advisor)}
                >
                  Save Changes
                </Button>
                <Button size="large" block className="mr-4" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>

            {/* Time Slots Section */}
            <div className="md:w-[200px] flex-shrink-0">
              <Text strong className="block mb-4">
                {selectedDate.format("dddd, MMMM D")}
              </Text>
              <Flex vertical gap="small" className="w-full">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    block
                    type={time === selectedTime ? "primary" : "default"}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
