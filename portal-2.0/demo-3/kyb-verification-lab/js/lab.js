/* Demo 3 — KYB verification lab.
   Behaviour overrides for kyb-verification-lab.html only. Loaded last, after
   every shared js/*.js file. Put experimental scripts here instead of editing
   demo-3/js/.

   What this adds: a Pre-fill switch on the KYB landing.

     Pre-fill ON  (default) — the shipped experience. The combobox searches the
       registry from the 3rd keystroke and fills the details on click.

     Pre-fill OFF — the contract has no pre-fill, so the business details have
       to be asked for explicitly:
         1. "How would you like to provide business details?"
            → Search Business Registry (Business Finder) | Enter Manually
         2. Finder: one search box, a Company name / Registration number
            toggle, and a Search button. Nothing runs on keystroke — the whole
            value is submitted at once, which is also why BRN works here and
            not in the typeahead.
         3. Results use the business-selector list: city filters, paged
            cards (status, BRN, address) and a "Select this business"
            button. The form is populated only once that button is pressed.

   The selection itself still runs through the forked manual-search module, so
   the package, fields and Execute verification below behave the same either way. */
(function () {
  var SEARCH_BY = { name: "Company name", brn: "Registration number" };

  var lab = {
    on: true,
    step: "choice", // choice | finder | manual — only meaningful when off
    by: "name",
    selected: null
  };

  function MS() { return window.D3KybManualSearch; }
  function S() { return window.D3KybSession; }
  function byId(id) { return document.getElementById(id); }
  function q(sel) { return document.querySelector(sel); }

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* BRN lookups should survive the punctuation registries sprinkle through
     their numbers: "GB-0012847" and "gb 0012847" are the same company. */
  function loose(v) { return String(v || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function norm(v) { return String(v || "").trim().toLowerCase(); }

  function registryName() {
    var c = MS() && MS().getCountry();
    return (c && c.registry) || "the business registry";
  }

  /* ---------- the switch ---------- */

  function syncSwitch() {
    var sw = q("[data-lab-prefill-switch]");
    var note = q("[data-lab-prefill-note]");
    if (sw) {
      sw.setAttribute("aria-checked", lab.on ? "true" : "false");
      sw.classList.toggle("tds-switch__track--on", lab.on);
    }
    /* The strip is deliberately terse — the state word is the whole label. */
    if (note) note.textContent = lab.on ? "On" : "Off";
  }

  function setPrefill(on) {
    lab.on = !!on;
    if (MS() && MS().setPrefillMode) MS().setPrefillMode(lab.on);

    /* Either direction starts clean: no half-finished selection carried over. */
    clearResults();
    lab.selected = null;
    if (MS() && MS().clearSelection) MS().clearSelection();
    var input = byId("vb-q");
    if (input) input.value = "";

    if (lab.on) {
      /* Back to the shipped flow — the typeahead needs Finder on to search. */
      if (S()) S().set({ finderEnabled: true, profileDone: false }, "manual");
      lab.step = "choice";
      lab.by = "name";
    } else {
      lab.step = "choice";
      lab.by = "name";
      if (S()) S().set({ finderEnabled: true, profileDone: false }, "manual");
    }
    syncManualSource();

    syncSwitch();
    render();
  }

  /* ---------- step chrome ---------- */

  function render() {
    var lookup = byId("vb-lookup");
    var choice = q("[data-lab-choice]");
    var finderBar = q("[data-lab-finder-bar]");
    var manualBar = q("[data-lab-manual-bar]");
    var manualCountry = q("[data-lab-manual-country]");
    var go = q("[data-lab-finder-go]");
    var results = q("[data-lab-finder-results]");
    var hint = byId("vb-search-hint");
    if (!lookup) return;

    var off = !lab.on;
    /* A picked business retires the finder chrome. Only the confirmation stays. */
    var picked = off && !!lab.selected;
    lookup.classList.toggle("vb-lookup--lab-off", off);
    lookup.classList.toggle("vb-lookup--lab-choice", off && lab.step === "choice");
    lookup.classList.toggle("vb-lookup--lab-picked", picked);

    if (choice) choice.hidden = !(off && lab.step === "choice");
    if (finderBar) finderBar.hidden = !(off && lab.step === "finder" && !picked);
    if (manualBar) manualBar.hidden = !(off && lab.step === "manual");
    if (manualCountry) manualCountry.hidden = !(off && lab.step === "manual");
    if (go) go.hidden = !(off && lab.step === "finder");
    if (results) results.hidden = !(off && lab.step === "finder");

    var reg = q("[data-lab-registry]");
    if (reg) reg.textContent = registryName();

    document.querySelectorAll("[data-lab-finder-by]").forEach(function (b) {
      var on = b.getAttribute("data-lab-finder-by") === lab.by;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.classList.toggle("tds-segmented-control__item--selected", on);
    });

    if (!off) return; // the shipped hint and placeholder are the module's business

    /* The one field does three jobs, so it has to say which one it is on. */
    var input = byId("vb-q");
    if (input && lab.step !== "choice") {
      input.placeholder = lab.step === "manual"
        ? "Business legal name"
        : lab.by === "brn"
          ? "Enter the full registration number"
          : "Enter the full business name";
    }

    if (hint) {
      hint.classList.remove("vb-search-hint--active");
      if (lab.step === "finder") {
        hint.textContent = lab.by === "brn"
          ? "Enter the full registration number, then press Search."
          : "Enter the full business name, then press Search.";
      } else if (lab.step === "manual") {
        hint.textContent = "Enter the business’s legal name as it appears on the register.";
      }
    }
  }

  function goStep(step) {
    lab.step = step;
    if (step === "choice") lab.by = "name";
    clearResults();
    lab.selected = null;
    if (MS() && MS().clearSelection) MS().clearSelection();

    /* Manual entry is the session's existing "Finder off" mode: the entity
       form takes over and nothing is looked up. profileDone retires the
       redundant Entity profile card — the Required / Recommended fields
       collect the same thing. */
    if (S()) S().set({ finderEnabled: step !== "manual", profileDone: step === "manual" }, "manual");
    syncManualSource();

    /* Whatever was typed belonged to the previous method — a BRN is not a
       legal name, and a half-typed search is not an entity. */
    var input = byId("vb-q");
    if (input) input.value = "";
    render();
    if (input && step !== "choice") input.focus();
  }

  /* ---------- manual entry reads the form's own fields ----------
     The shipped manual flow adds an "Entity profile" card asking for legal
     name / registration number / address — the same ground the Required and
     Recommended fields already cover. Setting profileDone drops that card;
     these helpers then read the entity out of the fields that remain. */

  function fieldInput(label) {
    var host = q("[data-d3-kyb-fields]");
    if (!host) return null;
    var wraps = host.querySelectorAll(".tds-text-input");
    for (var i = 0; i < wraps.length; i += 1) {
      var l = wraps[i].querySelector(".tds-field-label");
      if (l && l.textContent.trim() === label) return wraps[i].querySelector("input");
    }
    return null;
  }

  function fieldValue(label) {
    var el = fieldInput(label);
    return el ? el.value.trim() : "";
  }

  /* Street lives in the Optional accordion; City / State / Postal are
     Recommended. Whatever the user filled in becomes the address. */
  function manualValues() {
    return {
      name: fieldValue("Business Name"),
      regNo: fieldValue("Business Registration Number"),
      address: ["Address 1", "City", "State Province", "Postal Code"]
        .map(fieldValue).filter(Boolean).join(", "),
      taxId: fieldValue("Tax ID Number")
    };
  }

  /* Business Name is the one field marked Required for verification. */
  function manualReady() {
    return !!fieldValue("Business Name");
  }

  var MANUAL_SOURCE = { values: manualValues, ready: manualReady };

  function syncManualSource() {
    if (!MS() || !MS().setManualSource) return;
    MS().setManualSource(!lab.on && lab.step === "manual" ? MANUAL_SOURCE : null);
  }

  /* ---------- the Finder ---------- */

  function clearResults() {
    var results = q("[data-lab-finder-results]");
    if (results) results.innerHTML = "";
  }

  function searchPool(query) {
    var pool = (MS() && MS().getPool && MS().getPool()) || [];
    if (lab.by === "brn") {
      var lq = loose(query);
      if (!lq) return [];
      return pool.filter(function (e) { return loose(e.brn).indexOf(lq) !== -1; })
        .sort(function (a, b) { return (loose(a.brn) === lq ? -1 : 0) - (loose(b.brn) === lq ? -1 : 0); });
    }
    var nq = norm(query);
    if (!nq) return [];
    return pool.filter(function (e) { return norm(e.name).indexOf(nq) !== -1; })
      .sort(function (a, b) {
        var ai = norm(a.name).indexOf(nq), bi = norm(b.name).indexOf(nq);
        if (ai !== bi) return ai - bi; // a name that starts with the query first
        return a.name.localeCompare(b.name);
      });
  }

  function addressOf(e) {
    var line = [e.address1, e.city, e.state].filter(Boolean).join(", ");
    if (e.postal) line = line ? line + " " + e.postal : e.postal;
    return line;
  }

  /* The demo pool marks the one business with something to find as
     "elevated"; everything else is a clean active filing. */
  function statusOf(e) {
    var flagged = e.sample === "elevated";
    return {
      label: flagged ? "Review" : "Active",
      cls: flagged ? "tds-tag--intermediate" : "tds-tag--positive"
    };
  }

  var PAGE = 3;
  var CHEVRON_PREV = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3 5 8l5 5"/></svg>';
  var CHEVRON_NEXT = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5"/></svg>';

  /* City filter + page, kept across chip and pager clicks. */
  var finderView = { city: "", page: 0, query: "" };
  var lastMatches = [];

  function entityCard(e, index) {
    var status = statusOf(e);
    return '<article class="lab-entity">' +
      '<span class="lab-entity__mark" aria-hidden="true"><i class="fa-regular fa-building"></i></span>' +
      '<div class="lab-entity__copy">' +
        '<div class="lab-entity__head">' +
          '<h3 class="lab-entity__name">' + esc(e.name) + "</h3>" +
          '<span class="tds-tag tds-tag--sm ' + status.cls + '">' + status.label + "</span>" +
        "</div>" +
        '<p class="lab-entity__addr">' + esc(addressOf(e) || "—") + "</p>" +
        '<p class="lab-entity__brn">' + esc(e.brn || "—") + "</p>" +
      "</div>" +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md lab-entity__select" data-lab-select="' + index + '">Select this business</button>' +
    "</article>";
  }

  function emptyCard(query) {
    return '<div class="lab-finder-panel">' +
      '<p class="lab-finder-panel__title">No match for “' + esc(query) + "”</p>" +
      '<article class="lab-entity lab-entity--empty">' +
        "<p>Nothing in " + esc(registryName()) + " matches “" + esc(query) + "”" +
        (lab.by === "brn" ? " as a registration number." : " as a business name.") +
        " Check the spelling, try the other search type, or enter the details yourself.</p>" +
        '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm" data-lab-choice-go="manual">Enter manually</button>' +
      "</article></div>";
  }

  function paintResults() {
    var results = q("[data-lab-finder-results]");
    if (!results) return;
    var query = finderView.query;
    if (!lastMatches.length) {
      results.innerHTML = emptyCard(query);
      return;
    }

    var cities = {};
    lastMatches.forEach(function (e) {
      var label = e.city || "Other";
      if (!cities[label]) cities[label] = { label: label, n: 0 };
      cities[label].n += 1;
    });
    var chips = Object.keys(cities).map(function (key) { return cities[key]; });
    chips.sort(function (a, b) {
      if (b.n !== a.n) return b.n - a.n;
      return a.label.localeCompare(b.label);
    });

    var filtered = finderView.city
      ? lastMatches.filter(function (e) { return (e.city || "Other") === finderView.city; })
      : lastMatches.slice();
    var pages = Math.max(1, Math.ceil(filtered.length / PAGE) || 1);
    if (finderView.page > pages - 1) finderView.page = pages - 1;
    if (finderView.page < 0) finderView.page = 0;
    var start = finderView.page * PAGE;
    var slice = filtered.slice(start, start + PAGE);
    var from = filtered.length ? start + 1 : 0;
    var to = start + slice.length;

    var chipHtml = chips.length > 1
      ? '<div class="lab-finder-panel__chips">' + chips.map(function (chip) {
          var on = chip.label === finderView.city;
          return '<button type="button" class="lab-finder-panel__chip' + (on ? " is-on" : "") +
            '" data-lab-city="' + esc(chip.label) + '" aria-pressed="' + (on ? "true" : "false") + '">' +
            esc(chip.label) + '<span class="lab-finder-panel__count">' + chip.n + "</span></button>";
        }).join("") + "</div>"
      : "";

    var rowHtml = slice.length
      ? slice.map(function (e) { return entityCard(e, lastMatches.indexOf(e)); }).join("")
      : '<p class="lab-finder-panel__empty">No businesses in this city.</p>';

    results.innerHTML =
      '<div class="lab-finder-panel">' +
        '<p class="lab-finder-panel__title">Which “' + esc(query) + "” should I investigate?</p>" +
        '<div class="lab-finder-panel__body">' +
          chipHtml +
          '<div class="lab-finder-panel__rows">' + rowHtml + "</div>" +
          '<div class="lab-finder-panel__pager">' +
            "<span>" + (filtered.length ? from + "-" + to + " of " + filtered.length : "0 of 0") + "</span>" +
            '<span class="lab-finder-panel__pages">' +
              '<button type="button" class="lab-finder-panel__page" data-lab-page="prev"' +
                (finderView.page <= 0 ? " disabled" : "") +
                ' aria-label="Previous businesses">' + CHEVRON_PREV + "</button>" +
              '<button type="button" class="lab-finder-panel__page" data-lab-page="next"' +
                (finderView.page >= pages - 1 ? " disabled" : "") +
                ' aria-label="Next businesses">' + CHEVRON_NEXT + "</button>" +
            "</span>" +
          "</div>" +
        "</div>" +
      "</div>";
  }

  function runFinder() {
    var input = byId("vb-q");
    var results = q("[data-lab-finder-results]");
    if (!input || !results) return;

    var query = input.value.trim();
    if (!query) {
      results.innerHTML = '<p class="lab-finder-results__count">Enter a ' +
        (lab.by === "brn" ? "registration number" : "business name") + " to search " +
        esc(registryName()) + ".</p>";
      input.focus();
      return;
    }

    finderView.city = "";
    finderView.page = 0;
    finderView.query = query;
    lastMatches = searchPool(query);
    paintResults();
  }

  function selectMatch(index) {
    var entity = lastMatches[index];
    var results = q("[data-lab-finder-results]");
    if (!entity || !MS() || !MS().selectEntity) return;

    lab.selected = entity;
    MS().selectEntity(entity);

    if (results) {
      results.innerHTML = '<div class="lab-selected">' +
        '<span class="lab-selected__text">Selected <b>' + esc(entity.name) + "</b> — details below are from " +
        esc(registryName()) + ".</span>" +
        '<button type="button" class="lab-link" data-lab-finder-again>Search again</button>' +
      "</div>";
    }
    render();
  }

  function setSearchBy(by) {
    if (!SEARCH_BY[by] || by === lab.by) return;
    lab.by = by;

    /* A BRN is not a name — the previous results and the typed value no
       longer mean anything. */
    clearResults();
    lab.selected = null;
    if (MS() && MS().clearSelection) MS().clearSelection();
    var input = byId("vb-q");
    if (input) input.value = "";
    render();
    if (input) input.focus();
  }

  /* ---------- add-ons (experimental layouts) ----------
     Offered list follows the package already chosen in Default configuration.
     Essentials has none. Insights adds the two ownership modules that
     Complete already includes. Checks survive a layout switch. */

  var ADDONS = [
    { id: "filings", name: "Filings", note: "Additional information on the business such as Judgements, Bankruptcies, Insolvencies etc." },
    { id: "web", name: "Web Insights" },
    { id: "ubo", name: "UBO Discovery", insightsOnly: true },
    { id: "ubopsc", name: "UBO and PSC Discovery", insightsOnly: true },
    { id: "risk", name: "Business Risk Values" },
    { id: "monitoring", name: "Monitoring History" }
  ];

  lab.addonLayout = "form"; // form | below | accordion | select
  lab.addons = [];
  lab.addonsOpen = false; // option 4: the list is inserted only after "Select add-ons"
  lab.addonsAccOpen = false; // option 3 starts closed, like Optional
  var addonSig = "";
  var ACC_CHEVRON = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>';

  function packageId() {
    var st = S() && S().get && S().get();
    return (st && st.package) || "insights";
  }

  function offeredAddons() {
    var id = packageId();
    if (id === "essentials") return [];
    return ADDONS.filter(function (a) { return !(id === "complete" && a.insightsOnly); });
  }

  function addonList(list) {
    return '<div class="lab-addons__list">' +
      list.map(function (a) {
        var on = lab.addons.indexOf(a.id) !== -1;
        return '<label class="lab-addons__item">' +
          '<input class="tds-checkbox" type="checkbox" data-lab-addon="' + a.id + '"' + (on ? " checked" : "") + ">" +
          '<span class="lab-addons__copy"><span class="lab-addons__name">' + esc(a.name) + "</span>" +
          (a.note ? '<span class="lab-addons__note">' + esc(a.note) + "</span>" : "") +
          "</span></label>";
      }).join("") +
      "</div>";
  }

  /* In the form the heading sits with the fields. Below the form it sits
     outside the card, the way "Recent transactions" sits above its list.
     The collapsible copy uses the same chevron row as Optional. */
  function addonMarkup(list, place) {
    if (!list.length) return "";
    var listHtml = addonList(list);
    if (place === "below") {
      return '<h2 class="lab-addons__title">Add-ons</h2><div class="lab-addons__panel">' + listHtml + "</div>";
    }
    if (place === "accordion") {
      var on = lab.addonsAccOpen;
      return '<div class="d3-kyb-fields__acc' + (on ? " is-open" : "") + '" data-lab-addons-acc>' +
        '<button type="button" class="d3-kyb-fields__acc-head" aria-expanded="' + (on ? "true" : "false") + '" data-lab-addons-toggle>' +
        '<span class="d3-kyb-fields__acc-chevron" aria-hidden="true">' + ACC_CHEVRON + "</span>" +
        '<span class="d3-kyb-fields__acc-title">Add-ons</span></button>' +
        '<div class="d3-kyb-fields__acc-body"><div class="lab-addons__acc-body">' + listHtml + "</div></div></div>";
    }
    return '<h3 class="lab-addons__title">Add-ons</h3>' + listHtml;
  }

  function refreshAddons() {
    var prefill = byId("vb-prefill");
    var formOpen = !!(prefill && !prefill.hidden);
    var list = offeredAddons();
    var offeredIds = list.map(function (a) { return a.id; });
    lab.addons = lab.addons.filter(function (id) { return offeredIds.indexOf(id) !== -1; });

    /* A fresh form starts with the collapsible closed and the select
       button unpressed. Checks themselves stay until the package drops them. */
    if (!formOpen && (lab.addonsOpen || lab.addonsAccOpen)) {
      lab.addonsOpen = false;
      lab.addonsAccOpen = false;
      addonSig = "";
    }

    var sig = packageId() + "|" + offeredIds.join(",") + "|" + lab.addons.join(",") + "|" + (lab.addonsAccOpen ? "1" : "0");
    if (sig !== addonSig) {
      addonSig = sig;
      document.querySelectorAll("[data-lab-addons]").forEach(function (el) {
        el.innerHTML = addonMarkup(list, el.getAttribute("data-lab-addons"));
      });
    }

    var sw = q("[data-lab-addon-switch]");
    if (sw) sw.hidden = !formOpen;
    document.querySelectorAll("[data-lab-addon-layout]").forEach(function (b) {
      var on = b.getAttribute("data-lab-addon-layout") === lab.addonLayout;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.classList.toggle("tds-segmented-control__item--selected", on);
    });
    document.querySelectorAll("[data-lab-addons]").forEach(function (el) {
      var place = el.getAttribute("data-lab-addons");
      var show = formOpen && !!list.length && place === lab.addonLayout;
      if (place === "select") show = show && lab.addonsOpen;
      el.hidden = !show;
    });
    var selectHost = q("[data-lab-addons-select]");
    if (selectHost) selectHost.hidden = !(formOpen && list.length && lab.addonLayout === "select");
    var revealBtn = q("[data-lab-addons-reveal]");
    if (revealBtn) revealBtn.hidden = !!lab.addonsOpen;
  }

  function setAddonLayout(layout) {
    if (layout !== "form" && layout !== "below" && layout !== "accordion" && layout !== "select") return;
    lab.addonLayout = layout;
    addonSig = "";
    refreshAddons();
  }

  /* ---------- wiring ---------- */

  function onClick(event) {
    var t = event.target;
    if (!t || !t.closest) return;

    var sw = t.closest("[data-lab-prefill-switch]");
    if (sw) { event.preventDefault(); setPrefill(!lab.on); return; }

    var layoutBtn = t.closest("[data-lab-addon-layout]");
    if (layoutBtn) {
      event.preventDefault();
      setAddonLayout(layoutBtn.getAttribute("data-lab-addon-layout"));
      return;
    }

    if (t.closest("[data-lab-addons-reveal]")) {
      event.preventDefault();
      lab.addonsOpen = true;
      refreshAddons();
      return;
    }

    var accToggle = t.closest("[data-lab-addons-toggle]");
    if (accToggle) {
      event.preventDefault();
      lab.addonsAccOpen = !lab.addonsAccOpen;
      var acc = accToggle.closest("[data-lab-addons-acc]");
      if (acc) {
        acc.classList.toggle("is-open", lab.addonsAccOpen);
        accToggle.setAttribute("aria-expanded", lab.addonsAccOpen ? "true" : "false");
      }
      return;
    }

    var choose = t.closest("[data-lab-choice-go]");
    if (choose) { event.preventDefault(); goStep(choose.getAttribute("data-lab-choice-go")); return; }

    if (t.closest("[data-lab-choice-back]")) { event.preventDefault(); goStep("choice"); return; }

    var by = t.closest("[data-lab-finder-by]");
    if (by) { event.preventDefault(); setSearchBy(by.getAttribute("data-lab-finder-by")); return; }

    if (t.closest("[data-lab-finder-go]")) { event.preventDefault(); runFinder(); return; }

    var cityBtn = t.closest("[data-lab-city]");
    if (cityBtn) {
      event.preventDefault();
      var city = cityBtn.getAttribute("data-lab-city") || "";
      finderView.city = finderView.city === city ? "" : city;
      finderView.page = 0;
      paintResults();
      return;
    }

    var pageBtn = t.closest("[data-lab-page]");
    if (pageBtn) {
      event.preventDefault();
      if (pageBtn.disabled) return;
      finderView.page += pageBtn.getAttribute("data-lab-page") === "next" ? 1 : -1;
      paintResults();
      return;
    }

    var pick = t.closest("[data-lab-select]");
    if (pick) { event.preventDefault(); selectMatch(Number(pick.getAttribute("data-lab-select"))); return; }

    if (t.closest("[data-lab-finder-again]")) {
      event.preventDefault();
      lab.selected = null;
      if (MS() && MS().clearSelection) MS().clearSelection();
      var input = byId("vb-q");
      if (input) { input.value = ""; input.focus(); }
      clearResults();
      render();
      return;
    }
  }

  /* Enter in the Finder means Search, not Execute verification. Captured at
     the document so it lands before the module's own keydown handler. */
  function onKeydownCapture(event) {
    if (lab.on || lab.step !== "finder") return;
    if (event.key !== "Enter") return;
    if (!event.target || event.target.id !== "vb-q") return;
    event.preventDefault();
    event.stopPropagation();
    runFinder();
  }

  function onSwitchKeydown(event) {
    if (event.key !== " " && event.key !== "Enter") return;
    if (!event.target || !event.target.closest || !event.target.closest("[data-lab-prefill-switch]")) return;
    event.preventDefault();
    setPrefill(!lab.on);
  }

  /* A different country is a different register: old results are stale. */
  document.addEventListener("d3-kyb:session-change", function (event) {
    var d = event.detail || {};
    if (d.changed && d.changed.indexOf("package") !== -1) {
      addonSig = "";
      refreshAddons();
    }
    if (lab.on || !d.changed || d.changed.indexOf("country") === -1) return;
    clearResults();
    lab.selected = null;
    render();
  });

  /* "New verification" resets the shipped form — put the lab back to step 1. */
  document.addEventListener("d3-kyb:restore-idle", function () {
    if (lab.on) return;
    goStep("choice");
  });

  /* Typing the Business Name is what unlocks Execute verification now. */
  function onFieldsInput(event) {
    if (lab.on || lab.step !== "manual") return;
    if (!event.target || !event.target.closest || !event.target.closest("[data-d3-kyb-fields]")) return;
    if (MS() && MS().refreshSubmit) MS().refreshSubmit();
  }

  function onAddonChange(event) {
    var input = event.target && event.target.closest && event.target.closest("[data-lab-addon]");
    if (!input) return;
    var id = input.getAttribute("data-lab-addon");
    var has = lab.addons.indexOf(id) !== -1;
    if (input.checked && !has) lab.addons.push(id);
    if (!input.checked && has) lab.addons = lab.addons.filter(function (x) { return x !== id; });
    addonSig = "";
    refreshAddons();
  }

  function init() {
    if (!byId("vb-lookup")) return;
    if (MS() && MS().setPrefillMode) MS().setPrefillMode(lab.on);
    document.addEventListener("click", onClick);
    document.addEventListener("change", onAddonChange);
    document.addEventListener("input", onFieldsInput);
    document.addEventListener("keydown", onKeydownCapture, true);
    document.addEventListener("keydown", onSwitchKeydown);
    var prefill = byId("vb-prefill");
    if (prefill && window.MutationObserver) {
      new MutationObserver(refreshAddons).observe(prefill, { attributes: true, attributeFilter: ["hidden"] });
    }
    syncSwitch();
    render();
    refreshAddons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
