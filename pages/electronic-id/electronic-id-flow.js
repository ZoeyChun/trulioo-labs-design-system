/* ============================================================
   Electronic ID — capture flow controller (2026 redesign)
   Real data flow (simulated toggle off):
     Config → Redirect to service provider → Provider dialog
   Simulated data flow:
     Dynamic steps from EID_FLOW_DATA (CSV), progress indicator,
     conditional screens/fields, OTP countdown, deny dialog.
   ============================================================ */
(function () {
  "use strict";

  function byId(id) { return document.getElementById(id); }

  var PROVIDER_PLACEHOLDER = "assets/providers/provider-placeholder.svg";
  var FLOW_DATA = window.EID_FLOW_DATA || [];
  var TRANSITION_MS = 3000;
  var RESEND_SECONDS = 10;
  var CHECK_SVG = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg>';

  var BANKS = [
    { id: "abn-amro", label: "ABN AMRO", initials: "AB", shareName: "ABN AMRO" },
    { id: "asn", label: "ASN Bank", initials: "AS", shareName: "ASN Bank" },
    { id: "ing", label: "ING", initials: "IN", shareName: "ING" },
    { id: "rabo", label: "Rabo Bank", initials: "RA", shareName: "Rabobank" },
    { id: "sns", label: "SNS Bank", initials: "SN", shareName: "SNS Bank" },
    { id: "triodos", label: "Triodos Bank", initials: "TR", shareName: "Triodos Bank" }
  ];

  var PROVIDERS = [
    { id: "etna", label: "Etna ID", initials: "ET" },
    { id: "infocert", label: "Infocert ID", initials: "IN" },
    { id: "lepida", label: "Lepida", initials: "LE" },
    { id: "namirial", label: "Namirial ID", initials: "NA" },
    { id: "poste", label: "Poste ID", initials: "PO" },
    { id: "spid", label: "Spid Italia", initials: "SP" }
  ];

  var FIELD_DEFS = {
    "Phone number": { key: "phone", type: "tel", placeholder: "(555) 123-4567" },
    "PIN": { key: "pin", type: "password", placeholder: "••••" },
    "Username": { key: "username", type: "text", placeholder: "johndoe" },
    "Password": { key: "password", type: "password", placeholder: "••••••••" },
    "Email": { key: "email", type: "email", placeholder: "name@example.com" }
  };

  var REDIRECT_DESC = "This option will connect you to an external {provider} site to complete your verification. Rest assured, we do not retain any of your information.";

  var state = {
    country: null,
    simulated: false,
    deviceIntelligence: false,
    flowSteps: [],
    flowIndex: 0,
    transientPanel: null,
    bank: null,
    provider: null,
    formValues: {},
    otpDigits: [],
    resendTimer: null,
    resendSeconds: RESEND_SECONDS,
    pendingTimer: null
  };

  function selectableCountries() {
    return FLOW_DATA.filter(function (c) { return c.selectable && c.steps && c.steps.length; });
  }

  function clearPending() {
    if (state.pendingTimer) { clearTimeout(state.pendingTimer); state.pendingTimer = null; }
  }

  function clearResendTimer() {
    if (state.resendTimer) { clearInterval(state.resendTimer); state.resendTimer = null; }
  }

  function goStep(id) {
    clearPending();
    clearResendTimer();
    document.querySelectorAll(".eid-step").forEach(function (step) {
      step.hidden = step.id !== id;
    });
    window.scrollTo(0, 0);
  }

  function resetSimState() {
    state.flowSteps = [];
    state.flowIndex = 0;
    state.transientPanel = null;
    state.bank = null;
    state.provider = null;
    state.formValues = {};
    state.otpDigits = [];
    clearResendTimer();
    clearPending();
  }

  /* ===================================================================
     Country combobox
     =================================================================== */
  function setFlag(el, code) {
    if (!el) return;
    if (!code) { el.hidden = true; el.innerHTML = ""; return; }
    el.hidden = false;
    el.innerHTML = '<span class="fi fi-' + code + '"></span>';
  }

  function updateConfigNext() {
    var next = byId("eid-config-next");
    if (!next) return;
    var ready = state.country && (!state.simulated || (state.country.steps && state.country.steps.length));
    next.setAttribute("aria-disabled", ready ? "false" : "true");
  }

  function initCountry() {
    var root = byId("eid-country");
    var input = byId("eid-country-input");
    var list = byId("eid-country-list");
    if (!root || !input || !list) return;
    var flag = root.querySelector(".eid-country__flag");
    var countries = selectableCountries();

    function open() { root.classList.add("tds-combobox--open"); input.setAttribute("aria-expanded", "true"); }
    function close() { root.classList.remove("tds-combobox--open"); input.setAttribute("aria-expanded", "false"); }

    function renderOptions(filter) {
      list.innerHTML = "";
      var q = (filter || "").trim().toLowerCase();
      var matches = countries.filter(function (c) {
        return !q || c.country.toLowerCase().indexOf(q) !== -1 || c.provider.toLowerCase().indexOf(q) !== -1;
      });
      if (!matches.length) {
        var empty = document.createElement("div");
        empty.className = "tds-combobox__option tds-combobox__option--empty";
        empty.textContent = "No matches";
        list.appendChild(empty);
        return;
      }
      matches.forEach(function (c) {
        var isSelected = state.country && state.country.country === c.country;
        var opt = document.createElement("button");
        opt.type = "button";
        opt.className = "tds-combobox__option" + (isSelected ? " tds-combobox__option--selected" : "");
        opt.setAttribute("role", "option");
        opt.setAttribute("aria-selected", String(isSelected));

        var visual = document.createElement("span");
        visual.className = "tds-combobox__option-visual";
        visual.innerHTML = '<span class="fi fi-' + c.code + '"></span>';

        var text = document.createElement("span");
        text.className = "tds-combobox__option-text";
        var label = document.createElement("span");
        label.className = "tds-combobox__option-label";
        label.textContent = c.country;
        var meta = document.createElement("span");
        meta.className = "tds-combobox__option-meta";
        meta.textContent = c.provider;
        text.appendChild(label);
        text.appendChild(meta);
        opt.appendChild(visual);
        opt.appendChild(text);

        opt.addEventListener("mousedown", function (e) {
          e.preventDefault();
          select(c);
        });
        list.appendChild(opt);
      });
    }

    function select(c) {
      state.country = c;
      input.value = c.country;
      setFlag(flag, c.code);
      close();
      updateConfigNext();
      updateRedirectCopy();
    }

    input.addEventListener("focus", function () { renderOptions(state.country ? "" : input.value); open(); });
    input.addEventListener("click", function () { renderOptions(state.country ? "" : input.value); open(); });
    input.addEventListener("input", function () {
      state.country = null;
      setFlag(flag, null);
      updateConfigNext();
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

  /* ===================================================================
     Redirect step
     =================================================================== */
  function updateRedirectCopy() {
    var country = state.country;
    if (!country) return;
    var logo = byId("eid-redirect-provider-logo");
    var title = byId("eid-redirect-title");
    var desc = byId("eid-redirect-desc");
    var dialogTitle = byId("eid-provider-dialog-title");
    if (logo) { logo.src = country.logo || PROVIDER_PLACEHOLDER; logo.alt = country.provider; }
    if (title) title.textContent = "You\u2019ll be asked to validate with " + country.provider;
    if (desc) desc.textContent = REDIRECT_DESC.replace("{provider}", country.provider);
    if (dialogTitle) dialogTitle.textContent = "Verify with " + country.provider;
  }

  /* ===================================================================
     Switches
     =================================================================== */
  function bindSwitch(trackId, stateKey) {
    var track = byId(trackId);
    if (!track) return;
    track.addEventListener("click", function () {
      var on = track.getAttribute("aria-checked") === "true";
      var next = !on;
      track.setAttribute("aria-checked", String(next));
      track.classList.toggle("tds-switch__track--on", next);
      state[stateKey] = next;
      if (stateKey === "simulated") updateConfigNext();
    });
  }

  /* ===================================================================
     Simulated flow — progress indicator
     =================================================================== */
  function renderProgress() {
    var root = byId("eid-sim-progress");
    if (!root || !state.flowSteps.length) return;
    root.innerHTML = "";
    state.flowSteps.forEach(function (step, i) {
      var itemState = "incomplete";
      if (i < state.flowIndex) itemState = "completed";
      else if (i === state.flowIndex) itemState = "current";

      var li = document.createElement("li");
      li.className = "tds-progress-indicator__item tds-progress-indicator__item--" + itemState;

      var line = document.createElement("div");
      line.className = "tds-progress-indicator__line";
      line.setAttribute("aria-hidden", "true");

      var content = document.createElement("div");
      content.className = "tds-progress-indicator__content";

      var row = document.createElement("div");
      row.className = "tds-progress-indicator__label-row";

      var icon = document.createElement("span");
      icon.className = "tds-progress-indicator__icon";
      icon.setAttribute("aria-hidden", "true");
      if (itemState === "completed") {
        icon.innerHTML = CHECK_SVG;
      } else {
        icon.innerHTML = '<span class="tds-progress-indicator__icon-badge">' + (i + 1) + "</span>";
      }

      var title = document.createElement("span");
      title.className = "tds-progress-indicator__title";
      title.textContent = step.label;

      row.appendChild(icon);
      row.appendChild(title);
      content.appendChild(row);
      li.appendChild(line);
      li.appendChild(content);
      root.appendChild(li);
    });
  }

  function panelIdForStep(step) {
    if (!step) return null;
    var map = {
      "select-bank": "eid-panel-select-bank",
      "select-provider": "eid-panel-select-provider",
      "scan-qr": "eid-panel-scan-qr",
      "launch-app": "eid-panel-launch-app",
      "enter-details": "eid-panel-enter-details",
      "otp-phone": "eid-panel-otp",
      "otp-email": "eid-panel-otp",
      "consent": "eid-panel-consent"
    };
    return map[step.type] || null;
  }

  function showSimPanel(id) {
    document.querySelectorAll(".eid-sim-panel").forEach(function (p) {
      p.hidden = p.id !== id;
    });
  }

  function currentStep() {
    return state.flowSteps[state.flowIndex] || null;
  }

  function renderSimView() {
    renderProgress();
    if (state.transientPanel) {
      showSimPanel(state.transientPanel);
      return;
    }
    var step = currentStep();
    var panelId = panelIdForStep(step);
    showSimPanel(panelId);
    if (!step) return;

    if (step.type === "select-bank" || step.type === "select-provider") syncSelectionGrids();
    if (step.type === "enter-details") renderDetailsFields(step.fields || []);
    if (step.type === "otp-phone" || step.type === "otp-email") setupOtpPanel(step.type);
    if (step.type === "consent") renderConsent();
    updateSimNextButtons();
  }

  function startSimulatedFlow() {
    if (!state.country || !state.country.steps.length) return;
    resetSimState();
    state.flowSteps = state.country.steps.slice();
    state.flowIndex = 0;
    goStep("eid-step-simulated");
    renderSimView();
  }

  function goSimIndex(index) {
    state.transientPanel = null;
    state.flowIndex = Math.max(0, Math.min(index, state.flowSteps.length - 1));
    renderSimView();
  }

  function nextSimStep() {
    if (state.flowIndex < state.flowSteps.length - 1) {
      goSimIndex(state.flowIndex + 1);
    }
  }

  function prevSimStep() {
    if (state.transientPanel) {
      state.transientPanel = null;
      renderSimView();
      return;
    }
    if (state.flowIndex > 0) goSimIndex(state.flowIndex - 1);
    else goStep("eid-step-config");
  }

  function consentEntityName() {
    if (state.bank) return state.bank.shareName || state.bank.label;
    if (state.provider) return state.provider.label;
    return state.country ? state.country.provider : "Provider";
  }

  function renderConsent() {
    var entity = byId("eid-consent-entity");
    var list = byId("eid-consent-list");
    if (entity) entity.textContent = consentEntityName();
    if (!list) return;
    list.innerHTML = "";
    var items = (state.country && state.country.consentItems && state.country.consentItems.length)
      ? state.country.consentItems
      : ["Full name", "Date of birth", "Address"];
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "eid-share__item";
      li.innerHTML =
        '<span class="eid-share__check" aria-hidden="true">' +
        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8.5l3 3 7-7"/></svg></span>' +
        '<span>' + item.trim() + "</span>";
      list.appendChild(li);
    });
  }

  /* ===================================================================
     Selection grids
     =================================================================== */
  function buildSelectionGrid(gridId, items, stateKey, onChange) {
    var grid = byId(gridId);
    if (!grid) return;
    grid.innerHTML = "";
    items.forEach(function (item) {
      var card = document.createElement("label");
      card.className = "eid-bank-card eid-bank-card--radio";
      card.innerHTML =
        '<input class="tds-radio" type="radio" name="' + gridId + '" value="' + item.id + '">' +
        '<span class="eid-bank-card__label-row">' +
        '<span class="eid-bank-card__badge">' + item.initials + "</span>" +
        '<span class="eid-bank-card__label">' + item.label + "</span></span>";
      var input = card.querySelector("input");
      input.addEventListener("change", function () {
        grid.querySelectorAll(".eid-bank-card").forEach(function (c) {
          c.classList.toggle("eid-bank-card--selected", c.contains(input) && input.checked);
        });
        state[stateKey] = item;
        if (onChange) onChange(item);
        updateSimNextButtons();
      });
      grid.appendChild(card);
    });
  }

  function initSelectionGrids() {
    buildSelectionGrid("eid-bank-grid", BANKS, "bank");
    buildSelectionGrid("eid-provider-grid", PROVIDERS, "provider");
  }

  function syncSelectionGrid(gridId, stateKey) {
    var grid = byId(gridId);
    var selected = state[stateKey];
    if (!grid) return;
    grid.querySelectorAll(".eid-bank-card").forEach(function (card) {
      var input = card.querySelector('input[type="radio"]');
      var isSelected = !!(selected && input && input.value === selected.id);
      if (input) input.checked = isSelected;
      card.classList.toggle("eid-bank-card--selected", isSelected);
    });
  }

  function syncSelectionGrids() {
    syncSelectionGrid("eid-bank-grid", "bank");
    syncSelectionGrid("eid-provider-grid", "provider");
  }

  /* ===================================================================
     Enter details
     =================================================================== */
  function expandedFields(rawFields) {
    var out = [];
    rawFields.forEach(function (f) {
      if (f === "Phone number OR email") {
        out.push("Phone number");
        out.push("Email");
      } else {
        out.push(f);
      }
    });
    return out;
  }

  function renderDetailsFields(rawFields) {
    var container = byId("eid-details-fields");
    if (!container) return;
    container.innerHTML = "";
    var fields = expandedFields(rawFields);

    fields.forEach(function (fieldName) {
      var def = FIELD_DEFS[fieldName];
      if (!def) return;
      var wrap = document.createElement("div");
      wrap.className = "eid-details-field";
      wrap.dataset.fieldKey = def.key;

      var label = document.createElement("label");
      label.className = "tds-field-label";
      label.textContent = fieldName + " *";
      label.setAttribute("for", "eid-field-" + def.key);

      var inputWrap = document.createElement("div");
      inputWrap.className = "tds-text-input";
      var field = document.createElement("div");
      field.className = "tds-text-input__field tds-text-input__field--lg";
      var input = document.createElement("input");
      input.className = "tds-text-input__native";
      input.id = "eid-field-" + def.key;
      input.type = def.type;
      input.placeholder = def.placeholder || "";
      input.autocomplete = "off";
      input.value = state.formValues[def.key] || "";
      input.addEventListener("input", function () {
        state.formValues[def.key] = input.value.trim();
        updateSimNextButtons();
      });
      field.appendChild(input);
      inputWrap.appendChild(field);
      wrap.appendChild(label);
      wrap.appendChild(inputWrap);
      container.appendChild(wrap);
    });
    updateSimNextButtons();
  }

  function detailsValid(step) {
    var raw = step.fields || [];
    if (raw.indexOf("Phone number OR email") !== -1) {
      return !!(state.formValues.phone || state.formValues.email);
    }
    var fields = expandedFields(raw);
    return fields.every(function (name) {
      var def = FIELD_DEFS[name];
      return def && state.formValues[def.key];
    });
  }

  function stepValid(step) {
    if (!step) return false;
    if (step.type === "select-bank") return !!state.bank;
    if (step.type === "select-provider") return !!state.provider;
    if (step.type === "enter-details") return detailsValid(step);
    return true;
  }

  function updateSimNextButtons() {
    var step = currentStep();
    if (!step) return;
    var panelId = panelIdForStep(step);
    var panel = panelId ? byId(panelId) : null;
    if (!panel) return;
    var valid = stepValid(step);
    panel.querySelectorAll("[data-sim-action='next']").forEach(function (btn) {
      btn.setAttribute("aria-disabled", valid ? "false" : "true");
    });
  }

  /* ===================================================================
     OTP
     =================================================================== */
  function setupOtpPanel(type) {
    var heading = byId("eid-otp-heading");
    var target = byId("eid-otp-target");
    var inputsRoot = byId("eid-otp-inputs");
    var simulateBtn = byId("eid-otp-simulate");
    if (heading) heading.textContent = type === "otp-email" ? "Verify your email" : "Verify your phone number";
    if (target) {
      target.textContent = type === "otp-email"
        ? (state.formValues.email || "")
        : (state.formValues.phone || "");
    }
    if (inputsRoot) {
      inputsRoot.innerHTML = "";
      for (var i = 0; i < 6; i++) {
        var field = document.createElement("input");
        field.className = "eid-otp-digit";
        field.type = "text";
        field.inputMode = "numeric";
        field.maxLength = 1;
        field.setAttribute("aria-label", "Digit " + (i + 1));
        if (state.otpDigits[i]) field.value = state.otpDigits[i];
        field.addEventListener("input", function (e) {
          e.target.value = e.target.value.replace(/\D/g, "").slice(0, 1);
          var idx = Array.prototype.indexOf.call(inputsRoot.children, e.target);
          if (idx >= 0) state.otpDigits[idx] = e.target.value;
          if (e.target.value && e.target.nextElementSibling) e.target.nextElementSibling.focus();
        });
        inputsRoot.appendChild(field);
      }
    }
    if (simulateBtn) simulateBtn.hidden = false;
    startResendCountdown();
  }

  function formatTimer(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  function startResendCountdown() {
    clearResendTimer();
    state.resendSeconds = RESEND_SECONDS;
    var btn = byId("eid-otp-resend");
    var timerEl = byId("eid-otp-resend-timer");
    function tick() {
      if (timerEl) timerEl.textContent = formatTimer(state.resendSeconds);
      if (btn) btn.disabled = state.resendSeconds > 0;
      if (state.resendSeconds <= 0) {
        clearResendTimer();
        if (btn) btn.textContent = "Resend";
        return;
      }
      state.resendSeconds -= 1;
    }
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Resend (<span id="eid-otp-resend-timer">' + formatTimer(state.resendSeconds) + "</span>)";
      timerEl = byId("eid-otp-resend-timer");
    }
    tick();
    state.resendTimer = setInterval(tick, 1000);
  }

  function fillOtpAndAdvance() {
    var digits = byId("eid-otp-inputs");
    var code = [9, 6, 2, 8, 9, 1];
    state.otpDigits = [];
    if (digits) {
      digits.querySelectorAll(".eid-otp-digit").forEach(function (input, i) {
        input.value = String(code[i]);
        state.otpDigits[i] = input.value;
      });
    }
    var simulateBtn = byId("eid-otp-simulate");
    if (simulateBtn) simulateBtn.hidden = true;
    clearResendTimer();
    var btn = byId("eid-otp-resend");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'Resend (<span id="eid-otp-resend-timer">00:00</span>)';
    }
    state.pendingTimer = setTimeout(function () { nextSimStep(); }, 600);
  }

  /* ===================================================================
     Provider dialog (real flow)
     =================================================================== */
  function openProviderDialog() {
    if (window.openTdsDialog) window.openTdsDialog("eid-provider-dialog");
    else { var d = byId("eid-provider-dialog"); if (d) d.hidden = false; }
  }

  function closeProviderDialog() {
    if (window.closeTdsDialog) window.closeTdsDialog(byId("eid-provider-dialog"));
    else { var d = byId("eid-provider-dialog"); if (d) d.hidden = true; }
  }

  function initProviderDialog() {
    var results = byId("eid-provider-results");
    if (results) {
      results.addEventListener("click", function () {
        closeProviderDialog();
        if (window.EidResult) window.EidResult.show();
      });
    }
  }

  function openDenyDialog() {
    if (window.openTdsDialog) window.openTdsDialog("eid-deny-dialog");
    else { var d = byId("eid-deny-dialog"); if (d) d.hidden = false; }
  }

  function closeDenyDialog() {
    if (window.closeTdsDialog) window.closeTdsDialog(byId("eid-deny-dialog"));
    else { var d = byId("eid-deny-dialog"); if (d) d.hidden = true; }
  }

  function resetToStart() {
    resetSimState();
    state.bank = null;
    state.provider = null;
    var bankGrid = byId("eid-bank-grid");
    var providerGrid = byId("eid-provider-grid");
    if (bankGrid) bankGrid.querySelectorAll(".eid-bank-card").forEach(function (c) { c.classList.remove("eid-bank-card--selected"); });
    if (providerGrid) providerGrid.querySelectorAll(".eid-bank-card").forEach(function (c) { c.classList.remove("eid-bank-card--selected"); });
    if (bankGrid) bankGrid.querySelectorAll("input").forEach(function (i) { i.checked = false; });
    if (providerGrid) providerGrid.querySelectorAll("input").forEach(function (i) { i.checked = false; });
    goStep("eid-step-config");
  }

  /* ===================================================================
     Simulated flow actions
     =================================================================== */
  function handleSimAction(action, btn) {
    var step = currentStep();

    if (action === "back") {
      prevSimStep();
      return;
    }

    if (action === "next") {
      if (btn && btn.getAttribute("aria-disabled") === "true") return;
      if (!stepValid(step)) return;
      nextSimStep();
      return;
    }

    if (action === "simulate-qr") {
      state.transientPanel = "eid-panel-qr-loading";
      renderSimView();
      state.pendingTimer = setTimeout(function () {
        state.transientPanel = null;
        nextSimStep();
      }, TRANSITION_MS);
      return;
    }

    if (action === "simulate-approval") {
      nextSimStep();
      return;
    }

    if (action === "simulate-otp") {
      fillOtpAndAdvance();
      return;
    }

    if (action === "deny") {
      openDenyDialog();
      return;
    }

    if (action === "allow") {
      state.transientPanel = "eid-panel-completing";
      renderSimView();
      state.pendingTimer = setTimeout(function () {
        if (window.EidResult) window.EidResult.show();
      }, TRANSITION_MS);
    }
  }

  function initSimActions() {
    var sim = byId("eid-step-simulated");
    if (!sim) return;
    sim.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-sim-action]");
      if (!btn) return;
      handleSimAction(btn.getAttribute("data-sim-action"), btn);
    });

    var resend = byId("eid-otp-resend");
    if (resend) {
      resend.addEventListener("click", function () {
        if (resend.disabled) return;
        startResendCountdown();
      });
    }
  }

  function initDenyDialog() {
    var cancel = byId("eid-deny-cancel");
    var confirm = byId("eid-deny-confirm");
    if (cancel) cancel.addEventListener("click", closeDenyDialog);
    if (confirm) {
      confirm.addEventListener("click", function () {
        closeDenyDialog();
        resetToStart();
      });
    }
  }

  /* ===================================================================
     Tooltips
     =================================================================== */
  var floatingTooltipEl = null;

  function ensureFloatingTooltip() {
    if (!floatingTooltipEl) {
      floatingTooltipEl = document.createElement("div");
      floatingTooltipEl.className = "eid-floating-tooltip";
      floatingTooltipEl.setAttribute("role", "tooltip");
      floatingTooltipEl.hidden = true;
      document.body.appendChild(floatingTooltipEl);
    }
    return floatingTooltipEl;
  }

  function bindFloatingTooltip(el, text) {
    if (!el || !text) return;
    function show() {
      var tip = ensureFloatingTooltip();
      tip.textContent = text;
      tip.hidden = false;
      var rect = el.getBoundingClientRect();
      tip.style.left = Math.max(8, rect.left + rect.width / 2) + "px";
      tip.style.top = rect.top + "px";
      tip.style.transform = "translate(-50%, calc(-100% - 8px))";
    }
    function hide() {
      if (floatingTooltipEl) floatingTooltipEl.hidden = true;
    }
    el.addEventListener("mouseenter", show);
    el.addEventListener("focus", show);
    el.addEventListener("mouseleave", hide);
    el.addEventListener("blur", hide);
  }

  function initSimulatedDataTooltip() {
    bindFloatingTooltip(
      byId("eid-simulated-info"),
      "Preview the verification flow with demo data. Steps are simulated so you can explore the experience without connecting to a live identity provider."
    );
  }

  /* ===================================================================
     Navigation wiring
     =================================================================== */
  function initNav() {
    var configNext = byId("eid-config-next");
    if (configNext) {
      configNext.addEventListener("click", function () {
        if (configNext.getAttribute("aria-disabled") === "true") return;
        if (state.simulated) startSimulatedFlow();
        else {
          updateRedirectCopy();
          goStep("eid-step-redirect");
        }
      });
    }

    var redirectBack = byId("eid-redirect-back");
    if (redirectBack) redirectBack.addEventListener("click", function () { goStep("eid-step-config"); });
    var redirectNext = byId("eid-redirect-next");
    if (redirectNext) redirectNext.addEventListener("click", openProviderDialog);

    var resultBack = byId("eid-result-back");
    if (resultBack) {
      resultBack.addEventListener("click", function () {
        if (window.EidResult) window.EidResult.hide();
        resetToStart();
      });
    }

    var homeBack = byId("eid-home-back");
    if (homeBack) homeBack.addEventListener("click", function () {});
  }

  /* ===================================================================
     Init
     =================================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    initCountry();
    bindSwitch("eid-simulated-toggle", "simulated");
    bindSwitch("eid-device-toggle", "deviceIntelligence");
    initSelectionGrids();
    initProviderDialog();
    initDenyDialog();
    initSimActions();
    initSimulatedDataTooltip();
    initNav();
    updateConfigNext();
    goStep("eid-step-config");
  });
})();
