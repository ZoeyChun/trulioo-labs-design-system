#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadDesignSystem } from "../src/load-data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");
const outPath = join(__dirname, "../dist/tds-data.json");

mkdirSync(dirname(outPath), { recursive: true });

const data = loadDesignSystem(repoRoot);

writeFileSync(outPath, JSON.stringify(data, null, 0));

const sizeKB = Math.round(
  Buffer.byteLength(JSON.stringify(data)) / 1024
);

console.log(`Bundled to ${outPath}`);
console.log(
  `  ${data.tokens.length} tokens, ${data.components.length} components, ${data.showcases.length} showcases`
);
console.log(`  ${sizeKB} KB`);
