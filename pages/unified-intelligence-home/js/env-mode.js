(function () {
  'use strict';

  var STORAGE_KEY = 'uil-home-env-mode';
  var toggle = document.getElementById('envToggle');
  var demoSection = document.getElementById('demoScenarios');
  var prodSection = document.getElementById('prodHome');
  var mcpSection = document.getElementById('mcpSection');
  var btnDemo = document.getElementById('envDemo');
  var btnProd = document.getElementById('envProd');

  if (!toggle || !btnDemo || !btnProd) return;

  function setMode(mode) {
    var isDemo = mode !== 'production';
    document.body.dataset.envMode = isDemo ? 'demo' : 'production';

    btnDemo.classList.toggle('is-active', isDemo);
    btnProd.classList.toggle('is-active', !isDemo);
    btnDemo.setAttribute('aria-pressed', String(isDemo));
    btnProd.setAttribute('aria-pressed', String(!isDemo));

    if (demoSection) demoSection.hidden = !isDemo;
    if (prodSection) prodSection.hidden = isDemo;
    if (mcpSection) mcpSection.hidden = !isDemo;

    try {
      window.sessionStorage.setItem(STORAGE_KEY, isDemo ? 'demo' : 'production');
    } catch (err) { /* ignore */ }
  }

  btnDemo.addEventListener('click', function () { setMode('demo'); });
  btnProd.addEventListener('click', function () { setMode('production'); });

  var saved = null;
  try {
    saved = window.sessionStorage.getItem(STORAGE_KEY);
  } catch (err) { /* ignore */ }

  setMode(saved === 'production' ? 'production' : 'demo');

  window.EnvMode = { setMode: setMode };
})();
