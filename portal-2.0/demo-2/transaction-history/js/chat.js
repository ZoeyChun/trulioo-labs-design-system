/* Transactions chat — same thread pattern as the homepage TruAI flow.
   "Show failed verifications from the last 7 days" filters the table,
   and the reply is built from those same rows. */
(function () {
  var PROMPT = "Show failed verifications from the last 7 days";
  var FOLLOW_UPS = [
    "Why were these transactions not verified?",
    "Find transactions requiring review",
    "Summarize verification trends"
  ];

  var thread = document.getElementById("ai-thread");
  var suggestions = document.getElementById("ai-suggestions");
  if (!thread || !suggestions || !window.TruAIFlows) return;

  TruAIFlows.initBackButton();

  var buttons = suggestions.querySelectorAll(".ai-suggestion");
  var originals = [];
  Array.prototype.forEach.call(buttons, function (btn) {
    var label = btn.querySelector(".ai-suggestion__title") || btn.querySelector("span");
    originals.push(label ? label.textContent.trim() : "");
  });

  function setLabels(labels) {
    Array.prototype.forEach.call(buttons, function (btn, i) {
      var label = btn.querySelector(".ai-suggestion__title") || btn.querySelector("span");
      if (label && labels[i]) label.textContent = labels[i];
    });
  }

  function showStart() {
    thread.hidden = true;
    thread.innerHTML = "";
    suggestions.hidden = false;
    setLabels(originals);
    if (window.UTTransactions) window.UTTransactions.clearAiView();
  }

  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.47 4.72a.75.75 0 0 1 1.06 0l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H3.75a.75.75 0 0 1 0-1.5h15.19l-5.47-5.47a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>';

  function continueHtml() {
    var rows = FOLLOW_UPS.map(function (label) {
      return (
        '<button type="button" class="ai-suggestion">' +
          "<span>" + TruAIFlows.esc(label) + "</span>" +
          '<span class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular" aria-hidden="true">' +
            ARROW +
          "</span>" +
        "</button>"
      );
    }).join("");
    return (
      '<div class="th-chat__next">' +
        '<p class="th-chat__next-label">Continue your investigation</p>' +
        rows +
      "</div>"
    );
  }

  function resultsHtml(list) {
    var n = list.length;
    var noun = n === 1 ? "transaction" : "transactions";
    var intro =
      n === 0
        ? "I didn\u2019t find any unsuccessful verification outcomes in the last 7 days."
        : "I found " +
          n +
          " " +
          noun +
          " with unsuccessful verification outcomes in the last 7 days. Here\u2019s a summary of each result.";

    var body =
      '<div class="th-chat">' +
        '<p class="th-chat__found">Found ' + n + " " + noun + "</p>" +
        "<p>" + TruAIFlows.esc(intro) + "</p>";
    list.forEach(function (item, index) {
      body +=
        '<p class="th-chat__name">Transaction ' +
        (index + 1) +
        ": " +
        TruAIFlows.esc(item.name) +
        "</p><ul>" +
        "<li>Outcome: " +
        TruAIFlows.esc(item.outcome) +
        "</li>" +
        "<li>Date: " +
        TruAIFlows.esc(item.date) +
        "</li>" +
        "<li>Product: " +
        TruAIFlows.esc(item.product) +
        "</li>" +
        "<li>Country: " +
        TruAIFlows.esc(item.country) +
        "</li></ul>";
    });
    if (n) body += continueHtml();
    return body + "</div>";
  }

  if (!buttons[0]) return;

  buttons[0].addEventListener("click", function () {
    var label = buttons[0].querySelector(".ai-suggestion__title") || buttons[0].querySelector("span");
    if (!label || label.textContent.trim() !== PROMPT) return;
    if (!window.UTTransactions) return;

    var matches = window.UTTransactions.showFailedLast7Days();
    var said = '<p class="ai-said">' + TruAIFlows.esc(PROMPT) + "</p>";
    suggestions.hidden = true;
    thread.hidden = false;
    TruAIFlows.pushHistory(showStart);
    TruAIFlows.respondAfterThinking(thread, said, "Thinking\u2026", function () {
      thread.innerHTML = said + resultsHtml(matches);
      thread.scrollTop = 0;
    });
  });
})();
