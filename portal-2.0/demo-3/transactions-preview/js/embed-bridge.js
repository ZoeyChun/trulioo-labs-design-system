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

  function tridFor(row) {
    var own = row.querySelector("[data-trid]");
    return own ? own.getAttribute("data-trid") || "" : "";
  }

  function isHorizon(product) {
    return /horizon/i.test(String(product || ""));
  }

  function productsOf(record) {
    var list = [record.product];
    if (record.extraProducts && record.extraProducts.length) {
      list = list.concat(record.extraProducts);
    }
    return list.filter(Boolean);
  }

  /* Business Horizon is not a package: it is the Business Risk Horizon Score
     add-on. It can run inside the verification's own transaction, or as a
     transaction of its own beside it — so a business has the score if any of
     its rows carries that product. Matched on the records, not the cells, so
     a column change cannot quietly break it.

     "on": this row is the score, and opens on it. "both": this row ran the
     score alongside the verification, so the report carries it but opens on
     the Overview. "view": the score is another transaction of this business,
     and this report offers to show it. "" leaves the report as it was. */
  function brhModeFor(row, product, trid) {
    var record = findByTrid(trid);
    var products = record ? productsOf(record) : [product];
    if (products.some(isHorizon)) {
      return products.length === 1 ? "on" : "both";
    }
    if (!record) return "";
    var ran = (window.UT_TRANSACTIONS || []).some(function (r) {
      return r.name === record.name && productsOf(r).some(isHorizon);
    });
    return ran ? "view" : "";
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
      if (event.target.closest("button, a, input, select, label, .ut-tx-row-menu, .ut-tx-id-copy, .ut-tx-copy-trid, .ut-tx-name-id, .ut-tx-name--id-trigger, .ut-tx-id-popover, .ut-tx-multi__more")) {
        return;
      }
      var row = event.target.closest("tr.ut-tx-row");
      if (!row) return;
      var cells = row.querySelectorAll("td");
      var trid = tridFor(row);
      /* Read the product from its own cell, not a column index — the column
         order has changed once already, and an index silently pointed at the
         date, which no product name matches, so every row opened the KYC
         result instead of the KYB report. */
      var productCell = row.querySelector(".ut-tx-td-product");
      /* A multi-product cell holds both the collapsed lead and the full list,
         one of them hidden — textContent would run the two together. */
      var productLead = productCell && productCell.querySelector(".ut-tx-multi__lead");
      var product = productLead
        ? productLead.textContent.trim()
        : productCell
        ? productCell.textContent.trim()
        : "";
      var nameCell = row.querySelector(".ut-tx-td-name") || cells[0];
      var nameEl = nameCell && nameCell.querySelector(".ut-tx-name");
      openByProduct(product, {
        name: nameEl
          ? nameEl.textContent.trim()
          : nameCell
          ? nameCell.textContent.trim()
          : "",
        trid: trid,
        product: product,
        brh: brhModeFor(row, product, trid)
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

  /* ---- Outcome / Risk quick filters ----
     The checkboxes keep the engine's names (ut-filt-outcome / ut-filt-risk), so
     the table, the AI agent and "Clear all" all keep working; this only opens
     the menus and tells the engine when a box changed. */
  /* The Filters drawer is meant to be the complete picture of what is
     narrowing the table, but Outcome / Risk / Country live in the toolbar as
     quick filters. Rather than keep a second hand-written copy of each option
     list in the drawer markup, clone the quick menus into the drawer's empty
     mirror slots. transaction-history.js ticks both copies in step, so either
     surface can set or clear a facet. */
  function mirrorQuickIntoDrawer(items) {
    items.forEach(function (item) {
      var key = item.getAttribute("data-quick");
      var slot = document.querySelector('[data-ut-mirror="' + key + '"]');
      var source = item.querySelector(".ut-tx-filters__options");
      if (!key || !slot || !source) return;
      /* Country is already filled by the engine's own builder. */
      if (slot.children.length) return;
      slot.innerHTML = source.innerHTML;
    });
  }

  function bindQuick() {
    var host = document.getElementById("utTxQuick");
    var panel = document.getElementById("utTxFilters");
    if (!host) return;
    var items = Array.prototype.slice.call(host.querySelectorAll(".ut-tx-quick__item"));
    mirrorQuickIntoDrawer(items);

    function closeAll(except) {
      items.forEach(function (item) {
        if (item === except) return;
        item.querySelector(".ut-tx-quick__menu").hidden = true;
        item.querySelector(".ut-tx-quick__btn").setAttribute("aria-expanded", "false");
      });
    }

    function sync() {
      items.forEach(function (item) {
        /* Package, Source and Type chips hold option buttons, not checkboxes,
           and transaction-history.js owns their count and selected state. */
        if (
          item.classList.contains("ut-tx-quick__item--dynamic") &&
          !item.querySelector("input")
        ) {
          return;
        }
        var n = item.querySelectorAll("input:checked").length;
        var count = item.querySelector(".ut-tx-quick__count");
        count.textContent = String(n);
        count.hidden = n === 0;
        item.classList.toggle("is-selected", n > 0);
      });
      /* "Clear all filters" visibility is owned by the engine
         (updateFilterChrome -> totalActiveFilterCount), which also counts the
         Type switch and the Source / Package menus. Guessing from checkboxes
         here left the button hidden when only one of those was set. */
    }

    var clearBtn = document.getElementById("utTxQuickClear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        closeAll(null);
        if (window.UTTransactions && window.UTTransactions.clearFilters) window.UTTransactions.clearFilters();
        sync();
      });
    }

    items.forEach(function (item) {
      var btn = item.querySelector(".ut-tx-quick__btn");
      var menu = item.querySelector(".ut-tx-quick__menu");
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        var open = menu.hidden;
        closeAll(item);
        menu.hidden = !open;
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.addEventListener("change", function () {
        sync();
        /* The engine listens on the filter panel; poke it. */
        if (panel) panel.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".ut-tx-quick__item")) closeAll(null);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll(null);
    });

    /* Filters also change from outside (the agent, Clear all): follow the table. */
    var body = document.getElementById("utTxBody");
    if (body) new MutationObserver(sync).observe(body, { childList: true });
    sync();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { window.setTimeout(bindQuick, 0); });
  } else {
    window.setTimeout(bindQuick, 0);
  }
})();
