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
  var IT_LAUNCH_ACCESS_MS = 2000;
  var CZ_KB_LAUNCH_MS = 750;
  var CZ_COMPLETE_HOLD_MS = 2200;
  var BE_LAUNCH_MS = 750;
  var RESEND_SECONDS = 10;
  var IN_RESEND_SECONDS = 60;
  var CHECK_SVG = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg>';

  var BANKS = [
    { id: "ing", label: "ING", initials: "IN", shareName: "ING" },
    { id: "abn-amro", label: "ABN AMRO", initials: "AB", shareName: "ABN AMRO" },
    { id: "asn", label: "ASN Bank", initials: "AS", shareName: "ASN Bank" },
    { id: "rabo", label: "Rabo Bank", initials: "RA", shareName: "Rabobank" },
    { id: "sns", label: "SNS Bank", initials: "SN", shareName: "SNS Bank" },
    { id: "triodos", label: "Triodos Bank", initials: "TR", shareName: "Triodos Bank" }
  ];

  var CZ_BANKS = [
    { id: "kb", label: "Komerční banka (KB)", initials: "KB", shareName: "Komerční banka" },
    { id: "air-bank", label: "Air Bank", initials: "AB", shareName: "Air Bank" },
    { id: "creditas", label: "Banka CREDITAS", initials: "BC", shareName: "Banka CREDITAS" },
    { id: "ceska-sporitelna", label: "Česká spořitelna", initials: "SP", shareName: "Česká spořitelna" },
    { id: "csob", label: "ČSOB — Československá obchodní banka", initials: "CB", shareName: "ČSOB" },
    { id: "fio", label: "Fio banka", initials: "FB", shareName: "Fio banka" }
  ];

  var PROVIDERS = [
    { id: "poste", label: "Poste ID", initials: "PO" },
    { id: "etna", label: "Etna ID", initials: "ET" },
    { id: "infocert", label: "Infocert ID", initials: "IN" },
    { id: "lepida", label: "Lepida", initials: "LE" },
    { id: "namirial", label: "Namirial ID", initials: "NA" },
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

  var IN_MOCK_PHONE = "9876543210";

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
    pendingTimer: null,
    inSigninFilled: false,
    inOtpFilled: false,
    itSigninFilled: false,
    itLaunchPhoneShown: false,
    czSigninFilled: false,
    czConsentComplete: false,
    czKbConsentShown: false,
    beConsentShown: false,
    dkSigninFilled: false
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

  var itLaunchPhoneTimer = null;
  var czKbConsentTimer = null;
  var beConsentTimer = null;

  function clearItLaunchPhoneTimer() {
    if (itLaunchPhoneTimer) { clearTimeout(itLaunchPhoneTimer); itLaunchPhoneTimer = null; }
  }

  function clearCzKbConsentTimer() {
    if (czKbConsentTimer) { clearTimeout(czKbConsentTimer); czKbConsentTimer = null; }
  }

  function clearBeConsentTimer() {
    if (beConsentTimer) { clearTimeout(beConsentTimer); beConsentTimer = null; }
  }

  function clearPending() {
    if (state.pendingTimer) { clearTimeout(state.pendingTimer); state.pendingTimer = null; }
    clearItLaunchPhoneTimer();
    clearCzKbConsentTimer();
    clearBeConsentTimer();
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
    state.inSigninFilled = false;
    state.inOtpFilled = false;
    state.itSigninFilled = false;
    state.itLaunchPhoneShown = false;
    state.czSigninFilled = false;
    state.czConsentComplete = false;
    state.czKbConsentShown = false;
    state.beConsentShown = false;
    state.dkSigninFilled = false;
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
    var field = root.querySelector(".tds-combobox__field");

    function open() { root.classList.add("tds-combobox--open"); input.setAttribute("aria-expanded", "true"); }
    function close() { root.classList.remove("tds-combobox--open"); input.setAttribute("aria-expanded", "false"); }
    function showList() {
      renderOptions(state.country ? "" : input.value);
      open();
    }

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
    input.addEventListener("focus", showList);
    input.addEventListener("click", showList);
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
    if (field) {
      field.addEventListener("mousedown", function (e) {
        if (e.target === input) return;
        e.preventDefault();
        showList();
        input.focus();
      });
    }
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
      var completing = state.transientPanel === "eid-panel-completing";
      var itemState = "incomplete";
      if (completing || i < state.flowIndex) itemState = "completed";
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
    return false;
  }

  function usesNlSimFlow() {
    return !!(state.simulated && state.country && state.country.code === "nl");
  }

  function usesNlIngPhonePreview() {
    return usesNlSimFlow() && state.bank && state.bank.id === "ing";
  }

  var GUIDANCE_COPY = {
    "select-bank": {
      title: "Choose a bank",
      description: "Verification starts with the bank already used for online banking.",
      calloutText: "Select a bank."
    },
    "sign-in": {
      title: "Sign in",
      description: "Complete login in the banking app the same way as a real customer would.",
      calloutText: "Continue on the keypad."
    },
    "select-provider": {
      title: "Choose a provider",
      description: "Pick the identity provider already set up on the phone.",
      calloutText: "Select a provider."
    },
    "enter-details": {
      title: "Enter sign-in details",
      description: "Fill in the credentials on this screen before the app can confirm.",
      calloutText: "Tap an empty field to fill it."
    },
    "otp": {
      title: "Enter the one-time code",
      description: "A short code was sent to the registered mobile number.",
      calloutText: "Tap the code field to fill it."
    },
    "launch-app": {
      title: "Confirm in the app",
      description: "The mobile app has to approve this request before data can be shared.",
      calloutText: "Continue in the app."
    },
    "consent": {
      title: "Share identity data",
      description: "Review the details that will be returned, then approve sharing.",
      calloutText: "Tap the approval button."
    }
  };

  var GUIDANCE_COPY_BY_COUNTRY = {
    nl: {
      "select-bank": {
        title: "Choose a bank",
        description: "iDIN asks which Dutch bank should handle this login.",
        calloutText: "Select ING."
      },
      "sign-in": {
        title: "Sign in to ING",
        description: "The ING app asks for the usual 5-digit PIN.",
        calloutText: "Tap a number on the keypad."
      },
      "consent": {
        title: "Share iDIN data",
        description: "ING will share name, date of birth, and address for verification.",
        calloutText: "Tap Accept."
      }
    },
    be: {
      "consent": {
        title: "Confirm with itsme",
        description: "itsme shows the identity request from Trulioo before anything is shared.",
        calloutText: "Tap Confirm."
      }
    },
    cz: {
      "select-bank": {
        title: "Choose a bank",
        description: "Bank iD starts with the Czech bank already used for login.",
        calloutText: "Select Komerční banka."
      },
      "enter-details": {
        title: "Enter Bank iD username",
        description: "Komerční banka needs the username before it can confirm in the app.",
        calloutText: "Tap the username field."
      },
      "enter-details-filled": {
        title: "Continue to the app",
        description: "The username is filled. Next, confirm login in the banking app.",
        calloutText: "Tap Continue."
      },
      "launch-app": {
        title: "Confirm in the app",
        description: "Match the verification code shown in the Komerční banka app.",
        calloutText: "Tap the verification code."
      },
      "consent": {
        title: "Share Bank iD data",
        description: "Confirm that Komerční banka can provide identity data through Bank iD.",
        calloutText: "Tap Confirm."
      }
    },
    dk: {
      "enter-details": {
        title: "Enter MitID",
        description: "MitID starts with the user ID already registered to this person.",
        calloutText: "Tap the user ID field."
      },
      "enter-details-filled": {
        title: "Continue to MitID",
        description: "The user ID is filled. The next step opens the MitID app.",
        calloutText: "Tap Continue."
      },
      "launch-app": {
        title: "Open the MitID app",
        description: "MitID asks this person to approve a logon to Trulioo.",
        calloutText: "Tap Open MitID app."
      },
      "consent": {
        title: "Approve the logon",
        description: "Approving tells MitID that this Trulioo request can go ahead.",
        calloutText: "Tap Approve."
      }
    },
    in: {
      "enter-details": {
        title: "Sign in to DigiLocker",
        description: "Meri Pehchaan signs in with the mobile number linked to DigiLocker.",
        calloutText: "Tap the phone number field."
      },
      "enter-details-filled": {
        title: "Request an OTP",
        description: "The phone number is filled. Sign in to send a one-time code.",
        calloutText: "Tap Sign In."
      },
      "otp": {
        title: "Enter the OTP",
        description: "DigiLocker sent a one-time code to the registered mobile.",
        calloutText: "Tap the OTP field."
      },
      "otp-filled": {
        title: "Submit the OTP",
        description: "The code is filled. Sign in to open the consent screen.",
        calloutText: "Tap Sign In."
      },
      "consent": {
        title: "Allow DigiLocker sharing",
        description: "Allow DigiLocker to share name, date of birth, address, and ID details.",
        calloutText: "Tap Allow."
      }
    },
    it: {
      "select-provider": {
        title: "Choose a SPID provider",
        description: "SPID lets this person pick the identity provider they already have.",
        calloutText: "Select PosteID."
      },
      "enter-details": {
        title: "Sign in with PosteID",
        description: "PosteID needs the email used for this SPID account.",
        calloutText: "Tap the email field."
      },
      "enter-details-filled": {
        title: "Continue with SPID",
        description: "Credentials are filled. Sign in to open the PosteID app.",
        calloutText: "Tap Sign in with SPID."
      },
      "launch-app": {
        title: "Authorize in PosteID",
        description: "The PosteID app has to approve access before any data is sent.",
        calloutText: "Tap Control your smartphone."
      },
      "consent": {
        title: "Consent to share SPID data",
        description: "PosteID lists the personal data that will be sent to Trulioo.",
        calloutText: "Tap I CONSENT."
      }
    }
  };

  var PHONE_BANK_ITEMS = [
    { id: "abn-amro", label: "ABN AMRO", shareName: "ABN AMRO" },
    { id: "asn", label: "ASN Bank", shareName: "ASN Bank" },
    { id: "asn-regio", label: "ASN Bank formerly RegioBank", shareName: "ASN Bank" },
    { id: "sns", label: "ASN Bank formerly SNS", shareName: "SNS Bank" },
    { id: "bunq", label: "bunq", shareName: "bunq" },
    { id: "ing", label: "ING", shareName: "ING" },
    { id: "itsme", label: "itsme", shareName: "itsme" },
    { id: "rabo", label: "Rabobank", shareName: "Rabobank" }
  ];

  function visibleFlowSteps(steps) {
    return (steps || []).filter(function (step) { return !step.hidden; });
  }

  function usesBeSimFlow() {
    return !!(state.simulated && state.country && state.country.code === "be");
  }

  function usesInSimFlow() {
    return !!(state.simulated && state.country && state.country.code === "in");
  }

  function usesItSimFlow() {
    return !!(state.simulated && state.country && state.country.code === "it");
  }

  function usesCzSimFlow() {
    return !!(state.simulated && state.country && state.country.code === "cz");
  }

  function usesDkSimFlow() {
    return !!(state.simulated && state.country && state.country.code === "dk");
  }

  function usesCzKbMobilePreview() {
    return !!(state.bank && state.bank.id === "kb");
  }

  function usesItPosteMobilePreview() {
    return !!(state.provider && state.provider.id === "poste");
  }

  function usesPhonePreviewFlow() {
    return usesNlIngPhonePreview() || usesBeSimFlow() || usesInSimFlow() || usesItSimFlow() || usesCzSimFlow() || usesDkSimFlow();
  }

  function bankSelectionItems() {
    if (usesCzSimFlow()) return CZ_BANKS;
    return BANKS;
  }

  function bankGridChangeHandler() {
    if (usesNlSimFlow() || usesCzSimFlow()) return updateNlPhoneLayout;
    return null;
  }

  function shouldShowNlPhonePreview() {
    if (!usesNlSimFlow()) return false;
    return activeSimPanelId() !== "eid-panel-completing";
  }

  function shouldShowBePhonePreview() {
    if (!usesBeSimFlow()) return false;
    return activeSimPanelId() === "eid-panel-consent-mobile";
  }

  function shouldShowInPhonePreview() {
    if (!usesInSimFlow()) return false;
    var panelId = activeSimPanelId();
    return panelId === "eid-panel-enter-details"
      || panelId === "eid-panel-otp"
      || panelId === "eid-panel-consent-mobile";
  }

  function shouldShowItPhonePreview() {
    if (!usesItSimFlow() || !usesItPosteMobilePreview()) return false;
    var panelId = activeSimPanelId();
    return panelId === "eid-panel-select-provider"
      || panelId === "eid-panel-enter-details"
      || panelId === "eid-panel-launch-app"
      || panelId === "eid-panel-launch-loading"
      || panelId === "eid-panel-consent-mobile";
  }

  function shouldShowCzPhonePreview() {
    if (!usesCzSimFlow() || !usesCzKbMobilePreview()) return false;
    var panelId = activeSimPanelId();
    return panelId === "eid-panel-select-bank"
      || panelId === "eid-panel-enter-details"
      || panelId === "eid-panel-launch-app"
      || panelId === "eid-panel-launch-loading"
      || panelId === "eid-panel-consent-mobile";
  }

  function shouldShowDkPhonePreview() {
    if (!usesDkSimFlow()) return false;
    var panelId = activeSimPanelId();
    return panelId === "eid-panel-enter-details"
      || panelId === "eid-panel-launch-app"
      || panelId === "eid-panel-launch-loading"
      || panelId === "eid-panel-consent-mobile";
  }

  function shouldShowPhonePreview() {
    if (activeSimPanelId() === "eid-panel-completing") return false;
    return shouldShowNlPhonePreview()
      || shouldShowBePhonePreview()
      || shouldShowInPhonePreview()
      || shouldShowItPhonePreview()
      || shouldShowCzPhonePreview()
      || shouldShowDkPhonePreview();
  }

  function shouldUseCenteredPhoneLayout() {
    return shouldShowPhonePreview();
  }

  function shouldUseSplitCardLayout() {
    return shouldShowPhonePreview() && !shouldUseCenteredPhoneLayout();
  }

  function shouldUseInteractivePhone() {
    if (!shouldUseCenteredPhoneLayout()) return false;
    var panelId = activeSimPanelId();
    if (usesNlSimFlow()) {
      return panelId === "eid-panel-select-bank"
        || panelId === "eid-panel-sign-in"
        || panelId === "eid-panel-consent-mobile";
    }
    if (usesBeSimFlow()) {
      return panelId === "eid-panel-consent-mobile";
    }
    if (usesCzSimFlow() && usesCzKbMobilePreview()) {
      return panelId === "eid-panel-select-bank"
        || panelId === "eid-panel-enter-details"
        || panelId === "eid-panel-launch-app"
        || (panelId === "eid-panel-consent-mobile" && !state.czConsentComplete);
    }
    if (usesDkSimFlow()) {
      return panelId === "eid-panel-enter-details"
        || panelId === "eid-panel-launch-app"
        || panelId === "eid-panel-consent-mobile";
    }
    if (usesInSimFlow()) {
      return panelId === "eid-panel-enter-details"
        || panelId === "eid-panel-otp"
        || panelId === "eid-panel-consent-mobile";
    }
    if (usesItSimFlow() && usesItPosteMobilePreview()) {
      return panelId === "eid-panel-select-provider"
        || panelId === "eid-panel-enter-details"
        || panelId === "eid-panel-launch-app"
        || panelId === "eid-panel-consent-mobile";
    }
    return false;
  }

  function lockSimProgressWidth(stepRoot) {
    if (!stepRoot || stepRoot.classList.contains("eid-step-simulated--progress-locked")) return;
    var progress = byId("eid-sim-progress");
    if (!progress) return;
    var width = Math.round(progress.getBoundingClientRect().width);
    if (width < 1) return;
    stepRoot.style.setProperty("--eid-sim-progress-lock", width + "px");
    stepRoot.classList.add("eid-step-simulated--progress-locked");
  }

  function unlockSimProgressWidth(stepRoot) {
    if (!stepRoot) return;
    stepRoot.classList.remove("eid-step-simulated--progress-locked");
    stepRoot.style.removeProperty("--eid-sim-progress-lock");
  }

  function updateNlPhoneLayout() {
    var stepRoot = byId("eid-step-simulated");
    var phone = byId("eid-sim-phone");
    if (!stepRoot || !phone) return;
    var completing = activeSimPanelId() === "eid-panel-completing";
    if (completing) lockSimProgressWidth(stepRoot);
    else unlockSimProgressWidth(stepRoot);
    var showPhone = shouldShowPhonePreview();
    var splitLayout = shouldUseSplitCardLayout();
    var centeredLayout = shouldUseCenteredPhoneLayout();
    if (completing) {
      splitLayout = stepRoot.classList.contains("eid-step-simulated--nl-phone");
      centeredLayout = stepRoot.classList.contains("eid-step-simulated--phone-centered");
    }
    var interactivePhone = shouldUseInteractivePhone();
    var wasVisible = phone.getAttribute("data-visible") === "true";
    stepRoot.classList.toggle("eid-step-simulated--nl-phone", splitLayout);
    stepRoot.classList.toggle("eid-step-simulated--phone-centered", centeredLayout);
    if (interactivePhone) stepRoot.setAttribute("data-eid-phone-interactive", "true");
    else stepRoot.removeAttribute("data-eid-phone-interactive");
    phone.hidden = !showPhone;
    phone.setAttribute("aria-hidden", showPhone ? "false" : "true");
    phone.setAttribute("data-visible", showPhone ? "true" : "false");
    phone.classList.remove("eid-sim-phone--enter");
    updateGuidanceCard();
    updateCenteredChevrons();
    if (showPhone) {
      renderNlPhonePreview();
      bindNlPhoneResize();
      scheduleNlPhoneSizeSync(true);
      if (!wasVisible) {
        requestAnimationFrame(function () {
          phone.classList.add("eid-sim-phone--enter");
        });
      }
    } else {
      var screen = byId("eid-sim-phone-screen");
      if (screen) {
        clearPhoneEmbedFadeTimer();
        screen.innerHTML = "";
        screen.removeAttribute("data-embed-key");
      }
      phone.removeAttribute("data-nl-phone-scale");
    }
  }

  function currentGuidanceCopy() {
    var step = currentStep();
    var type = step && step.type;
    if (type === "otp-phone" || type === "otp-email") type = "otp";
    var base = type && GUIDANCE_COPY[type];
    if (!base) return null;
    var code = state.country && state.country.code;
    var typeKey = type;
    if (type === "enter-details" && detailsFilled()) typeKey = "enter-details-filled";
    if ((type === "otp") && usesInSimFlow() && state.inOtpFilled) typeKey = "otp-filled";
    var override = (code && GUIDANCE_COPY_BY_COUNTRY[code] && GUIDANCE_COPY_BY_COUNTRY[code][typeKey])
      || (code && GUIDANCE_COPY_BY_COUNTRY[code] && GUIDANCE_COPY_BY_COUNTRY[code][type])
      || {};
    return {
      title: override.title || base.title,
      description: override.description || base.description,
      calloutText: override.calloutText || base.calloutText
    };
  }

  function applyGuidanceCard(props) {
    var card = byId("eid-guidance-card");
    if (!card) return;
    var title = byId("eid-guidance-title");
    var description = byId("eid-guidance-description");
    var callout = byId("eid-guidance-callout");
    var country = byId("eid-guidance-country");
    var method = byId("eid-guidance-method");
    var flag = byId("eid-guidance-flag");
    var chipFlag = byId("eid-guidance-chip-flag");
    var chipLabel = byId("eid-guidance-chip-label");
    var code = String(props.countryCode || "").toLowerCase();
    var codeLabel = code.toUpperCase();
    var methodLabel = props.methodLabel || "";
    if (title) title.textContent = props.title || "";
    if (description) description.textContent = props.description || "";
    if (callout) callout.textContent = props.calloutText || "";
    if (country) country.textContent = props.countryName || "";
    if (method) method.textContent = methodLabel;
    if (flag) flag.innerHTML = code ? '<span class="fi fi-' + code + '"></span>' : "";
    if (chipFlag) chipFlag.innerHTML = code ? '<span class="fi fi-' + code + '"></span>' : "";
    if (chipLabel) {
      chipLabel.textContent = codeLabel && methodLabel ? (codeLabel + " - " + methodLabel) : (codeLabel || methodLabel);
    }
  }

  function updateGuidanceCard() {
    var card = byId("eid-guidance-card");
    if (!card) return;
    var show = shouldUseCenteredPhoneLayout() && !isSimLoadingPanel(activeSimPanelId());
    var copy = currentGuidanceCopy();
    card.hidden = !show || !copy;
    if (!show || !copy) {
      card.classList.remove("tds-demo-guidance-card--compact");
      return;
    }
    if (!state.country) return;
    applyGuidanceCard({
      title: copy.title,
      description: copy.description,
      calloutText: copy.calloutText,
      countryCode: state.country.code,
      countryName: state.country.country,
      methodLabel: state.country.provider
    });
  }

  function isFirstSimStep() {
    return state.flowIndex <= 0 && !state.transientPanel;
  }

  function updateCenteredChevrons() {
    var prev = byId("eid-sim-chevron-prev");
    var next = byId("eid-sim-chevron-next");
    var stepRoot = byId("eid-step-simulated");
    var show = shouldUseCenteredPhoneLayout() && !isSimLoadingPanel(activeSimPanelId());
    var showPrev = show && (!isFirstSimStep() || canRewindPhoneAction());
    if (stepRoot) {
      stepRoot.toggleAttribute("data-eid-first-step", isFirstSimStep() && !canRewindPhoneAction());
    }
    if (prev) prev.hidden = !showPrev;
    if (next) {
      next.hidden = !show;
      next.removeAttribute("aria-disabled");
    }
  }

  var NL_MOBILE_EMBED_BASE = "embed/";
  var NL_PHONE_FRAME_W = 390;
  var NL_PHONE_FRAME_H = 800;
  var NL_PHONE_COMPACT_H = 480;
  var NL_PHONE_PANEL_PAD = 32;
  var PHONE_EMBED_FADE_MS = 400;
  var nlPhoneResizeBound = false;
  var phoneEmbedFadeTimer = null;

  function nlPhoneLabelReserve(phone) {
    var stepRoot = byId("eid-step-simulated");
    if (stepRoot && (stepRoot.classList.contains("eid-step-simulated--nl-phone") || stepRoot.classList.contains("eid-step-simulated--phone-centered"))) return 0;
    if (!phone.querySelector(".eid-mobile-embed-host")) return 0;
    var label = phone.querySelector(".eid-sim-phone__label");
    if (!label || getComputedStyle(label).display === "none") return 0;
    var gap = parseFloat(getComputedStyle(phone).rowGap || getComputedStyle(phone).gap) || 0;
    var height = label.getBoundingClientRect().height;
    if (height < 1) height = 24;
    return height + gap;
  }

  function guidanceCardReserve() {
    if (!shouldUseCenteredPhoneLayout()) return 0;
    var card = byId("eid-guidance-card");
    if (!card || card.hidden) return 0;
    var height = card.getBoundingClientRect().height;
    if (height < 1) height = 160;
    return height + 24;
  }

  function centeredPhoneScale(phone) {
    var cluster = phone.closest(".eid-sim-phone-cluster");
    if (!cluster) return 0.85;

    var width = cluster.clientWidth;
    var height = cluster.clientHeight;
    if (width < 8 || height < 8) {
      var cached = parseFloat(phone.getAttribute("data-nl-phone-scale"));
      return Number.isFinite(cached) && cached > 0 ? cached : 0.85;
    }

    var scaleByHeight = height / NL_PHONE_FRAME_H;
    var scaleByWidth = width / NL_PHONE_FRAME_W;
    return Math.min(scaleByHeight, scaleByWidth, 1);
  }

  function clusterHeightIfDefaultCard(cluster, card) {
    var clusterH = cluster.clientHeight;
    if (!card || card.hidden || !card.classList.contains("tds-demo-guidance-card--compact")) {
      return clusterH;
    }
    var defaultH = parseFloat(card.getAttribute("data-default-height"));
    if (!Number.isFinite(defaultH) || defaultH <= 0) return clusterH;
    return Math.max(0, clusterH - (defaultH - card.offsetHeight));
  }

  function displayedPhoneHeight(clusterH, clusterW) {
    var scale = Math.min(clusterH / NL_PHONE_FRAME_H, clusterW / NL_PHONE_FRAME_W, 1);
    return scale * NL_PHONE_FRAME_H;
  }

  function syncGuidanceCardCompact(phone) {
    var card = byId("eid-guidance-card");
    var cluster = phone && phone.closest(".eid-sim-phone-cluster");
    if (!card || card.hidden || !cluster) {
      if (card && (card.hidden || !cluster)) card.classList.remove("tds-demo-guidance-card--compact");
      return false;
    }
    if (cluster.clientHeight < 8 || cluster.clientWidth < 8) return false;

    var isCompact = card.classList.contains("tds-demo-guidance-card--compact");
    if (!isCompact) {
      card.setAttribute("data-default-height", String(card.offsetHeight));
    }

    var nextCompact = displayedPhoneHeight(
      clusterHeightIfDefaultCard(cluster, card),
      cluster.clientWidth
    ) < NL_PHONE_COMPACT_H;

    if (nextCompact === isCompact) return false;
    card.classList.toggle("tds-demo-guidance-card--compact", nextCompact);
    return true;
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
    if (!forceRecalc && cached && !shouldUseCenteredPhoneLayout()) {
      applyNlPhoneScale(phone, host, cached);
      return;
    }

    if (shouldUseCenteredPhoneLayout()) {
      syncGuidanceCardCompact(phone);
      var cluster = phone.closest(".eid-sim-phone-cluster");
      var measured = cluster && cluster.clientWidth >= 8 && cluster.clientHeight >= 8;
      var centeredScale = centeredPhoneScale(phone);
      var centeredStr = centeredScale.toFixed(4);
      if (measured) phone.setAttribute("data-nl-phone-scale", centeredStr);
      applyNlPhoneScale(phone, host, centeredStr);
      return;
    }

    var labelReserve = nlPhoneLabelReserve(phone) + guidanceCardReserve();
    var panelStyle = getComputedStyle(phone);
    var padY = parseFloat(panelStyle.paddingTop) + parseFloat(panelStyle.paddingBottom);
    var padX = parseFloat(panelStyle.paddingLeft) + parseFloat(panelStyle.paddingRight);
    var panelRect = phone.getBoundingClientRect();
    var innerWidth = Math.max(0, panelRect.width - padX);
    var innerHeight = Math.max(0, panelRect.height - padY - labelReserve);
    var scaleByWidth = innerWidth > 0 ? innerWidth / NL_PHONE_FRAME_W : 1;
    var scaleByHeight = innerHeight > 0 ? innerHeight / NL_PHONE_FRAME_H : 1;

    if (innerWidth < 1 || innerHeight < 1) {
      var top = panelRect.top;
      var availableHeight = window.innerHeight - top - NL_PHONE_PANEL_PAD - labelReserve;
      availableHeight = Math.max(0, availableHeight);
      scaleByHeight = Math.min(scaleByHeight, availableHeight / NL_PHONE_FRAME_H);
    }

    var scale = Math.min(scaleByHeight, scaleByWidth, 1);
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
      var splitCard = phone.closest(".eid-sim-split-card");
      if (splitCard) ro.observe(splitCard);
      var cluster = phone.closest(".eid-sim-phone-cluster");
      if (cluster) ro.observe(cluster);
      var workspace = phone.closest(".eid-sim-stage__workspace");
      if (workspace) ro.observe(workspace);
    }
  }

  function renderMobileEmbedScreen(filename, title, query) {
    var src = NL_MOBILE_EMBED_BASE + filename + (query || "");
    return {
      key: filename + (query || ""),
      html: (
        '<div class="eid-mobile-embed-host">' +
        '<div class="eid-mobile-embed">' +
        '<iframe class="eid-mobile-embed__frame" src="' + src + '" title="' + title + '" tabindex="-1" loading="lazy" scrolling="no"></iframe>' +
        "</div></div>"
      )
    };
  }

  function phoneEmbedFadeReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function clearPhoneEmbedFadeTimer() {
    if (phoneEmbedFadeTimer) {
      clearTimeout(phoneEmbedFadeTimer);
      phoneEmbedFadeTimer = null;
    }
  }

  function mountPhoneEmbedScreen(screen, embed) {
    screen.setAttribute("data-embed-key", embed.key);
    screen.innerHTML = embed.html;
    var host = screen.querySelector(".eid-mobile-embed-host");
    if (host && !phoneEmbedFadeReducedMotion()) {
      host.classList.add("eid-mobile-embed-host--enter");
    }
    bindNlPhoneEmbedLoad(screen);
  }

  function setPhoneEmbedScreen(screen, embed) {
    if (!screen || !embed) return;
    if (screen.getAttribute("data-embed-key") === embed.key) {
      postBankSelectionToPhone();
      return;
    }

    var existingHost = screen.querySelector(".eid-mobile-embed-host");
    if (!existingHost || !screen.getAttribute("data-embed-key")) {
      mountPhoneEmbedScreen(screen, embed);
      return;
    }

    clearPhoneEmbedFadeTimer();
    if (phoneEmbedFadeReducedMotion()) {
      mountPhoneEmbedScreen(screen, embed);
      return;
    }

    existingHost.classList.add("eid-mobile-embed-host--leave");

    var temp = document.createElement("div");
    temp.innerHTML = embed.html;
    var newHost = temp.firstElementChild;
    if (!newHost) {
      mountPhoneEmbedScreen(screen, embed);
      return;
    }

    screen.setAttribute("data-embed-key", embed.key);
    newHost.classList.add("eid-mobile-embed-host--enter");
    screen.appendChild(newHost);

    phoneEmbedFadeTimer = setTimeout(function () {
      existingHost.remove();
      newHost.classList.remove("eid-mobile-embed-host--enter");
      phoneEmbedFadeTimer = null;
      bindNlPhoneEmbedLoad(screen);
    }, PHONE_EMBED_FADE_MS);
  }

  function phoneEmbedForPanel(panelId) {
    if (panelId === "eid-panel-select-bank") {
      if (usesCzSimFlow() && usesCzKbMobilePreview()) {
        return renderMobileEmbedScreen("CZ-bank.html", "Czech bank selection", "?interactive=1");
      }
      if (usesNlSimFlow()) {
        return renderMobileEmbedScreen("NE-idin-select-v2.html", "iDIN bank selection", "?interactive=1");
      }
      return renderMobileEmbedScreen("NE-idin-select-v2.html", "iDIN bank selection");
    }
    if (panelId === "eid-panel-sign-in") {
      return renderMobileEmbedScreen("NE-ing-launch.html", "ING launch");
    }
    if (panelId === "eid-panel-select-provider" && usesItSimFlow() && usesItPosteMobilePreview()) {
      return renderMobileEmbedScreen("IT-select.html", "Italy SPID provider select", "?interactive=1");
    }
    if (panelId === "eid-panel-enter-details" && usesInSimFlow()) {
      return renderMobileEmbedScreen(
        state.inSigninFilled ? "IN-signin-filled.html" : "IN-signin.html",
        state.inSigninFilled ? "India sign in filled" : "India sign in",
        state.inSigninFilled ? indiaEmbedPhoneQuery() : "?interactive=1"
      );
    }
    if (panelId === "eid-panel-enter-details" && usesItSimFlow()) {
      return renderMobileEmbedScreen(
        state.itSigninFilled ? "IT-signin-complete.html" : "IT-signin.html",
        state.itSigninFilled ? "Italy SPID sign in complete" : "Italy SPID sign in",
        state.itSigninFilled ? italyEmbedSigninQuery() : "?interactive=1"
      );
    }
    if (panelId === "eid-panel-enter-details" && usesCzSimFlow() && usesCzKbMobilePreview()) {
      return renderMobileEmbedScreen(
        state.czSigninFilled ? "CZ-signin-complete.html" : "CZ-signin.html",
        state.czSigninFilled ? "Czech Bank iD sign in complete" : "Czech Bank iD sign in",
        state.czSigninFilled ? czechEmbedSigninQuery() : "?interactive=1"
      );
    }
    if (panelId === "eid-panel-enter-details" && usesDkSimFlow()) {
      return renderMobileEmbedScreen(
        state.dkSigninFilled ? "DE-signin-complete.html" : "DE-signin.html",
        state.dkSigninFilled ? "Denmark MitID sign in complete" : "Denmark MitID sign in",
        state.dkSigninFilled ? denmarkEmbedSigninQuery() : "?interactive=1"
      );
    }
    if (panelId === "eid-panel-otp" && usesInSimFlow()) {
      return renderMobileEmbedScreen(
        state.inOtpFilled ? "IN-OTP-filled.html" : "IN-OTP.html",
        state.inOtpFilled ? "India OTP filled" : "India OTP",
        indiaEmbedPhoneQuery()
      );
    }
    if ((panelId === "eid-panel-launch-app" || panelId === "eid-panel-launch-loading") && usesItSimFlow()) {
      return renderMobileEmbedScreen(
        "IT-access-phone.html",
        "Italy SPID access with phone",
        "?interactive=1"
      );
    }
    if ((panelId === "eid-panel-launch-app" || panelId === "eid-panel-launch-loading") && usesCzSimFlow() && usesCzKbMobilePreview()) {
      return renderMobileEmbedScreen("CZ-confirm.html", "Czech Bank iD confirm", "?interactive=1");
    }
    if ((panelId === "eid-panel-launch-app" || panelId === "eid-panel-launch-loading") && usesDkSimFlow()) {
      return renderMobileEmbedScreen("DE-app.html", "Denmark MitID app", "?interactive=1");
    }
    if (panelId === "eid-panel-consent-mobile") {
      if (usesCzSimFlow() && usesCzKbMobilePreview()) {
        if (state.czConsentComplete) {
          return renderMobileEmbedScreen("CZ-complete.html", "Czech Bank iD complete");
        }
        if (state.czKbConsentShown) {
          return renderMobileEmbedScreen("CZ-consent.html", "Czech Bank iD consent", "?interactive=1");
        }
        return renderMobileEmbedScreen("CZ-kb-launch.html", "Czech KB app launch");
      }
      if (usesBeSimFlow()) {
        if (state.beConsentShown) {
          return renderMobileEmbedScreen("BE-consent.html", "Belgium consent", "?interactive=1");
        }
        return renderMobileEmbedScreen("BE-launch.html", "itsme app launch");
      }
      if (usesInSimFlow()) {
        return renderMobileEmbedScreen("IN-consent.html", "India consent", "?interactive=1");
      }
      if (usesItSimFlow()) {
        return renderMobileEmbedScreen("IT-consent.html", "Italy SPID consent", "?interactive=1");
      }
      if (usesDkSimFlow()) {
        return renderMobileEmbedScreen("DE-approve.html", "Denmark MitID approve", "?interactive=1");
      }
      return renderMobileEmbedScreen("NE-ing-consent.html", "ING consent", "?interactive=1");
    }
    return null;
  }

  function indiaPhoneDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function indiaEmbedPhoneQuery() {
    var digits = indiaPhoneDigits(state.formValues.phone) || IN_MOCK_PHONE;
    return "?interactive=1&phone=" + encodeURIComponent(digits);
  }

  function italyEmbedSigninQuery() {
    return "?interactive=1&email=" + encodeURIComponent(MOCK_VALUES.email);
  }

  function czechEmbedSigninQuery() {
    var username = state.formValues.username || MOCK_VALUES.username;
    return "?interactive=1&username=" + encodeURIComponent(username);
  }

  function denmarkEmbedSigninQuery() {
    var username = state.formValues.username || MOCK_VALUES.username;
    return "?interactive=1&username=" + encodeURIComponent(username);
  }

  function scheduleCzKbConsentTransition() {
    if (!usesCzSimFlow() || !usesCzKbMobilePreview()) return;
    if (state.czKbConsentShown || state.czConsentComplete) return;
    if (activeSimPanelId() !== "eid-panel-consent-mobile") return;
    if (czKbConsentTimer) return;
    czKbConsentTimer = setTimeout(function () {
      czKbConsentTimer = null;
      state.czKbConsentShown = true;
      updateNlPhoneLayout();
    }, CZ_KB_LAUNCH_MS);
  }

  function scheduleBeConsentTransition() {
    if (!usesBeSimFlow()) return;
    if (state.beConsentShown) return;
    if (activeSimPanelId() !== "eid-panel-consent-mobile") return;
    if (beConsentTimer) return;
    beConsentTimer = setTimeout(function () {
      beConsentTimer = null;
      state.beConsentShown = true;
      updateNlPhoneLayout();
    }, BE_LAUNCH_MS);
  }

  function scheduleItLaunchPhoneTransition() {
    if (!usesItSimFlow() || state.itLaunchPhoneShown) return;
    if (activeSimPanelId() !== "eid-panel-launch-app") return;
    if (itLaunchPhoneTimer) return;
    itLaunchPhoneTimer = setTimeout(function () {
      itLaunchPhoneTimer = null;
      state.itLaunchPhoneShown = true;
      renderNlPhonePreview();
    }, IT_LAUNCH_ACCESS_MS);
  }

  function mockValueForKey(key) {
    if (key === "phone" && usesInSimFlow()) return IN_MOCK_PHONE;
    return MOCK_VALUES[key];
  }

  function renderNlPhonePreview() {
    var screen = byId("eid-sim-phone-screen");
    if (!screen || !shouldShowPhonePreview()) return;

    var phone = byId("eid-sim-phone");
    if (phone) phone.removeAttribute("data-nl-phone-scale");

    var panelId = activeSimPanelId();
    var embed = phoneEmbedForPanel(panelId);
    if (!embed) {
      clearPhoneEmbedFadeTimer();
      screen.removeAttribute("data-embed-key");
      screen.innerHTML = "";
      return;
    }

    setPhoneEmbedScreen(screen, embed);

    if (panelId === "eid-panel-consent-mobile" && usesCzSimFlow() && usesCzKbMobilePreview()
      && !state.czKbConsentShown && !state.czConsentComplete) {
      scheduleCzKbConsentTransition();
    }
    if (panelId === "eid-panel-consent-mobile" && usesBeSimFlow() && !state.beConsentShown) {
      scheduleBeConsentTransition();
    }
  }

  function bindNlPhoneEmbedLoad(screen) {
    var iframe = screen.querySelector(".eid-mobile-embed__frame");
    if (!iframe) {
      scheduleNlPhoneSizeSync();
      return;
    }
    iframe.addEventListener("load", function () {
      scheduleNlPhoneSizeSync();
      postBankSelectionToPhone();
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

  function isSimLoadingPanel(panelId) {
    return panelId === "eid-panel-qr-loading"
      || panelId === "eid-panel-launch-loading"
      || panelId === "eid-panel-completing";
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
    var stepRoot = byId("eid-step-simulated");
    if (state.transientPanel === "eid-panel-completing") {
      lockSimProgressWidth(stepRoot);
    } else {
      unlockSimProgressWidth(stepRoot);
    }
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
      ensureDefaultCzBank();
      syncSelectionGrids();
    } else if (step.type === "select-provider") {
      ensureDefaultItProvider();
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
    state.flowSteps = visibleFlowSteps(state.country.steps);
    state.flowIndex = 0;
    buildSelectionGrid("eid-bank-grid", bankSelectionItems(), "bank", bankGridChangeHandler());
    goStep("eid-step-simulated");
    renderSimView();
  }

  function goSimIndex(index) {
    state.transientPanel = null;
    var nextStep = state.flowSteps[index];
    if (nextStep && nextStep.type === "launch-app") {
      state.itLaunchPhoneShown = false;
      clearItLaunchPhoneTimer();
    }
    if (!nextStep || nextStep.type !== "consent") {
      state.czKbConsentShown = false;
      state.beConsentShown = false;
      clearCzKbConsentTimer();
      clearBeConsentTimer();
    }
    state.flowIndex = Math.max(0, Math.min(index, state.flowSteps.length - 1));
    renderSimView();
  }

  function showCzCompleteThenResult() {
    if (state.czConsentComplete) {
      goToCompletingThenResult();
      return;
    }
    state.czConsentComplete = true;
    updateNlPhoneLayout();
    clearPending();
    state.pendingTimer = setTimeout(function () {
      goToCompletingThenResult();
    }, CZ_COMPLETE_HOLD_MS);
  }

  function goToCompletingThenResult() {
    clearPending();
    state.transientPanel = "eid-panel-completing";
    renderSimView();
    state.pendingTimer = setTimeout(function () {
      if (window.EidResult) window.EidResult.show();
    }, TRANSITION_MS);
  }

  function nextSimStep() {
    if (state.flowIndex < state.flowSteps.length - 1) {
      goSimIndex(state.flowIndex + 1);
    }
  }

  function prevSimStep() {
    if (state.transientPanel) {
      if (state.transientPanel === "eid-panel-completing" && usesCzSimFlow()) {
        state.czConsentComplete = false;
        state.czKbConsentShown = false;
        clearCzKbConsentTimer();
      }
      if (state.transientPanel === "eid-panel-completing" && usesBeSimFlow()) {
        state.beConsentShown = false;
        clearBeConsentTimer();
      }
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

  function defaultCzBank() {
    return CZ_BANKS.find(function (b) { return b.id === "kb"; }) || CZ_BANKS[0];
  }

  function ensureDefaultCzBank() {
    if (!usesCzSimFlow() || state.bank) return;
    state.bank = defaultCzBank();
  }

  function defaultItProvider() {
    return PROVIDERS.find(function (p) { return p.id === "poste"; }) || PROVIDERS[0];
  }

  function ensureDefaultItProvider() {
    if (!usesItSimFlow() || state.provider) return;
    state.provider = defaultItProvider();
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
    buildSelectionGrid("eid-provider-grid", PROVIDERS, "provider", function () {
      if (usesItSimFlow()) updateNlPhoneLayout();
    });
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

  function phoneBankItem(bankId) {
    return PHONE_BANK_ITEMS.find(function (item) { return item.id === bankId; })
      || BANKS.find(function (item) { return item.id === bankId; })
      || CZ_BANKS.find(function (item) { return item.id === bankId; })
      || null;
  }

  function postBankSelectionToPhone() {
    var screen = byId("eid-sim-phone-screen");
    var iframe = screen && screen.querySelector(".eid-mobile-embed__frame");
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage({
      source: "eid-sim",
      type: "eid-set-bank",
      bankId: state.bank && state.bank.id
    }, "*");
  }

  function selectBankFromPhone(bankId) {
    var item = phoneBankItem(bankId);
    if (!item) return;
    state.bank = item;
    syncSelectionGrid("eid-bank-grid", "bank");
    if (activeSimPanelId() === "eid-panel-select-bank") {
      nextSimStep();
    }
  }

  function selectProviderFromPhone(providerId) {
    var item = PROVIDERS.find(function (p) { return p.id === providerId; });
    if (!item) return;
    state.provider = item;
    syncSelectionGrid("eid-provider-grid", "provider");
    if (activeSimPanelId() === "eid-panel-select-provider") {
      nextSimStep();
    }
  }

  function initPhoneEmbedMessages() {
    window.addEventListener("message", function (event) {
      var data = event.data;
      if (!data || data.source !== "eid-embed") return;
      if (data.type === "eid-bank-select") {
        selectBankFromPhone(data.bankId);
        return;
      }
      if (data.type === "eid-signin-complete") {
        if (
          activeSimPanelId() === "eid-panel-sign-in"
          || activeSimPanelId() === "eid-panel-enter-details"
          || activeSimPanelId() === "eid-panel-otp"
        ) {
          nextSimStep();
        }
        return;
      }
      if (data.type === "eid-details-filled") {
        if (activeSimPanelId() === "eid-panel-enter-details") fillMockData();
        return;
      }
      if (data.type === "eid-otp-filled") {
        if (activeSimPanelId() === "eid-panel-otp") fillOtp();
        return;
      }
      if (data.type === "eid-provider-select") {
        selectProviderFromPhone(data.providerId);
        return;
      }
      if (data.type === "eid-launch-confirm") {
        if (activeSimPanelId() === "eid-panel-launch-app") nextSimStep();
        return;
      }
      if (data.type === "eid-consent-accept") {
        if (activeSimPanelId() === "eid-panel-consent-mobile") {
          handleSimAction("simulate-approval");
        }
      }
    });
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
      if (!def || mockValueForKey(def.key) === undefined) return;
      state.formValues[def.key] = mockValueForKey(def.key);
      var input = byId("eid-field-" + def.key);
      if (input) input.value = mockValueForKey(def.key);
    });

    if (usesInSimFlow()) {
      state.inSigninFilled = true;
      updateNlPhoneLayout();
    } else if (usesItSimFlow()) {
      state.itSigninFilled = true;
      updateNlPhoneLayout();
    } else if (usesCzSimFlow()) {
      state.czSigninFilled = true;
      updateNlPhoneLayout();
    } else if (usesDkSimFlow()) {
      state.dkSigninFilled = true;
      updateNlPhoneLayout();
    }

    updateSimNextButtons();
  }

  function detailsFilled() {
    if (usesInSimFlow()) return !!state.inSigninFilled;
    if (usesItSimFlow()) return !!state.itSigninFilled;
    if (usesCzSimFlow()) return !!state.czSigninFilled;
    if (usesDkSimFlow()) return !!state.dkSigninFilled;
    var step = currentStep();
    return !!(step && step.type === "enter-details" && detailsValid(step));
  }

  function clearDetailsFill() {
    var step = currentStep();
    if (!step || step.type !== "enter-details") return;
    var fields = expandedFields(step.fields || []);
    fields.forEach(function (fieldName) {
      var def = FIELD_DEFS[fieldName];
      if (!def) return;
      state.formValues[def.key] = "";
      var input = byId("eid-field-" + def.key);
      if (input) input.value = "";
    });
    state.inSigninFilled = false;
    state.itSigninFilled = false;
    state.czSigninFilled = false;
    state.dkSigninFilled = false;
    updateSimNextButtons();
    updateNlPhoneLayout();
  }

  function clearOtpFill() {
    var digits = byId("eid-otp-inputs");
    state.otpDigits = [];
    state.inOtpFilled = false;
    if (digits) {
      digits.querySelectorAll(".eid-otp-digit").forEach(function (input) {
        input.value = "";
      });
    }
    updateSimNextButtons();
    updateNlPhoneLayout();
  }

  function canRewindPhoneAction() {
    var step = currentStep();
    if (!step || !shouldUseCenteredPhoneLayout()) return false;
    if (isSimLoadingPanel(activeSimPanelId())) return false;
    if (step.type === "enter-details") return detailsFilled();
    if ((step.type === "otp-phone" || step.type === "otp-email") && usesInSimFlow()) return !!state.inOtpFilled;
    if (step.type === "consent" && usesCzSimFlow() && usesCzKbMobilePreview()) return !!state.czConsentComplete;
    return false;
  }

  function advancePhoneAction() {
    var step = currentStep();
    if (!step || !shouldUseCenteredPhoneLayout()) return false;
    if (isSimLoadingPanel(activeSimPanelId())) return false;
    if (step.type === "enter-details" && !detailsFilled()) {
      fillMockData();
      return true;
    }
    if ((step.type === "otp-phone" || step.type === "otp-email") && usesInSimFlow() && !state.inOtpFilled) {
      fillOtp();
      return true;
    }
    return false;
  }

  function rewindPhoneAction() {
    if (!canRewindPhoneAction()) return false;
    var step = currentStep();
    if (step.type === "enter-details") {
      clearDetailsFill();
      return true;
    }
    if (step.type === "otp-phone" || step.type === "otp-email") {
      clearOtpFill();
      return true;
    }
    if (step.type === "consent" && usesCzSimFlow()) {
      clearPending();
      state.czConsentComplete = false;
      updateNlPhoneLayout();
      return true;
    }
    return false;
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

  function resendSecondsInitial() {
    return usesInSimFlow() ? IN_RESEND_SECONDS : RESEND_SECONDS;
  }

  function startResendCountdown() {
    clearResendTimer();
    state.resendSeconds = resendSecondsInitial();
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
    if (usesInSimFlow()) {
      state.inOtpFilled = true;
      updateNlPhoneLayout();
    }
    updateSimNextButtons();
  }
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

  function restoreFromSession(session) {
    if (!session) return;
    if (typeof session.deviceIntelligence === "boolean") state.deviceIntelligence = session.deviceIntelligence;
    if (typeof session.simulated === "boolean") state.simulated = session.simulated;
    if (session.bank) state.bank = session.bank;
    if (session.provider) state.provider = session.provider;
    if (session.countryCode) {
      var found = FLOW_DATA.find(function (c) {
        return c.code === session.countryCode;
      });
      if (found) state.country = found;
    }
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
      if (rewindPhoneAction()) return;
      prevSimStep();
      return;
    }

    if (action === "next") {
      if (shouldUseCenteredPhoneLayout()) {
        if (advancePhoneAction()) return;
        if (step && step.type === "consent") {
          handleSimAction("simulate-approval", btn);
          return;
        }
        nextSimStep();
        return;
      }
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
        if (usesCzSimFlow() && usesCzKbMobilePreview()) {
          showCzCompleteThenResult();
          return;
        }
        goToCompletingThenResult();
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
    initPhoneEmbedMessages();
    initNav();
    updateConfigNext();
    updateCountryFieldTag();

    var session = window.EidResult && window.EidResult.loadSession
      ? window.EidResult.loadSession()
      : null;
    if (location.hash === "#result" || (session && session.view === "result")) {
      if (session) restoreFromSession(session);
      if (window.EidResult) window.EidResult.show();
    } else {
      goStep("eid-step-config");
    }
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
    },
    restoreFromSession: restoreFromSession
  };
})();
