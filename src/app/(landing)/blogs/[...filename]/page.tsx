import { BlogPost } from "@/components/landing/BlogPost";
import client from "@/tina/__generated__/databaseClient";

export async function generateStaticParams() {
  const pages = await client.queries.blogsConnection();
  return (
    pages.data?.blogsConnection?.edges?.map((edge) => {
      console.log(edge);
      const filename = edge?.node?._sys.breadcrumbs;
      return { filename };
    }) ?? []
  );
}

type Props = {
  params: Promise<{
    filename: string[];
  }>;
};

export default async function BlogPage({ params }: Props) {
  const { filename } = await params;
  const relativePath = `${filename.join("/")}.md`;
  const result = await client.queries.blogs({ relativePath });

  return <BlogPost {...result} />;
}
