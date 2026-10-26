/* ============================================================
   Dot playground — control panel.
   ============================================================

   The panel is generated from SCHEMA rather than written out in
   HTML, so adding a knob to the engine means adding one line here
   and nothing else. Keys that exist in TruDotLab.DEFAULTS are sent
   to the field; keys listed in HERO_DEFAULTS style the hero around
   it and never reach the engine.
   ------------------------------------------------------------------ */

(function (global) {
  'use strict';

  var STORE = 'd3-dot-playground-v2';
  /* Templates live under their own key so clearing a working session
     ("Reset") never takes saved work with it. */
  var TPL_STORE = 'd3-dot-playground-templates-v1';
  var Lab = global.TruDotLab;

  /* Hero-only settings — the layout half of the playground. Defaults
     are the shipped hero: full-bleed, 420px, --surface-inverse, no
     orb, veil behind the copy, 520px composer. */
  var HERO_DEFAULTS = {
    heroTheme:      'dark',
    heroBg:         'inverse',
    heroBgCustom:   '#172d2d',
    heroBgCustom2:  '#004c45',
    heroBgGradient: 0,
    heroWidth:    'bleed',
    heroHeight:   420,
    heroRadius:   0,
    heroLayout:   'center',
    heroContent:  1,
    heroOrb:      0,
    heroVeil:     1,
    heroComposer: 520,
    heroBackdrop: 'none'
  };

  /* `veil` is the solid the veil plate paints in — it has to match the
     hero behind it, and a gradient has no single colour to read.
     `tone` decides the headline colour, the backdrop polarity and
     which half of a preset's palette gets used. */
  var HERO_BGS = [
    { id: 'inverse',   label: 'Inverse (shipped)',  value: '#172d2d', veil: '#172d2d', tone: 'dark' },
    { id: 'gradient5', label: 'Teal gradient', veil: '#172d2d', tone: 'dark',
      value: 'linear-gradient(180deg, #172d2d 20%, #004c45 100%)' },
    { id: 'forest',    label: 'Forest',   value: '#004c45', veil: '#004c45', tone: 'dark' },
    { id: 'deep',      label: 'Deep teal',         value: '#00332e', veil: '#00332e', tone: 'dark' },
    { id: 'ink',       label: 'Ink',               value: '#0d1a19', veil: '#0d1a19', tone: 'dark' },
    { id: 'black',     label: 'Black',             value: '#000000', veil: '#000000', tone: 'dark' },
    { id: 'navy',      label: 'Navy',              value: '#04245c', veil: '#04245c', tone: 'dark' },
    { id: 'gradient',  label: 'Forest gradient',   veil: '#00332e', tone: 'dark',
      value: 'linear-gradient(135deg, #00332e 0%, #004c45 55%, #0a6457 100%)' },

    { id: 'light',     label: 'Light neutral',     value: '#f4f6f4', veil: '#f4f6f4', tone: 'light' },
    { id: 'white',     label: 'White',             value: '#ffffff', veil: '#ffffff', tone: 'light' },
    { id: 'paper',     label: 'Warm paper',        value: '#f3efe9', veil: '#f3efe9', tone: 'light' },
    { id: 'mintwash',  label: 'Mint wash',         value: '#e6f1ec', veil: '#e6f1ec', tone: 'light' },
    { id: 'lightgrad', label: 'Light gradient',    veil: '#ffffff', tone: 'light',
      value: 'linear-gradient(180deg, #ffffff 15%, #e4ece8 100%)' },

    /* Resolved from heroBgCustom / heroBgCustom2 at paint time; its
       tone is read off the colour rather than declared. */
    { id: 'custom',    label: 'Custom…', custom: true }
  ];

  /* Changing any of these re-reads the hero's tone. */
  var BG_KEYS = { heroBg: 1, heroBgCustom: 1, heroBgCustom2: 1, heroBgGradient: 1 };

  var THEMES = [
    { id: 'dark',  label: 'Dark (shipped)' },
    { id: 'light', label: 'Light' }
  ];

  /* Where each theme lands when you flip the switch. */
  var THEME_BG = { dark: 'inverse', light: 'light' };

  var WIDTHS = [
    { id: 'bleed',     label: 'Full bleed (shipped)' },
    { id: 'contained', label: 'Contained — 1214px column' }
  ];

  var LAYOUTS = [
    { id: 'center', label: 'Centred (shipped)' },
    { id: 'split',  label: 'Split — copy beside the chat bar' },
    { id: 'left',   label: 'Left aligned' },
    { id: 'low',    label: 'Low / bottom' }
  ];

  var BACKDROPS = [
    { id: 'none',     label: 'None' },
    { id: 'planet',   label: 'Planet (soft sphere)' },
    { id: 'halo',     label: 'Halo glow' },
    { id: 'vignette', label: 'Vignette' }
  ];

  var FADE_DIRS = [
    { id: 'down', label: 'Fade downward' },
    { id: 'up',   label: 'Fade upward' },
    { id: 'none', label: 'No fade' }
  ];

  /* ----------------------------------------------------------------
     Visibility predicates. A control that cannot affect the current
     configuration is hidden rather than left to mislead.
     ---------------------------------------------------------------- */
  /* Surface swatches — the hero colours worth one click, as opposed
     to the dot ramp. */
  var BG_SWATCHES = [
    { id: 'inverse', label: 'Inverse',  value: '#172d2d' },
    { id: 'forest',  label: 'Forest',   value: '#004c45' },
    { id: 'deep',    label: 'Deep teal', value: '#00332e' },
    { id: 'ink',     label: 'Ink',      value: '#0d1a19' },
    { id: 'black',   label: 'Black',    value: '#000000' },
    { id: 'navy',    label: 'Navy',     value: '#04245c' },
    { id: 'violet',  label: 'Violet',   value: '#2d1b4e' },
    { id: 'light',   label: 'Light',    value: '#f4f6f4' },
    { id: 'white',   label: 'White',    value: '#ffffff' },
    { id: 'paper',   label: 'Paper',    value: '#f3efe9' }
  ];

  function isCustomBg(c) { return c.heroBg === 'custom'; }

  /* ----------------------------------------------------------------
     Thumbnails

     Formation, glyph and region are picked from drawn samples rather
     than a dropdown of names — "Phyllotaxis spiral" and "Corner
     wedge" mean nothing until you have seen them. Each sample is a
     real TruDotLab.sketch of that one option with everything else
     held neutral, so what you click is what you get.
     ---------------------------------------------------------------- */

  var THUMB_INK = '#1d4b43';

  /* Held flat so the only thing varying between samples is the option
     being chosen. */
  var THUMB_BASE = {
    glyph: 'circle', color: THUMB_INK, blend: 'none', opacity: 0.95,
    additive: 0, sizeVary: 0, sizeTilt: 0, rotate: 0, jitter: 0,
    shape: 'full', clear: 0, fadeDir: 'none', fade: 1, links: 0,
    style: 'static', pointer: 'off', invert: 0
  };

  function thumbCfg(extra) {
    var out = {}, k;
    for (k in THUMB_BASE) if (THUMB_BASE.hasOwnProperty(k)) out[k] = THUMB_BASE[k];
    for (k in extra) if (extra.hasOwnProperty(k)) out[k] = extra[k];
    return out;
  }

  /* Spacing is per-formation: at 34px a lattice tuned for a hero either
     turns to mush or shows too few dots to recognise. These are the
     densities at which each one is actually identifiable. */
  var THUMB_SPACING = {
    radial: 12,    /* fewer, wider spokes — at hero density they read as rings */
    spiral: 4.5,   /* phyllotaxis arms only emerge past a couple of hundred points */
    rings: 7,
    wave: 8.5
  };

  function formationThumb(id) {
    if (id === 'sphere') {
      return thumbCfg({ formation: 'sphere', count: 320, size: 0.7, orbScale: 0.95,
        shapeX: 0.5, shapeY: 0.5, limb: 1, opacity: 1 });
    }
    if (id === 'globe') {
      return thumbCfg({ formation: 'globe', spacing: 7, size: 0.9, orbScale: 0.72,
        shapeX: 0.5, shapeY: 0.5, links: 0.6, linkWidth: 0.5 });
    }
    return thumbCfg({ formation: id, spacing: THUMB_SPACING[id] || 7.5,
      size: id === 'spiral' ? 0.85 : 1.1, shapeX: 0.5, shapeY: 0.5 });
  }

  function glyphThumb(id) {
    return thumbCfg({ formation: 'grid', spacing: 13, size: 3, glyph: id,
      shapeX: 0.5, shapeY: 0.5 });
  }

  function shapeThumb(id) {
    return thumbCfg({ formation: 'grid', spacing: 4, size: 0.9, shape: id,
      shapeScale: id === 'full' ? 1 : 1.5, shapeX: 0.5, shapeY: 0.5,
      feather: 0.22, angle: 35 });
  }

  function isSphere(c) { return c.formation === 'sphere'; }
  function isFlat(c)   { return c.formation !== 'sphere'; }
  function isOrb(c)    { return c.formation === 'sphere' || c.formation === 'globe'; }
  function notFull(c)  { return c.shape !== 'full'; }
  function moving(c)   { return c.style !== 'static'; }

  /* ----------------------------------------------------------------
     Schema

     type: select | range | color | toggle
     ---------------------------------------------------------------- */
  var SCHEMA = [
    {
      group: 'Pattern',
      hint: 'Where the dots sit, how many, and whether they are joined up.',
      items: [
        { key: 'formation', label: 'Formation', type: 'thumbs',
          options: Lab.FORMATIONS, thumb: formationThumb },
        { key: 'spacing', label: 'Spacing', type: 'range', min: 8, max: 80, step: 1,
          unit: 'px', showIf: isFlat, lo: 'dense', hi: 'sparse',
          help: 'Distance between neighbouring dots.' },
        { key: 'jitter', label: 'Scatter', type: 'range', min: 0, max: 1, step: 0.05,
          showIf: isFlat, lo: 'exact grid', hi: 'loose',
          help: 'Nudges each dot off its cell. Same every load, never clumps.' },
        { key: 'count', label: 'Dot count', type: 'range', min: 200, max: 6000, step: 50,
          showIf: isSphere, lo: 'sparse', hi: 'solid',
          help: 'Dots on the sphere. The shipped hero uses 2000.' },
        { key: 'orbScale', label: 'Globe size', type: 'range', min: 0.3, max: 3, step: 0.05,
          showIf: isOrb, lo: 'small', hi: 'overflows',
          help: 'Radius. Above ~1.4 the globe runs past the hero edges.' },
        { key: 'tilt', label: 'Axis tilt', type: 'range', min: -60, max: 60, step: 1,
          unit: '°', showIf: isOrb, lo: 'lean back', hi: 'lean forward',
          help: 'Tips the pole toward or away from you. 0 hides the far side behind the near one.' },
        { key: 'perspective', label: 'Perspective', type: 'range', min: 1.2, max: 8, step: 0.1,
          showIf: isSphere, lo: 'fisheye', hi: 'flat',
          help: 'How much nearer dots are magnified. High values read as a flat disc.' },
        { key: 'spin', label: 'Spin', type: 'range', min: 0, max: 0.2, step: 0.0005,
          unit: ' rev/s', showIf: isSphere, lo: 'still', hi: 'fast',
          help: 'Full turns per second. The shipped hero is 0.0048 — about 3.5 minutes a turn.' },
        { key: 'limb', label: 'Limb glow', type: 'range', min: 0, max: 1, step: 0.05,
          showIf: isSphere, lo: 'even', hi: 'bright rim',
          help: 'Brightens the silhouette, where you see the surface edge-on. At 0 the sphere flattens into a blob.' },

        /* Links live with the lattice because that is what draws them:
           the pairs come from neighbouring grid coordinates, so which
           formation you pick decides what the mesh looks like. */
        { key: 'links', section: 'Links', label: 'Line opacity', type: 'range',
          min: 0, max: 0.6, step: 0.01, showIf: isFlat, lo: 'off', hi: 'strong',
          help: 'Joins neighbouring dots so the field reads as a mesh. This is what draws the graticule’s wireframe. Not available on the dot globe.' },
        { key: 'linkWidth', label: 'Line width', type: 'range', min: 0.25, max: 3,
          step: 0.25, unit: 'px', lo: 'hairline', hi: 'thick',
          showIf: function (c) { return isFlat(c) && c.links > 0; } }
      ]
    },
    {
      group: 'Dot',
      hint: 'What each dot is drawn as.',
      items: [
        { key: 'glyph', label: 'Mark', type: 'thumbs',
          options: Lab.GLYPHS, thumb: glyphThumb },
        { key: 'size', label: 'Size', type: 'range', min: 0.4, max: 8, step: 0.1,
          unit: 'px', lo: 'fine', hi: 'heavy', help: 'Radius of one mark.' },
        { key: 'sizeVary', label: 'Size spread', type: 'range', min: 0, max: 1, step: 0.05,
          lo: 'all equal', hi: 'mixed',
          help: 'Gives each dot its own weight. A fixed property, not a pulse.' },
        { key: 'sizeTilt', label: 'Size tilt', type: 'range', min: -1, max: 1, step: 0.05,
          lo: 'big at top', hi: 'big at bottom',
          help: 'Grades the size down the hero. Centre is off.' },
        { key: 'rotate', label: 'Rotation', type: 'range', min: 0, max: 180, step: 1,
          unit: '°', lo: '0°', hi: '180°',
          help: 'Turns each mark. Does nothing to circles.' },
        { key: 'opacity', label: 'Opacity', type: 'range', min: 0, max: 1, step: 0.01,
          lo: 'ghost', hi: 'solid', help: 'Base alpha, before masks and motion.' }
      ]
    },
    {
      group: 'Colour',
      hint: 'The surface, then the dots on it. Every colour takes a swatch, the picker, or a typed hex.',
      items: [
        { key: 'heroTheme', section: 'Surface', label: 'Theme', type: 'select', options: THEMES,
          describe: {
            dark:  'Dark surface, light dots. Moves the background and re-reads the preset in its dark palette.',
            light: 'Pale surface, dark dots. Dots tuned to glow on a dark hero vanish on a pale one, so presets switch palette with it.'
          } },
        { key: 'heroBg', label: 'Background', type: 'select', options: HERO_BGS },
        { key: 'heroBgCustom', label: 'Custom colour', type: 'color', swatches: BG_SWATCHES,
          showIf: isCustomBg },
        { key: 'heroBgGradient', label: 'Fade to a second colour', type: 'toggle',
          showIf: isCustomBg },
        { key: 'heroBgCustom2', label: 'Second colour', type: 'color', swatches: BG_SWATCHES,
          showIf: function (c) { return isCustomBg(c) && !!c.heroBgGradient; } },

        { key: 'blend', section: 'Dots', label: 'Blend', type: 'select', options: Lab.BLENDS,
          describe: {
            none:   'Every dot the same colour.',
            globe:  'The shipped four stops — gold at the south pole through teal and mint. Ignores the colours below.',
            x:      'Colour 1 on the left edge, colour 2 on the right.',
            y:      'Colour 1 at the top, colour 2 at the bottom.',
            radial: 'Colour 1 at the region centre, colour 2 at the edge.',
            random: 'Each dot takes one end or the other, evenly spread.'
          } },
        { key: 'color',    label: 'Colour',   type: 'color',  swatches: Lab.COLORS,
          showIf: function (c) { return c.blend !== 'globe'; } },
        { key: 'color2',   label: 'Colour 2', type: 'color',  swatches: Lab.COLORS,
          showIf: function (c) { return c.blend !== 'none' && c.blend !== 'globe' && c.blend !== 'random'; } },
        { key: 'additive', label: 'Additive', type: 'toggle',
          help: 'Overlapping dots add up to a brighter colour instead of covering each other. Only works on a dark surface — on a pale one it erases.' }
      ]
    },
    {
      group: 'Region',
      hint: 'The silhouette the pattern is cut to. Everything is placed in fractions of the hero, so a layout holds at any size.',
      items: [
        { key: 'shape', label: 'Silhouette', type: 'thumbs',
          options: Lab.SHAPES, thumb: shapeThumb },
        { key: 'invert', label: 'Invert', type: 'toggle', showIf: notFull,
          help: 'Keeps the dots outside the silhouette instead of inside it.' },
        { key: 'shapeScale', label: 'Scale', type: 'range', min: 0.25, max: 4, step: 0.05,
          showIf: notFull, lo: 'small', hi: 'past the edges' },
        { key: 'shapeX', label: 'Centre X', type: 'range', min: -0.5, max: 1.5, step: 0.01,
          lo: 'left', hi: 'right',
          help: 'Fraction of the hero width. On the globe this moves the sphere.' },
        { key: 'shapeY', label: 'Centre Y', type: 'range', min: -0.5, max: 1.5, step: 0.01,
          lo: 'top', hi: 'bottom' },
        { key: 'feather', label: 'Edge', type: 'range', min: 0.01, max: 0.9, step: 0.01,
          showIf: notFull, lo: 'hard cut', hi: 'dissolved' }
      ]
    },
    {
      group: 'Clear & fade',
      hint: 'Two ways to take dots away: a hole punched under the copy, and a fade toward one edge.',
      items: [
        { key: 'clear', label: 'Hole strength', type: 'range', min: 0, max: 1, step: 0.01,
          lo: 'no hole', hi: 'fully clear',
          help: 'Thins the field behind the headline and chat bar so the copy stays readable.' },
        { key: 'clearSize', label: 'Hole size', type: 'range', min: 0.05, max: 1.2, step: 0.01,
          showIf: function (c) { return c.clear > 0; }, lo: 'tight', hi: 'most of the hero' },
        { key: 'clearX', label: 'Hole X', type: 'range', min: 0, max: 1, step: 0.01,
          showIf: function (c) { return c.clear > 0; }, lo: 'left', hi: 'right' },
        { key: 'clearY', label: 'Hole Y', type: 'range', min: 0, max: 1, step: 0.01,
          showIf: function (c) { return c.clear > 0; }, lo: 'top', hi: 'bottom' },
        { key: 'fadeDir', label: 'Fade', type: 'select', options: FADE_DIRS,
          describe: {
            down: 'Full strength at the top, gone toward the bottom.',
            up:   'Full strength at the bottom, gone toward the top.',
            none: 'The field reaches every edge.'
          } },
        { key: 'fade', label: 'Fade end', type: 'range', min: 0.1, max: 1, step: 0.01,
          showIf: function (c) { return c.fadeDir !== 'none'; }, lo: 'early', hi: 'at the edge',
          help: 'Where the field has gone completely. Below 1 it stops short and leaves a bare strip.' }
      ]
    },
    {
      group: 'Motion',
      hint: 'Deterministic — identical on every load and machine. Respects reduced-motion. On the globe this rides on top of the spin.',
      items: [
        { key: 'style', label: 'Animation', type: 'select', options: Lab.STYLES,
          describe: {
            'static':          'Nothing moves.',
            'shimmer':         'One broad band of light slides across, along Direction.',
            'twinkle':         'Each dot brightens and dims on its own clock.',
            'shimmer-twinkle': 'Both at once — a travelling band over per-dot sparkle.',
            'breathe':         'The whole field brightens and dims in unison.',
            'ripple':          'Soft rings travelling out from the region centre.',
            'pulse':           'The same rings, sharpened into distinct bands.',
            'scan':            'A single bright bar sweeping across. Only brightens.',
            'cascade':         'A front falling across in ranks, like a counter rolling over.',
            'flicker':         'Twinkle snapped to three steps — reads as a signal, not a breath.',
            'drift':           'Dots sway in place. No brightness change.',
            'orbit':           'Each dot circles its own position, phase staggered.',
            'wave':            'A sine runs across, pushing dots up and down.',
            'swirl':           'The field shears around the region centre, faster at the middle.',
            'jitter':          'Dots hold a position for a beat, then snap to a new one.'
          } },
        { key: 'intensity', label: 'Amount', type: 'range', min: 0, max: 1, step: 0.05,
          showIf: moving, lo: 'subtle', hi: 'strong',
          help: 'How far the animation swings — brightness, or distance for the moving ones.' },
        { key: 'speed', label: 'Speed', type: 'range', min: 0.02, max: 2, step: 0.02,
          unit: '/s', showIf: moving, lo: 'slow', hi: 'fast',
          help: 'Cycles per second. Below about 0.3 reads as a texture breathing rather than something moving.' },
        { key: 'angle', label: 'Direction', type: 'range', min: 0, max: 360, step: 1,
          unit: '°', showIf: isFlat, lo: '0° →', hi: '360°',
          help: 'Travel direction for shimmer, scan and cascade. Also turns the diagonal band and corner wedge.' }
      ]
    },
    {
      group: 'Pointer',
      hint: 'How the field answers the cursor. Purely additive — off leaves the design untouched.',
      items: [
        { key: 'pointer', label: 'Response', type: 'select', options: Lab.POINTERS,
          describe: {
            off:     'The field ignores the cursor.',
            glow:    'Dots near the cursor brighten.',
            repel:   'Dots push away from the cursor.',
            attract: 'Dots pull toward the cursor.',
            dim:     'Dots near the cursor fade out.',
            grow:    'Dots near the cursor get bigger.'
          } },
        { key: 'pointerR', label: 'Radius', type: 'range', min: 40, max: 420, step: 10,
          unit: 'px', showIf: function (c) { return c.pointer !== 'off'; },
          lo: 'tight', hi: 'wide', help: 'How far from the cursor the effect reaches.' },
        { key: 'pointerS', label: 'Strength', type: 'range', min: 0.1, max: 2, step: 0.05,
          showIf: function (c) { return c.pointer !== 'off'; }, lo: 'gentle', hi: 'extreme' }
      ]
    },
    {
      group: 'Hero',
      hint: 'The shape of the surface around the dots — not part of the copied field config. Its colour lives under Colour.',
      items: [
        { key: 'heroWidth', label: 'Width', type: 'select', options: WIDTHS,
          describe: {
            bleed:     'Runs to the edges of the slot, no corners.',
            contained: 'Sits in the 1214px content column.'
          } },
        { key: 'heroLayout', label: 'Layout', type: 'select', options: LAYOUTS,
          describe: {
            center: 'Headline above the chat bar, both centred.',
            split:  'Copy on the left, chat bar on the right.',
            left:   'Both left-aligned, vertically centred.',
            low:    'Both left-aligned, pushed to the bottom.'
          } },
        { key: 'heroBackdrop', label: 'Backdrop', type: 'select', options: BACKDROPS,
          describe: {
            none:     'Just the background colour.',
            planet:   'A huge soft sphere of light with a lit rim, behind the dots.',
            halo:     'A soft glow behind the copy.',
            vignette: 'Darkens the corners, over the dots.'
          } },
        { key: 'heroHeight', label: 'Height', type: 'range', min: 240, max: 760, step: 2,
          unit: 'px', lo: 'short', hi: 'tall', help: 'The shipped hero is 420px.' },
        { key: 'heroRadius', label: 'Corner', type: 'range', min: 0, max: 48, step: 1,
          unit: 'px', lo: 'square', hi: 'round' },
        { key: 'heroComposer', label: 'Chat width', type: 'range', min: 360, max: 900, step: 10,
          unit: 'px', showIf: function (c) { return !!c.heroContent; },
          lo: 'narrow', hi: 'wide', help: 'The shipped hero is 520px. The older contained hero used 760px.' },
        { key: 'heroContent', label: 'Show content', type: 'toggle',
          help: 'Hides the headline and chat bar to judge the background on its own.' },
        { key: 'heroOrb', label: 'Show orb', type: 'toggle',
          showIf: function (c) { return !!c.heroContent; },
          help: 'The TruAI orb above the headline. The shipped hero leaves it out.' },
        { key: 'heroVeil', label: 'Veil plate', type: 'toggle',
          showIf: function (c) { return !!c.heroContent; },
          help: 'A feathered plate of hero colour behind the copy, so the background fades out behind it instead of hard-clipping.' }
      ]
    }
  ];

  /* ----------------------------------------------------------------
     State
     ---------------------------------------------------------------- */

  var state = {};
  var field = null;
  var rows = [];          /* { item, el, write } */
  /* The preset currently on screen, or null once a knob has been
     turned. Kept so a theme flip can re-read its palette. */
  var activePreset = null;
  var hero, panel, toast, toastTimer = 0;

  function defaults() {
    var out = {}, k;
    for (k in Lab.DEFAULTS) if (Lab.DEFAULTS.hasOwnProperty(k)) out[k] = Lab.DEFAULTS[k];
    for (k in HERO_DEFAULTS) if (HERO_DEFAULTS.hasOwnProperty(k)) out[k] = HERO_DEFAULTS[k];
    return out;
  }

  function isHeroKey(key) { return HERO_DEFAULTS.hasOwnProperty(key); }

  function fieldConfig(src) {
    var out = {}, k;
    for (k in Lab.DEFAULTS) if (Lab.DEFAULTS.hasOwnProperty(k)) out[k] = src[k];
    return out;
  }

  function load() {
    try {
      var raw = global.localStorage.getItem(STORE);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      var base = defaults(), k;
      for (k in saved) if (base.hasOwnProperty(k) && saved[k] != null) base[k] = saved[k];
      return base;
    } catch (e) {
      return null;
    }
  }

  function save() {
    try {
      global.localStorage.setItem(STORE, JSON.stringify(state));
    } catch (e) { /* private mode — the page still works, it just forgets */ }
  }

  /* ----------------------------------------------------------------
     Building the panel
     ---------------------------------------------------------------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* "38c6a6", "#38C6A6", "#3ca" → "#38c6a6". Null if it isn't a hex
     colour yet, which is every keystroke until the last one. */
  function normalizeHex(value) {
    var h = String(value).trim().replace(/^#/, '');
    if (/^[0-9a-fA-F]{3}$/.test(h)) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return /^[0-9a-fA-F]{6}$/.test(h) ? '#' + h.toLowerCase() : null;
  }

  function formatValue(item, value) {
    if (item.type !== 'range') return '';
    var step = item.step || 1;
    var decimals = step >= 1 ? 0 : (step >= 0.1 ? 1 : (step >= 0.01 ? 2 : 4));
    return Number(value).toFixed(decimals) + (item.unit || '');
  }

  function buildRow(item) {
    var row = el('div', 'pg-row');
    row.dataset.key = item.key;

    var head = el('div', 'pg-row__head');
    head.appendChild(el('label', 'pg-row__label', item.label));
    var val = el('span', 'pg-row__value');
    head.appendChild(val);
    row.appendChild(head);

    var input, write;

    /* A line under the control saying what it does. For a select it
       follows the selection, so the explanation is always about the
       option in front of you rather than a generic blurb. */
    var note = null;
    if (item.help || item.describe) note = el('p', 'pg-row__note', item.help || '');

    if (item.type === 'thumbs') {
      /* Drawn samples instead of a list of names. */
      var grid = el('div', 'pg-thumbs');
      var buttons = [];
      item.options.forEach(function (opt) {
        var b = el('button', 'pg-thumb');
        b.type = 'button';
        b.dataset.value = opt.id;
        b.title = opt.label;
        var cv = el('canvas', 'pg-thumb__art');
        cv.setAttribute('aria-hidden', 'true');
        b.appendChild(cv);
        b.appendChild(el('span', 'pg-thumb__label', opt.label.replace(/\s*\(.*\)$/, '')));
        b.addEventListener('click', function () { apply(item.key, opt.id); });
        grid.appendChild(b);
        buttons.push({ btn: b, cv: cv, opt: opt });
      });
      row.appendChild(grid);

      /* Painted the first time this grid has a measured width — which
         is when its tab is first shown — and again after a resize. */
      pendingThumbs.push({
        done: false,
        paint: function () {
          buttons.forEach(function (t) { Lab.sketch(t.cv, item.thumb(t.opt.id)); });
        },
        measured: function () { return grid.getBoundingClientRect().width > 0; }
      });

      write = function (v) {
        buttons.forEach(function (t) {
          t.btn.classList.toggle('is-on', t.opt.id === v);
          if (t.opt.id === v) val.textContent = t.opt.label;
        });
      };

    } else if (item.type === 'select') {
      input = el('select', 'pg-select');
      item.options.forEach(function (opt) {
        var o = el('option', null, opt.label);
        o.value = opt.id;
        input.appendChild(o);
      });
      input.addEventListener('change', function () { apply(item.key, input.value); });
      write = function (v) {
        input.value = v;
        if (note && item.describe) note.textContent = item.describe[v] || '';
      };
      row.appendChild(input);

    } else if (item.type === 'range') {
      input = el('input', 'pg-range');
      input.type = 'range';
      input.min = item.min;
      input.max = item.max;
      input.step = item.step;
      input.addEventListener('input', function () { apply(item.key, parseFloat(input.value)); });
      row.appendChild(input);

      /* Which way is which. A slider with no ends is a guess. */
      if (item.lo || item.hi) {
        var ends = el('div', 'pg-row__ends');
        ends.appendChild(el('span', null, item.lo || ''));
        ends.appendChild(el('span', null, item.hi || ''));
        row.appendChild(ends);
      }

      write = function (v) { input.value = v; val.textContent = formatValue(item, v); };

    } else if (item.type === 'color') {
      var wrap = el('div', 'pg-color');

      input = el('input', 'pg-color__input');
      input.type = 'color';
      input.addEventListener('input', function () { apply(item.key, input.value); });
      wrap.appendChild(input);

      /* Typed hex, for pasting a value out of Figma. Applied live
         while it parses; anything half-typed is marked and ignored
         rather than snapping the field to black. */
      var hex = el('input', 'pg-color__hex');
      hex.type = 'text';
      hex.spellcheck = false;
      hex.setAttribute('aria-label', item.label + ' hex');
      hex.placeholder = '#000000';
      hex.addEventListener('input', function () {
        var parsed = normalizeHex(hex.value);
        hex.classList.toggle('is-bad', !parsed && hex.value.trim() !== '');
        if (parsed) apply(item.key, parsed);
      });
      hex.addEventListener('blur', function () {
        hex.classList.remove('is-bad');
        hex.value = String(state[item.key]).toUpperCase();
      });
      wrap.appendChild(hex);
      row.appendChild(wrap);

      var swatches = el('div', 'pg-color__swatches');
      (item.swatches || []).forEach(function (sw) {
        var b = el('button', 'pg-swatch');
        b.type = 'button';
        b.title = sw.label;
        b.setAttribute('aria-label', sw.label);
        b.style.background = sw.value;
        b.addEventListener('click', function () { apply(item.key, sw.value); });
        swatches.appendChild(b);
      });
      row.appendChild(swatches);

      write = function (v) {
        input.value = v;
        /* Don't rewrite the box under someone mid-type. */
        if (document.activeElement !== hex) hex.value = String(v).toUpperCase();
        Array.prototype.forEach.call(swatches.children, function (b, i) {
          b.classList.toggle('is-on',
            (item.swatches[i].value || '').toLowerCase() === String(v).toLowerCase());
        });
      };

    } else { /* toggle */
      var tog = el('button', 'pg-toggle');
      tog.type = 'button';
      tog.setAttribute('role', 'switch');
      tog.appendChild(el('span', 'pg-toggle__knob'));
      tog.addEventListener('click', function () {
        apply(item.key, state[item.key] ? 0 : 1);
      });
      row.appendChild(tog);
      write = function (v) {
        tog.classList.toggle('is-on', !!v);
        tog.setAttribute('aria-checked', v ? 'true' : 'false');
      };
    }

    if (note) row.appendChild(note);

    rows.push({ item: item, el: row, write: write });
    return row;
  }

  /* Thumbnail painters, each run once its grid has a size. */
  var pendingThumbs = [];

  function paintThumbs() {
    pendingThumbs.forEach(function (t) {
      if (t.done || !t.measured()) return;
      t.paint();
      t.done = true;
    });
  }

  /* A width change invalidates every sketch, including the ones in
     tabs that are currently hidden. */
  function repaintThumbs() {
    pendingThumbs.forEach(function (t) { t.done = false; });
    paintThumbs();
  }

  /* ----------------------------------------------------------------
     Tabs

     Every group as one scrollable column ran to several thousand
     pixels once the thumbnails arrived. Showing one group at a time
     keeps any single view to about a screen, and the strip stays put
     at the top so you are never more than one click from anywhere.
     ---------------------------------------------------------------- */

  var TAB_STORE = 'd3-dot-playground-tab';
  var tabs = [];          /* { id, btn, panel } */
  var sections = [];      /* { el, rows } — a heading and what it covers */
  var activeTab = 'looks';

  function buildPanel() {
    var host = document.getElementById('pg-groups');
    var strip = document.getElementById('pg-tabs');

    function addTab(id, label, panel) {
      var btn = el('button', 'pg-tab__btn', label);
      btn.type = 'button';
      btn.id = 'pg-tabbtn-' + id;
      btn.setAttribute('role', 'tab');
      btn.addEventListener('click', function () { showTab(id); });
      strip.appendChild(btn);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', btn.id);
      tabs.push({ id: id, btn: btn, panel: panel });
    }

    addTab('looks', 'Looks', document.getElementById('pg-tab-looks'));

    SCHEMA.forEach(function (group, gi) {
      var id = 'g' + gi;
      var panel = el('section', 'pg-tab');
      panel.id = 'pg-tab-' + id;
      if (group.hint) panel.appendChild(el('p', 'pg-group__hint', group.hint));

      var current = null;
      group.items.forEach(function (item) {
        /* A group covering two distinct things gets a rule between them. */
        if (item.section) {
          var label = el('p', 'pg-section', item.section);
          panel.appendChild(label);
          current = { el: label, rows: [] };
          sections.push(current);
        }
        panel.appendChild(buildRow(item));
        /* Remember which rows sit under this heading, so the heading
           can disappear with them — "Links" means nothing on the globe,
           where both of its controls are hidden. */
        if (current) current.rows.push(rows[rows.length - 1]);
      });
      host.appendChild(panel);
      addTab(id, group.group, panel);
    });

    var saved = null;
    try { saved = global.localStorage.getItem(TAB_STORE); } catch (e) {}
    showTab(saved && findTab(saved) ? saved : 'looks');
  }

  function findTab(id) {
    for (var i = 0; i < tabs.length; i++) if (tabs[i].id === id) return tabs[i];
    return null;
  }

  function showTab(id) {
    activeTab = id;
    tabs.forEach(function (t) {
      var on = t.id === id;
      t.btn.classList.toggle('is-on', on);
      t.btn.setAttribute('aria-selected', on ? 'true' : 'false');
      t.panel.hidden = !on;
    });
    try { global.localStorage.setItem(TAB_STORE, id); } catch (e) {}
    /* A canvas in a hidden panel has no measured size and draws
       nothing, so its thumbnails are painted the first time its tab
       is actually shown. */
    paintThumbs();
    var body = document.querySelector('.pg-panel__body');
    if (body) body.scrollTop = 0;
  }

  function buildPresets() {
    var host = document.getElementById('pg-presets');
    host.appendChild(el('p', 'pg-presets__label', 'Presets'));
    var list = el('div', 'pg-presets__list');

    Lab.PRESETS.forEach(function (preset) {
      var b = el('button', 'pg-preset', preset.label);
      b.type = 'button';
      b.dataset.preset = preset.id;
      b.addEventListener('click', function () { usePreset(preset); });
      list.appendChild(b);
    });

    host.appendChild(list);
  }

  /* ----------------------------------------------------------------
     Templates

     A template is a literal snapshot of what is on screen: the whole
     field config, and optionally the hero around it. Unlike a built-in
     preset it carries no second palette, so flipping the theme moves
     the surface and leaves a template's own colours exactly as saved.
     ---------------------------------------------------------------- */

  var templates = [];

  function loadTemplates() {
    try {
      var raw = global.localStorage.getItem(TPL_STORE);
      var list = raw ? JSON.parse(raw) : [];
      return Object.prototype.toString.call(list) === '[object Array]' ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveTemplates() {
    try {
      global.localStorage.setItem(TPL_STORE, JSON.stringify(templates));
      return true;
    } catch (e) {
      /* Quota, or a browser with storage switched off. Saying so beats
         a chip that silently vanishes on reload. */
      say('Could not save — browser storage is unavailable');
      return false;
    }
  }

  /* "Dot globe · twinkle" — enough to tell two snapshots apart before
     the user types over it. */
  function suggestName() {
    function labelOf(list, id) {
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i].label;
      return id;
    }
    var base = labelOf(Lab.FORMATIONS, state.formation).replace(/\s*\(.*\)$/, '');
    var motion = labelOf(Lab.STYLES, state.style).replace(/\s*\(.*\)$/, '').toLowerCase();
    return base + ' · ' + motion;
  }

  function uniqueName(name) {
    var taken = {};
    templates.forEach(function (t) { taken[t.name] = true; });
    if (!taken[name]) return name;
    var n = 2;
    while (taken[name + ' ' + n]) n++;
    return name + ' ' + n;
  }

  function heroSnapshot() {
    var out = {}, k;
    for (k in HERO_DEFAULTS) if (HERO_DEFAULTS.hasOwnProperty(k)) out[k] = state[k];
    return out;
  }

  /* A template is applied through the same path as a preset, so there
     is one code path for "put this configuration on screen". */
  function templateAsPreset(tpl) {
    return { id: 'tpl:' + tpl.id, label: tpl.name, cfg: tpl.cfg, hero: tpl.hero || null };
  }

  function addTemplate(name, includeHero) {
    var tpl = {
      id: 't' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
      name: uniqueName((name || '').trim() || suggestName()),
      cfg: fieldConfig(state),
      hero: includeHero ? heroSnapshot() : null
    };
    templates.push(tpl);
    if (!saveTemplates()) {
      templates.pop();
      return;
    }
    buildTemplates();
    markActive('tpl:' + tpl.id);
    activePreset = templateAsPreset(tpl);
    say('Saved "' + tpl.name + '"' + (includeHero ? ' with the hero' : ' (dots only)'));
  }

  function removeTemplate(id) {
    var gone = null;
    templates = templates.filter(function (t) {
      if (t.id !== id) return true;
      gone = t;
      return false;
    });
    saveTemplates();
    buildTemplates();
    if (gone) say('Deleted "' + gone.name + '"');
  }

  function buildTemplates() {
    var host = document.getElementById('pg-templates');
    host.innerHTML = '';

    var head = el('div', 'pg-templates__head');
    head.appendChild(el('p', 'pg-presets__label', 'Your templates'));
    var add = el('button', 'pg-templates__add', 'Save current');
    add.type = 'button';
    add.addEventListener('click', function () { openSaveForm(); });
    head.appendChild(add);
    host.appendChild(head);

    host.appendChild(buildSaveForm());

    if (!templates.length) {
      host.appendChild(el('p', 'pg-templates__empty',
        'Nothing saved yet. Tune the dots, then Save current.'));
      return;
    }

    var list = el('div', 'pg-presets__list');
    templates.forEach(function (tpl) {
      var chip = el('span', 'pg-tpl');

      var use = el('button', 'pg-tpl__use', tpl.name);
      use.type = 'button';
      use.dataset.preset = 'tpl:' + tpl.id;
      use.title = tpl.hero ? 'Dots and hero' : 'Dots only';
      use.addEventListener('click', function () { usePreset(templateAsPreset(tpl)); });
      chip.appendChild(use);

      var del = el('button', 'pg-tpl__del', '×');
      del.type = 'button';
      del.setAttribute('aria-label', 'Delete ' + tpl.name);
      /* Two-step: a stray click on a tiny × shouldn't lose saved work. */
      del.addEventListener('click', function () {
        if (del.dataset.armed) { removeTemplate(tpl.id); return; }
        del.dataset.armed = '1';
        del.textContent = 'Delete?';
        chip.classList.add('is-arming');
        global.setTimeout(function () {
          if (!del.parentNode) return;
          delete del.dataset.armed;
          del.textContent = '×';
          chip.classList.remove('is-arming');
        }, 3000);
      });
      chip.appendChild(del);

      list.appendChild(chip);
    });
    host.appendChild(list);
  }

  var saveForm = null;

  function buildSaveForm() {
    if (saveForm) return saveForm;

    saveForm = el('div', 'pg-tplform');
    saveForm.hidden = true;

    var name = el('input', 'pg-tplform__name');
    name.type = 'text';
    name.setAttribute('aria-label', 'Template name');
    name.placeholder = 'Template name';
    saveForm.appendChild(name);

    var opt = el('label', 'pg-tplform__opt');
    var box = el('input');
    box.type = 'checkbox';
    box.checked = true;
    opt.appendChild(box);
    opt.appendChild(el('span', null, 'Include the hero surface'));
    saveForm.appendChild(opt);

    var actions = el('div', 'pg-tplform__actions');
    var ok = el('button', 'pg-btn pg-btn--primary', 'Save');
    ok.type = 'button';
    var cancel = el('button', 'pg-btn', 'Cancel');
    cancel.type = 'button';
    actions.appendChild(ok);
    actions.appendChild(cancel);
    saveForm.appendChild(actions);

    function close() { saveForm.hidden = true; }
    function commit() {
      addTemplate(name.value, box.checked);
      close();
    }

    ok.addEventListener('click', commit);
    cancel.addEventListener('click', close);
    name.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); commit(); }
      if (e.key === 'Escape') close();
    });

    saveForm.__open = function () {
      saveForm.hidden = false;
      name.value = '';
      name.placeholder = suggestName();
      name.focus();
    };

    return saveForm;
  }

  function openSaveForm() {
    buildSaveForm().__open();
  }

  /* The id goes inside a quoted attribute selector, so "tpl:abc" needs
     no escaping — only a literal quote would, and ids are generated. */
  function markActive(id) {
    markPresetDirty();
    var btn = document.querySelector('[data-preset="' + id + '"]');
    if (btn) btn.classList.add('is-on');
  }

  /* ----------------------------------------------------------------
     Applying state
     ---------------------------------------------------------------- */

  function apply(key, value) {
    if (state[key] === value) return;
    var prevTone = currentTone();
    state[key] = value;

    /* Theme and background are two views of one thing, so each pulls
       the other into line rather than letting them contradict. A
       custom colour reports its own tone from its brightness. */
    if (key === 'heroTheme') state.heroBg = THEME_BG[value] || state.heroBg;
    if (BG_KEYS[key]) state.heroTheme = currentTone();

    if (isHeroKey(key)) {
      applyHero();
      /* A palette tuned for one surface is invisible on the other, so
         crossing between them re-reads the preset you are looking at.
         Only on an actual crossing: re-palleting on every nudge of a
         custom colour would fight the person using the picker. Hand
         edits aren't touched either — there is no preset to re-read. */
      if ((BG_KEYS[key] || key === 'heroTheme') && currentTone() !== prevTone &&
          activePreset && applyPresetColors(activePreset)) {
        return;
      }
    } else {
      var patch = {};
      patch[key] = value;
      field.set(patch);
      markPresetDirty();
    }

    syncRows();
    save();
  }

  function bgEntry() {
    var want = state.heroBg;
    for (var i = 0; i < HERO_BGS.length; i++) {
      if (HERO_BGS[i].id === want) return HERO_BGS[i];
    }
    return HERO_BGS[0];
  }

  /* Perceived brightness, 0–1. Used to decide a custom hero's tone so
     the headline and backdrops stay readable without the user having
     to tell us whether the colour they picked is dark. */
  function brightness(hex) {
    var h = String(hex).replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return 0;
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  function customBgValue() {
    return state.heroBgGradient
      ? 'linear-gradient(180deg, ' + state.heroBgCustom + ' 20%, ' + state.heroBgCustom2 + ' 100%)'
      : state.heroBgCustom;
  }

  function currentTone() {
    var bg = bgEntry();
    if (!bg.custom) return bg.tone || 'dark';
    /* A gradient is judged on both ends — the copy sits over the middle. */
    var lum = state.heroBgGradient
      ? (brightness(state.heroBgCustom) + brightness(state.heroBgCustom2)) / 2
      : brightness(state.heroBgCustom);
    return lum > 0.55 ? 'light' : 'dark';
  }

  function isLight() { return currentTone() === 'light'; }

  /* Re-read the active preset's colours for the current tone, leaving
     every other knob alone. */
  var TONE_KEYS = ['color', 'color2', 'blend', 'opacity', 'additive', 'links'];

  function applyPresetColors(preset) {
    /* A saved template is a literal snapshot with no second palette —
       there is nothing to re-read, so leave its colours alone. */
    if (!preset.light) return false;

    var src = isLight() ? preset.light : null;
    var patch = {};
    /* Dark is the preset's own `cfg`, falling back to DEFAULTS for any
       key only the light patch mentions. */
    TONE_KEYS.forEach(function (key) {
      var v = src && src.hasOwnProperty(key) ? src[key]
        : (preset.cfg.hasOwnProperty(key) ? preset.cfg[key] : Lab.DEFAULTS[key]);
      patch[key] = v;
      state[key] = v;
    });
    field.set(patch);
    syncRows();
    save();
    return true;
  }

  function applyHero() {
    var bg = bgEntry();
    hero.style.background = bg.custom ? customBgValue() : bg.value;
    hero.style.minHeight = state.heroHeight + 'px';
    hero.style.borderRadius = state.heroRadius + 'px';
    hero.style.setProperty('--pg-veil-bg',
      bg.custom ? state.heroBgCustom : (bg.veil || '#172d2d'));
    hero.style.setProperty('--pg-composer', state.heroComposer + 'px');
    hero.dataset.layout = state.heroLayout;
    hero.dataset.width = state.heroWidth;
    hero.dataset.backdrop = state.heroBackdrop;
    /* Light backgrounds need dark hero text, and flip the backdrops
       from white light to black shade — the dots are the user's
       problem, but unreadable copy is just a broken preview. */
    hero.dataset.tone = currentTone();
    hero.classList.toggle('is-bare', !state.heroContent);
    hero.classList.toggle('is-no-orb', !state.heroOrb);
    hero.classList.toggle('is-veiled', !!state.heroVeil && !!state.heroContent);
  }

  /* Re-read every control from state and hide the ones that don't
     apply to the current configuration. Cheap enough to run on every
     change, and it keeps the panel honest. */
  function syncRows() {
    rows.forEach(function (row) {
      row.write(state[row.item.key]);
      row.el.classList.toggle('is-hidden', !!row.item.showIf && !row.item.showIf(state));
    });
    sections.forEach(function (s) {
      var any = false;
      for (var i = 0; i < s.rows.length; i++) {
        if (!s.rows[i].el.classList.contains('is-hidden')) { any = true; break; }
      }
      s.el.classList.toggle('is-hidden', !any);
    });
  }

  function markPresetDirty() {
    activePreset = null;
    Array.prototype.forEach.call(
      document.querySelectorAll('.pg-preset, .pg-tpl__use'),
      function (b) { b.classList.remove('is-on'); }
    );
  }

  function usePreset(preset) {
    var next = defaults(), k;
    /* A preset is a dot look, not a page: the hero carries over from
       whatever the user has set, so switching presets compares
       backgrounds and only backgrounds. Presets may still state
       `heroBackdrop`, which overlays the hero rather than replacing
       it — and every one of them does, so it always resets cleanly. */
    for (k in HERO_DEFAULTS) if (HERO_DEFAULTS.hasOwnProperty(k)) next[k] = state[k];
    for (k in preset.cfg) if (preset.cfg.hasOwnProperty(k)) next[k] = preset.cfg[k];
    if (preset.hero) {
      for (k in preset.hero) if (preset.hero.hasOwnProperty(k)) next[k] = preset.hero[k];
    }
    /* On a pale hero the preset's light palette replaces its colours. */
    if (bgEntry().tone === 'light' && preset.light) {
      for (k in preset.light) if (preset.light.hasOwnProperty(k)) next[k] = preset.light[k];
    }

    state = next;
    field.set(fieldConfig(state));
    syncRows();
    applyHero();
    save();

    markActive(preset.id);
    activePreset = preset;
  }

  /* Shuffle picks from the option catalogues rather than from a raw
     numeric range, so what comes out is always a plausible field
     instead of 4000 invisible dots. */
  function shuffle() {
    function pick(list) { return list[Math.floor(Math.random() * list.length)].id; }
    function pickColor() { return Lab.COLORS[Math.floor(Math.random() * Lab.COLORS.length)].value; }
    function num(lo, hi, step) {
      var n = Math.round((lo + Math.random() * (hi - lo)) / step) * step;
      return parseFloat(n.toFixed(4));
    }

    var formation = pick(Lab.FORMATIONS);
    var sphere = formation === 'sphere';
    var shape = sphere ? 'full' : pick(Lab.SHAPES);

    var patch = {
      formation:   formation,
      spacing:     num(14, 44, 1),
      jitter:      Math.random() < 0.35 ? num(0.2, 1, 0.05) : 0,
      count:       num(800, 3200, 50),
      orbScale:    num(0.7, 1.6, 0.05),
      tilt:        num(-35, 35, 1),
      perspective: num(1.8, 5, 0.1),
      spin:        num(0.002, 0.03, 0.0005),
      limb:        num(0.4, 1, 0.05),

      glyph:     sphere || Math.random() < 0.55 ? 'circle' : pick(Lab.GLYPHS),
      size:      sphere ? num(0.8, 1.8, 0.1) : num(1.2, 3.4, 0.1),
      sizeVary:  num(0, 1, 0.05),
      sizeTilt:  Math.random() < 0.3 ? num(-0.8, 0.8, 0.05) : 0,
      rotate:    Math.random() < 0.3 ? num(0, 90, 1) : 0,

      blend:     sphere && Math.random() < 0.5 ? 'globe' : (Math.random() < 0.4 ? pick(Lab.BLENDS) : 'none'),
      color:     pickColor(),
      color2:    pickColor(),
      opacity:   sphere ? num(0.7, 1, 0.01) : num(0.3, 0.7, 0.01),
      additive:  sphere ? 1 : (Math.random() < 0.3 ? 1 : 0),

      shape:      shape,
      shapeScale: num(0.8, 3, 0.05),
      shapeX:     sphere ? 0.5 : num(0.25, 0.75, 0.01),
      shapeY:     sphere ? 0.5 : num(0.35, 0.9, 0.01),
      feather:    num(0.2, 0.85, 0.01),
      invert:     0,

      clear:     !sphere && Math.random() < 0.6 ? num(0.3, 0.85, 0.01) : 0,
      clearSize: num(0.3, 0.55, 0.01),
      clearX:    0.5,
      clearY:    num(0.4, 0.55, 0.01),
      fadeDir:   !sphere && Math.random() < 0.5 ? 'down' : 'none',
      fade:      num(0.7, 1, 0.01),

      links:     !sphere && Math.random() < 0.25 ? num(0.05, 0.16, 0.01) : 0,
      linkWidth: 1,

      style:     pick(Lab.STYLES),
      intensity: num(0.4, 1, 0.05),
      speed:     num(0.08, 0.7, 0.02),
      angle:     num(0, 360, 5)
    };

    for (var k in patch) if (patch.hasOwnProperty(k)) state[k] = patch[k];
    field.set(fieldConfig(state));
    syncRows();
    save();
    markPresetDirty();
    say('Shuffled — ' + formation + ' · ' + shape + ' · ' + patch.style);
  }

  function reset() {
    state = defaults();
    field.set(fieldConfig(state));
    syncRows();
    applyHero();
    save();
    markPresetDirty();
    activePreset = Lab.PRESETS[0];
    var btn = document.querySelector('.pg-preset[data-preset="shipped"]');
    if (btn) btn.classList.add('is-on');
    say('Reset to the shipped hero');
  }

  /* ----------------------------------------------------------------
     Copy

     Demo 3 has two background engines, so the copy has to say which
     one a look belongs to and what, if anything, would be lost.
     ---------------------------------------------------------------- */

  /* What demo-2's dot-field.js, the flat-field engine, understands. */
  var SHIPPED_FLAT = {
    formation: ['staggered', 'grid', 'hex', 'diagonal', 'rings'],
    shape: ['full', 'circle', 'square', 'cluster', 'pair', 'blob', 'blobs', 'ring', 'band', 'arch'],
    style: ['static', 'shimmer-twinkle', 'shimmer', 'twinkle', 'breathe', 'ripple', 'scan', 'drift']
  };

  /* Extended keys and the value at which each has no visual effect. */
  var NEUTRAL = {
    jitter: 0, glyph: 'circle', sizeTilt: 0, rotate: 0, blend: 'none',
    invert: 0, fadeDir: 'down', links: 0, pointer: 'off', additive: 0
  };

  function unsupportedFlat(cfg) {
    var notes = [], k;
    for (k in SHIPPED_FLAT) {
      if (SHIPPED_FLAT.hasOwnProperty(k) && SHIPPED_FLAT[k].indexOf(cfg[k]) === -1) {
        notes.push(k + ' "' + cfg[k] + '"');
      }
    }
    for (k in NEUTRAL) {
      if (NEUTRAL.hasOwnProperty(k) && cfg[k] !== NEUTRAL[k]) notes.push(k);
    }
    return notes;
  }

  function objectLines(cfg, keys) {
    var lines = [];
    keys.forEach(function (k) {
      var v = cfg[k];
      lines.push('  ' + k + ': ' + (typeof v === 'string' ? '"' + v + '"' : v));
    });
    return lines.join(',\n');
  }

  function allKeys() {
    var keys = [];
    for (var k in Lab.DEFAULTS) if (Lab.DEFAULTS.hasOwnProperty(k)) keys.push(k);
    return keys;
  }

  function buildCopy(cfg) {
    if (cfg.formation === 'sphere') {
      /* The shipped globe is constants at the top of d3-home-4.js, not
         a config object — so hand back the constants it actually has,
         and keep the rest as lab-only extras. */
      var speedRadMs = (cfg.spin * Math.PI * 2 / 1000).toExponential(2);
      return {
        gaps: [],
        text:
          '/* Globe — paste over the constants at the top of\n' +
          '   portal-2.0/demo-3/js/d3-home-4.js. */\n' +
          'var COUNT = ' + Math.round(cfg.count) + ';\n' +
          'var TILT = (' + cfg.tilt + ' * Math.PI) / 180;\n' +
          'var SPEED = ' + speedRadMs + '; /* rad / ms */\n' +
          'var PERSPECTIVE = ' + cfg.perspective + ';\n' +
          '\n' +
          '/* Playground-only — d3-home-4.js has no knob for these yet:\n' +
          '   radius x' + cfg.orbScale + ', limb ' + cfg.limb +
          ', opacity ' + cfg.opacity + ', glyph "' + cfg.glyph + '",\n' +
          '   centre (' + cfg.shapeX + ', ' + cfg.shapeY + '), blend "' + cfg.blend + '". */\n' +
          '\n' +
          '/* Full lab config */\n' +
          'var LAB_CONFIG = {\n' + objectLines(cfg, allKeys()) + '\n};'
      };
    }

    var gaps = unsupportedFlat(cfg);
    var head = gaps.length
      ? '/* Needs the playground engine (js/tru-dot-lab.js).\n' +
        '   TruDotField would ignore: ' + gaps.join(', ') + ' */\n'
      : '/* Paste over DARK_CONFIG in portal-2.0/demo-3/js/d3-home-dots.js.\n' +
        '   That is the flat dot hero, not the globe. */\n';

    return { gaps: gaps, text: head + 'var DARK_CONFIG = {\n' + objectLines(cfg, allKeys()) + '\n};' };
  }

  function copyConfig() {
    var out = buildCopy(fieldConfig(state));

    function done(ok) {
      var where = state.formation === 'sphere' ? ' for d3-home-4.js' :
        (out.gaps.length ? ' · needs tru-dot-lab.js' : ' for d3-home-dots.js');
      say(ok ? 'Config copied' + where : 'Copy blocked — config logged to the console');
      if (!ok) global.console.log(out.text);
    }

    if (global.navigator.clipboard && global.navigator.clipboard.writeText) {
      global.navigator.clipboard.writeText(out.text).then(
        function () { done(true); },
        function () { done(false); }
      );
    } else {
      done(false);
    }
  }

  function say(message) {
    toast.textContent = message;
    toast.classList.add('is-on');
    global.clearTimeout(toastTimer);
    toastTimer = global.setTimeout(function () { toast.classList.remove('is-on'); }, 2600);
  }

  /* ----------------------------------------------------------------
     Boot
     ---------------------------------------------------------------- */

  function boot() {
    hero  = document.getElementById('pg-hero');
    panel = document.getElementById('pg-panel');
    toast = document.getElementById('pg-toast');

    state = load() || defaults();

    field = Lab.mount(document.getElementById('pg-dots'), fieldConfig(state));

    templates = loadTemplates();

    buildPresets();
    buildTemplates();
    buildPanel();
    syncRows();
    applyHero();
    /* After layout, so each thumbnail canvas has a measured size. */
    paintThumbs();
    if (global.ResizeObserver) {
      new global.ResizeObserver(repaintThumbs).observe(panel);
    }

    document.querySelector('[data-act="copy"]').addEventListener('click', copyConfig);
    document.querySelector('[data-act="reset"]').addEventListener('click', reset);
    document.querySelector('[data-act="shuffle"]').addEventListener('click', shuffle);
    document.querySelector('[data-act="panel"]').addEventListener('click', togglePanel);

    document.addEventListener('keydown', function (e) {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === 'p' || e.key === 'P') togglePanel();
    });

    /* Dot count and frame rate — the two numbers that tell you whether
       a look is affordable before it ships. */
    var dotsOut = document.querySelector('[data-stat="dots"]');
    var fpsOut = document.querySelector('[data-stat="fps"]');
    global.setInterval(function () {
      var s = field.stats();
      dotsOut.textContent = s.dots.toLocaleString() + ' dots' +
        (s.links ? ' · ' + s.links.toLocaleString() + ' links' : '');
      fpsOut.textContent = s.fps ? s.fps + ' fps' : 'static';
    }, 500);
  }

  function togglePanel() {
    var hidden = document.body.classList.toggle('pg--no-panel');
    var btn = document.querySelector('[data-act="panel"]');
    btn.setAttribute('aria-label', hidden ? 'Show panel' : 'Hide panel');
    panel.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
