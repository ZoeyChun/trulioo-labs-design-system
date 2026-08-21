/* ============================================================
   Device Intelligence — landing navigation + results bootstrap
   ============================================================ */
(function () {
  "use strict";

  function getHomeUrl() {
    try {
      return new URL("../unified-intelligence-home/index.html", window.location.href).href;
    } catch (e) {
      return "../unified-intelligence-home/index.html";
    }
  }

  function initHomeNavigation() {
    var homeUrl = getHomeUrl();

    document.querySelectorAll(".tds-side-nav__brand").forEach(function (el) {
      el.addEventListener("click", function () {
        window.location.href = homeUrl;
      });
    });

    document.querySelectorAll(".tds-side-nav__nav-item").forEach(function (item) {
      var label = item.querySelector(".tds-side-nav__nav-item-text");
      if (!label || label.textContent.trim() !== "Home") return;
      item.addEventListener("click", function () {
        window.location.href = homeUrl;
      });
    });

    document.querySelectorAll('.tds-side-nav__icon-button[aria-label="Home"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.location.href = homeUrl;
      });
    });
  }

  function initAppNavToggle() {
    var shell = document.getElementById("app-shell");
    var toggle = document.getElementById("app-nav-toggle");
    var overlay = document.getElementById("app-sidenav-overlay");
    if (!shell || !toggle || !overlay) return;

    function setOpen(open) {
      shell.classList.toggle("app-shell--nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      overlay.hidden = !open;
      overlay.setAttribute("aria-hidden", String(!open));
    }

    toggle.addEventListener("click", function () {
      setOpen(!shell.classList.contains("app-shell--nav-open"));
    });
    overlay.addEventListener("click", function () { setOpen(false); });
  }

  function initLanding() {
    var back = document.getElementById("di-landing-back");
    if (back) {
      back.addEventListener("click", function () {
        window.location.href = getHomeUrl();
      });
    }
    initAppNavToggle();
  }

  var ANALYZE_DELAY_MS = 2200;
  var analyzeTimer = null;

  function revealResults() {
    var analyzing = document.getElementById("di-analyzing");
    var results = document.getElementById("dv-result-view");
    if (analyzing) {
      analyzing.hidden = true;
      analyzing.removeAttribute("aria-busy");
    }
    if (results) results.hidden = false;

    var diTab = document.getElementById("dv-tab-device-intelligence");
    if (diTab) diTab.click();

    var status = document.getElementById("dv-header-status");
    var badge = document.getElementById("dv-device-header-badge");
    if (status instanceof HTMLElement && badge instanceof HTMLElement && badge.textContent) {
      status.className = badge.className.replace("tds-tag--sm", "tds-tag--md");
      status.textContent = badge.textContent;
    }
  }

  function initResults() {
    function goToLanding() {
      if (analyzeTimer) window.clearTimeout(analyzeTimer);
      window.location.href = "index.html";
    }

    var resultBack = document.getElementById("di-result-back");
    var analyzingBack = document.getElementById("di-analyzing-back");
    if (resultBack) resultBack.addEventListener("click", goToLanding);
    if (analyzingBack) analyzingBack.addEventListener("click", goToLanding);

    analyzeTimer = window.setTimeout(revealResults, ANALYZE_DELAY_MS);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHomeNavigation();
    if (document.getElementById("di-landing")) initLanding();
    if (document.getElementById("dv-result-view")) initResults();
  });
})();
