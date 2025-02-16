import { Booking } from "@/app/types/booking";
import { PaginatedList } from "@/app/types/paginatedResponse";
import { useApiClient } from "@/hooks/api-hook";
import { Avatar, Button, Table, TableProps, Tag, Typography } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";
import useSWR from "swr";

const { Text } = Typography;

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export type ListBookingHistoryRef = {
  refresh: () => void;
};
type Props = {};

const ListBookingHistory = forwardRef<ListBookingHistoryRef, Props>(
  (props, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortOrder, setSortOrder] = useState("dsc");
    const { get } = useApiClient();

    const queryParams = new URLSearchParams({
      pageNumber: currentPage.toString(),
      pageSize: pageSize.toString(),
      endDate: dayjs.utc().format("YYYY-MM-DDTHH:mm"),
      sortOrder: sortOrder,
    }).toString();

    const { data, mutate, isLoading } = useSWR<PaginatedList<Booking>>(
      `/api/career-advisors/bookings/user?${queryParams}`,
      get
    );

    useImperativeHandle(ref, () => ({ refresh: mutate }));

    const columns: TableProps<Booking>["columns"] = [
      {
        title: "Advisor",
        dataIndex: ["advisor", "name"],
        key: "advisor",
        render: (_, record) => (
          <div className="flex items-center gap-3">
            <Avatar src={record.advisor.profilePictureUrl} />
            <Text>{record.advisor.name}</Text>
          </div>
        ),
      },
      {
        title: "Meeting Topic",
        dataIndex: "notes",
        key: "notes",
        render: (notes) => notes,
      },
      {
        title: "Meeting Duration",
        dataIndex: "endDate",
        key: "endDate",
        render: (_, { startDate, endDate }) => {
          const duration = dayjs(endDate).diff(dayjs(startDate), "minute");
          return <Text>{duration} minutes</Text>;
        },
      },
      {
        title: "Date & Time",
        dataIndex: "startDate",
        sorter: true,
        key: "startDate",
        render: (_, { startDate, endDate }) => {
          return (
            <div className="">
              <Text>
                {dayjs(startDate).utc().local().format("ddd, MMM D, YYYY")}
              </Text>
              <Text className="block">
                {dayjs(startDate).utc().local().format("hh:mm A")} -{" "}
                {dayjs(endDate).utc().local().format("hh:mm A")}
              </Text>
            </div>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string, rec) => {
          const isInFuture = dayjs().utc().isBefore(rec.endDate);
          if (status.toLowerCase() === "booked") {
            if (isInFuture) return <Tag color="blue">Ongoing</Tag>;

            return <Tag color="green">Completed</Tag>;
          }
          return (
            <Tag color={status.toLowerCase() === "cancelled" ? "red" : "blue"}>
              {status}
            </Tag>
          );
        },
      },
    ];

    const handleTableChange: TableProps<Booking>["onChange"] = (
      pagination,
      filters,
      sorter
    ) => {
      setCurrentPage(pagination.current || 1);
      setPageSize(pagination.pageSize || 10);

      if (!Array.isArray(sorter)) {
        if (sorter.field === "startDate") {
          setSortOrder(
            sorter.order === "ascend"
              ? "asc"
              : sorter.order === "descend"
              ? "dsc"
              : "dsc"
          );
        } else {
          setSortOrder("dsc");
        }
      }
    };

    return (
      <Table<Booking>
        columns={columns}
        loading={isLoading}
        dataSource={data?.items}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.totalRecords,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} item(s)`,
          pageSizeOptions: [5, 10, 20, 50],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        rowKey="id"
        scroll={{ x: true }}
      />
    );
  }
);

ListBookingHistory.displayName = "ListBookingHistory";

export default ListBookingHistory;
