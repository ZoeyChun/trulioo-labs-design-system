#!/usr/bin/env node
/**
 * Build Fuse.js search index for the docs React app.
 * Run: node scripts/build-docs-search-index.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DOCS_DATA = path.join(ROOT, "pages/preview/docs/src/data");
const OUT = path.join(DOCS_DATA, "search-index.json");

const SECTION_MAP = {
  buttons: { section: "components", sectionLabel: "Components", label: "Buttons" },
  inputs: { section: "components", sectionLabel: "Components", label: "Inputs" },
  controls: { section: "components", sectionLabel: "Components", label: "Controls" },
  tags: { section: "components", sectionLabel: "Components", label: "Tags" },
  navigation: { section: "components", sectionLabel: "Components", label: "Navigation" },
  disclosure: { section: "components", sectionLabel: "Components", label: "Disclosure" },
  data: { section: "components", sectionLabel: "Components", label: "Data" },
  typography: { section: "foundations", sectionLabel: "Foundations", label: "Typography" },
  tokens: { section: "foundations", sectionLabel: "Foundations", label: "Design Tokens" },
};

const GETTING_STARTED_PAGES = [
  {
    id: "overview",
    title: "Overview",
    description: "Welcome to the Trulioo Design System component reference.",
    path: "#/getting-started/overview",
    keywords: ["home", "start", "introduction", "welcome"],
  },
  {
    id: "tracker",
    title: "Component Tracker",
    description: "Implementation status, Figma parity, and adoption metrics.",
    path: "#/getting-started/tracker",
    keywords: ["tracker", "status", "adoption", "figma", "backlog"],
  },
  {
    id: "migration",
    title: "Migration Guide",
    description: "URL redirects, page splits, and link updates from classic preview.",
    path: "#/getting-started/migration",
    keywords: ["migration", "redirect", "urls", "upgrade", "classic"],
  },
];

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadShowcases() {
  const file = path.join(DOCS_DATA, "showcases.ts");
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf8");
  const match = src.match(/export const PREVIEW_SHOWCASES[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!match) return [];
  return JSON.parse(match[1]);
}

function loadSections() {
  const file = path.join(DOCS_DATA, "sections.ts");
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf8");
  const match = src.match(/export const PREVIEW_SECTIONS[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!match) return [];
  return JSON.parse(match[1]);
}

function main() {
  const sections = loadSections();
  const showcases = loadShowcases();
  const tracker = loadJson(path.join(DOCS_DATA, "component-tracker.json"));
  const entries = [];

  for (const page of GETTING_STARTED_PAGES) {
    entries.push({
      id: `getting-started/${page.id}`,
      title: page.title,
      description: page.description,
      section: "Getting Started",
      sectionId: "getting-started",
      pageId: page.id,
      path: page.path,
      category: "Getting Started",
      keywords: page.keywords.join(" "),
    });
  }

  for (const section of sections) {
    const meta = SECTION_MAP[section.id];
    if (!meta) continue;
    entries.push({
      id: `${meta.section}/${section.id}`,
      title: meta.label,
      description: section.desc,
      section: meta.sectionLabel,
      sectionId: meta.section,
      pageId: section.id,
      path: `#/${meta.section}/${section.id}`,
      category: meta.sectionLabel,
      keywords: [section.id, section.title, meta.label].join(" "),
    });
  }

  for (const showcase of showcases) {
    const meta = SECTION_MAP[showcase.chapterId];
    if (!meta) continue;
    entries.push({
      id: `${meta.section}/${showcase.chapterId}/${showcase.slug}`,
      title: showcase.title,
      description: showcase.desc,
      section: meta.sectionLabel,
      sectionId: meta.section,
      pageId: showcase.chapterId,
      path: `#/${meta.section}/${showcase.chapterId}#${showcase.slug}`,
      category: `${meta.label} · ${showcase.templateSection}`,
      keywords: [showcase.title, showcase.api, showcase.chapterId, showcase.desc]
        .filter(Boolean)
        .join(" "),
    });
  }

  if (tracker?.components) {
    for (const comp of tracker.components) {
      entries.push({
        id: `tracker/${comp.id}`,
        title: comp.name,
        description: comp.notes ?? comp.category,
        section: "Getting Started",
        sectionId: "getting-started",
        pageId: "tracker",
        path: "#/getting-started/tracker",
        category: `Tracker · ${comp.category}`,
        keywords: [
          comp.name,
          comp.id,
          comp.category,
          ...(comp.classPrefixes ?? []),
          comp.cssFile,
        ]
          .filter(Boolean)
          .join(" "),
      });
    }
  }

  fs.writeFileSync(OUT, JSON.stringify(entries, null, 2));
  console.log(`Wrote ${entries.length} search entries → ${OUT}`);
}

main();
