#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadDesignSystem, extractCanvasHtml } from "./load-data.js";

// ── Version ─────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"));
const VERSION = pkg.version;

if (process.argv.includes("--version") || process.argv.includes("-v")) {
  console.log(`@trulioodesign/tds-mcp v${VERSION}`);
  process.exit(0);
}

// ── Mode detection ──────────────────────────────────────────
const repoRoot = existsSync(join(__dirname, "../../tokens/tokens.css"))
  ? join(__dirname, "../..")
  : null;

const ds = loadDesignSystem(repoRoot);
const mode = repoRoot ? "repo" : "bundled";

// ── Server setup ────────────────────────────────────────────

const server = new McpServer({
  name: "tds-mcp",
  version: VERSION,
});

// ── Resources (Markdown — always-on context) ────────────────

server.resource("system-prompt", "tds://system-prompt", async () => ({
  contents: [{ uri: "tds://system-prompt", text: buildSystemPrompt(), mimeType: "text/markdown" }],
}));

server.resource("component-catalog", "tds://components/catalog", async () => ({
  contents: [{ uri: "tds://components/catalog", text: buildComponentCatalog(), mimeType: "text/markdown" }],
}));

server.resource("token-reference", "tds://tokens/reference", async () => ({
  contents: [{ uri: "tds://tokens/reference", text: buildTokenReference(), mimeType: "text/markdown" }],
}));

// ── Tools (JSON — on-demand, structured) ────────────────────

server.tool(
  "get_component",
  "Get HTML examples, CSS classes, and usage guidelines for a TDS component",
  { component_id: z.string().describe("Component slug, e.g. 'button', 'text-input', 'select'") },
  async ({ component_id }) => {
    const result = formatComponentDetails(component_id);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "search_components",
  "Search TDS components by name, synonym, or natural language (e.g. 'dropdown', 'toggle', 'form')",
  { query: z.string().describe("Search term — can be a component name, synonym, or description") },
  async ({ query }) => {
    const result = formatSearchResults(query);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get_tokens",
  "Get design tokens (CSS custom properties) by category",
  {
    category: z
      .enum(["colors", "spacing", "typography", "elevation", "radius", "all"])
      .describe("Token category to retrieve"),
  },
  async ({ category }) => {
    const result = formatTokensByCategory(category);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ── Prompt ───────────────────────────────────────────────────

server.prompt(
  "build_ui",
  "Scaffold a UI page using TDS components and tokens",
  [
    { name: "requirements", description: "What the page should do", required: true },
    { name: "components", description: "Comma-separated component names to use", required: false },
  ],
  ({ requirements, components }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: [
            "Build a UI using the Trulioo Design System (TDS).",
            "",
            `Requirements: ${requirements}`,
            components ? `Components to use: ${components}` : "",
            "",
            "Rules:",
            "- Use only tds-* CSS classes from this design system",
            "- Use only semantic tokens (--text-*, --surface-*, --border-*, --padding-*, --gap-*, --margin-*, --radius-button/card/modal/section/badge)",
            "- Never use core tokens (--color-*, --spacing-*, --radius-xs/sm/md/lg/xl) directly",
            "- Follow BEM-like class naming: .tds-{component}--{variant}",
            "- Use Inter font family (var(--font-family))",
            "- Include proper ARIA attributes",
            "- Use sentence case for all UI text",
            "- Start button labels with a verb",
          ]
            .filter(Boolean)
            .join("\n"),
        },
      },
    ],
  })
);

// ── Resource builders ───────────────────────────────────────

function buildSystemPrompt() {
  const semanticTokens = ds.tokens.filter((t) => t.tier === "SEMANTIC");
  const tokenBlock = semanticTokens
    .map((t) => `  ${t.name}: ${t.value};${t.comment ? " /* " + t.comment + " */" : ""}`)
    .join("\n");

  return `# Trulioo Design System (TDS) — Mandatory Rules

You MUST follow every rule below when building UI. Non-compliance is a bug.

## RULE 1: Light theme only — NO dark backgrounds
TDS has NO dark theme. You MUST use light backgrounds:
- Page background: \`var(--surface-neutral-01)\` (#ffffff) or \`var(--surface-neutral-02)\` (#f4f6f4)
- Card background: \`var(--surface-neutral-01)\` (#ffffff)
- Section background: \`var(--surface-neutral-02)\` (#f4f6f4) or \`var(--surface-neutral-03)\` (#e8ede8)
- \`--surface-inverse\` (#172d2d) is for tiny accent areas ONLY (e.g., a tooltip), NEVER for page/section backgrounds
- **NEVER** use dark backgrounds (#0B1F1F, #1a1a1a, #111, etc.) — they break every color token

## RULE 2: Use ONLY semantic tokens — NEVER core tokens or hardcoded values
**NEVER** write hardcoded hex colors (#004c45, #ffffff, etc.) — use the var() reference.
**NEVER** use core tokens (--color-*, --spacing-2/4/8/…, --radius-xs/sm/md/lg).
**ONLY** use these semantic tokens:

\`\`\`css
:root {
${tokenBlock}
}
\`\`\`

## RULE 3: Use tds-* CSS classes — NEVER invent class names
Every component MUST use the exact \`tds-*\` class names from this design system.
- Buttons: \`tds-btn tds-btn--{sm|md|lg} tds-btn--{primary|secondary|danger|invisible}\`
- Text input: \`tds-text-input\` with \`tds-text-input__field\`
- Select: \`tds-select\` with \`tds-select__trigger\`
- Checkbox: \`tds-checkbox\`
- Switch: \`tds-switch\`
- Dialog: \`tds-dialog\` with \`tds-dialog__header\`, \`tds-dialog__body\`, \`tds-dialog__footer\`
- Tabs: \`tds-tabs\` with \`tds-tab-item\`
- Data table: \`tds-data-table\`
- Announcement: \`tds-announcement\`
- Accordion: \`tds-accordion\`
- Tag: \`tds-tag\`
- Spinner: \`tds-spinner tds-spinner--{xs|sm|md|lg|xl}\`

**NEVER** use generic classes like \`.card\`, \`.btn\`, \`.container\`, \`.header\`. Always \`tds-*\`.

## RULE 4: Include the actual component CSS in a <style> block
Since TDS CSS files cannot be linked from a CDN, you MUST embed the component styles.
Use \`get_component\` to retrieve the CSS for each component you use, then include it in a \`<style>\` tag.
Also include the token definitions from RULE 2 in your \`<style>\` block.

## RULE 5: Form field structure
Every form field MUST follow this pattern:
\`\`\`html
<div class="tds-text-input">
  <label class="tds-field-label">Field name</label>
  <input class="tds-text-input__field" type="text" />
  <span class="tds-field-caption">Optional helper text</span>
</div>
\`\`\`
On error, add \`tds-text-input--error\` to the wrapper and include:
\`\`\`html
<span class="tds-field-validation">Error message here</span>
\`\`\`

## RULE 6: Card composition pattern
TDS has no generic "card" component. Build cards from tokens:
\`\`\`css
.tds-custom-card {
  background: var(--surface-neutral-01);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: var(--padding-xl);
  box-shadow: var(--elevation-sm);
}
.tds-custom-card:hover {
  box-shadow: var(--elevation-md);
  border-color: var(--border-strong);
}
\`\`\`
Cards MUST have a white/light background, subtle border, and card radius. Never dark cards.

## RULE 7: Typography
- Primary: Inter — \`font-family: var(--font-family)\`
- Display headings: Tobias — \`font-family: var(--font-family-display)\`
- Utility classes (include these in your CSS):
  - Body: \`.text-body-{xs|sm|md|lg}\`
  - Labels: \`.text-label-{sm|md|lg}\`, \`.text-label-sm-uppercase\`
  - Headings: \`.text-heading-{xs|sm|md|lg|xl|2xl|3xl}\`
  - Display: \`.text-display-{sm|md|lg|xl|2xl|3xl}\` (uses Tobias)
- Text colors: \`var(--text-default)\` for body, \`var(--text-description)\` for secondary, \`var(--text-caption)\` for muted

## RULE 8: Content guidelines
- Sentence case for ALL UI text (never Title Case except proper nouns)
- Button labels: verb-first ("Verify business", "Download report", "Add owner")
- Preferred terms: "business" (not "company"), "person" (not "individual")

## RULE 9: Accessibility
- Icon-only buttons: \`aria-label="Description"\`
- Decorative icons: \`aria-hidden="true"\`
- Loading buttons: \`aria-busy="true"\`
- Required fields: \`required\` attribute + "(required)" in label
- Form inputs: always associate with a \`<label>\`

## RULE 10: Self-check before returning
Before returning any HTML, verify ALL of these:
- [ ] Page background uses \`--surface-neutral-01\` or \`--surface-neutral-02\` (LIGHT)
- [ ] Zero hardcoded hex colors — every color uses \`var(--token-name)\`
- [ ] All component classes use \`tds-\` prefix — no invented class names
- [ ] All backgrounds use \`--surface-*\` tokens
- [ ] All text colors use \`--text-*\` tokens
- [ ] Buttons use \`tds-btn tds-btn--{size} tds-btn--{variant}\`
- [ ] Buttons have \`var(--interactive-default)\` background via the component CSS
- [ ] Form fields have \`tds-field-label\` labels
- [ ] Token definitions are included in a \`<style>\` block
- [ ] Component CSS is included (from \`get_component\` results)

If any check fails, fix it before returning.
`;
}

function buildComponentCatalog() {
  const byCategory = {};
  for (const comp of ds.components) {
    if (!byCategory[comp.category]) byCategory[comp.category] = [];
    byCategory[comp.category].push(comp);
  }

  let md = "# TDS Component Catalog\n\n";
  md += `${ds.components.length} components across ${Object.keys(byCategory).length} categories.\n`;
  md += 'Use `get_component` to get HTML examples for any component.\n\n';

  for (const [category, comps] of Object.entries(byCategory)) {
    md += `## ${category}\n\n`;
    for (const c of comps) {
      const classes = c.classPrefixes.length
        ? c.classPrefixes.map((p) => `\`.${p}\``).join(", ")
        : "(no CSS)";
      const status = c.cssStatus === "Done" ? "" : ` [${c.cssStatus}]`;
      md += `- **${c.name}** (\`${c.id}\`) — ${classes}${status}`;
      if (c.notes) md += ` — ${c.notes}`;
      md += "\n";
    }
    md += "\n";
  }
  return md;
}

function buildTokenReference() {
  const semantic = ds.tokens.filter((t) => t.tier === "SEMANTIC");
  const byCategory = {};
  for (const t of semantic) {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category].push(t);
  }

  let md = "# TDS Token Reference (Semantic Only)\n\n";
  md += `${semantic.length} semantic tokens. Use these in components — never reference core tokens directly.\n\n`;

  for (const [category, tokens] of Object.entries(byCategory)) {
    md += `## ${category}\n\n`;
    md += "| Token | Value | Notes |\n|-------|-------|-------|\n";
    for (const t of tokens) {
      md += `| \`${t.name}\` | \`${t.value}\` | ${t.comment} |\n`;
    }
    md += "\n";
  }
  return md;
}

// ── Tool formatters (JSON) ──────────────────────────────────

function formatComponentDetails(componentId) {
  const comp = ds.components.find((c) => c.id === componentId);
  if (!comp) {
    return {
      error: `Component "${componentId}" not found`,
      available: ds.components.map((c) => c.id),
    };
  }

  const showcases = comp.showcases.slice(0, 6).map((s) => ({
    title: s.title,
    description: s.desc,
    api: s.api,
    html: extractCanvasHtml(s.html),
  }));

  const guidelines = ds.guidelines[componentId] || [];

  return {
    component: {
      id: comp.id,
      name: comp.name,
      category: comp.category,
      cssClasses: comp.classPrefixes,
      cssStatus: comp.cssStatus,
      figmaVariants: comp.figmaVariants,
      notes: comp.notes,
      subComponents: comp.subComponents || null,
    },
    css: comp.css || null,
    cssInstruction: comp.css
      ? "Include this CSS in a <style> block in your HTML. This is the actual TDS component CSS — do not modify it or write your own."
      : "No CSS available for this component. Use the tds-* class names listed above and build styles from semantic tokens.",
    examples: showcases,
    guidelines: guidelines.map((g) => ({ type: g.type, text: g.text })),
    totalShowcases: comp.showcases.length,
  };
}

function formatSearchResults(query) {
  const matches = searchComponents(query);

  return {
    query,
    resultCount: matches.length,
    results: matches.map((m) => ({
      id: m.id,
      name: m.name,
      category: m.category,
      cssClasses: m.classPrefixes,
      matchReason: m.matchReason,
      exampleCount: m.showcases.length,
    })),
    hint:
      matches.length > 0
        ? `Use get_component with id "${matches[0].id}" for HTML examples`
        : "Try a different search term or check the component catalog resource",
  };
}

function formatTokensByCategory(category) {
  const filtered =
    category === "all"
      ? ds.tokens
      : ds.tokens.filter((t) => t.category === category);

  const semantic = filtered.filter((t) => t.tier === "SEMANTIC");
  const core = filtered.filter((t) => t.tier === "CORE");

  return {
    category,
    semanticTokens: semantic.map((t) => ({
      name: t.name,
      value: t.value,
      resolvedComment: t.comment,
    })),
    coreTokens: core.map((t) => ({
      name: t.name,
      value: t.value,
      comment: t.comment,
    })),
    rule: "Use semantic tokens in components. Core tokens are for reference only — never use them directly.",
    semanticCount: semantic.length,
    coreCount: core.length,
  };
}

// ── Search engine ───────────────────────────────────────────

function searchComponents(query) {
  const q = query.toLowerCase().trim();
  const results = [];

  const synonymMap = ds.synonyms?.components || {};
  const termIndex = ds.synonyms?.termIndex || {};

  const expandedTerms = termIndex[q] || [q];

  for (const comp of ds.components) {
    let matchReason = null;

    if (comp.id === q || comp.name.toLowerCase() === q) {
      matchReason = "exact match";
    } else if (
      comp.id.includes(q) ||
      comp.name.toLowerCase().includes(q)
    ) {
      matchReason = "name contains query";
    } else {
      const compSynonyms = synonymMap[comp.id] || [];
      for (const syn of compSynonyms) {
        if (syn.toLowerCase() === q || syn.toLowerCase().includes(q)) {
          matchReason = `synonym: "${syn}"`;
          break;
        }
      }
    }

    if (!matchReason) {
      for (const term of expandedTerms) {
        if (term === comp.id || term === comp.name.toLowerCase()) {
          matchReason = `term expansion: "${term}"`;
          break;
        }
        const compSynonyms = synonymMap[comp.id] || [];
        for (const syn of compSynonyms) {
          if (syn.toLowerCase() === term) {
            matchReason = `expanded synonym: "${syn}"`;
            break;
          }
        }
        if (matchReason) break;
      }
    }

    if (!matchReason && fuzzyMatch(q, comp.id)) {
      matchReason = "fuzzy match";
    }
    if (
      !matchReason &&
      comp.notes &&
      comp.notes.toLowerCase().includes(q)
    ) {
      matchReason = "found in notes";
    }

    if (matchReason) {
      results.push({ ...comp, matchReason });
    }
  }

  results.sort((a, b) => {
    const aExact = a.matchReason === "exact match" ? 0 : 1;
    const bExact = b.matchReason === "exact match" ? 0 : 1;
    return aExact - bExact;
  });

  return results;
}

function fuzzyMatch(query, target) {
  let qi = 0;
  for (let ti = 0; ti < target.length && qi < query.length; ti++) {
    if (query[qi] === target[ti]) qi++;
  }
  return qi === query.length && query.length >= 3;
}

// ── Start ───────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`TDS MCP server v${VERSION} running (${mode} mode)`);
