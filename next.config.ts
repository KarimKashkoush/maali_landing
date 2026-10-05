import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [60, 75] },
  async headers() {
    return [{
      source: "/videos/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
};

export default nextConfig;
