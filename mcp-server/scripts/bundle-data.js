#!/usr/bin/env node

import { resolve, dirname } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadDesignSystem } from "../src/load-data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..", "..");
const outDir = resolve(__dirname, "..", "dist");
const outPath = resolve(outDir, "tds-data.json");

console.log("Bundling design system data from:", repoRoot);

const ds = loadDesignSystem(repoRoot);

const bundle = {
  bundledAt: new Date().toISOString(),
  tokens: ds.tokens,
  components: ds.components,
  showcases: ds.showcases,
  synonyms: ds.synonyms,
  guidelines: ds.guidelines,
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JSON.stringify(bundle, null, 2));

const sizeKb = (Buffer.byteLength(JSON.stringify(bundle)) / 1024).toFixed(0);
console.log(`Wrote ${outPath} (${sizeKb} KB)`);
console.log(`  ${bundle.tokens.length} tokens`);
console.log(`  ${bundle.components.length} components`);
console.log(`  ${bundle.showcases.length} showcases`);
