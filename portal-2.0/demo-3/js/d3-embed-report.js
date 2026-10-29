/* Demo 3 — embed=report: open the KYB report for one transaction.

   Loaded on every page but only acts in a frame opened with
   ?embed=report&name=…&status=…&country=…&txid=…&date=… (the Transactions
   drawer builds that URL; see js/d3-transactions.js). */
(function () {
  "use strict";

  var params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch (e) {
    return;
  }
  if (params.get("embed") !== "report") return;

  var session = {
    incomplete: false,
    businessName: params.get("name") || "Business",
    status: params.get("status") || "Verified",
    country: params.get("country") || "United States",
    transactionId: params.get("txid") || "",
    date: params.get("date") || ""
  };

  var tries = 0;
  (function open() {
    var ready = document.body.classList.contains("d1-app-ready") && window.D3KybResume && window.D3KybResume.expandToFullReport;
    if (!ready) {
      if (tries++ < 80) window.setTimeout(open, 100);
      return;
    }
    window.D3KybResume.expandToFullReport(session);
    /* The report seeds its own demo details a beat later; keep this row's. */
    [400, 1200, 2500].forEach(function (ms) {
      window.setTimeout(function () {
        var CC = { "United States": "us", "United Kingdom": "gb", Germany: "de", France: "fr", Canada: "ca", Australia: "au", Singapore: "sg", Ireland: "ie", Netherlands: "nl", Spain: "es", Italy: "it", Sweden: "se", Norway: "no", Denmark: "dk", Brazil: "br", Mexico: "mx", India: "in", Japan: "jp", Switzerland: "ch" };
        var set = function (key, text, title) {
          var el = document.querySelector("[data-d3-kyb-detail-" + key + "]");
          if (!el || !text) return;
          var flag = el.querySelector(".fi");
          el.textContent = text + (flag ? " " : "");
          if (flag) {
            var cc = CC[text];
            if (cc) flag.className = "fi fi-" + cc + " d3-workspace__flag";
            el.appendChild(flag);
          }
          if (title) el.title = title;
        };
        set("country", session.country);
        set("txid", session.transactionId, session.transactionId);
        set("date", session.date);
      }, ms);
    });
  })();
})();
