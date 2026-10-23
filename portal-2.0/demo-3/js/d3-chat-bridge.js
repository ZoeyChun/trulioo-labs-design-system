/* Bridge Demo 1 chat.js into the Demo 3 left chat pane. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var stage = document.querySelector("[data-d1-stage]");
  var sourceThread = document.querySelector("[data-d1-thread]");
  var sourceComposer = document.querySelector("[data-d1-composer]");
  var sourceFollow = document.querySelector("[data-d1-follow]");
  /* Pane is mounted by D3AiPanel — resolve lazily so a deferred mount
     cannot permanently disable this bridge. */
  function getPane() {
    return document.querySelector("[data-d3-chat-pane]");
  }
  function getPaneThread() {
    return document.querySelector("[data-d3-chat-thread]");
  }
  function getPaneComposer() {
    return document.querySelector("[data-d3-chat-composer]");
  }
  function getIdleForm() {
    return document.querySelector("[data-d3-pane-form]");
  }
  var pane = getPane();
  var paneThread = getPaneThread();
  var paneComposer = getPaneComposer();
  var idleForm = getIdleForm();
  if (!shell || !sourceThread || !sourceComposer) return;

  function refreshPaneRefs() {
    pane = getPane();
    paneThread = getPaneThread();
    paneComposer = getPaneComposer();
    idleForm = getIdleForm();
    return !!(pane && paneThread && paneComposer);
  }
  refreshPaneRefs();

  var parked = false;
  var idleFormBound = false;
  var homeMount = document.querySelector(".d1-home") || sourceComposer.closest(".d1-home");
  var threadMount = sourceThread.parentNode;
  var followMount = sourceFollow ? sourceFollow.parentNode : null;
  var sending = false;

  function parkIntoPane() {
    if (parked) return;
    if (!refreshPaneRefs()) return;
    if (idleForm) idleForm.hidden = true;
    paneThread.appendChild(sourceThread);
    if (sourceFollow) paneThread.appendChild(sourceFollow);
    paneComposer.appendChild(sourceComposer);
    sourceComposer.classList.add("d3-composer--pane");
    parked = true;
    var parkedInput = sourceComposer.querySelector("[data-d1-input]");
    if (parkedInput) {
      window.requestAnimationFrame(function () {
        parkedInput.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
  }

  function restoreComposer() {
    var home = document.querySelector(".d1-home") || homeMount;
    if (!home) return;
    var hero = home.querySelector(".d3-home-hero");
    var body = hero && hero.querySelector(".d3-home-hero__body");
    var skin = home.getAttribute("data-d3-home-skin") || "dark";
    /* Dark home: composer lives inside the padded hero body. */
    if (skin !== "light" && (body || hero)) {
      (body || hero).appendChild(sourceComposer);
      return;
    }
    var brief = home.querySelector(".d1-brief");
    if (brief) home.insertBefore(sourceComposer, brief);
    else home.appendChild(sourceComposer);
  }

  /* Home uses a rotating fake-placeholder span; KYB may have set a real
     input.placeholder (e.g. country ask) — clear it or both paint on top. */
  function resetHomeComposerPrompt() {
    var input = sourceComposer.querySelector("[data-d1-input]");
    if (!input) return;
    input.placeholder = "";
    input.value = "";
    input.style.height = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    document.dispatchEvent(new CustomEvent("d3-home:composer-reset"));
  }

  function restoreFromPane() {
    if (!parked) return;
    if (threadMount) threadMount.appendChild(sourceThread);
    if (sourceFollow && followMount) followMount.appendChild(sourceFollow);
    restoreComposer();
    sourceComposer.classList.remove("d3-composer--pane");
    if (idleForm) idleForm.hidden = false;
    parked = false;
    if (window.D3Nav) window.D3Nav.markChatIdle();
    resetHomeComposerPrompt();
  }

  function openLeftChat(mode) {
    if (window.D3Nav) {
      if (mode === "kyb") window.D3Nav.openKybChat();
      else if (mode === "kyc" && window.D3Nav.openKycChat) window.D3Nav.openKycChat({ forceActive: true });
      else if (mode === "tx" && window.D3Nav.setChatOpen) {
        window.D3Nav.setChatOpen(true, "tx");
      } else if (window.D3Nav.goLabs) window.D3Nav.goLabs();
      else window.D3Nav.goAgents();
    } else {
      shell.setAttribute("data-d3-chat", "open");
    }
    parkIntoPane();
    /* Demo 3 never uses the full-page Demo 1 chat stage. Leaving
       data-d1-stage="chat" while the composer is parked in the left pane
       strips the home search and leaves greeting + briefing cards alone. */
    if (stage) stage.setAttribute("data-d1-stage", "home");
  }

  /* Home hero search → KYB/KYC workspace. Must beat chat.js (Demo 1). */
  function isTxHomePrompt(text) {
    return /failure|failures|failed|spike|spiked|pattern|patterns|recent (verification )?activity|investigate why|flagged|pending review/i.test(
      text || ""
    );
  }

  function sendAfter(agent, text, delay) {
    window.setTimeout(function () {
      document.dispatchEvent(
        new CustomEvent("d3-chat:send", {
          detail: { text: text, agent: agent },
          cancelable: true
        })
      );
    }, delay != null ? delay : 100);
  }

  function routeHomeText(text, agent) {
    text = String(text || "").trim();
    if (!text) return;
    agent = agent || "auto";
    if (stage) stage.setAttribute("data-d1-stage", "home");

    if (agent === "kyc") {
      if (window.D3Nav && window.D3Nav.openKycChat) {
        window.D3Nav.openKycChat({ forceActive: true });
      }
      parkIntoPane();
      sendAfter("kyc", text, 80);
      return;
    }

    /* Briefing cards + failure/pattern asks → Transaction Agent, not Demo 1 chat. */
    if (agent === "tx" || isTxHomePrompt(text)) {
      if (window.D3Transactions && window.D3Transactions.open) {
        window.D3Transactions.open();
      } else if (window.D3Nav && window.D3Nav.goTransactions) {
        window.D3Nav.goTransactions();
      }
      if (window.D3Nav) {
        window.D3Nav.setChatOpen(true, "tx");
        window.D3Nav.markChatActive();
      }
      parkIntoPane();
      if (stage) stage.setAttribute("data-d1-stage", "home");
      sendAfter("tx", text, 120);
      return;
    }

    /* Verify / Find Meridian → KYB Verification workspace + agent (never Demo 1 chat). */
    var wantsMap = /\b(find|search|verify|look\s*up|locate|meridian)\b/i.test(text);
    if (wantsMap && window.D3KybResume && window.D3KybResume.openMapExperience) {
      window.D3KybResume.openMapExperience();
    } else if (window.D3KybResume && window.D3KybResume.openResumeExperience) {
      window.D3KybResume.openResumeExperience();
    } else if (window.D3Nav && window.D3Nav.openKybChat) {
      window.D3Nav.openKybChat({ map: wantsMap, resume: !wantsMap });
    }

    parkIntoPane();
    if (window.D3Nav) window.D3Nav.markChatActive();
    sendAfter("kyb", text, 120);
  }

  function routeHomeSubmit(event) {
    var view = shell.getAttribute("data-d3-view") || "home";
    if (view !== "home") return;
    var detail = event.detail || {};
    var text = String(detail.text || "").trim();
    if (!text) return;

    event.stopImmediatePropagation();
    if (typeof event.preventDefault === "function") event.preventDefault();
    routeHomeText(text, detail.agent || "auto");
  }

  /* Capture on composer + document so Home routing always wins. */
  sourceComposer.addEventListener("d1-composer:submit", routeHomeSubmit, true);
  document.addEventListener("d1-composer:submit", routeHomeSubmit, true);

  /* Home chips: open the experience immediately (no paste into the composer). */
  sourceComposer.addEventListener("d1-composer:chip", function (event) {
    var detail = event.detail || {};
    var agent = detail.agent || "kyb";
    var view = shell.getAttribute("data-d3-view") || "home";
    if (view !== "home" && view !== "agents") return;

    if (agent === "kyc") {
      if (window.D3Nav && window.D3Nav.openKycChat) {
        window.D3Nav.openKycChat({ forceActive: false });
      }
      return;
    }

    if (agent === "tx") {
      if (window.D3Transactions && window.D3Transactions.open) {
        window.D3Transactions.open();
      } else if (window.D3Nav && window.D3Nav.goTransactions) {
        window.D3Nav.goTransactions();
      }
      if (window.D3Nav) window.D3Nav.setChatOpen(true, "tx");
      return;
    }

    if (window.D3KybResume && window.D3KybResume.openResumeExperience) {
      window.D3KybResume.openResumeExperience();
    } else if (window.D3Nav && window.D3Nav.openKybChat) {
      window.D3Nav.openKybChat({ resume: true });
    }
  });

  /* Beat chat.js [data-d1-demo] → Demo 1 full-page chat (old homepage stage). */
  document.querySelectorAll("[data-d1-demo]").forEach(function (button) {
    button.addEventListener(
      "click",
      function (event) {
        var view = shell.getAttribute("data-d3-view") || "home";
        if (view !== "home") return;
        var text = button.getAttribute("data-prompt") || "";
        if (!text) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        routeHomeText(text, button.getAttribute("data-agent") || "auto");
      },
      true
    );
  });

  function submitThroughComposer(text, agent) {
    if (!text) return;
    parkIntoPane();
    if (window.D3Nav) window.D3Nav.markChatActive();

    var input = sourceComposer.querySelector("[data-d1-input]");
    var form = sourceComposer.querySelector("[data-d1-form]");
    if (!input || !form) return;

    if (agent) {
      var option = sourceComposer.querySelector('[data-d1-agent-option][data-agent="' + agent + '"]');
      if (option) option.click();
    }

    sending = true;
    input.value = text;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    if (typeof form.requestSubmit === "function") form.requestSubmit();
    else form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    window.setTimeout(function () { sending = false; }, 0);
  }

  var observer = new MutationObserver(function () {
    if (!stage || sending) return;
    if (stage.getAttribute("data-d1-stage") === "chat") {
      var chatMode = shell.getAttribute("data-d3-chat-mode");
      var mode =
        shell.getAttribute("data-d3-view") === "agents"
          ? "hub"
          : chatMode === "kyc"
            ? "kyc"
            : "kyb";
      openLeftChat(mode);
      if (window.D3Nav) window.D3Nav.markChatActive();
    }
  });
  if (stage) observer.observe(stage, { attributes: true, attributeFilter: ["data-d1-stage"] });

  document.addEventListener("d3-view:home", function () {
    restoreFromPane();
    if (stage) stage.setAttribute("data-d1-stage", "home");
    /* Even if composer was never parked, wipe KYB placeholders on Home. */
    resetHomeComposerPrompt();
  });
  document.addEventListener("d3-chat:close", function (event) {
    var detail = (event && event.detail) || {};
    var view = shell.getAttribute("data-d3-view") || "home";
    /* On Home, always put the composer back — never leave Home without it. */
    if (view === "home") {
      restoreFromPane();
      if (stage) stage.setAttribute("data-d1-stage", "home");
      return;
    }
    /* Minimized to ask bar: keep thread/composer parked in the pane. */
    if (detail.minimized) return;
    restoreFromPane();
    if (stage) stage.setAttribute("data-d1-stage", "home");
  });

  document.addEventListener("d3-chat:open", function () {
    /* Reopening from ask bar — if a conversation was parked, show it. */
    if (parked && window.D3Nav) window.D3Nav.markChatActive();
  });

  document.addEventListener("d3-view:agents", function () {
    restoreFromPane();
    if (window.D3Nav) window.D3Nav.markChatIdle();
  });

  document.addEventListener("d3-chat:send", function (event) {
    var detail = event.detail || {};
    /* KYB / Transaction agents may cancel/handle first. */
    if (event.defaultPrevented) return;
    if (shell.getAttribute("data-d3-view") === "transactions") return;
    if (shell.getAttribute("data-d3-view") === "org") return;
    if (window.D3KybAgent && (detail.agent === "kyb" || shell.getAttribute("data-d3-chat-mode") === "kyb")) {
      return;
    }
    if (detail.agent === "org") return;
    var agent = detail.agent || "kyb";
    var mode = agent === "kyc" ? "kyc" : agent === "tx" ? "tx" : "kyb";
    openLeftChat(mode);
    submitThroughComposer(detail.text || "", agent === "tx" ? "kyb" : agent);
  });

  document.addEventListener("d3-kyb:park-composer", function () {
    parkIntoPane();
  });

  document.addEventListener("d3-kyb:restore-idle", function () {
    restoreFromPane();
    if (window.D3Nav) window.D3Nav.markChatIdle();
  });

  document.addEventListener("d3-kyb:resume-ready", function () {
    restoreFromPane();
    if (idleForm) idleForm.hidden = false;
    if (window.D3Nav) window.D3Nav.markChatIdle();
  });

  function bindIdleForm() {
    refreshPaneRefs();
    if (idleFormBound || !idleForm) return;
    idleFormBound = true;

    function submitIdleForm() {
      var input = idleForm.querySelector("[data-d3-pane-input]");
      var text = input && input.value ? input.value.trim() : "";
      if (!text) return;
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      var onTx = shell.getAttribute("data-d3-view") === "transactions";
      var onOrg = shell.getAttribute("data-d3-view") === "org";
      var mode = shell.getAttribute("data-d3-chat-mode") || "kyb";
      var agent =
        onTx || mode === "tx"
          ? "tx"
          : onOrg || mode === "org"
            ? "org"
            : mode === "kyc"
              ? "kyc"
              : mode === "hub"
                ? "kyb"
                : mode;
      document.dispatchEvent(new CustomEvent("d3-chat:send", {
        detail: { text: text, agent: agent },
        cancelable: true
      }));
    }

    idleForm.addEventListener("submit", function (event) {
      event.preventDefault();
      submitIdleForm();
    });

    /* Enter starts the chat (Shift+Enter keeps a newline). */
    var idleInput = idleForm.querySelector("[data-d3-pane-input]");
    if (idleInput) {
      var IDLE_LINE = 22;
      var IDLE_MAX = 132;
      function autosizeIdleInput() {
        idleInput.style.height = IDLE_LINE + "px";
        var next = Math.min(IDLE_MAX, Math.max(IDLE_LINE, idleInput.scrollHeight));
        idleInput.style.height = next + "px";
        idleInput.classList.toggle("is-multiline", next > IDLE_LINE + 1);
      }
      idleInput.addEventListener("input", autosizeIdleInput);
      idleInput.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" || event.shiftKey) return;
        event.preventDefault();
        if (typeof idleForm.requestSubmit === "function") idleForm.requestSubmit();
        else submitIdleForm();
      });
      window.requestAnimationFrame(autosizeIdleInput);
    }
  }

  bindIdleForm();
  if (!idleFormBound) {
    document.addEventListener("d3-ai-panel:mounted", function onMounted() {
      document.removeEventListener("d3-ai-panel:mounted", onMounted);
      bindIdleForm();
    });
  }

  document.addEventListener("d3-view:transactions", function () {
    /* Keep idle prompts visible until the first Transaction Agent turn. */
    if (window.D3Nav) window.D3Nav.markChatIdle();
  });

  document.querySelectorAll("[data-d1-new-chat]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (window.D3Nav) window.D3Nav.goHome();
    });
  });
})();
