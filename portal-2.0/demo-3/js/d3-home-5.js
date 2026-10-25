/* Demo 3 home 5 — hero copy block on the left (welcome + briefing line + link),
   composer on the right. The globe comes from d3-home-4.js (side mode). */
(function () {
  "use strict";

  var welcome = document.querySelector(".d1-home .d1-welcome");
  if (!welcome || welcome.querySelector(".d3-home-5__copy")) return;

  var alertBtn = document.querySelector(".d1-brief__card--alert .d1-brief__go");
  var alertTitle = document.querySelector(".d1-brief__card--alert h2");

  var copy = document.createElement("div");
  copy.className = "d3-home-5__copy";

  var sub = document.createElement("p");
  sub.className = "d3-home-5__sub";
  sub.textContent = alertTitle ? alertTitle.textContent.trim() + "." : "Business verification failures spiked 40% yesterday.";
  copy.appendChild(sub);

  if (alertBtn) {
    var link = alertBtn.cloneNode(true);
    link.classList.add("d3-home-5__link");
    copy.appendChild(link);
  }

  welcome.appendChild(copy);

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
