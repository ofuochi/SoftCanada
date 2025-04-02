"use client";

import Link from "next/link";
import { Card, Row, Col, Typography, Space, Image, Avatar } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import client from "@/tina/__generated__/client";
const { Meta } = Card;

const { Title, Text } = Typography;

export default function Page() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await client.queries.postConnection();
        setPosts(data?.postConnection?.edges || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <Head>
        <title>Blog Posts | SoftCanada</title>
        <meta
          name="description"
          content="Read our latest blog posts and updates."
        />
      </Head>

      <div className="container mx-auto px-4">
        <Title level={2}>Recent Immigration Posts</Title>

        {loading ? (
          <Text type="secondary">Loading posts...</Text>
        ) : posts.length === 0 ? (
          <Text type="secondary">No posts.</Text>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {posts.map((post) => {
              if (!post?.node) return null;
              const { id, title, _sys, body } = post.node;
              const image = body.children
                .map((child: any) => child.children)
                .flat()
                .find((child: any) => child.type === "img");

              return (
                <Col key={id}>
                  <Link href={`/posts/${_sys.filename}`} passHref>
                    <Card
                      className="w-full flex flex-col h-full shadow-md"
                      hoverable
                      cover={
                        <div className="w-full max-h-86 flex items-center justify-center bg-gray-50 rounded-t-lg overflow-hidden">
                          <Image
                            preview={false}
                            alt={image?.alt}
                            src={image?.url}
                            className="w-full min-h-86 object-cover"
                          />
                        </div>
                      }
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                        }
                        title={title}
                        description="This is the description"
                      />
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

