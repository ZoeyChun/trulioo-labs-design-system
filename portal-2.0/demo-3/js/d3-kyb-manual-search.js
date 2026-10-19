/* Demo 3 — manual KYB search (country select + typeahead + prefill).
   Interaction synced from portal-2.0/demo-2/verify-business/js/kyb-search.js.
   Submit hands off to D3KybMapSearch / D3KybReport. */
(function () {
  var MIN_QUERY_LEN = 3;
  var HINT_DEFAULT = "Enter at least 3 characters to search for a business.";

  var COUNTRIES = [
    { code: "gb", name: "United Kingdom", registry: "Companies House", broadTotal: 412 },
    { code: "us", name: "United States", registry: "Secretary of State business registry", broadTotal: 1284 },
    { code: "ca", name: "Canada", registry: "Corporations Canada", broadTotal: 296 },
    { code: "au", name: "Australia", registry: "ASIC business registry", broadTotal: 188 },
    { code: "de", name: "Germany", registry: "Handelsregister", broadTotal: 524 },
    { code: "nl", name: "Netherlands", registry: "KVK business registry", broadTotal: 241 },
    { code: "sg", name: "Singapore", registry: "ACRA business registry", broadTotal: 157 }
  ];

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
    lon: -0.093,
    lat: 51.513
  };

  var SEARCH_POOL_BY_COUNTRY = {
    gb: [
      MERIDIAN_APEX,
      { id: "meridian-global", name: "Meridian Global Holdings Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0012847", address1: "14 Bishopsgate", city: "London", state: "England", postal: "EC2N 3AR", sample: "standard", lon: -0.082, lat: 51.515 },
      { id: "meridian-capital", name: "Meridian Capital Advisors Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0039182", address1: "30 St Mary Axe", city: "London", state: "England", postal: "EC3A 8EP", sample: "standard", lon: -0.081, lat: 51.514 },
      { id: "meridian-east", name: "Meridian East Trading Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0045621", address1: "85 Fleet Street", city: "London", state: "England", postal: "EC4Y 1AE", sample: "standard", lon: -0.105, lat: 51.514 },
      { id: "meridian-bridge", name: "Meridian Bridge Consulting Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0051093", address1: "22 Old Broad Street", city: "London", state: "England", postal: "EC2N 1HQ", sample: "standard", lon: -0.084, lat: 51.516 },
      { id: "meridian-office", name: "Meridian Office Solutions Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0067744", address1: "10 Finsbury Square", city: "London", state: "England", postal: "EC2A 1AF", sample: "standard", lon: -0.087, lat: 51.521 },
      { id: "mercury-systems", name: "Mercury Systems Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0073310", address1: "5 Canada Square", city: "London", state: "England", postal: "E14 5AQ", sample: "standard", lon: -0.019, lat: 51.505 },
      { id: "mersey-industrial", name: "Mersey Industrial Group Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0089021", address1: "1 Spinningfields", city: "Manchester", state: "England", postal: "M3 3AP", sample: "standard", lon: -2.25, lat: 53.479 },
      { id: "merchant-row", name: "Merchant Row Properties Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0091184", address1: "45 Gresham Street", city: "London", state: "England", postal: "EC2V 7BG", sample: "standard", lon: -0.093, lat: 51.516 },
      { id: "meridian-north", name: "Meridian North Services Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0104455", address1: "2 Snow Hill", city: "London", state: "England", postal: "EC1A 2DH", sample: "standard", lon: -0.104, lat: 51.518 },
      { id: "meridian-works", name: "Meridian Works Ltd.", country: "United Kingdom", countryCode: "gb", brn: "GB-0112290", address1: "100 Liverpool Street", city: "London", state: "England", postal: "EC2M 2AT", sample: "standard", lon: -0.082, lat: 51.518 }
    ],
    us: [
      { id: "us-cap", name: "Meridian Capital LLC", country: "United States", countryCode: "us", brn: "NY DOS 4417762", address1: "200 Vesey Street", city: "New York", state: "NY", postal: "10281", sample: "standard", lon: -74.0159, lat: 40.7128 },
      { id: "us-global", name: "Meridian Global Partners Inc.", country: "United States", countryCode: "us", brn: "DE File 5582014", address1: "1209 Orange Street", city: "Wilmington", state: "DE", postal: "19801", sample: "elevated", lon: -75.5466, lat: 39.748 },
      { id: "us-sf", name: "Meridian Analytics Inc.", country: "United States", countryCode: "us", brn: "CA SOS C4129087", address1: "525 Market Street", city: "San Francisco", state: "CA", postal: "94105", sample: "standard", lon: -122.3972, lat: 37.7897 },
      { id: "us-chi", name: "Meridian Industrial Holdings LLC", country: "United States", countryCode: "us", brn: "IL SOS 04581276", address1: "233 S Wacker Drive", city: "Chicago", state: "IL", postal: "60606", sample: "standard", lon: -87.6359, lat: 41.8789 },
      { id: "meridian-partners-us", name: "Meridian Partners Inc.", country: "United States", countryCode: "us", brn: "US-7731-INC", address1: "200 California St", city: "San Francisco", state: "CA", postal: "94111", sample: "standard", lon: -122.399, lat: 37.793 },
      { id: "mercury-financial", name: "Mercury Financial Group Inc.", country: "United States", countryCode: "us", brn: "US-4410-INC", address1: "350 Madison Ave", city: "New York", state: "NY", postal: "10017", sample: "standard", lon: -73.98, lat: 40.753 },
      { id: "merchant-services", name: "Merchant Services LLC", country: "United States", countryCode: "us", brn: "US-9022-LLC", address1: "480 Mission St", city: "San Francisco", state: "CA", postal: "94105", sample: "standard", lon: -122.397, lat: 37.79 },
      { id: "meridian-ridge", name: "Meridian Ridge Capital LLC", country: "United States", countryCode: "us", brn: "US-1188-LLC", address1: "71 Stevenson St", city: "San Francisco", state: "CA", postal: "94105", sample: "standard", lon: -122.4, lat: 37.789 },
      { id: "meridian-coastal", name: "Meridian Coastal Holdings Inc.", country: "United States", countryCode: "us", brn: "US-5520-INC", address1: "101 California St", city: "San Francisco", state: "CA", postal: "94111", sample: "standard", lon: -122.398, lat: 37.793 },
      { id: "meridian-pacific", name: "Meridian Pacific Advisors Inc.", country: "United States", countryCode: "us", brn: "US-6631-INC", address1: "555 California St", city: "San Francisco", state: "CA", postal: "94104", sample: "standard", lon: -122.404, lat: 37.793 },
      { id: "mersey-logistics", name: "Mersey Logistics Corp.", country: "United States", countryCode: "us", brn: "US-7744-CORP", address1: "1 Market St", city: "San Francisco", state: "CA", postal: "94105", sample: "standard", lon: -122.394, lat: 37.794 },
      { id: "meridian-apex-us", name: "Meridian Apex Consulting Inc.", country: "United States", countryCode: "us", brn: "US-8891-INC", address1: "50 Fremont St", city: "San Francisco", state: "CA", postal: "94105", sample: "elevated", lon: -122.395, lat: 37.791 }
    ]
  };

  var typeahead = {
    country: getCountryByCode("us"),
    selected: null,
    activeIndex: -1,
    menuOpen: false,
    visibleMatches: []
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getCountryByCode(code) {
    for (var i = 0; i < COUNTRIES.length; i++) {
      if (COUNTRIES[i].code === code) return COUNTRIES[i];
    }
    return COUNTRIES[1];
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
    return SEARCH_POOL_BY_COUNTRY[typeahead.country.code] || [];
  }

  function registryLabel() {
    return typeahead.country.registry;
  }

  function searchRegistry(query) {
    var q = normalize(query);
    if (q.length < MIN_QUERY_LEN) {
      return { tier: "short", visible: [], total: 0, footer: "" };
    }

    var tier = getSearchTier(q);
    var catalog = getRegistryPool();
    var pool = catalog
      .filter(function (item) {
        return nameMatches(item.name, q);
      })
      .sort(function (a, b) {
        return rankEntity(b, q, tier) - rankEntity(a, q, tier);
      });

    if (!pool.length) {
      return {
        tier: tier,
        visible: [],
        total: 0,
        footer: "No matches in " + registryLabel() + " for this search"
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
        footer: exactVisible.length === 1 ? "1 match in " + registryLabel() : ""
      };
    }

    if (tier === "narrow") {
      var narrowPool = pool.filter(function (item) {
        return normalize(item.name).indexOf("meridian") !== -1;
      });
      var narrowVisible = (narrowPool.length ? narrowPool : pool).slice(0, 5);
      var narrowTotal = typeahead.country.broadTotal || narrowPool.length || narrowVisible.length;
      if (narrowPool.length) narrowTotal = Math.max(narrowPool.length, narrowTotal);
      return {
        tier: tier,
        visible: narrowVisible,
        total: narrowTotal,
        footer: narrowVisible.length
          ? "Showing " + narrowVisible.length + " of " + narrowTotal + " matches — keep typing to refine"
          : ""
      };
    }

    if (tier === "broad") {
      var broadVisible = pool.slice(0, 8);
      var broadTotal = typeahead.country.broadTotal || broadVisible.length;
      return {
        tier: tier,
        visible: broadVisible,
        total: broadTotal,
        footer: broadVisible.length
          ? "Showing " + broadVisible.length + " of " + broadTotal + " matches — keep typing to refine"
          : ""
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
        : "No matches in " + registryLabel() + " for this search"
    };
  }

  function fillPrefillFields(entity) {
    var brn = byId("vb-prefill-brn");
    var address = byId("vb-prefill-address");
    var city = byId("vb-prefill-city");
    var st = byId("vb-prefill-state");
    var postal = byId("vb-prefill-postal");
    if (brn) brn.value = entity.brn || "";
    if (address) address.value = entity.address1 || "";
    if (city) city.value = entity.city || "";
    if (st) st.value = entity.state || "";
    if (postal) postal.value = entity.postal || "";
  }

  function showPrefill(show) {
    var section = byId("vb-prefill");
    var lookup = byId("vb-lookup");
    if (section) section.hidden = !show;
    if (lookup) lookup.classList.toggle("vb-lookup--filled", !!show);
  }

  function updateSubmitButton() {
    var submit = byId("vb-submit-btn");
    if (!submit) return;
    if (typeahead.selected) submit.removeAttribute("aria-disabled");
    else submit.setAttribute("aria-disabled", "true");
  }

  function updateSearchPlaceholder() {
    var input = byId("vb-q");
    var label = document.querySelector('label[for="vb-q"]');
    if (!input) return;
    var text = "Search for " + typeahead.country.name + " business";
    input.placeholder = text;
    if (label) label.textContent = text;
  }

  function updateSearchHint(query) {
    var hint = byId("vb-search-hint");
    if (!hint) return;

    var q = normalize(query);
    if (typeahead.selected && q === normalize(typeahead.selected.name)) {
      hint.textContent = HINT_DEFAULT;
      hint.classList.remove("vb-search-hint--active");
      return;
    }

    if (!q.length) {
      hint.textContent = HINT_DEFAULT;
      hint.classList.remove("vb-search-hint--active");
      return;
    }

    if (q.length < MIN_QUERY_LEN) {
      hint.textContent =
        "Type " +
        (MIN_QUERY_LEN - q.length) +
        " more character" +
        (MIN_QUERY_LEN - q.length === 1 ? "" : "s") +
        ".";
      hint.classList.add("vb-search-hint--active");
      return;
    }

    hint.textContent = HINT_DEFAULT;
    hint.classList.remove("vb-search-hint--active");
  }

  function closeMenu() {
    var root = byId("vb-combobox");
    var list = byId("vb-search-list");
    var input = byId("vb-q");
    if (!root || !list || !input) return;

    root.classList.remove("tds-combobox--open");
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    typeahead.menuOpen = false;
    typeahead.activeIndex = -1;
    typeahead.visibleMatches = [];
  }

  function openMenu() {
    var root = byId("vb-combobox");
    var list = byId("vb-search-list");
    var input = byId("vb-q");
    if (!root || !list || !input) return;

    root.classList.add("tds-combobox--open");
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    typeahead.menuOpen = true;
  }

  function highlightActiveItem() {
    var options = byId("vb-search-options");
    if (!options) return;

    options.querySelectorAll(".tds-action-list-item").forEach(function (item, index) {
      item.classList.toggle("tds-action-list-item--active", index === typeahead.activeIndex);
      if (index === typeahead.activeIndex) item.setAttribute("aria-selected", "true");
      else item.removeAttribute("aria-selected");
    });
  }

  function renderMenu(result) {
    var list = byId("vb-search-list");
    var options = byId("vb-search-options");
    var footer = byId("vb-search-footer");
    if (!list || !options || !footer) return;

    typeahead.visibleMatches = result.visible || [];

    if (!typeahead.visibleMatches.length) {
      options.innerHTML = "";
      footer.hidden = true;
      footer.textContent = "";
      closeMenu();
      return;
    }

    options.innerHTML = typeahead.visibleMatches
      .map(function (item, index) {
        return (
          '<button type="button" class="tds-action-list-item vb-combobox__option" role="option" data-index="' +
          index +
          '">' +
          '<span class="tds-action-list-item__content">' +
          '<span class="tds-action-list-item__label">' +
          esc(item.name) +
          "</span>" +
          '<span class="tds-action-list-item__description">' +
          esc(item.country) +
          "</span>" +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    options.querySelectorAll(".vb-combobox__option").forEach(function (button) {
      button.addEventListener("mousedown", function (event) {
        event.preventDefault();
        var index = Number(button.getAttribute("data-index"));
        if (typeahead.visibleMatches[index]) selectEntity(typeahead.visibleMatches[index]);
      });
    });

    if (result.footer) {
      footer.textContent = result.footer;
      footer.hidden = false;
    } else {
      footer.hidden = true;
      footer.textContent = "";
    }

    typeahead.activeIndex = 0;
    highlightActiveItem();
    openMenu();
  }

  function clearSelection() {
    typeahead.selected = null;
    showPrefill(false);
    updateSubmitButton();
  }

  function selectEntity(entity) {
    var input = byId("vb-q");
    if (!input || !entity) return;

    typeahead.selected = entity;
    input.value = entity.name;
    fillPrefillFields(entity);
    showPrefill(true);
    updateSubmitButton();
    closeMenu();
    updateSearchHint(entity.name);
    input.focus();
  }

  function onSearchInput() {
    var input = byId("vb-q");
    if (!input) return;

    if (typeahead.selected && input.value !== typeahead.selected.name) {
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
      var hint = byId("vb-search-hint");
      if (hint) {
        hint.textContent = "No matches found for this search.";
        hint.classList.add("vb-search-hint--active");
      }
      return;
    }

    renderMenu(result);
  }

  function selectActiveMatch() {
    if (!typeahead.visibleMatches.length) return;
    var index = typeahead.activeIndex >= 0 ? typeahead.activeIndex : 0;
    selectEntity(typeahead.visibleMatches[index]);
  }

  function moveActive(step) {
    if (!typeahead.menuOpen || !typeahead.visibleMatches.length) return;

    if (typeahead.activeIndex < 0) typeahead.activeIndex = 0;
    else {
      typeahead.activeIndex =
        (typeahead.activeIndex + step + typeahead.visibleMatches.length) %
        typeahead.visibleMatches.length;
    }

    highlightActiveItem();
  }

  function applyCountryChange(country) {
    if (!country || country.code === typeahead.country.code) return;

    typeahead.country = country;
    var trigger = byId("vb-country-trigger");
    if (trigger) trigger.setAttribute("aria-label", "Country, " + country.name);

    var input = byId("vb-q");
    if (input) input.value = "";
    updateSearchPlaceholder();
    clearSelection();
    updateSearchHint("");
    closeMenu();
  }

  function entityToBiz(entity) {
    if (!entity) return null;
    if (window.D3KybMapSearch) {
      var byIdHit = window.D3KybMapSearch.findById && window.D3KybMapSearch.findById(entity.id);
      if (byIdHit) return byIdHit;
      var byName = window.D3KybMapSearch.findByName && window.D3KybMapSearch.findByName(entity.name);
      if (byName) return byName;
    }

    var addr = [entity.address1, entity.city, entity.state, entity.postal].filter(Boolean).join(", ");
    var elevated = entity.sample === "elevated";
    return {
      id: entity.id,
      name: entity.name,
      city: [entity.city, entity.state].filter(Boolean).join(", "),
      addr: addr,
      reg: entity.brn,
      status: "Active",
      brief: entity.country + " · " + (entity.brn || "Registry match"),
      lat: entity.lat != null ? entity.lat : 0,
      lon: entity.lon != null ? entity.lon : 0,
      riskLevel: elevated ? "high" : "low",
      ownership: [],
      risks: elevated
        ? [
            {
              id: "elevated",
              label: "Elevated review signals",
              severity: "high",
              evidence: "Demo profile flagged for additional review."
            }
          ]
        : [],
      alerts: {
        adverseMedia: "None found",
        sanctions: "None found",
        litigation: "None found",
        positivePress: "None found"
      },
      report: {
        industry: "Registered under NAICS 541611",
        industryNote:
          "(management consulting activities), a catch-all code. No evidence of active trading, clients, or revenue.",
        regDate: "Incorporated (demo registry)",
        legalForm: "Private company",
        address: addr,
        sizing: elevated ? "0 employees; shell holding structure." : "Operating company (demo).",
        regNumber: entity.brn,
        taxId: "EIN demo",
        phone: "+1 (555) 010-0100",
        email: "info@example.com",
        country: entity.country,
        sumA: entity.name + " matched an active filing in " + entity.country + "."
      }
    };
  }

  function submitSelected() {
    var submit = byId("vb-submit-btn");
    if (!submit || submit.getAttribute("aria-disabled") === "true" || !typeahead.selected) return;

    var biz = entityToBiz(typeahead.selected);
    closeMenu();
    if (!biz) return;

    /* Manual form Submit → run verification immediately (demo-2 fromForm).
       Skip the chat Confirm / Cancel CTA used for map/card picks. */
    var homeInput = document.querySelector("[data-d1-input]");
    if (homeInput) {
      homeInput.value = "";
      homeInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
    if (window.D3KybMapSearch && window.D3KybMapSearch.selectBusiness) {
      window.D3KybMapSearch.selectBusiness(biz, {
        confirmed: true,
        skipUserTurn: true,
        fromForm: true
      });
      return;
    }

    if (window.D3KybReport && window.D3KybReport.reveal) {
      window.D3KybReport.reveal(biz);
    }
  }

  function initTypeahead() {
    var input = byId("vb-q");
    var submit = byId("vb-submit-btn");
    var root = byId("vb-combobox");
    var countryRoot = byId("vb-country-select");
    var searchField = byId("vb-search-field");

    if (!input || !searchField) return;

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

    input.addEventListener("input", onSearchInput);
    input.addEventListener("focus", function () {
      if (window.TdsInteractiveSelect) window.TdsInteractiveSelect.closeAll();
      onSearchInput();
    });
    input.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!typeahead.menuOpen) onSearchInput();
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
        if (typeahead.menuOpen) selectActiveMatch();
        else submitSelected();
        return;
      }
      if (event.key === "Escape") closeMenu();
    });

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

    if (submit) {
      submit.addEventListener("click", function (event) {
        event.preventDefault();
        submitSelected();
      });
    }

    updateSearchPlaceholder();
    updateSearchHint("");
    updateSubmitButton();
  }

  function init() {
    initTypeahead();
    window.D3KybManualSearch = {
      submitSelected: submitSelected,
      clearSelection: clearSelection,
      getSelected: function () {
        return typeahead.selected;
      }
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
