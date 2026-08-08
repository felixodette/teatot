import type { NextConfig } from "next";
import path from "path";

/** App root — parent lockfiles (~/ and ~/Development/) confuse Next's workspace inference. */
const projectRoot = path.join(__dirname);

const nextConfig: NextConfig = {
  // ponytail: skip sharp on cPanel — image optimizer needs native binaries built on-server
  images: { unoptimized: true },
  // Parent package-lock.json files make Next pick the wrong workspace root,
  // which can break webpack client chunk factories during Fast Refresh.
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  async redirects() {
    return [
      // Blog slugs were mismatched — content renamed to match actual article topic.
      {
        source: "/blog-posts/how-we-think-about-food",
        destination: "/blog-posts/machakos-peoples-park",
        permanent: true,
      },
      {
        source: "/blog-posts/art-of-a-good-hotel-stay",
        destination: "/blog-posts/kyamwilu-gravity-hill",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
