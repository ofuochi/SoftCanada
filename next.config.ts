import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "cdn.auth0.com",
      },
      // for displaying image urls inputed by users, temporary fix
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames with HTTPS
        port: "",
        pathname: "/**", // Allows all paths
      },
    ],
  },
};

export default nextConfig;

