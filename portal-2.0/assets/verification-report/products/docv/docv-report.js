/* Doc V adapter stub — register a full adapter later via VerificationReport.register("docv", …) */
(function (global) {
  "use strict";
  if (!global.VerificationReport) return;
  /* Keeps product id discoverable; shell already maps unknown products to stub. */
  global.VerificationReport.register("docv", global.VerificationReport.products.stub);
})(typeof window !== "undefined" ? window : this);
