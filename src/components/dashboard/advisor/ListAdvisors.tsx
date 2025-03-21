"use client";

import React from "react";
import { Advisor } from "@/app/types/advisor";
import useSWRInfinite from "swr/infinite";
import { PaginatedList } from "@/app/types/paginatedResponse";
import { useApiClient } from "@/hooks/api-hook";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Image, Space, Tag, Button } from "antd";
import { ArrowRightOutlined, StarFilled } from "@ant-design/icons";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { VscVerifiedFilled } from "react-icons/vsc";

const { Meta } = Card;

type Props = {
  onBookSessionClick: (advisor: Advisor) => void;
  isBookSessionLoading?: boolean;
};

export default function ListAdvisors({
  onBookSessionClick,
  isBookSessionLoading,
}: Props) {
  const { get } = useApiClient();

  const getKey = (
    pageIndex: number,
    previousPageData: PaginatedList<Advisor>
  ) =>
    previousPageData && !previousPageData.items.length
      ? null
      : `/api/career-advisors?pageNumber=${pageIndex + 1}&pageSize=10`;

  const {
    data: pages,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite<PaginatedList<Advisor>>(getKey, get);
  const advisors = pages ? pages.flatMap((page) => page.items) : [];
  const hasMore =
    pages && pages.length > 0 ? pages[0].totalPages > pages.length : false;

  return (
    <InfiniteScroll
      dataLength={advisors.length}
      next={() => setSize(size + 1)}
      hasMore={hasMore}
      loader={<div className="text-center p-4">Loading more advisors...</div>}
      endMessage={
        <p className="text-center p-4 text-gray-500">
          {isLoading && "Loading..."}
        </p>
      }
      scrollableTarget="scrollableContainer"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-4">
        {advisors.map((advisor) => (
          <Card
            key={advisor.id}
            hoverable={false}
            className="w-full flex flex-col h-full"
            cover={
              <div className="w-full max-h-96 flex items-center justify-center bg-gray-50 rounded-t-lg overflow-hidden">
                <Image
                  alt={advisor.name}
                  src={advisor.profilePictureUrl}
                  className="w-full min-h-96 object-cover"
                />
              </div>
            }
          >
            <Meta
              title={
                <div className="text-center font-semibold flex items-center justify-center gap-1">
                  {advisor.name}
                  {advisor.isVerified && (
                    <VscVerifiedFilled className="text-blue-400" />
                  )}
                </div>
              }
              description={
                <div className="text-center text-gray-600 text-sm font-bold truncate">
                  <Space>
                    <PiSuitcaseSimpleFill />
                    <span>{advisor.title}</span>
                  </Space>
                  <span className="text-yellow-500 flex items-center justify-center gap-1">
                    <StarFilled />
                    {(advisor.rating || 5).toFixed(1)}
                  </span>
                </div>
              }
            />

            {/* Expertise Tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-1">
              {advisor.expertise.map((skill) => (
                <Tag key={skill.id} className="inline-flex text-xs">
                  {skill.areaOfExpertise}
                </Tag>
              ))}
            </div>

            <Button
              color="default"
              variant="filled"
              block
              className="mt-5 
              transition-all 
              duration-300 
              ease-in-out 
              hover:scale-[1.02]
              [&_.ant-btn-icon]:transition-all 
              [&_.ant-btn-icon]:duration-300 
              [&:hover_.ant-btn-icon]:translate-x-3 
              [&:hover_.ant-btn-icon]:scale-125"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              loading={isBookSessionLoading}
              onClick={() => onBookSessionClick(advisor)}
            >
              Book Session
            </Button>
          </Card>
        ))}
      </div>
    </InfiniteScroll>
  );
}
