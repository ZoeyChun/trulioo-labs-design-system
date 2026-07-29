/**
 * TruAI chat response data — Document Verification static page.
 */
(function (global) {
  "use strict";

  var DEFAULT_PROMPTS = [
    "Summarize this verification result",
    "Does the selfie match the document?",
    "What fraud signals were detected?",
  ];

  var HEADLINE_TOPICS = [
    "Document Authenticity",
    "Biometric Match",
    "Fraud Signals",
    "Data Consistency",
    "Device Risk",
  ];

  var COMPOSER_PLACEHOLDER = "Ask about this verification...";

  var SCENARIO_META = {
    "happy-path": {
      status: "Accepted",
      tone: "low",
      checksPassed: 5,
      checksTotal: 5,
      defaultTab: "document",
    },
    "expired-document": {
      status: "Review",
      tone: "medium",
      checksPassed: 4,
      checksTotal: 5,
      defaultTab: "document",
    },
    "face-mismatch": {
      status: "Review",
      tone: "medium",
      checksPassed: 3,
      checksTotal: 5,
      defaultTab: "biometrics",
    },
    "dob-mismatch": {
      status: "Review",
      tone: "medium",
      checksPassed: 4,
      checksTotal: 5,
      defaultTab: "data-match",
    },
    "known-face-hit": {
      status: "Declined",
      tone: "high",
      checksPassed: 2,
      checksTotal: 5,
      defaultTab: "biometrics",
    },
    "deepfake-detected": {
      status: "Declined",
      tone: "high",
      checksPassed: 3,
      checksTotal: 5,
      defaultTab: "biometrics",
    },
  };

  function scenarioKey() {
    var selected = document.querySelector(".dv-te-option[aria-selected='true']");
    if (selected) return selected.getAttribute("data-id") || "happy-path";
    var bodyScenario = document.body.getAttribute("data-dv-scenario");
    if (bodyScenario && SCENARIO_META[bodyScenario]) return bodyScenario;
    return "happy-path";
  }

  function entityName() {
    var title = document.querySelector(".dv-title");
    return title ? title.textContent.trim() : "Jane Doe";
  }

  function summaryText() {
    var el = document.getElementById("dv-truai-text");
    return el ? el.textContent.trim() : "";
  }

  function metaForScenario(key) {
    return SCENARIO_META[key] || SCENARIO_META["happy-path"];
  }

  function buildSummaryResponse(name, key) {
    var meta = metaForScenario(key);
    var sidebarSummary = summaryText();
    var summary =
      sidebarSummary ||
      (meta.tone === "low"
        ? name + "'s identity has been verified. All required checks passed."
        : meta.tone === "high"
          ? name + "'s verification was declined due to elevated fraud or biometric risk."
          : name + "'s verification needs manual review before a decision can be made.");

    return {
      thinkingLabel: "Reviewing verification for " + name + "…",
      sourceLabel: meta.checksPassed + " of " + meta.checksTotal + " checks passed",
      summary: summary,
      hero: {
        value: String(meta.checksPassed) + "/" + String(meta.checksTotal),
        label: meta.status,
        meta: [meta.tone === "low" ? "High confidence" : "Review recommended"],
        tone: meta.tone,
      },
      driversTitle: "Check breakdown",
      drivers: buildCheckDrivers(key),
      findingsTitle: "Key findings",
      findings: buildFindings(key),
      primaryAction: {
        label: meta.tone === "low" ? "View document details" : "Review failed checks",
        tab: meta.defaultTab,
      },
      secondaryAction: {
        label: "View network insights",
        tab: "network-insights",
      },
    };
  }

  function buildCheckDrivers(key) {
    if (key === "happy-path") {
      return [
        { title: "Document", badge: "Accepted", badgeTone: "positive", detail: "Authentic and not expired." },
        { title: "Biometrics", badge: "Accepted", badgeTone: "positive", detail: "Selfie matches document portrait." },
        { title: "Data Match", badge: "6 matches", badgeTone: "positive", detail: "Submitted data matches extracted fields." },
      ];
    }
    if (key === "expired-document") {
      return [
        { title: "Document", badge: "Declined", badgeTone: "negative", detail: "Document expired on 15 January 2023." },
        { title: "Biometrics", badge: "Accepted", badgeTone: "positive", detail: "Selfie matches document portrait." },
        { title: "Data Match", badge: "6 matches", badgeTone: "positive", detail: "Extracted data is internally consistent." },
      ];
    }
    if (key === "face-mismatch") {
      return [
        { title: "Document", badge: "Accepted", badgeTone: "positive", detail: "Document authenticity verified." },
        { title: "Biometrics", badge: "Declined", badgeTone: "negative", detail: "Selfie does not match document portrait." },
        { title: "Liveness", badge: "Passed", badgeTone: "positive", detail: "No spoofing detected during capture." },
      ];
    }
    if (key === "dob-mismatch") {
      return [
        { title: "Document", badge: "Accepted", badgeTone: "positive", detail: "Document is authentic and valid." },
        { title: "Data Match", badge: "Mismatch", badgeTone: "negative", detail: "Submitted DOB differs from document extraction." },
        { title: "Biometrics", badge: "Accepted", badgeTone: "positive", detail: "Selfie matches document portrait." },
      ];
    }
    if (key === "known-face-hit") {
      return [
        { title: "Known Faces", badge: "Match", badgeTone: "negative", detail: "Face linked to a previously declined identity." },
        { title: "Document", badge: "Accepted", badgeTone: "positive", detail: "Document authenticity verified." },
        { title: "Network", badge: "Elevated", badgeTone: "intermediate", detail: "Cross-transaction fraud signals detected." },
      ];
    }
    if (key === "deepfake-detected") {
      return [
        { title: "Biometrics", badge: "Declined", badgeTone: "negative", detail: "Synthetic selfie detected." },
        { title: "Document", badge: "Accepted", badgeTone: "positive", detail: "Document authenticity verified." },
        { title: "Liveness", badge: "Failed", badgeTone: "negative", detail: "Unnatural facial motion during capture." },
      ];
    }
    return buildCheckDrivers("happy-path");
  }

  function buildFindings(key) {
    if (key === "happy-path") return ["All verification checks passed", "No fraud signals detected"];
    if (key === "expired-document") return ["Document is authentic but expired", "Network intelligence is clean"];
    if (key === "face-mismatch") return ["Selfie does not match document portrait", "Liveness check passed"];
    if (key === "dob-mismatch") return ["DOB mismatch between submission and document", "Manual review recommended"];
    if (key === "known-face-hit") return ["Face matches prior fraud-associated identity", "Document checks otherwise passed"];
    if (key === "deepfake-detected") return ["Synthetic biometric capture detected", "Document and data match are valid"];
    return ["Review verification details for more context"];
  }

  function buildBiometricResponse(name, key) {
    var matched = key === "happy-path" || key === "expired-document" || key === "dob-mismatch";
    var summary = matched
      ? "The selfie for " + name + " matches the portrait on the submitted driver's license with high confidence."
      : key === "face-mismatch"
        ? "The selfie for " + name + " does not match the portrait on the document, despite a passing liveness check."
        : key === "deepfake-detected"
          ? "The selfie for " + name + " shows signs of synthetic generation and cannot be trusted for identity verification."
          : "Biometric review for " + name + " flagged elevated risk due to a known-face match.";

    return {
      thinkingLabel: "Comparing biometrics for " + name + "…",
      sourceLabel: "4 biometric signals",
      summary: summary,
      hero: {
        value: matched ? "98%" : key === "face-mismatch" ? "41%" : "12%",
        label: matched ? "Match" : "No match",
        meta: [matched ? "High confidence" : "Manual review"],
        tone: matched ? "low" : "high",
      },
      driversTitle: "Biometric checks",
      drivers: buildCheckDrivers(key).filter(function (d) {
        return d.title === "Biometrics" || d.title === "Liveness" || d.title === "Known Faces";
      }),
      findingsTitle: "Notes",
      findings: buildFindings(key).slice(0, 2),
      primaryAction: { label: "Open biometrics tab", tab: "biometrics" },
      secondaryAction: { label: "View document", tab: "document" },
    };
  }

  function buildFraudResponse(name, key) {
    var hasFraud = key === "known-face-hit" || key === "deepfake-detected";
    var summary = hasFraud
      ? "Fraud signals were detected for " + name + " across biometrics and network intelligence."
      : key === "face-mismatch" || key === "dob-mismatch" || key === "expired-document"
        ? "No cross-transaction fraud signals were detected for " + name + ". The issue is limited to verification policy checks."
        : "No fraud signals were detected for " + name + ". Document, biometric, and network activity appear consistent.";

    return {
      thinkingLabel: "Scanning fraud signals for " + name + "…",
      sourceLabel: hasFraud ? "3 fraud signals" : "0 fraud signals",
      summary: summary,
      hero: {
        value: hasFraud ? "3" : "0",
        label: hasFraud ? "Signals found" : "Clear",
        meta: [hasFraud ? "Elevated risk" : "No network risk"],
        tone: hasFraud ? "high" : "low",
      },
      driversTitle: "Signals reviewed",
      drivers:
        hasFraud
          ? buildCheckDrivers(key)
          : [
              { title: "Known Faces", badge: "Clear", badgeTone: "positive", detail: "No prior fraud association." },
              { title: "Network Insights", badge: "Clear", badgeTone: "positive", detail: "No cross-transaction anomalies." },
              { title: "Device Intelligence", badge: "Low risk", badgeTone: "positive", detail: "Trusted device and session." },
            ],
      findingsTitle: "Key findings",
      findings: buildFindings(key).slice(0, 2),
      primaryAction: {
        label: hasFraud ? "Review network insights" : "View device intelligence",
        tab: hasFraud ? "network-insights" : "device-intelligence",
      },
      secondaryAction: { label: "View biometrics", tab: "biometrics" },
    };
  }

  function buildTruAIResponse(prompt) {
    var name = entityName();
    var key = scenarioKey();

    switch (prompt) {
      case "Summarize this verification result":
        return buildSummaryResponse(name, key);
      case "Does the selfie match the document?":
        return buildBiometricResponse(name, key);
      case "What fraud signals were detected?":
        return buildFraudResponse(name, key);
      default:
        return buildSummaryResponse(name, key);
    }
  }

  global.TruAIResponses = {
    defaultPrompts: DEFAULT_PROMPTS,
    headlineTopics: HEADLINE_TOPICS,
    composerPlaceholder: COMPOSER_PLACEHOLDER,
    buildTruAIResponse: buildTruAIResponse,
    entityName: entityName,
    scenarioKey: scenarioKey,
  };
})(window);
