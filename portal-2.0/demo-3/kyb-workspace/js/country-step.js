/* ============================================================
   Demo 3 — Waiting for country
   ============================================================
   The step is a status screen now, not a form: the user answers in
   chat, so there is nothing here to pick. All this does is run the lab
   switch and keep the business name in the tracker up to date.

   An earlier pass carried a country picker — a dataset, a dropdown, a
   quick-pick grid, a Continue button that handed the answer to the
   agent. Removed with the form it belonged to; it is in git history.

   Styling for each option: css/country-step.css.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var root = document.querySelector("[data-kw-country]");
  if (!root) return;

  var AXES = {
    group: { attr: "data-kw-group", options: ["open", "all"] },
    steps: {
      attr: "data-kw-steps",
      options: ["timeline", "cards", "rail", "numbered", "chevrons", "inline"]
    }
  };

  function setAxis(axis, option) {
    var spec = AXES[axis];
    if (!spec || spec.options.indexOf(option) === -1) return;
    root.setAttribute(spec.attr, option);

    var group = document.querySelector('[data-kw-caxis="' + axis + '"]');
    if (!group) return;
    Array.prototype.forEach.call(group.querySelectorAll("[data-kw-copt]"), function (btn) {
      var on = btn.getAttribute("data-kw-copt") === option;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
  }

  function bindLab() {
    var lab = document.querySelector("[data-kw-country-lab]");
    if (!lab) return;
    lab.addEventListener("click", function (event) {
      var opt = event.target.closest("[data-kw-copt]");
      if (!opt) return;
      var group = opt.closest("[data-kw-caxis]");
      if (!group) return;
      setAxis(group.getAttribute("data-kw-caxis"), opt.getAttribute("data-kw-copt"));
    });
  }

  /* The business name arrives after this script runs —
     setAwaitingCountry() writes it into [data-d3-kyb-map-await-query]
     each time the step opens. The tracker's first step shows the same
     value, so mirror it from there rather than reading the agent. */
  function watchBusinessName() {
    var source = root.querySelector("[data-d3-kyb-map-await-query]");
    var target = root.querySelector("[data-kw-step-name]");
    if (!source || !target) return;

    function sync() {
      var text = source.textContent.trim();
      target.textContent = text && text !== "—" ? text : "Business name";
    }

    sync();
    new MutationObserver(sync).observe(source, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function boot() {
    bindLab();
    watchBusinessName();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
