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
  var dateFilter = { start: null, end: null };
  var dateFilterBound = false;
  var searchQuery = "";
  var searchDisplay = "";
  var productFilter = "";
  var currentPage = 1;
  var lastFilterTotal = -1;
  var PAGE_SIZE = 15;
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
  var panelFilters = {
    outcomes: [],
    products: [],
    country: "",
    risks: [],
    sources: [],
    types: [],
    user: "",
    watchlist: []
  };
  var PRODUCT_VISIBLE = 3;
  var OUTCOME_LABELS = {
    positive: [
      "Accepted",
      "Verified",
      "Clear",
      "Completed",
      "No Hits Found",
      "Match"
    ],
    intermediate: ["Review", "Pending Review", "In Progress"],
    negative: [
      "Declined",
      "Not Verified",
      "Flagged",
      "Hits Found",
      "No Match"
    ],
    "not-completed": ["Abandoned", "Timed Out", "Failed"]
  };
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

  function allProducts() {
    var list = [];
    rows.forEach(function (item) {
      list.push(item.product);
      if (item.children) {
        item.children.forEach(function (child) {
          list.push(child.product);
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

  function selectedValues(name) {
    return Array.prototype.slice
      .call(document.querySelectorAll('input[name="' + name + '"]:checked'))
      .map(function (el) {
        return el.value;
      });
  }

  function syncPanelFiltersFromDom() {
    panelFilters.outcomes = selectedValues("ut-filt-outcome");
    panelFilters.products = selectedValues("ut-filt-product");
    panelFilters.risks = selectedValues("ut-filt-risk");
    panelFilters.sources = selectedValues("ut-filt-source");
    panelFilters.types = selectedValues("ut-filt-type");
    panelFilters.watchlist = selectedValues("ut-filt-watchlist");
    var countryEl = document.getElementById("utFiltCountrySelect");
    var userEl = document.getElementById("utFiltUserSelect");
    panelFilters.country = countryEl && countryEl.value ? countryEl.value : "";
    panelFilters.user = userEl && userEl.value ? userEl.value : "";
  }

  function activeFilterCount() {
    return (
      panelFilters.outcomes.length +
      panelFilters.products.length +
      panelFilters.risks.length +
      panelFilters.sources.length +
      panelFilters.types.length +
      panelFilters.watchlist.length +
      (panelFilters.country ? 1 : 0) +
      (panelFilters.user ? 1 : 0)
    );
  }

  function updateFilterChrome() {
    var count = activeFilterCount();
    var clearBtn = document.getElementById("utTxFiltersClear");
    var countEl = document.getElementById("utTxFilterCount");
    var filterWrap = document.getElementById("utTxFilter");
    if (clearBtn) clearBtn.disabled = count === 0;
    if (countEl) {
      countEl.textContent = String(count);
      countEl.hidden = count === 0;
    }
    if (filterWrap) {
      filterWrap.classList.toggle("tds-filter-button--selected", count > 0);
      filterWrap.classList.toggle("tds-filter-button--multi", count > 1);
    }
  }

  function matchesPanelFilters(item) {
    if (panelFilters.outcomes.length) {
      if (panelFilters.outcomes.indexOf(outcomeGroup(item)) === -1) return false;
    }
    if (panelFilters.products.length) {
      if (panelFilters.products.indexOf(item.product) === -1) return false;
    }
    if (panelFilters.country && item.country !== panelFilters.country) return false;
    if (panelFilters.risks.length) {
      var risk = riskBucket(item);
      if (!risk || panelFilters.risks.indexOf(risk) === -1) return false;
    }
    if (panelFilters.sources.length) {
      if (panelFilters.sources.indexOf(item.source) === -1) return false;
    }
    if (panelFilters.types.length) {
      if (panelFilters.types.indexOf(item.type) === -1) return false;
    }
    if (panelFilters.user) {
      if (panelFilters.user === "Jane Doe" && item.name !== "Jane Doe") return false;
      if (panelFilters.user === "API User" && item.source !== "API") return false;
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
      item.product
    ]
      .join(" ")
      .toLowerCase();
    return hay.indexOf(searchQuery) !== -1;
  }

  function matchesProductFilter(item) {
    if (!productFilter) return true;
    if (item.product === productFilter) return true;
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
        matchesProductFilter(item)
      );
    });
  }

  function pageCount(total) {
    if (!total) return 1;
    return Math.max(1, Math.ceil(total / PAGE_SIZE));
  }

  function pagedRows() {
    var list = filteredRows();
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

  function buildProductOptions() {
    var host = document.getElementById("utFiltProductOptions");
    if (!host) return;
    var products = allProducts();
    var html = "";
    products.forEach(function (product, index) {
      var hidden = index >= PRODUCT_VISIBLE ? ' hidden data-ut-filt-extra="1"' : "";
      html +=
        '<label class="ut-tx-filters__option"' +
        hidden +
        '><input class="tds-checkbox" type="checkbox" name="ut-filt-product" value="' +
        escapeHtml(product) +
        '"><span class="ut-tx-filters__option-text"><span class="ut-tx-filters__option-label ut-tx-filters__option-label--regular">' +
        escapeHtml(product) +
        "</span></span></label>";
    });
    var extra = products.length - PRODUCT_VISIBLE;
    if (extra > 0) {
      html +=
        '<button type="button" class="ut-tx-filters__more" id="utFiltProductMore" data-extra="' +
        extra +
        '">+ ' +
        extra +
        " more products</button>";
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

  function clearAllFilters() {
    document
      .querySelectorAll(
        '#utTxFilters input[type="checkbox"], #utTxFilters select'
      )
      .forEach(function (el) {
        if (el.tagName === "SELECT") {
          el.selectedIndex = 0;
        } else {
          el.checked = false;
        }
      });
    syncPanelFiltersFromDom();
    updateFilterChrome();
    render();
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
    if (reset) reset.hidden = !toolbarFiltersActive();
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
    if (changed) render();
  }

  function resetDateFilter(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    dateFilter.start = null;
    dateFilter.end = null;
    var range = document.getElementById("utTxDateWrap");
    if (range) {
      range.classList.remove("tds-date-picker-range--open", "ut-tx-date--selected");
      delete range.dataset.start;
      delete range.dataset.end;
      delete range.dataset.datePickerRangeBound;
      range.innerHTML = DATE_RANGE_FIELDS_HTML;
      if (window.initDatePickers) window.initDatePickers(range);
      bindDateClear();
    }
    updateToolbarFilterChrome();
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
      range.addEventListener("click", onPickerChange, true);
      range.addEventListener("mousedown", onPickerChange, true);
      document.addEventListener("click", function (event) {
        if (event.target.closest("#utTxDateWrap")) return;
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
      window.location.href = "result.html";
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

  function outcomeHtml(item) {
    var outcome = item.outcome;
    if (!outcome) return "";

    if (settings.status === "status-icons" && isFlowStatusOutcome(item)) {
      return '<span class="ut-tx-empty">--</span>';
    }

    var primary = outcomeTagHtml(item);

    if (combinedScoreKind(item) === "score-level" && item.score) {
      return scoreHtml(item.score);
    }

    if (settings.score !== "combined-outcome") return primary;

    var kind = combinedScoreKind(item);
    if (kind === "result-tag") return primary;
    if (item.score) {
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

  function tridSecondaryHtml(item) {
    if (!item.trid) return "";
    return (
      '<span class="ut-tx-id-row">' +
      '<span class="ut-tx-name-sub">' +
      highlightMatch(item.trid) +
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
      '<td class="ut-tx-td-name">' +
      nameHtml(item, opts) +
      "</td>";

    cells +=
      '<td class="ut-tx-outcome-cell' +
      (settings.score === "combined-outcome" &&
      combinedScoreKind(item) === "stack" &&
      item.score
        ? " ut-tx-outcome-cell--with-sub"
        : "") +
      '">' +
      outcomeHtml(item) +
      "</td>" +
      "<td>" +
      dateHtml(item) +
      "</td>" +
      '<td><span class="ut-product-tag">' +
      highlightMatch(item.product) +
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
      sortTh("Date (UTC)") +
      sortTh("Product") +
      sortTh("Country", "ut-tx-th-country");

    if (showScoreColumn()) {
      html += sortTh("Score");
    }

    html += sortTh("Source") + sortTh("Type");

    if (showTridColumn()) {
      html += '<th scope="col" class="ut-tx-col-trid">TRID</th>';
    }

    html +=
      '<th scope="col" class="tds-data-table__actions-col"><span class="visually-hidden">Actions</span></th>' +
      "</tr>";

    head.innerHTML = html;
  }

  function renderCols() {
    var cols = document.getElementById("utTxCols");
    if (!cols) return;
    var html =
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
    renderFooter(paged.total);
    if (window.TdsDropdownPanel && typeof window.TdsDropdownPanel.initMenus === "function") {
      window.TdsDropdownPanel.initMenus(tbody);
    }
    updateToolbarFilterChrome();
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

  function openFilters() {
    closeSettings(true);
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
    updateFilterChrome();

    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (panel && !panel.hidden) closeFilters();
        else openFilters();
      });
    }

    if (panel) {
      panel.querySelectorAll(".ut-tx-filters__close").forEach(function (el) {
        el.addEventListener("click", function () {
          closeFilters();
        });
      });

      panel.addEventListener("change", function () {
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
    bindDateFilter();
    bindSearch();
    bindProductFilter();
    buildToolbarProductOptions();
    var reset = document.getElementById("utTxToolbarReset");
    if (reset) reset.addEventListener("click", resetToolbarFilters);
    bindPagination();
    render();
    var dismiss = document.getElementById("utTxToastDismiss");
    if (dismiss) dismiss.addEventListener("click", hideToast);
    if (window.TdsDropdownPanel && typeof window.TdsDropdownPanel.initMenus === "function") {
      window.TdsDropdownPanel.initMenus(document);
    }
  });
})();
