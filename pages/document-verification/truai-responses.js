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
      defaultTab: "summary",
    },
    "expired-document": {
      status: "Review",
      tone: "medium",
      checksPassed: 4,
      checksTotal: 5,
      defaultTab: "summary",
    },
    "face-mismatch": {
      status: "Review",
      tone: "medium",
      checksPassed: 3,
      checksTotal: 5,
      defaultTab: "summary",
    },
    "dob-mismatch": {
      status: "Review",
      tone: "medium",
      checksPassed: 4,
      checksTotal: 5,
      defaultTab: "summary",
    },
    "known-face-hit": {
      status: "Declined",
      tone: "high",
      checksPassed: 2,
      checksTotal: 5,
      defaultTab: "summary",
    },
    "deepfake-detected": {
      status: "Declined",
      tone: "high",
      checksPassed: 3,
      checksTotal: 5,
      defaultTab: "summary",
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
    var overall = document.getElementById("dv-truai-overall");
    if (overall && overall.textContent.trim()) return overall.textContent.trim();
    var el = document.getElementById("dv-truai-text");
    return el ? el.textContent.trim() : "";
  }

  function documentSummaryText() {
    var el = document.getElementById("dv-truai-text");
    return el ? el.textContent.trim() : "";
  }

  function highlightValue(index) {
    var fields = document.querySelectorAll("#dv-highlights .tds-data-field__value");
    return fields[index] ? fields[index].textContent.trim() : "";
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
    var sidebarSummary = documentSummaryText();
    var summary =
      sidebarSummary ||
      (matched
        ? "The selfie for " + name + " matches the portrait on the submitted driver's license with high confidence."
        : key === "face-mismatch"
          ? "The selfie for " + name + " does not match the portrait on the document, despite a passing liveness check."
          : key === "deepfake-detected"
            ? "The selfie for " + name + " shows signs of synthetic generation and cannot be trusted for identity verification."
            : "Biometric review for " + name + " flagged elevated risk due to a known-face match.");

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

  function buildDocumentBreakdownResponse(name, key) {
    var meta = metaForScenario(key);
    var sidebarSummary = documentSummaryText();
    var signals = highlightValue(0) || "13";
    var passRate = highlightValue(1) || "100%";
    var failed = highlightValue(2) || "0";
    var failedCount = parseInt(failed, 10);
    var allPassed = !failedCount;
    var summary =
      sidebarSummary ||
      (allPassed
        ? "All document signals passed. The document is authentic and valid."
        : "Some document signals did not pass. Review the failed checks in the Document tab.");

    var drivers;
    if (key === "expired-document") {
      drivers = [
        { title: "Expiry date check", badge: "Failed", badgeTone: "negative", detail: "Document expired on 15 January 2023." },
        { title: "Authenticity", badge: "Passed", badgeTone: "positive", detail: "No signs of tampering or substitution." },
        { title: "Document type", badge: "Passed", badgeTone: "positive", detail: "Driver’s license recognized." },
      ];
    } else if (key === "dob-mismatch") {
      drivers = [
        { title: "DOB cross-check", badge: "Review", badgeTone: "intermediate", detail: "Applicant input does not match document OCR." },
        { title: "Authenticity", badge: "Passed", badgeTone: "positive", detail: "Document is authentic and valid." },
        { title: "Expiry date check", badge: "Passed", badgeTone: "positive", detail: "Document is not expired." },
      ];
    } else {
      drivers = [
        { title: "Authenticity", badge: "Passed", badgeTone: "positive", detail: "No signs of tampering or substitution." },
        { title: "Expiry date check", badge: "Passed", badgeTone: "positive", detail: "Document is not expired." },
        { title: "Portrait quality", badge: "Passed", badgeTone: "positive", detail: "Document portrait is usable for comparison." },
      ];
    }

    return {
      thinkingLabel: "Reviewing document signals for " + name + "…",
      sourceLabel: signals + " signals checked",
      summary: summary,
      hero: {
        value: passRate,
        label: allPassed ? "Pass rate" : "Pass rate",
        meta: [failed + " failed check" + (failedCount === 1 ? "" : "s")],
        tone: allPassed ? "low" : meta.tone,
      },
      driversTitle: "Document signals",
      drivers: drivers,
      findingsTitle: "Key findings",
      findings: allPassed
        ? ["All document signals passed", "Any decline is from another check, not the document"]
        : buildFindings(key).slice(0, 2),
      primaryAction: { label: "View document signals", tab: "document" },
      secondaryAction: { label: "View biometrics", tab: "biometrics" },
    };
  }

  function buildNetworkInsightsResponse(name, key) {
    var sidebarSummary = documentSummaryText();
    var flagged = key === "known-face-hit";
    var summary =
      sidebarSummary ||
      (flagged
        ? "This face is linked to multiple identities. Network intelligence flagged synthetic identity and document conflict."
        : "No network-level risk signals were detected. Any decline comes from another check, not network activity.");
    return {
      thinkingLabel: "Reviewing network insights for " + name + "…",
      sourceLabel: flagged ? "Network fraud signals" : "4 categories checked",
      summary: summary,
      hero: {
        value: flagged ? "Flagged" : "Clean",
        label: "Network insights",
        meta: flagged
          ? ["Synthetic identity", "Document conflict"]
          : ["Transactions", "Identities", "Documents", "Devices"],
        tone: flagged ? "high" : "low",
      },
      driversTitle: "What we checked",
      drivers: [
        { title: "Transactions checked", badge: "Reviewed", badgeTone: flagged ? "negative" : "positive", detail: "Cross-transaction history for this identity." },
        { title: "Identities compared", badge: flagged ? "Conflict" : "Consistent", badgeTone: flagged ? "negative" : "positive", detail: "Whether this face appears under other identities." },
        { title: "Documents cross-referenced", badge: flagged ? "Conflict" : "Consistent", badgeTone: flagged ? "negative" : "positive", detail: "Whether document numbers conflict across history." },
        { title: "Devices reviewed", badge: "Reviewed", badgeTone: "positive", detail: "Whether the same device appears in related activity." },
      ],
      findingsTitle: "Key findings",
      findings: flagged
        ? ["Face reused across identities", "Document numbers conflict across history"]
        : ["No network-level risk signals", "Any decline is from another check, not the network"],
      primaryAction: { label: "View network insights", tab: "network-insights" },
      secondaryAction: { label: "View device intelligence", tab: "device-intelligence" },
    };
  }

  function buildDeviceScoreResponse(name, key) {
    var sidebarSummary = documentSummaryText();
    var highRisk = key === "known-face-hit" || key === "deepfake-detected";
    var summary =
      sidebarSummary ||
      (highRisk
        ? "Device signals indicate elevated risk. Review device history and capture integrity."
        : "Device environment shows no risk indicators.");
    var scoreField = highlightValue(0);
    return {
      thinkingLabel: "Reviewing device intelligence for " + name + "…",
      sourceLabel: highRisk ? "Elevated device risk" : "Low device risk",
      summary: summary,
      hero: {
        value: highRisk ? "High" : "Low",
        label: "Device risk",
        meta: scoreField ? ["Device ID " + scoreField] : ["Browser, OS, location, and history"],
        tone: highRisk ? "high" : "low",
      },
      driversTitle: "Score inputs",
      drivers: highRisk
        ? [
            { title: "Device history", badge: "Risk", badgeTone: "negative", detail: "Seen with multiple identities or declined transactions." },
            { title: "Capture integrity", badge: key === "deepfake-detected" ? "Risk" : "Reviewed", badgeTone: key === "deepfake-detected" ? "negative" : "default", detail: "Camera and session signals used in the score." },
            { title: "Location and network", badge: "Reviewed", badgeTone: "positive", detail: "VPN, proxy, and location consistency." },
          ]
        : [
            { title: "Browser and OS", badge: "Trusted", badgeTone: "positive", detail: "Recognized browser and operating system." },
            { title: "Location and timezone", badge: "Stable", badgeTone: "positive", detail: "Location and timezone are consistent." },
            { title: "Shared-device activity", badge: "None", badgeTone: "positive", detail: "No shared-device or identity-switching velocity." },
          ],
      findingsTitle: "Key findings",
      findings: highRisk
        ? ["Device risk contributed to the decline", "Review Device Information and evidence signals"]
        : ["No device risk indicators", "Any decline is from another check, not the device"],
      primaryAction: { label: "View device intelligence", tab: "device-intelligence" },
      secondaryAction: { label: "View network insights", tab: "network-insights" },
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
      case "View full signal breakdown":
        return buildDocumentBreakdownResponse(name, key);
      case "What causes low face match scores?":
      case "How is face match scored?":
      case "What does a known-face match mean?":
      case "Why did the face match fail?":
        return buildBiometricResponse(name, key);
      case "Why was this sent to review?":
      case "Why does the date of birth need review?":
        return buildSummaryResponse(name, key);
      case "What does network insights cover?":
        return buildNetworkInsightsResponse(name, key);
      case "How is device score calculated?":
        return buildDeviceScoreResponse(name, key);
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
