/**
 * Demo 3 — TruAI chat panel entry.
 *
 * Composes parts under ./parts/ (header, prompt-card, composer, askbar).
 * Mounts into [data-d3-ai-panel-mount]. Same DOM contracts as before so
 * shell agents and d3-chat-bridge keep working.
 *
 * Load order (required):
 *   parts/util.js → icons.js → icon-btn.js →
 *   prompt-card.js → composer.js → header.js → askbar.js →
 *   size.js → ai-panel.js
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});
  var parts = ns.parts || {};
  var util = ns.util;

  /** Empty-state suggestion cards per agent context. */
  var PROMPT_SETS = {
    hub: [
      {
        prompt: "Which agent can verify a business",
        agent: "kyb",
        title: "Which agent can verify a business",
        desc: "Run KYB or KYC on a new entity",
      },
      {
        prompt: "Help me investigate ownership",
        agent: "kyb",
        title: "Help me investigate ownership",
        desc: "Find past checks by name or ID",
      },
      {
        prompt: "Explore available demo capabilities",
        agent: "kyb",
        title: "Explore available demo capabilities",
        desc: "Dig into ownership, alerts, and evidence",
      },
    ],
    kyb: [
      {
        prompt: "What information do I need?",
        agent: "kyb",
        title: "What information do I need?",
        desc: "Run KYB or KYC on a new entity",
      },
      {
        prompt: "Which countries are supported?",
        agent: "kyb",
        title: "Which countries are supported",
        desc: "Find past checks by name or ID",
      },
      {
        prompt: "How does verification work?",
        agent: "kyb",
        title: "How does verification work?",
        desc: "Dig into ownership, alerts, and evidence",
      },
    ],
    tx: [
      {
        prompt: "Show declined transactions",
        agent: "tx",
        title: "Show declined transactions",
        desc: "Filter the table to declined results",
      },
      {
        prompt: "Find high-risk transactions",
        agent: "tx",
        title: "Find high-risk transactions",
        desc: "Surface high-risk rows in view",
      },
      {
        prompt: "Summarize recent activity",
        agent: "tx",
        title: "Summarize recent activity",
        desc: "Overview of what’s in the table",
      },
    ],
    kyc: [
      {
        prompt: "Verify Jane Doe",
        agent: "kyc",
        title: "Verify Jane Doe",
        desc: "Check person identity with documents",
      },
      {
        prompt: "Did Jane Doe's document match?",
        agent: "kyc",
        title: "Did Jane Doe’s document match?",
        desc: "Review the KYC document result",
      },
      {
        prompt: "Device intelligence",
        agent: "kyc",
        title: "Device intelligence",
        desc: "Evaluate device risk for this identity",
      },
    ],
    org: [
      {
        prompt: "Invite a new user",
        agent: "org",
        title: "Invite a new user",
        desc: "Open the invite dialog on the right",
      },
      {
        prompt: "Show pending invitations",
        agent: "org",
        title: "Show pending invitations",
        desc: "Switch to the invitations tab",
      },
      {
        prompt: "Show locked accounts",
        agent: "org",
        title: "Show locked accounts",
        desc: "Filter org users to locked status",
      },
    ],
  };

  function requirePart(name) {
    if (!parts[name]) {
      throw new Error(
        "D3AiPanel: missing part \"" +
          name +
          "\". Load components/ai-panel/parts/*.js before ai-panel.js."
      );
    }
    return parts[name];
  }

  function renderEmpty(cfg) {
    var sets = cfg.promptSets || PROMPT_SETS;
    var order = cfg.promptOrder || ["hub", "kyb", "tx", "kyc", "org"];

    return (
      '<div class="d3-chat-pane__empty">' +
      "<div>" +
      '<p class="d3-chat-pane__hello" data-d3-chat-hello>' +
      util.esc(cfg.hello || "What would you like to accomplish?") +
      "</p>" +
      '<p class="d3-chat-pane__sub" data-d3-chat-sub hidden></p>' +
      "</div>" +
      requirePart("promptSets")(sets, order, "hub") +
      "</div>"
    );
  }

  function renderPane(cfg) {
    return (
      '<aside class="d3-chat-pane" id="d3-chat-pane" data-d3-chat-pane aria-label="TruAI chat">' +
      requirePart("header")(cfg) +
      '<div class="d3-chat-pane__body">' +
      renderEmpty(cfg) +
      '<div class="d3-chat-pane__thread" data-d3-chat-thread></div>' +
      requirePart("composer")(cfg) +
      "</div>" +
      '<div class="d3-chat-pane__resize" data-d3-chat-resize role="separator" aria-orientation="vertical" aria-label="Resize chat panel" tabindex="0"></div>' +
      "</aside>"
    );
  }

  /**
   * Replace mountEl with the chat pane; insert askbar after it.
   * @param {Element} mountEl
   * @param {object} [cfg]
   */
  function render(mountEl, cfg) {
    if (!mountEl) throw new Error("D3AiPanel.render: mount element not found");
    cfg = cfg || {};

    var askbarHtml = requirePart("askbar")(cfg);
    // Insert askbar first — outerHTML on the next line detaches mountEl.
    mountEl.insertAdjacentHTML("afterend", askbarHtml);
    mountEl.outerHTML = renderPane(cfg);
    if (typeof ns.bindSizeControls === "function") {
      ns.bindSizeControls();
    }
  }

  function autoMount() {
    var el = document.querySelector("[data-d3-ai-panel-mount]");
    if (!el) return false;
    render(el);
    document.dispatchEvent(new CustomEvent("d3-ai-panel:mounted"));
    return true;
  }

  ns.render = render;
  ns.promptSets = PROMPT_SETS;

  /* Mount synchronously when the mount node is already in the DOM.
     Scripts load at the end of <body>, but readyState is often still
     "loading" — deferring to DOMContentLoaded lets d3-nav / d3-chat-bridge
     cache null refs and leave every panel control dead. */
  if (!autoMount()) {
    document.addEventListener("DOMContentLoaded", autoMount);
  }
})(typeof window !== "undefined" ? window : this);
