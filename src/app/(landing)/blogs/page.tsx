import { BlogIndexPageComponent } from "@/components/app/BlogIndexPageComponent";
import client from "@/tina/__generated__/client";
import { Blogs } from "@/tina/__generated__/types";
import { BlogCategories } from "@/tina/collections/BlogPostCollection";

export default async function BlogIndexPage() {
  const result = await client.queries.blogsConnection();
  const blogs =
    result.data.blogsConnection.edges?.map((edge) => edge?.node) || [];

  const categoryCounts = blogs.reduce((acc, post) => {
    const category = post!.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, Object.fromEntries(BlogCategories.map((cat) => [cat, 0])) as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      {blogs.length && (
        <BlogIndexPageComponent
          categories={BlogCategories}
          categoryCounts={categoryCounts}
          blogPosts={blogs as Blogs[]}
          cmsQuery={result}
        />
      )}
    </div>
  );
}
