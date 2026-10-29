/* Demo 3 — one continuous AI-panel conversation, kept until New Chat.

   The panel's thread is NOT reset when the user moves between KYB Verification,
   Transactions and Home. It carries on, and each page remembers where the
   conversation left it:

     KYB   surface (map / waiting for country / report) + map matches +
           selected business + the agent's confirm / filter state
     TX    table filters (panel filters + the agent's predicate)

   Coming back to a page (rail click, or picking the chat from the Chats menu)
   puts that page back the way the conversation left it.

   New Chat ends the conversation: it is stored in the rail's Chats menu, the
   thread is cleared and every agent starts over. Picking a stored chat later
   reloads its thread and takes you to the page it was last on.

   Home chats keep using chat.js's own list (rendered right below ours).
   Chats live in memory only: a reload (soft or hard) is a fresh start. */
(function () {
  "use strict";

  var shell = document.querySelector(".d1-shell");
  var thread = document.querySelector("[data-d1-thread]");
  var host = document.querySelector("[data-d3-chat-history]");
  if (!shell || !thread || !host) return;

  var MAX_ENTRIES = 12;
  var KIND_LABEL = { kyb: "KYB Verification", tx: "Transactions" };
  var NAV_PAGE = { kyb: "kyb", transactions: "tx" };

  var entries = [];
  /* Older builds kept chats in sessionStorage; make sure none linger. */
  try {
    window.sessionStorage.removeItem("d3-chat-history-v1");
  } catch (e) {}
  var activeId = null;
  var restoring = false;
  var seq = Date.now();
  var timer = 0;

  /* ------------------------------------------------------------ helpers */

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function text(sel) {
    var el = $(sel);
    return el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  }

  function pageKind() {
    var view = shell.getAttribute("data-d3-view");
    var mode = shell.getAttribute("data-d3-chat-mode");
    if (view === "transactions") return "tx";
    if (view === "chat" && mode === "kyb") return "kyb";
    return "";
  }

  function active() {
    for (var i = 0; i < entries.length; i += 1) {
      if (entries[i].id === activeId) return entries[i];
    }
    return null;
  }

  function hasThread() {
    return !!thread.querySelector(".d1-user");
  }

  function firstUserMessage() {
    var p = $(".d1-user p", thread);
    var t = p ? p.textContent.trim() : "";
    return t.length > 40 ? t.slice(0, 37) + "…" : t;
  }

  /* A KYB chat is a verification only once it has reached the search / confirm /
     report steps. Plain Q&A ("What information do I need?") is not — and the
     panel header can still be showing the title of an earlier search then. */
  var VERIFY_SELECTOR =
    "[data-d1-confirm-card], .d3-kyb-cand-panel, .ai-cand, [data-d3-kyb-confirm]";

  function isVerifyFlow() {
    var ws = $("[data-d3-workspace]");
    if (ws && ws.getAttribute("data-d3-kyb-surface") === "report") return true;
    var awaitEl = $("[data-d3-kyb-map-await]");
    if (awaitEl && !awaitEl.hidden) return true;
    return !!thread.querySelector(VERIFY_SELECTOR);
  }

  function txFrame() {
    var frame = $("[data-d3-tx-frame]");
    return frame && frame.contentWindow ? frame : null;
  }

  function txApi() {
    var frame = txFrame();
    try {
      return frame && frame.contentWindow.UTTransactions ? frame.contentWindow.UTTransactions : null;
    } catch (e) {
      return null;
    }
  }

  /* The same conversation never appears twice. */
  function dedupe(list) {
    var seen = {};
    return list.filter(function (e) {
      var key = e.html || "";
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  /* ------------------------------------------------------------ capture */

  function kybState() {
    var ws = $("[data-d3-workspace]");
    var mapEl = $("[data-d3-kyb-map]");
    var awaitEl = $("[data-d3-kyb-map-await]");
    var maps = window.D3KybMapSearch;
    var selected = maps && maps.getSelected ? maps.getSelected() : null;
    var surface = ws ? ws.getAttribute("data-d3-kyb-surface") : "map";
    var verify = isVerifyFlow();
    var awaiting = !!(verify && mapEl && mapEl.classList.contains("is-awaiting-country") && awaitEl && !awaitEl.hidden);
    var st = {
      surface: surface,
      verify: verify,
      /* On the landing the conversation has nothing KYB-specific to put back. */
      landing: surface === "resume" && !verify && !awaiting,
      awaiting: awaiting,
      query: text("[data-d3-kyb-map-await-query]"),
      stage: awaitEl ? awaitEl.getAttribute("data-d3-await-stage") || "" : "",
      caption: text("[data-d3-kyb-map-caption]"),
      /* Map context only belongs to a verification — otherwise it is whatever
         the last search left behind. */
      selectedId: verify && selected && selected.id ? selected.id : null,
      resultIds: verify
        ? ((maps && maps.getLastResults && maps.getLastResults()) || []).map(function (b) {
            return b.id;
          })
        : [],
      agent: window.D3KybAgent && window.D3KybAgent.getState ? window.D3KybAgent.getState() : null
    };
    if (surface === "report") {
      var tag = $("[data-d3-kyb-resume] .d1-tag");
      st.session = {
        incomplete: false,
        businessName: text(".d3-workspace__biz-name"),
        status: tag ? tag.textContent.trim() : "Verified",
        country: text("[data-d3-kyb-detail-country]"),
        transactionId: text("[data-d3-kyb-detail-txid]"),
        date: text("[data-d3-kyb-detail-date]")
      };
    }
    return st;
  }

  function txState() {
    var api = txApi();
    var st = { filters: null, ctx: null };
    if (api) {
      var s = api.getState();
      st.filters = {
        outcomes: s.filters.outcomes,
        risks: s.filters.risks,
        products: s.filters.products,
        sources: s.filters.sources,
        types: s.filters.types,
        watchlist: s.filters.watchlist,
        country: s.filters.country,
        search: s.search,
        product: s.product,
        dateStart: s.date && s.date.start,
        dateEnd: s.date && s.date.end
      };
    }
    if (window.D3TxAgent && window.D3TxAgent.getContext) st.ctx = window.D3TxAgent.getContext();
    return st;
  }

  function titleFor(entry, kind) {
    var pane = text("[data-d3-ai-title]");
    /* "Verify Meridian in US" is only true on the KYB page; remember it so the
       name survives moving to another page. */
    if (kind === "kyb" && isVerifyFlow() && /^verify /i.test(pane)) entry.verifyTitle = pane;
    return entry.verifyTitle || firstUserMessage() || pane || KIND_LABEL[kind];
  }

  function capture() {
    window.clearTimeout(timer);
    if (restoring) return;
    var kind = pageKind();
    if (!kind) return;
    /* An empty thread is a reset in progress, not a conversation. */
    if (!hasThread()) return;
    var entry = active();
    if (!entry) {
      /* Re-arrived at a conversation we already hold: adopt it, don't copy it. */
      var html = thread.innerHTML;
      entry = entries.filter(function (e) {
        return e.html === html;
      })[0];
      if (entry) activeId = entry.id;
    }
    if (!entry) {
      seq += 1;
      entry = { id: "c" + seq, pages: {} };
      entries.unshift(entry);
      activeId = entry.id;
    }
    entry.kind = kind;
    entry.title = titleFor(entry, kind);
    entry.html = thread.innerHTML;
    entry.pages[kind] = kind === "kyb" ? kybState() : txState();
    entry.ts = Date.now();
    var at = entries.indexOf(entry);
    if (at > 0) {
      entries.splice(at, 1);
      entries.unshift(entry);
    }
    /* Current chat first, so if a twin exists it is the twin that goes. */
    entries = dedupe(entries);
    if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
    render();
  }

  function schedule() {
    if (restoring) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(capture, 350);
  }

  /* ------------------------------------------------------------ restore */

  function whenReady(test, then, tries) {
    tries = tries == null ? 60 : tries;
    var ok = false;
    try {
      ok = test();
    } catch (e) {}
    if (ok) return then();
    if (tries <= 0) return then();
    window.setTimeout(function () {
      whenReady(test, then, tries - 1);
    }, 150);
  }

  function resumeChrome() {
    if (window.D3Nav) window.D3Nav.markChatActive();
    document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
    var pane = $("[data-d3-chat-pane]");
    if (pane) pane.classList.add("is-active");
  }

  /* Put the KYB workspace back where the conversation left it. Never touches the
     thread. */
  function applyKyb(st) {
    if (!st || st.landing) return;
    var maps = window.D3KybMapSearch;
    var resume = window.D3KybResume;
    if (!resume) return;

    if (st.surface === "report" && st.session && resume.expandToFullReport) {
      resume.expandToFullReport(st.session);
    } else {
      if (maps && maps.ensureMapSurface) maps.ensureMapSurface();
      if (st.awaiting && maps && maps.setAwaitingCountry) {
        maps.setAwaitingCountry(true, st.stage === "name" ? "" : st.query || "this business");
      } else if (maps && !st.verify && maps.setAwaitingCountry) {
        /* A plain Q&A chat has no business on the map yet. */
        maps.setAwaitingCountry(true, "");
      } else if (maps && st.resultIds && st.resultIds.length && maps.plotResults) {
        var list = st.resultIds.map(maps.findById).filter(Boolean);
        if (list.length) maps.plotResults(list, st.caption || undefined);
      }
    }
    if (maps && maps.setSelected && st.selectedId && maps.findById) {
      maps.setSelected(maps.findById(st.selectedId));
    }
    if (window.D3KybAgent && window.D3KybAgent.restoreState) window.D3KybAgent.restoreState(st.agent);
    if (resume.syncChatBack) resume.syncChatBack(true);
  }

  function applyTx(st) {
    if (!st) return;
    if (window.D3TxAgent && window.D3TxAgent.restoreContext) window.D3TxAgent.restoreContext(st.ctx);
    var f = st.filters;
    if (!f) return;
    var spec = {
      clear: true,
      outcomes: f.outcomes || [],
      risks: f.risks || [],
      products: f.products || [],
      sources: f.sources || [],
      types: f.types || [],
      watchlist: f.watchlist || [],
      country: f.country || ""
    };
    if (f.search) spec.search = f.search;
    if (f.product) spec.product = f.product;
    if (f.dateStart) spec.dateStart = f.dateStart;
    if (f.dateEnd) spec.dateEnd = f.dateEnd;
    var predicate = st.ctx && st.ctx.spec && st.ctx.spec.predicate;
    if (typeof predicate === "string") spec.predicate = predicate;
    /* The table lives in an iframe that loads lazily — wait for it. */
    whenReady(
      function () {
        var api = txApi();
        var win = txFrame() && txFrame().contentWindow;
        return api && win.document.readyState === "complete" && win.document.getElementById("utTxBody");
      },
      function () {
        var api = txApi();
        if (api) api.applySpec(spec);
      }
    );
  }

  /* A rule with a label marks where the conversation moved to another page. */
  var DIVIDER_LABEL = { kyb: "Continued in KYB Verification", tx: "Continued in Transactions" };

  function addDivider(kind) {
    if (!DIVIDER_LABEL[kind] || !hasThread()) return;
    var last = thread.lastElementChild;
    if (last && last.getAttribute("data-d3-chat-divider") === kind) return;
    var rule = document.createElement("div");
    rule.className = "d3-chat-divider";
    rule.setAttribute("data-d3-chat-divider", kind);
    rule.setAttribute("role", "separator");
    var label = document.createElement("span");
    label.textContent = DIVIDER_LABEL[kind];
    rule.appendChild(label);
    thread.appendChild(rule);
  }

  function applyPage(entry, kind) {
    if (!entry || !entry.pages || !entry.pages[kind]) return;
    if (kind === "kyb") applyKyb(entry.pages.kyb);
    else if (kind === "tx") applyTx(entry.pages.tx);
  }

  /* Reload a stored conversation: thread first, then the page it was last on. */
  function restore(id) {
    var entry = entries.filter(function (e) {
      return e.id === id;
    })[0];
    if (!entry || entry.id === activeId && hasThread() && entry.kind === pageKind()) return;
    capture();
    restoring = true;
    activeId = entry.id;
    try {
      thread.innerHTML = entry.html;
      if (window.D3KybAgent && window.D3KybAgent.restoreState) {
        window.D3KybAgent.restoreState(entry.pages.kyb ? entry.pages.kyb.agent : {});
      }
      if (window.D3TxAgent && window.D3TxAgent.restoreContext) {
        window.D3TxAgent.restoreContext(entry.pages.tx ? entry.pages.tx.ctx : {});
      }
      if (entry.kind === "tx") {
        if (window.D3Transactions && window.D3Transactions.open) window.D3Transactions.open();
      } else if (window.D3KybResume && window.D3KybResume.openMapExperience) {
        window.D3KybResume.openMapExperience();
      }
      applyPage(entry, entry.kind);
      resumeChrome();
      var el = $("[data-d3-chat-thread]");
      if (el) el.scrollTop = el.scrollHeight;
    } finally {
      window.setTimeout(function () {
        restoring = false;
        render();
      }, 900);
    }
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  /* ------------------------------------------------------------ moving between pages */

  /* The conversation stays; this stores what the page we are leaving looked like
     and, on arrival, puts the destination page back as the conversation left it.
     opts.skipApply: the caller is about to drive the destination itself. */
  function leave(opts) {
    opts = opts || {};
    var from = pageKind();
    capture();
    window.setTimeout(function () {
      if (restoring) return;
      var to = opts.to || pageKind();
      if (!to) return;
      var entry = active();
      if (!entry || !hasThread()) return;
      if (to !== from) addDivider(to);
      if (!opts.skipApply && (to !== from || opts.force)) applyPage(entry, to);
      /* The nav handlers (and re-opening the KYB report) park the pane idle even
         though the thread is still here — switch it back on once they are done,
         and once more after any async tail of the page restore. */
      resumeChrome();
      window.setTimeout(function () {
        if (!restoring && hasThread() && pageKind() === to) resumeChrome();
      }, 250);
    }, 0);
  }

  document.addEventListener(
    "click",
    function (event) {
      var t = event.target;
      if (!t || !t.closest) return;
      var nav = t.closest("[data-d3-nav]");
      if (nav) {
        var page = NAV_PAGE[nav.getAttribute("data-d3-nav")];
        /* Only rail items that open KYB / Transactions bring a page back. The
           Chats button, Home, settings … leave the conversation alone. */
        if (page) leave({ force: true });
        else capture();
        return;
      }
      /* New Chat: the conversation goes into the menu and everything starts over. */
      if (t.closest("[data-d3-chat-new]")) {
        capture();
        activeId = null;
        window.setTimeout(startOver, 0);
      }
    },
    true
  );

  function startOver() {
    thread.replaceChildren();
    if (window.D3KybAgent && window.D3KybAgent.restoreState) window.D3KybAgent.restoreState({});
    if (window.D3TxAgent && window.D3TxAgent.restoreContext) window.D3TxAgent.restoreContext({});
    var api = txApi();
    if (api && api.clearAiView) api.clearAiView();
    var ws = $("[data-d3-workspace]");
    if (ws) ws.removeAttribute("data-d3-map-ready");
    if (window.D3Nav) window.D3Nav.markChatIdle();
    render();
  }

  /* ------------------------------------------------------------ menu */

  var MENU_MAX = 5;
  var listAll = $("[data-d3-chat-list-all]");

  function rowFor(entry) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "d1-chat-row d3-chat-row" + (entry.id === activeId ? " d1-chat-row--current" : "");
    btn.setAttribute("role", "menuitem");
    btn.setAttribute("data-d3-chat-entry", entry.id);
    var name = document.createElement("span");
    name.className = "d3-chat-row__title";
    name.textContent = entry.title || KIND_LABEL[entry.kind];
    var tag = document.createElement("span");
    tag.className = "d3-chat-row__tag";
    tag.textContent = Object.keys(entry.pages)
      .map(function (k) {
        return k === "kyb" ? "KYB" : "Transactions";
      })
      .join(" · ");
    btn.appendChild(name);
    btn.appendChild(tag);
    return btn;
  }

  function render() {
    host.innerHTML = "";
    if (listAll) listAll.innerHTML = "";
    if (!entries.length) {
      closeLayer2();
      return;
    }
    var label = document.createElement("p");
    label.className = "d1-fly__label";
    label.textContent = "Recent";
    host.appendChild(label);
    /* The hover menu is a glance: the 5 most recent, then "See all". */
    entries.slice(0, MENU_MAX).forEach(function (entry) {
      host.appendChild(rowFor(entry));
    });
    if (entries.length > MENU_MAX) {
      var more = document.createElement("button");
      more.type = "button";
      more.className = "d3-chat-seeall";
      more.setAttribute("data-d3-chat-seeall", "");
      more.textContent = "See all (" + entries.length + ")";
      host.appendChild(more);
    }
    if (listAll) {
      entries.forEach(function (entry) {
        listAll.appendChild(rowFor(entry));
      });
    }
  }

  /* ---- second layer of the nav ---- */

  var layer2 = $("[data-d3-rail-layer2]");

  function openLayer2() {
    if (!layer2) return;
    layer2.hidden = false;
    shell.setAttribute("data-d3-rail-layer", "2");
    var back = $("[data-d3-rail-back]");
    if (back) window.setTimeout(function () { back.focus(); }, 60);
    if (document.activeElement && document.activeElement !== back && document.activeElement.blur) {
      document.activeElement.blur();
    }
  }

  function closeLayer2() {
    if (shell.getAttribute("data-d3-rail-layer") !== "2") return;
    shell.removeAttribute("data-d3-rail-layer");
    if (layer2) layer2.hidden = true;
    var chats = $('[data-d3-nav="messages"]');
    if (chats) chats.focus({ preventScroll: true });
  }

  host.addEventListener("click", function (event) {
    if (event.target.closest("[data-d3-chat-seeall]")) {
      openLayer2();
      return;
    }
    var row = event.target.closest("[data-d3-chat-entry]");
    if (row) restore(row.getAttribute("data-d3-chat-entry"));
  });

  if (listAll) {
    listAll.addEventListener("click", function (event) {
      var row = event.target.closest("[data-d3-chat-entry]");
      if (row) restore(row.getAttribute("data-d3-chat-entry"));
    });
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest && event.target.closest("[data-d3-rail-back]")) closeLayer2();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && shell.getAttribute("data-d3-rail-layer") === "2") closeLayer2();
  });

  /* ------------------------------------------------------------ wiring */

  new MutationObserver(schedule).observe(thread, {
    childList: true,
    subtree: true,
    characterData: true
  });

  /* Hand-offs that change page without a rail click (e.g. the KYB agent sending a
     transaction-history question to Transactions) store the page the same way. */
  window.D3ChatHistory = { leave: leave };

  render();
})();
