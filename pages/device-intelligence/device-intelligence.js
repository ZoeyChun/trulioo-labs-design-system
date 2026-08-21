/* ============================================================
   Device Intelligence — landing navigation + Figma results
   Results: Figma 4735:144821
   ============================================================ */
(function () {
  "use strict";

  var ICON_CHECK =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.4 8l1.8 1.8 3.4-3.8"/></svg>';
  var ICON_PLUS =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>';
  var ICON_MINUS =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10"/></svg>';
  var ICON_CHEVRON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4l4 4-4 4"/></svg>';
  var ICON_FILTER =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 3.5h12M4 8h8M6.5 12.5h3"/></svg>';
  var ICON_SORT =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 6.5L8 3.5l3 3M5 9.5l3 3 3-3"/></svg>';

  var INDICATORS = [
    "Trusted browser and operating system",
    "Stable location and timezone",
    "No shared-device activity",
    "No VPN or proxy detected",
    "Consistent device fingerprint",
    "No emulator or jailbreak",
  ];

  var EVIDENCE_GROUPS = [
    {
      key: "risk-outputs",
      label: "Risk Outputs",
      open: true,
      rows: [
        { title: "Automation", result: "Not detected" },
        { title: "Device Risk Level", result: "Low" },
        { title: "Fraud indicators", result: "None" },
        { title: "Session Risk", result: "None" },
      ],
    },
    {
      key: "network-location",
      label: "Network & Location",
      rows: [
        { title: "VPN", result: "No" },
        { title: "Proxy", result: "No" },
        { title: "TOR", result: "No" },
        { title: "IP reputation", result: "Clean" },
        { title: "Location consistency", result: "Match" },
      ],
    },
    {
      key: "integrity-compromise",
      label: "Integrity & Compromise",
      rows: [
        { title: "Emulator", result: "No" },
        { title: "Root or jailbreak", result: "No" },
        { title: "Debugging tools", result: "No" },
      ],
    },
    {
      key: "device-identity-history",
      label: "Device Identity & History",
      rows: [
        { title: "First-party device", result: "Yes" },
        { title: "Identity count", result: "1" },
        { title: "Stable fingerprint", result: "Yes" },
        { title: "Prior fraud", result: "None" },
      ],
    },
    {
      key: "behavioral-biometrics",
      label: "Behavioral Biometrics",
      rows: [
        { title: "Natural interaction", result: "Yes" },
        { title: "Automation pattern", result: "Not detected" },
      ],
    },
    {
      key: "location-history",
      label: "Location History",
      rows: [
        { title: "Current location consistent", result: "Yes" },
        { title: "Impossible travel", result: "Not detected" },
      ],
    },
  ];

  function getHomeUrl() {
    try {
      return new URL("../unified-intelligence-home/index.html", window.location.href).href;
    } catch (e) {
      return "../unified-intelligence-home/index.html";
    }
  }

  function initHomeNavigation() {
    var homeUrl = getHomeUrl();

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

  function initAppNavToggle() {
    var shell = document.getElementById("app-shell");
    var toggle = document.getElementById("app-nav-toggle");
    var overlay = document.getElementById("app-sidenav-overlay");
    if (!shell || !toggle || !overlay) return;

    function setOpen(open) {
      shell.classList.toggle("app-shell--nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      overlay.hidden = !open;
      overlay.setAttribute("aria-hidden", String(!open));
    }

    toggle.addEventListener("click", function () {
      setOpen(!shell.classList.contains("app-shell--nav-open"));
    });
    overlay.addEventListener("click", function () { setOpen(false); });
  }

  function initLanding() {
    var back = document.getElementById("di-landing-back");
    if (back) {
      back.addEventListener("click", function () {
        window.location.href = getHomeUrl();
      });
    }
    initAppNavToggle();
  }

  /* --- Score gauge (ported from Document Verification) --- */

  var NS = "http://www.w3.org/2000/svg";
  var CX = 113.526;
  var CY = 121.53;
  var R_OUTER = 95.53;
  var R_INNER = 76.43;
  var R_DARK = R_OUTER - 5;
  var POINTER_R = 73;
  var START = 160;
  var SWEEP = 220;
  var TRACK = "#f4f6f4";
  var POINTER = "#004c45";
  var NUMBER = "#172d2d";
  var DURATION = 1400;
  var PAL = {
    high: { fill: "#fff1f1", border: "#db2b2b", tag: "#ba151d" },
    medium: { fill: "#fff4db", border: "#d8a13b", tag: "#775516" },
    low: { fill: "#eaf7f0", border: "#6fb38a", tag: "#166534" },
  };

  function polar(deg, r) {
    var a = (deg * Math.PI) / 180;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  }

  function sector(s, e, rO, rI) {
    var sweep = (((e - s) % 360) + 360) % 360;
    if (sweep < 0.05) return "";
    var lg = sweep > 180 ? 1 : 0;
    var o1 = polar(s, rO);
    var o2 = polar(e, rO);
    var i2 = polar(e, rI);
    var i1 = polar(s, rI);
    return (
      "M" + o1[0] + " " + o1[1] +
      " A" + rO + " " + rO + " 0 " + lg + " 1 " + o2[0] + " " + o2[1] +
      " L" + i2[0] + " " + i2[1] +
      " A" + rI + " " + rI + " 0 " + lg + " 0 " + i1[0] + " " + i1[1] + " Z"
    );
  }

  function mk(tag, attrs, parent) {
    var el = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach(function (k) {
      el.setAttribute(k, String(attrs[k]));
    });
    if (parent) parent.appendChild(el);
    return el;
  }

  function renderGauge(container) {
    var score = parseFloat(container.getAttribute("data-score") || "") || 0;
    var max = parseFloat(container.getAttribute("data-max") || "") || 100;
    var pal = PAL[container.getAttribute("data-risk") || ""] || PAL.high;
    var label = container.getAttribute("data-label") || "";
    container.innerHTML = "";

    var svg = mk("svg", { width: 227, height: 180, viewBox: "0 0 227 180", overflow: "visible" }, null);
    container.appendChild(svg);
    mk("path", { d: sector(START, START + SWEEP, R_OUTER, R_INNER), fill: TRACK }, svg);
    var fl = mk("path", { fill: pal.fill, d: "" }, svg);
    var fd = mk("path", { fill: pal.border, d: "" }, svg);
    var pw = mk(
      "polygon",
      {
        points: "0,-12 8.5,6.5 -8.5,6.5",
        fill: "#fff",
        stroke: "#fff",
        "stroke-width": 4,
        "stroke-linejoin": "round",
      },
      svg
    );
    var pg = mk(
      "polygon",
      {
        points: "0,-7 7,5.5 -7,5.5",
        fill: POINTER,
        "stroke-linejoin": "round",
      },
      svg
    );
    var txt = mk(
      "text",
      {
        x: CX,
        y: 101,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        style: "font-size:64px;font-weight:400;fill:" + NUMBER + ";font-family:inherit;",
      },
      svg
    );
    txt.textContent = "0";

    var fo = mk("foreignObject", { x: CX - 70, y: 125, width: 140, height: 30, overflow: "visible" }, svg);
    var wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;";
    var badge = document.createElement("span");
    badge.textContent = label;
    badge.style.cssText =
      "display:inline-flex;align-items:center;background:" + pal.fill +
      ";border:1px solid " + pal.border +
      ";color:" + pal.tag +
      ";border-radius:9999px;padding:4px 8px;font-size:12px;font-weight:510;white-space:nowrap;line-height:16px;font-family:inherit;";
    wrap.appendChild(badge);
    fo.appendChild(wrap);

    var t0 = null;
    function anim(now) {
      if (t0 === null) t0 = now;
      var raw = Math.min((now - t0) / DURATION, 1);
      var v = score * (1 - Math.pow(1 - raw, 4));
      if (v > 0.3) {
        var end = START + (v / max) * SWEEP;
        fl.setAttribute("d", sector(START, end, R_OUTER, R_INNER));
        fd.setAttribute("d", sector(START, end, R_OUTER, R_DARK));
        var p = polar(end, POINTER_R);
        var tf = "translate(" + p[0] + "," + p[1] + ") rotate(" + (end + 90) + ")";
        pw.setAttribute("transform", tf);
        pg.setAttribute("transform", tf);
        pw.style.display = "";
        pg.style.display = "";
      } else {
        fl.setAttribute("d", "");
        fd.setAttribute("d", "");
        pw.style.display = "none";
        pg.style.display = "none";
      }
      txt.textContent = String(Math.round(v));
      if (raw < 1) requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
  }

  function renderGauges() {
    document.querySelectorAll(".dv-di-gauge[data-score]").forEach(renderGauge);
  }

  /* --- Results body --- */

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderIndicator(text, extra) {
    return (
      '<div class="dv-di-indicator"' + (extra ? ' hidden data-indicator-extra="true"' : "") + ">" +
        '<span class="dv-di-indicator__icon" aria-hidden="true">' + ICON_CHECK + "</span>" +
        '<span class="dv-di-indicator__label">' + escapeHtml(text) + "</span>" +
      "</div>"
    );
  }

  function renderTableRow(row) {
    return (
      '<div class="dv-ditable__row">' +
        '<span class="dv-ditable__cell"><span class="dv-cell-title">' + escapeHtml(row.title) + "</span></span>" +
        '<span class="dv-ditable__cell dv-di-result">' + escapeHtml(row.result) + "</span>" +
        '<span class="dv-ditable__cell"><span class="dv-di-insight dv-di-insight--norisk"><span class="dv-di-insight__icon">' + ICON_CHECK + "</span>No Risk</span></span>" +
      "</div>"
    );
  }

  function renderEvidenceGroup(group) {
    var open = !!group.open;
    var rows = group.rows.map(renderTableRow).join("");
    return (
      '<div class="dv-group dv-collapsible' + (open ? " dv-collapsible--open" : "") + '" data-group-key="' + escapeHtml(group.key) + '">' +
        '<button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="' + String(open) + '">' +
          '<span class="dv-chevron" aria-hidden="true">' + ICON_CHEVRON + "</span>" +
          '<span class="dv-group__label">' + escapeHtml(group.label) + "</span>" +
          '<span class="dv-ni2-counts"><span class="tds-tag tds-tag--sm tds-tag--positive">' + group.rows.length + "</span></span>" +
        "</button>" +
        '<div class="dv-collapsible__body"' + (open ? "" : " hidden") + ">" +
          '<div class="dv-ditable">' +
            '<div class="dv-ditable__head">' +
              '<span class="dv-ditable__ch">Signals</span>' +
              '<span class="dv-ditable__ch">Results</span>' +
              '<span class="dv-ditable__ch">Insights</span>' +
            "</div>" +
            rows +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function renderResultsBody() {
    var extra = Math.max(0, INDICATORS.length - 3);
    var indicatorRows = INDICATORS.map(function (text, index) {
      return renderIndicator(text, extra > 0 && index >= 3);
    }).join("");
    var more =
      extra > 0
        ? '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm dv-di-indicators__more" data-open="false" aria-expanded="false">' +
            '<span class="tds-btn__leading-icon">' + ICON_PLUS + "</span>" + extra + " more indicators" +
          "</button>"
        : "";

    return (
      '<div class="dv-di-summary-block">' +
        '<div class="tds-announcement tds-announcement--success">' +
          '<span class="tds-announcement__icon" aria-hidden="true">' + ICON_CHECK + "</span>" +
          '<div class="tds-announcement__content">' +
            '<p class="tds-announcement__title">Normal device and network</p>' +
            '<p class="tds-announcement__message">The device and network appear normal. The transaction was declined because of the face mismatch, not device risk.</p>' +
          "</div>" +
        "</div>" +
        '<section class="dv-di-indicators" aria-label="Risk Indicators">' +
          '<p class="dv-di-indicators__header">Risk Indicators</p>' +
          '<div class="dv-di-indicators__list">' + indicatorRows + "</div>" +
          more +
        "</section>" +
      "</div>" +
      '<div class="dv-signals-bar">' +
        '<h3 class="dv-signals-bar__title">Signals</h3>' +
        '<div class="dv-signals-bar__controls">' +
          '<button class="tds-btn tds-btn--invisible tds-btn--sm dv-expand-all" type="button">Expand All</button>' +
          '<button class="tds-btn tds-btn--secondary tds-btn--sm" type="button">' +
            '<span class="tds-btn__leading-icon">' + ICON_FILTER + "</span>Filter" +
          "</button>" +
          '<button class="tds-btn tds-btn--secondary tds-btn--sm" type="button">' +
            '<span class="tds-btn__leading-icon">' + ICON_SORT + "</span>Sort" +
          "</button>" +
        "</div>" +
      "</div>" +
      '<p class="dv-di-evidence-label">Evidence</p>' +
      '<div class="dv-di-groups">' +
        EVIDENCE_GROUPS.map(renderEvidenceGroup).join("") +
        '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm di-more-declined" data-open="false">' +
          '<span class="tds-btn__leading-icon">' + ICON_PLUS + "</span>9 More declined" +
        "</button>" +
      "</div>"
    );
  }

  function setCollapsibleOpen(section, open) {
    section.classList.toggle("dv-collapsible--open", open);
    var header = section.querySelector(".dv-collapsible__header");
    var body = section.querySelector(".dv-collapsible__body");
    if (header) header.setAttribute("aria-expanded", String(open));
    if (body instanceof HTMLElement) body.hidden = !open;
  }

  function panelCollapsibles(panel) {
    return Array.prototype.slice.call(panel.querySelectorAll(".dv-collapsible"));
  }

  function areAllOpen(panel) {
    var sections = panelCollapsibles(panel);
    return sections.length > 0 && sections.every(function (s) {
      return s.classList.contains("dv-collapsible--open");
    });
  }

  function updateExpandAll(btn) {
    var panel = btn.closest(".dv-tabpanel");
    if (!panel) return;
    btn.textContent = areAllOpen(panel) ? "Collapse All" : "Expand All";
  }

  function wireResultsInteractions() {
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;

      var header = target.closest(".dv-collapsible__header");
      if (header) {
        var section = header.closest(".dv-collapsible");
        if (!section) return;
        setCollapsibleOpen(section, !section.classList.contains("dv-collapsible--open"));
        var expandBtn = document.querySelector(".dv-expand-all");
        if (expandBtn) updateExpandAll(expandBtn);
        return;
      }

      var expandAll = target.closest(".dv-expand-all");
      if (expandAll instanceof HTMLElement) {
        var panel = expandAll.closest(".dv-tabpanel");
        if (!panel) return;
        var open = !areAllOpen(panel);
        panelCollapsibles(panel).forEach(function (section) {
          setCollapsibleOpen(section, open);
        });
        updateExpandAll(expandAll);
        return;
      }

      var more = target.closest(".dv-di-indicators__more");
      if (more instanceof HTMLElement) {
        var next = more.getAttribute("data-open") !== "true";
        more.setAttribute("data-open", String(next));
        more.setAttribute("aria-expanded", String(next));
        var extraEls = more.closest(".dv-di-indicators").querySelectorAll('[data-indicator-extra="true"]');
        extraEls.forEach(function (el) {
          if (el instanceof HTMLElement) el.hidden = !next;
        });
        more.innerHTML =
          '<span class="tds-btn__leading-icon">' + (next ? ICON_MINUS : ICON_PLUS) + "</span>" +
          (next ? "Show less" : extraEls.length + " more indicators");
        return;
      }

      var declined = target.closest(".di-more-declined");
      if (declined instanceof HTMLElement) {
        var show = declined.getAttribute("data-open") !== "true";
        declined.setAttribute("data-open", String(show));
        declined.innerHTML =
          '<span class="tds-btn__leading-icon">' + (show ? ICON_MINUS : ICON_PLUS) + "</span>" +
          (show ? "Show less" : "9 More declined");
      }
    });

    var collapseBtn = document.querySelector(".dv-sidebar-toggle--collapse");
    var expandBtn = document.querySelector(".dv-sidebar-toggle--expand");
    var columns = document.getElementById("dv-columns");
    function setSidebarCollapsed(collapsed) {
      if (!columns) return;
      columns.classList.toggle("dv-columns--sidebar-collapsed", collapsed);
      if (collapseBtn) collapseBtn.setAttribute("aria-expanded", String(!collapsed));
      if (expandBtn) expandBtn.setAttribute("aria-expanded", String(collapsed));
    }
    if (collapseBtn) collapseBtn.addEventListener("click", function () { setSidebarCollapsed(true); });
    if (expandBtn) expandBtn.addEventListener("click", function () { setSidebarCollapsed(false); });
  }

  var ANALYZE_DELAY_MS = 2200;
  var analyzeTimer = null;

  function revealResults() {
    var analyzing = document.getElementById("di-analyzing");
    var results = document.getElementById("dv-result-view");
    if (analyzing) {
      analyzing.hidden = true;
      analyzing.removeAttribute("aria-busy");
    }
    if (results) results.hidden = false;
    renderGauges();
  }

  function initResults() {
    var body = document.getElementById("dv-device-body");
    if (body) body.innerHTML = renderResultsBody();
    wireResultsInteractions();
    initAppNavToggle();

    function goToLanding() {
      if (analyzeTimer) window.clearTimeout(analyzeTimer);
      window.location.href = "index.html";
    }

    var analyzingBack = document.getElementById("di-analyzing-back");
    if (analyzingBack) analyzingBack.addEventListener("click", goToLanding);

    analyzeTimer = window.setTimeout(revealResults, ANALYZE_DELAY_MS);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHomeNavigation();
    if (document.getElementById("di-landing")) initLanding();
    if (document.getElementById("dv-result-view")) initResults();
  });
})();
