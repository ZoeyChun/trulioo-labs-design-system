/* ============================================================
   KYC Form — 4-step wizard controller
   Demo-only UI state for collecting KYC information.
   Wire up real verification logic in your own app.
   ============================================================ */
(function () {
  "use strict";

  var STEP_LABELS = [
    "Personal info",
    "Address",
    "Identity document",
    "Review & submit"
  ];

  var COUNTRIES = [
    { name: "United States", code: "us" },
    { name: "Canada", code: "ca" },
    { name: "United Kingdom", code: "gb" },
    { name: "Netherlands", code: "nl" },
    { name: "Germany", code: "de" },
    { name: "France", code: "fr" },
    { name: "Australia", code: "au" },
    { name: "Singapore", code: "sg" }
  ];

  var DOC_TYPES = [
    "Passport",
    "Driver's license",
    "National ID card",
    "Residence permit"
  ];

  var CHECK_ICON =
    '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
    '<path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg>';

  var currentStep = 1;
  var totalSteps = 4;

  function byId(id) {
    return document.getElementById(id);
  }

  function progressItemHTML(index, label, stateName) {
    var icon =
      stateName === "completed"
        ? '<span class="tds-progress-indicator__icon">' + CHECK_ICON + "</span>"
        : '<span class="tds-progress-indicator__icon"><span class="tds-progress-indicator__icon-badge">' +
          (index + 1) +
          "</span></span>";
    return (
      '<li class="tds-progress-indicator__item tds-progress-indicator__item--' +
      stateName +
      '">' +
      '<div class="tds-progress-indicator__line" aria-hidden="true"></div>' +
      '<div class="tds-progress-indicator__content">' +
      '<div class="tds-progress-indicator__label-row">' +
      icon +
      '<span class="tds-progress-indicator__title">' +
      label +
      "</span></div></div></li>"
    );
  }

  function renderProgress() {
    document.querySelectorAll(".kyc-progress").forEach(function (ol) {
      ol.innerHTML = STEP_LABELS.map(function (label, i) {
        var stepNum = i + 1;
        var stateName = "incomplete";
        if (stepNum < currentStep) stateName = "completed";
        else if (stepNum === currentStep) stateName = "current";
        return progressItemHTML(i, label, stateName);
      }).join("");
    });
  }

  function showStep(step) {
    currentStep = step;
    document.querySelectorAll(".kyc-step").forEach(function (el) {
      el.hidden = Number(el.getAttribute("data-step")) !== step;
    });
    document.querySelectorAll("[data-kyc-back]").forEach(function (btn) {
      btn.hidden = step === 1;
    });
    document.querySelectorAll("[data-kyc-next]").forEach(function (btn) {
      btn.textContent = step === totalSteps ? "Submit" : "Continue";
    });
    renderProgress();
    hideErrors();
    if (step === totalSteps) renderReview();
    window.scrollTo(0, 0);
  }

  function hideErrors() {
    var err = byId("kyc-form-errors");
    if (err) {
      err.hidden = true;
      err.textContent = "";
    }
  }

  function showError(message) {
    var err = byId("kyc-form-errors");
    if (!err) return;
    err.hidden = false;
    err.textContent = message;
  }

  function getValue(id) {
    var el = byId(id);
    return el ? el.value.trim() : "";
  }

  function getDatePickerValue(id) {
    var picker = byId(id);
    if (!picker) return "";
    var valueEl = picker.querySelector(".tds-date-picker__value");
    if (!valueEl || valueEl.classList.contains("tds-date-picker__placeholder")) return "";
    return valueEl.textContent.trim();
  }

  function getSelectValue(id) {
    var root = byId(id);
    if (!root) return "";
    var valueEl = root.querySelector(".tds-select__value");
    if (!valueEl || valueEl.classList.contains("tds-select__placeholder")) return "";
    return valueEl.textContent.trim();
  }

  function getCountryValue() {
    var input = byId("kyc-country-input");
    return input ? input.value.trim() : "";
  }

  function validateStep(step) {
    if (step === 1) {
      if (!getValue("kyc-first-name")) return "First name is required.";
      if (!getValue("kyc-last-name")) return "Last name is required.";
      if (!getDatePickerValue("kyc-dob")) return "Date of birth is required.";
      if (!getValue("kyc-email")) return "Email address is required.";
      if (!getValue("kyc-phone")) return "Phone number is required.";
    }
    if (step === 2) {
      if (!getCountryValue()) return "Country is required.";
      if (!getValue("kyc-street")) return "Street address is required.";
      if (!getValue("kyc-city")) return "City is required.";
      if (!getValue("kyc-state")) return "State or province is required.";
      if (!getValue("kyc-postal")) return "Postal code is required.";
    }
    if (step === 3) {
      if (!getSelectValue("kyc-doc-type")) return "Document type is required.";
      if (!getValue("kyc-doc-number")) return "Document number is required.";
      if (!getDatePickerValue("kyc-issue-date")) return "Issue date is required.";
      if (!getDatePickerValue("kyc-expiry-date")) return "Expiry date is required.";
    }
    if (step === 4) {
      if (!byId("kyc-consent-terms").checked) return "You must accept the terms of service.";
      if (!byId("kyc-consent-privacy").checked) return "You must consent to data processing.";
    }
    return "";
  }

  function renderReview() {
    var sections = [
      {
        heading: "Personal information",
        items: [
          ["First name", getValue("kyc-first-name")],
          ["Last name", getValue("kyc-last-name")],
          ["Date of birth", getDatePickerValue("kyc-dob")],
          ["Email", getValue("kyc-email")],
          ["Phone", getValue("kyc-phone")]
        ]
      },
      {
        heading: "Address",
        items: [
          ["Country", getCountryValue()],
          ["Street address", getValue("kyc-street")],
          ["City", getValue("kyc-city")],
          ["State / Province", getValue("kyc-state")],
          ["Postal code", getValue("kyc-postal")]
        ]
      },
      {
        heading: "Identity document",
        items: [
          ["Document type", getSelectValue("kyc-doc-type")],
          ["Document number", getValue("kyc-doc-number")],
          ["Issue date", getDatePickerValue("kyc-issue-date")],
          ["Expiry date", getDatePickerValue("kyc-expiry-date")]
        ]
      }
    ];

    var container = byId("kyc-review-content");
    if (!container) return;

    container.innerHTML = sections
      .map(function (section) {
        return (
          '<div class="kyc-review__section">' +
          '<h3 class="kyc-review__heading">' +
          section.heading +
          "</h3>" +
          '<div class="kyc-review__grid">' +
          section.items
            .map(function (pair) {
              return (
                '<div class="kyc-review__item">' +
                '<span class="kyc-review__label">' +
                pair[0] +
                "</span>" +
                '<span class="kyc-review__value">' +
                (pair[1] || "—") +
                "</span></div>"
              );
            })
            .join("") +
          "</div></div>"
        );
      })
      .join("");
  }

  function showSuccess() {
    var flow = byId("kyc-flow-view");
    var success = byId("kyc-success-view");
    if (flow) flow.hidden = true;
    if (success) success.hidden = false;
  }

  /* --- Country combobox --- */
  function initCountryCombobox() {
    var root = byId("kyc-country");
    var input = byId("kyc-country-input");
    var list = byId("kyc-country-list");
    if (!root || !input || !list) return;
    var flag = root.querySelector(".kyc-country__flag");

    function open() {
      root.classList.add("tds-combobox--open");
      input.setAttribute("aria-expanded", "true");
    }

    function close() {
      root.classList.remove("tds-combobox--open");
      input.setAttribute("aria-expanded", "false");
    }

    function setFlag(code) {
      if (!flag) return;
      if (!code) {
        flag.hidden = true;
        flag.innerHTML = "";
        return;
      }
      flag.hidden = false;
      flag.innerHTML = '<span class="fi fi-' + code + '"></span>';
    }

    function renderOptions(filter) {
      list.innerHTML = "";
      var query = (filter || "").toLowerCase();
      var matches = COUNTRIES.filter(function (c) {
        return !query || c.name.toLowerCase().indexOf(query) !== -1;
      });
      if (!matches.length) {
        var empty = document.createElement("div");
        empty.className = "tds-combobox__option tds-combobox__option--empty";
        empty.textContent = "No matches";
        list.appendChild(empty);
        return;
      }
      matches.forEach(function (country) {
        var opt = document.createElement("button");
        opt.type = "button";
        opt.className = "tds-combobox__option";
        opt.setAttribute("role", "option");
        var visual = document.createElement("span");
        visual.className = "tds-combobox__option-visual";
        visual.innerHTML = '<span class="fi fi-' + country.code + '"></span>';
        var label = document.createElement("span");
        label.className = "tds-combobox__option-label";
        label.textContent = country.name;
        opt.appendChild(visual);
        opt.appendChild(label);
        opt.addEventListener("mousedown", function (e) {
          e.preventDefault();
          input.value = country.name;
          input.dataset.code = country.code;
          setFlag(country.code);
          close();
        });
        list.appendChild(opt);
      });
    }

    input.addEventListener("focus", function () {
      renderOptions(input.value);
      open();
    });
    input.addEventListener("input", function () {
      renderOptions(input.value);
      open();
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) close();
    });
    renderOptions("");
  }

  /* --- Document type select --- */
  function initDocTypeSelect() {
    var root = byId("kyc-doc-type");
    if (!root) return;
    var trigger = root.querySelector(".tds-select__trigger");
    var valueEl = root.querySelector(".tds-select__value");
    var panel = root.querySelector(".tds-dropdown-panel");
    if (!trigger || !valueEl || !panel) return;

    panel.innerHTML = DOC_TYPES.map(function (type) {
      return (
        '<div class="tds-action-list-item" role="option" tabindex="0">' +
        '<span class="tds-action-list-item__label">' +
        type +
        "</span></div>"
      );
    }).join("");

    trigger.addEventListener("click", function () {
      var open = root.classList.toggle("tds-select--open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    panel.querySelectorAll(".tds-action-list-item").forEach(function (opt) {
      opt.addEventListener("click", function () {
        valueEl.textContent = opt.querySelector(".tds-action-list-item__label").textContent;
        valueEl.classList.remove("tds-select__placeholder");
        root.classList.remove("tds-select--open");
        trigger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) {
        root.classList.remove("tds-select--open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  function bindNavigation() {
    document.querySelectorAll("[data-kyc-back]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (currentStep > 1) showStep(currentStep - 1);
      });
    });

    document.querySelectorAll("[data-kyc-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var error = validateStep(currentStep);
        if (error) {
          showError(error);
          return;
        }
        if (currentStep < totalSteps) {
          showStep(currentStep + 1);
        } else {
          showSuccess();
        }
      });
    });
  }

  function initAppNavToggle() {
    var shell = byId("app-shell");
    var overlay = byId("app-sidenav-overlay");
    if (!shell || !overlay) return;

    var toggles = shell.querySelectorAll(".app-nav-toggle");
    if (!toggles.length) return;

    function setOpen(open) {
      shell.classList.toggle("app-shell--nav-open", open);
      toggles.forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      });
      overlay.hidden = !open;
      overlay.setAttribute("aria-hidden", String(!open));
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        setOpen(!shell.classList.contains("app-shell--nav-open"));
      });
    });
    overlay.addEventListener("click", function () {
      setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && shell.classList.contains("app-shell--nav-open")) {
        setOpen(false);
      }
    });
    window.matchMedia("(min-width: 769px)").addEventListener("change", function (query) {
      if (query.matches) setOpen(false);
    });
  }

  function init() {
    renderProgress();
    initCountryCombobox();
    initDocTypeSelect();
    bindNavigation();
    initAppNavToggle();
    showStep(1);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
