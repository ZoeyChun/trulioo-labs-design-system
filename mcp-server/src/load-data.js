import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// ── Public API ──────────────────────────────────────────────

export function loadDesignSystem(repoRoot) {
  return repoRoot ? loadFromRepo(repoRoot) : loadFromBundle();
}

export function extractCanvasHtml(rawHtml) {
  const open = rawHtml.indexOf('<div class="ds-showcase__canvas');
  if (open === -1) return rawHtml;
  const gt = rawHtml.indexOf(">", open);
  const close = rawHtml.lastIndexOf("</div>");
  if (gt === -1 || close === -1) return rawHtml;
  let inner = rawHtml.slice(gt + 1, close).trim();
  inner = inner.replace(/<svg[\s\S]*?<\/svg>/g, "<!-- icon -->");
  inner = compressMatrixHeaders(inner);
  return inner;
}

// ── Bundle mode ─────────────────────────────────────────────

function loadFromBundle() {
  const bundlePath = new URL("../dist/tds-data.json", import.meta.url);
  if (!existsSync(bundlePath)) {
    throw new Error(
      "Bundled data not found. Run `npm run bundle` from the repo first."
    );
  }
  return JSON.parse(readFileSync(bundlePath, "utf-8"));
}

// ── Repo mode ───────────────────────────────────────────────

function loadFromRepo(repoRoot) {
  const tokens = loadTokens(repoRoot);
  const components = loadComponents(repoRoot);
  const showcases = loadShowcases(repoRoot);
  const synonyms = loadSynonyms(repoRoot);
  const guidelines = buildGuidelines();

  mapShowcasesToComponents(showcases, components);

  return { tokens, components, showcases, synonyms, guidelines };
}

// ── Tokens ──────────────────────────────────────────────────

function loadTokens(repoRoot) {
  const css = readFileSync(join(repoRoot, "tokens/tokens.css"), "utf-8");
  const tokens = [];
  let currentTier = "CORE";
  let currentSubcategory = "";

  for (const line of css.split("\n")) {
    const tierMatch = line.match(/(CORE|SEMANTIC)\s*\/\s*(\w+)/i);
    if (tierMatch) {
      currentTier = tierMatch[1].toUpperCase();
      currentSubcategory = tierMatch[2].toLowerCase();
      continue;
    }

    const sectionMatch = line.match(
      /(?:CORE|SEMANTIC)\s*\/\s*(SPACING|RADIUS|ELEVATION|TYPOGRAPHY)/i
    );
    if (sectionMatch) {
      currentSubcategory = sectionMatch[1].toLowerCase();
      continue;
    }

    const subMatch = line.match(
      /^\s*\/\*\s*(Teal|Violet|Neutral|Status|Text|Surface|Border|Interactive|Icon|AI|Padding|Gap|Margin|Font size|Line height|Font weight|Tab-specific|Overlay|Component)\b/i
    );
    if (subMatch) {
      currentSubcategory = subMatch[1].toLowerCase().replace(/\s+/g, "-");
      continue;
    }

    if (line.match(/SEMANTIC\s*\/\s*SPACING/i)) {
      currentTier = "SEMANTIC";
      currentSubcategory = "spacing";
      continue;
    }
    if (line.match(/SEMANTIC\s*\/\s*RADIUS/i)) {
      currentTier = "SEMANTIC";
      currentSubcategory = "radius";
      continue;
    }
    if (line.match(/ELEVATION/i) && line.match(/^\s*\/\*/)) {
      currentSubcategory = "elevation";
      continue;
    }
    if (line.match(/TYPOGRAPHY/i) && line.match(/^\s*\/\*/)) {
      currentSubcategory = "typography";
      continue;
    }

    const propMatch = line.match(
      /^\s*--([\w-]+)\s*:\s*(.+?)\s*;?\s*(?:\/\*\s*(.*?)\s*\*\/)?\s*$/
    );
    if (propMatch) {
      const [, name, value, comment] = propMatch;
      const category = categorizeToken(name, currentSubcategory);
      tokens.push({
        name: `--${name}`,
        value: value.trim(),
        comment: comment || "",
        tier: currentTier,
        category,
      });
    }
  }

  return tokens;
}

function categorizeToken(name, subcat) {
  if (name.startsWith("color-") || name === "color-white") return "colors";
  if (
    name.startsWith("text-") ||
    name.startsWith("surface-") ||
    name.startsWith("border-") ||
    name.startsWith("interactive-") ||
    name.startsWith("icon-") ||
    name.startsWith("ai-")
  )
    return "colors";
  if (
    name.startsWith("spacing-") ||
    name.startsWith("padding-") ||
    name.startsWith("gap-") ||
    name.startsWith("margin-")
  )
    return "spacing";
  if (name.startsWith("radius-")) return "radius";
  if (name.startsWith("elevation-") || name.startsWith("shadow-") || name.startsWith("overlay-"))
    return "elevation";
  if (
    name.startsWith("font-") ||
    name.startsWith("line-height-") ||
    name.startsWith("text-tab-")
  )
    return "typography";
  if (subcat) return subcat;
  return "other";
}

// ── Components ──────────────────────────────────────────────

function loadComponents(repoRoot) {
  const docsPath = join(
    repoRoot,
    "pages/preview/docs/src/data/component-tracker.json"
  );
  const reactPath = join(repoRoot, "src/data/component-tracker.json");
  const trackerPath = existsSync(docsPath)
    ? docsPath
    : existsSync(reactPath)
      ? reactPath
      : null;

  if (!trackerPath) return [];

  const data = JSON.parse(readFileSync(trackerPath, "utf-8"));
  return (data.components || []).map((c) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    classPrefixes: c.classPrefixes || [],
    cssStatus: c.cssStatus || "Unknown",
    cssFile: c.cssFile || "",
    css: loadComponentCss(repoRoot, c.cssFile),
    notes: c.notes || "",
    figmaVariants: c.figmaVariants || 0,
    subComponents: c.subComponents || "",
    showcases: [],
  }));
}

// ── Component CSS ───────────────────────────────────────────

function loadComponentCss(repoRoot, cssFile) {
  if (!cssFile) return "";
  const filePath = join(repoRoot, "Components", cssFile);
  if (!existsSync(filePath)) return "";
  let css = readFileSync(filePath, "utf-8");
  css = css.replace(/@import\s+['"][^'"]+['"];?\s*/g, "");
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  css = css.replace(/\n{3,}/g, "\n\n").trim();
  return css;
}

// ── Showcases ───────────────────────────────────────────────

function loadShowcases(repoRoot) {
  const filePath = join(
    repoRoot,
    "pages/preview/docs/src/data/showcases.ts"
  );
  if (!existsSync(filePath)) return [];

  const content = readFileSync(filePath, "utf-8");
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
    if (content[i] === "]") depth--;
    if (depth === 0) {
      arrayEnd = i + 1;
      break;
    }
  }
  if (arrayEnd === -1) return [];

  try {
    return JSON.parse(content.slice(arrayStart, arrayEnd));
  } catch {
    return [];
  }
}

// ── Synonyms ────────────────────────────────────────────────

function loadSynonyms(repoRoot) {
  const filePath = join(
    repoRoot,
    "pages/preview/docs/src/data/search-synonyms.json"
  );
  if (!existsSync(filePath)) return { components: {}, termIndex: {} };
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

// ── Showcase → Component mapping ────────────────────────────

function mapShowcasesToComponents(showcases, components) {
  for (const showcase of showcases) {
    const scores = [];

    for (const comp of components) {
      let score = 0;

      if (comp.id === showcase.slug) score += 100;
      else if (showcase.slug.startsWith(comp.id)) score += 100;
      else if (showcase.slug.includes(comp.id)) score += 80;

      for (const prefix of comp.classPrefixes) {
        const re = new RegExp(escapeRegex(prefix), "g");
        const matches = showcase.html.match(re);
        if (matches) score += matches.length * 3;
      }

      if (score > 0) scores.push({ comp, score });
    }

    if (scores.length === 0) continue;
    scores.sort((a, b) => b.score - a.score);
    const topScore = scores[0].score;
    const threshold = Math.max(80, topScore * 0.8);

    for (const { comp, score } of scores) {
      if (score >= threshold) {
        comp.showcases.push(showcase);
      }
    }
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ── Guidelines ──────────────────────────────────────────────

function buildGuidelines() {
  return {
    button: [
      { type: "do", text: "Pair one primary button with secondary buttons so the main action stands out." },
      { type: "dont", text: "Don't use two primary buttons side by side. Competing emphasis confuses priority." },
      { type: "do", text: "Use verb-led labels that name the action and its object (e.g. 'Verify business')." },
      { type: "dont", text: "Don't use vague labels like 'Submit' or 'Click here'." },
      { type: "do", text: "Reserve danger variant for irreversible actions. Pair with a cancel option." },
      { type: "dont", text: "Don't use danger styling for non-destructive actions." },
      { type: "do", text: "Show a spinner and disable the button during async operations." },
      { type: "dont", text: "Don't leave the button in its default state during processing." },
    ],
    "button-menu": [
      { type: "do", text: "Group related actions in a ButtonMenu when space is limited." },
      { type: "dont", text: "Don't put the primary action inside a menu. Keep it visible." },
      { type: "do", text: "Order items by frequency of use, most common first." },
    ],
    "text-input": [
      { type: "do", text: "Always pair a TextInput with a FieldLabel." },
      { type: "dont", text: "Don't use placeholder text as the only label." },
      { type: "do", text: "Show validation errors inline below the field with FieldValidation." },
    ],
    select: [
      { type: "do", text: "Use Select for 5+ options. Use RadioGroup for 2-4 options." },
      { type: "dont", text: "Don't use Select for binary choices. Use Switch or Checkbox instead." },
    ],
    dialog: [
      { type: "do", text: "Focus the primary action button when a dialog opens." },
      { type: "dont", text: "Don't nest dialogs inside dialogs." },
      { type: "do", text: "Always provide a way to dismiss the dialog (close button or cancel)." },
    ],
    announcement: [
      { type: "do", text: "Use the matching variant for the message severity (success/warning/error/info)." },
      { type: "dont", text: "Don't stack multiple announcements of the same type." },
    ],
  };
}

// ── HTML helpers ─────────────────────────────────────────────

function compressMatrixHeaders(html) {
  let count = 0;
  return html.replace(
    /<span class="ds-matrix__corner"><\/span>[\s\S]*?(?=<span class="ds-matrix__rowhead">)/g,
    (match) => {
      count++;
      return count > 1 ? "<!-- matrix headers repeated -->\n" : match;
    }
  );
}
