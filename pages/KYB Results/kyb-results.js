/**
 * KYB Results — demo-only UI interactions (static reference page).
 */
(function () {
  "use strict";

  function toggleAccordion(header) {
    var accordion = header.closest(".tds-accordion");
    if (!accordion || accordion.classList.contains("tds-accordion--disabled")) return;
    var expanded = header.getAttribute("aria-expanded") === "true";
    header.setAttribute("aria-expanded", expanded ? "false" : "true");
    accordion.classList.toggle("tds-accordion--expanded", !expanded);
    var content = accordion.querySelector(".tds-accordion__content");
    if (content) content.hidden = expanded;
  }

  function initAccordions(root) {
    (root || document).querySelectorAll(".tds-accordion__header").forEach(function (header) {
      if (header.dataset.kybBound) return;
      header.dataset.kybBound = "1";
      header.addEventListener("click", function () {
        toggleAccordion(header);
      });
    });
  }

  function initSidebarToggle() {
    var columns = document.getElementById("kyb-columns");
    if (!columns) return;

    columns.querySelectorAll(".dv-sidebar-toggle--collapse").forEach(function (btn) {
      btn.addEventListener("click", function () {
        columns.classList.add("dv-columns--sidebar-collapsed");
        btn.setAttribute("aria-expanded", "false");
      });
    });

    columns.querySelectorAll(".dv-sidebar-toggle--expand").forEach(function (btn) {
      btn.addEventListener("click", function () {
        columns.classList.remove("dv-columns--sidebar-collapsed");
        var collapseBtn = columns.querySelector(".dv-sidebar-toggle--collapse");
        if (collapseBtn) collapseBtn.setAttribute("aria-expanded", "true");
        btn.setAttribute("aria-expanded", "true");
      });
    });
  }

  function initRawCopy() {
    var btn = document.getElementById("kyb-raw-copy");
    var pre = document.getElementById("kyb-raw-pre");
    if (!btn || !pre) return;
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(pre.textContent || "").catch(function () {});
    });
  }

  function initScoreBreakdownLink() {
    document.querySelectorAll("[data-kyb-jump-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setActiveTab(btn.getAttribute("data-kyb-jump-tab") || "signals");
      });
    });
  }

  function setActiveTab(tabId) {
    var shell = document.querySelector(".kyb-panel");
    if (!shell) return;

    shell.setAttribute("data-active-tab", tabId);

    shell.querySelectorAll(".kyb-section[data-kyb-tab]").forEach(function (section) {
      section.hidden = section.getAttribute("data-kyb-tab") !== tabId;
    });

    shell.querySelectorAll(".tds-tab-item[data-kyb-tab]").forEach(function (tab) {
      var isActive = tab.getAttribute("data-kyb-tab") === tabId;
      tab.classList.toggle("tds-tab-item--active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function initTabs() {
    var shell = document.querySelector(".kyb-panel");
    if (!shell) return;

    shell.querySelectorAll(".tds-tab-item[data-kyb-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveTab(tab.getAttribute("data-kyb-tab"));
      });
    });

    setActiveTab(shell.getAttribute("data-active-tab") || "ownership");
  }

  function initSignalRows() {
    document.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      if (row.dataset.kybBound) return;
      row.dataset.kybBound = "1";

      var toggle = row.querySelector(".kyb-signal-row__toggle");
      var details = row.nextElementSibling;
      if (!toggle || !details || !details.classList.contains("kyb-signal-detail-row")) return;

      function setExpanded(expanded) {
        row.classList.toggle("kyb-signal-row--expanded", expanded);
        toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
        details.hidden = !expanded;
      }

      row.addEventListener("click", function (event) {
        if (event.target.closest("a, button")) return;
        setExpanded(!row.classList.contains("kyb-signal-row--expanded"));
      });

      toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        setExpanded(!row.classList.contains("kyb-signal-row--expanded"));
      });
    });
  }

  function init() {
    initTabs();
    initAccordions(document);
    initSignalRows();
    initSidebarToggle();
    initScoreBreakdownLink();
    initRawCopy();
    if (window.ScoreGauge) ScoreGauge.renderAll(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.toggleAccordion = toggleAccordion;
})();
