/* Demo 3 home 6 — white hero with the flat dot field from hero-options
   ("White" option). Needs the playground engine (cascade, link mesh,
   pointer glow), which the shipped dot-field.js lacks, so it is loaded here. */
(function () {
  "use strict";

  var hero = document.querySelector(".d3-home-hero");
  if (!hero) return;

  var FIELD = {
    formation: "grid", spacing: 60, jitter: 0, count: 2000, orbScale: 1,
    tilt: 23, perspective: 2.6, spin: 0.0048, limb: 1, glyph: "circle",
    size: 1.6, sizeVary: 0, sizeTilt: 0, rotate: 0,
    color: "#0e8a78", color2: "#ffd166", blend: "none", opacity: 0.45, additive: 0,
    shape: "full", shapeScale: 1.8, shapeX: 0.5, shapeY: 0.5, feather: 0.34, invert: 0,
    clear: 0.6, clearSize: 0.42, clearX: 0.5, clearY: 0.45,
    fade: 1, fadeDir: "none", links: 0.1, linkWidth: 1,
    style: "cascade", intensity: 1, speed: 0.08, angle: 35,
    pointer: "glow", pointerR: 180, pointerS: 1
  };

  var canvas = document.createElement("canvas");
  canvas.className = "d3-home-6-dots";
  canvas.setAttribute("aria-hidden", "true");
  var veil = document.createElement("div");
  veil.className = "d3-home-6-veil";
  veil.setAttribute("aria-hidden", "true");
  hero.insertBefore(veil, hero.firstChild);
  hero.insertBefore(canvas, hero.firstChild);

  function mount() {
    if (window.TruDotLab) window.TruDotLab.mount(canvas, FIELD);
  }

  if (window.TruDotLab) {
    mount();
  } else {
    var s = document.createElement("script");
    s.src = "dot-playground/js/tru-dot-lab.js?v=1";
    s.onload = mount;
    document.head.appendChild(s);
  }
})();
