import { createMediaHandlers } from "next-tinacms-azure/dist/handlers";
import { isAuthorized } from "next-tinacms-azure/dist/auth";
import { NextRequest } from "next/server";

const handlers = createMediaHandlers({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING!,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
  authorized: async (req: NextRequest) => {
    try {
      if (process.env.NODE_ENV === "development") {
        return true;
      }

      const user = await isAuthorized(req);
      return user?.verified || false;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

const { GET, POST, DELETE } = handlers;

export { GET, POST, DELETE };
export default function handler() {
  // This is required just to satisfy Next.js App Router’s default export requirement.
  return new Response(
    "This route supports GET, POST, and DELETE methods only.",
    { status: 405 }
  );
}
