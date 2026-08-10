# Trulioo Labs Design System

## What this is

CSS component library and design tokens for the Trulioo Design System (TDS / ADS 2026). This repo is the **code-side** companion to the Figma design system file (`aMXWPoPQ94hxTKOhUngOih`). It ships CSS, tokens, and HTML preview pages — no JS framework, no build step.

This is a **separate project** from the Unified KYB Experience (Next.js app at `~/unified-kyb-experience`). Do not modify or reference files in that project from here.

## Local folder (canonical)

Use **`~/trulioo-labs-ds`** as the single local clone for all work in this repo. Open that path in Cursor; do not maintain a second checkout under another folder name.

| Context | Name |
|--------|------|
| Local clone | `~/trulioo-labs-ds` |
| GitHub remote | `ZoeyChun/trulioo-labs-design-system` |
| GitHub Pages URLs | `zoeychun.github.io/trulioo-labs-design-system/...` (remote repo name — unchanged) |

When pulling or pushing, the remote is still `trulioo-labs-design-system`; only the **local directory** is standardized as `trulioo-labs-ds`.

## Repo owner

This repo is owned by Zoey (ZoeyChun). Mandeep is a collaborator. Do not take destructive actions that could jeopardize the repo.

## Structure

```
Components/         — One folder per public component (Carbon-style)
  _shared/          — Shared atoms (field-label, caret, tag, …) — one file each
  text-input/       — Composite entry CSS @imports from _shared/
  tabs/tab-item/    — Nested sub-parts imported by parent
tokens/             — Design tokens (CSS custom properties) + fonts
pages/              — HTML demo/preview pages (GitHub Pages)
assets/             — Logos, flag icons, brand assets
scripts/            — Build/utility scripts (build-preview.mjs, check-component-duplicates.py)
```

### Components organization

- **Shared atoms** live only in `Components/_shared/{name}/{name}.css`
- **Public components** get one subfolder each: `Components/{name}/{name}.css`
- **Sub-parts** nest under their parent: `Components/tabs/tab-item/`, `Components/side-nav/nav-item/`
- Composites pull shared styles via `@import` at the top of their entry CSS — no duplicate atom files
- Preview page links component CSS via `node scripts/build-preview.mjs` (does not inline component styles)

## Figma connection

- Figma file: `aMXWPoPQ94hxTKOhUngOih` (ZoeyChun/trulioo-labs-design-system)
- Components here mirror Figma component names with `tds-` prefix
- Token variables in `tokens/tokens.css` map to Figma variable collections

## How components are exported

Components are authored in the KYB project (`~/unified-kyb-experience/src/lib/components/`) and exported here via:
```bash
cd ~/unified-kyb-experience && node scripts/export-preview-to-labs-ds.mjs
```

## Commands

No CSS build step — static CSS and HTML. Preview locally by opening HTML files, or via GitHub Pages.

```bash
node scripts/build-shared-atoms-bundle.mjs  # Rebuild pages/shared/tds-shared-atoms.css
node scripts/build-preview.mjs              # Rebuild pages/preview/index.html link tags
python3 scripts/check-component-duplicates.py  # Verify no duplicate atom CSS
```

GitHub Pages: `.nojekyll` at repo root ensures `Components/_shared/` is published (Jekyll skips `_` folders by default).

Page demos (BV, DV, preview) link `pages/shared/tds-shared-atoms.css` so shared atom styles load even when nested CSS `@import` is blocked in a preview iframe.
