/* Demo 3 navigation — home / agents / chat history + left chat pane. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var chatPane = document.querySelector("[data-d3-chat-pane]");
  if (!shell) return;

  var homeBtn = document.querySelector("[data-d3-nav='home']");
  var agentsBtn = document.querySelector("[data-d3-nav='agents']");
  var historyBtn = document.querySelector("[data-d3-nav='history']");
  var messagesBtn = document.querySelector("[data-d3-nav='messages']");
  var closeChat = document.querySelector("[data-d3-chat-close]");
  var badge = document.querySelector("[data-d3-chat-badge]");
  var emptyHello = document.querySelector("[data-d3-chat-hello]");
  var emptySub = document.querySelector("[data-d3-chat-sub]");

  var CHAT_META = {
    hub: {
      badge: "Agent Hub",
      hello: "What would you like to accomplish?",
      sub: "",
      placeholder: "Describe your task or ask about an agent"
    },
    kyb: {
      badge: "KYB Agent",
      hello: "Hi, I’m your KYB Agent.",
      sub: "Let’s find your business.",
      placeholder: "Ask about business verification"
    },
    tx: {
      badge: "Transaction Agent",
      hello: "What would you like to investigate?",
      sub: "Ask about failed checks, reviews, or a specific transaction.",
      placeholder: "Ask about transactions"
    },
    kyc: {
      badge: "KYC Agent",
      hello: "Hi, I’m your KYC Agent.",
      sub: "Let’s verify a person.",
      placeholder: "Ask about identity verification"
    }
  };

  function setActiveNav(view) {
    document.querySelectorAll("[data-d3-nav]").forEach(function (btn) {
      var on = btn.getAttribute("data-d3-nav") === view;
      btn.classList.toggle("is-active", on);
      if (on) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });
  }

  function relayoutDrawer() {
    /* Drawer locks --d1-slot-w in px; refresh after chat pane changes main width. */
    window.requestAnimationFrame(function () {
      window.dispatchEvent(new Event("resize"));
    });
  }

  function setChatOpen(open, mode) {
    shell.setAttribute("data-d3-chat", open ? "open" : "closed");
    mode = mode || "hub";
    var meta = CHAT_META[mode] || CHAT_META.hub;
    if (badge) badge.textContent = meta.badge;
    if (emptyHello) emptyHello.textContent = meta.hello;
    if (emptySub) {
      emptySub.textContent = meta.sub || "";
      emptySub.hidden = !meta.sub;
    }
    shell.setAttribute("data-d3-chat-mode", mode);
    document.querySelectorAll("[data-d3-prompt-set]").forEach(function (set) {
      set.hidden = set.getAttribute("data-d3-prompt-set") !== mode;
    });
    var paneInput = document.querySelector("[data-d3-pane-input]");
    if (paneInput) paneInput.placeholder = meta.placeholder;
    relayoutDrawer();
  }

  function goHome() {
    shell.setAttribute("data-d3-view", "home");
    setChatOpen(false);
    setActiveNav("home");
    var stage = document.querySelector("[data-d1-stage]");
    if (stage) stage.setAttribute("data-d1-stage", "home");
    document.dispatchEvent(new CustomEvent("d3-view:home"));
  }

  function goAgents() {
    shell.setAttribute("data-d3-view", "agents");
    setChatOpen(true, "hub");
    setActiveNav("agents");
    if (chatPane) chatPane.classList.remove("is-active");
    document.dispatchEvent(new CustomEvent("d3-view:agents"));
  }

  function openKybChat(opts) {
    opts = opts || {};
    shell.setAttribute("data-d3-view", "chat");
    setChatOpen(true, "kyb");
    setActiveNav("agents");
    if (chatPane && opts.resume && !opts.forceActive) {
      chatPane.classList.remove("is-active");
    }
    document.dispatchEvent(new CustomEvent("d3-view:kyb", { detail: opts }));
  }

  function openKycChat(opts) {
    opts = opts || {};
    shell.setAttribute("data-d3-view", "chat");
    setChatOpen(true, "kyc");
    setActiveNav("agents");
    if (chatPane && !opts.forceActive) {
      chatPane.classList.remove("is-active");
    }
    document.dispatchEvent(new CustomEvent("d3-view:kyc", { detail: opts }));
  }

  window.D3Nav = {
    goHome: goHome,
    goAgents: goAgents,
    openKybChat: openKybChat,
    openKycChat: openKycChat,
    setChatOpen: setChatOpen,
    markChatActive: function () {
      if (chatPane) chatPane.classList.add("is-active");
    },
    markChatIdle: function () {
      if (chatPane) chatPane.classList.remove("is-active");
    }
  };

  if (homeBtn) homeBtn.addEventListener("click", goHome);
  if (agentsBtn) agentsBtn.addEventListener("click", goAgents);

  if (historyBtn) {
    historyBtn.addEventListener("click", function () {
      if (window.D3Transactions && window.D3Transactions.open) {
        window.D3Transactions.open();
        return;
      }
      /* Fallback: messages flyout. */
      if (messagesBtn) messagesBtn.click();
    });
  }

  function goTransactions() {
    if (window.D3Transactions && window.D3Transactions.open) {
      window.D3Transactions.open();
    }
  }

  window.D3Nav.goTransactions = goTransactions;

  if (closeChat) {
    closeChat.addEventListener("click", function () {
      goHome();
      document.dispatchEvent(new CustomEvent("d3-chat:close"));
    });
  }

  document.querySelectorAll("[data-d3-agent]").forEach(function (card) {
    card.addEventListener("click", function () {
      var agent = card.getAttribute("data-d3-agent") || "kyb";
      var prompt = card.getAttribute("data-prompt") || "";
      /* KYB from Agent hub → left chat + Figma resume/search landing first. */
      if (agent === "kyb") {
        if (window.D3KybResume && window.D3KybResume.openResumeExperience) {
          window.D3KybResume.openResumeExperience();
        } else {
          openKybChat({ resume: true });
        }
        return;
      }
      if (agent === "kyc") {
        openKycChat({ forceActive: false });
        if (prompt) {
          window.setTimeout(function () {
            document.dispatchEvent(new CustomEvent("d3-chat:send", {
              detail: { text: prompt, agent: "kyc" },
              cancelable: true
            }));
          }, 80);
        }
        return;
      }
      openKybChat();
      if (prompt) {
        document.dispatchEvent(new CustomEvent("d3-chat:send", {
          detail: { text: prompt, agent: agent }
        }));
      }
    });
  });

  document.querySelectorAll("[data-d3-prompt]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var prompt = btn.getAttribute("data-d3-prompt") || "";
      var agent = btn.getAttribute("data-agent") || "kyb";
      var onTx = shell.getAttribute("data-d3-view") === "transactions";
      var mode = shell.getAttribute("data-d3-chat-mode") || "hub";
      var onKyb = mode === "kyb";
      var onKyc = mode === "kyc";

      /* Transaction Agent prompts stay on the transactions page. */
      if (onTx || agent === "tx") {
        if (prompt) {
          document.dispatchEvent(new CustomEvent("d3-chat:send", {
            detail: { text: prompt, agent: "tx" },
            cancelable: true
          }));
        }
        return;
      }

      if (agent === "kyb" && !onKyb) {
        /* Find/search prompts go straight to map; otherwise open resume landing. */
        var wantsMap = /^(find|search|verify)\b/i.test(prompt);
        if (wantsMap && window.D3KybResume && window.D3KybResume.openMapExperience) {
          window.D3KybResume.openMapExperience();
        } else if (window.D3KybResume && window.D3KybResume.openResumeExperience) {
          window.D3KybResume.openResumeExperience();
        } else {
          openKybChat({ map: wantsMap });
        }
        if (prompt) {
          window.setTimeout(function () {
            document.dispatchEvent(new CustomEvent("d3-chat:send", {
              detail: { text: prompt, agent: "kyb" },
              cancelable: true
            }));
          }, 80);
        }
        return;
      }

      if (agent === "kyc" && !onKyc) {
        openKycChat();
        if (prompt) {
          window.setTimeout(function () {
            document.dispatchEvent(new CustomEvent("d3-chat:send", {
              detail: { text: prompt, agent: "kyc" },
              cancelable: true
            }));
          }, 80);
        }
        return;
      }

      if (prompt) {
        document.dispatchEvent(new CustomEvent("d3-chat:send", {
          detail: { text: prompt, agent: agent },
          cancelable: true
        }));
      }
    });
  });

  /* Homepage logo / back → home */
  document.querySelectorAll(".d1-logo").forEach(function (logo) {
    logo.addEventListener("click", function (event) {
      event.preventDefault();
      goHome();
    });
  });

  /* Default */
  shell.setAttribute("data-d3-view", "home");
  shell.setAttribute("data-d3-chat", "closed");
  setActiveNav("home");
  forceRepeat();

  function forceRepeat() {
    var home = document.querySelector(".d1-home");
    if (home) home.setAttribute("data-d1-repeat", "true");
  }
})();
