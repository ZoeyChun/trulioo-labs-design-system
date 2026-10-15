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

  var ICON_BUSINESS =
    '<svg viewBox="0 0 24 24" fill="none"><path d="M5.5 2.75h9A1.75 1.75 0 0 1 16.25 4.5v3.25h2.25A1.75 1.75 0 0 1 20.25 9.5v10A1.75 1.75 0 0 1 18.5 21.25h-13A1.75 1.75 0 0 1 3.75 19.5v-15A1.75 1.75 0 0 1 5.5 2.75Zm-.25 1.75V19.5c0 .14.11.25.25.25h9.25V4.5a.25.25 0 0 0-.25-.25h-9a.25.25 0 0 0-.25.25Zm11 4.75v10.5h2.25a.25.25 0 0 0 .25-.25v-10a.25.25 0 0 0-.25-.25h-2.25ZM7 6.5h2v1.75H7V6.5Zm3.75 0h2v1.75h-2V6.5ZM7 10.25h2V12H7v-1.75Zm3.75 0h2V12h-2v-1.75ZM7 14h2v1.75H7V14Zm3.75 0h2v1.75h-2V14Z" fill="currentColor"/></svg>';
  var ICON_PERSON =
    '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.75a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5ZM11 13.75h2a6.25 6.25 0 0 1 6.25 6.25.75.75 0 0 1-1.5 0A4.75 4.75 0 0 0 13 15.25h-2A4.75 4.75 0 0 0 6.25 20a.75.75 0 0 1-1.5 0A6.25 6.25 0 0 1 11 13.75Z" fill="currentColor"/></svg>';

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
      '<div class="ai-choices">' +
        '<button type="button" class="ai-choice" data-choice="business">' +
          '<span class="ai-choice__icon" aria-hidden="true">' + ICON_BUSINESS + '</span>' +
          '<span class="ai-choice__label">Business</span>' +
        '</button>' +
        '<button type="button" class="ai-choice" data-choice="person">' +
          '<span class="ai-choice__icon" aria-hidden="true">' + ICON_PERSON + '</span>' +
          '<span class="ai-choice__label">Person</span>' +
        '</button>' +
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
