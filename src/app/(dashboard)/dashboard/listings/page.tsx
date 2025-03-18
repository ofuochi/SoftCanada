import { PaginatedList } from "@/app/types/paginatedResponse";
import { PropertyListing } from "@/app/types/property-listing";
import { useApiClient } from "@/hooks/api-hook";
import { Avatar, Table, TableProps, Tag, Typography } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import useSWR from "swr";

const { Text } = Typography;

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export type PropertyListingsRef = {
  refresh: () => void;
};
type Props = {};

const PropertyListings = forwardRef<PropertyListingsRef, Props>(
  (props, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortOrder, setSortOrder] = useState("dsc");
    const { get } = useApiClient();

    // const queryParams = new URLSearchParams({
    //   pageNumber: currentPage.toString(),
    //   pageSize: pageSize.toString(),
    //   endDate: dayjs.utc().format("YYYY-MM-DDTHH:mm"),
    //   sortOrder: sortOrder,
    // }).toString();

    const queryParams = new URLSearchParams({
      isForSale: "false",
      location: "ojota",
      minPrice: "12",
      maxPrice: "23",
    }).toString();

    const { data, mutate, isLoading } = useSWR<PaginatedList<PropertyListing>>(
      `/api/RealEstate/properties/user?${queryParams}`,
      get
    );

    useImperativeHandle(ref, () => ({ refresh: mutate }));

    const columns: TableProps<PropertyListing>["columns"] = [
      {
        title: "Property",
        dataIndex: ["advisor", "imageUrls"],
        key: "advisor",
        render: (_, record) => (
          <div className="flex items-center gap-3">
            <Avatar src={record.imagesUrls[0]} />
            <Text>{record.name}</Text>
          </div>
        ),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "notes",
        render: (_, { price }) => <span> {price} </span>,
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        render: (_, { location }) => <span> {location} </span>,
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        sorter: true,
        key: "startDate",
        render: (_, { createdAt }) => {
          return (
            <div className="">
              <Text>
                {dayjs(createdAt).utc().local().format("ddd, MMM D, YYYY")}
              </Text>
            </div>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, { status }) => {
          if (status.toLowerCase() === "booked") {
            if (status === "Sold")
              return <Tag color="rgba(114, 250, 50, 1)">Ongoing</Tag>;
            if (status === "Active") return <Tag color="blue">Active</Tag>;

            return <Tag color="rgba(250, 90, 50, 0.2)">Pending</Tag>;
          }
          return (
            <Tag color={status.toLowerCase() === "cancelled" ? "red" : "blue"}>
              {status}
            </Tag>
          );
        },
      },
    ];

    const handleTableChange: TableProps<PropertyListing>["onChange"] = (
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
      <Table<PropertyListing>
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

PropertyListings.displayName = "PropertyListings";

export default PropertyListings;

