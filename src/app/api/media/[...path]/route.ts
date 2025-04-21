import auth0 from "@/lib/auth0";
import {
  BlobSASPermissions,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/tiff",
];

type RouteParams = { params: Promise<{ path: string[] }> };

// Validate environment variables early
function validateConfig() {
  if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined");
  }
  if (!process.env.AZURE_STORAGE_CONTAINER_NAME) {
    throw new Error("AZURE_STORAGE_CONTAINER_NAME is not defined");
  }
}

export async function GET(req: NextRequest, context: RouteParams) {
  try {
    validateConfig();

    // Handle authorization first
    const isAuthorized = await config.authorized(req);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Azure connection setup
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
    const accountNameMatch = connectionString.match(/AccountName=([^;]+)/);
    const accountKeyMatch = connectionString.match(/AccountKey=([^;]+)/);

    if (!accountNameMatch?.[1] || !accountKeyMatch?.[1]) {
      return NextResponse.json(
        { error: "Invalid Azure Storage configuration" },
        { status: 500 }
      );
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountNameMatch[1],
      accountKeyMatch[1]
    );

    const client = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = client.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER_NAME!
    );

    // Get blob path
    const rawPath = (await context.params).path;
    const blobName = rawPath.join("/");

    if (!blobName) {
      return NextResponse.json({ error: "Missing blob path" }, { status: 400 });
    }

    // Generate SAS token
    const sasToken = generateBlobSASQueryParameters(
      {
        containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
        blobName,
        permissions: BlobSASPermissions.parse("r"),
        expiresOn: new Date(Date.now() + 60 * 1000), // 1 minute expiration
      },
      sharedKeyCredential
    ).toString();

    // Fetch blob from Azure
    const blobClient = containerClient.getBlockBlobClient(blobName);
    const azureResponse = await fetch(`${blobClient.url}?${sasToken}`);

    if (!azureResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch file from Azure",
          status: azureResponse.status,
        },
        { status: azureResponse.status }
      );
    }

    // Handle non-image files
    const contentType =
      azureResponse.headers.get("content-type") || "application/octet-stream";
    if (!SUPPORTED_IMAGE_TYPES.includes(contentType)) {
      return new NextResponse(await azureResponse.blob(), {
        status: 200,
        headers: {
          "content-type": contentType,
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Process image
    const imageBuffer = await azureResponse.arrayBuffer();
    const url = new URL(req.url);

    // Validate and parse parameters
    const width = parseInt(url.searchParams.get("w") || "");
    const height = parseInt(url.searchParams.get("h") || "");
    const quality = Math.min(
      Math.max(parseInt(url.searchParams.get("q") || "80"), 1),
      100
    );

    const format =
      url.searchParams.get("fmt") ||
      (req.headers.get("accept")?.includes("image/webp")
        ? "webp"
        : req.headers.get("accept")?.includes("image/avif")
        ? "avif"
        : "jpeg");

    // Process image with Sharp
    try {
      const processedImage = sharp(imageBuffer)
        .resize({
          width: Number.isNaN(width) ? undefined : width,
          height: Number.isNaN(height) ? undefined : height,
          fit: "inside",
          withoutEnlargement: true,
        })
        .toFormat(format as keyof sharp.FormatEnum, { quality });

      const processedBuffer = await processedImage.toBuffer();

      return new NextResponse(processedBuffer, {
        status: 200,
        headers: {
          "content-type": `image/${format}`,
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    } catch (sharpError) {
      console.error("Image processing error:", sharpError);
      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          "content-type": contentType,
          "cache-control": "public, max-age=3600",
        },
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Authorization config
const config = {
  authorized: async (req: NextRequest) => {
    try {
      if (process.env.NODE_ENV === "development") return true;
      const session = await auth0.getSession();
      return !!session?.user;
    } catch (error) {
      console.error("Authorization error:", error);
      return false;
    }
  },
};
