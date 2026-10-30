/* Demo 3 — Settings → Configuration.

   One place to choose how KYB verifications run: the package, whether to use
   Business Finder, and the add-ons that package offers. Saved (in this browser),
   the choices are used for every verification, so TruAI and the manual search
   no longer ask them one by one — they show the saved setup in a single line
   with an Edit button.

   The product list is built to grow (KYB now; KYC and more packages later). */
(function () {
  "use strict";

  var host = document.querySelector("[data-d3-config]");
  var S = window.D3KybSession;
  if (!host || !S) return;

  var PRODUCTS = [{ id: "kyb", label: "KYB" }];
  var product = "kyb";
  var draft = null; // { package, finder, addons }
  var locked = false; // a saved configuration is shown read-only until Edit

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadDraft() {
    var cfg = S.savedConfig();
    draft = cfg
      ? { package: cfg.package, finder: cfg.finder, addons: cfg.addons.slice() }
      : { package: "essentials", finder: true, addons: [] };
  }

  function offered() {
    return S.addonsFor(draft.package);
  }

  function prune() {
    var ids = offered().map(function (a) { return a.id; });
    draft.addons = draft.addons.filter(function (id) { return ids.indexOf(id) !== -1; });
  }

  function packageCards() {
    return S.packages
      .map(function (p) {
        var on = p.id === draft.package;
        return (
          '<div class="tds-radio-card' + (on ? " tds-radio-card--selected" : "") + '" role="radio" tabindex="0" aria-checked="' + (on ? "true" : "false") + '" data-d3-cfg-package="' + p.id + '">' +
          '<input type="radio" class="tds-radio" name="d3-cfg-package" tabindex="-1"' + (on ? " checked" : "") + ' aria-hidden="true">' +
          '<span class="tds-radio-card__content">' +
          '<span class="tds-radio-card__label-row"><span class="tds-radio-card__label">' + esc(p.name) + "</span>" +
          (p.recommended ? ' <span class="tds-tag tds-tag--sm tds-tag--positive">Recommended</span>' : "") + "</span>" +
          '<span class="tds-radio-card__description">' + esc(p.tagline) + "</span>" +
          '<span class="tds-radio-card__description d3-cfg__bullets">' + esc(p.bullets.join(" · ")) + "</span>" +
          "</span></div>"
        );
      })
      .join("");
  }

  function addonRows() {
    var list = offered();
    if (!list.length) {
      return '<p class="d3-cfg__empty">' + esc(S.package(draft.package).name) + " has no add-ons.</p>";
    }
    return list
      .map(function (a) {
        var on = draft.addons.indexOf(a.id) !== -1;
        return (
          '<label class="d3-cfg__check">' +
          '<input type="checkbox" class="tds-checkbox" data-d3-cfg-addon="' + a.id + '"' + (on ? " checked" : "") + ">" +
          '<span class="d3-cfg__check-text"><span class="d3-cfg__check-name">' + esc(a.name) + "</span>" +
          (a.note ? '<span class="d3-cfg__check-note">' + esc(a.note) + "</span>" : "") + "</span></label>"
        );
      })
      .join("");
  }

  function sameAsSaved(saved) {
    return saved.package === draft.package && saved.finder === draft.finder &&
      JSON.stringify(saved.addons.slice().sort()) === JSON.stringify(draft.addons.slice().sort());
  }

  function summary() {
    var pk = S.package(draft.package);
    var parts = [pk.name, draft.finder ? "Business Finder" : "Manual entry"];
    parts.push(draft.addons.length ? draft.addons.map(function (id) { return S.addon(id).short; }).join(" + ") : "No add-ons");
    return parts.join(" · ");
  }

  function render() {
    var saved = S.savedConfig();
    var tabs = PRODUCTS.map(function (p) {
      return '<button type="button" class="d3-cfg__tab' + (p.id === product ? " is-active" : "") + '" role="tab" aria-selected="' + (p.id === product ? "true" : "false") + '">' + esc(p.label) + "</button>";
    }).join("");

    host.innerHTML =
      '<div class="d3-cfg">' +
      '<header class="d3-cfg__head"><h1 class="d3-cfg__title">Configuration</h1>' +
      '<p class="d3-cfg__sub">Choose how verifications run. Once saved, TruAI and the search use this setup and stop asking step by step.</p></header>' +
      '<div class="d3-cfg__tabs" role="tablist" aria-label="Product">' + tabs + "</div>" +
      '<section class="d3-cfg__card' + (locked ? " is-locked" : "") + '" aria-label="KYB configuration">' +
      '<div class="d3-cfg__block"><h2 class="d3-cfg__h">Package</h2>' +
      '<p class="d3-cfg__hint">What every KYB verification includes.</p>' +
      '<div class="d3-cfg__cards" role="radiogroup" aria-label="Package">' + packageCards() + "</div></div>" +
      '<hr class="d3-cfg__rule">' +
      '<div class="d3-cfg__block"><h2 class="d3-cfg__h">Business Finder</h2>' +
      '<div class="d3-cfg__row"><span class="d3-cfg__row-text"><span class="d3-cfg__check-name">Use Business Finder</span>' +
      '<span class="d3-cfg__check-note">Search the registry and pre-fill the business details. Turn off to enter details manually.</span></span>' +
      '<div class="tds-switch"><div class="tds-switch__track tds-switch__track--sm' + (draft.finder ? " tds-switch__track--on" : "") + '" role="switch" tabindex="0" aria-checked="' + (draft.finder ? "true" : "false") + '" aria-label="Use Business Finder" data-d3-cfg-finder>' +
      '<span class="tds-switch__indicator" aria-hidden="true"></span><span class="tds-switch__handle" aria-hidden="true"></span></div></div></div></div>' +
      '<hr class="d3-cfg__rule">' +
      '<div class="d3-cfg__block"><h2 class="d3-cfg__h">Add-ons</h2>' +
      '<p class="d3-cfg__hint">Offered add-ons depend on the package.</p>' +
      '<div class="d3-cfg__checks">' + addonRows() + "</div></div>" +
      '<div class="d3-cfg__foot"><span class="d3-cfg__status"><b>' + (locked ? "Saved" : saved ? "Editing" : "Not saved") + "</b>" +
      '<span class="d3-cfg__summary">' + esc(summary()) + "</span></span>" +
      '<span class="d3-cfg__actions">' +
      (locked
        ? '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary" data-d3-cfg-edit>Edit</button>'
        : '<button type="button" class="tds-btn tds-btn--md tds-btn--primary" data-d3-cfg-save>Save configuration</button>' +
          (saved ? '<button type="button" class="tds-btn tds-btn--md tds-btn--invisible" data-d3-cfg-cancel>Cancel</button>' : "")) +
      "</span></div>" +
      "</section></div>";
    if (locked) {
      Array.prototype.forEach.call(host.querySelectorAll(".d3-cfg__card input"), function (i) { i.disabled = true; });
    }
  }

  function save() {
    prune();
    S.saveConfig({ package: draft.package, finder: draft.finder, addons: draft.addons });
    /* The next verification starts from this. */
    S.reset("config");
    locked = true;
    render();
    document.dispatchEvent(new CustomEvent("d3-kyb:config-change"));
  }

  host.addEventListener("click", function (event) {
    var t = event.target;
    if (!t.closest) return;
    if (locked && (t.closest("[data-d3-cfg-package]") || t.closest("[data-d3-cfg-finder]") || t.closest("input[data-d3-cfg-addon]"))) return;
    var card = t.closest("[data-d3-cfg-package]");
    if (card) {
      draft.package = card.getAttribute("data-d3-cfg-package");
      prune();
      render();
      return;
    }
    if (t.closest("[data-d3-cfg-finder]")) {
      draft.finder = !draft.finder;
      render();
      return;
    }
    var add = t.closest("input[data-d3-cfg-addon]");
    if (add) {
      var id = add.getAttribute("data-d3-cfg-addon");
      draft.addons = draft.addons.filter(function (x) { return x !== id; });
      if (add.checked) draft.addons.push(id);
      render();
      return;
    }
    if (t.closest("[data-d3-cfg-save]")) {
      save();
      return;
    }
    if (t.closest("[data-d3-cfg-edit]")) {
      locked = false;
      render();
      return;
    }
    if (t.closest("[data-d3-cfg-cancel]")) {
      loadDraft();
      locked = true;
      render();
    }
  });

  host.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var t = event.target;
    if (t.closest && (t.closest("[data-d3-cfg-package]") || t.closest("[data-d3-cfg-finder]"))) {
      event.preventDefault();
      t.click();
    }
  });

  function open() {
    loadDraft();
    locked = !!S.savedConfig();
    render();
  }

  /* ---- the manual search form: show the saved setup as one line + Edit ---- */
  var editing = false;

  function syncSaved() {
    var line = document.querySelector("[data-d3-kyb-saved]");
    var prefill = document.getElementById("vb-prefill");
    if (!line || !prefill) return;
    var cfg = S.savedConfig();
    var use = !!cfg && !editing;
    line.hidden = !use;
    prefill.classList.toggle("vb-prefill--saved", use);
    var text = line.querySelector("[data-d3-saved-text]");
    if (text && use) text.textContent = " · " + S.scopeLabel();
  }

  document.addEventListener("click", function (event) {
    if (!event.target.closest || !event.target.closest("[data-d3-saved-edit]")) return;
    editing = true;
    syncSaved();
  });

  /* A fresh verification (New verification, a new saved setup) goes back to the line. */
  document.addEventListener("d3-kyb:session-change", function (event) {
    var src = (event.detail && event.detail.source) || "";
    if (src === "reset" || src === "config") editing = false;
    syncSaved();
  });
  document.addEventListener("d3-kyb:config-change", function () { editing = false; syncSaved(); });

  window.D3Config = { open: open };
  loadDraft();
  locked = !!S.savedConfig();
  render();
  syncSaved();
})();
