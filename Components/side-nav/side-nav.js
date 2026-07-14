/**
 * TDS SideNav — collapse/expand + sub-nav accordion.
 * Mobile drawer is wired separately via app-shell (wireAppNavToggle / initAppNavToggle).
 */
(function (global) {
  "use strict";

  var CHEVRONS_LEFT = '<path d="M10 4 6 8l4 4M6 4 2 8l4 4"/>';
  var CHEVRONS_RIGHT = '<path d="M6 4l4 4-4 4M10 4l4 4-4 4"/>';

  function init(options) {
    options = options || {};
    var rootId = options.rootId || "app-sidenav";
    var collapseId = options.collapseId || "sidenav-collapse";

    var sideNav = document.getElementById(rootId);
    var collapseBtn = document.getElementById(collapseId);
    if (!sideNav || !collapseBtn) return;

    collapseBtn.addEventListener("click", function () {
      var isExpanded = !sideNav.classList.contains("tds-side-nav--collapsed");
      sideNav.classList.toggle("tds-side-nav--collapsed", isExpanded);
      collapseBtn.setAttribute("aria-expanded", String(!isExpanded));
      collapseBtn.setAttribute(
        "aria-label",
        isExpanded ? "Expand sidebar" : "Collapse sidebar"
      );

      var chevronSvg = collapseBtn.querySelector("svg");
      if (chevronSvg) {
        chevronSvg.innerHTML = isExpanded ? CHEVRONS_RIGHT : CHEVRONS_LEFT;
      }

      var iconRail = sideNav.querySelector(".tds-side-nav__icon-rail");
      if (iconRail) iconRail.setAttribute("aria-hidden", String(!isExpanded));

      var profile = sideNav.querySelector(".tds-side-nav__profile");
      if (profile)
        profile.classList.toggle("tds-side-nav__profile--collapsed", isExpanded);
    });

    sideNav.addEventListener("click", function (e) {
      if (e.target.closest("#" + collapseId)) return;

      var btn = e.target.closest(".tds-side-nav__nav-item[aria-expanded]");
      if (!btn) return;

      var group = btn.closest(".tds-side-nav__nav-group");
      if (!group) return;

      var subNav = group.querySelector(".tds-side-nav__sub-nav");
      if (!subNav) return;

      var isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      subNav.style.display = isOpen ? "none" : "";

      var chevron = btn.querySelector(".tds-side-nav__nav-item-chevron svg");
      if (chevron) {
        chevron.innerHTML = isOpen
          ? '<path d="M4 6l4 4 4-4"/>'
          : '<path d="M4 10l4-4 4 4"/>';
      }
    });
  }

  global.TdsSideNav = { init: init };
})(typeof window !== "undefined" ? window : globalThis);
