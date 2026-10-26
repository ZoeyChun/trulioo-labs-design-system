# Demo 3 — Hero options

The three final hero surfaces, each carrying the same dot field.
A decision page, not a playground: pick one, copy its config.

| | URL |
|--|--|
| Local | `portal-2.0/demo-3/hero-options/index.html` |
| GitHub Pages | `…/portal-2.0/demo-3/hero-options/` |

## The three

**The background is the only variable.** One field across all three:
60px square grid, teal `#0e8a78` circles at 1.6px and 45% opacity, a
0.6 clear hole at (0.5, 0.45), a 0.10 link mesh, cascade at 0.08/s,
and a 180px spotlight on hover.

| Surface | | |
|--|--|--|
| **Mint wash** | `#e6f1ec` | quietest — teal at 45% on pale green is close to a watermark |
| **Forest dark** | `#172d2d` | the shipped hero surface; dots read as light, so the field carries the most weight |
| **White** | `#ffffff` | the most contrast between dot and ground, so the grid and mesh are the most legible |

Each card is labelled by its surface — swatch, name, hex. There are no
A/B/C letters: the colour is the option, so naming it twice adds
nothing.

## How it works

The three heroes are built from **one template function** in
`js/options.js`, not three copies of the markup — a comparison is
worthless if the things being compared differ by accident. All three
mount the same `FIELD` object; only the surface differs, so the page
cannot drift from the claim that the background is the only variable.

The hero chrome comes from `../dot-playground/css/playground.css`, so
these heroes stay identical to the ones the configs were tuned in. The
field engine is `../dot-playground/js/tru-dot-lab.js`.

**Hide the copy** (top right) blanks the headline and chat bar without
resizing anything, so you can judge the fields on their own and the
comparison doesn't shift under you. Hover any hero for its pointer
response.

**Copy config** emits the shared 40-key `DARK_CONFIG` in the engine's
own key order, with that card's surface named in the header comment —
the background is a hero setting, not part of the field config, so it
would otherwise be lost on the way back.

## Shipping one

All three need `js/tru-dot-lab.js`. The shipped `TruDotField` has no
`cascade`, no link mesh and no pointer response, and would silently
drop all three along with `fadeDir`.

To ship one, either point the home at `tru-dot-lab.js` instead of
`dot-field.js` — the `mount` signature is identical — or port those
features into `dot-field.js`.

Note that these are flat-field configs, so they replace the dot
background of the **older** hero (`js/d3-home-dots.js`), not the
rotating globe the hero currently ships.
