/* ============================================================
   Business Reputation Review — demo form interactions
   UK Companies House scoped search: min 3 chars, broad → narrow
   results, then pre-filled registry fields on select.
   ============================================================ */
(function () {
  "use strict";

  var RESULTS_URL = "../KYB Results/index.html";
  var MIN_QUERY_LEN = 3;
  var HINT_DEFAULT = "Enter at least 3 characters to search for a business.";

  var COUNTRIES = [
    { code: "gb", name: "United Kingdom", registry: "Companies House", broadTotal: 412 },
    { code: "us", name: "United States", registry: "Secretary of State business registry", broadTotal: 1284 },
    { code: "ca", name: "Canada", registry: "Corporations Canada", broadTotal: 296 },
    { code: "au", name: "Australia", registry: "ASIC business registry", broadTotal: 188 },
    { code: "de", name: "Germany", registry: "Handelsregister", broadTotal: 524 },
    { code: "nl", name: "Netherlands", registry: "KVK business registry", broadTotal: 241 },
    { code: "sg", name: "Singapore", registry: "ACRA business registry", broadTotal: 157 },
  ];

  var DEFAULT_COUNTRY_CODE = "us";

  var MERIDIAN_APEX = {
    id: "meridian-apex",
    name: "Meridian Apex Consulting Ltd.",
    country: "United Kingdom",
    countryCode: "gb",
    brn: "11876542",
    address1: "Suite 4, 123 Formation House",
    city: "London",
    state: "England",
    postal: "EC2A 4NE",
    sample: "elevated",
  };

  var SEARCH_POOL_BY_COUNTRY = {
    gb: [
      MERIDIAN_APEX,
      { id: "meridian-global", name: "Meridian Global Holdings Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0012847", address1: "14 Bishopsgate", city: "London", state: "England", postal: "EC2N 3AR", sample: "standard" },
      { id: "meridian-capital", name: "Meridian Capital Advisors Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0039182", address1: "30 St Mary Axe", city: "London", state: "England", postal: "EC3A 8EP", sample: "standard" },
      { id: "meridian-east", name: "Meridian East Trading Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0045621", address1: "85 Fleet Street", city: "London", state: "England", postal: "EC4Y 1AE", sample: "standard" },
      { id: "meridian-bridge", name: "Meridian Bridge Consulting Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0051093", address1: "22 Old Broad Street", city: "London", state: "England", postal: "EC2N 1HQ", sample: "standard" },
      { id: "meridian-office", name: "Meridian Office Solutions Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0067744", address1: "10 Finsbury Square", city: "London", state: "England", postal: "EC2A 1AF", sample: "standard" },
      { id: "mercury-systems", name: "Mercury Systems Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0073310", address1: "5 Canada Square", city: "London", state: "England", postal: "E14 5AQ", sample: "standard" },
      { id: "mersey-industrial", name: "Mersey Industrial Group Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0089021", address1: "1 Spinningfields", city: "Manchester", state: "England", postal: "M3 3AP", sample: "standard" },
      { id: "merchant-row", name: "Merchant Row Properties Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0091184", address1: "45 Gresham Street", city: "London", state: "England", postal: "EC2V 7BG", sample: "standard" },
      { id: "meridian-north", name: "Meridian North Services Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0104455", address1: "2 Snow Hill", city: "London", state: "England", postal: "EC1A 2DH", sample: "standard" },
      { id: "meridian-works", name: "Meridian Works Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0112290", address1: "100 Liverpool Street", city: "London", state: "England", postal: "EC2M 2AT", sample: "standard" },
    ],
    us: [
      { id: "meridian-partners-us", name: "Meridian Partners Inc.", country: "United States", countryCode: "us", brn: "US-7731-INC", address1: "200 California St", city: "San Francisco", state: "CA", postal: "94111", sample: "standard" },
      { id: "mercury-financial", name: "Mercury Financial Group Inc.", country: "United States", countryCode: "us", brn: "US-4410-INC", address1: "350 Madison Ave", city: "New York", state: "NY", postal: "10017", sample: "standard" },
      { id: "merchant-services", name: "Merchant Services LLC", country: "United States", countryCode: "us", brn: "US-9022-LLC", address1: "480 Mission St", city: "San Francisco", state: "CA", postal: "94105", sample: "standard" },
      { id: "meridian-ridge", name: "Meridian Ridge Capital LLC", country: "United States", countryCode: "us", brn: "US-1188-LLC", address1: "71 Stevenson St", city: "San Francisco", state: "CA", postal: "94105", sample: "standard" },
      { id: "meridian-coastal", name: "Meridian Coastal Holdings Inc.", country: "United States", countryCode: "us", brn: "US-5520-INC", address1: "101 California St", city: "San Francisco", state: "CA", postal: "94111", sample: "standard" },
      { id: "meridian-pacific", name: "Meridian Pacific Advisors Inc.", country: "United States", countryCode: "us", brn: "US-6631-INC", address1: "555 California St", city: "San Francisco", state: "CA", postal: "94104", sample: "standard" },
      { id: "mersey-logistics", name: "Mersey Logistics Corp.", country: "United States", countryCode: "us", brn: "US-7744-CORP", address1: "1 Market St", city: "San Francisco", state: "CA", postal: "94105", sample: "standard" },
      { id: "meridian-apex-us", name: "Meridian Apex Consulting Inc.", country: "United States", countryCode: "us", brn: "US-8891-INC", address1: "50 Fremont St", city: "San Francisco", state: "CA", postal: "94105", sample: "elevated" },
    ],
  };

  var state = {
    country: getCountryByCode(DEFAULT_COUNTRY_CODE),
    selected: null,
    activeIndex: -1,
    menuOpen: false,
    visibleMatches: [],
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function nameMatches(name, query) {
    return normalize(name).indexOf(query) !== -1;
  }

  function getSearchTier(query) {
    if (query.indexOf("meridian apex") !== -1) return "exact";
    if (query.indexOf("meridia") !== -1) return "narrow";
    if (query.indexOf("mer") !== -1) return "broad";
    return "other";
  }

  function rankEntity(entity, query, tier) {
    var name = normalize(entity.name);
    var score = 0;
    if (name.indexOf(query) === 0) score += 100;
    else if (name.indexOf(query) !== -1) score += 50;
    if (name.indexOf("meridian apex") !== -1) score += 10;
    if (tier === "narrow" && name.indexOf("meridian") !== -1) score += 20;
    if (tier === "exact" && name.indexOf("meridian apex") !== -1) score += 200;
    return score;
  }

  function getRegistryPool() {
    return SEARCH_POOL_BY_COUNTRY[state.country.code] || [];
  }

  function registryLabel() {
    return state.country.registry;
  }

  function searchRegistry(query) {
    var q = normalize(query);
    if (q.length < MIN_QUERY_LEN) {
      return { tier: "short", visible: [], total: 0, footer: "" };
    }

    var tier = getSearchTier(q);
    var catalog = getRegistryPool();
    var pool = catalog.filter(function (item) {
      return nameMatches(item.name, q);
    }).sort(function (a, b) {
      return rankEntity(b, q, tier) - rankEntity(a, q, tier);
    });

    if (!pool.length) {
      return {
        tier: tier,
        visible: [],
        total: 0,
        footer: "No matches in " + registryLabel() + " for this search",
      };
    }

    if (tier === "exact") {
      var exact = pool.filter(function (item) {
        return normalize(item.name).indexOf("meridian apex") !== -1;
      });
      var exactVisible = exact.length ? exact.slice(0, 1) : pool.slice(0, 1);
      return {
        tier: tier,
        visible: exactVisible,
        total: exactVisible.length,
        footer: exactVisible.length === 1 ? "1 match in " + registryLabel() : "",
      };
    }

    if (tier === "narrow") {
      var narrowPool = pool.filter(function (item) {
        return normalize(item.name).indexOf("meridian") !== -1;
      });
      var narrowVisible = (narrowPool.length ? narrowPool : pool).slice(0, 3);
      var narrowTotal = narrowPool.length || narrowVisible.length;
      return {
        tier: tier,
        visible: narrowVisible,
        total: narrowTotal,
        footer: narrowVisible.length
          ? "Showing " + narrowVisible.length + " of " + narrowTotal + " matches — keep typing to refine"
          : "",
      };
    }

    if (tier === "broad") {
      var broadVisible = pool.slice(0, 8);
      var broadTotal = state.country.broadTotal || broadVisible.length;
      return {
        tier: tier,
        visible: broadVisible,
        total: broadTotal,
        footer: broadVisible.length
          ? "Showing " + broadVisible.length + " of " + broadTotal + " matches — keep typing to refine"
          : "",
      };
    }

    var otherVisible = pool.slice(0, 6);
    var otherTotal = Math.max(otherVisible.length, 24);
    return {
      tier: tier,
      visible: otherVisible,
      total: otherTotal,
      footer: otherVisible.length
        ? "Showing " + otherVisible.length + " of " + otherTotal + " matches — keep typing to refine"
        : "No matches in " + registryLabel() + " for this search",
    };
  }

  function fillPrefillFields(entity) {
    byId("brr-prefill-brn").value = entity.brn || "";
    byId("brr-prefill-address").value = entity.address1 || "";
    byId("brr-prefill-city").value = entity.city || "";
    byId("brr-prefill-state").value = entity.state || "";
    byId("brr-prefill-postal").value = entity.postal || "";
  }

  function showPrefill(show) {
    var section = byId("brr-prefill");
    if (section) section.hidden = !show;
  }

  function updateSubmitButton() {
    var submit = byId("brr-submit-btn");
    if (!submit) return;
    if (state.selected) submit.removeAttribute("aria-disabled");
    else submit.setAttribute("aria-disabled", "true");
  }

  function updateSearchPlaceholder() {
    var input = byId("brr-business-name");
    if (!input) return;
    input.placeholder = "Search for " + state.country.name + " business";
  }

  function updateSearchHint(query) {
    var hint = byId("brr-search-hint");
    if (!hint) return;

    var q = normalize(query);
    if (
      state.selected &&
      q === normalize(state.selected.name)
    ) {
      hint.textContent = HINT_DEFAULT;
      hint.classList.remove("brr-search-hint--active");
      return;
    }

    if (!q.length) {
      hint.textContent = HINT_DEFAULT;
      hint.classList.remove("brr-search-hint--active");
      return;
    }

    if (q.length < MIN_QUERY_LEN) {
      hint.textContent =
        "Type " +
        (MIN_QUERY_LEN - q.length) +
        " more character" +
        (MIN_QUERY_LEN - q.length === 1 ? "" : "s") +
        ".";
      hint.classList.add("brr-search-hint--active");
      return;
    }

    hint.textContent = HINT_DEFAULT;
    hint.classList.remove("brr-search-hint--active");
  }

  function getCountryByCode(code) {
    for (var i = 0; i < COUNTRIES.length; i++) {
      if (COUNTRIES[i].code === code) return COUNTRIES[i];
    }
    return null;
  }

  function applyCountryChange(country) {
    if (!country || country.code === state.country.code) return;

    state.country = country;
    var trigger = byId("brr-country-trigger");
    if (trigger) trigger.setAttribute("aria-label", "Country, " + country.name);

    var input = byId("brr-business-name");
    if (input) input.value = "";
    updateSearchPlaceholder();
    clearSelection();
    updateSearchHint("");
    closeMenu();
  }

  function closeMenu() {
    var root = byId("brr-search");
    var list = byId("brr-search-list");
    var input = byId("brr-business-name");
    if (!root || !list || !input) return;

    root.classList.remove("tds-combobox--open");
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    state.menuOpen = false;
    state.activeIndex = -1;
    state.visibleMatches = [];
  }

  function openMenu() {
    var root = byId("brr-search");
    var list = byId("brr-search-list");
    var input = byId("brr-business-name");
    if (!root || !list || !input) return;

    root.classList.add("tds-combobox--open");
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    state.menuOpen = true;
  }

  function highlightActiveItem() {
    var options = byId("brr-search-options");
    if (!options) return;

    options.querySelectorAll(".tds-action-list-item").forEach(function (item, index) {
      item.classList.toggle("tds-action-list-item--active", index === state.activeIndex);
      if (index === state.activeIndex) item.setAttribute("aria-selected", "true");
      else item.removeAttribute("aria-selected");
    });
  }

  function renderMenu(result) {
    var list = byId("brr-search-list");
    var options = byId("brr-search-options");
    var footer = byId("brr-search-footer");
    if (!list || !options || !footer) return;

    state.visibleMatches = result.visible || [];

    if (!state.visibleMatches.length) {
      options.innerHTML = "";
      footer.hidden = true;
      footer.textContent = "";
      closeMenu();
      return;
    }

    options.innerHTML = state.visibleMatches
      .map(function (item, index) {
        return (
          '<button type="button" class="tds-action-list-item brr-search__option" role="option" data-index="' +
          index +
          '">' +
          '<span class="tds-action-list-item__content">' +
          '<span class="tds-action-list-item__label">' +
          escapeHtml(item.name) +
          "</span>" +
          '<span class="tds-action-list-item__description">' +
          escapeHtml(item.country) +
          "</span>" +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    options.querySelectorAll(".brr-search__option").forEach(function (button) {
      button.addEventListener("mousedown", function (event) {
        event.preventDefault();
        var index = Number(button.getAttribute("data-index"));
        if (state.visibleMatches[index]) selectEntity(state.visibleMatches[index]);
      });
    });

    if (result.footer) {
      footer.textContent = result.footer;
      footer.hidden = false;
    } else {
      footer.hidden = true;
      footer.textContent = "";
    }

    state.activeIndex = 0;
    highlightActiveItem();
    openMenu();
  }

  function clearSelection() {
    state.selected = null;
    showPrefill(false);
    updateSubmitButton();
  }

  function selectEntity(entity) {
    var input = byId("brr-business-name");
    if (!input || !entity) return;

    state.selected = entity;
    input.value = entity.name;
    fillPrefillFields(entity);
    showPrefill(true);
    updateSubmitButton();
    closeMenu();
    updateSearchHint(entity.name);
    input.focus();
  }

  function onSearchInput() {
    var input = byId("brr-business-name");
    if (!input) return;

    if (state.selected && input.value !== state.selected.name) {
      clearSelection();
    }

    updateSearchHint(input.value);

    var result = searchRegistry(input.value);
    if (result.tier === "short") {
      closeMenu();
      return;
    }

    if (!result.visible.length) {
      closeMenu();
      var hint = byId("brr-search-hint");
      if (hint) {
        hint.textContent = "No matches found for this search.";
        hint.classList.add("brr-search-hint--active");
      }
      return;
    }

    renderMenu(result);
  }

  function selectActiveMatch() {
    if (!state.visibleMatches.length) return;
    var index = state.activeIndex >= 0 ? state.activeIndex : 0;
    selectEntity(state.visibleMatches[index]);
  }

  function moveActive(step) {
    if (!state.menuOpen || !state.visibleMatches.length) return;

    if (state.activeIndex < 0) state.activeIndex = 0;
    else {
      state.activeIndex =
        (state.activeIndex + step + state.visibleMatches.length) % state.visibleMatches.length;
    }

    highlightActiveItem();
  }

  function submitForm() {
    var submit = byId("brr-submit-btn");
    if (!submit || submit.getAttribute("aria-disabled") === "true" || !state.selected) return;

    var entity = Object.assign({}, state.selected, {
      sample: state.selected.sample || "elevated",
    });

    try {
      sessionStorage.setItem("kybEntity", JSON.stringify(entity));
    } catch (e) {
      /* ignore quota / private mode */
    }

    window.location.href = RESULTS_URL;
  }

  function init() {
    var input = byId("brr-business-name");
    var submit = byId("brr-submit-btn");
    var cardBack = byId("brr-back-btn");
    var root = byId("brr-search");
    var countryRoot = byId("brr-country-select");
    var searchField = byId("brr-search-field");

    if (countryRoot) {
      countryRoot.addEventListener("click", function () {
        closeMenu();
      });
      countryRoot.addEventListener("tds-select:change", function (event) {
        var item = event.detail && event.detail.item;
        if (!item) return;
        var country = getCountryByCode(item.getAttribute("data-country-code"));
        if (country) applyCountryChange(country);
      });
    }

    if (window.TdsInteractiveSelect) {
      window.TdsInteractiveSelect.init(document);
    }

    if (input) {
      input.addEventListener("input", onSearchInput);
      input.addEventListener("focus", function () {
        if (window.TdsInteractiveSelect) window.TdsInteractiveSelect.closeAll();
        onSearchInput();
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          if (!state.menuOpen) onSearchInput();
          else moveActive(1);
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          moveActive(-1);
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          if (state.menuOpen) selectActiveMatch();
          else submitForm();
          return;
        }
        if (event.key === "Escape") closeMenu();
      });
    }

    document.addEventListener("mousedown", function (event) {
      if (searchField && !searchField.contains(event.target)) {
        closeMenu();
        return;
      }
      if (
        root &&
        root.contains(event.target) &&
        countryRoot &&
        !countryRoot.contains(event.target) &&
        window.TdsInteractiveSelect
      ) {
        window.TdsInteractiveSelect.closeAll();
      }
    });

    if (submit) submit.addEventListener("click", submitForm);

    if (cardBack) {
      cardBack.addEventListener("click", function () {
        if (window.LabsHistoryReturn && window.LabsHistoryReturn.go()) return;
        if (document.referrer) {
          window.history.back();
          return;
        }
        window.location.href = "../unified-intelligence-home/labs.html";
      });
    }

    updateSearchPlaceholder();
    updateSearchHint("");
    updateSubmitButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
