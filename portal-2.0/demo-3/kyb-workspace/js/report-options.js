/* ============================================================
   Demo 3 — KYB report: layout switch
   ============================================================
   Drives data-kw-nav and data-kw-surface on the report card. The
   styling for each option is in css/report-options.css.

   Two things need JS rather than CSS:

   1. Side nav shows one panel at a time, like tabs, but the report's
      own tab script hides panels with the `hidden` attribute and the
      CSS has to override that wholesale. So selection is tracked with
      a class here instead, and kept in step with the tab script by
      listening to the same clicks.

   2. Stacked shows every panel, so a tab click has nothing to switch
      — it scrolls to the section instead.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var card = document.querySelector("[data-kw-nav]");
  if (!card) return;

  var AXES = {
    nav: { attr: "data-kw-nav", options: ["tabs", "stacked", "sidenav"] },
    surface: { attr: "data-kw-surface", options: ["card", "sections", "flat"] }
  };

  function panels() {
    return card.querySelectorAll(".d3-kyb-panel[data-kw-label]");
  }

  function panelFor(name) {
    return card.querySelector('.d3-kyb-panel[data-d3-kyb-panel="' + name + '"]');
  }

  function activeTab() {
    var tab = card.querySelector(".d3-kyb-tabs__item.is-active");
    return tab ? tab.getAttribute("data-d3-kyb-tab") : "overview";
  }

  /* Side nav's "which panel is showing" lives in a class, because the
     `hidden` attribute is owned by the report's own tab script. */
  function syncSelected() {
    var name = activeTab();
    Array.prototype.forEach.call(panels(), function (panel) {
      panel.classList.toggle(
        "is-selected",
        panel.getAttribute("data-d3-kyb-panel") === name
      );
    });
  }

  function setAxis(axis, option) {
    var spec = AXES[axis];
    if (!spec || spec.options.indexOf(option) === -1) return;
    card.setAttribute(spec.attr, option);

    var group = document.querySelector('[data-kw-raxis="' + axis + '"]');
    if (group) {
      Array.prototype.forEach.call(group.querySelectorAll("[data-kw-ropt]"), function (btn) {
        var on = btn.getAttribute("data-kw-ropt") === option;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", String(on));
      });
    }

    if (axis === "nav") syncSelected();
  }

  function bindLab() {
    var lab = document.querySelector("[data-kw-report-lab]");
    if (!lab) return;
    lab.addEventListener("click", function (event) {
      var opt = event.target.closest("[data-kw-ropt]");
      if (!opt) return;
      var group = opt.closest("[data-kw-raxis]");
      if (!group) return;
      setAxis(group.getAttribute("data-kw-raxis"), opt.getAttribute("data-kw-ropt"));
    });
  }

  /* Capture phase so this runs before the report's own tab handler and
     can suppress the panel switch in stacked mode — where every panel
     is already on screen and switching would hide four of them. */
  function bindTabs() {
    card.addEventListener(
      "click",
      function (event) {
        var tab = event.target.closest(".d3-kyb-tabs__item");
        if (!tab) return;
        var mode = card.getAttribute("data-kw-nav");
        if (mode !== "stacked") return;

        event.preventDefault();
        event.stopPropagation();

        Array.prototype.forEach.call(
          card.querySelectorAll(".d3-kyb-tabs__item"),
          function (item) {
            var on = item === tab;
            item.classList.toggle("is-active", on);
            item.setAttribute("aria-selected", String(on));
          }
        );

        var panel = panelFor(tab.getAttribute("data-d3-kyb-tab"));
        if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      true
    );

    /* Bubble phase: after the report's tab script has moved `hidden`,
       mirror its choice into the class side nav reads. */
    card.addEventListener("click", function (event) {
      if (!event.target.closest(".d3-kyb-tabs__item")) return;
      syncSelected();
    });
  }

  function boot() {
    bindLab();
    bindTabs();
    syncSelected();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
