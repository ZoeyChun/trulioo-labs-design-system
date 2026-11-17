(function () {
  var rows = window.UT_TRANSACTIONS || [];
  var STORAGE_KEY = window.UT_TX_SETTINGS_KEY || "ut-tx-settings";
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
  /* Product cells expanded to their full list, keyed by trid so a re-render
     (autofit, resize) does not quietly collapse them. */
  var expandedProducts = {};
  var dateFilter = { start: null, end: null };
  var dateFilterBound = false;
  var searchQuery = "";
  var searchDisplay = "";
  var productFilter = "";
  var currentPage = 1;
  var lastFilterTotal = -1;
  /* Date column sort, newest first to match the unsorted order. */
  var dateSortDir = "desc";
  var DEFAULT_PAGE_SIZE = 15;
  var MIN_PAGE_SIZE = 3;
  var MAX_PAGE_SIZE = 50;
  var PAGE_SIZE = DEFAULT_PAGE_SIZE;
  var fitPageTimer = null;
  var fittingPageSize = false;
  var DATE_RANGE_FIELDS_HTML =
    '<div class="tds-date-picker-range__fields">' +
      '<div class="tds-date-picker" data-date-picker-part="start">' +
        '<button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false" aria-label="Filter by date">' +
          '<span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>' +
          '<span class="tds-date-picker__value tds-date-picker__placeholder visually-hidden">mm/dd/yyyy</span>' +
          '<span class="ut-tx-date__label tds-date-picker__placeholder">mm/dd/yyyy</span>' +
          '<span class="ut-tx-date__clear" hidden role="button" tabindex="0" aria-label="Clear date">' +
            '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>' +
          "</span>" +
        "</button>" +
      "</div>" +
      '<div class="tds-date-picker ut-tx-date__end" data-date-picker-part="end">' +
        '<button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false" tabindex="-1" aria-label="End date">' +
          '<span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>' +
        "</button>" +
      "</div>" +
    "</div>";
  var aiRowFilter = null;
  var applyingAiView = false;
  var panelFilters = {
    outcomes: [],
    products: [],
    country: "",
    countries: [],
    risks: [],
    sources: [],
    types: [],
    packages: [],
    typeMode: "",
    user: "",
    watchlist: []
  };
  var OUTCOME_LABELS = {
    positive: ["Verified", "No Hits Found"],
    intermediate: ["Review", "Pending Review"],
    negative: ["Not Verified", "Hits Found"],
    "not-completed": [
      "Abandoned",
      "Timed Out",
      "Failed",
      "Not Started",
      "Not Complete",
      "In Progress"
    ]
  };
  /* Products beyond this many collapse behind a "+N more" button. */
  var PRODUCT_COLLAPSE_AFTER = 8;

  var KYC_DATA_PACKAGES = ["Package1_KYC_Doc", "Package2_KYC_Doc"];
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

  function highlightMatch(text) {
    var raw = String(text == null ? "" : text);
    if (!searchQuery) return escapeHtml(raw);
    var lower = raw.toLowerCase();
    var q = searchQuery;
    if (!q || lower.indexOf(q) === -1) return escapeHtml(raw);
    var out = "";
    var i = 0;
    var idx;
    while ((idx = lower.indexOf(q, i)) !== -1) {
      out += escapeHtml(raw.slice(i, idx));
      out +=
        '<mark class="ut-tx-search-mark">' +
        escapeHtml(raw.slice(idx, idx + q.length)) +
        "</mark>";
      i = idx + q.length;
    }
    out += escapeHtml(raw.slice(i));
    return out;
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
    if (settings.date === "12hr") settings.date = "long";
    if (settings.date === "24hr") settings.date = "numeric";
    /* The page decides this one, not a stored preference — otherwise anyone
       who opened this view before would keep the old name-only rows. */
    if (window.UT_TX_NAME_TRID) settings.transaction = "name-trid";
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

  function showTypeColumn() {
    return !window.UT_TX_NO_TYPE_COLUMN;
  }

  /* What the Source column shows. Rows may name who or what ran the check —
     an API key, a portal user, or a Workflow Studio workflow — in which case
     that wins over the bare channel ("API" / "Portal" / "Workflow"). */
  function sourceText(item) {
    return item.sourceLabel || item.source || "";
  }

  function allSources() {
    return uniqueSorted(
      rows.map(function (item) {
        return sourceText(item);
      })
    );
  }

  /* Opt-in column: the package (the named bundle of checks) a row ran under. */
  function showPackageColumn() {
    return !!window.UT_TX_PACKAGE_COLUMN;
  }

  function allPackages() {
    var values = [];
    rows.forEach(function (item) {
      itemPackages(item).forEach(function (pkg) {
        values.push(pkg);
      });
    });
    return uniqueSorted(values);
  }

  /* A package belongs to one product — the product of the transactions that
     ran it. Read it off the rows so the filter can never disagree with the
     table. A package spanning products (bad data) reports the first it sees. */
  function packageProduct(pkg) {
    var product = "";
    rows.forEach(function (item) {
      if (!product && itemPackages(item).indexOf(pkg) !== -1) {
        product = item.product || "";
      }
    });
    return product;
  }

  /* With UT_TX_SCORE_IN_OUTCOME the risk label + score sit beside the
     outcome tag instead of in their own column. */
  function scoreInOutcome() {
    return !!window.UT_TX_SCORE_IN_OUTCOME;
  }

  function showScoreColumn() {
    if (scoreInOutcome()) return false;
    if (window.UT_TX_PLAIN_TABLE) return true;
    return settings.score === "separate-column";
  }

  function showNameTrid() {
    return settings.transaction === "name-trid";
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function parseMmDdYyyy(text) {
    var parts = String(text || "").trim().split("/");
    if (parts.length !== 3) return null;
    var month = Number(parts[0]);
    var day = Number(parts[1]);
    var year = Number(parts[2]);
    if (!year || !month || !day) return null;
    return year + "-" + pad2(month) + "-" + pad2(day);
  }

  function parsePickerValue(el) {
    if (!el || el.classList.contains("tds-date-picker__placeholder")) return null;
    return parseMmDdYyyy(el.textContent);
  }

  function itemDateKey(item) {
    var numeric = item.dateNumeric || "";
    var match = numeric.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (match) {
      return match[3] + "-" + pad2(Number(match[1])) + "-" + pad2(Number(match[2]));
    }
    var d = new Date(item.date);
    if (isNaN(d.getTime())) return "";
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  /* Sortable timestamp for a row. Prefers dateNumeric ("MM/DD/YYYY, HH:MM")
     so the time of day breaks ties within a day; falls back to parsing
     item.date. Rows without a usable date sink to the bottom either way. */
  function itemDateValue(item) {
    var numeric = item.dateNumeric || "";
    var match = numeric.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,\s*(\d{1,2}):(\d{2}))?/);
    if (match) {
      return new Date(
        Number(match[3]),
        Number(match[1]) - 1,
        Number(match[2]),
        Number(match[4] || 0),
        Number(match[5] || 0)
      ).getTime();
    }
    var d = new Date(item.date);
    return isNaN(d.getTime()) ? null : d.getTime();
  }

  function dateSortEnabled() {
    return !!window.UT_TX_SORT_DATE_ONLY;
  }

  function sortByDate(list) {
    var dir = dateSortDir === "asc" ? 1 : -1;
    return list.slice().sort(function (a, b) {
      var av = itemDateValue(a);
      var bv = itemDateValue(b);
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      return (av - bv) * dir;
    });
  }

  function matchesDateFilter(item) {
    if (!dateFilter.start) return true;
    var day = itemDateKey(item);
    if (!day) return true;
    var start = dateFilter.start;
    var end = dateFilter.end || dateFilter.start;
    return day >= start && day <= end;
  }

  function uniqueSorted(values) {
    return values
      .filter(Boolean)
      .filter(function (v, i, arr) {
        return arr.indexOf(v) === i;
      })
      .sort(function (a, b) {
        return String(a).localeCompare(String(b));
      });
  }

  /* A transaction can run more than one product. item.product stays the
     primary one (what the column leads with); extras ride along in
     item.extraProducts and count everywhere the primary does. */
  function itemProducts(item) {
    var list = [item.product];
    if (item.extraProducts && item.extraProducts.length) {
      list = list.concat(item.extraProducts);
    }
    return list.filter(Boolean);
  }

  function allProducts() {
    var list = [];
    rows.forEach(function (item) {
      list = list.concat(itemProducts(item));
      if (item.children) {
        item.children.forEach(function (child) {
          list = list.concat(itemProducts(child));
        });
      }
    });
    return uniqueSorted(list);
  }

  function allCountries() {
    return uniqueSorted(rows.map(function (item) {
      return item.country;
    }));
  }

  function outcomeGroup(item) {
    var label = (item.outcome && item.outcome.label) || "";
    var keys = Object.keys(OUTCOME_LABELS);
    for (var i = 0; i < keys.length; i++) {
      if (OUTCOME_LABELS[keys[i]].indexOf(label) !== -1) return keys[i];
    }
    return "";
  }

  function riskBucket(item) {
    if (!item.score || !item.score.label) return "";
    var label = item.score.label.toLowerCase();
    if (label.indexOf("high") !== -1) return "high";
    if (label.indexOf("medium") !== -1) return "medium";
    if (label.indexOf("low") !== -1) return "low";
    return "";
  }

  function watchlistBucket(item) {
    var product = item.product || "";
    if (product.indexOf("Watchlist") === -1) return "";
    var label = ((item.outcome && item.outcome.label) || "").toLowerCase();
    if (label.indexOf("no hits") !== -1 || label === "clear") return "no-hit";
    if (label.indexOf("hit") !== -1) return "hit";
    return "";
  }

  /* Live / Demo switch (a segmented control, not a checkbox group). Live is
     the default, so the table opens on real traffic and the badge only counts
     the switch once it has been moved off that default. */
  var TYPE_MODE_DEFAULT = "Live";

  function typeSwitchEl() {
    return document.getElementById("utFiltTypeSwitch");
  }

  function currentTypeMode() {
    var host = typeSwitchEl();
    if (!host) return "";
    var pressed = host.querySelector('[data-ut-type][aria-pressed="true"]');
    return pressed ? pressed.getAttribute("data-ut-type") : TYPE_MODE_DEFAULT;
  }

  function setTypeMode(mode) {
    var host = typeSwitchEl();
    if (!host) return;
    Array.prototype.forEach.call(host.querySelectorAll("[data-ut-type]"), function (btn) {
      var on = btn.getAttribute("data-ut-type") === mode;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("tds-segmented-control__item--selected", on);
    });
  }

  function bindTypeSwitch() {
    var host = typeSwitchEl();
    if (!host || host.dataset.bound) return;
    host.dataset.bound = "1";
    setTypeMode(currentTypeMode() || TYPE_MODE_DEFAULT);
    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-ut-type]");
      if (!btn || btn.getAttribute("aria-pressed") === "true") return;
      setTypeMode(btn.getAttribute("data-ut-type"));
      currentPage = 1;
      syncPanelFiltersFromDom();
      updateFilterChrome();
      render();
    });
  }

  /* A facet can be offered in two places at once (a quick filter in the
     toolbar and the same group mirrored in the Filters drawer), so the same
     value can come back twice. Collapse it — activeFilterCount() counts
     these, and a doubled value would read as two filters. */
  function selectedValues(name) {
    var seen = [];
    Array.prototype.slice
      .call(document.querySelectorAll('input[name="' + name + '"]:checked'))
      .forEach(function (el) {
        if (seen.indexOf(el.value) === -1) seen.push(el.value);
      });
    return seen;
  }

  /* Keep every copy of a facet in lockstep: tick "High Risk" in the toolbar
     and the drawer's copy ticks too, and vice versa. */
  function mirrorFilterInput(input) {
    if (!input || !input.name || input.name.indexOf("ut-filt-") !== 0) return;
    document
      .querySelectorAll(
        'input[name="' + input.name + '"][value="' + cssEscapeValue(input.value) + '"]'
      )
      .forEach(function (el) {
        if (el !== input) el.checked = input.checked;
      });
  }

  function cssEscapeValue(value) {
    return String(value).replace(/["\\]/g, "\\$&");
  }

  function syncPanelFiltersFromDom() {
    panelFilters.outcomes = selectedValues("ut-filt-outcome");
    panelFilters.products = selectedValues("ut-filt-product");
    panelFilters.risks = selectedValues("ut-filt-risk");
    panelFilters.sources = sourceSelect.el()
      ? sourceSelect.get()
      : selectedValues("ut-filt-source");
    panelFilters.types = selectedValues("ut-filt-type");
    panelFilters.packages = packageSelect.el()
      ? packageSelect.get()
      : selectedValues("ut-filt-package");
    panelFilters.countries = selectedValues("ut-filt-country");
    panelFilters.typeMode = currentTypeMode();
    panelFilters.watchlist = selectedValues("ut-filt-watchlist");
    var countryEl = document.getElementById("utFiltCountrySelect");
    var userEl = document.getElementById("utFiltUserSelect");
    panelFilters.country = countryEl && countryEl.value ? countryEl.value : "";
    /* The Source menu stores its own list on panelFilters.sources. user is
       only the legacy single-select, so it must stay empty here or the same
       choice is counted twice. */
    panelFilters.user = sourceSelect.el()
      ? ""
      : userEl && userEl.value
      ? userEl.value
      : "";
  }

  /* Two different numbers, and conflating them is what made the two Clear
     buttons disagree:

       activeFilterCount()      — what the "More filters" badge counts. On
                                  pages that lift Outcome / Risk / Country
                                  into the toolbar, those have their own
                                  per-facet counters, so counting them here
                                  too would double-report them.
       totalActiveFilterCount() — is anything filtered at all, wherever it
                                  was set. Drives every Clear control, so
                                  they all appear and disappear together. */
  function activeFilterCount() {
    var inline = !!window.UT_INLINE_FILTERS;
    return (
      totalActiveFilterCount() -
      (inline
        ? panelFilters.outcomes.length +
          panelFilters.risks.length +
          panelFilters.countries.length
        : 0)
    );
  }

  function totalActiveFilterCount() {
    return (
      panelFilters.outcomes.length +
      panelFilters.products.length +
      panelFilters.risks.length +
      panelFilters.countries.length +
      (panelFilters.typeMode && panelFilters.typeMode !== TYPE_MODE_DEFAULT ? 1 : 0) +
      panelFilters.sources.length +
      panelFilters.types.length +
      panelFilters.packages.length +
      panelFilters.watchlist.length +
      (panelFilters.country ? 1 : 0) +
      (panelFilters.user ? 1 : 0) +
      /* The date range narrows the table like anything else, and clearAllFilters
         resets it — but it was missing from this tally, so with only a date set
         both Clear controls believed nothing was filtered and stayed hidden. */
      (dateFilter.start ? 1 : 0) +
      (productFilter ? 1 : 0)
    );
  }

  function updateFilterChrome() {
    updateFacetChips();
    var count = activeFilterCount();
    var total = totalActiveFilterCount();
    var clearBtn = document.getElementById("utTxFiltersClear");
    var countEl = document.getElementById("utTxFilterCount");
    var filterWrap = document.getElementById("utTxFilter");
    /* Both Clear controls answer to the same question — is anything filtered
       anywhere — so they never contradict each other. */
    if (clearBtn) clearBtn.disabled = total === 0;
    var quickClear = document.getElementById("utTxQuickClear");
    if (quickClear) quickClear.hidden = total === 0;
    if (countEl) {
      countEl.textContent = String(count);
      /* The active facets show as their own buttons in the toolbar now, so
         the More filters button stays plain rather than carrying a tally. */
      countEl.hidden = count === 0 || !!window.UT_TX_FACET_CHIPS;
    }
    if (filterWrap) {
      /* --selected swaps the button's label for its counter, which is the
         behaviour the chips replace: the button has to keep reading
         "More filters" however many facets are set. */
      var chrome = !window.UT_TX_FACET_CHIPS;
      filterWrap.classList.toggle("tds-filter-button--selected", chrome && count > 0);
      filterWrap.classList.toggle("tds-filter-button--multi", chrome && count > 1);
    }
  }

  function matchesPanelFilters(item) {
    if (panelFilters.outcomes.length) {
      if (panelFilters.outcomes.indexOf(outcomeGroup(item)) === -1) return false;
    }
    if (panelFilters.products.length) {
      var hasProduct = itemProducts(item).some(function (product) {
        return panelFilters.products.indexOf(product) !== -1;
      });
      if (!hasProduct) return false;
    }
    if (panelFilters.countries.length) {
      if (panelFilters.countries.indexOf(item.country) === -1) return false;
    } else if (panelFilters.country && item.country !== panelFilters.country) {
      return false;
    }
    if (panelFilters.typeMode && item.type !== panelFilters.typeMode) return false;
    if (panelFilters.risks.length) {
      var risk = riskBucket(item);
      if (!risk || panelFilters.risks.indexOf(risk) === -1) return false;
    }
    if (panelFilters.sources.length) {
      var sourceHit = sourceSelect.el()
        ? panelFilters.sources.indexOf(sourceText(item)) !== -1
        : panelFilters.sources.indexOf(item.source) !== -1;
      if (!sourceHit) return false;
    }
    if (panelFilters.types.length) {
      if (panelFilters.types.indexOf(item.type) === -1) return false;
    }
    if (panelFilters.packages.length) {
      var pkgs = itemPackages(item);
      var packageHit = panelFilters.packages.some(function (pkg) {
        return pkgs.indexOf(pkg) !== -1;
      });
      if (!packageHit) return false;
    }
    if (panelFilters.user) {
      /* Rows that name their own source match on that directly. Rows without
         one fall back to the original user-to-channel mapping. */
      if (item.sourceLabel) {
        if (item.sourceLabel !== panelFilters.user) return false;
      } else {
        if (panelFilters.user === "ABC-Service-Worker-1675118759" && item.source !== "Workflow") {
          return false;
        }
        if (panelFilters.user === "Test_API_Key" && item.source !== "API") {
          return false;
        }
        if (panelFilters.user === "Pria_K_Prod" && item.source !== "Portal") {
          return false;
        }
      }
    }
    if (panelFilters.watchlist.length) {
      var watch = watchlistBucket(item);
      if (!watch || panelFilters.watchlist.indexOf(watch) === -1) return false;
    }
    return true;
  }

  function matchesSearch(item) {
    if (!searchQuery) return true;
    if (isClientIdSearch()) {
      return CLIENT_ID_NAMES.indexOf(item.name) !== -1;
    }
    var hay = [
      item.name,
      item.country,
      item.trid,
      item.detail,
      itemProducts(item).join(" "),
      item.package
    ]
      .join(" ")
      .toLowerCase();
    return hay.indexOf(searchQuery) !== -1;
  }

  function matchesProductFilter(item) {
    if (!productFilter) return true;
    if (itemProducts(item).indexOf(productFilter) !== -1) return true;
    if (item.children) {
      return item.children.some(function (child) {
        return child.product === productFilter;
      });
    }
    return false;
  }

  function filteredRows() {
    return rows.filter(function (item) {
      return (
        matchesDateFilter(item) &&
        matchesPanelFilters(item) &&
        matchesSearch(item) &&
        matchesProductFilter(item) &&
        (!aiRowFilter || aiRowFilter(item))
      );
    });
  }

  function isUnsuccessful(item) {
    var outcome = item.outcome || {};
    if (outcome.tone === "negative") return true;
    if (outcomeGroup(item) === "negative") return true;
    return outcome.label === "Failed" || outcome.label === "Flagged";
  }

  function latestTransactionDay() {
    var latest = "";
    rows.forEach(function (item) {
      var key = itemDateKey(item);
      if (key && key > latest) latest = key;
    });
    return latest;
  }

  function shiftIso(iso, days) {
    var parts = iso.split("-");
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    date.setDate(date.getDate() + days);
    return date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate());
  }

  function writePickerPart(part, iso) {
    var range = document.getElementById("utTxDateWrap");
    if (!range) return;
    var root = range.querySelector('[data-date-picker-part="' + part + '"]');
    if (!root) return;
    var text = iso ? formatPickerDisplay(iso) : "mm/dd/yyyy";
    root.querySelectorAll(".tds-date-picker__value").forEach(function (el) {
      el.textContent = text;
      el.classList.toggle("tds-date-picker__placeholder", !iso);
    });
  }

  function snapshotRows(list) {
    return list.map(function (item) {
      return {
        name: item.name,
        trid: item.trid || "",
        detail: item.detail || "",
        outcome: (item.outcome && item.outcome.label) || "",
        tone: (item.outcome && item.outcome.tone) || "",
        date: item.date,
        product: item.product,
        country: item.country,
        countryCode: item.countryCode || "",
        source: item.source || "",
        type: item.type || "",
        risk: riskBucket(item),
        scoreLabel: (item.score && item.score.label) || "",
        scoreValue: (item.score && item.score.value) || "",
        scoreTone: (item.score && item.score.tone) || ""
      };
    });
  }

  function setCheckboxGroup(name, values) {
    var wanted = values || [];
    document.querySelectorAll('input[name="' + name + '"]').forEach(function (el) {
      el.checked = wanted.indexOf(el.value) !== -1;
    });
  }

  function setSearchInput(value) {
    searchQuery = (value || "").trim().toLowerCase();
    searchDisplay = value || "";
    var input = document.getElementById("utTxSearch");
    if (input) input.value = searchDisplay;
    syncSearchClearVisibility();
  }

  function applyAiSpec(spec) {
    spec = spec || {};
    applyingAiView = true;

    if (spec.clear || spec.reset) {
      aiRowFilter = null;
      dateFilter.start = null;
      dateFilter.end = null;
      writePickerPart("start", null);
      writePickerPart("end", null);
      setSearchInput("");
      productFilter = "";
      var productSelect = document.getElementById("utTxProduct");
      if (productSelect) productSelect.value = "";
      clearAllFilters();
    }

    if (spec.search != null) setSearchInput(spec.search);

    if (spec.product != null) {
      productFilter = spec.product || "";
      var prodEl = document.getElementById("utTxProduct");
      if (prodEl) prodEl.value = productFilter;
    }

    if (spec.outcomes) setCheckboxGroup("ut-filt-outcome", spec.outcomes);
    if (spec.risks) setCheckboxGroup("ut-filt-risk", spec.risks);
    if (spec.sources) {
      setCheckboxGroup("ut-filt-source", spec.sources);
      if (sourceSelect.el()) sourceSelect.set(spec.sources);
    }
    if (spec.packages) {
      setCheckboxGroup("ut-filt-package", spec.packages);
      if (packageSelect.el()) packageSelect.set(spec.packages);
    }
    if (spec.types) setCheckboxGroup("ut-filt-type", spec.types);
    if (spec.products) setCheckboxGroup("ut-filt-product", spec.products);
    if (spec.watchlist) setCheckboxGroup("ut-filt-watchlist", spec.watchlist);

    if (spec.country != null) {
      var countryEl = document.getElementById("utFiltCountrySelect");
      if (countryEl) countryEl.value = spec.country || "";
    }

    if (spec.dateDays != null && spec.dateDays > 0) {
      var end = latestTransactionDay();
      if (end) {
        dateFilter.end = end;
        dateFilter.start = shiftIso(end, -(spec.dateDays - 1));
        writePickerPart("start", dateFilter.start);
        writePickerPart("end", dateFilter.end);
      }
    } else if (spec.dateStart || spec.dateEnd) {
      dateFilter.start = spec.dateStart || null;
      dateFilter.end = spec.dateEnd || null;
      writePickerPart("start", dateFilter.start);
      writePickerPart("end", dateFilter.end);
    }

    if (spec.predicate === "unsuccessful") aiRowFilter = isUnsuccessful;
    else if (spec.predicate === "review") {
      aiRowFilter = function (item) {
        return outcomeGroup(item) === "intermediate";
      };
    } else if (spec.predicate === "high-risk") {
      aiRowFilter = function (item) {
        return riskBucket(item) === "high" || (item.score && item.score.tone === "negative");
      };
    } else if (spec.predicate === null) {
      aiRowFilter = null;
    } else if (typeof spec.predicate === "function") {
      aiRowFilter = spec.predicate;
    }

    syncPanelFiltersFromDom();
    updateFilterChrome();
    updateToolbarFilterChrome();
    updateSearchStatus();
    currentPage = 1;
    render();
    applyingAiView = false;

    var visible = filteredRows();
    return {
      matches: snapshotRows(visible),
      total: rows.length,
      visibleCount: visible.length,
      filters: {
        search: searchDisplay,
        product: productFilter,
        outcomes: panelFilters.outcomes.slice(),
        risks: panelFilters.risks.slice(),
        country: panelFilters.country,
        dateStart: dateFilter.start,
        dateEnd: dateFilter.end,
        predicate: spec.predicate || null
      }
    };
  }

  function getAiState() {
    var visible = filteredRows();
    return {
      all: snapshotRows(rows),
      visible: snapshotRows(visible),
      total: rows.length,
      visibleCount: visible.length,
      search: searchDisplay,
      product: productFilter,
      filters: {
        outcomes: panelFilters.outcomes.slice(),
        products: panelFilters.products.slice(),
        risks: panelFilters.risks.slice(),
        sources: panelFilters.sources.slice(),
        types: panelFilters.types.slice(),
        country: panelFilters.country,
        watchlist: panelFilters.watchlist.slice()
      },
      date: { start: dateFilter.start, end: dateFilter.end }
    };
  }

  function showFailedLast7Days() {
    return applyAiSpec({
      clear: true,
      dateDays: 7,
      predicate: "unsuccessful"
    }).matches;
  }

  function clearAiView() {
    if (!aiRowFilter && !dateFilter.start && !searchQuery && !productFilter && activeFilterCount() === 0) {
      return;
    }
    applyAiSpec({ clear: true, predicate: null });
  }

  /* How a nested child reads. "compact": only the id it ran under and its
     package, since the business, verdict, date, country and source belong to
     the transaction above it. "full": those columns repeated down the group,
     which is how it read before. The corner toggle switches between the two
     so the two can be put side by side. */
  var CHILD_VIEW_KEY = "ut-tx-child-view";
  var childView = "compact";

  function readChildView() {
    try {
      var q = new URLSearchParams(window.location.search).get("childView");
      if (q === "full" || q === "compact") return q;
      return window.localStorage.getItem(CHILD_VIEW_KEY) === "full" ? "full" : "compact";
    } catch (e) {
      return "compact";
    }
  }

  function childCompact() {
    return childView === "compact";
  }

  function applyChildView(next, persist) {
    childView = next === "full" ? "full" : "compact";
    document.documentElement.setAttribute("data-ut-child-view", childView);
    if (persist) {
      try {
        window.localStorage.setItem(CHILD_VIEW_KEY, childView);
      } catch (e) {
        /* the demo does not depend on it */
      }
    }
    document.querySelectorAll("[data-ut-child-view-set]").forEach(function (btn) {
      btn.setAttribute(
        "aria-pressed",
        btn.getAttribute("data-ut-child-view-set") === childView ? "true" : "false"
      );
    });
  }

  function bindChildView() {
    applyChildView(readChildView(), false);
    var host = document.getElementById("utTxChildView");
    if (!host) return;
    host.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-ut-child-view-set]");
      if (!btn) return;
      applyChildView(btn.getAttribute("data-ut-child-view-set"), true);
      render();
    });
  }

  window.UTTransactions = {
    showFailedLast7Days: showFailedLast7Days,
    clearAiView: clearAiView,
    applySpec: applyAiSpec,
    clearFilters: clearAllFilters,
    getState: getAiState,
    snapshot: function () {
      return snapshotRows(rows);
    }
  };

  function pageCount(total) {
    if (!total) return 1;
    return Math.max(1, Math.ceil(total / PAGE_SIZE));
  }

  /* Fit rows to the visible table section so the body doesn't need a
     vertical scrollbar. Recomputed on resize / layout changes. */
  function measurePageSize() {
    /* With UT_TX_PAGE_SIZE the page shows a fixed number of rows and the
       column scrolls to reach them, instead of trimming the count to whatever
       happens to fit the window. */
    if (window.UT_TX_NO_PAGINATION) return MAX_PAGE_SIZE;
    if (window.UT_TX_PAGE_SIZE) return window.UT_TX_PAGE_SIZE;
    var section =
      document.querySelector(".th-tx .ut-tx-table-section") ||
      document.querySelector(".ut-tx-table-section");
    if (!section) return DEFAULT_PAGE_SIZE;
    var sectionH = section.clientHeight;
    if (sectionH < 96) return DEFAULT_PAGE_SIZE;

    var footer = document.getElementById("utTxFooter");
    var footerH =
      footer && footer.offsetHeight ? footer.offsetHeight : 48;
    var thead = document.querySelector(".ut-tx-table thead");
    var theadH =
      thead && thead.offsetHeight ? thead.offsetHeight : 27;
    var rowH = 40;
    var sample = document.querySelector(
      ".ut-tx-table tbody tr.ut-tx-row:not(.ut-tx-row--child)"
    );
    if (sample) {
      var measured = sample.getBoundingClientRect().height;
      if (measured > 0) rowH = measured;
    }

    var bodySpace = sectionH - footerH - theadH - 2;
    var next = Math.floor(bodySpace / rowH);
    if (next < MIN_PAGE_SIZE) next = MIN_PAGE_SIZE;
    if (next > MAX_PAGE_SIZE) next = MAX_PAGE_SIZE;
    return next;
  }

  function syncPageSize() {
    var next = measurePageSize();
    if (next === PAGE_SIZE) return false;
    PAGE_SIZE = next;
    return true;
  }

  function scheduleFitPageSize() {
    if (fitPageTimer) window.clearTimeout(fitPageTimer);
    fitPageTimer = window.setTimeout(function () {
      fitPageTimer = null;
      if (fittingPageSize) return;
      fittingPageSize = true;
      try {
        if (syncPageSize()) render();
      } finally {
        fittingPageSize = false;
      }
    }, 80);
  }

  function pagedRows() {
    var list = filteredRows();
    if (dateSortEnabled()) list = sortByDate(list);
    var total = list.length;
    if (lastFilterTotal !== -1 && lastFilterTotal !== total) currentPage = 1;
    lastFilterTotal = total;
    var pages = pageCount(total);
    if (currentPage > pages) currentPage = pages;
    if (currentPage < 1) currentPage = 1;
    var start = (currentPage - 1) * PAGE_SIZE;
    return {
      list: list.slice(start, start + PAGE_SIZE),
      total: total,
      start: start
    };
  }

  function renderFooter(total) {
    var footer = document.getElementById("utTxFooter");
    if (!footer) return;
    /* One list, so the footer is a count rather than a pager. */
    if (window.UT_TX_NO_PAGINATION) {
      footer.innerHTML =
        '<div class="tds-data-table__footer-counter">' +
        total +
        (total === 1 ? " transaction" : " transactions") +
        "</div>";
      return;
    }
    var pages = pageCount(total);
    var start = total ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
    var end = Math.min(currentPage * PAGE_SIZE, total);
    var pageButtons = "";
    for (var i = 1; i <= pages; i += 1) {
      pageButtons +=
        '<button type="button" class="tds-data-table__pagination-page' +
        (i === currentPage ? " tds-data-table__pagination-page--active" : "") +
        '" data-ut-page="' +
        i +
        '"' +
        (i === currentPage ? ' aria-current="page"' : "") +
        ">" +
        i +
        "</button>";
    }
    footer.innerHTML =
      '<div class="tds-data-table__footer-counter">' +
      start +
      "–" +
      end +
      " of " +
      total +
      "</div>" +
      '<div class="tds-data-table__footer-pagination">' +
      '<div class="tds-data-table__pagination">' +
      '<button type="button" class="tds-data-table__pagination-direction tds-data-table__pagination-direction--previous" data-ut-page-dir="prev"' +
      (currentPage === 1 ? " disabled" : "") +
      ">" +
      '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M10 3 5.5 8 10 13"/></svg>' +
      "Previous</button>" +
      '<div class="tds-data-table__pagination-pages">' +
      pageButtons +
      "</div>" +
      '<button type="button" class="tds-data-table__pagination-direction tds-data-table__pagination-direction--next" data-ut-page-dir="next"' +
      (currentPage === pages ? " disabled" : "") +
      ">Next" +
      '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 3 10.5 8 6 13"/></svg>' +
      "</button></div></div>";
  }

  /* The thead is rewritten on every render, so delegate from the <thead>
     itself (which persists) and guard the listener with a bound flag. */
  function bindSort() {
    var head = document.getElementById("utTxHead");
    if (!head || head.dataset.bound) return;
    head.dataset.bound = "1";
    head.addEventListener("click", function (e) {
      var th = e.target.closest('[data-ut-sort="date"]');
      if (!th) return;
      e.preventDefault();
      dateSortDir = dateSortDir === "asc" ? "desc" : "asc";
      currentPage = 1;
      render();
      var btn = document.querySelector('[data-ut-sort="date"] .ut-tx-sort');
      if (btn) btn.focus();
    });
  }

  function bindPagination() {
    var footer = document.getElementById("utTxFooter");
    if (!footer || footer.dataset.bound) return;
    footer.dataset.bound = "1";
    footer.addEventListener("click", function (e) {
      var pageBtn = e.target.closest("[data-ut-page]");
      if (pageBtn) {
        e.preventDefault();
        currentPage = Number(pageBtn.getAttribute("data-ut-page")) || 1;
        render();
        return;
      }
      var dirBtn = e.target.closest("[data-ut-page-dir]");
      if (!dirBtn || dirBtn.disabled) return;
      e.preventDefault();
      if (dirBtn.getAttribute("data-ut-page-dir") === "prev") currentPage -= 1;
      else currentPage += 1;
      render();
    });
  }

  function productOptionHtml(product, opts) {
    opts = opts || {};
    var cls = "ut-tx-filters__option";
    if (opts.nested) cls += " ut-tx-filters__option--nested";
    var attrs = opts.hidden ? ' hidden data-ut-filt-extra="1"' : "";
    var name = opts.nested ? "ut-filt-kyc-package" : "ut-filt-product";
    return (
      '<label class="' +
      cls +
      '"' +
      attrs +
      '><input class="tds-checkbox" type="checkbox" name="' +
      name +
      '" value="' +
      escapeHtml(product) +
      '"><span class="ut-tx-filters__option-text"><span class="ut-tx-filters__option-label ut-tx-filters__option-label--regular">' +
      escapeHtml(product) +
      "</span></span></label>"
    );
  }

  /* The catalogue reads as a ladder, so list it that way rather than
     alphabetically. Anything not named here keeps alphabetical order at the
     end, so a new product still appears. */
  var PRODUCT_ORDER = [
    "Business Essentials",
    "Business Insights",
    "Business Complete",
    "Business Horizon"
  ];

  function orderProducts(list) {
    return list.slice().sort(function (a, b) {
      var ia = PRODUCT_ORDER.indexOf(a);
      var ib = PRODUCT_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return String(a).localeCompare(String(b));
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }

  function buildProductOptions() {
    var host = document.getElementById("utFiltProductOptions");
    if (!host) return;
    var products = orderProducts(allProducts());
    var html = "";
    /* Collapse the tail only when there is a tail worth collapsing. The old
       threshold of 3 hid two of five products behind a "+1 more" button on
       pages with a short catalogue — friction with nothing to show for it, on
       the one surface meant to list every facet. Long catalogues still
       collapse, so Source and Package stay above the fold. */
    var collapseFrom =
      products.length > PRODUCT_COLLAPSE_AFTER
        ? PRODUCT_COLLAPSE_AFTER
        : products.length;
    products.forEach(function (product, index) {
      var hidden = index >= collapseFrom;
      html += productOptionHtml(product, { hidden: hidden });
      if (product === "KYC Data") {
        KYC_DATA_PACKAGES.forEach(function (pkg) {
          html += productOptionHtml(pkg, { nested: true, hidden: hidden });
        });
      }
    });
    var extra = products.length - collapseFrom;
    if (extra > 0) {
      html +=
        '<button type="button" class="tds-btn tds-btn--sm tds-btn--secondary ut-tx-filters__more" id="utFiltProductMore" data-extra="' +
        extra +
        '">' +
        '<span class="tds-btn__leading-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 3.5v9M3.5 8h9"/></svg>' +
        "</span>" +
        "<span>" +
        extra +
        (extra === 1 ? " more product" : " more products") +
        "</span></button>";
    }
    host.innerHTML = html;
  }

  function buildCountryOptions() {
    var select = document.getElementById("utFiltCountrySelect");
    if (!select) return;
    var current = select.value;
    var html = '<option value="" selected disabled>Select Country</option>';
    allCountries().forEach(function (country) {
      html +=
        '<option value="' +
        escapeHtml(country) +
        '">' +
        escapeHtml(country) +
        "</option>";
    });
    select.innerHTML = html;
    if (current) select.value = current;
  }

  /* ---- Filter selects ----
     Source and Package use the DS Combobox: the field itself is the search,
     and the menu is a multi-select list of action-list items (label + quieter
     description). Nothing selected means every value. */
  var CHECK_ICON_SM =
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5"/></svg>';

  function filterSelectItemHtml(key, value, label, description) {
    var search = (label + " " + (description || "")).toLowerCase();
    return (
      '<button type="button" class="tds-action-list-item" role="option" aria-checked="false" aria-selected="false" data-ut-' +
      key +
      '="' +
      escapeHtml(value) +
      '" data-ut-search="' +
      escapeHtml(search) +
      '"><span class="tds-action-list-item__check" aria-hidden="true">' +
      CHECK_ICON_SM +
      '</span><span class="tds-action-list-item__content"><span class="tds-action-list-item__label">' +
      escapeHtml(label) +
      "</span>" +
      (description
        ? '<span class="tds-action-list-item__description">' +
          escapeHtml(description) +
          "</span>"
        : "") +
      "</span></button>"
    );
  }

  function listFrom(value) {
    if (Array.isArray(value)) {
      return value.filter(function (v) {
        return !!v;
      });
    }
    if (!value) return [];
    return [String(value)];
  }

  /* config: { key, wrapperId, valueId, panelId, placeholder, options() } */
  function createFilterSelect(config) {
    var attr = "data-ut-" + config.key;
    var filtering = false;

    function wrapperEl() {
      return document.getElementById(config.wrapperId);
    }

    function inputEl() {
      return document.getElementById(config.valueId);
    }

    function menuEl() {
      var el = wrapperEl();
      return el ? el.querySelector(".tds-combobox__menu") : null;
    }

    /* The panel is portaled with its menu shell while open. Reach it by id. */
    function panelEl() {
      return document.getElementById(config.panelId);
    }

    function fieldEl() {
      var el = wrapperEl();
      return el ? el.querySelector(".tds-combobox__field") : null;
    }

    function get() {
      var el = wrapperEl();
      if (!el) return [];
      var raw = el.getAttribute("data-ut-value") || "";
      if (!raw) return [];
      try {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return listFrom(parsed);
      } catch (err) {}
      return [raw];
    }

    function summaryText(list) {
      if (!list.length) return "";
      if (list.length === 1) return list[0];
      return list.length + " selected";
    }

    function syncInputDisplay() {
      var input = inputEl();
      /* While the menu is open the field is the search box — don't overwrite
         what the user is typing (or an empty query) with the selection summary. */
      if (!input || filtering || isOpen()) return;
      var list = get();
      input.value = summaryText(list);
      input.title = list.join(", ");
    }

    function set(value) {
      var list = listFrom(value);
      var el = wrapperEl();
      if (!el) return;
      el.setAttribute("data-ut-value", list.length ? JSON.stringify(list) : "");
      syncInputDisplay();
      var panel = panelEl();
      if (!panel) return;
      panel.querySelectorAll("[" + attr + "]").forEach(function (item) {
        var on = list.indexOf(item.getAttribute(attr)) !== -1;
        item.setAttribute("aria-checked", on ? "true" : "false");
        item.setAttribute("aria-selected", on ? "true" : "false");
        item.classList.toggle("tds-action-list-item--selected", on);
      });
    }

    function toggle(value) {
      var current = get().slice();
      var index = current.indexOf(value);
      if (index === -1) current.push(value);
      else current.splice(index, 1);
      set(current);
    }

    function filterOptions(query) {
      var panel = panelEl();
      if (!panel) return;
      var q = String(query || "").trim().toLowerCase();
      var empty = panel.querySelector("[data-ut-select-empty]");
      var shown = 0;
      panel.querySelectorAll("[" + attr + "]").forEach(function (item) {
        var hay = item.getAttribute("data-ut-search") || "";
        var hit = !q || hay.indexOf(q) !== -1;
        item.hidden = !hit;
        if (hit) shown += 1;
      });
      if (empty) empty.hidden = shown > 0;
    }

    function isOpen() {
      var el = wrapperEl();
      return !!(el && el.classList.contains("tds-combobox--open"));
    }

    function closeMenu() {
      var el = wrapperEl();
      var menu = menuEl();
      var input = inputEl();
      if (menu && window.TdsDropdownPanel) {
        window.TdsDropdownPanel.close(menu);
      }
      if (el) el.classList.remove("tds-combobox--open");
      if (menu) menu.hidden = true;
      if (input) input.setAttribute("aria-expanded", "false");
      filtering = false;
      filterOptions("");
      syncInputDisplay();
    }

    function openMenu() {
      var el = wrapperEl();
      var menu = menuEl();
      var field = fieldEl();
      var input = inputEl();
      if (!el || !menu || !field || !input) return;
      /* Already open — leave the panel where it is. Repositioning on every
         focus/click after a pick made the menu jump. */
      if (isOpen()) return;
      el.classList.add("tds-combobox--open");
      menu.hidden = false;
      input.setAttribute("aria-expanded", "true");
      if (window.TdsDropdownPanel) {
        window.TdsDropdownPanel.closeAll();
        window.TdsDropdownPanel.open(field, menu, {
          align: "start",
          onClose: function () {
            el.classList.remove("tds-combobox--open");
            menu.hidden = true;
            input.setAttribute("aria-expanded", "false");
            filtering = false;
            filterOptions("");
            syncInputDisplay();
          }
        });
      }
    }

    function build() {
      var panel = panelEl();
      if (!panel) return;
      var html = '<p class="ut-tx-filters__empty" data-ut-select-empty hidden>No matches.</p>';
      config.options().forEach(function (opt) {
        html += filterSelectItemHtml(config.key, opt.value, opt.label, opt.description);
      });
      panel.innerHTML = html;
      panel.setAttribute("aria-multiselectable", "true");
      set(get());
    }

    function bind() {
      var el = wrapperEl();
      var input = inputEl();
      var panel = panelEl();
      var field = fieldEl();
      if (!el || !input || !panel || !field || el.dataset.bound) return;
      el.dataset.bound = "1";

      input.addEventListener("focus", function () {
        var summary = summaryText(get());
        if (!filtering && summary && input.value === summary) {
          input.select();
        }
        filterOptions(filtering ? input.value : "");
        openMenu();
      });

      input.addEventListener("click", function () {
        openMenu();
      });

      input.addEventListener("input", function () {
        filtering = true;
        filterOptions(input.value);
        openMenu();
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closeMenu();
          input.blur();
          return;
        }
        if (e.key === "Enter") e.preventDefault();
        if (e.key === "ArrowDown") {
          e.preventDefault();
          openMenu();
        }
      });

      /* Keep multi-select open: stop the document-level close path and keep
         focus in the field so the next keystroke still filters. preventScroll
         stops the page from jumping when focus returns to the field. */
      panel.addEventListener(
        "mousedown",
        function (e) {
          var item = e.target.closest("[" + attr + "]");
          if (!item || item.hidden) return;
          e.preventDefault();
          e.stopPropagation();
          toggle(item.getAttribute(attr));
          if (typeof input.focus === "function") {
            try {
              input.focus({ preventScroll: true });
            } catch (err) {
              input.focus();
            }
          }
          currentPage = 1;
          syncPanelFiltersFromDom();
          updateFilterChrome();
          /* Keep the page scroll put — filtering the table can change
             document height and the UA would otherwise jump the view. */
          var scrollRoot = document.scrollingElement || document.documentElement;
          var scrollTop = scrollRoot ? scrollRoot.scrollTop : 0;
          render();
          if (scrollRoot) scrollRoot.scrollTop = scrollTop;
        },
        true
      );
    }

    return { el: wrapperEl, get: get, set: set, toggle: toggle, build: build, bind: bind };
  }

  var packageSelect = createFilterSelect({
    key: "package",
    wrapperId: "utFiltPackageSelect",
    valueId: "utFiltPackageValue",
    panelId: "utFiltPackageOptions",
    placeholder: "Select Package",
    options: function () {
      return allPackages().map(function (pkg) {
        return { value: pkg, label: pkg, description: packageProduct(pkg) };
      });
    }
  });

  var sourceSelect = createFilterSelect({
    key: "source",
    wrapperId: "utFiltSourceSelect",
    valueId: "utFiltSourceValue",
    panelId: "utFiltSourceOptions",
    placeholder: "Select Source",
    options: function () {
      return allSources().map(function (src) {
        return { value: src, label: src, description: sourceChannel(src) };
      });
    }
  });

  /* Which channel a source ran through — the quieter line under its name,
     read off the rows so it cannot disagree with the table. */
  function sourceChannel(sourceName) {
    var channel = "";
    rows.forEach(function (item) {
      if (!channel && sourceText(item) === sourceName) {
        channel = item.source === "Workflow" ? "Workflow Studio" : item.source || "";
      }
    });
    return channel;
  }

  function countryCodeFor(name) {
    var code = "";
    rows.forEach(function (item) {
      if (!code && item.country === name) code = String(item.countryCode || "");
    });
    return code;
  }

  /* Flag + name (CODE), matching the table's country cell language. */
  function countryOptionHtml(country) {
    var code = countryCodeFor(country);
    var codeUpper = code.toUpperCase();
    var search = (country + " " + codeUpper).toLowerCase();
    var flag = code
      ? '<span class="ut-tx-filters__country-flag" aria-hidden="true"><span class="fi fi-' +
        escapeHtml(code) +
        '"></span></span>'
      : "";
    var codeLabel = codeUpper
      ? '<span class="ut-tx-filters__country-code">(' +
        escapeHtml(codeUpper) +
        ")</span>"
      : "";
    return (
      '<label class="ut-tx-filters__option" data-ut-country="' +
      escapeHtml(search) +
      '"><input class="tds-checkbox" type="checkbox" name="ut-filt-country" value="' +
      escapeHtml(country) +
      '"><span class="ut-tx-filters__option-text"><span class="ut-tx-filters__option-label ut-tx-filters__option-label--regular ut-tx-filters__country">' +
      flag +
      "<span>" +
      escapeHtml(country) +
      "</span>" +
      codeLabel +
      "</span></span></label>"
    );
  }

  /* Country is a quick filter in the toolbar. Twelve countries is a long menu
     to read, so it gets a search box; the drawer's mirrored copy is a plain
     list, since nothing is searching it. */
  function buildCountryCheckboxes() {
    var options = allCountries().map(countryOptionHtml).join("");

    var toolbar = document.getElementById("utFiltCountryOptions");
    if (toolbar) {
      var menu = toolbar.closest(".ut-tx-quick__menu");
      var searchHost = menu && menu.querySelector("[data-ut-country-search-host]");
      if (menu && !searchHost) {
        searchHost = document.createElement("div");
        searchHost.className = "ut-tx-country-search";
        searchHost.setAttribute("data-ut-country-search-host", "");
        menu.insertBefore(searchHost, toolbar);
      }
      if (searchHost) {
        searchHost.innerHTML =
          '<div class="ut-tx-filters__search">' +
          '<span class="ut-tx-filters__search-icon" aria-hidden="true">' +
          '<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.25"/><path d="M10.5 10.5 13.5 13.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>' +
          "</span>" +
          '<input type="search" class="ut-tx-filters__search-input" data-ut-country-search placeholder="Search countries" aria-label="Search countries">' +
          "</div>";
      }
      toolbar.innerHTML =
        '<p class="ut-tx-filters__empty" data-ut-country-empty hidden>No countries match.</p>' +
        options;
    }

    document.querySelectorAll("[data-ut-country-options]").forEach(function (host) {
      host.innerHTML = options;
    });
  }

  /* Narrow the menu as you type; an empty box puts every country back. */
  function filterCountryOptions(host, query) {
    var q = String(query || "").trim().toLowerCase();
    var empty = host.querySelector("[data-ut-country-empty]");
    var shown = 0;
    host.querySelectorAll("[data-ut-country]").forEach(function (label) {
      var hit = !q || label.getAttribute("data-ut-country").indexOf(q) !== -1;
      label.hidden = !hit;
      if (hit) shown += 1;
    });
    if (empty) empty.hidden = !q || shown > 0;
  }

  function bindCountrySearch() {
    var menu = document.querySelector('[data-quick="country"] .ut-tx-quick__menu');
    var host = document.getElementById("utFiltCountryOptions");
    if (!menu || !host || menu.dataset.searchBound) return;
    menu.dataset.searchBound = "1";
    menu.addEventListener("input", function (e) {
      if (!e.target.closest("[data-ut-country-search]")) return;
      filterCountryOptions(host, e.target.value);
    });
    /* The menu closes on any click outside it, including this box. */
    menu.addEventListener("click", function (e) {
      if (e.target.closest("[data-ut-country-search]")) e.stopPropagation();
    });
  }

  /* ---- Facet chips ----
     A facet set in the More filters drawer surfaces as its own button in the
     toolbar, next to Country, and goes away again when cleared. The drawer
     stays the one source of truth: these menus drive the same controls, so
     either surface can set or clear a facet.

     Product is a checkbox group, so its chip mirrors the same inputs and the
     existing mirroring keeps both ticked in step. Package and Source are
     multi-select menus, so their chips toggle the same values. Type is a
     single value with a default. */
  function facetChips() {
    return [
      {
        key: "product",
        multi: true,
        name: "ut-filt-product",
        options: function () {
          return orderProducts(allProducts());
        },
        active: function () {
          return selectedValues("ut-filt-product").length > 0;
        }
      },
      {
        key: "package",
        multi: true,
        options: allPackages,
        get: packageSelect.get,
        set: packageSelect.set,
        toggle: packageSelect.toggle,
        active: function () {
          return packageSelect.get().length > 0;
        }
      },
      {
        key: "source",
        multi: true,
        options: allSources,
        get: sourceSelect.get,
        set: sourceSelect.set,
        toggle: sourceSelect.toggle,
        active: function () {
          return sourceSelect.get().length > 0;
        }
      },
      {
        key: "type",
        options: function () {
          return ["Live", "Demo"];
        },
        get: currentTypeMode,
        set: setTypeMode,
        /* Live is the default, so only a move off it counts as a filter. */
        active: function () {
          return currentTypeMode() !== TYPE_MODE_DEFAULT;
        }
      }
    ];
  }

  function buildFacetChipMenus() {
    facetChips().forEach(function (facet) {
      var host = document.querySelector(
        '[data-ut-quick-options="' + facet.key + '"]'
      );
      if (!host) return;
      var html = "";
      /* A named checkbox group is the model (Product). Package and Source
         keep their model in the drawer menu, so their chips are toggles. */
      if (facet.multi && facet.name) {
        facet.options().forEach(function (value) {
          html +=
            '<label class="ut-tx-filters__option"><input class="tds-checkbox" type="checkbox" name="' +
            facet.name +
            '" value="' +
            escapeHtml(value) +
            '"><span class="ut-tx-filters__option-text"><span class="ut-tx-filters__option-label ut-tx-filters__option-label--regular">' +
            escapeHtml(value) +
            "</span></span></label>";
        });
      } else {
        facet.options().forEach(function (value) {
          html +=
            '<button type="button" class="ut-tx-quick__option" data-ut-facet="' +
            facet.key +
            '" data-ut-facet-value="' +
            escapeHtml(value) +
            '">' +
            '<span class="ut-tx-quick__option-check" aria-hidden="true">' +
            CHECK_ICON_SM +
            "</span>" +
            escapeHtml(value) +
            "</button>";
        });
      }
      host.innerHTML = html;
    });
  }

  /* Show a chip only while its facet is set, and keep its menu reflecting the
     current value. Called from updateFilterChrome, so it runs after every
     filter change wherever that change came from. */
  function updateFacetChips() {
    facetChips().forEach(function (facet) {
      var item = document.querySelector(
        '.ut-tx-quick__item--dynamic[data-quick="' + facet.key + '"]'
      );
      if (!item) return;
      var on = facet.active();
      item.hidden = !on;
      if (facet.get) {
        var selected = facet.multi ? facet.get() : [facet.get()];
        var count = item.querySelector(".ut-tx-quick__count");
        if (count) {
          count.textContent = String(facet.multi ? selected.length : 1);
          count.hidden = !on;
        }
        item.classList.toggle("is-selected", on);
        item.querySelectorAll("[data-ut-facet-value]").forEach(function (btn) {
          var hit = selected.indexOf(btn.getAttribute("data-ut-facet-value")) !== -1;
          btn.classList.toggle("is-on", hit);
          btn.setAttribute("aria-pressed", hit ? "true" : "false");
        });
      }
    });
  }

  /* The × on a set filter. Checkbox facets clear by unticking every copy of
     their inputs — toolbar and the drawer mirror alike; the single-value ones
     go through their own setter. */
  var QUICK_CHECKBOX_FACETS = {
    outcome: "ut-filt-outcome",
    risk: "ut-filt-risk",
    country: "ut-filt-country",
    product: "ut-filt-product"
  };

  function clearQuickFacet(key) {
    var name = QUICK_CHECKBOX_FACETS[key];
    if (name) {
      document
        .querySelectorAll('input[name="' + name + '"]:checked')
        .forEach(function (input) {
          input.checked = false;
        });
    } else {
      var facet = facetChips().filter(function (f) {
        return f.key === key;
      })[0];
      if (!facet || !facet.set) return;
      facet.set(key === "type" ? TYPE_MODE_DEFAULT : "");
    }
    currentPage = 1;
    syncPanelFiltersFromDom();
    updateFilterChrome();
    render();
    /* embed-bridge owns the chips' counts and selected state, and listens for
       a change on the filter panel. */
    var panel = document.getElementById("utTxFilters");
    if (panel) panel.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function bindQuickFacetClear() {
    var host = document.getElementById("utTxQuick");
    if (!host || host.dataset.clearBound) return;
    host.dataset.clearBound = "1";
    /* Capture, so this runs before the menu's own open handler. */
    host.addEventListener(
      "click",
      function (e) {
        var icon = e.target.closest("[data-ut-quick-clear]");
        if (!icon) return;
        var item = icon.closest(".ut-tx-quick__item");
        if (!item || !item.classList.contains("is-selected")) return;
        e.preventDefault();
        e.stopPropagation();
        clearQuickFacet(item.getAttribute("data-quick"));
      },
      true
    );
  }

  function bindFacetChips() {
    var host = document.getElementById("utTxQuick");
    if (!host || host.dataset.facetsBound) return;
    host.dataset.facetsBound = "1";
    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-ut-facet-value]");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var key = btn.getAttribute("data-ut-facet");
      var value = btn.getAttribute("data-ut-facet-value");
      var facet = facetChips().filter(function (f) {
        return f.key === key;
      })[0];
      if (!facet || !facet.get) return;
      if (facet.multi && facet.toggle) {
        facet.toggle(value);
      } else {
        /* Picking the current value again clears the facet — except Type,
           which has a default to fall back to rather than an empty state. */
        var next =
          facet.get() === value ? (key === "type" ? TYPE_MODE_DEFAULT : "") : value;
        facet.set(next);
      }
      currentPage = 1;
      syncPanelFiltersFromDom();
      updateFilterChrome();
      render();
    });
  }

  function clearAllFilters() {
    document
      .querySelectorAll(
        '#utTxFilters input[type="checkbox"], #utTxFilters select, #utTxQuick input[type="checkbox"]'
      )
      .forEach(function (el) {
        if (el.tagName === "SELECT") {
          el.selectedIndex = 0;
        } else {
          el.checked = false;
        }
      });
    /* The type switch has a default rather than an empty state. */
    setTypeMode(TYPE_MODE_DEFAULT);
    packageSelect.set("");
    sourceSelect.set("");
    syncPanelFiltersFromDom();
    updateFilterChrome();
    /* The date range is a filter too, and it is the one filter with no
       counter anywhere, so leaving it behind made "Clear all filters" look
       like it had not worked. resetDateFilter() renders. The search term is
       deliberately left alone: it is a query, it has its own clear, and the
       status line above the table names it. */
    if (dateFilter.start) resetDateFilter();
    else render();
  }

  function setDrawerOpenClass() {
    var shell = document.getElementById("app-shell");
    if (!shell) return;
    var settingsPanel = document.getElementById("utTxSettings");
    var filtersPanel = document.getElementById("utTxFilters");
    var settingsOpen = settingsPanel && !settingsPanel.hidden;
    var filtersOpen = filtersPanel && !filtersPanel.hidden;
    shell.classList.toggle("ut-tx-drawer-open", !!(settingsOpen || filtersOpen));
    shell.classList.toggle("ut-tx-settings-open", !!(settingsOpen || filtersOpen));
  }

  function buildToolbarProductOptions() {
    var select = document.getElementById("utTxProduct");
    if (!select) return;
    var current = productFilter || select.value;
    var html = '<option value="">Product</option>';
    allProducts().forEach(function (product) {
      html +=
        '<option value="' +
        escapeHtml(product) +
        '">' +
        escapeHtml(product) +
        "</option>";
    });
    select.innerHTML = html;
    if (current) select.value = current;
  }

  function toolbarFiltersActive() {
    return !!(searchQuery || dateFilter.start || productFilter);
  }

  function updateToolbarFilterChrome() {
    var range = document.getElementById("utTxDateWrap");
    var label = range && range.querySelector(".ut-tx-date__label");
    var clear = range && range.querySelector(".ut-tx-date__clear");
    var selected = !!dateFilter.start;
    if (range) range.classList.toggle("ut-tx-date--selected", selected);
    if (label) {
      if (!dateFilter.start) {
        label.textContent = "mm/dd/yyyy";
        label.classList.add("tds-date-picker__placeholder");
      } else {
        label.classList.remove("tds-date-picker__placeholder");
        if (dateFilter.end && dateFilter.end !== dateFilter.start) {
          label.textContent =
            formatPickerDisplay(dateFilter.start) +
            " - " +
            formatPickerDisplay(dateFilter.end);
        } else {
          label.textContent = formatPickerDisplay(dateFilter.start);
        }
      }
    }
    if (clear) clear.hidden = !selected;

    syncSearchClearVisibility();
    updateSearchStatus();

    var productWrap = document.getElementById("utTxProductWrap");
    if (productWrap) {
      productWrap.classList.toggle("ut-tx-product--filled", !!productFilter);
    }

    var reset = document.getElementById("utTxToolbarReset");
    if (reset) {
      var showReset = toolbarFiltersActive();
      if (window.UT_TX_PLAIN_TABLE && dateFilter.start) showReset = false;
      reset.hidden = !showReset;
    }
  }

  function updateSearchStatus() {
    var status = document.getElementById("utTxSearchStatus");
    if (!status) return;
    if (!searchDisplay) {
      status.hidden = true;
      status.textContent = "";
      return;
    }
    status.hidden = false;
    var label = 'Showing results for \u201c' + searchDisplay + '\u201d';
    if (isClientIdSearch()) label += " (Client ID)";
    status.textContent = label;
  }

  function formatPickerDisplay(iso) {
    var parts = String(iso || "").split("-");
    if (parts.length !== 3) return "";
    return pad2(Number(parts[1])) + "/" + pad2(Number(parts[2])) + "/" + parts[0];
  }

  function pickerIsOpen() {
    var range = document.getElementById("utTxDateWrap");
    return !!(range && range.classList.contains("tds-date-picker-range--open"));
  }

  function syncDateFilterFromPicker() {
    var range = document.getElementById("utTxDateWrap");
    if (!range || pickerIsOpen()) return;
    var startEl = range.querySelector(
      '[data-date-picker-part="start"] .tds-date-picker__value'
    );
    var endEl = range.querySelector(
      '[data-date-picker-part="end"] .tds-date-picker__value'
    );
    var start = parsePickerValue(startEl);
    var end = parsePickerValue(endEl);
    var nextStart = start || null;
    var nextEnd = end || (start ? start : null);
    var changed =
      dateFilter.start !== nextStart || dateFilter.end !== nextEnd;
    dateFilter.start = nextStart;
    dateFilter.end = nextEnd;
    updateToolbarFilterChrome();
    /* The Clear controls live in updateFilterChrome, which the date path was
       not calling — so setting a date left "Clear filters" hidden. */
    updateFilterChrome();
    if (changed) render();
  }

  function resetDateFilter(event) {
    aiRowFilter = null;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    dateFilter.start = null;
    dateFilter.end = null;
    var range = document.getElementById("utTxDateWrap");
    if (range) {
      /* The open calendar is portaled to body. Wipe the range only after
         removing any floated clone — otherwise a ghost calendar stays. */
      document
        .querySelectorAll("body > .tds-date-picker__calendar--floating")
        .forEach(function (cal) {
          cal.remove();
        });
      range.classList.remove("tds-date-picker-range--open", "ut-tx-date--selected");
      delete range.dataset.start;
      delete range.dataset.end;
      delete range.dataset.datePickerRangeBound;
      range.innerHTML = DATE_RANGE_FIELDS_HTML;
      /* initDatePickers scans a root's descendants, and the range element is
         the root here — passing it matched nothing, so after a clear the
         field was rebuilt but never re-bound and stopped opening. Hand it the
         parent instead; both init paths guard on their own bound flag, so
         re-running over the toolbar touches nothing already wired. */
      if (window.initDatePickers) {
        window.initDatePickers(range.parentElement || document);
      }
      bindDateClear();
    }
    updateToolbarFilterChrome();
    updateFilterChrome();
    render();
  }

  function bindDateClear() {
    var range = document.getElementById("utTxDateWrap");
    if (!range) return;
    var clear = range.querySelector(".ut-tx-date__clear");
    if (!clear) return;
    clear.addEventListener("click", resetDateFilter);
    clear.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      resetDateFilter(event);
    });
  }

  function bindDateFilter() {
    var range = document.getElementById("utTxDateWrap");
    if (!range) return;

    function onPickerChange(event) {
      if (event.target.closest(".ut-tx-date__clear")) return;
      window.setTimeout(syncDateFilterFromPicker, 0);
    }

    if (!dateFilterBound) {
      dateFilterBound = true;
      range.addEventListener("change", onPickerChange);
      range.addEventListener("click", onPickerChange, true);
      range.addEventListener("mousedown", onPickerChange, true);
      /* Day clicks land on the portaled calendar (body), not the range. */
      document.addEventListener("mousedown", function (event) {
        if (!event.target.closest(".tds-date-picker__calendar--floating")) return;
        window.setTimeout(syncDateFilterFromPicker, 0);
      });
      document.addEventListener("click", function (event) {
        if (event.target.closest("#utTxDateWrap")) return;
        if (event.target.closest(".tds-date-picker__calendar--floating")) return;
        window.setTimeout(syncDateFilterFromPicker, 0);
      });
    }

    bindDateClear();
  }

  var RESULTS_TRID = "1f1aa883-420e-41fa-838f-55bf0fa03d0e";
  var CLIENT_ID_SEARCH = "12195123";
  var CLIENT_ID_NAMES = ["Maya Johnson", "Olivia Brown"];

  function isClientIdSearch() {
    return searchQuery === CLIENT_ID_SEARCH;
  }

  function applySearch(value) {
    var raw = String(value || "").trim();
    if (raw.toLowerCase() === RESULTS_TRID) {
      window.location.href = window.UT_TX_RESULT_HREF || "result.html";
      return;
    }
    searchQuery = raw.toLowerCase();
    searchDisplay = raw;
    var input = document.getElementById("utTxSearch");
    if (input && input.value !== value && !value) input.value = "";
    updateToolbarFilterChrome();
    render();
  }

  function syncSearchClearVisibility() {
    var input = document.getElementById("utTxSearch");
    var clear = document.getElementById("utTxSearchClear");
    if (!clear) return;
    var hasDraft = !!(input && String(input.value || "").trim());
    clear.hidden = !(hasDraft || searchQuery);
  }

  function bindSearch() {
    var input = document.getElementById("utTxSearch");
    var btn = document.querySelector(".ut-tx-search__submit");
    var clear = document.getElementById("utTxSearchClear");
    function apply() {
      applySearch(input ? input.value : "");
    }
    if (input) {
      input.addEventListener("input", syncSearchClearVisibility);
      input.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        e.preventDefault();
        apply();
      });
    }
    if (btn) btn.addEventListener("click", apply);
    if (clear) {
      clear.addEventListener("click", function (e) {
        e.preventDefault();
        if (input) input.value = "";
        applySearch("");
      });
    }
  }

  function bindProductFilter() {
    var select = document.getElementById("utTxProduct");
    if (!select) return;
    select.addEventListener("change", function () {
      productFilter = select.value || "";
      updateToolbarFilterChrome();
      render();
    });
  }

  function resetToolbarFilters() {
    aiRowFilter = null;
    var input = document.getElementById("utTxSearch");
    var select = document.getElementById("utTxProduct");
    if (input) input.value = "";
    searchQuery = "";
    searchDisplay = "";
    if (select) select.value = "";
    productFilter = "";
    resetDateFilter();
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

  function itemPackages(item) {
    var list = [item.package];
    if (item.extraPackages && item.extraPackages.length) {
      list = list.concat(item.extraPackages);
    }
    return list.filter(Boolean);
  }

  /* A cell holding several values — the products a transaction ran, or the
     packages behind them. The first value shows; the rest sit behind "+N".
     Clicking "+N" reveals the full list in place. */
  function multiValueHtml(list, trid, key, opts) {
    opts = opts || {};
    list = list.filter(Boolean);
    if (!list.length) return '<span class="ut-tx-multi__lead">--</span>';
    var lead = opts.tag
      ? '<span class="ut-product-tag">' + highlightMatch(list[0]) + "</span>"
      : highlightMatch(list[0]);
    if (list.length === 1) return '<span class="ut-tx-multi__lead">' + lead + "</span>";

    var open = !!expandedProducts[key + ":" + trid];
    var all = list
      .map(function (v) {
        return '<span class="ut-tx-multi__item">' + highlightMatch(v) + "</span>";
      })
      .join("");

    return (
      '<span class="ut-tx-multi" data-ut-multi="' +
      escapeHtml(key + ":" + trid) +
      '"' +
      (open ? ' data-ut-fit="open"' : "") +
      ">" +
      '<span class="ut-tx-multi__lead"' +
      (open ? " hidden" : "") +
      ">" +
      lead +
      "</span>" +
      '<span class="ut-tx-multi__all"' +
      (open ? "" : " hidden") +
      ">" +
      all +
      "</span>" +
      '<button type="button" class="ut-tx-multi__more tds-counter tds-counter--sm tds-counter--secondary" aria-label="' +
      escapeHtml("Show all: " + list.join(", ")) +
      '"' +
      (open ? " hidden" : "") +
      ">+" +
      (list.length - 1) +
      "</button></span>"
    );
  }

  function productHtml(item, opts) {
    return multiValueHtml(itemProducts(item), item.trid || "", "product", opts);
  }

  function packagesHtml(item) {
    return multiValueHtml(itemPackages(item), item.trid || "", "package");
  }

  /* Anything clipped by its column says so on hover and on focus, using the
     table's existing floating tooltip. Only actually-clipped cells get the
     treatment, so a tooltip never repeats what is already on screen. */
  function applyTruncationTooltips() {
    var tbody = document.getElementById("utTxBody");
    if (!tbody) return;
    tbody
      .querySelectorAll(
        ".ut-tx-multi__lead, .ut-tx-multi__all, .ut-tx-td-source, .ut-tx-name, .ut-tx-name-sub"
      )
      .forEach(function (el) {
        var clipped = el.scrollWidth > el.clientWidth + 1;
        if (clipped) {
          el.classList.add("ut-tx-tip-host");
          el.setAttribute("tabindex", "0");
          el.setAttribute("data-ut-tooltip", el.textContent.trim());
        } else {
          el.classList.remove("ut-tx-tip-host");
          el.removeAttribute("tabindex");
          el.removeAttribute("data-ut-tooltip");
        }
      });
  }

  /* Extra values always stay behind "+N". Clicking the count reveals them;
     a cell is never opened just because the full list would fit the row. */
  function fitMultiCells() {}

  /* The cell owns its own expand/collapse — no re-render, so sorting, paging
     and filtering are untouched by it (and reset it, which is what you want). */
  function bindProductExpand() {
    var tbody = document.getElementById("utTxBody");
    if (!tbody || tbody.dataset.productsBound) return;
    tbody.dataset.productsBound = "1";
    tbody.addEventListener("click", function (e) {
      var btn = e.target.closest(".ut-tx-multi__more");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var cell = btn.closest("[data-ut-multi]");
      if (!cell) return;
      expandedProducts[cell.getAttribute("data-ut-multi")] = true;
      cell.setAttribute("data-ut-fit", "open");
      cell.querySelector(".ut-tx-multi__lead").hidden = true;
      cell.querySelector(".ut-tx-multi__all").hidden = false;
      btn.hidden = true;
    });
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

  function combinedScoreKind(item) {
    var product = (item.product || "").toLowerCase();
    if (product === "device intelligence") return "score-level";
    if (product.indexOf("bank verification") !== -1) return "result-tag";
    if (product === "kyc data") return "result-tag";
    if (product === "kyc documents") return "result-tag";
    if (product === "electronic id") return "result-tag";
    if (product.indexOf("business ") === 0) return "result-tag";
    return "stack";
  }

  function outcomeTagHtml(item) {
    var outcome = item.outcome;
    if (!outcome) return "";
    if (outcome.tone === "signals" || outcome.tone === "signals-intermediate") {
      var cls =
        outcome.tone === "signals-intermediate"
          ? "tds-data-table__signals tds-data-table__signals--intermediate"
          : "tds-data-table__signals";
      return '<span class="' + cls + '">' + escapeHtml(outcome.label) + "</span>";
    }
    return (
      '<span class="tds-tag tds-tag--' +
      escapeHtml(outcome.tone) +
      '">' +
      escapeHtml(outcome.label) +
      "</span>"
    );
  }

  function riskLevelHtml(score) {
    if (!score || !score.label) return "";
    return (
      '<span class="ut-tx-risk-level ut-tx-score--' +
      escapeHtml(score.tone || "positive") +
      '">' +
      escapeHtml(score.label) +
      "</span>"
    );
  }

  function outcomeLabel(item) {
    return ((item.outcome && item.outcome.label) || "").toLowerCase();
  }

  /* A check still running has no result to score. */
  function isInProgressOutcome(item) {
    return outcomeLabel(item) === "in progress";
  }

  function isFailedOutcome(item) {
    return outcomeLabel(item) === "failed";
  }

  function outcomeScore(item) {
    if (!item.score || isInProgressOutcome(item) || isFailedOutcome(item)) return null;
    return item.score;
  }

  var OUTCOME_CLOCK =
    '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">' +
    '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M8 4.75V8.25L10.25 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  function inProgressHtml(item) {
    return (
      '<span class="tds-tag tds-tag--intermediate">' +
      '<span class="tds-tag__leading-visual">' +
      OUTCOME_CLOCK +
      "</span>" +
      escapeHtml(item.outcome.label) +
      "</span>"
    );
  }

  /* Figma 2320:20247 / 2320:20255 — status tag, then "{Risk} {n}/100"
     with the score tinted by risk tone. */
  function outcomePillHtml(item, score) {
    var tone = item.outcome.tone === "negative" ? "negative" : "positive";
    var scoreTone = score.tone || tone;
    return (
      '<span class="ut-tx-outcome-inline">' +
      '<span class="tds-tag tds-tag--' +
      tone +
      '">' +
      escapeHtml(item.outcome.label) +
      "</span>" +
      '<span class="ut-tx-outcome-risk">' +
      '<span class="ut-tx-outcome-risk__label">' +
      escapeHtml(score.label) +
      "</span> " +
      '<span class="ut-tx-outcome-risk__score ut-tx-score--' +
      escapeHtml(scoreTone) +
      '">' +
      escapeHtml(score.value) +
      "</span></span></span>"
    );
  }

  function outcomeHtml(item) {
    var outcome = item.outcome;
    if (!outcome) return "";

    if (settings.status === "status-icons" && isFlowStatusOutcome(item)) {
      return '<span class="ut-tx-empty">--</span>';
    }

    if (isInProgressOutcome(item)) return inProgressHtml(item);
    if (isFailedOutcome(item)) {
      return '<span class="ut-tx-outcome-plain">' + escapeHtml(outcome.label) + "</span>";
    }

    var primary = outcomeTagHtml(item);
    var score = outcomeScore(item);

    if (
      !window.UT_TX_PLAIN_TABLE &&
      combinedScoreKind(item) === "score-level" &&
      score
    ) {
      return scoreHtml(score);
    }

    if (scoreInOutcome()) {
      return score ? outcomePillHtml(item, score) : primary;
    }

    if (settings.score !== "combined-outcome" || window.UT_TX_PLAIN_TABLE) return primary;

    var kind = combinedScoreKind(item);
    if (kind === "result-tag") return primary;
    if (score) return outcomeStackHtml(primary, score);
    return primary;
  }

  /* Secondary line under the outcome tag. `toned` keeps the risk level in its
     colour — a High Risk row has to stay findable at a glance — while the
     number and the type size keep the whole line subordinate to the tag. */
  function outcomeStackHtml(primary, score, toned) {
    var label = escapeHtml(score.label);
    if (toned && score.tone) {
      label =
        '<span class="ut-tx-outcome-sub__label ut-tx-outcome-sub__label--' +
        escapeHtml(score.tone) +
        '">' +
        label +
        "</span>";
    }
    return (
      '<span class="ut-tx-outcome-stack">' +
      primary +
      '<span class="tds-data-table__cell-subtext ut-tx-outcome-sub">' +
      escapeHtml(score.value) +
      " " +
      label +
      "</span></span>"
    );
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
    var day = item.dateDay || item.date;
    var time12 = item.dateTime || "10:00";
    if (settings.date === "numeric") {
      var numeric = String(item.dateNumeric || "").split(",")[0].trim();
      return escapeHtml((numeric || "03/12/2026") + ", 22:00");
    }
    if (settings.date === "double-line") {
      return (
        '<span class="ut-tx-date-stack">' +
        '<span class="ut-tx-date-stack__day">' +
        escapeHtml(day) +
        "</span>" +
        '<span class="ut-tx-date-stack__time">' +
        escapeHtml(time12) +
        "</span></span>"
      );
    }
    return escapeHtml(day + ", " + time12);
  }

  function countryHtml(item) {
    if (window.UT_TX_PLAIN_TABLE) {
      var code = String(item.countryCode || "").toUpperCase();
      var tip = item.country
        ? ' class="ut-tx-country ut-tx-tip-host" tabindex="0" aria-label="' +
          escapeHtml(item.country) +
          '" data-ut-tooltip="' +
          escapeHtml(item.country) +
          '"'
        : ' class="ut-tx-country"';
      return (
        "<span" +
        tip +
        ">" +
        '<span class="ut-tx-country__flag" aria-hidden="true"><span class="fi fi-' +
        escapeHtml(item.countryCode) +
        '"></span></span>' +
        '<span class="ut-tx-country__code">' +
        (code ? highlightMatch(code) : highlightMatch(item.country)) +
        "</span></span>"
      );
    }
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
      highlightMatch(item.country) +
      "</span></span>"
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

    /* A child repeats nothing of its parent: the business, the verdict and the
       date are the transaction's, and the child is one product inside it. What
       is its own is the id it ran under, so that is what the cell shows. */
    if (opts.isChild && childCompact()) {
      var trid = item.trid || "";
      /* A full id is wider than the Transaction column, and cutting only the
         tail loses the half people actually scan for. Both ends are kept; the
         whole thing is on the row's title and on Copy. */
      var tridShort = trid.length > 24 ? trid.slice(0, 8) + "\u2026" + trid.slice(-12) : trid;
      parts.push(
        '<span class="ut-tx-name-stack">' +
          '<span class="ut-tx-name-row ut-tx-child-id">' +
          '<span class="ut-tx-name ut-tx-name--trid" title="' +
          escapeHtml(trid) +
          '">' +
          highlightMatch(tridShort) +
          "</span>" +
          (item.trid
            ? '<button type="button" class="tds-data-table__action-icon ut-tx-id-copy ut-tx-tip-host" data-trid="' +
              escapeHtml(item.trid) +
              '" aria-label="Copy Transaction ID" data-ut-tooltip="Copy Transaction ID">' +
              COPY_ICON +
              "</button>"
            : "") +
          "</span></span>"
      );
      return '<span class="ut-tx-name-cell">' + parts.join("") + "</span>";
    }

    /* Name is the trigger for the floating Transaction ID popover when
       UT_TX_NAME_TRID is on — dotted underline signals it is interactive.
       A parent row is a group, not a result: it carries no id of its own, so
       its name is inert and the id belongs to the children underneath it. */
    var nameOpen =
      showNameTrid() && item.trid && !item.expandable
        ? '<span class="ut-tx-name ut-tx-name--id-trigger" tabindex="0" data-trid="' +
          escapeHtml(item.trid) +
          '" aria-haspopup="dialog" aria-expanded="false">'
        : '<span class="ut-tx-name">';
    var primary =
      nameOpen +
      highlightMatch(item.name) +
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
        '<span class="ut-tx-name-sub">' + highlightMatch(item.detail) + "</span>";
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

  function showActionsColumn() {
    return !window.UT_TX_PLAIN_TABLE && !window.UT_TX_NO_ROW_ACTIONS;
  }

  function actionsHtml(item) {
    if (!showActionsColumn()) return "";
    /* Button menu — DropdownPanel + ActionList.Item (Figma 832:13390) */
    var menuItems =
      '<button type="button" class="tds-action-list-item ut-tx-menu-copy" role="menuitem" data-trid="' +
      escapeHtml(item.trid || "") +
      '"' +
      (item.trid ? "" : ' disabled') +
      '><span class="tds-action-list-item__label">Copy Transaction ID</span></button>' +
      '<button type="button" class="tds-action-list-item ut-tx-menu-download" role="menuitem">' +
      '<span class="tds-action-list-item__label">Download Transaction</span></button>';

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
      '<td class="ut-tx-td-name">' +
      nameHtml(item, opts) +
      "</td>";

    /* The outcome belongs to the transaction, not to one of the products it
       ran — a child repeating its parent's verdict read as a verdict of its
       own. The column keeps its place with the same marker empty cells use
       elsewhere. */
    cells += isChild
      ? '<td class="ut-tx-outcome-cell"><span class="ut-tx-empty">--</span></td>'
      : '<td class="ut-tx-outcome-cell' +
        (!scoreInOutcome() &&
        !window.UT_TX_PLAIN_TABLE &&
        settings.score === "combined-outcome" &&
        combinedScoreKind(item) === "stack" &&
        outcomeScore(item)
          ? " ut-tx-outcome-cell--with-sub"
          : "") +
        '">' +
        outcomeHtml(item) +
        "</td>";
    /* Date, country and source are the transaction's too, so a compact child
       leaves them be. Only the package it ran under is its own, beside its
       id. A full child repeats them, as it did before. */
    var bare = isChild && childCompact();
    cells +=
      "<td>" +
      (bare ? "" : dateHtml(item)) +
      "</td>" +
      '<td class="ut-tx-td-country">' +
      (bare ? "" : countryHtml(item)) +
      "</td>";

    if (showScoreColumn()) {
      cells += "<td>" + (bare ? "" : scoreHtml(item.score)) + "</td>";
    }

    cells +=
      '<td class="ut-tx-td-product">' +
      (bare
        ? ""
        : productHtml(item, window.UT_TX_PLAIN_TABLE ? undefined : { tag: true })) +
      "</td>";
    if (showPackageColumn()) {
      cells += '<td class="ut-tx-td-package">' + packagesHtml(item) + "</td>";
    }
    cells +=
      '<td class="ut-tx-td-source">' +
      (bare ? "" : escapeHtml(sourceText(item))) +
      "</td>";
    if (showTypeColumn()) cells += "<td>" + escapeHtml(item.type) + "</td>";

    if (showTridColumn()) {
      cells +=
        '<td class="ut-tx-trid-cell">' +
        '<span class="ut-tx-id-row ut-tx-id-row--column">' +
        '<span class="ut-tx-trid-text">' +
        highlightMatch(item.trid || "--") +
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
      '<th scope="col" class="ut-tx-th-name">Transaction</th>';

    /* With UT_TX_SORT_DATE_ONLY the sort affordance (aria-sort + caret icon)
       is kept for Date only; every other column renders as a plain header.
       The Date header is then a real control: clicking it flips the order. */
    function sortTh(label, className) {
      var isDate = label.indexOf("Date") === 0;
      if (dateSortEnabled() && !isDate) {
        return (
          '<th scope="col"' +
          (className ? ' class="' + className + '"' : "") +
          ">" +
          label +
          "</th>"
        );
      }

      var live = dateSortEnabled() && isDate;
      var state = live
        ? dateSortDir === "asc"
          ? "ascending"
          : "descending"
        : "none";
      var inner =
        label +
        ' <span class="tds-data-table__sort-icon" aria-hidden="true">' +
        SORT_ICON +
        "</span>";

      return (
        '<th scope="col"' +
        (className ? ' class="' + className + '"' : "") +
        ' aria-sort="' +
        state +
        '"' +
        (live ? ' data-ut-sort="date"' : "") +
        ">" +
        (live
          ? '<button type="button" class="tds-data-table__sort-label ut-tx-sort" title="' +
            (dateSortDir === "asc" ? "Sorted oldest first" : "Sorted newest first") +
            '">' +
            inner +
            "</button>"
          : '<span class="tds-data-table__sort-label">' + inner + "</span>") +
        "</th>"
      );
    }

    /* Order reads outward from the transaction: what happened, when, where,
       then what was run and how it got here. */
    html += sortTh("Outcome") + sortTh("Date (UTC)") + sortTh("Country", "ut-tx-th-country");
    if (showScoreColumn()) html += sortTh("Score");
    html += sortTh("Product");
    if (showPackageColumn()) html += sortTh("Package");
    html += sortTh("Source");
    if (showTypeColumn()) html += sortTh("Type");

    if (showTridColumn()) {
      html += '<th scope="col" class="ut-tx-col-trid">TRID</th>';
    }

    if (showActionsColumn()) {
      html +=
        '<th scope="col" class="tds-data-table__actions-col"><span class="visually-hidden">Actions</span></th>';
    }
    html += "</tr>";

    head.innerHTML = html;
  }

  function renderCols() {
    var cols = document.getElementById("utTxCols");
    if (!cols) return;
    var html =
      '<col class="ut-tx-col-name">' +
      '<col class="ut-tx-col-outcome">' +
      '<col class="ut-tx-col-date">' +
      '<col class="ut-tx-col-country">';
    if (showScoreColumn()) html += '<col class="ut-tx-col-score">';
    html += '<col class="ut-tx-col-product">';
    if (showPackageColumn()) html += '<col class="ut-tx-col-package">';
    html += '<col class="ut-tx-col-source">';
    if (showTypeColumn()) html += '<col class="ut-tx-col-type">';
    if (showTridColumn()) html += '<col class="ut-tx-col-trid">';
    if (showActionsColumn()) html += '<col class="ut-tx-col-actions">';
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
    table.classList.toggle("ut-tx-table--no-type", !showTypeColumn());
    table.classList.toggle("ut-tx-table--package", showPackageColumn());
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
      scoreInOutcome() || settings.score === "combined-outcome"
    );
    table.classList.toggle("ut-tx-table--flag-only", settings.country === "flag-only");
  }

  function renderStats() {
    var el = document.getElementById("utTxStats");
    if (!el) return;
    var total = 0;
    var verified = 0;
    var review = 0;
    var notVerified = 0;
    var highRisk = 0;
    /* With UT_TX_STATS_FOLLOW_FILTERS the cards describe the view you are
       actually looking at — search, date, Live/Demo and every panel filter —
       rather than the whole dataset, so Total always agrees with the row
       count under the table. Purely a change of numbers; the cards look and
       behave exactly as before. */
    var source = window.UT_TX_STATS_FOLLOW_FILTERS ? filteredRows() : rows;
    source.forEach(function (item) {
      total += 1;
      var group = outcomeGroup(item);
      if (group === "positive") verified += 1;
      else if (group === "negative") notVerified += 1;
      else if (group === (window.UT_TX_OUTCOMES_V2 ? "not-completed" : "intermediate")) {
        review += 1;
      }
      if (riskBucket(item) === "high") highRisk += 1;
    });
    var items = [
      ["Total", total],
      ["Verified", verified],
      [window.UT_TX_OUTCOMES_V2 ? "Not complete" : "Needs review", review],
      ["Not verified", notVerified],
      ["High risk", highRisk]
    ];
    el.innerHTML = items
      .map(function (item) {
        return (
          '<div class="ut-tx-stat">' +
          '<p class="ut-tx-stat__label">' +
          item[0] +
          "</p>" +
          '<p class="ut-tx-stat__value">' +
          item[1] +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---- Empty states ----
     Three ways a table can have nothing in it, and each has a different way
     out: a search that matched nothing, filters that excluded everything, or
     genuinely no transactions yet. The table and footer are hidden rather
     than left as a bare header row, and the message is placed in the card's
     visible width instead of inside the wide scrolling table. */
  var EMPTY_ICONS = {
    search:
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="21" cy="21" r="12"/><path d="M30 30l9 9"/><path d="M16 16l10 10M26 16 16 26"/></svg>',
    filter:
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 12h32l-12 14v12l-8 4V26z"/></svg>',
    none:
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="7" width="30" height="34" rx="3"/><path d="M16 17h16M16 24h16M16 31h10"/></svg>'
  };

  /* Has the view been narrowed at all? Covers the panel, the quick filters,
     the toolbar date range and the product dropdown. */
  function hasActiveNarrowing() {
    if (activeFilterCount() > 0) return true;
    if (panelFilters.outcomes.length || panelFilters.risks.length) return true;
    if (panelFilters.countries.length || panelFilters.country) return true;
    if (dateFilter.start) return true;
    if (productFilter) return true;
    return false;
  }

  function emptyStateCopy() {
    if (searchDisplay) {
      return {
        icon: "search",
        title: "No transactions match \u201c" + searchDisplay + "\u201d",
        text: "Check the spelling, or search by a different name, country or ID.",
        action: { label: "Clear search", kind: "clear-search" }
      };
    }
    if (hasActiveNarrowing()) {
      return {
        icon: "filter",
        title: "No transactions match these filters",
        text: "Try removing a filter or widening the date range.",
        action: { label: "Clear filters", kind: "clear-filters" }
      };
    }
    return {
      icon: "none",
      title: "No transactions yet",
      text: "Verifications you run will appear here.",
      action: null
    };
  }

  function emptyStateEl() {
    var card = document.querySelector(".ut-tx-table-card");
    if (!card) return null;
    var el = card.querySelector(".ut-tx-no-results");
    if (el) return el;
    el = document.createElement("div");
    el.className = "ut-tx-no-results";
    el.hidden = true;
    el.setAttribute("role", "status");
    var scroll =
      card.querySelector(".ut-tx-table-scroll") ||
      card.querySelector(".tds-data-table__wrapper");
    if (scroll && scroll.nextSibling) card.insertBefore(el, scroll.nextSibling);
    else card.appendChild(el);
    el.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-ut-empty-action]");
      if (!btn) return;
      if (btn.getAttribute("data-ut-empty-action") === "clear-search") {
        var input = document.getElementById("utTxSearch");
        if (input) input.value = "";
        syncSearchClearVisibility();
        applySearch("");
      } else {
        clearAllFilters();
      }
    });
    return el;
  }

  function renderEmptyState(total) {
    var el = emptyStateEl();
    if (!el) return;
    var card = document.querySelector(".ut-tx-table-card");
    /* Pages wrap the table differently: some have the scroll box, some put
       the table wrapper straight in the card. Hide whichever is there. */
    var scroll =
      card &&
      (card.querySelector(".ut-tx-table-scroll") ||
        card.querySelector(".tds-data-table__wrapper"));
    var footer = document.getElementById("utTxFooter");
    var empty = total === 0;

    if (scroll) scroll.hidden = empty;
    if (footer) footer.hidden = empty;
    if (card) card.classList.toggle("ut-tx-table-card--empty", empty);
    el.hidden = !empty;
    if (!empty) {
      el.innerHTML = "";
      return;
    }

    var copy = emptyStateCopy();
    el.innerHTML =
      '<span class="ut-tx-no-results__icon" aria-hidden="true">' +
      EMPTY_ICONS[copy.icon] +
      "</span>" +
      '<p class="ut-tx-no-results__title">' +
      escapeHtml(copy.title) +
      "</p>" +
      '<p class="ut-tx-no-results__text">' +
      escapeHtml(copy.text) +
      "</p>" +
      (copy.action
        ? '<button type="button" class="tds-btn tds-btn--sm tds-btn--secondary ut-tx-no-results__action" data-ut-empty-action="' +
          copy.action.kind +
          '">' +
          escapeHtml(copy.action.label) +
          "</button>"
        : "");
  }

  function render() {
    /* Filtering shortens the document; keep the scroll offset so the
       viewport does not jump while a menu is open. */
    var scrollRoot = document.scrollingElement || document.documentElement;
    var scrollTop = scrollRoot ? scrollRoot.scrollTop : 0;
    renderCols();
    renderHead();
    applyToolbar();
    applyTableMods();
    renderStats();
    var tbody = document.getElementById("utTxBody");
    if (!tbody) return;
    var paged = pagedRows();
    var html = "";
    paged.list.forEach(function (item) {
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
    fitMultiCells();
    applyTruncationTooltips();
    renderFooter(paged.total);
    renderEmptyState(paged.total);
    if (window.TdsDropdownPanel && typeof window.TdsDropdownPanel.initMenus === "function") {
      window.TdsDropdownPanel.initMenus(tbody);
    }
    updateToolbarFilterChrome();
    if (scrollRoot) scrollRoot.scrollTop = scrollTop;
    dismissIdPopoverIfStale();
  }

  function openSettings() {
    closeFilters(true);
    var panel = document.getElementById("utTxSettings");
    var btn = document.getElementById("utTxSettingsBtn");
    if (!panel) return;
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    setDrawerOpenClass();
    if (btn) btn.setAttribute("aria-expanded", "true");
    var closeBtn = panel.querySelector(".ut-tx-settings__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeSettings(skipFocus) {
    var panel = document.getElementById("utTxSettings");
    var btn = document.getElementById("utTxSettingsBtn");
    if (!panel) return;
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
    setDrawerOpenClass();
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      if (!skipFocus) btn.focus();
    }
  }

  function collapseTruAI() {
    var shell = document.querySelector(".v2-shell");
    var closeBtn = document.getElementById("v2-close");
    if (!shell || !closeBtn) return;
    if (shell.getAttribute("data-truai") !== "open") return;
    closeBtn.click();
  }

  function openFilters() {
    closeSettings(true);
    collapseTruAI();
    var panel = document.getElementById("utTxFilters");
    var btn = document.getElementById("utTxFilterBtn");
    if (!panel) return;
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    setDrawerOpenClass();
    if (btn) btn.setAttribute("aria-expanded", "true");
    var closeBtn = panel.querySelector(".ut-tx-filters__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeFilters(skipFocus) {
    var panel = document.getElementById("utTxFilters");
    var btn = document.getElementById("utTxFilterBtn");
    if (!panel) return;
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
    setDrawerOpenClass();
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      if (!skipFocus) btn.focus();
    }
  }

  function bindFilters() {
    var btn = document.getElementById("utTxFilterBtn");
    var panel = document.getElementById("utTxFilters");
    var clearBtn = document.getElementById("utTxFiltersClear");
    var advancedToggle = document.getElementById("utFiltAdvancedToggle");
    var advancedBody = document.getElementById("utFiltAdvancedBody");

    buildProductOptions();
    buildCountryOptions();
    sourceSelect.bind();
    sourceSelect.build();
    packageSelect.bind();
    packageSelect.build();
    buildCountryCheckboxes();
    bindCountrySearch();
    buildFacetChipMenus();
    bindFacetChips();
    bindQuickFacetClear();
    bindTypeSwitch();

    /* A facet mirrored into more than one surface is still one filter.
       Capture phase: every change handler downstream — the drawer's, and the
       toolbar's quick menus' — reads the DOM, so both copies have to agree
       before any of them looks. */
    document.addEventListener(
      "change",
      function (e) {
        mirrorFilterInput(e.target);
      },
      true
    );
    /* Pick up defaults that are set in markup (the Live/Demo switch) before
       the first render, so the table opens already scoped to them. */
    syncPanelFiltersFromDom();
    updateFilterChrome();

    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (panel && !panel.hidden) closeFilters();
        else openFilters();
      });
    }

    var askbar = document.getElementById("ai-askbar");
    if (askbar) {
      askbar.addEventListener("click", function () {
        if (panel && !panel.hidden) closeFilters(true);
      });
    }

    if (panel) {
      panel.querySelectorAll(".ut-tx-filters__close").forEach(function (el) {
        el.addEventListener("click", function () {
          closeFilters();
        });
      });

      panel.addEventListener("change", function () {
        if (!applyingAiView) aiRowFilter = null;
        syncPanelFiltersFromDom();
        updateFilterChrome();
        render();
      });

      panel.addEventListener("click", function (e) {
        var more = e.target.closest("#utFiltProductMore");
        if (!more) return;
        e.preventDefault();
        panel.querySelectorAll('[data-ut-filt-extra="1"]').forEach(function (el) {
          el.hidden = false;
        });
        more.hidden = true;
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        clearAllFilters();
      });
    }

    if (advancedToggle && advancedBody) {
      advancedToggle.addEventListener("click", function () {
        var open = advancedToggle.getAttribute("aria-expanded") === "true";
        advancedToggle.setAttribute("aria-expanded", open ? "false" : "true");
        advancedBody.hidden = open;
      });
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

  /* Floating Transaction ID card on name hover/focus.
     One shared popover (light tooltip shell) so rows never shift height. */
  var idPopoverState = {
    trigger: null,
    openTimer: null,
    closeTimer: null,
    copiedTimer: null,
    openMs: 300,
    closeMs: 150,
    gap: 4
  };

  function idPopoverEls() {
    var pop = document.getElementById("utTxIdPopover");
    if (!pop) return null;
    return {
      pop: pop,
      id: pop.querySelector("[data-ut-id-value]"),
      copy: pop.querySelector("[data-ut-id-copy]"),
      copied: pop.querySelector("[data-ut-id-copied]")
    };
  }

  function clearIdPopoverTimer(key) {
    if (idPopoverState[key]) {
      clearTimeout(idPopoverState[key]);
      idPopoverState[key] = null;
    }
  }

  function resetIdPopoverCopied() {
    var els = idPopoverEls();
    if (!els) return;
    clearIdPopoverTimer("copiedTimer");
    els.pop.classList.remove("is-copied");
    if (els.copied) {
      els.copied.hidden = true;
      els.copied.textContent = "Copied";
    }
    if (els.copy) {
      els.copy.classList.remove("is-copied");
      els.copy.innerHTML = COPY_ICON;
      els.copy.setAttribute("aria-label", "Copy transaction ID");
    }
  }

  function hideIdPopover() {
    var els = idPopoverEls();
    clearIdPopoverTimer("openTimer");
    clearIdPopoverTimer("closeTimer");
    if (idPopoverState.trigger) {
      idPopoverState.trigger.setAttribute("aria-expanded", "false");
    }
    idPopoverState.trigger = null;
    resetIdPopoverCopied();
    if (!els) return;
    els.pop.hidden = true;
    els.pop.style.left = "";
    els.pop.style.top = "";
  }

  function dismissIdPopoverIfStale() {
    if (
      idPopoverState.trigger &&
      (!idPopoverState.trigger.isConnected ||
        !document.body.contains(idPopoverState.trigger))
    ) {
      hideIdPopover();
    }
  }

  function positionIdPopover() {
    var els = idPopoverEls();
    var trigger = idPopoverState.trigger;
    if (!els || !trigger || els.pop.hidden) return;
    var rect = trigger.getBoundingClientRect();
    var popH = els.pop.offsetHeight || 72;
    var popW = els.pop.offsetWidth || 280;
    var left = rect.left;
    var pad = 8;
    if (left + popW > window.innerWidth - pad) {
      left = window.innerWidth - pad - popW;
    }
    if (left < pad) left = pad;
    var belowTop = rect.bottom + idPopoverState.gap;
    var placeBelow =
      belowTop + popH <= window.innerHeight - pad ||
      rect.top - idPopoverState.gap - popH < pad;
    els.pop.classList.toggle("ut-tx-id-popover--below", placeBelow);
    els.pop.classList.toggle("ut-tx-id-popover--above", !placeBelow);
    var top = placeBelow
      ? belowTop
      : rect.top - idPopoverState.gap - popH;
    els.pop.style.left = Math.round(left) + "px";
    els.pop.style.top = Math.round(top) + "px";
  }

  function showIdPopover(trigger) {
    var els = idPopoverEls();
    if (!els || !trigger) return;
    var trid = trigger.getAttribute("data-trid");
    if (!trid) return;
    if (idPopoverState.trigger && idPopoverState.trigger !== trigger) {
      idPopoverState.trigger.setAttribute("aria-expanded", "false");
    }
    idPopoverState.trigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    els.id.textContent = trid;
    resetIdPopoverCopied();
    els.pop.hidden = false;
    positionIdPopover();
    window.requestAnimationFrame(positionIdPopover);
  }

  function scheduleIdPopoverOpen(trigger) {
    clearIdPopoverTimer("closeTimer");
    clearIdPopoverTimer("openTimer");
    if (idPopoverState.trigger === trigger && idPopoverEls() && !idPopoverEls().pop.hidden) {
      return;
    }
    idPopoverState.openTimer = setTimeout(function () {
      idPopoverState.openTimer = null;
      showIdPopover(trigger);
    }, idPopoverState.openMs);
  }

  function scheduleIdPopoverClose() {
    clearIdPopoverTimer("openTimer");
    clearIdPopoverTimer("closeTimer");
    idPopoverState.closeTimer = setTimeout(function () {
      idPopoverState.closeTimer = null;
      hideIdPopover();
    }, idPopoverState.closeMs);
  }

  function selectIdPopoverText() {
    var els = idPopoverEls();
    if (!els || !els.id) return;
    var range = document.createRange();
    range.selectNodeContents(els.id);
    var sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function markIdPopoverCopied() {
    var els = idPopoverEls();
    if (!els) return;
    clearIdPopoverTimer("copiedTimer");
    els.pop.classList.add("is-copied");
    if (els.copied) {
      els.copied.hidden = false;
      els.copied.textContent = "Copied";
    }
    if (els.copy) {
      els.copy.classList.add("is-copied");
      els.copy.innerHTML = CHECK_ICON;
      els.copy.setAttribute("aria-label", "Copied");
    }
    idPopoverState.copiedTimer = setTimeout(function () {
      idPopoverState.copiedTimer = null;
      resetIdPopoverCopied();
    }, 1500);
  }

  function copyIdFromPopover() {
    var els = idPopoverEls();
    if (!els || !idPopoverState.trigger) return;
    var trid = idPopoverState.trigger.getAttribute("data-trid") || "";
    if (!trid) return;
    clearIdPopoverTimer("closeTimer");
    var ok = function () {
      markIdPopoverCopied();
    };
    var fail = function () {
      selectIdPopoverText();
      markIdPopoverCopied();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(trid).then(ok).catch(fail);
    } else {
      fail();
    }
  }

  function bindIdPopover() {
    var els = idPopoverEls();
    if (!els || els.pop.dataset.bound) return;
    els.pop.dataset.bound = "1";
    els.copy.innerHTML = COPY_ICON;

    /* mouseover/out bubble — pointerenter does not, so it cannot be delegated. */
    document.addEventListener("mouseover", function (e) {
      var trigger = e.target.closest && e.target.closest(".ut-tx-name--id-trigger");
      if (!trigger) return;
      var from = e.relatedTarget;
      if (from && trigger.contains(from)) return;
      scheduleIdPopoverOpen(trigger);
    });
    document.addEventListener("mouseout", function (e) {
      var trigger = e.target.closest && e.target.closest(".ut-tx-name--id-trigger");
      if (!trigger) return;
      var next = e.relatedTarget;
      if (next && trigger.contains(next)) return;
      if (next && (els.pop.contains(next) || (next.closest && next.closest(".ut-tx-name--id-trigger") === trigger))) {
        return;
      }
      scheduleIdPopoverClose();
    });

    document.addEventListener("focusin", function (e) {
      var trigger = e.target.closest && e.target.closest(".ut-tx-name--id-trigger");
      if (trigger) {
        scheduleIdPopoverOpen(trigger);
        return;
      }
      if (els.pop.contains(e.target)) clearIdPopoverTimer("closeTimer");
    });
    document.addEventListener("focusout", function (e) {
      var next = e.relatedTarget;
      if (next && (els.pop.contains(next) || (next.closest && next.closest(".ut-tx-name--id-trigger")))) {
        return;
      }
      if (
        (e.target.closest && e.target.closest(".ut-tx-name--id-trigger")) ||
        els.pop.contains(e.target)
      ) {
        scheduleIdPopoverClose();
      }
    });

    els.pop.addEventListener("mouseover", function (e) {
      var from = e.relatedTarget;
      if (from && els.pop.contains(from)) return;
      clearIdPopoverTimer("closeTimer");
      clearIdPopoverTimer("openTimer");
    });
    els.pop.addEventListener("mouseout", function (e) {
      var next = e.relatedTarget;
      if (next && els.pop.contains(next)) return;
      if (
        next &&
        idPopoverState.trigger &&
        (next === idPopoverState.trigger || idPopoverState.trigger.contains(next))
      ) {
        return;
      }
      scheduleIdPopoverClose();
    });

    els.copy.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      copyIdFromPopover();
    });
    els.copy.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      copyIdFromPopover();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && els.pop && !els.pop.hidden) {
        e.preventDefault();
        var trigger = idPopoverState.trigger;
        hideIdPopover();
        if (trigger && typeof trigger.focus === "function") trigger.focus();
        return;
      }
      if (
        e.key === "Tab" &&
        !e.shiftKey &&
        e.target.classList &&
        e.target.classList.contains("ut-tx-name--id-trigger") &&
        els.pop &&
        !els.pop.hidden &&
        idPopoverState.trigger === e.target
      ) {
        e.preventDefault();
        els.copy.focus();
      }
    });

    window.addEventListener("scroll", function () {
      if (!els.pop.hidden) positionIdPopover();
    }, true);
    window.addEventListener("resize", function () {
      if (!els.pop.hidden) positionIdPopover();
    });
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
      if (e.key !== "Escape") return;
      var settingsPanel = document.getElementById("utTxSettings");
      var filtersPanel = document.getElementById("utTxFilters");
      if (filtersPanel && !filtersPanel.hidden) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeFilters();
        return;
      }
      if (settingsPanel && !settingsPanel.hidden) {
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
    bindFilters();
    bindTooltips();
    bindIdPopover();
    bindChildView();
    bindDateFilter();
    bindSearch();
    bindProductFilter();
    buildToolbarProductOptions();
    var reset = document.getElementById("utTxToolbarReset");
    if (reset) reset.addEventListener("click", resetToolbarFilters);
    bindPagination();
    bindSort();
    bindProductExpand();
    render();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        if (syncPageSize()) render();
      });
    });
    window.addEventListener("resize", scheduleFitPageSize);
    if (typeof ResizeObserver !== "undefined") {
      var section =
        document.querySelector(".th-tx .ut-tx-table-section") ||
        document.querySelector(".ut-tx-table-section");
      if (section) {
        var ro = new ResizeObserver(scheduleFitPageSize);
        ro.observe(section);
      }
    }
    var dismiss = document.getElementById("utTxToastDismiss");
    if (dismiss) dismiss.addEventListener("click", hideToast);
    if (window.TdsDropdownPanel && typeof window.TdsDropdownPanel.initMenus === "function") {
      window.TdsDropdownPanel.initMenus(document);
    }
  });
})();
