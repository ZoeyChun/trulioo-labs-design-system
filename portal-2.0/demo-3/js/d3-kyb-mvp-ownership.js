/* Demo 3 — Owners & UBOs tab (ported from the standalone KYB Report module's MVP lane).
   Same network and rules: 1 root → 3 corps → people, table first, UBO tag only for a person with indirect ownership > 25%.
   Drawer + table: business fields on corps; Ownership & UBOs person fields on people.
   UBO rule: person with indirect ownership of the root > 25% is a UBO (graph + table). */
(function (global) {
  "use strict";

  var UBO_INDIRECT_THRESHOLD = 25;

  function parseOwnershipPct(value) {
    if (value == null || value === "" || value === "—") return 0;
    var n = parseFloat(String(value).replace(/[^\d.]/g, ""));
    return isNaN(n) ? 0 : n;
  }

  function isUboByIndirect(pct) {
    return parseOwnershipPct(pct) > UBO_INDIRECT_THRESHOLD;
  }

  /* CamelCase / PascalCase → spaced words (BusinessLegalForm → Business Legal Form). */
  function humanLabel(label) {
    return String(label || "")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/_/g, " ")
      /* Ownership labels use the symbol: "Direct Ownership %", not "Direct Ownership Percentage". */
      .replace(/\bPercentage\b/g, "%")
      .trim();
  }

  function f(label, value, flag) {
    var row = {
      label: humanLabel(label),
      value: value == null || value === "" ? "—" : String(value)
    };
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
      /* Direct / Indirect Ownership % come from the network (table columns, graph drawer), not from this catalog. */
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
      indirectOfRoot: "16%",
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
      indirectOfRoot: "16%",
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
      subtitle: "Owns 100%",
      pct: "100%",
      indirectOfRoot: "41%",
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
      indirectOfRoot: "13.5%",
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
      indirectOfRoot: "13.5%",
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

  /* Where this node sits in the network, shown first in the graph drawer (the table shows it as columns). */
  var OWN_DIRECT = {
    root: "-",
    northwind: "32%",
    cedar: "41%",
    harborline: "27%",
    priya: "100% of Cedar Ridge",
    elena: "50% of Northwind",
    marcus: "50% of Northwind",
    owen: "50% of Harborline",
    sofia: "50% of Harborline"
  };

  function ownershipFields(id) {
    var src = ENTITY[id] || {};
    var degree = id === "root" ? "0" : src.type === "person" ? "2" : "1";
    return [
      f("DegreeOfSeparation", degree),
      f("Direct Ownership %", OWN_DIRECT[id] || "—"),
      f("Indirect Ownership %", src.type === "person" && src.indirectOfRoot ? src.indirectOfRoot : "—")
    ];
  }

  /* The network rows first, then the catalog without the labels they already cover. */
  function withOwnership(id, catalog) {
    var top = ownershipFields(id);
    var seen = {};
    top.forEach(function (row) { seen[row.label] = true; });
    return top.concat((catalog || []).filter(function (row) { return !seen[humanLabel(row.label)]; }));
  }

  function isPersonUbo(src) {
    return !!(src && src.type === "person" && isUboByIndirect(src.indirectOfRoot));
  }

  function personGraphSubtitle(src) {
    var owns = src.subtitle || (src.pct ? "Owns " + src.pct : "Shareholder");
    /* UBO is shown via tag; keep subtitle as plain “Owns …”. */
    return String(owns).replace(/^UBO\s*[-·]\s*/i, "");
  }

  function personTableRole(src) {
    return isPersonUbo(src) ? "UBO" : "Shareholder";
  }

  function nodeFrom(id, extras) {
    var src = ENTITY[id];
    var node = Object.assign(
      {
        id: id,
        type: src.type,
        name: src.name,
        subtitle: src.type === "person" ? personGraphSubtitle(src) : src.subtitle,
        details: {
          status: "Active",
          statusTone: "positive",
          fields: withOwnership(id, src.fields)
        }
      },
      extras || {}
    );
    if (src.risk) node.risk = src.risk;
    /* role drives UBO tag/icon in the graph (subtitle stays “Owns …”). */
    if (src.type === "person" && isPersonUbo(src)) node.role = "UBO";
    return node;
  }

  function connected(id, role) {
    var src = ENTITY[id];
    var resolvedRole =
      role ||
      (src.type === "person" ? personTableRole(src) : "Shareholder");
    return {
      id: id,
      type: src.type,
      role: resolvedRole,
      name: src.name,
      pct: src.pct,
      address: src.address
    };
  }

  function personTableRow(id, pctLabel) {
    var src = ENTITY[id];
    var ubo = isPersonUbo(src);
    var row = {
      id: id,
      type: "person",
      name: src.name,
      sub: personTableRole(src),
      pct: pctLabel,
      indirectPct: src.indirectOfRoot || "—",
      degree: "2",
      address: src.address,
      fields: src.fields
    };
    if (ubo) {
      row.status = "negative";
      row.statusLabel = "Ultimate beneficial owner";
      row.flagged = true;
    }
    return row;
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
      northwind.details.connected = [connected("elena"), connected("marcus")];
      northwind.children = [nodeFrom("elena"), nodeFrom("marcus")];
      var cedar = nodeFrom("cedar");
      cedar.details.connected = [connected("priya")];
      cedar.children = [nodeFrom("priya")];
      var harborline = nodeFrom("harborline");
      harborline.details.connected = [connected("owen"), connected("sofia")];
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
    personTableRow("priya", "100% of Cedar Ridge"),
    personTableRow("elena", "50% of Northwind"),
    personTableRow("marcus", "50% of Northwind"),
    personTableRow("owen", "50% of Harborline"),
    personTableRow("sofia", "50% of Harborline")
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
      node.details.fields = withOwnership(node.id, src.fields).map(function (item) {
        return Object.assign({}, item, { label: humanLabel(item.label) });
      });
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
      esc(humanLabel(label)) +
      "</dt><dd>" +
      esc(value || "—") +
      "</dd></div>"
    );
  }

  /* Match Business Details / Additional Data: label above value in a 3-col grid. */
  function fieldCardHtml(label, value) {
    return (
      '<div class="tds-data-field">' +
      '<p class="tds-data-field__label">' +
      esc(humanLabel(label)) +
      "</p>" +
      '<div class="tds-data-field__content"><div class="tds-data-field__value-row">' +
      '<p class="tds-data-field__value">' +
      esc(value == null || value === "" ? "—" : value) +
      "</p></div></div></div>"
    );
  }

  function fieldsGridHtml(fields) {
    return (
      '<div class="d3-kyb-officer__cols kyb-field-grid kyb-field-grid--3">' +
      (fields || [])
        .map(function (item) {
          return fieldCardHtml(item.label, item.value);
        })
        .join("") +
      "</div>"
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
  /* More than 5 owners: the rest wait behind a Show more button, so Directors, Officers & PSCs stays above the fold. */
  var OWNER_ROWS_SHOWN = 5;

  function limitOwnershipRows(panel) {
    var box = panel.querySelector(".d3-kyb-ownership__table");
    if (!box) return;
    var view = box.parentElement;
    var mains = box.querySelectorAll("tr.d3-kyb-officer__main");
    var more = view.querySelector("[data-d3-own-more]");
    if (mains.length <= OWNER_ROWS_SHOWN) {
      if (more) more.remove();
      return;
    }
    var open = !!(more && more.getAttribute("aria-expanded") === "true");
    Array.prototype.forEach.call(mains, function (tr, i) {
      var hide = i >= OWNER_ROWS_SHOWN && !open;
      tr.classList.toggle("is-overflow", hide);
      var key = tr.getAttribute("data-d3-officer-toggle");
      var detail = key == null ? null : box.querySelector('tr[data-d3-officer-detail="' + key + '"]');
      if (detail) detail.classList.toggle("is-overflow", hide);
    });
    var rest = mains.length - OWNER_ROWS_SHOWN;
    if (!more) {
      more = document.createElement("button");
      more.type = "button";
      more.className = "tds-btn tds-btn--sm tds-btn--secondary d3-kyb-ownership__more";
      more.setAttribute("data-d3-own-more", "");
      more.setAttribute("aria-expanded", "false");
      more.addEventListener("click", function () {
        var on = more.getAttribute("aria-expanded") !== "true";
        more.setAttribute("aria-expanded", on ? "true" : "false");
        limitOwnershipRows(panel);
      });
      box.insertAdjacentElement("afterend", more);
    }
    more.textContent = open ? "Show less" : "Show " + rest + " more";
  }

  function enrichOwnershipTable(panel) {
    if (!panel) return;
    injectIndirectOwnershipColumn(panel);
    limitOwnershipRows(panel);
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
      var cell = detail.querySelector("td");
      if (cell) {
        cell.setAttribute("colspan", "6");
        cell.innerHTML = fieldsGridHtml(src.fields);
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
      var r = biz.report || {};
      var addr = String(r.address || biz.addr || "");
      var parts = addr.split(",").map(function (s) { return s.trim(); });
      var stZip = (parts[2] || "").split(/\s+/);
      out.ownershipGraph.tree.details.fields = businessFields({
        BusinessName: out.ownershipGraph.tree.name,
        TradestyleName: out.ownershipGraph.tree.name.replace(/\s+(LLC|Inc\.?|Ltd\.?|Corp\.?|AB|Pty Ltd\.?)$/i, ""),
        BusinessRegistrationNumber: r.regNumber || biz.reg || "",
        DUNSNumber: "084421903",
        TaxIDNumber: String(r.taxId || "").replace(/^EIN\s*/i, ""),
        BusinessStatus: biz.status || "Active",
        JurisdictionOfIncorporation: stZip[0] || "",
        YearOfIncorporation: (String(r.regDate || "").match(/\b(19|20)\d{2}\b/) || [""])[0],
        BusinessLegalForm: r.legalForm || "",
        Address1: parts[0] || addr,
        City: parts[1] || "",
        StateProvince: stZip[0] || "",
        PostalCode: stZip[1] || "",
        Country: biz.country || r.country || "United States",
        CountryFlag: String(biz.cc || "US").toUpperCase(),
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

  /* ---- painting: table first, graph expanded, fields in the table rows (from the module's mount.js) ---- */
  function fitUboGraph(panel) {
    var graphPane = panel.querySelector('[data-d3-kyb-own-panel="graph"]');
    /* Never fit while the graph pane is hidden: that blanked the canvas. */
    if (!graphPane || graphPane.hidden) return;
    var btn = panel.querySelector('.kyb-ubo-graph__zoom-btn[aria-label="Reset view"]');
    if (btn) btn.click();
  }

  function expandUboBranches(panel) {
    function clickMore() {
      var btns = panel.querySelectorAll("[data-kyb-ubo-more]");
      btns.forEach(function (btn) { btn.click(); });
      return btns.length;
    }
    window.requestAnimationFrame(function () {
      window.setTimeout(function () {
        clickMore();
        window.setTimeout(function () {
          clickMore();
          fitUboGraph(panel);
        }, 200);
      }, 160);
    });
  }

  function scheduleGraph(panel, biz) {
    /* Wait past the graph mount and the panel un-hide so the stage has a real size. */
    window.requestAnimationFrame(function () {
      window.setTimeout(function () {
        remountGraph(panel, biz);
        expandUboBranches(panel);
      }, 120);
    });
  }

  function paint(panel, biz) {
    var control = panel.querySelector("[data-d3-kyb-own-view-control]");
    /* Table control first (left), then graph. */
    if (control) {
      var tableBtn = control.querySelector('[data-d3-kyb-own-view="table"]');
      var graphBtn = control.querySelector('[data-d3-kyb-own-view="graph"]');
      if (tableBtn && graphBtn && control.firstElementChild !== tableBtn) {
        control.insertBefore(tableBtn, control.firstElementChild);
      }
    }
    if (global.D3KybUboGraph && global.D3KybUboGraph.setView) global.D3KybUboGraph.setView(panel, "table");
    if (control && !control.dataset.d3MvpBound) {
      control.dataset.d3MvpBound = "1";
      control.addEventListener("click", function (e) {
        if (e.target.closest('[data-d3-kyb-own-view="graph"]')) scheduleGraph(panel, biz);
      });
    }
    scheduleGraph(panel, biz);
    enrichOwnershipTable(panel);
  }

  global.D3KybMvpOwnership = {
    graph: MVP_OWNERSHIP_GRAPH,
    rows: MVP_OWNERSHIP_ROWS,
    entity: ENTITY,
    applyToBiz: applyToBiz,
    restoreFields: restoreFields,
    enrichOwnershipTable: enrichOwnershipTable,
    remountGraph: remountGraph,
    paint: paint
  };
})(typeof window !== "undefined" ? window : globalThis);
