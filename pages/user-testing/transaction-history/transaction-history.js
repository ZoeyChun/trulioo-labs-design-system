(function () {
  var rows = window.UT_TRANSACTIONS || [];
  var STORAGE_KEY = "ut-tx-settings";
  var COPY_ICON =
    '<svg class="icon" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.25 7.21875C8.44336 7.21875 8.59375 7.06836 8.59375 6.875V2.64258C8.59375 2.53516 8.55078 2.44922 8.48633 2.38477L7.24023 1.13867C7.17578 1.07422 7.08984 1.03125 7.00391 1.03125H4.125C3.93164 1.03125 3.78125 1.18164 3.78125 1.375V6.875C3.78125 7.06836 3.93164 7.21875 4.125 7.21875H8.25ZM4.125 8.25C3.37305 8.25 2.75 7.62695 2.75 6.875V1.375C2.75 0.623047 3.37305 0 4.125 0H7.00391C7.36914 0 7.71289 0.150391 7.9707 0.408203L9.2168 1.6543C9.47461 1.91211 9.625 2.27734 9.625 2.64258V6.875C9.625 7.62695 9.00195 8.25 8.25 8.25H4.125ZM1.375 2.75H1.71875V3.78125H1.375C1.18164 3.78125 1.03125 3.93164 1.03125 4.125V9.625C1.03125 9.81836 1.18164 9.96875 1.375 9.96875H5.5C5.69336 9.96875 5.84375 9.81836 5.84375 9.625V9.28125H6.875V9.625C6.875 10.377 6.25195 11 5.5 11H1.375C0.623047 11 0 10.377 0 9.625V4.125C0 3.37305 0.623047 2.75 1.375 2.75Z" fill="currentColor"/></svg>';
  var CHECK_ICON =
    '<svg class="icon" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.45312 0.171875C9.68945 0.322266 9.73242 0.644531 9.58203 0.880859L3.91016 8.78711C3.80273 8.91602 3.67383 8.98047 3.52344 9.00195C3.37305 9.00195 3.22266 8.95898 3.11523 8.85156L0.193359 5.92969C0 5.73633 0 5.39258 0.193359 5.19922C0.386719 5.00586 0.730469 5.00586 0.923828 5.19922L3.41602 7.69141L8.74414 0.279297C8.89453 0.0429688 9.2168 0 9.45312 0.171875Z" fill="currentColor"/></svg>';
  var SORT_ICON =
    '<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg>';
  var STATUS_ICONS = {
    "in-progress": {
      label: "In Progress",
      svg:
        '<svg class="icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.96875 5.5C9.96875 3.0293 7.9707 1.03125 5.5 1.03125C3.0293 1.03125 1.03125 3.0293 1.03125 5.5C1.03125 7.9707 3.0293 9.96875 5.5 9.96875C7.9707 9.96875 9.96875 7.9707 9.96875 5.5ZM0 5.5C0 2.4707 2.4707 0 5.5 0C8.5293 0 11 2.4707 11 5.5C11 8.5293 8.5293 11 5.5 11C2.4707 11 0 8.5293 0 5.5ZM4.98438 2.57812C4.98438 2.29883 5.2207 2.0625 5.5 2.0625C5.7793 2.0625 6.01562 2.29883 6.01562 2.57812V5.2207L7.8418 6.44531C8.07812 6.5957 8.14258 6.91797 7.99219 7.1543C7.8418 7.39062 7.51953 7.45508 7.2832 7.30469L5.2207 5.92969C5.07031 5.84375 4.98438 5.67188 4.98438 5.5V2.57812Z" fill="currentColor"/></svg>'
    },
    failed: {
      label: "Failed",
      svg:
        '<svg class="icon" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.54297 0C5.84375 0 6.14453 0.171875 6.29492 0.451172L10.9355 9.04492C11.0645 9.30273 11.0645 9.625 10.9141 9.9043C10.7637 10.1621 10.4844 10.3125 10.1836 10.3125H0.902344C0.580078 10.3125 0.300781 10.1621 0.150391 9.9043C0 9.625 0 9.30273 0.128906 9.04492L4.76953 0.451172C4.91992 0.171875 5.2207 0 5.54297 0ZM1.18164 9.28125H9.88281L5.54297 1.22461L1.18164 9.28125ZM5.54297 8.42188C5.15625 8.42188 4.85547 8.12109 4.85547 7.73438C4.85547 7.34766 5.15625 7.04688 5.54297 7.04688C5.9082 7.04688 6.23047 7.34766 6.23047 7.73438C6.23047 8.12109 5.9082 8.42188 5.54297 8.42188ZM5.54297 3.95312C5.92969 3.95312 6.25195 4.29688 6.20898 4.70508L6.03711 6.08008C6.01562 6.33789 5.80078 6.53125 5.54297 6.53125C5.26367 6.53125 5.04883 6.33789 5.02734 6.08008L4.87695 4.70508C4.83398 4.29688 5.13477 3.95312 5.54297 3.95312Z" fill="currentColor"/></svg>'
    },
    abandoned: {
      label: "Abandoned",
      svg:
        '<svg class="icon" width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3.60938 1.03125H2.0625C1.50391 1.03125 1.03125 1.50391 1.03125 2.0625V7.5625C1.03125 8.14258 1.50391 8.59375 2.0625 8.59375H3.60938C3.88867 8.59375 4.125 8.83008 4.125 9.10938C4.125 9.38867 3.88867 9.625 3.60938 9.625H2.0625C0.923828 9.625 0 8.70117 0 7.5625V2.0625C0 0.923828 0.923828 0 2.0625 0H3.60938C3.88867 0 4.125 0.236328 4.125 0.515625C4.125 0.794922 3.88867 1.03125 3.60938 1.03125ZM10.8496 5.17773L7.92773 8.09961C7.73438 8.29297 7.41211 8.29297 7.19727 8.09961C7.00391 7.90625 7.00391 7.5625 7.19727 7.36914L9.23828 5.32812H3.95312C3.67383 5.32812 3.4375 5.0918 3.4375 4.8125C3.4375 4.5332 3.67383 4.29688 3.95312 4.29688H9.23828L7.19727 2.25586C7.00391 2.0625 7.00391 1.71875 7.19727 1.52539C7.39062 1.33203 7.73438 1.33203 7.92773 1.52539L10.8496 4.44727C11.043 4.64062 11.043 4.98438 10.8496 5.17773Z" fill="currentColor"/></svg>'
    },
    "timed-out": {
      label: "Timed Out",
      svg:
        '<svg class="icon" width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0 0.515625C0 0.236328 0.236328 0 0.515625 0H7.73438C8.01367 0 8.25 0.236328 8.25 0.515625C8.25 0.794922 8.01367 1.03125 7.73438 1.03125H7.5625V1.43945C7.5625 2.29883 7.21875 3.13672 6.61719 3.75977L4.85547 5.5L6.61719 7.26172C7.21875 7.86328 7.5625 8.70117 7.5625 9.56055V9.96875H7.73438C8.01367 9.96875 8.25 10.2051 8.25 10.4844C8.25 10.7637 8.01367 11 7.73438 11H0.515625C0.236328 11 0 10.7637 0 10.4844C0 10.2051 0.236328 9.96875 0.515625 9.96875H0.6875V9.56055C0.6875 8.70117 1.03125 7.86328 1.6543 7.26172L3.39453 5.5L1.6543 3.75977C1.03125 3.13672 0.6875 2.29883 0.6875 1.43945V1.03125H0.515625C0.236328 1.03125 0 0.794922 0 0.515625ZM2.79297 7.5625H5.45703L4.125 6.23047L2.79297 7.5625ZM1.93359 8.59375C1.80469 8.89453 1.71875 9.2168 1.71875 9.56055V9.96875H6.53125V9.56055C6.53125 9.2168 6.44531 8.89453 6.31641 8.59375H1.93359ZM5.88672 3.0293C6.29492 2.59961 6.53125 2.04102 6.53125 1.43945V1.03125H1.71875V1.43945C1.71875 2.04102 1.95508 2.59961 2.38477 3.0293L4.125 4.76953L5.88672 3.0293Z" fill="currentColor"/></svg>'
    }
  };

  var settings = {
    toolbar: "only-date",
    transaction: "name-only",
    transactionId: "copy-under-menu",
    status: "combined-outcome",
    date: "long",
    country: "flag-name",
    score: "separate-column"
  };

  var toastTimer = null;
  var copyTimers = new WeakMap();
  var copyUid = 0;
  var expandedRows = {};
  /* Figma Cell 33 (mid) / Cell 36 (end) tree dividers */
  var TREE_MID =
    '<svg class="ut-tx-tree" width="16" height="40" viewBox="0 0 16 40" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 20C11.5817 20 8 16.4183 8 12V0L8 40" stroke="currentColor"/></svg>';
  var TREE_END =
    '<svg class="ut-tx-tree" width="16" height="40" viewBox="0 0 16 40" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 0V12C8 16.4183 11.5817 20 16 20" stroke="currentColor"/></svg>';
  var CHEVRON_RIGHT =
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"/></svg>';
  var CHEVRON_DOWN =
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3.5 6 8 10.5 12.5 6"/></svg>';

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadSettings() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      Object.keys(settings).forEach(function (key) {
        if (saved[key]) settings[key] = saved[key];
      });
    } catch (e) {}
    // Removed setting — migrate old localStorage values
    if (settings.transactionId === "name-trid") {
      settings.transaction = "name-trid";
      settings.transactionId = "copy-under-menu";
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {}
  }

  function syncRadios() {
    Object.keys(settings).forEach(function (key) {
      var group = document.querySelectorAll('input[name="ut-set-' + key + '"]');
      group.forEach(function (input) {
        input.checked = input.value === settings[key];
      });
    });
  }

  function showTridColumn() {
    return settings.transactionId === "copy-trid-column";
  }

  function showScoreColumn() {
    return settings.score === "separate-column";
  }

  function showNameTrid() {
    return settings.transaction === "name-trid";
  }

  function hideToast() {
    var toast = document.getElementById("utTxToast");
    if (!toast) return;
    toast.classList.remove("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 180);
  }

  function showToast(message) {
    var toast = document.getElementById("utTxToast");
    var title = document.getElementById("utTxToastTitle");
    if (!toast || !title) return;
    title.textContent = message;
    toast.hidden = false;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 2200);
  }

  var activeTooltipHost = null;

  function getTooltipEls() {
    return {
      tip: document.getElementById("utTxTooltip"),
      text: document.getElementById("utTxTooltipText")
    };
  }

  function hideTooltip() {
    var els = getTooltipEls();
    if (!els.tip) return;
    els.tip.hidden = true;
    activeTooltipHost = null;
  }

  function positionTooltip(anchor) {
    var els = getTooltipEls();
    if (!els.tip || !anchor) return;

    // Prefer above trigger: caret on bottom of tooltip (--bottom)
    els.tip.classList.add("tds-tooltip--bottom");
    els.tip.classList.remove("tds-tooltip--top");
    els.tip.hidden = false;
    els.tip.style.visibility = "hidden";
    els.tip.style.left = "0px";
    els.tip.style.top = "0px";

    var rect = anchor.getBoundingClientRect();
    var tipRect = els.tip.getBoundingClientRect();
    var gap = 4;
    var centerX = rect.left + rect.width / 2;
    var top = rect.top - tipRect.height - gap;

    if (top < 8) {
      els.tip.classList.remove("tds-tooltip--bottom");
      els.tip.classList.add("tds-tooltip--top");
      tipRect = els.tip.getBoundingClientRect();
      top = rect.bottom + gap;
    }

    var half = tipRect.width / 2;
    centerX = Math.max(half + 8, Math.min(centerX, window.innerWidth - half - 8));

    els.tip.style.left = Math.round(centerX) + "px";
    els.tip.style.top = Math.round(top) + "px";
    els.tip.style.visibility = "";
  }

  function showTooltip(host) {
    if (!host || host.classList.contains("is-copied")) return;
    var label = host.getAttribute("data-ut-tooltip");
    if (!label) return;
    var els = getTooltipEls();
    if (!els.tip || !els.text) return;
    els.text.textContent = label;
    activeTooltipHost = host;
    // Double-rAF so size is measured after text paint
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (activeTooltipHost === host) positionTooltip(host);
      });
    });
  }

  function bindTooltips() {
    if (document.documentElement.dataset.utTxTooltipBound) return;
    document.documentElement.dataset.utTxTooltipBound = "1";

    document.addEventListener("mouseover", function (e) {
      var host = e.target.closest(".ut-tx-tip-host[data-ut-tooltip]");
      if (!host) return;
      showTooltip(host);
    });

    document.addEventListener("mouseout", function (e) {
      var host = e.target.closest(".ut-tx-tip-host[data-ut-tooltip]");
      if (!host) return;
      var related = e.relatedTarget;
      if (related && host.contains(related)) return;
      if (activeTooltipHost === host) hideTooltip();
    });

    document.addEventListener(
      "focusin",
      function (e) {
        var host = e.target.closest(".ut-tx-tip-host[data-ut-tooltip]");
        if (host) showTooltip(host);
      },
      true
    );

    document.addEventListener(
      "focusout",
      function (e) {
        var host = e.target.closest(".ut-tx-tip-host[data-ut-tooltip]");
        if (host && activeTooltipHost === host) hideTooltip();
      },
      true
    );

    document.addEventListener("scroll", hideTooltip, true);
    window.addEventListener("resize", hideTooltip);
  }

  function statusIconHtml(item) {
    if (settings.status !== "status-icons" || !item.statusIcon) return "";
    // Failed is its own status — never pair the icon with a red outcome tag
    if (
      item.statusIcon === "failed" &&
      item.outcome &&
      item.outcome.tone === "negative"
    ) {
      return "";
    }
    var meta = STATUS_ICONS[item.statusIcon];
    if (!meta) return "";
    return (
      '<span class="ut-tx-flow-status ut-tx-tip-host ut-tx-flow-status--' +
      escapeHtml(item.statusIcon) +
      '" tabindex="0" aria-label="' +
      escapeHtml(meta.label) +
      '" data-ut-tooltip="' +
      escapeHtml(meta.label) +
      '">' +
      meta.svg +
      "</span>"
    );
  }

  function isFlowStatusOutcome(item) {
    var label = ((item.outcome && item.outcome.label) || "").toLowerCase();
    return (
      label === "abandoned" ||
      label === "timed out" ||
      label === "failed" ||
      label === "in progress" ||
      label === "not started"
    );
  }

  function outcomeHtml(item) {
    var outcome = item.outcome;
    if (!outcome) return "";

    if (settings.status === "status-icons" && isFlowStatusOutcome(item)) {
      return '<span class="ut-tx-empty">--</span>';
    }

    var primary;
    if (outcome.tone === "signals" || outcome.tone === "signals-intermediate") {
      var cls =
        outcome.tone === "signals-intermediate"
          ? "tds-data-table__signals tds-data-table__signals--intermediate"
          : "tds-data-table__signals";
      primary =
        '<span class="' + cls + '">' + escapeHtml(outcome.label) + "</span>";
    } else {
      primary =
        '<span class="tds-tag tds-tag--' +
        escapeHtml(outcome.tone) +
        '">' +
        escapeHtml(outcome.label) +
        "</span>";
    }

    /* Score combined with Outcome — subtext: value + risk level */
    if (settings.score === "combined-outcome" && item.score) {
      return (
        '<span class="ut-tx-outcome-stack">' +
        primary +
        '<span class="tds-data-table__cell-subtext ut-tx-outcome-sub">' +
        escapeHtml(item.score.value) +
        " " +
        escapeHtml(item.score.label) +
        "</span></span>"
      );
    }

    return primary;
  }

  function scoreHtml(score) {
    if (!score) return '<span class="ut-tx-empty">--</span>';
    return (
      '<span class="ut-tx-score ut-tx-score--' +
      escapeHtml(score.tone) +
      '">' +
      '<span class="tds-counter tds-counter--sm tds-counter--secondary tds-counter--' +
      escapeHtml(score.tone) +
      '">' +
      escapeHtml(score.value) +
      "</span>" +
      '<span class="ut-tx-score__label">' +
      escapeHtml(score.label) +
      "</span></span>"
    );
  }

  function dateHtml(item) {
    if (settings.date === "numeric") {
      return escapeHtml(item.dateNumeric || item.date);
    }
    if (settings.date === "double-line") {
      return (
        '<span class="ut-tx-date-stack">' +
        '<span class="ut-tx-date-stack__day">' +
        escapeHtml(item.dateDay || item.date) +
        "</span>" +
        '<span class="ut-tx-date-stack__time">' +
        escapeHtml(item.dateTime || "") +
        "</span></span>"
      );
    }
    return escapeHtml(item.date);
  }

  function countryHtml(item) {
    if (settings.country === "flag-only") {
      return (
        '<span class="ut-tx-country ut-tx-country--flag-only">' +
        '<span class="ut-tx-country__flag ut-tx-tip-host" tabindex="0" aria-label="' +
        escapeHtml(item.country) +
        '" data-ut-tooltip="' +
        escapeHtml(item.country) +
        '"><span class="fi fi-' +
        escapeHtml(item.countryCode) +
        '" aria-hidden="true"></span></span></span>'
      );
    }
    return (
      '<span class="ut-tx-country">' +
      '<span class="ut-tx-country__flag" aria-hidden="true"><span class="fi fi-' +
      escapeHtml(item.countryCode) +
      '"></span></span>' +
      '<span class="ut-tx-country__name">' +
      escapeHtml(item.country) +
      "</span></span>"
    );
  }

  function tridSecondaryHtml(item) {
    if (!item.trid) return "";
    return (
      '<span class="ut-tx-id-row">' +
      '<span class="ut-tx-name-sub">' +
      escapeHtml(item.trid) +
      "</span>" +
      '<button type="button" class="ut-tx-id-copy ut-tx-tip-host" data-trid="' +
      escapeHtml(item.trid) +
      '" aria-label="Copy Transaction ID" data-ut-tooltip="Copy Transaction ID">' +
      COPY_ICON +
      "</button></span>"
    );
  }

  function nameHtml(item, opts) {
    opts = opts || {};
    var parts = [];

    if (opts.isChild) {
      parts.push(
        '<span class="ut-tx-tree-wrap" aria-hidden="true">' +
          (opts.isLastChild ? TREE_END : TREE_MID) +
          "</span>"
      );
    } else if (item.expandable) {
      var isOpen = !!expandedRows[item.trid];
      parts.push(
        '<button type="button" class="ut-tx-expand" data-ut-expand="' +
          escapeHtml(item.trid) +
          '" aria-label="' +
          (isOpen ? "Collapse row" : "Expand row") +
          '" aria-expanded="' +
          (isOpen ? "true" : "false") +
          '">' +
          (isOpen ? CHEVRON_DOWN : CHEVRON_RIGHT) +
          "</button>"
      );
    }

    var primary =
      '<span class="ut-tx-name">' +
      escapeHtml(item.name) +
      "</span>" +
      (opts.isChild ? "" : statusIconHtml(item));

    if (!opts.isChild && item.count != null) {
      primary +=
        '<span class="tds-counter tds-counter--sm tds-counter--secondary">' +
        escapeHtml(item.count) +
        "</span>";
    }

    var secondary = "";
    if (settings.transaction === "name-additional" && item.detail) {
      secondary =
        '<span class="ut-tx-name-sub">' + escapeHtml(item.detail) + "</span>";
    } else if (showNameTrid()) {
      secondary = tridSecondaryHtml(item);
    }

    parts.push(
      '<span class="ut-tx-name-stack">' +
        '<span class="ut-tx-name-row">' +
        primary +
        "</span>" +
        secondary +
        "</span>"
    );

    return '<span class="ut-tx-name-cell">' + parts.join("") + "</span>";
  }

  function actionsHtml(item) {
    /* Figma 318:49180 — DropdownPanel + NavItem sm (body/sm 14/18 regular) */
    var menuItems =
      '<button type="button" class="tds-nav-item tds-nav-item--sm ut-tx-menu-copy" role="menuitem" data-trid="' +
      escapeHtml(item.trid || "") +
      '"' +
      (item.trid ? "" : " disabled") +
      '><span class="tds-nav-item__label">Copy Transaction ID</span></button>' +
      '<button type="button" class="tds-nav-item tds-nav-item--sm ut-tx-menu-download" role="menuitem">' +
      '<span class="tds-nav-item__label">Download Transaction</span></button>';

    var copyIconBtn = "";
    if (settings.transactionId === "copy-icon" && item.trid) {
      copyIconBtn =
        '<button type="button" class="tds-data-table__action-icon ut-tx-copy-trid ut-tx-tip-host" data-trid="' +
        escapeHtml(item.trid) +
        '" aria-label="Copy Transaction ID" data-ut-tooltip="Copy Transaction ID">' +
        COPY_ICON +
        "</button>";
    }

    return (
      '<td class="tds-data-table__actions-col">' +
      '<span class="tds-data-table__actions-cell">' +
      copyIconBtn +
      '<div class="tds-button-menu ut-tx-row-menu" data-dropdown-align="end">' +
      '<button type="button" class="tds-data-table__action-icon" aria-label="Row actions for ' +
      escapeHtml(item.name) +
      '" aria-haspopup="menu" aria-expanded="false">' +
      '<svg class="icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">' +
      '<circle cx="3" cy="8" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="13" cy="8" r="1.25"/>' +
      "</svg></button>" +
      '<div class="tds-dropdown-panel ut-tx-row-menu__panel" role="menu" hidden>' +
      menuItems +
      "</div></div></span></td>"
    );
  }

  function rowHtml(item, opts) {
    opts = opts || {};
    var isChild = !!opts.isChild;
    var isLastChild = !!opts.isLastChild;
    var isExpanded = !isChild && item.expandable && !!expandedRows[item.trid];

    var rowClass = "ut-tx-row";
    if (isExpanded) rowClass += " ut-tx-row--expanded";
    if (isChild) {
      rowClass += " ut-tx-row--child";
      if (isLastChild) rowClass += " ut-tx-row--child-last";
    }

    var cells =
      '<td class="tds-data-table__checkbox-cell">' +
      '<input class="tds-checkbox ut-tx-row-check" type="checkbox" aria-label="Select ' +
      escapeHtml(item.name) +
      '"></td>' +
      '<td class="ut-tx-td-name">' +
      nameHtml(item, opts) +
      "</td>";

    cells +=
      '<td class="ut-tx-outcome-cell' +
      (settings.score === "combined-outcome" && item.score
        ? " ut-tx-outcome-cell--with-sub"
        : "") +
      '">' +
      outcomeHtml(item) +
      "</td>" +
      "<td>" +
      dateHtml(item) +
      "</td>" +
      '<td><span class="ut-product-tag">' +
      escapeHtml(item.product) +
      "</span></td>" +
      '<td class="ut-tx-td-country">' +
      countryHtml(item) +
      "</td>";

    if (showScoreColumn()) {
      cells += "<td>" + scoreHtml(item.score) + "</td>";
    }

    cells +=
      "<td>" +
      escapeHtml(item.source) +
      "</td>" +
      "<td>" +
      escapeHtml(item.type) +
      "</td>";

    if (showTridColumn()) {
      cells +=
        '<td class="ut-tx-trid-cell">' +
        '<span class="ut-tx-id-row ut-tx-id-row--column">' +
        '<span class="ut-tx-trid-text">' +
        escapeHtml(item.trid || "--") +
        "</span>" +
        '<button type="button" class="ut-tx-id-copy ut-tx-tip-host" data-trid="' +
        escapeHtml(item.trid || "") +
        '" aria-label="Copy Transaction ID" data-ut-tooltip="Copy Transaction ID">' +
        COPY_ICON +
        "</button></span></td>";
    }

    cells += actionsHtml(item);

    return '<tr class="' + rowClass + '">' + cells + "</tr>";
  }

  function renderHead() {
    var head = document.getElementById("utTxHead");
    if (!head) return;

    var html =
      "<tr>" +
      '<th scope="col" class="tds-data-table__checkbox-cell">' +
      '<input class="tds-checkbox" type="checkbox" id="utTxSelectAll" aria-label="Select all transactions">' +
      "</th>" +
      '<th scope="col" class="ut-tx-th-name">Transaction</th>';

    function sortTh(label, className) {
      return (
        '<th scope="col"' +
        (className ? ' class="' + className + '"' : "") +
        ' aria-sort="none"><span class="tds-data-table__sort-label">' +
        label +
        ' <span class="tds-data-table__sort-icon" aria-hidden="true">' +
        SORT_ICON +
        "</span></span></th>"
      );
    }

    html +=
      sortTh("Outcome") +
      sortTh("Date") +
      sortTh("Product") +
      sortTh("Country", "ut-tx-th-country");

    if (showScoreColumn()) {
      html += sortTh("Score");
    }

    html += sortTh("Source") + sortTh("Type");

    if (showTridColumn()) {
      html += '<th scope="col" class="ut-tx-col-trid">Copy TRID</th>';
    }

    html +=
      '<th scope="col" class="tds-data-table__actions-col"><span class="visually-hidden">Actions</span></th>' +
      "</tr>";

    head.innerHTML = html;
    bindSelectAll();
  }

  function renderCols() {
    var cols = document.getElementById("utTxCols");
    if (!cols) return;
    var html =
      '<col class="ut-tx-col-check">' +
      '<col class="ut-tx-col-name">' +
      '<col class="ut-tx-col-outcome">' +
      '<col class="ut-tx-col-date">' +
      '<col class="ut-tx-col-product">' +
      '<col class="ut-tx-col-country">';
    if (showScoreColumn()) html += '<col class="ut-tx-col-score">';
    html +=
      '<col class="ut-tx-col-source">' + '<col class="ut-tx-col-type">';
    if (showTridColumn()) html += '<col class="ut-tx-col-trid">';
    html += '<col class="ut-tx-col-actions">';
    cols.innerHTML = html;
  }

  function applyToolbar() {
    var dateEl = document.getElementById("utTxDateWrap");
    var productEl = document.getElementById("utTxProductWrap");
    if (!dateEl || !productEl) return;

    var showDate =
      settings.toolbar === "only-date" || settings.toolbar === "date-and-product";
    var showProduct =
      settings.toolbar === "only-product" ||
      settings.toolbar === "date-and-product";

    dateEl.hidden = !showDate;
    productEl.hidden = !showProduct;
  }

  function applyTableMods() {
    var table = document.querySelector(".ut-tx-table");
    if (!table) return;
    table.classList.toggle("ut-tx-table--no-score", !showScoreColumn());
    table.classList.toggle("ut-tx-table--trid", showTridColumn());
    table.classList.toggle(
      "ut-tx-table--copy-icon",
      settings.transactionId === "copy-icon"
    );
    table.classList.toggle(
      "ut-tx-table--name-stack",
      settings.transaction !== "name-only" ||
        showNameTrid() ||
        settings.status === "status-icons"
    );
    table.classList.toggle("ut-tx-table--date-double", settings.date === "double-line");
    table.classList.toggle(
      "ut-tx-table--score-combined",
      settings.score === "combined-outcome"
    );
    table.classList.toggle("ut-tx-table--flag-only", settings.country === "flag-only");
  }

  function render() {
    renderCols();
    renderHead();
    applyToolbar();
    applyTableMods();
    var tbody = document.getElementById("utTxBody");
    if (!tbody) return;
    var html = "";
    rows.forEach(function (item) {
      html += rowHtml(item);
      if (
        item.expandable &&
        expandedRows[item.trid] &&
        item.children &&
        item.children.length
      ) {
        item.children.forEach(function (child, index) {
          html += rowHtml(child, {
            isChild: true,
            isLastChild: index === item.children.length - 1
          });
        });
      }
    });
    tbody.innerHTML = html;
    if (window.TdsDropdownPanel && typeof window.TdsDropdownPanel.initMenus === "function") {
      window.TdsDropdownPanel.initMenus(tbody);
    }
  }

  function bindSelectAll() {
    var selectAll = document.getElementById("utTxSelectAll");
    if (!selectAll) return;
    selectAll.addEventListener("change", function () {
      document.querySelectorAll(".ut-tx-row-check").forEach(function (box) {
        box.checked = selectAll.checked;
      });
    });
  }

  function openSettings() {
    var panel = document.getElementById("utTxSettings");
    var shell = document.getElementById("app-shell");
    var btn = document.getElementById("utTxSettingsBtn");
    if (!panel) return;
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    if (shell) shell.classList.add("ut-tx-settings-open");
    if (btn) btn.setAttribute("aria-expanded", "true");
    var closeBtn = panel.querySelector(".ut-tx-settings__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeSettings() {
    var panel = document.getElementById("utTxSettings");
    var shell = document.getElementById("app-shell");
    var btn = document.getElementById("utTxSettingsBtn");
    if (!panel) return;
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
    if (shell) shell.classList.remove("ut-tx-settings-open");
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    }
  }

  function flashCopyButton(btn) {
    if (!btn) return;
    if (!btn.dataset.copyUid) {
      copyUid += 1;
      btn.dataset.copyUid = String(copyUid);
    }
    hideTooltip();
    btn.classList.add("is-copied");
    btn.innerHTML = CHECK_ICON;
    btn.setAttribute("aria-label", "Copied");
    var prev = copyTimers.get(btn);
    if (prev) clearTimeout(prev);
    var timer = setTimeout(function () {
      btn.classList.remove("is-copied");
      btn.innerHTML = COPY_ICON;
      btn.setAttribute("aria-label", "Copy Transaction ID");
      copyTimers.delete(btn);
    }, 2000);
    copyTimers.set(btn, timer);
  }

  function copyTrid(trid, btn) {
    if (!trid) return;
    var done = function () {
      showToast("Transaction ID copied");
      if (btn) flashCopyButton(btn);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(trid).then(done).catch(done);
    } else {
      done();
    }
  }

  function bindSettings() {
    var btn = document.getElementById("utTxSettingsBtn");
    var panel = document.getElementById("utTxSettings");
    if (btn) {
      btn.addEventListener("click", function () {
        if (panel && !panel.hidden) closeSettings();
        else openSettings();
      });
    }

    if (panel) {
      panel.querySelectorAll(".ut-tx-settings__close").forEach(function (el) {
        el.addEventListener("click", closeSettings);
      });

      panel.addEventListener("change", function (e) {
        var input = e.target;
        if (!input || input.type !== "radio") return;
        var name = (input.name || "").replace(/^ut-set-/, "");
        if (!settings.hasOwnProperty(name)) return;
        settings[name] = input.value;
        saveSettings();
        syncRadios();
        render();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel && !panel.hidden) {
        e.preventDefault();
        closeSettings();
      }
    });

    document.addEventListener("click", function (e) {
      var expandBtn = e.target.closest(".ut-tx-expand");
      if (expandBtn) {
        e.preventDefault();
        var id = expandBtn.getAttribute("data-ut-expand");
        if (!id) return;
        if (expandedRows[id]) delete expandedRows[id];
        else expandedRows[id] = true;
        render();
        return;
      }

      var menuCopy = e.target.closest(".ut-tx-menu-copy");
      if (menuCopy) {
        e.preventDefault();
        copyTrid(menuCopy.getAttribute("data-trid"), null);
        return;
      }

      var copy = e.target.closest(".ut-tx-id-copy, .ut-tx-copy-trid");
      if (!copy) return;
      e.preventDefault();
      copyTrid(copy.getAttribute("data-trid"), copy);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadSettings();
    syncRadios();
    bindSettings();
    bindTooltips();
    render();
    var dismiss = document.getElementById("utTxToastDismiss");
    if (dismiss) dismiss.addEventListener("click", hideToast);
    if (window.TdsDropdownPanel && typeof window.TdsDropdownPanel.initMenus === "function") {
      window.TdsDropdownPanel.initMenus(document);
    }
  });
})();
