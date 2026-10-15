/* TruAI scripted flows — home page suggestions that start a guided,
   simulated conversation instead of just filling the composer.

   State hand-off between pages is sessionStorage-based: these are static
   HTML pages with no client-side router, so "navigate, then continue the
   conversation where it left off" has to survive a real page load. A page
   that wants to resume a flow calls TruAIFlows.getFlow() on init and
   clears it once consumed.

   Only "Start a new verification" is wired up so far. The other two home
   suggestions ("Search across transaction history", "Investigate an
   existing verification") have their final copy but no behaviour yet. */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'truai-flow';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch];
    });
  }

  function setFlow(data) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }
  function getFlow() {
    try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) { return null; }
  }
  function clearFlow() {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  /* ---------- Home: "Start a new verification" ------------------------ */

  function renderNewVerificationChoice(threadEl, suggestionsEl) {
    if (suggestionsEl) suggestionsEl.hidden = true;
    threadEl.hidden = false;
    threadEl.innerHTML =
      '<p class="ai-said">Start a new verification</p>' +
      '<div class="ai-reply"><p class="ai-reply__lead">What would you like to verify?</p></div>' +
      '<div class="ai-chips">' +
        '<button type="button" class="ai-chip" data-choice="business">Business</button>' +
        '<button type="button" class="ai-chip" data-choice="person">Person</button>' +
      '</div>';

    threadEl.querySelector('[data-choice="business"]').addEventListener('click', function () {
      setFlow({ flow: 'new-verification', step: 'ask-name' });
      window.location.href = '../verify-business/index.html';
    });

    threadEl.querySelector('[data-choice="person"]').addEventListener('click', function () {
      threadEl.insertAdjacentHTML('beforeend',
        '<p class="ai-said">Person</p>' +
        '<div class="ai-reply"><p class="ai-reply__lead">' +
          'Person verification isn’t wired up in this demo yet — try Business.' +
        '</p></div>');
      threadEl.scrollTop = threadEl.scrollHeight;
    });
  }

  function initHome(threadEl, suggestionsEl) {
    if (!threadEl || !suggestionsEl) return;
    var buttons = suggestionsEl.querySelectorAll('.ai-suggestion');
    // Order matches the suggestions array passed to TruAIPanel.render().
    if (buttons[0]) {
      buttons[0].addEventListener('click', function () {
        renderNewVerificationChoice(threadEl, suggestionsEl);
      });
    }
  }

  global.TruAIFlows = {
    setFlow: setFlow,
    getFlow: getFlow,
    clearFlow: clearFlow,
    esc: esc,
    initHome: initHome
  };
})(window);
