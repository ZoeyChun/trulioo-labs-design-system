#!/usr/bin/env node
/**
 * Assemble a GitHub Pages artifact: built docs + static preview pages + repo assets.
 * Actions deploy replaces the whole site — upload this folder, not Documentation/dist alone.
 */
import { spawnSync } from "node:child_process";
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

for (const dir of ["pages", "Components", "tokens", "assets", "data"]) {
  copyIfExists(path.join(ROOT, dir), path.join(OUT, dir));
}

const portalSrc = path.join(ROOT, "portal-2.0");
const portalDest = path.join(OUT, "portal-2.0");
fs.cpSync(portalSrc, portalDest, {
  recursive: true,
  filter: (source) => {
    const rel = path.relative(portalSrc, source);
    return !rel.split(path.sep).some((part) => part === "node_modules" || part === ".next" || part === "out");
  },
});

const loaderDir = path.join(portalSrc, "Misc/Loader");
const loaderOut = path.join(loaderDir, "out");
console.log("Building Portal loader static export");
for (const args of [["ci"], ["run", "build"]]) {
  const build = spawnSync("npm", args, {
    cwd: loaderDir,
    stdio: "inherit",
    env: {
      ...process.env,
      PAGES_BASE_PATH: "/trulioo-labs-design-system/portal-2.0/Misc/Loader",
    },
  });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
if (!fs.existsSync(path.join(loaderOut, "index.html"))) {
  console.error("Loader static export did not produce out/index.html.");
  process.exit(1);
}
const loaderDest = path.join(portalDest, "Misc/Loader");
fs.rmSync(loaderDest, { recursive: true, force: true });
fs.cpSync(loaderOut, loaderDest, { recursive: true });

console.log("Prepared pages-artifact/ for GitHub Pages");
