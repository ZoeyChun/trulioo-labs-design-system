/* Report card markup + tab chrome — driven by named version config. */
(function (global) {
  "use strict";

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function tabsFor(version) {
    if (version && version.tabs && version.tabs.length) return version.tabs;
    return (global.KybReportVersions && global.KybReportVersions.ALL_TABS) || [];
  }

  function html(biz, version) {
    var tabs = tabsFor(version);
    var brh = version && version.brh === false ? "off" : "on";
    var verId = (version && version.id) || "default";
    var feats = (version && version.features) || {};
    var uboFilter = feats.uboFilter === false ? "off" : "on";
    var uboToolbar = feats.uboToolbar === false ? "off" : "on";
    var uboLegend = feats.uboRiskLegend === false ? "off" : "on";
    var tabBtns = tabs
      .map(function (t, i) {
        return (
          '<button type="button" class="d3-kyb-tabs__item' +
          (i === 0 ? " is-active" : "") +
          '" role="tab" aria-selected="' +
          (i === 0 ? "true" : "false") +
          '" data-d3-kyb-tab="' +
          esc(t.id) +
          '">' +
          esc(t.label) +
          "</button>"
        );
      })
      .join("");
    var panels = tabs
      .map(function (t, i) {
        return (
          '<div class="d3-kyb-panel" data-d3-kyb-panel="' +
          esc(t.id) +
          '" role="tabpanel"' +
          (i === 0 ? "" : " hidden") +
          "></div>"
        );
      })
      .join("");
    return (
      '<article class="d3-kyb-resume kr-report is-live" data-d3-kyb-resume data-d3-brh="' +
      brh +
      '" data-kr-version="' +
      esc(verId) +
      '" data-kr-ubo-filter="' +
      uboFilter +
      '" data-kr-ubo-toolbar="' +
      uboToolbar +
      '" data-kr-ubo-legend="' +
      uboLegend +
      '">' +
      '<div class="d3-kyb-resume__body">' +
      '<div class="d3-kyb-resume__identity">' +
      '<div class="d3-workspace__biz-row">' +
      '<div class="d3-workspace__biz">' +
      '<h2 class="d3-workspace__biz-name">' +
      esc(biz.name) +
      "</h2>" +
      '<span class="tds-tag tds-tag--sm tds-tag--positive">' +
      esc(biz.verifyStatus || "Verified") +
      "</span></div>" +
      '<div class="d3-workspace__biz-actions">' +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm d3-kyb-raw-action" data-d3-kyb-raw-action data-d3-kyb-view-raw data-dialog-open="d3-kyb-raw-dialog">' +
      '<span class="tds-btn__leading-icon" aria-hidden="true"><svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m5.5 4.5-3 3.5 3 3.5M10.5 4.5l3 3.5-3 3.5"/></svg></span>' +
      "Raw Data</button>" +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm d3-kyb-export" data-d3-kyb-export>' +
      '<span class="tds-btn__leading-icon" aria-hidden="true"><svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 3v7m0 0 2.75-2.75M8 10 5.25 7.25M3 11.5V12a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 12v-.5"/></svg></span>' +
      "Export</button>" +
      "</div></div></div>" +
      '<div class="d3-kyb-tabs" role="tablist" aria-label="Verification sections">' +
      tabBtns +
      "</div>" +
      panels +
      "</div></article>"
    );
  }

  global.KybReportShell = {
    get TABS() {
      return tabsFor(
        global.KybReportVersions && global.KybReportVersions.resolve("default")
      );
    },
    html: html
  };
})(typeof window !== "undefined" ? window : globalThis);
