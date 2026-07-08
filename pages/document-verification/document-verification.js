/* ============================================================
   Document Verification — demo interactions (reference only)

   - Tab bar: click to move the active state
   - Collapsible sections: click header to expand/collapse

   No real data or navigation. Wire up in your own app.
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* Tabs */
    var tabs = document.querySelectorAll(".dv-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("dv-tab--active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("dv-tab--active");
        tab.setAttribute("aria-selected", "true");
      });
    });

    /* Collapsible sections */
    var headers = document.querySelectorAll(".dv-collapsible__header");
    headers.forEach(function (header) {
      header.addEventListener("click", function () {
        var section = header.closest(".dv-collapsible");
        var body = section.querySelector(".dv-collapsible__body");
        var isOpen = section.classList.toggle("dv-collapsible--open");
        header.setAttribute("aria-expanded", String(isOpen));
        if (body) body.hidden = !isOpen;
      });
    });

  });
})();
