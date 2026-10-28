/* Demo 3 — keep the AI panel on what is happening now.

   As the thread grows (a message arrives, a progress step ticks over, a card
   expands) the earlier messages keep easing upward so the current step stays in
   view, in the middle of the panel rather than under the composer.

   - Follows while the user is at the bottom. Scrolling up to read pauses it;
     scrolling back down, or sending a message, resumes it.
   - A tail of empty space under the last message (~28% of the panel) is what
     lets the latest content settle mid-panel instead of hugging the edge. */
(function () {
  "use strict";

  var thread = document.querySelector("[data-d1-thread]");
  if (!thread) return;

  var TAIL = 0.28;
  var pinned = true;
  var programmatic = 0;
  var raf = 0;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function scroller() {
    return thread.closest("[data-d3-chat-thread]");
  }

  function hasUser() {
    return !!thread.querySelector(".d1-user");
  }

  function distanceToEnd(el) {
    return el.scrollHeight - el.scrollTop - el.clientHeight;
  }

  function setTail(el) {
    var want = hasUser() ? Math.round(el.clientHeight * TAIL) + "px" : "";
    if (thread.style.paddingBottom !== want) thread.style.paddingBottom = want;
  }

  function toEnd(el) {
    window.clearTimeout(programmatic);
    /* Our own scroll events must not read as the user scrolling away. */
    programmatic = window.setTimeout(function () {
      programmatic = 0;
    }, reduced ? 80 : 520);
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }

  function follow() {
    raf = 0;
    var el = scroller();
    if (!el || !hasUser()) return;
    setTail(el);
    if (pinned) toEnd(el);
  }

  function schedule() {
    if (raf) return;
    raf = window.requestAnimationFrame(follow);
  }

  /* scroll does not bubble — listen in the capture phase. */
  document.addEventListener(
    "scroll",
    function (event) {
      var el = scroller();
      if (!el || event.target !== el || programmatic) return;
      pinned = distanceToEnd(el) < 120;
    },
    true
  );

  /* A new user message always brings the view back to the live end. */
  var users = 0;
  new MutationObserver(function () {
    var n = thread.querySelectorAll(".d1-user").length;
    if (n > users) pinned = true;
    users = n;
    schedule();
  }).observe(thread, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["class", "hidden", "style", "open", "aria-expanded"]
  });

  /* Heights also change with no DOM edit (transitions, expanding rows). */
  if (window.ResizeObserver) {
    new window.ResizeObserver(schedule).observe(thread);
  }
  window.addEventListener("resize", schedule);
})();
