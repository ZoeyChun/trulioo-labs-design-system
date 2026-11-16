/* Named report versions — use labels, not v1/v2/v3.

   Mount:
     KybReportModule.mount(host, { version: "default" });
     KybReportModule.mount(host, { version: "mvp-brh" });
     KybReportModule.mount(host, { version: "mvp-no-brh" });

   "mvp" resolves to "mvp-brh" for backwards compatibility.
   Add a new name by copying an entry and editing tabs / features. */
(function (global) {
  "use strict";

  var ALL_TABS = [
    { id: "findings", label: "Overview" },
    { id: "risk", label: "Business Risk Horizon" },
    { id: "ownership", label: "Owners & UBOs" },
    { id: "signals", label: "Match Signals" },
    { id: "web", label: "Web Insights" },
    { id: "business", label: "Business Details" },
    { id: "additional", label: "Additional Data" }
  ];

  var TAB_BY_ID = {};
  ALL_TABS.forEach(function (t) {
    TAB_BY_ID[t.id] = t;
  });

  var DEFAULT_TABS = [
    "findings",
    "risk",
    "ownership",
    "signals",
    "web",
    "additional"
  ];

  var MVP_TABS = [
    "findings",
    "business",
    "risk",
    "ownership",
    "signals",
    "web"
  ];

  var MVP_FEATURES = {
    truAi: true,
    /* Match Signals: drop Trulioo Sources + Online Sources block */
    truliooSources: false,
    /* Owners & UBOs: table first + selected by default */
    ownershipDefaultView: "table",
    /* UBO graph: hide toolbar (search/filters) + risk legend */
    uboFilter: false,
    uboToolbar: false,
    uboRiskLegend: false
  };

  function pickTabs(ids) {
    return (ids || DEFAULT_TABS)
      .map(function (id) {
        return TAB_BY_ID[id];
      })
      .filter(Boolean);
  }

  var REGISTRY = {
    default: {
      id: "default",
      label: "Default",
      brh: true,
      tabs: DEFAULT_TABS.slice(),
      hero: "gauge",
      features: {
        truAi: true,
        truliooSources: true,
        ownershipDefaultView: "graph",
        uboFilter: true,
        uboToolbar: true,
        uboRiskLegend: true
      }
    },
    "mvp-brh": {
      id: "mvp-brh",
      label: "MVP BRH",
      brh: true,
      /* Business Details replaces Additional Data */
      tabs: MVP_TABS.slice(),
      hero: "gauge",
      features: Object.assign({}, MVP_FEATURES)
    },
    "mvp-no-brh": {
      id: "mvp-no-brh",
      label: "MVP No BRH",
      brh: false,
      /* Hide Risk Analysis when BRH is off; Business Details replaces Additional Data */
      tabs: MVP_TABS.filter(function (id) {
        return id !== "risk";
      }),
      hero: "flat-verified",
      features: Object.assign({}, MVP_FEATURES)
    }
  };

  /* Legacy alias → BRH-on MVP. */
  var ALIASES = { mvp: "mvp-brh" };

  function isMvp(version) {
    var id =
      typeof version === "string"
        ? version
        : version && version.id
          ? version.id
          : "";
    if (ALIASES[id]) id = ALIASES[id];
    return id === "mvp-brh" || id === "mvp-no-brh" || id.indexOf("mvp-") === 0;
  }

  function resolve(id) {
    var key = ALIASES[id] || id;
    if (!key || !REGISTRY[key]) key = "default";
    var src = REGISTRY[key];
    return {
      id: src.id,
      label: src.label,
      brh: src.brh !== false,
      hero: src.hero || "gauge",
      features: Object.assign(
        {
          truAi: true,
          truliooSources: true,
          ownershipDefaultView: "graph",
          uboFilter: true,
          uboToolbar: true,
          uboRiskLegend: true
        },
        src.features || {}
      ),
      tabs: pickTabs(src.tabs),
      tabIds: (src.tabs || DEFAULT_TABS).slice()
    };
  }

  function list() {
    return Object.keys(REGISTRY).map(function (id) {
      return { id: id, label: REGISTRY[id].label };
    });
  }

  function hasTab(version, tabId) {
    var cfg = typeof version === "string" ? resolve(version) : version;
    if (!cfg || !cfg.tabIds) return false;
    return cfg.tabIds.indexOf(tabId) !== -1;
  }

  global.KybReportVersions = {
    ALL_TABS: ALL_TABS,
    REGISTRY: REGISTRY,
    ALIASES: ALIASES,
    resolve: resolve,
    list: list,
    hasTab: hasTab,
    isMvp: isMvp
  };
})(typeof window !== "undefined" ? window : globalThis);
