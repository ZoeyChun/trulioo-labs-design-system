(function () {
  'use strict';

  var CHECK_SVG = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>';
  var TAG_REMOVE_SVG = '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6"/></svg>';
  var EXPERIENCE_TYPE_META = {
    live: { tag: 'Live', tone: 'live' },
    demo: { tag: 'Demo', tone: 'demo' },
    experiment: { tag: 'Experiment', tone: 'experiment' }
  };

  var FILTER_CONFIG = [
    { key: 'experienceType', label: 'Experience Type', items: labsFilterGroups.experienceType },
    { key: 'useCase', label: 'Use Case', items: labsFilterGroups.useCase },
    { key: 'industry', label: 'Industry', items: labsFilterGroups.industry }
  ];

  var state = {
    search: '',
    experienceType: {},
    useCase: {},
    industry: {}
  };

  var els = {
    filterBar: document.getElementById('labsFilterBar'),
    filterMenu: document.getElementById('labsFilterMenu'),
    activeFilters: document.getElementById('labsActiveFilters'),
    search: document.getElementById('labsSearchInput'),
    featuredSection: document.getElementById('labsFeaturedSection'),
    featured: document.getElementById('labsFeaturedRow'),
    browseSection: document.getElementById('labsBrowseSection'),
    browseTitle: document.getElementById('labsBrowseTitle'),
    grid: document.getElementById('labsGrid')
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function filterItemValue(item) {
    return typeof item === 'string' ? item : item.id;
  }

  function filterItemLabel(item) {
    return typeof item === 'string' ? item : item.label;
  }

  function labelFor(groupKey, value) {
    var config = FILTER_CONFIG.find(function (item) { return item.key === groupKey; });
    if (!config) return value;
    var match = config.items.find(function (item) { return filterItemValue(item) === value; });
    return match ? filterItemLabel(match) : value;
  }

  function getGroupState(key) {
    return state[key] || {};
  }

  function selectedKeys(key) {
    return Object.keys(getGroupState(key)).filter(function (k) { return getGroupState(key)[k]; });
  }

  function typeMeta(id) {
    return EXPERIENCE_TYPE_META[id] || { tag: id, tone: 'experiment' };
  }

  function hasActiveFilters() {
    if (state.search.trim()) return true;
    return FILTER_CONFIG.some(function (config) { return selectedKeys(config.key).length > 0; });
  }

  function matchesFilters(item) {
    var q = state.search.trim().toLowerCase();
    if (q) {
      var type = typeMeta(item.experienceType);
      var hay = [
        item.title,
        item.description,
        type.tag,
        labelFor('experienceType', item.experienceType),
        item.useCase,
        item.industry
      ].join(' ').toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }

    var typeKeys = selectedKeys('experienceType');
    if (typeKeys.length && typeKeys.indexOf(item.experienceType) === -1) return false;

    var useCaseKeys = selectedKeys('useCase');
    if (useCaseKeys.length && useCaseKeys.indexOf(item.useCase) === -1) return false;

    var industryKeys = selectedKeys('industry');
    if (industryKeys.length && industryKeys.indexOf(item.industry) === -1) return false;

    return true;
  }

  function sortByOrder(items) {
    return items.slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
  }

  function hasLink(item) {
    return !!(item.url && item.url !== '#');
  }

  function wrapCard(item, className, inner) {
    if (hasLink(item)) {
      return '<a class="' + className + '" href="' + escapeHtml(item.url) + '">' + inner + '</a>';
    }
    return '<div class="' + className + ' labs-card--static" role="group">' + inner + '</div>';
  }

  function renderFeaturedCard(item) {
    var linked = hasLink(item);
    var preview = linked && item.preview
      ? '<img src="' + escapeHtml(item.preview) + '" alt="" width="1344" height="900">'
      : '';
    return wrapCard(
      item,
      'labs-featured-card',
      '<div class="labs-featured-card__header">' +
        '<h3 class="labs-featured-card__title">' + escapeHtml(item.title) + '</h3>' +
        '<p class="labs-featured-card__desc">' + escapeHtml(item.description) + '</p>' +
      '</div>' +
      '<div class="labs-featured-card__preview">' +
        '<div class="labs-featured-card__preview-frame' + (preview ? ' labs-featured-card__preview-frame--shot' : '') + '" aria-hidden="true">' +
          preview +
        '</div>' +
      '</div>'
    );
  }

  function renderExperienceCard(item) {
    var type = typeMeta(item.experienceType);
    return wrapCard(
      item,
      'labs-card',
      '<div class="labs-card__body">' +
        '<h3 class="labs-card__title">' + escapeHtml(item.title) + '</h3>' +
        '<p class="labs-card__desc">' + escapeHtml(item.description) + '</p>' +
      '</div>' +
      '<div class="labs-card__meta">' +
        '<span class="labs-card__type labs-card__type--' + type.tone + '">' +
          '<span class="labs-card__dot" aria-hidden="true"></span>' +
          '<span>' + escapeHtml(type.tag) + '</span>' +
        '</span>' +
        '<span class="labs-card__sep" aria-hidden="true"></span>' +
        '<span class="labs-card__tag">' + escapeHtml(item.useCase) + '</span>' +
        '<span class="labs-card__sep" aria-hidden="true"></span>' +
        '<span class="labs-card__tag">' + escapeHtml(item.industry) + '</span>' +
      '</div>'
    );
  }

  function render() {
    var visible = sortByOrder(labsExperiences.filter(matchesFilters));
    var filtering = hasActiveFilters();

    if (els.featuredSection) els.featuredSection.hidden = filtering;
    if (els.browseTitle) els.browseTitle.textContent = filtering ? 'Results' : 'All Experiences';

    if (filtering) {
      if (els.featured) els.featured.innerHTML = '';
      if (els.grid) {
        els.grid.innerHTML = visible.length
          ? visible.map(renderExperienceCard).join('')
          : '<p class="labs-empty">No experiences match your search or filters.</p>';
      }
      return;
    }

    var featured = visible.filter(function (item) { return item.featured; });
    var browse = visible.filter(function (item) { return !item.featured; });

    if (els.featured) {
      els.featured.innerHTML = featured.length
        ? featured.map(renderFeaturedCard).join('')
        : '<p class="labs-empty">No featured experiences available.</p>';
    }

    if (els.grid) {
      els.grid.innerHTML = browse.length
        ? browse.map(renderExperienceCard).join('')
        : '<p class="labs-empty">No experiences available.</p>';
    }
  }

  function allSelectedCount() {
    return FILTER_CONFIG.reduce(function (sum, config) {
      return sum + selectedKeys(config.key).length;
    }, 0);
  }

  function firstSelectedLabel() {
    var first = '';
    FILTER_CONFIG.some(function (config) {
      var keys = selectedKeys(config.key);
      if (!keys.length) return false;
      first = labelFor(config.key, keys[0]);
      return true;
    });
    return first;
  }

  function syncFilterButton() {
    if (!els.filterBar) return;
    var count = allSelectedCount();
    var valueEl = els.filterBar.querySelector('.tds-filter-button__trigger-value');
    var counter = els.filterBar.querySelector('.tds-filter-button__counter');

    els.filterBar.classList.toggle('tds-filter-button--selected', count > 0);
    els.filterBar.classList.toggle('tds-filter-button--multi', count > 1);

    if (valueEl) valueEl.textContent = count ? firstSelectedLabel() : '';
    if (counter) {
      counter.textContent = count > 1 ? '+' + (count - 1) : '';
      counter.hidden = count <= 1;
    }

    if (!els.filterMenu) return;
    els.filterMenu.querySelectorAll('[data-filter-value]').forEach(function (node) {
      var group = node.getAttribute('data-filter-group');
      var value = node.getAttribute('data-filter-value');
      var active = !!getGroupState(group)[value];
      node.classList.toggle('tds-action-list-item--selected', active);
      node.setAttribute('aria-checked', active ? 'true' : 'false');
    });
  }

  function renderActiveChips() {
    if (!els.activeFilters) return;
    var chips = [];
    FILTER_CONFIG.forEach(function (config) {
      selectedKeys(config.key).forEach(function (value) {
        var label = labelFor(config.key, value);
        chips.push(
          '<span class="tds-tag tds-tag--md tds-tag--default tds-tag--removable">' +
            '<span>' + escapeHtml(label) + '</span>' +
            '<button type="button" class="tds-tag__remove" aria-label="Remove ' + escapeHtml(label) + ' filter" data-chip-group="' + config.key + '" data-chip-value="' + escapeHtml(value) + '">' + TAG_REMOVE_SVG + '</button>' +
          '</span>'
        );
      });
    });
    els.activeFilters.innerHTML = chips.join('');
    els.activeFilters.hidden = !chips.length;
  }

  function setFilterValue(groupKey, value, checked) {
    if (checked) state[groupKey][value] = true;
    else delete state[groupKey][value];
    syncFilterButton();
    renderActiveChips();
    render();
  }

  function clearAllFilters() {
    FILTER_CONFIG.forEach(function (config) { state[config.key] = {}; });
    syncFilterButton();
    renderActiveChips();
    render();
  }

  function buildFilterMenu() {
    if (!els.filterMenu) return;
    els.filterMenu.innerHTML = FILTER_CONFIG.map(function (config) {
      var items = config.items.map(function (item) {
        var value = filterItemValue(item);
        var label = filterItemLabel(item);
        return (
          '<button type="button" class="tds-action-list-item" role="menuitemcheckbox" data-filter-group="' + config.key + '" data-filter-value="' + escapeHtml(value) + '" aria-checked="false">' +
            '<span class="tds-action-list-item__label">' + escapeHtml(label) + '</span>' +
            '<span class="tds-action-list-item__trailing-visual" aria-hidden="true">' + CHECK_SVG + '</span>' +
          '</button>'
        );
      }).join('');
      return '<div class="labs-filter-group"><p class="labs-filter-group__label">' + escapeHtml(config.label) + '</p>' + items + '</div>';
    }).join('');
  }

  function bindEvents() {
    if (els.search) {
      els.search.addEventListener('input', function () {
        state.search = els.search.value;
        render();
      });
    }

    if (els.filterBar) {
      els.filterBar.addEventListener('tds-filter-clear', function () {
        clearAllFilters();
      });
    }

    if (els.activeFilters) {
      els.activeFilters.addEventListener('click', function (event) {
        var chip = event.target.closest('[data-chip-group]');
        if (!chip) return;
        setFilterValue(chip.getAttribute('data-chip-group'), chip.getAttribute('data-chip-value'), false);
      });
    }
  }

  buildFilterMenu();
  bindEvents();
  if (window.TdsDropdownPanel) {
    var toolbarActions = document.querySelector('.labs-toolbar__actions');
    if (toolbarActions) window.TdsDropdownPanel.initMenus(toolbarActions);
  }
  if (els.filterMenu) {
    els.filterMenu.querySelectorAll('[data-filter-value]').forEach(function (node) {
      node.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var group = node.getAttribute('data-filter-group');
        var value = node.getAttribute('data-filter-value');
        setFilterValue(group, value, !getGroupState(group)[value]);
      }, true);
    });
  }
  syncFilterButton();
  renderActiveChips();
  render();
})();
