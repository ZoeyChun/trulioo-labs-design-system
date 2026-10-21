# Home — Layout 01 / Design 6

Figma: [`Portal-2.0-Design---2026`, node 1476:49405](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/?node-id=1476-49405)

A second home layout, separate from `demo-2/home` (node 1015:91926). The stat
strip, action cards, transaction table and docked TruAI panel are gone; what's
left is a centred hero on a dot field, with a Quick start row below it.

```
index.html              markup, transcribed from the node
css/page.css            the page
js/dot-field.js         the generated dot background

dot-background.html     the field on its own — sandbox, not the design
css/dot-background.css  that sandbox's chrome
css/dot-controls.css    the tweak panel — review tool, not the design
js/dot-controls.js      the tweak panel — review tool, not the design

assets/                 logo mark + the three card thumbnails, exported from the node
```

Geometry is verified against the node: hero 760 × 186, prompt input 60 tall,
Quick start 1214 wide, cards 300 tall.

**The home screen does not scroll.** Figma's fixed vertical offsets (hero at
y 215, Quick start at y 583) only fit at exactly 1024 tall and pushed the cards
off the bottom of anything shorter. Instead `.v2-slot` is a flex column where
the hero's and Quick start's top margins are both `auto`: the free height is
split evenly between the gap above the hero and the gap below it, and the card
row always lands on the bottom edge. At 1024 that puts both gaps at 201px —
within ~15px of the node — and below it the gaps close rather than scrolling.
Verified at 1024, 900, 800, 700 and 640 tall.

Below ~620px tall, and in the stacked card layout under 900px wide, the slot
does scroll; there is no height at which both the hero and three full-size
cards fit. Those two cases have explicit rules rather than collapsed margins.

## The dot field

In Figma the background is two overlapping raster tiles of green dots
(`1496:54059`, `1496:54061`). A PNG can't be re-coloured, re-spaced, re-shaped
or animated, so the field is generated at runtime instead. `js/dot-field.js` at
its shipped defaults reproduces the Figma look exactly when `style` is `static`
and `shape` is `full`.

Three independent layers decide whether a dot is drawn and how bright it is.
Keeping them separate is what makes the field composable rather than a pile of
special cases:

- **formation** — the lattice: where dots sit
- **shape** — the region they're allowed to occupy
- **clear** — a soft hole punched through it, under the hero

**Every animation is deterministic.** There is no `Math.random` in
`dot-field.js` and there should never be one. A dot's phase comes from its own
grid coordinates, so the field is identical on every load, every resize and on
every machine — it reads as part of the surface rather than as weather.
Amplitudes are small on purpose; `intensity` at its maximum still only swings a
dot between roughly 30% and 170% of its resting alpha.

`prefers-reduced-motion: reduce` falls back to `static`.

### A note on the animation loop

`requestAnimationFrame` is the right clock, but it is suspended wherever the
host reports the document as hidden — and embedded preview panes (the desktop
app's browser pane, design-review iframes) do exactly that while the page is
plainly on screen. There, rAF delivers roughly one frame a second and the field
looks frozen, which is what it did before this was handled.

So the loop starts on rAF and, if no frame has arrived within 250ms, falls back
to a 30fps timer. The field is also painted synchronously on start rather than
waiting for the first frame — a resize clears the canvas, so waiting could leave
it blank. If you are editing this file, keep both of those: they are the
difference between the animation working and not.

### Animation styles

| `style` | What it does |
|---|---|
| `static` | No motion. The Figma design. |
| `shimmer-twinkle` | **Default.** A broad brightness wave crossing the field, with each dot pulsing on its own fixed phase underneath it. |
| `shimmer` | The wave alone — one soft gradient band sliding along `angle`. |
| `twinkle` | The per-dot pulse alone. Phase is the golden-ratio combination of a dot's row and column, so it is evenly spread but fixed. |
| `breathe` | The whole field brightens and dims in unison. The calmest option. |
| `ripple` | Concentric rings leaving the hero centre at a constant rate. |
| `scan` | A single soft band travelling along `angle`. Only ever brightens — the resting field keeps its design value. |
| `drift` | Dots sway on a fixed circular path, capped at a tenth of one cell, so they never visibly swap places. No dimming. |

### Formations — the lattice

`staggered` (Figma), `grid`, `hex`, `diagonal`, `rings`.

### Shapes — the region

The field doesn't have to be a full-bleed fill. Everything except `full` is a
region the lattice is cut to, positioned by `shapeX` / `shapeY` and sized by
`shapeScale` — so each one is a family of layouts rather than a single fixed
arrangement.

| `shape` | |
|---|---|
| `full` | Full bleed. The Figma design. |
| `circle` | One disc. |
| `cluster` | Three overlapping discs on a trefoil. |
| `pair` | Two overlapping discs on a diagonal. |
| `blob` | One organic outline, from two fixed harmonics. |
| `blobs` | Two smaller blobs, offset. |
| `ring` | An annulus. |
| `band` | A stripe running along `angle`. |
| `arch` | Half a ring — an arc across the top of the region. |

Geometry is expressed in units of **R**, half the shorter canvas side times
`shapeScale`, and offset from the region centre. That is why a shape keeps its
proportions wherever you move it: `cluster`'s three discs sit 0.45R out at
200°/340°/90° with radii just under 0.6R, which puts their pairwise distance
(~0.8R) comfortably inside the sum of their radii (~1.15R) — the lobes overlap,
but each still reads as its own circle.

`feather` softens every region edge as a fraction of its local radius, so the
boundary looks the same whether the shape is big or small.

### Config

These are the shipped defaults — two overlapping discs of square lattice,
sitting low and cleared under the hero. That is a chosen composition, not the
Figma node; the node itself is the **Figma** preset in the panel (`static` +
`shape: 'full'`).

```js
TruDotField.mount(document.getElementById('v2-dots'), {
  style:      'shimmer-twinkle',
  formation:  'grid',
  spacing:    26,        // px between dot centres — density
  size:       2,         // dot radius, px
  sizeVary:   0.45,      // per-dot radius spread, 0–1; 0 = all dots equal
  color:      '#587965', // off the Trulioo ramp — listed as "Moss" in the panel
  opacity:    0.55,      // resting alpha

  shape:      'pair',    // region mask
  shapeScale: 1.8,       // 0.25–2, relative to half the shorter side
  shapeX:     0.5,       // region centre, fraction of width
  shapeY:     0.61,      // region centre, fraction of height
  feather:    0.34,      // region edge softness, fraction of its radius

  clear:      0.8,       // strength of the hole under the hero, 0–1
  clearSize:  0.47,      // its radius, fraction of the canvas
  clearX:     0.5,       // its centre, fraction of width
  clearY:     0.42,      // its centre, fraction of height

  fade:       0.54,      // height fraction at which the field has faded out

  intensity:  1,         // animation amplitude, 0–1
  speed:      0.25,      // cycles per second
  angle:      35         // travel direction, degrees — shimmer, scan, band
});
```

`TruDotControls` stores a chosen look under a versioned `localStorage` key, and
a stored config is applied wholesale at mount. **Bump `STORE_KEY` in
`js/dot-controls.js` whenever you change these defaults** — otherwise anyone who
has opened the panel before keeps seeing the old look and never the new one.

`clear` and `fade` are what keep the field off the greeting and off Quick start
— the two offset tiles in Figma do the same thing by hand. Set `clear` to `0`
when the shape alone is doing the composition.

## The control panel

`js/dot-controls.js` adds a **Background** button, bottom right. It is a review
tool, not part of the design: it builds its own markup so `index.html` stays a
clean transcription of the node, and it sits behind a toggle so the default view
of the page is the design.

Controls are grouped into **Pattern** (formation, colour, density, dot size,
size variation, opacity), **Shape** (region, size, position X/Y, edge softness,
field height), **Centre clear** (strength, size, position X/Y) and **Motion**
(animation, intensity, speed, direction). Rows that don't apply to the current
style or shape hide themselves.

**Size variation** spreads the dot radius across the field — `0` leaves every
dot identical, `1` spans 0.4× to 1.6× of `size`. It is a fixed property of each
dot, not a motion: the value comes from the dot's own grid coordinates via the
R2 low-discrepancy constants, so the field holds a stable mix of weights rather
than dots that grow and shrink. Those constants deliberately differ from the
twinkle phase; sharing them would make the big dots always the bright ones,
which reads as a pattern rather than as texture.

Presets — Figma, Shimmer, Trio, Orb, Halo, Drift — are starting points; the
dropdowns and sliders take it from there. Settings persist to `localStorage`, so
a look survives a reload while options are being compared. **Copy config** gives
you the object above to paste into `index.html`.

Once a look is agreed, drop both `dot-controls` references from `index.html`
(the stylesheet in `<head>` and the script at the bottom), pass the copied
config to `TruDotField.mount`, and delete `js/dot-controls.js`,
`css/dot-controls.css`, `dot-background.html` and `css/dot-background.css`.

## dot-background.html

The same field and the same panel with the page taken away — an empty white
surface, the canvas, and the Background button. Use it to judge the pattern on
its own, without the hero and cards sitting on top of it.

It shares `dot-field.js`, `dot-controls.js` and the panel's `localStorage` key
with `index.html`, so **a look tuned in the sandbox is the look the home page
loads next** — no copying between them. `Copy config` is still how a settled
look becomes the shipped default in `dot-field.js`.

One difference: the sandbox canvas is full bleed, while the home page's is the
content area beside the 72px rail. Every composition value is a fraction of the
canvas, so proportions carry over, but the home page's box is a little narrower
relative to its height. Check anything borderline on `index.html` before calling
it done.

## Icons

Font Awesome Pro is not licensed for this repo, so the node's FA glyphs
(`message`, `gear`, `sparkles`, `arrow-up`, `building`, `user`,
`exclamation-triangle`, `arrow-right`) are inlined as equivalent 24px SVG paths
at the same rendered sizes.
