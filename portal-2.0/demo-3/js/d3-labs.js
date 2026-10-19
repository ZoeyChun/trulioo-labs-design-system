/* Demo 3 — Labs catalog view (Labs nav → unified-intelligence Labs). */
(function () {
  var shell = document.querySelector(".d1-shell");
  var frame = document.querySelector("[data-d3-labs-frame]");
  if (!shell) return;

  var LABS_SRC = "../../pages/unified-intelligence-home/labs.html?embed=1&v=11";

  function ensureFrame() {
    if (!frame) return;
    if (frame.getAttribute("src") !== LABS_SRC) {
      frame.setAttribute("src", LABS_SRC);
    }
  }

  function openPortalAction(action) {
    /* Deep-link / legacy Labs card → top-level KYB Verification nav. */
    if (action === "kyb") {
      if (window.D3Nav && window.D3Nav.goKyb) {
        window.D3Nav.goKyb();
        return;
      }
      if (window.D3KybResume && window.D3KybResume.openResumeExperience) {
        window.D3KybResume.openResumeExperience();
      }
    }
  }

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.type !== "d3-labs-open") return;
    openPortalAction(data.action);
  });

  function goLabs() {
    shell.setAttribute("data-d3-view", "agents");
    /* Labs is catalog-only — no TruAI panel / ask bar. */
    if (window.D3Nav) {
      window.D3Nav.setChatOpen(false, "hub");
      window.D3Nav.markChatIdle();
    } else {
      shell.setAttribute("data-d3-chat", "closed");
      shell.setAttribute("data-d3-chat-mode", "hub");
    }

    document.querySelectorAll("[data-d3-nav]").forEach(function (btn) {
      var on = btn.getAttribute("data-d3-nav") === "labs";
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

  /* Standalone Labs deep-link: …/demo-3/index.html#kyb */
  if (/#kyb\b/i.test(window.location.hash || "")) {
    window.setTimeout(function () {
      openPortalAction("kyb");
    }, 80);
  }
})();
