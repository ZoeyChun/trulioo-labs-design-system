/* Demo 3 home — TruDotField (demo-2 engine). Dark skin uses inverted (light) dots. */
(function () {
  "use strict";

  var LIGHT_CONFIG = {
    style: "shimmer-twinkle",
    formation: "grid",
    spacing: 26,
    size: 1.2,
    sizeVary: 0.95,
    color: "#0e8a78",
    opacity: 0.55,
    shape: "circle",
    shapeScale: 1.8,
    shapeX: 0.5,
    shapeY: 0.61,
    feather: 0.28,
    clear: 0.8,
    clearSize: 0.47,
    clearX: 0.42,
    clearY: 0.52,
    fade: 0.72,
    intensity: 1,
    speed: 0.5,
    angle: 35
  };

  /* Dark green hero — tuned in home-dot-lab (ripple / rings). */
  var DARK_CONFIG = {
    style: "ripple",
    formation: "rings",
    spacing: 22,
    size: 2.4,
    sizeVary: 1,
    color: "#0e8a78",
    opacity: 0.45,
    shape: "ring",
    shapeScale: 3,
    shapeX: 0.5,
    shapeY: 0.8,
    feather: 0.76,
    clear: 0,
    clearSize: 0.81,
    clearX: 0.5,
    clearY: 0.52,
    fade: 0.82,
    intensity: 0.6,
    speed: 0.6,
    angle: 35
  };

  function boot() {
    var canvas = document.getElementById("d3-home-dots");
    if (!canvas || !window.TruDotField) return;
    var skin =
      (document.querySelector(".d1-home") &&
        document.querySelector(".d1-home").getAttribute("data-d3-home-skin")) ||
      "dark";
    window.TruDotField.mount(canvas, skin === "light" ? LIGHT_CONFIG : DARK_CONFIG);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
