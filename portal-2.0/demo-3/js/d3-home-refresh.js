/* Demo 3 — shared refresh for Home 4 (main) and Home 5:
   - briefing alert card headline ("successes increased by 60%")
   - Recent Transactions shows a mix of outcomes instead of three "Verified" rows. */
(function () {
  "use strict";

  /* Alert card headline. Runs before d3-home-5.js, which reuses it as the hero line. */
  var HEADLINE = "Business verification successes increased by 60% yesterday.";
  var alertCard = document.querySelector(".d1-brief__card--alert");
  var alertTitle = alertCard && alertCard.querySelector("h2");
  if (alertTitle) alertTitle.textContent = HEADLINE;

  /* Home 4's alert button follows the new headline; Home 5 keeps its hero link wording. */
  if (document.documentElement.getAttribute("data-d3-home-layout") === "4") {
    var goBtn = alertCard && alertCard.querySelector(".d1-brief__go");
    if (goBtn) {
      Array.prototype.forEach.call(goBtn.childNodes, function (node) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          node.textContent = "Investigate why successes increased";
        }
      });
    }
  }

  /* Recent Transactions: a mix of outcomes instead of three "Verified" rows. */
  var OUTCOMES = [
    null,
    { cls: "tds-tag--negative", label: "Not Verified" },
    { cls: "tds-tag--intermediate", label: "Review" }
  ];
  var rows = document.querySelectorAll(".d1-brief__tx-table tbody tr");
  OUTCOMES.forEach(function (outcome, i) {
    var tag = outcome && rows[i] && rows[i].querySelector(".tds-tag");
    if (!tag) return;
    tag.classList.remove("tds-tag--positive");
    tag.classList.add(outcome.cls);
    tag.textContent = outcome.label;
  });
})();
