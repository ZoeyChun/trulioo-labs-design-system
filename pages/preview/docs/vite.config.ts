import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";

const ROOT = path.resolve(__dirname, "../../..");
const ASSETS_DIR = path.join(ROOT, "assets");

execSync("node scripts/generate-docs-react-styles.mjs", {
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
      const outAssets = path.resolve(__dirname, "../docs-dist/assets");
      fs.cpSync(ASSETS_DIR, outAssets, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), serveRepoAssets()],
  base: "./",
  build: {
    outDir: "../docs-dist",
    emptyOutDir: true,
  },
  server: {
    port: 5175,
    open: "/",
    fs: {
      allow: [ROOT],
    },
  },
});
