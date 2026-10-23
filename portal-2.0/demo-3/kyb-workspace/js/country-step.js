/* ============================================================
   Demo 3 — Waiting-for-country step
   ============================================================
   Fills the two country-selector treatments in the awaiting-country
   panel and hands the answer back to the KYB agent.

   An earlier pass carried four treatments (by-region and a type-ahead
   as well). Dropdown and quick picks won; the other two are gone
   rather than parked, since a lab switch with dead options on it is
   just a longer switch.

   How the answer gets back: the agent exposes respond() but not
   applyCountryPick(), and the chat bridge already accepts
   `d3-chat:send`. So a pick is sent as the sentence the user would
   otherwise have typed — "<business>, <country>". That runs the exact
   path chat does, with no fork of js/d3-kyb-agent.js.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var root = document.querySelector("[data-kw-country]");
  if (!root) return;

  /* ----------------------------------------------------------------
     Countries

     `demo: true` marks the six jurisdictions js/d3-kyb-agent.js has
     fixture businesses for (DEMO_JURISDICTIONS). Everything else is
     real coverage with nothing behind it on this page — the lists say
     so rather than letting someone pick Japan and hit a dead end.
     ---------------------------------------------------------------- */
  var COUNTRIES = [
    { cc: "us", label: "United States",  demo: true },
    { cc: "ca", label: "Canada" },
    { cc: "mx", label: "Mexico" },
    { cc: "br", label: "Brazil" },

    { cc: "gb", label: "United Kingdom", demo: true },
    { cc: "de", label: "Germany",        demo: true },
    { cc: "se", label: "Sweden",         demo: true },
    { cc: "ie", label: "Ireland" },
    { cc: "nl", label: "Netherlands" },
    { cc: "fr", label: "France" },
    { cc: "es", label: "Spain" },
    { cc: "no", label: "Norway" },
    { cc: "dk", label: "Denmark" },
    { cc: "ch", label: "Switzerland" },

    { cc: "sg", label: "Singapore",      demo: true },
    { cc: "au", label: "Australia",      demo: true },
    { cc: "nz", label: "New Zealand" },
    { cc: "hk", label: "Hong Kong SAR" },
    { cc: "jp", label: "Japan" },
    { cc: "in", label: "India" },

    { cc: "ae", label: "United Arab Emirates" },
    { cc: "za", label: "South Africa" },
    { cc: "ng", label: "Nigeria" },
    { cc: "il", label: "Israel" }
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function demoCountries() {
    return COUNTRIES.filter(function (c) { return c.demo; });
  }

  function byCc(cc) {
    var code = String(cc || "").toLowerCase();
    return COUNTRIES.filter(function (c) { return c.cc === code; })[0] || null;
  }

  /* Which jurisdictions actually return something on this page. Without
     the tag a pick that leads nowhere looks like a bug. */
  function demoTagHtml(c) {
    return c.demo ? '<span class="kw-demo-tag">Demo data</span>' : "";
  }

  /* ----------------------------------------------------------------
     Selection state

     One selection shared by both treatments, so switching treatment
     keeps the answer rather than silently dropping it.
     ---------------------------------------------------------------- */
  var selected = null;
  var continueBtn = root.querySelector("[data-kw-continue]");

  function select(c, from) {
    if (!c) return;
    selected = c;

    if (continueBtn) {
      continueBtn.disabled = false;
      continueBtn.textContent = "Search " + c.label + " registries";
    }

    if (from !== "dropdown") paintSelectTrigger(c);
    if (from !== "tiles") markSelected(root.querySelectorAll("[data-kw-tiles] [data-kw-cc]"), c.cc);
  }

  function markSelected(nodes, cc) {
    Array.prototype.forEach.call(nodes, function (n) {
      n.classList.toggle("is-selected", n.getAttribute("data-kw-cc") === cc);
    });
  }

  /* ----------------------------------------------------------------
     A · Dropdown
     ---------------------------------------------------------------- */
  var selectEl = root.querySelector("[data-kw-select]");

  function buildDropdown() {
    var menu = root.querySelector("[data-kw-select-menu]");
    if (!menu) return;
    menu.innerHTML = COUNTRIES.map(function (c) {
      return (
        '<div class="tds-action-list-item kw-option" role="option" data-value="' + esc(c.label) +
        '" data-country-code="' + c.cc + '" data-kw-cc="' + c.cc + '">' +
        '<span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-' + c.cc + '"></span></span>' +
        '<span class="tds-action-list-item__label">' + esc(c.label) + "</span>" +
        demoTagHtml(c) +
        "</div>"
      );
    }).join("");

    if (window.TdsInteractiveSelect && selectEl) {
      window.TdsInteractiveSelect.init(selectEl);
    }
    if (selectEl) {
      selectEl.addEventListener("tds-select:change", function (event) {
        var item = event.detail && event.detail.item;
        var c = byCc(item && item.getAttribute("data-country-code"));
        if (c) select(c, "dropdown");
      });
    }
  }

  /* The select script paints the trigger itself on its own change; this
     is only for picks made in the quick-picks treatment. */
  function paintSelectTrigger(c) {
    if (!selectEl) return;
    var valueEl = selectEl.querySelector("[data-kw-select-value]");
    var flag = selectEl.querySelector(".tds-select__country-flag .fi");
    if (valueEl) {
      valueEl.textContent = c.label;
      valueEl.classList.remove("tds-select__placeholder");
    }
    if (flag) flag.className = "fi fi-" + c.cc;
    Array.prototype.forEach.call(
      selectEl.querySelectorAll(".tds-action-list-item"),
      function (item) {
        item.classList.toggle(
          "tds-action-list-item--selected",
          item.getAttribute("data-kw-cc") === c.cc
        );
      }
    );
  }

  /* ----------------------------------------------------------------
     B · Quick picks
     ---------------------------------------------------------------- */
  function buildTiles() {
    var host = root.querySelector("[data-kw-tiles]");
    if (!host) return;
    host.innerHTML = demoCountries().map(function (c) {
      return (
        '<button type="button" class="kw-tile" data-kw-cc="' + c.cc + '">' +
        '<span class="kw-flag" aria-hidden="true"><span class="fi fi-' + c.cc + '"></span></span>' +
        '<span class="kw-tile__label">' + esc(c.label) + "</span>" +
        '<span class="kw-tile__cc">' + c.cc.toUpperCase() + "</span>" +
        "</button>"
      );
    }).join("");

    host.addEventListener("click", function (event) {
      var tile = event.target.closest("[data-kw-cc]");
      if (!tile) return;
      var c = byCc(tile.getAttribute("data-kw-cc"));
      if (!c) return;
      select(c, "tiles");
      markSelected(host.querySelectorAll("[data-kw-cc]"), c.cc);
    });
  }

  /* ----------------------------------------------------------------
     Treatment switch (lab control)
     ---------------------------------------------------------------- */
  function bindVariants() {
    var tabs = root.querySelector("[data-kw-variants]");
    if (!tabs) return;

    tabs.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-kw-variant-btn]");
      if (btn) showVariant(btn.getAttribute("data-kw-variant-btn"));
    });

    /* "Search all jurisdictions" in the quick-picks treatment. */
    root.addEventListener("click", function (event) {
      var jump = event.target.closest("[data-kw-goto-variant]");
      if (jump) showVariant(jump.getAttribute("data-kw-goto-variant"));
    });
  }

  function showVariant(name) {
    if (!name) return;
    Array.prototype.forEach.call(root.querySelectorAll("[data-kw-variant]"), function (panel) {
      panel.hidden = panel.getAttribute("data-kw-variant") !== name;
    });
    Array.prototype.forEach.call(root.querySelectorAll("[data-kw-variant-btn]"), function (btn) {
      var on = btn.getAttribute("data-kw-variant-btn") === name;
      btn.classList.toggle("tds-segmented-control__item--selected", on);
      btn.setAttribute("aria-pressed", String(on));
    });
  }

  /* ----------------------------------------------------------------
     Hand off
     ---------------------------------------------------------------- */
  function businessLabel() {
    var q = root.querySelector("[data-d3-kyb-map-await-query]");
    var text = q ? q.textContent.trim() : "";
    return text && text !== "—" ? text : "";
  }

  function bindContinue() {
    if (!continueBtn) return;
    continueBtn.addEventListener("click", function () {
      if (!selected) return;
      var name = businessLabel();
      var text = name ? name + ", " + selected.label : selected.label;
      document.dispatchEvent(
        new CustomEvent("d3-chat:send", {
          detail: { text: text, agent: "kyb" },
          cancelable: true
        })
      );
    });
  }

  function boot() {
    buildDropdown();
    buildTiles();
    bindVariants();
    bindContinue();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
