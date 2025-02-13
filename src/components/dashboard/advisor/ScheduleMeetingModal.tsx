import { MeetingType } from "@/app/(dashboard)/dashboard/career/career-advisor/page";
import { Advisor, TimeSlot } from "@/app/types/advisor";
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

export const ScheduleMeetingModal: React.FC<RescheduleMeetingModalProps> = ({
  open,
  onCancel,
  advisor,
  onSave,
}) => {
  const filteredAvailabilities = advisor.availabilities.filter(
    (a) => a.dnd !== "true"
  );

  const getInitialSelectedDate = (): Dayjs => {
    const today = dayjs();
    const availableDays = new Set(filteredAvailabilities.map((a) => a.day));

    for (let i = 0; i < 7; i++) {
      const currentDate = today.add(i, "day");
      const dayName = currentDate.format("dddd");

      // Skip if no availability for this day
      if (!availableDays.has(dayName)) continue;

      const availability = filteredAvailabilities.find(
        (a) => a.day === dayName
      );
      if (!availability) continue;

      // For today (i === 0), ensure there's a future time slot
      if (i === 0) {
        const hasFutureSlot = availability.timeSlots.some(({ time }) => {
          const slotTime = dayjs(time, "h:mm A");
          const slotDateTime = currentDate
            .hour(slotTime.hour())
            .minute(slotTime.minute())
            .second(0)
            .millisecond(0);

          return slotDateTime.isAfter(dayjs());
        });
        if (hasFutureSlot) return currentDate;
      }
      // For future days, any slot is valid
      else if (availability.timeSlots.length > 0) {
        return currentDate;
      }
    }

    // Default to today if nothing else qualifies
    return today;
  };

  const getInitialSelectedTimeSlot = (
    initialDate: Dayjs
  ): TimeSlot | undefined => {
    const initialDay = initialDate.format("dddd");
    const initialAvailability = filteredAvailabilities.find(
      (a) => a.day === initialDay
    );
    if (!initialAvailability) return;

    const isToday = initialDate.isSame(dayjs(), "day");
    const now = dayjs();

    const futureSlots = initialAvailability.timeSlots.filter(({ time }) => {
      if (!isToday) return true;
      const slotTime = dayjs(time, "h:mm A");
      const slotDateTime = initialDate
        .hour(slotTime.hour())
        .minute(slotTime.minute())
        .second(0)
        .millisecond(0);
      return slotDateTime.isAfter(now);
    });

    return futureSlots[0];
  };

  const initialDate = getInitialSelectedDate();
  const initialTimeSlot = getInitialSelectedTimeSlot(initialDate);

  const [selectedDate, setSelectedDate] = useState<Dayjs>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string>(
    initialTimeSlot?.time || ""
  );
  const [selectedSlot, setSelectedSlot] = useState(initialTimeSlot);
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    "America/Toronto (UTC -05:00)"
  );

  const availableDays = new Set(filteredAvailabilities.map((a) => a.day));

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    const selectedDay = date.format("dddd");
    const selectedAvailability = filteredAvailabilities.find(
      (a) => a.day === selectedDay
    );

    const now = dayjs();
    const firstFutureSlot = selectedAvailability?.timeSlots.find(({ time }) => {
      const slotTime = dayjs(time, "h:mm A");
      const slotDateTime = date
        .hour(slotTime.hour())
        .minute(slotTime.minute())
        .second(0)
        .millisecond(0);
      return slotDateTime.isAfter(now);
    })?.time;

    if (firstFutureSlot) {
      setSelectedTime(firstFutureSlot);
    }
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    setSelectedTime(slot.time);
    setSelectedSlot(slot);
  };
  const handleTimezoneChange = (value: string) => setSelectedTimezone(value);

  const handleSave = (advisor: Advisor) =>
    onSave({
      date: selectedDate,
      timeSlot: selectedSlot!,
      advisor,
      availability: filteredAvailabilities.find(
        (a) => a.day === selectedDate.format("dddd")
      )!,
      timezone: selectedTimezone,
    });

  const selectedDay = selectedDate.format("dddd");
  const currentDayAvailability = filteredAvailabilities.find(
    (a) => a.day === selectedDay
  );
  const now = dayjs();

  const availableTimeSlots =
    currentDayAvailability?.timeSlots
      .filter(({ time }) => {
        const slotTime = dayjs(time, "h:mm A");
        const slotDateTime = selectedDate
          .hour(slotTime.hour())
          .minute(slotTime.minute())
          .second(0)
          .millisecond(0);
        return slotDateTime.isAfter(now);
      })
      .map((slot) => slot) || [];
  const [modal] = Modal.useModal();

  return (
    <Modal
      open={open}
      destroyOnClose
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
          {advisor.expertise.length > 0 && (
            <div>
              <Text strong className="block">
                Advisor's Expertise:
              </Text>
              <Text>{advisor.expertise.map((e) => e.name).join(", ")}</Text>
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
            Note: The advisor will be notified of this meeting schedule.
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
                disabledDate={(date) =>
                  !availableDays.has(date.format("dddd")) ||
                  date.isBefore(dayjs(), "day")
                }
              />
              <div className="mt-6 space-y-4">
                <Button
                  size="large"
                  block
                  disabled={availableTimeSlots.length === 0 || !selectedTime}
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
                {availableTimeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    block
                    type={slot.time === selectedTime ? "primary" : "default"}
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot.time}
                  </Button>
                ))}
                {availableTimeSlots.length === 0 && (
                  <Text type="secondary">No available timeslots</Text>
                )}
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
