/* ============================================================
   Bank Verification — demo interactions (reference only)

   Drives the observable UI states from the Figma spec:
   - Country combobox (type to filter + select)
   - Account-type radio cards (active behavior)
   - Conditional Details fields (Person vs Business)
   - Test Entity toggle → curated test-entity picker + autofill

   NO real validation or submission. All data is fake placeholder
   content. Wire up real data/logic in your own app.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- Mock data ---------------- */

  var COUNTRIES = [
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "France", flag: "🇫🇷" },
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "Brazil", flag: "🇧🇷" }
  ];

  // Meaningful placeholders (format hints / examples) per field.
  // Showing the expected format is a UX best practice — clearer than
  // repeating the label, and it guides input without a separate caption.
  var PLACEHOLDERS = {
    "Full Name": "First and last name",
    "Business Name": "Legal registered name",
    "Registration Number": "e.g. RC-1234567",
    "Account Number": "8–12 digit account number",
    "Routing Number": "9-digit routing number",
    "IBAN": "e.g. GB29 NWBK 6016 1331 9268 19",
    "BIC / SWIFT Code": "8 or 11 characters",
    "Clearing System ID": "e.g. USABA, GBDSC",
    "Sort Code": "6 digits, e.g. 12-34-56"
  };

  // Field lists per account type (order matches the design)
  var FIELD_SETS = {
    person: [
      "Full Name",
      "Account Number",
      "IBAN",
      "BIC / SWIFT Code",
      "Clearing System ID"
    ],
    business: [
      "Business Name",
      "Registration Number",
      "Account Number",
      "Routing Number",
      "BIC / SWIFT Code",
      "IBAN",
      "Clearing System ID",
      "Sort Code"
    ]
  };

  // Curated test entities per account type. `match` drives the tag;
  // `values` are the fields that get pre-filled.
  var TEST_ENTITIES = {
    person: [
      { name: "Creator Payout", match: "Strong Match", tone: "positive",
        values: { "Full Name": "Jane Doe", "Account Number": "890482309457" } },
      { name: "Freelancer Sample", match: "Partial Match", tone: "intermediate",
        values: { "Full Name": "John Smith", "Account Number": "112233445566" } },
      { name: "Unverified Individual", match: "No Match", tone: "negative",
        values: { "Full Name": "Alex Nolan" } }
    ],
    business: [
      { name: "Acme Corp Payout", match: "Strong Match", tone: "positive",
        values: { "Business Name": "Acme Corp Ltd", "Registration Number": "RC-8847213", "Account Number": "778812340091" } },
      { name: "Vendor Sample", match: "Partial Match", tone: "intermediate",
        values: { "Business Name": "Globex Trading", "Registration Number": "RC-1120094" } },
      { name: "Unverified Business", match: "No Match", tone: "negative",
        values: { "Business Name": "Initech LLC" } }
    ]
  };

  /* ---------------- State ---------------- */

  var state = {
    accountType: "person",
    testEntity: false,
    selectedTestEntity: 0
  };

  /* ---------------- Helpers ---------------- */

  function el(tag, cls, attrs) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  var CARET_SVG =
    '<svg viewBox="0 0 8 11" fill="currentColor" aria-hidden="true"><path d="M4 0l3.5 4h-7L4 0z"/><path d="M4 11L.5 7h7L4 11z"/></svg>';

  var CHECK_SVG =
    '<svg viewBox="0 0 11 12" fill="none" aria-hidden="true"><path d="M1 6.2 4 9.2 10 2.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

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
      var matches = COUNTRIES.filter(function (c) {
        return c.name.toLowerCase().indexOf(q) !== -1;
      });
      if (!matches.length) {
        var empty = el("div", "tds-combobox__option tds-combobox__option--empty");
        empty.textContent = "No matches";
        list.appendChild(empty);
        return;
      }
      matches.forEach(function (c) {
        var opt = el("button", "tds-combobox__option", { type: "button", role: "option" });
        var f = el("span", "tds-combobox__option-visual");
        f.textContent = c.flag;
        var label = el("span", "tds-combobox__option-label");
        label.textContent = c.name;
        opt.appendChild(f);
        opt.appendChild(label);
        opt.addEventListener("mousedown", function (e) {
          e.preventDefault(); // keep focus, avoid blur closing first
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
    function select(c) {
      input.value = c.name;
      flag.textContent = c.flag;
      flag.hidden = false;
      close();
    }

    input.addEventListener("focus", function () { renderOptions(input.value); open(); });
    input.addEventListener("input", function () {
      flag.hidden = true; // typing clears the chosen flag until re-selected
      renderOptions(input.value);
      open();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); input.blur(); }
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) close();
    });

    renderOptions("");
  }

  /* =========================================================
     Details fields (Person / Business + test-entity autofill)
     ========================================================= */

  var fieldIdCounter = 0;

  function makeTextInput(label, opts) {
    opts = opts || {};
    fieldIdCounter += 1;
    var id = "bv-field-" + fieldIdCounter;

    var wrap = el("div", "tds-text-input tds-text-input--full-width");
    // Pre-filled = success state → uses the component's success modifier
    // (border-positive), matching the "Pre-filled" success caption below.
    if (opts.prefilled) wrap.classList.add("tds-text-input--success");

    var lbl = el("label", "tds-field-label", { for: id });
    lbl.textContent = label;

    var field = el("div", "tds-text-input__field tds-text-input__field--lg");
    var input = el("input", "tds-text-input__native", { id: id, type: "text" });

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

  function makeTestEntitySelect() {
    var entities = TEST_ENTITIES[state.accountType];
    var current = entities[state.selectedTestEntity];

    var root = el("div", "tds-select bv-test-entity");
    var label = el("label", "tds-field-label");
    label.textContent = "Test entity";

    var trigger = el("button", "tds-select__trigger tds-select__trigger--lg bv-test-entity__trigger",
      { type: "button", "aria-haspopup": "listbox" });

    var textWrap = el("span", "tds-select__text-wrapper");
    var value = el("span", "tds-select__value");
    value.textContent = current.name;
    textWrap.appendChild(value);

    var trailing = el("span", "tds-select__trailing-group");
    var tag = el("span", "tds-tag tds-tag--" + current.tone + " tds-tag--sm");
    tag.textContent = current.match;
    var caret = el("span", "tds-caret tds-caret--default");
    caret.innerHTML = CARET_SVG;
    trailing.appendChild(tag);
    trailing.appendChild(caret);

    trigger.appendChild(textWrap);
    trigger.appendChild(trailing);

    var menu = el("div", "tds-select__menu");
    var panel = el("div", "tds-dropdown-panel");
    entities.forEach(function (ent, i) {
      var opt = el("button", "bv-option bv-option--entity", { type: "button", role: "option" });
      var name = el("span", "bv-option__label");
      name.textContent = ent.name;
      var otag = el("span", "tds-tag tds-tag--" + ent.tone + " tds-tag--sm");
      otag.textContent = ent.match;
      opt.appendChild(name);
      opt.appendChild(otag);
      opt.addEventListener("mousedown", function (e) {
        e.preventDefault();
        state.selectedTestEntity = i;
        renderDetails();
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

  function renderDetails() {
    var container = document.getElementById("bv-fields");
    container.innerHTML = "";

    var prefill = {};
    if (state.testEntity) {
      // Test-entity picker sits on its own row at the top
      var entRow = el("div", "bv-form-row");
      var col = el("div", "bv-form-col");
      col.appendChild(makeTestEntitySelect());
      entRow.appendChild(col);
      entRow.appendChild(el("div", "bv-form-col")); // empty right column
      container.appendChild(entRow);

      prefill = TEST_ENTITIES[state.accountType][state.selectedTestEntity].values || {};
    }

    var fields = FIELD_SETS[state.accountType];

    // Chunk into rows of two columns
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
        state.selectedTestEntity = 0; // re-curate for the new type
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
      state.selectedTestEntity = 0;
      renderDetails();
    });
  }

  /* ---------------- Boot ---------------- */

  document.addEventListener("DOMContentLoaded", function () {
    initCountry();
    initAccountType();
    initToggle();
    renderDetails();
  });
})();
