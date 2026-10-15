# Portal shell + TruAI panel — working agreement

Shared shell and TruAI panel for the 2026 portal pages, built from Figma
[`Portal-2.0-Design---2026`](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/).

```
portal-2.0/demo-2/
├── shared/portal-shell/
│   ├── shell.css        THE CONTRACT — layout, panel slot, open/closed state
│   ├── ai-panel.css     RIGHT  — AI chat panel look        prefix: ai-
│   ├── ai-panel.js      RIGHT  — AI chat panel STRUCTURE   TruAIPanel.render()
│   ├── ai-toggle.js     RIGHT  — open/close behaviour
│   └── assets/          orb, logo mark, ask arrow, env dot, world map, …
├── home/                index.html + css/page.css          prefix: v2-
├── verify-business/     index.html + css/page.css + js/    prefix: vb-
├── agent-hub/           index.html + css/page.css          prefix: ah-
└── transaction-history/ index.html + css/page.css
```

## The AI panel is structure-locked, not copy-pasted

Every page used to hand-copy the panel's ~100 lines of HTML (header, orb,
suggestions, prompt form, collapsed askbar). That copy drifting between pages
is exactly how two real bugs happened: verify-business and agent-hub shipped
with mismatched element ids that silently broke open/close, and
transaction-history kept an older header pattern after the other three pages
moved on. **You no longer write or edit that markup.** `ai-panel.js` owns it;
a page supplies a mount point and a config object.

### Adding the panel to a page

Put this where the panel belongs — inside `.v2-stage`, after your page's
`<main>` — then load `ai-toggle.js` last:

```html
<div id="ai-panel-mount"></div>
<script src="../shared/portal-shell/ai-panel.js"></script>
<script>
  TruAIPanel.render(document.getElementById('ai-panel-mount'), {
    title: 'TruAI',                 // plain header (default) — pick ONE
    // greeting: { name: 'Welcome, Zoey.', date: 'September 30, 2026' },

    headline: 'What would you like to work on?',   // required
    // contextPill: 'KYB Agent',                    // optional, shows under the orb

    // hasThread: true,   // verify-business only — reserves #ai-thread for
                           // your own JS to render a conversation into

    suggestions: [
      { title: 'Where can I start?', description: 'Pick a task and I’ll guide the next step' },
      { title: 'Verify business', description: 'Run a KYB check on a legal entity' }
    ],

    placeholder: 'Ask questions or tell me what you’d like to do',
    askbarText:  'Ask a question or tell me what you’d like to do'
  });
</script>
<script src="../shared/portal-shell/ai-toggle.js"></script>
```

That's the whole instruction set for a new page: **don't write
`<aside class="ai-panel">` by hand, don't invent ids, don't touch
`ai-panel.css` or `ai-panel.js`.** If the panel needs to look or behave
differently than the config allows, that's a conversation about extending
`ai-panel.js`'s config shape — not a reason to copy the markup out and
customize it locally.

If your page drives its own flow inside the panel (like verify-business's
search/disambiguation), set `hasThread: true` and look up `#ai-thread` /
`#ai-suggestions` by id from your own script, same as today — the renderer
still produces those ids, your script order just needs to come after the
`TruAIPanel.render()` call (both tags are synchronous `<script>`s, so plain
page order is enough; no `DOMContentLoaded` race).

Each page links its stylesheets **in this order** — the cascade depends on it:

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
| **AI panel — look** | `ai-panel.css` | `ai-` |
| **AI panel — structure** | `ai-panel.js` | n/a (JS, not CSS) |
| **AI panel — behaviour** | `ai-toggle.js` | n/a |
| **Page content** | each page's `css/page.css` | `v2-` (home), `vb-` (verify-business), `ah-` (agent-hub) |

A selector's prefix tells you who owns it. Editing an `ai-` rule from a page
file, or a page rule from `ai-panel.css`, means it is in the wrong place. If
you need the panel's markup to change, edit `ai-panel.js` — once, for every
page at the same time — not the page you happen to be working on.

## The contract

`shell.css` is the only place the shell and the panel meet. It promises:

| Promise | Meaning |
|---|---|
| `.v2-shell[data-truai="open" \| "closed"]` | State attribute. Every page reads it; only `ai-toggle.js` writes it. |
| `.v2-stage` | Positioning context. Reserves room for the panel with padding and recentres the column when closed. |
| `.v2-content` | The left column's box. Width is decided here, not by its contents. |
| `.v2-panel-slot` | A fixed `--v2-panel-w` box pinned right, absolutely positioned — it never participates in layout. |
| `--v2-panel-w` / `--v2-panel-total` | The slot's width. Changing it moves both sides: contract change. |
| `@keyframes v2-rise / fade / slide / bloom / halo / grow` | Shared entrance motion. Per-element delays live with the element. |

**No page may restyle `.v2-stage`, `.v2-panel-slot`, or the `[data-truai]`
rules.** Those are a contract change — agree first.

Note the direction of the dependency: `shell.css` never names an `ai-` class.
It sets state and geometry; `ai-panel.css`/`ai-panel.js` decide how the panel
looks and is structured. The panel can change its internals without touching
shared shell code, and vice versa.

## Rules of thumb

**Your page** — everything inside `<main class="v2-content">`. Never assume a
pixel width; the column is sized by the shell and changes when the panel opens
or closes. Do not reference `.ai-*` or `[data-truai]`.

**The panel** — everything inside `.v2-panel-slot` or `.ai-askbar`. If you're
not editing `ai-panel.js`/`ai-panel.css` directly, you only ever touch this
through the `TruAIPanel.render()` config.

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

- "Verify a person" and "Assess risk" cards have no destination yet and point
  at `#`.
- The TruAI orb is a Figma WebGPU shader. It cannot run in a static page, so
  `assets/truai-orb.png` is the node rendered at its natural 132px. There is no
  `@2x` — Figma will not upscale past the node's own size.
- `.v2-content` hides its scrollbar. Scrolling works; the visual cue that there
  is more below the fold does not.
- `verify-business/assets/map.png` is 410 kB straight from Figma — compress it
  before this goes anywhere real.
- Search, tabs, and most of verify-business's report tabs (Ownership/UBO,
  Web & Social Insights, Match Signals, Raw Data, Sources) are presentational
  only — only Overview is wired to real content.
