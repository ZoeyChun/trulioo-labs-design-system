#!/usr/bin/env node
/**
 * Rebuild pages/preview/index.html with <link> tags to component CSS
 * instead of inlining tokens + component styles.
 *
 * Run: node scripts/build-preview.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PREVIEW = path.join(ROOT, "pages/preview/index.html");
const COMPONENTS = path.join(ROOT, "Components");

/** Nested parts loaded via parent @import — do not link separately. */
const NESTED_SKIP = new Set([
  "tabs/tab-item/tab-item.css",
  "side-nav/nav-item/nav-item.css",
  "side-nav/nav-list/nav-list.css",
  "data-table/sort-button/sort-button.css",
]);

/** Secondary entry files (same folder, different primary name). */
const SECONDARY_ENTRIES = new Set(["select/combobox.css"]);

/** Base reset + typography for preview page shell (not in tokens.css). */
const PREVIEW_BASE_CSS = `/* --- Base --- */

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-family);
  color: var(--text-default);
  background: var(--color-white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

`;

function discoverComponentLinks() {
  const links = [];

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

      const cssRel = relPath;
      if (NESTED_SKIP.has(cssRel)) continue;
      if (cssRel.includes("/_shared/")) continue;

      const folder = path.dirname(cssRel);
      const base = entry.name.replace(/\.css$/, "");
      const folderName = path.basename(folder === "." ? base : folder);

      const isPrimary = base === folderName || SECONDARY_ENTRIES.has(cssRel);
      if (!isPrimary) continue;

      links.push(`../../Components/${cssRel}`);
    }
  }

  walk(COMPONENTS);
  return links.sort();
}

function extractBody(html) {
  const bodyStart = html.indexOf("<body>");
  const bodyEnd = html.lastIndexOf("</body>");
  if (bodyStart === -1 || bodyEnd === -1) {
    throw new Error("Could not find <body> in index.html");
  }
  return html.slice(bodyStart, bodyEnd + "</body>".length);
}

function buildPreviewHtml() {
  const existing = fs.readFileSync(PREVIEW, "utf8");
  const body = extractBody(existing);
  const componentLinks = discoverComponentLinks();

  const links = [
    `<link rel="stylesheet" href="../../tokens/fonts.css">`,
    `<link rel="stylesheet" href="../../tokens/tokens.css">`,
    `<link rel="stylesheet" href="preview-shell.css">`,
    `<link rel="stylesheet" href="../shared/tds-shared-atoms.css">`,
    `<link rel="stylesheet" href="../../assets/flag-icons/css/flag-icons.min.css">`,
    ...componentLinks.map(
      (href) => `<link rel="stylesheet" href="${href}">`
    ),
  ].join("\n  ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trulioo Design System — Component Reference</title>
  ${links}
  <style>
/* AUTO-GENERATED layout — run: node scripts/build-preview.mjs */
/* Shell styles in pages/preview/preview-shell.css */

${PREVIEW_BASE_CSS}
  </style>
</head>
${body}
</html>
`;
}

const output = buildPreviewHtml();
fs.writeFileSync(PREVIEW, output);
console.log(`Rebuilt ${PREVIEW}`);
console.log(`  ${discoverComponentLinks().length} component stylesheets linked`);
