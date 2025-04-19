import { TinaCloudAzureMediaStore } from "next-tinacms-azure";
import type { Media, MediaListOptions, MediaList } from "tinacms";

export class AzureMediaStore extends TinaCloudAzureMediaStore {
  buildQuery(options: MediaListOptions): string {
    const params = Object.entries(options)
      .filter(([_, value]) => value !== "" && value !== undefined)
      .map(([key, value]) => {
        if (typeof value === "object") {
          return `${key}=${encodeURIComponent(JSON.stringify(value))}`;
        }
        return `${key}=${encodeURIComponent(String(value))}`;
      })
      .join("&");

    return `?${params}`;
  }
}
