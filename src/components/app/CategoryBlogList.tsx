"use client";

import { Blogs } from "@/tina/__generated__/types";
import { List } from "antd";
import Image from "next/image";
import Link from "next/link";

type CategoryBlogListProps = {
  blogPosts: Blogs[];
  category: string;
  pageSize?: number;
  total?: number;
};

// Separate BlogCard component
const BlogCard = ({ post }: { post: Blogs }) => {
  return (
    <section className="w-full py-5 px-4 min-h-[550px] bg-[#F5F5F5] rounded-lg space-y-6">
      {post.thumbnail && (
        <div className="w-full max-w-[418px] h-[298px] overflow-clip">
          <Image
            width={418}
            height={298}
            src={post.thumbnail}
            alt={post?.title}
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h6 className="text-[#010B18] font-poppins line-clamp-2 font-bold text-2xl">
        {post?.title}
      </h6>
      <p className="text-[#808080] text-base font-poppins line-clamp-2">
        {post?.excerpt}
      </p>
      <Link
        href={`/blogs/${post._sys.breadcrumbs.join("/")}`}
        className="bg-[#FF0000] flex items-center justify-center text-[15px] font-poppins font-semibold text-white hover:text-white text-center w-full max-w-[184px] h-[49px] py-3 px-2.5 rounded-md"
      >
        Discover More
      </Link>
    </section>
  );
};

export const CategoryBlogList = ({
  blogPosts,
  category,
  pageSize = 4,
  total,
}: CategoryBlogListProps) => {
  const filteredPosts = category
    ? blogPosts.filter((post) => post.category === category)
    : blogPosts;

  return (
    <List
      grid={{ gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
      dataSource={filteredPosts}
      pagination={{
        pageSize,
        total: total || filteredPosts.length,
        showSizeChanger: false,
        hideOnSinglePage: true,
      }}
      renderItem={(post) => (
        <List.Item key={post.id}>
          <BlogCard post={post} />
        </List.Item>
      )}
      className="w-full !max-w-[1400px] !mx-auto !px-5"
    />
  );
};

