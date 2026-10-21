/* Demo 3 — Ownership / UBO report panel (table + graph + officers). */
(function () {
  /* Rich demo tree from pages/KYB Results (Meridian Holdings). */
  var MERIDIAN_HOLDINGS_GRAPH = {
    riskFilter: { label: "Risk Signals: High", count: 6 },
    tree: {
      id: "root",
      type: "business",
      name: "Meridian Holdings Inc.",
      subtitle: "Root Business",
      risk: "high",
      details: {
        status: "Active",
        statusTone: "positive",
        fields: [
          { label: "Country", value: "United States" },
          { label: "Jurisdiction", value: "Texas" },
          { label: "Business Number", value: "11876542" },
          { label: "Tax ID", value: "19498172498" }
        ],
        truai:
          "Meridian Holdings Inc. is a Texas-registered entity linked to 3 connected entities. Both shareholders use a registered-agent address, and neither has a verified national ID on file.",
        prompt: "Is this a shell company?",
        findings: [
          "Both shareholders share a registered-agent address",
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
      name: "James Morton",
      sub: "Shareholder",
      pct: "65%",
      address: "71 Stevenson St, San Francisco",
      status: "positive",
      statusLabel: "Clear"
    },
    {
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
    if (!biz) return null;
    if (biz.ownershipGraph && biz.ownershipGraph.tree) {
      return {
        tree: biz.ownershipGraph.tree,
        riskFilter: biz.ownershipGraph.riskFilter || null
      };
    }
    if (/meridian/i.test(biz.name || "")) {
      var rich = clone(MERIDIAN_HOLDINGS_GRAPH);
      rich.tree.name = biz.name;
      if (rich.tree.details && rich.tree.details.truai) {
        rich.tree.details.truai = rich.tree.details.truai.replace(
          /Meridian Holdings Inc\./g,
          biz.name
        );
      }
      return rich;
    }
    if (!(biz.ownership && biz.ownership.length)) return null;
    return synthesizeFromOwnership(biz);
  }

  function tableRowsFromBiz(biz) {
    if (/meridian/i.test((biz && biz.name) || "")) return MERIDIAN_TABLE_ROWS.slice();
    var rows = (biz.ownership || []).map(function (owner) {
      return {
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

  function rowMarkup(row) {
    var tagClass =
      row.status === "negative" ? "tds-tag--negative" : "tds-tag--positive";
    return (
      "<tr>" +
      '<td class="tds-data-table__text-cell tds-data-table__text-cell--subtext">' +
      '<span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-text-stack">' +
      "<span>" +
      esc(row.name) +
      '</span><span class="tds-data-table__cell-subtext">' +
      esc(row.sub) +
      "</span></span></span></td>" +
      '<td class="tds-data-table__text-cell">' +
      esc(row.pct) +
      "</td>" +
      '<td class="tds-data-table__text-cell">' +
      esc(row.address) +
      "</td>" +
      '<td class="tds-data-table__text-cell"><span class="tds-data-table__label-cell">' +
      '<span class="tds-tag tds-tag--md ' +
      tagClass +
      '">' +
      esc(row.statusLabel) +
      "</span></span></td>" +
      "</tr>"
    );
  }

  function fieldMarkup(label, value, note) {
    return (
      '<div class="d3-kyb-officer__field">' +
      '<p class="d3-kyb-overview__label">' +
      esc(label) +
      "</p>" +
      '<p class="d3-kyb-overview__value">' +
      esc(value) +
      "</p>" +
      (note ? '<p class="d3-kyb-overview__note">' + esc(note) + "</p>" : "") +
      "</div>"
    );
  }

  function statusFieldMarkup(value) {
    return (
      '<div class="d3-kyb-officer__field">' +
      '<p class="d3-kyb-overview__label">Status</p>' +
      '<p class="d3-kyb-overview__value d3-kyb-overview__value--ok">' +
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m5.25 8.25 1.75 1.75 3.75-3.75"/>' +
      "</svg> " +
      esc(value) +
      "</p></div>"
    );
  }

  function officerMarkup(officer) {
    if (!officer) return "";
    return (
      '<section class="d3-kyb-officer" aria-label="Directors, Officers and PSCs">' +
      '<h3 class="d3-kyb-officer__title">Directors, Officers &amp; PSCs</h3>' +
      '<div class="d3-kyb-officer__grid">' +
      '<div class="d3-kyb-officer__row">' +
      fieldMarkup("Given Name", officer.givenName) +
      fieldMarkup("Surname", officer.surname) +
      fieldMarkup("Full Name", officer.fullName) +
      "</div>" +
      '<div class="d3-kyb-officer__row">' +
      fieldMarkup("National ID Number", officer.nationalId) +
      fieldMarkup("Date of Birth", officer.dob) +
      fieldMarkup("Position", officer.position) +
      "</div>" +
      '<div class="d3-kyb-officer__row">' +
      fieldMarkup("Designation", officer.designation) +
      fieldMarkup("Type", officer.type) +
      statusFieldMarkup(officer.status) +
      "</div>" +
      '<div class="d3-kyb-officer__row">' +
      fieldMarkup("Begin Date", officer.beginDate) +
      fieldMarkup("End Date", officer.endDate) +
      '<div class="d3-kyb-officer__field d3-kyb-officer__field--spacer" aria-hidden="true"></div>' +
      "</div>" +
      '<div class="d3-kyb-officer__row">' +
      fieldMarkup("Address 1", officer.address1, officer.address1Note) +
      fieldMarkup("Address 2", officer.address2, officer.address2Note) +
      '<div class="d3-kyb-officer__field d3-kyb-officer__field--spacer" aria-hidden="true"></div>' +
      "</div></div></section>"
    );
  }

  function panelMarkup(bizOrTitle) {
    var biz = typeof bizOrTitle === "object" && bizOrTitle ? bizOrTitle : null;
    var title = biz ? "Ownership & UBO" : String(bizOrTitle || "Ownership & UBO");
    var rows = biz ? tableRowsFromBiz(biz) : MERIDIAN_TABLE_ROWS;
    var officer = biz ? officerFromBiz(biz) : MERIDIAN_OFFICER;
    var tbody = rows.map(rowMarkup).join("");

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
      '<th aria-sort="none">Ownership</th>' +
      '<th aria-sort="none">Address</th>' +
      '<th aria-sort="none">Screening Status</th>' +
      "</tr></thead>" +
      "<tbody>" +
      tbody +
      "</tbody></table></div></div>" +
      officerMarkup(officer) +
      "</div>" +
      '<div class="d3-kyb-ownership__view" data-d3-kyb-own-panel="graph">' +
      '<div class="d3-kyb-ubo-graph">' +
      '<div class="kyb-ubo-graph-layout" id="kyb-ubo-graph-fullscreen-root">' +
      '<div class="kyb-ownership-graph kyb-ubo-graph-layout__canvas" data-kyb-ownership-graph aria-label="Ownership structure graph"></div>' +
      "</div></div></div></div>"
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

  function mountGraphOnly(panel, biz) {
    var graph = graphFromBiz(biz);
    if (!graph || !graph.tree) {
      /* Fall back to Meridian demo tree so graph toggle is never empty. */
      graph = graphFromBiz({ name: "Meridian Apex Consulting Ltd." });
    }
    if (!graph || !graph.tree) return false;
    var container = panel.querySelector("[data-kyb-ownership-graph]");
    if (!container || !window.KybUboGraph || !window.KybUboGraph.mount) return false;
    window.KybUboGraph.mount(container, {
      tree: graph.tree,
      riskFilter: graph.riskFilter
    });
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
