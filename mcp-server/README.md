# @trulioodesign/tds-mcp

MCP server for the **Trulioo Design System (TDS)** — gives AI tools like Claude, Cursor, and Windsurf direct access to TDS components, tokens, and guidelines so they generate UI that follows the design system.

## What this does

When you connect this MCP server to an AI tool, it teaches the AI:

- **52 components** with real HTML examples and CSS classes (`tds-btn`, `tds-text-input`, `tds-select`, ...)
- **185 design tokens** — colors, spacing, typography, elevation, radius
- **10 mandatory rules** — light theme, semantic tokens only, `tds-*` classes, accessibility
- **Usage guidelines** — do/don't pairs for buttons, inputs, dialogs, and more
- **Synonym search** — say "dropdown" and it finds `Select`, say "toggle" and it finds `Switch`

The AI generates HTML that uses real TDS classes and token variables instead of inventing its own styles.

---

## Quick setup

### Claude Desktop

Add to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "trulioo-design-system": {
      "command": "npx",
      "args": ["-y", "@trulioodesign/tds-mcp"]
    }
  }
}
```

Restart Claude Desktop. You'll see the TDS tools appear in the MCP tools menu.

### Claude Code (CLI)

```bash
claude mcp add trulioo-design-system -- npx -y @trulioodesign/tds-mcp
```

### Cursor

Open **Settings > MCP Servers** and add:

```json
{
  "trulioo-design-system": {
    "command": "npx",
    "args": ["-y", "@trulioodesign/tds-mcp"]
  }
}
```

### Windsurf

Add to your Windsurf MCP config:

```json
{
  "mcpServers": {
    "trulioo-design-system": {
      "command": "npx",
      "args": ["-y", "@trulioodesign/tds-mcp"]
    }
  }
}
```

### Any MCP-compatible client

The server communicates over **stdio** using the [Model Context Protocol](https://modelcontextprotocol.io). Run it with:

```bash
npx -y @trulioodesign/tds-mcp
```

---

## What's included

### Resources (always-on context)

These are loaded automatically when the AI connects:

| Resource | URI | Description |
|----------|-----|-------------|
| System prompt | `tds://system-prompt` | 10 mandatory rules + all semantic token values with hex codes |
| Component catalog | `tds://components/catalog` | Full list of 52 components with CSS classes and status |
| Token reference | `tds://tokens/reference` | All semantic tokens organized by category |

### Tools (on-demand)

The AI calls these when it needs specific information:

| Tool | Description |
|------|-------------|
| `get_component` | Returns HTML examples, actual CSS, class names, and guidelines for a component |
| `search_components` | Synonym-aware search — "dropdown" finds Select, "toggle" finds Switch |
| `get_tokens` | Get tokens by category: `colors`, `spacing`, `typography`, `elevation`, `radius`, or `all` |

### Prompts

| Prompt | Description |
|--------|-------------|
| `build_ui` | Structured template for scaffolding a page — pass requirements and optional component list |

---

## Usage examples

Once connected, just ask the AI to build UI naturally:

> "Build a KYC verification form with name, date of birth, and address fields"

> "Create a data table showing business search results with status tags"

> "Design a settings page with tabs for Profile, Security, and Notifications"

The AI will automatically use the TDS MCP to:
1. Look up the right components (`get_component`)
2. Get the correct tokens (`get_tokens`)
3. Generate HTML with `tds-*` classes, semantic tokens, and embedded CSS

### Using the `build_ui` prompt

In Claude Desktop, click the **prompt icon** and select `build_ui`:

- **requirements**: "A verification results page showing person match score, document status, and address validation"
- **components** (optional): "score-gauge, data-table, tag, announcement"

---

## Key design rules enforced

The MCP enforces these rules through its system prompt:

1. **Light theme only** — TDS has no dark mode. Page backgrounds use `--surface-neutral-01` or `--surface-neutral-02`
2. **Semantic tokens only** — never hardcoded hex colors, never core tokens
3. **`tds-*` classes** — never invented class names like `.card` or `.btn`
4. **Embedded CSS** — component CSS included via `<style>` blocks
5. **Form structure** — every field gets a `tds-field-label`
6. **Card pattern** — cards built from tokens (white bg, subtle border, card radius)
7. **Typography** — Inter for body, Tobias for display headings
8. **Content** — sentence case, verb-first button labels
9. **Accessibility** — ARIA labels, form associations, keyboard support
10. **Self-check** — 10-point validation checklist before returning HTML

---

## Version check

```bash
npx @trulioodesign/tds-mcp --version
```

## Requirements

- Node.js 18 or later

## Changelog

See [CHANGELOG.md](https://github.com/ZoeyChun/trulioo-labs-design-system/blob/main/mcp-server/CHANGELOG.md) for version history.

---

Built by the Trulioo Design System team.
