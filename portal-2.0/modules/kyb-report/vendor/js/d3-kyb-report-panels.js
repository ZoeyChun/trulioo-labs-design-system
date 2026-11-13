/* Demo 3 — native Overview / Risk Analysis panels.
   Renders the Summary and Signals tab content extracted from pages/KYB Results
   (js/d3-kyb-report-panels-data.js) straight into the report, then wires the
   gauges, accordions, signal rows, impact filter and jump buttons. */
(function () {
  "use strict";

  var JUMP = { "match-signals": "signals", "business-insights": "additional", ownership: "ownership", presence: "web", signals: "risk", financial: "additional", summary: "findings" };

  /* Key Findings → Risk Analysis accordion categories (and optional signal-row anchors). */
  var FINDING_TARGETS = [
    { match: /^Business Model/i, category: "business-model", anchor: "signal-credit-default" },
    { match: /^Financial Health/i, category: "financial-health" },
    { match: /^Governance/i, category: "governance-compliance", anchor: "signal-offshore-ownership" },
    { match: /^Fraud/i, category: "fraud-financial-crimes" },
    { match: /^Third-Party/i, category: "third-party-market" }
  ];

  function tier(score) {
    if (score < 30) return { risk: "low", label: "Low Risk" };
    if (score <= 60) return { risk: "medium", label: "Medium Risk" };
    return { risk: "high", label: "High Risk" };
  }

  function gauges(root) {
    root.querySelectorAll(".dv-di-gauge[data-score]").forEach(function (el) {
      var t = tier(parseFloat(el.getAttribute("data-score") || "0"));
      el.setAttribute("data-risk", t.risk);
      if (el.classList.contains("kyb-summary-hero__gauge")) el.removeAttribute("data-label");
      else el.setAttribute("data-label", t.label);
      el.setAttribute("data-show-percent", "false");
    });
    if (window.ScoreGauge) window.ScoreGauge.renderAll(root);
  }

  function signalRows(root) {
    root.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      var toggle = row.querySelector(".kyb-signal-row__toggle");
      var details = row.nextElementSibling;
      if (!toggle || !details || !details.classList.contains("kyb-signal-detail-row")) return;
      function set(on) {
        row.classList.toggle("kyb-signal-row--expanded", on);
        toggle.setAttribute("aria-expanded", on ? "true" : "false");
        details.hidden = !on;
      }
      row.addEventListener("click", function (e) {
        if (e.target.closest("a, button")) return;
        set(!row.classList.contains("kyb-signal-row--expanded"));
      });
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        set(!row.classList.contains("kyb-signal-row--expanded"));
      });
      set(false);
    });
  }

  function resolveImpact(row) {
    var s = row.cells && row.cells[0] && row.cells[0].querySelector(".tds-data-table__signals");
    if (s) {
      if (s.classList.contains("tds-data-table__signals--negative")) return "negative";
      if (s.classList.contains("tds-data-table__signals--positive")) return "positive";
      return "neutral";
    }
    var tag = row.querySelector(".tds-tag");
    if (tag && tag.classList.contains("tds-tag--negative")) return "negative";
    if (tag && tag.classList.contains("tds-tag--positive")) return "positive";
    return "neutral";
  }

  function impactFilter(root) {
    var tabs = root.querySelectorAll("[data-kyb-impact-filter]");
    if (!tabs.length) return;
    var rows = root.querySelectorAll("[data-kyb-signal-row]");
    function apply(kind) {
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-kyb-impact-filter") === kind;
        t.classList.toggle("tds-filter-tab--selected", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      rows.forEach(function (row) {
        var impact = row.getAttribute("data-kyb-signal-impact") || resolveImpact(row);
        var show = kind === "all" || impact === kind;
        row.hidden = !show;
        var d = row.nextElementSibling;
        if (d && d.classList.contains("kyb-signal-detail-row")) {
          if (!show) d.hidden = true;
          else d.hidden = !row.classList.contains("kyb-signal-row--expanded");
        }
      });
    }
    tabs.forEach(function (t) {
      t.addEventListener("click", function () { apply(t.getAttribute("data-kyb-impact-filter") || "all"); });
    });
  }

  function resolveFindingTarget(text) {
    var t = (text || "").trim();
    for (var i = 0; i < FINDING_TARGETS.length; i++) {
      if (FINDING_TARGETS[i].match.test(t)) return FINDING_TARGETS[i];
    }
    return null;
  }

  function setAccordionExpanded(accordion, expanded) {
    var header = accordion.querySelector(".tds-accordion__header");
    if (!header) return;
    header.setAttribute("aria-expanded", expanded ? "true" : "false");
    accordion.classList.toggle("tds-accordion--expanded", expanded);
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
    el.classList.remove("kyb-jump-highlight");
    void el.offsetWidth;
    el.classList.add("kyb-jump-highlight");
    el.addEventListener(
      "animationend",
      function () {
        el.classList.remove("kyb-jump-highlight");
      },
      { once: true }
    );
  }

  function openSignalCategory(root, categoryId, options) {
    options = options || {};
    if (!categoryId) return null;
    root.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (accordion) {
      setAccordionExpanded(accordion, accordion.getAttribute("data-kyb-signal-category") === categoryId);
    });
    var target = root.querySelector('.kyb-signal-category[data-kyb-signal-category="' + categoryId + '"]');
    if (!target) return null;

    var focusEl = target;
    if (options.anchor) {
      var row = root.querySelector('[data-kyb-anchor="' + options.anchor + '"]');
      if (row) {
        expandSignalRow(row);
        focusEl = row;
      }
    }

    if (options.scroll !== false) {
      window.requestAnimationFrame(function () {
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        focusEl.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: options.anchor ? "center" : "start"
        });
        highlightJumpTarget(focusEl);
      });
    }
    return target;
  }

  var CATEGORY_LABELS = {
    "business-model": "Business Model",
    "financial-health": "Financial Health",
    "fraud-financial-crimes": "Fraud & Financial Crimes",
    "governance-compliance": "Governance & Compliance",
    "third-party-market": "Third-Party & Market"
  };

  function shortRiskLabel(risk, tone) {
    var r = String(risk || "").toLowerCase();
    if (r.indexOf("high") !== -1 || tone === "negative") return { label: "High", tone: "negative" };
    if (r.indexOf("low") !== -1 || tone === "positive") return { label: "Low", tone: "positive" };
    return { label: "Medium", tone: "intermediate" };
  }

  function wireFindingJumps(root) {
    root.querySelectorAll("[data-kyb-signals-findings] .kyb-tab-summary__finding").forEach(function (item) {
      var textEl = item.querySelector(".kyb-tab-summary__finding-text");
      var target = resolveFindingTarget(textEl && textEl.textContent);
      if (!target) return;
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("data-kyb-jump-signal-category", target.category);
      if (target.anchor) item.setAttribute("data-kyb-jump-anchor", target.anchor);
      item.setAttribute(
        "aria-label",
        "Open " + target.category.replace(/-/g, " ") + " details"
      );
    });
  }

  function buildBreakoutHtml(root) {
    var rows = [];
    root.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (acc) {
      var id = acc.getAttribute("data-kyb-signal-category");
      var score = acc.getAttribute("data-kyb-category-score") || "—";
      var risk = shortRiskLabel(
        acc.getAttribute("data-kyb-category-risk"),
        acc.getAttribute("data-kyb-category-risk-tone")
      );
      var label = CATEGORY_LABELS[id] || id;
      rows.push(
        '<li class="kyb-tab-summary__breakout-row" role="button" tabindex="0" data-kyb-jump-signal-category="' +
          id +
          '" aria-label="Open ' +
          label +
          ' details">' +
          '<span class="kyb-tab-summary__breakout-name">' +
          label +
          "</span>" +
          '<span class="kyb-tab-summary__breakout-meta">' +
          '<span class="kyb-tab-summary__breakout-score">' +
          score +
          "/100</span>" +
          '<span class="tds-tag tds-tag--sm tds-tag--' +
          risk.tone +
          '">' +
          risk.label +
          "</span>" +
          "</span>" +
          "</li>"
      );
    });
    return rows.join("");
  }

  function setSummaryView(host, view) {
    if (!host) return;
    host.setAttribute("data-kyb-summary-active", view);
    host.querySelectorAll("[data-kyb-summary-panel]").forEach(function (panel) {
      var on = panel.getAttribute("data-kyb-summary-panel") === view;
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
    });
    host.querySelectorAll("[data-kyb-summary-view]").forEach(function (dot) {
      var on = dot.getAttribute("data-kyb-summary-view") === view;
      dot.classList.toggle("is-active", on);
      dot.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function wireSummaryViews(root) {
    var findings = root.querySelector(".kyb-tab-summary__findings");
    if (!findings || findings.getAttribute("data-kyb-summary-views")) return;

    var title = findings.querySelector(".kyb-tab-summary__findings-title");
    var list = findings.querySelector(".kyb-tab-summary__findings-list");
    if (!title || !list) return;

    findings.setAttribute("data-kyb-summary-views", "");
    findings.setAttribute("data-kyb-summary-active", "findings");

    var findingsPanel = document.createElement("div");
    findingsPanel.className = "kyb-tab-summary__view-panel is-active";
    findingsPanel.setAttribute("data-kyb-summary-panel", "findings");
    findingsPanel.setAttribute("role", "tabpanel");
    findings.insertBefore(findingsPanel, title);
    findingsPanel.appendChild(title);
    findingsPanel.appendChild(list);

    var breakoutPanel = document.createElement("div");
    breakoutPanel.className = "kyb-tab-summary__view-panel";
    breakoutPanel.setAttribute("data-kyb-summary-panel", "breakout");
    breakoutPanel.setAttribute("role", "tabpanel");
    breakoutPanel.hidden = true;
    breakoutPanel.innerHTML =
      '<h3 class="kyb-tab-summary__findings-title">Risk Categories</h3>' +
      '<ul class="kyb-tab-summary__breakout-list" data-kyb-signals-breakout>' +
      buildBreakoutHtml(root) +
      "</ul>";
    findings.appendChild(breakoutPanel);

    var dots = document.createElement("div");
    dots.className = "kyb-tab-summary__view-dots";
    dots.setAttribute("role", "tablist");
    dots.setAttribute("aria-label", "Summary views");
    dots.innerHTML =
      '<button type="button" class="kyb-tab-summary__view-dot is-active" role="tab" aria-selected="true" data-kyb-summary-view="findings" aria-label="Key findings"></button>' +
      '<button type="button" class="kyb-tab-summary__view-dot" role="tab" aria-selected="false" data-kyb-summary-view="breakout" aria-label="Risk signals breakout"></button>';
    findings.appendChild(dots);
  }

  function mount(host, kind) {
    var html = window.D3_KYB_PANELS && window.D3_KYB_PANELS[kind];
    if (!host || !html) return false;
    host.innerHTML = '<div class="d3-rp d3-rp--' + kind + '"><div class="kyb-panel">' + html + "</div></div>";
    var root = host.firstElementChild;
    if (kind === "summary") {
      root.querySelectorAll(".kyb-summary-hero__gauge-meta .tds-ai-tag").forEach(function (n) { n.remove(); });
    }
    if (kind === "signals") {
      /* Score + key findings sit across the top; no AI summary, no "Signals" banner. */
      root.querySelectorAll(".kyb-truai-summary-card, .kyb-tab-detail__header, .dv-sidebar-toggle--collapse, .dv-sidebar-toggle--expand").forEach(function (n) { n.remove(); });
      /* Risk Categories breakout + view dots temporarily removed; keep Key Findings only. */
      wireFindingJumps(root);
      wireScoreBreakdown(root);
    }
    gauges(root);
    signalRows(root);
    impactFilter(root);
    root.addEventListener("click", function (e) {
      var tog = e.target.closest(".dv-sidebar-toggle--collapse, .dv-sidebar-toggle--expand");
      if (tog && root.contains(tog)) {
        var layout = tog.closest(".kyb-tab-layout");
        var off = tog.classList.contains("dv-sidebar-toggle--collapse");
        layout.classList.toggle("dv-columns--sidebar-collapsed", off);
        var c = layout.querySelector(".dv-sidebar-toggle--collapse");
        var x = layout.querySelector(".dv-sidebar-toggle--expand");
        if (c) c.setAttribute("aria-expanded", off ? "false" : "true");
        if (x) x.setAttribute("aria-expanded", off ? "true" : "false");
        return;
      }
      var viewDot = e.target.closest("[data-kyb-summary-view]");
      if (viewDot && root.contains(viewDot)) {
        setSummaryView(viewDot.closest("[data-kyb-summary-views]"), viewDot.getAttribute("data-kyb-summary-view"));
        return;
      }
      var jumpRow = e.target.closest("[data-kyb-jump-signal-category]");
      if (
        jumpRow &&
        root.contains(jumpRow) &&
        (jumpRow.classList.contains("kyb-tab-summary__finding") ||
          jumpRow.classList.contains("kyb-tab-summary__breakout-row"))
      ) {
        openSignalCategory(root, jumpRow.getAttribute("data-kyb-jump-signal-category"), {
          anchor: jumpRow.getAttribute("data-kyb-jump-anchor") || ""
        });
        return;
      }
      var head = e.target.closest(".tds-accordion__header");
      if (head && root.contains(head)) {
        var acc = head.closest(".tds-accordion");
        if (acc && !acc.classList.contains("tds-accordion--disabled") && !acc.classList.contains("tds-accordion--skeleton")) {
          head.setAttribute("aria-expanded", acc.classList.toggle("tds-accordion--expanded") ? "true" : "false");
        }
        return;
      }
      var jump = e.target.closest("[data-kyb-jump-tab]");
      if (jump) {
        var tab = JUMP[jump.getAttribute("data-kyb-jump-tab")] || "risk";
        if (window.D3KybReport && window.D3KybReport.selectTab) window.D3KybReport.selectTab(tab);
      }
    });
    root.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var jumpRow = e.target.closest(
        "[data-kyb-jump-signal-category].kyb-tab-summary__finding, [data-kyb-jump-signal-category].kyb-tab-summary__breakout-row"
      );
      if (!jumpRow || jumpRow !== e.target) return;
      e.preventDefault();
      jumpRow.click();
    });
    return true;
  }

  function riskFromScore(score) {
    if (score < 30) return { risk: "low", label: "Low Risk", tone: "positive" };
    if (score <= 60) return { risk: "medium", label: "Medium Risk", tone: "intermediate" };
    return { risk: "high", label: "High Risk", tone: "negative" };
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
      var tier = riskFromScore(rounded);
      tagEl.textContent = tier.label;
      tagEl.className = "tds-tag tds-tag--sm tds-tag--" + tier.tone;
    }
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
    var tier = riskFromScore(average);
    gauge.setAttribute("data-score", String(average));
    gauge.setAttribute("data-risk", tier.risk);
    gauge.setAttribute("data-label", tier.label);
    gauge.setAttribute("data-show-percent", "false");
    if (window.ScoreGauge) window.ScoreGauge.render(gauge);
  }

  function syncScoreBreakdownFromSignals(dialog, root) {
    if (!dialog) return;
    var scope = root || document;
    dialog.querySelectorAll(".kyb-score-factor").forEach(function (factor) {
      var categoryId = factor.getAttribute("data-kyb-score-factor");
      if (!categoryId) return;
      var accordion = scope.querySelector(
        '.kyb-signal-category[data-kyb-signal-category="' + categoryId + '"]'
      );
      if (!accordion) return;
      var score = parseFloat(accordion.getAttribute("data-kyb-category-score") || "");
      if (isNaN(score)) return;
      updateScoreBreakdownFactor(factor, score);
    });

    var signalsGauge = scope.querySelector(".kyb-tab-summary__gauge[data-score]");
    var breakdownGauge = dialog.querySelector("[data-kyb-score-breakdown-gauge]");
    if (breakdownGauge) {
      var score = signalsGauge
        ? parseFloat(signalsGauge.getAttribute("data-score") || "0")
        : parseFloat(breakdownGauge.getAttribute("data-score") || "0");
      var tier = riskFromScore(score);
      breakdownGauge.setAttribute("data-score", String(score));
      breakdownGauge.setAttribute("data-risk", tier.risk);
      breakdownGauge.setAttribute("data-label", tier.label);
      breakdownGauge.setAttribute("data-show-percent", "false");
      if (window.ScoreGauge) window.ScoreGauge.render(breakdownGauge);
    }

    var signalsConfidence = scope.querySelector("[data-kyb-signals-confidence]");
    var breakdownConfidence = dialog.querySelector("[data-kyb-score-breakdown-confidence]");
    if (signalsConfidence && breakdownConfidence) {
      breakdownConfidence.textContent = signalsConfidence.textContent;
    }
  }

  function wireScoreBreakdown(root) {
    var dialog = document.getElementById("kyb-score-breakdown-dialog");
    if (!dialog) return;

    dialog.querySelectorAll(".kyb-score-factor").forEach(function (factor) {
      var input = factor.querySelector(".kyb-score-factor__input");
      if (!input || input.dataset.d3Bound) return;
      input.dataset.d3Bound = "1";
      input.addEventListener("input", function () {
        updateScoreBreakdownFactor(factor, parseFloat(input.value) || 0);
        updateScoreBreakdownGauge(dialog);
      });
    });

    root.querySelectorAll('[data-dialog-open="kyb-score-breakdown-dialog"]').forEach(function (btn) {
      if (btn.dataset.d3BreakdownBound) return;
      btn.dataset.d3BreakdownBound = "1";
      btn.addEventListener("click", function () {
        var resumeBody = document.querySelector(".d3-kyb-resume.is-live .d3-kyb-resume__body");
        var detail = document.querySelector(".d3-workspace__detail");
        var resumeTop = resumeBody ? resumeBody.scrollTop : 0;
        var detailTop = detail ? detail.scrollTop : 0;
        window.setTimeout(function () {
          syncScoreBreakdownFromSignals(dialog, root);
          if (resumeBody) resumeBody.scrollTop = resumeTop;
          if (detail) detail.scrollTop = detailTop;
          var panel = dialog.querySelector(".tds-dialog__panel");
          if (panel && typeof panel.focus === "function") panel.focus({ preventScroll: true });
        }, 0);
      });
    });

    syncScoreBreakdownFromSignals(dialog, root);
  }

  window.D3KybPanels = { mount: mount };
})();
