/* ============================================================
   Demo 3 — KYB Verification landing: layout switch
   ============================================================
   Flips `data-kw-landing` on .d3-workspace__landing between the four
   options in css/landing-layouts.css, and builds the one-click chip
   row the "quick" option uses.

   Everything else is CSS over the existing nodes — see the header of
   landing-layouts.css for why the layouts can't own their own markup.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var landing = document.querySelector("[data-kw-landing]");
  if (!landing) return;

  var LAYOUTS = ["hero", "list", "quick", "split"];

  /* Only hero re-flows the recent card into a bordered row with a meta
     line. "list" has its own treatment (the Figma divider list) and
     split keeps the card, so the class hangs off this one layout. */
  var ROW_LAYOUTS = { hero: true };

  function showLayout(name) {
    if (LAYOUTS.indexOf(name) === -1) return;
    landing.setAttribute("data-kw-landing", name);
    landing.classList.toggle("kw-landing-row", !!ROW_LAYOUTS[name]);

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-kw-layout-btn]"),
      function (btn) {
        var on = btn.getAttribute("data-kw-layout-btn") === name;
        btn.classList.toggle("tds-segmented-control__item--selected", on);
        btn.setAttribute("aria-pressed", String(on));
      }
    );
  }

  function bindSwitch() {
    var bar = document.querySelector("[data-kw-layouts]");
    if (!bar) return;
    bar.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-kw-layout-btn]");
      if (btn) showLayout(btn.getAttribute("data-kw-layout-btn"));
    });
  }

  /* ----------------------------------------------------------------
     Chips

     Built from the recent cards rather than from a second data list,
     and a chip clicks its card — so "open a recent check" stays one
     code path (js/d3-kyb-resume.js) however it is presented.
     ---------------------------------------------------------------- */
  function buildChips() {
    var host = document.querySelector("[data-kw-chips]");
    if (!host) return;

    var cards = document.querySelectorAll("[data-d3-kyb-recent-card]");
    host.innerHTML = "";

    Array.prototype.forEach.call(cards, function (card) {
      var name = card.getAttribute("data-biz") || "";
      if (!name) return;
      var verified = (card.getAttribute("data-status") || "") === "Verified";

      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "kw-chip";
      chip.title = name + " · " + (card.getAttribute("data-country") || "");
      chip.innerHTML =
        '<span class="kw-chip__dot ' +
        (verified ? "kw-chip__dot--verified" : "kw-chip__dot--unverified") +
        '" aria-hidden="true"></span>' +
        '<span class="kw-chip__label"></span>';
      chip.querySelector(".kw-chip__label").textContent = name;

      chip.addEventListener("click", function () {
        card.click();
      });

      host.appendChild(chip);
    });
  }

  /* View all → the Transactions rail item, which is where the full
     history already lives. */
  function bindViewAll() {
    var btn = document.querySelector("[data-kw-view-all]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var nav = document.querySelector('[data-d3-nav="transactions"]');
      if (nav) nav.click();
    });
  }

  function boot() {
    buildChips();
    bindSwitch();
    bindViewAll();
    showLayout(landing.getAttribute("data-kw-landing") || "hero");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
