/* Demo 3 — Organization admin: Settings → org page + TruAI idle (org prompts). */
(function () {
  var shell = document.querySelector(".d1-shell");
  var frame = document.querySelector("[data-d3-org-frame]");
  if (!shell) return;

  function goOrg() {
    shell.setAttribute("data-d3-view", "org");
    /* Keep TruAI available so Org Admin prompts stay reachable. */
    if (window.D3Nav) {
      window.D3Nav.setChatOpen(true, "org");
      window.D3Nav.markChatIdle();
    } else {
      shell.setAttribute("data-d3-chat", "open");
      shell.setAttribute("data-d3-chat-mode", "org");
    }

    document.querySelectorAll("[data-d3-nav]").forEach(function (btn) {
      btn.classList.remove("is-active");
      btn.removeAttribute("aria-current");
    });
    var settings = document.querySelector('[data-d3-nav="settings"], .d1-rail__tools [aria-label="Settings"]');
    if (settings) {
      settings.classList.add("is-active");
      settings.setAttribute("aria-current", "page");
    }

    if (frame && !frame.getAttribute("src")) {
      frame.setAttribute("src", "organization-admin/index.html?embed=1");
    }

    document.dispatchEvent(new CustomEvent("d3-view:org"));
    window.requestAnimationFrame(function () {
      window.dispatchEvent(new Event("resize"));
    });
  }

  function post(cmd, payload) {
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(
      { type: "d3-org-cmd", cmd: cmd, payload: payload || {} },
      "*"
    );
  }

  window.D3Org = {
    open: goOrg,
    post: post
  };

  document.querySelectorAll('[data-d3-nav="settings"]').forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      goOrg();
    });
  });
})();
