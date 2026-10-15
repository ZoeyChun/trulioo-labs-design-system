/* Pulsing Trulioo mark from the orb lab: Logo motion, Pulse, size 122,
   speed 1x, green #005A50, density 1, dot size 0.8. */
(function () {
  var canvas = document.querySelector("[data-d1-loader-mark]");
  var loader = document.querySelector("[data-d1-loader]");
  if (!canvas || !loader) return;

  var SIZE = 122;
  var COLOR = "#005A50";
  var DOT_SIZE = 0.8;
  var VIEW = { w: 48.759, h: 40, cx: 24.382, cy: 19.996 };
  var DOTS = [
    { x: 2.371, y: 16.893, r: 2.08 }, { x: 4.527, y: 11.232, r: 1.835 },
    { x: 7.886, y: 6.714, r: 1.649 }, { x: 12.305, y: 3.384, r: 1.448 },
    { x: 16.667, y: 1.59, r: 1.095 }, { x: 25.191, y: 1.591, r: 1.038 },
    { x: 29.645, y: 1.008, r: 0.989 }, { x: 34.03, y: 1.591, r: 1.042 },
    { x: 38.2, y: 3.384, r: 1.445 }, { x: 42.263, y: 6.714, r: 1.642 },
    { x: 45.147, y: 11.232, r: 1.835 }, { x: 46.721, y: 16.893, r: 2.08 },
    { x: 46.395, y: 23.102, r: 2.079 }, { x: 44.236, y: 28.767, r: 1.833 },
    { x: 40.874, y: 33.281, r: 1.647 }, { x: 36.449, y: 36.609, r: 1.448 },
    { x: 32.105, y: 38.397, r: 1.099 }, { x: 23.571, y: 38.401, r: 1.045 },
    { x: 19.124, y: 38.989, r: 0.99 }, { x: 14.737, y: 38.401, r: 1.046 },
    { x: 10.571, y: 36.609, r: 1.446 }, { x: 6.497, y: 33.281, r: 1.644 },
    { x: 3.611, y: 28.767, r: 1.832 }, { x: 2.042, y: 23.105, r: 2.084 },
    { x: 10.901, y: 16.891, r: 2.019 }, { x: 13.062, y: 11.214, r: 1.8 },
    { x: 16.425, y: 6.714, r: 1.649 }, { x: 20.838, y: 3.381, r: 1.448 },
    { x: 33.732, y: 6.714, r: 1.644 }, { x: 36.625, y: 11.214, r: 1.801 },
    { x: 38.193, y: 16.891, r: 2.019 }, { x: 37.865, y: 23.097, r: 2.019 },
    { x: 35.704, y: 28.766, r: 1.802 }, { x: 32.34, y: 33.281, r: 1.644 },
    { x: 27.921, y: 36.609, r: 1.445 }, { x: 15.023, y: 33.281, r: 1.644 },
    { x: 12.134, y: 28.766, r: 1.802 }, { x: 10.574, y: 23.097, r: 2.019 }
  ];

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;
  var dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(SIZE * dpr);
  canvas.height = Math.round(SIZE * dpr);

  var fit = (SIZE * 0.78) / VIEW.w;
  var ox = (SIZE - VIEW.w * fit) / 2;
  var oy = (SIZE - VIEW.h * fit) / 2;
  var elapsed = 1.8;
  var last = 0;
  var raf = 0;

  function blob(x, y, r, alpha) {
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function paint(time) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = COLOR;
    for (var i = 0; i < DOTS.length; i += 1) {
      var dot = DOTS[i];
      var radius = Math.max(0.35, dot.r * fit * DOT_SIZE);
      var x = ox + dot.x * fit;
      var y = oy + dot.y * fit;
      if (reduced) {
        blob(x, y, radius, 1);
        continue;
      }
      var ang = Math.atan2(dot.y - VIEW.cy, dot.x - VIEW.cx);
      var wave = 0.5 + 0.5 * Math.sin(ang * 1.15 - time * 2.4);
      blob(x, y, radius * (0.55 + 0.9 * wave), 0.35 + 0.65 * wave);
    }
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!reduced) elapsed += dt;
    paint(elapsed);
    if (!loader.hidden && !reduced) raf = window.requestAnimationFrame(frame);
    else raf = 0;
  }

  function kick() {
    if (loader.hidden || raf) return;
    last = performance.now();
    raf = window.requestAnimationFrame(frame);
  }

  paint(elapsed);
  new MutationObserver(kick).observe(loader, { attributes: true, attributeFilter: ["hidden", "class"] });
  kick();
})();
