import React, { forwardRef, useImperativeHandle } from "react";
import { Booking } from "@/app/types/booking";
import { PaginatedList } from "@/app/types/paginatedResponse";
import { useApiClient } from "@/hooks/api-hook";
import { Avatar, Button, List, Skeleton, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";
import useSWRInfinite from "swr/infinite";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export type ListBookingsRef = {
  handleShow: () => void;
};

type ListBookingsProps = {
  onEdit?: (booking: Booking) => void;
  onCancel?: (booking: Booking) => void;
};

const ListBookings = forwardRef<ListBookingsRef, ListBookingsProps>(
  ({ onCancel, onEdit }, ref) => {
    const getKey = (
      pageIndex: number,
      previousPageData: PaginatedList<Booking>
    ) =>
      previousPageData && !previousPageData.items.length
        ? null
        : `/api/career-advisors/bookings/user?pageNumber=${
            pageIndex + 1
          }&pageSize=3`;

    const { get } = useApiClient();

    const {
      data: pages,
      isLoading,
      size,
      setSize,
      mutate,
    } = useSWRInfinite<PaginatedList<Booking>>(getKey, get);

    useImperativeHandle(ref, () => ({
      handleShow: () => mutate(),
    }));

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
            const localDate = dayjs.utc(item.date).local();

            return (
              <List.Item
                key={item.id}
                extra={
                  <Space size="middle">
                    <a>edit</a>
                    <a>cancel</a>
                  </Space>
                }
                actions={[
                  <IconText
                    icon={LuCalendarDays}
                    text={localDate.format("YYYY-MM-DD")}
                  />,
                  <IconText
                    icon={MdOutlineWatch}
                    text={localDate.format("hh:mm A")}
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
                  {item.notes}
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
