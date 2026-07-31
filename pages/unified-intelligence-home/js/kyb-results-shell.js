(function () {
  'use strict';

  var KYB_IFRAME_SRC = '../KYB Results/index.html';
  var HIDE_SIDENAV_STYLE_ID = 'uih-shell-hide-sidenav';

  var HIDE_SIDENAV_CSS =
    '#app-sidenav,' +
    '.app-sidenav-overlay,' +
    '.app-nav-toggle,' +
    '.tds-side-nav__collapse-bar,' +
    '.tds-side-nav__nav-stack {' +
      'display: none !important;' +
    '}' +
    '.app-shell {' +
      'padding: 0 !important;' +
      'gap: 0 !important;' +
      'min-height: 100% !important;' +
    '}' +
    '.app-main {' +
      'border-radius: 0 !important;' +
      'min-height: 100% !important;' +
      'overflow: hidden !important;' +
    '}';

  function buildIframeUrl() {
    var search = window.location.search || '';
    return KYB_IFRAME_SRC + search;
  }

  function injectIframeStyles(iframe) {
    try {
      var doc = iframe.contentDocument;
      if (!doc || !doc.head) return false;

      if (!doc.getElementById(HIDE_SIDENAV_STYLE_ID)) {
        var style = doc.createElement('style');
        style.id = HIDE_SIDENAV_STYLE_ID;
        style.textContent = HIDE_SIDENAV_CSS;
        doc.head.appendChild(style);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function init() {
    var iframe = document.getElementById('kybResultsFrame');
    if (!iframe) return;

    var attempts = 0;

    function tryInject() {
      attempts += 1;
      if (injectIframeStyles(iframe) || attempts >= 8) return;
      window.setTimeout(tryInject, 120);
    }

    iframe.addEventListener('load', tryInject);
    iframe.src = buildIframeUrl();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
