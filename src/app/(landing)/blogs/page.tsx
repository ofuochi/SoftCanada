import { BlogIndexPageComponent } from "@/components/app/BlogPage";
import client from "@/tina/__generated__/client";
import React from "react";

export default async function BlogIndexPage() {
  const result = await client.queries.postConnection();
  return <></>;
}
