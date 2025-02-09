import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Select,
  Calendar,
  Button,
  Card,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

interface RescheduleMeetingModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (date: Dayjs, time: string, timezone: string) => void;
}

/** Sample list of times for demonstration. */
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

const RescheduleMeetingModal: React.FC<RescheduleMeetingModalProps> = ({
  visible,
  onCancel,
  onSave,
}) => {
  // Default date is set to December 20, 2024, just as in your screenshot
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs("2024-12-20"));
  const [selectedTime, setSelectedTime] = useState<string>("12:00 PM");
  const [timezone, setTimezone] = useState<string>("Africa/Lagos (UTC +01:00)");

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleTimezoneChange = (value: string) => {
    setTimezone(value);
  };

  const handleSave = () => {
    onSave(selectedDate, selectedTime, timezone);
  };

  return (
    <Modal
      visible={visible}
      title="Reschedule Meeting"
      onCancel={onCancel}
      footer={null}
      width={900} // Adjust width to your liking
    >
      <Row gutter={24}>
        {/* LEFT COLUMN: Meeting details */}
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ background: "transparent" }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Reschedule Meeting
            </Title>
            <Text strong style={{ display: "block" }}>
              Expertise:
            </Text>
            <Text>
              Resume writing, Career trajectory, Interview preparation
            </Text>

            <br />
            <br />

            <Text strong style={{ display: "block" }}>
              Duration:
            </Text>
            <Text>30 mins</Text>

            <br />
            <br />

            <Text strong style={{ display: "block" }}>
              Language:
            </Text>
            <Text>English only</Text>

            <br />
            <br />

            <Text strong style={{ display: "block" }}>
              Venue:
            </Text>
            <Text>Google Meet</Text>

            <br />
            <br />

            <Text type="secondary">
              Note: The advisor will be notified of this change.
            </Text>
          </Card>
        </Col>

        {/* MIDDLE COLUMN: Calendar + timezone */}
        <Col xs={24} md={8}>
          <div style={{ marginBottom: 8 }}>
            <Text strong>Select a new date &amp; time</Text>
          </div>

          <Select
            style={{ width: "100%", marginBottom: 16 }}
            value={timezone}
            onChange={handleTimezoneChange}
          >
            <Option value="Africa/Lagos (UTC +01:00)">
              Africa/Lagos (UTC +01:00)
            </Option>
            <Option value="America/New_York (UTC -05:00)">
              America/New_York (UTC -05:00)
            </Option>
            <Option value="Europe/London (UTC +00:00)">
              Europe/London (UTC +00:00)
            </Option>
            {/* Add more timezones as needed */}
          </Select>

          {/* A small Calendar in “card” mode (fullscreen = false) */}
          <Calendar
            fullscreen={false}
            value={selectedDate}
            onSelect={handleDateSelect}
          />
        </Col>

        {/* RIGHT COLUMN: Time slots */}
        <Col xs={24} md={8}>
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            {selectedDate.format("dddd, MMMM D")}
          </Text>
          {timeSlots.map((time) => (
            <Button
              key={time}
              block
              style={{
                textAlign: "left",
                marginBottom: 8,
                backgroundColor: time === selectedTime ? "#1890ff" : undefined,
                color: time === selectedTime ? "#fff" : undefined,
              }}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </Button>
          ))}
        </Col>
      </Row>

      {/* Modal Footer */}
      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Button style={{ marginRight: 8 }} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default RescheduleMeetingModal;
