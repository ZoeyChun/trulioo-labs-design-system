/* ============================================================
   Demo 3 — KYB report, isolated: boot
   ============================================================
   report.html opens on the finished report for one business instead
   of the landing.

   It gets there by clicking the recent-transaction card for that
   business — the same path a user takes. js/d3-kyb-resume.js binds
   those cards at load and its handler builds the session, expands the
   card to a full report, seeds the chat and sets the status tag. Doing
   any of that here instead would be a second copy of the report's
   entry conditions, and the first thing to drift.

   kyb-boot.js runs before this and opens the resume surface, which is
   what puts those cards on screen.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  /* The report the lab opens on. Any [data-biz] in the recent list
     works; this one is Verified, so the report shows a complete,
     passing check rather than a flagged one. */
  var BUSINESS = "Apex Nordic Logistics AB";

  function card() {
    return document.querySelector(
      '[data-d3-kyb-recent-card][data-biz="' + BUSINESS + '"]'
    );
  }

  function onReport() {
    var workspace = document.querySelector("[data-d3-workspace]");
    return !!workspace && workspace.getAttribute("data-d3-kyb-surface") === "report";
  }

  /* d3-kyb-resume.js sets its demo session up on the `d1-app-ready`
     class and binds the cards then, so the card can exist before its
     handler does. Retry until the surface actually changes rather than
     firing once and hoping. */
  function open(attempt) {
    if (onReport()) return;
    if (attempt > 60) return;

    var el = card();
    if (el) el.click();

    window.setTimeout(function () {
      open(attempt + 1);
    }, 100);
  }

  function boot() {
    open(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
