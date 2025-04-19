import { createMediaDeliveryHandlers } from "next-tinacms-azure/dist/delivery-handlers";

export const { GET } = createMediaDeliveryHandlers({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING!,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
  authorized: async () => true, // public delivery
});
