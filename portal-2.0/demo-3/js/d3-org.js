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

  var lastPage = "org";

  /* Settings has two pages that share this full-width slot:
       org     Organization admin (the embedded page)
       config  Configuration (js/d3-kyb-config.js) */
  function goOrg(page) {
    page = page === "config" ? "config" : "org";
    lastPage = page;
    var slot = document.querySelector("[data-d3-org]");
    if (slot) slot.setAttribute("data-d3-settings-page", page);
    document.querySelectorAll("[data-d3-settings-go]").forEach(function (item) {
      var on = item.getAttribute("data-d3-settings-go") === page;
      if (on) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    if (page === "config" && window.D3Config && window.D3Config.open) window.D3Config.open();
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

    if (page === "org") ensureFrame();

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
    openConfig: function () { goOrg("config"); },
    post: post
  };

  /* The gear opens the Settings menu (hover / focus); pressing it itself opens
     Configuration. */
  document.querySelectorAll('[data-d3-nav="settings"]').forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      goOrg("config");
    });
  });

  document.querySelectorAll("[data-d3-settings-go]").forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      goOrg(item.getAttribute("data-d3-settings-go"));
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    });
  });
})();
