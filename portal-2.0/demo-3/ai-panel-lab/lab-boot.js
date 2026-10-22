/* Demo 3 — AI panel lab bootstrap.
   No auth gate. Opens KYB chat by default, wires Meridian prompts,
   and builds a labeled component gallery beside the live panel. */
(function () {
  "use strict";

  document.body.classList.add("d1-app-ready", "d3-ai-panel-lab");

  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  function parts() {
    return (window.D3AiPanel && window.D3AiPanel.parts) || {};
  }

  function icons() {
    return (window.D3AiPanel && window.D3AiPanel.icons) || {};
  }

  function openLabKyb() {
    if (window.D3Nav && typeof window.D3Nav.openKybChat === "function") {
      window.D3Nav.openKybChat({ resume: true });
    } else {
      shell.setAttribute("data-d3-view", "chat");
      shell.setAttribute("data-d3-chat", "open");
      shell.setAttribute("data-d3-chat-mode", "kyb");
    }
    /* Docked like demo-3 — leave full-canvas off until user hits expand. */
    shell.removeAttribute("data-d3-chat-size");
  }

  /** Swap KYB empty-state cards to Meridian demo starters. */
  function seedMeridianPrompts() {
    var set = document.querySelector('[data-d3-prompt-set="kyb"]');
    if (!set) return;
    var cards = [
      {
        prompt: "Verify Meridian",
        agent: "kyb",
        title: "Verify Meridian",
        desc: "Start the KYB Meridian search → country → results flow"
      },
      {
        prompt: "Find Meridian, United States",
        agent: "kyb",
        title: "Find Meridian, United States",
        desc: "Skip country ask and list US Meridian matches"
      },
      {
        prompt: "Verify Meridian Capital LLC",
        agent: "kyb",
        title: "Verify Meridian Capital LLC",
        desc: "Jump to confirm for a known demo entity"
      }
    ];
    var render = parts().promptCard;
    if (typeof render === "function") {
      set.innerHTML = cards.map(render).join("");
    } else {
      set.innerHTML = cards
        .map(function (c) {
          return (
            '<button type="button" class="d3-prompt-card" data-d3-prompt="' +
            c.prompt.replace(/"/g, "&quot;") +
            '" data-agent="kyb"><span class="d3-prompt-card__text"><span class="d3-prompt-card__title">' +
            c.title +
            '</span><span class="d3-prompt-card__desc">' +
            c.desc +
            "</span></span></button>"
          );
        })
        .join("");
    }
    set.hidden = false;
  }

  function focusPaneInput() {
    var input =
      document.querySelector(".d3-lab-live [data-d3-pane-input]") ||
      document.querySelector("[data-d3-pane-input]");
    if (!input) return;
    try {
      input.focus({ preventScroll: true });
    } catch (e) {
      try {
        input.focus();
      } catch (e2) {}
    }
  }

  /**
   * Strip ids / shell data-attrs so gallery specimens never win querySelector
   * against the live panel (d3-nav, map-search, chat-bridge).
   */
  function sterilizeHtml(html) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    wrap.querySelectorAll("[id]").forEach(function (el) {
      el.removeAttribute("id");
    });
    wrap.querySelectorAll("*").forEach(function (el) {
      Array.prototype.slice.call(el.attributes).forEach(function (attr) {
        var name = attr.name;
        if (
          name.indexOf("data-d3-") === 0 ||
          name.indexOf("data-d1-") === 0 ||
          name === "data-agent" ||
          name === "name" ||
          name === "for"
        ) {
          el.removeAttribute(name);
        }
      });
      if (el.tagName === "BUTTON" || el.tagName === "A") {
        el.setAttribute("tabindex", "-1");
        el.setAttribute("aria-disabled", "true");
      }
      if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
        el.setAttribute("tabindex", "-1");
        el.setAttribute("readonly", "");
      }
    });
    return wrap.innerHTML;
  }

  function section(label, bodyHtml, sectionClass) {
    return (
      '<section class="d3-lab-gallery__section' +
      (sectionClass ? " " + sectionClass : "") +
      '">' +
      '<h3 class="d3-lab-gallery__label">' +
      label +
      "</h3>" +
      '<div class="d3-lab-gallery__frame">' +
      bodyHtml +
      "</div></section>"
    );
  }

  function cloneTpl(name, fillFn) {
    var tpl = document.querySelector('[data-d1-tpl="' + name + '"]');
    if (!tpl || !tpl.content) return "";
    var frag = tpl.content.cloneNode(true);
    if (typeof fillFn === "function") fillFn(frag);
    var wrap = document.createElement("div");
    wrap.appendChild(frag);
    return sterilizeHtml(wrap.innerHTML);
  }

  function setText(root, sel, text) {
    var el = root.querySelector(sel);
    if (el) el.textContent = text;
  }

  function buildGallery() {
    var host = document.querySelector("[data-d3-lab-gallery]");
    if (!host || host.getAttribute("data-ready") === "1") return;
    var p = parts();
    var ic = icons();
    if (typeof p.header !== "function") return;

    var headerWrap = document.createElement("div");
    headerWrap.innerHTML = sterilizeHtml(p.header({ brand: "TruAI" }));
    /* Unhide back in the specimen so the full header chrome is visible. */
    headerWrap.querySelectorAll(".d3-chat-pane__back[hidden]").forEach(function (el) {
      el.removeAttribute("hidden");
    });
    var headerHtml = headerWrap.innerHTML;

    var cardsHtml = "";
    if (typeof p.promptCard === "function") {
      cardsHtml =
        '<div class="d3-lab-gallery__stack">' +
        [
          {
            prompt: "Verify Meridian",
            agent: "kyb",
            title: "Verify Meridian",
            desc: "Start the KYB Meridian search → country → results flow"
          },
          {
            prompt: "Which countries are supported?",
            agent: "kyb",
            title: "Which countries are supported?",
            desc: "Jurisdictions available for business verification"
          }
        ]
          .map(p.promptCard)
          .map(sterilizeHtml)
          .join("") +
        "</div>";
    }

    var composerHtml =
      typeof p.composer === "function"
        ? sterilizeHtml(
            p.composer({
              placeholder: "Describe your task or ask about an agent"
            })
          )
        : "";

    var askbarHtml =
      typeof p.askbar === "function"
        ? sterilizeHtml(
            p.askbar({ askbarText: "Ask about business verification" })
          )
        : "";

    var iconRow = "";
    if (typeof p.iconBtn === "function" && ic.back) {
      iconRow =
        '<div class="d3-lab-gallery__icon-row">' +
        sterilizeHtml(
          p.iconBtn({
            icon: ic.back,
            label: "Back",
            className: "tds-icon-btn--invisible"
          })
        ) +
        sterilizeHtml(
          p.iconBtn({
            icon: ic.expand,
            label: "Expand",
            className: "tds-icon-btn--invisible"
          })
        ) +
        sterilizeHtml(
          p.iconBtn({
            icon: ic.close,
            label: "Close",
            className: "tds-icon-btn--invisible"
          })
        ) +
        sterilizeHtml(
          p.iconBtn({
            icon: ic.send,
            label: "Send",
            className: "tds-icon-btn--secondary tds-icon-btn--circular"
          })
        ) +
        "</div>";
    }

    var userHtml = cloneTpl("user", function (root) {
      setText(root, ".d1-user p", "Verify Meridian");
    });

    var aiHtml = cloneTpl("ai", function (root) {
      var ai = root.querySelector(".d1-ai");
      if (ai) {
        ai.innerHTML =
          "<p>I found several businesses matching <strong>Meridian</strong>. Which country should I search?</p>";
      }
    });

    var thinkingHtml = cloneTpl("typing", function (root) {
      setText(root, "[data-d1-thinking-label]", "Thinking…");
    });

    var progressHtml = cloneTpl("tools", function (root) {
      setText(root, "[data-d1-tools-label]", "Investigating");
      setText(root, ".d1-progress__pct", "42%");
      var fill = root.querySelector(".d1-progress__fill");
      if (fill) fill.style.width = "42%";
    });

    var activityHtml = cloneTpl("activity", function (root) {
      setText(root, "[data-d1-activity-label]", "Searching registries");
      setText(
        root,
        "[data-d1-activity-detail]",
        "Querying United States business registries for Meridian…"
      );
    });

    var confirmHtml = cloneTpl("confirm", function (root) {
      setText(root, "[data-d1-confirm-action]", "Confirm this business?");
      setText(
        root,
        "[data-d1-confirm-detail]",
        "Meridian Capital LLC · United States · Active"
      );
    });

    var analysisHtml = cloneTpl("analysis", function (root) {
      setText(root, "[data-d1-analysis-title]", "Match signals");
      var rows = root.querySelector("[data-d1-analysis-rows]");
      if (rows) {
        rows.innerHTML =
          "<p><strong>Name</strong> — Strong match</p>" +
          "<p><strong>Address</strong> — Partial match</p>" +
          "<p><strong>Registration</strong> — Verified</p>";
      }
    });

    var reportHtml = cloneTpl("report", function (root) {
      setText(root, "[data-d1-co]", "Meridian Apex Consulting Ltd.");
      setText(root, "[data-d1-report-tag]", "Verified");
      setText(
        root,
        "[data-d1-sum-a]",
        "This entity is active and matches the requested legal name and jurisdiction."
      );
    });

    function wide(label, body) {
      return section(label, body, "d3-lab-gallery__section--wide");
    }

    host.innerHTML =
      '<div class="d3-lab-gallery__intro">' +
      '<p class="d3-lab-gallery__title">Component overview</p>' +
      '<p class="d3-lab-gallery__hint">Left panel matches demo-3 size (resize / fullscreen / minimize). Specimens below use the same <code>components/ai-panel</code> parts + chat templates.</p>' +
      "</div>" +
      '<div class="d3-lab-gallery__grid">' +
      section("Header", headerHtml) +
      (iconRow ? section("Icon buttons", iconRow) : "") +
      (cardsHtml ? section("Prompt cards", cardsHtml) : "") +
      (composerHtml ? section("Composer (idle)", composerHtml) : "") +
      (userHtml ? section("User message", userHtml) : "") +
      (aiHtml ? section("AI response", aiHtml) : "") +
      (thinkingHtml ? section("Thinking / loader", thinkingHtml) : "") +
      (progressHtml ? section("Progress", progressHtml) : "") +
      (activityHtml ? section("Activity step", activityHtml) : "") +
      (confirmHtml ? section("Confirm", confirmHtml) : "") +
      (analysisHtml ? section("Analysis card", analysisHtml) : "") +
      (reportHtml ? wide("Report card", reportHtml) : "") +
      (askbarHtml ? wide("Askbar", askbarHtml) : "") +
      "</div>";

    host.setAttribute("data-ready", "1");
  }

  openLabKyb();
  seedMeridianPrompts();
  buildGallery();
  window.requestAnimationFrame(function () {
    openLabKyb();
    seedMeridianPrompts();
    buildGallery();
    focusPaneInput();
  });
})();
