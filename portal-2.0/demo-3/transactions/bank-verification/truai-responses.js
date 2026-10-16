/**
 * TruAI chat response data — Bank Verification static page.
 */
(function (global) {
  "use strict";

  var DEFAULT_PROMPTS = [
    "Summarize this verification result",
    "Which fields did not match?",
    "Is this bank account verified?",
  ];

  var HEADLINE_TOPICS = [
    "Account Ownership",
    "Field Match Results",
    "Bank Details",
    "Match Score",
    "Verification Status",
  ];

  var COMPOSER_PLACEHOLDER = "Ask about this bank verification...";

  function entityName() {
    var title = document.getElementById("bv-result-title") || document.querySelector(".dv-title");
    if (title) return title.textContent.trim();
    return "Jane Doe";
  }

  function summaryText() {
    var el = document.getElementById("bv-result-truai");
    return el ? el.textContent.trim() : "";
  }

  function matchInfo() {
    var gauge = document.getElementById("bv-result-gauge");
    var match = gauge ? gauge.getAttribute("data-label") || "Strong Match" : "Strong Match";
    var tone = "low";
    if (match === "Partial Match") tone = "medium";
    if (match === "No Match") tone = "high";
    var score = gauge ? gauge.getAttribute("data-score") || "92" : "92";

    return { match: match, tone: tone, score: score };
  }

  function countFieldMatches() {
    var positive = 0;
    var negative = 0;
    var missing = 0;
    document.querySelectorAll("#bv-result-field-rows tr").forEach(function (row) {
      if (row.querySelector(".tds-data-table__signals--negative, .tds-tag--negative")) negative += 1;
      else if (row.querySelector(".tds-data-table__signals--intermediate, .tds-tag--intermediate")) missing += 1;
      else if (row.querySelector(".tds-data-table__signals--positive, .tds-tag--positive")) positive += 1;
    });
    if (positive || negative || missing) return { positive: positive, negative: negative, missing: missing };
    var info = matchInfo();
    if (info.match === "Strong Match") return { positive: 6, negative: 0, missing: 0 };
    if (info.match === "Partial Match") return { positive: 4, negative: 0, missing: 1 };
    return { positive: 1, negative: 5, missing: 0 };
  }

  function buildSummaryResponse(name) {
    var info = matchInfo();
    var summary =
      summaryText() ||
      (info.match === "Strong Match"
        ? name + "'s bank account has been verified. All key fields matched the institution's records."
        : info.match === "Partial Match"
          ? "Some discrepancies were detected for " + name + "'s bank account. Manual review is recommended."
          : "Could not confirm account ownership for " + name + ". Review the field match results below.");

    var counts = countFieldMatches();

    return {
      thinkingLabel: "Reviewing bank verification for " + name + "…",
      sourceLabel: counts.positive + " of " + (counts.positive + counts.negative) + " fields matched",
      summary: summary,
      hero: {
        value: info.score + "%",
        label: info.match,
        meta: [info.tone === "low" ? "High confidence" : "Review recommended"],
        tone: info.tone,
      },
      driversTitle: "Verification checks",
      drivers: buildCheckDrivers(info.match),
      findingsTitle: "Key findings",
      findings: buildFindings(info.match),
      primaryAction: { label: "View field matches", tab: "results" },
      secondaryAction: { label: "View appended data", tab: "appended" },
    };
  }

  function buildCheckDrivers(match) {
    if (match === "Strong Match") {
      return [
        { title: "Account holder name", badge: "Match", badgeTone: "positive", detail: "Name matches bank records." },
        { title: "Account number", badge: "Match", badgeTone: "positive", detail: "Account number verified with institution." },
        { title: "Bank institution", badge: "Match", badgeTone: "positive", detail: "Routing and bank details confirmed." },
      ];
    }
    if (match === "Partial Match") {
      return [
        { title: "Account holder name", badge: "Match", badgeTone: "positive", detail: "Name matches bank records." },
        { title: "Account number", badge: "Partial", badgeTone: "intermediate", detail: "Minor formatting discrepancy detected." },
        { title: "National ID", badge: "DSMissing", badgeTone: "intermediate", detail: "No identifier was returned from the institution for this field." },
      ];
    }
    return [
      { title: "Account holder name", badge: "No match", badgeTone: "negative", detail: "Name differs from bank records." },
      { title: "Account number", badge: "No match", badgeTone: "negative", detail: "Account not found or inactive." },
      { title: "Bank institution", badge: "Partial", badgeTone: "intermediate", detail: "Institution matched; ownership unconfirmed." },
    ];
  }

  function buildFindings(match) {
    if (match === "Strong Match") return ["All required fields matched", "No ownership discrepancies detected"];
    if (match === "Partial Match") return ["Some fields require manual review", "Account likely valid with data gaps"];
    return ["Account ownership could not be confirmed", "Multiple field mismatches detected"];
  }

  function buildFieldMismatchResponse(name) {
    var info = matchInfo();
    var counts = countFieldMatches();
    var unmatched = counts.negative + (counts.missing || 0);
    var summary =
      unmatched === 0
        ? "All submitted fields matched the bank's records for " + name + "."
        : unmatched + " field" + (unmatched === 1 ? "" : "s") + " did not fully match for " + name + ". Check the detail column for input vs. data on file.";

    return {
      thinkingLabel: "Comparing field matches for " + name + "…",
      sourceLabel: counts.negative + " mismatched fields",
      summary: summary,
      hero: {
        value: String(counts.negative),
        label: counts.negative === 0 ? "All matched" : "Mismatches",
        meta: [counts.negative === 0 ? "Clean result" : "Review required"],
        tone: counts.negative === 0 ? "low" : counts.negative <= 2 ? "medium" : "high",
      },
      driversTitle: "Field results",
      drivers: buildCheckDrivers(info.match),
      findingsTitle: "Notes",
      findings: buildFindings(info.match).slice(0, 2),
      primaryAction: { label: "View field matches", tab: "results" },
      secondaryAction: { label: "Edit verification form", tab: "form" },
    };
  }

  function buildVerifiedResponse(name) {
    var info = matchInfo();
    var verified = info.match === "Strong Match";
    var summary = verified
      ? name + "'s bank account is verified. The match score is " + info.score + "% with a strong match across all required fields."
      : info.match === "Partial Match"
        ? name + "'s account is not fully verified — partial match detected. Manual review is recommended before payout."
        : name + "'s bank account is not verified. Ownership could not be confirmed from the submitted details.";

    return {
      thinkingLabel: "Checking verification status for " + name + "…",
      sourceLabel: verified ? "Verified" : "Not verified",
      summary: summary,
      hero: {
        value: verified ? "Yes" : "No",
        label: verified ? "Verified" : info.match === "Partial Match" ? "Review" : "Declined",
        meta: [info.score + "% match score"],
        tone: info.tone,
      },
      driversTitle: "Status drivers",
      drivers: buildCheckDrivers(info.match),
      findingsTitle: "Recommendation",
      findings: verified
        ? ["Proceed with payout or onboarding", "No additional documentation required"]
        : info.match === "Partial Match"
          ? ["Request supporting bank documentation", "Confirm mismatched fields manually"]
          : ["Do not proceed until ownership is confirmed", "Ask applicant to re-submit correct details"],
      primaryAction: {
        label: verified ? "Proceed with payout" : "Review field matches",
        tab: "results",
      },
      secondaryAction: { label: "View raw data", tab: "raw" },
    };
  }

  function buildTruAIResponse(prompt) {
    var name = entityName();

    switch (prompt) {
      case "Summarize this verification result":
        return buildSummaryResponse(name);
      case "Which fields did not match?":
        return buildFieldMismatchResponse(name);
      case "Is this bank account verified?":
        return buildVerifiedResponse(name);
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
