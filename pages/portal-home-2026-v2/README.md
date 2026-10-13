# Portal 2.0 home — working agreement

Built from Figma `Portal-2.0-Design---2026`, nodes
[1008:55680](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/?node-id=1008-55680) (open)
and [1008:75745](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/?node-id=1008-75745) (collapsed).

The page is split so two people can work on it at once without colliding.

```
index.html              shared  — section banners mark the boundary
css/01-shell.css        shared  — THE CONTRACT. change by agreement only
css/02-page.css         LEFT    — page content          prefix: v2-
css/03-truai.css        RIGHT   — AI chat panel         prefix: ai-
js/truai-toggle.js      RIGHT   — open/close behaviour
assets/                 shared
```

## Who owns what

| Area | Files | Prefix | Covers |
|---|---|---|---|
| **Left — page** | `02-page.css` | `v2-` | Side rail, workspace header, Traffic hero, action cards, Recent transactions |
| **Right — AI** | `03-truai.css`, `js/truai-toggle.js` | `ai-` | Panel, orb, wordmark, suggestions, composer, collapsed ask bar |
| **Shared** | `01-shell.css`, `index.html` | `v2-` | Layout, the panel slot, open/closed states |

A selector's prefix tells you who owns it. If you are editing an `ai-`
rule from the page side, or a `v2-` content rule from the AI side, stop —
it belongs in the other file.

## The contract

`01-shell.css` is the only place the two halves meet. It promises:

| Promise | What it means |
|---|---|
| `.v2-shell[data-truai="open" \| "closed"]` | The state attribute. Both sides read it; only the toggle script writes it. |
| `.v2-stage` | Positioning context. Reserves room for the panel with padding, and recentres the column when closed. |
| `.v2-content` | The left column's box. Its width is decided here, not by its contents. |
| `.v2-panel-slot` | A fixed `--v2-panel-w` box pinned right. Absolutely positioned, so it never participates in layout. |
| `--v2-panel-w` / `--v2-panel-total` | The slot's width. Changing it reflows both sides — contract change. |
| `@keyframes v2-rise / fade / slide / bloom / halo / grow` | Shared entrance motion. Per-element delays live with the element. |

**Neither side may restyle `.v2-stage`, `.v2-panel-slot`, or the
`[data-truai]` rules in `01-shell.css`.** If you need something there,
it is a contract change — agree on it first.

Note the direction of the dependency: shell never names an `ai-` class.
It sets state and geometry; `03-truai.css` decides how the panel reacts.
That keeps the AI side free to change its internals without touching
shared code.

## Rules of thumb

**Left side**
- Everything goes inside `<main class="v2-content">`.
- Never assume a pixel width — the column is sized by the shell and
  changes when the panel opens or closes.
- Do not reference `.ai-*` or `[data-truai]`.

**Right side**
- Everything goes inside `.v2-panel-slot` or `.ai-askbar`.
- Fill the slot, never exceed it, and manage your own internal scroll.
- Do not reference `.v2-content` or the page widgets.

**Both**
- CSS is linked as three separate `<link>` tags, in order. The order is
  load-bearing. Do not merge them behind an `@import` — nested imports
  can be blocked inside preview iframes (see repo CLAUDE.md).
- Motion lives in the file that owns the element it animates. Only the
  keyframes and the shared easing are in the shell.
- Every animation needs a `prefers-reduced-motion` branch in the same file.

## Known gaps

- `Access risk` is spelled that way in the Figma node; the earlier node
  said `Assess risk`. Probably a typo — left as-is pending a decision.
- The TruAI orb is a Figma WebGPU shader. It cannot run in a static page,
  so `assets/truai-orb.png` is the node rendered at its natural 132px.
  There is no `@2x`; Figma will not upscale past the node's own size.
- The hero's 10% texture layer is the shader's mesh rebuilt as stacked
  radial gradients, not the shader itself.
- Some hero text sits one token darker than the node specifies, to clear
  WCAG AA on the pale gradient. Marked at each occurrence in `02-page.css`.
- `.v2-content` hides its scrollbar. Scrolling works; the visual cue that
  there is more below the fold does not.
