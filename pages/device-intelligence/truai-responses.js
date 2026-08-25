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
      headline: "Device " + id + " is " + risk.toLowerCase() + ".",
      body: summary,
      findings: high
        ? [
            { title: "Risk score", badge: risk, badgeTone: "negative", detail: "Overall device risk for this session." },
            { title: "Identities", badge: "3 linked", badgeTone: "negative", detail: "This device has been linked to multiple identities." },
            { title: "History", badge: "Declined", badgeTone: "negative", detail: "Previously seen in declined transactions." },
          ]
        : [
            { title: "Risk score", badge: risk, badgeTone: "positive", detail: "Overall device risk for this session." },
            { title: "Environment", badge: "Consistent", badgeTone: "positive", detail: "Browser, OS, and location signals align with a genuine device." },
            { title: "Integrity", badge: "No compromise", badgeTone: "positive", detail: "No emulator, jailbreak, or automation indicators." },
          ],
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
        headline: "The device score combines environment, integrity, and history signals.",
        body: high
          ? "A higher score means more risk indicators. This demo device scored in the high-risk range because it is linked to multiple identities and previously declined transactions."
          : "A lower score means fewer risk indicators. This demo device scored in the low-risk range because the browser, OS, fingerprint, and location were consistent with a legitimate session.",
        findings: [],
      };
    }
    if (q.indexOf("indicator") >= 0 || q.indexOf("signal") >= 0) {
      return high
        ? {
            thinkingLabel: "Reviewing risk indicators…",
            sourceLabel: "Device signals",
            headline: "High-risk indicators were raised on this device.",
            body: "The session is linked to 3 different identities, was previously seen in a declined transaction, and shows high identity-switching velocity.",
            findings: [],
          }
        : {
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
