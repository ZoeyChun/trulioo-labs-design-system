/* Demo 3 — view / chat / surface motion orchestration.
   Restarts enter animations on navigation without changing layout logic. */
(function () {
  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var chatPane = document.querySelector("[data-d3-chat-pane]");
  var lastView = shell.getAttribute("data-d3-view") || "home";
  var lastChat = shell.getAttribute("data-d3-chat") || "closed";
  var enterTimer = null;

  function surfaceForView(view) {
    if (view === "agents") return document.querySelector(".d3-agents");
    if (view === "chat") return document.querySelector(".d3-workspace");
    if (view === "transactions") return document.querySelector(".d3-tx");
    return document.querySelector(".d1-home");
  }

  function clearEnter(el) {
    if (!el) return;
    el.classList.remove("d3-motion-enter", "d3-motion-enter-stagger");
  }

  function playEnter(el, stagger) {
    if (!el || reduced) return;
    clearEnter(el);
    void el.offsetWidth;
    el.classList.add("d3-motion-enter");
    if (stagger) el.classList.add("d3-motion-enter-stagger");
    if (enterTimer) window.clearTimeout(enterTimer);
    enterTimer = window.setTimeout(function () {
      clearEnter(el);
      enterTimer = null;
    }, 480);
  }

  function playPaneIn() {
    if (!chatPane || reduced) return;
    chatPane.classList.remove("d3-motion-pane-in");
    void chatPane.offsetWidth;
    chatPane.classList.add("d3-motion-pane-in");
    window.setTimeout(function () {
      chatPane.classList.remove("d3-motion-pane-in");
    }, 420);
  }

  function onViewChange(view) {
    var surface = surfaceForView(view);
    playEnter(surface, false);
    if (view === "agents") {
      var grid = document.querySelector(".d3-agents__grid");
      if (grid) {
        /* Stagger cards separately from the agents shell. */
        clearEnter(grid);
        void grid.offsetWidth;
        grid.classList.add("d3-motion-enter-stagger");
        window.setTimeout(function () {
          grid.classList.remove("d3-motion-enter-stagger");
        }, 520);
      }
    }
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
