# Portal 2026 — working agreement

Shared shell and TruAI panel for the 2026 portal pages, built from Figma
[`Portal-2.0-Design---2026`](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/).

Split so two people can work at once: one on page content, one on the AI panel.

```
pages/shared/portal-shell/
├── shell.css        THE CONTRACT — layout, panel slot, open/closed state
├── ai-panel.css     RIGHT  — AI chat panel        prefix: ai-
├── ai-toggle.js     RIGHT  — open/close behaviour
└── assets/          orb, logo mark, ask arrow, env dot

pages/home/
├── index.html       section banners mark the left/right boundary
└── css/page.css     LEFT   — home content         prefix: v2-

pages/verify-business/
├── index.html
└── css/page.css     LEFT   — this page's content  prefix: vb-
```

Each page links three stylesheets, **in this order** — the cascade depends on it:

```html
<link rel="stylesheet" href="../shared/portal-shell/shell.css">
<link rel="stylesheet" href="css/page.css">
<link rel="stylesheet" href="../shared/portal-shell/ai-panel.css">
```

Do not merge them behind an `@import`: nested imports can be blocked inside
preview iframes (see repo CLAUDE.md).

## Who owns what

| Area | Files | Prefix |
|---|---|---|
| **Shared contract** | `shell.css` | `v2-` |
| **Right — AI panel** | `ai-panel.css`, `ai-toggle.js` | `ai-` |
| **Left — page** | each page's `css/page.css` | `v2-` (home), `vb-` (verify-business) |

A selector's prefix tells you who owns it. Editing an `ai-` rule from a page
file, or a page rule from `ai-panel.css`, means it is in the wrong place.

## The contract

`shell.css` is the only place the two halves meet. It promises:

| Promise | Meaning |
|---|---|
| `.v2-shell[data-truai="open" \| "closed"]` | State attribute. Both sides read it; only `ai-toggle.js` writes it. |
| `.v2-stage` | Positioning context. Reserves room for the panel with padding and recentres the column when closed. |
| `.v2-content` | The left column's box. Width is decided here, not by its contents. |
| `.v2-panel-slot` | A fixed `--v2-panel-w` box pinned right, absolutely positioned — it never participates in layout. |
| `--v2-panel-w` / `--v2-panel-total` | The slot's width. Changing it moves both sides: contract change. |
| `@keyframes v2-rise / fade / slide / bloom / halo / grow` | Shared entrance motion. Per-element delays live with the element. |

**Neither side may restyle `.v2-stage`, `.v2-panel-slot`, or the `[data-truai]`
rules.** Those are a contract change — agree first.

Note the direction of the dependency: `shell.css` never names an `ai-` class.
It sets state and geometry; `ai-panel.css` decides how the panel reacts. The AI
side can change its internals without touching shared code.

## Rules of thumb

**Left side** — everything inside `<main class="v2-content">`. Never assume a
pixel width; the column is sized by the shell and changes when the panel opens
or closes. Do not reference `.ai-*` or `[data-truai]`.

**Right side** — everything inside `.v2-panel-slot` or `.ai-askbar`. Fill the
slot, never exceed it, manage your own internal scroll. Do not reference
`.v2-content` or page widgets.

**Both** — motion lives in the file that owns the element it animates; only
keyframes are shared. Every animation needs a `prefers-reduced-motion` branch
in the same file.

## Two traps worth knowing

**Animation vs transition.** An animation with `fill-mode: both` keeps applying
its final keyframe forever, and animations outrank transitions in the cascade.
The panel's entrance therefore sits on `.v2-panel-slot`, not `.ai-panel` — when
it was on the panel it pinned `opacity: 1` and the open/close fade silently
never ran. Keep entrance and state on different elements.

**`prefers-reduced-motion` blocks.** If a reset rule escapes its `@media`
wrapper it applies to everyone and kills the animation for all users. Indented
code can look nested when it isn't. Verify with a brace-depth check, not by eye.

## Linking between pages

Use the explicit file name, not a directory:

```html
<a href="../verify-business/index.html">     <!-- works on file:// and http:// -->
<a href="../verify-business/">               <!-- file:// shows a folder listing -->
```

These pages are opened directly from disk as often as they are served, so a
trailing-slash link is a broken link half the time.

## Known gaps

- `Access risk` is spelled that way in Figma node 1015:92403; the earlier node
  said `Assess risk`. Probably a typo — left as-is pending a decision.
- "Verify a person" and "Access risk" cards on the home page have no
  destination yet and point at `#`.
- The TruAI orb is a Figma WebGPU shader. It cannot run in a static page, so
  `assets/truai-orb.png` is the node rendered at its natural 132px. There is no
  `@2x` — Figma will not upscale past the node's own size.
- The traffic hero's 10% texture layer is the shader's mesh rebuilt as stacked
  radial gradients, not the shader itself.
- Some hero text sits one token darker than the node specifies, to clear WCAG AA
  on the pale gradient. Marked at each occurrence in the home's `page.css`.
- `.v2-content` hides its scrollbar. Scrolling works; the visual cue that there
  is more below the fold does not.
- `verify-business/assets/map.png` is 410 kB straight from Figma — compress it
  before this goes anywhere real.
- Search, tabs, Export and Bulk Upload on verify-business are presentational
  only.
