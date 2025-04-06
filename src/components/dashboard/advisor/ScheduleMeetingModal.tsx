import React, { useEffect, useState } from "react";
import {
  Modal,
  Calendar,
  Select,
  Button,
  Typography,
  Divider,
  Space,
  Input,
  Form,
  Avatar,
} from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { FaRegClock } from "react-icons/fa";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdOutlineWatch } from "react-icons/md";
import { Advisor } from "@/app/types/advisor";
import { Booking } from "@/app/types/booking";
import { MeetingType } from "@/app/(dashboard)/dashboard/advisor/page";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

dayjs.extend(utc);
dayjs.extend(timezone);

const START_HOUR = 9;
const END_HOUR = 17;
const SLOT_INTERVAL_MINUTES = 30; // in minutes
const NUM_DAYS_AHEAD = 30;

const generateTimeSlots = (date: Dayjs): Dayjs[] => {
  const slots: Dayjs[] = [];
  let current = date.hour(START_HOUR).minute(0).second(0).millisecond(0);
  const end = date.hour(END_HOUR).minute(0).second(0).millisecond(0);

  while (current.isBefore(end)) {
    slots.push(current);
    current = current.add(SLOT_INTERVAL_MINUTES, "minute");
  }
  return slots;
};

const intervalsOverlap = (
  start1: Dayjs,
  end1: Dayjs,
  start2: Dayjs,
  end2: Dayjs
) => start1.isBefore(end2) && end1.isAfter(start2);

const hasFree30MinSlot = (date: Dayjs, bookings: Booking[]): boolean => {
  const potentialStarts = generateTimeSlots(date);
  return potentialStarts.some((slotStart) => {
    const slotEnd = slotStart.add(SLOT_INTERVAL_MINUTES, "minute");
    if (slotStart.isBefore(dayjs())) return false;
    return !bookings.some((bk) => {
      const bkStart = dayjs(bk.startDate);
      const bkEnd = dayjs(bk.endDate);
      return intervalsOverlap(slotStart, slotEnd, bkStart, bkEnd);
    });
  });
};

interface ScheduleMeetingModalProps {
  open: boolean;
  advisor: Advisor;
  onCancel: () => void;
  onSave: (payload: MeetingType) => Promise<Booking>;
}

interface FormValues {
  selectedDate: Dayjs;
  selectedTime?: Dayjs;
  meetingPurpose: string;
  timezone: string;
}

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({
  open,
  advisor,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm<FormValues>();

  // Use local state for bookings so we can update immediately.
  const [localBookings, setLocalBookings] = useState<Booking[]>(
    advisor.booking
  );

  // Keep local bookings in sync with advisor prop if it changes.
  useEffect(() => {
    setLocalBookings(advisor.booking);
  }, [advisor.booking]);

  const selectedDate = Form.useWatch("selectedDate", form);
  const selectedTimeSlot = Form.useWatch("selectedTime", form);

  const findInitialDate = (): Dayjs => {
    const today = dayjs().startOf("day");
    for (let i = 0; i <= NUM_DAYS_AHEAD; i++) {
      const d = today.add(i, "day");
      if (hasFree30MinSlot(d, localBookings)) {
        return d;
      }
    }
    return today;
  };

  // Reset the form when the modal opens.
  useEffect(() => {
    if (!open) return;
    form.resetFields();
    form.setFieldsValue({
      selectedDate: findInitialDate(),
      timezone: "America/Toronto",
      meetingPurpose: "",
    });
  }, [open, form]);

  // Clear selected time if the date changes.
  useEffect(() => {
    form.setFieldsValue({ selectedTime: undefined });
  }, [selectedDate, form]);

  const disabledDate = (current: Dayjs) => {
    const today = dayjs().startOf("day");
    if (current.isBefore(today, "day")) return true;
    if (current.isAfter(today.add(NUM_DAYS_AHEAD, "day"))) return true;
    return !hasFree30MinSlot(current, localBookings);
  };

  const handleDateSelect = (value: Dayjs) => {
    form.setFieldsValue({
      selectedDate: value,
    });
  };

  // Check if an individual slot is available.
  const isSlotAvailable = (slot: Dayjs): boolean => {
    if (slot.isBefore(dayjs())) return false;
    return !localBookings.some((bk) => {
      const bkStart = dayjs(bk.startDate);
      const bkEnd = dayjs(bk.endDate);
      return intervalsOverlap(
        slot,
        slot.add(SLOT_INTERVAL_MINUTES, "minute"),
        bkStart,
        bkEnd
      );
    });
  };

  const handleFormSubmit = async (values: FormValues) => {
    if (!values.selectedTime) return;
    const realStart = values.selectedTime;
    const realEnd = realStart.add(SLOT_INTERVAL_MINUTES, "minute");

    const overlap = localBookings.some((bk) => {
      const bkStart = dayjs(bk.startDate);
      const bkEnd = dayjs(bk.endDate);
      return intervalsOverlap(realStart, realEnd, bkStart, bkEnd);
    });

    if (overlap) {
      form.setFields([
        {
          name: "selectedTime",
          errors: ["This time slot overlaps with an existing booking"],
        },
      ]);
      return;
    }

    // Trigger the save callback.
    const newBooking = await onSave({
      advisor,
      startDate: realStart.tz(values.timezone),
      endDate: realEnd.tz(values.timezone),
      notes: values.meetingPurpose,
    });

    // Optimistically update the local bookings to disable the slot immediately.
    setLocalBookings((prev) => [...prev, { ...newBooking }]);
  };

  const fullDate = selectedDate?.format("dddd, MMMM D, YYYY");

  return (
    <Modal
      open={open}
      destroyOnClose
      title={
        <>
          <Title level={3}>Schedule Session</Title>
          <Divider />
        </>
      }
      onCancel={onCancel}
      footer={null}
      width={900}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <div className="flex flex-col md:flex-row gap-6 mt-5 p-5">
          {/* Left side - Advisor Info */}
          <div className="w-full md:w-[35%] border-b md:border-r md:border-b-0 pr-6 pb-6 md:pb-0 space-y-6">
            <div>
              <Avatar
                size={228}
                src={advisor.profilePictureUrl}
                className="mx-auto"
              />
              <Title level={4} className="text-center mt-4">
                {advisor.name}
              </Title>
              <Text type="secondary" className="text-center block">
                {advisor.title}
              </Text>
            </div>
            {advisor.expertise?.length > 0 && (
              <div>
                <Text strong className="block">
                  Expertise:
                </Text>
                <Text>
                  {advisor.expertise.map((e) => e.areaOfExpertise).join(", ")}
                </Text>
              </div>
            )}
            <div className="mt-6">
              <Text strong className="block">
                Date:
              </Text>
              <Space>
                <LuCalendarDays />
                <Text>{fullDate}</Text>
              </Space>
            </div>
            <div>
              <Text strong className="block">
                Local Time:
              </Text>
              <Space>
                <MdOutlineWatch />
                <Text>
                  {selectedTimeSlot
                    ? selectedTimeSlot.local().format("hh:mm A")
                    : "--"}
                </Text>
              </Space>
            </div>
            <div>
              <Text strong className="block">
                Duration:
              </Text>
              <Space>
                <FaRegClock />
                <Text>
                  {selectedTimeSlot ? SLOT_INTERVAL_MINUTES : "--"} mins
                </Text>
              </Space>
            </div>
            <div>
              <Text strong className="block">
                Language:
              </Text>
              <Space>
                <LiaLanguageSolid />
                <Text>English</Text>
              </Space>
            </div>
            <div>
              <Text strong className="block">
                Venue:
              </Text>
              <Space>
                <LuMapPin />
                <Text>Google Meet</Text>
              </Space>
            </div>
            <Text type="secondary" className="block mt-6">
              Note: Advisor will be notified upon scheduling.
            </Text>
          </div>

          {/* Right side - Date and Time Slot selection */}
          <div className="w-full md:w-[65%]">
            <div className="flex flex-col gap-6">
              {/* Row for Calendar and Time Slots */}
              <div className="flex flex-col md:flex-row gap-4 mb-0">
                {/* Calendar Column */}
                <div className="flex-grow">
                  <Form.Item name="timezone" label="Timezone">
                    <Select>
                      {["America/Toronto", "Africa/Lagos", "Europe/London"].map(
                        (tz) => (
                          <Option key={tz} value={tz}>
                            {`${tz} (UTC ${dayjs().tz(tz).format("Z")})`}
                          </Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                  <Form.Item name="selectedDate" label="Select Date">
                    <Calendar
                      fullscreen={false}
                      disabledDate={disabledDate}
                      onSelect={handleDateSelect}
                    />
                  </Form.Item>
                </div>
                {/* Time Slots Column */}
                <div className="flex-1">
                  <Form.Item
                    name="selectedTime"
                    label="Select Time Slot"
                    rules={[
                      { required: true, message: "Please select a time slot" },
                    ]}
                  >
                    <div className="overflow-auto h-[400px]">
                      {selectedDate ? (
                        generateTimeSlots(selectedDate).map((slot, index) => {
                          const slotEnd = slot.add(
                            SLOT_INTERVAL_MINUTES,
                            "minute"
                          );
                          const available = isSlotAvailable(slot);
                          const isSelected =
                            selectedTimeSlot &&
                            selectedTimeSlot.isSame(slot, "minute");
                          return (
                            <Button
                              key={index}
                              block
                              type={isSelected ? "primary" : "default"}
                              disabled={!available}
                              onClick={() =>
                                form.setFieldValue("selectedTime", slot)
                              }
                              className="mb-2 w-52"
                            >
                              {slot.format("hh:mm A")} -{" "}
                              {slotEnd.format("hh:mm A")}
                            </Button>
                          );
                        })
                      ) : (
                        <Text>Please select a date first</Text>
                      )}
                    </div>
                  </Form.Item>
                </div>
              </div>

              {/* Meeting Purpose */}
              <Form.Item
                name="meetingPurpose"
                label="Meeting Purpose"
                className="!my-0"
                rules={[{ required: true, message: "Please enter a topic" }]}
              >
                <TextArea rows={4} placeholder="Discussion topic..." />
              </Form.Item>
              {/* Action Buttons */}
              <div className="mt-4 space-y-4">
                <Button size="large" block type="primary" htmlType="submit">
                  Confirm Booking
                </Button>
                <Button size="large" block onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

