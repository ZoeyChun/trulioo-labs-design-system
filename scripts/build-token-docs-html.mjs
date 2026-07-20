#!/usr/bin/env node
/**
 * Generate token documentation HTML for pages/preview/index.html
 * Mirrors Figma Tokens page (node 84:418).
 *
 * Run: node scripts/build-token-docs-html.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const TOKENS_CSS = path.join(ROOT, "tokens/tokens.css");
const PREVIEW = path.join(ROOT, "pages/preview/index.html");

const USAGE = {
  "--text-default": "Main text color for headings, paragraphs, and data values",
  "--text-description": "Supporting text for secondary details and helper text",
  "--text-caption": "Smallest text for timestamps, units, and metadata",
  "--text-placeholder": "Field labels, category headers, and input placeholder text",
  "--text-inverse": "Text on dark or colored backgrounds",
  "--text-disabled": "Text in disabled or inactive states",
  "--text-link": "Hyperlink and link text color",
  "--text-negative": "Error messages and destructive status text",
  "--text-intermediate": "Warning and pending status text",
  "--text-positive": "Success and verified status text",
  "--surface-neutral-01": "Primary page and card backgrounds",
  "--surface-neutral-02": "Subtle section backgrounds and table stripes",
  "--surface-neutral-03": "Secondary containers and grouped panels",
  "--surface-neutral-04": "Tertiary surfaces and inset areas",
  "--surface-disabled": "Disabled input and control backgrounds",
  "--surface-hover": "Hover state for list rows and menu items",
  "--surface-selected": "Selected rows, tabs, and filter chips",
  "--surface-overlay": "Modal and drawer backdrop scrim",
  "--surface-inverse": "Dark toolbars, inverse headers, and footers",
  "--surface-negative": "Error alert and validation message backgrounds",
  "--surface-intermediate": "Warning alert backgrounds",
  "--surface-positive": "Success alert and verified state backgrounds",
  "--border-subtle": "Default borders on cards, inputs, and dividers",
  "--border-strong": "Emphasized borders on inputs and data cells",
  "--border-interactive": "Interactive control outlines and selected borders",
  "--border-divider": "Section dividers and list separators",
  "--border-disabled": "Disabled control borders",
  "--border-focus": "Focus rings on interactive elements",
  "--border-selected": "Selected item borders",
  "--border-negative": "Error state borders",
  "--border-intermediate": "Warning state borders",
  "--border-positive": "Success state borders",
  "--interactive-default": "Primary button and link fill",
  "--interactive-hover": "Primary button hover fill",
  "--interactive-active": "Primary button pressed fill",
  "--interactive-subtle": "Subtle interactive backgrounds and chips",
  "--interactive-disabled": "Disabled interactive control fill",
  "--icon-default": "Default icon color on light surfaces",
  "--icon-muted": "Secondary icons in toolbars and metadata",
  "--icon-faint": "Decorative and low-emphasis icons",
  "--icon-disabled": "Icons in disabled states",
  "--icon-inverse": "Icons on dark or colored backgrounds",
  "--icon-interactive": "Interactive icon buttons and links",
  "--icon-negative": "Error and destructive action icons",
  "--icon-intermediate": "Warning status icons",
  "--icon-positive": "Success and verified status icons",
  "--icon-ai": "AI and Labs feature accent icons",
  "--ai-accent": "AI feature accent color",
  "--ai-surface": "AI panel and badge backgrounds",
  "--ai-badge": "AI badge fill",
  "--ai-hover": "AI interactive hover background",
  "--elevation-xs": "Subtle lift — toggles, chips, inline cards",
  "--elevation-sm": "Default cards, dropdowns, popovers",
  "--elevation-md": "Hover cards, raised panels, tooltips",
  "--elevation-lg": "Drawers, sidebars, floating action buttons",
  "--elevation-xl": "Modals and elevated dialogs",
  "--elevation-2xl": "Maximum elevation for overlays",
};

const SECTION_ORDER = [
  "Core colors",
  "Color tokens",
  "Typography tokens",
  "Spacing & radius tokens",
  "Elevation tokens",
];

const GROUP_LABELS = {
  teal: "Teal",
  violet: "Violet",
  neutral: "Neutral",
  status: "Status",
  text: "Text",
  surface: "Surface",
  border: "Border",
  interactive: "Interactive",
  icon: "Icon",
  ai: "AI",
  padding: "Padding",
  gap: "Gap",
  margin: "Margin",
  typography: "Typography",
  elevation: "Elevation",
  shadows: "Component shadows",
};

function parseTokens(css) {
  const rootMatch = css.match(/:root\s*\{([\s\S]*)\n\}/);
  if (!rootMatch) throw new Error("Could not parse :root from tokens.css");
  const lines = rootMatch[1].split("\n");

  const sections = [];
  let current = null;

  function ensureSection(title, group = null) {
    let section = sections.find((s) => s.title === title);
    if (!section) {
      section = { title, group, items: [] };
      sections.push(section);
    }
    current = section;
    if (group !== null) current.group = group;
    return section;
  }

  function handleSectionLabel(label) {
    if (/^CORE \/ COLOR$/i.test(label)) {
      ensureSection("Core colors");
      return true;
    }
    if (/^SEMANTIC \/ COLOR$/i.test(label)) {
      ensureSection("Color tokens");
      return true;
    }
    if (/^CORE \/ SPACING$/i.test(label)) {
      ensureSection("Spacing & radius tokens", "core-spacing");
      return true;
    }
    if (/^SEMANTIC \/ SPACING$/i.test(label)) {
      ensureSection("Spacing & radius tokens");
      return true;
    }
    if (/^CORE \/ RADIUS$/i.test(label) || /^SEMANTIC \/ RADIUS$/i.test(label)) {
      ensureSection("Spacing & radius tokens");
      return true;
    }
    if (/^ELEVATION$/i.test(label)) {
      ensureSection("Elevation tokens");
      return true;
    }
    if (/^COMPONENT SHADOWS/i.test(label)) {
      if (current) current.group = "shadows";
      return true;
    }
    if (/^TYPOGRAPHY$/i.test(label)) {
      ensureSection("Typography tokens");
      return true;
    }
    const groupKey = label.toLowerCase();
    if (GROUP_LABELS[groupKey] && current) {
      current.group = groupKey;
      return true;
    }
    return false;
  }

  function pushItem(name, rawValue, inlineComment = "") {
    if (!current) ensureSection("Core colors");
    current.items.push({
      name,
      value: rawValue.trim(),
      comment: inlineComment.trim(),
      group: current.group,
    });
  }

  let pending = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (handleSectionLabel(trimmed)) continue;

    const sectionComment = line.match(/^\s*\/\*\s*([^*]+?)\s*\*\/\s*$/);
    if (sectionComment && !line.includes("--")) {
      handleSectionLabel(sectionComment[1].trim());
      continue;
    }

    if (pending) {
      pending.value += ` ${trimmed}`;
      if (trimmed.includes(";")) {
        const semi = pending.value.indexOf(";");
        const valuePart = pending.value.slice(0, semi).trim();
        const after = pending.value.slice(semi + 1);
        const commentMatch = after.match(/\/\*\s*(.+?)\s*\*\//);
        pushItem(pending.name, valuePart, commentMatch?.[1] ?? "");
        pending = null;
      }
      continue;
    }

    const decl = line.match(/^\s*(--[a-z0-9-]+):\s*(.*)$/i);
    if (!decl) continue;

    const [, name, rest] = decl;
    if (!rest.includes(";")) {
      pending = { name, value: rest.trim() };
      continue;
    }

    const semi = rest.indexOf(";");
    const valuePart = rest.slice(0, semi).trim();
    const after = rest.slice(semi + 1);
    const commentMatch = after.match(/\/\*\s*(.+?)\s*\*\//);
    pushItem(name, valuePart, commentMatch?.[1] ?? "");
  }

  return sections;
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function figmaTokenName(cssVar) {
  return cssVar.replace(/^--/, "").replace(/-/g, "/");
}

function isColorValue(value) {
  return /^#|^rgba?\(|^var\(--color-/.test(value);
}

function isColorToken(name) {
  return (
    name.startsWith("--color-") ||
    name.startsWith("--text-") ||
    name.startsWith("--surface-") ||
    name.startsWith("--border-") ||
    name.startsWith("--interactive-") ||
    name.startsWith("--icon-") ||
    name.startsWith("--ai-")
  );
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSwatch(name, value) {
  return `<span class="ds-token-swatch" style="background: var(${name})" aria-hidden="true"></span>`;
}

function renderColorRow(item) {
  const usage = USAGE[item.name] ?? (item.comment.replace(/^#.*$/, "").trim() || "Semantic color token");
  const alias = item.value.startsWith("var(")
    ? `→ ${item.value.replace(/^var\(--color-([^)]+)\).*/, "$1").replace(/-/g, "/")}`
    : item.comment.startsWith("#")
      ? item.comment
      : "";

  return `<div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">${escapeHtml(figmaTokenName(item.name))}</span>
    ${alias ? `<span class="ds-token-row__alias">${escapeHtml(alias)}</span>` : ""}
  </div>
  <div class="ds-token-row__usage">${escapeHtml(usage)}</div>
  <div class="ds-token-row__preview">
    ${renderSwatch(item.name, item.value)}
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">${escapeHtml(item.comment || item.value)}</span>
      <code class="ds-token-row__var">var(${item.name})</code>
    </div>
  </div>
</div>`;
}

function renderSimpleRow(item, previewHtml = "") {
  const usage = USAGE[item.name] ?? (item.comment || "Design token");
  return `<div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">${escapeHtml(figmaTokenName(item.name))}</span>
    <code class="ds-token-row__var">var(${item.name})</code>
  </div>
  <div class="ds-token-row__usage">${escapeHtml(item.value)}</div>
  <div class="ds-token-row__preview">${previewHtml || `<span class="ds-token-row__meta">${escapeHtml(usage)}</span>`}</div>
</div>`;
}

function renderElevationRow(item) {
  const usage = USAGE[item.name] ?? "Elevation shadow";
  const preview = `<span class="ds-token-elevation-preview" style="box-shadow: var(${item.name})"></span>`;
  return `<div class="ds-token-row ds-token-row--elevation">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">${escapeHtml(figmaTokenName(item.name))}</span>
    <code class="ds-token-row__var">var(${item.name})</code>
  </div>
  <div class="ds-token-row__usage">${escapeHtml(usage)}</div>
  <div class="ds-token-row__preview">${preview}</div>
</div>`;
}

function renderCoreColorRow(item) {
  return `<div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">${escapeHtml(figmaTokenName(item.name))}</span>
    <code class="ds-token-row__var">var(${item.name})</code>
  </div>
  <div class="ds-token-row__usage">${escapeHtml(item.comment || item.value)}</div>
  <div class="ds-token-row__preview">
    ${renderSwatch(item.name, item.value)}
    <span class="ds-token-row__hex">${escapeHtml(item.comment || item.value)}</span>
  </div>
</div>`;
}

function renderSection(section) {
  const groups = new Map();
  for (const item of section.items) {
    const key = item.group || "_default";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  const isColorSection = section.title === "Color tokens" || section.title === "Core colors";
  const isElevation = section.title === "Elevation tokens";

  let rowsHtml = "";
  for (const [group, items] of groups) {
    if (group !== "_default" && group !== "core-spacing" && group !== "shadows") {
      const label = GROUP_LABELS[group] || group;
      rowsHtml += `<div class="ds-token-group-label">${escapeHtml(label)}</div>`;
    }
    if (group === "shadows") {
      rowsHtml += `<div class="ds-token-group-label">Component shadows</div>`;
    }

    for (const item of items) {
      if (section.title === "Core colors") rowsHtml += renderCoreColorRow(item);
      else if (isColorSection && isColorToken(item.name)) rowsHtml += renderColorRow(item);
      else if (isElevation && item.name.startsWith("--elevation-")) rowsHtml += renderElevationRow(item);
      else if (item.name.startsWith("--radius-")) {
        rowsHtml += renderSimpleRow(
          item,
          `<span class="ds-token-radius-preview" style="border-radius: var(${item.name})"></span>`
        );
      } else if (item.name.startsWith("--spacing-") || item.name.startsWith("--padding-") || item.name.startsWith("--gap-") || item.name.startsWith("--margin-")) {
        rowsHtml += renderSimpleRow(
          item,
          `<span class="ds-token-spacing-preview" style="width: var(${item.name})"></span>`
        );
      } else rowsHtml += renderSimpleRow(item);
    }
  }

  const desc =
    section.title === "Core colors"
      ? "Raw color palette for the Trulioo design system. These are the foundational primitives — use semantic tokens in production."
      : section.title === "Color tokens"
        ? "Semantic color variables for the Trulioo design system. All tokens alias Core primitives and are scoped for specific use cases."
        : section.title === "Typography tokens"
          ? "Font families, sizes, weights, and line heights used across the system."
          : section.title === "Spacing & radius tokens"
            ? "Spacing and border radius variables for consistent layout. Core tokens define raw values; semantic tokens alias them for specific use cases."
            : "Box shadow tokens for elevation and depth.";

  const tableHead =
    section.title === "Core colors"
      ? `<div class="ds-token-table__head"><span>Token</span><span>Hex</span><span>Preview</span></div>`
      : isElevation
        ? `<div class="ds-token-table__head ds-token-table__head--4"><span>Token</span><span>Usage</span><span>Preview</span></div>`
        : isColorSection && section.title !== "Core colors"
          ? `<div class="ds-token-table__head ds-token-table__head--color"><span>Token</span><span>Usage</span><span>Light mode</span></div>`
          : `<div class="ds-token-table__head ds-token-table__head--3"><span>Token</span><span>Value</span><span>Notes</span></div>`;

  return `<article class="ds-showcase" id="token-doc-${slug(section.title)}">
  <div class="ds-showcase__head">
    <h3 class="ds-showcase__title">${escapeHtml(section.title)}</h3>
    <p class="ds-showcase__desc">${escapeHtml(desc)}</p>
    <div class="ds-showcase__meta">
      <code class="ds-api">tokens/tokens.css</code>
      <a class="ds-token-figma-link" href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026?node-id=84-418" target="_blank" rel="noopener noreferrer">View in Figma</a>
    </div>
  </div>
  <div class="ds-showcase__canvas ds-showcase__canvas--flush ds-showcase__canvas--token-doc">
    <div class="ds-token-table">
      ${tableHead}
      ${rowsHtml}
    </div>
  </div>
</article>`;
}

function renderSubTabNav(sections) {
  return `<nav class="ds-token-tabs" role="tablist" aria-label="Token categories">
${sections
  .map((section, index) => {
    const id = slug(section.title);
    const active = index === 0;
    return `    <button type="button" class="ds-token-tabs__btn${active ? " is-active" : ""}" role="tab" id="token-tab-${id}" data-token-tab="${id}" aria-selected="${active ? "true" : "false"}" aria-controls="token-panel-${id}" tabindex="${active ? "0" : "-1"}">${escapeHtml(section.title)}</button>`;
  })
  .join("\n")}
  </nav>`;
}

function renderTokenPanel(section, index) {
  const id = slug(section.title);
  const active = index === 0;
  return `<div class="ds-token-panel${active ? " is-active" : ""}" id="token-panel-${id}" role="tabpanel" aria-labelledby="token-tab-${id}"${active ? "" : " hidden"}>
${renderSection(section)}
</div>`;
}

function buildSectionHtml() {
  const parsed = parseTokens(fs.readFileSync(TOKENS_CSS, "utf8"));
  const sections = SECTION_ORDER.map((title) => parsed.find((s) => s.title === title)).filter(Boolean);
  const subTabNav = renderSubTabNav(sections);
  const panels = sections.map(renderTokenPanel).join("\n\n");

  return `<section class="ds-chapter ds-tab-panel" id="tokens" role="tabpanel" aria-labelledby="tab-tokens" hidden>
  <header class="ds-chapter__header">
    <h2 class="ds-chapter__title">Design tokens</h2>
    <p class="ds-chapter__desc">Reference documentation for color, typography, spacing, radius, and elevation tokens. Source of truth: <code>tokens/tokens.css</code> and Figma ADS 2026.</p>
    <div class="ds-token-doc-meta">
      <span><strong>Contributors:</strong> Zoey, Ecem, Mandeep</span>
      <span><strong>Last updated:</strong> 2026-06-30</span>
    </div>
  </header>

${subTabNav}

  <div class="ds-token-panels">
${panels}
  </div>
</section>`;
}

function patchPreview(html, sectionHtml) {
  const start = "<!-- TOKEN_DOCS_START -->";
  const end = "<!-- TOKEN_DOCS_END -->";
  if (html.includes(start) && html.includes(end)) {
    return html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}\n${sectionHtml}\n${end}`);
  }
  throw new Error("TOKEN_DOCS markers not found in preview index.html");
}

const sectionHtml = buildSectionHtml();
let preview = fs.readFileSync(PREVIEW, "utf8");
preview = patchPreview(preview, sectionHtml);
fs.writeFileSync(PREVIEW, preview);
console.log("Updated token docs section in pages/preview/index.html");
