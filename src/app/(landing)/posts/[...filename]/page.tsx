import client from "@/tina/__generated__/client";
import Post from "./client-page";

export async function generateStaticParams() {
  const pages = await client.queries.postConnection();
  const paths = pages.data?.postConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}

type Params = {
  params: {
    filename: string[];
  };
};

export default async function PostPage({ params }: Params) {
  const filenames = params.filename;
  const data = await client.queries.post({
    relativePath: `${filenames[0]}.md`,
  });

  return <Post {...data} />;
}
