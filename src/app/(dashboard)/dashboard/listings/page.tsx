"use client";

import { PaginatedList } from "@/app/types/paginatedResponse";
import { PropertyListing } from "@/app/types/property-listing";
import { useApiClient } from "@/hooks/api-hook";
import { formatCAD } from "@/utils/currency";
import { DeleteOutlined } from "@ant-design/icons";
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
      isForSale: "",
      location: "",
      minPrice: "",
      maxPrice: "",
    }).toString();

    const { data, mutate, isLoading } = useSWR<PropertyListing[]>(
      `/api/RealEstate/agent/properties`,
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
        title: "Description",
        dataIndex: ["description"],
        key: "description",
        render: (_, record) => <Text>{record.description}</Text>,
      },
      {
        title: "Type",
        dataIndex: ["type"],
        key: "type",
        render: (_, record) => <Text>{record.type}</Text>,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "notes",
        render: (_, { price }) => <span> {formatCAD(price)} </span>,
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
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => (
          <span>
            {" "}
            <DeleteOutlined className="text-[#D32F2F]" />{" "}
          </span>
        ),
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
        dataSource={data}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.length,
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

