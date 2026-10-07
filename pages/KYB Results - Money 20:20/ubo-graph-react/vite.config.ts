import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "KybUboGraph",
      formats: ["iife"],
      fileName: () => "ubo-graph.bundle.js",
    },
    outDir: path.resolve(__dirname, "../ubo-graph-dist"),
    emptyOutDir: true,
    cssCodeSplit: false,
  },
});
