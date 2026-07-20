#!/usr/bin/env node
/**
 * Generate src/styles/tds-imports.ts for the React preview app.
 * Run: node scripts/generate-preview-react-styles.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const COMPONENTS = path.join(ROOT, "Components");
const OUT = path.join(ROOT, "pages/preview/react/src/styles/tds-imports.ts");

const NESTED_SKIP = new Set([
  "tabs/tab-item/tab-item.css",
  "side-nav/nav-item/nav-item.css",
  "side-nav/nav-list/nav-list.css",
  "data-table/sort-button/sort-button.css",
]);
const SECONDARY_ENTRIES = new Set(["select/combobox.css"]);

function discoverComponentImports() {
  const imports = [];

  function walk(dir, rel = "") {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        if (relPath === "_shared") continue;
        walk(path.join(dir, entry.name), relPath);
        continue;
      }

      if (!entry.name.endsWith(".css")) continue;
      if (NESTED_SKIP.has(relPath)) continue;
      if (relPath.includes("/_shared/")) continue;

      const folder = path.dirname(relPath);
      const base = entry.name.replace(/\.css$/, "");
      const folderName = path.basename(folder === "." ? base : folder);
      const isPrimary =
        base === folderName || SECONDARY_ENTRIES.has(relPath);
      if (!isPrimary) continue;

      imports.push(`import "../../../../../Components/${relPath}";`);
    }
  }

  walk(COMPONENTS);
  return imports.sort();
}

const componentImports = discoverComponentImports();

const body = `/* AUTO-GENERATED — run: node scripts/generate-preview-react-styles.mjs */

import "../../../../../tokens/fonts.css";
import "../../../../../tokens/tokens.css";
import "../../../../shared/tds-shared-atoms.css";
import "../../../../../assets/flag-icons/css/flag-icons.min.css";

${componentImports.join("\n")}
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, body);
console.log(`Generated ${OUT} (${componentImports.length} component stylesheets)`);
