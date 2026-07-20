import fs from "node:fs";
import path from "node:path";

/** Infer primary BEM block classes from a CSS file. */
export function inferClassPrefixes(cssPath) {
  if (!fs.existsSync(cssPath)) return [];

  const text = fs.readFileSync(cssPath, "utf8");
  const roots = new Set();

  for (const match of text.matchAll(/^\.(tds-[a-z0-9-]+)\s*[,{\[]/gm)) {
    roots.add(match[1]);
  }

  for (const match of text.matchAll(/^\.(score-gauge)\b/gm)) {
    roots.add(match[1]);
  }

  const blocks = [...roots].filter((r) => !r.includes("__") && !r.includes("--"));
  blocks.sort((a, b) => a.length - b.length || a.localeCompare(b));
  return blocks;
}

/** Manual overrides where CSS block names differ from tracker ids. */
export const PREFIX_OVERRIDES = {
  button: ["tds-btn"],
  "icon-button": ["tds-icon-btn"],
  "dismiss-action": ["tds-dismiss"],
  "dismiss-issue-badge": ["tds-dismiss-badge"],
  "counter-label": ["tds-counter"],
  "flag-icon": ["fi", "tds-select__country-flag"],
  "score-gauge": ["score-gauge"],
  "nav-item": ["tds-side-nav__nav-item"],
  "nav-list": ["tds-nav-list"],
  select: ["tds-select", "tds-combobox"],
  "filter-tabs": ["tds-filter-tab", "tds-filter-tabs"],
  "filter-tabs-item": ["tds-filter-tab", "tds-filter-tabs"],
  "font-awesome-icon": [],
};

export function prefixesForComponent(id, cssFile, componentsRoot) {
  if (PREFIX_OVERRIDES[id]) return PREFIX_OVERRIDES[id];

  if (!cssFile || cssFile === "—" || cssFile === "-") return [];

  const cssPath = path.join(componentsRoot, cssFile);
  const inferred = inferClassPrefixes(cssPath);
  if (inferred.length) return inferred;

  const folder = cssFile.split("/")[0];
  const fallback = path.join(componentsRoot, folder, `${folder}.css`);
  return inferClassPrefixes(fallback);
}

export function toKebabId(name) {
  return name
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toCamelId(name) {
  const base = name.replace(/[^a-zA-Z0-9\s]/g, " ").trim();
  const parts = base.split(/\s+/).filter(Boolean);
  if (!parts.length) return toKebabId(name);
  return parts
    .map((part, index) => {
      const lower = part.toLowerCase();
      return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("")
    .replace(/^./, (c) => c.toLowerCase());
}
