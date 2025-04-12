import { Booking } from "@/app/types/booking";
import { PaginatedList } from "@/app/types/paginatedResponse";
import { useApiClient } from "@/hooks/api-hook";
import {
  Avatar,
  Button,
  List,
  Popconfirm,
  Skeleton,
  Space,
  Tooltip,
  Typography,
} from "antd";
import classnames from "classnames";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import React, { forwardRef, JSX, useImperativeHandle } from "react";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";
import useSWRInfinite from "swr/infinite";

const { Text } = Typography;

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const IconText = ({
  icon,
  text,
  isCancelled,
}: {
  icon: React.FC;
  text: string | JSX.Element;
  isCancelled?: boolean;
}) => (
  <Space className={isCancelled ? "line-through" : ""}>
    {React.createElement(icon)}
    {text}
  </Space>
);

export type ListBookingsRef = {
  refresh: () => void;
};

type Props = {
  onCancel?: (booking: Booking) => void;
  onDetails?: (booking: Booking) => void;
};

const ListBookings = forwardRef<ListBookingsRef, Props>(
  ({ onCancel, onDetails }, ref) => {
    const getKey = (
      pageIndex: number,
      previousPageData: PaginatedList<Booking>
    ) => {
      const utcStartDate = encodeURIComponent(
        dayjs.utc().format("YYYY-MM-DDTHH:mm")
      );

      return previousPageData && !previousPageData.items.length
        ? null
        : `/api/advisors/bookings/user?pageNumber=${
            pageIndex + 1
          }&pageSize=3&startDate=${utcStartDate}&sortOrder=asc`;
    };

    const { get } = useApiClient();

    const {
      data: pages,
      isLoading,
      size,
      setSize,
      mutate,
    } = useSWRInfinite<PaginatedList<Booking>>(getKey, get);

    useImperativeHandle(ref, () => ({ refresh: mutate }));

    const bookings = pages ? pages.flatMap((page) => page.items) : [];
    const hasMore =
      pages && pages.length > 0 ? pages[0].totalPages > pages.length : false;

    const onLoadMore = () => {
      setSize(size + 1);
    };

    const loadMore = hasMore ? (
      <div className="text-center mt-3 h-8 leading-[32px]">
        <Button onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? "loading..." : "load more"}
        </Button>
      </div>
    ) : null;

    return (
      <div className="max-h-[1000px] overflow-y-auto sm:max-h-[700px] md:max-h-[800px] lg:max-h-[1000px]">
        <List
          itemLayout="vertical"
          size="large"
          loading={isLoading}
          loadMore={loadMore}
          dataSource={bookings}
          renderItem={(item) => {
            const localDate = dayjs.utc(item.startDate).local();

            return (
              <List.Item
                key={item.id}
                extra={
                  <Space size="middle">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => onDetails?.(item)}
                    >
                      details
                    </Button>

                    <Popconfirm
                      title="Cancel the meeting?"
                      description="Are you sure you want to cancel this meeting?"
                      onConfirm={() => onCancel?.(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="link"
                        size="small"
                        disabled={item.status.toLowerCase() === "cancelled"}
                      >
                        cancel
                      </Button>
                    </Popconfirm>
                  </Space>
                }
                actions={[
                  <IconText
                    isCancelled={item.status.toLowerCase() === "cancelled"}
                    icon={LuCalendarDays}
                    text={localDate.format("ddd, MMM D, YYYY")}
                  />,
                  <IconText
                    isCancelled={item.status.toLowerCase() === "cancelled"}
                    icon={MdOutlineWatch}
                    text={localDate.format("hh:mm A")}
                  />,
                  <IconText
                    isCancelled={item.status.toLowerCase() === "cancelled"}
                    icon={LuMapPin}
                    text={
                      item.status.toLowerCase() === "cancelled" ? (
                        <Text type="danger">Meeting cancelled</Text>
                      ) : (
                        "Google Meet"
                      )
                    }
                  />,
                ]}
              >
                <Skeleton avatar title={false} loading={isLoading} active>
                  <List.Item.Meta
                    avatar={
                      <Tooltip title={item.advisor.name} placement="top">
                        <Avatar
                          src={item.advisor.profilePictureUrl}
                          onClick={() => {}}
                        />
                      </Tooltip>
                    }
                    title={
                      <Text delete={item.status.toLowerCase() === "cancelled"}>
                        <span className="capitalize">{item.advisor.name}</span>
                      </Text>
                    }
                    description={
                      <span
                        className={classnames(
                          "text-gray-500",
                          item.status.toLowerCase() === "cancelled"
                            ? "line-through"
                            : ""
                        )}
                      >
                        {item.advisor.title}
                      </span>
                    }
                  />
                  <Text delete={item.status.toLowerCase() === "cancelled"}>
                    Purpose for meeting - {item.notes}
                  </Text>
                </Skeleton>
              </List.Item>
            );
          }}
        />
      </div>
    );
  }
);

export default ListBookings;
