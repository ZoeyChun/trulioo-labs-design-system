(function () {
  'use strict';

  var CHECK_SVG = '<svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1.5 4l2 2 3-3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ENTITY_ICONS = {
    Business: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="2" y="4" width="12" height="10" rx="1"/><path d="M5 4V3a3 3 0 0 1 6 0v1"/></svg>',
    Person: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="8" cy="5.5" r="2.5"/><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>',
    Document: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5 2h5l3 3v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M10 2v4h4"/></svg>',
    Device: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="4" y="1.5" width="8" height="13" rx="1.5"/><path d="M7 12.5h2"/></svg>',
    'Bank Account': '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M2 6.5 8 3l6 3.5"/><path d="M3.5 7v5.5h9V7"/><path d="M6.5 12.5v-3h3v3"/></svg>',
  };

  var ENTITY_SLUG = {
    Business: 'business',
    Person: 'person',
    Document: 'document',
    Device: 'device',
    'Bank Account': 'bank-account',
  };

  var AVAILABILITY_META = {
    live: { label: 'Live', tone: 'success' },
    demo: { label: 'Demo', tone: 'warning' },
    external: { label: 'External', tone: 'info' },
  };

  var state = {
    search: '',
    entity: {},
    capability: {},
    availability: {},
  };

  var els = {
    search: document.getElementById('labsSearchInput'),
    featuredSection: document.getElementById('labsFeaturedSection'),
    featured: document.getElementById('labsFeaturedRow'),
    featuredLabel: document.getElementById('labsFeaturedLabel'),
    browseTitle: document.getElementById('labsBrowseTitle'),
    grid: document.getElementById('labsGrid'),
    filters: document.getElementById('labsFilters'),
  };

  function hasActiveFilters() {
    if (state.search.trim()) return true;
    if (Object.keys(state.entity).some(function (k) { return state.entity[k]; })) return true;
    if (Object.keys(state.capability).some(function (k) { return state.capability[k]; })) return true;
    if (Object.keys(state.availability).some(function (k) { return state.availability[k]; })) return true;
    return false;
  }

  function availabilityMeta(id) {
    return AVAILABILITY_META[id] || { label: id, tone: 'info' };
  }

  function matchesFilters(item) {
    var q = state.search.trim().toLowerCase();
    if (q) {
      var hay = (item.title + ' ' + item.description).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }

    var entityKeys = Object.keys(state.entity).filter(function (k) { return state.entity[k]; });
    if (entityKeys.length && entityKeys.indexOf(item.entity) === -1) return false;

    var capKeys = Object.keys(state.capability).filter(function (k) { return state.capability[k]; });
    if (capKeys.length && capKeys.indexOf(item.capability) === -1) return false;

    var availKeys = Object.keys(state.availability).filter(function (k) { return state.availability[k]; });
    if (availKeys.length && availKeys.indexOf(item.availability) === -1) return false;

    return true;
  }

  function renderExperienceCard(item) {
    var icon = ENTITY_ICONS[item.entity] || '';
    var meta = availabilityMeta(item.availability);
    var entitySlug = ENTITY_SLUG[item.entity] || 'business';

    return (
      '<article class="demo-scenario-card labs-experience-card">' +
        '<div class="labs-card-head">' +
          '<div class="demo-scenario-tag labs-entity-tag labs-entity-tag--' + entitySlug + '">' + icon + '<span>' + item.entity + '</span></div>' +
          '<span class="labs-card-availability">' +
            '<span class="demo-scenario-status-dot demo-scenario-status-dot--' + meta.tone + '" aria-hidden="true"></span>' +
            '<span class="labs-card-availability-label">' + meta.label + '</span>' +
          '</span>' +
        '</div>' +
        '<div class="demo-scenario-body">' +
          '<h3 class="demo-scenario-title">' + item.title + '</h3>' +
          '<p class="demo-scenario-desc">' + item.description + '</p>' +
        '</div>' +
        '<div class="demo-scenario-divider" aria-hidden="true"></div>' +
        '<div class="demo-scenario-foot labs-card-foot">' +
          '<span class="labs-card-capability">' + item.capability + '</span>' +
          '<a class="demo-scenario-try" href="' + item.url + '">Open</a>' +
        '</div>' +
      '</article>'
    );
  }

  function sortByOrder(items) {
    return items.slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
  }

  function render() {
    var visible = sortByOrder(labsExperiences.filter(matchesFilters));
    var filtering = hasActiveFilters();

    if (els.featuredSection) {
      els.featuredSection.hidden = filtering;
    }
    if (els.browseTitle) {
      els.browseTitle.hidden = filtering;
    }

    if (filtering) {
      if (els.featured) els.featured.innerHTML = '';

      if (els.grid) {
        els.grid.innerHTML = visible.length
          ? visible.map(renderExperienceCard).join('')
          : '<p class="labs-empty">No experiences match your filters.</p>';
      }
      return;
    }

    var featured = visible.filter(function (item) { return item.featured; });
    var browse = visible.filter(function (item) { return !item.featured; });

    if (els.featuredLabel) {
      els.featuredLabel.textContent = '⭐ Featured Experiences (' + featured.length + ')';
    }

    if (els.featured) {
      els.featured.innerHTML = featured.length
        ? featured.map(renderExperienceCard).join('')
        : '<p class="labs-empty">No featured experiences available.</p>';
    }

    if (els.grid) {
      els.grid.innerHTML = browse.length
        ? browse.map(renderExperienceCard).join('')
        : '<p class="labs-empty">No experiences available.</p>';
    }
  }

  function toggleFilter(group, value, checked) {
    if (group === 'entity') state.entity[value] = checked;
    else if (group === 'capability') state.capability[value] = checked;
    else if (group === 'availability') state.availability[value] = checked;
    render();
  }

  function buildFilters() {
    if (!els.filters) return;

    var html = '';
    html += '<label class="labs-search">' +
      '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="9" cy="9" r="5.5"/><path d="M14 14l3 3" stroke-linecap="round"/></svg>' +
      '<input id="labsSearchInput" type="search" placeholder="Search" autocomplete="off">' +
    '</label>';

    html += buildFilterGroup('entity', 'Entity', labsFilterGroups.entity, false);
    html += buildFilterGroup('capability', 'Capability', labsFilterGroups.capability, false);
    html += buildFilterGroup('availability', 'Availability', labsFilterGroups.availability, true);

    els.filters.innerHTML = html;
    els.search = document.getElementById('labsSearchInput');

    els.filters.querySelectorAll('[data-filter-group]').forEach(function (row) {
      row.addEventListener('click', function () {
        var group = row.getAttribute('data-filter-group');
        var value = row.getAttribute('data-filter-value');
        var checked = !row.classList.contains('is-checked');
        row.classList.toggle('is-checked', checked);
        row.querySelector('input').checked = checked;
        toggleFilter(group, value, checked);
      });
    });

    if (els.search) {
      els.search.addEventListener('input', function () {
        state.search = els.search.value;
        render();
      });
    }
  }

  function buildFilterGroup(groupKey, label, items, isAvailability) {
    var rows = items.map(function (item) {
      var value = isAvailability ? item.id : item;
      var text = isAvailability ? item.label : item;
      var checked = false;

      var dotHtml = isAvailability
        ? '<span class="labs-filter-dot labs-filter-dot--' + item.dot + '" aria-hidden="true"></span>'
        : '';

      return (
        '<button type="button" class="labs-filter-row' + (checked ? ' is-checked' : '') + '" data-filter-group="' + groupKey + '" data-filter-value="' + value + '">' +
          '<input type="checkbox"' + (checked ? ' checked' : '') + ' tabindex="-1" aria-hidden="true">' +
          '<span class="labs-filter-box">' + CHECK_SVG + '</span>' +
          dotHtml +
          '<span class="labs-filter-text">' + text + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="labs-filter-group">' +
        '<div class="labs-filter-label">' + label + '</div>' +
        '<div class="labs-filter-list">' + rows + '</div>' +
      '</div>'
    );
  }

  buildFilters();
  render();
})();
