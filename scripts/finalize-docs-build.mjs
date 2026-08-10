#!/usr/bin/env node
/** Rename dev.html → index.html in Documentation/dist after Vite build. */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const dist = path.join(ROOT, "Documentation/dist");
const devHtml = path.join(dist, "dev.html");
const indexHtml = path.join(dist, "index.html");

if (!fs.existsSync(devHtml)) {
  console.error("Expected Documentation/dist/dev.html after build");
  process.exit(1);
}

fs.renameSync(devHtml, indexHtml);
console.log("Renamed Documentation/dist/dev.html → index.html");
