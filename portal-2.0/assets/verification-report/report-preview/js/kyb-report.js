/* Report preview — mount KYB Verification Report Module into the right host. */
(function () {
  "use strict";

  var host = document.getElementById("kyb-verification-host");
  if (!host || !window.VerificationReport) return;

  VerificationReport.mount(host, {
    product: "kyb",
    data: VerificationReport.products.kyb.sampleData(),
    activeTab: "overview",
    onAction: function (event) {
      /* raw | export — open in-module dialogs where applicable */
      if (typeof console !== "undefined" && console.debug) {
        console.debug("Report preview action:", event.id);
      }
    }
  });
})();
