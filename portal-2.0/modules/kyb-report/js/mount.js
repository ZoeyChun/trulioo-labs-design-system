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
    financial: "additional"
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

  function expandUboBranches(panel) {
    window.requestAnimationFrame(function () {
      window.setTimeout(function () {
        panel.querySelectorAll("[data-kyb-ubo-more]").forEach(function (btn) {
          btn.click();
        });
      }, 160);
    });
  }

  function prepareMvpGraph(panel, biz) {
    if (global.KybReportMvpOwnership && global.KybReportMvpOwnership.remountGraph) {
      global.KybReportMvpOwnership.remountGraph(panel, biz);
    }
    expandUboBranches(panel);
  }

  function applyOwnershipViewPrefs(panel, version, biz) {
    var view =
      (version && version.features && version.features.ownershipDefaultView) ||
      "graph";
    var control = panel.querySelector("[data-d3-kyb-own-view-control]");
    if (control && view === "table") {
      var tableBtn = control.querySelector('[data-d3-kyb-own-view="table"]');
      var graphBtn = control.querySelector('[data-d3-kyb-own-view="graph"]');
      if (tableBtn && graphBtn && tableBtn !== control.firstElementChild) {
        control.insertBefore(tableBtn, graphBtn);
      }
    }
    if (global.D3KybUboGraph && global.D3KybUboGraph.setView) {
      global.D3KybUboGraph.setView(panel, view);
    }
    /* MVP: restore business fields on graph + expand 3-level tree.
       Vendor mountInto schedules mountGraphOnly in rAF — remount after that. */
    if (isMvpVersion(version)) {
      if (control && !control.dataset.krMvpExpandBound) {
        control.dataset.krMvpExpandBound = "1";
        control.addEventListener("click", function (e) {
          if (e.target.closest('[data-d3-kyb-own-view="graph"]')) {
            window.setTimeout(function () {
              prepareMvpGraph(panel, biz);
            }, 80);
          }
        });
      }
      if (view === "graph") {
        window.setTimeout(function () {
          prepareMvpGraph(panel, biz);
        }, 80);
      }
      if (global.KybReportMvpOwnership && global.KybReportMvpOwnership.enrichOwnershipTable) {
        global.KybReportMvpOwnership.enrichOwnershipTable(panel);
      }
    }
  }

  function paintOwnership(card, biz, version) {
    var panel = card.querySelector('[data-d3-kyb-panel="ownership"]');
    if (!panel) return;
    if (global.D3KybUboGraph && global.D3KybUboGraph.mountInto) {
      global.D3KybUboGraph.mountInto(panel, biz);
      applyOwnershipViewPrefs(panel, version || { features: {} }, biz);
      return;
    }
    panel.innerHTML =
      '<p class="d3-workspace__hint">Owners &amp; UBOs graph failed to load.</p>';
  }

  function selectTab(card, id, biz, api) {
    if (id === "sources") id = "signals";
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
        api.selectTab(JUMP[key] || key);
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
