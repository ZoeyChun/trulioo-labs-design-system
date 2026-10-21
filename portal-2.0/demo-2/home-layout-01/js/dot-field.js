/* ============================================================
   TruDotField — the dot background behind the home hero.
   ============================================================

   In Figma (node 1496:54059 / 1496:54061) this is two overlapping
   raster tiles of green dots. A flat PNG can't be re-coloured,
   re-spaced, re-shaped or animated, so the field is generated here
   instead and the Figma defaults are reproduced exactly by the
   `static` style at `shape: 'full'`.

   Three independent layers decide whether a dot is drawn and how
   bright it is. Keeping them separate is what makes the field
   composable rather than a pile of special cases:

     formation  the lattice — where dots sit (staggered, hex, rings…)
     shape      the region they're allowed to occupy (circles, blobs…)
     clear      a soft hole punched through it, under the hero

   DESIGN RULE — every motion in here is DETERMINISTIC.
   There is no Math.random anywhere in this file, and there never
   should be. A dot's phase comes from its own grid coordinates, so
   the field looks identical on every load, every resize and on every
   machine. That is what keeps it feeling like part of the surface
   rather than weather. Amplitudes are deliberately small: the field
   should read as a texture that breathes, never as something moving
   across the page.

   Usage:
     var field = TruDotField.mount(canvasEl, { style: 'twinkle' });
     field.set({ spacing: 48 });        // patch config, rebuild if needed
     field.config();                    // read current config back
     field.destroy();
   ------------------------------------------------------------------ */

(function (global) {
  'use strict';

  var TAU = Math.PI * 2;

  /* Animation styles. `id` is the stored value, `label` is what the
     control panel shows. Order here is the order in the dropdown. */
  var STYLES = [
    { id: 'static',          label: 'Static (Figma default)' },
    { id: 'shimmer-twinkle', label: 'Shimmer + twinkle' },
    { id: 'shimmer',         label: 'Shimmer' },
    { id: 'twinkle',         label: 'Twinkle' },
    { id: 'breathe',         label: 'Breathe' },
    { id: 'ripple',          label: 'Ripple' },
    { id: 'scan',            label: 'Scan line' },
    { id: 'drift',           label: 'Drift' }
  ];

  /* The lattice. `staggered` is the Figma formation. */
  var FORMATIONS = [
    { id: 'staggered', label: 'Staggered (Figma default)' },
    { id: 'grid',      label: 'Square grid' },
    { id: 'hex',       label: 'Hex' },
    { id: 'diagonal',  label: 'Diagonal' },
    { id: 'rings',     label: 'Concentric rings' }
  ];

  /* The region the lattice is cut to. Everything except `full` is
     positioned by shapeX / shapeY / shapeScale, so each of these is a
     family of layouts rather than one fixed arrangement. */
  var SHAPES = [
    { id: 'full',    label: 'Full bleed (Figma default)' },
    { id: 'circle',  label: 'Single circle' },
    { id: 'cluster', label: 'Three circles' },
    { id: 'pair',    label: 'Two circles' },
    { id: 'blob',    label: 'Blob' },
    { id: 'blobs',   label: 'Two blobs' },
    { id: 'ring',    label: 'Ring' },
    { id: 'band',    label: 'Diagonal band' },
    { id: 'arch',    label: 'Arc sweep' }
  ];

  /* Palette presets. `sage` is the colour sampled from the Figma tiles
     (--color-neutral-50). The rest are on the Trulioo ramp. */
  var COLORS = [
    { id: 'sage',   label: 'Sage (Figma default)', value: '#8a9a90' },
    { id: 'mist',   label: 'Mist',                 value: '#c5cec8' },
    { id: 'teal',   label: 'Teal',                 value: '#0e8a78' },
    { id: 'forest', label: 'Forest',               value: '#004c45' },
    { id: 'slate',  label: 'Slate',                value: '#617269' },
    { id: 'violet', label: 'Violet',               value: '#592d80' }
  ];

  /* The shipped look. This is a chosen composition, not the Figma node
     — two overlapping discs of hex lattice, cleared under the hero.
     The node itself is the `Figma` preset in the control panel
     (`static` + `shape: 'full'`), kept there for comparison. */
  var DEFAULTS = {
    style:      'shimmer-twinkle',
    formation:  'hex',
    spacing:    36,     /* px between dot centres — density */
    size:       2,      /* dot radius in px */
    color:      '#8a9a90',
    opacity:    0.55,   /* base alpha before masks and animation */

    shape:      'pair', /* region mask */
    shapeScale: 1.5,    /* 0.25–2, relative to half the shorter side */
    shapeX:     0.5,    /* region centre, fraction of width */
    shapeY:     0.55,   /* region centre, fraction of height */
    feather:    0.2,    /* region edge softness, fraction of its radius */

    clear:      0.8,    /* strength of the hole under the hero, 0–1 */
    clearSize:  0.47,   /* its radius, fraction of the canvas */
    clearX:     0.5,    /* its centre, fraction of width */
    clearY:     0.30,   /* its centre, fraction of height */

    fade:       0.72,   /* height fraction where the field has faded out */

    intensity:  1,      /* animation amplitude, 0–1 */
    speed:      0.4,    /* cycles per second */
    angle:      35      /* travel direction, degrees — shimmer + scan */
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  /* Hermite ease used for every mask edge — no hard cut-offs anywhere. */
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

  /* ----------------------------------------------------------------
     Lattice

     Runs once per resize / per structural config change, never per
     frame. Each point keeps its grid coordinates (c, r) so the
     animations can derive a stable phase from them.
     ---------------------------------------------------------------- */
  function buildLattice(w, h, cfg) {
    var pts = [];
    var s = cfg.spacing;
    var x, y;

    if (cfg.formation === 'rings') {
      /* Rings are centred on the region, not the canvas, so the
         formation and the shape stay concentric. */
      var cx = w * cfg.shapeX, cy = h * cfg.shapeY;
      var maxR = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) + s;
      var ringIndex = 0;
      for (var rad = s; rad <= maxR; rad += s) {
        ringIndex++;
        /* Arc length / spacing keeps dot density even across rings. */
        var count = Math.max(6, Math.round(TAU * rad / s));
        for (var k = 0; k < count; k++) {
          var a = (k / count) * TAU;
          x = cx + Math.cos(a) * rad;
          y = cy + Math.sin(a) * rad;
          if (x < -s || x > w + s || y < -s || y > h + s) continue;
          pts.push({ x: x, y: y, c: k, r: ringIndex, m: 1, d: 0 });
        }
      }
      return pts;
    }

    var rowH = cfg.formation === 'hex' ? s * 0.8660254 : s;
    var rows = Math.ceil(h / rowH) + 2;
    var cols = Math.ceil(w / s) + 2;
    for (var row = -1; row < rows; row++) {
      for (var col = -1; col < cols; col++) {
        var ox = 0;
        if (cfg.formation === 'staggered' || cfg.formation === 'hex') {
          ox = (row & 1) ? s / 2 : 0;
        } else if (cfg.formation === 'diagonal') {
          /* Three-step shear: the lattice reads as diagonal lines
             rather than rows, but still tiles perfectly. */
          ox = (((row % 3) + 3) % 3) * (s / 3);
        }
        pts.push({ x: col * s + ox, y: row * rowH, c: col, r: row, m: 1, d: 0 });
      }
    }
    return pts;
  }

  /* ----------------------------------------------------------------
     Region mask

     Returns coverage 0–1 for a point. Every shape is expressed in
     units of R — half the shorter canvas side, times shapeScale — and
     offset from (shapeX, shapeY), so moving or resizing a layout never
     means editing the shape itself.

     Edges are feathered by `feather` as a fraction of the local
     radius, which keeps the boundary consistent whether the shape is
     big or small.
     ---------------------------------------------------------------- */
  function regionCoverage(px, py, R, cfg, dir) {
    var f = clamp(cfg.feather, 0.01, 0.9);
    var d, rr, i, best, ang;

    /* A disc of radius `rad`, centred `ox, oy` away from the region
       centre. All the circle-based shapes are built out of these. */
    function disc(ox, oy, rad) {
      var dx = px - ox * R, dy = py - oy * R;
      var dist = Math.hypot(dx, dy);
      var edge = rad * R;
      return 1 - smoothstep(edge * (1 - f), edge, dist);
    }

    switch (cfg.shape) {
      case 'circle':
        return disc(0, 0, 0.92);

      case 'cluster':
        /* Three discs on a trefoil — the reference layout. Centres sit
           0.45R out at 200°/340°/90°, radii just under 0.6R, which puts
           the pairwise distance (~0.8R) comfortably inside the sum of
           radii (~1.15R): the lobes overlap but each one still reads as
           its own circle. Slightly uneven radii keep it from looking
           mechanical. Offsets are in R units, so the trefoil holds its
           proportions at any scale or position. */
        best = disc(-0.42, -0.15, 0.60);
        best = Math.max(best, disc(0.42, -0.15, 0.54));
        best = Math.max(best, disc(0.00, 0.45, 0.57));
        return best;

      case 'pair':
        best = disc(-0.40, -0.17, 0.56);
        return Math.max(best, disc(0.40, 0.17, 0.56));

      case 'blob':
        /* Organic outline from two fixed harmonics. Deterministic, so
           the silhouette is the same every load. */
        d = Math.hypot(px, py);
        ang = Math.atan2(py, px);
        rr = R * (0.80 + 0.15 * Math.sin(3 * ang + 0.9) + 0.07 * Math.sin(5 * ang - 2.1));
        return 1 - smoothstep(rr * (1 - f), rr, d);

      case 'blobs':
        best = 0;
        for (i = 0; i < 2; i++) {
          var ox = i ? 0.38 : -0.38, oy = i ? 0.24 : -0.24;
          var bx = px - ox * R, by = py - oy * R;
          var bd = Math.hypot(bx, by);
          var ba = Math.atan2(by, bx);
          var br = R * (0.52 + 0.12 * Math.sin(3 * ba + (i ? 2.4 : 0.6)) + 0.06 * Math.sin(5 * ba));
          best = Math.max(best, 1 - smoothstep(br * (1 - f), br, bd));
        }
        return best;

      case 'ring':
        /* Annulus: inside and outside edges feathered the same way. */
        d = Math.hypot(px, py);
        var mid = R * 0.74, half = R * 0.26;
        return 1 - smoothstep(half * (1 - f), half, Math.abs(d - mid));

      case 'band':
        /* A stripe running along `angle`. Measured on the normal, so
           the band rotates with the shimmer direction. */
        var nrm = -px * dir.y + py * dir.x;
        var hw = R * 0.58;
        return 1 - smoothstep(hw * (1 - f), hw, Math.abs(nrm));

      case 'arch':
        /* Half a ring — an arc sweeping across the top of the region.
           The straight edge is feathered too, so it doesn't read as a
           clipped shape. */
        d = Math.hypot(px, py);
        var am = R * 0.80, ah = R * 0.22;
        var band = 1 - smoothstep(ah * (1 - f), ah, Math.abs(d - am));
        var side = 1 - smoothstep(0, R * 0.30, py);
        return band * side;

      default:
        return 1;
    }
  }

  /* Bake region + clear + fade into one multiplier per point. Points
     that end up invisible are dropped here rather than skipped every
     frame — with a small shape that is most of the lattice. */
  function applyMasks(pts, w, h, cfg) {
    var R = Math.min(w, h) * 0.5 * cfg.shapeScale;
    var scx = w * cfg.shapeX, scy = h * cfg.shapeY;
    var rad = cfg.angle * Math.PI / 180;
    var dir = { x: Math.cos(rad), y: Math.sin(rad) };

    /* Clear region: an ellipse on the canvas aspect, so a round hole
       stays round-looking on a wide content area. */
    var ccx = w * cfg.clearX, ccy = h * cfg.clearY;
    var crx = Math.max(1, w * cfg.clearSize);
    var cry = Math.max(1, h * cfg.clearSize * 1.1);

    var fadeEnd = cfg.fade, fadeStart = Math.max(0, cfg.fade - 0.28);
    var out = [];

    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];

      var cov = cfg.shape === 'full'
        ? 1
        : regionCoverage(p.x - scx, p.y - scy, R, cfg, dir);
      if (cov <= 0.01) continue;

      var nd = Math.hypot((p.x - ccx) / crx, (p.y - ccy) / cry);
      var hole = 1 - cfg.clear * (1 - smoothstep(0.30, 1.0, nd));

      var vfade = 1 - smoothstep(fadeStart, fadeEnd, p.y / h);

      p.m = cov * hole * vfade;
      if (p.m <= 0.01) continue;

      /* Ripple measures from the region centre, so the rings leave
         wherever the shape is. */
      p.d = Math.hypot(p.x - scx, p.y - scy);
      out.push(p);
    }

    return out;
  }

  /* ----------------------------------------------------------------
     Modulation

     Every style returns m ∈ [0,1]; the caller turns that into an alpha
     multiplier centred on 1, so the field's average brightness never
     drifts away from the static design. `scan` and `drift` are handled
     in the draw loop instead — one only brightens, the other moves.
     ---------------------------------------------------------------- */
  function modulation(style, p, t, cfg, dir) {
    var u, m;

    switch (style) {
      case 'shimmer':
        /* A single broad gradient band sliding along `angle` at a
           constant rate. Wavelength is 10 cells, so what you see is a
           slow lightening and darkening, not a stripe. */
        u = (p.x * dir.x + p.y * dir.y) / (cfg.spacing * 10);
        return 0.5 + 0.5 * Math.sin(TAU * (u - t * cfg.speed));

      case 'twinkle':
        /* Per-dot pulse. The phase is the golden-ratio combination of
           the grid coordinates: evenly spread, fully deterministic, and
           stable across resizes because it only uses c and r. */
        return 0.5 + 0.5 * Math.sin(TAU * (t * cfg.speed + (p.c * 0.3819660 + p.r * 0.6180340)));

      case 'shimmer-twinkle':
        u = (p.x * dir.x + p.y * dir.y) / (cfg.spacing * 10);
        m = 0.5 + 0.5 * Math.sin(TAU * (u - t * cfg.speed));
        var tw = 0.5 + 0.5 * Math.sin(TAU * (t * cfg.speed * 1.5 + (p.c * 0.3819660 + p.r * 0.6180340)));
        return m * 0.62 + tw * 0.38;

      case 'breathe':
        /* Whole field in unison — the calmest option. */
        return 0.5 + 0.5 * Math.sin(TAU * t * cfg.speed);

      case 'ripple':
        /* Concentric rings leaving the region centre at a fixed rate. */
        return 0.5 + 0.5 * Math.cos(TAU * (p.d / (cfg.spacing * 6) - t * cfg.speed));

      default:
        return 0.5;
    }
  }

  /* ----------------------------------------------------------------
     mount
     ---------------------------------------------------------------- */
  function mount(canvas, options) {
    var ctx = canvas.getContext('2d');
    var cfg = {};
    var k;
    for (k in DEFAULTS) if (DEFAULTS.hasOwnProperty(k)) cfg[k] = DEFAULTS[k];
    if (options) for (k in options) if (options.hasOwnProperty(k) && options[k] != null && DEFAULTS.hasOwnProperty(k)) cfg[k] = options[k];

    var pts = [];
    var rgb = hexToRgb(cfg.color);
    var w = 0, h = 0, dpr = 1;
    var destroyed = false, running = false;
    var raf = 0, timer = 0, probe = 0, rafSeen = false, t0 = 0;

    var reduced = global.matchMedia
      ? global.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

    function animated() {
      return cfg.style !== 'static' && !(reduced && reduced.matches);
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
    }

    function draw(t) {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

      var style = animated() ? cfg.style : 'static';
      var rad = cfg.angle * Math.PI / 180;
      var dir = { x: Math.cos(rad), y: Math.sin(rad) };
      var base = cfg.opacity;
      var inten = cfg.intensity;

      /* Scan and drift don't go through modulation(), so their
         constants are set up once per frame here. */
      var scanU = 0, scanSpan = 0;
      if (style === 'scan') {
        scanSpan = Math.abs(w * dir.x) + Math.abs(h * dir.y) + cfg.spacing * 8;
        scanU = (t * cfg.speed % 1) * scanSpan;
      }
      var driftAmp = 0, driftPhase = 0;
      if (style === 'drift') {
        /* Capped at a fraction of one cell: dots sway inside their own
           square and never visibly swap places. */
        driftAmp = inten * cfg.spacing * 0.10;
        driftPhase = TAU * t * cfg.speed;
      }

      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        var a = base * p.m;
        var x = p.x, y = p.y;

        if (style === 'scan') {
          /* A single soft band travelling along `angle`. Only ever
             brightens — the resting field keeps its design value. */
          var u = p.x * dir.x + p.y * dir.y;
          var dU = u - scanU + scanSpan * 0.5;
          dU = ((dU % scanSpan) + scanSpan) % scanSpan - scanSpan * 0.5;
          var band = 1 - smoothstep(0, cfg.spacing * 3, Math.abs(dU));
          a *= 1 + inten * 1.6 * band;
        } else if (style === 'drift') {
          /* Fixed circular sway, phase stepped by grid position. No
             dimming — the texture holds its weight while it moves. */
          x += Math.sin(driftPhase + p.c * 0.45) * driftAmp;
          y += Math.cos(driftPhase + p.r * 0.45) * driftAmp;
        } else if (style !== 'static') {
          var m = modulation(style, p, t, cfg, dir);
          a *= 1 + inten * (m - 0.5) * 1.6;
        }

        if (a <= 0.004) continue;
        ctx.globalAlpha = a > 1 ? 1 : a;
        ctx.beginPath();
        ctx.arc(x, y, cfg.size, 0, TAU);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }

    /* ------------------------------------------------------------
       The loop

       requestAnimationFrame is the right clock, but it is suspended
       wherever the host reports the document as hidden — and embedded
       preview panes (the desktop app's browser pane, design-review
       iframes) do exactly that while the page is plainly on screen.
       There, rAF delivers roughly one frame a second and the field
       looks frozen.

       So: start on rAF, and if no frame has arrived within 250ms, fall
       back to a 30fps timer. The cost of being wrong is a genuinely
       backgrounded tab redrawing a few hundred arcs at 30fps, which is
       negligible; the cost of not doing it is an animation nobody ever
       sees.
       ------------------------------------------------------------ */

    function tick(now) {
      if (destroyed) return;
      if (!t0) t0 = now;
      draw((now - t0) / 1000);
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
      /* Paint synchronously first. The canvas is cleared by every
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

    /* Patch config. Anything that changes the lattice or the masks
       triggers a rebuild; colour and timing changes don't. */
    var STRUCTURAL = [
      'formation', 'spacing',
      'shape', 'shapeScale', 'shapeX', 'shapeY', 'feather',
      'clear', 'clearSize', 'clearX', 'clearY',
      'fade', 'angle'
    ];

    function set(patch) {
      if (!patch) return;
      var needsRebuild = false;
      for (var key in patch) {
        if (!patch.hasOwnProperty(key) || patch[key] == null) continue;
        if (!DEFAULTS.hasOwnProperty(key) || cfg[key] === patch[key]) continue;
        if (STRUCTURAL.indexOf(key) !== -1) needsRebuild = true;
        cfg[key] = patch[key];
      }
      if (patch.color) rgb = hexToRgb(cfg.color);
      if (needsRebuild) rebuild();
      restart();
    }

    function config() {
      var out = {};
      for (var key in cfg) if (cfg.hasOwnProperty(key)) out[key] = cfg[key];
      return out;
    }

    function onResize() { if (resize()) restart(); }

    function destroy() {
      destroyed = true;
      stop();
      if (ro) ro.disconnect();
      global.removeEventListener('resize', onResize);
      if (reduced && reduced.removeEventListener) reduced.removeEventListener('change', restart);
    }

    var ro = null;
    if (global.ResizeObserver) {
      ro = new global.ResizeObserver(onResize);
      ro.observe(canvas);
    }
    global.addEventListener('resize', onResize);
    if (reduced && reduced.addEventListener) reduced.addEventListener('change', restart);

    resize();
    start();

    return { set: set, config: config, destroy: destroy, canvas: canvas };
  }

  global.TruDotField = {
    mount: mount,
    STYLES: STYLES,
    FORMATIONS: FORMATIONS,
    SHAPES: SHAPES,
    COLORS: COLORS,
    DEFAULTS: DEFAULTS
  };
})(window);
