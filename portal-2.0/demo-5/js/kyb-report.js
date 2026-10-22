/* Demo 5 — mount KYB Verification Report Module into the right host. */
(function () {
  "use strict";

  var host = document.getElementById("kyb-verification-host");
  if (!host || !window.VerificationReport) return;

  VerificationReport.mount(host, {
    product: "kyb",
    data: VerificationReport.products.kyb.sampleData(),
    activeTab: "overview",
    onAction: function (event) {
      /* details | raw | export — Details/Raw open in-module dialogs */
      if (typeof console !== "undefined" && console.debug) {
        console.debug("Demo 5 report action:", event.id);
      }
    }
  });
})();
