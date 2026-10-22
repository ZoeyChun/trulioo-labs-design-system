/* Report preview — rail Escape + TruAI chat open/close. */
(function () {
  "use strict";

  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  function setChatOpen(open) {
    shell.setAttribute("data-d3-chat", open ? "open" : "closed");
    document.querySelectorAll("[data-d5-chat-open], [data-d5-askbar]").forEach(function (el) {
      el.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-d5-chat-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setChatOpen(false);
    });
  });

  document.querySelectorAll("[data-d5-chat-open], [data-d5-askbar]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setChatOpen(true);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var active = document.activeElement;
    if (active && typeof active.blur === "function") active.blur();
  });

  /* Prompt cards fill the composer; no flow yet. */
  var input = document.querySelector("[data-d5-chat-input]");
  document.querySelectorAll("[data-d5-prompt]").forEach(function (card) {
    card.addEventListener("click", function () {
      if (!input) return;
      input.value = card.getAttribute("data-d5-prompt") || "";
      input.focus();
    });
  });

  var form = document.querySelector("[data-d5-chat-form]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
})();
