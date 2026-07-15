/* Bank Verification — shared session + result config (form + result pages) */

(function (global) {
  "use strict";

  var SESSION_KEY = "bv-session";

  var COUNTRY_META = {
    "Brazil": { flag: "🇧🇷" },
    "South Korea": { flag: "🇰🇷" },
    "Mexico": { flag: "🇲🇽" },
    "United States": { flag: "🇺🇸" },
    "France": { flag: "🇫🇷" },
    "Spain": { flag: "🇪🇸" },
    "Germany": { flag: "🇩🇪" },
    "Belgium": { flag: "🇧🇪" },
    "India": { flag: "🇮🇳" }
  };

  var COUNTRY_RESULT_META = {
    "Brazil": { bank: "Banco do Brasil", currency: "BRL", code: "BR", city: "São Paulo", state: "SP" },
    "South Korea": { bank: "Kookmin Bank", currency: "KRW", code: "KR", city: "Seoul", state: "Seoul" },
    "Mexico": { bank: "Banco Nacional de México", currency: "MXN", code: "MX", city: "Mexico City", state: "CDMX" },
    "United States": { bank: "Bank of America", currency: "USD", code: "US", city: "San Francisco", state: "California" },
    "France": { bank: "BNP Paribas", currency: "EUR", code: "FR", city: "Paris", state: "Île-de-France" },
    "Spain": { bank: "CaixaBank", currency: "EUR", code: "ES", city: "Madrid", state: "Madrid" },
    "Germany": { bank: "Deutsche Bank", currency: "EUR", code: "DE", city: "Berlin", state: "Berlin" },
    "Belgium": { bank: "KBC Bank", currency: "EUR", code: "BE", city: "Brussels", state: "Brussels" },
    "India": { bank: "HDFC Bank", currency: "INR", code: "IN", city: "Mumbai", state: "Maharashtra" }
  };

  var TEST_ENTITIES = {
    person: [
      { name: "Creator Payout", country: "United States", match: "Strong Match", tone: "positive",
        values: { "Full Name": "Jordan Rivera", "Bank Account Number": "US021000021987", "Clearing System ID": "USABA" } },
      { name: "Marketplace Withdrawal", country: "Brazil", match: "Partial Match", tone: "intermediate",
        values: { "Full Name": "Maria Silva", "National ID Number": "529.982.247-25", "IBAN": "BR15 0000 0000 0001 0094 5432 1001 2345 6789 C1" } },
      { name: "Freelancer Payment", country: "Mexico", match: "Strong Match", tone: "positive",
        values: { "Full Name": "Ana Gutierrez", "Bank Account Number": "012180001002345678901", "Clearing System ID": "012180", "BIC": "TESTMXMM" } },
      { name: "Payroll Disbursement", country: "France", match: "Strong Match", tone: "positive",
        values: { "Full Name": "Pierre Dupont", "IBAN": "FR14 2004 1010 0505 0001 3M02 606" } },
      { name: "Gig Worker Payout", country: "South Korea", match: "Partial Match", tone: "intermediate",
        values: { "Full Name": "Kim Min-jun", "Bank Account Number": "110-123-456789", "Clearing System ID": "KRABA", "BIC": "CZNBKRSE" } },
      { name: "Failed Verification", country: "Spain", match: "No Match", tone: "negative",
        values: { "First Name": "Ana", "First Surname": "García", "Second Surname": "López", "IBAN": "ES91 2100 0418 4502 0005 1332" } }
    ],
    business: [
      { name: "Supplier Payment", country: "Germany", match: "Strong Match", tone: "positive",
        values: { "Business Name": "Müller GmbH", "IBAN": "DE89 3704 0044 0532 0130 00", "Business Registration Number": "HRB 123456", "Tax ID Number": "DE123456789" } },
      { name: "Vendor Settlement", country: "Belgium", match: "Partial Match", tone: "intermediate",
        values: { "Business Name": "Bruxelles SA", "IBAN": "BE68 5390 0754 7034", "Business Registration Number": "BE 0123.456.789", "Tax ID Number": "BE0123456789" } },
      { name: "Enterprise Payout", country: "United States", match: "Strong Match", tone: "positive",
        values: { "Business Name": "Acme Corp Ltd", "Bank Account Number": "778812340091", "BIC": "BOFAUS3N", "Clearing System ID": "USABA" } },
      { name: "Marketplace Withdrawal", country: "India", match: "Partial Match", tone: "intermediate",
        values: { "Business Name": "Globex Trading", "Bank Account Number": "112233445566", "BIC": "HDFCINBB", "Clearing System ID": "INABA" } },
      { name: "Payroll Disbursement", country: "Brazil", match: "Strong Match", tone: "positive",
        values: { "Business Name": "TechBrasil Ltda", "IBAN": "BR15 0000 0000 0001 0094 5432 1001 2345 6789 C1", "Business Registration Number": "12.345.678/0001-90", "Tax ID Number": "12.345.678/0001-90", "Bank Account Number": "1234567890" } },
      { name: "Failed Verification", country: "South Korea", match: "No Match", tone: "negative",
        values: { "Business Name": "Seoul Ventures", "Bank Account Number": "220-456-789012", "BIC": "CZNBKRSE" } }
    ]
  };

  var GENERIC_FIELDS = {
    person: ["Full Name", "Account Number", "IBAN", "BIC / SWIFT Code"],
    business: ["Business Name", "Account Number", "IBAN", "BIC / SWIFT Code"]
  };

  var COUNTRY_FIELDS = {
    person: {
      "Brazil": ["Full Name", "National ID Number", "IBAN"],
      "South Korea": ["Full Name", "Bank Account Number", "Clearing System ID", "BIC"],
      "Mexico": ["Full Name", "Bank Account Number", "Clearing System ID", "BIC"],
      "United States": ["Full Name", "Bank Account Number", "Clearing System ID"],
      "France": ["Full Name", "IBAN"],
      "Spain": ["First Name", "First Surname", "Second Surname", "IBAN"]
    },
    business: {
      "Germany": ["Business Name", "IBAN", "Business Registration Number", "Tax ID Number"],
      "Belgium": ["Business Name", "IBAN", "Business Registration Number", "Tax ID Number"],
      "United States": ["Business Name", "Bank Account Number", "BIC", "Clearing System ID"],
      "India": ["Business Name", "Bank Account Number", "BIC", "Clearing System ID"],
      "Brazil": ["Business Name", "IBAN", "Business Registration Number", "Tax ID Number", "Bank Account Number"],
      "South Korea": ["Business Name", "Bank Account Number", "BIC"]
    }
  };

  var NAME_FIELDS = ["Full Name", "Business Name", "First Name", "First Surname", "Second Surname"];
  var ACCOUNT_FIELDS = ["Bank Account Number", "Account Number", "IBAN", "BIC", "BIC / SWIFT Code", "Clearing System ID"];

  function isNameField(fieldLabel) {
    return NAME_FIELDS.indexOf(fieldLabel) !== -1;
  }

  function isAccountField(fieldLabel) {
    return ACCOUNT_FIELDS.indexOf(fieldLabel) !== -1;
  }

  function secondaryFields(fields) {
    return fields.filter(function (fieldLabel) {
      return !isNameField(fieldLabel) && !isAccountField(fieldLabel);
    });
  }

  function matchResult(match, tone, score, risk, kind) {
    return { match: match, tone: tone, score: score, risk: risk, kind: kind };
  }

  function fieldsForCountry(accountType, country) {
    if (!country) return GENERIC_FIELDS[accountType].slice();
    var set = COUNTRY_FIELDS[accountType];
    return (set && set[country]) ? set[country].slice() : GENERIC_FIELDS[accountType].slice();
  }

  function entityFlag(country) {
    return COUNTRY_META[country] ? COUNTRY_META[country].flag : "";
  }

  function saveSession(session) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function loadSession() {
    try {
      var raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function showFormView() {
    var formView = document.getElementById("bv-form-view");
    var resultView = document.getElementById("bv-result-view");
    if (!formView || !resultView) return;
    formView.hidden = false;
    resultView.hidden = true;
    document.title = "Bank Verification — Trulioo Labs";
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  function showResultView() {
    var formView = document.getElementById("bv-form-view");
    var resultView = document.getElementById("bv-result-view");
    if (!formView || !resultView) return;
    formView.hidden = true;
    resultView.hidden = false;
    document.title = "Bank Verification Results — Trulioo Labs";
    history.replaceState(null, "", location.pathname + location.search + "#result");
  }

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function displayName(values, accountType) {
    if (accountType === "business") return values["Business Name"] || "Unknown Business";
    if (values["Full Name"]) return values["Full Name"];
    var parts = [values["First Name"], values["First Surname"], values["Second Surname"]].filter(Boolean);
    return parts.length ? parts.join(" ") : "Unknown Individual";
  }

  function inferMatch(values) {
    var acct = (values["Bank Account Number"] || values["Account Number"] || values["IBAN"] || "").toUpperCase();
    if (acct.indexOf("NOMATCH") !== -1 || acct.indexOf("PARTIAL") !== -1) {
      return matchResult("No Match", "negative", 12, "high", "negative");
    }

    var nameFail = NAME_FIELDS.some(function (field) {
      return (values[field] || "").toUpperCase().indexOf("NOMATCH") !== -1;
    });
    if (nameFail) {
      return matchResult("No Match", "negative", 12, "high", "negative");
    }

    var secondaryPartial = Object.keys(values).some(function (key) {
      if (isNameField(key) || isAccountField(key)) return false;
      return (values[key] || "").toUpperCase().indexOf("PARTIAL") !== -1;
    });
    if (secondaryPartial) {
      return matchResult("Partial Match", "intermediate", 61, "medium", "intermediate");
    }

    return matchResult("Strong Match", "positive", 92, "low", "positive");
  }

  function matchFromEntity(entity) {
    var score = entity.match === "Strong Match" ? 92 : entity.match === "Partial Match" ? 61 : 12;
    return matchResult(
      entity.match,
      entity.tone,
      score,
      entity.tone === "positive" ? "low" : entity.tone === "intermediate" ? "medium" : "high",
      entity.tone === "positive" ? "positive" : entity.tone === "intermediate" ? "intermediate" : "negative"
    );
  }

  function fieldResultKind(fieldLabel, matchInfo, countryFields) {
    var secondaries = secondaryFields(countryFields);

    if (matchInfo.match === "Strong Match") return "positive";

    if (matchInfo.match === "No Match") {
      if (isNameField(fieldLabel) || isAccountField(fieldLabel)) return "negative";
      return "positive";
    }

    // Partial Match — identity + account must exact-match; only secondary fields may fail.
    if (isNameField(fieldLabel) || isAccountField(fieldLabel)) return "positive";
    if (secondaries.length && fieldLabel === secondaries[0]) return "negative";
    return "positive";
  }

  function buildFieldDetail(fieldLabel, value, kind, matchLevel) {
    if (!value) return null;
    if (kind === "negative") {
      return { input: value, returned: null };
    }
    if (kind === "positive" && ACCOUNT_FIELDS.indexOf(fieldLabel) !== -1 && matchLevel === "Strong Match") {
      return null;
    }
    if (kind === "positive") {
      return { input: value, returned: value };
    }
    return null;
  }

  function buildFieldMatches(values, matchInfo, accountType, country) {
    var fields = fieldsForCountry(accountType, country);

    return fields.map(function (fieldLabel) {
      var kind = fieldResultKind(fieldLabel, matchInfo, fields);
      var value = values[fieldLabel] || "";
      return {
        signal: fieldLabel,
        detail: buildFieldDetail(fieldLabel, value, kind, matchInfo.match),
        result: kind === "negative" ? "No match" : "Match",
        kind: kind
      };
    });
  }

  function buildAppended(values, matchInfo, country, accountType, meta) {
    var rows = [
      { label: accountType === "business" ? "Business Name" : "Full Name", value: displayName(values, accountType) }
    ];
    if (values["Bank Account Number"] || values["Account Number"]) {
      rows.push({ label: "Account Number", value: values["Bank Account Number"] || values["Account Number"] });
    }
    rows.push(
      { label: "Bank Name", value: meta.bank },
      { label: "Local Currency", value: meta.currency },
      { label: "City", value: meta.city },
      { label: "State", value: meta.state }
    );
    if (values["IBAN"]) rows.push({ label: "IBAN", value: values["IBAN"] });
    rows.push({ label: "Confidence Score", value: (matchInfo.score / 100).toFixed(2) });
    rows.push({ label: "Country", value: meta.code });
    return rows;
  }

  function buildTruAi(name, matchInfo) {
    if (matchInfo.match === "Strong Match") {
      return name + "\u2019s bank account has been verified. No additional steps required.";
    }
    if (matchInfo.match === "Partial Match") {
      return "Some discrepancies were detected for " + name + "\u2019s bank account. Manual review is recommended.";
    }
    return "Could not confirm account ownership for " + name + ". Review the field match results below.";
  }

  function buildResultConfig(session) {
    var st = session.state;
    var values = Object.assign({}, session.values);
    var entity = null;

    if (st.testEntity && st.selectedTestEntity != null) {
      entity = TEST_ENTITIES[st.accountType][st.selectedTestEntity];
      values = Object.assign({}, entity.values, values);
    }

    var country = st.country || (entity && entity.country) || "United States";
    var meta = COUNTRY_RESULT_META[country] || COUNTRY_RESULT_META["United States"];
    var matchInfo = entity ? matchFromEntity(entity) : inferMatch(values);
    var name = displayName(values, st.accountType);
    var fieldMatches = buildFieldMatches(values, matchInfo, st.accountType, country);
    var matchCount = fieldMatches.filter(function (r) { return r.kind === "positive"; }).length;
    var txnId = uuid();

    return {
      displayName: name,
      country: country,
      countryFlag: entityFlag(country),
      match: matchInfo.match,
      tone: matchInfo.tone,
      score: matchInfo.score,
      risk: matchInfo.risk,
      transactionId: txnId,
      testEntity: entity,
      testEntityIndex: st.selectedTestEntity,
      testEntityMode: !!(st.testEntity && st.selectedTestEntity != null),
      accountType: st.accountType,
      matchCount: matchCount,
      truAi: buildTruAi(name, matchInfo),
      fieldMatches: fieldMatches,
      appended: buildAppended(values, matchInfo, country, st.accountType, meta),
      raw: {
        transactionId: txnId,
        verificationStatus: matchInfo.match,
        matchScore: matchInfo.score / 100,
        country: meta.code,
        accountType: st.accountType,
        input: values,
        appended: buildAppended(values, matchInfo, country, st.accountType, meta)
      }
    };
  }

  function applyTestEntityToSession(session, index) {
    var entity = TEST_ENTITIES[session.state.accountType][index];
    session.state.selectedTestEntity = index;
    session.state.country = entity.country;
    session.values = Object.assign({}, entity.values);
    saveSession(session);
    return session;
  }

  function sortedEntityEntries(entities, selectedIndex) {
    var entries = entities.map(function (ent, i) { return { ent: ent, index: i }; });
    if (selectedIndex == null) return entries;
    entries.sort(function (a, b) {
      if (a.index === selectedIndex) return -1;
      if (b.index === selectedIndex) return 1;
      return a.index - b.index;
    });
    return entries;
  }

  var tooltipEl = null;

  function ensureTooltip() {
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "bv-floating-tooltip";
      tooltipEl.setAttribute("role", "tooltip");
      tooltipEl.hidden = true;
      document.body.appendChild(tooltipEl);
    }
    return tooltipEl;
  }

  function bindEllipsisTooltip(el, text) {
    if (!el || !text) return;
    el.addEventListener("mouseenter", function () {
      if (el.scrollWidth <= el.clientWidth + 1) return;
      var tip = ensureTooltip();
      tip.textContent = text;
      tip.hidden = false;
      var rect = el.getBoundingClientRect();
      tip.style.left = Math.max(8, rect.left) + "px";
      tip.style.top = rect.top + "px";
      tip.style.transform = "translateY(calc(-100% - 6px))";
    });
    el.addEventListener("mouseleave", function () {
      if (tooltipEl) tooltipEl.hidden = true;
    });
  }

  function bindTooltip(el, text) {
    if (!el || !text) return;
    function show() {
      var tip = ensureTooltip();
      tip.textContent = text;
      tip.hidden = false;
      var rect = el.getBoundingClientRect();
      tip.style.left = Math.max(8, rect.left + rect.width / 2) + "px";
      tip.style.top = rect.top + "px";
      tip.style.transform = "translate(-50%, calc(-100% - 6px))";
    }
    function hide() {
      if (tooltipEl) tooltipEl.hidden = true;
    }
    el.addEventListener("mouseenter", show);
    el.addEventListener("focus", show);
    el.addEventListener("mouseleave", hide);
    el.addEventListener("blur", hide);
  }

  function initAppNavToggle() {
    var shell = document.getElementById("app-shell");
    var overlay = document.getElementById("app-sidenav-overlay");
    if (!shell || !overlay) return;

    var toggles = shell.querySelectorAll(".app-nav-toggle");
    if (!toggles.length) return;

    function setOpen(open) {
      shell.classList.toggle("app-shell--nav-open", open);
      toggles.forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      });
      overlay.hidden = !open;
      overlay.setAttribute("aria-hidden", String(!open));
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        setOpen(!shell.classList.contains("app-shell--nav-open"));
      });
    });
    overlay.addEventListener("click", function () {
      setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && shell.classList.contains("app-shell--nav-open")) {
        setOpen(false);
      }
    });
    window.matchMedia("(min-width: 769px)").addEventListener("change", function (query) {
      if (query.matches) setOpen(false);
    });
  }

  global.BVShared = {
    SESSION_KEY: SESSION_KEY,
    COUNTRY_META: COUNTRY_META,
    GENERIC_FIELDS: GENERIC_FIELDS,
    COUNTRY_FIELDS: COUNTRY_FIELDS,
    TEST_ENTITIES: TEST_ENTITIES,
    fieldsForCountry: fieldsForCountry,
    entityFlag: entityFlag,
    saveSession: saveSession,
    loadSession: loadSession,
    buildResultConfig: buildResultConfig,
    applyTestEntityToSession: applyTestEntityToSession,
    sortedEntityEntries: sortedEntityEntries,
    bindEllipsisTooltip: bindEllipsisTooltip,
    bindTooltip: bindTooltip,
    initAppNavToggle: initAppNavToggle,
    showFormView: showFormView,
    showResultView: showResultView
  };
})(window);
