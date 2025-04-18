import type { NextApiRequest, NextApiResponse } from "next";
import auth0 from "@/lib/auth0";
import { databaseRequest } from "@/lib/db-conn";
import database from "@/tina/database";

type Body = {
  query: string;
  variables?: Record<string, any>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth0.getSession(req);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { query, variables } = req.body as Body;
  try {
    const result = await databaseRequest({ query, variables, database });
    return res.status(200).json(result);
  } catch (err: any) {
    console.error("GraphQL handler error:", err);
    return res.status(500).json({ message: err.message || "Internal Error" });
  }
}
