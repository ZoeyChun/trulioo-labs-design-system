/* Demo 3 — the KYB landing's dotted ground runs behind the AI panel too.
   The dots are painted by css/d3-kyb-canvas.css (KYB) and css/d3-transactions.css (Transactions) on the whole canvas; this only tells the
   CSS where the page column is, so the dots can fade out behind its content (as before). */
(function () {
  "use strict";

  var canvas = document.querySelector(".d3-canvas");
  var ws = document.querySelector("[data-d3-workspace]");
  var tx = document.querySelector("[data-d3-tx]");
  var shell = document.querySelector(".d1-shell");
  if (!canvas || !ws || !shell) return;

  function sync() {
    var col = shell.getAttribute("data-d3-view") === "transactions" && tx ? tx : ws;
    var c = canvas.getBoundingClientRect();
    var w = col.getBoundingClientRect();
    if (!w.width) return;
    canvas.style.setProperty("--d3-kyb-cx", Math.round(w.left - c.left + w.width / 2) + "px");
    canvas.style.setProperty("--d3-ground-w", Math.round(w.width) + "px");
  }

  window.addEventListener("resize", sync);
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(sync);
    ro.observe(canvas);
    ro.observe(ws);
    if (tx) ro.observe(tx);
  }
  new MutationObserver(sync).observe(document.querySelector(".d1-shell"), {
    attributes: true,
    attributeFilter: ["data-d3-chat", "data-d3-view", "data-d3-chatdock"]
  });
  sync();
})();
