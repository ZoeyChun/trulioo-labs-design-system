/* Verification Module V4 — rail Escape + TruAI chat open/close. */
(function () {
  "use strict";

  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  function setChatOpen(open) {
    shell.setAttribute("data-d3-chat", open ? "open" : "closed");
    document.querySelectorAll("[data-v4-chat-open], [data-v4-askbar]").forEach(function (el) {
      el.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-v4-chat-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setChatOpen(false);
    });
  });

  document.querySelectorAll("[data-v4-chat-open], [data-v4-askbar]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setChatOpen(true);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var active = document.activeElement;
    if (active && typeof active.blur === "function") active.blur();
  });
})();
