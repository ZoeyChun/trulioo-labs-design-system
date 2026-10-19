/* Demo 3 — Labs catalog view (Agent hub nav → unified-intelligence Labs). */
(function () {
  var shell = document.querySelector(".d1-shell");
  var frame = document.querySelector("[data-d3-labs-frame]");
  if (!shell) return;

  var LABS_SRC = "../../pages/unified-intelligence-home/labs.html?embed=1&v=6";

  function ensureFrame() {
    if (!frame) return;
    if (frame.getAttribute("src") !== LABS_SRC) {
      frame.setAttribute("src", LABS_SRC);
    }
  }

  function goLabs() {
    shell.setAttribute("data-d3-view", "agents");
    /* Labs opens with TruAI panel by default (hub idle prompts). */
    if (window.D3Nav) {
      window.D3Nav.setChatOpen(true, "hub");
      window.D3Nav.markChatIdle();
    } else {
      shell.setAttribute("data-d3-chat", "open");
      shell.setAttribute("data-d3-chat-mode", "hub");
    }

    document.querySelectorAll("[data-d3-nav]").forEach(function (btn) {
      var on = btn.getAttribute("data-d3-nav") === "agents";
      btn.classList.toggle("is-active", on);
      if (on) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });

    ensureFrame();
    document.dispatchEvent(new CustomEvent("d3-view:agents"));
    window.requestAnimationFrame(function () {
      window.dispatchEvent(new Event("resize"));
    });
  }

  window.D3Labs = {
    open: goLabs,
    ensureFrame: ensureFrame
  };

  document.addEventListener("d3-view:agents", ensureFrame);
})();
