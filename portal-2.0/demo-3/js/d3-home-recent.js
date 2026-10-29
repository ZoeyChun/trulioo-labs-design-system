/* Demo 3 — Home "Recent Transactions" card.

   - The three rows are the three newest rows of the Transactions table
     (window.UT_TRANSACTIONS), so the card and the page can never disagree.
   - Clicking a row goes straight to Transactions and opens that transaction's
     detail — no AI conversation involved.
   - "View all transactions" is a plain link to the Transactions page. */
(function () {
  "use strict";

  var body = document.querySelector(".d1-brief__tx-table tbody");
  var data = window.UT_TRANSACTIONS;
  if (!body || !data || !data.length) return;

  var TONE_CLASS = {
    positive: "tds-tag--positive",
    negative: "tds-tag--negative",
    intermediate: "tds-tag--intermediate",
    "signals-intermediate": "tds-tag--intermediate"
  };

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  body.innerHTML = data
    .slice(0, 3)
    .map(function (row) {
      var tone = TONE_CLASS[row.outcome && row.outcome.tone] || "tds-tag--default";
      return (
        '<tr class="d1-brief__tx-row" data-d3-tx-trid="' + esc(row.trid) + '" tabindex="0" role="link" aria-label="Open ' + esc(row.name) + '">' +
        '<td class="tds-data-table__text-cell tds-data-table__row-header">' + esc(row.name) + "</td>" +
        '<td data-align="right"><span class="tds-tag tds-tag--sm ' + tone + '">' + esc(row.outcome.label) + "</span></td>" +
        "</tr>"
      );
    })
    .join("");

  /* ---- "View all transactions": not an AI prompt any more ---- */
  var all = document.querySelector('.d1-brief__go[data-prompt="View all recent transactions"]');
  if (all) {
    all.removeAttribute("data-d1-demo");
    all.removeAttribute("data-prompt");
    all.removeAttribute("data-agent");
    all.setAttribute("data-d3-go-transactions", "");
    /* The sparkle marks an AI hand-off; this one is plain navigation. */
    var icon = all.querySelector("svg");
    if (icon) {
      icon.setAttribute("viewBox", "0 0 16 16");
      icon.innerHTML =
        '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"/>';
      /* Arrow trails the label. */
      all.appendChild(icon);
    }
  }

  function goTransactions() {
    var rail = document.querySelector('[data-d3-nav="transactions"]');
    if (rail) rail.click();
  }

  /* The table lives in a lazily loaded iframe: wait for it, then ask it to open
     the transaction (it tells the shell to open the drawer). */
  function openTransaction(trid) {
    goTransactions();
    var tries = 0;
    (function attempt() {
      var frame = document.querySelector("[data-d3-tx-frame]");
      var win = frame && frame.contentWindow;
      var ready = false;
      try {
        ready = !!(win && win.UTTransactions && win.document.readyState === "complete" && win.document.getElementById("utTxBody"));
      } catch (e) {}
      if (ready) {
        win.postMessage({ type: "d3-tx-cmd", cmd: "openTrid", trid: trid, requestId: "home-" + Date.now() }, "*");
        return;
      }
      if (tries++ < 60) window.setTimeout(attempt, 150);
    })();
  }

  document.addEventListener(
    "click",
    function (event) {
      var t = event.target;
      if (!t || !t.closest) return;
      var link = t.closest("[data-d3-go-transactions]");
      if (link) {
        event.preventDefault();
        event.stopImmediatePropagation();
        goTransactions();
        return;
      }
      var row = t.closest(".d1-brief__tx-row");
      if (row) {
        event.preventDefault();
        event.stopImmediatePropagation();
        openTransaction(row.getAttribute("data-d3-tx-trid"));
      }
    },
    true
  );

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var row = event.target.closest && event.target.closest(".d1-brief__tx-row");
    if (!row) return;
    event.preventDefault();
    openTransaction(row.getAttribute("data-d3-tx-trid"));
  });
})();
