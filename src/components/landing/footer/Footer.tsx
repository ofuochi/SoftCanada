import { dbConnection } from "@/lib/db-conn";
import { FooterComponent } from "./FooterComponent";

export default async function Footer() {
  let query;
  try {
    query = await dbConnection.queries.footer({
      relativePath: "footer.md",
    });
  } catch (err) {
    console.error("Error fetching footer data:", err);
    return <div>Error loading footer data</div>;
  }

  return <FooterComponent cmsQuery={query} {...query.data} />;
}
