/* Demo 3 — the manual form in three steps: details, add-ons, review.

   Execute verification sits on the last step, after the user has chosen add-ons and seen a summary
   of the fields and the add-ons. Each block of #vb-prefill names the step(s) it shows on with
   data-step-only. */
(function () {
  "use strict";

  var S = window.D3KybSession;
  var root = document.getElementById("vb-prefill");
  if (!S || !root) return;

  var ORDER = ["details", "addons", "review"];
  var LABELS = { details: "Details", addons: "Add-ons", review: "Review" };
  var CHECK = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg>';

  /* TDS stepper: done steps are checked, the current one is marked, the rest wait. */
  function paintSteps(step) {
    var host = root.querySelector("[data-d3-kyb-formsteps]");
    if (!host) return;
    var at = ORDER.indexOf(step);
    host.innerHTML = ORDER.map(function (id, i) {
      var state = i < at ? "completed" : i === at ? "current" : "incomplete";
      return (
        '<li class="tds-stepper__item tds-stepper__item--' + state + '"' + (state === "current" ? ' aria-current="step"' : "") + ">" +
        '<div class="tds-stepper__line" aria-hidden="true"></div>' +
        '<div class="tds-stepper__content"><div class="tds-stepper__label-row">' +
        '<span class="tds-stepper__icon" aria-hidden="true">' + (state === "completed" ? CHECK : '<span class="tds-stepper__icon-badge">' + (i + 1) + "</span>") + "</span>" +
        '<span class="tds-stepper__title">' + LABELS[id] + "</span></div></div></li>"
      );
    }).join("");
  }

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function row(label, value) {
    return '<div class="d3-kyb-review__row"><dt>' + esc(label) + "</dt><dd>" + esc(value) + "</dd></div>";
  }

  function summary() {
    var host = document.querySelector("[data-d3-kyb-review]");
    if (!host) return;
    var st = S.get();
    var fields = [];
    Array.prototype.forEach.call(document.querySelectorAll("[data-d3-kyb-fields] .tds-text-input"), function (el) {
      var input = el.querySelector("input");
      var label = el.querySelector("label");
      if (input && label && input.value.trim()) fields.push([label.textContent.replace("*", "").trim(), input.value.trim()]);
    });
    /* Without pre-fill the name was typed in the top field, not in this form. */
    if (document.documentElement.getAttribute("data-d3-prefill") === "off" && st.profile.name.trim()) fields.unshift(["Business Name", st.profile.name.trim()]);
    var P = window.D3KybPackage;
    var pkg = S.package(st.package);
    var addons = (st.addons || []).map(function (id) { return S.addon(id).name; });
    host.innerHTML =
      '<div class="d3-kyb-review__group"><p class="d3-kyb-review__group-title text-label-sm-uppercase">Business details</p><dl class="d3-kyb-review__grid">' +
      (fields.length ? fields.map(function (f) { return row(f[0], f[1]); }).join("") : row("Details", "None entered")) + "</dl></div>" +
      '<div class="d3-kyb-review__group"><p class="d3-kyb-review__group-title text-label-sm-uppercase">Configuration</p><dl class="d3-kyb-review__grid">' +
      row("Country", (S.country(st.country) || {}).name || "United States") +
      row("Package", pkg.name) +
      (P ? row("Sub-account", P.subAccount(st.package)) : "") +
      row("Add-ons", addons.length ? addons.join(", ") : "None") + "</dl></div>";
  }

  function setStep(step) {
    root.setAttribute("data-d3-step", step);
    paintSteps(step);
    Array.prototype.forEach.call(root.querySelectorAll("[data-step-only]"), function (el) {
      el.hidden = el.getAttribute("data-step-only").split(" ").indexOf(step) === -1;
    });
    if (step === "addons" && window.D3KybGap) window.D3KybGap.renderAddons(root.querySelector("[data-d3-kyb-addons]"));
    if (step === "review") summary();
  }

  function current() {
    return root.getAttribute("data-d3-step") || "details";
  }

  root.addEventListener("click", function (event) {
    var next = event.target.closest && event.target.closest("[data-d3-step-next]");
    var back = event.target.closest && event.target.closest("[data-d3-step-back]");
    if (next) {
      if (next.getAttribute("aria-disabled") === "true") return;
      setStep(ORDER[Math.min(ORDER.indexOf(current()) + 1, ORDER.length - 1)]);
    } else if (back) {
      setStep(ORDER[Math.max(ORDER.indexOf(current()) - 1, 0)]);
    }
  });

  /* A fresh form (opened, closed, or a different business) starts on the details again. */
  new MutationObserver(function () {
    if (root.hidden) setStep("details");
  }).observe(root, { attributes: true, attributeFilter: ["hidden"] });

  var lastEntity = "";
  document.addEventListener(S.EVENT, function () {
    var e = S.get().entity;
    var key = e ? e.id : "";
    if (key !== lastEntity) {
      lastEntity = key;
      if (current() !== "details") setStep("details");
    }
  });

  setStep("details");
})();
