/* Verification Module V2 — TruAI chat bridge to stacked report cards. */
(function (global) {
  "use strict";

  var shell = document.querySelector(".d1-shell");
  var pane = document.getElementById("v2-tds-chat-pane");
  var empty = document.querySelector(".d3-chat-pane__empty");
  var thread = document.querySelector("[data-v2-chat-thread]");
  var form = document.querySelector("[data-v2-chat-form]");
  var input = document.querySelector("[data-v2-chat-input]");
  var reportApi = null;
  var turn = null;

  var CARD_LABELS =
    (global.VerificationReportV2 && global.VerificationReportV2.cardLabels) || {
      overview: "Overview",
      signals: "Signals",
      ownership: "Owners & UBOs",
      match: "Match Signals & Sources",
      additional: "Additional Data",
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
        '<div class="v2-msg-refs">' +
        cardIds
          .map(function (id) {
            return (
              '<button type="button" class="v2-chat-ref" data-v2-ref="' +
              id +
              '"><span class="v2-chat-ref__mark" aria-hidden="true"></span>' +
              (CARD_LABELS[id] || id) +
              "</button>"
            );
          })
          .join("") +
        "</div>";
    }
    row.innerHTML =
      '<div class="d1-ai">' + html + refs + "</div>";
    host.appendChild(row);
    if (thread) thread.scrollTop = thread.scrollHeight;
  }

  function highlightRefs(activeId) {
    document.querySelectorAll("[data-v2-ref]").forEach(function (btn) {
      if (btn.getAttribute("data-v2-ref") === activeId) {
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
    if (kyb && typeof kyb.sampleData === "function") {
      return kyb.sampleData();
    }
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

    if (/verify|meridian|kyb|business|overview|summarize|status|verified|confidence|decision|why/.test(q)) {
      appendAssistant(
        "<p><strong>" +
          escHtml(name) +
          "</strong> is a " +
          escHtml(overview.legalForm || "registered company") +
          " (" +
          escHtml(overview.regNumber || "—") +
          "). Status: " +
          escHtml(overview.status || "—") +
          ". Decision: <strong>" +
          escHtml(data.riskLabel || (data.verified ? "Verified" : "Review")) +
          "</strong>.</p>",
        ["overview", "signals", "ownership"]
      );
      if (reportApi) reportApi.goToCard("overview");
      return;
    }

    if (/owner|ubo|shareholder|beneficial/.test(q)) {
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
          escHtml(root.truai || "Review the UBO graph for connected-entity risk.") +
          "</p>",
        ["ownership", "additional"]
      );
      if (reportApi) reportApi.goToCard("ownership");
      return;
    }

    if (/sanction|media|watchlist|adverse|risk signal|risk type/.test(q)) {
      var alerts = overview.alerts || [];
      var risk = graph.riskFilter;
      appendAssistant(
        "<p>News &amp; alerts: " +
          escHtml(alerts.join("; ") || "No screening rows") +
          ". " +
          (risk
            ? "Ownership graph flags <strong>" +
              escHtml(risk.label) +
              " (" +
              escHtml(String(risk.count)) +
              ")</strong>. "
            : "") +
          "Open <strong>Signals</strong> for the risk-type breakdown.</p>",
        ["signals", "overview"]
      );
      if (reportApi) reportApi.goToCard("signals");
      return;
    }

    if (/match signal|source|registry|provenance|where|tax|field match/.test(q)) {
      appendAssistant(
        "<p>Field-level match results and Trulioo / online sources live on the <strong>Match Signals &amp; Sources</strong> card.</p>",
        ["match", "overview"]
      );
      if (reportApi) reportApi.goToCard("match");
      return;
    }

    if (/evidence|officer|address|mark|williamson|additional/.test(q)) {
      appendAssistant(
        "<p>Officer on file: <strong>" +
          escHtml(officer.fullName || "—") +
          "</strong> (" +
          escHtml(officer.position || "Officer") +
          "), " +
          escHtml(officer.beginDate || "—") +
          " → " +
          escHtml(officer.endDate || "—") +
          ". Primary address: " +
          escHtml(officer.address1 || "—") +
          ".</p>",
        ["additional", "ownership"]
      );
      if (reportApi) reportApi.goToCard("additional");
      return;
    }

    if (/web|social|linkedin|instagram|twitter|domain/.test(q)) {
      appendAssistant(
        "<p>Web &amp; social insights for <strong>" +
          escHtml(name) +
          "</strong> are on the Web &amp; Social Insights card — domain, LinkedIn, and other presence signals from the V1 KYB panel.</p>",
        ["web", "overview"]
      );
      if (reportApi) reportApi.goToCard("web");
      return;
    }

    if (/include|what.*(report|kyb)|tabs|section/.test(q)) {
      appendAssistant(
        "<p>This report has six sections: <strong>Overview</strong>, <strong>Signals</strong>, <strong>Owners &amp; UBOs</strong>, <strong>Match Signals &amp; Sources</strong>, <strong>Additional Data</strong>, and <strong>Web &amp; Social Insights</strong>. Cards show summaries; expand for detail.</p>",
        ["overview", "signals", "ownership", "match", "additional", "web"]
      );
      return;
    }

    appendAssistant(
      "<p>I can walk through overview, signals, ownership, match sources, additional data, or web &amp; social insights for <strong>" +
        escHtml(name) +
        "</strong>. Ask about a section or use a reference chip below.</p>",
      ["overview", "signals", "ownership", "match"]
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

  function bindShellChat() {
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        submitPrompt(input && input.value);
      });
    }

    document.querySelectorAll("[data-v2-prompt]").forEach(function (card) {
      card.addEventListener("click", function () {
        submitPrompt(card.getAttribute("data-v2-prompt") || "");
      });
    });

    document.addEventListener("click", function (event) {
      var ref = event.target.closest("[data-v2-ref]");
      if (!ref) return;
      var id = ref.getAttribute("data-v2-ref");
      if (reportApi) reportApi.goToCard(id);
      highlightRefs(id);
      if (shell) shell.setAttribute("data-d3-chat", "open");
    });
  }

  function mountReport() {
    var host = document.getElementById("v2-tds-verification-host");
    if (!host || !global.VerificationReportV2) return;

    var data = sample();

    reportApi = global.VerificationReportV2.mount(host, {
      data: data,
      onNewVerification: resetThread,
      onCardChange: function (id) {
        highlightRefs(id);
      },
      onAsk: function (prompt) {
        if (shell) shell.setAttribute("data-d3-chat", "open");
        submitPrompt(prompt);
        if (input) input.focus();
      }
    });

    global.VerificationReportV2Api = reportApi;
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
        ". Scroll the stacked report on the right, or jump to a section from these references.</p>",
      ["overview", "signals", "ownership", "match"]
    );
  }, 400);
})(typeof window !== "undefined" ? window : globalThis);
