/* TruAI panel — shared markup renderer.

   Every 2026 portal page used to hand-copy the panel's ~100 lines of HTML
   (header, orb, suggestions, prompt form, collapsed askbar). That markup
   drifting between copies is exactly how verify-business and agent-hub
   ended up with mismatched element ids that silently broke open/close,
   and how transaction-history kept an older header pattern after the
   other three pages moved to a plain "TruAI" title. Structure now lives
   here, once; a page only supplies copy.

   Usage — a page provides an empty mount element in the exact spot the
   panel belongs (inside .v2-stage, after the page's <main>), then calls:

     <div id="ai-panel-mount"></div>
     <script src="../shared/portal-shell/ai-panel.js"></script>
     <script>
       TruAIPanel.render(document.getElementById('ai-panel-mount'), {
         // Header — pick ONE of:
         title: 'TruAI',                              // plain title (default)
         greeting: { name: 'Welcome, Zoey.', date: 'September 30, 2026' },

         headline: 'What would you like to work on?',  // required
         contextPill: 'KYB Agent',                     // optional

         hasThread: true,                               // verify-business only:
                                                          // reserves #ai-thread for
                                                          // js/kyb-search.js to render into

         suggestions: ['Where can I start?', 'Verify business', 'Verify person'],

         placeholder: 'Ask questions or tell me what you’d like to do',
         askbarText:  'Ask a question or tell me what you’d like to do'
       });
     </script>
     <script src="../shared/portal-shell/ai-toggle.js"></script>

   Must run before ai-toggle.js (which looks up #ai-panel / #ai-askbar by
   id the moment it executes) and before any inline init that reads
   #ai-thread / #ai-suggestions via getElementById on DOMContentLoaded —
   a synchronous <script> tag in page order satisfies both. */
(function (global) {
  'use strict';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var ICON_CLOSE =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.47 6.47a.75.75 0 0 1 1.06 0L12 10.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L13.06 12l4.47 4.47a.75.75 0 1 1-1.06 1.06L12 13.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L10.94 12 6.47 7.53a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>';
  var ICON_BACK =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M11.53 4.72a.75.75 0 0 1 0 1.06L6.31 11h14.44a.75.75 0 0 1 0 1.5H6.31l5.22 5.22a.75.75 0 1 1-1.06 1.06l-6.5-6.5a.75.75 0 0 1 0-1.06l6.5-6.5a.75.75 0 0 1 1.06 0Z" fill="currentColor"/></svg>';
  var ICON_ARROW_RIGHT =
    '<svg viewBox="0 0 24 24" fill="none"><path d="M13.47 4.72a.75.75 0 0 1 1.06 0l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H3.75a.75.75 0 0 1 0-1.5h15.19l-5.47-5.47a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>';
  var ICON_ATTACH =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.75a.75.75 0 0 1 .75.75v5.75h5.75a.75.75 0 0 1 0 1.5h-5.75v5.75a.75.75 0 0 1-1.5 0v-5.75H5.5a.75.75 0 0 1 0-1.5h5.75V5.5a.75.75 0 0 1 .75-.75Z" fill="currentColor"/></svg>';
  var ICON_MIC =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2.75A3.25 3.25 0 0 1 15.25 6v6a3.25 3.25 0 0 1-6.5 0V6A3.25 3.25 0 0 1 12 2.75Zm0 1.5A1.75 1.75 0 0 0 10.25 6v6a1.75 1.75 0 0 0 3.5 0V6A1.75 1.75 0 0 0 12 4.25ZM6.25 11.25a.75.75 0 0 1 .75.75 5 5 0 0 0 10 0 .75.75 0 0 1 1.5 0 6.5 6.5 0 0 1-5.75 6.46v2.04h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5v-2.04A6.5 6.5 0 0 1 5.5 12a.75.75 0 0 1 .75-.75Z" fill="currentColor"/></svg>';
  var ICON_SEND =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19.25a.75.75 0 0 1-.75-.75V7.31L6.78 11.78a.75.75 0 0 1-1.06-1.06l5.75-5.75a.75.75 0 0 1 1.06 0l5.75 5.75a.75.75 0 1 1-1.06 1.06L12.75 7.31V18.5a.75.75 0 0 1-.75.75Z" fill="currentColor"/></svg>';

  function renderHeader(cfg, assets) {
    var titleHtml = cfg.greeting
      ? '<div class="ai-panel__greeting">' +
          '<h2 class="ai-panel__welcome">' + esc(cfg.greeting.name) + '</h2>' +
          '<p class="ai-panel__date">' + esc(cfg.greeting.date) + '</p>' +
        '</div>'
      : '<h2 class="ai-panel__welcome ai-panel__welcome--plain">' + esc(cfg.title || 'TruAI') + '</h2>';

    /* Lives next to the title rather than under the orb (Figma node
       1121:51294) so the agent context stays visible once a conversation
       starts and the hero (orb + headline) hides — the pill shouldn't
       disappear along with it. */
    var pillHtml = cfg.contextPill
      ? '<span class="tds-tag tds-tag--sm ai-context">' +
          '<span class="tds-tag__leading-visual ai-context__dot">' +
            '<img src="' + assets + '/env-dot.svg" alt="" width="8" height="8">' +
          '</span>' +
          esc(cfg.contextPill) +
        '</span>'
      : '';

    return (
      '<header class="ai-panel__head">' +
        '<div class="ai-panel__head-left">' +
          /* Hidden until a flow pushes a step onto its history — see
             TruAIFlows.pushHistory() / goBack() in ai-flows.js. */
          '<button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--secondary" id="ai-back" ' +
                  'aria-label="Back" hidden>' +
            ICON_BACK +
          '</button>' +
          titleHtml +
          pillHtml +
        '</div>' +
        '<button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--secondary" id="v2-close" ' +
                'aria-label="Close TruAI" aria-expanded="true" aria-controls="ai-panel">' +
          ICON_CLOSE +
        '</button>' +
      '</header>'
    );
  }

  function renderHero(cfg, assets) {
    var intro = '<p class="ai-wordmark">' + cfg.headline + '</p>';

    return (
      '<div class="ai-panel__hero">' +
        '<span class="ai-orb">' +
          '<img class="ai-orb__fill" src="' + assets + '/truai-orb.png" alt="" width="132" height="132">' +
          '<img class="ai-orb__mark" src="' + assets + '/logo-orb-mark.svg" alt="" width="69.3009" height="56.8531">' +
        '</span>' +
        intro +
      '</div>'
    );
  }

  function renderSuggestions(cfg) {
    var items = (cfg.suggestions || []).map(function (label) {
      return (
        '<button type="button" class="ai-suggestion">' +
          '<span>' + esc(label) + '</span>' +
          '<span class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular" aria-hidden="true">' +
            ICON_ARROW_RIGHT +
          '</span>' +
        '</button>'
      );
    }).join('');
    return '<div class="ai-suggestions" id="ai-suggestions">' + items + '</div>';
  }

  function renderPrompt(cfg) {
    return (
      '<form class="ai-prompt" action="#" onsubmit="return false;">' +
        '<label class="v2-visually-hidden" for="v2-ask">' + esc(cfg.placeholder) + '</label>' +
        '<input id="v2-ask" class="ai-prompt__input" type="text" ' +
               'placeholder="' + esc(cfg.placeholder) + '" autocomplete="off">' +
        '<div class="ai-prompt__bar">' +
          '<button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular" aria-label="Add attachment">' +
            ICON_ATTACH +
          '</button>' +
          '<div class="ai-prompt__right">' +
            '<button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular" aria-label="Dictate">' +
              ICON_MIC +
            '</button>' +
            '<button type="submit" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--circular ai-send" aria-label="Send">' +
              ICON_SEND +
            '</button>' +
          '</div>' +
        '</div>' +
      '</form>'
    );
  }

  function renderPanel(cfg, assets) {
    var thread = cfg.hasThread
      ? '<!-- Conversation. Empty until a flow starts; the page\'s own JS ' +
        'renders into it. The panel owns the chrome, the page owns the ' +
        'content of whatever flow it drives. -->' +
        '<div class="ai-thread" id="ai-thread" hidden></div>'
      : '';

    return (
      '<div class="v2-panel-slot">' +
        '<aside class="ai-panel" id="ai-panel" aria-label="TruAI">' +
          '<div class="ai-panel__top">' +
            renderHeader(cfg, assets) +
            renderHero(cfg, assets) +
          '</div>' +
          thread +
          renderSuggestions(cfg) +
          renderPrompt(cfg) +
        '</aside>' +
      '</div>'
    );
  }

  function renderAskbar(cfg) {
    return (
      '<button type="button" class="ai-askbar" id="ai-askbar" ' +
              'aria-controls="ai-panel" aria-expanded="true" tabindex="-1">' +
        '<span class="ai-askbar__text">' + esc(cfg.askbarText) + '</span>' +
        '<span class="ai-askbar__send" aria-hidden="true">' +
          '<img src="' + cfg.assetsPath + '/ask-arrow.svg" alt="" width="12" height="12">' +
        '</span>' +
      '</button>'
    );
  }

  function render(mountEl, cfg) {
    if (!mountEl) throw new Error('TruAIPanel.render: mount element not found');
    cfg = cfg || {};
    cfg.assetsPath = cfg.assetsPath || '../shared/portal-shell/assets';

    // Insert the askbar right after the mount point first — outerHTML on
    // the next line detaches `mountEl`, so anything using the reference
    // has to happen before it.
    mountEl.insertAdjacentHTML('afterend', renderAskbar(cfg));
    mountEl.outerHTML = renderPanel(cfg, cfg.assetsPath);
  }

  global.TruAIPanel = { render: render };
})(window);
