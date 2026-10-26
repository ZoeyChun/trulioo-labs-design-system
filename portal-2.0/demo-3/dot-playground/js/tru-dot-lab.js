/* ============================================================
   TruDotLab — exploration engine for the hero dot background.
   ============================================================

   Covers both background systems Demo 3 ships:

     sphere   the rotating Fibonacci dot globe that Demo 3 now
              ships as its default hero (js/d3-home-4.js)
     the rest a superset of the flat TruDotField behind the older
              hero (demo-2 js/dot-field.js)

   Kept as its own file so the playground can grow without touching
   either shipped engine.

   Layers. A dot is placed, shaped, cut, coloured and moved by six
   independent stages — which is what makes the field composable
   rather than a pile of special cases:

     formation  the lattice — where dots sit
     glyph      what each dot is drawn as
     shape      the region they're allowed to occupy
     clear      a soft hole punched through it, under the hero text
     motion     how brightness or position changes over time
     pointer    how the field answers the cursor

   DESIGN RULE — every motion is DETERMINISTIC. No Math.random
   anywhere: a dot's phase comes from its own grid coordinates, so
   the field looks identical on every load, resize and machine.
   (The shipped globe seeds its twinkle with Math.random; this one
   uses a hash instead. Same texture, reproducible.) Pointer
   response is the only live input, and it is additive.

   Usage:
     var field = TruDotLab.mount(canvasEl, { style: 'twinkle' });
     field.set({ spacing: 48 });
     field.config();
     field.destroy();
   ------------------------------------------------------------------ */

(function (global) {
  'use strict';

  var TAU = Math.PI * 2;

  /* ----------------------------------------------------------------
     Option catalogues. `id` is the stored value, `label` is what the
     panel shows, and the order here is the order in each dropdown.
     ---------------------------------------------------------------- */

  var FORMATIONS = [
    { id: 'sphere',    label: 'Dot globe (shipped)' },
    { id: 'grid',      label: 'Square grid' },
    { id: 'staggered', label: 'Staggered (Figma)' },
    { id: 'hex',       label: 'Hex' },
    { id: 'triangle',  label: 'Triangular' },
    { id: 'diagonal',  label: 'Diagonal shear' },
    { id: 'brick',     label: 'Brick' },
    { id: 'rings',     label: 'Concentric rings' },
    { id: 'spiral',    label: 'Phyllotaxis spiral' },
    { id: 'radial',    label: 'Radial spokes' },
    { id: 'wave',      label: 'Wave rows' },
    { id: 'globe',     label: 'Globe graticule' }
  ];

  /* Formations that live on a sphere and are projected every frame. */
  function is3d(formation) { return formation === 'sphere'; }

  var GLYPHS = [
    { id: 'circle',   label: 'Circle' },
    { id: 'square',   label: 'Square' },
    { id: 'diamond',  label: 'Diamond' },
    { id: 'plus',     label: 'Plus' },
    { id: 'cross',    label: 'Cross' },
    { id: 'star4',    label: 'Sparkle' },
    { id: 'triangle', label: 'Triangle' },
    { id: 'heart',    label: 'Heart' },
    { id: 'ring',     label: 'Ring (outline)' },
    { id: 'dash',     label: 'Dash' }
  ];

  var SHAPES = [
    { id: 'full',     label: 'Full bleed' },
    { id: 'circle',   label: 'Single circle' },
    { id: 'square',   label: 'Square' },
    { id: 'block',    label: 'Side panel' },
    { id: 'cluster',  label: 'Three circles' },
    { id: 'pair',     label: 'Two circles' },
    { id: 'blob',     label: 'Blob' },
    { id: 'blobs',    label: 'Two blobs' },
    { id: 'ring',     label: 'Ring' },
    { id: 'band',     label: 'Diagonal band' },
    { id: 'arch',     label: 'Arc sweep' },
    { id: 'wave',     label: 'Wave edge' },
    { id: 'corner',   label: 'Corner wedge' },
    { id: 'vignette', label: 'Vignette' },
    { id: 'tri',      label: 'Triangle' }
  ];

  var STYLES = [
    { id: 'static',          label: 'Static' },
    { id: 'shimmer',         label: 'Shimmer' },
    { id: 'twinkle',         label: 'Twinkle' },
    { id: 'shimmer-twinkle', label: 'Shimmer + twinkle' },
    { id: 'breathe',         label: 'Breathe' },
    { id: 'ripple',          label: 'Ripple' },
    { id: 'pulse',           label: 'Pulse rings (sharp)' },
    { id: 'scan',            label: 'Scan line' },
    { id: 'cascade',         label: 'Cascade' },
    { id: 'flicker',         label: 'Flicker' },
    { id: 'drift',           label: 'Drift' },
    { id: 'orbit',           label: 'Orbit' },
    { id: 'wave',            label: 'Wave (displace)' },
    { id: 'swirl',           label: 'Swirl' },
    { id: 'jitter',          label: 'Jitter' }
  ];

  var POINTERS = [
    { id: 'off',     label: 'Off' },
    { id: 'glow',    label: 'Spotlight' },
    { id: 'repel',   label: 'Repel' },
    { id: 'attract', label: 'Attract' },
    { id: 'dim',     label: 'Shadow' },
    { id: 'grow',    label: 'Magnify' }
  ];

  /* How the two colours are mixed across the field. */
  var BLENDS = [
    { id: 'none',   label: 'Single colour' },
    { id: 'globe',  label: 'Globe ramp (shipped)' },
    { id: 'x',      label: 'Left → right' },
    { id: 'y',      label: 'Top → bottom' },
    { id: 'radial', label: 'Centre → edge' },
    { id: 'random', label: 'Per dot' }
  ];

  /* The four-stop latitude ramp from js/d3-home-4.js, top to bottom. */
  var GLOBE_STOPS = [
    [255, 209, 102],
    [90, 199, 202],
    [158, 223, 182],
    [90, 199, 202]
  ];

  /* The three-stop ramp the edge-mounted globe uses. */
  var GLOBE_STOPS_SIDE = [
    [181, 205, 146],
    [144, 234, 192],
    [144, 234, 192]
  ];

  /* Trulioo ramp, the two sampled from the Figma tiles, and the globe
     accents. */
  var COLORS = [
    { id: 'moss',   label: 'Moss',    value: '#587965' },
    { id: 'sage',   label: 'Sage',    value: '#8a9a90' },
    { id: 'mist',   label: 'Mist',    value: '#c5cec8' },
    { id: 'teal',   label: 'Teal',    value: '#0e8a78' },
    { id: 'spring', label: 'Spring',  value: '#38c6a6' },
    { id: 'mint',   label: 'Mint',    value: '#90eac0' },
    { id: 'gold',   label: 'Gold',    value: '#ffd166' },
    { id: 'forest', label: 'Forest',  value: '#004c45' },
    { id: 'slate',  label: 'Slate',   value: '#617269' },
    { id: 'violet', label: 'Violet',  value: '#592d80' },
    { id: 'white',  label: 'White',   value: '#ffffff' }
  ];

  /* The shipped home-4 globe, knob for knob. */
  var DEFAULTS = {
    /* lattice */
    formation:  'sphere',
    spacing:    22,     /* px between dot centres — flat formations only */
    jitter:     0,      /* deterministic scatter, 0–1 of a cell, any formation */
    count:      2000,   /* dots on the sphere — sphere / globe only */
    orbScale:   1,      /* globe radius, 1 = the shipped min(46%w, 85%h) */
    tilt:       23,     /* globe axis tilt, degrees */
    perspective: 2.6,   /* smaller = more dramatic foreshortening */
    spin:       0.0048, /* globe revolutions per second */
    limb:       1,      /* limb brightening, 0 = flat disc of dots */

    /* glyph */
    glyph:      'circle',
    size:       1,      /* radius in px */
    sizeVary:   0,      /* per-dot radius spread, 0–1 */
    sizeTilt:   0,      /* −1 … 1 — bigger at the top / at the bottom */
    rotate:     0,      /* glyph rotation, degrees */

    /* colour */
    color:      '#90eac0',
    color2:     '#ffd166',
    blend:      'globe',
    opacity:    1,
    additive:   1,      /* 'lighter' compositing — dots add where they overlap */

    /* region */
    shape:      'full',
    shapeScale: 1.8,
    shapeX:     0.5,
    shapeY:     0.5,
    feather:    0.34,
    invert:     0,      /* 1 = keep everything OUTSIDE the region */

    clear:      0,
    clearSize:  0.47,
    clearX:     0.5,
    clearY:     0.5,

    fade:       0.82,   /* height fraction where the field has faded out */
    fadeDir:    'none', /* down | up | none */

    /* links */
    links:      0,      /* line opacity, 0 = off */
    linkWidth:  1,

    /* motion */
    style:      'twinkle',
    intensity:  0.33,
    speed:      0.16,
    angle:      35,

    /* pointer */
    pointer:    'off',
    pointerR:   160,
    pointerS:   1
  };

  /* Named looks for the preset row. Each `cfg` is a full patch over
     DEFAULTS, so a preset always lands somewhere coherent.

     A preset changes the DOTS and nothing else. The hero keeps the
     home-4 surface — dark green, full bleed, centred copy — so that
     switching between presets compares backgrounds and only
     backgrounds. The one exception is `heroBackdrop`, which is an
     overlay on the same hero rather than a change to it, and is part
     of the look for Planet. Every preset states it, so moving off
     Planet clears it again.

     Dot colours are therefore all chosen to read on --surface-inverse
     (#172d2d). The older contained hero and the edge-globe hero set
     their own chrome, which lives in the Hero group rather than in
     a preset: Contained width + corner 16 + orb on for the first,
     Split layout + the teal gradient for the second. */
  var PRESETS = [
    {
      id: 'shipped', label: 'Shipped hero',
      cfg: {},
      light: { blend: 'y', color: '#0e8a78', color2: '#004c45', opacity: 0.85, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'edgeglobe', label: 'Globe at the edge',
      cfg: {
        formation: 'sphere', count: 1100, orbScale: 1.35, shapeX: 0.88, shapeY: 0.49,
        blend: 'globe', color: '#90eac0', size: 1.25, opacity: 1, additive: 1,
        style: 'twinkle', intensity: 0.33, speed: 0.16, spin: 0.0048
      },
      light: { blend: 'y', color: '#0e8a78', color2: '#004c45', opacity: 0.85, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      /* The shipped DARK_CONFIG of js/d3-home-dots.js, unaltered — this
         is the preset that round-trips through Copy config. */
      id: 'flatfield', label: 'Flat dot field',
      cfg: {
        formation: 'rings', spacing: 22, glyph: 'circle', size: 2.4, sizeVary: 1,
        color: '#0e8a78', blend: 'none', opacity: 0.45, additive: 0,
        shape: 'ring', shapeScale: 3, shapeX: 0.5, shapeY: 0.8, feather: 0.76,
        clear: 0, clearSize: 0.81, clearY: 0.52, fade: 0.82, fadeDir: 'down',
        style: 'ripple', intensity: 0.6, speed: 0.6, angle: 35
      },
      light: { color: '#0e8a78', opacity: 0.55, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'figma', label: 'Figma tiles',
      cfg: {
        formation: 'staggered', spacing: 26, glyph: 'circle', size: 2,
        sizeVary: 0, color: '#8a9a90', blend: 'none', opacity: 0.55, additive: 0,
        shape: 'full', clear: 0, fade: 1, fadeDir: 'none',
        style: 'static', links: 0, jitter: 0, pointer: 'off'
      },
      light: { color: '#6f8077', opacity: 0.6, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },

    /* ---- drawn from the hero references ------------------------- */
    {
      /* SPACEFOX: almost nothing — a huge soft sphere of ambient light
         and a dusting of dots over it. The look is the backdrop. */
      id: 'planet', label: 'Planet',
      cfg: {
        formation: 'grid', spacing: 38, jitter: 0.7, glyph: 'circle',
        size: 1.1, sizeVary: 0.8, color: '#ffffff', blend: 'none',
        opacity: 0.16, additive: 1, shape: 'full', clear: 0,
        fade: 1, fadeDir: 'none', links: 0,
        style: 'twinkle', intensity: 1, speed: 0.08
      },
      light: { color: '#3d524f', opacity: 0.26, additive: 0 },
      hero: { heroBackdrop: 'planet' }
    },
    {
      /* Business Risk Network: a hard-edged block of white sparkles
         parked against the right edge, dead regular, no motion. */
      id: 'riskgrid', label: 'Risk grid',
      cfg: {
        formation: 'grid', spacing: 46, jitter: 0, glyph: 'star4',
        size: 5, sizeVary: 0, rotate: 0, color: '#ffffff', blend: 'none',
        opacity: 0.9, additive: 0, shape: 'block', shapeScale: 1.25,
        shapeX: 0.79, shapeY: 0.5, feather: 0.02, clear: 0,
        fade: 1, fadeDir: 'none', links: 0, style: 'static'
      },
      light: { color: '#04245c', opacity: 0.9, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      /* THE GRID: a wireframe graticule rather than a solid globe —
         links carry the look, the dots are just the intersections. */
      id: 'wireglobe', label: 'Wire globe',
      cfg: {
        formation: 'globe', spacing: 46, orbScale: 1.5, glyph: 'square',
        size: 1.5, sizeVary: 0, color: '#38c6a6', blend: 'none',
        opacity: 0.9, additive: 0, shape: 'full', clear: 0,
        fade: 1, fadeDir: 'none', shapeX: 0.74, shapeY: 0.52,
        links: 0.2, linkWidth: 1, style: 'static'
      },
      light: { color: '#0e8a78', opacity: 0.9, links: 0.22, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      /* Patensify: a wide, pale drift of tiny glyphs, densest through
         the middle and feathered away top and bottom. */
      id: 'microfield', label: 'Micro field',
      cfg: {
        formation: 'grid', spacing: 27, jitter: 0.62, glyph: 'diamond',
        size: 2.4, sizeVary: 0.9, color: '#c5cec8', color2: '#90eac0',
        blend: 'random', opacity: 0.55, additive: 0, shape: 'band',
        shapeScale: 1.15, shapeX: 0.5, shapeY: 0.52, feather: 0.8,
        angle: 0, clear: 0.4, clearSize: 0.26, clearY: 0.5,
        fade: 1, fadeDir: 'none', links: 0, style: 'twinkle',
        intensity: 0.7, speed: 0.1
      },
      light: { color: '#c3c7d0', color2: '#9aa1ad', opacity: 0.75, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },

    /* ---- exploratory -------------------------------------------- */
    {
      id: 'constellation', label: 'Constellation',
      cfg: {
        formation: 'grid', spacing: 46, jitter: 0.9, glyph: 'circle',
        size: 1.8, sizeVary: 1, color: '#c5cec8', color2: '#38c6a6',
        blend: 'radial', opacity: 0.7, additive: 0, shape: 'full', clear: 0.55,
        clearSize: 0.4, clearY: 0.42, fade: 1, fadeDir: 'none',
        links: 0.12, linkWidth: 1, style: 'twinkle', intensity: 0.9,
        speed: 0.25, pointer: 'glow', pointerR: 200, pointerS: 1
      },
      light: { color: '#617269', color2: '#0e8a78', opacity: 0.6, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'aurora', label: 'Aurora band',
      cfg: {
        formation: 'hex', spacing: 20, glyph: 'circle', size: 2,
        sizeVary: 0.6, color: '#38c6a6', color2: '#90eac0', blend: 'x',
        opacity: 0.6, additive: 0, shape: 'band', shapeScale: 1.4, shapeY: 0.65,
        feather: 0.8, clear: 0, fade: 1, fadeDir: 'none',
        style: 'shimmer', intensity: 1, speed: 0.18, angle: 28
      },
      light: { color: '#0e8a78', color2: '#004c45', opacity: 0.6, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'halo', label: 'Halo',
      cfg: {
        formation: 'rings', spacing: 18, glyph: 'circle', size: 1.8,
        sizeVary: 0.8, color: '#38c6a6', blend: 'none', opacity: 0.4,
        additive: 0, shape: 'ring', shapeScale: 2.2, shapeY: 0.55,
        feather: 0.6, clear: 0, fade: 1, fadeDir: 'none',
        style: 'pulse', intensity: 0.8, speed: 0.22
      },
      light: { color: '#0e8a78', opacity: 0.5, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'circuit', label: 'Circuit',
      cfg: {
        formation: 'grid', spacing: 34, glyph: 'square', size: 1.6,
        sizeVary: 0, color: '#38c6a6', blend: 'none', opacity: 0.45,
        additive: 0, shape: 'full', clear: 0.6, clearSize: 0.42, clearY: 0.45,
        fade: 1, fadeDir: 'none', links: 0.1, linkWidth: 1,
        style: 'cascade', intensity: 1, speed: 0.35, pointer: 'glow', pointerR: 180
      },
      light: { color: '#0e8a78', opacity: 0.55, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'mist', label: 'Soft mist',
      cfg: {
        formation: 'staggered', spacing: 18, jitter: 1, glyph: 'circle',
        size: 1.4, sizeVary: 1, color: '#c5cec8', blend: 'none', opacity: 0.35,
        additive: 0, shape: 'blobs', shapeScale: 1.9, shapeY: 0.6, feather: 0.85,
        clear: 0.45, clearSize: 0.4, fade: 1, fadeDir: 'none',
        style: 'drift', intensity: 0.8, speed: 0.12
      },
      light: { color: '#8a9a90', opacity: 0.5, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'topo', label: 'Topography',
      cfg: {
        formation: 'rings', spacing: 14, glyph: 'dash', size: 2.6,
        sizeVary: 0.3, rotate: 0, color: '#38c6a6', blend: 'none', opacity: 0.4,
        additive: 0, shape: 'full', shapeScale: 2, shapeY: 0.9, clear: 0.5,
        clearSize: 0.38, clearY: 0.42, fade: 1, fadeDir: 'none',
        style: 'swirl', intensity: 0.5, speed: 0.08
      },
      light: { color: '#0e8a78', opacity: 0.45, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'rain', label: 'Rain',
      cfg: {
        formation: 'brick', spacing: 24, glyph: 'dash', size: 3,
        sizeVary: 0.6, rotate: 90, color: '#90eac0', color2: '#38c6a6',
        blend: 'y', opacity: 0.45, additive: 0, shape: 'full', clear: 0.7,
        clearSize: 0.45, clearY: 0.45, fade: 1, fadeDir: 'none',
        style: 'cascade', intensity: 1, speed: 0.5, angle: 90
      },
      light: { color: '#0e8a78', color2: '#004c45', opacity: 0.5, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'bloom', label: 'Bloom',
      cfg: {
        formation: 'spiral', spacing: 15, glyph: 'circle', size: 2,
        sizeVary: 0.9, color: '#90eac0', color2: '#0e8a78', blend: 'radial',
        opacity: 0.55, additive: 0, shape: 'circle', shapeScale: 1.6, shapeY: 0.6,
        feather: 0.7, clear: 0.4, clearSize: 0.3, fade: 1, fadeDir: 'none',
        style: 'orbit', intensity: 0.7, speed: 0.1
      },
      light: { color: '#0e8a78', color2: '#004c45', opacity: 0.6, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'spokes', label: 'Spokes',
      cfg: {
        formation: 'radial', spacing: 20, glyph: 'diamond', size: 2.2,
        sizeVary: 0.7, color: '#38c6a6', blend: 'none', opacity: 0.4,
        additive: 0, shape: 'vignette', shapeScale: 2.4, shapeY: 0.7,
        feather: 0.75, clear: 0.5, clearSize: 0.33, clearY: 0.45,
        fade: 1, fadeDir: 'none', style: 'ripple', intensity: 0.7, speed: 0.3
      },
      light: { color: '#0e8a78', opacity: 0.45, additive: 0 },
      hero: { heroBackdrop: 'none' }
    },
    {
      id: 'gridpulse', label: 'Grid pulse',
      cfg: {
        formation: 'grid', spacing: 28, glyph: 'plus', size: 3,
        sizeVary: 0, color: '#38c6a6', blend: 'none', opacity: 0.35,
        additive: 0, shape: 'full', clear: 0.65, clearSize: 0.44, clearY: 0.45,
        fade: 1, fadeDir: 'none', style: 'breathe', intensity: 0.9, speed: 0.2,
        pointer: 'grow', pointerR: 170, pointerS: 1
      },
      light: { color: '#0e8a78', opacity: 0.5, additive: 0 },
      hero: { heroBackdrop: 'none' }
    }
  ];

  /* ----------------------------------------------------------------
     Small maths helpers
     ---------------------------------------------------------------- */

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function frac(x) { return x - Math.floor(x); }

  /* Hermite ease — every mask edge in here uses it, so nothing ever
     cuts off hard. */
  function smoothstep(edge0, edge1, x) {
    var t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function hexToRgb(hex) {
    var h = String(hex).replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return { r: 138, g: 154, b: 144 };
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  /* Two independent low-discrepancy hashes over the grid coordinates.
     They have to differ: sharing one would make the big dots always be
     the bright ones, which reads as a pattern rather than as texture. */
  function hashA(c, r) { return frac(c * 0.7548776662 + r * 0.5698402909); }
  function hashB(c, r) { return frac(c * 0.3819660113 + r * 0.6180339887); }

  /* ----------------------------------------------------------------
     Lattice

     Runs once per resize or structural change, never per frame. Each
     point keeps its grid coordinates (c, r) so every animation can
     derive a stable phase from them. Sphere points also keep their
     unit-sphere position (X, Y, Z), which the draw loop projects.
     ---------------------------------------------------------------- */
  function buildLattice(w, h, cfg) {
    var pts = [];
    var s = Math.max(4, cfg.spacing);
    var cx = w * cfg.shapeX, cy = h * cfg.shapeY;
    var i, k, x, y;

    /* Scatter is applied here, to every flat formation alike: each dot
       keeps its cell but is nudged by its own pair of hashes.
       Deterministic, and capped at one cell, so the lattice loosens
       into an even spread rather than clumping. */
    var jit = clamp(cfg.jitter, 0, 1) * s;

    function push(px, py, c, r) {
      if (jit) {
        px += (hashA(c, r) - 0.5) * jit;
        py += (hashB(c, r) - 0.5) * jit;
      }
      pts.push({ x: px, y: py, c: c, r: r, m: 1, d: 0, v: 0, u: 0 });
    }

    if (cfg.formation === 'sphere') {
      /* Fibonacci sphere, as js/d3-home-4.js builds it: walk y evenly
         from pole to pole and step the angle by the golden angle, which
         drops every new point into the largest remaining gap. The
         result is an even covering with no seams and no pole clumping.
         Positions are unit-sphere; the draw loop spins and projects. */
      var n = Math.max(50, Math.round(cfg.count));
      var golden = Math.PI * (3 - Math.sqrt(5));
      for (i = 0; i < n; i++) {
        var sy = 1 - (i / (n - 1)) * 2;
        var sr = Math.sqrt(Math.max(0, 1 - sy * sy));
        var th = golden * i;
        var p = {
          X: Math.cos(th) * sr,
          Y: sy,
          Z: Math.sin(th) * sr,
          x: cx, y: cy,
          c: i, r: 0,
          m: 1, d: 0,
          v: hashA(i, 0),
          /* Latitude is invariant under the spin (it turns about Y), so
             the colour ramp can be resolved once, here. */
          u: (1 - sy) / 2
        };
        pts.push(p);
      }
      return pts;
    }

    if (cfg.formation === 'globe') {
      /* Orthographic graticule — meridians and parallels on a tilted
         sphere, with the dots on the intersections. Turning on links
         then draws the wireframe, because (c, r) are the longitude and
         latitude indices and links join neighbours in both.
         Latitudes are offset half a step to miss the poles, where every
         meridian would stack on a single point. */
      var gr = Math.min(w, h) * 0.5 * clamp(cfg.orbScale, 0.2, 4) * 1.5;
      var nLon = clamp(Math.round(TAU * gr / (s * 3)), 6, 64);
      var nLat = clamp(Math.round(Math.PI * gr / (s * 3)), 4, 40);
      var gt = cfg.tilt * Math.PI / 180;
      var gct = Math.cos(gt), gst = Math.sin(gt);
      for (var li = 0; li < nLat; li++) {
        var lat = -Math.PI / 2 + ((li + 0.5) / nLat) * Math.PI;
        var cl = Math.cos(lat), sl = Math.sin(lat);
        for (var lo = 0; lo < nLon; lo++) {
          var lon = (lo / nLon) * TAU;
          var gX = cl * Math.sin(lon);
          var gZ = cl * Math.cos(lon);
          var gY = sl * gct - gZ * gst;
          x = cx + gX * gr;
          y = cy - gY * gr;
          if (x < -s * 2 || x > w + s * 2 || y < -s * 2 || y > h + s * 2) continue;
          push(x, y, lo, li);
        }
      }
      pts.lonCount = nLon;
      return pts;
    }

    if (cfg.formation === 'rings' || cfg.formation === 'radial') {
      var maxR = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) + s;
      var ring = 0;
      /* Spokes keep a fixed count per ring so the dots line up radially;
         rings scale the count with circumference so density is even. */
      var spokes = Math.max(8, Math.round(TAU * maxR / (s * 2.2)));
      for (var rad = s; rad <= maxR; rad += s) {
        ring++;
        var count = cfg.formation === 'radial'
          ? spokes
          : Math.max(6, Math.round(TAU * rad / s));
        for (k = 0; k < count; k++) {
          var a = (k / count) * TAU;
          x = cx + Math.cos(a) * rad;
          y = cy + Math.sin(a) * rad;
          if (x < -s || x > w + s || y < -s || y > h + s) continue;
          push(x, y, k, ring);
        }
      }
      return pts;
    }

    if (cfg.formation === 'spiral') {
      /* Phyllotaxis, flat: the same golden angle as the sphere. */
      var span = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy));
      var sn = Math.min(6000, Math.round((span / s) * (span / s) * Math.PI));
      var sgolden = Math.PI * (3 - Math.sqrt(5));
      for (i = 1; i <= sn; i++) {
        var pr = s * 0.62 * Math.sqrt(i);
        var pa = i * sgolden;
        x = cx + Math.cos(pa) * pr;
        y = cy + Math.sin(pa) * pr;
        if (x < -s || x > w + s || y < -s || y > h + s) continue;
        push(x, y, i, Math.round(pr / s));
      }
      return pts;
    }

    /* Everything else is a row/column lattice with a per-row offset. */
    var rowH = s;
    if (cfg.formation === 'hex') rowH = s * 0.8660254;
    if (cfg.formation === 'triangle') rowH = s * 0.8660254;

    var rows = Math.ceil(h / rowH) + 2;
    var cols = Math.ceil(w / s) + 2;

    for (var row = -1; row < rows; row++) {
      for (var col = -1; col < cols; col++) {
        var ox = 0, oy = 0;
        switch (cfg.formation) {
          case 'staggered':
          case 'hex':
          case 'triangle':
          case 'brick':
            ox = (row & 1) ? s / 2 : 0;
            break;
          case 'diagonal':
            /* Three-step shear: reads as diagonal lines, still tiles. */
            ox = (((row % 3) + 3) % 3) * (s / 3);
            break;
          case 'wave':
            /* Rows bend along a fixed sine — a standing wave, not motion. */
            oy = Math.sin((col * s) / (s * 6)) * s * 0.55;
            break;
        }
        if (cfg.formation === 'brick' && (row & 1)) oy = 0;
        push(col * s + ox, row * rowH + oy, col, row);
      }
    }
    return pts;
  }

  /* ----------------------------------------------------------------
     Region mask

     Coverage 0–1 for a point, in units of R — half the shorter canvas
     side times shapeScale — measured from (shapeX, shapeY). Expressing
     every shape this way means moving or resizing a layout never means
     editing the shape itself.
     ---------------------------------------------------------------- */
  function regionCoverage(px, py, R, cfg, dir) {
    var f = clamp(cfg.feather, 0.01, 0.9);
    var d, rr, i, best, ang;

    function disc(ox, oy, rad) {
      var dx = px - ox * R, dy = py - oy * R;
      var dist = Math.hypot(dx, dy);
      var edge = rad * R;
      return 1 - smoothstep(edge * (1 - f), edge, dist);
    }

    switch (cfg.shape) {
      case 'circle':
        return disc(0, 0, 0.92);

      case 'square':
        d = Math.max(Math.abs(px), Math.abs(py));
        return 1 - smoothstep(R * (1 - f), R, d);

      case 'block':
        /* A rectangle twice as tall as it is wide — the side panel of
           dots. Normalised before the feather so the edge softness is
           the same on the short side as on the long one, and so a tiny
           feather reads as the hard cut the reference uses. */
        d = Math.max(Math.abs(px) / (R * 0.52), Math.abs(py) / (R * 1.05));
        return 1 - smoothstep(1 - f, 1, d);

      case 'cluster':
        best = disc(-0.42, -0.15, 0.60);
        best = Math.max(best, disc(0.42, -0.15, 0.54));
        return Math.max(best, disc(0.00, 0.45, 0.57));

      case 'pair':
        best = disc(-0.40, -0.17, 0.56);
        return Math.max(best, disc(0.40, 0.17, 0.56));

      case 'blob':
        d = Math.hypot(px, py);
        ang = Math.atan2(py, px);
        rr = R * (0.80 + 0.15 * Math.sin(3 * ang + 0.9) + 0.07 * Math.sin(5 * ang - 2.1));
        return 1 - smoothstep(rr * (1 - f), rr, d);

      case 'blobs':
        best = 0;
        for (i = 0; i < 2; i++) {
          var bx = px - (i ? 0.38 : -0.38) * R;
          var by = py - (i ? 0.24 : -0.24) * R;
          var bd = Math.hypot(bx, by);
          var ba = Math.atan2(by, bx);
          var br = R * (0.52 + 0.12 * Math.sin(3 * ba + (i ? 2.4 : 0.6)) + 0.06 * Math.sin(5 * ba));
          best = Math.max(best, 1 - smoothstep(br * (1 - f), br, bd));
        }
        return best;

      case 'ring':
        d = Math.hypot(px, py);
        return 1 - smoothstep(R * 0.26 * (1 - f), R * 0.26, Math.abs(d - R * 0.74));

      case 'band':
        /* A stripe on the normal of `angle`, so it turns with shimmer. */
        return 1 - smoothstep(R * 0.58 * (1 - f), R * 0.58,
          Math.abs(-px * dir.y + py * dir.x));

      case 'arch':
        d = Math.hypot(px, py);
        var band = 1 - smoothstep(R * 0.22 * (1 - f), R * 0.22, Math.abs(d - R * 0.80));
        return band * (1 - smoothstep(0, R * 0.30, py));

      case 'wave':
        /* Horizon with a sine edge — everything under the curve. */
        var edgeY = Math.sin(px / (R * 0.38)) * R * 0.22;
        return 1 - smoothstep(edgeY, edgeY + R * f * 0.9, py);

      case 'corner':
        /* Wedge anchored on the region centre, opening along `angle`. */
        var along = px * dir.x + py * dir.y;
        var side = -px * dir.y + py * dir.x;
        return (1 - smoothstep(R * (1 - f), R * 1.4, along)) *
               (1 - smoothstep(R * 0.1, R * (0.1 + f), Math.abs(side) - along * 0.5));

      case 'vignette':
        /* Inverse of a circle: thickest at the edge, open in the middle. */
        d = Math.hypot(px, py);
        return smoothstep(R * (0.35 - f * 0.3), R * 0.95, d);

      case 'tri':
        /* Equilateral triangle via three half-plane tests. */
        best = 1;
        for (i = 0; i < 3; i++) {
          var ta = -Math.PI / 2 + i * (TAU / 3);
          var dist = px * Math.cos(ta) + py * Math.sin(ta);
          best = Math.min(best, 1 - smoothstep(R * 0.5 * (1 - f), R * 0.5, dist));
        }
        return best;

      default:
        return 1;
    }
  }

  /* Per-frame constants for the masks, so a point can be masked from a
     live position as cheaply as from a baked one. */
  function maskSetup(w, h, cfg) {
    var rad = cfg.angle * Math.PI / 180;
    return {
      w: w, h: h,
      R: Math.min(w, h) * 0.5 * Math.max(0.05, cfg.shapeScale),
      scx: w * cfg.shapeX, scy: h * cfg.shapeY,
      dir: { x: Math.cos(rad), y: Math.sin(rad) },
      ccx: w * cfg.clearX, ccy: h * cfg.clearY,
      crx: Math.max(1, w * cfg.clearSize),
      cry: Math.max(1, h * cfg.clearSize * 1.1),
      fadeEnd: cfg.fade,
      fadeStart: Math.max(0, cfg.fade - 0.28)
    };
  }

  /* Region × clear × fade for one position. */
  function maskAt(px, py, cfg, mk) {
    var cov = 1;
    if (cfg.shape !== 'full') {
      cov = regionCoverage(px - mk.scx, py - mk.scy, mk.R, cfg, mk.dir);
      if (cfg.invert) cov = 1 - cov;
    }
    if (cov <= 0.004) return 0;

    if (cfg.clear) {
      var nd = Math.hypot((px - mk.ccx) / mk.crx, (py - mk.ccy) / mk.cry);
      cov *= 1 - cfg.clear * (1 - smoothstep(0.30, 1.0, nd));
    }

    if (cfg.fadeDir === 'down') cov *= 1 - smoothstep(mk.fadeStart, mk.fadeEnd, py / mk.h);
    else if (cfg.fadeDir === 'up') cov *= smoothstep(1 - mk.fadeEnd, 1 - mk.fadeStart, py / mk.h);

    return cov;
  }

  /* Bake the mask into each point. Points that end up invisible are
     dropped here rather than skipped every frame — with a small shape
     that is most of the lattice.

     Sphere points are exempt: they move every frame, so a baked mask
     would be stuck to wherever they happened to start. They keep m = 1
     and are masked live in the draw loop instead. */
  function applyMasks(pts, w, h, cfg) {
    var mk = maskSetup(w, h, cfg);
    var diag = Math.hypot(w, h) * 0.5;
    var i, p;

    if (is3d(cfg.formation)) {
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        p.m = 1;
        p.d = 0;
      }
      return pts;
    }

    var out = [];
    for (i = 0; i < pts.length; i++) {
      p = pts[i];

      p.m = maskAt(p.x, p.y, cfg, mk);
      if (p.m <= 0.01) continue;

      /* Distance from the region centre — ripple and swirl measure from
         here, so the motion leaves wherever the shape is. */
      p.d = Math.hypot(p.x - mk.scx, p.y - mk.scy);
      p.v = hashA(p.c, p.r);

      /* Colour parameter, 0–1, resolved per blend mode at build time:
         it never changes per frame, so it costs nothing to draw. */
      switch (cfg.blend) {
        case 'x':      p.u = clamp(p.x / w, 0, 1); break;
        case 'y':      p.u = clamp(p.y / h, 0, 1); break;
        case 'radial': p.u = clamp(p.d / diag, 0, 1); break;
        case 'random': p.u = hashB(p.c, p.r); break;
        case 'globe':  p.u = clamp(p.y / h, 0, 1); break;
        default:       p.u = 0;
      }

      out.push(p);
    }

    out.lonCount = pts.lonCount;
    return out;
  }

  /* Neighbour pairs for the link lines. Built once, from grid
     coordinates — cheap and exact, where an O(n²) distance sweep would
     be neither. Rings and spirals have no meaningful right-neighbour so
     they only link along the ring; the graticule links both ways and
     wraps round the back. */
  function buildLinks(pts, cfg) {
    if (!cfg.links || is3d(cfg.formation)) return [];
    var byKey = {};
    var i, p;
    for (i = 0; i < pts.length; i++) {
      p = pts[i];
      byKey[p.c + ':' + p.r] = i;
    }
    var pairs = [];
    /* The weaker end of each pair, cached here because it is baked:
       the draw loop buckets on it to fade the mesh out with the dots
       instead of cutting it off at a threshold. */
    var mins = [];
    var ringOnly = cfg.formation === 'rings' || cfg.formation === 'radial' ||
                   cfg.formation === 'spiral';
    var wraps = cfg.formation === 'globe';

    function join(a, b) {
      pairs.push(a, b);
      mins.push(Math.min(pts[a].m, pts[b].m));
    }

    for (i = 0; i < pts.length; i++) {
      p = pts[i];
      var right = byKey[(p.c + 1) + ':' + p.r];
      /* The last meridian closes onto the first. */
      if (right == null && wraps) right = byKey['0:' + p.r];
      if (right != null && right !== i) join(i, right);
      if (!ringOnly) {
        var down = byKey[p.c + ':' + (p.r + 1)];
        if (down != null) join(i, down);
      }
    }
    pairs.mins = mins;
    return pairs;
  }

  /* How many alpha steps the link mesh fades through. Each step is one
     batched stroke, so this is the whole cost of the gradient. */
  var LINK_BUCKETS = 7;

  /* ----------------------------------------------------------------
     Modulation

     Brightness styles return m ∈ [0,1]; the draw loop turns that into
     an alpha multiplier centred on 1, so the field's average weight
     never drifts away from the static design. Displacement styles
     (drift, orbit, wave, swirl, jitter) and scan are handled in the
     draw loop instead.
     ---------------------------------------------------------------- */
  function modulation(style, p, t, cfg, dir) {
    var u, m;

    switch (style) {
      case 'shimmer':
        /* One broad gradient band sliding along `angle`. Wavelength is
           10 cells, so it reads as a slow lightening, not a stripe. */
        u = (p.x * dir.x + p.y * dir.y) / (cfg.spacing * 10);
        return 0.5 + 0.5 * Math.sin(TAU * (u - t * cfg.speed));

      case 'twinkle':
        return 0.5 + 0.5 * Math.sin(TAU * (t * cfg.speed + hashB(p.c, p.r)));

      case 'shimmer-twinkle':
        u = (p.x * dir.x + p.y * dir.y) / (cfg.spacing * 10);
        m = 0.5 + 0.5 * Math.sin(TAU * (u - t * cfg.speed));
        var tw = 0.5 + 0.5 * Math.sin(TAU * (t * cfg.speed * 1.5 + hashB(p.c, p.r)));
        return m * 0.62 + tw * 0.38;

      case 'breathe':
        return 0.5 + 0.5 * Math.sin(TAU * t * cfg.speed);

      case 'ripple':
        return 0.5 + 0.5 * Math.cos(TAU * (p.d / (cfg.spacing * 6) - t * cfg.speed));

      case 'pulse':
        /* Same rings as ripple, but raised to a power so they read as
           discrete bands travelling out rather than a soft wash. */
        m = 0.5 + 0.5 * Math.cos(TAU * (p.d / (cfg.spacing * 8) - t * cfg.speed));
        return m * m * m;

      case 'cascade':
        /* A front falling along `angle`, stepped per row so the field
           arrives in ranks instead of as a smooth gradient. */
        u = (p.x * dir.x + p.y * dir.y) / (cfg.spacing * 14);
        return frac(u - t * cfg.speed);

      case 'flicker':
        /* Twinkle quantised into three steps — closer to a signal than
           to a breath. Deterministic, so it never looks like noise. */
        m = frac(t * cfg.speed + hashB(p.c, p.r) * 3.7);
        return Math.floor(m * 3) / 2;

      default:
        return 0.5;
    }
  }

  /* ----------------------------------------------------------------
     Glyphs
     ---------------------------------------------------------------- */
  function drawGlyph(ctx, kind, x, y, r, rot) {
    var i, a;

    if (kind === 'circle') {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
      return;
    }

    ctx.save();
    ctx.translate(x, y);
    if (rot) ctx.rotate(rot);

    switch (kind) {
      case 'square':
        ctx.fillRect(-r, -r, r * 2, r * 2);
        break;

      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(0, -r * 1.3);
        ctx.lineTo(r * 1.3, 0);
        ctx.lineTo(0, r * 1.3);
        ctx.lineTo(-r * 1.3, 0);
        ctx.closePath();
        ctx.fill();
        break;

      case 'plus':
        var t = Math.max(0.5, r * 0.42);
        ctx.fillRect(-r, -t / 2, r * 2, t);
        ctx.fillRect(-t / 2, -r, t, r * 2);
        break;

      case 'cross':
        ctx.rotate(Math.PI / 4);
        var ct = Math.max(0.5, r * 0.42);
        ctx.fillRect(-r, -ct / 2, r * 2, ct);
        ctx.fillRect(-ct / 2, -r, ct, r * 2);
        break;

      case 'star4':
        /* Four-point sparkle: tips at 1.5r, waists pulled right in, so
           the arms taper instead of reading as a plus. */
        ctx.beginPath();
        for (i = 0; i < 8; i++) {
          a = (i / 8) * TAU - Math.PI / 2;
          var sr = (i % 2 === 0) ? r * 1.5 : r * 0.2;
          ctx[i ? 'lineTo' : 'moveTo'](Math.cos(a) * sr, Math.sin(a) * sr);
        }
        ctx.closePath();
        ctx.fill();
        break;

      case 'triangle':
        ctx.beginPath();
        for (i = 0; i < 3; i++) {
          a = -Math.PI / 2 + i * (TAU / 3);
          ctx[i ? 'lineTo' : 'moveTo'](Math.cos(a) * r * 1.35, Math.sin(a) * r * 1.35);
        }
        ctx.closePath();
        ctx.fill();
        break;

      case 'heart':
        ctx.beginPath();
        ctx.moveTo(0, r * 1.1);
        ctx.bezierCurveTo(-r * 1.55, -r * 0.15, -r * 0.72, -r * 1.25, 0, -r * 0.42);
        ctx.bezierCurveTo(r * 0.72, -r * 1.25, r * 1.55, -r * 0.15, 0, r * 1.1);
        ctx.closePath();
        ctx.fill();
        break;

      case 'ring':
        ctx.lineWidth = Math.max(0.5, r * 0.45);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0.4, r * 0.85), 0, TAU);
        ctx.stroke();
        break;

      case 'dash':
        var dt = Math.max(0.6, r * 0.38);
        ctx.fillRect(-r, -dt / 2, r * 2, dt);
        break;
    }

    ctx.restore();
  }

  /* A 64-entry colour lookup. The alternative — composing an "rgb(…)"
     string per dot per frame — is thousands of throwaway strings a
     second for a gradient that never moves. */
  function makeRamp(cfg) {
    var c1 = hexToRgb(cfg.color);
    var c2 = hexToRgb(cfg.color2);
    var out = {
      flat: 'rgb(' + c1.r + ',' + c1.g + ',' + c1.b + ')',
      ramp: []
    };
    if (cfg.blend === 'none') return out;

    var stops = cfg.blend === 'globe' ? GLOBE_STOPS : null;
    for (var i = 0; i < 64; i++) {
      var u = i / 63;
      var r, g, b;
      if (stops) {
        /* Multi-stop ramp: find the span u falls in and lerp inside it. */
        var f = u * (stops.length - 1);
        var si = Math.min(Math.floor(f), stops.length - 2);
        var kk = f - si;
        var sa = stops[si], sb = stops[si + 1];
        r = sa[0] + (sb[0] - sa[0]) * kk;
        g = sa[1] + (sb[1] - sa[1]) * kk;
        b = sa[2] + (sb[2] - sa[2]) * kk;
      } else {
        r = c1.r + (c2.r - c1.r) * u;
        g = c1.g + (c2.g - c1.g) * u;
        b = c1.b + (c2.b - c1.b) * u;
      }
      out.ramp.push('rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')');
    }
    return out;
  }

  /* ----------------------------------------------------------------
     sketch — one static frame, no loop, no listeners.

     This exists so the control panel can show what an option looks
     like instead of naming it. It runs the real buildLattice,
     applyMasks and drawGlyph, so a thumbnail cannot drift away from
     what the option actually does; only motion and pointer response
     are left out, which is what a still wants anyway.
     ---------------------------------------------------------------- */
  function sketch(canvas, options) {
    var ctx = canvas.getContext('2d');
    var cfg = {};
    var k;
    for (k in DEFAULTS) if (DEFAULTS.hasOwnProperty(k)) cfg[k] = DEFAULTS[k];
    if (options) {
      for (k in options) {
        if (options.hasOwnProperty(k) && options[k] != null && DEFAULTS.hasOwnProperty(k)) {
          cfg[k] = options[k];
        }
      }
    }

    var rect = canvas.getBoundingClientRect();
    var w = Math.round(rect.width) || 56;
    var h = Math.round(rect.height) || 40;
    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var pal = makeRamp(cfg);
    var solid = cfg.blend === 'none';
    var rot = cfg.rotate * Math.PI / 180;
    var sphere = is3d(cfg.formation);

    var pts = applyMasks(buildLattice(w, h, cfg), w, h, cfg);
    var links = buildLinks(pts, cfg);
    var mk = sphere ? maskSetup(w, h, cfg) : null;

    var gb = null;
    if (sphere) {
      var tr = cfg.tilt * Math.PI / 180;
      gb = {
        ct: Math.cos(tr), st: Math.sin(tr),
        R: Math.min(w * 0.46, h * 0.85) * clamp(cfg.orbScale, 0.1, 4),
        cx: w * cfg.shapeX, cy: h * cfg.shapeY,
        P: Math.max(1.05, cfg.perspective),
        limb: clamp(cfg.limb, 0, 1)
      };
    }

    ctx.globalCompositeOperation = cfg.additive ? 'lighter' : 'source-over';

    var i;
    if (cfg.links && links.length) {
      ctx.strokeStyle = pal.flat;
      ctx.lineWidth = cfg.linkWidth;
      ctx.globalAlpha = cfg.links;
      ctx.beginPath();
      for (i = 0; i < links.length; i += 2) {
        ctx.moveTo(pts[links[i]].x, pts[links[i]].y);
        ctx.lineTo(pts[links[i + 1]].x, pts[links[i + 1]].y);
      }
      ctx.stroke();
    }

    if (solid) ctx.fillStyle = pal.flat;

    for (i = 0; i < pts.length; i++) {
      var p = pts[i];
      var a = cfg.opacity;
      var x = p.x, y = p.y;
      var rScale = 1;

      if (sphere) {
        var y2 = p.Y * gb.ct - p.Z * gb.st;
        var z2 = p.Y * gb.st + p.Z * gb.ct;
        var persp = gb.P / (gb.P - z2);
        x = gb.cx + p.X * gb.R * persp;
        y = gb.cy + y2 * gb.R * persp;
        var rim = Math.pow(Math.min(1, Math.hypot(p.X, y2)), 0.64);
        a *= (1 - gb.limb + gb.limb * (0.02 + 0.98 * rim)) * (0.6 + 0.4 * ((z2 + 1) / 2));
        rScale = persp * (1 - gb.limb + gb.limb * (0.6 + 1.3 * rim));
        p.m = maskAt(x, y, cfg, mk);
      }

      a *= p.m;
      if (a <= 0.004) continue;

      var r = cfg.size;
      if (cfg.sizeVary) r *= 1 + cfg.sizeVary * (p.v - 0.5) * 1.2;
      if (cfg.sizeTilt) r *= 1 + cfg.sizeTilt * ((y / h) - 0.5) * 1.4;
      r = Math.max(0.2, r * rScale);

      ctx.globalAlpha = a > 1 ? 1 : a;
      if (!solid) ctx.fillStyle = pal.ramp[(p.u * 63) | 0] || pal.flat;
      drawGlyph(ctx, cfg.glyph, x, y, r, rot);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ----------------------------------------------------------------
     mount
     ---------------------------------------------------------------- */
  function mount(canvas, options) {
    var ctx = canvas.getContext('2d');
    var cfg = {};
    var k;
    for (k in DEFAULTS) if (DEFAULTS.hasOwnProperty(k)) cfg[k] = DEFAULTS[k];
    if (options) {
      for (k in options) {
        if (options.hasOwnProperty(k) && options[k] != null && DEFAULTS.hasOwnProperty(k)) {
          cfg[k] = options[k];
        }
      }
    }

    var pts = [];
    var links = [];
    var ramp = [];
    var flat = '#000';
    var w = 0, h = 0, dpr = 1;
    var destroyed = false, running = false;
    var raf = 0, timer = 0, probe = 0, rafSeen = false, t0 = 0;
    var fps = 0, fpsFrames = 0, fpsSince = 0;

    /* Pointer lives in canvas-space; `on` is false until the cursor has
       actually been over the hero, so the field never starts distorted. */
    var ptr = { x: 0, y: 0, on: false };

    var reduced = global.matchMedia
      ? global.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

    function animated() {
      if (reduced && reduced.matches) return false;
      return cfg.style !== 'static' || cfg.pointer !== 'off' ||
             (is3d(cfg.formation) && cfg.spin !== 0);
    }

    /* Rebuilt only when the colours change. */
    function buildRamp() {
      var pal = makeRamp(cfg);
      flat = pal.flat;
      ramp = pal.ramp;
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      dpr = Math.min(global.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild();
      return true;
    }

    function rebuild() {
      if (!w || !h) return;
      pts = applyMasks(buildLattice(w, h, cfg), w, h, cfg);
      links = buildLinks(pts, cfg);
    }

    function draw(t) {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = cfg.additive ? 'lighter' : 'source-over';

      var style = (reduced && reduced.matches) ? 'static' : cfg.style;
      var rad = cfg.angle * Math.PI / 180;
      var dir = { x: Math.cos(rad), y: Math.sin(rad) };
      var base = cfg.opacity;
      var inten = cfg.intensity;
      var rot = cfg.rotate * Math.PI / 180;
      var solid = cfg.blend === 'none';
      var sphere = is3d(cfg.formation);
      var mk = sphere ? maskSetup(w, h, cfg) : null;

      /* The globe: spin about its own axis, tilt the axis, project. */
      var gb = null;
      if (sphere) {
        var tr = cfg.tilt * Math.PI / 180;
        var ga = TAU * t * ((reduced && reduced.matches) ? 0 : cfg.spin);
        gb = {
          ca: Math.cos(ga), sa: Math.sin(ga),
          ct: Math.cos(tr), st: Math.sin(tr),
          R: Math.min(w * 0.46, h * 0.85) * clamp(cfg.orbScale, 0.1, 4),
          cx: w * cfg.shapeX, cy: h * cfg.shapeY,
          P: Math.max(1.05, cfg.perspective),
          limb: clamp(cfg.limb, 0, 1)
        };
      }

      /* Scan sets up its travelling band once per frame. */
      var scanU = 0, scanSpan = 0;
      if (style === 'scan') {
        scanSpan = Math.abs(w * dir.x) + Math.abs(h * dir.y) + cfg.spacing * 8;
        scanU = (t * cfg.speed % 1) * scanSpan;
      }

      /* Displacement amplitudes are capped at a fraction of one cell:
         dots sway inside their own square and never swap places. */
      var amp = inten * cfg.spacing * 0.12;
      var phase = TAU * t * cfg.speed;

      var pr = Math.max(1, cfg.pointerR);
      var ps = cfg.pointerS;
      var usePtr = cfg.pointer !== 'off' && ptr.on;

      var i, p;

      /* Links first, so dots sit on top of their own lines. They use the
         resting positions — animating them too turns the field into a
         writhing mesh, which is a different thing entirely. */
      if (cfg.links && links.length) {
        ctx.strokeStyle = flat;
        ctx.lineWidth = cfg.linkWidth;
        /* Stroked in alpha bands rather than as one batch. A single
           batch has to pick one opacity, which means a threshold —
           and a threshold puts a straight edge across the hero
           wherever the mask dips below it, while the dots carry on
           fading. Seven bands cost seven strokes and the mesh dies
           out with the field. */
        var mins = links.mins || [];
        for (var lb = 0; lb < LINK_BUCKETS; lb++) {
          var lo = lb / LINK_BUCKETS;
          var hi = (lb + 1) / LINK_BUCKETS;
          var drew = false;
          ctx.globalAlpha = cfg.links * ((lb + 0.5) / LINK_BUCKETS);
          ctx.beginPath();
          for (i = 0; i < links.length; i += 2) {
            var lm = mins[i >> 1];
            if (lm < lo || lm >= hi) continue;
            var a1 = pts[links[i]], b1 = pts[links[i + 1]];
            ctx.moveTo(a1.x, a1.y);
            ctx.lineTo(b1.x, b1.y);
            drew = true;
          }
          if (drew) ctx.stroke();
        }
      }

      if (solid) ctx.fillStyle = flat;

      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        var a = base;
        var x = p.x, y = p.y;
        var rScale = 1;

        if (sphere) {
          /* Spin about Y, tilt the axis, then project. Latitude — and
             so the colour — is untouched by the spin. */
          var x1 = p.X * gb.ca + p.Z * gb.sa;
          var z1 = -p.X * gb.sa + p.Z * gb.ca;
          var y2 = p.Y * gb.ct - z1 * gb.st;
          var z2 = p.Y * gb.st + z1 * gb.ct;
          var persp = gb.P / (gb.P - z2);

          x = gb.cx + x1 * gb.R * persp;
          y = gb.cy + y2 * gb.R * persp;

          /* Limb brightening: 0 at the centre of the disc, 1 on the
             silhouette. It is what stops a sphere of dots reading as a
             flat blob — the rim is where you see the surface edge-on. */
          var rim = Math.pow(Math.min(1, Math.hypot(x1, y2)), 0.64);
          var depth = (z2 + 1) / 2;
          a *= (1 - gb.limb + gb.limb * (0.02 + 0.98 * rim)) * (0.6 + 0.4 * depth);
          rScale = persp * (1 - gb.limb + gb.limb * (0.6 + 1.3 * rim));

          /* Masked from where the dot actually is this frame, not from
             where it started. */
          p.m = maskAt(x, y, cfg, mk);
        }

        a *= p.m;
        if (a <= 0.004 && !usePtr) continue;

        switch (style) {
          case 'scan':
            /* A single soft band along `angle`. Only ever brightens —
               the resting field keeps its design value. */
            var u = x * dir.x + y * dir.y;
            var dU = u - scanU + scanSpan * 0.5;
            dU = ((dU % scanSpan) + scanSpan) % scanSpan - scanSpan * 0.5;
            a *= 1 + inten * 1.6 * (1 - smoothstep(0, cfg.spacing * 3, Math.abs(dU)));
            break;

          case 'drift':
            x += Math.sin(phase + p.c * 0.45) * amp;
            y += Math.cos(phase + p.r * 0.45) * amp;
            break;

          case 'orbit':
            /* Every dot on its own little circle, phase by hash — the
               field turns without going anywhere. */
            var oa = phase + hashB(p.c, p.r) * TAU;
            x += Math.cos(oa) * amp;
            y += Math.sin(oa) * amp;
            break;

          case 'wave':
            y += Math.sin(phase + x / (cfg.spacing * 3)) * amp * 2;
            break;

          case 'swirl':
            /* Rotation rate falls off with radius, so the field shears
               instead of spinning as one rigid plate. */
            var sr2 = p.d || 0.001;
            var sa2 = Math.atan2(y - h * cfg.shapeY, x - w * cfg.shapeX) +
                      (phase * 0.25) * (1 / (1 + sr2 / (cfg.spacing * 10)));
            x = w * cfg.shapeX + Math.cos(sa2) * sr2;
            y = h * cfg.shapeY + Math.sin(sa2) * sr2;
            break;

          case 'jitter':
            /* Stepped displacement: the dot holds a position for a beat,
               then snaps. Time is quantised, not the offset. */
            var step = Math.floor(t * cfg.speed * 6);
            x += (frac(hashA(p.c, p.r) + step * 0.618) - 0.5) * amp * 2;
            y += (frac(hashB(p.c, p.r) + step * 0.414) - 0.5) * amp * 2;
            break;

          case 'static':
            break;

          default:
            a *= 1 + inten * (modulation(style, p, t, cfg, dir) - 0.5) * 1.6;
        }

        if (usePtr) {
          var pdx = x - ptr.x, pdy = y - ptr.y;
          var pd = Math.hypot(pdx, pdy);
          if (pd < pr) {
            var fall = 1 - smoothstep(0, pr, pd);
            switch (cfg.pointer) {
              case 'glow':    a *= 1 + fall * 2.2 * ps; break;
              case 'dim':     a *= 1 - fall * 0.9 * ps; break;
              case 'grow':    rScale += fall * 1.6 * ps; break;
              case 'repel':
                var push = (fall * pr * 0.35 * ps) / (pd || 1);
                x += pdx * push;
                y += pdy * push;
                break;
              case 'attract':
                var pull = fall * 0.45 * ps;
                x -= pdx * pull;
                y -= pdy * pull;
                break;
            }
          }
        }

        if (a <= 0.004) continue;

        /* Size variation is a property of the dot, not a motion: p.v
           never changes, so the field keeps a stable mix of weights
           rather than dots that grow and shrink. */
        var r = cfg.size;
        if (cfg.sizeVary) r *= 1 + cfg.sizeVary * (p.v - 0.5) * 1.2;
        if (cfg.sizeTilt) r *= 1 + cfg.sizeTilt * ((y / h) - 0.5) * 1.4;
        r = Math.max(0.2, r * rScale);

        ctx.globalAlpha = a > 1 ? 1 : a;
        if (!solid) ctx.fillStyle = ramp[(p.u * 63) | 0] || flat;
        drawGlyph(ctx, cfg.glyph, x, y, r, rot);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    /* ------------------------------------------------------------
       The loop

       requestAnimationFrame is the right clock, but it is suspended
       wherever the host reports the document as hidden — and embedded
       preview panes do exactly that while the page is plainly on
       screen. So: start on rAF, and if no frame has arrived within
       250ms, fall back to a 30fps timer.
       ------------------------------------------------------------ */

    function tick(now) {
      if (destroyed) return;
      if (!t0) { t0 = now; fpsSince = now; }
      draw((now - t0) / 1000);
      fpsFrames++;
      if (now - fpsSince >= 500) {
        fps = Math.round((fpsFrames * 1000) / (now - fpsSince));
        fpsFrames = 0;
        fpsSince = now;
        /* A pane that throttles rAF to a few frames a second still
           *delivers* frames, so the 250ms probe below never fires. Catch
           it on the measured rate instead: below 12fps nothing reads as
           motion, and the timer is the only way out. */
        if (running && !timer && fps < 12) useTimer();
      }
    }

    function frame(now) {
      if (destroyed || !running) return;
      rafSeen = true;
      tick(now);
      raf = global.requestAnimationFrame(frame);
    }

    function useTimer() {
      if (destroyed || !running || timer) return;
      if (raf) { global.cancelAnimationFrame(raf); raf = 0; }
      timer = global.setInterval(function () { tick(global.performance.now()); }, 33);
    }

    function start() {
      if (destroyed) return;
      t0 = 0;
      /* Paint synchronously first: the canvas is cleared by every
         resize, so waiting on a frame can leave it blank. */
      draw(0);
      if (!animated()) return;
      running = true;
      rafSeen = false;
      raf = global.requestAnimationFrame(frame);
      probe = global.setTimeout(function () {
        probe = 0;
        if (!rafSeen) useTimer();
      }, 250);
    }

    function stop() {
      running = false;
      if (raf) { global.cancelAnimationFrame(raf); raf = 0; }
      if (timer) { global.clearInterval(timer); timer = 0; }
      if (probe) { global.clearTimeout(probe); probe = 0; }
    }

    function restart() { stop(); start(); }

    /* Anything that changes the lattice or the baked masks triggers a
       rebuild; colour and timing changes don't. */
    var STRUCTURAL = [
      'formation', 'spacing', 'jitter', 'count', 'orbScale', 'tilt',
      'shape', 'shapeScale', 'shapeX', 'shapeY', 'feather', 'invert',
      'clear', 'clearSize', 'clearX', 'clearY',
      'fade', 'fadeDir', 'angle', 'blend', 'links'
    ];

    function set(patch) {
      if (!patch) return;
      var needsRebuild = false;
      var needsRamp = false;
      for (var key in patch) {
        if (!patch.hasOwnProperty(key) || patch[key] == null) continue;
        if (!DEFAULTS.hasOwnProperty(key) || cfg[key] === patch[key]) continue;
        if (STRUCTURAL.indexOf(key) !== -1) needsRebuild = true;
        if (key === 'color' || key === 'color2' || key === 'blend') needsRamp = true;
        cfg[key] = patch[key];
      }
      if (needsRamp) buildRamp();
      if (needsRebuild) rebuild();
      restart();
    }

    function config() {
      var out = {};
      for (var key in cfg) if (cfg.hasOwnProperty(key)) out[key] = cfg[key];
      return out;
    }

    function stats() {
      return { dots: pts.length, links: links.length / 2, fps: fps };
    }

    function onResize() { if (resize()) restart(); }

    function onMove(e) {
      var rect = canvas.getBoundingClientRect();
      ptr.x = e.clientX - rect.left;
      ptr.y = e.clientY - rect.top;
      ptr.on = true;
      /* A static field still has to repaint to show pointer response. */
      if (!running && cfg.pointer !== 'off') draw(0);
    }

    function onLeave() {
      ptr.on = false;
      if (!running) draw(0);
    }

    function destroy() {
      destroyed = true;
      stop();
      if (ro) ro.disconnect();
      global.removeEventListener('resize', onResize);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      if (reduced && reduced.removeEventListener) reduced.removeEventListener('change', restart);
    }

    /* Pointer events are bound to the canvas's parent, because the
       canvas itself is pointer-events: none so the hero stays usable. */
    var host = canvas.parentNode || canvas;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    var ro = null;
    if (global.ResizeObserver) {
      ro = new global.ResizeObserver(onResize);
      ro.observe(canvas);
    }
    global.addEventListener('resize', onResize);
    if (reduced && reduced.addEventListener) reduced.addEventListener('change', restart);

    buildRamp();
    resize();
    start();

    return { set: set, config: config, stats: stats, destroy: destroy, canvas: canvas };
  }

  global.TruDotLab = {
    mount: mount,
    sketch: sketch,
    FORMATIONS: FORMATIONS,
    GLYPHS: GLYPHS,
    SHAPES: SHAPES,
    STYLES: STYLES,
    POINTERS: POINTERS,
    BLENDS: BLENDS,
    COLORS: COLORS,
    PRESETS: PRESETS,
    DEFAULTS: DEFAULTS,
    GLOBE_STOPS: GLOBE_STOPS,
    GLOBE_STOPS_SIDE: GLOBE_STOPS_SIDE,
    is3d: is3d
  };
})(window);
