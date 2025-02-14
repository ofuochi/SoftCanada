import React, { use, useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Space } from "antd";
import { Booking } from "@/app/types/booking";
import { PaginatedList } from "@/app/types/paginatedResponse";
import useSWRInfinite from "swr/infinite";
import { useApiClient } from "@/hooks/api-hook";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { BiTimeFive } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";

dayjs.extend(customParseFormat);

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ListBookings = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: PaginatedList<Booking>
  ) =>
    previousPageData && !previousPageData.items.length
      ? null
      : `/api/career-advisors/bookings/user?pageNumber=${
          pageIndex + 1
        }&pageSize=10`;

  const { get } = useApiClient();

  const {
    data: pages,
    isLoading,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<PaginatedList<Booking>>(getKey, get);
  const bookings = pages ? pages.flatMap((page) => page.items) : [];
  const hasMore =
    pages && pages.length > 0 ? pages[0].totalPages > pages.length : false;

  const onLoadMore = () => {
    setSize(size + 1);
  };

  const loadMore = hasMore ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={onLoadMore} disabled={isLoading}>
        {isLoading ? "loading..." : "load more"}
      </Button>
    </div>
  ) : null;

  return (
    <List
      itemLayout="vertical"
      size="large"
      loading={isLoading}
      loadMore={loadMore}
      dataSource={bookings}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          extra={
            <Space size="middle">
              <a key="list-loadmore-edit">edit</a>
              <a key="list-loadmore-more">cancel</a>
            </Space>
          }
          actions={[
            <IconText
              icon={HiOutlineCalendarDateRange}
              text={dayjs(item.date).format("YYYY-MM-DD")}
            />,
            <IconText
              icon={BiTimeFive}
              text={dayjs(item.date).format("hh:mm A")}
            />,
            <IconText icon={LuMapPin} text="Google meet" />,
          ]}
        >
          <Skeleton avatar title={false} loading={isLoading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.advisorImageUrl} />}
              title={<a href="https://ant.design">{item.advisorName}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            {/* <div>{dayjs(item.date).format("MMM dd yy")}</div> */}
          </Skeleton>
          {item.notes}
        </List.Item>
      )}
    />
  );
};

export default ListBookings;
