/* MVP Match Signals — expand = datasource name + result; legend for match logic.
   Match / Missing / No-match / Derived statuses; Verification stays on the banner rule. */
(function (global) {
  "use strict";

  var ICON_MATCH =
    '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.25"/><path d="M4.6 8.2l2.2 2.2 4.6-4.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_NO =
    '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.25"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var ICON_MISS =
    '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.25"/><path d="M4.75 8h6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var ICON_DERIVED = '<span class="kr-match-derived-glyph">D</span>';

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function signalChip(status) {
    var tone = "negative";
    var label = "No-match";
    var icon = ICON_NO;
    var extra = "";
    if (status === "match") {
      tone = "positive";
      label = "Match";
      icon = ICON_MATCH;
    } else if (status === "missing") {
      tone = "intermediate";
      label = "Missing";
      icon = ICON_MISS;
    } else if (status === "derived") {
      tone = "info";
      label = "Derived";
      icon = ICON_DERIVED;
      extra = " tds-data-table__signals--derived kr-match-signal--derived";
    }
    return (
      '<span class="tds-data-table__signals tds-data-table__signals--' +
      tone +
      extra +
      '"><span class="tds-data-table__signals-icon" aria-hidden="true">' +
      icon +
      "</span>" +
      label +
      "</span>"
    );
  }

  function legendHtml() {
    return (
      '<aside class="kr-match-legend" aria-label="Datasource match statuses">' +
      '<ul class="kr-match-legend__statuses">' +
      '<li class="kr-match-legend__item">' +
      signalChip("match") +
      "</li>" +
      '<li class="kr-match-legend__item">' +
      signalChip("missing") +
      "</li>" +
      '<li class="kr-match-legend__item">' +
      signalChip("no-match") +
      "</li>" +
      '<li class="kr-match-legend__item">' +
      signalChip("derived") +
      "</li>" +
      "</ul>" +
      '<div class="kr-match-legend__concepts">' +
      '<div class="kr-match-legend__concept"><h3 class="kr-match-legend__title">Match</h3>' +
      '<p class="kr-match-legend__copy">Indicates if an input field (Business Name, Registration Number etc.) matched the data returned by a source.</p></div>' +
      '<div class="kr-match-legend__concept"><h3 class="kr-match-legend__title">Missing</h3>' +
      '<p class="kr-match-legend__copy">The source did not return a value for this field, so no comparison could be made.</p></div>' +
      '<div class="kr-match-legend__concept"><h3 class="kr-match-legend__title">No-match</h3>' +
      '<p class="kr-match-legend__copy">The source returned a value, but it did not match the input field.</p></div>' +
      '<div class="kr-match-legend__concept"><h3 class="kr-match-legend__title">Derived</h3>' +
      '<p class="kr-match-legend__copy">Data obtained from other fields — for example, Street name may be derived from Address line 1.</p></div>' +
      "</div></aside>"
    );
  }

  /* Expanded row: flat source list — name left, result right (ref: compact panels). */
  function sourceRowHtml(source) {
    return (
      "<tr>" +
      '<td class="tds-data-table__text-cell">' +
      esc(source.name) +
      "</td>" +
      '<td class="kr-match-source-table__result">' +
      signalChip(source.status) +
      "</td></tr>"
    );
  }

  function detailHtml(sourceRows) {
    var list = Array.isArray(sourceRows) ? sourceRows : [];
    return (
      '<div class="kyb-match-source-panel kr-match-source-panels">' +
      '<table class="tds-data-table kyb-match-source-table"><tbody>' +
      list.map(sourceRowHtml).join("") +
      "</tbody></table></div>"
    );
  }

  /* Ensure metrics reflect enriched row count when data already has sections. */
  function applyToBiz(biz) {
    if (!biz) return biz;
    var out = Object.assign({}, biz);
    var ms = out.matchSignals;
    if (!ms || !Array.isArray(ms.rows)) return out;
    out.matchSignals = Object.assign({}, ms, {
      metrics: Object.assign({}, ms.metrics || {}, {
        fields: ms.rows.length + " fields",
        sources: (ms.metrics && ms.metrics.sources) || "4 of 7 datasources"
      }),
      rows: ms.rows.map(function (row) {
        return Object.assign({}, row, {
          sourceRows: (row.sourceRows || []).map(function (s) {
            return Object.assign({}, s, {
              sections: s.sections
                ? s.sections.map(function (sec) {
                    return Object.assign({}, sec, {
                      fields: (sec.fields || []).slice()
                    });
                  })
                : undefined
            });
          })
        });
      })
    });
    return out;
  }

  function enrichMatchPanel(panel, biz) {
    if (!panel || !biz || !biz.matchSignals || !biz.matchSignals.rows) return;
    var byId = {};
    biz.matchSignals.rows.forEach(function (row) {
      byId[row.id] = row;
    });
    panel.querySelectorAll("[data-d3-match-row]").forEach(function (tr) {
      var id = tr.getAttribute("data-d3-match-row");
      var row = byId[id];
      if (!row) return;
      var resultCell = tr.children[2];
      if (resultCell) resultCell.innerHTML = signalChip(row.status);
      var detail = tr.nextElementSibling;
      if (!detail || !detail.classList.contains("kyb-match-detail-row")) return;
      var cell = detail.querySelector("td");
      if (!cell) return;
      cell.innerHTML = detailHtml(row.sourceRows);
    });
    var body = panel.querySelector(".d3-kyb-match");
    if (body && !body.querySelector(".kr-match-legend")) {
      var banner = body.querySelector(".kyb-match-verification-banner");
      if (banner) banner.insertAdjacentHTML("beforeend", legendHtml());
    }
  }

  global.KybReportMvpMatchSignals = {
    applyToBiz: applyToBiz,
    enrichMatchPanel: enrichMatchPanel,
    detailHtml: detailHtml,
    signalChip: signalChip
  };
})(typeof window !== "undefined" ? window : globalThis);
