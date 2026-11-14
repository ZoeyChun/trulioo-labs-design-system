/* Demo 3 — "Pre-fill" switch beside the KYB Verification title. Demo only: it lets the engineering
   team see the two cases side by side.

     on   the contract includes pre-fill: search the registry, the form arrives filled
     off  no pre-fill in the contract: no registry search, the manual fields are always shown

   It drives the same Business Finder flag the manual flow already honours, and keeps it across
   resets and reloads. */
(function () {
  "use strict";

  var S = window.D3KybSession;
  var sw = document.querySelector("[data-d3-demo-prefill]");
  if (!S || !sw) return;

  var KEY = "d3-demo-prefill";
  var on = true;
  try {
    on = window.localStorage.getItem(KEY) !== "off";
  } catch (e) { /* storage blocked: stays on */ }

  var lede = document.querySelector(".d3-workspace__lede");
  var LEDE_ON = lede ? lede.textContent : "";

  function paint() {
    sw.classList.toggle("tds-switch__track--on", on);
    sw.setAttribute("aria-checked", on ? "true" : "false");
    /* CSS and the form read this: without pre-fill there is no search, the form carries the country. */
    document.documentElement.setAttribute("data-d3-prefill", on ? "on" : "off");
    if (lede) lede.textContent = on ? LEDE_ON : "Enter the business details to start a verification.";
    document.dispatchEvent(new CustomEvent("d3-demo:prefill-change", { detail: { on: on } }));
  }

  function apply() {
    if (S.get().finderEnabled !== on) S.set({ finderEnabled: on }, "demo");
  }

  function flip() {
    on = !on;
    try { window.localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) { /* ignore */ }
    paint();
    apply();
  }

  sw.addEventListener("click", flip);
  sw.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    flip();
  });

  /* A new verification or a saved configuration resets the flag; this switch wins. */
  document.addEventListener(S.EVENT, function (event) {
    var src = (event.detail && event.detail.source) || "";
    if (src === "reset" || src === "config") apply();
  });

  paint();
  apply();
})();
