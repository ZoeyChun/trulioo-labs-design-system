/* The Transactions preview's own copy — see js/d3-transactions.js in this
   folder. Demo 3's copy is untouched. */
/* Demo 3 — embed=report: open the KYB report for one transaction.

   Loaded on every page but only acts in a frame opened with
   ?embed=report&name=…&status=…&country=…&txid=…&date=…&product=… (the Transactions
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

  var product = params.get("product") || "";
  /* Set by the Transactions table for a transaction that ran several products
     (see transactions-preview/js/embed-bridge.js): "on" opens the report that
     carries the Business Risk Horizon Score, "view" the verification beside
     it, whose score has already been run and is there to be shown. */
  var brh = params.get("brh") || "";

  var session = {
    incomplete: false,
    businessName: params.get("name") || "Business",
    status: params.get("status") || "Verified",
    country: params.get("country") || "United States",
    tier: ({ "Business Essentials": "essentials", "Business Insights": "insights", "Business Complete": "complete" })[product] || "complete",
    transactionId: params.get("txid") || "",
    date: params.get("date") || ""
  };

  /* Business Horizon is not a package: it is the Business Risk Horizon Score
     add-on. A transaction that ran only that opens on the score. */
  if (brh === "on" || (!brh && /horizon/i.test(product))) {
    session.addons = ["risk"];
    session.tab = "risk";
  } else if (brh === "both") {
    /* Ran alongside the verification in the same transaction: the report
       carries the score, but the verification is what it opens on. */
    session.addons = ["risk"];
  } else if (brh === "view") {
    /* The verification itself has no score — that is the transaction beside
       it — so the report opens without the tab and offers to show it. */
    session.addons = [];
    session.brhRan = session.transactionId;
  }

  var tries = 0;
  (function open() {
    var ready = document.body.classList.contains("d1-app-ready") && window.D3KybResume && window.D3KybResume.expandToFullReport;
    if (!ready) {
      if (tries++ < 80) window.setTimeout(open, 100);
      return;
    }
    window.D3KybResume.expandToFullReport(session);
    if (session.tab && window.D3KybReport && window.D3KybReport.selectTab) {
      /* The tab bodies mount a beat after the report does. */
      window.setTimeout(function () {
        window.D3KybReport.selectTab(session.tab);
      }, 600);
    }
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
