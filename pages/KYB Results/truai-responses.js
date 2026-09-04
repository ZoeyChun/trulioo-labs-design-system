/**
 * TruAI chat response data — mirrors React truai-responses.ts for static pages.
 */
(function (global) {
  "use strict";

  var DEFAULT_PROMPTS = [
    "Why is this entity high risk?",
    "Who ultimately owns this business?",
    "Has this entity ever traded?",
  ];

  var HEADLINE_TOPICS = [
    "Business Insights",
    "Ownership Structure",
    "Risk Signals",
    "Compliance Flags",
    "Financial Health",
  ];

  var DRIVER_DETAILS = {
    "Business Model": "No operating footprint detected.",
    "Financial Health": "Default risk and delinquencies flagged.",
    "Fraud & Financial Crimes": "Sanctions checks clean.",
    "Governance & Compliance": "Formations-agent registered address.",
    "Third-Party & Market": "Sparse market presence.",
  };

  var PROFILES = {
    elevated: { score: 81, label: "High Risk", risk: "high", signalCount: 38, confidence: "Medium" },
    standard: { score: 28, label: "Low Risk", risk: "low", signalCount: 12, confidence: "High" },
    complex: { score: 72, label: "Medium Risk", risk: "medium", signalCount: 31, confidence: "Medium" },
    default: { score: 55, label: "Medium Risk", risk: "medium", signalCount: 24, confidence: "Medium" },
  };

  var RISK_CATEGORIES = {
    elevated: [
      { title: "Business Model", score: 92, riskTone: "negative" },
      { title: "Financial Health", score: 85, riskTone: "negative" },
    ],
    standard: [
      { title: "Governance & Compliance", score: 18, riskTone: "positive" },
      { title: "Business Model", score: 22, riskTone: "positive" },
    ],
    complex: [
      { title: "Governance & Compliance", score: 68, riskTone: "intermediate" },
      { title: "Third-Party & Market", score: 61, riskTone: "intermediate" },
    ],
    default: [
      { title: "Financial Health", score: 58, riskTone: "intermediate" },
      { title: "Business Model", score: 52, riskTone: "intermediate" },
    ],
  };

  var FINDINGS = {
    elevated: ["No verifiable operating footprint", "BVI holding in ownership chain"],
    standard: ["Direct verified ownership", "Clean registry history"],
    complex: ["Multi-layer offshore structure", "Inferred beneficial owner"],
    default: ["Partial ownership disclosure", "Filing gaps detected"],
  };

  var OWNERSHIP = {
    elevated: {
      hero: { value: "4", label: "Ownership layers", meta: ["UBO inferred"], tone: "high" },
      drivers: [
        { title: "Apex Holdings BVI Ltd.", badge: "Inferred", badgeTone: "intermediate", detail: "100% parent · BVI" },
        { title: "James Whitmore", badge: "Verified", badgeTone: "positive", detail: "Director · UK registry" },
      ],
      findings: ["Offshore holding in chain", "UBO not independently verified"],
      primaryAction: { label: "Start enhanced due diligence", tab: "ownership" },
      secondaryAction: { label: "Request documentation", tab: "sources" },
    },
    standard: {
      hero: { value: "1", label: "Ownership layers", meta: ["Direct ownership"], tone: "low" },
      drivers: [{ title: "Sarah Chen", badge: "Verified", badgeTone: "positive", detail: "100% beneficial owner" }],
      findings: ["No offshore intermediaries"],
      primaryAction: { label: "Proceed with onboarding", tab: "monitoring" },
      secondaryAction: { label: "View ownership table", tab: "ownership" },
    },
    complex: {
      hero: { value: "6", label: "Ownership layers", meta: ["Inferred UBO"], tone: "medium" },
      drivers: [
        { title: "Helix Meridian Holdings BVI Ltd.", badge: "Inferred", badgeTone: "intermediate", detail: "100% parent · BVI" },
        { title: "David Okonkwo", badge: "Verified", badgeTone: "positive", detail: "Director · UK registry" },
      ],
      findings: ["Multi-layer offshore structure", "Inferred beneficial owner"],
      primaryAction: { label: "Review ownership chain", tab: "ownership" },
      secondaryAction: { label: "View signal breakdown", tab: "signals" },
    },
    default: {
      hero: { value: "2", label: "Ownership layers", meta: ["Partial disclosure"], tone: "medium" },
      drivers: [
        { title: "Registered shareholder", badge: "Partial", badgeTone: "intermediate", detail: "Nominee on file" },
      ],
      findings: ["Partial ownership disclosure", "Filing gaps detected"],
      primaryAction: { label: "Request documentation", tab: "sources" },
      secondaryAction: { label: "View ownership table", tab: "ownership" },
    },
  };

  var TRADING = {
    elevated: {
      hero: { value: "£0", label: "Reported revenue", meta: ["No trading evidence"], tone: "high" },
      drivers: [
        { title: "Companies House filings", badge: "Dormant", badgeTone: "negative", detail: "No turnover reported" },
        { title: "Trade references", badge: "None", badgeTone: "negative", detail: "No supplier activity" },
      ],
      findings: ["No evidence of active trading", "Dormant company status"],
      primaryAction: { label: "Review negative signals", tab: "signals" },
      secondaryAction: { label: "Check registry filings", tab: "sources" },
    },
    standard: {
      hero: { value: "£2.4M", label: "Reported revenue", meta: ["Active since 2019"], tone: "low" },
      drivers: [
        { title: "Annual accounts", badge: "Filed", badgeTone: "positive", detail: "Consistent revenue growth" },
      ],
      findings: ["Active trading since 2019", "Stable revenue filings"],
      primaryAction: { label: "Proceed with onboarding", tab: "monitoring" },
      secondaryAction: { label: "View financial signals", tab: "signals" },
    },
    complex: {
      hero: { value: "Limited", label: "Trading evidence", meta: ["Cross-border"], tone: "medium" },
      drivers: [
        { title: "Import/export records", badge: "Partial", badgeTone: "intermediate", detail: "Sparse cross-border activity" },
      ],
      findings: ["Trading hard to verify", "Limited supporting evidence"],
      primaryAction: { label: "Review signal breakdown", tab: "signals" },
      secondaryAction: { label: "Request documentation", tab: "sources" },
    },
    default: {
      hero: { value: "Unknown", label: "Trading status", meta: ["Inconclusive"], tone: "medium" },
      drivers: [
        { title: "Registry filings", badge: "Partial", badgeTone: "intermediate", detail: "Incomplete financial data" },
      ],
      findings: ["Trading history inconclusive", "Additional review recommended"],
      primaryAction: { label: "Review negative signals", tab: "signals" },
      secondaryAction: { label: "Check registry filings", tab: "sources" },
    },
  };

  function sampleKey() {
    var sample = document.body.getAttribute("data-kyb-entity-applied");
    if (sample && sample !== "custom" && PROFILES[sample]) return sample;
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get("sample");
    if (fromUrl && PROFILES[fromUrl]) return fromUrl;
    return "elevated";
  }

  function entityName() {
    return (
      document.body.getAttribute("data-kyb-entity-name") ||
      (document.querySelector(".dv-title") && document.querySelector(".dv-title").textContent.trim()) ||
      "Meridian Apex Consulting Ltd."
    );
  }

  function buildDrivers(key) {
    return (RISK_CATEGORIES[key] || RISK_CATEGORIES.elevated).map(function (cat) {
      return {
        title: cat.title,
        badge: String(cat.score),
        badgeTone: cat.riskTone === "negative" ? "negative" : cat.riskTone === "intermediate" ? "intermediate" : "positive",
        detail: DRIVER_DETAILS[cat.title] || "Elevated signals in this domain.",
      };
    });
  }

  function buildRiskResponse(name, key) {
    var profile = PROFILES[key] || PROFILES.elevated;
    var summary =
      profile.risk === "high"
        ? name + " scores " + profile.score + " (" + profile.label + ") — risk is concentrated in business model and financial health."
        : profile.risk === "medium"
          ? name + " scores " + profile.score + " (" + profile.label + ") with mixed signals across a few domains."
          : name + " scores " + profile.score + " (" + profile.label + ") with no major elevated signals.";

    return {
      thinkingLabel: "Reviewing signals for " + name + "…",
      sourceLabel: profile.signalCount + " signals",
      summary: summary,
      hero: {
        value: String(profile.score),
        label: profile.label,
        meta: [profile.confidence + " confidence"],
        tone: profile.risk,
      },
      driversTitle: "Top drivers",
      drivers: buildDrivers(key),
      findingsTitle: "Key findings",
      findings: (FINDINGS[key] || FINDINGS.elevated).slice(0, 2),
      primaryAction: {
        label: profile.risk === "high" ? "Start enhanced due diligence" : "Review signal breakdown",
        tab: profile.risk === "high" ? "ownership" : "signals",
      },
      secondaryAction: {
        label: profile.risk === "high" ? "Review negative signals" : "View signal breakdown",
        tab: "signals",
      },
    };
  }

  function buildOwnershipResponse(name, key) {
    var template = OWNERSHIP[key] || OWNERSHIP.elevated;
    var summary =
      key === "standard"
        ? name + " has direct verified ownership with no offshore intermediaries."
        : key === "elevated"
          ? "Ownership for " + name + " traces through " + template.hero.value + " layers with an inferred offshore parent."
          : "Ownership for " + name + " requires further review across " + template.hero.value + " structural layers.";

    return Object.assign(
      {
        thinkingLabel: "Tracing ownership for " + name + "…",
        sourceLabel: "8 registry sources",
        summary: summary,
        driversTitle: "Ownership chain",
        findingsTitle: "Notes",
      },
      template
    );
  }

  function buildTradingResponse(name, key) {
    var template = TRADING[key] || TRADING.elevated;
    var summary =
      key === "standard"
        ? name + " shows active trading since 2019 with stable revenue filings."
        : key === "elevated"
          ? name + " reports " + template.hero.value + " revenue — no evidence of active trading."
          : key === "complex"
            ? "Trading for " + name + " is hard to verify — limited supporting evidence."
            : "Trading history for " + name + " is inconclusive from available filings.";

    return Object.assign(
      {
        thinkingLabel: "Checking activity for " + name + "…",
        sourceLabel: "5 financial sources",
        summary: summary,
        driversTitle: "Evidence reviewed",
        findingsTitle: "Key findings",
      },
      template
    );
  }

  function promptKind(prompt) {
    var normalized = (prompt || "").trim().toLowerCase();
    if (!normalized) return "risk";
    if (
      normalized === "why is this entity high risk?" ||
      normalized === "why is this high risk?" ||
      normalized.indexOf("high risk") !== -1
    ) {
      return "risk";
    }
    if (
      normalized === "who ultimately owns this business?" ||
      normalized === "who is the ubo?" ||
      normalized.indexOf("ubo") !== -1 ||
      normalized.indexOf("owns this") !== -1
    ) {
      return "ownership";
    }
    if (normalized.indexOf("traded") !== -1 || normalized.indexOf("trading") !== -1) {
      return "trading";
    }
    return "risk";
  }

  function buildTruAIResponse(prompt) {
    var name = entityName();
    var key = sampleKey();

    switch (promptKind(prompt)) {
      case "ownership":
        return buildOwnershipResponse(name, key);
      case "trading":
        return buildTradingResponse(name, key);
      default:
        return buildRiskResponse(name, key);
    }
  }

  global.TruAIResponses = {
    defaultPrompts: DEFAULT_PROMPTS,
    headlineTopics: HEADLINE_TOPICS,
    buildTruAIResponse: buildTruAIResponse,
    entityName: entityName,
    sampleKey: sampleKey,
  };
})(window);
