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
  var GENERIC_FIELDS = window.BVShared.GENERIC_FIELDS;
  var COUNTRY_FIELDS = window.BVShared.COUNTRY_FIELDS;

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
    return window.BVShared.fieldsForCountry(state.accountType, state.country);
  }

  var PERSON_NAME_FIELDS = ["Full Name", "First Name"];
  var BUSINESS_NAME_FIELD = "Business Name";
  var ACCOUNT_FIELD_LABELS = ["Bank Account Number", "Account Number", "IBAN"];

  function requiredFieldLabels() {
    var fields = fieldsForCurrentSelection();
    var required = [];

    if (state.accountType === "person") {
      for (var i = 0; i < PERSON_NAME_FIELDS.length; i++) {
        if (fields.indexOf(PERSON_NAME_FIELDS[i]) !== -1) {
          required.push(PERSON_NAME_FIELDS[i]);
          break;
        }
      }
    } else if (fields.indexOf(BUSINESS_NAME_FIELD) !== -1) {
      required.push(BUSINESS_NAME_FIELD);
    }

    for (var j = 0; j < ACCOUNT_FIELD_LABELS.length; j++) {
      if (fields.indexOf(ACCOUNT_FIELD_LABELS[j]) !== -1) {
        required.push(ACCOUNT_FIELD_LABELS[j]);
        break;
      }
    }

    return required;
  }

  function getSubmitValidationErrors() {
    var errors = [];

    if (!state.country) {
      if (state.testEntity) {
        errors.push({
          code: "test_entity_required",
          message: "Select a test entity to continue."
        });
      } else {
        errors.push({
          code: "country_required",
          message: "Select a country to continue."
        });
      }
    }

    requiredFieldLabels().forEach(function (label) {
      var input = document.querySelector('#bv-fields [data-bv-field="' + label + '"]');
      if (!input || !input.value.trim()) {
        errors.push({
          code: "field_required",
          field: label,
          message: label + " is required."
        });
      }
    });

    return errors;
  }

  function isFormValid() {
    return getSubmitValidationErrors().length === 0;
  }

  function clearFormErrors() {
    var banner = document.getElementById("bv-form-errors");
    if (banner) {
      banner.hidden = true;
      banner.innerHTML = "";
    }

    document.querySelectorAll("#bv-fields .tds-text-input--invalid").forEach(function (wrap) {
      wrap.classList.remove("tds-text-input--invalid");
    });
    document.querySelectorAll("#bv-fields .tds-field-validation--error").forEach(function (node) {
      node.remove();
    });

    var countryRoot = document.getElementById("bv-country");
    if (countryRoot) countryRoot.classList.remove("tds-combobox--invalid");

    var teTrigger = document.querySelector(".bv-test-entity .tds-select__trigger");
    if (teTrigger) teTrigger.classList.remove("tds-select__trigger--focus");
  }

  function setFieldError(fieldLabel, message) {
    var input = document.querySelector('#bv-fields [data-bv-field="' + fieldLabel + '"]');
    if (!input) return;

    var wrap = input.closest(".tds-text-input");
    if (!wrap) return;

    wrap.classList.add("tds-text-input--invalid");
    wrap.classList.remove("tds-text-input--success");

    var existing = wrap.querySelector(".tds-field-validation--error");
    if (existing) existing.remove();

    var val = el("span", "tds-field-validation tds-field-validation--error");
    var icon = el("span", "tds-field-validation__icon");
    icon.innerHTML = ERROR_SVG;
    var txt = document.createElement("span");
    txt.textContent = message;
    val.appendChild(icon);
    val.appendChild(txt);
    wrap.appendChild(val);
  }

  function showFormErrors(errors) {
    clearFormErrors();
    if (!errors.length) return;

    var banner = document.getElementById("bv-form-errors");
    if (banner) {
      banner.hidden = false;
      if (errors.length === 1) {
        banner.textContent = errors[0].message;
      } else {
        var list = document.createElement("ul");
        errors.forEach(function (err) {
          var item = document.createElement("li");
          item.textContent = err.message;
          list.appendChild(item);
        });
        banner.appendChild(list);
      }
    }

    errors.forEach(function (err) {
      if (err.field) setFieldError(err.field, err.message);
    });

    var countryError = errors.some(function (err) { return err.code === "country_required"; });
    if (countryError) {
      var countryRoot = document.getElementById("bv-country");
      if (countryRoot) countryRoot.classList.add("tds-combobox--invalid");
      var countryInput = document.getElementById("bv-country-input");
      if (countryInput) countryInput.focus();
      return;
    }

    var teError = errors.some(function (err) { return err.code === "test_entity_required"; });
    if (teError) {
      var teTrigger = document.querySelector(".bv-test-entity .tds-select__trigger");
      if (teTrigger) teTrigger.focus();
      return;
    }

    var firstFieldError = null;
    for (var i = 0; i < errors.length; i++) {
      if (errors[i].field) {
        firstFieldError = errors[i];
        break;
      }
    }
    if (firstFieldError) {
      var firstInput = document.querySelector('#bv-fields [data-bv-field="' + firstFieldError.field + '"]');
      if (firstInput) firstInput.focus();
    }
  }

  function updateSubmitButton() {
    var btn = document.getElementById("bv-submit-btn");
    if (!btn) return;
    var valid = isFormValid();
    btn.removeAttribute("disabled");
    btn.setAttribute("aria-disabled", String(!valid));
  }

  function onFieldInput() {
    if (getSubmitValidationErrors().length === 0) {
      clearFormErrors();
    }
    updateSubmitButton();
  }

  function updateFormPrimaryField() {
    var countryWrap = document.getElementById("bv-country-wrap");
    var teWrap = document.getElementById("bv-test-entity-wrap");
    var section = document.getElementById("bv-country-section");
    teWrap.innerHTML = "";

    if (state.testEntity) {
      countryWrap.hidden = true;
      teWrap.hidden = false;
      section.hidden = false;
      teWrap.appendChild(makeTestEntitySelect());
    } else {
      countryWrap.hidden = false;
      teWrap.hidden = true;
      section.hidden = false;
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

  var ERROR_SVG =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.25"/><path d="M8 5.25v3.5M8 10.75h.01" stroke-linecap="round"/></svg>';

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
      var preserveLabels = window.BVShared.fieldsForCountry(state.accountType, state.country);
      state.country = c.name;
      input.value = c.name;
      flag.textContent = c.flag;
      flag.hidden = false;
      close();
      if (state.testEntity && !opts.fromTestEntity) {
        syncTestEntityToCountry(c.name);
      }
      if (!opts.skipDetails) renderDetails({ preserveLabels: preserveLabels });
      clearFormErrors();
    }
    function clear(keepOpen, opts) {
      opts = opts || {};
      var preserveLabels = window.BVShared.fieldsForCountry(state.accountType, state.country);
      state.country = null;
      input.value = "";
      flag.hidden = true;
      flag.textContent = "";
      if (state.testEntity && !opts.skipEntitySync) {
        syncTestEntityToCountry(null);
      }
      if (!opts.skipDetails) renderDetails({ preserveLabels: preserveLabels });
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
      var preserveLabels = window.BVShared.fieldsForCountry(state.accountType, state.country);
      state.country = null;
      if (state.testEntity) {
        syncTestEntityToCountry(null);
      }
      renderOptions(input.value);
      open();
      renderDetails({ preserveLabels: preserveLabels });
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

  function shouldPreserveLabel(label, opts) {
    if (!opts.preserveLabels) return true;
    return opts.preserveLabels.indexOf(label) !== -1;
  }

  function enforceFieldValues(expectedValues) {
    function apply() {
      document.querySelectorAll("#bv-fields [data-bv-field]").forEach(function (input) {
        var label = input.getAttribute("data-bv-field");
        var expected = Object.prototype.hasOwnProperty.call(expectedValues, label)
          ? expectedValues[label]
          : "";
        if (input.value !== expected) {
          input.value = expected;
        }
      });
    }

    requestAnimationFrame(function () {
      apply();
      requestAnimationFrame(apply);
    });
  }

  function makeTextInput(label, opts) {
    opts = opts || {};
    fieldIdCounter += 1;
    var id = "bv-field-" + fieldIdCounter;

    var wrap = el("div", "tds-text-input tds-text-input--full-width");
    if (opts.prefilled) wrap.classList.add("tds-text-input--success");

    var lbl = el("label", "tds-field-label", { for: id });
    lbl.appendChild(document.createTextNode(label));
    if (opts.required) {
      var req = el("span", "tds-field-label__required", { "aria-hidden": "true" });
      req.textContent = "*";
      lbl.appendChild(req);
    }

    var field = el("div", "tds-text-input__field tds-text-input__field--lg");
    var input = el("input", "tds-text-input__native", { id: id, type: "text" });

    input.setAttribute("data-bv-field", label);
    input.setAttribute("autocomplete", "off");
    input.setAttribute("data-1p-ignore", "true");
    input.setAttribute("data-lpignore", "true");
    input.setAttribute("name", "bv-" + id);
    if (opts.required) {
      input.setAttribute("aria-required", "true");
    }

    input.value = opts.value ? opts.value : "";
    if (!input.value) {
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

    input.addEventListener("input", onFieldInput);
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
    window.BVShared.fillTestEntityTriggerContent(trigger, textWrap, current);

    var trailing = el("span", "tds-select__trailing-group");
    if (current) {
      var tag = el("span", "tds-tag tds-tag--" + current.tone + " tds-tag--sm");
      tag.textContent = current.match;
      trailing.appendChild(tag);
    }
    var caret = el("span", "tds-caret tds-caret--default");
    caret.innerHTML = CARET_SVG;
    trailing.appendChild(caret);

    trigger.appendChild(flagEl);
    trigger.appendChild(textWrap);
    trigger.appendChild(trailing);

    var menu = el("div", "tds-select__menu");
    var panel = el("div", "tds-dropdown-panel");
    var selectedIndex = state.selectedTestEntity;
    window.BVShared.sortedEntityEntries(entities, selectedIndex).forEach(function (entry) {
      panel.appendChild(window.BVShared.buildTestEntityOption(entry.ent, entry.index, selectedIndex === entry.index, function (i) {
        state.selectedTestEntity = i;
        applyTestEntity();
      }));
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
    updateFormPrimaryField();
  }

  function applyTestEntity() {
    if (!state.testEntity) return;
    var entity = TEST_ENTITIES[state.accountType][state.selectedTestEntity];
    var country = countriesForAccountType(state.accountType).find(function (c) {
      return c.name === entity.country;
    });
    if (country && countryApi) {
      countryApi.select(country, { fromTestEntity: true, skipDetails: true });
    }
    renderTestEntityPanel();
    renderDetails({ preserveValues: false, useEntityPrefill: true });
  }

  function renderDetails(opts) {
    opts = opts || {};
    var container = document.getElementById("bv-fields");
    clearFormErrors();

    var preserved = opts.preserveValues !== false ? getFormValues() : {};
    container.innerHTML = "";

    var entityPrefill = {};
    var useEntityPrefill = opts.useEntityPrefill === true &&
      state.testEntity &&
      state.selectedTestEntity != null;
    if (useEntityPrefill) {
      entityPrefill = TEST_ENTITIES[state.accountType][state.selectedTestEntity].values || {};
    }

    var fields = fieldsForCurrentSelection();
    var requiredSet = {};
    requiredFieldLabels().forEach(function (fieldLabel) {
      requiredSet[fieldLabel] = true;
    });

    var expectedValues = {};

    for (var i = 0; i < fields.length; i += 2) {
      var row = el("div", "bv-form-row");
      for (var j = 0; j < 2; j++) {
        var label = fields[i + j];
        if (label) {
          var value = "";
          var prefilled = false;
          if (useEntityPrefill && entityPrefill[label]) {
            value = entityPrefill[label];
            prefilled = true;
          } else if (shouldPreserveLabel(label, opts) && preserved[label]) {
            value = preserved[label];
          }
          expectedValues[label] = value;
          row.appendChild(makeTextInput(label, {
            value: value,
            prefilled: prefilled,
            required: !!requiredSet[label]
          }));
        } else {
          row.appendChild(el("div", "bv-form-row__spacer", { "aria-hidden": "true" }));
        }
      }
      container.appendChild(row);
    }

    if (!useEntityPrefill) {
      enforceFieldValues(expectedValues);
    }

    updateSubmitButton();
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
        renderDetails({ preserveValues: false });
      });
    });
  }

  /* =========================================================
     Test Entity toggle
     ========================================================= */

  function initToggle() {
    var toggle = document.getElementById("bv-test-entity-toggle");
    var info = document.getElementById("bv-test-entity-info");
    if (info) {
      window.BVShared.bindTooltip(
        info,
        "Auto-fill sample entities to instantly explore the results"
      );
    }
    toggle.addEventListener("click", function () {
      state.testEntity = !state.testEntity;
      toggle.setAttribute("aria-checked", String(state.testEntity));
      toggle.classList.toggle("tds-switch__track--on", state.testEntity);
      state.selectedTestEntity = null;
      renderTestEntityPanel();
      if (countryApi) countryApi.clear(false, { skipEntitySync: true, skipDetails: true });
      renderDetails();
      clearFormErrors();
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

  function initFormBack() {
    var backBtn = document.getElementById("bv-form-back-btn");
    if (!backBtn) return;
    backBtn.addEventListener("click", function () {
      /* Future: navigate to home / labs landing */
    });
  }

  function initSubmit() {
    var btn = document.getElementById("bv-submit-btn");
    btn.addEventListener("click", function () {
      var errors = getSubmitValidationErrors();
      if (errors.length) {
        showFormErrors(errors);
        updateSubmitButton();
        return;
      }

      clearFormErrors();
      window.BVShared.saveSession({
        view: "result",
        state: {
          accountType: state.accountType,
          testEntity: state.testEntity,
          selectedTestEntity: state.selectedTestEntity,
          country: state.country
        },
        values: getFormValues()
      });
      if (window.BVResult) {
        window.BVResult.showResult();
      }
    });
  }

  function resetFormToDefault() {
    state.accountType = "person";
    state.testEntity = false;
    state.selectedTestEntity = null;
    state.country = null;

    document.querySelectorAll('input[name="account-type"]').forEach(function (radio) {
      var isPerson = radio.value === "person";
      radio.checked = isPerson;
      radio.closest(".tds-radio-card").classList.toggle("tds-radio-card--selected", isPerson);
    });

    var toggle = document.getElementById("bv-test-entity-toggle");
    if (toggle) {
      toggle.setAttribute("aria-checked", "false");
      toggle.classList.remove("tds-switch__track--on");
    }

    if (countryApi) {
      countryApi.clear(false, { skipEntitySync: true, skipDetails: true });
      countryApi.refreshOptions();
    }

    clearFormErrors();
    renderTestEntityPanel();
    renderDetails({ preserveValues: false });
    updateSubmitButton();
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
    resetFormToDefault: resetFormToDefault,
    TEST_ENTITIES: TEST_ENTITIES,
    entityFlag: entityFlag
  };

  /* ---------------- Boot ---------------- */

  document.addEventListener("DOMContentLoaded", function () {
    initCountry();
    initAccountType();
    initToggle();
    initFormBack();
    initSubmit();
    window.BVShared.initAppNavToggle();
    resetFormToDefault();
    var session = window.BVShared.loadSession();
    if (window.BVResult && (location.hash === "#result" || (session && session.view === "result"))) {
      window.BVResult.showResult(session);
    }
  });
})();
