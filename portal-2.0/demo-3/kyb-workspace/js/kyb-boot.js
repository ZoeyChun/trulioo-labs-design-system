/* ============================================================
   Demo 3 — KYB-only boot
   ============================================================
   This fork exists to work on the KYB screens, so it opens on KYB
   Verification rather than on the portal home.

   The shell carries `data-d3-lab`, which is d3-nav.js's own escape
   hatch — without it the nav forces data-d3-view="home" on load. With
   it the page owns its initial view, and this script picks it.

   The home markup is still in the document and is never shown. It is
   not dead weight: `.d1-work` inside `.d1-home` holds the
   `data-d1-tpl` message templates that chat.js, d3-kyb-agent.js and
   d3-kyb-report-reveal.js all look up by name. Removing `.d1-home`
   would take the templates with it.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  function openKyb() {
    if (window.D3KybResume && window.D3KybResume.openResumeExperience) {
      window.D3KybResume.openResumeExperience();
      return true;
    }
    if (window.D3Nav && window.D3Nav.openKybChat) {
      window.D3Nav.openKybChat({ resume: true });
      return true;
    }
    return false;
  }

  /* The rail's own KYB button already routes here; this is for the
     brand mark, which d3-nav.js binds to goHome(). Home has no nav
     entry in this fork, so landing there would be a dead end. Capture
     phase, so it runs before that bubble-phase listener and can stop
     the event reaching it. */
  function repointLogo() {
    document.addEventListener(
      "click",
      function (event) {
        var logo = event.target.closest && event.target.closest(".d1-logo");
        if (!logo) return;
        event.preventDefault();
        event.stopPropagation();
        openKyb();
      },
      true
    );
  }

  /* d3-kyb-resume.js sets its demo session up on the ready class, and
     the surface it opens has to come after that. Retry briefly rather
     than racing it — the scripts below us bind synchronously, but the
     resume module waits on `d1-app-ready`. */
  function bootKyb(attempt) {
    if (openKyb()) return;
    if (attempt > 40) return;
    window.setTimeout(function () {
      bootKyb(attempt + 1);
    }, 50);
  }

  function boot() {
    repointLogo();
    bootKyb(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
