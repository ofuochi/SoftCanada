"use client";

import React from "react";
import { Advisor } from "@/app/types/advisor";
import useSWRInfinite from "swr/infinite";
import { PaginatedList } from "@/app/types/paginatedResponse";
import { useApiClient } from "@/hooks/api-hook";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Image, Tag, Button, Spin } from "antd";
import {
  ArrowRightOutlined,
  LoadingOutlined,
  StarFilled,
} from "@ant-design/icons";
import { VscVerifiedFilled } from "react-icons/vsc";

const { Meta } = Card;

type Props = {
  onBookSessionClick: (advisor: Advisor) => void;
  isBookSessionLoading?: boolean;
};

const convertAdvisorType = (advisorType: string): string | null => {
  const advisorMap: { [key: string]: string } = {
    finance_advisor: "Finance Advisor",
    career_advisor: "Career Advisor",
    immigration_advisor: "Immigration Advisor",
    study_advisor: "Study Advisor",
  };

  return advisorMap[advisorType] || null;
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
      : `/api/advisors?pageNumber=${pageIndex + 1}&pageSize=10`;

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
        <div className="w-fit h-fit mx-auto">
          {isLoading && (
            <Spin
              className="mx-auto"
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 48, color: "black" }}
                  spin
                />
              }
            />
          )}
        </div>
      }
      scrollableTarget="scrollableContainer"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:p-4">
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
            />

            {/* Advisor Type Tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-1">
              {advisor?.advisorType?.map((type, index) => (
                <Tag key={index} className="inline-flex text-xs">
                  {convertAdvisorType(type)}
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

