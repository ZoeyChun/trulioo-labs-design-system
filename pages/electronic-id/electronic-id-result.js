/* ============================================================
   Electronic ID — result view
   DV-aligned layout with country-keyed mock scenarios.
   ============================================================ */
(function (global) {
  "use strict";

  function byId(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function setText(el, text) { if (el) el.textContent = text; }
  function setHtml(el, html) { if (el) el.innerHTML = html; }

  var ICON_RISK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 2.2l6 10.6H2L8 2.2z"/><path d="M8 6.4v3M8 11.1v.4"/></svg>';
  var ICON_NORISK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.4 8.2l1.8 1.8 3.4-3.8"/></svg>';
  var ICON_NOTRUN = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8h5"/></svg>';
  var ICON_CHEVRON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg>';
  var ICON_PLUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>';
  var ICON_SIGNAL_VERIFIED = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8.5 7 10l3.5-4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_SIGNAL_DECLINED = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4"/></svg>';
  var ICON_SIGNAL_REVIEW = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v4M8 11h.01"/></svg>';

  function kindToFilterTone(kind) {
    if (kind === "declined") return "negative";
    if (kind === "review") return "intermediate";
    return "positive";
  }

  function signalResultIcon(kind) {
    if (kind === "declined") return ICON_SIGNAL_DECLINED;
    if (kind === "review") return ICON_SIGNAL_REVIEW;
    return ICON_SIGNAL_VERIFIED;
  }

  function signalResultMod(kind) {
    if (kind === "declined") return "negative";
    if (kind === "review") return "intermediate";
    return "positive";
  }

  function detailValue(details, label) {
    for (var i = 0; i < details.length; i++) {
      if (details[i].label === label) return details[i].value;
    }
    return "";
  }

  function emailFromName(name) {
    var parts = name.toLowerCase().replace(/[^a-z\s]/g, "").trim().split(/\s+/);
    if (parts.length < 2) return parts[0] + "@example.com";
    return parts[0] + "." + parts[parts.length - 1] + "@example.com";
  }

  function dataReturnedForSignal(label, scenario, kind) {
    if (kind === "declined") return "Not returned";
    if (kind === "review") return "Partial match";
    var name = detailValue(scenario.clientDetails, "Full name");
    var dob = detailValue(scenario.clientDetails, "Date of birth");
    var address = detailValue(scenario.clientDetails, "Address");
    switch (label) {
      case "Name": return name;
      case "Address": return address;
      case "Date of Birth": return dob;
      case "Gender": return "Female";
      case "Email Address": return emailFromName(name);
      case "Phone Number": return "+31 6 1234 5678";
      case "National ID": return "AB1234567";
      case "Document Number": return "DOC-8847291";
      case "Document Expiry": return "2031/08/15";
      case "Nationality": return scenario.personName.split(" ").pop() || "—";
      case "Postal Code": return address.match(/\b\d{4,6}\b/) ? address.match(/\b\d{4,6}\b/)[0] : "1015 CJ";
      case "City": return address.split(",").slice(-2, -1)[0] ? address.split(",").slice(-2, -1)[0].trim() : "Amsterdam";
      case "Region": return "—";
      case "Country of Residence": return address.split(",").pop() ? address.split(",").pop().trim() : "—";
      case "Provider Match": return "Match";
      case "Consent Timestamp": return "17 Jun 2026, 2:14 PM";
      default: return kind === "review" ? "Partial match" : "Verified";
    }
  }

  var BASE_SIGNALS = [
    "Name", "Address", "Gender", "Date of Birth", "Email Address", "Phone Number",
    "National ID", "Document Number", "Document Expiry", "Nationality",
    "Postal Code", "City", "Region", "Country of Residence", "Provider Match", "Consent Timestamp"
  ];

  var COUNTRY_SCENARIOS = {
    nl: {
      overallStatus: "Verified",
      overallTone: "positive",
      personName: "Sophie van der Berg",
      transactionId: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a",
      truAiTitle: "Verification complete",
      truAiSummary: "Sophie van der Berg\u2019s electronic ID has been verified through iDIN. All identity signals passed with no additional steps required.",
      clientDetails: [
        { label: "Full name", value: "Sophie van der Berg" },
        { label: "Date of birth", value: "1991/07/14" },
        { label: "Address", value: "Keizersgracht 123, 1015 CJ Amsterdam" }
      ],
      signalCount: 14,
      declinedCount: 0,
      verificationRate: 100,
      diRisk: "low",
      diScore: 2,
      diLabel: "Low Risk"
    },
    in: {
      overallStatus: "Declined",
      overallTone: "negative",
      personName: "Arjun Mehta",
      transactionId: "f3a91c02-6d44-4b8e-9f12-0c8e5d4a7210",
      truAiTitle: "Verification declined",
      truAiSummary: "Arjun Mehta\u2019s electronic ID verification through DigiLocker returned multiple declined signals. Manual review is recommended before proceeding.",
      clientDetails: [
        { label: "Full name", value: "Arjun Mehta" },
        { label: "Date of birth", value: "1988/11/03" },
        { label: "Address", value: "42 MG Road, Bengaluru, Karnataka 560001" }
      ],
      signalCount: 16,
      declinedCount: 7,
      verificationRate: 44,
      diRisk: "high",
      diScore: 8,
      diLabel: "High Risk"
    },
    be: {
      overallStatus: "Verified",
      overallTone: "positive",
      personName: "Lucas Janssens",
      transactionId: "b7e4a1d0-3c92-4f6a-8e55-2d1f9a0b6c78",
      truAiTitle: "Verification complete",
      truAiSummary: "Lucas Janssens\u2019s itsMe electronic ID verification completed successfully with all signals passing.",
      clientDetails: [
        { label: "Full name", value: "Lucas Janssens" },
        { label: "Date of birth", value: "1985/02/19" },
        { label: "Address", value: "Rue de la Loi 16, 1000 Brussels" }
      ],
      signalCount: 12,
      declinedCount: 0,
      verificationRate: 100,
      diRisk: "low",
      diScore: 3,
      diLabel: "Low Risk"
    },
    cz: {
      overallStatus: "Review",
      overallTone: "intermediate",
      personName: "Eva Nov\u00e1kov\u00e1",
      transactionId: "c1d8f902-7a3b-4e6c-9d21-5f0b3e8a1247",
      truAiTitle: "Review recommended",
      truAiSummary: "Eva Nov\u00e1kov\u00e1\u2019s BankID verification returned mixed signals. Some identity attributes need manual confirmation.",
      clientDetails: [
        { label: "Full name", value: "Eva Nov\u00e1kov\u00e1" },
        { label: "Date of birth", value: "1990/09/08" },
        { label: "Address", value: "V\u00e1clavsk\u00e9 n\u00e1m\u011bst\u00ed 1, 110 00 Prague" }
      ],
      signalCount: 13,
      declinedCount: 2,
      reviewCount: 1,
      verificationRate: 77,
      diRisk: "medium",
      diScore: 5,
      diLabel: "Medium Risk"
    },
    it: {
      overallStatus: "Verified",
      overallTone: "positive",
      personName: "Giulia Romano",
      transactionId: "a9f2c810-5e67-4d3a-b012-8c7d4e6f9012",
      truAiTitle: "Verification complete",
      truAiSummary: "Giulia Romano\u2019s SPID electronic ID has been verified. All returned identity signals matched the provider record.",
      clientDetails: [
        { label: "Full name", value: "Giulia Romano" },
        { label: "Date of birth", value: "1987/04/22" },
        { label: "Address", value: "Via del Corso 18, 00186 Rome" }
      ],
      signalCount: 11,
      declinedCount: 0,
      verificationRate: 100,
      diRisk: "low",
      diScore: 2,
      diLabel: "Low Risk"
    },
    se: {
      overallStatus: "Verified",
      overallTone: "positive",
      personName: "Erik Lindstr\u00f6m",
      transactionId: "d4b7e903-1f28-4c5d-a876-3e2c9f0d5678",
      truAiTitle: "Verification complete",
      truAiSummary: "Erik Lindstr\u00f6m\u2019s BankID verification completed with all signals passing.",
      clientDetails: [
        { label: "Full name", value: "Erik Lindstr\u00f6m" },
        { label: "Date of birth", value: "1983/12/05" },
        { label: "Address", value: "Drottninggatan 45, 111 21 Stockholm" }
      ],
      signalCount: 10,
      declinedCount: 0,
      verificationRate: 100,
      diRisk: "low",
      diScore: 1,
      diLabel: "Low Risk"
    },
    dk: {
      overallStatus: "Verified",
      overallTone: "positive",
      personName: "Mette Hansen",
      transactionId: "e5c8a014-2a39-5d6e-b987-4f3d0a1e6789",
      truAiTitle: "Verification complete",
      truAiSummary: "Mette Hansen\u2019s MitID verification completed successfully.",
      clientDetails: [
        { label: "Full name", value: "Mette Hansen" },
        { label: "Date of birth", value: "1992/06/30" },
        { label: "Address", value: "Str\u00f8get 12, 1200 Copenhagen" }
      ],
      signalCount: 10,
      declinedCount: 0,
      verificationRate: 100,
      diRisk: "low",
      diScore: 2,
      diLabel: "Low Risk"
    },
    pl: {
      overallStatus: "Review",
      overallTone: "intermediate",
      personName: "Anna Kowalska",
      transactionId: "f6d9b125-3b4a-6e7f-c098-504e1b2f7890",
      truAiTitle: "Partial verification",
      truAiSummary: "Anna Kowalska\u2019s mObywatel verification returned some declined signals. Review recommended before approval.",
      clientDetails: [
        { label: "Full name", value: "Anna Kowalska" },
        { label: "Date of birth", value: "1989/01/17" },
        { label: "Address", value: "ul. Marsza\u0142kowska 84, 00-514 Warsaw" }
      ],
      signalCount: 12,
      declinedCount: 3,
      verificationRate: 75,
      diRisk: "medium",
      diScore: 6,
      diLabel: "Medium Risk"
    }
  };

  var DEVICE = {
    score: 8,
    risk: "high",
    riskLabel: "High Risk",
    summary: "Strong indicators of suspicious or fraudulent behavior. Immediate review or action is recommended.",
    deviceId: "3045489E05849546",
    createdLabel: "Created At",
    createdValue: "05 July 2026, 3:30pm",
    indicators: [
      "Persona HIGH - confidence 57/100 - 1 signals - 1 errors",
      "Velocity anomaly across ES \u2192 RU \u2192 SE",
      "Linked to 3 different identities"
    ],
    deviceDetails: [
      { label: "Operating System", value: "Android 13" },
      { label: "Browser", value: "Chrome 126" },
      { label: "IP Address", value: "185.42.108.14" },
      { label: "Connection", value: "Mobile / Cellular" },
      { label: "Timezone", value: "Europe/Amsterdam" }
    ],
    evidence: [
      {
        key: "risk-outputs", label: "Risk Outputs",
        rows: [
          { title: "Device Risk Level", desc: "Device risk level for the session based on available signals.", result: "High", insight: "Risk" },
          { title: "Session Risk Score", desc: "Composite risk score for the session.", result: "8/10", insight: "Risk" }
        ]
      },
      {
        key: "network-location", label: "Network & Location",
        rows: [
          { title: "IP Reputation", desc: "Reputation of the originating IP address.", result: "Suspicious", insight: "Risk" },
          { title: "Proxy / VPN Detection", desc: "Anonymising network detected on the session.", result: "Detected", insight: "Risk" },
          { title: "Geolocation Consistency", desc: "IP geolocation vs. declared region.", result: "Consistent", insight: "No Risk" }
        ]
      },
      {
        key: "integrity-compromise", label: "Integrity & Compromise",
        rows: [
          { title: "Emulator Detection", desc: "Signals of a virtualised device.", result: "Detected", insight: "Risk" },
          { title: "Root / Jailbreak", desc: "Elevated OS privileges detected.", result: "Detected", insight: "Risk" },
          { title: "App Tampering", desc: "Integrity of the running application.", result: "Intact", insight: "No Risk" }
        ]
      }
    ]
  };

  var currentScenario = null;
  var currentSignals = [];

  function toneClass(tone, size) {
    size = size || "sm";
    return "tds-tag tds-tag--" + tone + " tds-tag--" + size;
  }

  function renderTag(text, tone) {
    return '<span class="' + toneClass(tone) + '">' + esc(text) + "</span>";
  }

  function buildScenario(code, flowCountry, provider) {
    var base = COUNTRY_SCENARIOS[code];
    if (base) return Object.assign({}, base);
    var name = (flowCountry && flowCountry.country) || "Jane Doe";
    return {
      overallStatus: "Verified",
      overallTone: "positive",
      personName: name.indexOf(" ") > -1 ? name : "Jane Doe",
      transactionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      truAiTitle: "Verification complete",
      truAiSummary: name + "\u2019s electronic ID has been verified through " + (provider || "the provider") + ". No additional steps required.",
      clientDetails: [
        { label: "Full name", value: name.indexOf(" ") > -1 ? name : "Jane Doe" },
        { label: "Date of birth", value: "1986/03/24" },
        { label: "Address", value: "919 Government St, Victoria, BC V6W 3Y8" }
      ],
      signalCount: 10,
      declinedCount: 0,
      verificationRate: 100,
      diRisk: "low",
      diScore: 2,
      diLabel: "Low Risk"
    };
  }

  function buildSignals(scenario) {
    var count = scenario.signalCount;
    var declined = scenario.declinedCount;
    var review = scenario.reviewCount || 0;
    var signals = [];
    for (var i = 0; i < count; i++) {
      var label = BASE_SIGNALS[i % BASE_SIGNALS.length];
      if (i >= BASE_SIGNALS.length) label = label + " (" + (Math.floor(i / BASE_SIGNALS.length) + 1) + ")";
      var kind = "accepted";
      if (i < declined) kind = "declined";
      else if (i < declined + review) kind = "review";
      var result = kind === "declined" ? "Declined" : kind === "review" ? "Review" : "Verified";
      signals.push({
        label: label,
        result: result,
        kind: kind,
        tone: kindToFilterTone(kind),
        dataReturned: dataReturnedForSignal(label, scenario, kind)
      });
    }
    return signals;
  }

  function buildSummaryRows(scenario, showDi) {
    var rows = [
      { label: "e-ID", value: scenario.overallStatus, tone: scenario.overallTone }
    ];
    if (showDi) {
      var diTone = scenario.diRisk === "high" ? "negative" : scenario.diRisk === "medium" ? "intermediate" : "positive";
      rows.push({ label: "Device Intelligence", value: scenario.diLabel, tone: diTone });
    }
    return rows;
  }

  function renderSummaryStatus(status) {
    return '<span class="dv-summary-status__label">' + esc(status) + "</span>";
  }

  function renderSummaryList(rows) {
    return rows.map(function (row) {
      return '<li class="dv-summary-row"><span class="dv-summary-label">' + esc(row.label) +
        "</span>" + renderTag(row.value, row.tone) + "</li>";
    }).join("");
  }

  function renderDetailPairs(pairs) {
    return pairs.map(function (p) {
      return '<div class="dv-detail-row"><span class="dv-detail-label">' + esc(p.label) +
        '</span><span class="dv-detail-value">' + esc(p.value) + "</span></div>";
    }).join("");
  }

  function renderStatRow(stats) {
    function tile(label, value, mod) {
      mod = mod || "";
      return '<div class="dv-stat' + mod + '"><span class="dv-stat__label">' + label +
        '</span><span class="dv-stat__value">' + esc(value) + "</span></div>";
    }
    return tile("Signals checked", String(stats.signalsChecked)) +
      tile("Verification rate", stats.verificationRate + "%") +
      tile("Declined checks", String(stats.declinedChecks), " dv-stat--negative");
  }

  function computeStats(signals) {
    var declined = 0;
    signals.forEach(function (s) { if (s.kind === "declined") declined++; });
    var total = signals.length;
    var passed = total - declined;
    return {
      signalsChecked: total,
      verificationRate: total > 0 ? Math.round(passed / total * 100) : 0,
      declinedChecks: declined
    };
  }

  function renderResultCell(signal) {
    var mod = signalResultMod(signal.kind);
    return '<span class="tds-data-table__signals tds-data-table__signals--' + mod + '">' +
      '<span class="tds-data-table__signals-icon" aria-hidden="true">' + signalResultIcon(signal.kind) + "</span>" +
      esc(signal.result) + "</span>";
  }

  function renderSignalsTable(signals) {
    var rows = signals.map(function (signal) {
      return "<tr>" +
        '<td class="tds-data-table__text-cell">' + esc(signal.label) + "</td>" +
        '<td class="tds-data-table__text-cell">' + esc(signal.dataReturned) + "</td>" +
        "<td>" + renderResultCell(signal) + "</td></tr>";
    }).join("");
    return '<div class="tds-data-table-container eid-signals-table">' +
      '<div class="tds-data-table__header">' +
      '<div class="tds-data-table__header-text">' +
      '<div class="tds-data-table__header-title">Signals</div></div></div>' +
      '<div class="tds-data-table__wrapper"><table class="tds-data-table">' +
      "<thead><tr>" +
      "<th>Signal</th><th>Data returned</th><th>Result</th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div></div>";
  }

  function updateSummaryPanel() {
    var summaryRowsWrap = byId("eid-summary-rows");
    var truaiCard = byId("eid-truai-card");
    var truaiPill = byId("eid-truai-pill");
    if (summaryRowsWrap) summaryRowsWrap.hidden = false;
    if (truaiPill) {
      truaiPill.setAttribute("aria-expanded", "false");
      truaiPill.classList.remove("dv-truai-pill--open");
    }
    if (truaiCard) truaiCard.hidden = true;
  }

  function applyScenario(root, scenario, showDi) {
    var q = function (sel) { return root.querySelector(sel); };

    setText(byId("eid-person-name"), scenario.personName);
    setText(byId("eid-transaction-id"), scenario.transactionId);

    var summaryHeader = byId("eid-summary-header");
    if (summaryHeader) {
      summaryHeader.className = "dv-summary-status-header dv-summary-status-header--" + scenario.overallTone;
    }
    var summaryStatus = byId("eid-summary-status");
    if (summaryStatus) {
      summaryStatus.className = "dv-summary-status dv-summary-status--" + scenario.overallTone;
      summaryStatus.innerHTML = renderSummaryStatus(scenario.overallStatus);
    }

    setText(byId("eid-truai-title"), scenario.truAiTitle);
    setText(byId("eid-truai-text"), scenario.truAiSummary);
    var summaryRows = buildSummaryRows(scenario, showDi);
    var summaryList = byId("eid-summary-list");
    if (summaryList) setHtml(summaryList, renderSummaryList(summaryRows));
    updateSummaryPanel();
    setHtml(byId("eid-client-details"), renderDetailPairs(scenario.clientDetails));

    currentSignals = buildSignals(scenario);
    var stats;
    if (scenario.verificationRate != null) {
      stats = {
        signalsChecked: scenario.signalCount,
        verificationRate: scenario.verificationRate,
        declinedChecks: scenario.declinedCount
      };
    } else {
      stats = computeStats(currentSignals);
    }
    setHtml(byId("eid-eid-stats"), renderStatRow(stats));
    setHtml(byId("eid-eid-signals"), renderSignalsTable(currentSignals));

    var tabsBar = byId("eid-result-tabs");
    if (tabsBar) tabsBar.hidden = !showDi;

    var diTab = byId("eid-di-tab");
    if (diTab) diTab.hidden = !showDi;

    if (showDi) {
      DEVICE.score = scenario.diScore;
      DEVICE.risk = scenario.diRisk;
      DEVICE.riskLabel = scenario.diLabel;
      renderDevice();
    }
  }

  function insightMarkup(insight) {
    if (insight === "Risk") {
      return '<span class="dv-di-insight dv-di-insight--risk"><span class="dv-di-insight__icon">' + ICON_RISK + "</span>Risk</span>";
    }
    if (insight === "No Risk") {
      return '<span class="dv-di-insight dv-di-insight--norisk"><span class="dv-di-insight__icon">' + ICON_NORISK + "</span>No Risk</span>";
    }
    return '<span class="dv-di-insight"><span class="dv-di-insight__icon">' + ICON_NOTRUN + "</span>Not Run</span>";
  }

  function groupBadges(rows) {
    var risk = 0, no = 0, notRun = 0;
    rows.forEach(function (r) {
      if (r.insight === "Risk") risk++;
      else if (r.insight === "No Risk") no++;
      else notRun++;
    });
    var out = "";
    if (risk) out += '<span class="tds-tag tds-tag--negative tds-tag--sm">' + risk + " Risk</span>";
    if (no) out += '<span class="tds-tag tds-tag--positive tds-tag--sm">' + no + " No Risk</span>";
    if (notRun) out += '<span class="tds-tag tds-tag--default tds-tag--sm">' + notRun + " Not Run</span>";
    return out;
  }

  function renderGroup(group, open) {
    var rows = group.rows.map(function (row) {
      return '<div class="dv-ditable__row">' +
        '<span class="dv-ditable__cell"><span class="eid-di-signal"><span class="dv-cell-title">' + esc(row.title) + "</span>" +
        '<span class="eid-di-sub">' + esc(row.desc) + "</span></span></span>" +
        '<span class="dv-ditable__cell dv-di-result">' + esc(row.result) + "</span>" +
        '<span class="dv-ditable__cell">' + insightMarkup(row.insight) + "</span></div>";
    }).join("");
    var body = '<div class="dv-ditable">' +
      '<div class="dv-ditable__head"><span class="dv-ditable__ch">Signal</span>' +
      '<span class="dv-ditable__ch">Result</span><span class="dv-ditable__ch">Insight</span></div>' +
      rows + "</div>";
    return '<div class="dv-group dv-collapsible' + (open ? " dv-collapsible--open" : "") + '" data-group-key="' + esc(group.key) + '">' +
      '<button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
      '<span class="dv-chevron" aria-hidden="true">' + ICON_CHEVRON + "</span>" +
      '<span class="dv-group__label">' + esc(group.label) + "</span>" +
      '<span class="dv-ni2-counts">' + groupBadges(group.rows) + "</span></button>" +
      '<div class="dv-collapsible__body"' + (open ? "" : " hidden") + ">" + body + "</div></div>";
  }

  function renderDevice() {
    var host = byId("eid-device-body");
    if (!host) return;
    var chips = DEVICE.indicators.map(function (c) {
      return '<div class="dv-di-chip">' + esc(c) + "</div>";
    }).join("");
    var details = DEVICE.deviceDetails.map(function (d) {
      return '<div class="dv-detail-row"><span class="dv-detail-label">' + esc(d.label) +
        '</span><span class="dv-detail-value">' + esc(d.value) + "</span></div>";
    }).join("");
    var evidence = DEVICE.evidence.map(function (g, i) {
      return renderGroup(g, i === 0);
    }).join("");

    host.innerHTML =
      '<div class="dv-di-top">' +
        '<div class="dv-di-summary">' +
          '<div class="dv-di-score">' +
            '<span class="dv-di-score__label">Risk Score</span>' +
            '<div class="dv-di-gauge" id="eid-device-gauge" data-score="' + DEVICE.score + '" data-max="10" data-risk="' + DEVICE.risk + '" data-label="' + esc(DEVICE.riskLabel) + '" data-show-percent="false"></div>' +
          "</div>" +
          '<div class="dv-di-detail">' +
            '<p class="dv-di-statement">' + esc(DEVICE.summary) + "</p>" +
            '<div class="dv-di-meta">' +
              '<div class="dv-di-meta__row"><span class="dv-di-meta__label">Device ID</span><span class="dv-di-meta__value">' + esc(DEVICE.deviceId) + "</span></div>" +
              '<div class="dv-di-meta__row"><span class="dv-di-meta__label">' + esc(DEVICE.createdLabel) + '</span><span class="dv-di-meta__value">' + esc(DEVICE.createdValue) + "</span></div>" +
            "</div>" +
            '<div class="dv-di-chips">' + chips + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="dv-di-showinfo">' +
          '<button class="tds-btn tds-btn--secondary tds-btn--sm" type="button" aria-expanded="false">' +
          '<span class="tds-btn__leading-icon">' + ICON_PLUS + "</span>Show device information</button>" +
        "</div>" +
        '<div class="dv-di-details" hidden>' + details + "</div>" +
      "</div>" +
      '<span class="dv-di-evidence-label">Evidence</span>' +
      evidence;
  }

  function renderGauges(scope) {
    if (!global.ScoreGauge) return;
    (scope || document).querySelectorAll(".dv-di-gauge[data-score]").forEach(function (el) {
      global.ScoreGauge.render(el);
    });
  }

  function setMetaCountry(code, countryName) {
    setText(byId("eid-meta-country"), countryName);
    var flag = byId("eid-meta-flag");
    if (flag) flag.innerHTML = '<span class="fi fi-' + esc(code) + '"></span>';
  }

  function toggleCollapsible(header) {
    var group = header.closest(".dv-collapsible");
    if (!group) return;
    var body = group.querySelector(".dv-collapsible__body");
    var open = !group.classList.contains("dv-collapsible--open");
    group.classList.toggle("dv-collapsible--open", open);
    header.setAttribute("aria-expanded", String(open));
    if (body) body.hidden = !open;
  }

  function initTabs(root) {
    var tabs = root.querySelectorAll(".dv-tab");
    var panels = root.querySelectorAll(".dv-tabpanel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("dv-tab--active", on);
          t.setAttribute("aria-selected", String(on));
        });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute("data-tab") !== name;
        });
        if (name === "device-intelligence") renderGauges(root);
      });
    });
  }

  function initInteractions(root) {
    root.addEventListener("click", function (e) {
      var header = e.target.closest(".dv-collapsible__header");
      if (header && root.contains(header) && !header.closest(".dv-group")) {
        toggleCollapsible(header);
        return;
      }
      if (header && root.contains(header) && header.closest("#eid-device-body")) {
        toggleCollapsible(header);
        return;
      }

      var pill = e.target.closest("#eid-truai-pill");
      if (pill) {
        var card = byId("eid-truai-card");
        if (!card) return;
        var willOpen = card.hidden;
        card.hidden = !willOpen;
        pill.setAttribute("aria-expanded", String(willOpen));
        pill.classList.toggle("dv-truai-pill--open", willOpen);
        return;
      }

      var showInfo = e.target.closest(".dv-di-showinfo button");
      if (showInfo) {
        var details = root.querySelector(".dv-di-details");
        var open = showInfo.getAttribute("aria-expanded") !== "true";
        showInfo.setAttribute("aria-expanded", String(open));
        if (details) details.hidden = !open;
        return;
      }
    });

    var columns = byId("eid-result-columns");
    root.querySelectorAll(".dv-sidebar-toggle--collapse").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (columns) columns.classList.add("dv-columns--sidebar-collapsed");
        btn.setAttribute("aria-expanded", "false");
        var expandBtn = root.querySelector(".dv-sidebar-toggle--expand");
        if (expandBtn) expandBtn.setAttribute("aria-expanded", "true");
      });
    });
    var expandBtn = root.querySelector(".dv-sidebar-toggle--expand");
    if (expandBtn) {
      expandBtn.addEventListener("click", function () {
        if (columns) columns.classList.remove("dv-columns--sidebar-collapsed");
        expandBtn.setAttribute("aria-expanded", "false");
        var collapseBtn = root.querySelector(".dv-sidebar-toggle--collapse");
        if (collapseBtn) collapseBtn.setAttribute("aria-expanded", "true");
      });
    }
  }

  var wired = false;
  function wireOnce() {
    if (wired) return;
    wired = true;
    var root = byId("eid-result-view");
    if (!root) return;
    initTabs(root);
    initInteractions(root);
  }

  function show() {
    wireOnce();
    var flowState = global.EidFlow && global.EidFlow.getState ? global.EidFlow.getState() : {};
    var country = flowState.country || {};
    var code = (country.code || "nl").toLowerCase();
    var showDi = !!flowState.deviceIntelligence;

    currentScenario = buildScenario(code, country, flowState.provider || country.provider);
    setMetaCountry(code, country.country || "Netherlands");

    var root = byId("eid-result-view");
    applyScenario(root, currentScenario, showDi);

    var flow = byId("eid-flow-view");
    var result = byId("eid-result-view");
    if (!flow || !result) return;
    flow.hidden = true;
    result.hidden = false;
    document.title = "Electronic ID Results — Trulioo Labs";
    window.scrollTo(0, 0);

    window.dispatchEvent(new Event("resize"));
    renderGauges(result);

    var eidTab = root.querySelector('.dv-tab[data-tab="e-id"]');
    if (eidTab) eidTab.click();
  }

  function hide() {
    var flow = byId("eid-flow-view");
    var result = byId("eid-result-view");
    if (!flow || !result) return;
    result.hidden = true;
    flow.hidden = false;
    document.title = "Electronic ID — Trulioo Labs";
    window.scrollTo(0, 0);
  }

  global.EidResult = { show: show, hide: hide };
})(window);
