/* Opens the shell drawer from a transaction row or View report.
   Transaction tabs behave like a browser: only rows the user has opened
   appear, and each new row click adds another tab. */
(function () {
  var main = document.querySelector(".d1-main");
  var drawer = document.querySelector("[data-d1-drawer-panel]");
  var tabs = document.querySelector("[data-d1-drawer-tabs]");
  var closeBtn = document.querySelector("[data-d1-drawer-close]");
  var expandBtn = document.querySelector("[data-d1-drawer-expand]");
  var expandIcon = document.querySelector("[data-d1-drawer-expand-icon]");
  if (!main || !drawer || !tabs) return;

  /* Open transaction tabs for this investigation. Report mode is separate. */
  var openTabs = [];
  var mode = null;
  var expanded = false;

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

  function showView(name) {
    document.querySelectorAll("[data-d1-drawer-view]").forEach(function (view) {
      var on = view.getAttribute("data-d1-drawer-view") === name;
      view.hidden = !on;
      view.classList.remove("is-in");
      if (on) {
        void view.offsetWidth;
        view.classList.add("is-in");
      }
    });
    var body = drawer.querySelector(".d1-drawer__body");
    if (body) body.scrollTop = 0;
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
    if (expandIcon) expandIcon.src = expanded ? "assets/icons/compress.svg" : "assets/icons/expand.svg";
  }

  function reveal() {
    main.setAttribute("data-d1-drawer", expanded ? "expanded" : "open");
    drawer.setAttribute("aria-hidden", "false");
  }

  function openReport() {
    mode = "report";
    openTabs = [];
    render([{ id: "report", label: "Business Verification Report" }], "report");
    showView("report");
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
    showView(id);
    reveal();
  }

  function open(kind) {
    if (!kind || kind === "report") openReport();
    else openRow(kind);
  }

  function close() {
    setExpanded(false);
    main.setAttribute("data-d1-drawer", "closed");
    drawer.setAttribute("aria-hidden", "true");
    openTabs = [];
    mode = null;
    tabs.replaceChildren();
    document.querySelectorAll(".d1-table tbody tr").forEach(function (tr) {
      tr.removeAttribute("aria-current");
    });
  }

  function toggleExpand() {
    if (main.getAttribute("data-d1-drawer") === "closed") return;
    setExpanded(!expanded);
    reveal();
  }

  /* The report and the table are cloned into the thread when a reply plays,
     so a listener bound at load never sees the View button or the rows. */
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

  var overview = document.querySelector("[data-d1-doc-panel='overview']");
  var empty = document.querySelector("[data-d1-doc-panel='empty']");
  document.querySelectorAll("[data-d1-doc-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var showOverview = tab.getAttribute("data-d1-doc-tab") === "overview";
      document.querySelectorAll("[data-d1-doc-tab]").forEach(function (other) {
        other.setAttribute("aria-selected", other === tab ? "true" : "false");
      });
      if (overview) overview.hidden = !showOverview;
      if (empty) empty.hidden = showOverview;
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", close);
  if (expandBtn) expandBtn.addEventListener("click", toggleExpand);

  document.addEventListener("keydown", function (event) {
    var state = main.getAttribute("data-d1-drawer");
    if (event.key === "Escape" && (state === "open" || state === "expanded")) close();
  });

  /* Sidebar / other modules open the report without re-binding View clicks. */
  document.addEventListener("d1-drawer:open", function (event) {
    open(event.detail && event.detail.kind ? event.detail.kind : "report");
  });

  document.addEventListener("d1-drawer:close", close);
})();
