/* TruAI panel open/close.

   State lives on .v2-shell as data-truai; CSS owns every transition. This
   only flips the attribute and keeps the ARIA and focus bookkeeping honest:
   the collapsed bar is removed from the tab order while the panel is open
   and vice versa, so keyboard users never land on an invisible control. */
(function () {
  var shell  = document.querySelector('.v2-shell');
  var panel  = document.getElementById('ai-panel');
  var closeB = document.getElementById('v2-close');
  var askbar = document.getElementById('ai-askbar');
  var input  = document.getElementById('v2-ask');
  if (!shell || !panel || !closeB || !askbar) return;

  var focusables = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function setState(open, moveFocus) {
    shell.setAttribute('data-truai', open ? 'open' : 'closed');
    closeB.setAttribute('aria-expanded', String(open));
    askbar.setAttribute('aria-expanded', String(open));

    /* Hidden things must not be reachable by Tab. */
    panel.querySelectorAll(focusables).forEach(function (el) {
      if (open) { el.removeAttribute('tabindex'); }
      else { el.setAttribute('tabindex', '-1'); }
    });
    askbar.setAttribute('tabindex', open ? '-1' : '0');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');

    if (!moveFocus) return;
    if (open) {
      /* Wait for the frame to finish widening before focusing the field,
         or the browser scrolls to a box that is still mid-transition. */
      window.setTimeout(function () { if (input) input.focus(); }, 440);
    } else {
      askbar.focus();
    }
  }

  closeB.addEventListener('click', function () { setState(false, true); });
  askbar.addEventListener('click', function () { setState(true, true); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && shell.getAttribute('data-truai') === 'open') {
      setState(false, true);
    }
  });

  setState(true, false);
})();
