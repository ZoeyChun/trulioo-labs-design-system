(function (global) {
  'use strict';

  var ICON_EXPAND =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
      '<path d="M6 2H2v4M10 2h4v4M10 14h4v-4M6 14H2v-4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
  var ICON_COLLAPSE =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
      '<path d="M5 2H2v3M11 2h3v3M11 14h3v-3M5 14H2v-3" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
  var ICON_CLOSE =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
      '<path d="M4 4l8 8M12 4l-8 8" stroke-linecap="round"/>' +
    '</svg>';
  var ICON_SEND =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="M8 12V4M8 4l-3 3M8 4l3 3" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var expanded = false;
  var bound = false;

  function panelMarkup() {
    return (
      '<div class="truai-panel" id="truaiPanelSurface">' +
        '<div class="truai-panel-bg" aria-hidden="true"></div>' +
        '<div class="truai-panel-inner">' +
          '<header class="truai-panel-head">' +
            '<h2>TruAI Chat</h2>' +
            '<div class="truai-panel-actions">' +
              '<button class="truai-icon-btn" type="button" id="truaiExpand" aria-label="Expand panel">' + ICON_EXPAND + '</button>' +
              '<button class="truai-icon-btn" type="button" id="truaiClose" aria-label="Close TruAI chat">' + ICON_CLOSE + '</button>' +
            '</div>' +
          '</header>' +
          '<div class="truai-messages" id="truaiMessages">' +
            '<div class="truai-msg truai-msg-ai">What do you want to learn with TruAI?</div>' +
          '</div>' +
          '<footer class="truai-chatbar">' +
            '<input class="truai-chat-input" id="truaiInput" type="text" placeholder="Ask TruAI anything…" autocomplete="off" aria-label="Message TruAI">' +
            '<button class="truai-chat-send" type="button" id="truaiSend" aria-label="Send message">' + ICON_SEND + '</button>' +
          '</footer>' +
        '</div>' +
      '</div>'
    );
  }

  function ensureDialog() {
    var dialog = document.getElementById('truaiPanel');

    if (dialog && dialog.tagName !== 'DIALOG') {
      dialog.remove();
      dialog = null;
    }

    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'truai-dialog';
      dialog.id = 'truaiPanel';
      dialog.setAttribute('aria-label', 'TruAI Chat');
      dialog.innerHTML = panelMarkup();
      document.body.appendChild(dialog);
      return dialog;
    }

    if (!dialog.querySelector('.truai-panel-inner')) {
      dialog.innerHTML = panelMarkup();
    }

    if (dialog.parentNode !== document.body) {
      document.body.appendChild(dialog);
    }

    return dialog;
  }

  function supportsDialogModal(dialog) {
    return typeof dialog.showModal === 'function';
  }

  function openDialog(dialog) {
    dialog.classList.add('open');
    document.documentElement.classList.add('truai-open');

    if (dialog.open) return;

    if (supportsDialogModal(dialog)) {
      try {
        dialog.showModal();
        return;
      } catch (err) {
        /* fall through to attribute fallback */
      }
    }

    dialog.setAttribute('open', '');
  }

  function closeDialog(dialog) {
    dialog.classList.remove('open');
    document.documentElement.classList.remove('truai-open');

    if (dialog.open && typeof dialog.close === 'function') {
      dialog.close();
      return;
    }

    dialog.removeAttribute('open');
  }

  function getSurface(dialog) {
    return dialog.querySelector('#truaiPanelSurface') || dialog.querySelector('.truai-panel');
  }

  function setOpen(isOpen) {
    var dialog = ensureDialog();
    var input = document.getElementById('truaiInput');
    var openBtns = document.querySelectorAll('.truai-btn');

    if (isOpen) {
      openDialog(dialog);
    } else {
      closeDialog(dialog);
      expanded = false;
      var surface = getSurface(dialog);
      if (surface) surface.classList.remove('truai-panel--expanded');
    }

    openBtns.forEach(function (btn) {
      btn.classList.toggle('is-hidden', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    if (isOpen) {
      window.setTimeout(function () {
        if (input) input.focus();
      }, 120);
    }
  }

  function appendUserMsg(text) {
    var messages = document.getElementById('truaiMessages');
    if (!messages) return;
    var el = document.createElement('div');
    el.className = 'truai-msg truai-msg-user';
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend() {
    var input = document.getElementById('truaiInput');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    appendUserMsg(text);
    input.value = '';
  }

  function bind() {
    if (bound) return;
    bound = true;

    var dialog = ensureDialog();

    document.querySelectorAll('.truai-btn').forEach(function (btn) {
      btn.setAttribute('aria-controls', 'truaiPanel');
      if (!btn.getAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
    });

    dialog.addEventListener('click', function (e) {
      if (!e.target.closest('.truai-panel-inner')) {
        setOpen(false);
      }
    });

    dialog.addEventListener('close', function () {
      dialog.classList.remove('open');
      document.documentElement.classList.remove('truai-open');
      document.querySelectorAll('.truai-btn').forEach(function (btn) {
        btn.classList.remove('is-hidden');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    dialog.addEventListener('cancel', function (e) {
      e.preventDefault();
      setOpen(false);
    });

    document.addEventListener('click', function (e) {
      if (e.target.closest('.truai-btn')) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.target.closest('#truaiClose')) {
        setOpen(false);
        return;
      }
      if (e.target.closest('#truaiSend')) {
        handleSend();
        return;
      }
      if (e.target.closest('#truaiExpand')) {
        var surface = getSurface(dialog);
        var expandBtn = document.getElementById('truaiExpand');
        if (!surface || !expandBtn) return;
        expanded = !expanded;
        surface.classList.toggle('truai-panel--expanded', expanded);
        expandBtn.innerHTML = expanded ? ICON_COLLAPSE : ICON_EXPAND;
        expandBtn.setAttribute('aria-label', expanded ? 'Collapse panel' : 'Expand panel');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target && e.target.id === 'truaiInput') {
        e.preventDefault();
        handleSend();
      }
    });
  }

  global.TruAIPanel = {
    init: bind,
    open: function () { bind(); setOpen(true); },
    close: function () { setOpen(false); },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})(typeof window !== 'undefined' ? window : globalThis);
