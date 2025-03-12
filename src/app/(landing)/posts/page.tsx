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
    <>
      <Head>
        <title>Blog Posts | My Website</title>
        <meta
          name="description"
          content="Read our latest blog posts and updates."
        />
      </Head>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px" }}>
        <Title level={2}>Recent Posts</Title>

        {loading ? (
          <Text type="secondary">Loading posts...</Text>
        ) : posts.length === 0 ? (
          <Text type="secondary">No posts found.</Text>
        ) : (
          <Row gutter={[16, 16]}>
            {posts.map((post) => {
              if (!post?.node) return null;
              const { id, title, _sys, body } = post.node;
              const image = body.children
                .map((child: any) => child.children)
                .flat()
                .find((child: any) => child.type === "img");

              return (
                <Col xs={24} sm={12} md={8} key={id}>
                  <Link href={`/posts/${_sys.filename}`} passHref>
                    <Card
                      hoverable
                      cover={
                        <Image
                          preview={false}
                          alt={image?.alt}
                          src={image?.url}
                        />
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
          </Row>
        )}
      </div>
    </>
  );
}
