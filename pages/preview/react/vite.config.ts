import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";

const ROOT = path.resolve(__dirname, "../../..");
const ASSETS_DIR = path.join(ROOT, "assets");

// Keep component CSS imports in sync before each dev/build run.
execSync("node scripts/generate-preview-react-styles.mjs", {
  cwd: ROOT,
  stdio: "inherit",
});

function serveRepoAssets(): Plugin {
  return {
    name: "serve-repo-assets",
    configureServer(server) {
      server.middlewares.use("/assets", (req, res, next) => {
        const urlPath = decodeURIComponent(req.url || "/").split("?")[0];
        const filePath = path.join(ASSETS_DIR, urlPath);
        if (!filePath.startsWith(ASSETS_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          next();
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const types: Record<string, string> = {
          ".svg": "image/svg+xml",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".webp": "image/webp",
        };
        res.setHeader("Content-Type", types[ext] || "application/octet-stream");
        fs.createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      const outAssets = path.resolve(__dirname, "../react-dist/assets");
      fs.cpSync(ASSETS_DIR, outAssets, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), serveRepoAssets()],
  base: "./",
  build: {
    outDir: "../react-dist",
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    open: "/",
    fs: {
      allow: [ROOT],
    },
  },
});
