#!/usr/bin/env node
/**
 * Concatenate Components/_shared/* into pages/shared/tds-shared-atoms.css
 * so BV/DV/preview load shared atoms even when nested @import fails.
 *
 * Run: node scripts/build-shared-atoms-bundle.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SHARED = path.join(ROOT, "Components/_shared");
const OUT = path.join(ROOT, "pages/shared/tds-shared-atoms.css");

const ATOMS = [
  "field-label",
  "field-caption",
  "field-validation",
  "caret",
  "dropdown-panel",
  "tag",
  "radio",
];

const chunks = [
  "/* AUTO-GENERATED — run: node scripts/build-shared-atoms-bundle.mjs */",
  "/* Shared atom styles (canonical source: Components/_shared/) */",
  "",
];

for (const atom of ATOMS) {
  const file = path.join(SHARED, atom, `${atom}.css`);
  if (!fs.existsSync(file)) {
    console.error(`Missing shared atom: ${file}`);
    process.exit(1);
  }
  chunks.push(`/* --- ${atom} --- */`);
  chunks.push(fs.readFileSync(file, "utf8").trim());
  chunks.push("");
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, chunks.join("\n") + "\n");
console.log(`Wrote ${OUT} (${ATOMS.length} atoms)`);
