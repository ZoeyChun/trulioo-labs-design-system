/* ============================================================
   Demo 3 — KYB Verification landing: layout switch
   ============================================================
   Drives four independent attributes on .d3-workspace__landing —
   header, search, recent, sep — plus four presets that set a whole
   combination at once. The styling for each option is in
   css/landing-layouts.css.

   Also builds the one-click chip row the "chips" recent option uses.
   Everything else is CSS over the existing nodes; see the header of
   landing-layouts.css for why the options can't own their own markup.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var landing = document.querySelector("[data-kw-group]");
  if (!landing) return;

  /* axis name → attribute, and the options each one accepts. */
  var AXES = {
    group: { attr: "data-kw-group", options: ["open", "all", "flat"] },
    recent: { attr: "data-kw-recent", options: ["list", "rows", "tiles", "chips", "table"] }
  };

  /* Shorthand for whole combinations. "figma" is the foundation —
     Portal-2.0-Design---2026 node 1665:20500. */
  var PRESETS = {
    figma: { group: "open", recent: "list" },
    boxed: { group: "all", recent: "list" },
    tiles: { group: "open", recent: "tiles" },
    flat: { group: "flat", recent: "rows" }
  };

  function setAxis(axis, option) {
    var spec = AXES[axis];
    if (!spec || spec.options.indexOf(option) === -1) return;
    landing.setAttribute(spec.attr, option);

    var group = document.querySelector('[data-kw-axis="' + axis + '"]');
    if (!group) return;
    Array.prototype.forEach.call(group.querySelectorAll("[data-kw-opt]"), function (btn) {
      var on = btn.getAttribute("data-kw-opt") === option;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
  }

  /* A preset stays lit only while the landing still matches it, so
     changing any one axis afterwards clears it rather than leaving a
     label that no longer describes what is on screen. */
  function syncPresets() {
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-kw-preset]"),
      function (btn) {
        var preset = PRESETS[btn.getAttribute("data-kw-preset")];
        var match =
          !!preset &&
          Object.keys(preset).every(function (axis) {
            return landing.getAttribute(AXES[axis].attr) === preset[axis];
          });
        btn.classList.toggle("is-active", match);
      }
    );
  }

  function applyPreset(name) {
    var preset = PRESETS[name];
    if (!preset) return;
    Object.keys(preset).forEach(function (axis) {
      setAxis(axis, preset[axis]);
    });
    syncPresets();
  }

  function bindLab() {
    var lab = document.querySelector("[data-kw-lab]");
    if (!lab) return;

    lab.addEventListener("click", function (event) {
      var preset = event.target.closest("[data-kw-preset]");
      if (preset) {
        applyPreset(preset.getAttribute("data-kw-preset"));
        return;
      }

      var opt = event.target.closest("[data-kw-opt]");
      if (!opt) return;
      var group = opt.closest("[data-kw-axis]");
      if (!group) return;
      setAxis(group.getAttribute("data-kw-axis"), opt.getAttribute("data-kw-opt"));
      syncPresets();
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

  /* ----------------------------------------------------------------
     Send

     The node's circular send has no upstream equivalent — Submit lives
     in the prefill panel, not the field. This one hands the typed name
     plus the selected country to the agent, which is the same path the
     composer uses, so the country selector in the field actually
     scopes the search instead of being decoration.
     ---------------------------------------------------------------- */
  function searchInput() {
    return document.getElementById("vb-q");
  }

  function selectedCountry() {
    var el = document.querySelector("#vb-country-select .vb-search-country__value");
    return el ? el.textContent.trim() : "";
  }

  function bindSend() {
    var btn = document.querySelector("[data-kw-send]");
    var input = searchInput();
    if (!btn || !input) return;

    function sync() {
      btn.classList.toggle("is-ready", input.value.trim().length >= 3);
    }

    function send() {
      var name = input.value.trim();
      if (!name) {
        input.focus();
        return;
      }
      var country = selectedCountry();
      document.dispatchEvent(
        new CustomEvent("d3-chat:send", {
          detail: { text: country ? name + ", " + country : name, agent: "kyb" },
          cancelable: true
        })
      );
    }

    input.addEventListener("input", sync);
    btn.addEventListener("click", send);
    sync();
  }

  /* Quick actions hand the agent the sentence a user would otherwise
     type, so they run the composer's path rather than a second one. */
  function bindActions() {
    document.querySelectorAll("[data-kw-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.dispatchEvent(
          new CustomEvent("d3-chat:send", {
            detail: { text: btn.getAttribute("data-kw-action"), agent: "kyb" },
            cancelable: true
          })
        );
      });
    });
  }

  /* View all → the full history. The Transactions rail item is gone in
     this fork, so ask the agent for it instead of dead-ending. */
  function bindViewAll() {
    var btn = document.querySelector("[data-kw-view-all]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var nav = document.querySelector('[data-d3-nav="transactions"]');
      if (nav) {
        nav.click();
        return;
      }
      document.dispatchEvent(
        new CustomEvent("d3-chat:send", {
          detail: { text: "Show all recent transactions", agent: "kyb" },
          cancelable: true
        })
      );
    });
  }

  function boot() {
    buildChips();
    bindLab();
    bindActions();
    bindSend();
    bindViewAll();
    syncPresets();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
