/**
 * TDS SideNav — collapse/expand + sub-nav accordion.
 * Collapsed: click the sidenav to expand (logo/brand excluded).
 * Expanded: collapse via chevron controls only (collapse bar / edge toggle).
 * Mobile drawer is wired separately via app-shell (wireAppNavToggle / initAppNavToggle).
 */
(function (global) {
  "use strict";

  var CHEVRONS_LEFT = '<path d="M10 4 6 8l4 4M6 4 2 8l4 4"/>';
  var CHEVRONS_RIGHT = '<path d="M6 4l4 4-4 4M10 4l4 4-4 4"/>';
  var TOGGLE_COLLAPSE = '<path d="M10 4l-4 4 4 4"/>';
  var TOGGLE_EXPAND = '<path d="M6 4l4 4-4 4"/>';

  function setCollapsed(sideNav, collapseBtn, toggleBtn, collapsed) {
    sideNav.classList.toggle("tds-side-nav--collapsed", collapsed);

    if (collapseBtn) {
      collapseBtn.setAttribute("aria-expanded", String(!collapsed));
      collapseBtn.setAttribute(
        "aria-label",
        collapsed ? "Expand sidebar" : "Collapse sidebar"
      );

      var chevronSvg = collapseBtn.querySelector("svg");
      if (chevronSvg) {
        chevronSvg.innerHTML = collapsed ? CHEVRONS_RIGHT : CHEVRONS_LEFT;
      }
    }

    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", String(!collapsed));
      toggleBtn.setAttribute(
        "aria-label",
        collapsed ? "Expand sidebar" : "Collapse sidebar"
      );

      var toggleSvg = toggleBtn.querySelector("svg");
      if (toggleSvg) {
        toggleSvg.innerHTML = collapsed ? TOGGLE_EXPAND : TOGGLE_COLLAPSE;
      }
    }

    var iconRail = sideNav.querySelector(".tds-side-nav__icon-rail");
    if (iconRail) iconRail.setAttribute("aria-hidden", String(collapsed));

    var profile = sideNav.querySelector(".tds-side-nav__profile");
    if (profile) {
      profile.classList.toggle("tds-side-nav__profile--collapsed", collapsed);
    }
  }

  function bindCollapseControl(sideNav, collapseBtn, toggleBtn, el) {
    if (!el) return;

    el.addEventListener("click", function (e) {
      e.stopPropagation();
      if (sideNav.classList.contains("tds-side-nav--collapsed")) {
        setCollapsed(sideNav, collapseBtn, toggleBtn, false);
      } else {
        setCollapsed(sideNav, collapseBtn, toggleBtn, true);
      }
    });
  }

  function init(options) {
    options = options || {};
    var rootId = options.rootId || "app-sidenav";
    var collapseId = options.collapseId || "sidenav-collapse";
    var toggleId = options.toggleId || "sidenav-toggle";

    var sideNav = document.getElementById(rootId);
    var collapseBtn = document.getElementById(collapseId);
    if (!sideNav || !collapseBtn) return;

    var toggleBtn = document.getElementById(toggleId);

    bindCollapseControl(sideNav, collapseBtn, toggleBtn, collapseBtn);
    bindCollapseControl(sideNav, collapseBtn, toggleBtn, toggleBtn);

    sideNav.addEventListener("click", function (e) {
      if (sideNav.classList.contains("tds-side-nav--collapsed")) {
        if (e.target.closest(".tds-side-nav__brand")) return;
        setCollapsed(sideNav, collapseBtn, toggleBtn, false);
        return;
      }

      if (
        e.target.closest("#" + collapseId) ||
        (toggleBtn && e.target.closest("#" + toggleId))
      ) {
        return;
      }

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
