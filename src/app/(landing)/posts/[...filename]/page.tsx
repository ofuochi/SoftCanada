import client from "@/tina/__generated__/client";
import Post from "./client-page";

type Params = {
  params: {
    filename: string[];
  };
};
export async function generateStaticParams() {
  const pages = await client.queries.postConnection();
  const paths = pages.data?.postConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}

export default async function PostPage({ params }: Params) {
  const data = await client.queries.post({
    relativePath: `${params.filename}.md`,
  });

  return <Post {...data} />;
}
