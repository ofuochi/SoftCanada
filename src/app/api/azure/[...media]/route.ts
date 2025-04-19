import { NextRequest, NextResponse } from "next/server";
import { createMediaHandlers } from "next-tinacms-azure/dist/handlers";
import auth0 from "@/lib/auth0";

const handlers = createMediaHandlers({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING!,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
  authorized: async (req: NextRequest) => {
    if (process.env.NODE_ENV === "development") return true;
    const session = await auth0.getSession(req);
    return !!session;
  },
});

type RouteParams = { params: Promise<{ media: string[] }> };

export const POST = handlers.POST;
export const GET = handlers.GET;
export const DELETE = (req: NextRequest, context: RouteParams) => {
  return handlers.DELETE!(req, context as any);
};
