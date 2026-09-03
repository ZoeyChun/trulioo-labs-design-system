/**
 * KYC eIDAS — landing page behaviour (home nav + mobile sidenav).
 */
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

    var back = document.getElementById("eidas-landing-back");
    if (back) {
      back.addEventListener("click", function () {
        window.location.href = homeUrl;
      });
    }
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
    overlay.addEventListener("click", function () {
      setOpen(false);
    });
  }

  initHomeNavigation();
  initAppNavToggle();
})();
