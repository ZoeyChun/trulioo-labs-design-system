/* Demo 3 — page-by-page chat history.

   The AI panel's conversation on KYB Verification and on Transactions is
   stored as it happens and listed in the rail's Chats menu, so leaving a page
   (or opening a new chat) never loses it. Picking a row takes you back to the
   page and puts the conversation, and the page around it, back as it was:

     KYB   thread + surface (map / waiting for country / report) + map
           matches + selected business + the agent's confirm / filter state
     TX    thread + table filters (panel filters + the agent's predicate)

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

  var entries = [];
  /* Older builds kept chats in sessionStorage; make sure none linger. */
  try {
    window.sessionStorage.removeItem("d3-chat-history-v1");
  } catch (e) {}
  var activeId = null;
  var restoring = false;
  var seq = Date.now();
  var timer = 0;

  /* ------------------------------------------------------------ storage */

  /* The same conversation never appears twice: entries of one kind with the
     same thread are one chat (newest wins). */
  function dedupe(list) {
    var seen = {};
    return list.filter(function (e) {
      var key = e.kind + "|" + (e.html || "");
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function persist() {
    /* Memory only — nothing to write. Kept so callers read the same. */
  }

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

  function titleFor(kind) {
    var pane = text("[data-d3-ai-title]");
    if (kind === "kyb" && isVerifyFlow() && /^verify /i.test(pane)) return pane;
    return firstUserMessage() || pane || KIND_LABEL[kind];
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

  /* ------------------------------------------------------------ capture */

  function kybState() {
    var ws = $("[data-d3-workspace]");
    var mapEl = $("[data-d3-kyb-map]");
    var awaitEl = $("[data-d3-kyb-map-await]");
    var maps = window.D3KybMapSearch;
    var selected = maps && maps.getSelected ? maps.getSelected() : null;
    var surface = ws ? ws.getAttribute("data-d3-kyb-surface") : "map";
    var verify = isVerifyFlow();
    var st = {
      surface: surface,
      verify: verify,
      awaiting: !!(verify && mapEl && mapEl.classList.contains("is-awaiting-country") && awaitEl && !awaitEl.hidden),
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

  function capture() {
    window.clearTimeout(timer);
    if (restoring) return;
    var kind = pageKind();
    if (!kind) return;
    /* An empty thread is a reset in progress, not a conversation: leave the
       active chat as it is (New Chat / leaving a page clear activeId). */
    if (!thread.children.length) return;
    var entry = active();
    if (!entry) {
      /* Re-opened (or re-arrived at) a conversation we already hold: adopt it
         instead of listing a copy. */
      var html = thread.innerHTML;
      entry = entries.filter(function (e) {
        return e.kind === kind && e.html === html;
      })[0];
      if (entry) activeId = entry.id;
    }
    if (!entry) {
      seq += 1;
      entry = { id: "c" + seq, kind: kind };
      entries.unshift(entry);
      activeId = entry.id;
    } else if (entry.kind !== kind) {
      return;
    }
    entry.title = titleFor(kind);
    entry.html = thread.innerHTML;
    entry.state = kind === "kyb" ? kybState() : txState();
    entry.ts = Date.now();
    var at = entries.indexOf(entry);
    if (at > 0) {
      entries.splice(at, 1);
      entries.unshift(entry);
    }
    /* Current chat first, so if a twin exists it is the twin that goes. */
    entries = dedupe(entries);
    if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
    persist();
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

  function restoreKyb(entry) {
    var st = entry.state || {};
    var maps = window.D3KybMapSearch;
    var resume = window.D3KybResume;
    if (!resume || !resume.openMapExperience) return;

    resume.openMapExperience();
    thread.innerHTML = entry.html;

    if (st.surface === "report" && st.session && resume.expandToFullReport) {
      resume.expandToFullReport(st.session);
    } else if (st.awaiting && maps && maps.setAwaitingCountry) {
      maps.setAwaitingCountry(true, st.stage === "name" ? "" : st.query || "this business");
    } else if (maps && !st.verify && maps.setAwaitingCountry) {
      /* A plain Q&A chat has no business on the map yet. */
      maps.setAwaitingCountry(true, "");
    } else if (maps && st.resultIds && st.resultIds.length && maps.plotResults) {
      var list = st.resultIds.map(maps.findById).filter(Boolean);
      if (list.length) maps.plotResults(list, st.caption || undefined);
    }
    if (maps && maps.setSelected && st.selectedId && maps.findById) {
      maps.setSelected(maps.findById(st.selectedId));
    }
    if (window.D3KybAgent && window.D3KybAgent.restoreState) window.D3KybAgent.restoreState(st.agent);

    resumeChrome();
    if (resume.syncChatBack) resume.syncChatBack(true);
    var el = $("[data-d3-chat-thread]");
    if (el) el.scrollTop = el.scrollHeight;
  }

  function restoreTx(entry) {
    var st = entry.state || {};
    if (window.D3Transactions && window.D3Transactions.open) window.D3Transactions.open();
    thread.innerHTML = entry.html;
    if (window.D3TxAgent && window.D3TxAgent.restoreContext) window.D3TxAgent.restoreContext(st.ctx);
    resumeChrome();

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

  function restore(id) {
    var entry = entries.filter(function (e) {
      return e.id === id;
    })[0];
    if (!entry) return;
    capture();
    restoring = true;
    activeId = entry.id;
    try {
      if (entry.kind === "kyb") restoreKyb(entry);
      else if (entry.kind === "tx") restoreTx(entry);
    } finally {
      window.setTimeout(function () {
        restoring = false;
        render();
      }, 900);
    }
    /* Close the flyout we were clicked in. */
    var fly = host.closest(".d1-fly");
    if (fly && document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  /* ------------------------------------------------------------ leaving */

  /* Leaving a page stores its chat, then the thread is cleared so the next
     page starts clean instead of inheriting this page's messages. */
  function leave() {
    var kind = pageKind();
    capture();
    if (!kind) return;
    window.setTimeout(function () {
      /* Rail items that do not change the page (the Chats menu button, same-page
         clicks) must not end the conversation — only an actual page change does. */
      if (restoring || pageKind() === kind) return;
      activeId = null;
      if (!thread.children.length) return;
      thread.replaceChildren();
      if (window.D3KybAgent && window.D3KybAgent.restoreState) window.D3KybAgent.restoreState({});
      if (window.D3TxAgent && window.D3TxAgent.restoreContext) window.D3TxAgent.restoreContext({});
      if (window.D3Nav) window.D3Nav.markChatIdle();
      document.dispatchEvent(new CustomEvent("d3-kyb:restore-idle"));
    }, 0);
  }

  document.addEventListener(
    "click",
    function (event) {
      var t = event.target;
      if (!t || !t.closest) return;
      if (t.closest("[data-d3-nav]")) {
        leave();
        return;
      }
      /* New Chat starts a fresh conversation: keep this one in the menu. */
      if (t.closest("[data-d3-chat-new]")) {
        capture();
        activeId = null;
      }
    },
    true
  );

  /* ------------------------------------------------------------ menu */

  function render() {
    host.innerHTML = "";
    if (!entries.length) return;
    var label = document.createElement("p");
    label.className = "d1-fly__label";
    label.textContent = "Recent";
    host.appendChild(label);
    entries.forEach(function (entry) {
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
      tag.textContent = KIND_LABEL[entry.kind] || "";
      btn.appendChild(name);
      btn.appendChild(tag);
      host.appendChild(btn);
    });
  }

  host.addEventListener("click", function (event) {
    var row = event.target.closest("[data-d3-chat-entry]");
    if (row) restore(row.getAttribute("data-d3-chat-entry"));
  });

  /* ------------------------------------------------------------ wiring */

  new MutationObserver(schedule).observe(thread, {
    childList: true,
    subtree: true,
    characterData: true
  });
  /* The KYB screens fire this when they reset to their empty state
     (New Chat, back to landing) — but not while we are restoring. */
  document.addEventListener("d3-kyb:restore-idle", function () {
    if (!restoring && !thread.children.length) activeId = null;
  });

  /* Hand-offs that change page without a rail click (e.g. the KYB agent sending a
     transaction-history question to Transactions) store the chat the same way. */
  window.D3ChatHistory = { leave: leave };

  persist();
  render();
})();
