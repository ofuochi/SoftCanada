import auth0 from "@/lib/auth0";
import { createMediaHandlers } from "next-tinacms-azure/dist/handlers";
import { NextRequest } from "next/server";

const { POST, GET, DELETE } = createMediaHandlers({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING!,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
  authorized: async (_: NextRequest) => {
    try {
      if (process.env.NODE_ENV === "development") return true;
      const session = await auth0.getSession();

      return !!session;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

export { DELETE, GET, POST };
