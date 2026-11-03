/* Demo 3 — native Overview / Risk Analysis panels.
   Renders the Summary and Signals tab content extracted from pages/KYB Results
   (js/d3-kyb-report-panels-data.js) straight into the report, then wires the
   gauges, accordions, signal rows, impact filter and jump buttons. */
(function () {
  "use strict";

  var JUMP = { "match-signals": "signals", "business-insights": "additional", ownership: "ownership", presence: "web", signals: "risk", financial: "additional", summary: "findings" };

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
    return true;
  }

  window.D3KybPanels = { mount: mount };
})();
