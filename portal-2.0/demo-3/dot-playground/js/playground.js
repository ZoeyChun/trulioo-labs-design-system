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
  var Lab = global.TruDotLab;

  /* Hero-only settings — the layout half of the playground. Defaults
     are the shipped home 4: full-bleed, 420px, --surface-inverse, no
     orb, veil behind the copy, 520px composer. */
  var HERO_DEFAULTS = {
    heroBg:       'inverse',
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
     hero behind it, and a gradient has no single colour to read. */
  var HERO_BGS = [
    { id: 'inverse',   label: 'Inverse (home 4)',  value: '#172d2d', veil: '#172d2d' },
    { id: 'gradient5', label: 'Gradient (home 5)', veil: '#172d2d',
      value: 'linear-gradient(180deg, #172d2d 20%, #004c45 100%)' },
    { id: 'forest',    label: 'Forest (home 1)',   value: '#004c45', veil: '#004c45' },
    { id: 'deep',      label: 'Deep teal',         value: '#00332e', veil: '#00332e' },
    { id: 'ink',       label: 'Ink',               value: '#0d1a19', veil: '#0d1a19' },
    { id: 'black',     label: 'Black',             value: '#000000', veil: '#000000' },
    { id: 'navy',      label: 'Navy',              value: '#04245c', veil: '#04245c' },
    { id: 'gradient',  label: 'Forest gradient',   veil: '#00332e',
      value: 'linear-gradient(135deg, #00332e 0%, #004c45 55%, #0a6457 100%)' },
    { id: 'light',     label: 'Light neutral',     value: '#f4f6f4', veil: '#f4f6f4' },
    { id: 'white',     label: 'White',             value: '#ffffff', veil: '#ffffff' }
  ];

  var WIDTHS = [
    { id: 'bleed',     label: 'Full bleed (home 3–5)' },
    { id: 'contained', label: 'Contained 1214px (home 1)' }
  ];

  var LAYOUTS = [
    { id: 'center', label: 'Centred (home 1/3/4)' },
    { id: 'split',  label: 'Split (home 5)' },
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
      hint: 'Where the dots sit and how dense they are.',
      items: [
        { key: 'formation',   label: 'Formation',   type: 'select', options: Lab.FORMATIONS },
        { key: 'spacing',     label: 'Spacing',     type: 'range', min: 8, max: 80, step: 1, unit: 'px', showIf: isFlat },
        { key: 'jitter',      label: 'Scatter',     type: 'range', min: 0, max: 1, step: 0.05, showIf: isFlat },
        { key: 'count',       label: 'Dot count',   type: 'range', min: 200, max: 6000, step: 50, showIf: isSphere },
        { key: 'orbScale',    label: 'Globe size',  type: 'range', min: 0.3, max: 3, step: 0.05, showIf: isOrb },
        { key: 'tilt',        label: 'Axis tilt',   type: 'range', min: -60, max: 60, step: 1, unit: '°', showIf: isOrb },
        { key: 'perspective', label: 'Perspective', type: 'range', min: 1.2, max: 8, step: 0.1, showIf: isSphere },
        { key: 'spin',        label: 'Spin',        type: 'range', min: 0, max: 0.2, step: 0.0005, unit: ' rev/s', showIf: isSphere },
        { key: 'limb',        label: 'Limb glow',   type: 'range', min: 0, max: 1, step: 0.05, showIf: isSphere }
      ]
    },
    {
      group: 'Dot',
      hint: 'What each dot is drawn as.',
      items: [
        { key: 'glyph',    label: 'Shape',       type: 'select', options: Lab.GLYPHS },
        { key: 'size',     label: 'Size',        type: 'range', min: 0.4, max: 8, step: 0.1, unit: 'px' },
        { key: 'sizeVary', label: 'Size spread', type: 'range', min: 0, max: 1, step: 0.05 },
        { key: 'sizeTilt', label: 'Size tilt',   type: 'range', min: -1, max: 1, step: 0.05 },
        { key: 'rotate',   label: 'Rotation',    type: 'range', min: 0, max: 180, step: 1, unit: '°' },
        { key: 'opacity',  label: 'Opacity',     type: 'range', min: 0, max: 1, step: 0.01 }
      ]
    },
    {
      group: 'Colour',
      hint: 'One colour, a gradient across the field, or the shipped globe ramp. Additive makes overlapping dots add up instead of covering each other — it is what gives the globe its glow.',
      items: [
        { key: 'blend',    label: 'Blend',    type: 'select', options: Lab.BLENDS },
        { key: 'color',    label: 'Colour',   type: 'color',  swatches: Lab.COLORS,
          showIf: function (c) { return c.blend !== 'globe'; } },
        { key: 'color2',   label: 'Colour 2', type: 'color',  swatches: Lab.COLORS,
          showIf: function (c) { return c.blend !== 'none' && c.blend !== 'globe' && c.blend !== 'random'; } },
        { key: 'additive', label: 'Additive', type: 'toggle' }
      ]
    },
    {
      group: 'Region',
      hint: 'The silhouette the pattern is cut to. Everything is placed in fractions of the hero, so a layout holds at any size. On the globe these also move and size the sphere itself.',
      items: [
        { key: 'shape',      label: 'Shape',    type: 'select', options: Lab.SHAPES },
        { key: 'invert',     label: 'Invert',   type: 'toggle', showIf: notFull },
        { key: 'shapeScale', label: 'Scale',    type: 'range', min: 0.25, max: 4, step: 0.05, showIf: notFull },
        { key: 'shapeX',     label: 'Centre X', type: 'range', min: -0.5, max: 1.5, step: 0.01 },
        { key: 'shapeY',     label: 'Centre Y', type: 'range', min: -0.5, max: 1.5, step: 0.01 },
        { key: 'feather',    label: 'Edge',     type: 'range', min: 0.01, max: 0.9, step: 0.01, showIf: notFull }
      ]
    },
    {
      group: 'Clear & fade',
      hint: 'A soft hole under the hero text, and the fade toward the edge.',
      items: [
        { key: 'clear',     label: 'Hole strength', type: 'range', min: 0, max: 1, step: 0.01 },
        { key: 'clearSize', label: 'Hole size',     type: 'range', min: 0.05, max: 1.2, step: 0.01, showIf: function (c) { return c.clear > 0; } },
        { key: 'clearX',    label: 'Hole X',        type: 'range', min: 0, max: 1, step: 0.01, showIf: function (c) { return c.clear > 0; } },
        { key: 'clearY',    label: 'Hole Y',        type: 'range', min: 0, max: 1, step: 0.01, showIf: function (c) { return c.clear > 0; } },
        { key: 'fadeDir',   label: 'Fade',          type: 'select', options: FADE_DIRS },
        { key: 'fade',      label: 'Fade end',      type: 'range', min: 0.1, max: 1, step: 0.01, showIf: function (c) { return c.fadeDir !== 'none'; } }
      ]
    },
    {
      group: 'Links',
      hint: 'Lines between neighbouring dots. Off at zero, and unavailable on the dot globe.',
      items: [
        { key: 'links',     label: 'Line opacity', type: 'range', min: 0, max: 0.6, step: 0.01, showIf: isFlat },
        { key: 'linkWidth', label: 'Line width',   type: 'range', min: 0.25, max: 3, step: 0.25, unit: 'px',
          showIf: function (c) { return isFlat(c) && c.links > 0; } }
      ]
    },
    {
      group: 'Motion',
      hint: 'Deterministic — the same every load. Respects reduced-motion. On the globe this rides on top of the spin.',
      items: [
        { key: 'style',     label: 'Animation', type: 'select', options: Lab.STYLES },
        { key: 'intensity', label: 'Amount',    type: 'range', min: 0, max: 1, step: 0.05, showIf: moving },
        { key: 'speed',     label: 'Speed',     type: 'range', min: 0.02, max: 2, step: 0.02, unit: '/s', showIf: moving },
        { key: 'angle',     label: 'Direction', type: 'range', min: 0, max: 360, step: 1, unit: '°', showIf: isFlat }
      ]
    },
    {
      group: 'Pointer',
      hint: 'How the field answers the cursor. Additive — off leaves the design untouched.',
      items: [
        { key: 'pointer',  label: 'Response', type: 'select', options: Lab.POINTERS },
        { key: 'pointerR', label: 'Radius',   type: 'range', min: 40, max: 420, step: 10, unit: 'px', showIf: function (c) { return c.pointer !== 'off'; } },
        { key: 'pointerS', label: 'Strength', type: 'range', min: 0.1, max: 2, step: 0.05, showIf: function (c) { return c.pointer !== 'off'; } }
      ]
    },
    {
      group: 'Hero',
      hint: 'The surface around the dots — not part of the copied field config.',
      items: [
        { key: 'heroBg',       label: 'Background',  type: 'select', options: HERO_BGS },
        { key: 'heroWidth',    label: 'Width',       type: 'select', options: WIDTHS },
        { key: 'heroLayout',   label: 'Layout',      type: 'select', options: LAYOUTS },
        { key: 'heroBackdrop', label: 'Backdrop',    type: 'select', options: BACKDROPS },
        { key: 'heroHeight',   label: 'Height',      type: 'range', min: 240, max: 760, step: 2, unit: 'px' },
        { key: 'heroRadius',   label: 'Corner',      type: 'range', min: 0, max: 48, step: 1, unit: 'px' },
        { key: 'heroComposer', label: 'Chat width',  type: 'range', min: 360, max: 900, step: 10, unit: 'px',
          showIf: function (c) { return !!c.heroContent; } },
        { key: 'heroContent',  label: 'Show content', type: 'toggle' },
        { key: 'heroOrb',      label: 'Show orb',     type: 'toggle', showIf: function (c) { return !!c.heroContent; } },
        { key: 'heroVeil',     label: 'Veil plate',   type: 'toggle', showIf: function (c) { return !!c.heroContent; } }
      ]
    }
  ];

  /* ----------------------------------------------------------------
     State
     ---------------------------------------------------------------- */

  var state = {};
  var field = null;
  var rows = [];          /* { item, el, write } */
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

    if (item.type === 'select') {
      input = el('select', 'pg-select');
      item.options.forEach(function (opt) {
        var o = el('option', null, opt.label);
        o.value = opt.id;
        input.appendChild(o);
      });
      input.addEventListener('change', function () { apply(item.key, input.value); });
      write = function (v) { input.value = v; };
      row.appendChild(input);

    } else if (item.type === 'range') {
      input = el('input', 'pg-range');
      input.type = 'range';
      input.min = item.min;
      input.max = item.max;
      input.step = item.step;
      input.addEventListener('input', function () { apply(item.key, parseFloat(input.value)); });
      write = function (v) { input.value = v; val.textContent = formatValue(item, v); };
      row.appendChild(input);

    } else if (item.type === 'color') {
      var wrap = el('div', 'pg-color');
      input = el('input', 'pg-color__input');
      input.type = 'color';
      input.addEventListener('input', function () { apply(item.key, input.value); });
      wrap.appendChild(input);

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
      wrap.appendChild(swatches);
      row.appendChild(wrap);

      write = function (v) {
        input.value = v;
        val.textContent = String(v).toUpperCase();
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

    rows.push({ item: item, el: row, write: write });
    return row;
  }

  function buildPanel() {
    var host = document.getElementById('pg-groups');

    SCHEMA.forEach(function (group, gi) {
      var sec = el('section', 'pg-group');
      /* Everything open on load: the whole point is to see the knobs. */
      var btn = el('button', 'pg-group__head');
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'true');
      btn.appendChild(el('span', 'pg-group__name', group.group));
      btn.appendChild(el('span', 'pg-group__caret'));

      var body = el('div', 'pg-group__body');
      body.id = 'pg-group-' + gi;
      btn.setAttribute('aria-controls', body.id);
      if (group.hint) body.appendChild(el('p', 'pg-group__hint', group.hint));
      group.items.forEach(function (item) { body.appendChild(buildRow(item)); });

      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        sec.classList.toggle('is-closed', open);
      });

      sec.appendChild(btn);
      sec.appendChild(body);
      host.appendChild(sec);
    });
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
     Applying state
     ---------------------------------------------------------------- */

  function apply(key, value) {
    if (state[key] === value) return;
    state[key] = value;

    if (isHeroKey(key)) applyHero();
    else {
      var patch = {};
      patch[key] = value;
      field.set(patch);
    }

    syncRows();
    save();
    markPresetDirty();
  }

  function bgEntry() {
    var want = state.heroBg;
    for (var i = 0; i < HERO_BGS.length; i++) {
      if (HERO_BGS[i].id === want) return HERO_BGS[i];
    }
    return HERO_BGS[0];
  }

  function applyHero() {
    var bg = bgEntry();
    hero.style.background = bg.value;
    hero.style.minHeight = state.heroHeight + 'px';
    hero.style.borderRadius = state.heroRadius + 'px';
    hero.style.setProperty('--pg-veil-bg', bg.veil || '#172d2d');
    hero.style.setProperty('--pg-composer', state.heroComposer + 'px');
    hero.dataset.layout = state.heroLayout;
    hero.dataset.width = state.heroWidth;
    hero.dataset.backdrop = state.heroBackdrop;
    /* Light backgrounds need dark hero text — the dots are the user's
       problem, but unreadable copy is just a broken preview. */
    hero.dataset.tone = (state.heroBg === 'light' || state.heroBg === 'white') ? 'light' : 'dark';
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
  }

  function markPresetDirty() {
    Array.prototype.forEach.call(
      document.querySelectorAll('.pg-preset'),
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

    state = next;
    field.set(fieldConfig(state));
    syncRows();
    applyHero();
    save();

    markPresetDirty();
    var btn = document.querySelector('.pg-preset[data-preset="' + preset.id + '"]');
    if (btn) btn.classList.add('is-on');
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
    var btn = document.querySelector('.pg-preset[data-preset="home4"]');
    if (btn) btn.classList.add('is-on');
    say('Reset to the shipped home 4 hero');
  }

  /* ----------------------------------------------------------------
     Copy

     Demo 3 has two background engines, so the copy has to say which
     one a look belongs to and what, if anything, would be lost.
     ---------------------------------------------------------------- */

  /* What demo-2's dot-field.js (home 1 / home 3) understands. */
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
        '   That field is the home 1 / home 3 hero (?home=1). */\n';

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

    buildPresets();
    buildPanel();
    syncRows();
    applyHero();

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
