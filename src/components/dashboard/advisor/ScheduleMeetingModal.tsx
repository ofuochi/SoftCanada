import React, { useEffect } from "react";
import {
  Modal,
  Calendar,
  Select,
  Button,
  Typography,
  Divider,
  Space,
  TimePicker,
  Input,
  Alert,
  Form,
  FormInstance,
  Avatar,
} from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { FaRegClock } from "react-icons/fa";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { LiaLanguageSolid } from "react-icons/lia";
import { Advisor } from "@/app/types/advisor";
import { Booking } from "@/app/types/booking";
import { MdOutlineWatch } from "react-icons/md";
import { MeetingType } from "@/app/(dashboard)/dashboard/career/career-advisor/page";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker: TimeRangePicker } = TimePicker;
const { TextArea } = Input;

dayjs.extend(utc);
dayjs.extend(timezone);

const START_HOUR = 9;
const END_HOUR = 17;
const SLOT_INTERVAL = 30;
const NUM_DAYS_AHEAD = 30;
const MAX_DURATION_MINUTES = 30;

const generateTimeSlots = (date: Dayjs): Dayjs[] => {
  const slots: Dayjs[] = [];
  let current = date.hour(START_HOUR).minute(0).second(0).millisecond(0);
  const end = date.hour(END_HOUR).minute(0).second(0).millisecond(0);

  while (current.isBefore(end)) {
    slots.push(current);
    current = current.add(SLOT_INTERVAL, "minute");
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
    const slotEnd = slotStart.add(SLOT_INTERVAL, "minute");
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
  onSave: (payload: MeetingType) => void;
}

interface FormValues {
  selectedDate: Dayjs;
  timeRange?: [Dayjs?, Dayjs?];
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
  const selectedDate = Form.useWatch("selectedDate", form);
  const selectedTimezone = Form.useWatch("timezone", form);

  const findInitialDate = (): Dayjs => {
    const today = dayjs().startOf("day");
    for (let i = 0; i <= NUM_DAYS_AHEAD; i++) {
      const d = today.add(i, "day");
      if (hasFree30MinSlot(d, advisor.booking)) {
        return d;
      }
    }
    return today;
  };

  useEffect(() => {
    if (!open) return;
    form.resetFields();
    form.setFieldsValue({
      selectedDate: findInitialDate(),
      timezone: "America/Toronto",
      meetingPurpose: "",
    });
  }, [open, form]);

  const disabledDate = (current: Dayjs) => {
    const today = dayjs().startOf("day");
    if (current.isBefore(today, "day")) return true;
    if (current.isAfter(today.add(NUM_DAYS_AHEAD, "day"))) return true;
    return !hasFree30MinSlot(current, advisor.booking);
  };

  const handleDateSelect = (value: Dayjs) => {
    form.setFieldsValue({
      selectedDate: value,
    });
  };

  const handleFormSubmit = async (values: FormValues) => {
    if (!values.timeRange) return;
    const [start, end] = values.timeRange;
    if (!start || !end) return;
    const realStart = values.selectedDate
      .hour(start.hour())
      .minute(start.minute())
      .second(0)
      .millisecond(0);
    const realEnd = values.selectedDate
      .hour(end.hour())
      .minute(end.minute())
      .second(0)
      .millisecond(0);

    const overlap = advisor.booking.some((bk) => {
      const bkStart = dayjs(bk.startDate);
      const bkEnd = dayjs(bk.endDate);
      return intervalsOverlap(realStart, realEnd, bkStart, bkEnd);
    });

    if (overlap) {
      form.setFields([
        {
          name: "timeRange",
          errors: ["This time slot overlaps with an existing booking"],
        },
      ]);
      return;
    }

    onSave({
      advisor,
      startDate: realStart.tz(values.timezone),
      endDate: realEnd.tz(values.timezone),
      notes: values.meetingPurpose,
    });
  };

  const timeRangeValidator = async (_: any, value?: [Dayjs?, Dayjs?]) => {
    if (!value) throw new Error("Please select a time range");

    const [start, end] = value;
    if (!start) throw new Error("Please select a start time");
    if (!end) throw new Error("Please select an end time");

    // Get duration in minutes
    const diffMin = end.diff(start, "minute");
    if (diffMin < 5 || diffMin > 30) {
      throw new Error("Duration must be between 5 to 30 minutes");
    }

    // Combine selected date with time to check past times
    const selectedDate = form.getFieldValue("selectedDate");
    if (selectedDate) {
      const fullStartTime = selectedDate
        .hour(start.hour())
        .minute(start.minute())
        .second(0)
        .millisecond(0);

      if (fullStartTime.isBefore(dayjs())) {
        throw new Error("Cannot select a time in the past");
      }
    }
  };

  const [startTime, endTime] = Form.useWatch<[Dayjs?, Dayjs?]>(
    "timeRange",
    form
  ) || [undefined, undefined];

  const duration = endTime?.diff(startTime, "minute");
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
                <Text>{advisor.expertise.map((e) => e.name).join(", ")}</Text>
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
                <Text>{(startTime || dayjs()).local().format("hh:mm A")}</Text>
              </Space>
            </div>
            <div>
              <Text strong className="block">
                Duration:
              </Text>
              <Space>
                <FaRegClock />
                <Text>{duration || 5} mins</Text>
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

          <div className="w-full md:w-[65%]">
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <Text strong className="block mb-4">
                  Select Date
                </Text>
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
                <Form.Item name="selectedDate">
                  <Calendar
                    fullscreen={false}
                    disabledDate={disabledDate}
                    onSelect={handleDateSelect}
                  />
                </Form.Item>
              </div>

              <div className="w-full">
                <Form.Item
                  name="timeRange"
                  label="Select a 5 to 30 minutes time slot"
                  rules={[{ validator: timeRangeValidator, required: true }]}
                >
                  <TimeRangePicker
                    format="hh:mm A"
                    minuteStep={5}
                    className="w-full"
                    disabled={!selectedDate}
                  />
                </Form.Item>

                <Divider />

                <Form.Item
                  name="meetingPurpose"
                  label="Meeting Purpose"
                  rules={[{ required: true, message: "Please enter a topic" }]}
                >
                  <TextArea rows={4} placeholder="Discussion topic..." />
                </Form.Item>
              </div>

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
