# Demo 3 — AI panel

TruAI chat chrome for Demo 3. Structure is locked behind `D3AiPanel.render()`
(same idea as demo-2 `TruAIPanel`); parts under `parts/` own cards, inputs,
and buttons so they can be edited without touching the page.

## Layout

```
ai-panel/
  ai-panel.js          # entry — compose + mount + PROMPT_SETS data
  ai-panel.css         # shell layout; @imports part CSS
  README.md
  parts/
    util.js            # esc / attr helpers
    icons.js           # shared SVG icons
    icon-btn.js        # TDS icon button (back, close, send, …)
    header.js|.css     # brand row + back / expand / minimize
    prompt-card.js|.css# suggestion cards + prompt sets
    composer.js|.css   # textarea input + action buttons
    askbar.js|.css     # collapsed floating ask bar
    size.js            # free resize + full-canvas expand
```

## Mount

```html
<link rel="stylesheet" href="components/ai-panel/ai-panel.css">
…
<div data-d3-ai-panel-mount></div>
…
<script src="components/ai-panel/parts/util.js"></script>
<script src="components/ai-panel/parts/icons.js"></script>
<script src="components/ai-panel/parts/icon-btn.js"></script>
<script src="components/ai-panel/parts/prompt-card.js"></script>
<script src="components/ai-panel/parts/composer.js"></script>
<script src="components/ai-panel/parts/header.js"></script>
<script src="components/ai-panel/parts/askbar.js"></script>
<script src="components/ai-panel/parts/size.js"></script>
<script src="components/ai-panel/ai-panel.js"></script>
```

Load **before** `d3-nav.js`, `d3-chat-bridge.js`, and agent scripts.

`ai-panel.js` mounts **synchronously** when `[data-d3-ai-panel-mount]` is already in the DOM (end-of-body scripts). Do not defer mount to `DOMContentLoaded` — that races shell scripts and leaves panel controls unbound.

## Resize & full canvas

| Control | Affordance |
|---------|------------|
| Widen / narrow | Drag the right-edge handle (`[data-d3-chat-resize]`); Arrow keys when focused |
| Full canvas | Header expand button (`[data-d3-chat-expand]`) next to minimize |
| Exit full canvas | Same button, or **Esc** (exits expand before closing the panel) |

Docked width is stored in `sessionStorage` (`d3-chat-pane-w`) and restored on remount / reopen. Full-canvas sets `data-d3-chat-size="full"` on `.d1-shell` and hides `.d1-main` until exit. Width / expand changes dispatch `window` `resize` so map/drawer layouts relayout. On viewports ≤720px the panel still collapses to the askbar; expand + resize are disabled.

## Where to edit what

| Change | File |
|--------|------|
| Prompt card copy / sets | `ai-panel.js` → `PROMPT_SETS` |
| Card markup / look | `parts/prompt-card.js` + `.css` |
| Composer placeholder / send | `parts/composer.js` + `.css` |
| Back / expand / close / brand | `parts/header.js` + `.css` |
| Resize / full-canvas behavior | `parts/size.js` + `ai-panel.css` |
| Askbar text / look | `parts/askbar.js` + `.css` |
| Icon SVGs | `parts/icons.js` |
| Panel width / shell | `ai-panel.css` (`--d3-chat-pane-w`) |

## Contracts kept

- `[data-d3-chat-pane]`, `[data-d3-chat-back]`, `[data-d3-chat-close]`
- `[data-d3-chat-expand]`, `[data-d3-chat-resize]`
- `[data-d3-prompt-set]`, `[data-d3-prompt]`, `[data-agent]`
- `[data-d3-chat-thread]`, `[data-d3-chat-composer]`, `[data-d3-pane-input]`
- `[data-d3-askbar]`

## Panel lab

Standalone page (no portal shell / no sign-in) for UI experiments:

`../ai-panel-lab/index.html` — GitHub Pages:
`…/portal-2.0/demo-3/ai-panel-lab/`

Live Meridian panel on the left; labeled component gallery on the right
(renders via `D3AiPanel.parts.*` + chat template clones).

## Not in this component (yet)

Message templates (`data-d1-tpl`), KYB flow UI, and agent logic stay in
`index.html` / `js/` (lab page copies the templates it needs).
