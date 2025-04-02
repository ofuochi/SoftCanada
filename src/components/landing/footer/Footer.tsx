import client from "@/tina/__generated__/client";
import { FooterComponent } from "./FooterComponent";

export default async function Footer() {
  const query = await client.queries.footer({
    relativePath: "footer.md",
  });

  return <FooterComponent cmsQuery={query} {...query.data} />;
}
