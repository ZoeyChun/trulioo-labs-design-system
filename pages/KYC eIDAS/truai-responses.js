/**
 * TruAI chat response data — KYC eIDAS static page.
 * Shape must match pages/shared/truai-chat.js (summary + hero + drivers + findings).
 */
(function (global) {
  "use strict";

  var DEFAULT_PROMPTS = [
    "What is eIDAS 2.0 High assurance?",
    "What happens after I scan the QR code?",
    "What data does Trulioo keep?",
  ];

  var HEADLINE_TOPICS = [
    "eIDAS 2.0",
    "National eID",
    "Selfie check",
    "Data minimization",
    "GDPR consent",
  ];

  var COMPOSER_PLACEHOLDER = "Ask about KYC eIDAS verification…";

  function buildSummaryResponse() {
    return {
      thinkingLabel: "Reviewing KYC eIDAS verification…",
      sourceLabel: "eIDAS 2.0 High",
      summary:
        "Trulioo KYC verification across Europe conforms to the eIDAS 2.0 High level of assurance. Scan the QR code to continue on your phone, and keep this tab open — refreshing ends the session.",
      hero: {
        value: "High",
        label: "Assurance",
        meta: ["eIDAS 2.0"],
        tone: "low",
      },
      driversTitle: "Verification path",
      drivers: [
        {
          title: "Identity source",
          badge: "National eID",
          badgeTone: "positive",
          detail: "We recommend the fastest route for the person’s country, using national eID or a supporting document.",
        },
        {
          title: "Selfie check",
          badge: "Deleted after",
          badgeTone: "positive",
          detail: "A short liveness check proves the document belongs to the person. The capture is deleted after the check.",
        },
        {
          title: "Data shared",
          badge: "Minimized",
          badgeTone: "positive",
          detail: "Only required attributes are returned. Results are shown, not the raw scans.",
        },
      ],
      findingsTitle: "Key points",
      findings: [
        "Scan the QR code to continue verification on your phone",
        "Keep this desktop tab open until the mobile flow finishes",
      ],
    };
  }

  function buildTruAIResponse(prompt) {
    var q = (prompt || "").toLowerCase();

    if (q.indexOf("eidas") >= 0 || q.indexOf("assurance") >= 0 || q.indexOf("high") >= 0) {
      return {
        thinkingLabel: "Explaining eIDAS assurance…",
        sourceLabel: "eIDAS 2.0",
        summary:
          "eIDAS 2.0 High is the strongest EU assurance level for electronic identification. It confirms identity with a high degree of confidence so the result can be trusted across participating European services.",
        hero: {
          value: "High",
          label: "Assurance",
          meta: ["eIDAS 2.0"],
          tone: "low",
        },
        driversTitle: "What High assurance covers",
        drivers: [
          {
            title: "Assurance",
            badge: "High",
            badgeTone: "positive",
            detail: "Identity is confirmed at the eIDAS 2.0 High level of assurance.",
          },
          {
            title: "Reuse",
            badge: "Cross-border",
            badgeTone: "positive",
            detail: "Participating European services can rely on the same verified identity.",
          },
        ],
        findingsTitle: "Key points",
        findings: [
          "This landing flow is designed to meet eIDAS 2.0 High assurance",
          "The result is intended for reuse across participating EU services",
        ],
      };
    }

    if (q.indexOf("scan") >= 0 || q.indexOf("qr") >= 0 || q.indexOf("phone") >= 0) {
      return {
        thinkingLabel: "Explaining the mobile handoff…",
        sourceLabel: "QR session",
        summary:
          "The QR code opens a short mobile session — typically about 10 seconds. Keep this desktop tab open. Refreshing or closing it ends the session.",
        hero: {
          value: "QR",
          label: "Handoff",
          meta: ["Keep this tab open"],
          tone: "low",
        },
        driversTitle: "After you scan",
        drivers: [
          {
            title: "Mobile session",
            badge: "~10 seconds",
            badgeTone: "positive",
            detail: "Complete national eID or document capture on your phone.",
          },
          {
            title: "Consent",
            badge: "GDPR Art. 6(1)(c)",
            badgeTone: "positive",
            detail: "Scanning consents to identity verification under GDPR Art. 6(1)(c) and eIDAS 2.0.",
          },
        ],
        findingsTitle: "Key points",
        findings: [
          "Do not refresh or close this tab while the phone flow is running",
          "Results return to this workspace when the mobile session finishes",
        ],
      };
    }

    if (q.indexOf("data") >= 0 || q.indexOf("keep") >= 0 || q.indexOf("minimi") >= 0 || q.indexOf("selfie") >= 0) {
      return {
        thinkingLabel: "Reviewing data handling…",
        sourceLabel: "Data minimization",
        summary:
          "The selfie check proves the document belongs to the person and is deleted afterwards. Results are shown in this workspace; raw scans are not retained in the demo result view.",
        hero: {
          value: "Min",
          label: "Data kept",
          meta: ["Attributes only"],
          tone: "low",
        },
        driversTitle: "What is retained",
        drivers: [
          {
            title: "Selfie",
            badge: "Deleted after check",
            badgeTone: "positive",
            detail: "Used only to bind the person to the document.",
          },
          {
            title: "Output",
            badge: "Attributes only",
            badgeTone: "positive",
            detail: "The result view shows verified attributes, not raw captures.",
          },
        ],
        findingsTitle: "Key points",
        findings: [
          "Only required identity attributes are returned",
          "Raw document and selfie captures are not kept in this demo",
        ],
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
