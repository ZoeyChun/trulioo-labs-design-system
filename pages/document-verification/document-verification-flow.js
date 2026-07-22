/* ============================================================
   Document Verification — capture flow (form view) controller
   Drives the two-step wizard and toggles between the form view and
   the existing result view (Jane Doe). Demo-only UI state; wire up
   real capture/verification logic in your own app.
   ============================================================ */
(function () {
  "use strict";

  function byId(id) {
    return document.getElementById(id);
  }

  var formView, resultView, step1, step2;

  function showFormView() {
    if (!formView || !resultView) return;
    formView.hidden = false;
    resultView.hidden = true;
    document.title = "Document Verification — Trulioo Labs";
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    window.scrollTo(0, 0);
  }

  function showResultView() {
    if (!formView || !resultView) return;
    formView.hidden = true;
    resultView.hidden = false;
    document.title = "Document Verification Results — Trulioo Labs";
    history.replaceState(null, "", location.pathname + location.search + "#result");
    window.scrollTo(0, 0);
    /* The result view mounts hidden, so its split panes measured 0 on load.
       Nudge a resize so the document/selfie columns size correctly. */
    window.dispatchEvent(new Event("resize"));
  }

  function goStep(n) {
    if (step1) step1.hidden = n !== 1;
    if (step2) step2.hidden = n !== 2;
    window.scrollTo(0, 0);
  }

  /* Radio-card groups — reflect selection on the card chrome. */
  function initRadioGroups() {
    var radios = formView.querySelectorAll('input[type="radio"]');
    radios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        formView
          .querySelectorAll('input[name="' + radio.name + '"]')
          .forEach(function (r) {
            var card = r.closest(".tds-radio-card");
            if (card) card.classList.toggle("tds-radio-card--selected", r.checked);
          });
      });
    });
  }

  /* Switch toggles (Device Intelligence). */
  function initSwitches() {
    formView.querySelectorAll(".tds-switch__track").forEach(function (track) {
      track.addEventListener("click", function () {
        var on = track.getAttribute("aria-checked") === "true";
        track.setAttribute("aria-checked", String(!on));
        track.classList.toggle("tds-switch__track--on", !on);
      });
    });
  }

  function getHomeUrl() {
    try {
      return new URL("../unified-intelligence-home/index.html", window.location.href).href;
    } catch (e) {
      return "../unified-intelligence-home/index.html";
    }
  }

  function initNav() {
    var next = byId("dv-flow-next");
    var step1Back = byId("dv-flow-step1-back");
    var step2Back = byId("dv-flow-step2-back");
    var skip = byId("dv-flow-skip");
    var homeBack = byId("dv-flow-home-back");
    var resultBack = byId("dv-result-back");
    var homeUrl = getHomeUrl();

    if (next) next.addEventListener("click", function () { goStep(2); });
    if (step2Back) step2Back.addEventListener("click", function () { goStep(1); });
    if (step1Back) {
      step1Back.addEventListener("click", function () { history.back(); });
    }
    if (skip) skip.addEventListener("click", showResultView);

    if (homeBack) {
      homeBack.addEventListener("click", function () {
        window.location.href = homeUrl;
      });
    }
    /* Result header back — return to the capture flow. */
    if (resultBack) {
      resultBack.addEventListener("click", showFormView);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    formView = byId("dv-form-view");
    resultView = byId("dv-result-view");
    step1 = byId("dv-flow-step-1");
    step2 = byId("dv-flow-step-2");
    if (!formView || !resultView) return;

    initRadioGroups();
    initSwitches();
    initNav();

    if (location.hash === "#result") {
      showResultView();
    } else {
      showFormView();
      goStep(1);
    }
  });
})();
