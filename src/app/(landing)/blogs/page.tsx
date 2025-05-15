import { BlogIndexPageComponent } from "@/components/app/BlogIndexPageComponent";
import HeroSection from "@/components/landing/HeroSection";
import { dbConnection } from "@/lib/db-conn";
import { Blogs } from "@/tina/__generated__/types";
import { BlogCategories } from "@/tina/collections/BlogPostCollection";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogIndexPage({ searchParams }: Props) {
  // Fetch all blog posts
  const result = await dbConnection.queries.blogsConnection();

  const allBlogs =
    result.data?.blogsConnection?.edges?.map((edge) => edge?.node) || [];

  // Get selected category from URL query params
  const selectedCategory = (await searchParams).category;

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory
    ? allBlogs.filter((blog) => blog?.category === selectedCategory)
    : allBlogs;

  // Calculate category counts from all blogs
  const categoryCounts = allBlogs.reduce((acc, post) => {
    const category = post!.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, Object.fromEntries(BlogCategories.map((cat) => [cat, 0])) as Record<string, number>);

  const query = await dbConnection.queries.blogPage({
    relativePath: "blogPage.md",
  });

  return (
    <div className="-mt-16">
      <HeroSection
        backgroundImage={
          query?.data?.blogPage.backgroundImage || "/images/landing/blog.jpg"
        }
        buttonLink=""
        buttonText=""
        message={query?.data?.blogPage.message}
        cmsQuery={query}
      />
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 mx-auto">
        <BlogIndexPageComponent
          categories={BlogCategories}
          categoryCounts={categoryCounts}
          blogPosts={filteredBlogs as Blogs[]}
          cmsQuery={query}
          selectedCategory={selectedCategory}
        />
      </section>
    </div>
  );
}

