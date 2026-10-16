/* Bridge Demo 1 chat.js into the Demo 3 left chat pane. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var pane = document.querySelector("[data-d3-chat-pane]");
  var paneThread = document.querySelector("[data-d3-chat-thread]");
  var paneComposer = document.querySelector("[data-d3-chat-composer]");
  var idleForm = document.querySelector("[data-d3-pane-form]");
  var stage = document.querySelector("[data-d1-stage]");
  var sourceThread = document.querySelector("[data-d1-thread]");
  var sourceComposer = document.querySelector("[data-d1-composer]");
  if (!shell || !pane || !paneThread || !paneComposer || !sourceThread || !sourceComposer) return;

  var parked = false;
  var homeMount = sourceComposer.parentNode;
  var threadMount = sourceThread.parentNode;
  /* Brief lives in the same chat__col; remember sibling so restore
     keeps greeting → composer → cards order (appendChild would put
     the composer after the brief). */
  var composerBefore = sourceComposer.nextSibling;
  var sending = false;

  function parkIntoPane() {
    if (parked) return;
    if (idleForm) idleForm.hidden = true;
    paneThread.appendChild(sourceThread);
    paneComposer.appendChild(sourceComposer);
    sourceComposer.classList.add("d3-composer--pane");
    parked = true;
  }

  function restoreComposer() {
    if (!homeMount) return;
    if (composerBefore && composerBefore.parentNode === homeMount) {
      homeMount.insertBefore(sourceComposer, composerBefore);
      return;
    }
    var brief = homeMount.querySelector(".d1-brief");
    if (brief) homeMount.insertBefore(sourceComposer, brief);
    else homeMount.appendChild(sourceComposer);
  }

  function restoreFromPane() {
    if (!parked) return;
    if (threadMount) threadMount.appendChild(sourceThread);
    restoreComposer();
    sourceComposer.classList.remove("d3-composer--pane");
    if (idleForm) idleForm.hidden = false;
    parked = false;
    if (window.D3Nav) window.D3Nav.markChatIdle();
  }

  function openLeftChat(mode) {
    if (window.D3Nav) {
      if (mode === "kyb") window.D3Nav.openKybChat();
      else if (mode === "kyc" && window.D3Nav.openKycChat) window.D3Nav.openKycChat({ forceActive: true });
      else if (mode === "tx" && window.D3Nav.setChatOpen) {
        window.D3Nav.setChatOpen(true, "tx");
      } else window.D3Nav.goAgents();
    } else {
      shell.setAttribute("data-d3-chat", "open");
    }
    parkIntoPane();
  }

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

  document.addEventListener("d3-view:home", restoreFromPane);
  document.addEventListener("d3-chat:close", function () {
    restoreFromPane();
    if (stage) stage.setAttribute("data-d1-stage", "home");
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

  if (idleForm) {
    function submitIdleForm() {
      var input = idleForm.querySelector("[data-d3-pane-input]");
      var text = input && input.value ? input.value.trim() : "";
      if (!text) return;
      input.value = "";
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
      idleInput.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" || event.shiftKey) return;
        event.preventDefault();
        if (typeof idleForm.requestSubmit === "function") idleForm.requestSubmit();
        else submitIdleForm();
      });
    }
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
