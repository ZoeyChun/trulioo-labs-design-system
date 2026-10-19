/* Demo 3 — view / chat motion orchestration.
   Restarts demo-2-style section rises on navigation (children animate,
   not the whole surface). */
(function () {
  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var chatPane = document.querySelector("[data-d3-chat-pane]");
  var lastView = shell.getAttribute("data-d3-view") || "home";
  var lastChat = shell.getAttribute("data-d3-chat") || "closed";
  var enterTimer = null;
  var paneTimer = null;

  /* Keep class long enough for the slowest child delay (200ms) + 380ms. */
  var ENTER_HOLD_MS = 700;
  var PANE_HOLD_MS = 780;

  function surfaceForView(view) {
    if (view === "agents") return document.querySelector(".d3-labs") || document.querySelector(".d3-agents");
    if (view === "chat") return document.querySelector(".d3-workspace");
    if (view === "transactions") return document.querySelector(".d3-tx");
    if (view === "org") return document.querySelector(".d3-org");
    return document.querySelector(".d1-home");
  }

  function clearEnter(el) {
    if (!el) return;
    el.classList.remove("d3-motion-enter");
  }

  function playEnter(el) {
    if (!el || reduced) return;
    clearEnter(el);
    void el.offsetWidth;
    el.classList.add("d3-motion-enter");
    if (enterTimer) window.clearTimeout(enterTimer);
    enterTimer = window.setTimeout(function () {
      clearEnter(el);
      enterTimer = null;
    }, ENTER_HOLD_MS);
  }

  function playPaneIn() {
    if (!chatPane || reduced) return;
    chatPane.classList.remove("d3-motion-pane-in");
    void chatPane.offsetWidth;
    chatPane.classList.add("d3-motion-pane-in");
    if (paneTimer) window.clearTimeout(paneTimer);
    paneTimer = window.setTimeout(function () {
      chatPane.classList.remove("d3-motion-pane-in");
      paneTimer = null;
    }, PANE_HOLD_MS);
  }

  function onViewChange(view) {
    playEnter(surfaceForView(view));
  }

  var obs = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === "data-d3-view") {
        var view = shell.getAttribute("data-d3-view") || "home";
        if (view !== lastView) {
          lastView = view;
          onViewChange(view);
        }
      }
      if (m.attributeName === "data-d3-chat") {
        var chat = shell.getAttribute("data-d3-chat") || "closed";
        if (chat !== lastChat) {
          var opening = chat === "open" && lastChat !== "open";
          lastChat = chat;
          if (opening) playPaneIn();
        }
      }
    });
  });

  obs.observe(shell, {
    attributes: true,
    attributeFilter: ["data-d3-view", "data-d3-chat"]
  });

  window.D3Motion = {
    reduced: reduced,
    playEnter: playEnter,
    playPaneIn: playPaneIn
  };
})();
