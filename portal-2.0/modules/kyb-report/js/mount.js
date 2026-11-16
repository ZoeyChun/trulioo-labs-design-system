/* Standalone KYB Report module — mount into any portal-2.0 demo host.

   Dependencies (TDS only — not demo-3):
     Link css/tds-deps.css (tokens + all required Components).
     Scripts: score-gauge.js, dialog.js, dropdown-panel.js

   Module ships its own vendor/ copies of Demo 3 report CSS/JS + Meridian data.

   Usage:
     KybReportModule.mount(document.querySelector("#host"), {
       version: "default", // or "mvp-brh" / "mvp-no-brh"
       data: { name: "Acme Inc." },
       tab: "findings",
       assetBase: "…"
     });
*/
(function (global) {
  "use strict";

  /* Hero / highlight jump keys → real tab ids. Never apply to tab clicks. */
  var JUMP = {
    ownership: "ownership",
    presence: "web",
    "match-signals": "signals",
    signals: "risk",
    "business-insights": "additional",
    financial: "additional",
    business: "business"
  };

  function scriptDir() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i -= 1) {
      var src = scripts[i].src || "";
      if (/\/kyb-report\/js\/mount\.js(\?|$)/.test(src)) {
        return src.replace(/\/js\/mount\.js(\?.*)?$/, "/");
      }
    }
    return "./";
  }

  function resolveVersion(opts) {
    var id = (opts && opts.version) || "default";
    if (global.KybReportVersions && global.KybReportVersions.resolve) {
      return global.KybReportVersions.resolve(id);
    }
    return {
      id: "default",
      label: "Default",
      brh: true,
      hero: "gauge",
      features: { truAi: true },
      tabs: (global.KybReportShell && global.KybReportShell.TABS) || [],
      tabIds: ["findings", "risk", "ownership", "signals", "web", "additional"]
    };
  }

  function detailTabId(version) {
    if (version && version.tabIds && version.tabIds.indexOf("business") !== -1) {
      return "business";
    }
    return "additional";
  }

  function isMvpVersion(version) {
    if (global.KybReportVersions && global.KybReportVersions.isMvp) {
      return global.KybReportVersions.isMvp(version);
    }
    return !!(version && String(version.id || "").indexOf("mvp") === 0);
  }

  function tabAllowed(version, id) {
    if (global.KybReportVersions && global.KybReportVersions.hasTab) {
      return global.KybReportVersions.hasTab(version, id);
    }
    return true;
  }

  function paintOverview(card, biz, api) {
    var panel = card.querySelector('[data-d3-kyb-panel="findings"]');
    if (!panel) return;
    if (global.D3KybPanels && global.D3KybPanels.mount(panel, "summary")) {
      if (global.KybReportOverview) {
        global.KybReportOverview.enhance(panel, biz, card, api);
      }
    } else {
      panel.innerHTML =
        '<p class="d3-workspace__hint">Overview panel data failed to load.</p>';
    }
  }

  function paintRisk(card) {
    var panel = card.querySelector('[data-d3-kyb-panel="risk"]');
    if (!panel) return;
    if (global.D3KybPanels) global.D3KybPanels.mount(panel, "signals");
  }

  function paintResultTabs(card, biz, version) {
    if (global.D3KybResultTabs && global.D3KybResultTabs.renderAll) {
      global.D3KybResultTabs.renderAll(card, biz);
    }
    /* Version feature: hide Trulioo Sources block under Match Signals. */
    if (version && version.features && version.features.truliooSources === false) {
      card.querySelectorAll(".kyb-sources-body").forEach(function (el) {
        el.remove();
      });
    }
    /* MVP: expand Match Signals rows as datasource name + result only. */
    if (
      isMvpVersion(version) &&
      global.KybReportMvpMatchSignals &&
      global.KybReportMvpMatchSignals.enrichMatchPanel
    ) {
      var signalsPanel = card.querySelector('[data-d3-kyb-panel="signals"]');
      if (signalsPanel) {
        global.KybReportMvpMatchSignals.enrichMatchPanel(signalsPanel, biz);
      }
    }
  }

  function fitUboGraph(panel) {
    var graphPane = panel.querySelector('[data-d3-kyb-own-panel="graph"]');
    /* Never fit while the graph pane is hidden — that blanked the canvas. */
    if (!graphPane || graphPane.hidden) return;
    var btn = panel.querySelector(
      '.kyb-ubo-graph__zoom-btn[aria-label="Reset view"]'
    );
    if (btn) btn.click();
  }

  function expandUboBranches(panel) {
    function clickMore() {
      var btns = panel.querySelectorAll("[data-kyb-ubo-more]");
      btns.forEach(function (btn) {
        btn.click();
      });
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

  function prepareMvpGraph(panel, biz) {
    if (global.KybReportMvpOwnership && global.KybReportMvpOwnership.remountGraph) {
      global.KybReportMvpOwnership.remountGraph(panel, biz);
    }
    expandUboBranches(panel);
  }

  function scheduleMvpGraph(panel, biz) {
    /* Wait past vendor rAF mount + panel un-hide so stage has real size. */
    window.requestAnimationFrame(function () {
      window.setTimeout(function () {
        prepareMvpGraph(panel, biz);
      }, 120);
    });
  }

  function applyOwnershipViewPrefs(panel, version, biz) {
    var view =
      (version && version.features && version.features.ownershipDefaultView) ||
      "graph";
    var control = panel.querySelector("[data-d3-kyb-own-view-control]");
    /* MVP: table control first (left), then graph. */
    if (control && view === "table") {
      var tableBtn = control.querySelector('[data-d3-kyb-own-view="table"]');
      var graphBtn = control.querySelector('[data-d3-kyb-own-view="graph"]');
      if (tableBtn && graphBtn && control.firstElementChild !== tableBtn) {
        control.insertBefore(tableBtn, control.firstElementChild);
      }
    }
    if (global.D3KybUboGraph && global.D3KybUboGraph.setView) {
      global.D3KybUboGraph.setView(panel, view);
    }
    /* MVP: always mount/expand the UBO canvas (may be hidden under table).
       Fit only after the graph panel is actually shown. */
    if (isMvpVersion(version)) {
      if (control && !control.dataset.krMvpExpandBound) {
        control.dataset.krMvpExpandBound = "1";
        control.addEventListener("click", function (e) {
          if (e.target.closest('[data-d3-kyb-own-view="graph"]')) {
            scheduleMvpGraph(panel, biz);
          }
        });
      }
      scheduleMvpGraph(panel, biz);
      if (global.KybReportMvpOwnership && global.KybReportMvpOwnership.enrichOwnershipTable) {
        global.KybReportMvpOwnership.enrichOwnershipTable(panel);
      }
    }
  }

  function paintOwnership(card, biz, version) {
    var panel = card.querySelector('[data-d3-kyb-panel="ownership"]');
    if (!panel) return;
    if (global.D3KybUboGraph && global.D3KybUboGraph.mountInto) {
      var ver = version || { features: {} };
      var defaultView =
        (ver.features && ver.features.ownershipDefaultView) || "graph";
      global.D3KybUboGraph.mountInto(panel, biz, { defaultView: defaultView });
      applyOwnershipViewPrefs(panel, ver, biz);
      return;
    }
    panel.innerHTML =
      '<p class="d3-workspace__hint">Owners &amp; UBOs graph failed to load.</p>';
  }

  function paintBusinessDetails(card, biz, api) {
    var panel = card.querySelector('[data-d3-kyb-panel="business"]');
    if (!panel) return;
    if (
      global.KybReportMvpBusinessDetails &&
      global.KybReportMvpBusinessDetails.render
    ) {
      global.KybReportMvpBusinessDetails.render(panel, biz, api);
      return;
    }
    panel.innerHTML =
      '<p class="d3-workspace__hint">Business Details failed to load.</p>';
  }

  function selectTab(card, id, biz, api) {
    if (id === "sources") id = "signals";
    if (id === "additional" && detailTabId(api.versionConfig) === "business") {
      id = "business";
    }
    if (id === "business" && !tabAllowed(api.versionConfig, "business")) {
      id = "additional";
    }
    if (!tabAllowed(api.versionConfig, id)) {
      id = "findings";
    }
    var panel = card.querySelector('[data-d3-kyb-panel="' + id + '"]');
    if (!panel) return false;
    card.querySelectorAll("[data-d3-kyb-tab]").forEach(function (t) {
      var on = t.getAttribute("data-d3-kyb-tab") === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    card.querySelectorAll("[data-d3-kyb-panel]").forEach(function (p) {
      p.hidden = p.getAttribute("data-d3-kyb-panel") !== id;
    });
    if (id === "findings") paintOverview(card, biz, api);
    if (id === "risk") paintRisk(card);
    if (id === "ownership") paintOwnership(card, biz, api.versionConfig);
    if (id === "business") paintBusinessDetails(card, biz, api);
    if (id === "signals" || id === "web" || id === "additional") {
      paintResultTabs(card, biz, api.versionConfig);
    }
    return true;
  }

  function bind(card, biz, api) {
    card.addEventListener("click", function (e) {
      var tab = e.target.closest("[data-d3-kyb-tab]");
      if (tab && card.contains(tab)) {
        api.selectTab(tab.getAttribute("data-d3-kyb-tab"));
        return;
      }
      var jump = e.target.closest("[data-kyb-jump-tab]");
      if (jump && card.contains(jump)) {
        var key = jump.getAttribute("data-kyb-jump-tab");
        var mapped = JUMP[key] || key;
        if (
          (mapped === "additional" || key === "financial" || key === "business-insights") &&
          detailTabId(api.versionConfig) === "business"
        ) {
          mapped = "business";
        }
        api.selectTab(mapped);
      }
    });
  }

  function mount(host, opts) {
    if (!host) throw new Error("KybReportModule.mount: host element required");
    opts = opts || {};
    var version = resolveVersion(opts);
    var biz = global.KybReportData.resolve(opts.data || {});
    if (
      isMvpVersion(version) &&
      global.KybReportMvpOwnership &&
      global.KybReportMvpOwnership.applyToBiz
    ) {
      biz = global.KybReportMvpOwnership.applyToBiz(biz);
    }
    if (
      isMvpVersion(version) &&
      global.KybReportMvpMatchSignals &&
      global.KybReportMvpMatchSignals.applyToBiz
    ) {
      biz = global.KybReportMvpMatchSignals.applyToBiz(biz);
    }
    var base = opts.assetBase || scriptDir() + "assets/";
    host.classList.add("kr-host");
    host.setAttribute("data-kr-version", version.id);
    host.setAttribute(
      "data-kr-ubo-filter",
      version.features && version.features.uboFilter === false ? "off" : "on"
    );
    host.setAttribute(
      "data-kr-ubo-toolbar",
      version.features && version.features.uboToolbar === false ? "off" : "on"
    );
    host.setAttribute(
      "data-kr-ubo-legend",
      version.features && version.features.uboRiskLegend === false ? "off" : "on"
    );
    host.innerHTML = global.KybReportShell.html(biz, version);
    var card = host.querySelector("[data-d3-kyb-resume]");

    if (global.KybReportDialogs) global.KybReportDialogs.ensure();

    var api = {
      el: card,
      host: host,
      biz: biz,
      version: version.id,
      versionConfig: version,
      assetBase: base,
      selectTab: function (id) {
        return selectTab(card, id, biz, api);
      },
      destroy: function () {
        if (global.D3KybReport === api) global.D3KybReport = undefined;
        if (global.D3KybUboGraph && global.D3KybUboGraph.unmountFrom) {
          var own = card.querySelector('[data-d3-kyb-panel="ownership"]');
          if (own) global.D3KybUboGraph.unmountFrom(own);
        }
        host.innerHTML = "";
        host.removeAttribute("data-kr-version");
      }
    };

    /* Vendored panels call this with already-mapped tab ids. */
    global.D3KybReport = {
      selectTab: function (id) {
        return api.selectTab(id);
      },
      getCurrent: function () {
        return biz;
      },
      getVersion: function () {
        return version.id;
      }
    };

    bind(card, biz, api);
    if (global.KybReportRaw) global.KybReportRaw.bind(card, biz);
    paintResultTabs(card, biz, version);
    paintOwnership(card, biz, version);
    var startTab = opts.tab || "findings";
    if (!tabAllowed(version, startTab)) startTab = "findings";
    api.selectTab(startTab);
    return api;
  }

  global.KybReportModule = {
    mount: mount,
    resolveData: function (overrides) {
      return global.KybReportData.resolve(overrides);
    },
    versions: function () {
      return (global.KybReportVersions && global.KybReportVersions.list()) || [];
    },
    resolveVersion: resolveVersion,
    tabs: function (versionId) {
      var cfg = resolveVersion({ version: versionId || "default" });
      return cfg.tabs || [];
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
