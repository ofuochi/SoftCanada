"use client";

import { PropertyListing } from "@/app/types/property-listing";
import { useApiClient } from "@/hooks/api-hook";
import { formatCAD } from "@/utils/currency";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Dropdown,
  Empty,
  MenuProps,
  message,
  Popconfirm,
  PopconfirmProps,
  Table,
  TableProps,
  Typography,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortOrder, setSortOrder] = useState("dsc");
    const { get, del } = useApiClient();

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
            <div className="w-[76px] h-[60px] overflow-clip !rounded-sm flex justify-center items-center">
              {record.imagesUrls[0].includes("http") ? (
                <Image
                  width={73}
                  height={53}
                  className="object-cover !rounded-sm"
                  alt="property-image"
                  src={record?.imagesUrls[0]}
                />
              ) : (
                <Empty
                  description="No img"
                  className="!rounded-sm"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </div>
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
        render: (_, record) => {
          const confirm: PopconfirmProps["onConfirm"] = () => {
            handleDelete();
          };

          const handleDelete = async () => {
            try {
              const response = await del(
                `/api/RealEstate/properties/${record.id}`
              );
              messageApi.success(`Property Deleted successfully`);
              mutate();
            } catch (error: any) {
              messageApi.error(error || `Error deleting property`);
            }
          };

          const items: MenuProps["items"] = [
            {
              label: (
                <div
                  onClick={() => router.push(`properties/${record.id}`)}
                  className="flex items-center gap-2"
                >
                  <EditOutlined className="text-black" />
                  <span className="text-[#4F4F4F] font-lato text-sm">
                    {" "}
                    Edit
                  </span>
                </div>
              ),
              key: "0",
            },
            {
              label: (
                <Popconfirm
                  title="Delete property"
                  description="Are you sure to delete this property"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <div className="flex items-center gap-2">
                    <DeleteOutlined className="text-black" />
                    <span className="text-[#4F4F4F] font-lato text-sm">
                      {" "}
                      Delete{" "}
                    </span>
                  </div>
                </Popconfirm>
              ),
              key: "1",
            },
          ];

          return (
            <Dropdown
              placement="bottomRight"
              overlayClassName="w-[210px] py-2.5 px-3"
              menu={{ items }}
              trigger={["click"]}
            >
              <div className="w-[29px] h-[25px] bg-[#F5F5F5] py-2 px-3 flex justify-center items-center cursor-pointer">
                <EllipsisOutlined className="text-xl" color="#000000" />
              </div>
            </Dropdown>
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
      <section className="w-full overflow-x-auto">
        {contextHolder}
        <Table<PropertyListing>
          columns={columns}
          loading={isLoading}
          dataSource={data}
          className="w-full max-xl:min-w-[1000px]"
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
      </section>
    );
  }
);

PropertyListings.displayName = "PropertyListings";

export default PropertyListings;

