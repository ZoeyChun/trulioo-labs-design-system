/* Demo 3 — the manual form's input fields, by package.

   Required and Recommended fields sit in the form, pre-filled from the registry where it
   has the value; Optional is an accordion, closed. Which fields exist
   depends on the package:

     Essentials   Jurisdiction of Incorporation is optional; no monitoring,
                  tradestyle, website or PSC fields
     Insights     adds tradestyle, communication, KYB monitoring, website and PSC
     Complete     the same, with Jurisdiction of Incorporation recommended */
(function () {
  "use strict";

  var S = window.D3KybSession;
  var host = document.querySelector("[data-d3-kyb-fields]");
  if (!S || !host) return;

  var open = { optional: false };

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var ADDRESS = ["Address 1", "Unit Number", "Building Number", "Building Name", "Street Name", "Street Type", "Suburb", "County"];
  var SECOND = [
    "Second Address 1", "Second Unit Number", "Second Building Number", "Second Building Name", "Second Street Name",
    "Second Street Type", "Second City", "Second Suburb", "Second County", "Second State", "Second Postal Code"
  ];

  function spec(pkgId) {
    var rich = pkgId !== "essentials";
    var complete = pkgId === "complete";
    var rec = ["City", "State Province"];
    if (complete) rec.push("Jurisdiction Of Incorporation");
    rec.push("Postal Code", "Tax ID Number");

    var business = ["Business Registration Number"];
    if (!complete) business.push("Jurisdiction Of Incorporation");
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
    return { recommended: rec, optional: groups };
  }

  var CHECK = '<svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM7.02539 4.02734C7.19727 3.79102 7.51953 3.74805 7.73438 3.91992C7.9707 4.07031 8.01367 4.39258 7.86328 4.62891L5.2207 8.23828C5.13477 8.36719 5.00586 8.43164 4.85547 8.45312C4.70508 8.45312 4.55469 8.41016 4.44727 8.30273L3.24414 7.09961C3.05078 6.90625 3.05078 6.58398 3.24414 6.36914C3.45898 6.17578 3.78125 6.17578 3.97461 6.36914L4.74805 7.14258L7.02539 4.02734Z" fill="currentColor"/></svg>';

  /* A field with a value that came from the registry says so. */
  function input(label, value) {
    var filled = !!value;
    return (
      '<div class="tds-text-input' + (filled ? " tds-text-input--success" : "") + '"><label class="tds-field-label">' + esc(label) + "</label>" +
      '<div class="tds-text-input__field tds-text-input__field--lg"><input class="tds-text-input__native" type="text" value="' + esc(value || "") + '"></div>' +
      (filled
        ? '<span class="tds-field-validation tds-field-validation--success"><span class="tds-field-validation__icon" aria-hidden="true">' + CHECK + "</span><span>Pre-filled</span></span>"
        : "") +
      "</div>"
    );
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
      case "Address 1": return data.address1;
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

  function render() {
    var st = S.get();
    var sp = spec(st.package);
    var name = st.entity ? st.entity.name : "";
    var rec = sp.recommended.map(function (l) { return input(l, prefilled(l)); }).join("");
    var opt = sp.optional
      .map(function (g) {
        return (
          '<div class="d3-kyb-fields__group"><p class="d3-kyb-fields__group-title">' + esc(g.title) + "</p>" +
          (g.sub ? '<p class="d3-kyb-fields__group-sub">' + esc(g.sub) + "</p>" : "") +
          '<div class="d3-kyb-fields__grid">' + g.fields.map(function (l) { return input(l, prefilled(l)); }).join("") + "</div></div>"
        );
      })
      .join("");
    host.innerHTML =
      '<div class="d3-kyb-fields__required"><p class="d3-kyb-fields__title">Required for verification</p>' + input("Business Name", name) + "</div>" +
      '<div class="d3-kyb-fields__required"><p class="d3-kyb-fields__title">Recommended</p><div class="d3-kyb-fields__grid">' + rec + "</div></div>" +
      accordion("optional", "Optional", '<div class="d3-kyb-fields__list">' + opt + "</div>");
  }

  host.addEventListener("click", function (event) {
    var t = event.target.closest && event.target.closest("[data-d3-fields-toggle]");
    if (!t) return;
    var key = t.getAttribute("data-d3-fields-toggle");
    open[key] = !open[key];
    var acc = host.querySelector('[data-d3-fields-acc="' + key + '"]');
    acc.classList.toggle("is-open", open[key]);
    t.setAttribute("aria-expanded", open[key] ? "true" : "false");
  });

  /* Re-draw only when the package or the business changes, so typing is never lost. */
  var last = "";
  function sync() {
    var st = S.get();
    var key = st.package + "|" + (st.entity ? st.entity.id + st.entity.name : "");
    if (key === last) return;
    last = key;
    render();
  }
  document.addEventListener(S.EVENT, function () {
    var st = S.get();
    if (!st.entity && data) data = null;
    sync();
  });
  sync();

  window.D3KybFields = {
    fill: function (entity) {
      data = entity || null;
      last = "";
      sync();
    }
  };
})();
