import { BlogIndexPageComponent } from "@/components/app/BlogPage";
import client from "@/tina/__generated__/client";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const result = await client.queries.post({
    relativePath: `${slug}.md`,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      {slug}
    </div>
  );
}
