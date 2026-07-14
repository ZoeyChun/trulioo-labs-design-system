/* ============================================================
   Bank Verification — demo interactions (reference only)

   Drives the observable UI states from the Figma spec:
   - Country combobox (type to filter + select)
   - Account-type radio cards (active behavior)
   - Country-specific Details fields (Person vs Business)
   - Test Entity toggle → picker beside form title + country pre-select

   NO real validation or submission. All data is fake placeholder
   content. Wire up real data/logic in your own app.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- Mock data (from shared) ---------------- */

  var COUNTRY_META = window.BVShared.COUNTRY_META;
  var TEST_ENTITIES = window.BVShared.TEST_ENTITIES;

  // Default fields shown before a country is selected
  var GENERIC_FIELDS = {
    person: ["Full Name", "Account Number", "IBAN", "BIC / SWIFT Code"],
    business: ["Business Name", "Account Number", "IBAN", "BIC / SWIFT Code"]
  };

  // Input fields per account type + country (from product spec)
  var COUNTRY_FIELDS = {
    person: {
      "Brazil": ["Full Name", "National ID Number", "IBAN"],
      "South Korea": ["Full Name", "Bank Account Number", "Clearing System ID", "BIC"],
      "Mexico": ["Full Name", "Bank Account Number", "Clearing System ID", "BIC"],
      "United States": ["Full Name", "Bank Account Number", "Clearing System ID"],
      "France": ["Full Name", "IBAN"],
      "Spain": ["First Name", "First Surname", "Second Surname", "IBAN"]
    },
    business: {
      "Germany": ["Business Name", "IBAN", "Business Registration Number", "Tax ID Number"],
      "Belgium": ["Business Name", "IBAN", "Business Registration Number", "Tax ID Number"],
      "United States": ["Business Name", "Bank Account Number", "BIC", "Clearing System ID"],
      "India": ["Business Name", "Bank Account Number", "BIC", "Clearing System ID"],
      "Brazil": ["Business Name", "IBAN", "Business Registration Number", "Tax ID Number", "Bank Account Number"],
      "South Korea": ["Business Name", "Bank Account Number", "BIC"]
    }
  };

  var PLACEHOLDERS = {
    "Full Name": "First and last name",
    "First Name": "Given name",
    "First Surname": "First family name",
    "Second Surname": "Second family name",
    "National ID Number": "e.g. CPF format",
    "Business Name": "Legal registered name",
    "Business Registration Number": "e.g. HRB 123456",
    "Tax ID Number": "e.g. DE123456789",
    "Bank Account Number": "Account number",
    "Account Number": "8–12 digit account number",
    "IBAN": "e.g. GB29 NWBK 6016 1331 9268 19",
    "BIC": "8 or 11 characters",
    "BIC / SWIFT Code": "8 or 11 characters",
    "Clearing System ID": "e.g. USABA, GBDSC"
  };

  // Mock-style scenario names — see bank-verification-shared.js for full list.

  /* ---------------- State ---------------- */

  var state = {
    accountType: "person",
    testEntity: false,
    selectedTestEntity: null,
    country: null
  };

  var countryApi = null;

  /* ---------------- Helpers ---------------- */

  function el(tag, cls, attrs) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  function countriesForAccountType(type) {
    return Object.keys(COUNTRY_FIELDS[type]).map(function (name) {
      return { name: name, flag: COUNTRY_META[name].flag };
    }).sort(function (a, b) {
      if (a.name === "United States") return -1;
      if (b.name === "United States") return 1;
      return a.name.localeCompare(b.name);
    });
  }

  function fieldsForCurrentSelection() {
    if (!state.country) return GENERIC_FIELDS[state.accountType];
    var set = COUNTRY_FIELDS[state.accountType];
    return set[state.country] || GENERIC_FIELDS[state.accountType];
  }

  function updateCountryPlacement() {
    var countryRoot = document.getElementById("bv-country");
    var section = document.getElementById("bv-country-section");
    var topRow = document.getElementById("bv-form-top-row");
    var countryCol = document.getElementById("bv-country-col");

    if (state.testEntity) {
      countryCol.appendChild(countryRoot);
      section.hidden = true;
      topRow.hidden = false;
    } else {
      section.appendChild(countryRoot);
      section.hidden = false;
      topRow.hidden = true;
    }
  }

  function testEntityIndexForCountry(countryName) {
    if (!countryName) return null;
    var entities = TEST_ENTITIES[state.accountType];
    for (var i = 0; i < entities.length; i++) {
      if (entities[i].country === countryName) return i;
    }
    return null;
  }

  function syncTestEntityToCountry(countryName) {
    if (!state.testEntity) return;
    state.selectedTestEntity = testEntityIndexForCountry(countryName);
    renderTestEntityPanel();
  }

  var CARET_SVG =
    '<svg viewBox="0 0 8 11" fill="currentColor" aria-hidden="true"><path d="M4 0l3.5 4h-7L4 0z"/><path d="M4 11L.5 7h7L4 11z"/></svg>';

  var CHECK_SVG =
    '<svg viewBox="0 0 11 12" fill="none" aria-hidden="true"><path d="M1 6.2 4 9.2 10 2.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var X_SVG =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>';

  /* =========================================================
     Country combobox
     ========================================================= */

  function initCountry() {
    var root = document.getElementById("bv-country");
    var input = document.getElementById("bv-country-input");
    var list = document.getElementById("bv-country-list");
    var flag = root.querySelector(".bv-country__flag");

    function renderOptions(filter) {
      list.innerHTML = "";
      var q = (filter || "").trim().toLowerCase();
      var matches = countriesForAccountType(state.accountType).filter(function (c) {
        return !q || c.name.toLowerCase().indexOf(q) !== -1;
      });

      if (state.country) {
        matches.sort(function (a, b) {
          if (a.name === state.country) return -1;
          if (b.name === state.country) return 1;
          if (a.name === "United States") return -1;
          if (b.name === "United States") return 1;
          return a.name.localeCompare(b.name);
        });
      }

      if (!matches.length) {
        var empty = el("div", "tds-combobox__option tds-combobox__option--empty");
        empty.textContent = "No matches";
        list.appendChild(empty);
        return;
      }
      matches.forEach(function (c) {
        var isSelected = state.country === c.name;
        var opt = el("button", "tds-combobox__option" + (isSelected ? " tds-combobox__option--selected" : ""),
          { type: "button", role: "option", "aria-selected": String(isSelected) });
        var f = el("span", "tds-combobox__option-visual");
        f.textContent = c.flag;
        var label = el("span", "tds-combobox__option-label");
        label.textContent = c.name;
        opt.appendChild(f);
        opt.appendChild(label);

        if (isSelected) {
          var clearBtn = el("button", "bv-country__clear-btn", { type: "button", "aria-label": "Remove country" });
          clearBtn.innerHTML = X_SVG;
          clearBtn.addEventListener("mousedown", function (e) {
            e.preventDefault();
            e.stopPropagation();
            clear(true);
          });
          opt.appendChild(clearBtn);
        }

        opt.addEventListener("mousedown", function (e) {
          if (e.target.closest(".bv-country__clear-btn")) return;
          e.preventDefault();
          select(c);
        });
        list.appendChild(opt);
      });
    }

    function open() {
      root.classList.add("tds-combobox--open");
      input.setAttribute("aria-expanded", "true");
    }
    function close() {
      root.classList.remove("tds-combobox--open");
      input.setAttribute("aria-expanded", "false");
    }
    function select(c, opts) {
      opts = opts || {};
      state.country = c.name;
      input.value = c.name;
      flag.textContent = c.flag;
      flag.hidden = false;
      close();
      if (state.testEntity && !opts.fromTestEntity) {
        syncTestEntityToCountry(c.name);
      }
      if (!opts.skipDetails) renderDetails();
    }
    function clear(keepOpen) {
      state.country = null;
      input.value = "";
      flag.hidden = true;
      flag.textContent = "";
      if (state.testEntity) {
        syncTestEntityToCountry(null);
      }
      renderDetails();
      if (keepOpen) {
        renderOptions("");
        open();
        input.focus();
      }
    }

    function openWithSelection() {
      renderOptions("");
      open();
    }

    input.addEventListener("focus", function () {
      if (state.country) openWithSelection();
      else { renderOptions(input.value); open(); }
    });
    input.addEventListener("click", function () {
      if (state.country) openWithSelection();
    });
    input.addEventListener("input", function () {
      flag.hidden = true;
      state.country = null;
      if (state.testEntity) {
        syncTestEntityToCountry(null);
      }
      renderOptions(input.value);
      open();
      renderDetails();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); input.blur(); }
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) close();
    });

    countryApi = {
      select: select,
      clear: clear,
      refreshOptions: function () { renderOptions(state.country ? "" : input.value); }
    };

    renderOptions("");
  }

  /* =========================================================
     Details fields (country-specific + test-entity autofill)
     ========================================================= */

  var fieldIdCounter = 0;

  function makeTextInput(label, opts) {
    opts = opts || {};
    fieldIdCounter += 1;
    var id = "bv-field-" + fieldIdCounter;

    var wrap = el("div", "tds-text-input tds-text-input--full-width");
    if (opts.prefilled) wrap.classList.add("tds-text-input--success");

    var lbl = el("label", "tds-field-label", { for: id });
    lbl.textContent = label;

    var field = el("div", "tds-text-input__field tds-text-input__field--lg");
    var input = el("input", "tds-text-input__native", { id: id, type: "text" });

    input.setAttribute("data-bv-field", label);

    if (opts.value) {
      input.value = opts.value;
    } else {
      input.placeholder = PLACEHOLDERS[label] || label;
    }
    field.appendChild(input);
    wrap.appendChild(lbl);
    wrap.appendChild(field);

    if (opts.prefilled) {
      var val = el("span", "tds-field-validation tds-field-validation--success");
      var icon = el("span", "tds-field-validation__icon");
      icon.innerHTML = CHECK_SVG;
      var txt = document.createElement("span");
      txt.textContent = "Pre-filled";
      val.appendChild(icon);
      val.appendChild(txt);
      wrap.appendChild(val);
    }
    return wrap;
  }

  function entityFlag(country) {
    return COUNTRY_META[country] ? COUNTRY_META[country].flag : "";
  }

  function makeTestEntitySelect() {
    var entities = TEST_ENTITIES[state.accountType];
    var current = state.selectedTestEntity != null ? entities[state.selectedTestEntity] : null;

    var root = el("div", "tds-select tds-select--full-width bv-test-entity");
    var label = el("label", "tds-field-label");
    label.textContent = "Test entity";

    var trigger = el("button", "tds-select__trigger tds-select__trigger--lg bv-test-entity__trigger",
      { type: "button", "aria-haspopup": "listbox" });

    var flagEl = el("span", "tds-select__country-flag bv-test-entity__flag", { "aria-hidden": "true" });
    if (current) {
      flagEl.textContent = entityFlag(current.country);
    } else {
      flagEl.hidden = true;
    }

    var textWrap = el("span", "tds-select__text-wrapper");
    var value = el("span", "tds-select__value" + (current ? "" : " tds-select__placeholder"));
    value.textContent = current ? current.name : "Select test entity";
    if (current) window.BVShared.bindEllipsisTooltip(value, current.name);

    var trailing = el("span", "tds-select__trailing-group");
    if (current) {
      var tag = el("span", "tds-tag tds-tag--" + current.tone + " tds-tag--sm");
      tag.textContent = current.match;
      trailing.appendChild(tag);
    }
    var caret = el("span", "tds-caret tds-caret--default");
    caret.innerHTML = CARET_SVG;
    trailing.appendChild(caret);

    textWrap.appendChild(value);
    trigger.appendChild(flagEl);
    trigger.appendChild(textWrap);
    trigger.appendChild(trailing);

    var menu = el("div", "tds-select__menu");
    var panel = el("div", "tds-dropdown-panel");
    var selectedIndex = state.selectedTestEntity;
    window.BVShared.sortedEntityEntries(entities, selectedIndex).forEach(function (entry) {
      var ent = entry.ent;
      var i = entry.index;
      var isSelected = selectedIndex === i;
      var opt = el("button", "bv-option bv-option--entity" + (isSelected ? " bv-option--selected" : ""), {
        type: "button", role: "option", "aria-selected": String(isSelected)
      });
      var optFlag = el("span", "bv-option__flag", { "aria-hidden": "true" });
      optFlag.textContent = entityFlag(ent.country);
      var name = el("span", "bv-option__label");
      name.textContent = ent.name;
      window.BVShared.bindEllipsisTooltip(name, ent.name);
      var otag = el("span", "tds-tag tds-tag--" + ent.tone + " tds-tag--sm");
      otag.textContent = ent.match;
      opt.appendChild(optFlag);
      opt.appendChild(name);
      opt.appendChild(otag);
      opt.addEventListener("mousedown", function (e) {
        e.preventDefault();
        state.selectedTestEntity = i;
        applyTestEntity();
      });
      panel.appendChild(opt);
    });
    menu.appendChild(panel);

    trigger.addEventListener("click", function () {
      root.classList.toggle("tds-select--open");
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) root.classList.remove("tds-select--open");
    });

    root.appendChild(label);
    root.appendChild(trigger);
    root.appendChild(menu);
    return root;
  }

  function renderTestEntityPanel() {
    var entityCol = document.getElementById("bv-test-entity-col");
    entityCol.innerHTML = "";
    updateCountryPlacement();
    if (!state.testEntity) return;
    entityCol.appendChild(makeTestEntitySelect());
  }

  function applyTestEntity() {
    if (!state.testEntity) return;
    var entity = TEST_ENTITIES[state.accountType][state.selectedTestEntity];
    var country = countriesForAccountType(state.accountType).find(function (c) {
      return c.name === entity.country;
    });
    if (country && countryApi) {
      countryApi.select(country, { fromTestEntity: true });
    }
    renderTestEntityPanel();
    renderDetails();
  }

  function renderDetails() {
    var container = document.getElementById("bv-fields");
    container.innerHTML = "";

    var prefill = {};
    if (state.testEntity && state.selectedTestEntity != null) {
      prefill = TEST_ENTITIES[state.accountType][state.selectedTestEntity].values || {};
    }

    var fields = fieldsForCurrentSelection();

    for (var i = 0; i < fields.length; i += 2) {
      var row = el("div", "bv-form-row");
      for (var j = 0; j < 2; j++) {
        var label = fields[i + j];
        if (label) {
          var value = prefill[label];
          row.appendChild(makeTextInput(label, {
            value: value,
            prefilled: !!value
          }));
        } else {
          row.appendChild(el("div", "bv-form-row__spacer", { "aria-hidden": "true" }));
        }
      }
      container.appendChild(row);
    }
  }

  /* =========================================================
     Account type radio cards
     ========================================================= */

  function initAccountType() {
    var radios = document.querySelectorAll('input[name="account-type"]');
    radios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        radios.forEach(function (r) {
          r.closest(".tds-radio-card").classList.toggle("tds-radio-card--selected", r.checked);
        });
        state.accountType = document.querySelector('input[name="account-type"]:checked').value;
        state.selectedTestEntity = null;
        if (countryApi) {
          countryApi.clear();
          countryApi.refreshOptions();
        }
        renderTestEntityPanel();
        renderDetails();
      });
    });
  }

  /* =========================================================
     Test Entity toggle
     ========================================================= */

  function initToggle() {
    var toggle = document.getElementById("bv-test-entity-toggle");
    toggle.addEventListener("click", function () {
      state.testEntity = !state.testEntity;
      toggle.setAttribute("aria-checked", String(state.testEntity));
      toggle.classList.toggle("tds-switch__track--on", state.testEntity);
      state.selectedTestEntity = null;
      if (state.testEntity) {
        renderTestEntityPanel();
        if (countryApi) countryApi.clear();
        else renderDetails();
      } else {
        if (countryApi) countryApi.clear();
        renderTestEntityPanel();
        renderDetails();
      }
    });
  }

  function getFormValues() {
    var values = {};
    document.querySelectorAll("#bv-fields [data-bv-field]").forEach(function (input) {
      var key = input.getAttribute("data-bv-field");
      var val = input.value.trim();
      if (val) values[key] = val;
    });
    return values;
  }

  function setTestEntity(index) {
    if (!state.testEntity) return;
    state.selectedTestEntity = index;
    applyTestEntity();
  }

  function initSubmit() {
    document.getElementById("bv-submit-btn").addEventListener("click", function () {
      window.BVShared.saveSession({
        state: {
          accountType: state.accountType,
          testEntity: state.testEntity,
          selectedTestEntity: state.selectedTestEntity,
          country: state.country
        },
        values: getFormValues()
      });
      window.location.href = "result.html";
    });
  }

  function restoreFromSession() {
    var session = window.BVShared.loadSession();
    if (!session || !session.state) return;

    state.accountType = session.state.accountType || "person";
    state.testEntity = !!session.state.testEntity;
    state.selectedTestEntity = session.state.selectedTestEntity;
    state.country = session.state.country || null;

    document.querySelectorAll('input[name="account-type"]').forEach(function (radio) {
      radio.checked = radio.value === state.accountType;
      radio.closest(".tds-radio-card").classList.toggle("tds-radio-card--selected", radio.checked);
    });

    var toggle = document.getElementById("bv-test-entity-toggle");
    toggle.setAttribute("aria-checked", String(state.testEntity));
    toggle.classList.toggle("tds-switch__track--on", state.testEntity);

    renderTestEntityPanel();

    if (state.country && countryApi) {
      var match = countriesForAccountType(state.accountType).find(function (c) {
        return c.name === state.country;
      });
      if (match) countryApi.select(match, { fromTestEntity: true, skipDetails: true });
    } else if (countryApi) {
      countryApi.clear();
    }

    renderDetails();

    if (session.values) {
      Object.keys(session.values).forEach(function (key) {
        var input = document.querySelector('#bv-fields [data-bv-field="' + key + '"]');
        if (input) input.value = session.values[key];
      });
    }
  }

  window.BankVerification = {
    getState: function () {
      return {
        accountType: state.accountType,
        testEntity: state.testEntity,
        selectedTestEntity: state.selectedTestEntity,
        country: state.country
      };
    },
    getFormValues: getFormValues,
    setTestEntity: setTestEntity,
    TEST_ENTITIES: TEST_ENTITIES,
    entityFlag: entityFlag
  };

  /* ---------------- Boot ---------------- */

  document.addEventListener("DOMContentLoaded", function () {
    initCountry();
    initAccountType();
    initToggle();
    initSubmit();
    window.BVShared.initAppNavToggle();
    renderTestEntityPanel();
    renderDetails();
    restoreFromSession();
  });
})();
