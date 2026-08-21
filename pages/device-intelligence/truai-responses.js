/**
 * TruAI chat response data — Device Intelligence static page.
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

  function riskLabel() {
    var gauge = document.querySelector(".dv-di-gauge[data-label]");
    if (gauge && gauge.getAttribute("data-label")) return gauge.getAttribute("data-label");
    var status = document.getElementById("dv-header-status");
    return status ? status.textContent.trim() : "Low Risk";
  }

  function summaryText() {
    var el = document.getElementById("dv-truai-text");
    return el ? el.textContent.trim() : "";
  }

  function buildSummaryResponse() {
    var id = deviceId();
    var risk = riskLabel();
    var summary =
      summaryText() ||
      "Device environment shows no risk indicators. The session looks consistent with a typical legitimate device.";

    return {
      thinkingLabel: "Reviewing device intelligence for " + id + "…",
      sourceLabel: "Device signals checked",
      headline: "Device " + id + " is " + risk.toLowerCase() + ".",
      body: summary,
      findings: [
        { title: "Risk score", badge: risk, badgeTone: /high/i.test(risk) ? "negative" : "positive", detail: "Overall device risk for this session." },
        { title: "Environment", badge: "Consistent", badgeTone: "positive", detail: "Browser, OS, and location signals align with a genuine device." },
        { title: "Integrity", badge: "No compromise", badgeTone: "positive", detail: "No emulator, jailbreak, or automation indicators." },
      ],
      primaryAction: { label: "View risk indicators", tab: "device-intelligence" },
    };
  }

  function buildTruAIResponse(prompt) {
    var q = (prompt || "").toLowerCase();
    if (q.indexOf("score") >= 0 || q.indexOf("calculated") >= 0) {
      return {
        thinkingLabel: "Explaining device score…",
        sourceLabel: "Risk model",
        headline: "The device score combines environment, integrity, and history signals.",
        body: "A lower score means fewer risk indicators. This demo device scored in the low-risk range because the browser, OS, fingerprint, and location were consistent with a legitimate session.",
        findings: [],
      };
    }
    if (q.indexOf("indicator") >= 0 || q.indexOf("signal") >= 0) {
      return {
        thinkingLabel: "Reviewing risk indicators…",
        sourceLabel: "Device signals",
        headline: "No high-risk indicators were raised on this device.",
        body: "Trusted browser and OS, stable location, no VPN or proxy, and a consistent fingerprint were all observed.",
        findings: [],
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
