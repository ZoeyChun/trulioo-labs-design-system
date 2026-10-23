/* ============================================================
   Demo 3 — KYB workspace canvas
   ============================================================
   Two small jobs, neither of which touches a shared demo-3 script:

     1. Paint the dot field on the canvas ground.
     2. Keep the TruAI column docked open.

   A tab strip and a canvas expand toggle lived here too; both were cut
   with the markup above the sheet. They're in git history if a screen
   ever needs to show two things at once.

   Loaded last, after every shared script has bound its handlers.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  /* ----------------------------------------------------------------
     1 · Dot ground

     Deliberately quieter and flatter than the hero field in
     js/d3-home-dots.js. That one is a composition — rings, a cleared
     centre, a vertical fade — because it is the subject of the hero.
     This one is a ground that content sits on, so: even grid, no
     region mask (shape 'full'), no hole (clear 0), no vertical fade
     (fade past 1 means the smoothstep never starts), and no animation
     — a shimmer behind a whole workspace is movement in the corner of
     the eye all day.
     ---------------------------------------------------------------- */
  var CANVAS_DOTS = {
    style: "static",
    formation: "grid",
    spacing: 18, /* px between centres */
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
    var canvas = document.getElementById("kw-stage-dots");
    if (!canvas || !window.TruDotField) return;
    window.TruDotField.mount(canvas, CANVAS_DOTS);
  }

  /* ----------------------------------------------------------------
     2 · Docked TruAI column

     d3-nav.js closes the panel on several paths — goHome(), goLabs(),
     the Esc handler. In the workspace format the panel is chrome, so
     rather than fork d3-nav.js (which every other demo-3 page shares)
     we watch the attribute and put it back. The close control itself
     is hidden in workspace-canvas.css, so this only ever fires for a
     programmatic close, never for something the user asked for.
     ---------------------------------------------------------------- */
  function keepChatDocked() {
    if (shell.getAttribute("data-d3-chat") === "open") return;
    shell.setAttribute("data-d3-chat", "open");
    var pane = document.querySelector("[data-d3-chat-pane]");
    if (pane) pane.setAttribute("aria-hidden", "false");
  }

  function watchChat() {
    keepChatDocked();
    new MutationObserver(keepChatDocked).observe(shell, {
      attributes: true,
      attributeFilter: ["data-d3-chat"]
    });
  }

  function boot() {
    mountDots();
    watchChat();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
