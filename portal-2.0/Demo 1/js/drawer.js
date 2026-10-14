/* Opens the shell drawer from a transaction row or View report. */
(function () {
  var main = document.querySelector(".d1-main");
  var drawer = document.querySelector("[data-d1-drawer-panel]");
  var tabs = document.querySelector("[data-d1-drawer-tabs]");
  var closeBtn = document.querySelector("[data-d1-drawer-close]");
  if (!main || !drawer || !tabs) return;

  function tableRows() {
    return Array.prototype.slice.call(document.querySelectorAll(".d1-table tbody tr[data-d1-tx]"));
  }

  function showView(name) {
    document.querySelectorAll("[data-d1-drawer-view]").forEach(function (view) {
      view.hidden = view.getAttribute("data-d1-drawer-view") !== name;
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

  function open(kind) {
    var rows = tableRows();
    var fromTable = kind && kind !== "report" && rows.length > 1;
    if (fromTable) {
      render(rows.map(function (tr) {
        var name = tr.cells[0] ? tr.cells[0].textContent.trim() : "Record";
        var product = tr.cells[3] ? tr.cells[3].textContent.trim() : "";
        return { id: tr.getAttribute("data-d1-tx"), label: product || name };
      }), kind);
      showView(kind);
    } else {
      render([{ id: "report", label: "Business Verification Report" }], "report");
      showView("report");
    }
    main.setAttribute("data-d1-drawer", "open");
    drawer.setAttribute("aria-hidden", "false");
  }

  function close() {
    main.setAttribute("data-d1-drawer", "closed");
    drawer.setAttribute("aria-hidden", "true");
    document.querySelectorAll(".d1-table tbody tr").forEach(function (tr) {
      tr.removeAttribute("aria-current");
    });
  }

  document.querySelectorAll(".d1-table tbody tr").forEach(function (row) {
    row.tabIndex = 0;
    row.addEventListener("click", function () { open(row.getAttribute("data-d1-tx"), row); });
    row.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(row.getAttribute("data-d1-tx"), row);
      }
    });
  });

  var view = document.querySelector(".d1-alert__view");
  if (view) view.addEventListener("click", function () { open("report"); });

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

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && main.getAttribute("data-d1-drawer") === "open") close();
  });
})();
