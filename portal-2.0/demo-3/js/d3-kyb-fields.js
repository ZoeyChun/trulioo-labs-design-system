/* Demo 3 — the manual form's input fields: a two-zone progressive form.

     Zone 1  Business identity    Country, Jurisdiction Of Incorporation, Business Name *, Business Registration Number
     Zone 2  Registered address   Address Line 1, Address Line 2, City, Postal Code

   One page, the same two zones for both flows:
     pre-fill     the business was picked from the registry, so both zones arrive filled (Country is locked)
     no pre-fill  Country and Business Name are the field on top; typing a name opens this form, which starts
                  with Business Name (kept in step with the top field), then Jurisdiction and BRN, then the address

   Everything else (tax ID, state, unit / building, second address, monitoring, PSC ...) waits in the closed
   Optional accordion; which of those exist depends on the package. */
(function () {
  "use strict";

  var S = window.D3KybSession;
  var host = document.querySelector("[data-d3-kyb-fields]");
  if (!S || !host) return;

  var open = { optional: false };
  /* What the user typed into fields that are not part of the entity profile, so a re-draw keeps it. */
  var typed = {};

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var ADDRESS = ["State Province", "Unit Number", "Building Number", "Building Name", "Street Name", "Street Type", "Suburb", "County"];
  var SECOND = [
    "Second Address 1", "Second Unit Number", "Second Building Number", "Second Building Name", "Second Street Name",
    "Second Street Type", "Second City", "Second Suburb", "Second County", "Second State", "Second Postal Code"
  ];

  /* The Optional accordion: depends on the package. */
  function optionalGroups(pkgId) {
    var rich = pkgId !== "essentials";
    var business = ["Tax ID Number"];
    if (rich) business.push("Tradestyle Name", "Communication", "KYB Monitoring Callback URL", "KYB Monitoring Fields", "KYB Monitoring Frequency");
    var groups = [
      { title: "Business", fields: business },
      { title: "Address", fields: ADDRESS },
      { title: "Second Address", fields: SECOND },
      { title: "Additional", fields: ["DUNS Number"] }
    ];
    if (rich) {
      groups.push({ title: "Other", fields: ["Website"] });
      groups.push({ title: "Persons of Significant Control (PSC)", sub: "PSC 1", fields: ["First Name", "Last Name", "Full Name", "Business Name"] });
    }
    return groups;
  }

  var CHECK = '<svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM7.02539 4.02734C7.19727 3.79102 7.51953 3.74805 7.73438 3.91992C7.9707 4.07031 8.01367 4.39258 7.86328 4.62891L5.2207 8.23828C5.13477 8.36719 5.00586 8.43164 4.85547 8.45312C4.70508 8.45312 4.55469 8.41016 4.44727 8.30273L3.24414 7.09961C3.05078 6.90625 3.05078 6.58398 3.24414 6.36914C3.45898 6.17578 3.78125 6.17578 3.97461 6.36914L4.74805 7.14258L7.02539 4.02734Z" fill="currentColor"/></svg>';

  /* opts.required: marked *; opts.profile: the field is the typed entity profile (manual route), so it writes to
     the session and never says "Pre-filled"; opts.typed: the user's own value, so no "Pre-filled" either;
     opts.locked: read-only and filled from the registry. */
  function input(label, value, opts) {
    opts = opts || {};
    var filled = !!value && !opts.profile && !opts.typed;
    return (
      '<div class="tds-text-input' + (filled ? " tds-text-input--success" : "") + '"><label class="tds-field-label">' + esc(label) +
      (opts.required ? ' <span class="d3-kyb-fields__req" aria-hidden="true">*</span>' : "") + "</label>" +
      '<div class="tds-text-input__field tds-text-input__field--lg"><input class="tds-text-input__native" type="text"' +
      (opts.required ? " required" : "") + (opts.locked ? " readonly" : "") +
      (opts.profile ? ' data-d3-profile="' + opts.profile + '"' : ' data-d3-label="' + esc(label) + '"') +
      ' value="' + esc(value || "") + '"></div>' +
      (filled
        ? '<span class="tds-field-validation tds-field-validation--success"><span class="tds-field-validation__icon" aria-hidden="true">' + CHECK + "</span><span>Pre-filled</span></span>"
        : "") +
      "</div>"
    );
  }

  /* No pre-fill (demo switch): the zones are typed. */
  function noPrefill() {
    return document.documentElement.getAttribute("data-d3-prefill") === "off";
  }

  /* What the registry returned for the chosen business (set by the search on selection). */
  var data = null;

  function prefilled(label) {
    if (!data) return "";
    switch (label) {
      case "City": return data.city;
      case "State Province": return data.state;
      case "Postal Code": return data.postal;
      case "Business Registration Number": return data.brn;
      case "Address Line 1": return data.address1;
      case "Tax ID Number": return data.taxId;
      case "Jurisdiction Of Incorporation": return [data.state, data.country].filter(Boolean).join(", ");
      default: return "";
    }
  }

  var CHEVRON = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>';

  /* Figma ADS accordion (9003:6691): no box, a chevron on the left and a small uppercase section title. */
  function accordion(key, title, body) {
    var on = open[key];
    return (
      '<div class="d3-kyb-fields__acc' + (on ? " is-open" : "") + '" data-d3-fields-acc="' + key + '">' +
      '<button type="button" class="d3-kyb-fields__acc-head" aria-expanded="' + (on ? "true" : "false") + '" data-d3-fields-toggle="' + key + '">' +
      '<span class="d3-kyb-fields__acc-chevron" aria-hidden="true">' + CHEVRON + "</span>" +
      '<span class="d3-kyb-fields__acc-title">' + esc(title) + "</span></button>" +
      '<div class="d3-kyb-fields__acc-body">' + body + "</div></div>"
    );
  }

  function zone(id, title, fields, hidden) {
    return (
      '<section class="d3-kyb-fields__zone" data-d3-zone="' + id + '"' + (hidden ? " hidden" : "") + ' aria-label="' + esc(title) + '">' +
      '<div class="d3-kyb-fields__grid">' + fields.join("") + "</div></section>"
    );
  }

  /* ---- Find & auto-fill address (optional; only when there is no pre-fill) ---------------------------
     Once Country + Jurisdiction and either a Business Name (3+ characters) or a valid-looking BRN are in,
     a secondary button wakes up. It lists registry candidates; picking one fills the address zone and
     whichever identifier was missing. Ignoring it costs nothing: the fields below stay open. */
  var SEARCH_ICON = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var HINT_OFF = "Select country, jurisdiction, and enter business name or BRN to search registry.";
  var HINT_ON = "Search the registry for matching businesses and auto-fill the address.";
  var FINDER_SHOWN = 5; // candidates listed; more than that asks the user to narrow the search
  var finderTotal = 0;
  var finderResults = null; // null = closed, [] = searched with no hits
  var filledFrom = ""; // name of the candidate last used

  function validBrn(v) {
    v = String(v || "").trim();
    return /^[A-Za-z0-9][A-Za-z0-9\-\/ ]{5,}$/.test(v) && /\d/.test(v);
  }

  function finderReady() {
    var st = S.get();
    var jur = (typed["Jurisdiction Of Incorporation"] || "").trim();
    return !!(st.country || "us") && !!jur && (st.profile.name.trim().length >= 3 || validBrn(st.profile.regNo));
  }

  function finderMarkup() {
    return (
      '<div class="d3-kyb-find" data-d3-find>' +
      '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary d3-kyb-find__btn" data-d3-find-btn aria-disabled="true">' +
      '<span class="d3-kyb-find__icon">' + SEARCH_ICON + "</span>Find &amp; auto-fill address</button>" +
      '<p class="d3-kyb-find__hint" data-d3-find-hint>' + HINT_OFF + "</p>" +
      '<div class="d3-kyb-find__results" data-d3-find-results hidden></div></div>'
    );
  }

  function paintResults() {
    var box = host.querySelector("[data-d3-find-results]");
    if (!box) return;
    if (finderResults === null) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    box.hidden = false;
    var more = finderTotal > finderResults.length;
    box.innerHTML = finderResults.length
      ? '<div class="d3-kyb-find__head"><span>' +
        (more ? "Showing " + finderResults.length + " of " + finderTotal + " matches" : finderResults.length + (finderResults.length === 1 ? " match" : " matches")) +
        '</span><button type="button" class="d3-kyb-find__close" data-d3-find-close>Hide</button></div>' +
        finderResults
          .map(function (e, i) {
            return (
              '<button type="button" class="d3-kyb-find__card" data-d3-find-pick="' + i + '">' +
              '<span class="d3-kyb-find__name">' + esc(e.name) + "</span>" +
              '<span class="d3-kyb-find__line">' + esc([e.address1, e.city, e.state, e.postal].filter(Boolean).join(", ")) + "</span>" +
              '<span class="d3-kyb-find__line">' + esc(e.brn || "") + "</span></button>"
            );
          })
          .join("") +
        (more ? '<p class="d3-kyb-find__more">Not here? Add the full business name or the BRN to narrow it down, or keep entering the details below.</p>' : "")
      : '<div class="d3-kyb-find__head"><span>No matches in the registry. Keep entering the details below.</span>' +
        '<button type="button" class="d3-kyb-find__close" data-d3-find-close>Hide</button></div>';
  }

  function updateFinder() {
    var wrap = host.querySelector("[data-d3-find]");
    if (!wrap) return;
    var ready = finderReady();
    var btn = wrap.querySelector("[data-d3-find-btn]");
    btn.setAttribute("aria-disabled", ready ? "false" : "true");
    btn.classList.toggle("is-ready", ready);
    wrap.querySelector("[data-d3-find-hint]").textContent = filledFrom ? "Filled from " + filledFrom + ". Review and edit anything below." : ready ? HINT_ON : HINT_OFF;
    if (!ready && finderResults !== null) {
      finderResults = null;
      paintResults();
    }
  }

  function autofill(e) {
    var st = S.get();
    var pr = st.profile;
    /* What was typed was only a search term: the registered name and BRN replace it, so whichever
       identifier was missing is filled too. */
    var next = { name: e.name, regNo: e.brn || pr.regNo, address: e.address1 || pr.address, taxId: pr.taxId };
    typed["City"] = e.city || typed["City"] || "";
    typed["Postal Code"] = e.postal || typed["Postal Code"] || "";
    typed["State Province"] = e.state || typed["State Province"] || "";
    S.set({ profile: next }, "fields");
    var q = document.getElementById("vb-q");
    if (q && q.value !== next.name) q.value = next.name;
    filledFrom = e.name;
    finderResults = null;
    last = "";
    sync();
  }

  function isManual() {
    return !!S.requirements().profile;
  }

  /* Typed-in value for a field that is not part of the entity profile. */
  function own(label) {
    return typed[label] || "";
  }

  /* A field that is not part of the entity profile: the registry's value if there is one (pre-fill flow, says
     Pre-filled), else what the user typed or Find & auto-fill put there (manual form: never Pre-filled). */
  function fld(label, registryValue) {
    var v = registryValue || own(label);
    return input(label, v, { typed: !registryValue });
  }

  function render() {
    var st = S.get();
    var manual = isManual();
    var off = noPrefill();
    var cur = S.country(manual ? st.country : st.entity ? st.entity.cc : st.country) || S.country(st.country) || S.countries[0];
    var name = manual ? st.profile.name : st.entity ? st.entity.name : "";

    /* Business Name comes first. Without pre-fill the country is the one on top, so it is not repeated here,
       and the form (which opens once a name is typed) shows the address at once. */
    var jur = fld("Jurisdiction Of Incorporation", manual ? "" : prefilled("Jurisdiction Of Incorporation"));
    var brn = manual ? input("Business Registration Number", st.profile.regNo, { profile: "regNo" }) : fld("Business Registration Number", prefilled("Business Registration Number"));
    var nameField = input("Business Name", name, manual ? { required: true, profile: "name" } : { required: true });
    var zone1 = off
      ? [nameField, jur, brn]
      : [nameField, input("Country", cur.name, { locked: true }), jur, brn];
    var zone2 = [
      manual ? input("Address Line 1", st.profile.address, { profile: "address" }) : fld("Address Line 1", prefilled("Address Line 1")),
      fld("Address Line 2", ""),
      fld("City", manual ? "" : prefilled("City")),
      fld("Postal Code", manual ? "" : prefilled("Postal Code"))
    ];

    var opt = optionalGroups(st.package)
      .map(function (g) {
        return (
          '<div class="d3-kyb-fields__group"><p class="d3-kyb-fields__group-title">' + esc(g.title) + "</p>" +
          (g.sub ? '<p class="d3-kyb-fields__group-sub">' + esc(g.sub) + "</p>" : "") +
          '<div class="d3-kyb-fields__grid">' +
          g.fields.map(function (l) {
            if (manual && l === "Tax ID Number") return input(l, st.profile.taxId, { profile: "taxId" });
            return fld(l, manual ? "" : prefilled(l));
          }).join("") + "</div></div>"
        );
      })
      .join("");

    host.innerHTML =
      zone("identity", "Business identity", zone1) +
      (off ? finderMarkup() : "") +
      zone("address", "Registered address", zone2) +
      accordion("optional", "Optional", '<div class="d3-kyb-fields__list">' + opt + "</div>");
    if (off) {
      paintResults();
      updateFinder();
    }
  }

  /* Typing: profile fields write to the session; the others are remembered for the next re-draw. */
  host.addEventListener("input", function (event) {
    var el = event.target;
    var label = el.getAttribute && el.getAttribute("data-d3-label");
    if (label) typed[label] = el.value;
    var key = el.getAttribute && el.getAttribute("data-d3-profile");
    if (label && label === "Jurisdiction Of Incorporation") {
      filledFrom = "";
      updateFinder();
    }
    if (!key) return;
    var pr = S.get().profile;
    var next = { name: pr.name, regNo: pr.regNo, address: pr.address, taxId: pr.taxId };
    next[key] = el.value;
    if (key === "name" || key === "regNo") filledFrom = "";
    S.set({ profile: next }, "fields");
    if (key === "name") {
      var q = document.getElementById("vb-q");
      if (q && q.value !== el.value) q.value = el.value;
    }
  });

  host.addEventListener("click", function (event) {
    var btn = event.target.closest && event.target.closest("[data-d3-find-btn]");
    if (btn) {
      if (btn.getAttribute("aria-disabled") === "true" || !window.D3KybManualSearch) return;
      var st = S.get();
      var hits = window.D3KybManualSearch.lookup({ country: st.country || "us", name: st.profile.name, brn: validBrn(st.profile.regNo) ? st.profile.regNo : "" });
      finderTotal = hits.length;
      finderResults = hits.slice(0, FINDER_SHOWN);
      paintResults();
      return;
    }
    var pick = event.target.closest && event.target.closest("[data-d3-find-pick]");
    if (pick && finderResults) {
      autofill(finderResults[Number(pick.getAttribute("data-d3-find-pick"))]);
      return;
    }
    if (event.target.closest && event.target.closest("[data-d3-find-close]")) {
      finderResults = null;
      paintResults();
      return;
    }
    var t = event.target.closest && event.target.closest("[data-d3-fields-toggle]");
    if (!t) return;
    var key = t.getAttribute("data-d3-fields-toggle");
    open[key] = !open[key];
    var acc = host.querySelector('[data-d3-fields-acc="' + key + '"]');
    acc.classList.toggle("is-open", open[key]);
    t.setAttribute("aria-expanded", open[key] ? "true" : "false");
  });

  /* Re-draw only when the package, the business or the country changes, so typing is never lost. */
  var last = "";
  var lastEntity = "";
  function sync() {
    var st = S.get();
    var manual = isManual();
    var eid = st.entity ? st.entity.id : "";
    /* A different registry business starts the typed extras over. */
    if (!manual && eid !== lastEntity) {
      typed = {};
      finderResults = null;
      filledFrom = "";
    }
    lastEntity = eid;
    var key = st.package + "|" + manual + "|" + noPrefill() + "|" + (st.entity ? st.entity.id + (manual ? "" : st.entity.name) : "");
    if (key === last) return;
    last = key;
    render();
  }
  document.addEventListener(S.EVENT, function () {
    var st = S.get();
    if (!st.entity && data) data = null;
    sync();
    updateFinder();
    /* The name typed in the search field shows here too. */
    if (isManual()) {
      Array.prototype.forEach.call(host.querySelectorAll("[data-d3-profile]"), function (el) {
        var v = st.profile[el.getAttribute("data-d3-profile")];
        if (document.activeElement !== el && el.value !== v) el.value = v;
      });
    }
  });
  sync();

  document.addEventListener("d3-demo:prefill-change", function () {
    last = "";
    sync();
  });

  window.D3KybFields = {
    fill: function (entity) {
      data = entity || null;
      last = "";
      sync();
    }
  };
})();
