"use client";

import {
  BlogPage,
  BlogPageConnectionQuery,
  BlogPageQuery,
  Blogs,
  BlogsConnectionQuery,
} from "@/tina/__generated__/types";
import {
  Image as AntImage,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Result,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
const { Title, Paragraph, Text } = Typography;

type Props = {
  categories: readonly string[];
  categoryCounts: Record<string, number>;
  blogPosts: Blogs[];
  cmsQuery?: any;
  selectedCategory?: string;
};
const colors = [
  "#D4CEF7",
  "#D1FD9B",
  "#e4e4e4",
  "#cddef7",
  "#f7eecd",
  "#f7d4cd",
];

const images = [
  "finance_2.svg",
  "immigration.png",
  "buyHouse.svg",
  "deals_3.svg",
  "career_1.svg",
  "lifestyle.svg",
];

export const BlogIndexPageComponent = ({
  cmsQuery,
  blogPosts,
  categories,
  categoryCounts,
  selectedCategory,
}: Props) => {
  const { data } = useTina<BlogPageQuery>(cmsQuery);
  const content = data?.blogPage;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div
        className="text-center mb-12"
        data-tina-field={tinaField(content, "blogHeading")}
      >
        <TinaMarkdown
          content={content?.blogHeading}
          components={{
            h1: (p: any) => (
              <h1
                className="text-3xl sm:text-5xl font-bold leading-snug break-words"
                {...p}
              />
            ),
            p: (p: any) => <p className="text-lg mt-4 break-words" {...p} />,
          }}
        />
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
          <h2
            className="text-2xl font-semibold mb-6"
            data-tina-field={tinaField(content, "categoryTitle")}
          >
            {content.categoryTitle}
          </h2>
          <Row gutter={[16, 16]} className="mb-12">
            {categories.map((category, index) => (
              <Col xs={24} sm={12} md={8} key={category}>
                <Link href={`/blogs?category=${category}`} className="block">
                  <Card
                    className="!h-[140px] !p-0"
                    style={{
                      backgroundColor: `${colors[index]}`,
                      padding: "0px",
                    }}
                    hoverable
                  >
                    <div className="flex items-center gap-7 !h-full">
                      <div className="w-[160px] overflow-clip !h-[90px]">
                        <Image
                          alt="img"
                          src={`/${images[index]}`}
                          width={120}
                          height={70}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Text strong className="text-lg block !font-lato">
                          {category}
                        </Text>
                        <Text
                          type="secondary"
                          className="text-gray-500 !font-lato"
                        >
                          {categoryCounts[category]} articles
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          {blogPosts.length > 0 && (
            <>
              <Divider />
              <h2 className="text-2xl font-semibold mb-6">Recent Articles</h2>
            </>
          )}
        </>
      )}

      {/* Articles List */}
      <List
        itemLayout="vertical"
        size="large"
        className="mb-8"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          hideOnSinglePage: true,
        }}
        dataSource={blogPosts}
        locale={{
          emptyText: (
            <Result
              title="No articles available"
              subTitle="Come back later for more articles."
              extra={
                <Link href="/">
                  <Button type="primary" key="console">
                    Back to Home
                  </Button>
                </Link>
              }
            />
          ),
        }}
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
                  <AntImage
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
