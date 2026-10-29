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
      var src = "transactions-view/embed.html?v=16";
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
    if (kind === "report") pointReportAt(data.trid);
    document.dispatchEvent(
      new CustomEvent("d1-drawer:open", { detail: { kind: kind } })
    );
  });

  function pointReportAt(trid) {
    var frame = document.querySelector('[data-d1-drawer-view="report"] .d1-tx__frame');
    if (!frame) return;
    var rows = window.UT_TRANSACTIONS || [];
    var row = null;
    for (var i = 0; i < rows.length && !row; i += 1) {
      if (rows[i].trid === trid) row = rows[i];
    }
    var q = new URLSearchParams({ embed: "report" });
    if (row) {
      q.set("name", row.name);
      q.set("status", row.outcome && row.outcome.label ? row.outcome.label : "Verified");
      q.set("country", row.country || "");
      q.set("txid", row.trid);
      q.set("date", row.date || "");
    }
    var src = "index.html?" + q.toString();
    frame.setAttribute("data-d1-tx-src", src);
    if (frame.getAttribute("src") !== src) frame.setAttribute("src", src);
  }

  window.D3Transactions = {
    open: goTransactions
  };

})();
