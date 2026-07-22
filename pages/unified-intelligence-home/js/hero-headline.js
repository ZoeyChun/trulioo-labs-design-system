(function () {
  'use strict';

  var HEADLINE_LINES = [
    'Turn verification signals into',
    'actionable risk intelligence.',
  ];

  var titleEl = document.getElementById('heroTitle');
  if (!titleEl) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function settleChar(charEl) {
    charEl.classList.add('hero-char--settled');
  }

  if (reducedMotion) {
    return;
  }

  function buildAnimatedHeadline() {
    var fullText = HEADLINE_LINES.join(' ');
    var sr = document.createElement('span');
    sr.className = 'hero-title-sr-only';
    sr.textContent = fullText;

    var wrap = document.createElement('span');
    wrap.className = 'hero-title-chars';
    wrap.setAttribute('aria-hidden', 'true');

    HEADLINE_LINES.forEach(function (line, lineIdx) {
      if (lineIdx > 0) {
        wrap.appendChild(document.createElement('br'));
      }

      for (var i = 0; i < line.length; i++) {
        var ch = line.charAt(i);
        var slot = document.createElement('span');
        slot.className = 'hero-char-slot' + (ch === ' ' ? ' hero-char-slot--space' : '');
        slot.style.setProperty('--char-index', String(i));

        var charEl = document.createElement('span');
        charEl.className = 'hero-char';
        charEl.textContent = ch;

        slot.appendChild(charEl);
        wrap.appendChild(slot);

        charEl.addEventListener('animationend', function (ev) {
          if (ev.animationName !== 'hero-char-gradient') return;
          settleChar(charEl);
        });
      }
    });

    titleEl.style.minHeight = titleEl.offsetHeight + 'px';
    titleEl.replaceChildren(sr, wrap);
    titleEl.classList.add('hero-title--animated');

    return wrap;
  }

  function startAnimation() {
    buildAnimatedHeadline();
    void titleEl.offsetHeight;
    titleEl.classList.add('hero-title--ready');
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(startAnimation).catch(startAnimation);
  } else {
    startAnimation();
  }
})();
