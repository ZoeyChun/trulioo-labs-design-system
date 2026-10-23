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
})();
