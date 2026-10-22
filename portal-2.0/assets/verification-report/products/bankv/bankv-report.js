/* Bank V adapter stub — register a full adapter later via VerificationReport.register("bankv", …) */
(function (global) {
  "use strict";
  if (!global.VerificationReport) return;
  global.VerificationReport.register("bankv", global.VerificationReport.products.stub);
})(typeof window !== "undefined" ? window : this);
