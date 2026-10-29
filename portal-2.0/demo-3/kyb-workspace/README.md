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
| Report (isolated) | [demo-3/kyb-workspace/report.html](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/kyb-workspace/report.html) |

No sign-in, same as `ai-panel-lab/` — this is a layout lab.

## Status

- **KYB Verification landing** — rebuilt on Figma `1665:20500`, with two
  layout axes. See [Landing layouts](#landing-layouts).
- **Waiting for country** — a status screen, with two step-tracker
  treatments. See [Waiting for country](#waiting-for-country).
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
  report.html                # the report, isolated — opens on one business
  css/report-views.css       # report views + generation states
  js/report-boot.js          # opens the report for Apex Nordic Logistics AB
  js/report-views.js         # progressive generation + view switch
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
| Recents header | Inter 24/32 semibold + a `--text-link` View all, on the ground |
| List container | Radius 24, 24px padding, soft green drop shadow |
| Row | Timestamp · title · one tag · arrow, divider-separated |

**The country selector lives inside the field**, left of the input. The node
draws a single prompt box; ours has to carry the jurisdiction too, because a
KYB search without one is exactly what the next step stops to ask for.

The node's circular send button and its row of suggestion chips (Verify
Business · Verify Person · Check Risk Signals) were both built and then cut —
the composer already sends, and the chips duplicated prompts the TruAI panel
offers. They are in git history.

### Axes

| Axis | Attribute | Options |
|--|--|--|
| Grouping | `data-kw-group` | `open` · `all` |
| Recent | `data-kw-recent` | `list` · `rows` · `tiles` · `chips` · `table` |

**Grouping** answers: does the page read as a surface you act on, or a stack of
cards?

- **Open** *(the foundation)* — title, input and chips on the dots; only the
  recents list boxed.
- **One container** — everything in a single card. Fewest edges; the cost is
  that nothing is visibly primary.

**The sheet is removed on this screen.** `.kw-stage__body` is the white card
every other KYB surface sits on, but on the landing it would be a container
around every grouping option — including the ones whose whole point is not
having one. Content sits straight on the dot ground, and the only containers
are the ones an option draws.

**Open clears the ground under its content.** Title, chips and the recents
heading sit directly on the dot field, and text over an 18px grid of dots is
hard to read, so a radial mask on the canvas fades the dots out behind the
content column — a soft-edged circle, no visible boundary. It is a CSS mask
rather than the dot engine's own `clear` option: that one is an ellipse scaled
off the canvas width and height *independently*, so it goes oval on a wide
stage, where a CSS `circle` stays round. **One container** needs none of it —
its card already covers the content.

Container padding lives on the **grouping** rule, not the recent treatment:
only `open` draws a container, so only `open` pays for an inset. Each recent
option publishes `--kw-grid-pad-y` — the vertical padding that, added to its
own row padding, comes to the same 24px as the horizontal. List rows are
borderless so theirs reads as the container's (6 + 18); `rows` draws its own
card edges so none of it does (24 + 0).

**Recent** varies the list treatment:

- **List** *(the foundation)* — the Figma divider rows.
- **Rows** — two lines per entry: name + status, then product · role · date.
  More context, roughly twice the height.
- **Tiles** — three cards side by side. Cropping needs an edge to crop
  against, so only inside **One container** do they take a fixed width and
  scroll, masked by the container. With no container they share the width and
  sit centred. `open` draws no box around them either — boxing cards inside a
  card is an edge that buys nothing — and they go **white** there, since with
  nothing behind them they have to be what stands out from the dot ground.
- **Chips** — one-click targets instead of a list. Fast for the handful of
  names you keep returning to; `View all` covers the rest.
- **Table** — the densest. Fixed-width columns on a flex row, *not* a grid of
  `display: contents` cards: contents promotes the status tag to a grid item,
  and a pill stretched to fill a table cell stops looking like a pill.

**Presets** (Figma · Boxed · Tiles · Rows) are shorthand for a whole
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

A **status screen, not a form**. The user answers in chat, so there is nothing
to pick here. It carries five things: that it is waiting, what it is waiting
on, what it already has, what comes next, and what a valid answer looks like.

An earlier pass made this an interactive country picker — a dropdown, a
quick-pick grid, a Continue button that handed the answer to the agent. All
removed: the conversation already owns that input, and a second one on the
canvas meant two places to answer the same question. It is in git history.

### Axes

Both mirror the landing's, so the two screens stay in step.

| Axis | Attribute | Options |
|--|--|--|
| Grouping | `data-kw-group` | `open` · `all` |
| Step tracker | `data-kw-steps` | `cards` · `timeline` |

**Step tracker** — three steps only: Name set ✓ → Country needed → Business
matches.

- **Cards** — three cells across a tinted band, the current one lifted onto
  white. Reads as "you are here, of three". The per-step notes are hidden
  here: at a third of 600px there is no room for a second line, and a
  truncated hint is worse than none.
- **Timeline** — stacked, marks joined by a rule. Vertical space is the one
  thing this screen has spare, and it buys room for the note under each label,
  so each step says what it *is* as well as where it sits.

**Grouping** — `open` puts the content on the dot ground (and gets the same
canvas mask the landing uses, clearing the pattern behind the text); `all`
boxes it in one card. Under `all` the tracker's tinted band becomes an outline
instead, so the card does not stack two greys.

### Clearing the way for it

The sheet removal and the `.d3-kyb-map` fill both had to be dealt with before
`open` could show any dots at all:

- `.kw-stage__body` is the white card the other KYB surfaces sit on. Its
  removal is keyed off the resume surface **and** the await panel, because
  this step lives on the *map* surface with the panel drawn over it.
- `d3-workspace.css` fills `.d3-kyb-map` white for the Leaflet pane. With the
  sheet gone that fill became the thing covering the dots, so it is cleared
  while `is-awaiting-country` is set.

## Report, isolated

`report.html` — the finished report for **Apex Nordic Logistics AB**, with no
landing or search in front of it.

It is a **copy of `index.html`**, not a trimmed page. The report pipeline
reaches across most of that markup — the resume card skeleton, the five result
panels, the UBO graph host, the Details and Raw Data dialogs, the chat
templates — and `js/d3-kyb-resume.js` binds the recent-transaction cards at
load. Cutting it down would mean re-deriving which parts the report happens to
need and being wrong about it silently. It sits in the same folder, so
`<base href="../">` and every relative path work unchanged.

`js/report-boot.js` gets there by **clicking the recent-transaction card** for
that business — the same path a user takes. That handler already builds the
session, expands the card to a full report, seeds the chat and sets the status
tag; doing any of it here would be a second copy of the report's entry
conditions, and the first thing to drift. It retries until the surface actually
changes, because `d3-kyb-resume.js` binds those cards on `d1-app-ready` and the
card can exist before its handler does.

### Progressive generation

The report no longer arrives whole. **Only the Overview is generated on load**;
Ownership & UBO, Match Signals & Sources, Web & Social Insights and Additional
Data are offered as stubs the user asks for, one at a time. The traditional tab
bar is hidden in every view — it is the thing being moved away from.

**Generation rides the chat.** Asking for a section dispatches the same
`d3-chat:send` the suggested-action buttons use, so the left panel shows the
prompt, the agent's thinking state and its reply — the real path, not a
simulation of one. `js/d3-kyb-agent.js` answers and calls
`D3KybReport.selectTab()`; that call is wrapped, and **it** is what marks a
section generated. The 4.2s timeout is only a floor for an answer that never
selects.

Two details that matter if you touch this:

- **`MIN_RUN_MS`** holds the generating state open for 1.5s. The agent calls
  `selectTab()` early in its handler, *before* it has written the answer, so
  without a floor the progress line flashes and the section looks like it was
  there all along.
- **The card scrolls, not its body.** `d3-workspace.css` gives
  `.d3-kyb-resume__body` `overflow-y: auto` and lets it flex to the stage
  height, so the report scrolled inside a card pinned to the viewport.
  Progressive generation needs the opposite — the card grows and the page
  scrolls past it, or "generate the next part" appends into a box that never
  changes size. The card had to stop flexing (`flex: 0 0 auto`), not just get
  `height: auto`, and the scrollport moved out to `.d3-workspace__detail`.

`js/d3-kyb-agent.js` gained one `parseQuery` pattern — `additional data` →
the Additional Data tab. The other three sections already had phrasings that
routed correctly; that one had none.

### Views

| View | Offer | Reading |
|--|--|--|
| **Feed** | Stubs stacked under the overview | One column that grows downward. "Generate the next part" reads as continuing, not as opening something else. |
| **Nodes** | A canvas of connected cards | A parent and four **peers in a row** — the sections are not a hierarchy, so a vertical chain would assert an order that is not there. Pans in both axes like a FigJam board, grab cursor and all; no zoom, since at four fixed children there is nothing to zoom out to see. Refers to [Figma `554:67495`](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/Portal-2.0-Design---2026?node-id=554-67495) for the arrangement only — its content goes well outside KYB. |
| **Rail** | A standing index down the left | Every section listed whether it exists yet or not, with its state. Answers "what else could I have?" without scrolling. |
| **Focus** | One section, nothing else | The contrast: no index, no neighbours, a pager strip. Asks what a report is when the reader is never given a choice of what to read *next*, only what to ask for next. |

Per-section state is on both the stub and the panel as `data-kw-state` =
`idle` · `running` · `done`, so a view styles the offer and the result from the
same rule.

**Reset to overview only** in the lab panel puts every section back to `idle`,
for running the flow again without a reload.

Three things that bit, worth knowing before editing:

- **The node canvas is grid, not flex.** The parent is capped at 560px for
  readability, so under `flex-wrap` it never filled its row and the first child
  tucked in beside it. Grid separates how wide the box *looks* from how much of
  the row it *claims*; a generated node then takes `span 2` and its peers
  reflow around it.
- **The dot ground is the stage's own field**, not a background on an
  in-between container. `workspace-canvas.css` §1c hides it on the report
  surface because the card covers it; the nodes view turns it back on and drops
  every container between it and the nodes.
- **The stub icons are inline SVG.** FA Free carries almost no regular-weight
  glyphs beyond a small set, so `fa-regular fa-sitemap` and friends rendered as
  nothing at all.

In the rail, the row selects and the **`+` generates** — so looking at an
ungenerated section shows you its offer rather than generating it by the act of
looking.

## Removed: the tab strip

An earlier pass put a tab strip (`Overview` plus openable tabs) and a canvas
expand toggle above the sheet, with a `D3WorkspaceCanvas.openTab()` API behind
them. Cut: the canvas shows one thing at a time, and a tab bar naming that one
thing is chrome paying no rent. It's in git history if a screen ever needs to
show two things at once.

## Next

1. Pick a combination on the landing, a country-selector treatment and a
   report view, then delete the three lab panels.
2. Give the map surface the same once-over the country step got — it still
   fills the sheet edge to edge, and it is the one screen that breaks both the
   600px cap and the height hug.
3. **Report content is a stand-in.** The demo fixtures only carry ownership,
   risk and web data for the Meridian entities, so a generated section on
   Apex Nordic falls back to a default record or to "no records attached in
   this demo". The generation flow is real; the payload is not.
