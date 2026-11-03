/* Demo 3 — the AI panel's scrollbar stays out of sight until the thread is
   actually being scrolled (CSS: .d3-chat-pane__thread / .is-scrolling). */
(function () {
  "use strict";

  var timers = new WeakMap();

  document.addEventListener(
    "scroll",
    function (event) {
      var el = event.target;
      if (!el || !el.classList || !el.classList.contains("d3-chat-pane__thread")) return;
      el.classList.add("is-scrolling");
      window.clearTimeout(timers.get(el));
      timers.set(
        el,
        window.setTimeout(function () {
          el.classList.remove("is-scrolling");
        }, 900)
      );
    },
    true
  );
})();
