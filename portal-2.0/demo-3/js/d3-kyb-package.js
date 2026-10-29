/* Demo 3 — the Essentials / Insights / Complete selector.

   One component, mounted wherever a package can be chosen (the manual search
   form, the match / confirm card on the right, the confirm card in the AI
   panel). Every copy reads and writes D3KybSession.package, so choosing it in
   one place changes it everywhere.

   Mount points are any [data-d3-kyb-pkg]; D3KybPackage.render(el) fills one
   that was created later (the AI panel's cards are built on the fly). */
(function () {
  "use strict";

  var S = window.D3KybSession;
  if (!S) return;

  var mounted = [];

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var TAB_LABEL = {
    overview: "Overview",
    signals: "Match Signals & Sources",
    ownership: "Owners & UBOs",
    additional: "Additional Data",
    web: "Web & Social Insights"
  };

  var GO =
    '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"/></svg>';

  /* Package picker on the manual form: the TDS segmented control. */
  function segmented() {
    var current = S.get().package;
    var row = S.package(current);
    var items = S.packages
      .map(function (p) {
        var on = p.id === current;
        return (
          '<button type="button" class="tds-segmented-control__item' + (on ? " tds-segmented-control__item--selected" : "") + '"' +
          ' role="radio" aria-checked="' + (on ? "true" : "false") + '" aria-pressed="' + (on ? "true" : "false") + '"' +
          ' data-d3-kyb-pkg-pick="' + p.id + '"><span class="tds-segmented-control__label">' + esc(p.label) + "</span></button>"
        );
      })
      .join("");
    return (
      '<div class="d3-kyb-pkg__row">' +
      '<span class="d3-kyb-pkg__label">Package</span>' +
      '<div class="tds-segmented-control tds-segmented-control--sm" role="radiogroup" aria-label="Package">' + items + "</div>" +
      "</div>" +
      '<p class="d3-kyb-pkg__note" data-d3-kyb-pkg-note>' + esc(row.note) + "</p>"
    );
  }

  /* Small line icons for the choice rows (24px grid, 1.5 stroke). */
  function icon(path) {
    return '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>";
  }
  window.D3KybIcons = {
    essentials: icon('<path d="M12 3 4.5 6v5.5c0 4.2 3 7.6 7.5 9.5 4.5-1.9 7.5-5.3 7.5-9.5V6L12 3Z"/><path d="m8.8 12 2.4 2.4 4-4.4"/>'),
    insights: icon('<circle cx="12" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M12 8.5V12M12 12 7 15.6M12 12l5 3.6"/>'),
    complete: icon('<path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5"/>'),
    bav: icon('<path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>'),
    adverse: icon('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/>'),
    monitoring: icon('<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    finder: icon('<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>'),
    manual: icon('<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="m14.5 7.5 3 3"/>')
  };

  /* What choosing this package will ask of the user — said before they choose. */
  function impact(p) {
    var e = S.get().entity;
    var c = S.country(e ? e.cc : S.get().country);
    if (p.tabs.indexOf("ownership") === -1) {
      return { warn: false, text: "Zero extra inputs required (instant straight-through processing)" };
    }
    if (!c) return { warn: false, text: "Owners are reported; some details may be needed" };
    if (c.ubo === "private") {
      return {
        warn: true,
        text: c.registry + " does not publish owners. I’ll help you fill that gap next (+3 fields: owner, ownership % and email)."
      };
    }
    return { warn: false, text: "Owners come from " + c.registry + " — nothing to enter." };
  }

  /* The "which package?" step: rows in the same style as the list of matching
     businesses — a quiet container, white rows, an icon tile. */
  function cards() {
    /* Nothing is highlighted until a package has actually been chosen. */
    var current = S.get().packageChosen ? S.get().package : "";
    return (
      '<div class="d3-ai-selector d3-kyb-choicelist" role="radiogroup" aria-label="Package"><div class="d3-ai-selector__rows">' +
      S.packages
        .map(function (p) {
          var im = impact(p);
          return (
            '<button type="button" class="d3-ai-selector__row' + (p.id === current ? " is-on" : "") + '" role="radio"' +
            ' aria-checked="' + (p.id === current ? "true" : "false") + '" data-d3-kyb-pkg-pick="' + p.id + '">' +
            '<span class="d3-ai-selector__mark" aria-hidden="true">' + window.D3KybIcons[p.id] + "</span>" +
            '<span class="d3-ai-selector__copy">' +
            '<span class="ai-cand__name">' + esc(p.name) +
            (p.recommended ? ' <span class="d3-kyb-choicelist__badge">Recommended</span>' : "") + "</span>" +
            '<span class="d3-ai-selector__addr">' + esc(p.tagline) + "</span>" +
            '<span class="d3-ai-selector__addr">' + esc(p.bullets.join(" · ")) + "</span>" +
            '<span class="d3-ai-selector__reg' + (im.warn ? " is-warn" : "") + '">' + esc(im.text) + "</span>" +
            "</span></button>"
          );
        })
        .join("") +
      "</div></div>"
    );
  }

  function markup(el) {
    return el && el.getAttribute("data-variant") === "cards" ? cards() : segmented();
  }

  function render(el) {
    if (!el) return;
    el.classList.add("d3-kyb-pkg");
    el.innerHTML = markup(el);
    if (mounted.indexOf(el) === -1) mounted.push(el);
  }

  function refresh() {
    mounted = mounted.filter(function (el) {
      return el.isConnected;
    });
    mounted.forEach(function (el) {
      var html = markup(el);
      if (el.innerHTML !== html) el.innerHTML = html;
    });
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest && event.target.closest("[data-d3-kyb-pkg-pick]");
    if (!btn) return;
    event.preventDefault();
    var id = btn.getAttribute("data-d3-kyb-pkg-pick");
    S.set({ package: id }, "ui");
    /* Fires even when the choice did not change (picking the default). */
    document.dispatchEvent(new CustomEvent("d3-kyb:package-pick", { detail: { id: id } }));
  });

  document.addEventListener(S.EVENT, function (event) {
    var d = event.detail || {};
    if (d.changed && d.changed.indexOf("package") !== -1) refresh();
  });

  function mountAll() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-d3-kyb-pkg]"), render);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountAll);
  else mountAll();

  window.D3KybPackage = { render: render, mountAll: mountAll, refresh: refresh };
})();
