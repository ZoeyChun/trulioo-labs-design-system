#!/usr/bin/env node
/**
 * Extract tab panel HTML from pages/preview/index.html for the React preview app.
 * Run: node scripts/extract-preview-react.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PREVIEW = path.join(ROOT, "pages/preview/index.html");
const OUT = path.join(ROOT, "pages/preview/react/src/data/sections.ts");

const TAB_IDS = [
  "buttons",
  "inputs",
  "controls",
  "tags",
  "navigation",
  "disclosure",
  "data",
  "typography",
  "tokens",
];

/** Replace em dashes in user-facing copy. */
function sansEmDash(text) {
  return text.replace(/\s—\s/g, ": ").replace(/—/g, "-");
}

function extractSection(html, id) {
  const marker = `id="${id}" role="tabpanel"`;
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`Section not found: ${id}`);

  const open = html.lastIndexOf("<section", start);
  let depth = 0;
  let i = open;

  while (i < html.length) {
    if (html.startsWith("<section", i)) depth++;
    else if (html.startsWith("</section>", i)) {
      depth--;
      if (depth === 0) {
        i += "</section>".length;
        break;
      }
    }
    i++;
  }

  const chunk = html.slice(open, i);
  const title =
    chunk.match(/<h2 class="ds-chapter__title">([^<]+)<\/h2>/)?.[1]?.trim() ??
    id;
  const desc =
    chunk
      .match(/<p class="ds-chapter__desc">([\s\S]*?)<\/p>/)?.[1]
      ?.replace(/&amp;/g, "&")
      .trim() ?? "";

  return {
    id,
    title: sansEmDash(title),
    desc: sansEmDash(desc),
    html: sansEmDash(chunk),
  };
}

function extractScript(html) {
  const start = html.indexOf("<script>");
  const end = html.lastIndexOf("</script>");
  if (start === -1 || end === -1) return "";
  let script = html.slice(start + "<script>".length, end).trim();

  // React shell handles main tab navigation — drop the vanilla tab controller.
  script = script.replace(
    /\/\*\* Tab navigation[\s\S]*?\}\)\(\);\s*/,
    ""
  );

  return script;
}

function main() {
  const html = fs.readFileSync(PREVIEW, "utf8");
  const sections = TAB_IDS.map((id) => extractSection(html, id));
  const script = extractScript(html);

  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const body = `/* AUTO-GENERATED — run: node scripts/extract-preview-react.mjs */

export type PreviewSection = {
  id: string;
  title: string;
  desc: string;
  html: string;
};

export const PREVIEW_SECTIONS: PreviewSection[] = ${JSON.stringify(sections, null, 2)};
`;

  fs.writeFileSync(OUT, body);

  const scriptOut = path.join(ROOT, "pages/preview/react/src/data/interactions.ts");
  fs.writeFileSync(
    scriptOut,
    `/* AUTO-GENERATED — run: node scripts/extract-preview-react.mjs */
export const PREVIEW_INTERACTIONS_SCRIPT = ${JSON.stringify(script)};
`
  );

  console.log(`Extracted ${sections.length} sections → ${OUT}`);
  sections.forEach((s) =>
    console.log(`  ${s.id}: ${(s.html.length / 1024).toFixed(1)} KB`)
  );
}

main();
