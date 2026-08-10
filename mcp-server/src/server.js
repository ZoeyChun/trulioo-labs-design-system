#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { existsSync } from "node:fs";
import { loadDesignSystem, extractCanvasHtml } from "./load-data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const REPO_ROOT = process.env.TDS_REPO_ROOT
  || (existsSync(resolve(__dirname, "..", "..", "tokens", "tokens.css"))
    ? resolve(__dirname, "..", "..")
    : null);

const ds = loadDesignSystem(REPO_ROOT);

const server = new McpServer({
  name: "trulioo-design-system",
  version: "1.0.0",
});

// ============================================================================
// RESOURCES — loaded into AI context for baseline awareness
// ============================================================================

server.resource(
  "system-prompt",
  "tds://system-prompt",
  { description: "Design system rules, token usage, component patterns, and content guidelines" },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/markdown",
        text: buildSystemPrompt(),
      },
    ],
  })
);

server.resource(
  "component-catalog",
  "tds://components/catalog",
  { description: "All 50 TDS components organized by category with class prefixes" },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/markdown",
        text: buildComponentCatalog(),
      },
    ],
  })
);

server.resource(
  "token-reference",
  "tds://tokens/reference",
  { description: "All 177 design tokens organized by category — colors, spacing, typography, elevation, radius" },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/markdown",
        text: buildTokenReference(),
      },
    ],
  })
);

// ============================================================================
// TOOLS — on-demand detailed lookups
// ============================================================================

server.tool(
  "get_component",
  "Get full details for a TDS component: HTML examples, CSS classes, variants, states, and usage guidelines. Always call this before generating HTML for a component.",
  { component_id: z.string().describe("Component ID in kebab-case (e.g. 'button', 'text-input', 'select', 'data-table'). Use search_components first if unsure of the exact ID.") },
  async ({ component_id }) => {
    const comp = ds.components.find((c) => c.id === component_id);
    if (!comp) {
      const suggestions = fuzzyMatch(component_id, ds);
      const hint = suggestions.length
        ? `\n\nDid you mean: ${suggestions.map((s) => s.id).join(", ")}?`
        : "\n\nUse search_components to find available components.";
      return {
        content: [
          { type: "text", text: `Component "${component_id}" not found.${hint}` },
        ],
      };
    }
    return {
      content: [{ type: "text", text: formatComponentDetails(comp) }],
    };
  }
);

server.tool(
  "search_components",
  "Search for TDS components by name, category, or use case. Supports natural language queries like 'dropdown', 'form field', 'navigation', 'table'.",
  { query: z.string().describe("Search query — component name, category, or use case description") },
  async ({ query }) => {
    const results = searchComponents(query);
    if (results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No components match "${query}". Try broader terms like "form", "navigation", "data", "control".`,
          },
        ],
      };
    }
    return {
      content: [{ type: "text", text: formatSearchResults(results) }],
    };
  }
);

server.tool(
  "get_tokens",
  "Get design tokens by category. Returns token names, values, and usage guidance.",
  {
    category: z
      .enum([
        "colors",
        "spacing",
        "typography",
        "elevation",
        "radius",
        "all",
      ])
      .describe("Token category to retrieve"),
  },
  async ({ category }) => {
    return {
      content: [{ type: "text", text: formatTokensByCategory(category) }],
    };
  }
);

// ============================================================================
// PROMPTS — reusable prompt templates
// ============================================================================

server.prompt(
  "build_ui",
  "Build a UI using the Trulioo Design System. Describe what you want and this prompt ensures TDS components and tokens are used correctly.",
  { description: z.string().describe("Describe the UI you want to build") },
  ({ description }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: [
            "Build the following UI using the Trulioo Design System (TDS).",
            "",
            "Requirements:",
            "1. Use ONLY TDS components (tds-* classes) — no custom components",
            "2. Use ONLY semantic design tokens — no hardcoded colors, spacing, or font sizes",
            "3. Follow TDS content guidelines: sentence case, verb-led button labels, preferred vocabulary",
            "4. Include proper accessibility attributes (aria-label, role, etc.)",
            "5. Call get_component for each component you use to get the correct HTML structure",
            "",
            `## What to build\n\n${description}`,
          ].join("\n"),
        },
      },
    ],
  })
);

// ============================================================================
// Formatting helpers
// ============================================================================

function buildSystemPrompt() {
  return `# Trulioo Design System (TDS) — AI Companion

You are building Trulioo product UI. Every component, color, spacing value, and typographic style MUST come from the Trulioo Design System. Never invent custom styles or hardcode values.

## How to work with this MCP

1. **\`search_components\`** — find the right component for your use case (supports natural language: "dropdown", "toggle", "form field")
2. **\`get_component\`** — get the exact HTML structure, CSS classes, variants, and states for a component. **Always call this before writing HTML for a component.**
3. **\`get_tokens\`** — look up spacing, color, typography, or radius values

## Rules

### Tokens — NEVER hardcode values
- ✅ \`var(--text-default)\` · ✅ \`var(--padding-md)\` · ✅ \`var(--radius-card)\`
- ❌ \`#172d2d\` · ❌ \`16px\` · ❌ \`8px\`
- Use **semantic tokens** (--text-*, --surface-*, --border-*, --interactive-*, --padding-*, --gap-*)
- Never use **core tokens** directly (--color-teal-60, --spacing-16) — they're for token definitions only

### Components — use exact HTML structure
- All classes start with \`tds-\` (e.g. \`tds-btn\`, \`tds-text-input\`)
- Pattern: \`tds-{name}\` (base) + \`tds-{name}--{variant}\` (modifier) + \`tds-{name}--{size}\` (size)
- Sub-elements: \`tds-{name}__{part}\` (e.g. \`tds-btn__counter\`, \`tds-text-input__input\`)
- Call \`get_component\` to see the exact markup — don't guess the HTML structure

### Content — write like Trulioo
- Sentence case for all labels and headings: "Verify identity" not "Verify Identity"
- Button labels: lead with a verb + object: "Save changes", "Download report", "Verify business"
- No trailing periods on button labels or menu items
- Preferred terms: Verify (not Validate), Business (not Client), Document (not Doc)
- Use numerals for counts and steps: "Step 2 of 4", "3 results"
- Spell out acronyms on first use in standalone help text

### Accessibility
- Every interactive element must be keyboard-accessible
- Icon-only buttons need \`aria-label\`
- Decorative icons get \`aria-hidden="true"\`
- Form fields need associated \`<label>\` elements
- Loading buttons get \`aria-busy="true"\`
- Use semantic HTML (\`<button>\`, \`<nav>\`, \`<table>\`) not div-based replacements

### Page boilerplate

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title</title>
  <link rel="stylesheet" href="tokens/tokens.css" />
  <link rel="stylesheet" href="tokens/fonts.css" />
  <link rel="stylesheet" href="pages/shared/tds-shared-atoms.css" />
  <!-- Add component CSS files as needed -->
  <link rel="stylesheet" href="Components/button/button.css" />
</head>
<body>
  <!-- TDS components here -->
</body>
</html>
\`\`\`

### Form field pattern (most common)

\`\`\`html
<div class="tds-text-input">
  <label class="tds-field-label" for="field-id">Label</label>
  <input class="tds-text-input__input" id="field-id" type="text" placeholder="Placeholder" />
  <span class="tds-field-caption">Optional helper text</span>
</div>
\`\`\`

### Composition rules
- One primary button per view — use secondary/invisible for other actions
- Form fields stack vertically with \`var(--gap-md)\` between them
- Use \`var(--padding-lg)\` or \`var(--padding-xl)\` for page/section padding
- Cards use \`var(--radius-card)\` and \`var(--elevation-sm)\`
- Modals use \`var(--radius-modal)\` and \`var(--elevation-xl)\`
`;
}

function buildComponentCatalog() {
  const byCategory = new Map();
  for (const c of ds.components) {
    const cat = c.category || "Other";
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push(c);
  }

  let md = "# TDS Component Catalog\n\n";
  md += `${ds.components.length} components across ${byCategory.size} categories.\n\n`;

  for (const [cat, comps] of byCategory) {
    md += `## ${cat}\n\n`;
    md += "| Component | ID | Class Prefix | CSS | Notes |\n";
    md += "|-----------|-----|-------------|-----|-------|\n";
    for (const c of comps) {
      const prefix = (c.classPrefixes || []).join(", ") || "—";
      const css = c.cssStatus || "—";
      const notes = (c.notes || "").slice(0, 80);
      md += `| ${c.name} | \`${c.id}\` | \`${prefix}\` | ${css} | ${notes} |\n`;
    }
    md += "\n";
  }

  return md;
}

function buildTokenReference() {
  const byCategory = new Map();
  for (const t of ds.tokens) {
    const key = `${t.tier}/${t.category}`;
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key).push(t);
  }

  let md = "# TDS Design Tokens\n\n";
  md += `${ds.tokens.length} tokens. **Always use semantic tokens in components — never core tokens directly.**\n\n`;

  for (const [key, tokens] of byCategory) {
    const [tier, category] = key.split("/");
    md += `## ${tier === "semantic" ? "✅ Semantic" : "🚫 Core"} — ${category || "General"}\n\n`;
    if (tier === "core") {
      md += "_Don't use these directly. They're referenced by semantic tokens._\n\n";
    }

    let lastSub = "";
    for (const t of tokens) {
      if (t.subcategory && t.subcategory !== lastSub) {
        md += `\n### ${t.subcategory}\n`;
        lastSub = t.subcategory;
      }
      const resolved = t.resolvedValue ? ` → ${t.resolvedValue}` : "";
      md += `- \`${t.name}\`: \`${t.value}\`${resolved}\n`;
    }
    md += "\n";
  }

  return md;
}

function formatComponentDetails(comp) {
  const showcases = ds.showcaseMap.get(comp.id) || [];
  const guidelines = ds.guidelines[comp.id] || [];

  let md = `# ${comp.name}\n\n`;
  md += `**Category**: ${comp.category}\n`;
  md += `**CSS Prefix**: \`${(comp.classPrefixes || []).join("`, `")}\`\n`;
  md += `**CSS Status**: ${comp.cssStatus || "—"}\n`;

  if (comp.figmaVariants) {
    md += `**Figma Variants**: ${comp.figmaVariants}\n`;
  }
  if (comp.subComponents) {
    md += `**Sub-components**: ${comp.subComponents}\n`;
  }
  if (comp.cssFile) {
    md += `**CSS File**: \`Components/${comp.cssFile}\`\n`;
  }
  if (comp.notes) {
    md += `\n> ${comp.notes}\n`;
  }

  const maxShowcases = 6;
  if (showcases.length > 0) {
    const shown = showcases.slice(0, maxShowcases);
    md += "\n## HTML Examples\n\n";
    for (const s of shown) {
      md += `### ${s.title}\n\n`;
      if (s.desc) md += `${s.desc}\n\n`;
      if (s.api) md += `**CSS API**: \`${s.api}\`\n\n`;
      const cleanHtml = extractCanvasHtml(s.html);
      md += "```html\n" + cleanHtml + "\n```\n\n";
    }
    if (showcases.length > maxShowcases) {
      md += `_${showcases.length - maxShowcases} more examples available._\n\n`;
    }
  }

  if (guidelines.length > 0) {
    md += "## Usage Guidelines\n\n";
    for (const g of guidelines) {
      md += `### ${g.rule}\n`;
      md += `✅ **Do**: ${g.do}\n`;
      md += `❌ **Don't**: ${g.dont}\n\n`;
    }
  }

  return md;
}

function searchComponents(query) {
  const q = query.toLowerCase().trim();
  const scored = [];

  for (const comp of ds.components) {
    let score = 0;

    if (comp.id === q) score += 100;
    if (comp.name.toLowerCase() === q) score += 95;
    if (comp.id.includes(q)) score += 70;
    if (comp.name.toLowerCase().includes(q)) score += 65;

    const cat = (comp.category || "").toLowerCase();
    if (cat.includes(q)) score += 50;

    const notes = (comp.notes || "").toLowerCase();
    if (notes.includes(q)) score += 30;

    const prefixes = (comp.classPrefixes || []).map((p) => p.toLowerCase());
    if (prefixes.some((p) => p.includes(q))) score += 60;

    const subs = (comp.subComponents || "").toLowerCase();
    if (subs.includes(q)) score += 25;

    const synonyms = ds.synonyms.components?.[comp.id] || [];
    for (const syn of synonyms) {
      if (syn.toLowerCase().includes(q) || q.includes(syn.toLowerCase())) {
        score += 75;
        break;
      }
    }

    if (score > 0) scored.push({ ...comp, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 10);
}

function fuzzyMatch(query, dsys) {
  const q = query.toLowerCase();
  return dsys.components
    .filter((c) => {
      const id = c.id.toLowerCase();
      if (id.includes(q) || q.includes(id)) return true;
      const synonyms = dsys.synonyms.components?.[c.id] || [];
      return synonyms.some((s) => s.toLowerCase().includes(q));
    })
    .slice(0, 5);
}

function formatSearchResults(results) {
  let md = `# Search Results (${results.length} matches)\n\n`;
  md += "| Component | ID | Category | Class Prefix | Score |\n";
  md += "|-----------|-----|----------|-------------|-------|\n";
  for (const r of results) {
    const prefix = (r.classPrefixes || []).join(", ") || "—";
    md += `| ${r.name} | \`${r.id}\` | ${r.category} | \`${prefix}\` | ${r.score} |\n`;
  }
  md += "\n_Call `get_component` with the component ID for full details and HTML examples._\n";
  return md;
}

function formatTokensByCategory(category) {
  const TOKEN_CATEGORIES = {
    colors: ["color", "text", "surface", "border", "interactive", "icon", "ai"],
    spacing: ["spacing", "padding", "gap", "margin"],
    typography: ["font", "line-height"],
    elevation: ["elevation", "shadow", "overlay"],
    radius: ["radius"],
  };

  let filtered;
  if (category === "all") {
    filtered = ds.tokens;
  } else {
    const keys = TOKEN_CATEGORIES[category] || [];
    filtered = ds.tokens.filter((t) => {
      const name = t.name.toLowerCase();
      return keys.some((k) => name.includes(k));
    });
  }

  if (filtered.length === 0) {
    return `No tokens found for category "${category}".`;
  }

  let md = `# ${category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)} Tokens\n\n`;
  md += `${filtered.length} tokens.\n\n`;

  const semanticTokens = filtered.filter((t) => t.tier === "semantic");
  const coreTokens = filtered.filter((t) => t.tier === "core");

  if (semanticTokens.length > 0) {
    md += "## ✅ Semantic tokens (use these)\n\n";
    let lastSub = "";
    for (const t of semanticTokens) {
      if (t.subcategory && t.subcategory !== lastSub) {
        md += `\n### ${t.subcategory}\n`;
        lastSub = t.subcategory;
      }
      const resolved = t.resolvedValue ? ` → ${t.resolvedValue}` : "";
      md += `- \`${t.name}\`: \`${t.value}\`${resolved}\n`;
    }
    md += "\n";
  }

  if (coreTokens.length > 0) {
    md += "## 🚫 Core tokens (don't use directly)\n\n";
    md += "_These are referenced by semantic tokens. Use semantic tokens instead._\n\n";
    let lastSub = "";
    for (const t of coreTokens) {
      if (t.subcategory && t.subcategory !== lastSub) {
        md += `\n### ${t.subcategory}\n`;
        lastSub = t.subcategory;
      }
      md += `- \`${t.name}\`: \`${t.value}\`\n`;
    }
  }

  return md;
}

// ============================================================================
// Start
// ============================================================================

const transport = new StdioServerTransport();
await server.connect(transport);
