/* Demo 3 navigation — Home / KYB Verification / Transactions / Labs /
   Dev Dashboard (+ left chat pane). Close → floating ask bar (demo-2). */
(function () {
  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  var homeBtn = document.querySelector("[data-d3-nav='home']");
  var kybBtn = document.querySelector("[data-d3-nav='kyb']");
  var labsBtn = document.querySelector("[data-d3-nav='labs']");
  var transactionsBtn = document.querySelector("[data-d3-nav='transactions']");

  /* Panel chrome is mounted by D3AiPanel — always re-query so bind order
     cannot leave close / askbar / prompts with null listeners. */
  function getChatPane() {
    return document.querySelector("[data-d3-chat-pane]");
  }
  function getCloseChat() {
    return document.querySelector("[data-d3-chat-close]");
  }
  function getAskbar() {
    return document.querySelector("[data-d3-askbar]");
  }
  function getAskbarText() {
    return document.querySelector("[data-d3-askbar-text]");
  }
  function getEmptyHello() {
    return document.querySelector("[data-d3-chat-hello]");
  }
  function getEmptySub() {
    return document.querySelector("[data-d3-chat-sub]");
  }

  var CHAT_META = {
    hub: {
      hello: "What would you like to accomplish?",
      sub: "",
      placeholder: "Describe your task or ask about an agent"
    },
    kyb: {
      hello: "Hi, I’m your KYB Agent.",
      sub: "Type a business name and country to get started — for example, “Acme Inc, United States”.",
      placeholder: "Business name and country"
    },
    tx: {
      hello: "What would you like to investigate?",
      sub: "Ask about failed checks, reviews, or a specific transaction.",
      placeholder: "Ask about transactions"
    },
    kyc: {
      hello: "Hi, I’m your KYC Agent.",
      sub: "Let’s verify a person.",
      placeholder: "Ask about identity verification"
    },
    org: {
      hello: "Hi, I’m your Org Admin Agent.",
      sub: "Manage users, roles, and invitations.",
      placeholder: "Ask about users or invitations"
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

  function goOrg() {
    if (window.D3Org && window.D3Org.open) window.D3Org.open();
  }

  function relayoutDrawer() {
    /* Drawer locks --d1-slot-w in px; refresh after chat pane changes main width. */
    window.requestAnimationFrame(function () {
      window.dispatchEvent(new Event("resize"));
    });
  }

  function updateAskbar(mode) {
    var meta = CHAT_META[mode] || CHAT_META.hub;
    var askbarText = getAskbarText();
    var askbar = getAskbar();
    if (askbarText) askbarText.textContent = meta.placeholder;
    if (!askbar) return;
    var open = shell.getAttribute("data-d3-chat") === "open";
    askbar.setAttribute("aria-expanded", String(open));
    askbar.setAttribute("tabindex", open ? "-1" : "0");
    askbar.setAttribute("aria-label", meta.placeholder);
  }

  function setChatOpen(open, mode) {
    mode = mode || shell.getAttribute("data-d3-chat-mode") || "hub";
    shell.setAttribute("data-d3-chat", open ? "open" : "closed");
    var meta = CHAT_META[mode] || CHAT_META.hub;
    var emptyHello = getEmptyHello();
    var emptySub = getEmptySub();
    var closeChat = getCloseChat();
    var pane = getChatPane();
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
    if (closeChat) closeChat.setAttribute("aria-expanded", String(!!open));
    if (pane) pane.setAttribute("aria-hidden", open ? "false" : "true");
    updateAskbar(mode);
    relayoutDrawer();
  }

  function closeChatPanel() {
    var view = shell.getAttribute("data-d3-view") || "home";
    var mode = shell.getAttribute("data-d3-chat-mode") || "hub";
    /* Home already owns the full composer — just close. */
    if (view === "home") {
      setChatOpen(false, mode);
      document.dispatchEvent(new CustomEvent("d3-chat:close", { detail: { toHome: true } }));
      return;
    }
    /* Stay on the current workspace; show the floating ask bar (demo-2). */
    setChatOpen(false, mode);
    document.dispatchEvent(new CustomEvent("d3-chat:close", { detail: { minimized: true } }));
    var askbar = getAskbar();
    if (askbar) {
      window.setTimeout(function () {
        try {
          askbar.focus();
        } catch (e) {}
      }, 280);
    }
  }

  function openChatPanel() {
    var mode = shell.getAttribute("data-d3-chat-mode") || "hub";
    setChatOpen(true, mode);
    document.dispatchEvent(new CustomEvent("d3-chat:open", { detail: { mode: mode } }));
    var closeChat = getCloseChat();
    if (closeChat) {
      window.setTimeout(function () {
        try {
          closeChat.focus();
        } catch (e) {}
      }, 320);
    }
  }

  function goHome() {
    /* Close TruAI + snap drawer shut before home paints — otherwise the
       slot/pane width tween reads as home sections sliding L→R. */
    var pane = getChatPane();
    if (pane) {
      pane.classList.remove("is-active", "d3-motion-pane-in");
    }
    setChatOpen(false, "hub");
    var main = document.querySelector(".d1-main");
    if (main) {
      main.setAttribute("data-d1-drawer", "closed");
      main.style.setProperty("--d1-slot-w", "100%");
      main.style.setProperty("--d1-drawer-w", "0px");
      main.style.setProperty("--d1-drawer-surface-w", "0px");
    }
    document.dispatchEvent(new CustomEvent("d1-drawer:close"));
    shell.setAttribute("data-d3-view", "home");
    setActiveNav("home");
    var stage = document.querySelector("[data-d1-stage]");
    if (stage) stage.setAttribute("data-d1-stage", "home");
    document.dispatchEvent(new CustomEvent("d3-view:home"));
  }

  function goKyb() {
    /* Top-level KYB Verification — search landing + TruAI. */
    if (window.D3KybResume && window.D3KybResume.openResumeExperience) {
      window.D3KybResume.openResumeExperience();
      return;
    }
    openKybChat({ resume: true });
  }

  function goLabs() {
    /* Labs nav → catalog only (no TruAI panel). */
    if (window.D3Labs && window.D3Labs.open) {
      window.D3Labs.open();
      return;
    }
    shell.setAttribute("data-d3-view", "agents");
    setChatOpen(false, "hub");
    setActiveNav("labs");
    var pane = getChatPane();
    if (pane) pane.classList.remove("is-active");
    document.dispatchEvent(new CustomEvent("d3-view:agents"));
  }

  function goTransactions() {
    if (window.D3Transactions && window.D3Transactions.open) {
      window.D3Transactions.open();
      return;
    }
    /* Fallback: stay on Labs rather than opening Chats by accident. */
    goLabs();
  }

  function openKybChat(opts) {
    opts = opts || {};
    shell.setAttribute("data-d3-view", "chat");
    setChatOpen(true, "kyb");
    setActiveNav("kyb");
    var pane = getChatPane();
    if (pane && opts.resume && !opts.forceActive) {
      pane.classList.remove("is-active");
    }
    document.dispatchEvent(new CustomEvent("d3-view:kyb", { detail: opts }));
  }

  function openKycChat(opts) {
    opts = opts || {};
    shell.setAttribute("data-d3-view", "chat");
    setChatOpen(true, "kyc");
    setActiveNav("labs");
    var pane = getChatPane();
    if (pane && !opts.forceActive) {
      pane.classList.remove("is-active");
    }
    document.dispatchEvent(new CustomEvent("d3-view:kyc", { detail: opts }));
  }

  function handlePromptClick(btn) {
    var prompt = btn.getAttribute("data-d3-prompt") || "";
    var agent = btn.getAttribute("data-agent") || "kyb";
    var onTx = shell.getAttribute("data-d3-view") === "transactions";
    var onOrg = shell.getAttribute("data-d3-view") === "org";
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

    if (onOrg || agent === "org") {
      /* Org Admin is workspace-only — no TruAI panel. */
      if (!onOrg) goOrg();
      return;
    }

    if (agent === "kyb" && !onKyb) {
      /* Search landing is the default KYB entry; map only for find/search/verify cues. */
      var wantsMap = /^(find|search|verify)\b/i.test(prompt);
      if (wantsMap && window.D3KybResume && window.D3KybResume.openMapExperience) {
        window.D3KybResume.openMapExperience();
      } else if (window.D3KybResume && window.D3KybResume.openResumeExperience) {
        window.D3KybResume.openResumeExperience();
      } else {
        openKybChat({ map: wantsMap, resume: !wantsMap });
      }
      return;
    }

    if (agent === "kyc" && !onKyc) {
      openKycChat();
      return;
    }

    /* Already in the agent — real follow-up prompts still go to chat. */
    if (prompt) {
      document.dispatchEvent(new CustomEvent("d3-chat:send", {
        detail: { text: prompt, agent: agent },
        cancelable: true
      }));
    }
  }

  window.D3Nav = {
    goHome: goHome,
    goKyb: goKyb,
    goLabs: goLabs,
    goAgents: goLabs,
    goOrg: goOrg,
    goTransactions: goTransactions,
    openKybChat: openKybChat,
    openKycChat: openKycChat,
    setChatOpen: setChatOpen,
    closeChatPanel: closeChatPanel,
    openChatPanel: openChatPanel,
    setActiveNav: setActiveNav,
    markChatActive: function () {
      var pane = getChatPane();
      if (pane) pane.classList.add("is-active");
    },
    markChatIdle: function () {
      var pane = getChatPane();
      if (pane) pane.classList.remove("is-active");
    }
  };

  if (homeBtn) homeBtn.addEventListener("click", goHome);
  if (kybBtn) kybBtn.addEventListener("click", goKyb);
  if (labsBtn) labsBtn.addEventListener("click", goLabs);
  if (transactionsBtn) transactionsBtn.addEventListener("click", goTransactions);

  /* Placeholder rail items — visible only, no view switch. */
  document.querySelectorAll("[data-d3-nav-placeholder]").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });

  /* Event delegation — works even if D3AiPanel mounts after this script. */
  document.addEventListener("click", function (event) {
    var t = event.target;
    if (!t || !t.closest) return;
    if (t.closest("[data-d3-chat-close]")) {
      closeChatPanel();
      return;
    }
    if (t.closest("[data-d3-askbar]")) {
      openChatPanel();
      return;
    }
    var promptBtn = t.closest("[data-d3-prompt]");
    if (promptBtn) handlePromptClick(promptBtn);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (shell.getAttribute("data-d3-chat") !== "open") return;
    /* Don't steal Escape from open menus / dialogs. */
    if (document.querySelector(".tds-select--open, .tds-combobox--open, [role='dialog']:not([hidden])")) {
      return;
    }
    closeChatPanel();
  });

  /* Homepage logo / back → home */
  document.querySelectorAll(".d1-logo").forEach(function (logo) {
    logo.addEventListener("click", function (event) {
      event.preventDefault();
      goHome();
    });
  });

  /* Default portal landing. Lab pages set data-d3-lab and own their initial view/chat. */
  if (!shell.hasAttribute("data-d3-lab")) {
    shell.setAttribute("data-d3-view", "home");
    shell.setAttribute("data-d3-chat", "closed");
    setActiveNav("home");
  } else {
    var labMode = shell.getAttribute("data-d3-chat-mode") || "kyb";
    var labOpen = shell.getAttribute("data-d3-chat") !== "closed";
    setChatOpen(labOpen, labMode);
  }
  forceRepeat();

  function forceRepeat() {
    var home = document.querySelector(".d1-home");
    if (home) home.setAttribute("data-d1-repeat", "true");
  }
})();
