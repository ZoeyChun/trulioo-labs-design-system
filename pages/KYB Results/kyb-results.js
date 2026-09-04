/**
 * KYB Results — demo-only UI interactions (static reference page).
 */
(function () {
  "use strict";

  function toggleAccordion(header) {
    var accordion = header.closest(".tds-accordion");
    if (
      !accordion ||
      accordion.classList.contains("tds-accordion--disabled") ||
      accordion.classList.contains("tds-accordion--skeleton")
    ) {
      return;
    }
    var expanded = accordion.classList.toggle("tds-accordion--expanded");
    header.setAttribute("aria-expanded", expanded ? "true" : "false");
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

  function setTabLayoutCollapsed(layout, collapsed) {
    layout.classList.toggle("dv-columns--sidebar-collapsed", collapsed);
    var card = layout.closest(".kyb-tab-card");
    if (card) card.classList.toggle("kyb-tab-card--sidebar-collapsed", collapsed);
    var collapseBtn = layout.querySelector(".dv-sidebar-toggle--collapse");
    var expandBtn = layout.querySelector(".dv-sidebar-toggle--expand");
    if (collapseBtn) collapseBtn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    if (expandBtn) expandBtn.setAttribute("aria-expanded", collapsed ? "true" : "false");
  }

  function initTabLayoutToggle() {
    document.querySelectorAll(".kyb-tab-layout.dv-columns").forEach(function (layout) {
      if (layout.dataset.kybLayoutBound) return;
      layout.dataset.kybLayoutBound = "1";

      var collapseBtn = layout.querySelector(".dv-sidebar-toggle--collapse");
      var expandBtn = layout.querySelector(".dv-sidebar-toggle--expand");

      if (collapseBtn) {
        collapseBtn.addEventListener("click", function () {
          setTabLayoutCollapsed(layout, true);
        });
      }

      if (expandBtn) {
        expandBtn.addEventListener("click", function () {
          setTabLayoutCollapsed(layout, false);
        });
      }
    });
  }

  function kybRiskTagClass(risk) {
    if (risk === "low") return "tds-tag tds-tag--sm tds-tag--positive";
    if (risk === "medium") return "tds-tag tds-tag--sm tds-tag--intermediate";
    return "tds-tag tds-tag--sm tds-tag--negative";
  }

  function updateScoreBreakdownFactor(factorEl, score) {
    var valueEl = factorEl.querySelector("[data-kyb-factor-value]");
    var tagEl = factorEl.querySelector("[data-kyb-factor-tag]");
    var fillEl = factorEl.querySelector(".kyb-score-factor__fill");
    var knobEl = factorEl.querySelector(".kyb-score-factor__knob");
    var input = factorEl.querySelector(".kyb-score-factor__input");
    var rounded = Math.max(0, Math.min(100, Math.round(score)));

    if (valueEl) valueEl.textContent = String(rounded);
    if (input && String(input.value) !== String(rounded)) input.value = String(rounded);
    if (fillEl) fillEl.style.width = rounded + "%";
    if (knobEl) knobEl.style.left = rounded + "%";

    if (tagEl) {
      var tier = kybRiskFromScore(rounded);
      tagEl.textContent = tier.label;
      tagEl.className = kybRiskTagClass(tier.risk);
    }
  }

  function syncScoreBreakdownFactorsFromSignals(dialog) {
    dialog.querySelectorAll(".kyb-score-factor").forEach(function (factor) {
      var categoryId = factor.getAttribute("data-kyb-score-factor");
      if (!categoryId) return;

      var accordion = document.querySelector(
        '.kyb-signal-category[data-kyb-signal-category="' + categoryId + '"]'
      );
      if (!accordion) return;

      var score = parseFloat(accordion.getAttribute("data-kyb-category-score") || "");
      if (isNaN(score)) return;

      updateScoreBreakdownFactor(factor, score);
    });
  }

  function updateScoreBreakdownGauge(dialog) {
    var factors = dialog.querySelectorAll(".kyb-score-factor");
    if (!factors.length) return;

    var total = 0;
    factors.forEach(function (factor) {
      var input = factor.querySelector(".kyb-score-factor__input");
      total += parseFloat(input && input.value ? input.value : "0") || 0;
    });

    var average = Math.round(total / factors.length);
    var gauge = dialog.querySelector("[data-kyb-score-breakdown-gauge]");
    if (!gauge) return;

    var tier = kybRiskFromScore(average);
    gauge.setAttribute("data-score", String(average));
    gauge.setAttribute("data-risk", tier.risk);
    gauge.setAttribute("data-label", tier.label);
    if (window.ScoreGauge) ScoreGauge.render(gauge);
  }

  function syncScoreBreakdownGaugeFromSignals(dialog) {
    var signalsGauge = document.querySelector("#kyb-signals-summary .kyb-tab-summary__gauge[data-score]");
    var breakdownGauge = dialog.querySelector("[data-kyb-score-breakdown-gauge]");
    if (!breakdownGauge) return;

    var score = signalsGauge
      ? parseFloat(signalsGauge.getAttribute("data-score") || "0")
      : parseFloat(breakdownGauge.getAttribute("data-score") || "0");
    var tier = kybRiskFromScore(score);

    breakdownGauge.setAttribute("data-score", String(score));
    breakdownGauge.setAttribute("data-risk", tier.risk);
    breakdownGauge.setAttribute("data-label", tier.label);
    breakdownGauge.setAttribute("data-show-percent", "false");

    var signalsConfidence = document.querySelector("[data-kyb-signals-confidence]");
    var breakdownConfidence = dialog.querySelector("[data-kyb-score-breakdown-confidence]");
    if (signalsConfidence && breakdownConfidence) {
      breakdownConfidence.textContent = signalsConfidence.textContent;
    }

    if (window.ScoreGauge) ScoreGauge.render(breakdownGauge);
  }

  function initScoreBreakdownDialog() {
    var dialog = document.getElementById("kyb-score-breakdown-dialog");
    if (!dialog) return;

    dialog.querySelectorAll(".kyb-score-factor").forEach(function (factor) {
      var input = factor.querySelector(".kyb-score-factor__input");
      if (!input || input.dataset.kybBound) return;
      input.dataset.kybBound = "1";
      input.addEventListener("input", function () {
        updateScoreBreakdownFactor(factor, parseFloat(input.value) || 0);
        updateScoreBreakdownGauge(dialog);
      });
    });

    document.querySelectorAll('[data-dialog-open="kyb-score-breakdown-dialog"]').forEach(function (btn) {
      if (btn.dataset.kybBreakdownBound) return;
      btn.dataset.kybBreakdownBound = "1";
      btn.addEventListener("click", function () {
        window.setTimeout(function () {
          syncScoreBreakdownFactorsFromSignals(dialog);
          syncScoreBreakdownGaugeFromSignals(dialog);
        }, 0);
      });
    });

    syncScoreBreakdownFactorsFromSignals(dialog);
  }

  function initTabSummaryScroll() {
    document.querySelectorAll("[data-kyb-scroll-target]").forEach(function (btn) {
      if (btn.dataset.kybBound) return;
      btn.dataset.kybBound = "1";
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-kyb-scroll-target");
        var target = targetId ? document.getElementById(targetId) : null;
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initRawCopy() {
    document.querySelectorAll("[data-kyb-json-copy]").forEach(function (btn) {
      if (btn.dataset.kybBound) return;
      btn.dataset.kybBound = "1";
      btn.addEventListener("click", function () {
        var panel = btn.closest(".kyb-json-panel, .bv-raw-panel");
        var pre = panel && panel.querySelector("pre");
        if (!pre) return;
        navigator.clipboard.writeText(pre.textContent || "").catch(function () {});
      });
    });
  }

  function personalizeJsonPreText(pre, entity, domain) {
    if (!pre) return;
    var text = pre.textContent;
    if (entity && entity.name) {
      text = text.split("Meridian Apex Consulting Ltd.").join(entity.name);
      var limitedName = entity.name.replace(/\.\s*$/, "");
      if (!/limited$/i.test(limitedName)) limitedName += " Limited";
      text = text.split("Meridian Apex Consulting Limited").join(limitedName);
    }
    if (domain) {
      text = text.replace(/info@meridianapexconsulting\.co\.uk/g, "info@" + domain);
    }
    pre.textContent = text;
  }

  function setAccordionExpanded(accordion, expanded) {
    var header = accordion.querySelector(".tds-accordion__header");
    if (!header) return;
    header.setAttribute("aria-expanded", expanded ? "true" : "false");
    accordion.classList.toggle("tds-accordion--expanded", expanded);
  }

  function openSignalCategory(categoryId, options) {
    options = options || {};
    setActiveTab("signals");

    document.querySelectorAll(".tds-risk-category-strip-card[data-kyb-signal-category]").forEach(function (card) {
      card.classList.remove("tds-risk-category-strip-card--selected");
      card.removeAttribute("aria-current");
    });

    document.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (accordion) {
      var isTarget = accordion.getAttribute("data-kyb-signal-category") === categoryId;
      setAccordionExpanded(accordion, isTarget);
    });

    var target = document.querySelector('.kyb-signal-category[data-kyb-signal-category="' + categoryId + '"]');
    if (target && options.scroll !== false) {
      window.requestAnimationFrame(function () {
        target.scrollIntoView({ behavior: "smooth", block: options.scrollBlock || "start" });
      });
    }

    return target;
  }

  function expandSignalRow(row) {
    if (!row) return;
    row.classList.add("kyb-signal-row--expanded");
    var toggle = row.querySelector(".kyb-signal-row__toggle");
    var details = row.nextElementSibling;
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    if (details && details.classList.contains("kyb-signal-detail-row")) details.hidden = false;
  }

  function highlightJumpTarget(el) {
    if (!el) return;
    var target = el.matches("tr, .tds-data-field, .kyb-officer-block, .kyb-insights-intro__head, .tds-data-table-container")
      ? el
      : el.closest("tr, .tds-data-field, .kyb-officer-block, .kyb-insights-intro__head, .tds-data-table-container") || el;
    target.classList.remove("kyb-jump-highlight");
    void target.offsetWidth;
    target.classList.add("kyb-jump-highlight");
    target.addEventListener(
      "animationend",
      function () {
        target.classList.remove("kyb-jump-highlight");
      },
      { once: true }
    );
  }

  function navigateToKybDetail(detail) {
    if (!detail || !detail.tab) return;

    setActiveTab(detail.tab);

    window.requestAnimationFrame(function () {
      if (detail.signalCategory) openSignalCategory(detail.signalCategory, { scroll: !detail.anchor });

      window.requestAnimationFrame(function () {
        var target = detail.anchor ? document.querySelector('[data-kyb-anchor="' + detail.anchor + '"]') : null;

        if (target && target.matches("[data-kyb-signal-row]")) expandSignalRow(target);

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          highlightJumpTarget(target);
          return;
        }

        if (detail.signalCategory) {
          var category = document.querySelector(
            '.kyb-signal-category[data-kyb-signal-category="' + detail.signalCategory + '"]'
          );
          if (category) {
            category.scrollIntoView({ behavior: "smooth", block: "start" });
            highlightJumpTarget(category);
          }
        }
      });
    });
  }

  function initRiskCategoryCards() {
    document.querySelectorAll(
      "[data-kyb-signal-category].kyb-risk-category-card, [data-kyb-signal-category].kyb-signal-category-card, [data-kyb-signal-category].tds-risk-category-strip-card"
    ).forEach(function (card) {
      if (card.dataset.kybBound) return;
      card.dataset.kybBound = "1";

      card.addEventListener("click", function () {
        openSignalCategory(card.getAttribute("data-kyb-signal-category"));
      });
    });
  }

  function initScoreBreakdownLink() {
    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-kyb-jump-tab]");
      if (!btn) return;

      var tab = btn.getAttribute("data-kyb-jump-tab") || "signals";
      var anchor = btn.getAttribute("data-kyb-jump-anchor");
      var signalCategory = btn.getAttribute("data-kyb-jump-signal-category");

      if (anchor || signalCategory) {
        navigateToKybDetail({ tab: tab, anchor: anchor || "", signalCategory: signalCategory || "" });
        return;
      }

      setActiveTab(tab);
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

  function resolveTabIdFromQuery(shell) {
    var params = new URLSearchParams(window.location.search);
    var tabParam = (params.get("tab") || "").trim().toLowerCase();
    if (!tabParam) return "";

    var aliases = {
      "web": "presence",
      "web-insights": "presence",
      "presence": "presence",
      "financial": "financial",
      "financial-profile": "financial",
      "ownership": "ownership",
      "ownership-ubo": "ownership",
      "signals": "signals",
      "business": "business-insights",
      "business-insights": "business-insights",
      "business-overview": "business-insights",
      "monitoring": "monitoring",
      "match-signals": "match-signals",
      "match": "match-signals",
      "raw": "raw-data",
      "raw-data": "raw-data",
      "additional": "additional-data",
      "additional-data": "additional-data",
      "sources": "sources",
      "summary": "summary",
    };

    var tabId = aliases[tabParam] || tabParam;
    return shell.querySelector('.tds-tab-item[data-kyb-tab="' + tabId + '"]') ? tabId : "";
  }

  function initTabs() {
    var shell = document.querySelector(".kyb-panel");
    if (!shell) return;

    shell.querySelectorAll(".tds-tab-item[data-kyb-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveTab(tab.getAttribute("data-kyb-tab"));
      });
    });

    var initialTab = resolveTabIdFromQuery(shell) || shell.getAttribute("data-active-tab") || "summary";
    setActiveTab(initialTab);
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

  var SIGNAL_TREND_UP_ICON =
    '<span class="tds-data-table__signals-icon" aria-hidden="true">' +
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M2.5 11.5 6 8l2.5 2L13.5 4"/><path d="M10.5 4H13.5V7"/>' +
    "</svg></span>";

  var SIGNAL_TREND_DOWN_ICON =
    '<span class="tds-data-table__signals-icon" aria-hidden="true">' +
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M2.5 4.5 6 8l2.5-2L13.5 12"/><path d="M10.5 12H13.5V9"/>' +
    "</svg></span>";

  function normalizeSignalDetails() {
    document.querySelectorAll(".kyb-signal-detail:not([data-kyb-detail-normalized])").forEach(function (detail) {
      if (detail.querySelector(".kyb-signal-detail__fields")) {
        detail.dataset.kybDetailNormalized = "1";
        return;
      }

      var descriptionEl = detail.querySelector(".kyb-signal-detail__description");
      var valueEl = detail.querySelector(".kyb-signal-detail__value");
      var description = descriptionEl
        ? descriptionEl.textContent.trim()
        : valueEl
          ? valueEl.textContent.trim()
          : "";

      var detailRow = detail.closest(".kyb-signal-detail-row");
      var signalRow = detailRow && detailRow.previousElementSibling;
      var isNegative = signalRow && signalRow.querySelector(".tds-data-table__signals--negative");
      var isPositive = signalRow && signalRow.querySelector(".tds-data-table__signals--positive");
      var impactText = isNegative
        ? "Increased the risk score"
        : isPositive
          ? "Decreased the risk score"
          : "No impact on risk score";
      var impactClass = isNegative
        ? "kyb-signal-detail__value--negative"
        : isPositive
          ? "kyb-signal-detail__value--positive"
          : "";
      var impactIcon = isNegative ? SIGNAL_TREND_UP_ICON : isPositive ? SIGNAL_TREND_DOWN_ICON : "";

      detail.innerHTML =
        '<p class="kyb-signal-detail__description"></p>' +
        '<hr class="kyb-signal-detail__divider" aria-hidden="true" />' +
        '<div class="kyb-signal-detail__fields">' +
        '<div class="kyb-signal-detail__field">' +
        '<p class="kyb-signal-detail__label">Value</p>' +
        '<p class="kyb-signal-detail__value ' +
        impactClass +
        '">' +
        impactIcon +
        impactText +
        "</p>" +
        "</div>" +
        '<div class="kyb-signal-detail__field kyb-signal-detail__field--source">' +
        '<p class="kyb-signal-detail__label">Source</p>' +
        '<p class="kyb-signal-detail__value">DRA</p>' +
        "</div>" +
        "</div>";

      detail.querySelector(".kyb-signal-detail__description").textContent = description;
      detail.dataset.kybDetailNormalized = "1";
    });
  }

  function closeAllDatasourceSelectMenus(except) {
    document.querySelectorAll(".kyb-datasource-select.tds-select--open").forEach(function (select) {
      if (select === except) return;
      select.classList.remove("tds-select--open");
      var trigger = select.querySelector(".tds-select__trigger");
      var menu = select.__kybDatasourceMenu || select.querySelector(".tds-select__menu");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
        trigger.classList.remove("tds-select__trigger--focus");
      }
      if (menu) {
        menu.setAttribute("hidden", "");
        if (window.TdsDropdownPanel) window.TdsDropdownPanel.close(menu);
      }
    });
  }

  function initDatasourceSelects(root) {
    var scope = root || document;
    scope.querySelectorAll(".kyb-datasource-select.tds-select--interactive").forEach(function (select) {
      if (select.dataset.kybDatasourceBound) return;
      select.dataset.kybDatasourceBound = "1";

      var trigger = select.querySelector(".tds-select__trigger");
      var menu = select.querySelector(".tds-select__menu");
      var valueEl = select.querySelector(".tds-select__value");
      var subtextEl = select.querySelector(".tds-select__subtext");
      select.__kybDatasourceMenu = menu;

      if (!trigger || !menu || select.classList.contains("tds-select--disabled")) return;

      trigger.addEventListener("click", function (event) {
        event.stopPropagation();
        var isOpen = select.classList.contains("tds-select--open");
        closeAllDatasourceSelectMenus();
        if (!isOpen) {
          select.classList.add("tds-select--open");
          trigger.setAttribute("aria-expanded", "true");
          trigger.classList.add("tds-select__trigger--focus");
          menu.removeAttribute("hidden");
          if (window.TdsDropdownPanel) {
            window.TdsDropdownPanel.open(trigger, menu, {
              align: "start",
              onClose: function () {
                select.classList.remove("tds-select--open");
                trigger.setAttribute("aria-expanded", "false");
                trigger.classList.remove("tds-select__trigger--focus");
                menu.setAttribute("hidden", "");
              },
            });
          }
        }
      });

      menu.querySelectorAll(".tds-action-list-item:not(.tds-action-list-item--disabled)").forEach(function (item) {
        item.addEventListener("click", function (event) {
          event.stopPropagation();
          var val =
            item.getAttribute("data-value") ||
            (item.querySelector(".tds-action-list-item__label") || {}).textContent ||
            item.textContent ||
            "";
          val = val.trim();
          menu.querySelectorAll(".tds-action-list-item").forEach(function (option) {
            option.classList.remove("tds-action-list-item--selected");
          });
          item.classList.add("tds-action-list-item--selected");
          if (valueEl && val) {
            valueEl.textContent = val;
            valueEl.classList.remove("tds-select__placeholder");
          }
          var descEl = item.querySelector(".tds-action-list-item__description");
          var subtext =
            item.getAttribute("data-subtext") || (descEl && descEl.textContent) || "";
          if (subtextEl && subtext.trim()) {
            subtextEl.textContent = subtext.trim();
          }
          if (window.TdsDropdownPanel) window.TdsDropdownPanel.close(menu);
          else {
            select.classList.remove("tds-select--open");
            trigger.setAttribute("aria-expanded", "false");
            trigger.classList.remove("tds-select__trigger--focus");
            menu.setAttribute("hidden", "");
          }
        });
      });
    });
  }

  if (!window.__kybDatasourceSelectListeners) {
    window.__kybDatasourceSelectListeners = true;
    document.addEventListener("click", function (event) {
      if (event.target.closest(".kyb-datasource-select, .tds-select__menu")) return;
      closeAllDatasourceSelectMenus();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAllDatasourceSelectMenus();
    });
  }

  function initMatchSignalRows() {
    var section = document.getElementById("kyb-match-signals");
    if (!section) return;

    function collapseMatchRow(row) {
      row.classList.remove("kyb-match-row--expanded");
      var toggle = row.querySelector(".kyb-match-row__toggle");
      var details = row.nextElementSibling;
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Show source details");
      }
      if (details && details.classList.contains("kyb-match-detail-row")) {
        details.hidden = true;
      }
    }

    section.querySelectorAll("[data-kyb-match-row]").forEach(function (row) {
      if (row.dataset.kybBound) return;
      row.dataset.kybBound = "1";

      var toggle = row.querySelector(".kyb-match-row__toggle");
      var details = row.nextElementSibling;
      if (!toggle || !details || !details.classList.contains("kyb-match-detail-row")) return;

      function setExpanded(expanded) {
        if (expanded) {
          section.querySelectorAll("[data-kyb-match-row].kyb-match-row--expanded").forEach(function (other) {
            if (other !== row) collapseMatchRow(other);
          });
        }
        row.classList.toggle("kyb-match-row--expanded", expanded);
        toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
        toggle.setAttribute("aria-label", expanded ? "Hide source details" : "Show source details");
        details.hidden = !expanded;
      }

      setExpanded(row.classList.contains("kyb-match-row--expanded"));

      row.addEventListener("click", function (event) {
        if (event.target.closest("a, button")) return;
        setExpanded(!row.classList.contains("kyb-match-row--expanded"));
      });

      toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        setExpanded(!row.classList.contains("kyb-match-row--expanded"));
      });
    });
  }

  function initSignalRows() {
    normalizeSignalDetails();

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

  var DEFAULT_COMPANY_NAME = "Meridian Apex Consulting Ltd.";
  var DEFAULT_COMPANY_ALT = "Meridian Apex Consulting Limited";
  var DEFAULT_DOMAIN = "meridianapexconsulting.co.uk";

  var ANNOUNCEMENT_ERROR_ICON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">' +
    '<path d="M8 2.5 14 13.5H2L8 2.5z"/>' +
    '<path d="M8 6.5v3.5" stroke-linecap="round"/>' +
    '<circle cx="8" cy="11.75" r=".6" fill="currentColor"/></svg>';

  var FINDING_INTERMEDIATE_ICON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">' +
    '<circle cx="8" cy="8" r="6.25"/></svg>';

  var FINDING_POSITIVE_ICON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">' +
    '<circle cx="8" cy="8" r="6.25"/>' +
    '<path d="M5.5 8.5 7 10l3.5-4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ENTITY_PROFILES = {
    standard: {
      score: 28,
      riskLevel: "Low",
      summary: "{name} shows clean US registry records and straightforward ownership with no elevated risk signals detected.",
      overviewNarrative:
        "{name} presents a low-risk onboarding profile with verified state registration and a direct ownership structure. Registry filings are current, the registered address aligns with declared operations, and no elevated AML or adverse signals were detected across core KYB checks. Overall risk indicators sit within standard onboarding thresholds.",
      sidebarSummary: {
        overview:
          "{name} is an active US services company with verified state registration, direct ownership, and no elevated risk signals across core KYB checks.",
        alerts: [
          {
            text: "Active corporate registry status with consistent filing history",
            featured: true,
            view: { tab: "business-insights", anchor: "insight-company-status" },
          },
          {
            text: "Direct ownership structure with no offshore intermediaries",
            featured: false,
            view: { tab: "ownership", anchor: "ownership-table" },
          },
          {
            text: "Registered address matches declared operating location",
            featured: false,
            view: { tab: "business-insights", anchor: "insight-registered-address" },
          },
        ],
      },
      insightsSummary: "{name} is an active US services company with verified registration, stable operating history, and baseline risk indicators within normal onboarding thresholds.",
      overallRisk: 28,
      registryMatch: 94,
      operationalFootprint: 72,
      entityType: "Corporation",
      industry: "Business services",
      employees: "45",
      parentEntity: "None identified",
      signalCount: "12",
      summaryPage: {
        riskLabel: "Low Risk Entity",
        verdictTitle: "{name} cleared for standard onboarding",
        findings: [
          "Active corporate registry status with consistent filing history.",
          "Direct ownership structure with verified officers.",
          "No elevated AML or adverse signals detected across core KYB checks.",
        ],
      },
      ownershipRows: [
        { name: "Sarah Chen", subtitle: "Chief Executive Officer", pct: "100%", address: "—", status: "Verified", statusTone: "positive" },
      ],
      officers: [{ name: "Sarah Chen", role: "Chief Executive Officer", note: "Active since 18 Jun 2018" }],
      directorName: "Sarah Chen",
      directorDate: "18 Jun 2018",
      officerNote: "Beneficial owner verified through US state registry filings.",
      officerTone: "positive",
    },
    complex: {
      score: 72,
      riskLevel: "Medium",
      summary: "{name} resolves through nested corporate layers across multiple jurisdictions with inferred offshore ownership links.",
      overviewNarrative:
        "{name} presents moderate onboarding risk due to a multi-layer ownership structure spanning {country} and offshore jurisdictions. Registry status is active, but beneficial ownership is partially inferred and transparency is limited across intermediate holding entities. Additional review of the ownership chain and source coverage is recommended before approval.",
      sidebarSummary: {
        overview:
          "{name} operates through nested corporate layers across {country} and offshore jurisdictions, with inferred beneficial ownership and limited registry transparency.",
        alerts: [
          {
            text: "Multi-layer ownership spanning multiple jurisdictions",
            featured: true,
            view: { tab: "ownership", anchor: "ownership-parent" },
          },
          {
            text: "Beneficial owner inferred rather than directly disclosed",
            featured: false,
            view: { tab: "ownership", anchor: "ownership-officer" },
          },
          {
            text: "Operating address differs from registered corporate address",
            featured: false,
            view: { tab: "signals", signalCategory: "third-party-market", anchor: "signal-shared-address" },
          },
        ],
      },
      insightsSummary: "{name} operates through a multi-layer holding structure with cross-border subsidiaries. Ownership tracing surfaced inferred UBOs and limited transparency across intermediate entities.",
      overallRisk: 72,
      registryMatch: 88,
      operationalFootprint: 41,
      entityType: "Private limited",
      industry: "Holding company",
      employees: "12",
      parentEntity: "Helix Meridian Holdings BVI Ltd.",
      signalCount: "31",
      summaryPage: {
        riskLabel: "Medium Risk Entity",
        verdictTitle: "{name} requires enhanced due diligence",
        findings: [
          "Multi-layer ownership spanning multiple jurisdictions with inferred beneficial owners.",
          "Beneficial owner could not be independently verified from registry sources.",
          "Operating address differs from registered corporate address.",
        ],
      },
      ownershipRows: [
        { name: "Helix Meridian Holdings BVI Ltd.", subtitle: "Parent company", pct: "100%", address: "—", status: "Inferred", statusTone: "intermediate" },
        { name: "David Okonkwo", subtitle: "Director", pct: "—", address: "—", status: "Verified", statusTone: "positive" },
      ],
      officers: [{ name: "David Okonkwo", role: "Director", note: "Active since 4 Nov 2020" }],
      directorName: "David Okonkwo",
      directorDate: "04 Nov 2020",
      officerNote: "Beneficial owner could not be independently verified from registry sources.",
      officerTone: "warning",
    },
    elevated: {
      score: 87,
      riskLevel: "High",
      summary: "{name} returned elevated AML signals including adverse media indicators and high-risk jurisdiction exposure.",
      overviewNarrative:
        "{name} presents elevated onboarding risk driven by a commercially dormant operating profile and opaque offshore ownership structure. Registry data confirms active status, but no verifiable trading activity, an expired web presence, and micro-entity filings suggest a shell or pass-through entity rather than an active consultancy. Payment delinquencies and industry-activity mismatches further increase default and AML exposure.",
      sidebarSummary: {
        overview:
          "{name} is an active UK private company registered at a formations-agent address, with no verifiable trading activity and ownership routed through an offshore BVI holding.",
        alerts: [
          {
            text: "No verifiable business activity at the registered Formation House address",
            featured: true,
            view: { tab: "signals", signalCategory: "business-model", anchor: "signal-credit-default" },
          },
          {
            text: "100% ownership inferred through Apex Holdings BVI Ltd. with no disclosed UBO",
            featured: false,
            view: { tab: "ownership", anchor: "ownership-parent" },
          },
          {
            text: "Director {director} linked to 3 previously dissolved entities",
            featured: false,
            view: { tab: "ownership", anchor: "ownership-officer" },
          },
        ],
      },
      insightsSummary:
        "{name} is an active but commercially dormant private company with no verifiable operating footprint. The profile is consistent with a shell or pass-through entity rather than a trading consultancy.",
      overallRisk: 79,
      registryMatch: 92,
      operationalFootprint: 18,
      entityType: "Private limited",
      industry: "Management consultancy",
      employees: "0",
      parentEntity: "Apex Holdings BVI Ltd.",
      signalCount: "38",
      signalsTabSummary: {
        truaiSummary:
          "12 risk signals detected, 20 increasing and 8 decreasing. All 5 categories score High Risk except Third-Party & Market (Medium). Business Model (84) and Financial Health (68) are the top contributors to the overall 87/100 score.",
        confidence: "86%",
        findings: [
          "Business Model 84/100: credit default risk + payment delinquencies",
          "Financial Health 68/100: High Risk",
          "2 operational signals: virtual office, expired domain",
        ],
      },
      impactCounts: { all: 12, negative: 20, positive: 8 },
      summaryPage: {
        riskLabel: "High Risk Entity",
        verdictTitle: "{name} required manual review",
        findings: [
          "9 of 16 verification signals flagged, including unverified beneficial ownership and incomplete financial records.",
          "Business legitimacy score 18/100 with $0 reported revenue, 0 employees, and no verifiable operating history.",
          "Both officers lack national ID verification, and web presence shows medium risk indicators across social and domain signals.",
        ],
      },
      tabSummaries: {
        ownership: {
          truai:
            "Ownership resolves to two shareholders at the same formations-agent address. Neither officer has a verifiable national ID.\n\nOwnership chain passes through a BVI holding company with no public disclosure.",
          prompt: "Who is the UBO?",
          findings: [
            "Both shareholders share a formations-agent address",
            "Walter Decosta linked to 2 unscreened entities",
            "No verifiable national ID for either officer",
          ],
        },
        "business-insights": {
          truai:
            "Meridian Apex Consulting Ltd. is active but commercially dormant.\n\nZero employees, £1 capital, expired website, and a virtual office address after 6 years of incorporation. All three risk scores are critical (18/100).",
          prompt: "What would improve these scores?",
          findings: [
            "Legitimacy 18, Suspicion 18, Confidence 18",
            "Virtual office at known formations-agent suite",
            "2 operational signals: virtual office, expired domain",
          ],
        },
        presence: {
          truai:
            "No active digital footprint. Registered domain expired Feb 2025 and hasn't been renewed.\n\nNo social media presence found except an unverified LinkedIn profile.",
          prompt: "Is this consistent with a shell entity?",
          findings: [
            "Domain expired 18 months ago, never renewed",
            "No live website available to verify",
            "No Instagram or Facebook presence",
            { text: "LinkedIn profile exists but unverified", tone: "intermediate" },
          ],
        },
        financial: {
          truai:
            "Shell entity characteristics across all financial indicators. Zero revenue, zero employees, and minimum legal capital (£1) over 6 years.\n\nNo financial stability data filed.",
          prompt: "Compare to SIC 70229 financials",
          findings: [
            "$0 annual sales across all reporting periods",
            "0 employees registered with official bodies",
            "$1 shareholder funds (legal minimum only)",
            "Credit Risk Indicator flagged",
          ],
        },
        monitoring: {
          truai:
            "Four registry changes detected in the past 15 months, including a full legal rebrand and BRN amendment. The entity changed name twice and updated its registered address — pattern consistent with identity obfuscation.",
          prompt: "Why did this entity rebrand?",
          findings: [
            "Legal name changed on 10 Jan 2025",
            "Trading name updated 18 Mar 2025",
            "BRN and registered address amended same day",
          ],
        },
        sources: {
          truai:
            "Assessment draws from 5 external sources and 4 Trulioo capabilities.\n\nBVI Financial Services Commission returned no public disclosure, limiting ownership verification.",
          prompt: "Which findings lack corroboration?",
          findings: [
            { text: "Companies House: 2 filings accessed", tone: "positive" },
            { text: "WHOIS: domain timeline confirmed", tone: "positive" },
            { text: "BVI registry: no public disclosure", tone: "warning" },
            { text: "Trulioo internal record matched", tone: "positive" },
          ],
        },
        "additional-data": {
          truai:
            "Supplemental registry fields provide context beyond core verification. SIC code aligns with declared consultancy activity, though alternate names reflect the recent rebrand.",
          prompt: "Which fields changed after rebrand?",
          findings: [
            { text: "SIC 70229 matches management consultancy", tone: "positive" },
            "Previous legal name: Apex Meridian Ltd.",
            { text: "VAT and BRN on file with Companies House", tone: "positive" },
          ],
        },
        "match-signals": {
          truai:
            "Business Name and City failed to match across all 4 responding datasources. Only Jurisdiction and State Province returned consistent results (3/4 matched each). With a 50% field match rate and 0 of 4 sources confirming the full record, this entity does not meet the KYB Standard verification rule.",
          prompt: "Show non-responding sources",
          findings: [
            "Business Name matched 1 of 4 sources",
            "City returned 0 of 4 matches",
            { text: "3 of 7 datasources did not respond", tone: "intermediate" },
          ],
        },
      },
      ownershipRows: [
        { name: "James Morton", subtitle: "Shareholder", pct: "65%", address: "71 Queen Victoria St, San Francisco", status: "Clear", statusTone: "positive" },
        { name: "Walter Decosta", subtitle: "Shareholder", pct: "35%", address: "71 Queen Victoria St, San Francisco", status: "2 more entities connected", statusTone: "negative" },
      ],
      ownershipGraph: {
        root: { type: "business", name: "Apex Holdings BVI Ltd.", subtitle: "Parent Company" },
        branches: [
          { type: "person", name: "Walter Decosta", subtitle: "Owns 35%" },
          { type: "person", name: "James Morton", subtitle: "Owns 65%", moreCount: 1 },
          { type: "business", name: "{name}", subtitle: "Subject Entity", highlighted: true, moreCount: 2 },
        ],
        riskFilter: { label: "Risk Signals: High", count: 6 },
      },
      officers: [
        { name: "Robert James Halsted", note: "Director (active since 1 Feb 2019)" },
        { name: "Anya Voronova - Company Secretary", note: "(Active since 1 Feb 2019; registered at the formations-agent address)" },
      ],
      directorName: "Robert James Halsted",
      directorDate: "1 Feb 2019",
      officerNote: "No verifiable national ID for either officer. Full officer detail in Supporting Records.",
      officerNoteTitle: "Note",
      officerTone: "warning",
    },
    default: {
      score: 55,
      riskLevel: "Medium",
      summary: "{name} is an active registered entity with mixed registry signals. Ownership and operational footprint require further review.",
      overviewNarrative:
        "{name} presents a mixed onboarding profile with active registry status but incomplete ownership disclosure and gaps in operational footprint data. Available sources partially align on core identity fields, though filing history and beneficial ownership require further review before a final risk determination.",
      sidebarSummary: {
        overview:
          "{name} is an active registered entity in {country} with mixed registry signals. Ownership structure and operational footprint require further review.",
        alerts: [
          {
            text: "Registry status is active but filing gaps were detected",
            featured: true,
            view: { tab: "business-insights", anchor: "insight-company-status" },
          },
          {
            text: "Limited public footprint relative to stated business activity",
            featured: false,
            view: { tab: "signals", signalCategory: "business-model", anchor: "signal-operating-footprint" },
          },
          {
            text: "Partial ownership disclosure with one unresolved layer",
            featured: false,
            view: { tab: "ownership", anchor: "ownership-parent" },
          },
        ],
      },
      insightsSummary: "{name} is an active registered entity with available registry data. Additional review of ownership structure and operating footprint is recommended.",
      overallRisk: 55,
      registryMatch: 90,
      operationalFootprint: 48,
      entityType: "Registered business",
      industry: "Not classified",
      employees: "—",
      parentEntity: "Under review",
      signalCount: "24",
      ownershipRows: [
        { name: "Registry parent entity", subtitle: "Parent company", pct: "100%", address: "—", status: "Inferred", statusTone: "intermediate" },
        { name: "Registered director", subtitle: "Director", pct: "—", address: "—", status: "Verified", statusTone: "positive" },
      ],
      officers: [{ name: "Registered director", role: "Director", note: "Appointment under review" }],
      directorName: "Registered director",
      directorDate: "Under review",
      officerNote: "Additional ownership review recommended based on available registry data.",
      officerTone: "warning",
    },
  };

  function getHomeUrl() {
    try {
      var stored = sessionStorage.getItem("kybHomeUrl");
      if (stored) return stored;
    } catch (e) {
      /* ignore */
    }

    try {
      return new URL("../unified-intelligence-home/index.html", window.location.href).href;
    } catch (e) {
      return "../unified-intelligence-home/index.html";
    }
  }

  function initHomeNavigation() {
    var homeUrl = getHomeUrl();

    var resultBack = document.getElementById("kyb-result-back");
    if (resultBack) {
      resultBack.addEventListener("click", function () {
        if (window.LabsHistoryReturn && window.LabsHistoryReturn.go(homeUrl)) return;
        var target = window.top && window.top !== window ? window.top : window;
        target.location.href = homeUrl;
      });
    }

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

  function parseEntityContext() {
    var params = new URLSearchParams(window.location.search);
    var name = params.get("name");

    if (name) {
      return {
        name: name,
        country: params.get("country") || "",
        countryCode: (params.get("countryCode") || "gb").toLowerCase(),
        brn: params.get("brn") || "",
        sample: params.get("sample") || "",
        address1: params.get("address1") || "",
        city: params.get("city") || "",
        state: params.get("state") || "",
        postal: params.get("postal") || "",
      };
    }

    try {
      var stored = sessionStorage.getItem("kybEntity");
      if (stored) {
        var parsed = JSON.parse(stored);
        if (parsed && parsed.name) return parsed;
      }
    } catch (e) {
      /* ignore malformed session payload */
    }

    return {
      name: DEFAULT_COMPANY_NAME,
      country: "United Kingdom",
      countryCode: "gb",
      brn: "12847362",
      sample: "elevated",
      address1: "Suite 4, 123 Formation House",
      city: "London",
      postal: "EC2A 4NE",
    };
  }

  function fillTemplate(template, entity, extras) {
    var result = (template || "").replace(/\{name\}/g, entity.name);
    result = result.replace(/\{country\}/g, entity.country || "the registered jurisdiction");
    if (extras && extras.director) result = result.replace(/\{director\}/g, extras.director);
    return result;
  }

  function buildSidebarViewButton(view) {
    if (!view) return "";
    var attrs = 'type="button" class="tds-accordion__action" data-kyb-jump-tab="' + (view.tab || "signals") + '"';
    if (view.anchor) attrs += ' data-kyb-jump-anchor="' + view.anchor + '"';
    if (view.signalCategory) attrs += ' data-kyb-jump-signal-category="' + view.signalCategory + '"';
    return "<button " + attrs + ">View</button>";
  }

  function renderSignalImpactCounts(profile) {
    if (!profile || !profile.impactCounts) return;
    var section = document.getElementById("kyb-signals");
    if (!section) return;

    Object.keys(profile.impactCounts).forEach(function (key) {
      var counter = section.querySelector('[data-kyb-impact-count="' + key + '"]');
      if (counter) counter.textContent = String(profile.impactCounts[key]);
    });
    section.dataset.kybImpactCountsOverride = "1";
  }

  function renderTabFindingItem(finding) {
    var text = typeof finding === "string" ? finding : finding.text;
    var tone = typeof finding === "string" ? "warning" : finding.tone || "warning";
    var iconClass = "";
    var icon;

    if (tone === "positive") {
      iconClass = " kyb-tab-summary__finding-icon--positive";
      icon = FINDING_POSITIVE_ICON;
    } else if (tone === "intermediate") {
      iconClass = " kyb-tab-summary__finding-icon--intermediate";
      icon = FINDING_INTERMEDIATE_ICON;
    } else {
      icon = ANNOUNCEMENT_ERROR_ICON;
    }

    return (
      '<li class="kyb-tab-summary__finding">' +
      '<span class="kyb-tab-summary__finding-icon' +
      iconClass +
      '" aria-hidden="true">' +
      icon +
      "</span>" +
      '<span class="kyb-tab-summary__finding-text">' +
      text +
      "</span>" +
      "</li>"
    );
  }

  function renderTabSummaries(profile) {
    if (!profile || !profile.tabSummaries) return;

    Object.keys(profile.tabSummaries).forEach(function (tabKey) {
      var data = profile.tabSummaries[tabKey];
      if (!data) return;

      var truaiEl = document.querySelector('[data-kyb-tab-truai="' + tabKey + '"]');
      if (truaiEl && data.truai) truaiEl.textContent = data.truai;

      var promptBtn = document.querySelector('[data-kyb-tab-prompt="' + tabKey + '"]');
      if (promptBtn && data.prompt) {
        promptBtn.setAttribute("data-truai-prompt", data.prompt);
        var icon = promptBtn.querySelector(".kyb-truai-prompt-chip__icon");
        promptBtn.textContent = "";
        if (icon) promptBtn.appendChild(icon.cloneNode(true));
        promptBtn.appendChild(document.createTextNode(data.prompt));
      }

      var findingsList = document.querySelector('[data-kyb-tab-findings="' + tabKey + '"]');
      if (findingsList && data.findings && data.findings.length) {
        findingsList.innerHTML = data.findings.map(renderTabFindingItem).join("");
      }
    });
  }

  function renderSignalsTabSummary(profile) {
    var data = profile.signalsTabSummary;
    if (!data) return;

    var truaiEl = document.querySelector("[data-kyb-signals-truai-summary]");
    if (truaiEl && data.truaiSummary) truaiEl.textContent = data.truaiSummary;

    var confidenceEl = document.querySelector("[data-kyb-signals-confidence]");
    if (confidenceEl && data.confidence) confidenceEl.textContent = data.confidence;

    document.querySelectorAll("[data-kyb-score-breakdown-confidence]").forEach(function (el) {
      if (data.confidence) el.textContent = data.confidence;
    });

    var findingsList = document.querySelector("[data-kyb-signals-findings]");
    if (findingsList && data.findings && data.findings.length) {
      findingsList.innerHTML = data.findings
        .map(function (text) {
          return (
            '<li class="kyb-tab-summary__finding">' +
            '<span class="kyb-tab-summary__finding-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 2.5 14 13.5H2L8 2.5z"/><path d="M8 6.5v3.5" stroke-linecap="round"/><circle cx="8" cy="11.75" r=".6" fill="currentColor"/></svg></span>' +
            '<span class="kyb-tab-summary__finding-text">' + text + "</span>" +
            "</li>"
          );
        })
        .join("");
    }
  }

  function renderSidebarSummary(summaryData) {
    var root = document.querySelector(".kyb-sidebar-summary");
    if (!root || !summaryData) return;

    var overview = root.querySelector(":scope > .tds-announcement__message");
    if (overview) overview.textContent = summaryData.overview;

    var findings = root.querySelector(".kyb-sidebar-summary__findings");
    if (findings && summaryData.alerts) {
      findings.innerHTML = summaryData.alerts
        .map(function (alert) {
          var featuredClass = alert.featured ? " kyb-sidebar-summary__finding--featured" : "";
          var viewBtn = buildSidebarViewButton(alert.view);
          return (
            '<div class="tds-announcement tds-announcement--error tds-announcement--inline kyb-sidebar-summary__finding' +
            featuredClass +
            '" role="status">' +
            '<span class="tds-announcement__icon" aria-hidden="true">' +
            ANNOUNCEMENT_ERROR_ICON +
            "</span>" +
            '<div class="tds-announcement__content">' +
            '<p class="tds-announcement__message">' +
            alert.text +
            "</p>" +
            viewBtn +
            "</div></div>"
          );
        })
        .join("");
    }
  }

  function sidebarSummaryFromProfile(profile, entity) {
    var data = profile.sidebarSummary;
    if (!data) return null;

    var extras = { director: profile.directorName || "the appointed director" };

    return {
      overview: fillTemplate(data.overview, entity, extras),
      alerts: data.alerts.map(function (alert) {
        return {
          text: fillTemplate(alert.text, entity, extras),
          featured: !!alert.featured,
          view: alert.view || null,
        };
      }),
    };
  }

  function slugifyDomain(name) {
    return name
      .toLowerCase()
      .replace(/\.(inc\.|ltd\.|pte ltd\.|llc|gmbh|bv)/g, "")
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 28);
  }

  function replaceTextInRoot(root, replacements) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (!node.nodeValue) return;
      replacements.forEach(function (pair) {
        if (node.nodeValue.indexOf(pair.from) >= 0) {
          node.nodeValue = node.nodeValue.split(pair.from).join(pair.to);
        }
      });
    });
  }

  function formatRegisteredAddress(entity) {
    if (!entity.address1) return null;
    var parts = [entity.address1];
    var cityLine = [entity.city, entity.state, entity.postal].filter(Boolean).join(", ");
    if (cityLine) parts.push(cityLine);
    return parts.join(", ");
  }

  function setFieldValue(root, label, value) {
    if (!value) return;
    (root || document).querySelectorAll(".tds-data-field").forEach(function (field) {
      var fieldLabel = field.querySelector(".tds-data-field__label");
      if (!fieldLabel || fieldLabel.textContent.trim() !== label) return;
      var valueEl = field.querySelector(".tds-data-field__value");
      if (valueEl) valueEl.textContent = value;
    });
  }

  function setMiniScoreCard(label, value) {
    document.querySelectorAll(".kyb-score-card-mini").forEach(function (card) {
      var cardLabel = card.querySelector(".kyb-score-card-mini__label");
      if (!cardLabel || cardLabel.textContent.trim() !== label) return;
      var valueEl = card.querySelector(".kyb-score-card-mini__value");
      if (valueEl) valueEl.textContent = String(value);
    });
  }

  function renderOwnershipTable(rows) {
    var tbody = document.querySelector(".kyb-ownership-table tbody");
    if (!tbody || !rows || !rows.length) return;

    tbody.innerHTML = rows
      .map(function (row, index) {
        var anchorAttr = index === 0 ? ' data-kyb-anchor="ownership-parent"' : "";
        var subtitle = row.subtitle || row.role || "";
        var nameCell = subtitle
          ? '<td class="tds-data-table__text-cell tds-data-table__text-cell--subtext">' +
            '<span class="tds-data-table__cell-inner">' +
            '<span class="tds-data-table__cell-text-stack">' +
            "<span>" +
            row.name +
            "</span>" +
            '<span class="tds-data-table__cell-subtext">' +
            subtitle +
            "</span>" +
            "</span></span></td>"
          : '<td class="tds-data-table__text-cell">' + row.name + "</td>";

        return (
          "<tr" +
          anchorAttr +
          ">" +
          nameCell +
          '<td class="tds-data-table__text-cell">' +
          row.pct +
          "</td>" +
          '<td class="tds-data-table__text-cell">' +
          (row.address || "—") +
          "</td>" +
          '<td class="tds-data-table__text-cell"><span class="tds-data-table__label-cell"><span class="tds-tag tds-tag--md tds-tag--' +
          row.statusTone +
          '">' +
          row.status +
          "</span></span></td>" +
          "</tr>"
        );
      })
      .join("");
  }

  function uboGraphIcon(type) {
    if (type === "person") {
      return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="8" cy="5.5" r="2.25"/><path d="M3.5 13.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/></svg>';
    }
    return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M3 13.5V4.5l5-2.5 5 2.5v9"/><path d="M6.5 13.5v-4h3v4"/></svg>';
  }

  function buildUboGraphCard(node) {
    var highlighted = node.highlighted ? " kyb-ubo-node--highlighted" : "";
    return (
      '<article class="kyb-ubo-node' +
      highlighted +
      '" data-kyb-ubo-node>' +
      '<span class="kyb-ubo-node__icon kyb-ubo-node__icon--' +
      node.type +
      '" aria-hidden="true">' +
      uboGraphIcon(node.type) +
      "</span>" +
      '<span class="kyb-ubo-node__copy">' +
      '<span class="kyb-ubo-node__name">' +
      node.name +
      "</span>" +
      '<span class="kyb-ubo-node__meta">' +
      node.subtitle +
      "</span>" +
      "</span></article>"
    );
  }

  function ownershipGraphFromProfile(profile, entity) {
    if (profile.ownershipGraph) {
      var extras = { director: profile.directorName || "the appointed director" };
      return {
        root: {
          type: profile.ownershipGraph.root.type || "business",
          name: fillTemplate(profile.ownershipGraph.root.name, entity, extras),
          subtitle: fillTemplate(profile.ownershipGraph.root.subtitle, entity, extras),
        },
        branches: profile.ownershipGraph.branches.map(function (branch) {
          return {
            type: branch.type || "person",
            name: fillTemplate(branch.name, entity, extras),
            subtitle: fillTemplate(branch.subtitle, entity, extras),
            highlighted: !!branch.highlighted,
            moreCount: branch.moreCount || 0,
          };
        }),
        riskFilter: profile.ownershipGraph.riskFilter || null,
      };
    }

    var parentName = profile.parentEntity;
    var showParent = parentName && parentName !== "None identified" && parentName !== "Under review";
    var owners = (profile.ownershipRows || []).filter(function (row) {
      return row.pct && row.pct !== "—" && row.name !== parentName;
    });

    var root = showParent
      ? { type: "business", name: parentName, subtitle: "Parent Company" }
      : { type: "business", name: entity.name, subtitle: "Root Business" };

    var branches = owners.length
      ? owners.map(function (owner) {
          return {
            type: "person",
            name: owner.name,
            subtitle: "Owns " + owner.pct.replace("%", "") + "%",
            highlighted: owner.statusTone === "intermediate" || owner.statusTone === "negative",
            moreCount: owner.statusTone === "negative" ? 1 : 0,
          };
        })
      : [{ type: "person", name: profile.directorName || "Director", subtitle: "Ownership under review", highlighted: false, moreCount: 0 }];

    if (showParent && entity.name !== parentName) {
      branches.push({
        type: "business",
        name: entity.name,
        subtitle: "Subject Entity",
        highlighted: true,
        moreCount: 0,
      });
    }

    while (branches.length < 3) {
      branches.push({
        type: "business",
        name: "Related entity",
        subtitle: "Ownership inferred",
        highlighted: false,
        moreCount: branches.length === 1 ? 1 : 0,
      });
    }

    return { root: root, branches: branches.slice(0, 3), riskFilter: null };
  }

  function buildUboGraphToolbar(riskFilter) {
    var filterHtml = riskFilter
      ? '<button type="button" class="kyb-ubo-graph__filter" aria-label="Active risk filter">' +
        '<span class="kyb-ubo-graph__filter-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M2.5 4.5h11M4.5 8h7M6.5 11.5h3"/></svg></span>' +
        '<span class="kyb-ubo-graph__filter-label">' +
        riskFilter.label +
        "</span>" +
        '<span class="tds-counter-label"><span class="tds-counter-label__count">' +
        riskFilter.count +
        "</span></span>" +
        '<span class="kyb-ubo-graph__filter-clear" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg></span>' +
        "</button>"
      : "";

    return (
      '<div class="kyb-ubo-graph__toolbar kyb-ubo-graph__toolbar--left">' +
      '<label class="kyb-ubo-graph__search">' +
      '<span class="kyb-ubo-graph__search-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="7" cy="7" r="4.25"/><path d="M10.5 10.5 13 13"/></svg></span>' +
      '<input class="kyb-ubo-graph__search-input" type="search" placeholder="Search entities..." data-kyb-ubo-search aria-label="Search entities in ownership graph">' +
      "</label>" +
      '<div class="kyb-ubo-graph__entity-toggle" role="group" aria-label="Entity type visibility">' +
      '<button type="button" class="kyb-ubo-graph__entity-btn kyb-ubo-graph__entity-btn--active" aria-pressed="true" data-kyb-ubo-entity="business" aria-label="Show business entities">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M3 13.5V4.5l5-2.5 5 2.5v9"/><path d="M6.5 13.5v-4h3v4"/></svg>' +
      "</button>" +
      '<button type="button" class="kyb-ubo-graph__entity-btn kyb-ubo-graph__entity-btn--active" aria-pressed="true" data-kyb-ubo-entity="person" aria-label="Show person entities">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="8" cy="5.5" r="2.25"/><path d="M3.5 13.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/></svg>' +
      "</button>" +
      "</div>" +
      filterHtml +
      "</div>" +
      '<div class="kyb-ubo-graph__toolbar kyb-ubo-graph__toolbar--right">' +
      '<div class="kyb-ubo-graph__zoom" role="group" aria-label="Graph zoom controls">' +
      '<button type="button" class="kyb-ubo-graph__zoom-btn" data-kyb-ubo-zoom="in" aria-label="Zoom in"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 3.5v9M3.5 8h9"/></svg></button>' +
      '<button type="button" class="kyb-ubo-graph__zoom-btn" data-kyb-ubo-zoom="out" aria-label="Zoom out"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3.5 8h9"/></svg></button>' +
      '<button type="button" class="kyb-ubo-graph__zoom-btn" data-kyb-ubo-zoom="fit" aria-label="Fit graph to view"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M6 2.5H3.5v2.5M10 2.5h2.5V5M10 13.5h2.5V11M6 13.5H3.5V11M3.5 8h9M8 3.5v9"/></svg></button>' +
      "</div></div>"
    );
  }

  function buildUboGraphLegend() {
    return (
      '<div class="kyb-ubo-graph__legend" aria-label="Risk legend">' +
      '<div class="kyb-ubo-graph__legend-item"><span class="kyb-ubo-graph__legend-swatch kyb-ubo-graph__legend-swatch--high" aria-hidden="true"></span><span class="kyb-ubo-graph__legend-label">High Risk</span></div>' +
      '<div class="kyb-ubo-graph__legend-item"><span class="kyb-ubo-graph__legend-swatch kyb-ubo-graph__legend-swatch--medium" aria-hidden="true"></span><span class="kyb-ubo-graph__legend-label">Medium Risk</span></div>' +
      "</div>"
    );
  }

  function buildUboGraphWires() {
    return (
      '<svg class="kyb-ubo-tree__wires" viewBox="0 0 800 118" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="M400 0 C400 42 133 42 133 110" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M400 0 L400 110" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M400 0 C400 42 667 42 667 110" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function renderOwnershipGraph(profile, entity) {
    var container = document.querySelector("[data-kyb-ownership-graph]");
    if (!container) return;

    var graph = ownershipGraphFromProfile(profile, entity);
    var branchesHtml = graph.branches
      .map(function (branch) {
        var moreHtml = branch.moreCount
          ? '<div class="kyb-ubo-tree__branch-tail"><span class="kyb-ubo-tree__tail-line" aria-hidden="true"></span><span class="tds-tag tds-tag--md tds-tag--default">+' +
            branch.moreCount +
            " more</span></div>"
          : "";
        return (
          '<div class="kyb-ubo-tree__branch" data-kyb-ubo-branch>' +
          buildUboGraphCard(branch) +
          moreHtml +
          "</div>"
        );
      })
      .join("");

    container.innerHTML =
      '<div class="kyb-ubo-graph__surface">' +
      buildUboGraphToolbar(graph.riskFilter) +
      buildUboGraphLegend() +
      '<div class="kyb-ubo-graph__stage" data-kyb-ubo-stage>' +
      '<div class="kyb-ubo-tree">' +
      '<div class="kyb-ubo-tree__level kyb-ubo-tree__level--root">' +
      buildUboGraphCard(graph.root) +
      "</div>" +
      buildUboGraphWires() +
      '<div class="kyb-ubo-tree__level kyb-ubo-tree__level--children">' +
      branchesHtml +
      "</div></div></div></div>";

    initOwnershipGraphControls(container.querySelector(".kyb-ubo-graph__surface"));
  }

  function initOwnershipGraphControls(root) {
    if (!root) return;

    var stage = root.querySelector("[data-kyb-ubo-stage]");
    var zoom = 1;

    function applyZoom(next) {
      zoom = Math.min(1.4, Math.max(0.75, next));
      if (stage) stage.style.setProperty("--kyb-ubo-zoom", String(zoom));
    }

    root.querySelectorAll("[data-kyb-ubo-zoom]").forEach(function (button) {
      button.addEventListener("click", function () {
        var action = button.getAttribute("data-kyb-ubo-zoom");
        if (action === "in") applyZoom(zoom + 0.1);
        else if (action === "out") applyZoom(zoom - 0.1);
        else applyZoom(1);
      });
    });

    var search = root.querySelector("[data-kyb-ubo-search]");
    if (search) {
      search.addEventListener("input", function () {
        var query = search.value.trim().toLowerCase();
        root.querySelectorAll("[data-kyb-ubo-node]").forEach(function (node) {
          var name = (node.querySelector(".kyb-ubo-node__name") || {}).textContent || "";
          var match = !query || name.toLowerCase().indexOf(query) >= 0;
          node.classList.toggle("kyb-ubo-node--dimmed", !match);
        });
      });
    }

    root.querySelectorAll("[data-kyb-ubo-entity]").forEach(function (button) {
      button.addEventListener("click", function () {
        var type = button.getAttribute("data-kyb-ubo-entity");
        var active = button.getAttribute("aria-pressed") !== "true";
        button.setAttribute("aria-pressed", active ? "true" : "false");
        button.classList.toggle("kyb-ubo-graph__entity-btn--active", active);
        root.querySelectorAll(".kyb-ubo-node__icon--" + type).forEach(function (icon) {
          var card = icon.closest("[data-kyb-ubo-node]");
          if (card) card.classList.toggle("kyb-ubo-node--hidden", !active);
        });
      });
    });
  }

  function setOwnershipView(view) {
    var section = document.getElementById("kyb-ownership");
    if (!section) return;

    section.querySelectorAll("[data-kyb-ownership-panel]").forEach(function (panel) {
      var isActive = panel.getAttribute("data-kyb-ownership-panel") === view;
      panel.hidden = !isActive;
    });

    section.querySelectorAll("[data-kyb-ownership-view]").forEach(function (button) {
      var isActive = button.getAttribute("data-kyb-ownership-view") === view;
      button.classList.toggle("tds-segmented-control__item--selected", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function initOwnershipViewToggle() {
    var control = document.querySelector("[data-kyb-ownership-view-control]");
    if (!control || control.dataset.kybBound) return;
    control.dataset.kybBound = "1";

    control.querySelectorAll("[data-kyb-ownership-view]").forEach(function (button) {
      button.addEventListener("click", function () {
        setOwnershipView(button.getAttribute("data-kyb-ownership-view") || "table");
      });
    });
  }

  function renderOfficers(profile) {
    var container = document.querySelector("[data-kyb-officers]");
    if (container) {
      var officers = profile.officers;
      if (officers && officers.length) {
        container.innerHTML = officers
          .map(function (officer, index) {
            var description = officer.note || officer.role || "";
            var noteHtml = description ? '<p class="tds-data-field__description">' + description + "</p>" : "";
            return (
              '<div class="tds-data-field kyb-officer-card">' +
              '<p class="tds-data-field__label">Officer ' +
              (index + 1) +
              "</p>" +
              '<div class="tds-data-field__content"><div class="tds-data-field__value-row">' +
              '<p class="tds-data-field__value">' +
              officer.name +
              "</p></div>" +
              noteHtml +
              "</div></div>"
            );
          })
          .join("");
      } else if (profile.directorName) {
        container.innerHTML =
          '<div class="kyb-field-grid">' +
          '<div class="tds-data-field"><p class="tds-data-field__label">Director name</p>' +
          '<div class="tds-data-field__content"><div class="tds-data-field__value-row">' +
          '<p class="tds-data-field__value">' +
          profile.directorName +
          "</p></div></div></div>" +
          '<div class="tds-data-field"><p class="tds-data-field__label">Appointment date</p>' +
          '<div class="tds-data-field__content"><div class="tds-data-field__value-row">' +
          '<p class="tds-data-field__value">' +
          (profile.directorDate || "—") +
          "</p></div></div></div>" +
          "</div>";
      }
    }

    var announcement = document.querySelector("[data-kyb-officer-announcement]");
    if (!announcement) announcement = document.querySelector(".kyb-officer-block .tds-announcement");
    var message = announcement && announcement.querySelector(".tds-announcement__message");
    var title = announcement && announcement.querySelector(".tds-announcement__title");
    if (announcement && message && profile.officerNote) {
      message.textContent = profile.officerNote;
      if (title) {
        title.textContent = profile.officerNoteTitle || "";
        title.hidden = !profile.officerNoteTitle;
      }
      announcement.classList.remove("tds-announcement--warning", "tds-announcement--positive");
      announcement.classList.add(profile.officerTone === "positive" ? "tds-announcement--positive" : "tds-announcement--warning");
      announcement.hidden = false;
    } else if (announcement) {
      announcement.hidden = !profile.officerNote;
    }
  }

  function renderOverviewOwnership(rows) {
    var list = document.querySelector(".kyb-overview-ownership__list");
    if (!list || !rows || !rows.length) return;

    list.innerHTML = rows
      .map(function (row) {
        var pct = row.pct === "—" ? row.subtitle || row.role || "" : row.pct;
        return (
          '<li class="kyb-overview-ownership__item">' +
          '<span class="kyb-overview-ownership__name">' + row.name + "</span>" +
          '<span class="kyb-overview-ownership__pct">' + pct + "</span>" +
          '<span class="tds-tag tds-tag--sm tds-tag--' + row.statusTone + '">' + row.status + "</span>" +
          "</li>"
        );
      })
      .join("");

    var uboCount = document.querySelector(".kyb-overview-ownership__summary .tds-counter");
    if (uboCount) {
      var owners = rows.filter(function (row) {
        return row.pct !== "—";
      });
      uboCount.textContent = String(Math.max(owners.length, 1));
    }
  }

  function renderSummaryPage(profile, entity) {
    var data = profile.summaryPage;
    if (!data) return;

    var extras = { director: profile.directorName || "the appointed director" };
    var riskLabel = document.getElementById("kyb-summary-risk-label");
    if (riskLabel && data.riskLabel) riskLabel.textContent = data.riskLabel;

    var verdictTitle = document.getElementById("kyb-summary-verdict-title");
    if (verdictTitle && data.verdictTitle) {
      verdictTitle.textContent = fillTemplate(data.verdictTitle, entity, extras);
    }

    var findingsRoot = document.getElementById("kyb-summary-findings");
    if (findingsRoot && data.findings && data.findings.length) {
      findingsRoot.innerHTML = data.findings
        .map(function (finding, index) {
          var text = fillTemplate(finding, entity, extras);
          var divider = index < data.findings.length - 1 ? '<div class="kyb-summary-hero__finding-divider" aria-hidden="true"></div>' : "";
          return (
            '<div class="kyb-summary-hero__finding" role="listitem">' +
            '<span class="kyb-summary-hero__finding-icon" aria-hidden="true">' +
            '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M8 2.5 1.5 13h13L8 2.5z"/><path d="M8 6.5v3.25M8 11.75h.006"/></svg></span>' +
            '<p class="kyb-summary-hero__finding-text">' +
            text +
            "</p></div>" +
            divider
          );
        })
        .join("");
    }

    var hero = document.querySelector(".kyb-summary-hero");
    if (hero) {
      hero.classList.remove("kyb-summary-hero--negative", "kyb-summary-hero--intermediate", "kyb-summary-hero--positive");
      var tier = kybRiskFromScore(profile.score);
      if (tier.risk === "high") hero.classList.add("kyb-summary-hero--negative");
      else if (tier.risk === "medium") hero.classList.add("kyb-summary-hero--intermediate");
      else hero.classList.add("kyb-summary-hero--positive");
    }
  }

  function renderOverviewContext(profile, entity) {
    renderSummaryPage(profile, entity);

    var gauge = document.getElementById("kyb-summary-gauge");
    if (gauge) gauge.setAttribute("data-score", String(profile.score));
  }

  function applyEntityContext() {
    var entity = parseEntityContext();
    if (!entity) return null;

    var profile = ENTITY_PROFILES[entity.sample] || ENTITY_PROFILES.default;
    var extras = { director: profile.directorName || "the appointed director" };
    var insightsSummary = fillTemplate(profile.insightsSummary, entity, extras);
    var address = formatRegisteredAddress(entity);
    var domainSlug = slugifyDomain(entity.name);
    var domain = domainSlug ? domainSlug + ".com" : DEFAULT_DOMAIN;

    replaceTextInRoot(document.querySelector(".app-main"), [
      { from: DEFAULT_COMPANY_NAME, to: entity.name },
      { from: DEFAULT_COMPANY_ALT, to: entity.name.replace(/\.$/, "") },
      { from: DEFAULT_DOMAIN, to: domain },
      { from: "info@" + DEFAULT_DOMAIN, to: "info@" + domain },
    ]);

    var title = document.querySelector(".dv-title");
    if (title) title.textContent = entity.name;

    document.querySelectorAll(".kyb-insights-intro__name").forEach(function (el) {
      el.textContent = entity.name;
    });

    if (entity.country) {
      setFieldValue(document.getElementById("kyb-identity"), "Country / Jurisdiction", entity.country);
      var flag = document.querySelector("#kyb-identity .fi");
      if (flag) flag.className = "fi fi-" + entity.countryCode;
    }

    var txId = "KYB-2026-" + String(Math.floor(Math.random() * 900000 + 100000));
    setFieldValue(document.getElementById("kyb-identity"), "Transaction ID", txId);
    setFieldValue(
      document.getElementById("kyb-identity"),
      "Date",
      new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date())
    );

    var sidebarSummaryData = sidebarSummaryFromProfile(profile, entity);
    if (sidebarSummaryData) renderSidebarSummary(sidebarSummaryData);
    renderSignalsTabSummary(profile);
    renderTabSummaries(profile);
    renderSignalImpactCounts(profile);

    var insightsSummaryEl = document.querySelector(".kyb-insights-summary");
    if (insightsSummaryEl) insightsSummaryEl.textContent = insightsSummary;

    if (address) setFieldValue(document, "Business address", address);

    if (profile.entityType) setFieldValue(document, "Entity type", profile.entityType);
    if (profile.industry) setFieldValue(document, "Industry", profile.industry);
    if (profile.employees) setFieldValue(document, "Employees", profile.employees);
    if (profile.parentEntity) setFieldValue(document, "Parent entity", profile.parentEntity);

    setMiniScoreCard("Overall risk", profile.overallRisk);
    setMiniScoreCard("Registry match", profile.registryMatch);
    setMiniScoreCard("Operational footprint", profile.operationalFootprint);

    renderOwnershipTable(profile.ownershipRows);
    renderOwnershipGraph(profile, entity);
    renderOfficers(profile);

    document.querySelectorAll(".tds-counter-label__count, .kyb-toolbar .tds-counter-label__count").forEach(function (el) {
      if (profile.signalCount) el.textContent = profile.signalCount;
    });

    document.querySelectorAll(".kyb-tab-summary__gauge[data-score], .kyb-summary-hero__gauge[data-score], [data-kyb-score-breakdown-gauge]").forEach(function (gauge) {
      gauge.setAttribute("data-score", String(profile.score));
    });

    var legacyGauge = document.querySelector(".kyb-score-card .dv-di-gauge[data-score]");
    if (legacyGauge) legacyGauge.setAttribute("data-score", String(profile.score));

    renderOverviewContext(profile, entity);

    var rawPre = document.getElementById("kyb-raw-pre");
    personalizeJsonPreText(rawPre, entity, domain);

    var matchBusinessName = document.querySelector("[data-kyb-match-business-name]");
    if (matchBusinessName && entity && entity.name) {
      matchBusinessName.textContent = entity.name;
    }

    document.body.setAttribute("data-kyb-entity-applied", entity.sample || "custom");
    document.body.setAttribute("data-kyb-entity-name", entity.name);
    return entity;
  }

  function initKybScoreGauge() {
    document.querySelectorAll(".kyb-score-card .dv-di-gauge[data-score], .kyb-overview-hero__gauge[data-score], .kyb-summary-hero__gauge[data-score], .kyb-tab-summary__gauge[data-score], [data-kyb-score-breakdown-gauge]").forEach(function (el) {
      var score = parseFloat(el.getAttribute("data-score") || "0");
      var tier = kybRiskFromScore(score);
      el.setAttribute("data-risk", tier.risk);
      el.setAttribute("data-label", tier.label);
      el.setAttribute("data-show-percent", "false");
    });
  }

  var SIGNAL_IMPACT_SEVERITY = { positive: 0, neutral: 1, negative: 2 };
  var SIGNAL_APPLICABLE_ORDER = { yes: 0, no: 1, unknown: 2 };
  var SIGNAL_DATA_ORDER = { present: 0, missing: 1 };
  var SIGNALS_DEFAULT_SORT = "impact-low-high";
  var MONITORING_DEFAULT_SORT = "date-newest";

  function createDefaultSignalFilters() {
    return {
      applicable: { yes: true, no: true },
      data: { present: true, missing: true },
      categories: {
        "business-model": true,
        "financial-health": true,
        "fraud-financial-crimes": true,
        "governance-compliance": true,
        "third-party-market": true,
      },
    };
  }

  function getSelectedSignalFilterLabels(section) {
    var labels = [];
    var categoryMap = {
      "data-kyb-filter-applicable": "Applicable",
      "data-kyb-filter-data": "Data",
      "data-kyb-filter-category": "Category",
    };

    document.querySelectorAll("[data-kyb-filter-applicable], [data-kyb-filter-data], [data-kyb-filter-category]").forEach(function (input) {
      if (!input.checked) return;
      var label = input.closest(".tds-action-list-item");
      if (!label) return;
      var optionNode = label.querySelector("span");
      var optionText = optionNode ? optionNode.textContent.trim() : "";
      if (!optionText) return;

      var category = "";
      for (var attr in categoryMap) {
        if (input.hasAttribute(attr)) { category = categoryMap[attr]; break; }
      }
      labels.push(category ? category + ": " + optionText : optionText);
    });

    return labels;
  }

  function isDefaultSignalFilters(section) {
    var isDefault = true;
    document.querySelectorAll("[data-kyb-filter-applicable], [data-kyb-filter-data], [data-kyb-filter-category]").forEach(function (input) {
      if (!input.checked) isDefault = false;
    });
    return isDefault;
  }

  function resetSignalFilters(section, state) {
    state.filters = createDefaultSignalFilters();
    document.querySelectorAll("[data-kyb-filter-applicable], [data-kyb-filter-data], [data-kyb-filter-category]").forEach(function (input) {
      input.checked = true;
    });
  }

  function clearAllSignalFilters(section, state) {
    state.filters = {
      applicable: { yes: false, no: false },
      data: { present: false, missing: false },
      categories: {
        "business-model": false,
        "financial-health": false,
        "fraud-financial-crimes": false,
        "governance-compliance": false,
        "third-party-market": false,
      },
    };
    document.querySelectorAll("[data-kyb-filter-applicable], [data-kyb-filter-data], [data-kyb-filter-category]").forEach(function (input) {
      input.checked = false;
    });
  }

  function resetSignalSort(section, state) {
    state.sort = SIGNALS_DEFAULT_SORT;
    state.sortActive = false;
    document.querySelectorAll("[data-kyb-signal-sort]").forEach(function (item) {
      item.classList.remove("tds-action-list-item--selected");
      item.setAttribute("aria-checked", "false");
    });
  }

  function updateSignalsToolbarControls(section, state) {
    var filterButton = section.querySelector("[data-kyb-signals-filter]");
    if (filterButton) {
      var selectedLabels = getSelectedSignalFilterLabels(section);
      var selectedCount = selectedLabels.length;
      var hasSelection = selectedCount > 0;

      filterButton.classList.toggle("tds-filter-button--selected", hasSelection);
      filterButton.classList.toggle("tds-filter-button--multi", hasSelection && selectedCount > 1);

      var valueLabel = filterButton.querySelector("[data-kyb-filter-value]");
      if (valueLabel) valueLabel.textContent = hasSelection ? selectedLabels[0] : "";

      var counter = filterButton.querySelector("[data-kyb-filter-count]");
      if (counter) {
        counter.textContent = hasSelection && selectedCount > 1 ? "+" + (selectedCount - 1) : "";
      }
    }

    var sortButton = section.querySelector("[data-kyb-signals-sort]");
    if (sortButton) {
      sortButton.classList.toggle("tds-sort-button--selected", state.sortActive);

      var selectedOption = document.querySelector(
        '[data-kyb-signal-sort="' + state.sort + '"] .tds-action-list-item__label'
      );
      var sortPrefix = sortButton.querySelector(".tds-sort-button__trigger-prefix");
      if (sortPrefix) sortPrefix.style.display = state.sortActive ? "none" : "";

      var sortLabel = sortButton.querySelector("[data-kyb-sort-label]");
      if (sortLabel) {
        sortLabel.textContent =
          state.sortActive && selectedOption ? selectedOption.textContent.trim() : "";
      }

      document.querySelectorAll("[data-kyb-signal-sort]").forEach(function (item) {
        var selected = state.sortActive && item.getAttribute("data-kyb-signal-sort") === state.sort;
        item.classList.toggle("tds-action-list-item--selected", selected);
        item.setAttribute("aria-checked", selected ? "true" : "false");
      });
    }
  }

  function resolveSignalImpact(row) {
    var impactCell = row.cells && row.cells[0];
    if (impactCell) {
      var signals = impactCell.querySelector(".tds-data-table__signals");
      if (signals) {
        if (signals.classList.contains("tds-data-table__signals--negative")) return "negative";
        if (signals.classList.contains("tds-data-table__signals--positive")) return "positive";
        if (signals.classList.contains("tds-data-table__signals--intermediate")) return "neutral";
      }
    }

    var tag = row.querySelector(".tds-tag");
    if (!tag) return "neutral";
    if (tag.classList.contains("tds-tag--negative")) return "negative";
    if (tag.classList.contains("tds-tag--positive")) return "positive";
    return "neutral";
  }

  function getSignalImpact(row) {
    return row.getAttribute("data-kyb-signal-impact") || resolveSignalImpact(row);
  }

  function getSignalApplicable(row) {
    var cells = row.cells;
    if (!cells || cells.length < 3) return "unknown";
    var text = (cells[2].textContent || "").trim().toLowerCase();
    if (text.indexOf("yes") !== -1) return "yes";
    if (text.indexOf("no") !== -1) return "no";
    return "unknown";
  }

  function getSignalDataStatus(row) {
    var cells = row.cells;
    if (!cells || cells.length < 4) return "missing";
    var text = (cells[3].textContent || "").trim().toLowerCase();
    if (text.indexOf("present") !== -1) return "present";
    return "missing";
  }

  function isCategoryFilterVisible(categoryId, filters) {
    return filters.categories[categoryId] !== false;
  }

  function getCategorySortLabel(accordion) {
    var title = accordion.querySelector(".tds-accordion__title");
    if (!title) return "";
    var text = title.textContent.trim();
    var colonIndex = text.indexOf(":");
    return (colonIndex > -1 ? text.slice(0, colonIndex) : text).trim().toLowerCase();
  }

  function rowMatchesSignalFilters(row, state) {
    var applicable = getSignalApplicable(row);
    if (applicable === "yes" && !state.filters.applicable.yes) return false;
    if (applicable === "no" && !state.filters.applicable.no) return false;

    var dataStatus = getSignalDataStatus(row);
    if (dataStatus === "present" && !state.filters.data.present) return false;
    if (dataStatus === "missing" && !state.filters.data.missing) return false;

    return true;
  }

  function rowMatchesImpactFilter(row, impactFilter) {
    if (impactFilter === "all") return true;
    return resolveSignalImpact(row) === impactFilter;
  }

  function getSignalRowPairs(tbody) {
    var pairs = [];
    tbody.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      var detail = row.nextElementSibling;
      if (!detail || !detail.classList.contains("kyb-signal-detail-row")) return;
      pairs.push({ row: row, detail: detail });
    });
    return pairs;
  }

  function collapseSignalRow(pair) {
    pair.row.classList.remove("kyb-signal-row--expanded");
    var toggle = pair.row.querySelector(".kyb-signal-row__toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    pair.detail.hidden = true;
  }

  function getCategoryRiskDomainLabel(categoryId) {
    var accordion = document.querySelector(
      '.kyb-signal-category[data-kyb-signal-category="' + categoryId + '"]'
    );
    return getCategorySortLabel(accordion || document.createElement("div"));
  }

  function compareByOrder(valueA, valueB, ascending) {
    if (valueA === valueB) return 0;
    return ascending ? valueA - valueB : valueB - valueA;
  }

  function sortSignalPairsByOriginalOrder(pairs) {
    pairs.sort(function (a, b) {
      return (
        (parseInt(a.row.getAttribute("data-kyb-signal-order"), 10) || 0) -
        (parseInt(b.row.getAttribute("data-kyb-signal-order"), 10) || 0)
      );
    });
  }

  function sortSignalPairs(pairs, sortKey) {
    pairs.sort(function (a, b) {
      var fallback =
        (parseInt(a.row.getAttribute("data-kyb-signal-order"), 10) || 0) -
        (parseInt(b.row.getAttribute("data-kyb-signal-order"), 10) || 0);

      if (sortKey === "category-asc" || sortKey === "category-desc") {
        return fallback;
      }

      if (sortKey === "impact-low-high" || sortKey === "impact-high-low") {
        var impactA = SIGNAL_IMPACT_SEVERITY[a.row.getAttribute("data-kyb-signal-impact") || "neutral"];
        var impactB = SIGNAL_IMPACT_SEVERITY[b.row.getAttribute("data-kyb-signal-impact") || "neutral"];
        return compareByOrder(impactA, impactB, sortKey === "impact-low-high") || fallback;
      }

      if (sortKey === "applicable-yes-no" || sortKey === "applicable-no-yes") {
        var applicableA = SIGNAL_APPLICABLE_ORDER[getSignalApplicable(a.row)];
        var applicableB = SIGNAL_APPLICABLE_ORDER[getSignalApplicable(b.row)];
        return compareByOrder(applicableA, applicableB, sortKey === "applicable-yes-no") || fallback;
      }

      if (sortKey === "data-present-missing" || sortKey === "data-missing-present") {
        var dataA = SIGNAL_DATA_ORDER[getSignalDataStatus(a.row)];
        var dataB = SIGNAL_DATA_ORDER[getSignalDataStatus(b.row)];
        return compareByOrder(dataA, dataB, sortKey === "data-present-missing") || fallback;
      }

      return fallback;
    });
  }

  function updateSignalImpactCounts(section) {
    var counts = { all: 0, negative: 0, positive: 0, neutral: 0 };
    section.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      var impact = resolveSignalImpact(row);
      row.setAttribute("data-kyb-signal-impact", impact);
      counts.all += 1;
      if (counts[impact] !== undefined) counts[impact] += 1;
    });

    if (section.dataset.kybImpactCountsOverride === "1") return;

    section.querySelectorAll("[data-kyb-impact-count]").forEach(function (counter) {
      var key = counter.getAttribute("data-kyb-impact-count");
      if (counts[key] !== undefined) counter.textContent = String(counts[key]);
    });
  }

  function updateSignalCategoryEmptyState(accordion, visibleCount) {
    var content = accordion.querySelector(".tds-accordion__content");
    if (!content) return;

    var tableContainer = content.querySelector(".tds-data-table-container");
    var empty = content.querySelector(".kyb-signal-category__empty");

    if (visibleCount === 0) {
      if (tableContainer) tableContainer.hidden = true;
      if (!empty) {
        empty = document.createElement("p");
        empty.className = "kyb-signal-category__empty";
        empty.textContent = "No signals match this filter";
        content.appendChild(empty);
      }
      empty.hidden = false;
      return;
    }

    if (tableContainer) tableContainer.hidden = false;
    if (empty) empty.hidden = true;
  }

  function syncSignalCategoryAccordionsForImpactFilter(state, categoryEntries) {
    if (state.impactFilter === "all") return;

    categoryEntries.forEach(function (entry) {
      var shouldExpand = !entry.accordion.hidden && entry.visibleCount > 0;
      setAccordionExpanded(entry.accordion, shouldExpand);
    });
  }

  function applySignalsView(section, state) {
    var container = section.querySelector(".kyb-signal-categories");
    if (!container) return;

    var categoryEntries = [];

    section.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (accordion) {
      var categoryId = accordion.getAttribute("data-kyb-signal-category");
      var categoryOrder = parseInt(accordion.getAttribute("data-kyb-category-order"), 10) || 0;
      var domainVisible = isCategoryFilterVisible(categoryId, state.filters);
      var tbody = accordion.querySelector("tbody");
      var visibleCount = 0;

      if (!domainVisible || !tbody) {
        accordion.hidden = true;
        categoryEntries.push({
          accordion: accordion,
          categoryOrder: categoryOrder,
          categoryId: categoryId,
          visibleCount: 0,
        });
        return;
      }

      accordion.hidden = false;

      var pairs = getSignalRowPairs(tbody);
      if (state.sortActive) {
        sortSignalPairs(pairs, state.sort);
      } else {
        sortSignalPairsByOriginalOrder(pairs);
      }

      pairs.forEach(function (pair) {
        var visible =
          rowMatchesImpactFilter(pair.row, state.impactFilter) &&
          rowMatchesSignalFilters(pair.row, state);

        pair.row.hidden = !visible;
        if (!visible) {
          collapseSignalRow(pair);
        } else {
          visibleCount += 1;
          if (!pair.row.classList.contains("kyb-signal-row--expanded")) {
            pair.detail.hidden = true;
          }
        }

        tbody.appendChild(pair.row);
        tbody.appendChild(pair.detail);
      });

      if (state.impactFilter !== "all" && visibleCount === 0) {
        accordion.hidden = true;
      }

      updateSignalCategoryEmptyState(accordion, visibleCount);
      categoryEntries.push({
        accordion: accordion,
        categoryOrder: categoryOrder,
        categoryId: categoryId,
        visibleCount: visibleCount,
      });
    });

    categoryEntries.sort(function (a, b) {
      if (state.impactFilter !== "all") {
        var aHasMatches = a.visibleCount > 0;
        var bHasMatches = b.visibleCount > 0;
        if (aHasMatches !== bHasMatches) {
          return aHasMatches ? -1 : 1;
        }
      }

      if (state.sortActive && (state.sort === "category-asc" || state.sort === "category-desc")) {
        var labelA = getCategoryRiskDomainLabel(a.categoryId);
        var labelB = getCategoryRiskDomainLabel(b.categoryId);
        var domainCmp = labelA.localeCompare(labelB);
        if (domainCmp !== 0) {
          return state.sort === "category-desc" ? -domainCmp : domainCmp;
        }
      }

      return a.categoryOrder - b.categoryOrder;
    });

    categoryEntries.forEach(function (entry) {
      container.appendChild(entry.accordion);
    });

    syncSignalCategoryAccordionsForImpactFilter(state, categoryEntries);
    updateSignalsToolbarControls(section, state);
  }

  function setSelectedImpactTab(section, activeTab) {
    section.querySelectorAll("[data-kyb-impact-filter]").forEach(function (tab) {
      var isActive = tab === activeTab;
      tab.classList.toggle("tds-filter-tab--selected", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function initSignalsToolbar() {
    var section = document.getElementById("kyb-signals");
    if (!section) return;

    var state = {
      impactFilter: "all",
      sort: SIGNALS_DEFAULT_SORT,
      sortActive: false,
      filters: createDefaultSignalFilters(),
    };

    var categoryOrder = 0;
    section.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (accordion) {
      accordion.setAttribute("data-kyb-category-order", String(categoryOrder++));
    });

    var order = 0;
    section.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      row.setAttribute("data-kyb-signal-order", String(order++));
    });

    updateSignalImpactCounts(section);
    applySignalsView(section, state);

    section.querySelectorAll("[data-kyb-impact-filter]").forEach(function (tab) {
      if (tab.dataset.kybBound) return;
      tab.dataset.kybBound = "1";
      tab.addEventListener("click", function () {
        state.impactFilter = tab.getAttribute("data-kyb-impact-filter") || "all";
        setSelectedImpactTab(section, tab);
        applySignalsView(section, state);
      });
    });

    document.querySelectorAll("[data-kyb-filter-applicable]").forEach(function (input) {
      if (input.dataset.kybBound) return;
      input.dataset.kybBound = "1";
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-kyb-filter-applicable");
        if (!key) return;
        state.filters.applicable[key] = input.checked;
        applySignalsView(section, state);
      });
    });

    document.querySelectorAll("[data-kyb-filter-data]").forEach(function (input) {
      if (input.dataset.kybBound) return;
      input.dataset.kybBound = "1";
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-kyb-filter-data");
        if (!key) return;
        state.filters.data[key] = input.checked;
        applySignalsView(section, state);
      });
    });

    document.querySelectorAll("[data-kyb-filter-category]").forEach(function (input) {
      if (input.dataset.kybBound) return;
      input.dataset.kybBound = "1";
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-kyb-filter-category");
        if (!key) return;
        state.filters.categories[key] = input.checked;
        applySignalsView(section, state);
      });
    });

    var signalsFilterButton = section.querySelector("[data-kyb-signals-filter]");
    if (signalsFilterButton && !signalsFilterButton.dataset.kybFilterClearBound) {
      signalsFilterButton.dataset.kybFilterClearBound = "1";
      signalsFilterButton.addEventListener("tds-filter-clear", function () {
        clearAllSignalFilters(section, state);
        applySignalsView(section, state);
      });
    }

    var clearAllBtn = document.querySelector("[data-kyb-filter-clear-all]");
    if (clearAllBtn && !clearAllBtn.dataset.kybBound) {
      clearAllBtn.dataset.kybBound = "1";
      clearAllBtn.addEventListener("click", function () {
        clearAllSignalFilters(section, state);
        applySignalsView(section, state);
      });
    }

    var signalsSortButton = section.querySelector("[data-kyb-signals-sort]");
    if (signalsSortButton && !signalsSortButton.dataset.kybSortClearBound) {
      signalsSortButton.dataset.kybSortClearBound = "1";
      signalsSortButton.addEventListener("tds-sort-clear", function () {
        resetSignalSort(section, state);
        applySignalsView(section, state);
      });
    }

    document.querySelectorAll("[data-kyb-signal-sort]").forEach(function (item) {
      if (item.dataset.kybBound) return;
      item.dataset.kybBound = "1";
      item.addEventListener("click", function () {
        var sortKey = item.getAttribute("data-kyb-signal-sort") || SIGNALS_DEFAULT_SORT;
        if (state.sortActive && state.sort === sortKey) {
          resetSignalSort(section, state);
        } else {
          state.sortActive = true;
          state.sort = sortKey;
        }
        applySignalsView(section, state);
      });
    });
  }

  var MONITORING_SEVERITY_ORDER = { medium: 2, info: 1, low: 0 };

  function rowMatchesMonitoringFilters(row, state) {
    var category = row.getAttribute("data-kyb-monitoring-category") || "";
    if (state.categoryTab !== "all" && category !== state.categoryTab) return false;
    return true;
  }

  function sortMonitoringRows(rows, sortKey) {
    rows.sort(function (a, b) {
      var fallback =
        (parseInt(a.getAttribute("data-kyb-monitoring-order"), 10) || 0) -
        (parseInt(b.getAttribute("data-kyb-monitoring-order"), 10) || 0);

      if (sortKey === "name-asc" || sortKey === "name-desc") {
        var nameA = ((a.cells[0] && a.cells[0].textContent) || "").trim().toLowerCase();
        var nameB = ((b.cells[0] && b.cells[0].textContent) || "").trim().toLowerCase();
        var nameCmp = nameA.localeCompare(nameB);
        if (nameCmp !== 0) return sortKey === "name-asc" ? nameCmp : -nameCmp;
        return fallback;
      }

      if (sortKey === "date-newest" || sortKey === "date-oldest") {
        var dateA = a.getAttribute("data-kyb-monitoring-date") || "";
        var dateB = b.getAttribute("data-kyb-monitoring-date") || "";
        var dateCmp = dateA.localeCompare(dateB);
        if (dateCmp !== 0) return sortKey === "date-newest" ? -dateCmp : dateCmp;
        return fallback;
      }

      if (sortKey === "risk-level") {
        var severityA = MONITORING_SEVERITY_ORDER[a.getAttribute("data-kyb-monitoring-severity")] || 0;
        var severityB = MONITORING_SEVERITY_ORDER[b.getAttribute("data-kyb-monitoring-severity")] || 0;
        if (severityA !== severityB) return severityB - severityA;
        return fallback;
      }

      return fallback;
    });
  }

  function updateMonitoringTabCounts(section) {
    var counts = { all: 0, "name-change": 0, "brn-change": 0, "address-change": 0, "people-change": 0, "status-change": 0 };
    section.querySelectorAll("[data-kyb-monitoring-row]").forEach(function (row) {
      counts.all += 1;
      var category = row.getAttribute("data-kyb-monitoring-category");
      if (counts[category] !== undefined) counts[category] += 1;
    });

    section.querySelectorAll("[data-kyb-monitoring-tab-count]").forEach(function (counter) {
      var key = counter.getAttribute("data-kyb-monitoring-tab-count");
      if (counts[key] !== undefined) counter.textContent = String(counts[key]);
    });
  }

  function updateMonitoringEmptyState(section, visibleCount) {
    var tableContainer = section.querySelector("[data-kyb-monitoring-table]");
    if (!tableContainer) return;

    var tbody = tableContainer.querySelector("tbody");
    if (!tbody) return;

    section.querySelectorAll("p.kyb-monitoring-empty").forEach(function (node) {
      node.remove();
    });

    var emptyRow = tbody.querySelector("[data-kyb-monitoring-empty-row]");
    if (visibleCount === 0) {
      if (!emptyRow) {
        emptyRow = document.createElement("tr");
        emptyRow.setAttribute("data-kyb-monitoring-empty-row", "");
        var cell = document.createElement("td");
        cell.colSpan = 3;
        cell.className = "kyb-monitoring-empty";
        cell.textContent = "No alerts match this filter";
        emptyRow.appendChild(cell);
      }
      emptyRow.hidden = false;
      tbody.appendChild(emptyRow);
      return;
    }

    if (emptyRow) emptyRow.hidden = true;
  }

  function setSelectedMonitoringTab(section, activeTab) {
    section.querySelectorAll("[data-kyb-monitoring-tab]").forEach(function (tab) {
      var isActive = tab === activeTab;
      tab.classList.toggle("tds-filter-tab--selected", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function resetMonitoringFilter(section, state) {
    state.statusFilter = "all";
    document.querySelectorAll("[data-kyb-monitoring-status].tds-action-list-item").forEach(function (item) {
      var isDefault = item.hasAttribute("data-tds-filter-default");
      item.classList.toggle("tds-action-list-item--selected", isDefault);
      item.setAttribute("aria-checked", isDefault ? "true" : "false");
    });
  }

  function resetMonitoringSort(section, state) {
    state.sort = MONITORING_DEFAULT_SORT;
    state.sortActive = false;
    document.querySelectorAll("[data-kyb-monitoring-sort-option]").forEach(function (item) {
      item.classList.remove("tds-action-list-item--selected");
      item.setAttribute("aria-checked", "false");
    });
  }

  function updateMonitoringToolbarControls(section, state) {
    var filterButton = section.querySelector("[data-kyb-monitoring-filter]");
    if (filterButton) {
      var isFiltered = state.statusFilter !== "all";
      filterButton.classList.toggle("tds-filter-button--selected", isFiltered);
      filterButton.classList.remove("tds-filter-button--multi");

      var selectedOption = document.querySelector(
        '[data-kyb-monitoring-status="' + state.statusFilter + '"] .tds-action-list-item__label'
      );
      var valueLabel = filterButton.querySelector("[data-kyb-monitoring-filter-value]");
      if (valueLabel) {
        valueLabel.textContent = isFiltered && selectedOption ? selectedOption.textContent.trim() : "";
      }
    }

    document.querySelectorAll("[data-kyb-monitoring-status].tds-action-list-item").forEach(function (item) {
      var selected = item.getAttribute("data-kyb-monitoring-status") === state.statusFilter;
      item.classList.toggle("tds-action-list-item--selected", selected);
      item.setAttribute("aria-checked", selected ? "true" : "false");
    });

    var sortButton = section.querySelector("[data-kyb-monitoring-sort]");
    if (sortButton) {
      sortButton.classList.toggle("tds-sort-button--selected", state.sortActive);

      var selectedOption = document.querySelector(
        '[data-kyb-monitoring-sort-option="' + state.sort + '"] .tds-action-list-item__label'
      );
      var sortPrefix = sortButton.querySelector(".tds-sort-button__trigger-prefix");
      if (sortPrefix) sortPrefix.style.display = state.sortActive ? "none" : "";

      var sortLabel = sortButton.querySelector("[data-kyb-monitoring-sort-label]");
      if (sortLabel) {
        sortLabel.textContent =
          state.sortActive && selectedOption ? selectedOption.textContent.trim() : "";
      }
    }

    document.querySelectorAll("[data-kyb-monitoring-sort-option]").forEach(function (item) {
      var selected = state.sortActive && item.getAttribute("data-kyb-monitoring-sort-option") === state.sort;
      item.classList.toggle("tds-action-list-item--selected", selected);
      item.setAttribute("aria-checked", selected ? "true" : "false");
    });
  }

  function applyMonitoringView(section, state) {
    var tbody = section.querySelector("[data-kyb-monitoring-table] tbody");
    if (!tbody) return;

    var rows = Array.from(section.querySelectorAll("[data-kyb-monitoring-row]"));
    rows.sort(function (a, b) {
      return (
        (parseInt(a.getAttribute("data-kyb-monitoring-order"), 10) || 0) -
        (parseInt(b.getAttribute("data-kyb-monitoring-order"), 10) || 0)
      );
    });

    var visibleCount = 0;
    rows.forEach(function (row) {
      var visible = rowMatchesMonitoringFilters(row, state);
      row.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    updateMonitoringEmptyState(section, visibleCount);
  }

  function initMonitoringToolbar() {
    var section = document.getElementById("kyb-monitoring");
    if (!section) return;

    var state = {
      categoryTab: "all",
    };

    var order = 0;
    section.querySelectorAll("[data-kyb-monitoring-row]").forEach(function (row) {
      row.setAttribute("data-kyb-monitoring-order", String(order++));
    });

    updateMonitoringTabCounts(section);
    applyMonitoringView(section, state);

    section.querySelectorAll("[data-kyb-monitoring-tab]").forEach(function (tab) {
      if (tab.dataset.kybBound) return;
      tab.dataset.kybBound = "1";
      tab.addEventListener("click", function () {
        state.categoryTab = tab.getAttribute("data-kyb-monitoring-tab") || "all";
        setSelectedMonitoringTab(section, tab);
        applyMonitoringView(section, state);
      });
    });
  }

  var MONITORING_TEMPLATE_FIELDS = ["ownership-structure", "registered-address", "company-name", "business-status", "registration-numbers"];

  function isSwitchOn(track) {
    return track && (track.getAttribute("aria-checked") === "true" || track.classList.contains("tds-switch__track--on"));
  }

  function setSwitchState(track, on) {
    if (!track) return;
    track.setAttribute("aria-checked", on ? "true" : "false");
    track.classList.toggle("tds-switch__track--on", on);
    var switchRoot = track.closest(".tds-switch");
    var label = switchRoot ? switchRoot.querySelector("[data-kyb-switch-label]") : null;
    if (label) label.textContent = on ? "Enabled" : "Disabled";
  }

  function toggleSwitchTrack(track) {
    setSwitchState(track, !isSwitchOn(track));
  }

  function getMonitoringDialog() {
    return document.getElementById("kyb-monitoring-dialog");
  }

  function syncMonitoringPolicyPanels(dialog, enabled) {
    var suggested = dialog.querySelector('[data-kyb-monitoring-policy="suggested"]');
    var active = dialog.querySelector('[data-kyb-monitoring-policy="active"]');
    if (suggested) suggested.hidden = enabled;
    if (active) active.hidden = !enabled;
  }

  function syncMonitoringHeaderIdentity(enabled) {
    var identity = document.getElementById("kyb-identity-monitoring");
    if (identity) identity.setAttribute("data-kyb-monitoring-enabled", enabled ? "true" : "false");
  }

  function setMonitoringEnabled(enabled, options) {
    options = options || {};
    var dialog = getMonitoringDialog();
    if (!dialog) return;

    dialog.setAttribute("data-kyb-monitoring-enabled", enabled ? "true" : "false");

    var masterSwitch = dialog.querySelector("[data-kyb-monitoring-master-switch]");
    var masterLabel = dialog.querySelector("[data-kyb-monitoring-master-label]");
    setSwitchState(masterSwitch, enabled);
    if (masterLabel) masterLabel.textContent = enabled ? "Enabled" : "Disabled";

    syncMonitoringPolicyPanels(dialog, enabled);
    syncMonitoringHeaderIdentity(enabled);

    if (options.fieldIds && options.fieldIds.length) {
      options.fieldIds.forEach(function (fieldId) {
        var field = dialog.querySelector('[data-kyb-monitoring-field="' + fieldId + '"]');
        if (field) setSwitchState(field.querySelector("[data-kyb-monitoring-field-switch]"), true);
      });
      return;
    }

    if (options.allFields) {
      dialog.querySelectorAll("[data-kyb-monitoring-field-switch]").forEach(function (track) {
        setSwitchState(track, enabled);
      });
    }
  }

  function initMonitoringDialog() {
    var dialog = getMonitoringDialog();
    if (!dialog || dialog.dataset.kybMonitoringBound) return;
    dialog.dataset.kybMonitoringBound = "1";

    dialog.querySelectorAll("[data-kyb-monitoring-field-switch], [data-kyb-monitoring-master-switch]").forEach(function (track) {
      track.addEventListener("click", function (event) {
        event.preventDefault();
        if (track.hasAttribute("data-kyb-monitoring-master-switch")) {
          var nextEnabled = !isSwitchOn(track);
          if (nextEnabled) {
            setMonitoringEnabled(true, { allFields: true });
          } else {
            setMonitoringEnabled(false, { allFields: true });
          }
          return;
        }

        toggleSwitchTrack(track);

        var anyEnabled = Array.from(dialog.querySelectorAll("[data-kyb-monitoring-field-switch]")).some(isSwitchOn);
        var masterSwitch = dialog.querySelector("[data-kyb-monitoring-master-switch]");
        var masterLabel = dialog.querySelector("[data-kyb-monitoring-master-label]");
        setSwitchState(masterSwitch, anyEnabled);
        if (masterLabel) masterLabel.textContent = anyEnabled ? "Enabled" : "Disabled";
        dialog.setAttribute("data-kyb-monitoring-enabled", anyEnabled ? "true" : "false");
        syncMonitoringPolicyPanels(dialog, anyEnabled);
        syncMonitoringHeaderIdentity(anyEnabled);
      });
    });

    var applyButton = dialog.querySelector("[data-kyb-monitoring-apply-template]");
    if (applyButton) {
      applyButton.addEventListener("click", function () {
        setMonitoringEnabled(true, { fieldIds: MONITORING_TEMPLATE_FIELDS });
      });
    }

    dialog.querySelectorAll(".kyb-monitoring-section__header").forEach(function (header) {
      header.addEventListener("click", function () {
        var section = header.closest("[data-kyb-monitoring-section]");
        if (!section) return;
        var expanded = section.classList.toggle("kyb-monitoring-section--expanded");
        header.setAttribute("aria-expanded", expanded ? "true" : "false");
      });
    });

    dialog.querySelectorAll(".kyb-monitoring-policy-card").forEach(function (card) {
      card.addEventListener("click", function () {
        dialog.querySelectorAll(".kyb-monitoring-policy-card").forEach(function (item) {
          item.classList.remove("kyb-monitoring-policy-card--selected");
        });
        card.classList.add("kyb-monitoring-policy-card--selected");
      });
    });
  }

  function init() {
    initHomeNavigation();
    applyEntityContext();
    initTabs();
    initTabsScroll();
    initAccordions(document);
    initSignalRows();
    initMatchSignalRows();
    initSignalsToolbar();
    initOwnershipViewToggle();
    initMonitoringToolbar();
    if (window.TdsDropdownPanel) TdsDropdownPanel.initMenus(document);
    initDatasourceSelects(document);
    initRiskCategoryCards();
    initTabLayoutToggle();
    initTabSummaryScroll();
    initScoreBreakdownDialog();
    initScoreBreakdownLink();
    initMonitoringDialog();
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
  window.KybResults = {
    setActiveTab: setActiveTab,
    navigateToKybDetail: navigateToKybDetail,
  };
})();
