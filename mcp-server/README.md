# Trulioo Design System MCP Server

Build product UI using the Trulioo Design System from any AI tool. This MCP server gives Claude (and other AI tools) full knowledge of TDS tokens, components, and guidelines — so generated UI always uses the correct design system.

## What it does

When connected, the AI automatically knows:
- **177 design tokens** — colors, spacing, typography, radius, elevation
- **50 components** — buttons, form fields, tables, navigation, dialogs, and more
- **~100 HTML examples** — exact markup for every component variant and state
- **Content guidelines** — sentence case, verb-led labels, preferred vocabulary
- **Usage guidelines** — do/don't rules for component selection

You describe what you want in plain English. The AI builds it with correct TDS markup.

## Install

### One-liner (after npm publish)

**Claude Code:**
```bash
claude mcp add tds-mcp -- npx -y tds-mcp
```

**Claude Desktop** — add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "tds-mcp": {
      "command": "npx",
      "args": ["-y", "tds-mcp"]
    }
  }
}
```

Restart Claude Desktop after saving. That's it — no repo clone, no config.

### From source (for contributors)

```bash
git clone git@github.com:ZoeyChun/trulioo-labs-design-system.git ~/trulioo-labs-ds
cd ~/trulioo-labs-ds/mcp-server
npm install
npm run bundle   # snapshot design system data
```

Then connect:

**Claude Code:**
```bash
claude mcp add tds-mcp node ~/trulioo-labs-ds/mcp-server/src/server.js
```

**Claude Desktop:**
```json
{
  "mcpServers": {
    "tds-mcp": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/trulioo-labs-ds/mcp-server/src/server.js"]
    }
  }
}
```

When running from source inside the repo, the server reads live files (tokens, components, showcases). When installed via npx, it uses the bundled snapshot.

## How to use it

Once connected, just describe the UI you want:

> "Build me a verification form with first name, last name, country dropdown, and a submit button"

> "Create a results page with a score gauge, data fields for name and address, and a data table"

> "I need a sidebar navigation with these items: Dashboard, Verifications, Settings"

The AI will:
1. Search for the right components
2. Look up exact HTML structure and CSS classes
3. Apply correct tokens for spacing, colors, and typography
4. Follow content guidelines for labels and copy

### Available tools (the AI calls these automatically)

| Tool | What it does |
|------|-------------|
| `search_components` | Find components by name or use case — "dropdown", "toggle", "form field" |
| `get_component` | Get full HTML examples, CSS classes, variants, states, and guidelines |
| `get_tokens` | Look up spacing, color, typography, elevation, or radius tokens |

### Available resources (loaded as context)

| Resource | What it provides |
|----------|-----------------|
| System prompt | Design system rules, token usage, composition patterns |
| Component catalog | All 50 components organized by category |
| Token reference | All 177 tokens with values and usage guidance |

### Prompt template

Use the `build_ui` prompt for structured requests:

> `/prompt build_ui "A KYC form with document upload, ID type selector, and submit button"`

## Publishing updates

When the design system changes:

```bash
cd ~/trulioo-labs-ds/mcp-server
npm run bundle     # re-snapshot the data
npm version patch  # bump version
npm publish        # publish to npm
```

Users get the update on their next `npx` run (npx caches but fetches new versions periodically).

## For other AI tools (ChatGPT, Gemini, etc.)

This MCP server works natively with Claude. For other AI tools that don't support MCP, you can export the design system context as a file to upload:

_(Portable export script coming in v2)_

## Development

```bash
npm test                                                # run 16-test smoke suite
npm run bundle                                          # rebuild data snapshot
npx @modelcontextprotocol/inspector node src/server.js  # interactive inspector
```
