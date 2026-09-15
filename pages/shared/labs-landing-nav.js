/**
 * Product-page sidenav + in-flow back buttons.
 * SideNav markup is built by SideNavExperimental (Figma 1188:10370).
 */
(function () {
  "use strict";

  function resolve(rel) {
    try {
      return new URL(rel, window.location.href).href;
    } catch (e) {
      return rel;
    }
  }

  function labsUrl() {
    return resolve("../unified-intelligence-home/labs.html");
  }

  var PAGE_BACK_IDS = [
    "dv-flow-home-back",
    "dv-result-back",
    "bv-form-back-btn",
    "eid-home-back",
    "eidas-landing-back",
    "di-landing-back",
    "di-analyzing-back",
    "di-result-back",
    "dv-transactions-back",
    "kyb-result-back",
    "kyc-home-back",
  ];

  function goBack() {
    var target = window.top && window.top !== window ? window.top : window;
    if (window.LabsHistoryReturn && window.LabsHistoryReturn.go()) return;
    if (document.referrer || (target !== window && target.document && target.document.referrer)) {
      target.history.back();
      return;
    }
    target.location.href = labsUrl();
  }

  function wirePageBackButtons() {
    PAGE_BACK_IDS.forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn || btn.getAttribute("data-labs-back") === "bound") return;
      btn.setAttribute("data-labs-back", "bound");
      btn.setAttribute("aria-label", "Back");
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        goBack();
      });
    });
  }

  function init() {
    if (window.SideNavExperimental) window.SideNavExperimental.init();
    wirePageBackButtons();
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
