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

  function setAccordionExpanded(accordion, expanded) {
    var header = accordion.querySelector(".tds-accordion__header");
    var content = accordion.querySelector(".tds-accordion__content");
    if (!header || !content) return;
    header.setAttribute("aria-expanded", expanded ? "true" : "false");
    accordion.classList.toggle("tds-accordion--expanded", expanded);
    content.hidden = !expanded;
  }

  function openSignalCategory(categoryId) {
    setActiveTab("signals");

    document.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (accordion) {
      var isTarget = accordion.getAttribute("data-kyb-signal-category") === categoryId;
      setAccordionExpanded(accordion, isTarget);
    });

    var target = document.querySelector('.kyb-signal-category[data-kyb-signal-category="' + categoryId + '"]');
    if (!target) return;

    window.requestAnimationFrame(function () {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function initRiskCategoryCards() {
    document.querySelectorAll(".kyb-risk-category-card[data-kyb-signal-category]").forEach(function (card) {
      if (card.dataset.kybBound) return;
      card.dataset.kybBound = "1";

      card.addEventListener("click", function () {
        openSignalCategory(card.getAttribute("data-kyb-signal-category"));
      });
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
      if (isActive) {
        tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
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

  function initTabsScroll() {
    document.querySelectorAll(".tds-tabs:has(.tds-tabs__overflow-btn), [data-tabs-scrollable]").forEach(function (tabs) {
      var list = tabs.querySelector(".tds-tabs__list");
      var leftBtn = tabs.querySelector('[data-tabs-scroll="left"]');
      var rightBtn = tabs.querySelector('[data-tabs-scroll="right"]');
      if (!list || !leftBtn || !rightBtn) return;

      function updateOverflowButtons() {
        var canScrollLeft = list.scrollLeft > 1;
        var canScrollRight = list.scrollLeft + list.clientWidth < list.scrollWidth - 1;
        leftBtn.classList.toggle("tds-tabs__overflow-btn--visible", canScrollLeft);
        rightBtn.classList.toggle("tds-tabs__overflow-btn--visible", canScrollRight);
        leftBtn.tabIndex = canScrollLeft ? 0 : -1;
        rightBtn.tabIndex = canScrollRight ? 0 : -1;
      }

      function scrollTabs(direction) {
        list.scrollBy({
          left: direction === "left" ? -list.clientWidth * 0.6 : list.clientWidth * 0.6,
          behavior: "smooth",
        });
      }

      leftBtn.addEventListener("click", function () {
        scrollTabs("left");
      });
      rightBtn.addEventListener("click", function () {
        scrollTabs("right");
      });
      list.addEventListener("scroll", updateOverflowButtons, { passive: true });
      window.addEventListener("resize", updateOverflowButtons);
      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(updateOverflowButtons).observe(list);
      }
      updateOverflowButtons();
    });
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

  function kybRiskFromScore(score) {
    if (score < 30) return { risk: "low", label: "Low Risk" };
    if (score <= 60) return { risk: "medium", label: "Medium Risk" };
    return { risk: "high", label: "High Risk" };
  }

  function initKybScoreGauge() {
    document.querySelectorAll(".kyb-score-card .dv-di-gauge[data-score]").forEach(function (el) {
      var score = parseFloat(el.getAttribute("data-score") || "0");
      var tier = kybRiskFromScore(score);
      el.setAttribute("data-risk", tier.risk);
      el.setAttribute("data-label", tier.label);
      el.setAttribute("data-show-percent", "false");
    });
  }

  function init() {
    initTabs();
    initTabsScroll();
    initAccordions(document);
    initSignalRows();
    initRiskCategoryCards();
    initSidebarToggle();
    initScoreBreakdownLink();
    initRawCopy();
    initKybScoreGauge();
    if (window.ScoreGauge) ScoreGauge.renderAll(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.toggleAccordion = toggleAccordion;
})();
