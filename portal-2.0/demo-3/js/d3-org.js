/* Demo 3 — Organization admin: Settings → full-width org page (no TruAI). */
(function () {
  var shell = document.querySelector(".d1-shell");
  var frame = document.querySelector("[data-d3-org-frame]");
  if (!shell) return;

  var ORG_SRC = "organization-admin/index.html?embed=1&v=2";

  function ensureFrame() {
    if (!frame) return;
    if (frame.getAttribute("src") !== ORG_SRC) {
      frame.setAttribute("src", ORG_SRC);
    }
  }

  function goOrg() {
    shell.setAttribute("data-d3-view", "org");
    /* No Org Admin agent panel — workspace only. */
    if (window.D3Nav && window.D3Nav.setChatOpen) {
      window.D3Nav.setChatOpen(false);
    } else {
      shell.setAttribute("data-d3-chat", "closed");
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

    ensureFrame();

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
