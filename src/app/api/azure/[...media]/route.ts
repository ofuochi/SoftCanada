import { NextRequest, NextResponse } from "next/server";
import { createMediaHandlers } from "next-tinacms-azure/dist/handlers";
import auth0 from "@/lib/auth0";

const handlers = createMediaHandlers({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING!,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
  authorized: async (req: NextRequest) => {
    // Allow public GET (read) access, require auth for others
    if (req.method === "GET") return true;
    if (process.env.NODE_ENV === "development") return true;
    const session = await auth0.getSession();
    return !!session;
  },
});

type RouteParams = { params: Promise<{ media: string[] }> };

export const POST = handlers.POST;
export const GET = async (req: NextRequest) => {
  try {
    return await handlers.GET(req);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: {
          message: error?.message || "Unknown error",
          name: error?.name,
          stack: error?.stack,
        },
      },
      { status: 500 }
    );
  }
};
export const DELETE = (req: NextRequest, context: RouteParams) => {
  return handlers.DELETE(req, context as any);
};
