# Changelog

## 1.1.2 — Add README for npm

### Added
- **Comprehensive README** — setup guides for Claude Desktop, Claude Code, Cursor, Windsurf, and any MCP client
- Usage examples, feature overview, and key rules reference

## 1.1.0 — Enforce design system compliance

Addresses the first real-world audit (score: 35/100 — dark theme, hardcoded colors, no tds-* classes).

### Added
- **Light theme enforcement** — explicit rule: TDS has no dark mode, page backgrounds must use `--surface-neutral-01` or `--surface-neutral-02`
- **Actual token values in system prompt** — all semantic tokens with resolved hex values embedded directly, so AI uses `var(--token)` instead of guessing
- **Component CSS in tool responses** — `get_component` now returns the real CSS file for each component, with instruction to embed in `<style>`
- **Card composition pattern** — sanctioned card layout from tokens (white bg, `--border-subtle`, `--radius-card`, `--elevation-sm`) since TDS has no generic card component
- **Self-check validation checklist** — 10-point checklist AI must verify before returning HTML (light bg, no hardcoded hex, tds-* classes, form labels, etc.)
- **6 new smoke tests** for v1.1 features (29 total)

### Changed
- System prompt rewritten from guidelines to mandatory numbered rules (RULE 1–10)
- `load-data.js` now reads and strips component CSS files (removes comments and @imports)
- Bundle size: 975 KB → 1.1 MB (includes component CSS)

## 1.0.0 — Initial release

### Added
- 3 MCP resources: system prompt, component catalog, token reference (Markdown, always-on context)
- 3 MCP tools: `get_component`, `search_components`, `get_tokens` (JSON responses)
- 1 MCP prompt: `build_ui` (structured requirements template)
- Dual-mode loading: live repo files or bundled `dist/tds-data.json`
- Synonym-aware search (50 component mappings, term index)
- Showcase-to-component mapping with scoring algorithm
- HTML cleanup: SVG replacement, matrix header compression, 6 showcase cap
- 23 smoke tests using MCP SDK Client
- `npx @trulioodesign/tds-mcp` zero-dependency installation
