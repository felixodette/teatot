import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ponytail: skip sharp on cPanel — image optimizer needs native binaries built on-server
  images: { unoptimized: true },
  // Parent lockfiles (~/package-lock.json) make Next pick the wrong workspace root,
  // which breaks webpack client chunk factories (e.g. LenisProvider "reading 'call'").
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
