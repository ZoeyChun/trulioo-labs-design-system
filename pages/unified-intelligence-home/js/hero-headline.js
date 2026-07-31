(function () {
  'use strict';

  var HEADLINE_LINES = [
    'Turn verification signals into',
    'actionable risk intelligence.',
  ];

  var DESCENDER_CHARS = { g: 1, j: 1, p: 1, q: 1, y: 1 };

  var titleEl = document.getElementById('heroTitle');
  if (!titleEl) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var totalChars = 0;
  var settledCount = 0;
  var finalizeTimer = null;

  function flattenHeadline() {
    if (titleEl.classList.contains('hero-title--flattened')) return;

    titleEl.classList.add('hero-title--flattened', 'hero-title--settled');
    titleEl.classList.remove('hero-title--ready', 'hero-title--animated');

    var sr = titleEl.querySelector('.hero-title-sr-only');
    var nodes = [];

    if (sr) nodes.push(sr);

    HEADLINE_LINES.forEach(function (line, lineIdx) {
      if (lineIdx > 0) nodes.push(document.createElement('br'));
      nodes.push(document.createTextNode(line));
    });

    titleEl.replaceChildren.apply(titleEl, nodes);
  }

  function settleChar(charEl) {
    if (charEl.classList.contains('hero-char--settled')) return;
    charEl.classList.add('hero-char--settled');
    settledCount += 1;
    if (settledCount >= totalChars) {
      flattenHeadline();
    }
  }

  if (reducedMotion) {
    return;
  }

  function buildAnimatedHeadline() {
    totalChars = 0;
    settledCount = 0;
    titleEl.classList.remove('hero-title--settled', 'hero-title--flattened', 'hero-title--ready');

    if (finalizeTimer) {
      clearTimeout(finalizeTimer);
      finalizeTimer = null;
    }

    var fullText = HEADLINE_LINES.join(' ');
    var sr = document.createElement('span');
    sr.className = 'hero-title-sr-only';
    sr.textContent = fullText;

    var wrap = document.createElement('span');
    wrap.className = 'hero-title-chars';
    wrap.setAttribute('aria-hidden', 'true');

    var charIndex = 0;

    // Splitting the headline into one inline-block per letter means the browser
    // can no longer apply kerning across those element boundaries, so the
    // animated text sits ~4% looser than the final (kerned) text and letters
    // visibly tighten the instant it flattens. To avoid that, measure where each
    // glyph actually lands in kerned text vs the un-kerned per-letter layout,
    // and add the difference as margin so each slot's advance matches the final
    // spacing — the letters then animate straight into their kerned positions.
    function measureLine(str, kerned) {
      var meas = document.createElement('span');
      meas.className = 'hero-title';
      meas.style.cssText =
        'position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;' +
        'white-space:pre;max-width:none;' +
        'font-kerning:' + (kerned ? 'normal' : 'none') + ';' +
        'font-variant-ligatures:' + (kerned ? 'normal' : 'none') + ';';
      var marks = [];
      for (var m = 0; m < str.length; m++) {
        var g = document.createElement('span');
        g.style.whiteSpace = 'pre';
        g.textContent = str.charAt(m);
        meas.appendChild(g);
        marks.push(g);
      }
      titleEl.appendChild(meas);
      var base = meas.getBoundingClientRect().left;
      var xs = marks.map(function (g) {
        return g.getBoundingClientRect().left - base;
      });
      titleEl.removeChild(meas);
      return xs;
    }

    HEADLINE_LINES.forEach(function (line, lineIdx) {
      if (lineIdx > 0) {
        wrap.appendChild(document.createElement('br'));
      }

      totalChars += line.length;

      var kx = measureLine(line, true);
      var nx = measureLine(line, false);

      for (var i = 0; i < line.length; i++) {
        var ch = line.charAt(i);
        var slot = document.createElement('span');
        var slotClass = 'hero-char-slot';
        if (ch === ' ') slotClass += ' hero-char-slot--space';
        else if (DESCENDER_CHARS[ch]) slotClass += ' hero-char-slot--descender';
        slot.className = slotClass;
        // Delay is keyed to the column within the line (i), not a running
        // global index, so both lines reveal in sync — column 0 of line 1 and
        // line 2 start together, column 1 next, and so on.
        slot.style.setProperty('--char-index', String(i));
        // Nudge this glyph's advance to the kerned spacing (kerned minus
        // un-kerned advance to the next glyph); last glyph on a line needs none.
        if (i < line.length - 1) {
          var delta = (kx[i + 1] - kx[i]) - (nx[i + 1] - nx[i]);
          if (delta) slot.style.marginRight = delta.toFixed(2) + 'px';
        }
        charIndex += 1;

        var charEl = document.createElement('span');
        charEl.className = 'hero-char';
        charEl.textContent = ch;

        slot.appendChild(charEl);
        wrap.appendChild(slot);

        charEl.addEventListener('animationend', function (ev) {
          if (ev.animationName !== 'hero-char-gradient') return;
          settleChar(ev.currentTarget);
        });
      }
    });

    titleEl.replaceChildren(sr, wrap);
    titleEl.classList.add('hero-title--animated');
  }

  function startAnimation() {
    buildAnimatedHeadline();
    void titleEl.offsetHeight;
    titleEl.classList.add('hero-title--ready');

    finalizeTimer = setTimeout(flattenHeadline, 3200);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(startAnimation).catch(startAnimation);
  } else {
    startAnimation();
  }
})();
