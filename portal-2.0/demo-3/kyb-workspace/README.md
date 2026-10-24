# Demo 3 — KYB workspace canvas

Fork of `../index.html` reduced to **KYB Verification only**, re-cast as a
two-column workspace: TruAI docked on the left, a dotted canvas on the right
with the content on a 600px white sheet, centred.

The page opens straight on KYB Verification. Home, Transactions, Labs, Dev
Dashboard and Chats are gone from the rail — this fork exists to work on the
KYB screens, and a rail full of destinations that lead out of them is noise.

| | URL |
|--|--|
| GitHub Pages | [demo-3/kyb-workspace/](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/kyb-workspace/) |
| Local | http://127.0.0.1:8765/portal-2.0/demo-3/kyb-workspace/index.html |

No sign-in, same as `ai-panel-lab/` — this is a layout lab.

## Status

- **KYB Verification landing** — rebuilt on Figma `1665:20500`, with two
  layout axes. See [Landing layouts](#landing-layouts).
- **Waiting for country** — redesigned, with two country-selector treatments
  to choose between. See [Waiting for country](#waiting-for-country).
- **Map view, report, matches** — render on the canvas already (nothing in
  `.d1-main` was touched), but they break out of both the width cap and the
  height hug and haven't had a design pass.

## What changed vs. the parent page

| | Parent `demo-3/index.html` | Here |
|--|--|--|
| Scope | Home, KYB, Transactions, Labs, Org | **KYB only.** Rail trimmed to KYB + Settings; opens on KYB Verification |
| TruAI panel | Collapses to the floating ask bar | Permanent column; close control + askbar removed |
| Right side | White `.d1-main`, flush to the shell | `surface-neutral-02` canvas with a dot field; content on one white sheet with a shadow |
| Content width | Full bleed | Sheet capped at 600px, centred horizontally **and vertically** (map and report excepted) |
| Sheet height | Full height of the shell | Hugs its content; scrolls inside only when taller than the stage |
| Waiting for country | Status card — pulse, title, three-dot rail | Working step: the question, a step tracker, and the country picker |

Everything else — rail, KYB agent, map, report, drawer, motion — is the parent's,
unforked.

## Files

```
kyb-workspace/
  index.html                 # the fork
  css/workspace-canvas.css   # stage, dot ground, the sheet (width + height), docked panel
  css/country-step.css       # waiting-for-country step
  css/landing-layouts.css    # KYB landing — the four layout axes + lab panel
  js/workspace-canvas.js     # dot field mount, docked-panel guard
  js/kyb-boot.js             # KYB-only boot (initial view, brand-mark re-point)
  js/country-step.js         # country data + the two selector treatments
  js/landing-layouts.js      # landing layout axes, presets, chips
```

`css/` and `js/` under `demo-3/` are **shared, not copied**. The page carries
`<base href="../">`, so every relative URL — in markup, and the ones scripts
build at runtime (`d3-labs.js` iframe `src`) — resolves against `demo-3/`
exactly as in the parent. Files belonging to this fork are addressed as
`kyb-workspace/…`.

One consequence: `js/auth-gate.js` resolves `sign-in/` against `location.href`,
not `<base>`, so it is **not** loaded here. An inline shim adds the
`d1-app-ready` class that `loader.css` needs to reveal the shell.

## Structure

```
.d1-shell.kw-shell
  .d1-rail                   72px, unchanged
  .d3-canvas
    .d3-chat-pane            TruAI — permanent
    .kw-stage                NEW
      .kw-stage__dots        dot field on neutral-02
      .kw-stage__body        the white sheet — 600px, centred on the dots
        .d1-main             untouched, transparent
```

`.kw-stage` **wraps** `.d1-main` rather than reaching into it. That is the whole
reason the other KYB surfaces can move over without being rebuilt.

The white sheet is drawn **once**, on `.kw-stage__body` — not per screen.
`.d1-main` is made transparent so it doesn't stack a second card inside the
first. Any surface that wants different chrome opts out here rather than
drawing its own.

## The sheet

### Width

`--kw-content-max: 600px`, declared on `.kw-stage` in `workspace-canvas.css`.

The **white container itself** takes the cap, not just the content inside it —
`.kw-stage__body` is `max-width: 600px; margin-inline: auto`. It is a sheet
sitting on the dot ground, not the ground's full width. Home, the country step
and the KYB landing are all one 600px sheet.

### Exceptions

Map and report keep the full stage. They are not documents, they are canvases,
and a 600px letterbox of either is useless. The sheet does visibly widen on the
way into the map; dropping that one rule makes everything 600px if the jump
reads worse than the letterbox.

The selector is fussy for two reasons, both worth knowing before editing it:

- **`:not(:has([data-d3-kyb-map-await]:not([hidden])))`** — waiting-for-country
  lives on the *map* surface; `.d3-kyb-map__await` overlays the Leaflet pane
  rather than replacing it. Keying on the surface alone widens the one screen
  this cap exists for.
- **`[data-d3-view="chat"]`** — `.d3-workspace` is always in the DOM, hidden but
  carrying `data-d3-kyb-surface="map"` from the markup, so `:has()` alone
  matches on home too.

### Height

`.kw-stage__body` is `flex: 0 1 auto` — it hugs its content and shrinks past the
stage when the content is taller, but never stretches to fill it. A short screen
in a sheet the full height of the window is mostly empty white. `.d1-main` keeps
the scrollport, so a tall screen scrolls inside the sheet.

The stage is `justify-content: center`, so the sheet sits in the middle of the
canvas vertically as well as horizontally; the stage's 20px padding is the
minimum inset it keeps once the content is tall enough to use the whole height.

Waiting-for-country needed one fix for this: it lives on the map surface, and
`.d3-kyb-map` is pinned `position: absolute; inset: 0` by `d3-workspace.css`.
Out of flow it contributes no height, so the sheet first measured **2px**. The
fork puts the panel in flow on that surface and hides the Leaflet pane under it
— scoped to `[data-d3-kyb-surface="map"]`, because `is-awaiting-country` outlives
the step and would otherwise re-show the question above the KYB landing.

### Re-pointed upstream rules

One, and it keys off the **viewport** where the sheet is a fixed **width**:
`d3-workspace.css` sits the KYB landing hero `clamp(56px, 14vh, 140px)` from the
top, which reads as a hole in a narrow sheet; reduced to
`clamp(24px, 6vh, 56px)`.

A `briefing.css` override lived here too — home's cards forced to one column,
since `briefing.css` also picks its count off the viewport. Gone with the rest
of the home changes.

## Dot ground

`workspace-canvas.js` → `CANVAS_DOTS`, mounted with the shared
`demo-2/home-layout-01/js/dot-field.js` engine, following the pattern of
`demo-2/home-layout-01/dot-background.html`.

Deliberately flatter than the hero field in `js/d3-home-dots.js`: even grid,
`shape: 'full'`, no clear hole, `fade: 1.3` (past 1 → the vertical fade never
starts), and `style: 'static'` — a shimmer behind a whole workspace is movement
in the corner of the eye all day.

Grid is **18px**, dot radius 1.2px at 40% — tightened twice, since the dots now
show across the whole stage around a 600px sheet rather than in a thin gutter.

To retune, use `../home-dot-lab/` and paste the result into `CANVAS_DOTS`.

## KYB only

The rail keeps KYB Verification and Settings; Home, Transactions, Labs, Dev
Dashboard and Chats are removed, along with the Labs / Transactions / Org
iframe sections. Those view scripts all guard on their frame being present and
no-op without it, so they stay loaded and inert.

The shell carries **`data-d3-lab`** — `d3-nav.js`'s own escape hatch. Without
it the nav forces `data-d3-view="home"` on load; with it the page picks its own
initial view, and `js/kyb-boot.js` opens the KYB resume surface once
`d3-kyb-resume.js` has set its demo session up.

Two things that are deliberately still here:

- **The home markup.** `.d1-work` inside `.d1-home` holds the `data-d1-tpl`
  message templates that `chat.js`, `d3-kyb-agent.js` and
  `d3-kyb-report-reveal.js` all look up by name. Removing `.d1-home` would take
  the templates with it. It is never shown.
- **The brand mark**, which `d3-nav.js` binds to `goHome()`. Home has no nav
  entry now, so `kyb-boot.js` re-points it at KYB with a capture-phase listener
  that stops the event before the upstream one sees it.

## Landing layouts

`index.html` → `[data-kw-group]`, `css/landing-layouts.css`,
`js/landing-layouts.js`.

### Foundation

[Figma `1665:20500`](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/Portal-2.0-Design---2026?node-id=1665-20500).
Title and prompt input sit on the page ground; only the recent transactions
list is in a container.

| Part | Spec from the node |
|--|--|
| Title | Tobias 36/44 (32/40 here), centred, `--text-body` |
| Prompt input | White, 4px translucent ring, radius 16, `elevation/xl` |
| Send | 28px circular button on `--surface-neutral-03`, arrow 16px |
| Suggestion chips | Verify Business · Verify Person · Check Risk Signals |
| Recents header | Inter 24/32 semibold + a `--text-link` View all, on the ground |
| List container | Radius 24, 24px padding, soft green drop shadow |
| Row | Timestamp · title · one tag · arrow, divider-separated |

**The country selector lives inside the field**, left of the input. The node
draws a single prompt box; ours has to carry the jurisdiction too, because a
KYB search without one is exactly what the next step stops to ask for. Send
hands the agent `"<name>, <country>"` — the same path the composer uses — so
the selector actually scopes the search rather than decorating the field.

The send button is new markup: upstream's Submit lives in the prefill panel,
not in the field, so there was no existing equivalent to restyle.

### Axes

| Axis | Attribute | Options |
|--|--|--|
| Grouping | `data-kw-group` | `open` · `all` · `cards` · `flat` |
| Recent | `data-kw-recent` | `list` · `rows` · `tiles` · `chips` · `table` |

**Grouping** answers: does the page read as a surface you act on, or a stack of
cards?

- **Open** *(the foundation)* — title, input and chips on the ground; only the
  list boxed.
- **One container** — everything in a single card. Fewest edges; the cost is
  that nothing is visibly primary.
- **Two panels** — search in one card, list in another, heading between them.
  Says "two jobs" more plainly than anything else here.
- **Flat** — no containers at all; rows separated only by their dividers.

The three non-`open` options put the sheet on `surface-neutral-02`, because a
white card on a white sheet has nothing to read against.

**Recent** varies the list treatment:

- **List** *(the foundation)* — the Figma divider rows.
- **Rows** — two lines per entry: name + status, then product · role · date.
  More context, roughly twice the height.
- **Tiles** — one row that scrolls. Three cards at a readable width don't fit
  across 600px, and a 2×2 leaves a hole where the fourth would be.
- **Chips** — one-click targets instead of a list. Fast for the handful of
  names you keep returning to; `View all` covers the rest.
- **Table** — the densest. Columns implied by position rather than drawn.

**Presets** (Figma · Boxed · Panels · Flat) are shorthand for a whole
combination, and stay lit only while the landing still matches — change one
axis and the preset clears rather than mislabelling the screen.

### One DOM, every option

All of it is CSS over **one** set of nodes. The search is the `vb-lookup`
composite that `js/d3-kyb-manual-search.js` wires **by id**, and the recent
cards are bound by `js/d3-kyb-resume.js`. A per-option copy of the markup would
mean a per-option copy of that wiring, or several elements fighting over
`#vb-q`.

The chips are built from the recent cards and a chip clicks its card, so "open
a recent check" stays one code path. The suggestion chips hand the agent the
sentence a user would otherwise type, for the same reason.

**Specificity.** The shared `.kw-shell .kw-stage__body` rules are three classes
deep, so any per-option override of the grid or the search needs that prefix.

### The lab panel

Floats on the dot ground at the stage's top-left, never inside the sheet. It is
a `<details>` that closes to a pill: the gutter beside a centred 600px sheet is
~170px at 1512, narrower than any usable panel.

Pick a combination, then delete the panel, the lab section of
`css/landing-layouts.css`, and the `kw-lab` markup.

## Waiting for country

`index.html` → `[data-d3-kyb-map-await]`, `css/country-step.css`,
`js/country-step.js`.

The parent page shows a status card here — pulse, title, three-dot rail. It
reports; it doesn't ask. The user's only way forward is to go back to chat and
type. This version asks on the canvas, and carries **three things only**:

1. The question.
2. A step tracker — name ✓ → country (current) → matching entity →
   verification — so one answer visibly unblocks the rest.
3. The country picker.

An earlier pass also had a rationale paragraph ("registries are national…"),
per-treatment notes, and an aside with run context and next steps. All cut: this
is a one-decision screen, and everything else read as clutter around the one
control that matters. Same reason the step tracker is labels only — the per-step
hints turned it into a second block of reading.

### Selector treatments

| | Treatment | Argument for it |
|--|--|--|
| A | **Quick picks** — flag tiles · *default* | Fastest for the common case; needs the "search all jurisdictions" escape hatch for the long tail. |
| B | **Dropdown** — TDS flag select, all 24 | One control, every jurisdiction. Safest when the user knows the answer. |

The segmented switch above them is a **lab control**, tagged `LAB` — two
candidates, not two controls meant to ship together. Pick one and delete the
switch. Selection is shared, so switching mid-flow keeps the answer.

A by-region list and a type-ahead were also built and then cut — a lab switch
with dead options on it is just a longer switch. They're in git history if
either is worth revisiting.

Countries live in `COUNTRIES` in `js/country-step.js`. The six with
`demo: true` mirror `DEMO_JURISDICTIONS` in `js/d3-kyb-agent.js` — the only ones
with fixture businesses behind them — and are tagged **Demo data** in every
list, so a pick that leads nowhere doesn't read as a bug.

### How the answer gets back

`applyCountryPick()` isn't exported from `js/d3-kyb-agent.js`, and the chat
bridge already accepts `d3-chat:send`. So Continue sends the sentence the user
would otherwise have typed — `"<business>, <country>"` — which runs the exact
path chat runs, with no fork of the agent.

## Removed: the tab strip

An earlier pass put a tab strip (`Overview` plus openable tabs) and a canvas
expand toggle above the sheet, with a `D3WorkspaceCanvas.openTab()` API behind
them. Cut: the canvas shows one thing at a time, and a tab bar naming that one
thing is chrome paying no rent. It's in git history if a screen ever needs to
show two things at once.

## Next

1. Pick a combination on the landing and a country-selector treatment, then
   delete both lab panels.
2. Give the map surface the same once-over the country step got — it still
   fills the sheet edge to edge, and it is the one screen that breaks both the
   600px cap and the height hug.
