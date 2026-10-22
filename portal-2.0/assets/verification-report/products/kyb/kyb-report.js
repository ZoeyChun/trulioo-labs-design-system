/* Verification Report Module — KYB adapter
 * Prefers Demo 3 renderers (D3KybResultTabs / D3KybUboGraph) when loaded so
 * tab content matches Demo 3 exactly. Falls back to local markup otherwise.
 */
(function (global) {
  "use strict";

  var ICON_CHECK =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m5.25 8.25 1.75 1.75 3.75-3.75"/></svg>';
  var ICON_PHONE =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="M3.5 2.5h2l1 3-1.25.75a6.5 6.5 0 0 0 3 3L8.5 8l3 1v2a1 1 0 0 1-1 1A10.5 10.5 0 0 1 2.5 3.5a1 1 0 0 1 1-1z"/></svg>';
  var ICON_MAIL =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2.5" y="4" width="11" height="8" rx="1.25" stroke="currentColor" stroke-width="1.25"/><path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="m3.5 5.25 4.5 3.25L12.5 5.25"/></svg>';
  var ICON_LIST =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"/></svg>';
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

  function demoAsset(ctx, file) {
    var base =
      (ctx && ctx.options && ctx.options.demo3AssetBase) ||
      "../../../demo-3/assets/kyb-resume/";
    return String(base).replace(/\/?$/, "/") + file;
  }

  function sampleData() {
    return {
      name: "Meridian Apex Consulting Ltd.",
      country: "United States",
      cc: "US",
      city: "Wilmington, Delaware",
      addr: "Suite 400, 1 King Street, London EC2V 8AU",
      transactionId: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a",
      transactionIdShort: "8c2f4e7a-19bd-4f0...",
      date: "17 Jun 2026, 2:14 PM",
      verified: true,
      riskLevel: "low",
      riskLabel: "Verified",
      overview: {
        regNumber: "BRN 11876542",
        taxId: "GB341209876",
        status: "Active",
        sizing: "0 employees; $1 authorised / $1 paid-up capital.",
        legalForm: "Private company limited by shares",
        address:
          "Suite 400, 1 King Street, London EC2V 8AU - virtual office at a formations-agent suite; no operational premises.",
        industry: "Registered under SIC 70229",
        industryNote:
          "(management consultancy activities), a catch-all code.\nNo evidence of active trading, clients, or revenue.",
        regDate: "Incorporated 1 Feb 2019 (England & Wales)",
        phone: "+1 280 794 0000",
        email: "info@meridianapexconsulting.co.uk",
        alerts: [
          "Adverse Media: None found",
          "Sanctions: None found",
          "Litigation: None found",
          "Positive Press: None found"
        ]
      },
      ownership: [
        {
          name: "James Morton",
          role: "Shareholder",
          pct: "65%",
          address: "71 Stevenson St, San Francisco",
          type: "person"
        },
        {
          name: "Walter Decosta",
          role: "Shareholder",
          pct: "35%",
          address: "71 Stevenson St, San Francisco",
          type: "person",
          flagged: true,
          screeningLabel: "2 more entities connected"
        }
      ],
      officer: {
        givenName: "MARK",
        surname: "WILLIAMSON",
        fullName: "MARK WILLIAMSON",
        nationalId: "123415",
        dob: "1976-02-12",
        position: "CHIEF OPERATING OFFICER",
        designation: "Not provided",
        type: "Individual",
        status: "Active",
        beginDate: "2017-07-18",
        endDate: "2020-01-12",
        address1: "1 SW Bow Street, Portland, OR 97005-6453"
      },
      report: {
        email: "info@meridianapexconsulting.co.uk",
        legalForm: "Private company limited by shares"
      }
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
      ownershipGraph: data.ownershipGraph || null
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
      meta: [
        {
          label: "Country / Jurisdiction",
          value: data.country || "—",
          flagSrc: data.flagSrc || demoAsset(ctx, "flag-us.svg")
        },
        {
          label: "Transaction ID",
          value: data.transactionIdShort || data.transactionId || "—",
          title: data.transactionId || ""
        },
        { label: "Date", value: data.date || "—" }
      ],
      actions: [
        { id: "details", label: "Details", icon: ICON_LIST },
        { id: "export", label: "Export", icon: ICON_EXPORT }
      ]
    };
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
      '<div class="d3-kyb-overview">' +
      '<div class="d3-kyb-overview__head">' +
      '<h3 class="d3-kyb-overview__title">Company Overview:</h3>' +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--sm d3-kyb-view-raw" data-vrm-action="raw">' +
      '<span class="tds-btn__leading-icon" aria-hidden="true">' +
      ICON_RAW +
      "</span>View Raw Data</button>" +
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
      '<p class="d3-workspace__hint">Load Demo 3 <code>d3-kyb-result-tabs.js</code> and <code>d3-kyb-ubo-graph.js</code> (see preview) for full “' +
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
