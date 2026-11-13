/* Demo 3 — Ownership / UBO report panel (table + graph + officers). */
(function () {
  /* Rich demo tree from pages/KYB Results (Meridian Holdings). */
  var MERIDIAN_HOLDINGS_GRAPH = {
    riskFilter: { label: "Risk Signals: High", count: 6 },
    tree: {
      id: "root",
      type: "business",
      name: "Meridian Holdings Ltd.",
      subtitle: "Root Business",
      risk: "high",
      details: {
        status: "Active",
        statusTone: "positive",
        fields: [
          { label: "Country", value: "United States", flag: "US" },
          { label: "Jurisdiction", value: "Texas" },
          { label: "Business number", value: "11876542" },
          { label: "Tax ID", value: "19498172498" },
          { label: "Ownership percentage", value: "50%" },
          { label: "Degree of separation", value: "1st" },
          { label: "Business entity type", value: "Business" }
        ],
        truai:
          "Meridian Holdings Ltd. is a Texas-registered entity linked to 3 connected entities. Both shareholders use a formations-agent address, and neither has a verified national ID on file.",
        prompt: "Is this a shell company?",
        findings: [
          "Both shareholders share a formations-agent address",
          "Walter Decosta linked to 2 unscreened entities",
          "No verifiable national ID for either officer"
        ],
        connected: [
          {
            id: "steven",
            type: "person",
            role: "Shareholder",
            name: "Steven",
            pct: "35%",
            address: "71 Stevenson St, San Francisco"
          },
          {
            id: "james",
            type: "person",
            role: "COO",
            name: "James Morton",
            pct: "65%",
            address: "71 Stevenson St, San Francisco"
          },
          {
            id: "apex",
            type: "business",
            role: "Subsidiary Company",
            name: "Apex Financial",
            address: "100 N Riverside Plaza, Chicago"
          }
        ]
      },
      children: [
        {
          id: "steven",
          type: "person",
          name: "Steven",
          subtitle: "Owns 35%",
          moreHidden: [
            { id: "patricia", type: "person", name: "Patricia L.", subtitle: "Owns 15%" }
          ]
        },
        {
          id: "james",
          type: "person",
          name: "James Morton",
          subtitle: "Owns 65%",
          risk: "high",
          details: {
            status: "Active",
            statusTone: "positive",
            fields: [
              { label: "Ownership %", value: "65%" },
              { label: "Position", value: "Chief Operating Officer" },
              { label: "Country", value: "United States" },
              { label: "Address", value: "71 Stevenson St, San Francisco" },
              { label: "Appointed", value: "Jan 2023" },
              { label: "Phone", value: "+1 979 323-7166" },
              { label: "Email", value: "mortonj@gmail.com" },
              { label: "Date of Birth", value: "1st Jan, 1990" }
            ],
            truai:
              "Ownership resolves to two shareholders at the same registered-agent address. Neither officer has a verifiable national ID.",
            prompt: "Who is the UBO?",
            findings: [
              "Both shareholders share a registered-agent address",
              "Walter Decosta linked to 2 unscreened entities",
              "No verifiable national ID for either officer"
            ],
            connected: [
              {
                id: "walter",
                type: "person",
                role: "Director",
                name: "Walter Decosta",
                address: "71 Stevenson St, San Francisco"
              }
            ]
          },
          children: [
            {
              id: "walter",
              type: "person",
              name: "Walter Decosta",
              subtitle: "Director",
              risk: "high",
              details: {
                status: "Active",
                statusTone: "positive",
                fields: [
                  { label: "Position", value: "Director" },
                  { label: "Country", value: "United States" },
                  { label: "Address", value: "71 Stevenson St, San Francisco" }
                ],
                truai:
                  "Director appointed alongside shareholders at a registered-agent address with no verifiable national ID on file.",
                prompt: "Who is the UBO?",
                findings: ["No verifiable national ID", "Shares registered-agent address with shareholders"]
              }
            }
          ]
        }
      ]
    }
  };

  var MERIDIAN_TABLE_ROWS = [
    {
      type: "person",
      name: "James Morton",
      sub: "Shareholder",
      pct: "65%",
      address: "71 Stevenson St, San Francisco",
      status: "positive",
      statusLabel: "Clear"
    },
    {
      type: "person",
      name: "Walter Decosta",
      sub: "Shareholder",
      pct: "35%",
      address: "71 Stevenson St, San Francisco",
      status: "negative",
      statusLabel: "2 more entities connected"
    }
  ];

  var MERIDIAN_OFFICER = {
    givenName: "MARK",
    surname: "WILLIAMSON",
    fullName: "MARK WILLIAMSON",
    nationalId: "123415",
    dob: "1976-02-12",
    position: "CHIEF OPERATING OFFICER",
    designation: "Not provided",
    type: "Individual",
    status: "Active",
    beginDate: "2017-07-18",
    endDate: "2020-01-12",
    address1: "1 SW Bow Street, Portland, OR 97005-6453",
    address1Note: "Primary registered address",
    address2: "22 CALGARY AVENUE, Suite 400, Calgary, AB",
    address2Note: "Second address — partially visible, remainder not available"
  };

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---- One description of an entity, used by the table's expanded row AND the
     graph's detail drawer, so both show the same information. ---- */
  var CITY_INFO = {
    "san francisco": { state: "CA", postal: "94105" },
    chicago: { state: "IL", postal: "60606" },
    "new york": { state: "NY", postal: "10281" },
    wilmington: { state: "DE", postal: "19801" },
    dallas: { state: "TX", postal: "75201" },
    houston: { state: "TX", postal: "77002" },
    austin: { state: "TX", postal: "78701" }
  };

  function parseAddress(addr) {
    var text = String(addr || "").trim();
    if (!text) return { street: "—", city: "—", state: "—", postal: "—" };
    var parts = text.split(",").map(function (p) { return p.trim(); }).filter(Boolean);
    var street = parts[0] || "—";
    var city = parts.length > 1 ? parts[1] : "—";
    var state = "—";
    var postal = "—";
    var tail = parts.slice(2).join(" ");
    var m = (tail || "").match(/\b([A-Z]{2})\b\s*(\d{5}(?:-\d{4})?)?/);
    if (m) {
      state = m[1];
      postal = m[2] || postal;
    }
    var known = CITY_INFO[String(city).toLowerCase()];
    if (known) {
      if (state === "—") state = known.state;
      if (postal === "—") postal = known.postal;
    }
    return { street: street.toUpperCase(), city: city.toUpperCase(), state: state, postal: postal };
  }

  /* info: { type: "person" | "business", address, status, role, root } */
  function entityFields(info) {
    var a = parseAddress(info.address);
    var status = info.status || "Active";
    var fields = [
      { label: "Full address", value: a.street },
      { label: "City", value: a.city },
      { label: "State province code", value: a.state },
      { label: "Postal code", value: a.postal }
    ];
    if (info.type === "business") {
      fields.push({ label: "Legal form", value: info.legalForm || "Limited liability company" });
      fields.push({ label: "Is out of business?", value: /^active$/i.test(status) ? "False" : "True" });
    } else {
      fields.push({ label: "Position", value: info.role || "Shareholder" });
      fields.push({ label: "Type", value: "Individual" });
    }
    fields.push({ label: "Status", value: status });
    fields.push({ label: "Beneficiary type", value: info.root ? "Root Business" : info.role || "Shareholder" });
    return fields;
  }

  /* Give every node of a graph the same detail fields as the table. */
  function withStandardDetails(graph, biz) {
    if (!graph || !graph.tree) return graph;
    var fallbackAddr = (biz && (biz.addr || (biz.report && biz.report.address))) || "";
    function addrOf(node) {
      var d = node.details || {};
      var f = (d.fields || []).filter(function (x) { return /^address$/i.test(x.label); })[0];
      if (f) return f.value;
      var fromParent = (node.__parentConnected || []).filter(function (c) { return c.id === node.id; })[0];
      return (fromParent && fromParent.address) || fallbackAddr;
    }
    function walk(node, parent, isRoot) {
      if (!node) return;
      var parentConnected = parent && parent.details && parent.details.connected;
      node.__parentConnected = parentConnected || [];
      var d = node.details || (node.details = { status: "Active", statusTone: "positive" });
      var role = isRoot ? "Root Business" : String(node.subtitle || "").replace(/^Owns\s+[\d.]+%$/i, "Shareholder") || "Shareholder";
      d.fields = entityFields({
        type: node.type === "business" ? "business" : "person",
        address: addrOf(node),
        status: d.status || "Active",
        role: role,
        root: isRoot
      });
      delete node.__parentConnected;
      (node.children || []).forEach(function (c) { walk(c, node, false); });
      (node.moreHidden || []).forEach(function (c) { walk(c, node, false); });
    }
    walk(graph.tree, null, true);
    return graph;
  }

  function synthesizeFromOwnership(biz) {
    var owners = biz.ownership || [];
    return {
      riskFilter: null,
      tree: {
        id: "root",
        type: "business",
        name: biz.name || "Business",
        subtitle: "Root Business",
        children: owners.map(function (owner, i) {
          return {
            id: "owner-" + i,
            type: owner.type === "corp" ? "business" : "person",
            name: owner.name,
            subtitle: owner.pct ? "Owns " + owner.pct : owner.role || "",
            risk: owner.flagged ? "high" : undefined
          };
        })
      }
    };
  }

  function graphFromBiz(biz) {
    return withStandardDetails(rawGraphFromBiz(biz), biz);
  }

  function rawGraphFromBiz(biz) {
    if (!biz) return null;
    if (biz.ownershipGraph && biz.ownershipGraph.tree) {
      return {
        tree: biz.ownershipGraph.tree,
        riskFilter: biz.ownershipGraph.riskFilter || null
      };
    }
    if (biz.ownershipUserProvided && biz.ownership && biz.ownership.length) {
      return synthesizeFromOwnership(biz);
    }
    if (/meridian/i.test(biz.name || "")) {
      var rich = clone(MERIDIAN_HOLDINGS_GRAPH);
      rich.tree.name = biz.name;
      if (rich.tree.details && rich.tree.details.truai) {
        rich.tree.details.truai = rich.tree.details.truai.replace(
          /Meridian Holdings (Inc|Ltd)\./g,
          biz.name
        );
      }
      return rich;
    }
    if (!(biz.ownership && biz.ownership.length)) return null;
    return synthesizeFromOwnership(biz);
  }

  function tableRowsFromBiz(biz) {
    if (!(biz && biz.ownershipUserProvided) && /meridian/i.test((biz && biz.name) || "")) return MERIDIAN_TABLE_ROWS.slice();
    var rows = (biz.ownership || []).map(function (owner) {
      return {
        type: owner.type === "corp" ? "business" : "person",
        name: owner.name || "—",
        sub: owner.role || owner.note || (owner.type === "corp" ? "Corporate" : "Individual"),
        pct: owner.pct || "—",
        address: owner.address || biz.addr || "—",
        status: owner.flagged ? "negative" : "positive",
        statusLabel: owner.flagged
          ? owner.screeningLabel || "Needs review"
          : owner.screeningLabel || "Clear"
      };
    });
    /* Demo reports opened from resume/recent often lack ownership — never leave the tab blank. */
    return rows.length ? rows : MERIDIAN_TABLE_ROWS.slice();
  }

  function officerFromBiz(biz) {
    if (biz && biz.officer) return biz.officer;
    return MERIDIAN_OFFICER;
  }

  var INFO_ICON =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25"/>' +
    '<path d="M8 7.25v3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><circle cx="8" cy="5.25" r=".6" fill="currentColor"/></svg>';

  /* Owner rows: Name, Entity Type, Degree of Separation, Direct Ownership %; a row
     opens to the same details the graph shows when a card is clicked. */
  function ownRowMarkup(row, i, rootName, rootAddr) {
    var isRoot = !!row.root;
    var info = {
      type: row.type === "business" ? "business" : "person",
      address: row.address,
      status: "Active",
      role: row.sub,
      root: isRoot
    };
    var fields = entityFields(info);
    if (row.statusLabel) fields.push({ label: "Screening status", value: row.statusLabel });
    var half = Math.ceil(fields.length / 2);
    function list(items) {
      return '<dl class="d3-kyb-officer__list">' + items.map(function (f) { return detailItem(f.label, f.value); }).join("") + "</dl>";
    }
    return (
      '<tr class="d3-kyb-officer__main" tabindex="0" aria-expanded="false" data-d3-officer-toggle="own' + i + '">' +
      '<td class="tds-data-table__text-cell tds-data-table__text-cell--subtext">' +
      '<span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-text-stack"><span>' + esc(row.name) + "</span>" +
      (row.sub && !isRoot ? '<span class="tds-data-table__cell-subtext">' + esc(row.sub) + "</span>" : "") +
      "</span></span></td>" +
      '<td class="tds-data-table__text-cell">' + (row.type === "business" ? "Business" : "Individual") + "</td>" +
      '<td class="tds-data-table__text-cell">' + (isRoot ? "0" : "1") + "</td>" +
      '<td class="tds-data-table__text-cell">' + esc(isRoot ? "-" : row.pct || "-") + "</td>" +
      '<td class="d3-kyb-officer__chev"><span class="d3-kyb-officer__chev-icon" aria-hidden="true">' + CHEVRON + "</span></td>" +
      "</tr>" +
      '<tr class="d3-kyb-officer__detail" data-d3-officer-detail="own' + i + '" hidden><td colspan="5">' +
      '<div class="d3-kyb-officer__cols">' + list(fields.slice(0, half)) + list(fields.slice(half)) + "</div></td></tr>"
    );
  }

  var CHEVRON =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>';

  function detailItem(label, value) {
    return (
      '<div class="d3-kyb-officer__item"><dt>' + esc(label) + "</dt><dd>" + esc(value || "—") + "</dd></div>"
    );
  }

  /* Directors, Officers & PSCs as a table: one summary row per person, the rest of
     what we know opens under it. */
  function officerRows(officer, i) {
    var active = /^active$/i.test(String(officer.status || ""));
    var tagClass = active ? "tds-tag--positive" : "tds-tag--default";
    var addr = [officer.address1, officer.address2].filter(Boolean).join(" · ");
    return (
      '<tr class="d3-kyb-officer__main" tabindex="0" aria-expanded="false" data-d3-officer-toggle="' + i + '">' +
      '<td class="tds-data-table__text-cell">' + esc(officer.fullName) + "</td>" +
      '<td class="tds-data-table__text-cell">' + esc(officer.dob || "—") + "</td>" +
      '<td class="tds-data-table__text-cell">' + esc(officer.designation || officer.position || "—") + "</td>" +
      '<td class="tds-data-table__text-cell"><span class="tds-data-table__label-cell"><span class="tds-tag tds-tag--md ' + tagClass + '">' +
      esc(officer.status || "—") + "</span></span></td>" +
      '<td class="d3-kyb-officer__chev"><span class="d3-kyb-officer__chev-icon" aria-hidden="true">' + CHEVRON + "</span></td>" +
      "</tr>" +
      '<tr class="d3-kyb-officer__detail" data-d3-officer-detail="' + i + '" hidden><td colspan="5">' +
      '<div class="d3-kyb-officer__cols">' +
      '<dl class="d3-kyb-officer__list">' +
      detailItem("Given name", officer.givenName) +
      detailItem("Surname", officer.surname) +
      detailItem("National ID number", officer.nationalId) +
      detailItem("Address", addr) +
      "</dl>" +
      '<dl class="d3-kyb-officer__list">' +
      detailItem("Position", officer.position) +
      detailItem("Type", officer.type) +
      detailItem("Begin date", officer.beginDate) +
      detailItem("End date", officer.endDate) +
      "</dl></div></td></tr>"
    );
  }

  function officerMarkup(officers) {
    var list = (Array.isArray(officers) ? officers : [officers]).filter(Boolean);
    if (!list.length) return "";
    return (
      '<section class="d3-kyb-officer" aria-label="Directors, Officers and PSCs">' +
      '<h3 class="d3-kyb-officer__title">Directors, Officers &amp; PSCs</h3>' +
      '<div class="tds-data-table-container d3-kyb-officer__table">' +
      '<div class="tds-data-table__wrapper">' +
      '<table class="tds-data-table tds-data-table--comfort">' +
      "<thead><tr>" +
      '<th aria-sort="none">Full name</th>' +
      '<th aria-sort="none">Date of birth</th>' +
      '<th aria-sort="none">Designation(s)</th>' +
      '<th aria-sort="none">Status</th>' +
      '<th class="d3-kyb-officer__chev"><span class="sr-only">Details</span></th>' +
      "</tr></thead><tbody>" +
      list.map(officerRows).join("") +
      "</tbody></table></div></div></section>"
    );
  }

  /* Open / close a person's details. */
  document.addEventListener("click", function (event) {
    var row = event.target.closest && event.target.closest("[data-d3-officer-toggle]");
    if (row) toggleOfficer(row);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var row = event.target.closest && event.target.closest("[data-d3-officer-toggle]");
    if (!row) return;
    event.preventDefault();
    toggleOfficer(row);
  });

  function toggleOfficer(row) {
    var table = row.closest("table");
    var detail = table && table.querySelector('[data-d3-officer-detail="' + row.getAttribute("data-d3-officer-toggle") + '"]');
    if (!detail) return;
    var open = row.getAttribute("aria-expanded") !== "true";
    row.setAttribute("aria-expanded", open ? "true" : "false");
    detail.hidden = !open;
  }

  function panelMarkup(bizOrTitle) {
    var biz = typeof bizOrTitle === "object" && bizOrTitle ? bizOrTitle : null;
    var title = biz ? "Ownership & UBO" : String(bizOrTitle || "Ownership & UBO");
    var rows = biz ? tableRowsFromBiz(biz) : MERIDIAN_TABLE_ROWS;
    var officers = biz ? (biz.officers || [officerFromBiz(biz)]) : [MERIDIAN_OFFICER];
    var rootRow = {
      root: true,
      type: "business",
      name: (biz && biz.name) || "Business",
      sub: "Root Business",
      pct: "-",
      address: (biz && (biz.addr || (biz.report && biz.report.address))) || "",
      statusLabel: ""
    };
    var tbody = [rootRow].concat(rows).map(function (r, i) { return ownRowMarkup(r, i); }).join("");

    return (
      '<div class="d3-kyb-ownership" data-d3-kyb-ownership data-d3-kyb-own-view="graph">' +
      '<div class="d3-kyb-ownership__head">' +
      '<h3 class="d3-kyb-ownership__title">' +
      esc(title) +
      "</h3>" +
      '<div class="tds-segmented-control tds-segmented-control--icon-only" role="group" aria-label="Ownership view" data-d3-kyb-own-view-control>' +
      '<button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" aria-pressed="true" aria-label="UBO graph view" data-d3-kyb-own-view="graph">' +
      '<span class="tds-segmented-control__icon" aria-hidden="true">' +
      '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="3.25" r="1.75" stroke="currentColor" stroke-width="1.25"/>' +
      '<circle cx="4" cy="12.25" r="1.75" stroke="currentColor" stroke-width="1.25"/>' +
      '<circle cx="12" cy="12.25" r="1.75" stroke="currentColor" stroke-width="1.25"/>' +
      '<path d="M8 5v2M8 7H4M8 7h4M4 7v3.5M12 7v3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>' +
      "</svg></span></button>" +
      '<button type="button" class="tds-segmented-control__item" aria-pressed="false" aria-label="Table view" data-d3-kyb-own-view="table">' +
      '<span class="tds-segmented-control__icon" aria-hidden="true">' +
      '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="2.5" y="2.5" width="11" height="11" rx="1" stroke="currentColor" stroke-width="1.25"/>' +
      '<path d="M2.5 6h11M2.5 9.5h11M6 2.5v11" stroke="currentColor" stroke-width="1.25"/>' +
      "</svg></span></button>" +
      "</div></div>" +
      '<div class="d3-kyb-ownership__view" data-d3-kyb-own-panel="table" hidden>' +
      '<div class="tds-data-table-container d3-kyb-ownership__table">' +
      '<div class="tds-data-table__wrapper">' +
      '<table class="tds-data-table tds-data-table--comfort">' +
      "<thead><tr>" +
      '<th aria-sort="none">Name</th>' +
      '<th aria-sort="none">Entity Type</th>' +
      '<th aria-sort="none">Degree of Separation</th>' +
      '<th aria-sort="none">Direct Ownership % <span class="d3-kyb-ownership__info" title="Share of the entity held directly, not through another entity" aria-label="Share of the entity held directly, not through another entity">' + INFO_ICON + "</span></th>" +
      '<th class="d3-kyb-officer__chev"><span class="sr-only">Details</span></th>' +
      "</tr></thead>" +
      "<tbody>" +
      tbody +
      "</tbody></table></div></div>" +
      "</div>" +
      '<div class="d3-kyb-ownership__view" data-d3-kyb-own-panel="graph">' +
      '<div class="d3-kyb-ubo-graph">' +
      '<div class="kyb-ubo-graph-layout" id="kyb-ubo-graph-fullscreen-root">' +
      '<div class="kyb-ownership-graph kyb-ubo-graph-layout__canvas" data-kyb-ownership-graph aria-label="Ownership structure graph"></div>' +
      "</div></div></div>" +
      /* Below both views, so switching table / graph never changes it. */
      officerMarkup(officers) +
      "</div>"
    );
  }

  function setView(panel, view) {
    var root = panel.querySelector("[data-d3-kyb-ownership]");
    if (!root) return;
    root.setAttribute("data-d3-kyb-own-view", view);
    root.querySelectorAll("[data-d3-kyb-own-view]").forEach(function (btn) {
      if (!btn.closest("[data-d3-kyb-own-view-control]")) return;
      var on = btn.getAttribute("data-d3-kyb-own-view") === view;
      btn.classList.toggle("tds-segmented-control__item--selected", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    root.querySelectorAll("[data-d3-kyb-own-panel]").forEach(function (pane) {
      pane.hidden = pane.getAttribute("data-d3-kyb-own-panel") !== view;
    });
  }

  function bindViewToggle(panel, biz) {
    var control = panel.querySelector("[data-d3-kyb-own-view-control]");
    if (!control || control.getAttribute("data-bound") === "1") return;
    control.setAttribute("data-bound", "1");
    control.querySelectorAll("[data-d3-kyb-own-view]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var view = btn.getAttribute("data-d3-kyb-own-view") || "table";
        setView(panel, view);
        if (view === "graph" && biz) {
          window.requestAnimationFrame(function () {
            mountGraphOnly(panel, biz);
          });
        }
      });
    });
  }

  /* Node names are cut with an ellipsis when they exceed the fixed card width, so
     keep the full name on the title attribute. The graph re-renders on filter /
     zoom / expand, hence the observer. */
  function keepNodeTitles(container) {
    function apply() {
      container.querySelectorAll(".kyb-ubo-node__name").forEach(function (el) {
        var text = el.textContent || "";
        if (el.getAttribute("title") !== text) el.setAttribute("title", text);
      });
    }
    apply();
    if (typeof MutationObserver === "undefined" || container.__d3NodeTitles) return;
    container.__d3NodeTitles = new MutationObserver(apply);
    container.__d3NodeTitles.observe(container, { childList: true, subtree: true, characterData: true });
  }

  function mountGraphOnly(panel, biz) {
    var graph = graphFromBiz(biz);
    if (!graph || !graph.tree) {
      /* Fall back to Meridian demo tree so graph toggle is never empty. */
      graph = graphFromBiz({ name: "Meridian Apex Consulting Ltd.", addr: biz && (biz.addr || (biz.report && biz.report.address)) });
    }
    if (!graph || !graph.tree) return false;
    var container = panel.querySelector("[data-kyb-ownership-graph]");
    if (!container || !window.KybUboGraph || !window.KybUboGraph.mount) return false;
    window.KybUboGraph.mount(container, {
      tree: graph.tree,
      riskFilter: graph.riskFilter
    });
    keepNodeTitles(container);
    return true;
  }

  function mountInto(panel, biz) {
    if (!panel || !biz) return false;

    /* Always rebuild so tab switches never land on a blank shell. */
    if (window.KybUboGraph && window.KybUboGraph.unmount) {
      var prev = panel.querySelector("[data-kyb-ownership-graph]");
      if (prev) window.KybUboGraph.unmount(prev);
    }
    panel.innerHTML = panelMarkup(biz);
    bindViewToggle(panel, biz);
    setView(panel, "graph");
    window.requestAnimationFrame(function () {
      mountGraphOnly(panel, biz);
    });
    return true;
  }

  function unmountFrom(panel) {
    if (!panel || !window.KybUboGraph || !window.KybUboGraph.unmount) return;
    var container = panel.querySelector("[data-kyb-ownership-graph]");
    if (container) window.KybUboGraph.unmount(container);
  }

  window.D3KybUboGraph = {
    graphFromBiz: graphFromBiz,
    mountInto: mountInto,
    unmountFrom: unmountFrom,
    panelMarkup: panelMarkup,
    setView: setView
  };
})();
