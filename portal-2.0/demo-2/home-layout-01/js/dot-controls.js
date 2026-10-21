/* ============================================================
   TruDotControls — the tweak panel for the background dot field.
   ============================================================

   Not part of the Figma design. It is a review tool: it builds its own
   markup so index.html stays a clean transcription of the node, and it
   sits behind a toggle so the default view of the page is the design.

   Settings persist to localStorage, so a chosen look survives a reload
   while you are comparing options. "Copy config" gives you the object
   to paste into index.html once a look is agreed — at which point the
   panel can be dropped from the page entirely.
   ------------------------------------------------------------------ */

(function (global) {
  'use strict';

  /* Bumped whenever the shipped defaults change. A stored config is
     applied wholesale at mount, so without this anyone who had opened
     the panel before would keep seeing the old look and never the new
     default. v2 added shape and clear placement; v3 onward are
     successive changes to the shipped composition. */
  var STORE_KEY = 'tru-dot-field-v5';

  /* Named starting points. Each is a full config patch; the panel
     applies one wholesale and the controls then show where it landed. */
  var PRESETS = [
    {
      id: 'figma', label: 'Figma',
      patch: { style: 'static', formation: 'staggered', shape: 'full', spacing: 40, size: 2, color: '#8a9a90', opacity: 0.55, clear: 0.65, clearSize: 0.42, clearX: 0.5, clearY: 0.30, fade: 0.68, shapeScale: 1, shapeX: 0.5, shapeY: 0.42, feather: 0.12, intensity: 0.7, speed: 0.4, angle: 35 }
    },
    {
      id: 'shimmer', label: 'Shimmer',
      patch: { style: 'shimmer-twinkle', formation: 'staggered', shape: 'full', spacing: 40, size: 2, color: '#8a9a90', opacity: 0.55, clear: 0.65, clearSize: 0.42, clearX: 0.5, clearY: 0.30, fade: 0.68, shapeScale: 1, shapeX: 0.5, shapeY: 0.42, feather: 0.12, intensity: 0.7, speed: 0.4, angle: 35 }
    },
    {
      id: 'trio', label: 'Trio',
      /* The reference layout: three overlapping discs of pattern,
         sitting behind and around the hero rather than filling it. */
      patch: { style: 'shimmer-twinkle', formation: 'staggered', shape: 'cluster', spacing: 24, size: 1.5, color: '#8a9a90', opacity: 0.65, clear: 0.35, clearSize: 0.24, clearX: 0.5, clearY: 0.30, fade: 0.92, shapeScale: 1.1, shapeX: 0.5, shapeY: 0.34, feather: 0.1, intensity: 0.7, speed: 0.35, angle: 35 }
    },
    {
      id: 'orb', label: 'Orb',
      patch: { style: 'breathe', formation: 'hex', shape: 'circle', spacing: 24, size: 1.5, color: '#c5cec8', opacity: 0.75, clear: 0.55, clearSize: 0.26, clearX: 0.5, clearY: 0.30, fade: 0.8, shapeScale: 0.95, shapeX: 0.5, shapeY: 0.32, feather: 0.18, intensity: 0.5, speed: 0.14, angle: 35 }
    },
    {
      id: 'halo', label: 'Halo',
      patch: { style: 'ripple', formation: 'rings', shape: 'ring', spacing: 28, size: 1.8, color: '#0e8a78', opacity: 0.45, clear: 0, clearSize: 0.3, clearX: 0.5, clearY: 0.3, fade: 0.82, shapeScale: 1.25, shapeX: 0.5, shapeY: 0.3, feather: 0.3, intensity: 0.75, speed: 0.22, angle: 35 }
    },
    {
      id: 'drift', label: 'Drift',
      patch: { style: 'drift', formation: 'staggered', shape: 'blobs', spacing: 28, size: 1.6, color: '#8a9a90', opacity: 0.6, clear: 0.3, clearSize: 0.22, clearX: 0.5, clearY: 0.3, fade: 0.92, shapeScale: 1.25, shapeX: 0.5, shapeY: 0.34, feather: 0.22, intensity: 0.8, speed: 0.3, angle: 35 }
    }
  ];

  /* Panel layout. Sections keep eighteen controls legible; each row is
     either a select, a slider, or the colour pair.

     `styles`     — show only for these animation styles
     `motion`     — hide when the style is `static`
     `shaped`     — hide when the shape is `full`
     `invert`     — slider reads high-to-low (density is spacing backwards)
   */
  var SECTIONS = [
    {
      title: 'Pattern',
      rows: [
        { kind: 'select', key: 'formation', label: 'Formation', list: 'FORMATIONS' },
        { kind: 'color' },
        { key: 'spacing', label: 'Density',  min: 16,  max: 80, step: 2,    unit: 'px', invert: true },
        { key: 'size',    label: 'Dot size', min: 1,   max: 4,  step: 0.1,  unit: 'px' },
        { key: 'opacity', label: 'Opacity',  min: 0.1, max: 1,  step: 0.05 }
      ]
    },
    {
      title: 'Shape',
      rows: [
        { kind: 'select', key: 'shape', label: 'Region', list: 'SHAPES' },
        { key: 'shapeScale', label: 'Size',      min: 0.25, max: 2,   step: 0.05, unit: 'x', shaped: true },
        { key: 'shapeX',     label: 'Position X', min: 0,   max: 1,   step: 0.01, shaped: true },
        { key: 'shapeY',     label: 'Position Y', min: 0,   max: 1,   step: 0.01, shaped: true },
        { key: 'feather',    label: 'Edge softness', min: 0.02, max: 0.9, step: 0.02, shaped: true },
        { key: 'fade',       label: 'Field height',  min: 0.3, max: 1, step: 0.02 }
      ]
    },
    {
      title: 'Centre clear',
      rows: [
        { key: 'clear',     label: 'Strength',   min: 0, max: 1, step: 0.05 },
        { key: 'clearSize', label: 'Size',       min: 0.05, max: 0.9, step: 0.01 },
        { key: 'clearX',    label: 'Position X', min: 0, max: 1, step: 0.01 },
        { key: 'clearY',    label: 'Position Y', min: 0, max: 1, step: 0.01 }
      ]
    },
    {
      title: 'Motion',
      rows: [
        { kind: 'select', key: 'style', label: 'Animation', list: 'STYLES' },
        { key: 'intensity', label: 'Intensity', min: 0, max: 1, step: 0.05, motion: true },
        { key: 'speed',     label: 'Speed',     min: 0.05, max: 1.2, step: 0.05, motion: true },
        { key: 'angle',     label: 'Direction', min: 0, max: 180, step: 5, unit: 'deg', styles: ['shimmer', 'shimmer-twinkle', 'scan', 'band'] }
      ]
    }
  ];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function load() {
    try {
      var raw = global.localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function save(cfg) {
    try { global.localStorage.setItem(STORE_KEY, JSON.stringify(cfg)); } catch (e) { /* private mode */ }
  }

  function clearStore() {
    try { global.localStorage.removeItem(STORE_KEY); } catch (e) { /* no-op */ }
  }

  function init(field) {
    var selects = {};
    var sliders = {};
    var colorSel, colorPick;

    var root = el('div', 'dotctl');
    root.setAttribute('data-open', 'false');

    var toggle = el('button', 'dotctl__toggle');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none">' +
      '<circle cx="6" cy="6" r="1.6" fill="currentColor"/><circle cx="12" cy="6" r="1.6" fill="currentColor"/><circle cx="18" cy="6" r="1.6" fill="currentColor"/>' +
      '<circle cx="6" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="18" cy="12" r="1.6" fill="currentColor"/>' +
      '<circle cx="6" cy="18" r="1.6" fill="currentColor"/><circle cx="12" cy="18" r="1.6" fill="currentColor"/><circle cx="18" cy="18" r="1.6" fill="currentColor"/>' +
      '</svg><span>Background</span>';
    root.appendChild(toggle);

    var panel = el('div', 'dotctl__panel');
    panel.setAttribute('role', 'group');
    panel.setAttribute('aria-label', 'Background dot field');
    root.appendChild(panel);

    /* --- presets ------------------------------------------------ */
    var presetWrap = el('div', 'dotctl__presets');
    PRESETS.forEach(function (p) {
      var b = el('button', 'dotctl__chip', p.label);
      b.type = 'button';
      b.addEventListener('click', function () { apply(p.patch); });
      presetWrap.appendChild(b);
    });
    panel.appendChild(sectionTitle('Preset'));
    panel.appendChild(presetWrap);

    /* --- sections ----------------------------------------------- */
    SECTIONS.forEach(function (section) {
      panel.appendChild(sectionTitle(section.title));
      section.rows.forEach(function (spec) {
        if (spec.kind === 'select') panel.appendChild(selectRow(spec));
        else if (spec.kind === 'color') panel.appendChild(colorRow());
        else panel.appendChild(sliderRow(spec));
      });
    });

    /* --- actions ------------------------------------------------ */
    var actions = el('div', 'dotctl__actions');
    var resetBtn = el('button', 'dotctl__btn', 'Reset');
    resetBtn.type = 'button';
    var copyBtn = el('button', 'dotctl__btn dotctl__btn--primary', 'Copy config');
    copyBtn.type = 'button';
    actions.appendChild(resetBtn);
    actions.appendChild(copyBtn);
    panel.appendChild(actions);

    document.body.appendChild(root);

    /* ------------------------------------------------------------
       Builders
       ------------------------------------------------------------ */

    function sectionTitle(text) {
      return el('p', 'dotctl__section', text);
    }

    function selectRow(spec) {
      var row = el('label', 'dotctl__row');
      row.appendChild(el('span', 'dotctl__label', spec.label));

      var sel = el('select', 'dotctl__select');
      global.TruDotField[spec.list].forEach(function (item) {
        var opt = el('option', null, item.label);
        opt.value = item.id;
        sel.appendChild(opt);
      });
      sel.addEventListener('change', function () {
        var patch = {};
        patch[spec.key] = sel.value;
        apply(patch);
      });

      row.appendChild(sel);
      selects[spec.key] = sel;
      return row;
    }

    function colorRow() {
      var row = el('label', 'dotctl__row');
      row.appendChild(el('span', 'dotctl__label', 'Colour'));

      var wrap = el('div', 'dotctl__colorwrap');
      colorSel = el('select', 'dotctl__select');
      global.TruDotField.COLORS.forEach(function (c) {
        var opt = el('option', null, c.label);
        opt.value = c.value;
        colorSel.appendChild(opt);
      });
      colorSel.addEventListener('change', function () { apply({ color: colorSel.value }); });

      colorPick = el('input', 'dotctl__swatch');
      colorPick.type = 'color';
      colorPick.setAttribute('aria-label', 'Custom dot colour');
      colorPick.addEventListener('input', function () { apply({ color: colorPick.value }); });

      wrap.appendChild(colorSel);
      wrap.appendChild(colorPick);
      row.appendChild(wrap);
      return row;
    }

    function sliderRow(spec) {
      var row = el('label', 'dotctl__row');
      var head = el('span', 'dotctl__labelrow');
      head.appendChild(el('span', 'dotctl__label', spec.label));
      var out = el('span', 'dotctl__value');
      head.appendChild(out);
      row.appendChild(head);

      var input = el('input', 'dotctl__range');
      input.type = 'range';
      input.min = spec.min;
      input.max = spec.max;
      input.step = spec.step;
      input.setAttribute('aria-label', spec.label);
      input.addEventListener('input', function () {
        var v = parseFloat(input.value);
        if (spec.invert) v = spec.min + spec.max - v;
        var patch = {};
        patch[spec.key] = v;
        apply(patch);
      });

      row.appendChild(input);
      sliders[spec.key] = { row: row, input: input, out: out, spec: spec };
      return row;
    }

    /* ------------------------------------------------------------
       State
       ------------------------------------------------------------ */

    function apply(patch) {
      field.set(patch);
      var cfg = field.config();
      save(cfg);
      sync(cfg);
    }

    /* Push the live config back into every control, and hide the rows
       that don't apply to the current style or shape. */
    function sync(cfg) {
      Object.keys(selects).forEach(function (key) { selects[key].value = cfg[key]; });

      var known = global.TruDotField.COLORS.some(function (c) { return c.value === cfg.color; });
      colorSel.value = known ? cfg.color : global.TruDotField.COLORS[0].value;
      colorPick.value = cfg.color;

      var motionless = cfg.style === 'static';
      var shapeless = cfg.shape === 'full';

      Object.keys(sliders).forEach(function (key) {
        var r = sliders[key];
        var spec = r.spec;
        var v = cfg[key];
        r.input.value = spec.invert ? (spec.min + spec.max - v) : v;

        var shown = true;
        /* `band` is a shape, not a style — direction matters for it too. */
        if (spec.styles && spec.styles.indexOf(cfg.style) === -1 && spec.styles.indexOf(cfg.shape) === -1) shown = false;
        if (spec.motion && motionless) shown = false;
        if (spec.shaped && shapeless) shown = false;
        r.row.hidden = !shown;

        r.out.textContent =
          spec.unit === 'px' ? (Math.round(v * 10) / 10) + 'px'
          : spec.unit === 'deg' ? Math.round(v) + '°'
          : spec.unit === 'x' ? (Math.round(v * 100) / 100) + '×'
          : Math.round(v * 100) + '%';
      });
    }

    toggle.addEventListener('click', function () {
      var open = root.getAttribute('data-open') === 'true';
      root.setAttribute('data-open', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    resetBtn.addEventListener('click', function () {
      clearStore();
      apply(global.TruDotField.DEFAULTS);
    });

    copyBtn.addEventListener('click', function () {
      var text = 'TruDotField.mount(canvas, ' + JSON.stringify(field.config(), null, 2) + ');';
      var done = function () {
        copyBtn.textContent = 'Copied';
        setTimeout(function () { copyBtn.textContent = 'Copy config'; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { global.prompt('Config', text); });
      } else {
        global.prompt('Config', text);
      }
    });

    /* Esc closes the panel — it overlays the design, so it needs a way
       out that isn't aiming at the toggle. */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.getAttribute('data-open') === 'true') {
        root.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    sync(field.config());
    return { sync: sync };
  }

  global.TruDotControls = { init: init, load: load, PRESETS: PRESETS };
})(window);
