/* Demo 3 — KYB right-panel canvas.
   Three small jobs, none of which touch a shared demo-3 script:
     1. Paint the dot ground (styled/shown by css/d3-kyb-canvas.css).
     2. Mirror the business name into the "Name set" step.
     3. Wire the "View all" link to the Transactions rail item. */
(function () {
  "use strict";

  var DOTS = {
    style: "static",
    formation: "grid",
    spacing: 18,
    size: 1.2,
    sizeVary: 0,
    color: "#587965",
    opacity: 0.4,
    shape: "full",
    clear: 0,
    fade: 1.3,
    intensity: 0,
    speed: 0
  };

  function mountDots() {
    var canvas = document.getElementById("d3-kyb-dots");
    if (!canvas || !window.TruDotField) return;
    window.TruDotField.mount(canvas, DOTS);
  }

  function watchBusinessName() {
    var source = document.querySelector("[data-d3-kyb-map-await-query]");
    var target = document.querySelector("[data-d3-kyb-step-name]");
    if (!source || !target) return;

    function sync() {
      var text = source.textContent.trim();
      target.textContent = text && text !== "—" ? text : "Business name";
    }

    sync();
    new MutationObserver(sync).observe(source, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function bindViewAll() {
    var btn = document.querySelector("[data-d3-kyb-view-all]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var nav = document.querySelector('[data-d3-nav="transactions"]');
      if (nav) nav.click();
    });
  }

  function boot() {
    mountDots();
    watchBusinessName();
    bindViewAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
