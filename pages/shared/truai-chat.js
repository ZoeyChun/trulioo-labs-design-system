/**
 * TruAI chat — vanilla JS panel for static labs pages (KYB Results, Document Verification, …).
 */
(function () {
  "use strict";

  var PANEL_WIDTH = 388;
  var TRUAI_ICON =
    '<svg viewBox="0 0 12.375 12.375" fill="none" aria-hidden="true"><path d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586Z" fill="currentColor"/></svg>';

  var AI_TAG =
    '<span class="tds-ai-tag tds-ai-tag--md"><span class="tds-ai-tag__icon" aria-hidden="true">' +
    TRUAI_ICON +
    '</span><span class="tds-ai-tag__label">TruAI</span></span>';

  var state = {
    open: false,
    activePrompt: null,
    phase: "idle",
    response: null,
    timers: [],
    streamInterval: null,
    headlineIndex: 0,
    headlineTimer: null,
  };

  var els = {};

  function schedule(fn, delay) {
    var id = window.setTimeout(fn, delay);
    state.timers.push(id);
    return id;
  }

  function clearTimers() {
    state.timers.forEach(function (id) {
      window.clearTimeout(id);
    });
    state.timers = [];
    if (state.streamInterval) {
      window.clearInterval(state.streamInterval);
      state.streamInterval = null;
    }
  }

  function resetChat() {
    clearTimers();
    state.activePrompt = null;
    state.phase = "idle";
    state.response = null;
    renderConversation();
    renderPrompts();
    renderIntro(true);
  }

  function navigateTab(tabId) {
    if (window.KybResults && typeof window.KybResults.setActiveTab === "function") {
      window.KybResults.setActiveTab(tabId);
      return;
    }
    var kybTab = document.querySelector('.tds-tab-item[data-kyb-tab="' + tabId + '"]');
    if (kybTab) {
      kybTab.click();
      return;
    }
    var dvTab =
      document.querySelector('[role="tab"][data-tab="' + tabId + '"]') ||
      document.querySelector('.dv-tab[data-tab="' + tabId + '"]');
    if (dvTab) dvTab.click();
  }

  function collapseSidebarIfOpen() {
    var columns =
      document.getElementById("kyb-columns") ||
      document.getElementById("dv-columns") ||
      document.getElementById("bv-result-columns") ||
      document.getElementById("eid-result-columns");
    if (!columns || columns.classList.contains("dv-columns--sidebar-collapsed")) return;
    var btn = columns.querySelector(".dv-sidebar-toggle--collapse");
    if (btn) btn.click();
  }

  function toggleButtons() {
    return document.querySelectorAll("[data-truai-toggle], #app-truai-btn");
  }

  function syncToggleButtons(next) {
    toggleButtons().forEach(function (btn) {
      btn.classList.toggle("app-truai-btn--active", next);
      btn.setAttribute("aria-expanded", next ? "true" : "false");
    });
  }

  function badgeClass(tone) {
    if (tone === "negative") return "tds-tag tds-tag--sm tds-tag--negative";
    if (tone === "intermediate") return "tds-tag tds-tag--sm tds-tag--intermediate";
    if (tone === "positive") return "tds-tag tds-tag--sm tds-tag--positive";
    return "tds-tag tds-tag--sm tds-tag--default";
  }

  function scoreToneClass(tone) {
    if (tone === "high") return "labs-truai-score--high";
    if (tone === "medium") return "labs-truai-score--medium";
    if (tone === "low") return "labs-truai-score--low";
    return "";
  }

  function compactHeroValue(value) {
    return value.length > 5 || /[a-z£]/i.test(value);
  }

  function renderDriver(driver) {
    return (
      '<li class="labs-truai-driver">' +
      '<div class="labs-truai-driver__head">' +
      '<span class="labs-truai-driver__title">' +
      driver.title +
      "</span>" +
      (driver.badge ? '<span class="' + badgeClass(driver.badgeTone) + '">' + driver.badge + "</span>" : "") +
      "</div>" +
      '<p class="labs-truai-driver__detail">' +
      driver.detail +
      "</p></li>"
    );
  }

  function renderRichBody(response) {
    var hero = response.hero;
    var compact = compactHeroValue(hero.value);
    var findings = response.findings
      .map(function (f) {
        return "<li>" + f + "</li>";
      })
      .join("");
    var drivers = response.drivers.map(renderDriver).join("");

    return (
      '<div class="labs-truai-rich-body">' +
      '<div class="labs-truai-score ' +
      scoreToneClass(hero.tone) +
      '">' +
      '<div class="labs-truai-score__value-wrap">' +
      '<span class="labs-truai-score__value' +
      (compact ? " labs-truai-score__value--compact" : "") +
      '">' +
      hero.value +
      "</span>" +
      '<span class="labs-truai-score__label">' +
      hero.label +
      "</span></div>" +
      (hero.meta && hero.meta.length
        ? '<div class="labs-truai-score__meta">' +
          hero.meta
            .map(function (m) {
              return '<span class="labs-truai-score__meta-item">' + m + "</span>";
            })
            .join("") +
          "</div>"
        : "") +
      "</div>" +
      '<section class="labs-truai-section"><h3 class="labs-truai-section__title">' +
      response.driversTitle +
      '</h3><ul class="labs-truai-drivers">' +
      drivers +
      "</ul></section>" +
      '<section class="labs-truai-section"><h3 class="labs-truai-section__title">' +
      response.findingsTitle +
      '</h3><ul class="labs-truai-findings">' +
      findings +
      "</ul></section>" +
      '<div class="labs-truai-actions">' +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--lg labs-truai-primary-action" data-truai-tab="' +
      response.primaryAction.tab +
      '">' +
      response.primaryAction.label +
      "</button>" +
      (response.secondaryAction
        ? '<button type="button" class="tds-btn tds-btn--secondary tds-btn--lg labs-truai-secondary-action" data-truai-tab="' +
          response.secondaryAction.tab +
          '">' +
          response.secondaryAction.label +
          "</button>"
        : "") +
      "</div></div>"
    );
  }

  function scrollToBottom() {
    if (!els.scroll) return;
    els.scroll.scrollTo({ top: els.scroll.scrollHeight, behavior: "smooth" });
  }

  function startStreaming(response) {
    if (!els.lead) return;
    var text = response.summary;
    var index = 0;
    els.lead.textContent = "";
    els.cursor.style.display = "inline-block";

    state.streamInterval = window.setInterval(function () {
      index += 1;
      els.lead.textContent = text.slice(0, index);
      scrollToBottom();
      if (index >= text.length) {
        window.clearInterval(state.streamInterval);
        state.streamInterval = null;
        els.cursor.style.display = "none";
        schedule(function () {
          state.phase = "complete";
          renderConversation();
        }, 120);
      }
    }, 14);
  }

  function renderConversation() {
    if (!els.conversation) return;

    if (!state.activePrompt) {
      els.conversation.innerHTML = "";
      els.conversation.hidden = true;
      return;
    }

    els.conversation.hidden = false;
    var response = state.response;
    var thinking =
      state.phase === "thinking"
        ? '<div class="labs-truai-thinking">' +
          '<span class="labs-truai-thinking__icon">' +
          TRUAI_ICON +
          "</span>" +
          '<span class="labs-truai-thinking__spinner" aria-hidden="true"></span>' +
          '<span class="labs-truai-thinking__text">' +
          (response ? response.thinkingLabel : "Analyzing…") +
          "</span></div>"
        : "";

    var responseBlock = "";
    if (response && (state.phase === "streaming" || state.phase === "complete")) {
      responseBlock =
        '<div class="labs-truai-response-block labs-truai-response-block--rich">' +
        '<div class="labs-truai-response labs-truai-response--rich">' +
        '<p class="labs-truai-source-count"><span class="labs-truai-source-count__dot" aria-hidden="true"></span>' +
        response.sourceLabel +
        "</p>" +
        '<p class="labs-truai-response__lead"></p>' +
        '<span class="labs-truai-response__cursor" style="display:none" aria-hidden="true"></span>' +
        (state.phase === "complete" ? renderRichBody(response) : '<div class="labs-truai-rich-body" hidden></div>') +
        "</div></div>";
    }

    els.conversation.innerHTML =
      '<div class="labs-truai-user-bubble"><p>' + state.activePrompt + "</p></div>" + thinking + responseBlock;

    els.lead = els.conversation.querySelector(".labs-truai-response__lead");
    els.cursor = els.conversation.querySelector(".labs-truai-response__cursor");

    els.conversation.querySelectorAll("[data-truai-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        navigateTab(btn.getAttribute("data-truai-tab"));
      });
    });

    if (state.phase === "streaming" && response) {
      startStreaming(response);
    }

    scrollToBottom();
  }

  function renderPrompts() {
    if (!els.prompts) return;
    var show = state.open && !state.activePrompt;
    els.prompts.hidden = !show;
    if (!show) return;

    els.prompts.innerHTML = window.TruAIResponses.defaultPrompts
      .map(function (prompt) {
        return (
          '<button type="button" class="labs-truai-prompt" data-truai-prompt="' +
          prompt +
          '"' +
          (state.phase !== "idle" ? " disabled" : "") +
          '><span class="labs-truai-prompt__icon">' +
          TRUAI_ICON +
          "</span>" +
          prompt +
          "</button>"
        );
      })
      .join("");

    els.prompts.querySelectorAll("[data-truai-prompt]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        handlePromptClick(btn.getAttribute("data-truai-prompt"));
      });
    });
  }

  function renderIntro(visible) {
    if (!els.intro) return;
    els.intro.hidden = !visible || !!state.activePrompt;
  }

  function handlePromptClick(prompt) {
    if (state.phase !== "idle") return;

    state.activePrompt = prompt;
    state.response = window.TruAIResponses.buildTruAIResponse(prompt);
    state.phase = "user-sent";

    renderIntro(false);
    renderPrompts();
    renderConversation();

    schedule(function () {
      state.phase = "thinking";
      renderConversation();
    }, 450);

    schedule(function () {
      state.phase = "streaming";
      renderConversation();
    }, 1550);
  }

  function ask(prompt, options) {
    if (!prompt) return;
    options = options || {};
    if (state.phase !== "idle") resetChat();
    if (!state.open) {
      setOpen(true, { collapseSidebar: options.collapseSidebar === true });
    }
    handlePromptClick(prompt);
  }

  function setOpen(next, options) {
    options = options || {};
    state.open = next;
    var layout = document.getElementById("labs-kyb-layout");
    if (layout) layout.classList.toggle("labs-kyb-layout--chat-open", next);

    if (els.rail) els.rail.setAttribute("aria-hidden", next ? "false" : "true");
    if (els.overlay) els.overlay.classList.toggle("labs-truai-overlay--visible", next);

    syncToggleButtons(next);

    if (next) {
      if (options.collapseSidebar !== false) collapseSidebarIfOpen();
      renderPrompts();
      renderIntro(true);
      startHeadline();
    } else {
      resetChat();
      stopHeadline();
    }
  }

  function openChat() {
    setOpen(true);
  }

  function closeChat() {
    setOpen(false);
  }

  function toggleChat() {
    setOpen(!state.open);
  }

  function startHeadline() {
    stopHeadline();
    if (!els.topic || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    state.headlineTimer = window.setInterval(function () {
      var topics = window.TruAIResponses.headlineTopics;
      state.headlineIndex = (state.headlineIndex + 1) % topics.length;
      els.topic.classList.add("labs-truai-headline__topic--exit");
      schedule(function () {
        els.topic.textContent = topics[state.headlineIndex];
        els.topic.classList.remove("labs-truai-headline__topic--exit");
        els.topic.classList.add("labs-truai-headline__topic--enter");
      }, 180);
    }, 2800);
  }

  function stopHeadline() {
    if (state.headlineTimer) {
      window.clearInterval(state.headlineTimer);
      state.headlineTimer = null;
    }
  }

  function composerPlaceholder() {
    if (window.TruAIResponses && window.TruAIResponses.composerPlaceholder) {
      return window.TruAIResponses.composerPlaceholder;
    }
    return "Ask about this entity...";
  }

  function panelMarkup() {
    return (
      '<div class="labs-truai-panel" role="complementary" aria-label="TruAI chat">' +
      '<div class="labs-truai-panel__header">' +
      AI_TAG +
      '<button type="button" class="labs-truai-panel__close" aria-label="Close chat">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke-linecap="round"/></svg>' +
      "</button></div>" +
      '<div class="labs-truai-panel__intro">' +
      '<div class="labs-truai-headline">' +
      '<p class="labs-truai-headline__text labs-truai-headline__line">Ask TruAI</p>' +
      '<p class="labs-truai-headline__text labs-truai-headline__line">anything about</p>' +
      '<div class="labs-truai-headline__topic-slot">' +
      '<span class="labs-truai-headline__topic labs-truai-headline__text labs-truai-headline__topic--enter">' +
      window.TruAIResponses.headlineTopics[0] +
      "</span></div></div></div>" +
      '<div class="labs-truai-panel__body">' +
      '<div class="labs-truai-panel__scroll"></div>' +
      '<div class="labs-truai-panel__prompts"></div>' +
      '<div class="labs-truai-composer-wrap">' +
      '<div class="labs-truai-composer">' +
      '<div class="labs-truai-composer__input-row">' +
      '<div class="labs-truai-composer__field">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.25"/><path d="M10.5 10.5 14 14" stroke-linecap="round"/></svg>' +
      '<input type="text" placeholder="' +
      composerPlaceholder() +
      '" aria-label="' +
      composerPlaceholder() +
      '" />' +
      "</div>" +
      '<button type="button" class="labs-truai-composer__send" aria-label="Send message">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 14V2M8 2 4 6M8 2l4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      "</button></div>" +
      '<div class="labs-truai-composer__footer"><span>TruAI can make mistakes. Verify important information.</span></div>' +
      "</div></div></div></div>"
    );
  }

  function bindPanel(root) {
    els.scroll = root.querySelector(".labs-truai-panel__scroll");
    els.conversation = document.createElement("div");
    els.conversation.className = "labs-truai-conversation";
    els.conversation.hidden = true;
    els.scroll.appendChild(els.conversation);

    els.intro = root.querySelector(".labs-truai-panel__intro");
    els.prompts = root.querySelector(".labs-truai-panel__prompts");
    els.topic = root.querySelector(".labs-truai-headline__topic");

    root.querySelector(".labs-truai-panel__close").addEventListener("click", closeChat);
  }

  function injectShell() {
    var layout = document.getElementById("labs-kyb-layout");
    if (!layout) return;

    var rail = document.createElement("div");
    rail.className = "labs-truai-chat-rail";
    rail.id = "labs-truai-chat-rail";
    rail.setAttribute("aria-hidden", "true");
    rail.innerHTML =
      '<div class="labs-truai-chat-rail__inner" style="width:' +
      PANEL_WIDTH +
      'px"><div class="labs-truai-chat-rail__panel">' +
      panelMarkup() +
      "</div></div>";
    layout.appendChild(rail);
    els.rail = rail;
    bindPanel(rail);

    var overlay = document.createElement("button");
    overlay.type = "button";
    overlay.className = "labs-truai-overlay";
    overlay.setAttribute("aria-label", "Close TruAI chat");
    overlay.addEventListener("click", closeChat);
    document.body.appendChild(overlay);
    els.overlay = overlay;
  }

  function init() {
    if (!window.TruAIResponses) return;

    injectShell();

    toggleButtons().forEach(function (btn) {
      btn.setAttribute("aria-controls", "labs-truai-chat-rail");
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", toggleChat);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && state.open) closeChat();
    });

    renderPrompts();
    renderIntro(false);

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || !target.closest) return;
      var btn = target.closest("[data-truai-prompt]");
      if (!btn) return;
      if (btn.closest(".labs-truai-prompts") || btn.closest(".labs-truai-panel")) return;
      event.preventDefault();
      ask(btn.getAttribute("data-truai-prompt"));
    });
  }

  window.TruAIChat = { open: openChat, close: closeChat, toggle: toggleChat, ask: ask };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
