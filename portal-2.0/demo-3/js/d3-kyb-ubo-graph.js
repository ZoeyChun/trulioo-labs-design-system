/* Demo 3 — Mount KYB Results Ownership / UBO React graph into the
   verification report Ownership / UBO panel. */
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
                findings: [
                  "Linked to 2 unscreened entities",
                  "No verifiable national ID on file"
                ]
              }
            }
          ]
        },
        {
          id: "apex",
          type: "business",
          name: "Apex Financial",
          subtitle: "Subsidiary Company",
          risk: "medium",
          details: {
            status: "Active",
            statusTone: "positive",
            fields: [
              { label: "Country", value: "United States" },
              { label: "Jurisdiction", value: "Illinois" },
              { label: "Business Number", value: "88210445" },
              { label: "Tax ID", value: "88-2104451" }
            ],
            truai:
              "Subsidiary registered in Illinois with two reported beneficial owners and limited public disclosure.",
            prompt: "Who controls this subsidiary?",
            findings: [
              "Connie M. holds 95% ownership",
              "Sarah Wong listed as UBO with medium risk signals"
            ]
          },
          children: [
            { id: "connie", type: "person", name: "Connie M.", subtitle: "Owns 95%", risk: "low" },
            { id: "sarah", type: "person", name: "Sarah Wong", subtitle: "UBO", risk: "medium" }
          ]
        }
      ]
    }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function slugId(name, index) {
    return (
      "owner-" +
      index +
      "-" +
      String(name || "entity")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 24)
    );
  }

  function synthesizeFromOwnership(biz) {
    var owners = (biz.ownership || []).filter(function (row) {
      return row && row.name && row.pct !== "—";
    });
    var children = owners.map(function (owner, index) {
      var pct = owner.pct || "";
      var subtitle =
        pct.indexOf("%") >= 0
          ? "Owns " + pct
          : owner.role || owner.note || pct || "Ownership party";
      return {
        id: slugId(owner.name, index),
        type: owner.type === "person" ? "person" : "business",
        name: owner.name,
        subtitle: subtitle,
        risk: owner.flagged ? "high" : null,
        details: owner.note
          ? {
              status: owner.flagged ? "Review" : "Clear",
              statusTone: owner.flagged ? "negative" : "positive",
              fields: [
                { label: "Role", value: owner.role || "—" },
                { label: "Ownership %", value: owner.pct || "—" },
                {
                  label: "Entity type",
                  value: owner.type === "person" ? "Natural person" : "Corporate"
                }
              ],
              findings: owner.note ? [owner.note] : []
            }
          : undefined
      };
    });

    return {
      tree: {
        id: "root",
        type: "business",
        name: biz.name || "Root Business",
        subtitle: "Root Business",
        risk: biz.riskLevel === "high" ? "high" : biz.riskLevel === "medium" ? "medium" : null,
        children: children
      },
      riskFilter: null
    };
  }

  function graphFromBiz(biz) {
    if (!biz) return null;
    if (biz.ownershipGraph && biz.ownershipGraph.tree) {
      return {
        tree: clone(biz.ownershipGraph.tree),
        riskFilter: biz.ownershipGraph.riskFilter || null
      };
    }
    /* Meridian demo entities get the full KYB Results ownership canvas. */
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

  function panelMarkup(title) {
    return (
      '<div class="d3-kyb-ubo-graph">' +
      '<h3 class="d3-kyb-ubo-graph__title d3-kyb-overview__title">' +
      title +
      "</h3>" +
      '<div class="kyb-ubo-graph-layout" id="kyb-ubo-graph-fullscreen-root">' +
      '<div class="kyb-ownership-graph kyb-ubo-graph-layout__canvas" data-kyb-ownership-graph aria-label="Ownership structure graph"></div>' +
      "</div></div>"
    );
  }

  function mountInto(panel, biz) {
    if (!panel || !biz) return false;
    var graph = graphFromBiz(biz);
    if (!graph || !graph.tree) return false;

    var container = panel.querySelector("[data-kyb-ownership-graph]");
    if (!container) {
      panel.innerHTML = panelMarkup("Ownership / UBO");
      container = panel.querySelector("[data-kyb-ownership-graph]");
    }
    if (!container || !window.KybUboGraph || !window.KybUboGraph.mount) return false;

    window.KybUboGraph.mount(container, {
      tree: graph.tree,
      riskFilter: graph.riskFilter
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
    panelMarkup: panelMarkup
  };
})();
