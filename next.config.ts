import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ponytail: skip sharp on cPanel — image optimizer needs native binaries built on-server
  images: { unoptimized: true },
};

export default nextConfig;
