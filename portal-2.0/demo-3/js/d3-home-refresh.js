/* Demo 3 — shared refresh for Home 4 (main) and Home 5:
   - briefing alert card headline ("successes increased by 60%")
   - Verification Summary: trend is up and positive, button wording updated
   - Recent Transactions shows a mix of outcomes instead of three "Verified" rows. */
(function () {
  "use strict";

  /* Alert card headline. Runs before d3-home-5.js, which reuses it as the hero line. */
  var HEADLINE = "Business verification successes increased by 60% yesterday.";
  var alertCard = document.querySelector(".d1-brief__card--alert");
  var alertTitle = alertCard && alertCard.querySelector("h2");
  if (alertTitle) alertTitle.textContent = HEADLINE;

  /* Home 4's alert button follows the new headline; Home 5 keeps its hero link wording. */
  if (/^[46]$/.test(document.documentElement.getAttribute("data-d3-home-layout"))) {
    var goBtn = alertCard && alertCard.querySelector(".d1-brief__go");
    if (goBtn) {
      Array.prototype.forEach.call(goBtn.childNodes, function (node) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          node.textContent = "Investigate why successes increased";
        }
      });
    }
  }

  /* Verification Summary: signal is up + positive, button wording updated. */
  var summary = document.querySelector(".d1-brief__card--summary");
  if (summary) {
    var trend = summary.querySelector(".d1-tag");
    if (trend) {
      trend.classList.remove("d1-tag--negative");
      trend.classList.add("d1-tag--positive");
      trend.textContent = "\u2197 40%";
    }
    var summaryBtn = summary.querySelector(".d1-brief__go");
    if (summaryBtn) {
      Array.prototype.forEach.call(summaryBtn.childNodes, function (node) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          node.textContent = "Investigate verification pattern";
        }
      });
    }
  }

  /* Recent Transactions rows come from the Transactions data (js/d3-home-recent.js). */
})();
