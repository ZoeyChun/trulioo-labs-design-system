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

  /* ---- KPI strip → quick filters ----
     Each stat filters the table through the same panel filters the Filter
     menu uses (so the Filter chrome and counts stay truthful). Clicking the
     active stat, or Total, clears the view. renderStats() rebuilds the strip
     on every render, so state is re-applied from a MutationObserver. */
  var STAT_SPECS = [
    { key: "total", spec: null },
    { key: "verified", spec: { clear: true, outcomes: ["positive"] }, outcomes: ["positive"], risks: [] },
    { key: "review", spec: { clear: true, outcomes: ["intermediate"] }, outcomes: ["intermediate"], risks: [] },
    { key: "not-verified", spec: { clear: true, outcomes: ["negative"] }, outcomes: ["negative"], risks: [] },
    { key: "high-risk", spec: { clear: true, risks: ["high"] }, outcomes: [], risks: ["high"] }
  ];

  function sameSet(a, b) {
    return a.length === b.length && a.every(function (v) { return b.indexOf(v) !== -1; });
  }

  function activeStatKey() {
    var api = window.UTTransactions;
    if (!api) return "";
    var st = api.getState();
    var f = st.filters || {};
    var clean = !st.search && !st.product && !(st.date && (st.date.start || st.date.end)) &&
      !(f.products || []).length && !(f.sources || []).length && !(f.types || []).length &&
      !(f.watchlist || []).length && !f.country;
    if (!clean) return "";
    var o = f.outcomes || [];
    var r = f.risks || [];
    if (!o.length && !r.length) return "total";
    for (var i = 1; i < STAT_SPECS.length; i += 1) {
      if (sameSet(o, STAT_SPECS[i].outcomes) && sameSet(r, STAT_SPECS[i].risks)) return STAT_SPECS[i].key;
    }
    return "";
  }

  function syncStats(host) {
    var active = activeStatKey();
    Array.prototype.forEach.call(host.querySelectorAll(".ut-tx-stat"), function (el, i) {
      var def = STAT_SPECS[i];
      if (!def) return;
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("data-stat", def.key);
      var on = def.key === active;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function pickStat(el) {
    var api = window.UTTransactions;
    if (!api || !el) return;
    var key = el.getAttribute("data-stat");
    var def = STAT_SPECS.filter(function (d) { return d.key === key; })[0];
    if (!def) return;
    if (!def.spec || key === activeStatKey()) api.applySpec({ clear: true, predicate: null });
    else api.applySpec(def.spec);
  }

  function bindStats() {
    var host = document.getElementById("utTxStats");
    if (!host) return;
    host.addEventListener("click", function (event) {
      pickStat(event.target.closest(".ut-tx-stat"));
    });
    host.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var el = event.target.closest(".ut-tx-stat");
      if (!el) return;
      event.preventDefault();
      pickStat(el);
    });
    new MutationObserver(function () { syncStats(host); }).observe(host, { childList: true });
    syncStats(host);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { window.setTimeout(bindStats, 0); });
  } else {
    window.setTimeout(bindStats, 0);
  }
})();
