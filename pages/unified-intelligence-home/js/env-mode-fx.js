(function () {
  'use strict';

  // Demo/Prod switch feedback: sweep light across the headline and cross-fade
  // the newly shown section.
  //
  // Effects fire straight off the toggle button click (same event tick) so the
  // sweep starts in sync with the press — not a frame late, which reads as an
  // off-beat. env-mode.js's own click handler is registered first (it loads
  // first), so by the time this runs the section is already swapped in.

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var titleEl = document.getElementById('heroTitle');
  var btnDemo = document.getElementById('envDemo');
  var btnProd = document.getElementById('envProd');

  function replay(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth; // force reflow so the animation restarts
    el.classList.add(cls);
  }

  function sweepHeadline() {
    replay(titleEl, 'hero-title--fx-sweep');
  }

  function enterSection(mode) {
    var el = document.getElementById(mode === 'production' ? 'prodHome' : 'demoScenarios');
    replay(el, 'env-fx-enter');
  }

  // Clean up the sweep class once it finishes so it can replay next time.
  if (titleEl) {
    titleEl.addEventListener('animationend', function (e) {
      if (e.animationName === 'hero-title-fx-sweep') titleEl.classList.remove('hero-title--fx-sweep');
    });
  }

  function runFX(mode) {
    if (reduce) return;
    sweepHeadline();
    enterSection(mode);
  }

  // Fire on the toggle press itself; skip clicks that don't change the mode.
  var lastMode = document.body.dataset.envMode || 'demo';
  function onToggle(mode) {
    if (mode === lastMode) return;
    lastMode = mode;
    runFX(mode);
  }

  if (btnDemo) btnDemo.addEventListener('click', function () { onToggle('demo'); });
  if (btnProd) btnProd.addEventListener('click', function () { onToggle('production'); });
})();
