/* Device Intelligence adapter stub — register a full adapter later via VerificationReport.register("device", …) */
(function (global) {
  "use strict";
  if (!global.VerificationReport) return;
  global.VerificationReport.register("device", global.VerificationReport.products.stub);
})(typeof window !== "undefined" ? window : this);
