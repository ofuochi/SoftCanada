"use client";

import { CiCalendar } from "react-icons/ci";
import { Blogs } from "@/tina/__generated__/types";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  List,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
const { Title, Paragraph, Text } = Typography;

type Props = {
  categories: readonly string[];
  categoryCounts: Record<string, number>;
  blogPosts: Blogs[];
  cmsQuery?: any;
  selectedCategory?: string;
};

export const BlogIndexPageComponent = ({
  blogPosts,
  categories,
  categoryCounts,
  selectedCategory,
}: Props) => {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold leading-snug break-words">
          Blogs
        </h1>
        <p className="text-lg mt-4 break-words">
          Explore expert advice, success stories, and practical tips across
          career, finance, real estate, and immigration.
        </p>
      </div>

      {selectedCategory ? (
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>
          <h2 className="text-2xl font-semibold mt-4 mb-6">
            Articles in {selectedCategory}
          </h2>
        </div>
      ) : (
        <>
          {/* Top Categories */}
          <h2 className="text-2xl font-semibold mb-6">Top categories</h2>
          <Row gutter={[16, 16]} className="mb-12">
            {categories.map((category) => (
              <Col xs={24} sm={12} md={8} key={category}>
                <Link href={`/blogs?category=${category}`} className="block">
                  <Card hoverable>
                    <Text strong className="text-lg block mb-2">
                      {category}
                    </Text>
                    <Text type="secondary" className="text-gray-500">
                      {categoryCounts[category]} articles
                    </Text>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <Divider />
          <h2 className="text-2xl font-semibold mb-6">Recent Articles</h2>
        </>
      )}

      {/* Articles List */}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          hideOnSinglePage: true,
        }}
        dataSource={blogPosts}
        renderItem={(post) => (
          <Link
            href={`/blogs/${post._sys.breadcrumbs.join("/")}`}
            key={post?.id}
          >
            <List.Item
              className="hover:bg-blue-50 transition-colors bg-white shadow-sm mb-2 border-gray-100 border"
              actions={[
                <Text type="secondary" key="date" className="!text-sm">
                  {post?.date &&
                    new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                </Text>,
                <Space key="author">
                  <Avatar
                    src={post?.authorImage}
                    alt={post?.author}
                    size="small"
                    className="!border-none"
                  >
                    {post?.author?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Text type="secondary" key="author" className="!text-sm">
                    Written by {post?.author}
                  </Text>
                </Space>,
              ]}
              extra={
                post?.thumbnail && (
                  <Image
                    preview={false}
                    src={post.thumbnail}
                    alt={post.title}
                    width={240}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                )
              }
            >
              <List.Item.Meta
                title={
                  <div className="flex items-center gap-2 mb-2">
                    <Tag
                      color="geekblue"
                      className="!border-none !bg-blue-100 !text-sm"
                    >
                      {post?.category}
                    </Tag>
                    <Text type="secondary" className="!text-sm">
                      {`${post?.readTime} min read`}
                    </Text>
                  </div>
                }
                description={
                  <div>
                    <Title level={4}>{post?.title}</Title>
                    <Paragraph className="!text-gray-600">
                      {post?.excerpt}
                    </Paragraph>
                  </div>
                }
              />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};
