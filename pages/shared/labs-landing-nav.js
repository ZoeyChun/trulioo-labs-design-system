/**
 * Keep product-page sidenav consistent with Labs Catalog:
 * collapsed Home + Transactions rail. Home opens the catalog and is
 * current only on the catalog itself.
 */
(function () {
  "use strict";

  var HISTORY_SVG =
    '<svg class="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1.5 3.34375C2.9375 1.3125 5.3125 0 8 0C12.4062 0 16 3.59375 16 8C16 12.4062 12.4062 16 8 16C6.375 16 4.84375 15.5 3.59375 14.6875C3.25 14.4375 3.15625 13.9688 3.375 13.625C3.59375 13.2812 4.0625 13.1875 4.40625 13.4375C5.4375 14.0938 6.6875 14.5 8 14.5C11.5938 14.5 14.5 11.5938 14.5 8C14.5 4.40625 11.5938 1.5 8 1.5C5.6875 1.5 3.6875 2.6875 2.53125 4.5H4.25C4.65625 4.5 5 4.84375 5 5.25C5 5.65625 4.65625 6 4.25 6H0.75C0.34375 6 0 5.65625 0 5.25V1.75C0 1.34375 0.34375 1 0.75 1C1.15625 1 1.5 1.34375 1.5 1.75V3.34375ZM8 4C8.40625 4 8.75 4.34375 8.75 4.75V7.6875L10.7812 9.71875C11.0625 10 11.0625 10.5 10.7812 10.7812C10.5 11.0625 10 11.0625 9.71875 10.7812L7.46875 8.53125C7.34375 8.40625 7.25 8.1875 7.25 8V4.75C7.25 4.34375 7.59375 4 8 4Z" fill="currentColor"/></svg>';

  function resolve(rel) {
    try {
      return new URL(rel, window.location.href).href;
    } catch (e) {
      return rel;
    }
  }

  function labsUrl() {
    return resolve("../unified-intelligence-home/labs.html");
  }

  function historyUrl() {
    return resolve("../unified-intelligence-home/history.html");
  }

  function hideLegacyHomeRow() {
    document.querySelectorAll(".tds-side-nav__nav-item").forEach(function (item) {
      var label = item.querySelector(".tds-side-nav__nav-item-text");
      if (!label || label.textContent.trim() !== "Home") return;
      if (item.hasAttribute("aria-expanded") || item.closest(".tds-side-nav__nav-group")) return;
      var wrap = item.parentElement;
      if (wrap && wrap !== item.closest(".tds-side-nav__nav-stack")) wrap.remove();
      else item.remove();
    });
  }

  function applyExperimentalRail() {
    document.body.setAttribute("data-sidenav", "experimental");

    var sideNav = document.getElementById("app-sidenav");
    if (!sideNav) return;

    sideNav.classList.add("tds-side-nav--collapsed", "tds-side-nav--experimental");

    var active = document.body.getAttribute("data-sidenav-active") || "";
    var homeHref = labsUrl();
    var transactionsHref = historyUrl();

    var brand = sideNav.querySelector(".tds-side-nav__brand");
    if (brand) {
      brand.addEventListener("click", function () {
        window.location.href = homeHref;
      });
    }

    var rail = sideNav.querySelector(".tds-side-nav__icon-rail");
    if (!rail) return;

    rail.setAttribute("aria-hidden", "false");

    var homeBtn =
      rail.querySelector('[aria-label="Home"]') ||
      rail.querySelector('[aria-label="Labs"]');

    if (homeBtn) {
      homeBtn.setAttribute("aria-label", "Home");
      homeBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = homeHref;
      });
    }

    var historyBtn = rail.querySelector('[data-nav="history"]');
    if (!historyBtn) {
      historyBtn = document.createElement("button");
      historyBtn.type = "button";
      historyBtn.className = "tds-side-nav__icon-button";
      historyBtn.setAttribute("data-nav", "history");
      if (homeBtn && homeBtn.nextSibling) {
        rail.insertBefore(historyBtn, homeBtn.nextSibling);
      } else {
        rail.appendChild(historyBtn);
      }
    }

    historyBtn.setAttribute("aria-label", "Transactions");
    historyBtn.innerHTML =
      HISTORY_SVG +
      '<span class="tds-side-nav__tooltip" role="tooltip">' +
        '<span class="tds-side-nav__tooltip-caret"></span>' +
        '<span class="tds-side-nav__tooltip-body">Transactions</span>' +
      "</span>";
    historyBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = transactionsHref;
    });

    rail.querySelectorAll(".tds-side-nav__icon-button").forEach(function (btn) {
      btn.classList.remove("tds-side-nav__icon-button--active");
      btn.removeAttribute("aria-current");
    });

    if (active === "history" && historyBtn) {
      historyBtn.classList.add("tds-side-nav__icon-button--active");
      historyBtn.setAttribute("aria-current", "page");
    } else if ((active === "labs" || active === "home") && homeBtn) {
      homeBtn.classList.add("tds-side-nav__icon-button--active");
      homeBtn.setAttribute("aria-current", "page");
    }

    sideNav.querySelectorAll(".tds-side-nav__nav-item[aria-expanded]").forEach(function (item) {
      var label = item.querySelector(".tds-side-nav__nav-item-text");
      if (!label || label.textContent.trim() !== "Home") return;
      item.classList.remove("tds-side-nav__nav-item--active");
      item.removeAttribute("aria-current");
    });

    sideNav.addEventListener(
      "click",
      function (event) {
        if (!sideNav.classList.contains("tds-side-nav--collapsed")) return;
        if (
          event.target.closest(".tds-side-nav__icon-button") ||
          event.target.closest(".tds-side-nav__brand")
        ) {
          return;
        }
        event.stopPropagation();
      },
      true
    );
  }

  var PAGE_BACK_IDS = [
    "dv-flow-home-back",
    "dv-result-back",
    "bv-form-back-btn",
    "eid-home-back",
    "eidas-landing-back",
    "di-landing-back",
    "di-analyzing-back",
    "kyb-result-back",
    "kyc-home-back",
  ];

  function goBack() {
    var target = window.top && window.top !== window ? window.top : window;
    if (window.LabsHistoryReturn && window.LabsHistoryReturn.go()) return;
    if (document.referrer || (target !== window && target.document && target.document.referrer)) {
      target.history.back();
      return;
    }
    target.location.href = labsUrl();
  }

  function wirePageBackButtons() {
    PAGE_BACK_IDS.forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn || btn.getAttribute("data-labs-back") === "bound") return;
      btn.setAttribute("data-labs-back", "bound");
      btn.setAttribute("aria-label", "Back");
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        goBack();
      });
    });
  }

  function init() {
    hideLegacyHomeRow();
    applyExperimentalRail();
    wirePageBackButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
