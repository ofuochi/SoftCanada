"use client";

import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useState } from "react";

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};
export default function CalendarPage() {
  // State to track the selected date if needed
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Handle date selection
  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);

    // Perform actions based on the selected date
    console.log("Selected date:", date.format("YYYY-MM-DD"));

    // Example: Show different actions based on date content
    const events = getListData(date);
    if (events.length > 0) {
      console.log("Events on this date:", events);
      // e.g., open a modal with these events
    } else {
      // e.g., open an "add event" form
    }
  };

  // Function to determine which dates to disable
  const disabledDate = (current: Dayjs) => {
    // Disable dates in the past
    const isPastDate = current < dayjs().startOf("day");

    // Disable weekends
    const isWeekend = current.day() === 0 || current.day() === 6;

    return isPastDate || isWeekend;
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className="p-5 bg-white">
      <Calendar
        cellRender={cellRender}
        onSelect={onDateSelect}
        disabledDate={disabledDate}
      />
    </div>
  );
}

