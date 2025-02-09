"use client";

import React, { useState } from "react";
import { Button, message } from "antd";
import type { Dayjs } from "dayjs";
import { ScheduleMeetingModal } from "@/components/dashboard/advisor/ScheduleMeetingModal";

export default function CareerAdvisor() {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const handleSave = (date: Dayjs, time: string, timezone: string) => {
    // Implement your logic here (e.g., call an API to update the schedule)
    message.success(
      `Scheduled on ${date.format("MMM D, YYYY")} at ${time} [${timezone}]`
    );
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Open Reschedule Modal
      </Button>
      <ScheduleMeetingModal
        open={visible}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </>
  );
}
