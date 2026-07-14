/* Bank Verification — result page (reference demo) */

(function () {
  "use strict";

  var shared = window.BVShared;
  var session = null;

  var ICON_POSITIVE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8l1.8 1.8 3.2-3.6"/></svg>';
  var ICON_NEGATIVE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4"/></svg>';
  var ICON_INTERMEDIATE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v4M8 11h.01"/></svg>';
  var CARET_SVG = '<svg viewBox="0 0 8 11" fill="currentColor" aria-hidden="true"><path d="M4 0l3.5 4h-7L4 0z"/><path d="M4 11L.5 7h7L4 11z"/></svg>';

  var GAUGE_NS = "http://www.w3.org/2000/svg";
  var GAUGE_PAL = {
    high: { fill: "#fff1f1", border: "#db2b2b", tag: "#ba151d" },
    medium: { fill: "#fff4db", border: "#d8a13b", tag: "#775516" },
    low: { fill: "#eaf7f0", border: "#6fb38a", tag: "#166534" }
  };

  function toneClass(tone) {
    return "tds-tag tds-tag--" + tone + " tds-tag--sm";
  }

  function statusClass(kind) {
    if (kind === "positive") return "dv-status dv-status--positive";
    if (kind === "negative") return "dv-status dv-status--negative";
    return "dv-status dv-status--intermediate";
  }

  function statusIcon(kind) {
    if (kind === "positive") return ICON_POSITIVE;
    if (kind === "negative") return ICON_NEGATIVE;
    return ICON_INTERMEDIATE;
  }

  function formatDate() {
    return new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }

  function renderGauge(container, score, risk, label) {
    var CX = 113.526, CY = 121.53, R_OUTER = 95.53, R_INNER = 76.43, R_DARK = R_OUTER - 5;
    var POINTER_R = 73, START = 160, SWEEP = 220, DURATION = 1400;
    var pal = GAUGE_PAL[risk] || GAUGE_PAL.low;

    function polar(deg, r) {
      var a = deg * Math.PI / 180;
      return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
    }
    function sector(s, e, rO, rI) {
      var sweep = ((e - s) % 360 + 360) % 360;
      if (sweep < 0.05) return "";
      var lg = sweep > 180 ? 1 : 0;
      var o1 = polar(s, rO), o2 = polar(e, rO), i2 = polar(e, rI), i1 = polar(s, rI);
      return "M" + o1[0] + " " + o1[1] + " A" + rO + " " + rO + " 0 " + lg + " 1 " + o2[0] + " " + o2[1] +
        " L" + i2[0] + " " + i2[1] + " A" + rI + " " + rI + " 0 " + lg + " 0 " + i1[0] + " " + i1[1] + " Z";
    }
    function mk(tag, attrs, parent) {
      var el = document.createElementNS(GAUGE_NS, tag);
      if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, String(attrs[k])); });
      if (parent) parent.appendChild(el);
      return el;
    }

    container.innerHTML = "";
    var svg = mk("svg", { width: 227, height: 180, viewBox: "0 0 227 180", overflow: "visible" });
    container.appendChild(svg);
    mk("path", { d: sector(START, START + SWEEP, R_OUTER, R_INNER), fill: "#f4f6f4" }, svg);
    var fl = mk("path", { fill: pal.fill, d: "" }, svg);
    var fd = mk("path", { fill: pal.border, d: "" }, svg);
    var pw = mk("polygon", { points: "0,-12 8.5,6.5 -8.5,6.5", fill: "#fff", stroke: "#fff", "stroke-width": 4, "stroke-linejoin": "round" }, svg);
    var pg = mk("polygon", { points: "0,-7 7,5.5 -7,5.5", fill: "#004c45", "stroke-linejoin": "round" }, svg);
    var txt = mk("text", {
      x: CX, y: 101, "text-anchor": "middle", "dominant-baseline": "middle",
      style: "font-size:64px;font-weight:400;fill:#172d2d;font-family:inherit;"
    }, svg);
    txt.textContent = "0";
    var fo = mk("foreignObject", { x: CX - 70, y: 125, width: 140, height: 30, overflow: "visible" }, svg);
    var wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;";
    var badge = document.createElement("span");
    badge.textContent = label;
    badge.style.cssText = "display:inline-flex;align-items:center;background:" + pal.fill + ";border:1px solid " + pal.border +
      ";color:" + pal.tag + ";border-radius:9999px;padding:4px 8px;font-size:12px;font-weight:510;white-space:nowrap;line-height:16px;font-family:inherit;";
    wrap.appendChild(badge);
    fo.appendChild(wrap);

    var t0 = null;
    function anim(now) {
      if (t0 === null) t0 = now;
      var raw = Math.min((now - t0) / DURATION, 1);
      var v = score * (1 - Math.pow(1 - raw, 4));
      if (v > 0.3) {
        var end = START + (v / 100) * SWEEP;
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

  function renderResult(config) {
    document.getElementById("bv-result-title").textContent = config.displayName;

    var statusEl = document.getElementById("bv-result-status");
    statusEl.className = "tds-tag tds-tag--" + config.tone + " tds-tag--md";
    statusEl.textContent = config.match;

    document.getElementById("bv-result-country").textContent = config.country + " " + config.countryFlag;
    document.getElementById("bv-result-txn").textContent = config.transactionId;
    document.getElementById("bv-result-date").textContent = formatDate();

    var teBlock = document.getElementById("bv-result-te-block");
    if (config.testEntityMode && config.testEntity) {
      teBlock.hidden = false;
      renderResultTestEntity(config);
    } else {
      teBlock.hidden = true;
    }

    renderGauge(document.getElementById("bv-result-gauge"), config.score, config.risk, config.match);
    document.getElementById("bv-result-truai").textContent = config.truAi;

    var appended = document.getElementById("bv-result-appended");
    appended.innerHTML = "";
    config.appended.forEach(function (row) {
      var div = document.createElement("div");
      div.className = "dv-detail-row";
      var label = document.createElement("span");
      label.className = "dv-detail-label";
      label.textContent = row.label;
      var val = document.createElement("span");
      val.className = "dv-detail-value";
      val.textContent = row.value;
      if (row.value && String(row.value).length > 16) {
        val.title = row.value;
      }
      div.appendChild(label);
      div.appendChild(val);
      appended.appendChild(div);
    });

    var matchCountEl = document.getElementById("bv-result-match-count");
    matchCountEl.className = "tds-tag tds-tag--" + config.tone + " tds-tag--sm";
    matchCountEl.textContent = config.matchCount + " Matches";

    var tbody = document.getElementById("bv-result-field-rows");
    tbody.innerHTML = "";
    config.fieldMatches.forEach(function (row) {
      var tr = document.createElement("div");
      tr.className = "dv-table__row";
      tr.innerHTML =
        '<div class="dv-table__text-cell">' + row.signal + '</div>' +
        '<div class="dv-table__detail-cell bv-result-main__detail">' + row.detail + '</div>' +
        '<div class="dv-table__label-cell"><span class="' + statusClass(row.kind) + '">' +
        '<span class="dv-status__icon">' + statusIcon(row.kind) + '</span>' + row.result + '</span></div>';
      tbody.appendChild(tr);
    });

    var pre = document.getElementById("bv-result-raw");
    pre.textContent = JSON.stringify(config.raw, null, 2);
    pre.classList.remove("bv-raw-panel__pre--expanded");
    document.getElementById("bv-result-raw-expand").innerHTML =
      '<span class="tds-btn__leading-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v10M3 8h10"/></svg></span>Expand all';
  }

  function renderResultTestEntity(config) {
    var root = document.getElementById("bv-result-te-select");
    var entities = shared.TEST_ENTITIES[config.accountType];
    var current = config.testEntity;
    var currentIndex = config.testEntityIndex;

    root.innerHTML = "";
    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "tds-select__trigger tds-select__trigger--lg dv-select-trigger bv-test-entity__trigger";
    trigger.setAttribute("aria-haspopup", "listbox");

    var flag = document.createElement("span");
    flag.className = "tds-select__country-flag bv-test-entity__flag";
    if (current) {
      flag.textContent = shared.entityFlag(current.country);
    } else {
      flag.hidden = true;
    }

    var textWrap = document.createElement("span");
    textWrap.className = "tds-select__text-wrapper";
    var value = document.createElement("span");
    value.className = "tds-select__value" + (current ? "" : " tds-select__placeholder");
    value.textContent = current ? current.name : "Select test entity";
    textWrap.appendChild(value);
    if (current) shared.bindEllipsisTooltip(value, current.name);

    var trailing = document.createElement("span");
    trailing.className = "tds-select__trailing-group";
    if (current) {
      var tag = document.createElement("span");
      tag.className = toneClass(current.tone);
      tag.textContent = current.match;
      trailing.appendChild(tag);
    }
    var caret = document.createElement("span");
    caret.className = "tds-caret tds-caret--default";
    caret.setAttribute("aria-hidden", "true");
    caret.innerHTML = CARET_SVG;
    trailing.appendChild(caret);

    trigger.appendChild(flag);
    trigger.appendChild(textWrap);
    trigger.appendChild(trailing);

    var menu = document.createElement("div");
    menu.className = "tds-select__menu";
    var panel = document.createElement("div");
    panel.className = "tds-dropdown-panel";

    shared.sortedEntityEntries(entities, currentIndex).forEach(function (entry) {
      var ent = entry.ent;
      var i = entry.index;
      var isSelected = currentIndex === i;
      var opt = document.createElement("button");
      opt.type = "button";
      opt.className = "bv-option bv-option--entity" + (isSelected ? " bv-option--selected" : "");
      opt.setAttribute("role", "option");
      opt.setAttribute("aria-selected", String(isSelected));
      var optFlag = document.createElement("span");
      optFlag.className = "bv-option__flag";
      optFlag.textContent = shared.entityFlag(ent.country);
      var name = document.createElement("span");
      name.className = "bv-option__label";
      name.textContent = ent.name;
      shared.bindEllipsisTooltip(name, ent.name);
      var otag = document.createElement("span");
      otag.className = toneClass(ent.tone);
      otag.textContent = ent.match;
      opt.appendChild(optFlag);
      opt.appendChild(name);
      opt.appendChild(otag);
      opt.addEventListener("mousedown", function (e) {
        e.preventDefault();
        session = shared.applyTestEntityToSession(session, i);
        renderPage();
      });
      panel.appendChild(opt);
    });
    menu.appendChild(panel);
    root.appendChild(trigger);
    root.appendChild(menu);

    trigger.addEventListener("click", function () {
      root.classList.toggle("tds-select--open");
    });
    document.addEventListener("click", function closeTe(e) {
      if (!root.contains(e.target)) root.classList.remove("tds-select--open");
    });
  }

  function goBackToForm() {
    var current = shared.loadSession();
    if (current) {
      current.view = "form";
      shared.saveSession(current);
    }
    shared.showFormView();
    window.scrollTo(0, 0);
  }

  function wireInteractions() {
    var columns = document.getElementById("bv-result-columns");

    document.querySelector(".bv-result-shell .dv-sidebar-toggle--collapse").addEventListener("click", function () {
      columns.classList.add("dv-columns--sidebar-collapsed");
    });
    document.querySelector(".bv-result-shell .dv-sidebar-toggle--expand").addEventListener("click", function () {
      columns.classList.remove("dv-columns--sidebar-collapsed");
    });

    document.querySelectorAll(".bv-result-shell .dv-collapsible__header").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        btn.parentElement.classList.toggle("dv-collapsible--open", !open);
        var body = btn.parentElement.querySelector(".dv-collapsible__body");
        if (body) body.hidden = open;
      });
    });

    document.getElementById("bv-result-raw-copy").addEventListener("click", function () {
      navigator.clipboard.writeText(document.getElementById("bv-result-raw").textContent).catch(function () {});
    });

    document.getElementById("bv-result-raw-expand").addEventListener("click", function () {
      var pre = document.getElementById("bv-result-raw");
      var expanded = pre.classList.toggle("bv-raw-panel__pre--expanded");
      this.innerHTML = expanded
        ? '<span class="tds-btn__leading-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h10"/></svg></span>Collapse'
        : '<span class="tds-btn__leading-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v10M3 8h10"/></svg></span>Expand all';
    });
  }

  function renderPage() {
    renderResult(shared.buildResultConfig(session));
    window.scrollTo(0, 0);
  }

  function showResult(fromSession) {
    session = fromSession || shared.loadSession();
    if (!session || !session.state) return false;
    session.view = "result";
    shared.saveSession(session);
    shared.showResultView();
    renderPage();
    return true;
  }

  function bootResultPage() {
    var resultView = document.getElementById("bv-result-view");
    if (!resultView) {
      if (shared.loadSession()) {
        window.location.replace("index.html#result");
      } else {
        window.location.replace("index.html");
      }
      return;
    }

    wireInteractions();

    var backBtn = document.getElementById("bv-result-back-btn");
    if (backBtn) backBtn.addEventListener("click", goBackToForm);

    var editBtn = document.getElementById("bv-result-edit");
    if (editBtn) {
      editBtn.addEventListener("click", function (event) {
        event.preventDefault();
        goBackToForm();
      });
    }
  }

  window.BVResult = {
    showResult: showResult,
    goBackToForm: goBackToForm
  };

  document.addEventListener("DOMContentLoaded", bootResultPage);
})();
