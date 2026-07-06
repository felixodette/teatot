import type { NextConfig } from "next";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: resolve(import.meta.dirname),
  // ponytail: skip sharp on cPanel — image optimizer needs native binaries built on-server
  images: { unoptimized: true },
};

export default nextConfig;
