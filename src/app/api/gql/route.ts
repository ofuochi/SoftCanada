import { NextRequest, NextResponse } from "next/server";
import auth0 from "@/lib/auth0";
import { databaseRequest } from "@/lib/db-conn";
import database from "@/tina/database";

export async function POST(req: NextRequest) {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { query, variables } = body;

    const result = await databaseRequest({ query, variables, database });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("GraphQL handler error:", err);
    return NextResponse.json(
      { message: err.message || "Internal Error" },
      { status: 500 }
    );
  }
}
