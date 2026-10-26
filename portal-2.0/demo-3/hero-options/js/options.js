/* ============================================================
   Hero options — the three final surfaces.
   ============================================================

   A decision page, not a playground. One dot field, three
   backgrounds: the same engine, the same config, the same chrome,
   rendered on the three surfaces under consideration.

   The heroes are built from one template function rather than three
   copies of the markup, because a comparison is worthless if the
   things being compared differ by accident. The only thing that
   varies between cards is the background colour.

   The field config needs js/tru-dot-lab.js — the shipped
   TruDotField has no cascade, no link mesh and no pointer response.
   ------------------------------------------------------------------ */

(function (global) {
  'use strict';

  /* One field, shared by all three. Verbatim from the playground's
     Copy config, at the agreed 60px grid. */
  var FIELD = {
    formation: 'grid',
    spacing: 60,
    jitter: 0,
    count: 2000,
    orbScale: 1,
    tilt: 23,
    perspective: 2.6,
    spin: 0.0048,
    limb: 1,
    glyph: 'circle',
    size: 1.6,
    sizeVary: 0,
    sizeTilt: 0,
    rotate: 0,
    color: '#0e8a78',
    color2: '#ffd166',
    blend: 'none',
    opacity: 0.45,
    additive: 0,
    shape: 'full',
    shapeScale: 1.8,
    shapeX: 0.5,
    shapeY: 0.5,
    feather: 0.34,
    invert: 0,
    clear: 0.6,
    clearSize: 0.42,
    clearX: 0.5,
    clearY: 0.45,
    fade: 1,
    fadeDir: 'none',
    links: 0.1,
    linkWidth: 1,
    style: 'cascade',
    intensity: 1,
    speed: 0.08,
    angle: 35,
    pointer: 'glow',
    pointerR: 180,
    pointerS: 1
  };

  /* In the order they were shown. `tone` drives the headline colour
     and the composer's edge — a white card on a white hero needs one. */
  var SURFACES = [
    {
      id: 'mint',
      name: 'Mint wash',
      value: '#e6f1ec',
      tone: 'light',
      note: 'The field sits quietest here — teal at 45% against a pale green is close to a watermark.'
    },
    {
      id: 'inverse',
      name: 'Forest dark',
      value: '#172d2d',
      tone: 'dark',
      note: 'The shipped hero surface. The dots read as light against it, so the field carries the most weight of the three.'
    },
    {
      id: 'white',
      name: 'White',
      value: '#ffffff',
      tone: 'light',
      note: 'The most contrast between dot and ground, which makes the grid and the mesh the most legible — and the most literal.'
    }
  ];

  function fieldText(surface) {
    var lines = [];
    for (var k in global.TruDotLab.DEFAULTS) {
      if (!global.TruDotLab.DEFAULTS.hasOwnProperty(k)) continue;
      var v = FIELD[k];
      lines.push('  ' + k + ': ' + (typeof v === 'string' ? '"' + v + '"' : v));
    }
    return '/* Hero surface: ' + surface.name + ' ' + surface.value + '\n' +
      '   Needs the playground engine (js/tru-dot-lab.js).\n' +
      '   TruDotField would ignore: style "cascade", fadeDir, links, pointer */\n' +
      'var DARK_CONFIG = {\n' + lines.join(',\n') + '\n};';
  }

  /* One template, three instances — see the header note. */
  function heroMarkup() {
    return '' +
      '<canvas class="pg-hero__dots" aria-hidden="true"></canvas>' +
      '<div class="pg-hero__veil" aria-hidden="true"></div>' +
      '<div class="pg-hero__content">' +
        '<div class="pg-hero__welcome">' +
          '<h1 class="pg-hero__hello">Welcome back, Jane.</h1>' +
        '</div>' +
        '<div class="d1-composer">' +
          '<form class="d1-prompt" action="#" onsubmit="return false;">' +
            '<div class="d1-prompt__field">' +
              '<span class="tds-tag tds-tag--md tds-tag--default d1-prompt__ctx" aria-hidden="true">' +
                '<span class="tds-tag__leading-visual">' +
                  '<i class="fa-regular fa-building" aria-hidden="true"></i>' +
                '</span>KYB Verification</span>' +
              '<div class="d1-prompt__entry">' +
                '<span class="d1-prompt__ph" aria-hidden="true">Ask questions or tell me what you’d like to do</span>' +
              '</div>' +
            '</div>' +
            '<div class="d1-prompt__bar">' +
              '<div class="d1-prompt__actions"><div class="d1-prompt__send-wrap">' +
                '<button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--circular d1-prompt__send" aria-label="Send" disabled>' +
                  '<span class="tds-icon-btn__icon">' +
                    '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
                    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 13V3m0 0L4.5 6.5M8 3l3.5 3.5"/></svg>' +
                  '</span>' +
                '</button>' +
              '</div></div>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>';
  }

  var fields = [];
  var toast, toastTimer = 0;

  function say(message) {
    toast.textContent = message;
    toast.classList.add('is-on');
    global.clearTimeout(toastTimer);
    toastTimer = global.setTimeout(function () { toast.classList.remove('is-on'); }, 2400);
  }

  function copy(surface) {
    var text = fieldText(surface);
    function done(ok) {
      say(ok ? surface.name + ' copied' : 'Copy blocked — logged to the console');
      if (!ok) global.console.log(text);
    }
    if (global.navigator.clipboard && global.navigator.clipboard.writeText) {
      global.navigator.clipboard.writeText(text).then(
        function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function build() {
    var host = document.getElementById('opt-list');

    SURFACES.forEach(function (surface) {
      var card = el('section', 'opt-card');

      var head = el('header', 'opt-card__head');

      /* The tag is the identifier: the swatch, the name and the hex. */
      var tag = el('span', 'opt-tag');
      var chip = el('span', 'opt-tag__chip');
      chip.style.background = surface.value;
      tag.appendChild(chip);
      tag.appendChild(el('span', 'opt-tag__name', surface.name));
      tag.appendChild(el('span', 'opt-tag__hex', surface.value.toUpperCase()));
      head.appendChild(tag);

      var btn = el('button', 'opt-card__copy', 'Copy config');
      btn.type = 'button';
      btn.addEventListener('click', function () { copy(surface); });
      head.appendChild(btn);
      card.appendChild(head);

      var hero = el('div', 'pg-hero');
      hero.dataset.layout = 'center';
      hero.dataset.width = 'bleed';
      hero.dataset.tone = surface.tone;
      hero.dataset.backdrop = 'none';
      hero.classList.add('is-no-orb', 'is-veiled');
      hero.style.background = surface.value;
      hero.style.setProperty('--pg-veil-bg', surface.value);
      hero.innerHTML = heroMarkup();
      card.appendChild(hero);

      card.appendChild(el('p', 'opt-card__note', surface.note));

      host.appendChild(card);

      fields.push(global.TruDotLab.mount(hero.querySelector('.pg-hero__dots'), FIELD));
    });
  }

  function boot() {
    toast = document.getElementById('opt-toast');
    build();

    var content = document.querySelector('[data-act="content"]');
    content.addEventListener('click', function () {
      var bare = document.body.classList.toggle('opt--bare');
      content.classList.toggle('is-on', bare);
      content.textContent = bare ? 'Show the copy' : 'Hide the copy';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
