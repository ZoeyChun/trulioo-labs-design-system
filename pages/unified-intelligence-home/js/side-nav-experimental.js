(function (global) {
  'use strict';

  var HISTORY_SVG = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M8 2.5a5.5 5.5 0 1 1-4.9 3M3 2.5v3h3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CHEVRONS_LEFT = '<path d="M10 4 6 8l4 4M6 4 2 8l4 4"/>';

  function expandLabsNav(sideNav) {
    sideNav.classList.remove('tds-side-nav--collapsed');

    var collapseBtn = document.getElementById('sidenav-collapse');
    if (collapseBtn) {
      collapseBtn.setAttribute('aria-expanded', 'true');
      collapseBtn.setAttribute('aria-label', 'Collapse sidebar');
      var collapseSvg = collapseBtn.querySelector('svg');
      if (collapseSvg) collapseSvg.innerHTML = CHEVRONS_LEFT;
    }

    var profile = sideNav.querySelector('.tds-side-nav__profile');
    if (profile) profile.classList.remove('tds-side-nav__profile--collapsed');

    var iconRail = sideNav.querySelector('.tds-side-nav__icon-rail');
    if (iconRail) iconRail.setAttribute('aria-hidden', 'true');

    var labsNav = sideNav.querySelector('.tds-side-nav__nav-item[aria-expanded]');
    var subNav = sideNav.querySelector('.tds-side-nav__sub-nav');
    if (labsNav) labsNav.setAttribute('aria-expanded', 'true');
    if (subNav) subNav.style.display = '';

    var chevron = labsNav && labsNav.querySelector('.tds-side-nav__nav-item-chevron svg');
    if (chevron) chevron.innerHTML = '<path d="M4 10l4-4 4 4"/>';
  }

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
      labsBtn.onclick = function (event) {
        var subNav = sideNav.querySelector('.tds-side-nav__sub-nav');
        if (!subNav) {
          window.location.href = 'labs.html';
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        expandLabsNav(sideNav);
      };
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
