(function (global) {
  'use strict';

  var HISTORY_SVG = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M8 2.5a5.5 5.5 0 1 1-4.9 3M3 2.5v3h3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function init(options) {
    options = options || {};
    var active = document.body.getAttribute('data-sidenav-active') || options.active || 'home';
    var sideNav = document.getElementById(options.rootId || 'app-sidenav');
    if (!sideNav) return;

    sideNav.classList.add('tds-side-nav--collapsed', 'tds-side-nav--experimental');

    var rail = sideNav.querySelector('.tds-side-nav__icon-rail');
    if (!rail) return;

    rail.setAttribute('aria-hidden', 'false');

    var homeBtn = rail.querySelector('[aria-label="Home"]');
    var labsBtn = rail.querySelector('[aria-label="Labs"]');
    var historyBtn = rail.querySelector('[data-nav="history"]');

    if (homeBtn) {
      homeBtn.onclick = function () { window.location.href = 'index.html'; };
    }
    if (labsBtn) {
      labsBtn.onclick = function () { window.location.href = 'labs.html'; };
    }

    if (!historyBtn) {
      historyBtn = document.createElement('button');
      historyBtn.type = 'button';
      historyBtn.className = 'tds-side-nav__icon-button';
      historyBtn.setAttribute('data-nav', 'history');
      historyBtn.setAttribute('aria-label', 'History');
      historyBtn.innerHTML =
        HISTORY_SVG +
        '<span class="tds-side-nav__tooltip" role="tooltip">' +
          '<span class="tds-side-nav__tooltip-caret"></span>' +
          '<span class="tds-side-nav__tooltip-body">History</span>' +
        '</span>';
      if (labsBtn && labsBtn.nextSibling) {
        rail.insertBefore(historyBtn, labsBtn.nextSibling);
      } else {
        rail.appendChild(historyBtn);
      }
    }

    if (historyBtn) {
      historyBtn.onclick = function () { window.location.href = 'history.html'; };
    }

    rail.querySelectorAll('.tds-side-nav__icon-button').forEach(function (btn) {
      btn.classList.remove('tds-side-nav__icon-button--active');
      btn.removeAttribute('aria-current');
    });

    if (active === 'history' && historyBtn) {
      historyBtn.classList.add('tds-side-nav__icon-button--active');
      historyBtn.setAttribute('aria-current', 'page');
    } else if (active === 'labs' && labsBtn) {
      labsBtn.classList.add('tds-side-nav__icon-button--active');
      labsBtn.setAttribute('aria-current', 'page');
    } else if (homeBtn) {
      homeBtn.classList.add('tds-side-nav__icon-button--active');
      homeBtn.setAttribute('aria-current', 'page');
    }
  }

  global.SideNavExperimental = { init: init };
})(typeof window !== 'undefined' ? window : globalThis);
