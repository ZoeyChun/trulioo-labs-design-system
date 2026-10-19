/* Opens the shell drawer from a transaction row or View report.
   Transaction tabs behave like a browser: only rows the user has opened
   appear, and each new row click adds another tab.

   Motion sequence:
   - Open: shell + content run together (width reveal + fade/slide).
   - Close: content fades out, then shell collapses R→L.
   Inner surface width is locked so report content does not reflow mid-tween. */
(function () {
  var main = document.querySelector(".d1-main");
  var drawer = document.querySelector("[data-d1-drawer-panel]");
  var surface = drawer && drawer.querySelector(".d1-drawer__surface");
  var tabs = document.querySelector("[data-d1-drawer-tabs]");
  var closeBtn = document.querySelector("[data-d1-drawer-close]");
  var expandBtn = document.querySelector("[data-d1-drawer-expand]");
  var expandIcon = document.querySelector("[data-d1-drawer-expand-icon]");
  if (!main || !drawer || !surface || !tabs) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* Transactions: snap open/close (no shell tween). Others keep 420/160. */
  function shellMs() {
    if (reduced || onTransactionsView()) return 0;
    return 420;
  }
  function contentOutMs() {
    if (reduced || onTransactionsView()) return 0;
    return 160;
  }

  var openTabs = [];
  var mode = null;
  var expanded = false;
  var closing = false;
  var opening = false;
  var openTimer = 0;
  var closeTimer = 0;
  var shellHandler = null;

  function clearTimers() {
    window.clearTimeout(openTimer);
    window.clearTimeout(closeTimer);
    openTimer = 0;
    closeTimer = 0;
    if (shellHandler) {
      drawer.removeEventListener("transitionend", shellHandler);
      shellHandler = null;
    }
  }

  function setContentIn(on) {
    drawer.classList.toggle("is-content-in", !!on);
  }

  function setClosing(on) {
    drawer.classList.toggle("is-closing", !!on);
  }

  function availableWidth() {
    var style = window.getComputedStyle(main);
    var pad =
      (parseFloat(style.paddingLeft) || 0) +
      (parseFloat(style.paddingRight) || 0);
    return Math.max(0, main.clientWidth - pad);
  }

  function onTransactionsView() {
    var shell = document.querySelector(".d1-shell");
    return !!(shell && shell.getAttribute("data-d3-view") === "transactions");
  }

  function targetWidths(nextExpanded) {
    var avail = availableWidth();
    var drawerW;
    var slotW;
    if (onTransactionsView()) {
      /* Expanded = entity focus (table gone). Minimized = slim table strip. */
      if (nextExpanded) {
        drawerW = avail;
        slotW = 0;
      } else {
        slotW = Math.min(300, Math.max(220, Math.round(avail * 0.26)));
        drawerW = Math.max(0, avail - slotW);
      }
    } else {
      drawerW = nextExpanded ? avail : Math.round(avail * 0.7);
      slotW = Math.max(0, avail - drawerW);
    }
    return {
      avail: avail,
      drawerW: drawerW,
      slotW: slotW
    };
  }

  function currentDrawerPx() {
    var raw = main.style.getPropertyValue("--d1-drawer-w") || "";
    var n = parseFloat(raw);
    if (!isNaN(n)) return n;
    return drawer.getBoundingClientRect().width || 0;
  }

  /* Apply open/expanded state first so padding is correct, then lock widths. */
  function applySizes(nextExpanded, opts) {
    opts = opts || {};
    main.setAttribute("data-d1-drawer", nextExpanded ? "expanded" : "open");
    void main.offsetWidth;
    var sizes = targetWidths(nextExpanded);
    var surfaceW = sizes.drawerW;
    /* While resizing, keep surface at the larger width so iframe content
       does not reflow / jump mid-tween; snap after transition. */
    if (opts.lockSurfaceDuring) {
      surfaceW = Math.max(currentDrawerPx(), sizes.drawerW);
    }
    main.style.setProperty("--d1-drawer-surface-w", surfaceW + "px");
    main.style.setProperty("--d1-drawer-w", sizes.drawerW + "px");
    main.style.setProperty("--d1-slot-w", sizes.slotW + "px");
    return sizes;
  }

  function applyClosedSizes() {
    var avail = availableWidth();
    main.style.setProperty("--d1-drawer-w", "0px");
    main.style.setProperty("--d1-slot-w", avail + "px");
  }

  function initClosed() {
    applyClosedSizes();
    /* Keep last surface width at 0 until first open measures. */
    main.style.setProperty("--d1-drawer-surface-w", "0px");
  }

  function afterShell(callback) {
    var ms = shellMs();
    if (ms === 0) {
      callback();
      return;
    }
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      drawer.removeEventListener("transitionend", onEnd);
      shellHandler = null;
      window.clearTimeout(openTimer);
      openTimer = 0;
      callback();
    }
    function onEnd(event) {
      if (event.target !== drawer || event.propertyName !== "width") return;
      finish();
    }
    shellHandler = onEnd;
    drawer.addEventListener("transitionend", onEnd);
    openTimer = window.setTimeout(finish, ms + 80);
  }

  function tableRows() {
    var tables = document.querySelectorAll(".d1-thread .d1-table");
    var table = tables[tables.length - 1];
    if (!table) return [];
    return Array.prototype.slice.call(table.querySelectorAll("tbody tr[data-d1-tx]"));
  }

  function rowMeta(id) {
    var rows = tableRows();
    var row = null;
    for (var i = 0; i < rows.length; i += 1) {
      if (rows[i].getAttribute("data-d1-tx") === id) { row = rows[i]; break; }
    }
    if (!row) return { id: id, label: id };
    var name = row.cells[0] ? row.cells[0].textContent.trim() : "Record";
    var product = row.cells[3] ? row.cells[3].textContent.trim() : "";
    return { id: id, label: product || name };
  }

  function ensureTxFrame(view) {
    var frame = view.querySelector(".d1-tx__frame[data-d1-tx-src]");
    if (!frame || frame.getAttribute("src")) return;
    frame.setAttribute("src", frame.getAttribute("data-d1-tx-src"));
  }

  function showView(name, opts) {
    var animateDoc = !opts || opts.animateDoc !== false;
    document.querySelectorAll("[data-d1-drawer-view]").forEach(function (view) {
      var on = view.getAttribute("data-d1-drawer-view") === name;
      view.hidden = !on;
      view.classList.remove("is-in");
      if (on) {
        ensureTxFrame(view);
        if (animateDoc && drawer.classList.contains("is-content-in")) {
          void view.offsetWidth;
          view.classList.add("is-in");
        } else {
          view.classList.add("is-in");
        }
      }
    });
    var body = drawer.querySelector(".d1-drawer__body");
    if (body) {
      body.scrollTop = 0;
      body.classList.toggle(
        "d1-drawer__body--tx",
        name === "report" || name === "kyc" || name === "device" || name === "bank"
      );
    }
    tabs.querySelectorAll("[role='tab']").forEach(function (tab) {
      tab.setAttribute("aria-selected", tab.getAttribute("data-d1-view") === name ? "true" : "false");
    });
    tableRows().forEach(function (tr) {
      if (tr.getAttribute("data-d1-tx") === name) tr.setAttribute("aria-current", "true");
      else tr.removeAttribute("aria-current");
    });
  }

  function render(items, selected) {
    tabs.replaceChildren();
    items.forEach(function (item, index) {
      if (index > 0) {
        var rule = document.createElement("span");
        rule.className = "d1-drawer__rule";
        rule.setAttribute("aria-hidden", "true");
        tabs.appendChild(rule);
      }
      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "d1-drawer__tab";
      tab.setAttribute("role", "tab");
      tab.setAttribute("data-d1-view", item.id);
      tab.setAttribute("aria-selected", item.id === selected ? "true" : "false");
      tab.textContent = item.label;
      tab.addEventListener("click", function () { showView(item.id); });
      tabs.appendChild(tab);
    });
  }

  function setExpanded(on) {
    expanded = !!on;
    if (expandBtn) {
      expandBtn.setAttribute("aria-pressed", expanded ? "true" : "false");
      expandBtn.setAttribute("aria-label", expanded ? "Collapse" : "Expand");
    }
    if (expandIcon) {
      expandIcon.outerHTML = expanded
        ? '<svg data-d1-drawer-expand-icon class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9.5 6.5H13.5V2.5M6.5 9.5H2.5V13.5M13.5 6.5 9 2M2.5 9.5 7 14"/></svg>'
        : '<svg data-d1-drawer-expand-icon class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9.5 2.5H13.5V6.5M6.5 13.5H2.5V9.5M13.5 2.5 9 7M2.5 13.5 7 9"/></svg>';
      expandIcon = expandBtn.querySelector("[data-d1-drawer-expand-icon]");
    }
  }

  function isShellOpen() {
    var state = main.getAttribute("data-d1-drawer");
    return state === "open" || state === "expanded";
  }

  function reveal() {
    var wasClosed = !isShellOpen() || closing;
    clearTimers();
    closing = false;
    setClosing(false);
    opening = true;

    if (wasClosed) {
      /* Transactions: open into entity-focused (expanded) layout by default. */
      if (onTransactionsView()) setExpanded(true);
      var snap = shellMs() === 0;
      setContentIn(snap);
      /* State first (padding), then sizes, then animate width from 0. */
      main.setAttribute("data-d1-drawer", expanded ? "expanded" : "open");
      void main.offsetWidth;
      var sizes = targetWidths(expanded);
      main.style.setProperty("--d1-drawer-surface-w", sizes.drawerW + "px");
      if (snap) {
        main.style.setProperty("--d1-drawer-w", sizes.drawerW + "px");
        main.style.setProperty("--d1-slot-w", sizes.slotW + "px");
        drawer.setAttribute("aria-hidden", "false");
        opening = false;
        return;
      }
      main.style.setProperty("--d1-drawer-w", "0px");
      main.style.setProperty("--d1-slot-w", sizes.avail + "px");
      void drawer.offsetWidth;
      main.style.setProperty("--d1-drawer-w", sizes.drawerW + "px");
      main.style.setProperty("--d1-slot-w", sizes.slotW + "px");
      drawer.setAttribute("aria-hidden", "false");
      /* Next frame: fade content in with the width expand — one continuous motion. */
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          if (closing) return;
          setContentIn(true);
          openTimer = window.setTimeout(function () {
            opening = false;
          }, shellMs());
        });
      });
      return;
    }

    /* Already open — resize only (expand/minimize). Do not re-fade content. */
    resizeOpen(expanded);
  }

  function resizeOpen(nextExpanded) {
    opening = true;
    var sizes = applySizes(nextExpanded, { lockSurfaceDuring: true });
    drawer.setAttribute("aria-hidden", "false");
    setContentIn(true);
    afterShell(function () {
      if (closing) return;
      main.style.setProperty("--d1-drawer-surface-w", sizes.drawerW + "px");
      opening = false;
    });
  }

  function openReport() {
    mode = "report";
    openTabs = [];
    render([{ id: "report", label: "Business Verification Report" }], "report");
    showView("report", { animateDoc: false });
    reveal();
  }

  function openRow(id) {
    if (mode !== "rows") {
      mode = "rows";
      openTabs = [];
    }
    var exists = openTabs.some(function (item) { return item.id === id; });
    if (!exists) openTabs.push(rowMeta(id));
    render(openTabs, id);
    showView(id, { animateDoc: false });
    reveal();
  }

  function open(kind) {
    if (!kind || kind === "report") openReport();
    else openRow(kind);
  }

  function finishClose() {
    setExpanded(false);
    setContentIn(false);
    setClosing(false);
    main.setAttribute("data-d1-drawer", "closed");
    drawer.setAttribute("aria-hidden", "true");
    openTabs = [];
    mode = null;
    tabs.replaceChildren();
    var body = drawer.querySelector(".d1-drawer__body");
    if (body) body.classList.remove("d1-drawer__body--tx");
    document.querySelectorAll(".d1-table tbody tr").forEach(function (tr) {
      tr.removeAttribute("aria-current");
    });
    closing = false;
    opening = false;
  }

  function close() {
    if ((!isShellOpen() && !closing) || opening) return;
    if (closing) return;
    closing = true;
    clearTimers();
    setClosing(true);
    setContentIn(false);

    function collapseShell() {
      /* Restore main padding before measuring, then collapse width. */
      if (main.getAttribute("data-d1-drawer") === "expanded") {
        setExpanded(false);
        main.setAttribute("data-d1-drawer", "open");
        void main.offsetWidth;
      }
      applyClosedSizes();
      afterShell(finishClose);
    }

    var outMs = contentOutMs();
    if (outMs === 0) {
      collapseShell();
      return;
    }
    closeTimer = window.setTimeout(collapseShell, outMs);
  }

  function toggleExpand() {
    if (!isShellOpen() || closing || opening) return;
    setExpanded(!expanded);
    resizeOpen(expanded);
  }

  var thread = document.querySelector("[data-d1-thread]");
  if (thread) {
    thread.addEventListener("click", function (event) {
      if (event.target.closest(".d1-alert__view")) {
        open("report");
        return;
      }
      var row = event.target.closest("tr[data-d1-tx]");
      if (row) open(row.getAttribute("data-d1-tx"));
    });
    thread.addEventListener("keydown", function (event) {
      var row = event.target.closest("tr[data-d1-tx]");
      if (!row || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      open(row.getAttribute("data-d1-tx"));
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", close);
  if (expandBtn) expandBtn.addEventListener("click", toggleExpand);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && (isShellOpen() || closing)) close();
  });

  document.addEventListener("d1-drawer:open", function (event) {
    open(event.detail && event.detail.kind ? event.detail.kind : "report");
  });

  document.addEventListener("d1-drawer:close", close);

  window.addEventListener("resize", function () {
    if (closing || opening) return;
    if (isShellOpen()) applySizes(expanded);
    else applyClosedSizes();
  });

  initClosed();
})();
