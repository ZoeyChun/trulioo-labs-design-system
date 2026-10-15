/* TruAI scripted flows — home page suggestions that start a guided,
   simulated conversation instead of just filling the composer.

   State hand-off between pages is sessionStorage-based: these are static
   HTML pages with no client-side router, so "navigate, then continue the
   conversation where it left off" has to survive a real page load. A page
   that wants to resume a flow calls TruAIFlows.getFlow() on init and
   clears it once consumed.

   Two things every step of a flow gets for free via this module:

   1. Back. Every render function that moves the thread forward first
      pushes a closure that re-renders the step being left. #ai-back
      (in the panel header, see ai-panel.js) is hidden until there's
      something to go back to, and just pops and re-runs that closure.
   2. Thinking. respondAfterThinking() shows a brief spinner + label
      between a user's action and TruAI's reply, instead of the reply
      replacing the thread instantly.

   Only "Start a new verification" is wired up so far. The other two home
   suggestions ("Search across transaction history", "Investigate an
   existing verification") have their final copy but no behaviour yet. */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'truai-flow';
  var THINK_MS = 2700; // slightly over one full ai-dot-pulse loop (2.618s) — see ai-panel.css

  /* Port of the Loader experiment's "Logo / Pulse" combo (see the long
     comment in ai-panel.css next to @keyframes ai-dot-pulse for why this
     is 37 individually-delayed circles rather than one spinning image). */
  var THINKING_ORB_SVG =
    /* Dot radii scaled to 0.7 of the mark's native size (center positions
       unchanged) — matches the Loader experiment's "Dot size" slider. */
    '<svg class="ai-thinking__svg" viewBox="0 0 48.759 40" fill="currentColor" aria-hidden="true">' +
      '<circle cx="2.371" cy="16.893" r="1.456" style="animation-delay:-1.180s"/>' +
      '<circle cx="4.527" cy="11.232" r="1.284" style="animation-delay:-1.312s"/>' +
      '<circle cx="7.886" cy="6.714" r="1.154" style="animation-delay:-1.437s"/>' +
      '<circle cx="12.305" cy="3.384" r="1.014" style="animation-delay:-1.564s"/>' +
      '<circle cx="16.667" cy="1.59" r="0.766" style="animation-delay:-1.675s"/>' +
      '<circle cx="25.191" cy="1.591" r="0.727" style="animation-delay:-1.886s"/>' +
      '<circle cx="29.645" cy="1.008" r="0.692" style="animation-delay:-1.995s"/>' +
      '<circle cx="34.03" cy="1.591" r="0.729" style="animation-delay:-2.097s"/>' +
      '<circle cx="38.2" cy="3.384" r="1.012" style="animation-delay:-2.198s"/>' +
      '<circle cx="42.263" cy="6.714" r="1.149" style="animation-delay:-2.312s"/>' +
      '<circle cx="45.147" cy="11.232" r="1.284" style="animation-delay:-2.427s"/>' +
      '<circle cx="46.721" cy="16.893" r="1.456" style="animation-delay:-2.552s"/>' +
      '<circle cx="46.395" cy="23.102" r="1.455" style="animation-delay:-0.067s"/>' +
      '<circle cx="44.236" cy="28.767" r="1.283" style="animation-delay:-0.199s"/>' +
      '<circle cx="40.874" cy="33.281" r="1.153" style="animation-delay:-0.325s"/>' +
      '<circle cx="36.449" cy="36.609" r="1.014" style="animation-delay:-0.452s"/>' +
      '<circle cx="32.105" cy="38.397" r="0.769" style="animation-delay:-0.562s"/>' +
      '<circle cx="23.571" cy="38.401" r="0.731" style="animation-delay:-0.774s"/>' +
      '<circle cx="19.124" cy="38.989" r="0.693" style="animation-delay:-0.882s"/>' +
      '<circle cx="14.737" cy="38.401" r="0.732" style="animation-delay:-0.984s"/>' +
      '<circle cx="10.571" cy="36.609" r="1.012" style="animation-delay:-1.085s"/>' +
      '<circle cx="6.497" cy="33.281" r="1.151" style="animation-delay:-1.199s"/>' +
      '<circle cx="3.611" cy="28.767" r="1.282" style="animation-delay:-1.314s"/>' +
      '<circle cx="2.042" cy="23.105" r="1.459" style="animation-delay:-1.439s"/>' +
      '<circle cx="10.901" cy="16.891" r="1.413" style="animation-delay:-1.221s"/>' +
      '<circle cx="13.062" cy="11.214" r="1.26" style="animation-delay:-1.429s"/>' +
      '<circle cx="16.425" cy="6.714" r="1.154" style="animation-delay:-1.607s"/>' +
      '<circle cx="20.838" cy="3.381" r="1.014" style="animation-delay:-1.765s"/>' +
      '<circle cx="33.732" cy="6.714" r="1.151" style="animation-delay:-2.159s"/>' +
      '<circle cx="36.625" cy="11.214" r="1.261" style="animation-delay:-2.320s"/>' +
      '<circle cx="38.193" cy="16.891" r="1.413" style="animation-delay:-2.512s"/>' +
      '<circle cx="37.865" cy="23.097" r="1.413" style="animation-delay:-0.108s"/>' +
      '<circle cx="35.704" cy="28.766" r="1.261" style="animation-delay:-0.316s"/>' +
      '<circle cx="32.34" cy="33.281" r="1.151" style="animation-delay:-0.494s"/>' +
      '<circle cx="27.921" cy="36.609" r="1.012" style="animation-delay:-0.652s"/>' +
      '<circle cx="15.023" cy="33.281" r="1.151" style="animation-delay:-1.047s"/>' +
      '<circle cx="12.134" cy="28.766" r="1.261" style="animation-delay:-1.208s"/>' +
      '<circle cx="10.574" cy="23.097" r="1.413" style="animation-delay:-1.399s"/>' +
    '</svg>';

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

  /* ---------- Back history ------------------------------------------- */

  var historyStack = [];

  function updateBackButton() {
    var back = document.getElementById('ai-back');
    if (back) back.hidden = historyStack.length === 0;
  }

  function pushHistory(renderPrevious) {
    historyStack.push(renderPrevious);
    updateBackButton();
  }

  function goBack() {
    var fn = historyStack.pop();
    updateBackButton();
    if (fn) fn();
  }

  function initBackButton() {
    var back = document.getElementById('ai-back');
    if (!back || back.dataset.wired) return;
    back.dataset.wired = 'true';
    back.addEventListener('click', goBack);
    updateBackButton();
  }

  /* ---------- Thinking ------------------------------------------------ */

  function thinkingRow(text) {
    return (
      '<div class="ai-thinking">' +
        '<span class="ai-thinking__orb" aria-hidden="true">' + THINKING_ORB_SVG + '</span>' +
        '<span class="ai-thinking__text">' + esc(text) + '</span>' +
      '</div>'
    );
  }

  /* Shows `priorHtml` (what's already said) plus a thinking row, waits
     THINK_MS, then hands off to onReady to render the real reply. Kept
     generic so both the home flow and a page's own flow script (e.g.
     verify-business/js/kyb-search.js) can use it. */
  function respondAfterThinking(threadEl, priorHtml, thinkingText, onReady) {
    threadEl.innerHTML = priorHtml + thinkingRow(thinkingText);
    threadEl.scrollTop = threadEl.scrollHeight;
    window.setTimeout(onReady, THINK_MS);
  }

  /* ---------- Home: "Start a new verification" ------------------------ */

  function showGenericState(threadEl, suggestionsEl) {
    threadEl.hidden = true;
    threadEl.innerHTML = '';
    if (suggestionsEl) suggestionsEl.hidden = false;
  }

  function choicesHtml() {
    return (
      '<div class="ai-choices">' +
        '<button type="button" class="ai-choice" data-choice="business">' +
          '<span class="ai-choice__icon" aria-hidden="true">' + ICON_BUSINESS + '</span>' +
          '<span class="ai-choice__label">Business</span>' +
        '</button>' +
        '<button type="button" class="ai-choice" data-choice="person">' +
          '<span class="ai-choice__icon" aria-hidden="true">' + ICON_PERSON + '</span>' +
          '<span class="ai-choice__label">Person</span>' +
        '</button>' +
      '</div>'
    );
  }

  function renderChoiceStep(threadEl, suggestionsEl) {
    var said = '<p class="ai-said">Start a new verification</p>';
    threadEl.hidden = false;
    threadEl.innerHTML =
      said +
      '<div class="ai-reply"><p class="ai-reply__lead">What would you like to verify?</p></div>' +
      choicesHtml();

    threadEl.querySelector('[data-choice="business"]').addEventListener('click', function () {
      pushHistory(function () { renderChoiceStep(threadEl, suggestionsEl); });
      respondAfterThinking(threadEl, said + '<p class="ai-said">Business</p>',
        'Opening Verify a business…', function () {
          setFlow({ flow: 'new-verification', step: 'ask-name' });
          window.location.href = '../verify-business/index.html';
        });
    });

    threadEl.querySelector('[data-choice="person"]').addEventListener('click', function () {
      pushHistory(function () { renderChoiceStep(threadEl, suggestionsEl); });
      respondAfterThinking(threadEl, said + '<p class="ai-said">Person</p>',
        'Thinking…', function () {
          threadEl.innerHTML = said + '<p class="ai-said">Person</p>' +
            '<div class="ai-reply"><p class="ai-reply__lead">' +
              'Person verification isn’t wired up in this demo yet — try Business.' +
            '</p></div>';
          threadEl.scrollTop = threadEl.scrollHeight;
        });
    });
  }

  function initHome(threadEl, suggestionsEl) {
    if (!threadEl || !suggestionsEl) return;
    initBackButton();
    var buttons = suggestionsEl.querySelectorAll('.ai-suggestion');
    // Order matches the suggestions array passed to TruAIPanel.render().
    if (buttons[0]) {
      buttons[0].addEventListener('click', function () {
        suggestionsEl.hidden = true;
        threadEl.hidden = false;
        pushHistory(function () { showGenericState(threadEl, suggestionsEl); });
        respondAfterThinking(threadEl, '<p class="ai-said">Start a new verification</p>',
          'Thinking…', function () {
            renderChoiceStep(threadEl, suggestionsEl);
          });
      });
    }
  }

  global.TruAIFlows = {
    setFlow: setFlow,
    getFlow: getFlow,
    clearFlow: clearFlow,
    esc: esc,
    initHome: initHome,
    pushHistory: pushHistory,
    goBack: goBack,
    initBackButton: initBackButton,
    respondAfterThinking: respondAfterThinking,
    thinkingRow: thinkingRow
  };
})(window);
