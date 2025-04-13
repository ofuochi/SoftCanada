import auth0 from "@/lib/auth0";
import { databaseRequest } from "@/lib/db-conn";
import database from "@/tina/database";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth0.getSession(req);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("gql.ts", session);
  const { query, variables } = req.body;
  const result = await databaseRequest({ query, variables, database });
  return res.json(result);
}
