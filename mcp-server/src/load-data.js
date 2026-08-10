import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadDesignSystem(repoRoot) {
  if (repoRoot) {
    return loadFromRepo(repoRoot);
  }
  return loadFromBundle();
}

function loadFromRepo(repoRoot) {
  const tokens = loadTokens(repoRoot);
  const components = loadComponents(repoRoot);
  const showcases = loadShowcases(repoRoot);
  const synonyms = loadSynonyms(repoRoot);
  const showcaseMap = mapShowcasesToComponents(showcases, components);
  const guidelines = buildGuidelines();

  return { tokens, components, showcases, synonyms, showcaseMap, guidelines };
}

function loadFromBundle() {
  const bundlePath = join(__dirname, "..", "dist", "tds-data.json");
  if (!existsSync(bundlePath)) {
    throw new Error(
      "No bundled data found. Either set TDS_REPO_ROOT to a local repo clone, " +
      "or run: node scripts/bundle-data.js"
    );
  }
  const bundle = JSON.parse(readFileSync(bundlePath, "utf-8"));
  const showcaseMap = mapShowcasesToComponents(bundle.showcases, bundle.components);
  return { ...bundle, showcaseMap };
}

// ---------------------------------------------------------------------------
// Tokens — parse tokens.css into structured categories
// ---------------------------------------------------------------------------

function loadTokens(repoRoot) {
  const cssPath = join(repoRoot, "tokens/tokens.css");
  if (!existsSync(cssPath)) return [];

  const css = readFileSync(cssPath, "utf-8");
  const tokens = [];
  let category = "";
  let subcategory = "";
  let tier = "core";

  for (const line of css.split("\n")) {
    const majorHeader = line.match(
      /^\s*\/\*\s*[-=]+\s*$/
    );
    if (majorHeader) continue;

    const sectionLine = line.match(
      /^\s*\/\*\s*(CORE|SEMANTIC)\s*\/\s*(\w+)/i
    );
    if (sectionLine) {
      tier = sectionLine[1].toLowerCase();
      category = sectionLine[2].toLowerCase();
      subcategory = "";
      continue;
    }

    const subLine = line.match(/^\s*\/\*\s+([A-Z][\w\s/&·-]*?)\s*\*\/\s*$/);
    if (subLine) {
      subcategory = subLine[1].trim();
      continue;
    }

    const prop = line.match(
      /^\s*(--[\w-]+)\s*:\s*(.+?)\s*;\s*(?:\/\*\s*(.*?)\s*\*\/)?\s*$/
    );
    if (prop) {
      tokens.push({
        name: prop[1],
        value: prop[2],
        resolvedValue: prop[3] || null,
        category,
        subcategory,
        tier,
      });
    }
  }

  return tokens;
}

// ---------------------------------------------------------------------------
// Components — read built JSON (falls back to raw YAML parsing)
// ---------------------------------------------------------------------------

function loadComponents(repoRoot) {
  const jsonPaths = [
    join(repoRoot, "pages/preview/docs/src/data/component-tracker.json"),
    join(repoRoot, "pages/preview/react/src/data/component-tracker.json"),
  ];

  for (const p of jsonPaths) {
    if (existsSync(p)) {
      const data = JSON.parse(readFileSync(p, "utf-8"));
      return data.components || [];
    }
  }

  return parseTrackerYaml(repoRoot);
}

function parseTrackerYaml(repoRoot) {
  const yamlPath = join(repoRoot, "data/component-tracker.yaml");
  if (!existsSync(yamlPath)) return [];

  const text = readFileSync(yamlPath, "utf-8");
  const components = [];
  let current = null;

  for (const line of text.split("\n")) {
    if (line.match(/^\s+-\s*$/)) {
      if (current) components.push(current);
      current = {};
      continue;
    }
    if (!current) continue;

    const kv = line.match(/^\s{4}(\w[\w-]*):\s*(.*)/);
    if (kv) {
      let [, key, val] = kv;
      val = val.replace(/^["']|["']$/g, "").trim();
      if (key === "classPrefixes") {
        current.classPrefixes = [];
      } else if (key === "figmaVariants") {
        current[key] = parseInt(val, 10) || 0;
      } else {
        current[key] = val;
      }
    }

    const listItem = line.match(/^\s{6}-\s+(.*)/);
    if (listItem && current.classPrefixes) {
      current.classPrefixes.push(listItem[1].trim());
    }
  }
  if (current && current.id) components.push(current);

  return components;
}

// ---------------------------------------------------------------------------
// Showcases — extract from the auto-generated TS file
// ---------------------------------------------------------------------------

function loadShowcases(repoRoot) {
  const tsPath = join(
    repoRoot,
    "pages/preview/docs/src/data/showcases.ts"
  );
  if (!existsSync(tsPath)) return [];

  const content = readFileSync(tsPath, "utf-8");

  const marker = "PREVIEW_SHOWCASES";
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) return [];

  const eqSign = content.indexOf("=", markerIdx);
  if (eqSign === -1) return [];

  const arrayStart = content.indexOf("[", eqSign);
  if (arrayStart === -1) return [];

  let depth = 0;
  let arrayEnd = -1;
  for (let i = arrayStart; i < content.length; i++) {
    if (content[i] === "[") depth++;
    if (content[i] === "]") {
      depth--;
      if (depth === 0) {
        arrayEnd = i + 1;
        break;
      }
    }
  }
  if (arrayEnd === -1) return [];

  try {
    return JSON.parse(content.slice(arrayStart, arrayEnd));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Synonyms — used for fuzzy component search
// ---------------------------------------------------------------------------

function loadSynonyms(repoRoot) {
  const jsonPath = join(
    repoRoot,
    "pages/preview/docs/src/data/search-synonyms.json"
  );
  if (!existsSync(jsonPath)) return { components: {}, termIndex: {} };

  try {
    return JSON.parse(readFileSync(jsonPath, "utf-8"));
  } catch {
    return { components: {}, termIndex: {} };
  }
}

// ---------------------------------------------------------------------------
// Showcase → component mapping (match by class prefix in HTML)
// ---------------------------------------------------------------------------

function mapShowcasesToComponents(showcases, components) {
  const map = new Map();

  for (const showcase of showcases) {
    const html = showcase.html || "";
    const slug = showcase.slug.toLowerCase();
    const scored = [];

    for (const comp of components) {
      const prefixes = comp.classPrefixes || [];
      let prefixHits = 0;
      for (const p of prefixes) {
        let pos = 0;
        while ((pos = html.indexOf(p, pos)) !== -1) {
          prefixHits++;
          pos += p.length;
        }
      }
      if (prefixHits === 0) continue;

      const id = comp.id.toLowerCase();
      const slugMatch =
        slug === id || slug.startsWith(id + "-") || slug.startsWith(id + "_")
          ? 100
          : slug.includes(id)
            ? 80
            : 0;

      scored.push({ compId: comp.id, score: slugMatch + prefixHits * 3 });
    }

    if (scored.length === 0) continue;
    scored.sort((a, b) => b.score - a.score);
    const top = scored[0].score;

    for (const s of scored) {
      if (s.score >= 80 || s.score >= top * 0.8) {
        if (!map.has(s.compId)) map.set(s.compId, []);
        map.get(s.compId).push(showcase);
      }
    }
  }

  return map;
}

// ---------------------------------------------------------------------------
// Extract clean component HTML from showcase canvas
// ---------------------------------------------------------------------------

export function extractCanvasHtml(showcaseHtml) {
  const match = showcaseHtml.match(
    /<div class="ds-showcase__canvas[^"]*">\s*\n?([\s\S]*?)\n?\s*<\/div>\s*<\/article>/
  );
  if (!match) return showcaseHtml;

  let html = match[1];

  html = html.replace(/<svg[\s\S]*?<\/svg>/g, "<!-- icon -->");

  html = html.replace(
    /(<span class="ds-(?:matrix|state-demo)__(?:colhead|rowhead|label)">[^<]*<\/span>\s*){3,}/g,
    (m) => {
      const items = [...m.matchAll(/>([^<]+)</g)].map((x) => x[1].trim());
      const tag = m.match(/<span class="([^"]+)"/)?.[1] || "span";
      return `<!-- ${items.join(" | ")} -->\n`;
    }
  );

  html = html
    .split("\n")
    .map((l) => l.replace(/^ {0,8}/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return html;
}

// ---------------------------------------------------------------------------
// Component guidelines (hardcoded from ButtonGuidelines.tsx / ButtonMenuGuidelines.tsx)
// ---------------------------------------------------------------------------

function buildGuidelines() {
  return {
    button: [
      {
        rule: "Choose the right variant for the action's weight",
        do: "Pair one primary button with secondary buttons so the main action stands out.",
        dont: "Don't use two primary buttons side by side. Competing emphasis confuses priority.",
      },
      {
        rule: "Write labels that describe the outcome",
        do: 'Use verb-led labels that name the action and its object: "Verify business", "Download report".',
        dont: 'Don\'t use vague labels like "Submit" or "Click here".',
      },
      {
        rule: "Use danger buttons only for destructive actions",
        do: "Reserve danger for irreversible actions. Pair with a cancel option.",
        dont: "Don't use danger styling for non-destructive actions. It creates false urgency.",
      },
      {
        rule: "Match button size to its context",
        do: "Use small buttons in tight spaces (table rows, cards) and medium for standard actions.",
        dont: "Don't use large buttons with short, vague labels.",
      },
      {
        rule: "Show loading state for async actions",
        do: "Show a spinner and disable the button during async operations to prevent double-clicks.",
        dont: "Don't leave the button in its default state during processing. Users will click again.",
      },
      {
        rule: "Use icons to reinforce meaning, not decorate",
        do: "Use a leading icon when it adds recognition to a well-known action.",
        dont: "Don't stack multiple icons on a single button. It clutters the label.",
      },
    ],
    "button-menu": [
      {
        rule: "Label the trigger with a clear noun or action",
        do: 'Name the trigger after the category it reveals: "Actions", "Export options".',
        dont: 'Don\'t label the trigger "More" or "Menu" without context.',
      },
      {
        rule: "Write specific menu items",
        do: 'Make each item a verb + object: "Download PDF", "Copy link".',
        dont: 'Don\'t use single-word items like "PDF" or "Link".',
      },
      {
        rule: "Separate destructive actions visually",
        do: "Place destructive items at the bottom with a divider and use danger styling.",
        dont: "Don't mix destructive and safe actions without visual separation.",
      },
    ],
  };
}
