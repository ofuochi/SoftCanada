"use client";

import { Blogs } from "@/tina/__generated__/types";
import Image from "next/image";
import Link from "next/link";

type CategoryBlogListProps = {
  blogPosts: Blogs[];
  category: string;
};

export const CategoryBlogList = ({
  blogPosts,
  category,
}: CategoryBlogListProps) => {
  const filteredPosts = category
    ? blogPosts.filter((post) => post.category === category)
    : blogPosts;

  return (
    <section className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-[1400px] mx-auto px-5">
      {filteredPosts.map((post, index) => (
        <section
          className="w-full py-5 px-4 bg-[#F5F5F5] rounded-lg space-y-6"
          key={post.id}
        >
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
          <h6 className="text-[#010B18] font-lato font-bold text-[28px]">
            {" "}
            {post?.title}{" "}
          </h6>
          <p className="text-[#808080] text-[22px] font-poppins">
            {" "}
            {post?.excerpt}{" "}
          </p>
          <Link
            href={`/blogs/${post._sys.breadcrumbs.join("/")}`}
            className="bg-[#FF0000] block font-poppins font-semibold text-white text-center w-full max-w-[184px] h-[49px] py-3 px-2.5 rounded-md"
          >
            {" "}
            Discover More{" "}
          </Link>
        </section>
      ))}
    </section>
  );
};
