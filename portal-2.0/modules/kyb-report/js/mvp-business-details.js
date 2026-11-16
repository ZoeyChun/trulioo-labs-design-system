/* MVP Business Details tab — map hero + company overview + additional data. */
(function (global) {
  "use strict";

  var TX_ID = "8c244e7a-19bd-4f02-a6c1-77d4e2915b3a";

  var ICON_CHECK =
    '<svg class="kr-bd-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.25"/>' +
    '<path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="m5.25 8.1 1.85 1.85 3.65-3.7"/></svg>';

  var ICON_PHONE =
    '<svg class="kr-bd-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="M3.5 2.5h2l1 3-1.25.75a6.5 6.5 0 0 0 3 3L8.5 8l3 1v2a1 1 0 0 1-1 1A10.5 10.5 0 0 1 2.5 3.5a1 1 0 0 1 1-1z"/></svg>';

  var ICON_MAIL =
    '<svg class="kr-bd-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<rect x="2.5" y="4" width="11" height="8" rx="1.25" stroke="currentColor" stroke-width="1.25"/>' +
    '<path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="m3.5 5.25 4.5 3.25L12.5 5.25"/></svg>';

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function assetUrl(api, file) {
    var base = (api && api.assetBase) || "";
    if (base && base.slice(-1) !== "/") base += "/";
    return base + file;
  }

  function flagClass(cc) {
    var code = String(cc || "US").toLowerCase();
    return "fi fi-" + code;
  }

  function formatDate() {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(new Date());
    } catch (e) {
      return "13 Nov 2026, 14:35";
    }
  }

  function field(label, valueHtml) {
    return (
      '<div class="tds-data-field">' +
      '<p class="tds-data-field__label">' +
      esc(label) +
      '</p><div class="tds-data-field__content"><div class="tds-data-field__value-row">' +
      valueHtml +
      "</div></div></div>"
    );
  }

  function valueText(text) {
    return '<p class="tds-data-field__value">' + esc(text) + "</p>";
  }

  function additionalSection(title, fields) {
    var grid = fields
      .map(function (f) {
        return field(f.label, valueText(f.value));
      })
      .join("");
    return (
      '<section class="kyb-subsection">' +
      '<div class="kyb-subsection__head">' +
      '<h3 class="kyb-subsection-title">' +
      esc(title) +
      '</h3><hr class="kyb-section-divider" /></div>' +
      '<div class="kyb-field-grid kyb-field-grid--3">' +
      grid +
      "</div></section>"
    );
  }

  function overviewBlock(biz) {
    var r = biz.report || {};
    return (
      '<div class="d3-kyb-overview">' +
      '<div class="d3-kyb-overview__head">' +
      '<h3 class="d3-kyb-overview__title">Company Overview:</h3></div>' +
      '<div class="d3-kyb-overview__rows">' +
      '<div class="d3-kyb-overview__row">' +
      "<div><p class=\"d3-kyb-overview__label\">Registration number</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(r.regNumber || biz.reg || "—") +
      "</p></div>" +
      "<div><p class=\"d3-kyb-overview__label\">Tax ID</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(r.taxId || "—") +
      "</p></div></div>" +
      '<div class="d3-kyb-overview__row">' +
      "<div><p class=\"d3-kyb-overview__label\">Registration status</p>" +
      '<p class="d3-kyb-overview__value d3-kyb-overview__value--ok">' +
      ICON_CHECK +
      " " +
      esc(biz.status || "Active") +
      "</p></div>" +
      "<div><p class=\"d3-kyb-overview__label\">Sizing</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(r.sizing || "—") +
      "</p></div></div>" +
      '<div class="d3-kyb-overview__row">' +
      "<div><p class=\"d3-kyb-overview__label\">Legal form</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(r.legalForm || "—") +
      "</p></div>" +
      "<div><p class=\"d3-kyb-overview__label\">Business address</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(r.address || biz.addr || "—") +
      "</p></div></div>" +
      '<div class="d3-kyb-overview__row">' +
      "<div><p class=\"d3-kyb-overview__label\">Operations and industry</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(r.industry || "—") +
      "</p>" +
      (r.industryNote
        ? '<p class="d3-kyb-overview__note">' + esc(r.industryNote) + "</p>"
        : "") +
      "</div>" +
      "<div><p class=\"d3-kyb-overview__label\">Registration date</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(r.regDate || "—") +
      "</p></div></div></div></div>"
    );
  }

  function detailsBlock(biz) {
    var cc = String(biz.cc || "US").toLowerCase();
    return (
      '<section class="d3-kyb-details" aria-label="Details">' +
      '<h3 class="d3-kyb-overview__title">Details</h3>' +
      '<dl class="d3-kyb-details__fields">' +
      "<div><dt>Country / Jurisdiction</dt><dd>" +
      esc(biz.country || "United States") +
      ' <span class="' +
      flagClass(cc) +
      ' d3-workspace__flag" aria-hidden="true"></span></dd></div>' +
      "<div><dt>Transaction ID</dt><dd title=\"" +
      esc(TX_ID) +
      '">' +
      esc(TX_ID) +
      "</dd></div>" +
      "<div><dt>Date</dt><dd>" +
      esc(formatDate()) +
      "</dd></div></dl></section>"
    );
  }

  function commsBlock(biz) {
    var r = biz.report || {};
    var email = r.email || "";
    return (
      '<div class="d3-kyb-lower">' +
      '<section class="d3-kyb-comms">' +
      '<h3 class="d3-kyb-overview__title">Communication Records:</h3>' +
      '<div class="d3-kyb-comms__fields">' +
      "<div><p class=\"d3-kyb-overview__label\">Telephone</p>" +
      '<p class="d3-kyb-overview__value d3-kyb-overview__value--contact">' +
      ICON_PHONE +
      " " +
      esc(r.phone || "—") +
      "</p></div>" +
      "<div><p class=\"d3-kyb-overview__label\">Email</p>" +
      '<p class="d3-kyb-overview__value d3-kyb-overview__value--contact">' +
      ICON_MAIL +
      ' <a class="d3-kyb-link" href="mailto:' +
      esc(email) +
      '">' +
      esc(email || "—") +
      "</a></p></div></div></section></div>"
    );
  }

  function heroBlock(api) {
    return (
      '<div class="d3-kyb-hero" aria-hidden="true">' +
      '<img class="d3-kyb-hero__map" src="' +
      esc(assetUrl(api, "map.png")) +
      '" alt="" width="769" height="182">' +
      '<div class="d3-kyb-hero__veil"></div>' +
      '<img class="d3-kyb-hero__photo" src="' +
      esc(assetUrl(api, "building.png")) +
      '" alt="" width="238" height="158">' +
      '<div class="d3-kyb-hero__pin">' +
      '<img class="d3-kyb-hero__halo" src="' +
      esc(assetUrl(api, "pin-halo.svg")) +
      '" alt="" width="37" height="37">' +
      '<img class="d3-kyb-hero__dot" src="' +
      esc(assetUrl(api, "pin.svg")) +
      '" alt="" width="12" height="12"></div></div>'
    );
  }

  function additionalHtml(biz) {
    if (
      global.D3KybResultTabs &&
      typeof global.D3KybResultTabs.renderAdditionalPanel === "function"
    ) {
      var host = document.createElement("div");
      global.D3KybResultTabs.renderAdditionalPanel(host, biz);
      var body = host.querySelector(".kyb-additional-data");
      if (body) return body.innerHTML;
    }
    /* Fallback if vendor helper is unavailable. */
    return (
      additionalSection("Business profile", [
        { label: "Business status", value: biz.status || "Active" },
        { label: "Business legal name", value: biz.name || "—" },
        {
          label: "Legal form",
          value: (biz.report && biz.report.legalForm) || "—"
        },
        {
          label: "Reference ID",
          value: (biz.report && biz.report.regNumber) || biz.reg || "—"
        }
      ])
    );
  }

  function render(panel, biz, api) {
    if (!panel || !biz) return;
    panel.innerHTML =
      '<div class="kr-business-details d3-kyb-tab-body">' +
      heroBlock(api) +
      detailsBlock(biz) +
      overviewBlock(biz) +
      '<hr class="d3-kyb-resume__rule">' +
      commsBlock(biz) +
      '<hr class="d3-kyb-resume__rule">' +
      '<div class="kyb-additional-data kr-business-details__extra">' +
      '<h3 class="kr-business-details__extra-title d3-kyb-overview__title">Additional Data:</h3>' +
      additionalHtml(biz) +
      "</div></div>";
  }

  global.KybReportMvpBusinessDetails = {
    render: render
  };
})(typeof window !== "undefined" ? window : globalThis);
