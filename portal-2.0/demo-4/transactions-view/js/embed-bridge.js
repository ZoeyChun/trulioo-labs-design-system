/* Demo 3 transactions embed → parent shell (drawer + chat + AI queries). */
(function () {
  function productToKind(product) {
    var p = String(product || "").toLowerCase();
    if (p.indexOf("device") !== -1) return "device";
    if (p.indexOf("bank") !== -1) return "bank";
    if (p.indexOf("kyb") !== -1 || p.indexOf("business") !== -1) return "report";
    return "kyc";
  }

  function post(payload) {
    if (!window.parent || window.parent === window) return;
    window.parent.postMessage(payload, "*");
  }

  function openByProduct(product, extra) {
    var kind = productToKind(product);
    var payload = { type: "d3-tx-open", kind: kind, product: product || "" };
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        payload[k] = extra[k];
      });
    }
    post(payload);
  }

  function findByTrid(trid) {
    var list = window.UT_TRANSACTIONS || [];
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].trid === trid) return list[i];
      if (list[i].children) {
        for (var j = 0; j < list[i].children.length; j += 1) {
          if (list[i].children[j].trid === trid) return list[i].children[j];
        }
      }
    }
    return null;
  }

  function reply(requestId, type, body) {
    var payload = { type: type, requestId: requestId || null };
    Object.keys(body || {}).forEach(function (k) {
      payload[k] = body[k];
    });
    post(payload);
  }

  document.addEventListener(
    "click",
    function (event) {
      if (event.target.closest("button, a, input, select, label, .ut-tx-row-menu, .ut-tx-id-copy, .ut-tx-copy-trid")) {
        return;
      }
      var row = event.target.closest("tr.ut-tx-row");
      if (!row || row.classList.contains("ut-tx-row--child")) return;
      var cells = row.querySelectorAll("td");
      var product = "";
      /* PLAIN_TABLE column order: name, outcome, product, date, … */
      if (cells.length >= 3) product = cells[2].textContent.trim();
      openByProduct(product, {
        name: cells[0] ? cells[0].textContent.trim() : "",
        product: product
      });
    },
    true
  );

  /* Special TRID search navigates to RESULT_HREF — open KYC drawer instead. */
  var href = window.UT_TX_RESULT_HREF;
  window.UT_TX_RESULT_HREF = "#d3-tx-result";
  window.addEventListener("hashchange", function () {
    if (location.hash === "#d3-tx-result") {
      history.replaceState(null, "", location.pathname + location.search);
      post({ type: "d3-tx-open", kind: "kyc", via: "trid-search" });
    }
  });
  window.UT_TX_RESULT_HREF_FALLBACK = href;

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.type !== "d3-tx-cmd") return;
    var api = window.UTTransactions;
    var id = data.requestId || null;
    var cmd = data.cmd;

    if (cmd === "ready-ping") {
      reply(id, "d3-tx-ready", { ok: true });
      return;
    }

    if (!api) {
      reply(id, "d3-tx-error", { error: "table-not-ready" });
      return;
    }

    if (cmd === "getState") {
      reply(id, "d3-tx-state", { state: api.getState() });
      return;
    }

    if (cmd === "applySpec") {
      var result = api.applySpec(data.spec || {});
      reply(id, "d3-tx-result", { result: result });
      return;
    }

    if (cmd === "clear") {
      api.clearAiView();
      reply(id, "d3-tx-state", { state: api.getState() });
      return;
    }

    if (cmd === "openTrid") {
      var row = findByTrid(data.trid);
      if (!row) {
        reply(id, "d3-tx-error", { error: "not-found", trid: data.trid });
        return;
      }
      openByProduct(row.product, {
        name: row.name,
        trid: row.trid,
        product: row.product
      });
      reply(id, "d3-tx-opened", { trid: row.trid, name: row.name });
      return;
    }

    reply(id, "d3-tx-error", { error: "unknown-cmd", cmd: cmd });
  });

  /* Tell parent the embed scripts are ready. */
  function announce() {
    if (!window.UTTransactions) {
      window.setTimeout(announce, 50);
      return;
    }
    post({ type: "d3-tx-ready", ok: true });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", announce);
  } else {
    announce();
  }
})();
