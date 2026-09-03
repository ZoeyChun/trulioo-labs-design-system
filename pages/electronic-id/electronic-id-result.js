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

  function kindToFilterTone(kind) {
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

  function genderForScenario(scenario) {
    var code = String(scenario.countryCode || "").toLowerCase();
    return (code === "be" || code === "in") ? "Male" : "Female";
  }

  var NATIONALITY_BY_COUNTRY = {
    nl: "Dutch",
    be: "Belgian",
    in: "Indian",
    it: "Italian",
    se: "Swedish",
    cz: "Czech",
    dk: "Danish",
    pl: "Polish"
  };

  var PHONE_BY_COUNTRY = {
    nl: "+31 6 1234 5678",
    be: "+32 470 12 34 56",
    in: "+91 98765 43210",
    it: "+39 347 123 4567",
    se: "+46 70 123 45 67",
    cz: "+420 601 234 567",
    dk: "+45 20 12 34 56",
    pl: "+48 601 234 567"
  };

  var DOCUMENT_BY_COUNTRY = {
    be: { type: "Identity card", number: "590-1234567-12", issueDate: "2018/03/12", expiry: "2031/08/15", issuingCountry: "Belgium", issuingAuthority: "FPS Interior" },
    in: { type: "Aadhaar", number: "XXXX XXXX 9012", issueDate: "2016/11/03", expiry: "2031/08/15", issuingCountry: "India", issuingAuthority: "UIDAI" },
    it: { type: "Identity card", number: "CA12345AA", issueDate: "2019/04/22", expiry: "2029/04/22", issuingCountry: "Italy", issuingAuthority: "Comune di Roma" },
    cz: { type: "Identity card", number: "123456789", issueDate: "2019/09/08", expiry: "2029/09/08", issuingCountry: "Czechia", issuingAuthority: "Ministry of the Interior" }
  };

  var IDENTITY_FIELDS_BY_COUNTRY = {
    nl: ["First initials", "Last name", "Date of birth", "Gender", "Address 1", "City", "Postal code", "Country of residence"],
    be: ["First name", "Last name", "Date of birth", "Nationality", "Gender", "Full address", "Document number", "Document issuing country", "Document expiry"],
    in: ["Full name", "Date of birth", "Gender", "Full address", "Document number", "Document portrait (selfie)"],
    it: ["First name", "Last name", "Date of birth", "Document type", "Document number", "Issue date", "Issuing authority"],
    se: ["First name", "Last name", "Date of birth", "Gender"],
    cz: ["First name", "Last name", "Date of birth", "Nationality", "Gender", "Phone number", "Full address", "Document type", "Document number", "Issue date", "Expiry date", "Issuing country", "Issuing authority"],
    dk: ["Full name", "Date of birth"],
    pl: ["First name", "Last name", "Date of birth"]
  };

  function firstNameFromName(name) {
    return String(name || "").trim().split(/\s+/)[0] || "—";
  }

  function lastNameFromName(name) {
    var parts = String(name || "").trim().split(/\s+/);
    return parts.length > 1 ? parts.slice(1).join(" ") : name || "—";
  }

  function initialsFromName(name) {
    var first = firstNameFromName(name);
    return first && first !== "—" ? first.charAt(0).toUpperCase() + "." : "—";
  }

  function dataReturnedForSignal(label, scenario, kind, flowCountry) {
    var name = detailValue(scenario.clientDetails, "Full name");
    var dob = detailValue(scenario.clientDetails, "Date of birth");
    var address = detailValue(scenario.clientDetails, "Address");
    var code = String(scenario.countryCode || (flowCountry && flowCountry.code) || "").toLowerCase();
    var countryName = (flowCountry && flowCountry.country) || "";
    var doc = DOCUMENT_BY_COUNTRY[code] || {};
    var parts = String(address || "").split(",").map(function (part) { return part.trim(); }).filter(Boolean);
    var street = parts[0] || address;
    var lastPart = parts.length ? parts[parts.length - 1] : "";
    var postalMatch = address.match(/\b\d{4}\s?[A-Z]{2}\b/) || address.match(/\b\d{4,6}\b/) || address.match(/\b\d{2}-\d{3}\b/);
    var city = lastPart.replace(/^\d{4}\s?[A-Z]{2}\s*/i, "").replace(/^\d{4,6}\s*/, "").replace(/^\d{2}-\d{3}\s*/, "").trim();
    var field = String(label).toLowerCase().replace(/[()]/g, "").replace(/\s+/g, " ").trim();

    switch (field) {
      case "name":
      case "full name": return name;
      case "first name": return firstNameFromName(name);
      case "last name": return lastNameFromName(name);
      case "first initials": return initialsFromName(name);
      case "address":
      case "full address": return address;
      case "address 1": return street;
      case "date of birth": return dob;
      case "gender": return genderForScenario(scenario);
      case "email address": return emailFromName(name);
      case "phone number": return PHONE_BY_COUNTRY[code] || "+31 6 1234 5678";
      case "national id": return "AB1234567";
      case "document number": return doc.number || "DOC-8847291";
      case "document expiry":
      case "expiry date": return doc.expiry || "2031/08/15";
      case "issue date": return doc.issueDate || "2018/03/12";
      case "document type": return doc.type || "Identity card";
      case "issuing authority": return doc.issuingAuthority || "Issuing authority";
      case "issuing country":
      case "document issuing country": return doc.issuingCountry || countryName || (code ? code.toUpperCase() : "—");
      case "nationality": return NATIONALITY_BY_COUNTRY[code] || countryName || "—";
      case "postal code": return postalMatch ? postalMatch[0] : "—";
      case "city":
        if (code === "in") return parts[1] || "Bengaluru";
        return city || "—";
      case "region": return "—";
      case "country of residence": return countryName || lastPart || "—";
      case "provider match": return "Match";
      case "consent timestamp": return "17 Jun 2026, 2:14 PM";
      case "document portrait selfie": return "Captured";
      default: return kind === "review" ? "Partial match" : "Verified";
    }
  }

  var BASE_SIGNALS = [
    "Name", "Address", "Gender", "Date of Birth", "Email Address", "Phone Number",
    "National ID", "Document Number", "Document Expiry", "Nationality",
    "Postal Code", "City", "Region", "Country of Residence", "Provider Match", "Consent Timestamp"
  ];

  var PORTRAIT_COUNTRY_CODES = { in: true };

  var ASSURANCE_BY_COUNTRY = {
    nl: "High",
    be: "High",
    it: "Substantial",
    de: "Substantial",
    se: "Substantial",
    at: "High",
    bg: "Substantial",
    cz: "Substantial",
    dk: "Substantial",
    ee: "High",
    fi: "High",
    fr: "High",
    pt: "High",
    lv: "Substantial",
    lt: "High",
    no: "High",
    pl: "Substantial"
  };

  var ASSURANCE_TOOLTIP =
    "Indicates how much confidence can be placed in identities verified through this scheme, " +
    "based on the rigour of its identity proofing, credential binding and resistance to misuse. " +
    "Low offers limited confidence, Substantial a materially stronger degree, and High the strongest.";

  var floatingTooltipEl = null;

  function ensureFloatingTooltip() {
    if (!floatingTooltipEl) {
      floatingTooltipEl = document.createElement("div");
      floatingTooltipEl.className =
        "eid-floating-tooltip tds-tooltip tds-tooltip--dark tds-tooltip--top tds-tooltip--caret-sm";
      floatingTooltipEl.id = "eid-assurance-tooltip";
      floatingTooltipEl.setAttribute("role", "tooltip");
      floatingTooltipEl.hidden = true;
      floatingTooltipEl.innerHTML =
        '<div class="tds-tooltip__body">' +
          '<p class="tds-tooltip__text">Scheme assurance level</p>' +
          '<p class="tds-tooltip__description">' + esc(ASSURANCE_TOOLTIP) + "</p>" +
        "</div>" +
        '<span class="tds-tooltip__caret" aria-hidden="true"></span>';
      document.body.appendChild(floatingTooltipEl);
    }
    return floatingTooltipEl;
  }

  function positionFloatingTooltip(anchor, tip) {
    var rect = anchor.getBoundingClientRect();
    var tipRect = tip.getBoundingClientRect();
    var left = rect.left + rect.width / 2 - tipRect.width / 2;
    var top = rect.bottom + 4;
    left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
    if (top + tipRect.height > window.innerHeight - 8) {
      top = rect.top - tipRect.height - 4;
    }
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }

  function bindAssuranceTooltip() {
    var btn = byId("eid-assurance-info");
    if (!btn || btn.dataset.tooltipBound) return;
    btn.dataset.tooltipBound = "1";
    var tip = ensureFloatingTooltip();

    function show() {
      tip.hidden = false;
      positionFloatingTooltip(btn, tip);
    }

    function hide() {
      tip.hidden = true;
    }

    btn.addEventListener("mouseenter", show);
    btn.addEventListener("mouseleave", hide);
    btn.addEventListener("focus", show);
    btn.addEventListener("blur", hide);
    document.addEventListener("scroll", hide, true);
    window.addEventListener("blur", hide);
  }

  function hasAssuranceLevel(code) {
    return !!ASSURANCE_BY_COUNTRY[String(code || "").toLowerCase()];
  }

  function assuranceLevelForCountry(code) {
    return ASSURANCE_BY_COUNTRY[String(code || "").toLowerCase()] || null;
  }

  function renderAssuranceLevel(countryCode, level) {
    var block = byId("eid-assurance-block");
    var valueEl = byId("eid-assurance-level");
    var assuranceLevel = hasAssuranceLevel(countryCode) ? (level || assuranceLevelForCountry(countryCode)) : null;
    var show = !!assuranceLevel;

    if (block) block.hidden = !show;

    if (!valueEl) return;

    if (!show) {
      valueEl.textContent = "";
      return;
    }

    valueEl.textContent = assuranceLevel;
  }

  var SPLIT_DEFAULT_END = 353;
  var SPLIT_MIN_START = 240;
  var SPLIT_MIN_END = 280;
  var SPLIT_STACK_MAX = 1200;
  var sharedSplitEnd = SPLIT_DEFAULT_END;

  var SESSION_KEY = "eid-demo-session";

  function saveSession(flowState) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        view: "result",
        countryCode: flowState.country && flowState.country.code,
        deviceIntelligence: !!flowState.deviceIntelligence,
        simulated: !!flowState.simulated,
        bank: flowState.bank || null,
        provider: flowState.provider || null
      }));
    } catch (e) { /* demo-only */ }
  }

  function loadSession() {
    try {
      var raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function markSessionFormView() {
    try {
      var session = loadSession();
      if (!session) return;
      session.view = "form";
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) { /* demo-only */ }
  }

  function setResultHash() {
    history.replaceState(null, "", location.pathname + location.search + "#result");
  }

  function clearResultHash() {
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

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
    var scenario;
    if (base) {
      scenario = Object.assign({}, base);
    } else {
      var name = (flowCountry && flowCountry.country) || "Jane Doe";
      scenario = {
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
    scenario.documentType = PORTRAIT_COUNTRY_CODES[code] ? "document-portrait" : null;
    scenario.countryCode = code;
    scenario.assuranceLevel = assuranceLevelForCountry(code);
    return scenario;
  }

  function identityFieldsForCountry(flowCountry, scenario) {
    var code = String((flowCountry && flowCountry.code) || scenario.countryCode || "").toLowerCase();
    if (IDENTITY_FIELDS_BY_COUNTRY[code]) return IDENTITY_FIELDS_BY_COUNTRY[code].slice();
    if (flowCountry && flowCountry.consentItems && flowCountry.consentItems.length) {
      return flowCountry.consentItems.slice();
    }
    return BASE_SIGNALS.slice(0, scenario.signalCount || BASE_SIGNALS.length);
  }

  function buildSignals(scenario, flowCountry) {
    var fields = identityFieldsForCountry(flowCountry, scenario);
    return fields.map(function (label) {
      return {
        label: label,
        dataReturned: dataReturnedForSignal(label, scenario, "accepted", flowCountry)
      };
    });
  }

  var RESULT_STATUS = "Completed";

  function buildClientDetails(country) {
    var code = country && country.code ? String(country.code).toUpperCase() : "—";
    return [
      { label: "Country code", value: code }
    ];
  }

  function bankLabel(bank) {
    if (!bank) return "";
    if (typeof bank === "string") return bank;
    return bank.shareName || bank.label || "";
  }

  function buildSummaryRows(scenario, showDi, provider, bank) {
    var rows = [
      { label: "e-ID", value: RESULT_STATUS, tone: "positive", kind: "tag" }
    ];
    if (provider) rows.push({ label: "Provider", value: provider, kind: "text" });
    if (bank) rows.push({ label: "Bank", value: bank, kind: "text" });
    if (showDi) {
      var diTone = scenario.diRisk === "high" ? "negative" : scenario.diRisk === "medium" ? "intermediate" : "positive";
      rows.push({ label: "Device Intelligence", value: scenario.diLabel, tone: diTone, kind: "tag" });
    }
    return rows;
  }

  function renderHighlightField(row) {
    var valueHtml = row.kind === "tag"
      ? renderTag(row.value, row.tone)
      : '<p class="tds-data-field__value' + (row.negative ? " tds-data-field__value--negative" : "") + '">' + esc(row.value) + "</p>";
    return '<div class="tds-data-field tds-data-field--horizontal eid-highlight-row">' +
      '<div class="tds-data-field__label-row"><p class="tds-data-field__label">' + esc(row.label) + "</p></div>" +
      '<div class="tds-data-field__content"><div class="tds-data-field__value-row">' + valueHtml + "</div></div>" +
      "</div>";
  }

  function renderSummaryHighlights(host, rows) {
    if (!host) return;
    host.querySelectorAll(".eid-highlight-row").forEach(function (el) { el.remove(); });
    host.insertAdjacentHTML("beforeend", rows.map(renderHighlightField).join(""));
  }

  function renderDetailPairs(pairs) {
    return pairs.map(function (p) {
      return '<div class="dv-detail-row"><span class="dv-detail-label">' + esc(p.label) +
        '</span><span class="dv-detail-value">' + esc(p.value) + "</span></div>";
    }).join("");
  }

  function renderSignalsTable(signals) {
    var rows = signals.map(function (signal) {
      return "<tr>" +
        '<td class="tds-data-table__text-cell">' + esc(signal.label) + "</td>" +
        '<td class="tds-data-table__text-cell">' + esc(signal.dataReturned) + "</td></tr>";
    }).join("");
    return '<div class="tds-data-table-container eid-signals-table">' +
      '<div class="tds-data-table__wrapper"><table class="tds-data-table">' +
      "<thead><tr>" +
      "<th>Field</th><th>Data returned</th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div></div>";
  }

  function countryPhrase(countryName) {
    if (countryName === "Netherlands") return "the Netherlands";
    return countryName || "the selected country";
  }

  function buildTruAiNarrativeHtml(scenario, country, provider, bank, assurance) {
    if (scenario.overallStatus === "Declined" || scenario.overallStatus === "Review") {
      return esc(scenario.truAiSummary);
    }
    var name = scenario.personName;
    var countryName = countryPhrase(country && country.country);
    var via = provider || "the provider";
    if (bank) via += " via " + bank;
    var html = esc(name) + " successfully completed electronic ID verification using <strong>" +
      esc(via) + "</strong>. The identity data returned by the provider matched the verification requirements for " +
      esc(countryName);
    if (assurance) html += ", with a <strong>" + esc(assurance) + " assurance level</strong>";
    html += ".";
    return html;
  }

  function applyScenario(root, scenario, showDi, flowCountry, provider, bank) {
    setText(byId("eid-person-name"), scenario.personName);
    setText(byId("eid-transaction-id"), scenario.transactionId);

    var countryCode = scenario.countryCode || (flowCountry && flowCountry.code) || "";
    var assuranceLevel = scenario.assuranceLevel;
    var providerLabel = provider || (flowCountry && flowCountry.provider) || "";
    var bankName = bankLabel(bank);

    renderAssuranceLevel(countryCode, assuranceLevel);

    var truaiCard = byId("eid-truai-card");
    if (truaiCard) truaiCard.hidden = false;
    setHtml(byId("eid-truai-text"), buildTruAiNarrativeHtml(scenario, flowCountry, providerLabel, bankName, assuranceLevel));

    var summaryRows = buildSummaryRows(scenario, showDi, providerLabel, bankName);
    renderSummaryHighlights(byId("eid-highlights"), summaryRows);
    setHtml(byId("eid-client-details"), renderDetailPairs(buildClientDetails(flowCountry)));
    var detailsAccordion = byId("eid-transaction-details");
    if (detailsAccordion) {
      detailsAccordion.classList.remove("dv-collapsible--open");
      var detailsHeader = detailsAccordion.querySelector(".dv-collapsible__header");
      var detailsBody = detailsAccordion.querySelector(".dv-collapsible__body");
      if (detailsHeader) detailsHeader.setAttribute("aria-expanded", "false");
      if (detailsBody) detailsBody.hidden = true;
    }

    var headerStatus = byId("eid-header-status");
    if (headerStatus) {
      headerStatus.hidden = true;
      headerStatus.textContent = scenario.overallStatus === "Verified" ? "Completed" : scenario.overallStatus;
      headerStatus.className = "tds-tag tds-tag--sm tds-tag--" + (scenario.overallTone || "positive");
    }

    currentSignals = buildSignals(scenario, flowCountry);
    setHtml(byId("eid-eid-signals"), renderSignalsTable(currentSignals));
    applyDocumentSection(scenario);

    var tabsBar = byId("eid-result-tabs");
    if (tabsBar) tabsBar.hidden = !showDi;

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

  function toggleAccordion(header) {
    var accordion = header.closest(".tds-accordion");
    if (!accordion) return;
    var expanded = !accordion.classList.contains("tds-accordion--expanded");
    accordion.classList.toggle("tds-accordion--expanded", expanded);
    header.setAttribute("aria-expanded", String(expanded));
  }

  function openTruAIPrompt(prompt) {
    if (window.TruAIChat && typeof window.TruAIChat.open === "function") {
      window.TruAIChat.open();
    }
    window.setTimeout(function () {
      var match = document.querySelector('.labs-truai-prompt[data-truai-prompt="' + prompt + '"]');
      if (match) match.click();
    }, 80);
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

  function applyDocumentSection(scenario) {
    var showPortrait = scenario && scenario.documentType === "document-portrait";
    var panelBody = byId("eid-eid-panel-body");
    var divider = byId("eid-eid-split-divider");
    var viewer = byId("eid-eid-document-viewer");
    var indicators = byId("eid-eid-indicators");

    if (panelBody) {
      panelBody.classList.toggle("dv-split-pane", showPortrait);
      if (showPortrait) panelBody.setAttribute("data-split-pane", "");
      else panelBody.removeAttribute("data-split-pane");
    }
    if (indicators) indicators.classList.toggle("dv-split-pane__start", showPortrait);
    if (divider) divider.hidden = !showPortrait;
    if (viewer) viewer.hidden = !showPortrait;
    if (showPortrait) {
      sharedSplitEnd = SPLIT_DEFAULT_END;
      syncEidSplitPane();
    }
  }

  function isSplitPaneStacked() {
    return window.matchMedia("(max-width: " + SPLIT_STACK_MAX + "px)").matches;
  }

  function getEidSplitPane() {
    var pane = byId("eid-eid-panel-body");
    return pane && pane.hasAttribute("data-split-pane") ? pane : null;
  }

  function clampSplitEnd(pane, endWidth) {
    var paneWidth = pane.getBoundingClientRect().width;
    if (paneWidth <= 0) return endWidth;
    var maxEnd = paneWidth - SPLIT_MIN_START - 8;
    return Math.max(SPLIT_MIN_END, Math.min(endWidth, maxEnd));
  }

  function setSplitEndWidth(pane, endWidth) {
    var clamped = clampSplitEnd(pane, endWidth);
    pane.style.setProperty("--dv-split-end", clamped + "px");
    pane.style.gridTemplateColumns = "minmax(" + SPLIT_MIN_START + "px, 1fr) 8px " + clamped + "px";
    return clamped;
  }

  function syncEidSplitPane() {
    if (isSplitPaneStacked()) return;
    var pane = getEidSplitPane();
    if (!pane) return;
    sharedSplitEnd = clampSplitEnd(pane, sharedSplitEnd);
    setSplitEndWidth(pane, sharedSplitEnd);
  }

  function figureImageTitle(figure) {
    var caption = figure.querySelector(".dv-doc-image__caption");
    if (caption) {
      var clone = caption.cloneNode(true);
      clone.querySelectorAll("button").forEach(function (btn) { btn.remove(); });
      var text = clone.textContent ? clone.textContent.trim() : "";
      if (text) return text;
    }
    var viewer = figure.closest(".dv-viewer");
    var viewerTitle = viewer && viewer.querySelector(".dv-section-title");
    return viewerTitle && viewerTitle.textContent ? viewerTitle.textContent.trim() : "Image";
  }

  function closeImageModal() {
    var modal = byId("eid-image-modal");
    var body = byId("eid-image-modal-body");
    if (!modal) return;
    modal.hidden = true;
    if (body) body.innerHTML = "";
    document.body.style.overflow = "";
  }

  function openImageModal(figure) {
    var modal = byId("eid-image-modal");
    var title = byId("eid-image-modal-title");
    var body = byId("eid-image-modal-body");
    var media = figure.querySelector(".dv-doc-image__media");
    if (!modal || !title || !body || !media) return;
    title.textContent = figureImageTitle(figure);
    body.innerHTML = media.innerHTML;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector(".dv-image-modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function wireSplitPane(root) {
    var divider = byId("eid-eid-split-divider");
    if (!divider || divider.dataset.wired) return;
    divider.dataset.wired = "true";

    divider.addEventListener("pointerdown", function (event) {
      if (isSplitPaneStacked() || divider.hidden) return;
      event.preventDefault();
      divider.setPointerCapture(event.pointerId);
      divider.classList.add("is-dragging");
      document.body.classList.add("dv-is-resizing");

      function updateSplitFromPointer(clientX) {
        var activePane = getEidSplitPane();
        if (!activePane) return;
        sharedSplitEnd = setSplitEndWidth(activePane, activePane.getBoundingClientRect().right - clientX);
      }

      function stopDragging(pointerId, onMove, onUp) {
        divider.classList.remove("is-dragging");
        document.body.classList.remove("dv-is-resizing");
        if (divider.hasPointerCapture(pointerId)) divider.releasePointerCapture(pointerId);
        divider.removeEventListener("pointermove", onMove);
        divider.removeEventListener("pointerup", onUp);
        divider.removeEventListener("pointercancel", onUp);
      }

      updateSplitFromPointer(event.clientX);
      function onMove(ev) { updateSplitFromPointer(ev.clientX); }
      function onUp(ev) { stopDragging(ev.pointerId, onMove, onUp); }
      divider.addEventListener("pointermove", onMove);
      divider.addEventListener("pointerup", onUp);
      divider.addEventListener("pointercancel", onUp);
    });

    divider.addEventListener("keydown", function (event) {
      if (isSplitPaneStacked() || divider.hidden) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      var activePane = getEidSplitPane();
      if (!activePane) return;
      var current = Number.parseInt(getComputedStyle(activePane).getPropertyValue("--dv-split-end") || String(SPLIT_DEFAULT_END), 10);
      var delta = event.key === "ArrowLeft" ? -16 : 16;
      sharedSplitEnd = setSplitEndWidth(activePane, current + delta);
    });

    window.addEventListener("resize", syncEidSplitPane);
  }

  function wireImageModal(root) {
    if (root.dataset.imageModalWired) return;
    root.dataset.imageModalWired = "true";

    root.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-eid-modal-close]")) {
        closeImageModal();
        return;
      }
      var expandBtn = target.closest("#eid-eid-document-viewer .dv-doc-image .dv-icon-btn");
      var media = expandBtn ? null : target.closest("#eid-eid-document-viewer .dv-doc-image__media");
      var figure = (expandBtn || media) ? (expandBtn || media).closest(".dv-doc-image") : null;
      if (!figure) return;
      event.preventDefault();
      openImageModal(figure);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var modal = byId("eid-image-modal");
      if (modal && !modal.hidden) closeImageModal();
    });
  }

  function initTabs(root) {
    var tabs = root.querySelectorAll(".tds-tab-item");
    var panels = root.querySelectorAll(".dv-tabpanel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("tds-tab-item--active", on);
          t.setAttribute("aria-selected", String(on));
        });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute("data-tab") !== name;
        });
        if (name === "device-intelligence") renderGauges(root);
        else if (name === "e-id") syncEidSplitPane();
      });
    });
  }

  function initInteractions(root) {
    root.addEventListener("click", function (e) {
      var accordionHeader = e.target.closest("#eid-transaction-details .tds-accordion__header");
      if (accordionHeader && root.contains(accordionHeader)) {
        toggleAccordion(accordionHeader);
        return;
      }

      var accordionHeader = e.target.closest("#eid-transaction-details .tds-accordion__header");
      if (accordionHeader && root.contains(accordionHeader)) {
        toggleAccordion(accordionHeader);
        return;
      }

      var header = e.target.closest(".dv-collapsible__header");
      if (header && root.contains(header) && !header.closest(".dv-group")) {
        toggleCollapsible(header);
        return;
      }
      if (header && root.contains(header) && header.closest("#eid-device-body")) {
        toggleCollapsible(header);
        return;
      }

      var promptChip = e.target.closest("#eid-truai-prompt");
      if (promptChip) {
        openTruAIPrompt(promptChip.getAttribute("data-truai-prompt") || "Summarize verified identity");
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

    function setSidebarCollapsed(collapsed) {
      var columns = byId("eid-result-columns");
      var collapseBtn = root.querySelector(".dv-sidebar-toggle--collapse");
      var expandBtn = root.querySelector(".dv-sidebar-toggle--expand");
      if (columns) columns.classList.toggle("dv-columns--sidebar-collapsed", collapsed);
      if (collapseBtn) collapseBtn.setAttribute("aria-expanded", String(!collapsed));
      if (expandBtn) expandBtn.setAttribute("aria-expanded", String(collapsed));
    }

    var collapseBtn = root.querySelector(".dv-sidebar-toggle--collapse");
    var expandBtn = root.querySelector(".dv-sidebar-toggle--expand");
    if (collapseBtn) collapseBtn.addEventListener("click", function () { setSidebarCollapsed(true); });
    if (expandBtn) expandBtn.addEventListener("click", function () { setSidebarCollapsed(false); });
  }

  var wired = false;
  function wireOnce() {
    if (wired) return;
    wired = true;
    var root = byId("eid-result-view");
    if (!root) return;
    initTabs(root);
    initInteractions(root);
    bindAssuranceTooltip();
    wireSplitPane(root);
    wireImageModal(root);
  }

  function show() {
    wireOnce();
    var flowState = global.EidFlow && global.EidFlow.getState ? global.EidFlow.getState() : {};
    var country = flowState.country || {};
    var code = (country.code || "nl").toLowerCase();
    if ((!country.provider || !country.consentItems) && global.EID_FLOW_DATA) {
      var found = global.EID_FLOW_DATA.find(function (c) { return c.code === code; });
      if (found) country = Object.assign({}, found, country);
    }
    var showDi = !!flowState.deviceIntelligence;

    currentScenario = buildScenario(code, country, flowState.provider || country.provider);
    setMetaCountry(code, country.country || "Netherlands");

    var root = byId("eid-result-view");
    applyScenario(root, currentScenario, showDi, country, flowState.provider || country.provider, flowState.bank);

    var flow = byId("eid-flow-view");
    var result = byId("eid-result-view");
    if (!flow || !result) return;
    flow.hidden = true;
    result.hidden = false;
    document.title = "Electronic ID Results — Trulioo Labs";
    saveSession(flowState);
    setResultHash();
    window.scrollTo(0, 0);

    window.dispatchEvent(new Event("resize"));
    syncEidSplitPane();
    renderGauges(result);

    var eidTab = root.querySelector('.tds-tab-item[data-tab="e-id"]');
    if (eidTab) eidTab.click();
  }

  function hide() {
    var flow = byId("eid-flow-view");
    var result = byId("eid-result-view");
    if (!flow || !result) return;
    result.hidden = true;
    flow.hidden = false;
    document.title = "Electronic ID — Trulioo Labs";
    clearResultHash();
    markSessionFormView();
    window.scrollTo(0, 0);
  }

  global.EidResult = { show: show, hide: hide, loadSession: loadSession };
})(window);
