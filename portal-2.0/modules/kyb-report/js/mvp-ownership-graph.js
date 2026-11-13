/* MVP ownership network — 1 root → 3 corps → people.
   Drawer + table: business fields on corps; Ownership & UBOs person fields on people.
   Random placeholder names; each node has its own field values. */
(function (global) {
  "use strict";

  function f(label, value, flag) {
    var row = { label: label, value: value == null || value === "" ? "—" : String(value) };
    if (flag) row.flag = flag;
    return row;
  }

  /* Subset of appendable business fields used in graph drawer + table expand. */
  function businessFields(p) {
    return [
      f("BusinessName", p.BusinessName),
      f("TradestyleName", p.TradestyleName),
      f("BusinessRegistrationNumber", p.BusinessRegistrationNumber),
      f("DUNSNumber", p.DUNSNumber),
      f("TaxIDNumber", p.TaxIDNumber),
      f("BusinessStatus", p.BusinessStatus || "Active"),
      f("JurisdictionOfIncorporation", p.JurisdictionOfIncorporation),
      f("YearOfIncorporation", p.YearOfIncorporation),
      f("MonthOfIncorporation", p.MonthOfIncorporation),
      f("DayOfIncorporation", p.DayOfIncorporation),
      f("BusinessLegalForm", p.BusinessLegalForm),
      f("OriginalBusinessLegalForm", p.OriginalBusinessLegalForm),
      f("Address1", p.Address1),
      f("City", p.City),
      f("StateProvince", p.StateProvince),
      f("PostalCode", p.PostalCode),
      f("Country", p.Country, p.CountryFlag),
      f("WatchlistState", p.WatchlistState || "Clear")
    ];
  }

  /* Ownership & UBOs person fields used in graph drawer + table expand. */
  function personFields(p) {
    return [
      f("UniqueID", p.UniqueID),
      f("VendorID", p.VendorID),
      f("DUNSNumber", p.DUNSNumber),
      f("NationalIDNumber", p.NationalIDNumber),
      f("FullName", p.FullName),
      f("GivenName", p.GivenName),
      f("Surname", p.Surname),
      f("BeneficiaryType", p.BeneficiaryType),
      f("BusinessEntityType", p.BusinessEntityType || "person"),
      f("FullAddress", p.FullAddress),
      f("City", p.City),
      f("StateProvinceCode", p.StateProvinceCode),
      f("PostalCode", p.PostalCode),
      f("CountryCode", p.CountryCode),
      f("Nationality", p.Nationality),
      f("DateOfBirth", p.DateOfBirth),
      f("ResidenceCountry", p.ResidenceCountry),
      f("LegalAuthority", p.LegalAuthority),
      f("LegalForm", p.LegalForm),
      f("IsOutOfBusiness", p.IsOutOfBusiness || "FALSE"),
      f("ControlOwnershipType", p.ControlOwnershipType),
      f("ControlOwnershipConfidenceLevel", p.ControlOwnershipConfidenceLevel),
      f("DegreeOfSeparation", p.DegreeOfSeparation),
      f("Shares", p.Shares),
      f("DirectOwnershipPercentage", p.DirectOwnershipPercentage),
      f("IndirectOwnershipPercentage", p.IndirectOwnershipPercentage),
      f("BeneficialOwnershipPercentage", p.BeneficialOwnershipPercentage),
      f("InferredDirectOwnershipPercentage", p.InferredDirectOwnershipPercentage),
      f("InferredIndirectOwnershipPercentage", p.InferredIndirectOwnershipPercentage),
      f("InferredBeneficialOwnershipPercentage", p.InferredBeneficialOwnershipPercentage),
      f("OwnershipNotes", p.OwnershipNotes),
      f("OwnershipUnavailableReasons", p.OwnershipUnavailableReasons)
    ];
  }

  var ENTITY = {
    root: {
      type: "business",
      name: "Meridian Capital LLC",
      subtitle: "Root business · New York, US",
      address: "200 Vesey Street, New York, NY 10281",
      fields: businessFields({
        BusinessName: "Meridian Capital LLC",
        TradestyleName: "Meridian Capital",
        BusinessRegistrationNumber: "NY DOS 4417762",
        DUNSNumber: "084421903",
        TaxIDNumber: "13-4417762",
        BusinessStatus: "Active",
        JurisdictionOfIncorporation: "NY",
        YearOfIncorporation: "2013",
        MonthOfIncorporation: "06",
        DayOfIncorporation: "14",
        BusinessLegalForm: "LLC",
        OriginalBusinessLegalForm: "Limited liability company",
        Address1: "200 Vesey Street",
        City: "New York",
        StateProvince: "NY",
        PostalCode: "10281",
        Country: "United States",
        CountryFlag: "US",
        WatchlistState: "Clear"
      })
    },
    northwind: {
      type: "business",
      name: "Northwind Advisory Group LLC",
      subtitle: "Owns 32%",
      pct: "32%",
      address: "88 Pine Street, New York, NY 10005",
      fields: businessFields({
        BusinessName: "Northwind Advisory Group LLC",
        TradestyleName: "Northwind Advisory",
        BusinessRegistrationNumber: "DE 6842193",
        DUNSNumber: "119304882",
        TaxIDNumber: "82-1940381",
        BusinessStatus: "Active",
        JurisdictionOfIncorporation: "DE",
        YearOfIncorporation: "2018",
        MonthOfIncorporation: "03",
        DayOfIncorporation: "09",
        BusinessLegalForm: "LLC",
        OriginalBusinessLegalForm: "Limited liability company",
        Address1: "88 Pine Street",
        City: "New York",
        StateProvince: "NY",
        PostalCode: "10005",
        Country: "United States",
        CountryFlag: "US",
        WatchlistState: "Clear"
      })
    },
    cedar: {
      type: "business",
      name: "Cedar Ridge Partners Inc.",
      subtitle: "Owns 41%",
      pct: "41%",
      address: "1 Financial Plaza, Hartford, CT 06103",
      fields: businessFields({
        BusinessName: "Cedar Ridge Partners Inc.",
        TradestyleName: "Cedar Ridge Partners",
        BusinessRegistrationNumber: "CT 00128477",
        DUNSNumber: "072918445",
        TaxIDNumber: "06-2284911",
        BusinessStatus: "Active",
        JurisdictionOfIncorporation: "CT",
        YearOfIncorporation: "2011",
        MonthOfIncorporation: "11",
        DayOfIncorporation: "02",
        BusinessLegalForm: "INC",
        OriginalBusinessLegalForm: "Corporation",
        Address1: "1 Financial Plaza",
        City: "Hartford",
        StateProvince: "CT",
        PostalCode: "06103",
        Country: "United States",
        CountryFlag: "US",
        WatchlistState: "Clear"
      })
    },
    harborline: {
      type: "business",
      name: "Harborline Media Holdings LLC",
      subtitle: "Owns 27%",
      pct: "27%",
      address: "455 Market Street, San Francisco, CA 94105",
      fields: businessFields({
        BusinessName: "Harborline Media Holdings LLC",
        TradestyleName: "Harborline Media",
        BusinessRegistrationNumber: "CA 2019344812",
        DUNSNumber: "145882019",
        TaxIDNumber: "94-3382017",
        BusinessStatus: "Active",
        JurisdictionOfIncorporation: "CA",
        YearOfIncorporation: "2019",
        MonthOfIncorporation: "08",
        DayOfIncorporation: "21",
        BusinessLegalForm: "LLC",
        OriginalBusinessLegalForm: "Limited liability company",
        Address1: "455 Market Street",
        City: "San Francisco",
        StateProvince: "CA",
        PostalCode: "94105",
        Country: "United States",
        CountryFlag: "US",
        WatchlistState: "Clear"
      })
    },
    elena: {
      type: "person",
      name: "Elena Vasquez",
      subtitle: "Owns 50%",
      pct: "50%",
      address: "14 Mercer Street, New York, NY 10013",
      fields: personFields({
        UniqueID: "11",
        VendorID: "nwElenaVasquez01",
        DUNSNumber: "119304882",
        NationalIDNumber: "48122918440122",
        FullName: "ELENA VASQUEZ",
        GivenName: "ELENA",
        Surname: "VASQUEZ",
        BeneficiaryType: "Membership Interest",
        BusinessEntityType: "person",
        FullAddress: "14 Mercer Street, New York, NY 10013",
        City: "New York",
        StateProvinceCode: "NY",
        PostalCode: "10013",
        CountryCode: "US",
        Nationality: "American",
        DateOfBirth: "1984-05-17",
        ResidenceCountry: "US",
        LegalAuthority: "Delaware Division of Corporations",
        LegalForm: "LLC",
        IsOutOfBusiness: "FALSE",
        ControlOwnershipType: "Direct",
        ControlOwnershipConfidenceLevel: "High",
        DegreeOfSeparation: "2",
        Shares: "5000.0",
        DirectOwnershipPercentage: "50.0",
        IndirectOwnershipPercentage: "0.0",
        BeneficialOwnershipPercentage: "16.0",
        InferredDirectOwnershipPercentage: "—",
        InferredIndirectOwnershipPercentage: "—",
        InferredBeneficialOwnershipPercentage: "—",
        OwnershipNotes: "Managing member of Northwind Advisory Group LLC",
        OwnershipUnavailableReasons: "—"
      })
    },
    marcus: {
      type: "person",
      name: "Marcus Chen",
      subtitle: "Owns 50%",
      pct: "50%",
      address: "620 Atlantic Avenue, Brooklyn, NY 11217",
      fields: personFields({
        UniqueID: "12",
        VendorID: "nwMarcusChen02",
        DUNSNumber: "119304882",
        NationalIDNumber: "90334881220991",
        FullName: "MARCUS CHEN",
        GivenName: "MARCUS",
        Surname: "CHEN",
        BeneficiaryType: "Membership Interest",
        BusinessEntityType: "person",
        FullAddress: "620 Atlantic Avenue, Brooklyn, NY 11217",
        City: "Brooklyn",
        StateProvinceCode: "NY",
        PostalCode: "11217",
        CountryCode: "US",
        Nationality: "American",
        DateOfBirth: "1979-11-03",
        ResidenceCountry: "US",
        LegalAuthority: "Delaware Division of Corporations",
        LegalForm: "LLC",
        IsOutOfBusiness: "FALSE",
        ControlOwnershipType: "Direct",
        ControlOwnershipConfidenceLevel: "High",
        DegreeOfSeparation: "2",
        Shares: "5000.0",
        DirectOwnershipPercentage: "50.0",
        IndirectOwnershipPercentage: "0.0",
        BeneficialOwnershipPercentage: "16.0",
        InferredDirectOwnershipPercentage: "—",
        InferredIndirectOwnershipPercentage: "—",
        InferredBeneficialOwnershipPercentage: "—",
        OwnershipNotes: "CFO of Northwind Advisory Group LLC",
        OwnershipUnavailableReasons: "—"
      })
    },
    priya: {
      type: "person",
      name: "Amira Solis",
      subtitle: "UBO · Owns 100%",
      pct: "100%",
      risk: "high",
      address: "9 Asylum Street, Hartford, CT 06103",
      fields: personFields({
        UniqueID: "21",
        VendorID: "crAmiraSolis01",
        DUNSNumber: "072918445",
        NationalIDNumber: "22718441990301",
        FullName: "AMIRA SOLIS",
        GivenName: "AMIRA",
        Surname: "SOLIS",
        BeneficiaryType: "Common Stock",
        BusinessEntityType: "person",
        FullAddress: "9 Asylum Street, Hartford, CT 06103",
        City: "Hartford",
        StateProvinceCode: "CT",
        PostalCode: "06103",
        CountryCode: "US",
        Nationality: "American",
        DateOfBirth: "1972-02-28",
        ResidenceCountry: "US",
        LegalAuthority: "Connecticut Secretary of the State",
        LegalForm: "INC",
        IsOutOfBusiness: "FALSE",
        ControlOwnershipType: "Direct",
        ControlOwnershipConfidenceLevel: "High",
        DegreeOfSeparation: "2",
        Shares: "10000.0",
        DirectOwnershipPercentage: "100.0",
        IndirectOwnershipPercentage: "0.0",
        BeneficialOwnershipPercentage: "41.0",
        InferredDirectOwnershipPercentage: "—",
        InferredIndirectOwnershipPercentage: "—",
        InferredBeneficialOwnershipPercentage: "—",
        OwnershipNotes: "Owns 100% of voting rights; has right to appoint and remove directors",
        OwnershipUnavailableReasons: "—"
      })
    },
    owen: {
      type: "person",
      name: "Owen Blake",
      subtitle: "Owns 50%",
      pct: "50%",
      address: "2100 Pacific Avenue, San Francisco, CA 94115",
      fields: personFields({
        UniqueID: "31",
        VendorID: "hlOwenBlake01",
        DUNSNumber: "145882019",
        NationalIDNumber: "66109238841220",
        FullName: "OWEN BLAKE",
        GivenName: "OWEN",
        Surname: "BLAKE",
        BeneficiaryType: "Membership Interest",
        BusinessEntityType: "person",
        FullAddress: "2100 Pacific Avenue, San Francisco, CA 94115",
        City: "San Francisco",
        StateProvinceCode: "CA",
        PostalCode: "94115",
        CountryCode: "US",
        Nationality: "American",
        DateOfBirth: "1988-09-12",
        ResidenceCountry: "US",
        LegalAuthority: "California Secretary of State",
        LegalForm: "LLC",
        IsOutOfBusiness: "FALSE",
        ControlOwnershipType: "Direct",
        ControlOwnershipConfidenceLevel: "Medium",
        DegreeOfSeparation: "2",
        Shares: "2700.0",
        DirectOwnershipPercentage: "50.0",
        IndirectOwnershipPercentage: "0.0",
        BeneficialOwnershipPercentage: "13.5",
        InferredDirectOwnershipPercentage: "—",
        InferredIndirectOwnershipPercentage: "—",
        InferredBeneficialOwnershipPercentage: "—",
        OwnershipNotes: "COO of Harborline Media Holdings LLC",
        OwnershipUnavailableReasons: "—"
      })
    },
    sofia: {
      type: "person",
      name: "Sofia Rahman",
      subtitle: "Owns 50%",
      pct: "50%",
      address: "88 King Street, San Francisco, CA 94107",
      fields: personFields({
        UniqueID: "32",
        VendorID: "hlSofiaRahman02",
        DUNSNumber: "145882019",
        NationalIDNumber: "44987105561844",
        FullName: "SOFIA RAHMAN",
        GivenName: "SOFIA",
        Surname: "RAHMAN",
        BeneficiaryType: "Membership Interest",
        BusinessEntityType: "person",
        FullAddress: "88 King Street, San Francisco, CA 94107",
        City: "San Francisco",
        StateProvinceCode: "CA",
        PostalCode: "94107",
        CountryCode: "US",
        Nationality: "Canadian",
        DateOfBirth: "1990-12-01",
        ResidenceCountry: "US",
        LegalAuthority: "California Secretary of State",
        LegalForm: "LLC",
        IsOutOfBusiness: "FALSE",
        ControlOwnershipType: "Direct",
        ControlOwnershipConfidenceLevel: "Medium",
        DegreeOfSeparation: "2",
        Shares: "2700.0",
        DirectOwnershipPercentage: "50.0",
        IndirectOwnershipPercentage: "0.0",
        BeneficialOwnershipPercentage: "13.5",
        InferredDirectOwnershipPercentage: "—",
        InferredIndirectOwnershipPercentage: "—",
        InferredBeneficialOwnershipPercentage: "—",
        OwnershipNotes: "Director of Harborline Media Holdings LLC",
        OwnershipUnavailableReasons: "—"
      })
    }
  };

  function nodeFrom(id, extras) {
    var src = ENTITY[id];
    var node = Object.assign(
      {
        id: id,
        type: src.type,
        name: src.name,
        subtitle: src.subtitle,
        details: {
          status: "Active",
          statusTone: "positive",
          fields: src.fields.slice()
        }
      },
      extras || {}
    );
    if (src.risk) node.risk = src.risk;
    return node;
  }

  function connected(id, role) {
    var src = ENTITY[id];
    return {
      id: id,
      type: src.type,
      role: role,
      name: src.name,
      pct: src.pct,
      address: src.address
    };
  }

  var MVP_OWNERSHIP_GRAPH = {
    riskFilter: null,
    tree: (function () {
      var root = nodeFrom("root");
      root.details.connected = [
        connected("northwind", "Shareholder"),
        connected("cedar", "Shareholder"),
        connected("harborline", "Shareholder")
      ];
      var northwind = nodeFrom("northwind");
      northwind.details.connected = [
        connected("elena", "Shareholder"),
        connected("marcus", "Shareholder")
      ];
      northwind.children = [nodeFrom("elena"), nodeFrom("marcus")];
      var cedar = nodeFrom("cedar");
      cedar.details.connected = [connected("priya", "UBO")];
      cedar.children = [nodeFrom("priya")];
      var harborline = nodeFrom("harborline");
      harborline.details.connected = [
        connected("owen", "Shareholder"),
        connected("sofia", "Shareholder")
      ];
      harborline.children = [nodeFrom("owen"), nodeFrom("sofia")];
      root.children = [northwind, cedar, harborline];
      return root;
    })()
  };

  var MVP_OWNERSHIP_ROWS = [
    {
      id: "northwind",
      type: "business",
      name: ENTITY.northwind.name,
      sub: "Corporate shareholder",
      pct: "32%",
      indirectPct: "—",
      degree: "1",
      address: ENTITY.northwind.address,
      fields: ENTITY.northwind.fields
    },
    {
      id: "cedar",
      type: "business",
      name: ENTITY.cedar.name,
      sub: "Corporate shareholder",
      pct: "41%",
      indirectPct: "—",
      degree: "1",
      address: ENTITY.cedar.address,
      fields: ENTITY.cedar.fields
    },
    {
      id: "harborline",
      type: "business",
      name: ENTITY.harborline.name,
      sub: "Corporate shareholder",
      pct: "27%",
      indirectPct: "—",
      degree: "1",
      address: ENTITY.harborline.address,
      fields: ENTITY.harborline.fields
    },
    {
      id: "priya",
      type: "person",
      name: ENTITY.priya.name,
      sub: "UBO",
      pct: "100% of Cedar Ridge",
      indirectPct: "41%",
      degree: "2",
      address: ENTITY.priya.address,
      status: "negative",
      statusLabel: "Ultimate beneficial owner",
      flagged: true,
      fields: ENTITY.priya.fields
    },
    {
      id: "elena",
      type: "person",
      name: ENTITY.elena.name,
      sub: "Shareholder",
      pct: "50% of Northwind",
      indirectPct: "16%",
      degree: "2",
      address: ENTITY.elena.address,
      fields: ENTITY.elena.fields
    },
    {
      id: "marcus",
      type: "person",
      name: ENTITY.marcus.name,
      sub: "Shareholder",
      pct: "50% of Northwind",
      indirectPct: "16%",
      degree: "2",
      address: ENTITY.marcus.address,
      fields: ENTITY.marcus.fields
    },
    {
      id: "owen",
      type: "person",
      name: ENTITY.owen.name,
      sub: "Shareholder",
      pct: "50% of Harborline",
      indirectPct: "13.5%",
      degree: "2",
      address: ENTITY.owen.address,
      fields: ENTITY.owen.fields
    },
    {
      id: "sofia",
      type: "person",
      name: ENTITY.sofia.name,
      sub: "Shareholder",
      pct: "50% of Harborline",
      indirectPct: "13.5%",
      degree: "2",
      address: ENTITY.sofia.address,
      fields: ENTITY.sofia.fields
    }
  ];

  var INDIRECT_INFO =
    "Share held through one or more intermediate entities rather than directly";
  var INDIRECT_INFO_ICON =
    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25"/>' +
    '<path d="M8 7.25v3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><circle cx="8" cy="5.25" r=".6" fill="currentColor"/></svg>';

  function stripFindings(node) {
    if (!node) return;
    if (node.details) {
      delete node.details.findings;
      delete node.details.prompt;
      delete node.details.truai;
    }
    (node.children || []).forEach(stripFindings);
    (node.moreHidden || []).forEach(stripFindings);
  }

  /* withStandardDetails overwrites fields — restore business / director-officer catalogs. */
  function restoreFields(node) {
    if (!node) return;
    var src = ENTITY[node.id];
    if (src && src.fields) {
      if (!node.details) node.details = { status: "Active", statusTone: "positive" };
      node.details.fields = src.fields.slice();
      if (!node.details.status) node.details.status = "Active";
      if (!node.details.statusTone) node.details.statusTone = "positive";
    }
    (node.children || []).forEach(restoreFields);
    (node.moreHidden || []).forEach(restoreFields);
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function detailItem(label, value) {
    return (
      '<div class="d3-kyb-officer__item"><dt>' +
      esc(label) +
      "</dt><dd>" +
      esc(value || "—") +
      "</dd></div>"
    );
  }

  function injectIndirectOwnershipColumn(panel) {
    var table = panel.querySelector(".d3-kyb-ownership__table table");
    if (!table || table.dataset.krIndirectCol === "1") return;
    table.dataset.krIndirectCol = "1";

    var headRow = table.querySelector("thead tr");
    if (headRow) {
      var ths = headRow.querySelectorAll("th");
      var directTh = ths[3];
      if (directTh && !headRow.querySelector("[data-kr-indirect-th]")) {
        var th = document.createElement("th");
        th.setAttribute("aria-sort", "none");
        th.setAttribute("data-kr-indirect-th", "1");
        th.innerHTML =
          'Indirect Ownership % <span class="d3-kyb-ownership__info" title="' +
          esc(INDIRECT_INFO) +
          '" aria-label="' +
          esc(INDIRECT_INFO) +
          '">' +
          INDIRECT_INFO_ICON +
          "</span>";
        directTh.insertAdjacentElement("afterend", th);
      }
    }

    var byName = {};
    byName[ENTITY.root.name] = { indirectPct: "—", degree: "0" };
    MVP_OWNERSHIP_ROWS.forEach(function (row) {
      byName[row.name] = row;
    });

    table.querySelectorAll("tr.d3-kyb-officer__main").forEach(function (tr) {
      if (tr.querySelector("[data-kr-indirect-td]")) return;
      var nameEl = tr.querySelector(".tds-data-table__cell-text-stack span");
      var name = nameEl ? nameEl.textContent.trim() : "";
      var meta = byName[name] || {};
      var chev = tr.querySelector(".d3-kyb-officer__chev");
      var td = document.createElement("td");
      td.className = "tds-data-table__text-cell";
      td.setAttribute("data-kr-indirect-td", "1");
      td.textContent = meta.indirectPct != null ? String(meta.indirectPct) : "—";
      if (chev) chev.insertAdjacentElement("beforebegin", td);
      else tr.appendChild(td);

      if (meta.degree != null) {
        var cells = tr.querySelectorAll("td");
        if (cells[2] && !cells[2].hasAttribute("data-kr-indirect-td")) {
          cells[2].textContent = String(meta.degree);
        }
      }
    });

    table.querySelectorAll("tr.d3-kyb-officer__detail > td").forEach(function (td) {
      td.setAttribute("colspan", "6");
    });
  }

  /* Replace expanded table-row details with the same field catalogs as the graph. */
  function enrichOwnershipTable(panel) {
    if (!panel) return;
    injectIndirectOwnershipColumn(panel);
    var byName = {};
    Object.keys(ENTITY).forEach(function (id) {
      byName[ENTITY[id].name] = ENTITY[id];
    });
    panel.querySelectorAll(".d3-kyb-ownership__table tr.d3-kyb-officer__main").forEach(function (tr) {
      var nameEl = tr.querySelector(".tds-data-table__cell-text-stack span");
      var name = nameEl ? nameEl.textContent.trim() : "";
      var src = byName[name];
      if (!src || !src.fields || !src.fields.length) return;
      var toggle = tr.getAttribute("data-d3-officer-toggle");
      if (toggle == null) return;
      var detail = panel.querySelector(
        '.d3-kyb-ownership__table tr[data-d3-officer-detail="' + toggle + '"]'
      );
      if (!detail) return;
      var fields = src.fields;
      var half = Math.ceil(fields.length / 2);
      function list(items) {
        return (
          '<dl class="d3-kyb-officer__list">' +
          items
            .map(function (item) {
              return detailItem(item.label, item.value);
            })
            .join("") +
          "</dl>"
        );
      }
      var cell = detail.querySelector("td");
      if (cell) {
        cell.setAttribute("colspan", "6");
        cell.innerHTML =
          '<div class="d3-kyb-officer__cols">' +
          list(fields.slice(0, half)) +
          list(fields.slice(half)) +
          "</div>";
      }
    });
  }

  function applyToBiz(biz) {
    if (!biz) return biz;
    var out = Object.assign({}, biz);
    out.ownershipGraph = JSON.parse(JSON.stringify(MVP_OWNERSHIP_GRAPH));
    out.ownershipGraph.tree.name = biz.name || out.ownershipGraph.tree.name;
    if (ENTITY.root) {
      ENTITY.root.name = out.ownershipGraph.tree.name;
      out.ownershipGraph.tree.details.fields = businessFields({
        BusinessName: out.ownershipGraph.tree.name,
        TradestyleName: "Meridian Capital",
        BusinessRegistrationNumber: "NY DOS 4417762",
        DUNSNumber: "084421903",
        TaxIDNumber: "13-4417762",
        BusinessStatus: "Active",
        JurisdictionOfIncorporation: "NY",
        YearOfIncorporation: "2013",
        MonthOfIncorporation: "06",
        DayOfIncorporation: "14",
        BusinessLegalForm: "LLC",
        OriginalBusinessLegalForm: "Limited liability company",
        Address1: "200 Vesey Street",
        City: "New York",
        StateProvince: "NY",
        PostalCode: "10281",
        Country: "United States",
        CountryFlag: "US",
        WatchlistState: "Clear"
      });
    }
    stripFindings(out.ownershipGraph.tree);
    out.ownership = MVP_OWNERSHIP_ROWS.map(function (row) {
      return Object.assign({}, row, { fields: row.fields.slice() });
    });
    out.ownershipUserProvided = true;
    return out;
  }

  function remountGraph(panel, biz) {
    if (!panel || !biz || !global.D3KybUboGraph || !global.KybUboGraph) return false;
    var graph = global.D3KybUboGraph.graphFromBiz(biz);
    if (!graph || !graph.tree) return false;
    restoreFields(graph.tree);
    var container = panel.querySelector("[data-kyb-ownership-graph]");
    if (!container || !global.KybUboGraph.mount) return false;
    if (global.KybUboGraph.unmount) global.KybUboGraph.unmount(container);
    global.KybUboGraph.mount(container, {
      tree: graph.tree,
      riskFilter: graph.riskFilter
    });
    return true;
  }

  global.KybReportMvpOwnership = {
    graph: MVP_OWNERSHIP_GRAPH,
    rows: MVP_OWNERSHIP_ROWS,
    entity: ENTITY,
    applyToBiz: applyToBiz,
    restoreFields: restoreFields,
    enrichOwnershipTable: enrichOwnershipTable,
    remountGraph: remountGraph
  };
})(typeof window !== "undefined" ? window : globalThis);
