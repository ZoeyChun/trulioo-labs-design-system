/**
 * TruAI chat response data — Electronic ID static page.
 */
(function (global) {
  "use strict";

  var DEFAULT_PROMPTS = [
    "Summarize verified identity",
    "What identity data was verified?",
    "What device risk signals were detected?",
  ];

  var HEADLINE_TOPICS = [
    "Identity Verification",
    "iDIN Results",
    "Device Risk",
    "Identity Data",
    "Verification Status",
  ];

  var COMPOSER_PLACEHOLDER = "Ask about this electronic ID verification...";

  function entityName() {
    var title = document.getElementById("eid-person-name") || document.querySelector("#eid-result-view .dv-title");
    return title ? title.textContent.trim() : "Jane Doe";
  }

  function summaryText() {
    var el = document.getElementById("eid-truai-text");
    return el ? el.textContent.trim() : "";
  }

  function verificationStatus() {
    var assuranceBlock = document.getElementById("eid-assurance-block");
    if (assuranceBlock && !assuranceBlock.hidden) {
      var level = document.getElementById("eid-assurance-level");
      return level && level.textContent.trim() ? level.textContent.trim() : "Substantial";
    }
    var label = document.querySelector("#eid-summary-status .dv-summary-status__label");
    return label ? label.textContent.trim() : "Completed";
  }

  function deviceIntelligenceEnabled() {
    var diTab = document.getElementById("eid-di-tab");
    return diTab && !diTab.hidden;
  }

  function deviceRisk() {
    var gauge = document.getElementById("eid-device-gauge");
    var risk = gauge ? gauge.getAttribute("data-risk") || "low" : "low";
    var score = gauge ? gauge.getAttribute("data-score") || "2" : "2";
    return { risk: risk, score: score };
  }

  function statusTone(status) {
    if (/completed|verified|accepted|substantial|high/i.test(status)) return "low";
    if (/^low$/i.test(status)) return "medium";
    if (/review|partial/i.test(status)) return "medium";
    return "high";
  }

  function buildSummaryResponse(name) {
    var status = verificationStatus();
    var tone = statusTone(status);
    var summary =
      summaryText() ||
      (tone === "low"
        ? name + "'s electronic ID verification is completed. No additional steps are required."
        : tone === "medium"
          ? name + "'s electronic ID verification needs review before proceeding."
          : name + "'s electronic ID could not be verified. Check identity and device signals.");

    var device = deviceIntelligenceEnabled() ? deviceRisk() : { risk: "low", score: "2" };
    var meta = deviceIntelligenceEnabled()
      ? [device.risk === "high" ? "Elevated device risk" : "Device risk low"]
      : ["Device intelligence not enabled"];

    return {
      thinkingLabel: "Reviewing e-ID verification for " + name + "…",
      sourceLabel: "e-ID signals checked",
      summary: summary,
      hero: {
        value: status,
        label: "e-ID status",
        meta: meta,
        tone: tone,
      },
      driversTitle: "Verification checks",
      drivers: buildIdentityDrivers(status),
      findingsTitle: "Key findings",
      findings: buildFindings(status, device.risk, deviceIntelligenceEnabled()),
      primaryAction: { label: "View e-ID signals", tab: "e-id" },
      secondaryAction: deviceIntelligenceEnabled()
        ? { label: "Review device intelligence", tab: "device-intelligence" }
        : null,
    };
  }

  function buildIdentityDrivers(status) {
    if (statusTone(status) === "low") {
      return [
        { title: "Name", badge: "Verified", badgeTone: "positive", detail: "Matches provider bank record." },
        { title: "Date of birth", badge: "Verified", badgeTone: "positive", detail: "Exact match with provider data." },
        { title: "Address", badge: "Verified", badgeTone: "positive", detail: "Registered address confirmed." },
      ];
    }
    return [
      { title: "Name", badge: "Verified", badgeTone: "positive", detail: "Matches provider record." },
      { title: "Email address", badge: "Partial", badgeTone: "intermediate", detail: "Formatting difference detected." },
      { title: "Phone number", badge: "Review", badgeTone: "intermediate", detail: "Could not fully confirm." },
    ];
  }

  function buildFindings(status, deviceRiskLevel, diEnabled) {
    var findings = [];
    if (statusTone(status) === "low") findings.push("Identity verified via e-ID provider", "All core identity signals matched");
    else findings.push("Identity verification incomplete", "Manual review recommended");
    if (diEnabled) {
      if (deviceRiskLevel === "high") findings.push("High device risk signals detected");
      else findings.push("Device session appears legitimate");
    }
    return findings.slice(0, 2);
  }

  function buildIdentityDataResponse(name) {
    var status = verificationStatus();
    var verified = statusTone(status) === "low";

    return {
      thinkingLabel: "Reviewing identity data for " + name + "…",
      sourceLabel: "e-ID identity attributes",
      summary: verified
        ? "Identity attributes were returned from the e-ID provider for " + name + ", including name, address, gender, date of birth, email, and phone number."
        : "Identity data for " + name + " was partially returned. Some attributes require manual confirmation.",
      hero: {
        value: verified ? "Complete" : "Partial",
        label: verified ? "Verified" : "Review",
        meta: ["e-ID provider data"],
        tone: verified ? "low" : "medium",
      },
      driversTitle: "Identity attributes",
      drivers: [
        { title: "Name", badge: "Match", badgeTone: "positive", detail: name },
        { title: "Address", badge: "Match", badgeTone: "positive", detail: "Registered address on file" },
        { title: "Date of birth", badge: "Match", badgeTone: "positive", detail: "1986/03/24" },
      ],
      findingsTitle: "Notes",
      findings: buildFindings(status, deviceRisk().risk, deviceIntelligenceEnabled()).slice(0, 2),
      primaryAction: { label: "Open e-ID signals", tab: "e-id" },
      secondaryAction: deviceIntelligenceEnabled()
        ? { label: "View device intelligence", tab: "device-intelligence" }
        : null,
    };
  }

  function buildDeviceRiskResponse(name) {
    if (!deviceIntelligenceEnabled()) {
      return buildSummaryResponse(name);
    }
    var device = deviceRisk();
    var high = device.risk === "high";
    var summary = high
      ? "Device intelligence flagged elevated risk for " + name + "'s session — emulator detection, velocity anomalies, and linked identities were observed."
      : "Device intelligence for " + name + " shows a low-risk session with no major fraud indicators.";

    return {
      thinkingLabel: "Analyzing device signals for " + name + "…",
      sourceLabel: high ? "12 risk signals" : "2 risk signals",
      summary: summary,
      hero: {
        value: device.score + "/10",
        label: high ? "High Risk" : "Low Risk",
        meta: [high ? "Immediate review" : "Normal session"],
        tone: high ? "high" : "low",
      },
      driversTitle: "Top signals",
      drivers: high
        ? [
            { title: "Emulator detection", badge: "Risk", badgeTone: "negative", detail: "Virtualised device detected." },
            { title: "Velocity anomaly", badge: "Risk", badgeTone: "negative", detail: "Multi-country location hop." },
            { title: "Linked identities", badge: "3 found", badgeTone: "intermediate", detail: "Device tied to multiple identities." },
          ]
        : [
            { title: "Device fingerprint", badge: "Stable", badgeTone: "positive", detail: "Consistent device profile." },
            { title: "Network location", badge: "Consistent", badgeTone: "positive", detail: "IP matches declared region." },
          ],
      findingsTitle: "Recommendation",
      findings: high
        ? ["Review device intelligence before approval", "Consider step-up verification"]
        : ["Device session acceptable", "No blocking signals detected"],
      primaryAction: { label: "Review device intelligence", tab: "device-intelligence" },
      secondaryAction: { label: "View e-ID signals", tab: "e-id" },
    };
  }

  function buildTruAIResponse(prompt) {
    var name = entityName();

    switch (prompt) {
      case "Summarize verified identity":
      case "Summarize this verification result":
        return buildSummaryResponse(name);
      case "What identity data was verified?":
        return buildIdentityDataResponse(name);
      case "What device risk signals were detected?":
        return buildDeviceRiskResponse(name);
      default:
        return buildSummaryResponse(name);
    }
  }

  global.TruAIResponses = {
    defaultPrompts: DEFAULT_PROMPTS,
    headlineTopics: HEADLINE_TOPICS,
    composerPlaceholder: COMPOSER_PLACEHOLDER,
    buildTruAIResponse: buildTruAIResponse,
    entityName: entityName,
  };
})(window);
