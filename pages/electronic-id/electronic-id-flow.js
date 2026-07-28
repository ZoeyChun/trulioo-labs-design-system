/* ============================================================
   Electronic ID — capture flow controller
   Drives a multi-step wizard that branches on the chosen verification
   mode:
     • Validate with iDIN        → Redirect to provider → provider modal
     • Validate using simulated data → Select bank → Scan QR → Connecting
                                       → Share data → Completing (static end)
   Demo-only UI state; wire up real verification logic in your own app.
   ============================================================ */
(function () {
  "use strict";

  function byId(id) { return document.getElementById(id); }

  /* --- Reference data ------------------------------------------------ */
  var COUNTRIES = [
    { name: "Netherlands", code: "nl" },
    { name: "Belgium", code: "be" },
    { name: "Germany", code: "de" },
    { name: "France", code: "fr" },
    { name: "Spain", code: "es" },
    { name: "Italy", code: "it" },
    { name: "Sweden", code: "se" },
    { name: "Norway", code: "no" },
    { name: "Denmark", code: "dk" },
    { name: "Finland", code: "fi" }
  ];

  var BANKS = [
    { id: "abn-amro", label: "ABN AMRO", shareName: "ABN AMRO" },
    { id: "ing", label: "ING", shareName: "ING" },
    { id: "rabo", label: "Rabo Bank", shareName: "Rabobank" },
    { id: "sns", label: "SNS Bank", shareName: "SNS Bank" },
    { id: "triodos", label: "Triodos Bank", shareName: "Triodos Bank" },
    { id: "asn", label: "ASN Bank", shareName: "ASN Bank" }
  ];

  var BANK_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2.5 6.5L8 2.5l5.5 4"/><path d="M3.5 6.5v6M6.2 6.5v6M9.8 6.5v6M12.5 6.5v6"/><path d="M2.5 13.5h11"/></svg>';

  var CHECK_ICON = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg>';

  var PROGRESS = {
    config: [["Configuration setup", "current"], ["Redirect to provider", "incomplete"]],
    redirect: [["Configuration setup", "completed"], ["Redirect to provider", "current"]],
    bank: [["Configuration setup", "completed"], ["Select your bank", "current"], ["Connect to account", "incomplete"]],
    connect: [["Configuration setup", "completed"], ["Select your bank", "completed"], ["Connect to account", "current"]]
  };

  var TRANSITION_MS = 3000;

  /* --- Flow state ---------------------------------------------------- */
  var state = { country: null, mode: "idin", bank: null };
  var pendingTimer = null;

  /* ===================================================================
     Progress indicator
     =================================================================== */
  function progressItemHTML(index, label, stateName) {
    var icon = stateName === "completed"
      ? '<span class="tds-progress-indicator__icon">' + CHECK_ICON + "</span>"
      : '<span class="tds-progress-indicator__icon"><span class="tds-progress-indicator__icon-badge">' + (index + 1) + "</span></span>";
    return '<li class="tds-progress-indicator__item tds-progress-indicator__item--' + stateName + '">' +
      '<div class="tds-progress-indicator__line" aria-hidden="true"></div>' +
      '<div class="tds-progress-indicator__content"><div class="tds-progress-indicator__label-row">' +
      icon + '<span class="tds-progress-indicator__title">' + label + "</span></div></div></li>";
  }

  function renderProgressBars() {
    document.querySelectorAll("[data-progress]").forEach(function (ol) {
      var steps = PROGRESS[ol.getAttribute("data-progress")];
      if (!steps) return;
      ol.innerHTML = steps.map(function (s, i) {
        return progressItemHTML(i, s[0], s[1]);
      }).join("");
    });
  }

  /* ===================================================================
     Step navigation
     =================================================================== */
  function clearPending() {
    if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
  }

  function goStep(id) {
    clearPending();
    document.querySelectorAll(".eid-step").forEach(function (step) {
      step.hidden = step.id !== id;
    });
    window.scrollTo(0, 0);
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
    next.setAttribute("aria-disabled", state.country ? "false" : "true");
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
      var matches = COUNTRIES.filter(function (c) {
        return !q || c.name.toLowerCase().indexOf(q) !== -1;
      });
      if (!matches.length) {
        var empty = document.createElement("div");
        empty.className = "tds-combobox__option tds-combobox__option--empty";
        empty.textContent = "No matches";
        list.appendChild(empty);
        return;
      }
      matches.forEach(function (c) {
        var isSelected = state.country === c.name;
        var opt = document.createElement("button");
        opt.type = "button";
        opt.className = "tds-combobox__option" + (isSelected ? " tds-combobox__option--selected" : "");
        opt.setAttribute("role", "option");
        opt.setAttribute("aria-selected", String(isSelected));
        var visual = document.createElement("span");
        visual.className = "tds-combobox__option-visual";
        visual.innerHTML = '<span class="fi fi-' + c.code + '"></span>';
        var label = document.createElement("span");
        label.className = "tds-combobox__option-label";
        label.textContent = c.name;
        opt.appendChild(visual);
        opt.appendChild(label);
        opt.addEventListener("mousedown", function (e) {
          e.preventDefault();
          select(c);
        });
        list.appendChild(opt);
      });
    }

    function select(c) {
      state.country = c.name;
      input.value = c.name;
      setFlag(flag, c.code);
      close();
      updateConfigNext();
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
     Radio cards (verification mode) + switch
     =================================================================== */
  function initVerificationMode() {
    var radios = document.querySelectorAll('input[name="eid-verification-mode"]');
    radios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        radios.forEach(function (r) {
          var card = r.closest(".tds-radio-card");
          if (card) card.classList.toggle("tds-radio-card--selected", r.checked);
        });
        if (radio.checked) state.mode = radio.value;
      });
    });
  }

  function initSwitches() {
    document.querySelectorAll(".tds-switch__track").forEach(function (track) {
      track.addEventListener("click", function () {
        var on = track.getAttribute("aria-checked") === "true";
        track.setAttribute("aria-checked", String(!on));
        track.classList.toggle("tds-switch__track--on", !on);
      });
    });
  }

  /* ===================================================================
     Bank selector
     =================================================================== */
  function updateBankNext() {
    var next = byId("eid-bank-next");
    if (!next) return;
    next.setAttribute("aria-disabled", state.bank ? "false" : "true");
  }

  function initBanks() {
    var grid = byId("eid-bank-grid");
    if (!grid) return;
    BANKS.forEach(function (bank) {
      var card = document.createElement("label");
      card.className = "eid-bank-card";
      card.innerHTML =
        '<input class="tds-radio" type="radio" name="eid-bank" value="' + bank.id + '">' +
        '<span class="eid-bank-card__label-row">' +
        '<span class="eid-bank-card__icon">' + BANK_ICON + "</span>" +
        '<span class="eid-bank-card__label">' + bank.label + "</span></span>";
      var input = card.querySelector("input");
      input.addEventListener("change", function () {
        grid.querySelectorAll(".eid-bank-card").forEach(function (c) {
          c.classList.toggle("eid-bank-card--selected", c.contains(input) && input.checked);
        });
        state.bank = bank;
        updateBankNext();
        var shareName = byId("eid-share-bank");
        if (shareName) shareName.textContent = bank.shareName;
      });
      grid.appendChild(card);
    });
  }

  /* ===================================================================
     Provider modal (flow 1)
     =================================================================== */
  function openProviderModal() {
    var modal = byId("eid-provider-modal");
    if (modal) modal.hidden = false;
  }
  function closeProviderModal() {
    var modal = byId("eid-provider-modal");
    if (modal) modal.hidden = true;
  }

  function initProviderModal() {
    var modal = byId("eid-provider-modal");
    if (!modal) return;
    modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeProviderModal);
    });
    var results = byId("eid-provider-results");
    /* Flow 1 endpoint — close the provider overlay and show the results. */
    if (results) results.addEventListener("click", function () {
      closeProviderModal();
      if (window.EidResult) window.EidResult.show();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeProviderModal();
    });
  }

  /* ===================================================================
     Navigation wiring
     =================================================================== */
  function initNav() {
    /* Config step */
    var configNext = byId("eid-config-next");
    if (configNext) {
      configNext.addEventListener("click", function () {
        if (configNext.getAttribute("aria-disabled") === "true") return;
        if (state.mode === "simulated") goStep("eid-step-bank");
        else goStep("eid-step-redirect");
      });
    }
    var configBack = byId("eid-config-back");
    if (configBack) configBack.addEventListener("click", function () { history.back(); });

    /* Flow 1 — redirect */
    bindBack("eid-redirect-back", "eid-step-config");
    var redirectNext = byId("eid-redirect-next");
    if (redirectNext) redirectNext.addEventListener("click", openProviderModal);

    /* Flow 2 — bank */
    bindBack("eid-bank-back", "eid-step-config");
    var bankNext = byId("eid-bank-next");
    if (bankNext) {
      bankNext.addEventListener("click", function () {
        if (bankNext.getAttribute("aria-disabled") === "true") return;
        goStep("eid-step-qr");
      });
    }

    /* Flow 2 — QR */
    bindBack("eid-qr-back", "eid-step-bank");
    var qrSimulate = byId("eid-qr-simulate");
    if (qrSimulate) {
      qrSimulate.addEventListener("click", function () {
        goStep("eid-step-connecting");
        pendingTimer = setTimeout(function () { goStep("eid-step-share"); }, TRANSITION_MS);
      });
    }

    /* Flow 2 — connecting (back returns to QR) */
    bindBack("eid-connecting-back", "eid-step-qr");

    /* Flow 2 — share */
    bindBack("eid-share-deny", "eid-step-bank");
    var shareProceed = byId("eid-share-proceed");
    if (shareProceed) {
      shareProceed.addEventListener("click", function () {
        goStep("eid-step-completing");
        /* Brief "completing" screen, then land on the results. */
        pendingTimer = setTimeout(function () {
          if (window.EidResult) window.EidResult.show();
        }, TRANSITION_MS);
      });
    }

    /* Flow 2 — completing (back returns to share) */
    bindBack("eid-completing-back", "eid-step-share");

    /* Result view — back returns to the start of the flow. */
    var resultBack = byId("eid-result-back");
    if (resultBack) {
      resultBack.addEventListener("click", function () {
        if (window.EidResult) window.EidResult.hide();
        goStep("eid-step-config");
      });
    }

    /* Flow header back — placeholder (future: home / labs landing). */
    var homeBack = byId("eid-home-back");
    if (homeBack) homeBack.addEventListener("click", function () {});
  }

  function bindBack(btnId, targetStepId) {
    var btn = byId(btnId);
    if (btn) btn.addEventListener("click", function () { goStep(targetStepId); });
  }

  /* ===================================================================
     Init
     =================================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    renderProgressBars();
    initCountry();
    initVerificationMode();
    initSwitches();
    initBanks();
    initProviderModal();
    initNav();
    updateConfigNext();
    goStep("eid-step-config");
  });
})();
