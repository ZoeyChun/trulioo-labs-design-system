/* Demo 3 — Transactions page: nav + iframe bridge → drawer. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var frame = document.querySelector("[data-d3-tx-frame]");
  if (!shell) return;

  function goTransactions() {
    shell.setAttribute("data-d3-view", "transactions");
    if (window.D3Nav) {
      window.D3Nav.setChatOpen(true, "tx");
      window.D3Nav.markChatIdle();
    } else {
      shell.setAttribute("data-d3-chat", "open");
      shell.setAttribute("data-d3-chat-mode", "tx");
    }

    document.querySelectorAll("[data-d3-nav]").forEach(function (btn) {
      var on = btn.getAttribute("data-d3-nav") === "transactions";
      btn.classList.toggle("is-active", on);
      if (on) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });

    if (frame) {
      var src = "transactions-preview/embed.html?v=71";
      if (frame.getAttribute("src") !== src) frame.setAttribute("src", src);
    }

    document.dispatchEvent(new CustomEvent("d3-view:transactions"));
    window.requestAnimationFrame(function () {
      window.dispatchEvent(new Event("resize"));
    });
  }

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.type !== "d3-tx-open") return;
    var kind = data.kind || "kyc";
    /* A business transaction opens the current KYB result view for that very
       transaction: the drawer's report frame is this app in embed=report mode. */
    if (kind === "report") pointReportAt(data);
    document.dispatchEvent(
      new CustomEvent("d1-drawer:open", { detail: { kind: kind } })
    );
  });

  function pointReportAt(data) {
    var trid = (data && data.trid) || "";
    var frame = document.querySelector('[data-d1-drawer-view="report"] .d1-tx__frame');
    if (!frame) return;
    var rows = window.UT_TRANSACTIONS || [];
    var row = null;
    /* A transaction that ran several products nests one child row per product,
       and each child runs under an id of its own — so the search has to go a
       level down or a child's id finds nothing and the report opens blank. */
    for (var i = 0; i < rows.length && !row; i += 1) {
      if (rows[i].trid === trid) row = rows[i];
      var kids = rows[i].children || [];
      for (var j = 0; j < kids.length && !row; j += 1) {
        if (kids[j].trid === trid) row = kids[j];
      }
    }
    var q = new URLSearchParams({ embed: "report" });
    if (row) {
      q.set("name", row.name);
      q.set("status", row.outcome && row.outcome.label ? row.outcome.label : "Verified");
      q.set("country", row.country || "");
      q.set("txid", row.trid);
      q.set("date", row.date || "");
      /* A transaction that ran several products nests one child row per
         product, and the children share the transaction's id — so the row
         found above is always the parent. The product has to come from the
         row that was actually clicked, or every child opens the same report. */
      q.set("product", (data && data.product) || row.product || "");
    }
    if (data && data.brh) q.set("brh", data.brh);
    var src = "index.html?" + q.toString();
    frame.setAttribute("data-d1-tx-src", src);
    if (frame.getAttribute("src") !== src) frame.setAttribute("src", src);
  }

  window.D3Transactions = {
    open: goTransactions
  };

})();
