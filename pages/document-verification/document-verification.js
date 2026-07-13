/* ============================================================
   Document Verification — demo interactions (reference only)

   - Tab bar: click to move the active state
   - Collapsible sections: click header to expand/collapse

   No real data or navigation. Wire up in your own app.
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* Tabs — switch active state + show the matching panel */
    var tabs = document.querySelectorAll(".dv-tab");
    var panels = document.querySelectorAll(".dv-tabpanel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("dv-tab--active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("dv-tab--active");
        tab.setAttribute("aria-selected", "true");

        var target = tab.getAttribute("data-tab");
        panels.forEach(function (p) {
          p.hidden = (p.getAttribute("data-tab") !== target);
        });
      });
    });

    /* Collapsible sections (nested-safe: toggles the nearest section
       and its own body — the first .dv-collapsible__body descendant) */
    var headers = document.querySelectorAll(".dv-collapsible__header");
    headers.forEach(function (header) {
      header.addEventListener("click", function () {
        var section = header.closest(".dv-collapsible");
        var body = section.querySelector(".dv-collapsible__body");
        var isOpen = section.classList.toggle("dv-collapsible--open");
        header.setAttribute("aria-expanded", String(isOpen));
        if (body) body.hidden = !isOpen;
      });
    });

    /* Network Insights — View / Hide transactions toggle */
    var PLUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v10M3 8h10"/></svg>';
    var MINUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h10"/></svg>';
    document.querySelectorAll(".dv-ni2-txntoggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var acc = btn.closest(".dv-acc");
        var table = acc.querySelector(".dv-txntable");
        var willShow = table.hidden;
        table.hidden = !willShow;
        btn.setAttribute("aria-expanded", String(willShow));
        btn.querySelector(".dv-ni2-txntoggle__label").textContent = willShow ? "Hide transactions" : "View transactions";
        btn.querySelector(".dv-ni2-txntoggle__icon").innerHTML = willShow ? MINUS : PLUS;
      });
    });

    /* Long indicator lists: show top 5, then "+N more <label>" to reveal the rest */
    var MOREPLUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>';
    var MOREMINUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10"/></svg>';
    document.querySelectorAll(".dv-group .dv-table").forEach(function (table) {
      var rows = table.querySelectorAll(".dv-table__row:not(.dv-table__head)");
      if (rows.length <= 5) return;
      var lblEl = table.closest(".dv-group").querySelector(".dv-group__label");
      var label = (lblEl ? lblEl.textContent : "").toLowerCase();
      var hiddenN = rows.length - 5;
      function apply(open) { for (var i = 5; i < rows.length; i++) rows[i].hidden = !open; }
      apply(false);
      var wrap = document.createElement("div");
      wrap.className = "dv-more";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tds-btn tds-btn--invisible tds-btn--sm";
      function setLabel(open) {
        btn.innerHTML = '<span class="tds-btn__leading-icon">' + (open ? MOREMINUS : MOREPLUS) + "</span>" +
          (open ? "Show less" : (hiddenN + " more " + label));
      }
      var open = false;
      setLabel(false);
      btn.addEventListener("click", function () { open = !open; apply(open); setLabel(open); });
      wrap.appendChild(btn);
      table.parentNode.insertBefore(wrap, table.nextSibling);
    });

  });
})();

/* ============================================================
   Score gauge (Device Intelligence)
   Ported from the repo component: Components/score-gauge
   Renders an animated risk gauge into .dv-di-gauge[data-score].
   ============================================================ */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var CX = 113.526, CY = 121.53, R_OUTER = 95.53, R_INNER = 76.43, R_DARK = R_OUTER - 5, POINTER_R = 73, START = 160, SWEEP = 220;
  var TRACK = "#f4f6f4", POINTER = "#004c45", NUMBER = "#172d2d", DURATION = 1400;
  var PAL = {
    high:   { fill: "#fff1f1", border: "#db2b2b", tag: "#ba151d" },
    medium: { fill: "#fff4db", border: "#d8a13b", tag: "#775516" },
    low:    { fill: "#eaf7f0", border: "#6fb38a", tag: "#166534" }
  };
  function polar(deg, r) { var a = deg * Math.PI / 180; return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; }
  function sector(s, e, rO, rI) {
    var sweep = ((e - s) + 360) % 360; if (sweep < 0.05) return "";
    var lg = sweep > 180 ? 1 : 0;
    var o1 = polar(s, rO), o2 = polar(e, rO), i2 = polar(e, rI), i1 = polar(s, rI);
    return "M" + o1[0] + " " + o1[1] + " A" + rO + " " + rO + " 0 " + lg + " 1 " + o2[0] + " " + o2[1] +
           " L" + i2[0] + " " + i2[1] + " A" + rI + " " + rI + " 0 " + lg + " 0 " + i1[0] + " " + i1[1] + " Z";
  }
  function mk(tag, attrs, parent) { var el = document.createElementNS(NS, tag); for (var k in attrs) el.setAttribute(k, attrs[k]); if (parent) parent.appendChild(el); return el; }
  function render(container) {
    var score = parseFloat(container.getAttribute("data-score")) || 0;
    var pal = PAL[container.getAttribute("data-risk")] || PAL.high;
    var label = container.getAttribute("data-label") || "";
    container.innerHTML = "";
    var svg = mk("svg", { width: 227, height: 180, viewBox: "0 0 227 180", overflow: "visible" }, container);
    mk("path", { d: sector(START, START + SWEEP, R_OUTER, R_INNER), fill: TRACK }, svg);
    var fl = mk("path", { fill: pal.fill, d: "" }, svg), fd = mk("path", { fill: pal.border, d: "" }, svg);
    var pw = mk("polygon", { points: "0,-12 8.5,6.5 -8.5,6.5", fill: "#fff", stroke: "#fff", "stroke-width": 4, "stroke-linejoin": "round" }, svg);
    var pg = mk("polygon", { points: "0,-7 7,5.5 -7,5.5", fill: POINTER, "stroke-linejoin": "round" }, svg);
    var txt = mk("text", { x: CX, y: 101, "text-anchor": "middle", "dominant-baseline": "middle",
      style: "font-size:64px;font-weight:400;fill:" + NUMBER + ";font-family:inherit;" }, svg);
    txt.textContent = "0";
    var fo = mk("foreignObject", { x: CX - 70, y: 125, width: 140, height: 30, overflow: "visible" }, svg);
    var wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;";
    var badge = document.createElement("span");
    badge.textContent = label;
    badge.style.cssText = "display:inline-flex;align-items:center;background:" + pal.fill + ";border:1px solid " + pal.border +
      ";color:" + pal.tag + ";border-radius:9999px;padding:4px 8px;font-size:12px;font-weight:510;white-space:nowrap;line-height:16px;font-family:inherit;";
    wrap.appendChild(badge); fo.appendChild(wrap);
    var raf, t0 = null;
    function anim(now) {
      if (t0 == null) t0 = now;
      var raw = Math.min((now - t0) / DURATION, 1);
      var v = score * (1 - Math.pow(1 - raw, 4));
      if (v > 0.3) {
        var end = START + (v / 100) * SWEEP;
        fl.setAttribute("d", sector(START, end, R_OUTER, R_INNER));
        fd.setAttribute("d", sector(START, end, R_OUTER, R_DARK));
        var p = polar(end, POINTER_R), tf = "translate(" + p[0] + "," + p[1] + ") rotate(" + (end + 90) + ")";
        pw.setAttribute("transform", tf); pg.setAttribute("transform", tf);
        pw.style.display = ""; pg.style.display = "";
      } else { fl.setAttribute("d", ""); fd.setAttribute("d", ""); pw.style.display = "none"; pg.style.display = "none"; }
      txt.textContent = Math.round(v);
      if (raw < 1) raf = requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dv-di-gauge[data-score]").forEach(render);
  });
})();
