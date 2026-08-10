# Docs preview migration

Experimental Salesforce-style documentation UI at `pages/preview/docs/`. The main component preview at `pages/preview/react/` keeps the original flat navigation.

## Navigation structure

| Section | Pages |
|---------|-------|
| **Getting Started** | Overview, Component Tracker, Migration Guide |
| **Foundations** | Typography, Design Tokens |
| **Components** (A–Z) | Buttons, Controls, Data, Disclosure, Inputs, Navigation, Tags |

## URLs

| Format | Example |
|--------|---------|
| Docs home | `/` |
| Section page | `#/components/buttons` |
| Legacy redirect | `#buttons` → `#/components/buttons` |

## Run locally

```bash
cd pages/preview/docs && npm install && npm run dev
```

Opens at **http://localhost:5175/**

## Build

```bash
cd pages/preview/docs && npm run build
```

Output: `pages/preview/docs-dist/`

GitHub Pages entry: `pages/preview/index-docs.html` → `docs-dist/index.html`

## Main preview vs docs

| | Main preview | Docs preview |
|--|--------------|--------------|
| Path | `pages/preview/react/` | `pages/preview/docs/` |
| Port | 5174 | 5175 |
| Output | `react-dist/` | `docs-dist/` |
| Nav | Flat tabs | 3-section tree + search |
| Extract script | `extract-preview-react.mjs` | `extract-docs-react.mjs` |
