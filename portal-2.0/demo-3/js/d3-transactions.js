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
      var src = "transactions-view/embed.html?v=7";
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
    document.dispatchEvent(
      new CustomEvent("d1-drawer:open", { detail: { kind: kind } })
    );
  });

  window.D3Transactions = {
    open: goTransactions
  };

})();
