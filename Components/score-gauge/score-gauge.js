/**
 * ScoreGauge — vanilla JS port of Components/score-gauge (ScoreGauge.tsx).
 * Score + badge render as HTML overlays (Safari-safe); arc stays in SVG.
 * Renders into elements with data-score, data-risk, data-label (optional data-max, data-show-percent).
 */
(function (global) {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var SVG_W = 227;
  var SVG_H = 180;
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
  var DURATION = 1400;

  var PAL = {
    high: { fill: "#fff1f1", border: "#db2b2b", tag: "#ba151d" },
    medium: { fill: "#fff4db", border: "#d8a13b", tag: "#775516" },
    low: { fill: "#eaf7f0", border: "#6fb38a", tag: "#166534" }
  };

  function polar(deg, r) {
    var a = (deg * Math.PI) / 180;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  }

  function sector(s, e, rO, rI) {
    var sweep = ((e - s) % 360 + 360) % 360;
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

  function render(container) {
    var score = parseFloat(container.getAttribute("data-score") || "") || 0;
    var max = parseFloat(container.getAttribute("data-max") || "") || 100;
    var pal = PAL[container.getAttribute("data-risk") || ""] || PAL.high;
    var label = container.getAttribute("data-label") || "";
    var showPercent = container.getAttribute("data-show-percent") !== "false";
    container.innerHTML = "";

    var root = document.createElement("div");
    root.className = "score-gauge";
    container.appendChild(root);

    var svg = mk(
      "svg",
      {
        class: "score-gauge__chart",
        width: SVG_W,
        height: SVG_H,
        viewBox: "0 0 " + SVG_W + " " + SVG_H,
        overflow: "visible",
        "aria-hidden": "true"
      },
      null
    );
    root.appendChild(svg);

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
        "stroke-linejoin": "round"
      },
      svg
    );
    var pg = mk(
      "polygon",
      {
        points: "0,-7 7,5.5 -7,5.5",
        fill: POINTER,
        "stroke-linejoin": "round"
      },
      svg
    );

    var center = document.createElement("div");
    center.className = "score-gauge__center";

    var scoreRow = document.createElement("div");
    scoreRow.className = "score-gauge__score";
    scoreRow.setAttribute("aria-hidden", "true");
    var scoreValue = document.createElement("span");
    scoreValue.className = "score-gauge__value";
    scoreValue.textContent = "0";
    scoreRow.appendChild(scoreValue);
    if (showPercent) {
      var scorePercent = document.createElement("span");
      scorePercent.className = "score-gauge__percent";
      scorePercent.textContent = "%";
      scoreRow.appendChild(scorePercent);
    }
    center.appendChild(scoreRow);

    var badge = document.createElement("span");
    badge.className = "score-gauge__badge";
    badge.textContent = label;
    badge.style.backgroundColor = pal.fill;
    badge.style.borderColor = pal.border;
    badge.style.color = pal.tag;
    center.appendChild(badge);
    root.appendChild(center);

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
      scoreValue.textContent = String(Math.round(v));
      if (raw < 1) requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
  }

  function renderAll(root) {
    (root || document).querySelectorAll(".dv-di-gauge[data-score], .score-gauge-host[data-score]").forEach(render);
  }

  global.ScoreGauge = {
    render: render,
    renderAll: renderAll
  };
})(typeof window !== "undefined" ? window : this);
