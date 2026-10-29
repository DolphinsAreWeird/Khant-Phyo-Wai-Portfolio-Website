import type { NextConfig } from "next";

// Static export: the whole site is plain HTML/CSS/JS in `out/`, so it can be
// hosted on Vercel or any static host.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // A stray lockfile in the home folder otherwise confuses root detection.
  turbopack: { root: __dirname },
};

export default nextConfig;
