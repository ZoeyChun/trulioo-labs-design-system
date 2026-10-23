# Demo 3 — KYB workspace canvas

Fork of `../index.html` that re-casts the **KYB verification screens** as a
two-column workspace: TruAI docked on the left, a dotted canvas on the right
with the content on a 600px white sheet, centred.

**Home is untouched.** It renders exactly as it does in the parent page — full
width, no dot ground, no sheet, no docked panel. Every canvas rule is scoped
behind `:not([data-d3-view="home"])`.

| | URL |
|--|--|
| GitHub Pages | [demo-3/kyb-workspace/](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/kyb-workspace/) |
| Local | http://127.0.0.1:8765/portal-2.0/demo-3/kyb-workspace/index.html |

No sign-in, same as `ai-panel-lab/` — this is a layout lab.

## Status

- **Home** — deliberately unchanged from the parent page.
- **KYB Verification landing** — on the 600px sheet, with four layout options
  to choose between. See [Landing layouts](#landing-layouts).
- **Waiting for country** — redesigned, with two country-selector treatments
  to choose between. See [Waiting for country](#waiting-for-country).
- **Map view, report, matches** — render on the canvas already (nothing in
  `.d1-main` was touched), but they break out of both the width cap and the
  height hug and haven't had a design pass.

## What changed vs. the parent page

| | Parent `demo-3/index.html` | Here |
|--|--|--|
| TruAI panel | Collapses to the floating ask bar | Permanent column on the KYB screens; close control + askbar removed there. Home keeps the parent behaviour. |
| Right side (KYB only) | White `.d1-main`, flush to the shell | `surface-neutral-02` canvas with a dot field; content on one white sheet with a shadow |
| Content width | Full bleed | Sheet capped at 600px, centred horizontally **and vertically** (map and report excepted) |
| Sheet height | Full height of the shell | Hugs its content; scrolls inside only when taller than the stage |
| Home | — | **Unchanged.** |
| Waiting for country | Status card — pulse, title, three-dot rail | Working step: the question, a step tracker, and the country picker |

Everything else — rail, KYB agent, map, report, drawer, motion — is the parent's,
unforked.

## Files

```
kyb-workspace/
  index.html                 # the fork
  css/workspace-canvas.css   # stage, dot ground, the sheet (width + height), docked panel
  css/country-step.css       # waiting-for-country step
  css/landing-layouts.css    # KYB landing — the four layout options
  js/workspace-canvas.js     # dot field mount, docked-panel guard
  js/country-step.js         # country data + the two selector treatments
  js/landing-layouts.js      # landing layout switch + the quick-start chips
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

`.kw-stage` has to exist on every view — it wraps `.d1-main`, and the markup is
one document. On home it is an **inert pass-through**: no ground, no dots, no
sheet, nothing between `.d3-canvas` and `.d1-main` but two transparent boxes.
§4 of `workspace-canvas.css` is what keeps it that way.

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

## Landing layouts

`index.html` → `[data-kw-landing]`, `css/landing-layouts.css`,
`js/landing-layouts.js`.

Four arrangements of the same three things — the title, the search, and recent
transactions. They differ in **which job they favour**: starting a new check, or
re-entering an old one. Both are always on screen; what changes is which one you
fall into first.

| | Layout | Favours | Trade |
|--|--|--|--|
| A | **Search hero** *(default)* | Starting a new check | Search is the subject; recents sit below a rule and read as history. Closest to the page today. |
| B | **Work queue** | Re-entering an old check | Title shrinks to a page label, search becomes a toolbar, the list is most of the screen. For accounts where most sessions continue work. |
| C | **Quick start** | Re-running a known entity | Recents collapse to one row of one-click chips under the input. Fast for the three names you keep returning to; no help at all for the fourth. |
| D | **Split** | Neither, explicitly | Two labelled modules — a tinted "Start a verification" panel and a plain recents section. Least opinionated about why you came. |

The segmented switch is a **lab control**, tagged `LAB`. Pick one and delete it.

### One DOM, four layouts

All four are CSS over **one** set of nodes, switched by the `data-kw-landing`
attribute. This is not a stylistic choice: the search is the `vb-lookup`
composite that `js/d3-kyb-manual-search.js` wires **by id**, and the recent
cards are bound by `js/d3-kyb-resume.js`. A per-layout copy of the markup would
mean a per-layout copy of that wiring, or four elements fighting over `#vb-q`.

Two consequences worth knowing:

- **`.kw-landing-row`** carries the row treatment for the layouts that want a
  list. The upstream card is a 168px-tall column built for a three-across grid;
  one-per-row at 600px that is a lot of height for four short facts, so the same
  nodes are re-flowed into a name/status row plus a meta line. The meta line
  needs a zero-height `::after` to force the break — at 600px all five spans fit
  on one line otherwise, and the status tag lands mid-row instead of at the edge.
- **`.kw-landing__panel`** is an inert wrapper, `display: contents` everywhere
  but Split, which needs the label and the search inside one panel while the
  title stays outside it.

The quick-start chips are built from the recent cards rather than a second data
list, and a chip clicks its card — so "open a recent check" stays one code path
however it is presented. **View all** goes to the Transactions rail item, which
is where the full history already lives.

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

1. Pick one country-selector treatment and delete the lab switch.
2. Give the map surface the same once-over the country step got — it still
   fills the sheet edge to edge, and it is the one screen that breaks both the
   600px cap and the height hug.
