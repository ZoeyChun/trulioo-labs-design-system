import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Set in the GitHub Pages build. Local dev stays at the site root. */
const basePath = process.env.PAGES_BASE_PATH || "";
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
