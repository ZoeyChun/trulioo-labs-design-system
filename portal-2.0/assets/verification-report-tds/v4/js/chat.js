/* Verification Module V4 — TruAI chat bridge to visual board cards. */
(function (global) {
  "use strict";

  var shell = document.querySelector(".d1-shell");
  var pane = document.getElementById("v4-chat-pane");
  var empty = document.querySelector(".d3-chat-pane__empty");
  var thread = document.querySelector("[data-v4-chat-thread]");
  var form = document.querySelector("[data-v4-chat-form]");
  var input = document.querySelector("[data-v4-chat-input]");
  var reportApi = null;
  var turn = null;

  var CARD_LABELS =
    (global.VerificationReportV4 && global.VerificationReportV4.cardLabels) || {
      overview: "Summary",
      ownership: "Ownership",
      signals: "Risk Signals",
      match: "Match Signals",
      web: "Web & Social Insights"
    };

  function ensureTurn() {
    if (!thread) return null;
    if (!turn) {
      turn = document.createElement("div");
      turn.className = "d1-thread";
      thread.appendChild(turn);
    }
    return turn;
  }

  function showThread() {
    if (pane) pane.classList.add("is-active");
    if (empty) empty.hidden = true;
    if (thread) thread.hidden = false;
    ensureTurn();
  }

  /* "New verification" puts the pane back to its opening state. */
  function resetThread() {
    turn = null;
    if (thread) {
      thread.innerHTML = "";
      thread.hidden = true;
    }
    if (empty) empty.hidden = false;
    if (pane) pane.classList.remove("is-active");
  }

  function appendUser(text) {
    var host = ensureTurn();
    if (!host) return;
    var row = document.createElement("div");
    row.className = "d1-user";
    row.innerHTML = "<p></p>";
    row.querySelector("p").textContent = text;
    host.appendChild(row);
    if (thread) thread.scrollTop = thread.scrollHeight;
  }

  function appendAssistant(html, cardIds) {
    var host = ensureTurn();
    if (!host) return;
    var row = document.createElement("div");
    row.className = "d1-turn";
    var refs = "";
    if (cardIds && cardIds.length) {
      refs =
        '<div class="v4-msg-refs">' +
        cardIds
          .map(function (id) {
            return (
              '<button type="button" class="v4-chat-ref" data-v4-ref="' +
              id +
              '"><span class="v4-chat-ref__mark" aria-hidden="true"></span>' +
              (CARD_LABELS[id] || id) +
              "</button>"
            );
          })
          .join("") +
        "</div>";
    }
    row.innerHTML = '<div class="d1-ai">' + html + refs + "</div>";
    host.appendChild(row);
    if (thread) thread.scrollTop = thread.scrollHeight;
  }

  function highlightRefs(activeId) {
    document.querySelectorAll("[data-v4-ref]").forEach(function (btn) {
      if (btn.getAttribute("data-v4-ref") === activeId) {
        btn.setAttribute("aria-current", "true");
      } else {
        btn.removeAttribute("aria-current");
      }
    });
  }

  function sample() {
    var kyb =
      global.VerificationReport &&
      global.VerificationReport.products &&
      global.VerificationReport.products.kyb;
    if (kyb && typeof kyb.sampleData === "function") return kyb.sampleData();
    return null;
  }

  function escHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function respond(text) {
    var q = String(text || "").toLowerCase();
    var data = sample() || {};
    var overview = data.overview || {};
    var officer = data.officer || {};
    var ownership = data.ownership || [];
    var graph = data.ownershipGraph || {};
    var root = (graph.tree && graph.tree.details) || {};
    var name = data.name || "this business";
    showThread();

    if (/verify|meridian|kyb|business|overview|summarize|status|verified|decision|why|next/.test(q)) {
      appendAssistant(
        "<p><strong>" +
          escHtml(name) +
          "</strong> is <strong>" +
          escHtml(data.riskLabel || (data.verified ? "Verified" : "Review")) +
          "</strong> (" +
          escHtml(overview.regNumber || "—") +
          "). Start with Summary, then Ownership for control risk.</p>",
        ["overview", "ownership"]
      );
      if (reportApi) reportApi.goToCard("overview");
      return;
    }

    if (/owner|ubo|shareholder|beneficial|control|risk|finding|flag|shell/.test(q)) {
      var ownerLine = ownership
        .map(function (o) {
          return (
            "<strong>" +
            escHtml(o.name) +
            " (" +
            escHtml(o.pct || "—") +
            ")</strong>"
          );
        })
        .join(" and ");
      appendAssistant(
        "<p>Ownership resolves to " +
          (ownerLine || "the parties on file") +
          ". " +
          escHtml(root.truai || "Review the ownership graph.") +
          "</p>",
        ["ownership", "overview"]
      );
      if (reportApi) reportApi.goToCard("ownership");
      return;
    }

    if (/risk signal|screening|high risk|category score/.test(q)) {
      appendAssistant(
        "<p>Risk Signals for <strong>" +
          escHtml(name) +
          "</strong> cover category scores and screening checks driving the overall risk band.</p>",
        ["signals", "overview"]
      );
      if (reportApi) reportApi.goToCard("signals");
      return;
    }

    if (/signal|match|sanction|media|watchlist|adverse|source/.test(q)) {
      appendAssistant(
        "<p>Match signals for <strong>" +
          escHtml(name) +
          "</strong> are on the Match Signals card — field matches plus Trulioo/online sources from the V1 KYB package.</p>",
        ["match", "overview"]
      );
      if (reportApi) reportApi.goToCard("match");
      return;
    }

    if (/identity|profile|legal|registration|address|phone|email/.test(q)) {
      appendAssistant(
        "<p><strong>" +
          escHtml(name) +
          "</strong> · " +
          escHtml(overview.legalForm || "—") +
          " · " +
          escHtml(overview.regNumber || "—") +
          ". Address: " +
          escHtml(overview.address || data.addr || "—") +
          ".</p>",
        ["overview", "web"]
      );
      if (reportApi) reportApi.goToCard("overview");
      return;
    }

    if (/additional|officer|cho|evidence|filings|tax|director|member|psc/.test(q)) {
      appendAssistant(
        "<p>Officer on file: <strong>" +
          escHtml(officer.fullName || "—") +
          "</strong> (" +
          escHtml(officer.position || "—") +
          "). Registry tax " +
          escHtml(overview.taxId || "—") +
          ". Open Summary for registry fields, or Web &amp; Social Insights for online presence.</p>",
        ["overview", "web"]
      );
      if (reportApi) reportApi.goToCard("overview");
      return;
    }

    if (/web|social|linkedin|domain|online|presence/.test(q)) {
      appendAssistant(
        "<p>Web &amp; Social Insights for <strong>" +
          escHtml(name) +
          "</strong> pull domain, company size, and LinkedIn presence from the KYB package.</p>",
        ["web", "overview"]
      );
      if (reportApi) reportApi.goToCard("web");
      return;
    }

    if (/include|what.*(report|kyb)|tabs|section|card/.test(q)) {
      appendAssistant(
        "<p>V4 shows Summary, Ownership, Risk Signals, Match Signals, and Web &amp; Social Insights.</p>",
        ["overview", "ownership", "signals", "match", "web"]
      );
      return;
    }

    appendAssistant(
      "<p>I can walk the board for <strong>" +
        escHtml(name) +
        "</strong> — Summary, Ownership, Risk Signals, Match Signals, or Web &amp; Social Insights.</p>",
      ["overview", "ownership", "signals", "match", "web"]
    );
  }

  function submitPrompt(text) {
    var value = String(text || "").trim();
    if (!value) return;
    showThread();
    appendUser(value);
    if (input) input.value = "";
    global.setTimeout(function () {
      respond(value);
    }, 280);
  }

  function syncBrhToggle(enabled) {
    document.querySelectorAll("[data-v4-brh-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-checked", enabled ? "true" : "false");
    });
  }

  function bindShellChat() {
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        submitPrompt(input && input.value);
      });
    }

    document.querySelectorAll("[data-v4-prompt]").forEach(function (card) {
      card.addEventListener("click", function () {
        submitPrompt(card.getAttribute("data-v4-prompt") || "");
      });
    });

    document.addEventListener("click", function (event) {
      var brhToggle = event.target.closest("[data-v4-brh-toggle]");
      if (brhToggle) {
        var next =
          brhToggle.getAttribute("aria-checked") !== "true";
        syncBrhToggle(next);
        if (reportApi && typeof reportApi.setBrh === "function") {
          reportApi.setBrh(next);
        }
        return;
      }

      var ref = event.target.closest("[data-v4-ref]");
      if (!ref) return;
      var id = ref.getAttribute("data-v4-ref");
      if (reportApi) reportApi.goToCard(id);
      highlightRefs(id);
      if (shell) shell.setAttribute("data-d3-chat", "open");
    });
  }

  function mountReport() {
    var host = document.getElementById("v4-verification-host");
    if (!host || !global.VerificationReportV4) return;

    reportApi = global.VerificationReportV4.mount(host, {
      data: sample(),
      onNewVerification: resetThread,
      onCardChange: function (id) {
        highlightRefs(id);
      },
      onBrhChange: syncBrhToggle,
      onAsk: function (prompt) {
        if (shell) shell.setAttribute("data-d3-chat", "open");
        submitPrompt(prompt);
        if (input) input.focus();
      }
    });

    global.VerificationReportV4Api = reportApi;
    syncBrhToggle(reportApi.getBrh ? reportApi.getBrh() : true);
  }

  bindShellChat();
  mountReport();

  global.setTimeout(function () {
    if (!thread || (turn && turn.children.length)) return;
    var data = sample() || {};
    showThread();
    appendAssistant(
      "<p><strong>" +
        escHtml(data.name || "This business") +
        "</strong> is " +
        escHtml(data.riskLabel || (data.verified ? "Verified" : "in review")) +
        ". Jump to a board section:</p>",
      ["overview", "ownership", "signals", "match", "web"]
    );
  }, 400);
})(typeof window !== "undefined" ? window : globalThis);
