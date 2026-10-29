/* Demo 3 — add-ons and the "missing details" form.

   Two small components, both bound to D3KybSession so the AI panel and the
   manual form stay in step.

   Add-ons ([data-d3-kyb-addons])
     Optional risk modules as checkable cards. Each says up front how many extra
     fields it asks for ("dynamic impact"). With data-actions="1" a Continue
     button ends the step (fires "d3-kyb:addons-done").

   Inputs ([data-d3-kyb-inputs])  — only what is missing, in up to three sections:
     1  Entity            a registry with automated search: one green
                          "verified" line. One without: the entity fields, plus a
                          certificate that auto-fills them.
     2  Beneficial owners a registry that publishes them: one "retrieved" card.
                          One that does not: the owner(s) to name.
     3  Bank account      only with the BAV add-on.
     Switch the package to Essentials and section 2 goes; drop the add-on and
     section 3 goes.

   data-variant:
     (none)   a step in the AI panel: the locked registry data + only the
              fields still needed; data-actions="1" adds Continue
              ("d3-kyb:inputs-done")
     profile  only the entity fields (the AI panel, before a package is chosen)
              — Continue fires "d3-kyb:profile-done"
     form     the whole thing as one form (the manual search panel), with the
              "Total: sections | inputs | uploads" line */
(function () {
  "use strict";

  var S = window.D3KybSession;
  if (!S) return;

  var addonMounts = [];
  var inputMounts = [];

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function entityBiz() {
    var e = S.get().entity;
    var map = window.D3KybMapSearch;
    if (!e || !map) return null;
    return (map.findById && map.findById(e.id)) || (map.findByName && map.findByName(e.name)) || null;
  }

  /* ---------------------------------------------------------------- add-ons */

  function addonsMarkup(el) {
    var st = S.get();
    var list = (S.addonsFor ? S.addonsFor() : S.addons)
      .map(function (a) {
        var on = st.addons.indexOf(a.id) !== -1;
        return (
          '<label class="d3-kyb-addon">' +
          '<input type="checkbox" class="tds-checkbox" data-d3-addon="' + a.id + '"' + (on ? " checked" : "") + ">" +
          '<span class="d3-kyb-addon__body"><span class="d3-kyb-addon__name">' + esc(a.name) + "</span>" +
          (a.note ? '<span class="d3-kyb-addon__note">' + esc(a.note) + "</span>" : "") +
          "</span></label>"
        );
      })
      .join("");
    var actions = "";
    if (el.getAttribute("data-actions") === "1") {
      actions =
        '<div class="d3-kyb-gap__actions"><button type="button" class="tds-btn tds-btn--lg tds-btn--primary" data-d3-addons-continue>' +
        (st.addons.length ? "Continue" : "Continue without add-ons") +
        "</button></div>";
    }
    return (
      '<div class="d3-kyb-addons" role="group" aria-label="Add-ons"><div class="d3-kyb-addons__title">Select Add Ons</div>' +
      list + "</div>" + actions
    );
  }

  function paintAddons(el) {
    var html = addonsMarkup(el);
    if (el.innerHTML !== html) el.innerHTML = html;
  }

  function renderAddons(el) {
    if (!el) return;
    el.classList.add("d3-kyb-gap");
    if (addonMounts.indexOf(el) === -1) addonMounts.push(el);
    paintAddons(el);
  }

  /* ----------------------------------------------------------------- inputs */

  var TITLES = ["CEO", "CFO", "Director", "Founder", "Managing Member", "Shareholder", "Other"];
  var ACCOUNT_TYPES = ["Operating checking account", "Savings account", "Settlement account", "Escrow account"];

  /* What a dropped certificate "reads" for a registry with no automated search. */
  var SAMPLE_PROFILES = {
    us: { name: "Meridian Technologies, Inc.", regNo: "DE-4928192", address: "1209 Orange St, Wilmington, DE 19801", taxId: "12-3456789" },
    sg: { name: "Meridian Holdings Pte. Ltd.", regNo: "201912345K", address: "1 Raffles Place, Singapore 048616", taxId: "T19LL1234A" },
    ca: { name: "Meridian Technologies Inc.", regNo: "BC1234567", address: "1055 W Georgia St, Vancouver, BC V6E 3P3", taxId: "123456789 RT0001" }
  };

  function fid(attr) {
    return "d3gf-" + String(attr).replace(/[^a-z0-9]+/gi, "-");
  }

  /* TDS text input (large). */
  function field(label, attr, value, extra) {
    extra = extra || {};
    var id = fid(attr);
    return (
      '<div class="tds-text-input d3-kyb-gapfield' + (extra.cls ? " " + extra.cls : "") + '">' +
      '<label class="tds-field-label" for="' + id + '">' + esc(label) + "</label>" +
      '<div class="tds-text-input__field tds-text-input__field--lg">' +
      '<input class="tds-text-input__native" id="' + id + '" ' + attr + ' value="' + esc(value) + '" autocomplete="off"' +
      ' type="' + (extra.type || "text") + '"' +
      (extra.mode ? ' inputmode="' + extra.mode + '"' : "") +
      (extra.ph ? ' placeholder="' + esc(extra.ph) + '"' : "") + "></div></div>"
    );
  }

  /* TDS select trigger (large) with a native <select> inside, so the choice is
     still read from the same data attribute. */
  function select(label, attr, value, options, extra) {
    extra = extra || {};
    var id = fid(attr);
    return (
      '<div class="tds-select d3-kyb-gapfield' + (extra.cls ? " " + extra.cls : "") + '">' +
      '<label class="tds-field-label" for="' + id + '">' + esc(label) + "</label>" +
      '<div class="tds-select__trigger tds-select__trigger--lg d3-kyb-gapselect">' +
      '<select class="d3-kyb-gapselect__native" id="' + id + '" ' + attr + ">" +
      '<option value="">Select…</option>' +
      options
        .map(function (o) {
          return '<option value="' + esc(o) + '"' + (o === value ? " selected" : "") + ">" + esc(o) + "</option>";
        })
        .join("") +
      "</select>" +
      '<span class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true">' +
      '<svg viewBox="0 0 8 11" fill="currentColor"><path d="M4 0l3.5 4h-7L4 0z"/><path d="M4 11L.5 7h7L4 11z"/></svg>' +
      "</span></span></div></div>"
    );
  }

  /* Text-style action as a TDS invisible button. */
  function linkBtn(attr, label) {
    return '<button type="button" class="tds-btn tds-btn--invisible tds-btn--md d3-kyb-gaplink" ' + attr + ">" + label + "</button>";
  }

  function upload(kind, label, on, hint) {
    return (
      '<button type="button" class="d3-kyb-gapdrop' + (on ? " is-on" : "") + '" data-d3-gap-upload="' + kind + '">' +
      '<span class="d3-kyb-gapdrop__icon" aria-hidden="true">' + (on ? "✓" : "↥") + "</span>" +
      '<span class="d3-kyb-gapdrop__text"><b>' + esc(label) + "</b>" + (hint ? "<i>" + esc(hint) + "</i>" : "") + "</span></button>"
    );
  }

  function detectText(routing, bank) {
    if (!routing || routing.length < 9) return "";
    if (!S.validAba(routing)) return "That routing number doesn’t look valid.";
    return bank ? "Financial institution: " + esc(bank) + " (auto-detected)" : "Valid routing number.";
  }

  function block(title, hint, body, opts) {
    opts = opts || {};
    return (
      '<div class="d3-kyb-gapblock' + (opts.locked ? " d3-kyb-gapblock--locked" : "") + '">' +
      (title ? '<p class="d3-kyb-gapblock__title' + (opts.action ? " is-action" : "") + '">' + title + "</p>" : "") +
      (hint ? '<p class="d3-kyb-gapblock__hint">' + hint + "</p>" : "") +
      body + "</div>"
    );
  }

  /* ---- section 1: the entity ---- */
  function entitySection(variant, st, c, biz) {
    var reg = c ? c.registry : "the registry";
    var r = S.requirements();
    if (r.profile) {
      return block(
        (variant === "form" ? "1 · " : "") + "Entity profile",
        S.finderSupported(st.entity ? st.entity.cc : "")
          ? "You chose to enter the entity by hand."
          : esc(reg) + " does not support automated search, so the entity is entered by hand.",
        field("Legal entity name", 'data-d3-gap="profile.name"', st.profile.name, { ph: "Registered legal name" }) +
          field("Registration number", 'data-d3-gap="profile.regNo"', st.profile.regNo, { ph: "e.g. 201912345K" }) +
          field("Registered address", 'data-d3-gap="profile.address"', st.profile.address, { ph: "Street, city, postal code" }) +
          field("Tax ID (optional)", 'data-d3-gap="profile.taxId"', st.profile.taxId, { ph: "EIN / tax number" }) +
          upload("profile", st.profileDoc ? "Certificate attached — details filled in" : "Drop a certificate to auto-fill", st.profileDoc, "Certificate of incumbency or registration"),
        { action: true }
      );
    }
    if (!st.entity) return "";
    var line = esc(st.entity.name) + (biz && biz.reg ? " · " + esc(biz.reg) : "");
    if (variant === "form") {
      return '<div class="d3-kyb-gapverified"><span aria-hidden="true">✓</span><span><b>' + esc(reg) + " verified</b>" + line + "</span></div>";
    }
    return block(
      "Pre-filled &amp; verified (" + esc(reg) + ")",
      "",
      '<p class="d3-kyb-gapblock__row"><b>Entity</b>' + line + "</p>" +
        (biz && biz.addr ? '<p class="d3-kyb-gapblock__row"><b>Registered address</b>' + esc(biz.addr) + "</p>" : "") +
        '<p class="d3-kyb-gapblock__lock">✓ Locked by registry</p>',
      { locked: true }
    );
  }

  /* ---- section 2: beneficial owners ---- */
  function ownerRows(st) {
    var rows = [];
    rows.push(
      '<div class="d3-kyb-gaprow">' +
        field("UBO 1 name", 'data-d3-gap="ubo.name"', st.ubo.name, { ph: "Full legal name" }) +
        select("Title", 'data-d3-gap="ubo.title"', st.ubo.title, TITLES, { cls: "is-title" }) +
        field("Ownership %", 'data-d3-gap="ubo.pct"', st.ubo.pct, { mode: "decimal", ph: "e.g. 45", cls: "is-pct" }) +
        (st.extraUbos.length ? '<span class="d3-kyb-gapremove" aria-hidden="true"></span>' : "") +
        "</div>"
    );
    st.extraUbos.forEach(function (o, i) {
      rows.push(
        '<div class="d3-kyb-gaprow">' +
          field("UBO " + (i + 2) + " name", 'data-d3-gap="extra.' + i + '.name"', o.name, { ph: "Full legal name" }) +
          select("Title", 'data-d3-gap="extra.' + i + '.title"', o.title, TITLES, { cls: "is-title" }) +
          field("Ownership %", 'data-d3-gap="extra.' + i + '.pct"', o.pct, { mode: "decimal", ph: "e.g. 30", cls: "is-pct" }) +
          '<button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--invisible tds-icon-btn--circular d3-kyb-gapremove" data-d3-gap-remove="' + i + '" aria-label="Remove owner"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="m4.5 4.5 7 7m0-7-7 7"/></svg></span></button>' +
          "</div>"
      );
    });
    return rows.join("");
  }

  function ownerSection(variant, st, c, biz) {
    var r = S.requirements();
    var reg = c ? c.registry : "the registry";
    if (r.ubo === "public") {
      if (variant !== "form") return "";
      var n = (biz && biz.ownership && biz.ownership.length) || 0;
      return (
        '<div class="d3-kyb-gapverified"><span aria-hidden="true">✓</span><span><b>' + esc(reg) + " ownership data retrieved</b>" +
        (n ? n + (n === 1 ? " beneficial owner found" : " beneficial owners found") : "No owners above the disclosure threshold") +
        "</span></div>"
      );
    }
    if (r.ubo === "skipped") {
      return block(
        (variant === "form" ? "2 · " : "") + "Beneficial ownership (UBO)",
        "Skipped — ownership will be reported as not disclosed.",
        linkBtn("data-d3-gap-unskip","Add owner details")
      );
    }
    if (r.ubo !== "private") return "";

    var hint = esc(reg) + " does not publish owners. Who holds 25% or more of the equity?";
    if (variant !== "form") {
      return block(
        "Beneficial ownership (UBO)",
        hint,
        field("Primary UBO full name", 'data-d3-gap="ubo.name"', st.ubo.name, { ph: "Full legal name" }) +
          '<div class="d3-kyb-gaprow">' +
          field("Ownership %", 'data-d3-gap="ubo.pct"', st.ubo.pct, { mode: "decimal", ph: "e.g. 45", cls: "is-pct" }) +
          field("UBO work email (for KYC invite)", 'data-d3-gap="ubo.email"', st.ubo.email, { type: "email", ph: "name@company.com" }) +
          "</div>" +
          linkBtn("data-d3-gap-skip","I don’t have this"),
        { action: true }
      );
    }
    return block(
      "2 · Beneficial ownership (UBO)",
      hint,
      ownerRows(st) +
        (st.extraUbos.length < 3 ? linkBtn("data-d3-gap-add","+ Add another beneficial owner") : "") +
        '<div class="tds-radio-group d3-kyb-gapradios" role="radiogroup" aria-label="Identity check route">' +
        '<span class="tds-field-label">Identity check route</span>' +
        '<label class="tds-radio-group__item"><input type="radio" class="tds-radio" name="d3-uboroute" data-d3-gap-route="email"' + (st.uboRoute === "email" ? " checked" : "") + '><span class="tds-radio-group__content"><span class="tds-radio-group__label">Send a KYC invite by email</span></span></label>' +
        (st.uboRoute === "email"
          ? field("UBO work email", 'data-d3-gap="ubo.email"', st.ubo.email, { type: "email", ph: "name@company.com" })
          : "") +
        '<label class="tds-radio-group__item"><input type="radio" class="tds-radio" name="d3-uboroute" data-d3-gap-route="docs"' + (st.uboRoute === "docs" ? " checked" : "") + '><span class="tds-radio-group__content"><span class="tds-radio-group__label">I’ll collect ID documents myself</span></span></label>' +
        "</div>" +
        upload("proof", st.uboProof ? "Cap table attached" : "Upload cap table / share register", st.uboProof, "Optional — speeds up ownership verification") +
        linkBtn("data-d3-gap-skip","I don’t have this"),
      { action: true }
    );
  }

  /* ---- section 3: bank account ---- */
  function bankSection(variant, st) {
    if (!S.requirements().bank) return "";
    return block(
      (variant === "form" ? "3 · " : "") + "Bank account details (for Bank Account Verification)",
      "",
      field("Routing number (ABA)", 'data-d3-gap="bank.routing"', st.bank.routing, { mode: "numeric", ph: "9 digits" }) +
        '<p class="d3-kyb-gapblock__detect" data-d3-gap-detect>' + detectText(st.bank.routing, S.bankName(st.bank.routing)) + "</p>" +
        field("Account number", 'data-d3-gap="bank.account"', st.bank.account, { type: "password", mode: "numeric", ph: "Account number" }) +
        (variant === "form" ? select("Account type", 'data-d3-gap="bank.type"', st.bank.type, ACCOUNT_TYPES) : ""),
      { action: true }
    );
  }

  function inputsMarkup(el) {
    var variant = el.getAttribute("data-variant") || "";
    var st = S.get();
    var r = S.requirements();
    var e = st.entity;
    if (!e) return "";
    var c = S.country(e.cc);
    var biz = entityBiz();
    var html = "";

    if (variant === "profile") {
      html = entitySection("profile", st, c, biz);
      if (el.getAttribute("data-actions") === "1") {
        html +=
          '<div class="d3-kyb-gap__actions"><button type="button" class="tds-btn tds-btn--lg tds-btn--primary" data-d3-profile-continue' +
          (profileReady(st) ? "" : ' aria-disabled="true"') + ">Continue</button></div>";
      }
      return html;
    }

    if (variant !== "form" && r.fields === 0 && r.ubo !== "skipped") return "";
    html = entitySection(variant, st, c, biz) + ownerSection(variant, st, c, biz) + bankSection(variant, st);

    if (variant === "form") {
      var sum = S.formSummary();
      html +=
        '<p class="d3-kyb-gapsummary" data-d3-gap-summary>' + summaryText(sum) + "</p>";
    }
    if (el.getAttribute("data-actions") === "1") {
      html +=
        '<div class="d3-kyb-gap__actions"><button type="button" class="tds-btn tds-btn--lg tds-btn--primary" data-d3-inputs-continue' +
        (S.inputsComplete() ? "" : ' aria-disabled="true"') + ">Continue</button></div>";
    }
    return html;
  }

  function summaryText(sum) {
    return (
      "Total: " + sum.sections + (sum.sections === 1 ? " section" : " sections") + " | " +
      sum.inputs + (sum.inputs === 1 ? " input" : " inputs") + " | " +
      sum.uploads + (sum.uploads === 1 ? " file upload" : " file uploads")
    );
  }

  function profileReady(st) {
    return !!(st.profile.name.trim() && st.profile.regNo.trim() && st.profile.address.trim());
  }

  function shapeKey(el) {
    var st = S.get();
    var r = S.requirements();
    return [
      el.getAttribute("data-variant"), el.getAttribute("data-actions"),
      st.entity && st.entity.id, r.ubo, r.bank, r.profile,
      st.extraUbos.length, st.uboRoute, st.uboProof, st.profileDoc
    ].join("|");
  }

  function paintInputs(el, force) {
    var key = shapeKey(el);
    if (force || el.getAttribute("data-shape") !== key) {
      el.setAttribute("data-shape", key);
      el.innerHTML = inputsMarkup(el);
      el.hidden = !el.innerHTML;
    }
    var st = S.get();
    /* Values follow the session — except in the field being typed in. */
    Array.prototype.forEach.call(el.querySelectorAll("[data-d3-gap]"), function (input) {
      if (input === document.activeElement) return;
      var v = readPath(st, input.getAttribute("data-d3-gap"));
      if (input.value !== v) input.value = v;
    });
    var detect = el.querySelector("[data-d3-gap-detect]");
    if (detect) detect.innerHTML = detectText(st.bank.routing, S.bankName(st.bank.routing));
    var sum = el.querySelector("[data-d3-gap-summary]");
    if (sum) sum.textContent = summaryText(S.formSummary());
    var go = el.querySelector("[data-d3-inputs-continue]");
    if (go) {
      if (S.inputsComplete()) go.removeAttribute("aria-disabled");
      else go.setAttribute("aria-disabled", "true");
    }
    var pgo = el.querySelector("[data-d3-profile-continue]");
    if (pgo) {
      if (profileReady(st)) pgo.removeAttribute("aria-disabled");
      else pgo.setAttribute("aria-disabled", "true");
    }
  }

  function renderInputs(el) {
    if (!el) return;
    el.classList.add("d3-kyb-gap");
    if (inputMounts.indexOf(el) === -1) inputMounts.push(el);
    paintInputs(el, true);
  }

  /* "ubo.name", "extra.1.pct" → the value in the session. */
  function readPath(st, path) {
    var p = path.split(".");
    if (p[0] === "extra") return ((st.extraUbos[+p[1]] || {})[p[2]]) || "";
    return (st[p[0]] || {})[p[1]] || "";
  }

  function writePath(path, value) {
    var st = S.get();
    var p = path.split(".");
    var patch = {};
    if (p[0] === "extra") {
      patch.extraUbos = st.extraUbos.map(function (o, i) {
        if (i !== +p[1]) return o;
        var n = {};
        Object.keys(o).forEach(function (k) { n[k] = o[k]; });
        n[p[2]] = value;
        return n;
      });
    } else {
      patch[p[0]] = {};
      Object.keys(st[p[0]]).forEach(function (k) { patch[p[0]][k] = st[p[0]][k]; });
      patch[p[0]][p[1]] = value;
    }
    S.set(patch, "inputs");
  }

  /* ------------------------------------------------------------------ events */

  function refresh() {
    addonMounts = addonMounts.filter(function (el) { return el.isConnected; });
    inputMounts = inputMounts.filter(function (el) { return el.isConnected; });
    addonMounts.forEach(paintAddons);
    inputMounts.forEach(function (el) { paintInputs(el, false); });
  }

  document.addEventListener("change", function (event) {
    var t = event.target;
    if (!t || !t.matches || !t.matches("[data-d3-addon]")) return;
    var ids = S.get().addons.filter(function (id) { return id !== t.getAttribute("data-d3-addon"); });
    if (t.checked) ids.push(t.getAttribute("data-d3-addon"));
    S.set({ addons: ids }, "addons");
  });

  function onField(event) {
    var t = event.target;
    if (!t || !t.getAttribute || !t.hasAttribute("data-d3-gap")) return;
    writePath(t.getAttribute("data-d3-gap"), t.value);
  }
  document.addEventListener("input", onField);
  document.addEventListener("change", onField);

  document.addEventListener("change", function (event) {
    var t = event.target;
    if (t && t.matches && t.matches("[data-d3-gap-route]")) S.set({ uboRoute: t.getAttribute("data-d3-gap-route") }, "inputs");
  });

  document.addEventListener("click", function (event) {
    var row = event.target.closest && event.target.closest("[data-d3-addon-toggle]");
    if (row) {
      var id = row.getAttribute("data-d3-addon-toggle");
      var ids = S.get().addons.filter(function (x) { return x !== id; });
      if (S.get().addons.indexOf(id) === -1) ids.push(id);
      S.set({ addons: ids }, "addons");
      return;
    }
    var t = event.target.closest && event.target.closest(
      "[data-d3-addons-continue], [data-d3-inputs-continue], [data-d3-profile-continue], [data-d3-gap-skip], [data-d3-gap-unskip], [data-d3-gap-add], [data-d3-gap-remove], [data-d3-gap-upload]"
    );
    if (!t) return;
    var st = S.get();
    if (t.hasAttribute("data-d3-addons-continue")) {
      S.set({ addonsChosen: true }, "addons");
      document.dispatchEvent(new CustomEvent("d3-kyb:addons-done"));
    } else if (t.hasAttribute("data-d3-inputs-continue")) {
      if (t.getAttribute("aria-disabled") === "true") return;
      S.set({ inputsDone: true }, "inputs");
      document.dispatchEvent(new CustomEvent("d3-kyb:inputs-done"));
    } else if (t.hasAttribute("data-d3-profile-continue")) {
      if (t.getAttribute("aria-disabled") === "true") return;
      document.dispatchEvent(new CustomEvent("d3-kyb:profile-done"));
    } else if (t.hasAttribute("data-d3-gap-skip")) {
      S.set({ ownershipSkipped: true, ubo: { name: "", title: "", pct: "", email: "" }, extraUbos: [], uboProof: false }, "inputs");
    } else if (t.hasAttribute("data-d3-gap-unskip")) {
      S.set({ ownershipSkipped: false }, "inputs");
    } else if (t.hasAttribute("data-d3-gap-add")) {
      S.set({ extraUbos: st.extraUbos.concat([{ name: "", title: "", pct: "" }]) }, "inputs");
    } else if (t.hasAttribute("data-d3-gap-remove")) {
      var i = +t.getAttribute("data-d3-gap-remove");
      S.set({ extraUbos: st.extraUbos.filter(function (_, n) { return n !== i; }) }, "inputs");
    } else if (t.hasAttribute("data-d3-gap-upload")) {
      if (t.getAttribute("data-d3-gap-upload") === "proof") {
        S.set({ uboProof: !st.uboProof }, "inputs");
      } else {
        /* A dropped certificate "reads" the entity details. */
        var sample = SAMPLE_PROFILES[(st.entity && st.entity.cc) || ""] || SAMPLE_PROFILES.us;
        S.set({ profileDoc: !st.profileDoc, profile: st.profileDoc ? st.profile : sample }, "inputs");
      }
    }
  });

  document.addEventListener(S.EVENT, refresh);

  function mountAll() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-d3-kyb-addons]"), renderAddons);
    Array.prototype.forEach.call(document.querySelectorAll("[data-d3-kyb-inputs]"), renderInputs);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountAll);
  else mountAll();

  window.D3KybGap = { renderAddons: renderAddons, renderInputs: renderInputs, mountAll: mountAll, refresh: refresh, sampleProfile: function (cc) { return SAMPLE_PROFILES[cc] || null; } };
})();
