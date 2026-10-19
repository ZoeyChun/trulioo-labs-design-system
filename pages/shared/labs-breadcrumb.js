/**
 * Labs product breadcrumbs (embed / portal iframe).
 * Renders: Labs / {current} using TDS breadcrumb classes.
 *
 * Optional body attrs:
 *   data-labs-crumb="Bank Verification"
 *   data-labs-crumb-parent="KYC Documents"  → Labs / parent / current
 *   data-labs-home="../unified-intelligence-home/labs.html"
 */
(function () {
  "use strict";

  function isEmbed() {
    return (
      document.documentElement.classList.contains("app-embed") ||
      (window.AppEmbed && window.AppEmbed.active) ||
      document.body.classList.contains("labs--embed")
    );
  }

  function resolve(rel) {
    try {
      return new URL(rel, window.location.href).href;
    } catch (e) {
      return rel;
    }
  }

  function withEmbed(url) {
    if (window.AppEmbed && window.AppEmbed.withEmbed) return window.AppEmbed.withEmbed(url);
    try {
      var abs = new URL(url, window.location.href);
      abs.searchParams.set("embed", "1");
      return abs.href;
    } catch (e) {
      return url;
    }
  }

  function labsHref() {
    var custom = document.body.getAttribute("data-labs-home");
    if (custom) return withEmbed(resolve(custom));
    if (/\/unified-intelligence-home\//.test(window.location.pathname)) {
      return withEmbed(resolve("labs.html"));
    }
    return withEmbed(resolve("../unified-intelligence-home/labs.html"));
  }

  function currentLabel() {
    var fromData = document.body.getAttribute("data-labs-crumb");
    if (fromData) return fromData.trim();
    var h1 = document.querySelector(
      ".app-main h1:not([hidden]), .history-hero__title, .bv-header__title, .dv-flow-header__title, .di-landing__title, .eidas-landing__title"
    );
    if (h1) {
      var text = (h1.textContent || "").replace(/\s+/g, " ").trim();
      if (text && text.length < 80) return text;
    }
    return (document.title || "")
      .replace(/\s*[—–|-]\s*Trulioo.*$/i, "")
      .trim() || "Experience";
  }

  function parentLabel() {
    var p = document.body.getAttribute("data-labs-crumb-parent");
    return p ? p.trim() : "";
  }

  function parentHref() {
    var href = document.body.getAttribute("data-labs-crumb-parent-href");
    return href ? withEmbed(resolve(href)) : "";
  }

  function ensureStylesheet() {
    if (document.querySelector('link[href*="breadcrumb/breadcrumb.css"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    /* All Labs product pages live one or two levels under /pages/. */
    link.href = /\/unified-intelligence-home\//.test(window.location.pathname)
      ? "../../Components/breadcrumb/breadcrumb.css"
      : "../../Components/breadcrumb/breadcrumb.css";
    document.head.appendChild(link);
  }

  function mount() {
    if (!isEmbed()) return;
    if (document.body.getAttribute("data-labs-crumb") === "off") return;
    if (document.querySelector(".labs-page-crumbs")) return;

    var main =
      document.querySelector("main.app-main") ||
      document.querySelector(".app-main") ||
      document.querySelector("main");
    if (!main) return;

    ensureStylesheet();

    var nav = document.createElement("nav");
    nav.className = "tds-breadcrumbs labs-page-crumbs";
    nav.setAttribute("aria-label", "Breadcrumb");

    var labs = document.createElement("a");
    labs.className = "tds-breadcrumb-item";
    labs.href = labsHref();
    labs.textContent = "Labs";
    nav.appendChild(labs);

    function addDivider() {
      var sep = document.createElement("span");
      sep.className = "tds-breadcrumb-divider";
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = "/";
      nav.appendChild(sep);
    }

    var parent = parentLabel();
    if (parent) {
      addDivider();
      var pHref = parentHref();
      if (pHref) {
        var pLink = document.createElement("a");
        pLink.className = "tds-breadcrumb-item";
        pLink.href = pHref;
        pLink.textContent = parent;
        nav.appendChild(pLink);
      } else {
        var pSpan = document.createElement("span");
        pSpan.className = "tds-breadcrumb-item";
        pSpan.textContent = parent;
        nav.appendChild(pSpan);
      }
    }

    addDivider();
    var current = document.createElement("span");
    current.className = "tds-breadcrumb-item tds-breadcrumb-item--current";
    current.setAttribute("aria-current", "page");
    current.textContent = currentLabel();
    nav.appendChild(current);

    /* Nest under the page hero when present so crumbs sit with the title
       (same horizontal inset, tight vertical rhythm). */
    var hero =
      main.querySelector(":scope > .history-page > .history-hero") ||
      main.querySelector(".history-page > .history-hero") ||
      main.querySelector(":scope > .bv-view .bv-header") ||
      main.querySelector(":scope > .di-landing > .di-landing__header") ||
      main.querySelector(":scope > .eidas-landing > .eidas-landing__header") ||
      main.querySelector(".dv-flow-header") ||
      null;

    if (hero) {
      hero.insertBefore(nav, hero.firstChild);
    } else {
      var historyPage = main.querySelector(":scope > .history-page");
      if (historyPage) {
        historyPage.insertBefore(nav, historyPage.firstChild);
      } else {
        var toggle = main.querySelector(":scope > .app-nav-toggle");
        if (toggle && toggle.nextSibling) {
          main.insertBefore(nav, toggle.nextSibling);
        } else {
          main.insertBefore(nav, main.firstChild);
        }
      }
    }

    document.body.classList.add("labs-has-crumbs");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
