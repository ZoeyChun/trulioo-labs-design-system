# Demo 3 — Dot playground

The Demo 3 hero, rebuilt as a sandbox for its background: pick a
preset, then push every knob until it looks right.

| | URL |
|--|--|
| Local | `portal-2.0/demo-3/dot-playground/index.html` |
| GitHub Pages | `…/portal-2.0/demo-3/dot-playground/` |

Nothing in this folder is imported by the shipped demo — it's a
standalone page with its own engine.

## It tracks the live hero

Demo 3 has several hero layouts, selected by the `?home=` parameter in
`js/d3-home-skin.js`. **With no parameter you get the globe hero**, so
that is what the playground opens on: full bleed, 420px,
`--surface-inverse`, no orb, a 520px composer, the blurred veil plate,
and a rotating Fibonacci dot globe in place of the older flat field.

| Preset | Background |
|--|--|
| **Shipped hero** | the rotating dot globe, centred — what the hero is today |
| **Globe at the edge** | the same globe moved to the right edge |
| **Flat dot field** | the flat `TruDotField` — its shipped `DARK_CONFIG`, unaltered |

These three carry the shipped *dot* configs. The surface each one
originally sat on — the contained frame and orb of the older hero, the
split copy and gradient of the edge-globe one — lives in the Hero and
Colour groups rather than in the preset; see below.

The hero chrome around the dots is real, not a lookalike. The headline
is the shipped type rule (Tobias, `--font-size-display-md`, weight 400)
and the chat bar is the shipped composer — same markup as
`portal-2.0/demo-3/index.html`, styled by the same `composer/prompt.css`,
`tag.css` and `icon-button.css`. The playground only re-scopes the
dark-hero overrides from `css/d3-home.css` and `css/d3-home-4.css` onto
its own hero. `prompt.js` isn't loaded, so the placeholder doesn't
rotate and the send button stays disabled — the real hero's resting
state.

## What you can change

| Group | Knobs |
|--|--|
| **Pattern** | 12 formations. The **dot globe** (shipped) with dot count, radius, axis tilt, perspective, spin and limb glow; a **globe graticule** of meridians and parallels; and 10 flat lattices — grid, staggered, hex, triangular, diagonal shear, brick, concentric rings, phyllotaxis spiral, radial spokes, wave rows — with spacing and scatter. **Links** joins neighbouring dots into a mesh, which is what draws the graticule's wireframe |
| **Dot** | 10 glyphs (circle, square, diamond, plus, cross, sparkle, triangle, heart, outline ring, dash), size, spread, tilt, rotation, opacity |
| **Colour** | **Surface** — dark / light theme, thirteen backgrounds or **Custom…** for any colour, optionally fading to a second. **Dots** — one colour, a two-colour gradient across X / Y / radius / per dot, or the shipped four-stop globe ramp, plus additive compositing. Every colour takes a swatch, a picker or a typed hex |
| **Region** | 15 silhouettes to cut the pattern to, each positionable and scalable, with an invert switch. On the globe these also move and size the sphere |
| **Clear & fade** | the soft hole under the hero text, and which way the field fades out |
| **Motion** | 15 animations — brightness (shimmer, twinkle, breathe, ripple, sharp pulse rings, scan, cascade, flicker) and displacement (drift, orbit, wave, swirl, jitter). On the globe these ride on top of the spin |
| **Pointer** | spotlight, shadow, magnify, repel, attract, with radius and strength |
| **Hero** | the shape of the surface — full-bleed vs contained, layout, backdrop, height, corner radius, chat width, content / orb / veil toggles |

`Surprise me` shuffles within sane ranges. `P` hides the panel. The
readout under the hero shows live dot count, link count and frame
rate — the numbers that tell you whether a look is affordable.

### Getting around the panel

The controls are split across tabs — **Looks** (presets and your saved
templates) plus one per group — and the strip stays pinned while the
body scrolls, so any group is one click away from anywhere. The tab
you were last on is remembered.

Stacked in one column the controls run to about 4,500px; the tallest
single tab is under 1,000px and most need no scrolling at all at a
normal window height.

A tab that covers two distinct things splits them under a rule —
Colour into **Surface** and **Dots**, Pattern into the lattice and
**Links**. A heading disappears along with its controls, so Links is
simply absent on the dot globe, which has no mesh.

### Reading the panel

Formation, mark and silhouette are picked from **drawn samples**, not
a dropdown of names — "Phyllotaxis spiral" and "Corner wedge" mean
nothing until you have seen one. Each sample is a real
`TruDotLab.sketch()` of that one option with everything else held
flat, so a thumbnail cannot drift away from what the option does; it
runs the same `buildLattice`, `applyMasks` and `drawGlyph` as the
hero. Only the per-formation density differs, because a lattice tuned
for a 420px hero is unreadable at 38px.

Every slider is captioned at both ends (*dense → sparse*, *hard cut →
dissolved*) and the ones whose effect isn't obvious from the name
carry a one-line note. The dropdowns that can't be drawn — animation,
blend, pointer, backdrop, layout — describe the **currently selected**
option underneath, so the explanation is always about the thing in
front of you.

### Presets change the dots, not the page

Every preset leaves the hero exactly as you set it — same dark green
surface, same full-bleed frame, headline and chat bar in the same
place — so switching between them compares backgrounds and only
backgrounds. Dot colours are all picked to read on
`--surface-inverse` (#172d2d).

The single exception is the **backdrop**, which overlays the hero
rather than replacing it, and is the whole point of Planet. Every
preset declares one, so moving off Planet clears it again.

### Saving your own

**Your templates** → **Save current** snapshots whatever is on screen
as a named chip next to the presets. Click a chip to restore it, `×`
to delete (twice — the first click arms it, so a stray hit on a small
target doesn't lose saved work).

Saving asks one question: **include the hero surface?**

- **On** — the snapshot carries the background, theme, layout, height,
  corner, chat width and the orb / veil / content toggles. Restoring
  it puts the whole hero back.
- **Off** — dots only, like the built-in presets. Restoring it drops
  the new field onto whatever hero you are currently looking at, which
  is what you want when comparing several fields on one surface.

A template is a literal snapshot, so unlike a built-in preset it has
no second palette — switching theme moves the surface and leaves a
template's saved colours exactly as they were.

Templates live under their own `localStorage` key
(`d3-dot-playground-templates-v1`), separate from the working session,
so **Reset** never takes them with it. They are per-browser: this is a
scratchpad, not a shared library. To hand a look to someone else, use
**Copy config**.

### Colour by hand

Every colour control — the two dot colours and the custom hero
background — takes input three ways: click a swatch, open the native
picker, or type a hex into the field beside it. The hex box accepts
`38c6a6`, `#38C6A6` or the `#3ca` shorthand, applies live as soon as
what you have typed parses, and flags anything half-finished in red
rather than snapping the field to black.

Colour → Background → **Custom…** opens the same controls for the
surface, with an optional fade to a second colour.

### Light theme

Colour → **Theme** switches the whole surface between dark and light.
Theme and Background stay in sync in both directions: flipping the
theme moves the background, and picking any pale background flips the
theme. A custom background reports its own tone from the colour's
brightness, so typing a pale hex darkens the headline and flips the
backdrops without you having to say so.

Every preset carries a second palette for the light surface, because
dots tuned to glow on #172d2d vanish on #f4f6f4 — the globe drops its
gold-to-mint ramp for teal-to-forest, additive compositing goes off
(it only ever brightens, so on a pale hero it erases), and the
backdrops switch from white light to grey shade. Switching theme
re-reads the preset you are looking at; if you have been turning knobs
by hand there is no preset to re-read, so your colours are left alone
and the swatches are right there.

To put back the surface either of the older heroes sat on, set it
yourself: the contained one is Hero → width **Contained** + corner
**16** + orb **on**; the edge-globe one is Hero → layout **Split**
with Colour → **Teal gradient**.

### From the hero references

Four presets and the options behind them come from reference heroes:

- **Planet** — the `planet` hero backdrop: a huge soft sphere with a
  masked rim light, under a dusting of faint twinkles.
- **Risk grid** — the `block` side-panel region and the `sparkle`
  glyph: a hard-edged slab of white four-point stars on the right.
- **Wire globe** — the `globe` graticule with links on: meridians and
  parallels, square nodes at the intersections.
- **Micro field** — small diamonds at low opacity, heavily scattered,
  cut to a feathered horizontal band. (`heart` is in the glyph list
  too if you want the reference's exact mark.)

Backdrops (`planet`, `halo`, `vignette`) are hero-level and compose
with any dot field.

## Merging a look back

**Copy config** knows which of Demo 3's two background engines your
look belongs to.

**On the dot globe** it hands back the constants at the top of
`js/d3-home-4.js` — `COUNT`, `TILT`, `SPEED` (converted to rad/ms),
`PERSPECTIVE` — plus a comment listing the things the playground can
do that `d3-home-4.js` has no knob for yet (radius, limb, opacity,
glyph, centre, ramp), and the full lab config underneath.

**On a flat field** it hands back a `DARK_CONFIG` block for
`js/d3-home-dots.js`, which drives the flat-field hero. If the look uses
anything the shipped `TruDotField` doesn't have — a new formation, any
glyph but circle, gradients, links, invert, scatter, rotation, pointer
response, additive, upward fade — the header comment names exactly
what would be dropped and the toast says `needs tru-dot-lab.js`. A
clean copy says so instead.

To ship an extended flat look, point the home at `tru-dot-lab.js`
instead of `dot-field.js` (the `mount` signature is identical), or port
the one feature you need back into `dot-field.js`.

## Relationship to the other lab

`portal-2.0/demo-3/home-dot-lab/` is the original panel: the flat-field
hero driven by the shipped `TruDotField`, so whatever it produces
always pastes straight back. Use it for a guaranteed-shippable tweak to
that hero; use this one to find out what's possible.

Settings persist under `localStorage` key `d3-dot-playground-v2`.

## Design rules

- **Every motion is deterministic.** No `Math.random` in the engine —
  a dot's phase comes from its own coordinates, so the field looks
  identical on every load, resize and machine. The shipped globe seeds
  its twinkle with `Math.random`; this one uses a hash instead, which
  is the one intentional difference from `d3-home-4.js`.
- **Amplitudes stay small.** Flat displacement is capped at a fraction
  of one cell, so dots sway inside their own square and never swap
  places.
- **`prefers-reduced-motion` is respected** — the spin stops and the
  field falls back to its static composition.
