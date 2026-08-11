#!/usr/bin/env node
/**
 * Assemble a GitHub Pages artifact: built docs + static preview pages + repo assets.
 * Actions deploy replaces the whole site — upload this folder, not Documentation/dist alone.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "pages-artifact");

function copyIfExists(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, dest, { recursive: true });
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const dist = path.join(ROOT, "Documentation/dist");
if (!fs.existsSync(path.join(dist, "index.html"))) {
  console.error("Run Documentation build first (npm run build in Documentation/)");
  process.exit(1);
}

// Jekyll off for underscore paths (Components/_shared)
const nojekyll = path.join(ROOT, ".nojekyll");
fs.writeFileSync(path.join(OUT, ".nojekyll"), nojekyll ? fs.readFileSync(nojekyll) : "");

copyIfExists(path.join(ROOT, "index.html"), path.join(OUT, "index.html"));
copyIfExists(dist, path.join(OUT, "Documentation/dist"));
copyIfExists(path.join(ROOT, "Documentation/index.html"), path.join(OUT, "Documentation/index.html"));

for (const dir of ["pages", "Components", "tokens", "assets", "data", "embeds"]) {
  copyIfExists(path.join(ROOT, dir), path.join(OUT, dir));
}

console.log("Prepared pages-artifact/ for GitHub Pages");
