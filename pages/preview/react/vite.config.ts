import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.resolve(__dirname, "../../..");

// Keep component CSS imports in sync before each dev/build run.
execSync("node scripts/generate-preview-react-styles.mjs", {
  cwd: ROOT,
  stdio: "inherit",
});

export default defineConfig({
  plugins: [react()],
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
