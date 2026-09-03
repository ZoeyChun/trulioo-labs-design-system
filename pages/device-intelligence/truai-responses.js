/**
 * TruAI chat response data — Device Intelligence static page.
 * Shape must match pages/shared/truai-chat.js (summary + hero + drivers + findings).
 */
(function (global) {
  "use strict";

  var DEFAULT_PROMPTS = [
    "How is device score calculated?",
    "What risk indicators were found?",
    "Summarize this device analysis",
  ];

  var HEADLINE_TOPICS = [
    "Device Risk",
    "Environment Signals",
    "Device History",
    "Network Reputation",
    "Integrity Checks",
  ];

  var COMPOSER_PLACEHOLDER = "Ask about this device analysis...";

  function deviceId() {
    var title = document.querySelector("#dv-result-view .dv-title");
    return title ? title.textContent.replace(/^Device ID:\s*/i, "").trim() : "this device";
  }

  function isHighRisk() {
    var gauge = document.querySelector(".dv-di-gauge[data-risk]");
    return gauge && gauge.getAttribute("data-risk") === "high";
  }

  function riskLabel() {
    var gauge = document.querySelector(".dv-di-gauge[data-label]");
    if (gauge && gauge.getAttribute("data-label")) return gauge.getAttribute("data-label");
    return isHighRisk() ? "High Risk" : "Low Risk";
  }

  function summaryText() {
    var el = document.getElementById("dv-truai-text");
    return el ? el.textContent.trim() : "";
  }

  function highRiskDrivers() {
    return [
      { title: "Risk score", badge: riskLabel(), badgeTone: "negative", detail: "Overall device risk for this session." },
      { title: "Identities", badge: "3 linked", badgeTone: "negative", detail: "This device has been linked to multiple identities." },
      { title: "History", badge: "Declined", badgeTone: "negative", detail: "Previously seen in declined transactions." },
    ];
  }

  function lowRiskDrivers() {
    return [
      { title: "Risk score", badge: riskLabel(), badgeTone: "positive", detail: "Overall device risk for this session." },
      { title: "Environment", badge: "Consistent", badgeTone: "positive", detail: "Browser, OS, and location signals align with a genuine device." },
      { title: "Integrity", badge: "No compromise", badgeTone: "positive", detail: "No emulator, jailbreak, or automation indicators." },
    ];
  }

  function buildSummaryResponse() {
    var id = deviceId();
    var risk = riskLabel();
    var high = isHighRisk();
    var summary =
      summaryText() ||
      (high
        ? "This device has been linked to multiple identities and previously declined transactions, which increases the fraud risk."
        : "Device environment shows no risk indicators. The submission came from a legitimate device, which makes the face mismatch more notable.");

    return {
      thinkingLabel: "Reviewing device intelligence for " + id + "…",
      sourceLabel: "Device signals checked",
      summary: summary,
      hero: {
        value: high ? "High" : "Low",
        label: "Device risk",
        meta: [id],
        tone: high ? "high" : "low",
      },
      driversTitle: "Risk indicators",
      drivers: high ? highRiskDrivers() : lowRiskDrivers(),
      findingsTitle: "Key findings",
      findings: high
        ? ["Linked to multiple identities", "Previously seen in declined transactions"]
        : ["No high-risk indicators on this session", "Environment signals are consistent"],
      primaryAction: { label: "View risk indicators", tab: "device-intelligence" },
    };
  }

  function buildTruAIResponse(prompt) {
    var q = (prompt || "").toLowerCase();
    var high = isHighRisk();
    if (q.indexOf("score") >= 0 || q.indexOf("calculated") >= 0) {
      return {
        thinkingLabel: "Explaining device score…",
        sourceLabel: "Risk model",
        summary: high
          ? "A higher score means more risk indicators. This demo device scored in the high-risk range because it is linked to multiple identities and previously declined transactions."
          : "A lower score means fewer risk indicators. This demo device scored in the low-risk range because the browser, OS, fingerprint, and location were consistent with a legitimate session.",
        hero: {
          value: high ? "High" : "Low",
          label: "Score band",
          meta: ["Environment + integrity + history"],
          tone: high ? "high" : "low",
        },
        driversTitle: "Score inputs",
        drivers: high ? highRiskDrivers() : lowRiskDrivers(),
        findingsTitle: "How it is calculated",
        findings: [
          "The device score combines environment, integrity, and history signals",
          high ? "More indicators raise the score into the high-risk range" : "Fewer indicators keep the score in the low-risk range",
        ],
        primaryAction: { label: "View risk indicators", tab: "device-intelligence" },
      };
    }
    if (q.indexOf("indicator") >= 0 || q.indexOf("signal") >= 0) {
      return {
        thinkingLabel: "Reviewing risk indicators…",
        sourceLabel: "Device signals",
        summary: high
          ? "The session is linked to 3 different identities, was previously seen in a declined transaction, and shows high identity-switching velocity."
          : "Trusted browser and OS, stable location, no VPN or proxy, and a consistent fingerprint were all observed.",
        hero: {
          value: high ? "High" : "None",
          label: "Indicators",
          meta: high ? ["3 identities linked"] : ["Clean session"],
          tone: high ? "high" : "low",
        },
        driversTitle: "Signals reviewed",
        drivers: high ? highRiskDrivers() : lowRiskDrivers(),
        findingsTitle: "Key findings",
        findings: high
          ? ["High-risk indicators were raised on this device", "Identity-switching velocity is elevated"]
          : ["No high-risk indicators were raised on this device", "Browser, OS, and location signals are consistent"],
        primaryAction: { label: "View risk indicators", tab: "device-intelligence" },
      };
    }
    return buildSummaryResponse();
  }

  global.TruAIResponses = {
    defaultPrompts: DEFAULT_PROMPTS,
    headlineTopics: HEADLINE_TOPICS,
    composerPlaceholder: COMPOSER_PLACEHOLDER,
    buildTruAIResponse: buildTruAIResponse,
  };
})(typeof window !== "undefined" ? window : globalThis);
