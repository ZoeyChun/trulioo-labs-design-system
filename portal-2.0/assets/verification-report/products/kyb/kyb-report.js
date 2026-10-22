/* Verification Report Module — KYB adapter
 * Prefers vendored renderers (D3KybResultTabs / D3KybUboGraph) when loaded.
 * Sample payload: products/kyb/data/kyb-sample-data.js
 * Media: assets/kyb/  ·  Scripts/CSS: vendor/
 */
(function (global) {
  "use strict";

  var ICON_CHECK =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m5.25 8.25 1.75 1.75 3.75-3.75"/></svg>';
  var ICON_PHONE =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="M3.5 2.5h2l1 3-1.25.75a6.5 6.5 0 0 0 3 3L8.5 8l3 1v2a1 1 0 0 1-1 1A10.5 10.5 0 0 1 2.5 3.5a1 1 0 0 1 1-1z"/></svg>';
  var ICON_MAIL =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2.5" y="4" width="11" height="8" rx="1.25" stroke="currentColor" stroke-width="1.25"/><path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="m3.5 5.25 4.5 3.25L12.5 5.25"/></svg>';
  var ICON_EXPORT =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 3v7m0 0 2.75-2.75M8 10 5.25 7.25M3 11.5V12a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 12v-.5"/></svg>';
  var ICON_RAW =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m5.5 4.5-3 3.5 3 3.5M10.5 4.5l3 3.5-3 3.5"/></svg>';

  function esc(value) {
    return global.VerificationReport && global.VerificationReport.esc
      ? global.VerificationReport.esc(value)
      : String(value == null ? "" : value)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
  }

  /* Resolve module root from this script URL → …/verification-report/ */
  var MODULE_BASE = (function () {
    var scripts = document.getElementsByTagName("script");
    var i;
    for (i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      var m = src.match(/^(.*\/verification-report\/)products\/kyb\/kyb-report\.js(?:\?.*)?$/);
      if (m) return m[1];
    }
    return "";
  })();

  function assetBase(ctx) {
    var opts = (ctx && ctx.options) || {};
    return (
      opts.assetBase ||
      opts.demo3AssetBase ||
      (MODULE_BASE ? MODULE_BASE + "assets/kyb/" : "./assets/kyb/")
    );
  }

  function demoAsset(ctx, file) {
    return String(assetBase(ctx)).replace(/\/?$/, "/") + file;
  }

  function sampleData() {
    var pack = global.VerificationReportKybData;
    if (pack && pack.sample) {
      return JSON.parse(JSON.stringify(pack.sample));
    }
    return {
      name: "Meridian Apex Consulting Ltd.",
      country: "United States",
      cc: "US",
      verified: true,
      riskLabel: "Verified"
    };
  }

  /** Shape Demo 3 tab/graph helpers expect. */
  function toBiz(data) {
    data = data || {};
    var overview = data.overview || {};
    return {
      name: data.name,
      country: data.country,
      cc: data.cc || "US",
      city: data.city || "Wilmington, Delaware",
      addr: data.addr || overview.address || "",
      riskLevel: data.riskLevel || (data.verified === false ? "high" : "low"),
      ownership: data.ownership || [],
      officer: data.officer || null,
      report: Object.assign(
        {
          email: overview.email,
          legalForm: overview.legalForm,
          phone: overview.phone,
          regNumber: overview.regNumber,
          taxId: overview.taxId,
          status: overview.status
        },
        data.report || {}
      ),
      matchSignals: data.matchSignals || null,
      ownershipGraph: data.ownershipGraph || null,
      ownershipTableRows: data.ownershipTableRows || null
    };
  }

  function buildView(data, options) {
    var ctx = { options: options || {} };
    var verified = data.verified !== false;
    return {
      title: data.name || "Business",
      tags: [
        {
          label: data.riskLabel || (verified ? "Verified" : "Not Verified"),
          tone: verified ? "positive" : "negative",
          icon: ICON_CHECK + " "
        }
      ],
      /* Country / Transaction ID / Date render in Overview “Details” section. */
      meta: [],
      actions: [
        { id: "raw", label: "Raw Data", icon: ICON_RAW },
        { id: "export", label: "Export", icon: ICON_EXPORT }
      ]
    };
  }

  function detailsSectionHtml(data, ctx) {
    var flagSrc = data.flagSrc || demoAsset(ctx, "flag-us.svg");
    var txId = data.transactionId || data.transactionIdShort || "—";
    return (
      '<section class="d3-kyb-details" aria-label="Details">' +
      '<h3 class="d3-kyb-overview__title">Details</h3>' +
      '<dl class="d3-kyb-details__fields">' +
      "<div>" +
      "<dt>Country / Jurisdiction</dt>" +
      '<dd title="' +
      esc(data.country || "") +
      '">' +
      esc(data.country || "—") +
      '<img class="d3-workspace__flag" src="' +
      esc(flagSrc) +
      '" alt="" width="18" height="12">' +
      "</dd></div>" +
      "<div>" +
      "<dt>Transaction ID</dt>" +
      '<dd title="' +
      esc(txId) +
      '">' +
      esc(txId) +
      "</dd></div>" +
      "<div>" +
      "<dt>Date</dt>" +
      "<dd>" +
      esc(data.date || "—") +
      "</dd></div>" +
      "</dl></section>"
    );
  }

  function getTabs() {
    return [
      { id: "overview", label: "Overview" },
      { id: "ownership", label: "Owners & UBOs" },
      { id: "signals", label: "Match Signals & Sources" },
      { id: "additional", label: "Additional Data" },
      { id: "web", label: "Web & Social Insights" }
    ];
  }

  function formalBusinessName(name) {
    var formal = String(name || "").replace(/\.\s*$/, "");
    return formal.replace(/\binc$/i, "Incorporated").replace(/\bcorp$/i, "Corporation");
  }

  function emailDomainFromBiz(biz) {
    var email = (biz.report && biz.report.email) || biz.email || "";
    var at = email.indexOf("@");
    if (at > 0) return email.slice(at + 1);
    var slug = String(biz.name || "business")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 28);
    return (slug || "business") + ".com";
  }

  /** Demo 3–shaped raw JSON for the Raw Data dialog. */
  function buildRawJson(data) {
    var biz = toBiz(data);
    var name = biz.name || "Business";
    var registered = formalBusinessName(name);
    var overview = (data && data.overview) || {};
    var phone =
      (biz.report && biz.report.phone) ||
      overview.phone ||
      biz.phone ||
      "+1 302 555 0000";
    var email =
      (biz.report && biz.report.email) ||
      overview.email ||
      biz.email ||
      "info@" + emailDomainFromBiz(biz);
    var block =
      "{\n" +
      '  "StandardizedBusinessNames": { "StandardizedBusinessName": [\n' +
      '    { "Name": ' +
      JSON.stringify(name) +
      ', "Type": "Input Business Name", "UsedForMatching": true },\n' +
      '    { "Name": ' +
      JSON.stringify(registered) +
      ', "Type": "Returned Registered Name", "UsedForMatching": true }\n' +
      "  ]},\n" +
      '  "StandardizedCommunication": { "StandardizedCommunication": [\n' +
      '    { "Value": ' +
      JSON.stringify(phone) +
      ', "Type": "Telephone" },\n' +
      '    { "Value": ' +
      JSON.stringify(email) +
      ', "Type": "Primary business email" }\n' +
      "  ]}\n" +
      "}";
    return [block, block, block, block, block].join("\n\n");
  }

  function renderOverview(panel, data, ctx) {
    var o = data.overview || {};
    var mapSrc = data.mapSrc || demoAsset(ctx, "map.png");
    var photoSrc = data.buildingSrc || demoAsset(ctx, "building.png");
    var alerts = (o.alerts || [])
      .map(function (label) {
        return (
          '<span class="d3-kyb-chip">' + ICON_CHECK + " " + esc(label) + "</span>"
        );
      })
      .join("");

    panel.innerHTML =
      '<div class="d3-kyb-hero" aria-hidden="true">' +
      '<img class="d3-kyb-hero__map" src="' +
      esc(mapSrc) +
      '" alt="" width="769" height="182">' +
      '<div class="d3-kyb-hero__veil"></div>' +
      '<img class="d3-kyb-hero__photo" src="' +
      esc(photoSrc) +
      '" alt="" width="238" height="158">' +
      "</div>" +
      detailsSectionHtml(data, ctx) +
      '<div class="d3-kyb-overview">' +
      '<div class="d3-kyb-overview__head">' +
      '<h3 class="d3-kyb-overview__title">Company Overview:</h3>' +
      "</div>" +
      '<div class="d3-kyb-overview__rows">' +
      '<div class="d3-kyb-overview__row">' +
      "<div><p class=\"d3-kyb-overview__label\">Registration number</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(o.regNumber || "—") +
      "</p></div>" +
      "<div><p class=\"d3-kyb-overview__label\">TAX ID</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(o.taxId || "—") +
      "</p></div></div>" +
      '<div class="d3-kyb-overview__row">' +
      "<div><p class=\"d3-kyb-overview__label\">Registration status</p>" +
      '<p class="d3-kyb-overview__value d3-kyb-overview__value--ok">' +
      ICON_CHECK +
      " " +
      esc(o.status || "—") +
      "</p></div>" +
      "<div><p class=\"d3-kyb-overview__label\">Sizing</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(o.sizing || "—") +
      "</p></div></div>" +
      '<div class="d3-kyb-overview__row">' +
      "<div><p class=\"d3-kyb-overview__label\">Legal form</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(o.legalForm || "—") +
      "</p></div>" +
      "<div><p class=\"d3-kyb-overview__label\">Business address</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(o.address || "—") +
      "</p></div></div>" +
      '<div class="d3-kyb-overview__row">' +
      "<div><p class=\"d3-kyb-overview__label\">Operations and industry</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(o.industry || "—") +
      "</p>" +
      (o.industryNote
        ? '<p class="d3-kyb-overview__note">' + esc(o.industryNote) + "</p>"
        : "") +
      "</div>" +
      "<div><p class=\"d3-kyb-overview__label\">Registration date</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(o.regDate || "—") +
      "</p></div></div></div></div>" +
      '<hr class="d3-kyb-resume__rule">' +
      '<div class="d3-kyb-lower">' +
      '<section class="d3-kyb-comms">' +
      '<h3 class="d3-kyb-overview__title">Communication Records:</h3>' +
      '<div class="d3-kyb-comms__fields">' +
      "<div><p class=\"d3-kyb-overview__label\">Telephone</p>" +
      '<p class="d3-kyb-overview__value d3-kyb-overview__value--contact">' +
      ICON_PHONE +
      " " +
      esc(o.phone || "—") +
      "</p></div>" +
      "<div><p class=\"d3-kyb-overview__label\">Email</p>" +
      '<p class="d3-kyb-overview__value d3-kyb-overview__value--contact">' +
      ICON_MAIL +
      ' <a class="d3-kyb-link" href="mailto:' +
      esc(o.email || "") +
      '">' +
      esc(o.email || "—") +
      "</a></p></div></div></section>" +
      '<section class="d3-kyb-alerts">' +
      '<h3 class="d3-kyb-overview__title">News &amp; Alerts:</h3>' +
      '<div class="d3-kyb-alerts__chips">' +
      alerts +
      "</div></section></div>";
  }

  function renderPanel(panel, tabId, data, ctx) {
    var biz = toBiz(data);
    var Tabs = global.D3KybResultTabs;
    var Ubo = global.D3KybUboGraph;

    if (tabId === "overview") {
      return renderOverview(panel, data, ctx);
    }

    if (tabId === "ownership" && Ubo && typeof Ubo.mountInto === "function") {
      Ubo.mountInto(panel, biz);
      return;
    }

    if (tabId === "signals" && Tabs && typeof Tabs.renderMatchSignalsPanel === "function") {
      Tabs.renderMatchSignalsPanel(panel, biz);
      return;
    }

    if (tabId === "additional" && Tabs && typeof Tabs.renderAdditionalPanel === "function") {
      Tabs.renderAdditionalPanel(panel, biz);
      return;
    }

    if (tabId === "web" && Tabs && typeof Tabs.renderWebPanel === "function") {
      Tabs.renderWebPanel(panel, biz);
      return;
    }

    /* Fallback if Demo 3 scripts were not loaded */
    panel.innerHTML =
      '<p class="d3-workspace__hint">Load report <code>vendor/js/d3-kyb-result-tabs.js</code> and <code>d3-kyb-ubo-graph.js</code> (see preview) for full “' +
      esc(tabId) +
      '” content.</p>';
  }

  function afterMount(root, data, ctx) {
    /* Re-render non-overview tabs once Demo 3 helpers exist (scripts may load after). */
    var biz = toBiz(data);
    var Tabs = global.D3KybResultTabs;
    if (Tabs && typeof Tabs.renderAll === "function" && root) {
      /* renderAll expects resume card with data-d3-kyb-panel nodes */
      var card = root.querySelector("[data-vrm-report]") || root;
      /* Only fill panels that use result-tabs helpers; ownership uses UboGraph. */
      var web = card.querySelector('[data-d3-kyb-panel="web"]');
      var signals = card.querySelector('[data-d3-kyb-panel="signals"]');
      var additional = card.querySelector('[data-d3-kyb-panel="additional"]');
      if (web) Tabs.renderWebPanel(web, biz);
      if (signals) Tabs.renderMatchSignalsPanel(signals, biz);
      if (additional) Tabs.renderAdditionalPanel(additional, biz);
    }
    var Ubo = global.D3KybUboGraph;
    var ownership = root && root.querySelector('[data-d3-kyb-panel="ownership"]');
    if (Ubo && ownership && typeof Ubo.mountInto === "function") {
      Ubo.mountInto(ownership, biz);
    }
  }

  var adapter = {
    sampleData: sampleData,
    getTabs: getTabs,
    buildView: buildView,
    buildRawJson: buildRawJson,
    renderPanel: renderPanel,
    afterMount: afterMount,
    toBiz: toBiz
  };

  if (global.VerificationReport && global.VerificationReport.register) {
    global.VerificationReport.register("kyb", adapter);
  } else {
    global.VrmKybAdapter = adapter;
  }
})(typeof window !== "undefined" ? window : this);
