#!/usr/bin/env node
/**
 * Build Fuse.js search index for the docs React app.
 * Run: node scripts/build-docs-search-index.mjs
 */
import fs from "node:fs";
import path from "node:path";
import {
  aliasesForComponent,
  loadSearchSynonyms,
  writeSearchSynonymsJson,
} from "./lib/search-synonyms.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const DOCS_DATA = path.join(ROOT, "Documentation/src/data");
const OUT = path.join(DOCS_DATA, "search-index.json");
const SYNONYMS_OUT = path.join(DOCS_DATA, "search-synonyms.json");

const TOP_SECTION_LABELS = {
  "getting-started": "Getting Started",
  foundations: "Foundations",
  components: "Components",
  content: "Content",
};

const TEMPLATE_SECTION_LABELS = {
  overview: "Guidelines",
  variants: "Design",
  props: "Props",
  tokens: "Design",
  a11y: "Accessibility",
  code: "Code",
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

const CONTENT_PAGES = [
  {
    id: "component-content",
    title: "Component Content",
    description: "Guidelines for writing labels, helper text, and in-component copy.",
    keywords: ["labels", "copy", "helper text", "validation"],
  },
  {
    id: "writing-guidelines",
    title: "Writing Guidelines",
    description: "General writing principles for product and marketing copy.",
    keywords: ["writing", "style", "grammar", "tone"],
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    description: "Preferred terms and definitions used across Trulioo products.",
    keywords: ["terms", "definitions", "glossary", "word list"],
  },
  {
    id: "voice-and-tone",
    title: "Voice and Tone",
    description: "How Trulioo sounds in different contexts and audiences.",
    keywords: ["voice", "tone", "brand", "personality"],
  },
];

const FOUNDATION_PAGES = [
  {
    id: "typography",
    title: "Typography",
    description: "Type scale, weights, and text utility classes from tokens.css.",
    keywords: ["type", "font", "heading", "body"],
  },
  {
    id: "tokens",
    title: "Design Tokens",
    description: "Color, spacing, radius, elevation, and semantic CSS custom properties.",
    keywords: ["color", "spacing", "radius", "css variables"],
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

function loadComponentChapterMap() {
  const file = path.join(DOCS_DATA, "component-chapters.ts");
  if (!fs.existsSync(file)) return {};
  const src = fs.readFileSync(file, "utf8");
  const match = src.match(/export const COMPONENT_CHAPTER_MAP[^=]*=\s*(\{[\s\S]*?\});/);
  if (!match) return {};

  const map = {};
  const entryRe = /"([^"]+)"\s*:\s*"([^"]+)"|([A-Za-z0-9-]+)\s*:\s*"([^"]+)"/g;
  let entryMatch = entryRe.exec(match[1]);
  while (entryMatch) {
    map[entryMatch[1] || entryMatch[3]] = entryMatch[2] || entryMatch[4];
    entryMatch = entryRe.exec(match[1]);
  }
  return map;
}

function componentsForChapter(chapterMap, chapterId) {
  return Object.entries(chapterMap)
    .filter(([, chapter]) => chapter === chapterId)
    .map(([componentId]) => componentId);
}

function matchingComponentsForShowcase(component, showcase) {
  const name = component.name.toLowerCase();
  const prefixes = component.classPrefixes ?? [];
  const title = showcase.title.toLowerCase();
  const slug = showcase.slug.toLowerCase();

  if (title.includes(name) || slug.includes(component.id.replace(/-/g, ""))) return true;
  return prefixes.some((prefix) => showcase.api.includes(prefix));
}

function main() {
  const synonyms = loadSearchSynonyms();
  writeSearchSynonymsJson(SYNONYMS_OUT);

  const showcases = loadShowcases();
  const tracker = loadJson(path.join(DOCS_DATA, "component-tracker.json"));
  const chapterMap = loadComponentChapterMap();
  const entries = [];

  function componentKeywords(comp, extra = []) {
    return [
      comp.name,
      comp.id,
      comp.id.replace(/-/g, " "),
      comp.category,
      ...(comp.classPrefixes ?? []),
      comp.cssFile,
      ...aliasesForComponent(synonyms, comp.id),
      ...extra,
    ]
      .filter(Boolean)
      .join(" ");
  }

  for (const page of GETTING_STARTED_PAGES) {
    entries.push({
      id: `getting-started/${page.id}`,
      title: page.title,
      description: page.description,
      section: TOP_SECTION_LABELS["getting-started"],
      sectionId: "getting-started",
      pageId: page.id,
      path: page.path,
      category: TOP_SECTION_LABELS["getting-started"],
      keywords: page.keywords.join(" "),
    });
  }

  for (const page of FOUNDATION_PAGES) {
    entries.push({
      id: `foundations/${page.id}`,
      title: page.title,
      description: page.description,
      section: TOP_SECTION_LABELS.foundations,
      sectionId: "foundations",
      pageId: page.id,
      path: `#/foundations/${page.id}`,
      category: TOP_SECTION_LABELS.foundations,
      keywords: [page.id, page.title, ...page.keywords].join(" "),
    });
  }

  for (const page of CONTENT_PAGES) {
    entries.push({
      id: `content/${page.id}`,
      title: page.title,
      description: page.description,
      section: TOP_SECTION_LABELS.content,
      sectionId: "content",
      pageId: page.id,
      path: `#/content/${page.id}`,
      category: TOP_SECTION_LABELS.content,
      keywords: [page.id, page.title, ...page.keywords].join(" "),
    });
  }

  if (tracker?.components) {
    for (const comp of tracker.components) {
      entries.push({
        id: `components/${comp.id}`,
        title: comp.name,
        description: comp.notes ?? comp.category,
        section: TOP_SECTION_LABELS.components,
        sectionId: "components",
        pageId: comp.id,
        path: `#/components/${comp.id}`,
        category: `${TOP_SECTION_LABELS.components} · ${comp.category}`,
        keywords: componentKeywords(comp),
      });
    }
  }

  for (const showcase of showcases) {
    const chapterComponents = componentsForChapter(chapterMap, showcase.chapterId);
    const trackerComponents = (tracker?.components ?? []).filter((c) =>
      chapterComponents.includes(c.id)
    );

    const matched =
      trackerComponents.filter((comp) => matchingComponentsForShowcase(comp, showcase)) ||
      [];

    const targets = matched.length > 0 ? matched : trackerComponents.slice(0, 1);

    for (const comp of targets) {
      entries.push({
        id: `components/${comp.id}/${showcase.slug}`,
        title: showcase.title,
        description: showcase.desc,
        section: TOP_SECTION_LABELS.components,
        sectionId: "components",
        pageId: comp.id,
        path: `#/components/${comp.id}#${showcase.slug}`,
        category: `${comp.name} · ${TEMPLATE_SECTION_LABELS[showcase.templateSection] ?? showcase.templateSection}`,
        keywords: componentKeywords(comp, [showcase.title, showcase.api, showcase.desc]),
      });
    }
  }

  if (tracker?.components) {
    for (const comp of tracker.components) {
      entries.push({
        id: `tracker/${comp.id}`,
        title: comp.name,
        description: comp.notes ?? comp.category,
        section: TOP_SECTION_LABELS["getting-started"],
        sectionId: "getting-started",
        pageId: "tracker",
        path: "#/getting-started/tracker",
        category: `Tracker · ${comp.category}`,
        keywords: componentKeywords(comp),
      });
    }
  }

  fs.writeFileSync(OUT, JSON.stringify(entries, null, 2));
  console.log(`Wrote ${entries.length} search entries → ${OUT}`);
  console.log(`Wrote search synonyms → ${SYNONYMS_OUT}`);
}

main();
