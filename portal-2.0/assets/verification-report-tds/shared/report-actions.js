/* Verification report page actions — Raw Data, Export, New verification.
 *
 * The same three controls Demo 3 shows on a finished KYB report
 * (portal-2.0/demo-3/index.html): Raw Data opens the report JSON in a
 * dialog with Copy, Export downloads the payload and confirms with a toast,
 * and New verification starts over.
 *
 * Used by the V2 and V3 TDS report pages so both behave identically.
 */
(function (global) {
  "use strict";

  var ICONS = {
    raw:
      '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m5.5 4.5-3 3.5 3 3.5M10.5 4.5l3 3.5-3 3.5"/></svg>',
    export:
      '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 3v7m0 0 2.75-2.75M8 10 5.25 7.25M3 11.5V12a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 12v-.5"/></svg>',
    "new":
      '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 3.5v9M3.5 8h9"/></svg>',
    copy:
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1"/><path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"/></svg>',
    dismiss:
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4 4 12"/></svg>'
  };

  var DIALOG_ID = "vr-raw-dialog";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function btn(action, label, variant, size, extraAttrs) {
    return (
      '<button type="button" class="tds-btn tds-btn--' +
      variant +
      " tds-btn--" +
      size +
      ' vr-action vr-action--' +
      action +
      '" data-vr-action="' +
      action +
      '"' +
      (extraAttrs ? " " + extraAttrs : "") +
      ">" +
      '<span class="tds-btn__leading-icon" aria-hidden="true">' +
      ICONS[action] +
      "</span>" +
      '<span class="tds-btn__label">' +
      esc(label) +
      "</span></button>"
    );
  }

  /** Button group markup. `size` is a TDS button size ("sm" | "md"). */
  function actionsHtml(opts) {
    var size = (opts && opts.size) || "sm";
    return (
      '<div class="vr-actions" role="group" aria-label="Report actions">' +
      btn(
        "raw",
        "Raw Data",
        "secondary",
        size,
        'data-dialog-open="' + DIALOG_ID + '"'
      ) +
      btn("export", "Export", "secondary", size) +
      btn("new", "New verification", "primary", size) +
      "</div>"
    );
  }

  /** Raw Data dialog markup. Mounted on <body> by ensureDialog(). */
  function dialogHtml() {
    return (
      '<div class="tds-dialog tds-dialog--center tds-dialog--lg vr-raw-dialog" id="' +
      DIALOG_ID +
      '" hidden>' +
      '<div class="tds-dialog__backdrop">' +
      '<div class="tds-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="vr-raw-title" tabindex="-1">' +
      '<header class="tds-dialog__header">' +
      '<div class="tds-dialog__header-row">' +
      '<h2 class="tds-dialog__title" id="vr-raw-title">Raw Data</h2>' +
      '<button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss dialog">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true">' +
      ICONS.dismiss +
      "</span></button>" +
      "</div>" +
      '<div class="tds-dialog__divider" role="presentation"></div>' +
      "</header>" +
      '<div class="tds-dialog__body">' +
      '<div class="vr-json">' +
      '<div class="vr-json__header">' +
      '<span class="vr-json__lang">json</span>' +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm" data-vr-raw-copy aria-label="Copy raw JSON">' +
      '<span class="tds-btn__leading-icon" aria-hidden="true">' +
      ICONS.copy +
      "</span>" +
      '<span class="tds-btn__label">Copy</span></button>' +
      "</div>" +
      '<div class="vr-json__body"><pre class="vr-json__pre" data-vr-raw-pre></pre></div>' +
      "</div></div></div></div></div>"
    );
  }

  /* The dialog lives on <body>: inside the report host, the board's rounded
     overflow clips it and the chat pane paints over it. */
  function ensureDialog() {
    var doc = global.document;
    var existing = doc.getElementById(DIALOG_ID);
    if (existing) return existing;
    var holder = doc.createElement("div");
    holder.innerHTML = dialogHtml();
    var dialog = holder.firstChild;
    doc.body.appendChild(dialog);
    return dialog;
  }

  /** The report payload, shared by Raw Data and Export. */
  function payload(data) {
    data = data || {};
    return {
      name: data.name || "Verification report",
      country: data.country || "",
      transactionId: data.transactionId || "",
      date: data.date || "",
      verified: data.verified !== false,
      riskLabel: data.riskLabel || "",
      riskScore: typeof data.riskScore === "number" ? data.riskScore : null,
      overview: data.overview || {},
      ownership: data.ownership || data.ownershipTableRows || [],
      ownershipGraph: data.ownershipGraph || null,
      officer: data.officer || null,
      matchSignals: data.matchSignals || null,
      riskCategories: data.riskCategories || null,
      socialProfile: data.socialProfile || null,
      onlineSources: data.onlineSources || null
    };
  }

  function toast(message, tone) {
    var el = global.document.createElement("div");
    el.className =
      "tds-announcement tds-announcement--inline tds-announcement--" +
      (tone || "success") +
      " vr-toast";
    el.setAttribute("role", "status");
    el.innerHTML =
      '<div class="tds-announcement__content"><p class="tds-announcement__message">' +
      esc(message) +
      "</p></div>";
    global.document.body.appendChild(el);
    global.setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2800);
  }

  function slug(name) {
    return (
      String(name || "verification-report")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "verification-report"
    );
  }

  function download(data) {
    var json = JSON.stringify(
      Object.assign({ exportedAt: new Date().toISOString() }, payload(data)),
      null,
      2
    );
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = global.document.createElement("a");
    link.href = url;
    link.download = slug(data && data.name) + "-report.json";
    global.document.body.appendChild(link);
    link.click();
    link.remove();
    global.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  /**
   * Wire the group up.
   * opts: { data, onNewVerification, onExport }
   */
  function bind(root, opts) {
    if (!root) return;
    opts = opts || {};
    var data = opts.data || {};
    var dialog = ensureDialog();

    function rawText() {
      return JSON.stringify(payload(data), null, 2);
    }

    dialog.addEventListener("click", function (event) {
      var copyBtn = event.target.closest("[data-vr-raw-copy]");
      if (copyBtn) {
        var text = rawText();
        if (global.navigator && global.navigator.clipboard) {
          global.navigator.clipboard.writeText(text).then(
            function () {
              toast("Raw JSON copied to the clipboard.");
            },
            function () {
              toast("Could not copy the raw JSON.", "warning");
            }
          );
        } else {
          toast("Clipboard is unavailable in this browser.", "warning");
        }
      }
    });

    root.addEventListener("click", function (event) {
      var action = event.target.closest("[data-vr-action]");
      if (!action || !root.contains(action)) return;
      var kind = action.getAttribute("data-vr-action");

      if (kind === "raw") {
        /* The dialog component opens it; fill it on the way through. */
        var pre = dialog.querySelector("[data-vr-raw-pre]");
        if (pre) pre.textContent = rawText();
        return;
      }

      if (kind === "export") {
        if (typeof opts.onExport === "function") opts.onExport(data);
        else download(data);
        toast("Export started for the verification report.");
        return;
      }

      if (kind === "new") {
        if (typeof opts.onNewVerification === "function") {
          opts.onNewVerification();
        }
        toast("Starting a new verification.");
      }
    });
  }

  global.VerificationReportActions = {
    dialogId: DIALOG_ID,
    actionsHtml: actionsHtml,
    dialogHtml: dialogHtml,
    ensureDialog: ensureDialog,
    payload: payload,
    download: download,
    toast: toast,
    bind: bind
  };
})(typeof window !== "undefined" ? window : globalThis);
