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

Demo 3 now has five home layouts, picked by `?home=` in
`js/d3-home-skin.js`. **With no parameter you get home 4**, so that is
what the playground opens on: full bleed, 420px, `--surface-inverse`,
no orb, a 520px composer, the blurred veil plate, and a rotating
Fibonacci dot globe instead of the old flat field.

| Preset | Shipped as | Background |
|--|--|--|
| **Home 4 (shipped)** | default, `?home=4` | rotating dot globe, centred |
| **Home 5 (side globe)** | `?home=5` | the same globe moved to the right edge |
| **Home 1 (flat dots)** | `?home=1`, `?home=dark` | the flat `TruDotField` — its shipped `DARK_CONFIG`, unaltered |

These three carry the shipped *dot* configs. Their shipped hero chrome
(home 1's contained frame and orb, home 5's split copy and gradient)
is in the Hero group rather than the preset — see below. Home 2 is the
light skin and home 3 is home 1 full-bleed, both a Hero-group change
away.

The hero chrome around the dots is real, not a lookalike. The headline
is the shipped type rule (Tobias, `--font-size-display-md`, weight 400)
and the chat bar is the shipped composer — same markup as
`portal-2.0/demo-3/index.html`, styled by the same `composer/prompt.css`,
`tag.css` and `icon-button.css`. The playground only re-scopes the
dark-home overrides from `css/d3-home.css` and `css/d3-home-4.css` onto
its own hero. `prompt.js` isn't loaded, so the placeholder doesn't
rotate and the send button stays disabled — the real hero's resting
state.

## What you can change

| Group | Knobs |
|--|--|
| **Pattern** | 12 formations. The **dot globe** (shipped) with dot count, radius, axis tilt, perspective, spin and limb glow; a **globe graticule** of meridians and parallels; and 10 flat lattices — grid, staggered, hex, triangular, diagonal shear, brick, concentric rings, phyllotaxis spiral, radial spokes, wave rows — with spacing and scatter |
| **Dot** | 10 glyphs (circle, square, diamond, plus, cross, sparkle, triangle, heart, outline ring, dash), size, spread, tilt, rotation, opacity |
| **Colour** | one colour, a two-colour gradient across X / Y / radius / per dot, or the shipped four-stop globe ramp — plus additive compositing |
| **Region** | 15 silhouettes to cut the pattern to, each positionable and scalable, with an invert switch. On the globe these also move and size the sphere |
| **Clear & fade** | the soft hole under the hero text, and which way the field fades out |
| **Links** | lines between neighbouring dots — this is what draws the graticule's wireframe |
| **Motion** | 15 animations — brightness (shimmer, twinkle, breathe, ripple, sharp pulse rings, scan, cascade, flicker) and displacement (drift, orbit, wave, swirl, jitter). On the globe these ride on top of the spin |
| **Pointer** | spotlight, shadow, magnify, repel, attract, with radius and strength |
| **Hero** | background, full-bleed vs contained, layout, backdrop, height, corner radius, chat width, content / orb / veil toggles |

`Surprise me` shuffles within sane ranges. `P` hides the panel. The
readout under the hero shows live dot count, link count and frame
rate — the numbers that tell you whether a look is affordable.

### Presets change the dots, not the page

Every preset leaves the hero exactly as you set it — same dark green
surface, same full-bleed frame, headline and chat bar in the same
place — so switching between them compares backgrounds and only
backgrounds. Dot colours are all picked to read on
`--surface-inverse` (#172d2d).

The single exception is the **backdrop**, which overlays the hero
rather than replacing it, and is the whole point of Planet. Every
preset declares one, so moving off Planet clears it again.

To see home 1's or home 5's real chrome, set it yourself in the Hero
group — home 1 is width **Contained** + corner **16** + orb **on**;
home 5 is layout **Split** + the **Gradient (home 5)** background.

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
`js/d3-home-dots.js` (the home 1 / home 3 hero). If the look uses
anything the shipped `TruDotField` doesn't have — a new formation, any
glyph but circle, gradients, links, invert, scatter, rotation, pointer
response, additive, upward fade — the header comment names exactly
what would be dropped and the toast says `needs tru-dot-lab.js`. A
clean copy says so instead.

To ship an extended flat look, point the home at `tru-dot-lab.js`
instead of `dot-field.js` (the `mount` signature is identical), or port
the one feature you need back into `dot-field.js`.

## Relationship to the other lab

`portal-2.0/demo-3/home-dot-lab/` is the original panel: the home 1
hero driven by the shipped `TruDotField`, so whatever it produces
always pastes straight back. Use it for a guaranteed-shippable tweak to
home 1; use this one to find out what's possible.

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
