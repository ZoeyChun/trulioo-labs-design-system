/* Demo 3 home 4 — rotating dot globe (Fibonacci sphere, tilted axis,
   depth-faded additive dots; no pointer interaction). Canvas 2D, no dependencies. */
(function () {
  "use strict";

  var hero = document.querySelector(".d3-home-hero");
  if (!hero) return;

  var COUNT = document.documentElement.getAttribute("data-d3-home-layout") === "5" ? 1100 : 2000;
  var TILT = (23 * Math.PI) / 180;
  var SPEED = 0.00003; /* rad / ms */
  var PERSPECTIVE = 2.6;
  /* Latitude gradient, top → bottom (RGB). */
  var STOPS = [
    [255, 209, 102],
    [90, 199, 202],
    [158, 223, 182],
    [90, 199, 202]
  ];

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Home 4: globe centred behind a solid veil. Home 5: globe on the right edge. */
  var SIDE = document.documentElement.getAttribute("data-d3-home-layout") === "5";
  if (SIDE) {
    STOPS = [
      [181, 205, 146],
      [144, 234, 192],
      [144, 234, 192]
    ];
  }

  var canvas = document.createElement("canvas");
  canvas.className = "d3-home-globe";
  canvas.setAttribute("aria-hidden", "true");
  var veil = document.createElement("div");
  veil.className = "d3-home-4-veil";
  veil.setAttribute("aria-hidden", "true");
  if (!SIDE) hero.insertBefore(veil, hero.firstChild);
  hero.insertBefore(canvas, hero.firstChild);
  var ctx = canvas.getContext("2d");

  function gradient(t) {
    var f = Math.min(Math.max(t, 0), 1) * (STOPS.length - 1);
    var i = Math.min(Math.floor(f), STOPS.length - 2);
    var k = f - i;
    var a = STOPS[i];
    var b = STOPS[i + 1];
    return [
      Math.round(a[0] + (b[0] - a[0]) * k),
      Math.round(a[1] + (b[1] - a[1]) * k),
      Math.round(a[2] + (b[2] - a[2]) * k)
    ];
  }

  var dots = [];
  var golden = Math.PI * (3 - Math.sqrt(5));
  for (var i = 0; i < COUNT; i++) {
    var y = 1 - (i / (COUNT - 1)) * 2;
    var r = Math.sqrt(1 - y * y);
    var th = golden * i;
    dots.push({
      x: Math.cos(th) * r,
      y: y,
      z: Math.sin(th) * r,
      c: gradient((1 - y) / 2),
      seed: Math.random() * Math.PI * 2
    });
  }

  var w = 0;
  var h = 0;
  var dpr = 1;

  function resize() {
    var rect = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
  }

  var angle = 0;
  var last = 0;
  var cosT = Math.cos(TILT);
  var sinT = Math.sin(TILT);

  function frame(now) {
    requestAnimationFrame(frame);
    if (!hero.offsetParent || document.hidden) {
      last = now;
      return;
    }
    if (!w || Math.abs(hero.clientWidth - w) > 1 || Math.abs(hero.clientHeight - h) > 1) resize();
    var dt = last ? now - last : 16;
    last = now;
    if (!reduced) angle += dt * SPEED;

    var R = SIDE ? h * 0.66 : Math.min(w * 0.46, h * 0.85);
    var cx = SIDE ? w * 0.88 : w / 2;
    var cy = SIDE ? h * 0.49 : h / 2;
    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";

    for (var n = 0; n < dots.length; n++) {
      var d = dots[n];
      /* spin around the sphere's own Y axis, then tilt the whole axis */
      var x1 = d.x * cosA + d.z * sinA;
      var z1 = -d.x * sinA + d.z * cosA;
      var y2 = d.y * cosT - z1 * sinT;
      var z2 = d.y * sinT + z1 * cosT;
      var p = PERSPECTIVE / (PERSPECTIVE - z2);
      var sx = cx + x1 * R * p;
      var sy = cy + y2 * R * p;
      var depth = (z2 + 1) / 2; /* 0 far … 1 near */

      var tw = reduced ? 1 : 0.75 + 0.25 * Math.sin(now * 0.001 + d.seed);
      /* limb brightening: 0 at the centre of the disc, 1 on the silhouette */
      var rim = Math.sqrt(x1 * x1 + y2 * y2);
      var alpha = (0.02 + 0.98 * Math.pow(rim, 0.64)) * (0.6 + 0.4 * depth) * tw;
      var size = (0.6 + 1.3 * Math.pow(rim, 0.64)) * p * (SIDE ? 1.25 : 1);
      ctx.fillStyle = "rgba(" + d.c[0] + "," + d.c[1] + "," + d.c[2] + "," + alpha.toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, 6.2832);
      ctx.fill();
    }
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(frame);

  /* Composer: grow downward as the text wraps; scroll only past MAX_LINES. */
  var input = hero.querySelector("[data-d1-input]");
  if (input) {
    var LINE = 22;
    var MAX_LINES = 6;
    var fit = function () {
      input.style.height = "auto";
      var max = LINE * MAX_LINES;
      var next = Math.max(LINE, Math.min(input.scrollHeight, max));
      input.style.height = next + "px";
      input.style.overflowY = input.scrollHeight > max ? "auto" : "hidden";
    };
    input.addEventListener("input", fit);
    var form = input.form;
    if (form) {
      form.addEventListener("submit", function () {
        setTimeout(fit, 0);
      });
      form.addEventListener("reset", function () {
        setTimeout(fit, 0);
      });
    }
    window.addEventListener("resize", fit);
    fit();
  }
})();
