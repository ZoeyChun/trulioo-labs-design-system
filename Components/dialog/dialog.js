/**
 * Dialog — open/close for preview and consuming apps.
 * Triggers: [data-dialog-open="dialog-id"]
 * Close: .tds-dialog__dismiss, [data-dialog-close], backdrop click, Escape
 */
(function initTdsDialog() {
  if (window.__tdsDialogInit) return;
  window.__tdsDialogInit = true;

  const DISMISS_SVG =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg>';

  function isLiveDialog(dialog) {
    return dialog && !dialog.classList.contains("tds-dialog--inline");
  }

  function syncBodyScrollLock() {
    const hasOpenLive = document.querySelector(".tds-dialog:not([hidden]):not(.tds-dialog--inline)");
    document.body.classList.toggle("tds-dialog-open", Boolean(hasOpenLive));
  }

  function openDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog || !isLiveDialog(dialog)) return;
    dialog.hidden = false;
    syncBodyScrollLock();
    const focusTarget =
      dialog.querySelector(".tds-dialog__dismiss") ||
      dialog.querySelector(".tds-dialog__actions .tds-btn") ||
      dialog.querySelector(".tds-dialog__panel");
    focusTarget?.focus?.();
  }

  function closeDialog(dialog) {
    if (!dialog || !isLiveDialog(dialog)) return;
    dialog.hidden = true;
    syncBodyScrollLock();
  }

  document.addEventListener("click", (event) => {
    const openTrigger = event.target.closest("[data-dialog-open]");
    if (openTrigger) {
      event.preventDefault();
      openDialog(openTrigger.getAttribute("data-dialog-open"));
      return;
    }

    const closeTrigger = event.target.closest(".tds-dialog__dismiss, [data-dialog-close]");
    if (closeTrigger) {
      const dialog = closeTrigger.closest(".tds-dialog");
      if (isLiveDialog(dialog)) {
        event.preventDefault();
        closeDialog(dialog);
      }
      return;
    }

    if (event.target.classList.contains("tds-dialog__backdrop")) {
      const dialog = event.target.closest(".tds-dialog");
      if (isLiveDialog(dialog) && dialog.dataset.backdropClose !== "false") {
        closeDialog(dialog);
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openDialogEl = document.querySelector(".tds-dialog:not([hidden]):not(.tds-dialog--inline)");
    if (openDialogEl) {
      event.preventDefault();
      closeDialog(openDialogEl);
    }
  });

  window.openTdsDialog = openDialog;
  window.closeTdsDialog = closeDialog;
  window.TdsDialogDismissIcon = DISMISS_SVG;
})();
