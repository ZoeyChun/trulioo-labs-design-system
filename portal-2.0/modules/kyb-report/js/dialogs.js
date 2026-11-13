/* Inject Demo 3 score-breakdown + raw-data dialogs once per page. */
(function (global) {
  "use strict";

  var INJECTED = false;

  function ensure() {
    if (INJECTED) return true;
    var markup = global.KybReportDialogMarkup;
    if (!markup || !markup.score || !markup.raw) return false;

    var holder = document.getElementById("kyb-report-dialogs");
    if (!holder) {
      holder = document.createElement("div");
      holder.id = "kyb-report-dialogs";
      holder.className = "kr-dialogs";
      document.body.appendChild(holder);
    }

    if (!document.getElementById("kyb-score-breakdown-dialog")) {
      holder.insertAdjacentHTML("beforeend", markup.score);
    }
    if (!document.getElementById("d3-kyb-raw-dialog")) {
      holder.insertAdjacentHTML("beforeend", markup.raw);
    }

    /* Standalone: use full-page fixed overlays (not workspace-scoped). */
    ["kyb-score-breakdown-dialog", "d3-kyb-raw-dialog"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove("tds-dialog--scoped");
    });

    INJECTED = true;
    return true;
  }

  global.KybReportDialogs = { ensure: ensure };
})(typeof window !== "undefined" ? window : globalThis);
