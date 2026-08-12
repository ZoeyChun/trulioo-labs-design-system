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
    { id: "ing", label: "ING", initials: "IN", shareName: "ING" },
    { id: "abn-amro", label: "ABN AMRO", initials: "AB", shareName: "ABN AMRO" },
    { id: "asn", label: "ASN Bank", initials: "AS", shareName: "ASN Bank" },
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

  var MOCK_VALUES = {
    phone: "+1 (234) 567-8901",
    pin: "2846",
    username: "janedoe",
    password: "Trulioo1!",
    email: "jane.doe@email.com"
  };

  var REDIRECT_DESC = "This option will connect you to an external {provider} site to complete your verification.";

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
    return FLOW_DATA.filter(function (c) {
      if (state.simulated) return !!c.selectable && c.steps && c.steps.length;
      return true;
    }).sort(function (a, b) {
      return a.country.localeCompare(b.country);
    });
  }

  var refreshCountryCombobox = null;

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

    function open() { root.classList.add("tds-combobox--open"); input.setAttribute("aria-expanded", "true"); }
    function close() { root.classList.remove("tds-combobox--open"); input.setAttribute("aria-expanded", "false"); }

    function renderOptions(filter) {
      list.innerHTML = "";
      var q = (filter || "").trim().toLowerCase();
      var matches = selectableCountries().filter(function (c) {
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
        var tag = document.createElement("span");
        tag.className = "tds-tag tds-tag--sm eid-country__provider-tag";
        tag.textContent = c.provider;
        text.appendChild(label);
        text.appendChild(tag);
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
      updateCountryFieldTag();
    }
    input.addEventListener("focus", function () { renderOptions(state.country ? "" : input.value); open(); });
    input.addEventListener("click", function () { renderOptions(state.country ? "" : input.value); open(); });
    input.addEventListener("input", function () {
      state.country = null;
      setFlag(flag, null);
      updateConfigNext();
      updateCountryFieldTag();
      renderOptions(input.value);
      open();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); input.blur(); }
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) close();
    });
    refreshCountryCombobox = function () {
      renderOptions(state.country ? "" : input.value);
    };
    renderOptions("");
  }

  /* ===================================================================
     Redirect step
     =================================================================== */
  function updateCountryFieldTag() {
    var tag = byId("eid-country-provider-tag");
    if (!tag) return;
    if (state.country) {
      tag.textContent = state.country.provider;
      tag.hidden = false;
    } else {
      tag.textContent = "";
      tag.hidden = true;
    }
  }

  function validateCountrySelection() {
    if (!state.country) return;
    var stillValid = selectableCountries().some(function (c) { return c.code === state.country.code; });
    if (stillValid) return;
    state.country = null;
    var input = byId("eid-country-input");
    var flag = document.querySelector("#eid-country .eid-country__flag");
    if (input) input.value = "";
    setFlag(flag, null);
    updateConfigNext();
    updateCountryFieldTag();
  }

  function onSimulatedModeChange() {
    validateCountrySelection();
    updateCountryFieldTag();
    updateConfigNext();
    if (refreshCountryCombobox) refreshCountryCombobox();
  }

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
     Verification mode radio cards
     =================================================================== */
  function initVerificationMode() {
    var inputs = document.querySelectorAll('input[name="eid-verification-mode"]');
    if (!inputs.length) return;
    inputs.forEach(function (input) {
      input.addEventListener("change", function () {
        document.querySelectorAll('input[name="eid-verification-mode"]').forEach(function (radio) {
          var card = radio.closest(".tds-radio-card");
          if (card) card.classList.toggle("tds-radio-card--selected", radio.checked);
        });
        state.simulated = input.value === "simulated";
        onSimulatedModeChange();
      });
    });
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

  function usesDesktopConsent() {
    var code = state.country && state.country.code;
    return code === "in" || code === "cz";
  }

  function usesNlSimFlow() {
    return !!(state.simulated && state.country && state.country.code === "nl");
  }

  function usesNlIngPhonePreview() {
    return usesNlSimFlow() && state.bank && state.bank.id === "ing";
  }

  function shouldShowNlPhonePreview() {
    if (!usesNlIngPhonePreview()) return false;
    return activeSimPanelId() !== "eid-panel-completing";
  }

  function updateNlPhoneLayout() {
    var stepRoot = byId("eid-step-simulated");
    var phone = byId("eid-sim-phone");
    if (!stepRoot || !phone) return;
    var showPhone = shouldShowNlPhonePreview();
    var wasVisible = phone.getAttribute("data-visible") === "true";
    stepRoot.classList.toggle("eid-step-simulated--nl-phone", showPhone);
    phone.hidden = !showPhone;
    phone.setAttribute("aria-hidden", showPhone ? "false" : "true");
    phone.setAttribute("data-visible", showPhone ? "true" : "false");
    phone.classList.remove("eid-sim-phone--enter");
    if (showPhone) {
      renderNlPhonePreview();
      bindNlPhoneResize();
      scheduleNlPhoneSizeSync();
      if (!wasVisible) {
        requestAnimationFrame(function () {
          phone.classList.add("eid-sim-phone--enter");
        });
      }
    } else {
      var screen = byId("eid-sim-phone-screen");
      if (screen) screen.innerHTML = "";
      phone.removeAttribute("data-nl-phone-scale");
    }
  }

  var NL_MOBILE_EMBED_BASE = "embeds/netherlands-mobile/";
  var NL_PHONE_FRAME_W = 390;
  var NL_PHONE_FRAME_H = 800;
  var NL_PHONE_VIEWPORT_PAD = 24;
  var nlPhoneResizeBound = false;

  function nlPhoneLabelReserve(phone) {
    if (!phone.querySelector(".eid-mobile-embed-host")) return 0;
    var label = phone.querySelector(".eid-sim-phone__label");
    if (!label || getComputedStyle(label).display === "none") return 0;
    var gap = parseFloat(getComputedStyle(phone).rowGap || getComputedStyle(phone).gap) || 0;
    var height = label.getBoundingClientRect().height;
    if (height < 1) height = 24;
    return height + gap;
  }

  function applyNlPhoneScale(phone, host, scaleStr) {
    phone.style.setProperty("--eid-phone-scale", scaleStr);
    var screen = byId("eid-sim-phone-screen");
    if (screen) screen.style.setProperty("--eid-phone-scale", scaleStr);
    host.style.setProperty("--eid-phone-scale", scaleStr);
  }

  function syncNlPhoneSize(forceRecalc) {
    var phone = byId("eid-sim-phone");
    if (!phone || phone.hidden) return;
    var host = phone.querySelector(".eid-mobile-embed-host");
    if (!host) return;

    var cached = phone.getAttribute("data-nl-phone-scale");
    if (!forceRecalc && cached) {
      applyNlPhoneScale(phone, host, cached);
      return;
    }

    var labelReserve = nlPhoneLabelReserve(phone);
    var top = phone.getBoundingClientRect().top;
    var available = window.innerHeight - top - NL_PHONE_VIEWPORT_PAD - labelReserve;
    available = Math.max(0, available);
    var scale = Math.min(1, available / NL_PHONE_FRAME_H);
    scale = Math.max(0.35, scale);
    var scaleStr = scale.toFixed(4);
    phone.setAttribute("data-nl-phone-scale", scaleStr);
    applyNlPhoneScale(phone, host, scaleStr);
  }

  function scheduleNlPhoneSizeSync(forceRecalc) {
    syncNlPhoneSize(forceRecalc);
    requestAnimationFrame(function () {
      syncNlPhoneSize(forceRecalc);
      requestAnimationFrame(function () {
        syncNlPhoneSize(forceRecalc);
      });
    });
  }

  function bindNlPhoneResize() {
    if (nlPhoneResizeBound) return;
    nlPhoneResizeBound = true;
    var timer;
    function onResize() {
      clearTimeout(timer);
      timer = setTimeout(function () { scheduleNlPhoneSizeSync(true); }, 100);
    }
    window.addEventListener("resize", onResize);
    var phone = byId("eid-sim-phone");
    if (phone && typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(onResize);
      ro.observe(phone);
    }
  }

  function renderMobileEmbedScreen(filename, title) {
    return (
      '<div class="eid-mobile-embed-host">' +
      '<div class="eid-mobile-embed">' +
      '<iframe class="eid-mobile-embed__frame" src="' + NL_MOBILE_EMBED_BASE + filename + '" title="' + title + '" tabindex="-1" loading="lazy"></iframe>' +
      "</div></div>"
    );
  }

  function renderNlPhonePreview() {
    var screen = byId("eid-sim-phone-screen");
    if (!screen || !shouldShowNlPhonePreview()) return;

    var phone = byId("eid-sim-phone");
    if (phone) phone.removeAttribute("data-nl-phone-scale");

    var panelId = activeSimPanelId();
    if (panelId === "eid-panel-select-bank") {
      screen.innerHTML = renderMobileEmbedScreen("idin-screen.html", "iDIN bank selection");
      bindNlPhoneEmbedLoad(screen);
      return;
    }
    if (panelId === "eid-panel-sign-in") {
      screen.innerHTML = renderMobileEmbedScreen("ing-launch.html", "ING launch");
      bindNlPhoneEmbedLoad(screen);
      return;
    }
    if (panelId === "eid-panel-consent-mobile") {
      screen.innerHTML = renderMobileEmbedScreen("ing-consent.html", "ING consent");
      bindNlPhoneEmbedLoad(screen);
      return;
    }

    screen.innerHTML = "";
  }

  function bindNlPhoneEmbedLoad(screen) {
    var iframe = screen.querySelector(".eid-mobile-embed__frame");
    if (!iframe) {
      scheduleNlPhoneSizeSync();
      return;
    }
    iframe.addEventListener("load", function () {
      scheduleNlPhoneSizeSync();
    });
    scheduleNlPhoneSizeSync();
  }

  function panelIdForStep(step) {
    if (!step) return null;
    var map = {
      "select-bank": "eid-panel-select-bank",
      "sign-in": "eid-panel-sign-in",
      "select-provider": "eid-panel-select-provider",
      "scan-qr": "eid-panel-scan-qr",
      "launch-app": "eid-panel-launch-app",
      "enter-details": "eid-panel-enter-details",
      "otp-phone": "eid-panel-otp",
      "otp-email": "eid-panel-otp",
      "consent": usesDesktopConsent() ? "eid-panel-consent" : "eid-panel-consent-mobile"
    };
    return map[step.type] || null;
  }

  function activeSimPanelId() {
    if (state.transientPanel) return state.transientPanel;
    return panelIdForStep(currentStep());
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
      updateNlPhoneLayout();
      return;
    }
    var step = currentStep();
    var panelId = panelIdForStep(step);
    showSimPanel(panelId);
    if (!step) return;

    if (step.type === "select-bank") {
      ensureDefaultNlBank();
      syncSelectionGrids();
    } else if (step.type === "select-provider") {
      syncSelectionGrids();
    }
    if (step.type === "enter-details") renderDetailsFields(step.fields || []);
    if (step.type === "otp-phone" || step.type === "otp-email") setupOtpPanel(step.type);
    if (step.type === "consent") renderConsent();
    updateSimNextButtons();
    updateNlPhoneLayout();
  }

  function startSimulatedFlow() {
    if (!state.country || !state.country.steps.length) return;
    resetSimState();
    state.flowSteps = state.country.steps.slice();
    state.flowIndex = 0;
    buildSelectionGrid("eid-bank-grid", BANKS, "bank", usesNlSimFlow() ? updateNlPhoneLayout : null);
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
    else openExitSimDialog();
  }

  function consentEntityName() {
    if (state.bank) return state.bank.shareName || state.bank.label;
    if (state.provider) return state.provider.label;
    return state.country ? state.country.provider : "Provider";
  }

  function formatConsentLabel(item) {
    var label = String(item || "").trim().replace(/\s+/g, " ");
    if (!label) return label;
    label = label.replace(/\bFull Nae\b/gi, "Full name");
    label = label.replace(/\bissueing\b/gi, "issuing");
    label = label.replace(/^\)\s*/, "");
    label = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
    return label;
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
        '<span>' + formatConsentLabel(item) + "</span>";
      list.appendChild(li);
    });
  }

  /* ===================================================================
     Selection grids
     =================================================================== */
  function defaultNlBank() {
    return BANKS.find(function (b) { return b.id === "ing"; }) || BANKS[0];
  }

  function ensureDefaultNlBank() {
    if (!usesNlSimFlow() || state.bank) return;
    state.bank = defaultNlBank();
  }

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
        '<span class="eid-bank-card__label">' + item.label + "</span>" +
        "</span>";
      var input = card.querySelector("input");
      input.addEventListener("change", function () {
        grid.querySelectorAll(".eid-bank-card").forEach(function (c) {
          c.classList.toggle("eid-bank-card--selected", c.contains(input) && input.checked);
        });
        state[stateKey] = item;
        if (onChange) onChange(item);
        updateSimNextButtons();
        updateNlPhoneLayout();
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

    var mockBtn = byId("eid-details-mock");
    if (mockBtn) mockBtn.hidden = false;
    updateSimNextButtons();
  }

  function fillMockData() {
    var step = currentStep();
    if (!step || step.type !== "enter-details") return;

    var fields = expandedFields(step.fields || []);
    fields.forEach(function (fieldName) {
      var def = FIELD_DEFS[fieldName];
      if (!def || MOCK_VALUES[def.key] === undefined) return;
      state.formValues[def.key] = MOCK_VALUES[def.key];
      var input = byId("eid-field-" + def.key);
      if (input) input.value = MOCK_VALUES[def.key];
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

  function otpValid() {
    var digits = byId("eid-otp-inputs");
    if (!digits) return false;
    var inputs = digits.querySelectorAll(".eid-otp-digit");
    if (inputs.length !== 6) return false;
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value.trim()) return false;
    }
    return true;
  }

  function stepValid(step) {
    if (!step) return false;
    if (step.type === "select-bank") return !!state.bank;
    if (step.type === "select-provider") return !!state.provider;
    if (step.type === "enter-details") return detailsValid(step);
    if (step.type === "otp-phone" || step.type === "otp-email") return otpValid();
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
          updateSimNextButtons();
        });
        inputsRoot.appendChild(field);
      }
    }
    if (simulateBtn) simulateBtn.hidden = false;
    startResendCountdown();
    updateSimNextButtons();
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

  function fillOtp() {
    var digits = byId("eid-otp-inputs");
    var code = [9, 6, 2, 8, 9, 1];
    state.otpDigits = [];
    if (digits) {
      digits.querySelectorAll(".eid-otp-digit").forEach(function (input, i) {
        input.value = String(code[i]);
        state.otpDigits[i] = input.value;
      });
    }
    updateSimNextButtons();
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

  function openExitSimDialog() {
    if (window.openTdsDialog) window.openTdsDialog("eid-exit-sim-dialog");
    else { var d = byId("eid-exit-sim-dialog"); if (d) d.hidden = false; }
  }

  function closeExitSimDialog() {
    if (window.closeTdsDialog) window.closeTdsDialog(byId("eid-exit-sim-dialog"));
    else { var d = byId("eid-exit-sim-dialog"); if (d) d.hidden = true; }
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
    updateNlPhoneLayout();
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
      var panelId = activeSimPanelId();
      if (panelId === "eid-panel-launch-app") {
        state.transientPanel = "eid-panel-launch-loading";
        renderSimView();
        state.pendingTimer = setTimeout(function () {
          state.transientPanel = null;
          nextSimStep();
        }, TRANSITION_MS);
        return;
      }
      if (panelId === "eid-panel-consent-mobile") {
        state.transientPanel = "eid-panel-completing";
        renderSimView();
        state.pendingTimer = setTimeout(function () {
          if (window.EidResult) window.EidResult.show();
        }, TRANSITION_MS);
        return;
      }
      nextSimStep();
      return;
    }

    if (action === "simulate-otp") {
      fillOtp();
      return;
    }

    if (action === "simulate-mock-data") {
      fillMockData();
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

  function initExitSimDialog() {
    var cancel = byId("eid-exit-sim-cancel");
    var confirm = byId("eid-exit-sim-confirm");
    if (cancel) cancel.addEventListener("click", closeExitSimDialog);
    if (confirm) {
      confirm.addEventListener("click", function () {
        closeExitSimDialog();
        resetToStart();
      });
    }
  }

  /* ===================================================================
     Navigation wiring
     =================================================================== */
  function initNav() {
    var configBack = byId("eid-config-back");
    if (configBack) configBack.addEventListener("click", function () { history.back(); });

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
    initVerificationMode();
    bindSwitch("eid-device-toggle", "deviceIntelligence");
    initSelectionGrids();
    initProviderDialog();
    initDenyDialog();
    initExitSimDialog();
    initSimActions();
    initNav();
    updateConfigNext();
    updateCountryFieldTag();
    goStep("eid-step-config");
  });

  window.EidFlow = {
    getState: function () {
      return {
        country: state.country,
        deviceIntelligence: state.deviceIntelligence,
        simulated: state.simulated,
        bank: state.bank,
        provider: state.provider
      };
    }
  };
})();
