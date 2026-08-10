#!/usr/bin/env node
/**
 * Extract tab panel HTML + showcase metadata for the docs React app.
 * Run: node scripts/extract-docs-react.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PREVIEW = path.join(ROOT, "pages/preview/index.html");
const OUT = path.join(ROOT, "Documentation/src/data/sections.ts");
const SHOWCASES_OUT = path.join(ROOT, "Documentation/src/data/showcases.ts");
const INTERACTIONS_OUT = path.join(ROOT, "Documentation/src/data/interactions.ts");

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

const SECTION_MAP = {
  buttons: { section: "components", label: "Buttons" },
  inputs: { section: "components", label: "Inputs" },
  controls: { section: "components", label: "Controls" },
  tags: { section: "components", label: "Tags" },
  navigation: { section: "components", label: "Navigation" },
  disclosure: { section: "components", label: "Disclosure" },
  data: { section: "components", label: "Data" },
  typography: { section: "foundations", label: "Typography" },
  tokens: { section: "foundations", label: "Design Tokens" },
};

function sansEmDash(text) {
  return text.replace(/\s—\s/g, ": ").replace(/—/g, "-");
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function classifyShowcase(title, api, index) {
  const t = title.toLowerCase();
  if (t.includes("anatomy")) return "variants";
  if (index === 0 || t.includes("overview")) return "overview";
  if (
    t.includes("variant") ||
    t.includes("size") ||
    t.includes("position") ||
    t.includes("state") ||
    t.includes("interaction") ||
    t.includes("configuration") ||
    t.includes("type") ||
    t.includes("shape")
  ) {
    return "variants";
  }
  if (t.includes("token") || t.includes("color") || t.includes("spacing")) return "tokens";
  if (t.includes("a11y") || t.includes("accessibility") || t.includes("keyboard")) return "a11y";
  if (t.includes("use case") || t.includes("kyb") || t.includes("example")) return "code";
  // Canvas demos belong in Design; Props tab still lists API from all showcases.
  return "variants";
}

function extractShowcases(chunk, chapterId) {
  const showcases = [];
  const articleRe = /<article class="ds-showcase">([\s\S]*?)<\/article>/g;
  let match;
  let index = 0;

  while ((match = articleRe.exec(chunk)) !== null) {
    const inner = match[1];
    const title =
      inner.match(/<h3 class="ds-showcase__title">([^<]+)<\/h3>/)?.[1]?.trim() ??
      `Showcase ${index + 1}`;
    const descRaw =
      inner.match(/<p class="ds-showcase__desc">([\s\S]*?)<\/p>/)?.[1] ?? "";
    const desc = sansEmDash(stripTags(descRaw));
    const api =
      inner.match(/<code class="ds-api">([^<]+)<\/code>/)?.[1]?.trim() ?? "";
    const html = sansEmDash(`<article class="ds-showcase">${inner}</article>`);
    const slug = slugify(title) || `showcase-${index + 1}`;

    showcases.push({
      chapterId,
      slug,
      title: sansEmDash(title),
      desc,
      api,
      html,
      templateSection: classifyShowcase(title, api, index),
      sortOrder: index,
    });
    index++;
  }

  return showcases;
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

  const showcases = extractShowcases(chunk, id);

  return {
    id,
    title: sansEmDash(title),
    desc: sansEmDash(desc),
    html: cleanSectionHtml(sansEmDash(chunk), id),
    showcases,
  };
}

function cleanSectionHtml(html, id) {
  return html.replace(
    new RegExp(
      `<section class="ds-chapter ds-tab-panel(?: is-active)?" id="${id}" role="tabpanel" aria-labelledby="tab-${id}"(?: hidden)?>`
    ),
    '<section class="ds-chapter ds-tab-panel">'
  );
}

function extractScript(html) {
  const start = html.indexOf("<script>");
  const end = html.lastIndexOf("</script>");
  if (start === -1 || end === -1) return "";
  let script = html.slice(start + "<script>".length, end).trim();
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
  const allShowcases = sections.flatMap((s) => s.showcases);
  const sectionsForOutput = sections.map(({ showcases: _s, ...rest }) => rest);

  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  fs.writeFileSync(
    OUT,
    `/* AUTO-GENERATED — run: node scripts/extract-docs-react.mjs */

export type PreviewSection = {
  id: string;
  title: string;
  desc: string;
  html: string;
};

export const PREVIEW_SECTIONS: PreviewSection[] = ${JSON.stringify(sectionsForOutput, null, 2)};
`
  );

  fs.writeFileSync(
    SHOWCASES_OUT,
    `/* AUTO-GENERATED — run: node scripts/extract-docs-react.mjs */

export type TemplateSectionId =
  | "overview"
  | "variants"
  | "props"
  | "tokens"
  | "a11y"
  | "code";

export type PreviewShowcase = {
  chapterId: string;
  slug: string;
  title: string;
  desc: string;
  api: string;
  html: string;
  templateSection: TemplateSectionId;
  sortOrder: number;
};

export const PREVIEW_SHOWCASES: PreviewShowcase[] = ${JSON.stringify(allShowcases, null, 2)};

export const SHOWCASES_BY_CHAPTER: Record<string, PreviewShowcase[]> = ${JSON.stringify(
      Object.fromEntries(sections.map((s) => [s.id, s.showcases])),
      null,
      2
    )};

export const SECTION_META = ${JSON.stringify(SECTION_MAP, null, 2)};
`
  );

  fs.writeFileSync(
    INTERACTIONS_OUT,
    `/* AUTO-GENERATED — run: node scripts/extract-docs-react.mjs */
export const PREVIEW_INTERACTIONS_SCRIPT = ${JSON.stringify(script)};
`
  );

  console.log(`Extracted ${sections.length} sections → ${OUT}`);
  console.log(`Extracted ${allShowcases.length} showcases → ${SHOWCASES_OUT}`);
}

main();
