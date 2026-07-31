(function () {
  'use strict';

  var CHECK_SVG = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>';
  var FILTER_SVG = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M2.5 4h11M4.5 8h7M6.5 12h3"/></svg>';
  var CLEAR_SVG = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>';
  var TAG_REMOVE_SVG = '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6"/></svg>';
  var SORT_ICON_ASC = '<svg class="icon icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3l4 5H4l4-5z"/></svg>';
  var SORT_ICON_DESC = '<svg class="icon icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 13l-4-5h8l-4 5z"/></svg>';

  var STATUS_TAG = {
    Completed: 'positive',
    'In Progress': 'intermediate',
    Monitoring: 'default',
    Failed: 'negative',
  };

  var OUTCOME_TAG = {
    'Low Risk': 'positive',
    Verified: 'positive',
    'Account Verified': 'positive',
    '2 UBOs Identified': 'intermediate',
    'Review Required': 'intermediate',
    'Manual Review Required': 'negative',
    'Elevated Device Risk': 'negative',
    'AI Report Generated': 'default',
    'Monitoring Active': 'default',
    'External Session Started': 'intermediate',
  };

  var FILTER_CONFIG = [
    { key: 'entity', label: 'Entity', items: historyFilterGroups.entity, multi: true },
    { key: 'experience', label: 'Experience', items: historyFilterGroups.experience, multi: true },
    { key: 'status', label: 'Status', items: historyFilterGroups.status, multi: true },
    { key: 'date', label: 'Date', items: historyFilterGroups.date, multi: false, isObject: true },
    { key: 'availability', label: 'Availability', items: historyFilterGroups.availability, multi: true, isObject: true },
  ];

  var state = {
    search: '',
    sortKey: 'lastUpdated',
    sortDir: 'desc',
    entity: {},
    experience: {},
    status: {},
    date: {},
    availability: {},
  };

  var els = {
    filterBar: document.getElementById('historyFilterBar'),
    activeFilters: document.getElementById('historyActiveFilters'),
    search: document.getElementById('historySearchInput'),
    thead: document.getElementById('historyTableHead'),
    tbody: document.getElementById('historyTableBody'),
    drawerTitle: document.getElementById('txnDrawerTitle'),
    drawerBody: document.getElementById('txnDrawerBody'),
  };

  function getGroupState(key) {
    return state[key] || {};
  }

  function selectedKeys(key) {
    return Object.keys(getGroupState(key)).filter(function (k) { return getGroupState(key)[k]; });
  }

  function parseDate(value) {
    return new Date(value).getTime();
  }

  function isWithinDateFilter(item) {
    var keys = selectedKeys('date');
    if (!keys.length || keys.indexOf('custom') !== -1) return true;

    var updated = parseDate(item.lastUpdated);
    var now = Date.now();
    var day = 24 * 60 * 60 * 1000;

    if (keys.indexOf('today') !== -1) {
      var start = new Date();
      start.setHours(0, 0, 0, 0);
      return updated >= start.getTime();
    }
    if (keys.indexOf('last7') !== -1) return updated >= now - (7 * day);
    if (keys.indexOf('last30') !== -1) return updated >= now - (30 * day);
    return true;
  }

  function matchesFilters(item) {
    var q = state.search.trim().toLowerCase();
    if (q) {
      var hay = [item.id, item.entity, item.experience].join(' ').toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }

    if (selectedKeys('entity').length && selectedKeys('entity').indexOf(item.entityType) === -1) return false;
    if (selectedKeys('experience').length && selectedKeys('experience').indexOf(item.experienceType) === -1) return false;
    if (selectedKeys('status').length && selectedKeys('status').indexOf(item.status) === -1) return false;
    if (selectedKeys('availability').length && selectedKeys('availability').indexOf(item.availability) === -1) return false;
    if (!isWithinDateFilter(item)) return false;

    return true;
  }

  function compareSortValues(a, b) {
    switch (state.sortKey) {
      case 'id':
        return a.id.localeCompare(b.id);
      case 'entity':
        return a.entity.localeCompare(b.entity);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'lastUpdated':
      default:
        return parseDate(a.lastUpdated) - parseDate(b.lastUpdated);
    }
  }

  function sortItems(items) {
    var dir = state.sortDir === 'asc' ? 1 : -1;
    return items.slice().sort(function (a, b) {
      return compareSortValues(a, b) * dir;
    });
  }

  function defaultSortDir(key) {
    return key === 'lastUpdated' ? 'desc' : 'asc';
  }

  function syncSortHeaders() {
    if (!els.thead) return;

    els.thead.querySelectorAll('th[data-sort]').forEach(function (th) {
      var key = th.getAttribute('data-sort');
      var icon = th.querySelector('.tds-data-table__sort-icon');

      if (key === state.sortKey) {
        th.setAttribute('aria-sort', state.sortDir === 'asc' ? 'ascending' : 'descending');
        if (icon) icon.innerHTML = state.sortDir === 'asc' ? SORT_ICON_ASC : SORT_ICON_DESC;
      } else {
        th.setAttribute('aria-sort', 'none');
        if (icon) icon.innerHTML = '';
      }
    });
  }

  function setSort(key) {
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = key;
      state.sortDir = defaultSortDir(key);
    }

    syncSortHeaders();
    renderRows();
  }

  function tagClass(type, value) {
    return 'tds-tag tds-tag--md tds-tag--' + (type[value] || 'default');
  }

  function statusTagClass(status) {
    return tagClass(STATUS_TAG, status);
  }

  function outcomeTagClass(outcome) {
    return tagClass(OUTCOME_TAG, outcome);
  }

  function renderRows() {
    if (!els.tbody) return;

    var visible = sortItems(historyTransactions.filter(matchesFilters));

    if (!visible.length) {
      els.tbody.innerHTML = '<tr><td colspan="6" class="history-empty">No transactions match your search or filters.</td></tr>';
      return;
    }

    els.tbody.innerHTML = visible.map(function (item) {
      return (
        '<tr class="history-table__row" tabindex="0" data-txn-id="' + item.id + '" aria-label="Open details for ' + item.id + '">' +
          '<td class="tds-data-table__text-cell"><span class="history-table__id">' + item.id + '</span></td>' +
          '<td class="tds-data-table__text-cell">' + item.entity + '</td>' +
          '<td class="tds-data-table__text-cell">' + item.experience + '</td>' +
          '<td><span class="tds-data-table__label-cell"><span class="' + outcomeTagClass(item.outcome) + '">' + item.outcome + '</span></span></td>' +
          '<td><span class="tds-data-table__label-cell"><span class="' + statusTagClass(item.status) + '">' + item.status + '</span></span></td>' +
          '<td class="tds-data-table__text-cell">' + item.lastUpdatedLabel + '</td>' +
        '</tr>'
      );
    }).join('');
  }

  function canOpenKybResults(item) {
    return item && item.entityType === 'Business';
  }

  function getUnifiedHomeUrl() {
    try {
      return new URL('index.html', window.location.href).href;
    } catch (e) {
      return 'index.html';
    }
  }

  function openKybResults(item) {
    if (!canOpenKybResults(item)) return;

    var payload = {
      name: item.entity,
      sample: item.kybSample || '',
    };

    try {
      sessionStorage.setItem('kybEntity', JSON.stringify(payload));
      sessionStorage.setItem('kybHomeUrl', getUnifiedHomeUrl());
    } catch (e) { /* ignore */ }

    var params = new URLSearchParams({ name: item.entity });
    if (payload.sample) params.set('sample', payload.sample);
    window.location.href = kybResultsUrl + '?' + params.toString();
  }

  function renderDrawer(item) {
    if (!els.drawerTitle || !els.drawerBody || !item) return;

    els.drawerTitle.textContent = item.id;
    els.drawerBody.innerHTML =
      '<div class="history-drawer-fields">' +
        fieldHtml('Transaction ID', item.id) +
        fieldHtml('Entity', item.entity) +
        fieldHtml('Experience', item.experience) +
        fieldHtml('Started', item.startedLabel) +
        fieldHtml('Last Updated', item.lastUpdatedLabel) +
        fieldHtml('Status', '<span class="' + statusTagClass(item.status) + '">' + item.status + '</span>') +
        fieldHtml('Outcome', '<span class="' + outcomeTagClass(item.outcome) + '">' + item.outcome + '</span>') +
        '<div class="tds-data-field">' +
          '<div class="tds-data-field__label-row"><p class="tds-data-field__label">AI Summary</p></div>' +
          '<div class="tds-data-field__content"><p class="history-drawer-summary">' + item.aiSummary + '</p></div>' +
        '</div>' +
        '<div class="history-drawer-actions">' +
          '<button type="button" class="tds-btn tds-btn--primary tds-btn--md" data-open-results' + (canOpenKybResults(item) ? '' : ' disabled') + '>Open Results</button>' +
          '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md">Download Report</button>' +
        '</div>' +
      '</div>';

    var openResultsBtn = els.drawerBody.querySelector('[data-open-results]');
    if (openResultsBtn) {
      openResultsBtn.addEventListener('click', function () {
        openKybResults(item);
      });
    }
  }

  function fieldHtml(label, value) {
    return (
      '<div class="tds-data-field tds-data-field--horizontal">' +
        '<div class="tds-data-field__label-row"><p class="tds-data-field__label">' + label + '</p></div>' +
        '<div class="tds-data-field__content"><div class="tds-data-field__value-row"><span class="tds-data-field__value">' + value + '</span></div></div>' +
      '</div>'
    );
  }

  function openDrawer(id) {
    var item = historyTransactions.find(function (txn) { return txn.id === id; });
    if (!item) return;
    renderDrawer(item);
    if (window.openTdsDialog) window.openTdsDialog('txn-drawer');
  }

  function itemLabel(config, value) {
    if (!config.isObject) return value;
    var match = config.items.find(function (item) { return item.id === value; });
    return match ? match.label : value;
  }

  function syncFilterButton(config) {
    var menu = els.filterBar.querySelector('[data-filter-key="' + config.key + '"]');
    if (!menu) return;

    var keys = selectedKeys(config.key);
    var valueEl = menu.querySelector('.tds-filter-button__trigger-value');
    var counter = menu.querySelector('.tds-filter-button__counter');

    menu.classList.toggle('tds-filter-button--selected', keys.length > 0);
    menu.classList.toggle('tds-filter-button--multi', config.multi && keys.length > 1);

    if (valueEl) {
      valueEl.textContent = keys.length ? itemLabel(config, keys[0]) : '';
    }
    if (counter) {
      counter.textContent = keys.length > 1 ? '+' + (keys.length - 1) : '';
      counter.hidden = keys.length <= 1;
    }

    menu.querySelectorAll('[data-filter-value]').forEach(function (node) {
      var value = node.getAttribute('data-filter-value');
      var active = !!getGroupState(config.key)[value];
      node.classList.toggle('tds-action-list-item--selected', active);
      if (node.tagName === 'BUTTON') {
        node.setAttribute('aria-checked', active ? 'true' : 'false');
      }
    });
  }

  function renderActiveChips() {
    if (!els.activeFilters) return;

    var chips = [];

    FILTER_CONFIG.forEach(function (config) {
      selectedKeys(config.key).forEach(function (value) {
        chips.push(
          '<span class="tds-tag tds-tag--md tds-tag--default tds-tag--removable">' +
            '<span>' + itemLabel(config, value) + '</span>' +
            '<button type="button" class="tds-tag__remove" aria-label="Remove ' + itemLabel(config, value) + ' filter" data-chip-group="' + config.key + '" data-chip-value="' + value + '">' + TAG_REMOVE_SVG + '</button>' +
          '</span>'
        );
      });
    });

    els.activeFilters.innerHTML = chips.join('');
    els.activeFilters.hidden = !chips.length;
  }

  function setFilterValue(groupKey, value, checked, config) {
    if (config.multi) {
      if (checked) state[groupKey][value] = true;
      else delete state[groupKey][value];
    } else if (!checked || getGroupState(groupKey)[value]) {
      state[groupKey] = {};
    } else {
      state[groupKey] = {};
      state[groupKey][value] = true;
    }

    syncFilterButton(config);
    renderActiveChips();
    renderRows();
  }

  function clearFilterGroup(config) {
    state[config.key] = {};
    syncFilterButton(config);
    renderActiveChips();
    renderRows();
  }

  function buildFilterMenuItems(config) {
    return config.items.map(function (item) {
      var value = config.isObject ? item.id : item;
      var text = config.isObject ? item.label : item;
      var leading = item.dot
        ? '<span class="tds-action-list-item__leading-visual"><span class="history-availability-dot history-availability-dot--' + item.dot + '"></span></span>'
        : '';
      var role = config.multi ? 'menuitemcheckbox' : 'menuitemradio';

      return (
        '<button type="button" class="tds-action-list-item" role="' + role + '" data-filter-value="' + value + '" aria-checked="false">' +
          leading +
          '<span class="tds-action-list-item__label">' + text + '</span>' +
          '<span class="tds-action-list-item__trailing-visual" aria-hidden="true">' + CHECK_SVG + '</span>' +
        '</button>'
      );
    }).join('');
  }

  function buildFilterButton(config) {
    var multiClass = config.multi ? ' tds-filter-button--multi' : '';
    return (
      '<div class="tds-filter-button' + multiClass + '" data-filter-key="' + config.key + '">' +
        '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary" aria-haspopup="menu" aria-expanded="false">' +
          '<span class="tds-btn__leading-icon" aria-hidden="true">' + FILTER_SVG + '</span>' +
          '<span class="tds-filter-button__trigger-default">' + config.label + '</span>' +
          '<span class="tds-filter-button__trigger-value"></span>' +
          '<span class="tds-counter tds-counter--primary tds-counter--sm tds-filter-button__counter" hidden></span>' +
          '<span class="tds-btn__trailing-icon tds-filter-button__clear" aria-hidden="true">' + CLEAR_SVG + '</span>' +
        '</button>' +
        '<div class="tds-dropdown-panel" role="menu" hidden>' + buildFilterMenuItems(config) + '</div>' +
      '</div>'
    );
  }

  function buildFilterBar() {
    if (!els.filterBar) return;

    els.filterBar.innerHTML = FILTER_CONFIG.map(buildFilterButton).join('');

    FILTER_CONFIG.forEach(function (config) {
      var menu = els.filterBar.querySelector('[data-filter-key="' + config.key + '"]');
      if (!menu) return;

      menu.querySelectorAll('[data-filter-value]').forEach(function (node) {
        node.addEventListener('click', function (event) {
          event.stopPropagation();
          var value = node.getAttribute('data-filter-value');
          var isActive = !!getGroupState(config.key)[value];

          if (config.multi) {
            setFilterValue(config.key, value, !isActive, config);
            return;
          }

          setFilterValue(config.key, value, !isActive, config);
          if (window.TdsDropdownPanel) {
            window.TdsDropdownPanel.close(menu.querySelector('.tds-dropdown-panel'));
          }
        });
      });

      menu.addEventListener('tds-filter-clear', function () {
        clearFilterGroup(config);
      });
    });

    if (window.TdsDropdownPanel) window.TdsDropdownPanel.initMenus(els.filterBar);
  }

  function bindEvents() {
    if (els.search) {
      els.search.addEventListener('input', function () {
        state.search = els.search.value;
        renderRows();
      });
    }

    if (els.thead) {
      els.thead.addEventListener('click', function (event) {
        var th = event.target.closest('th[data-sort]');
        if (!th) return;
        setSort(th.getAttribute('data-sort'));
      });

      els.thead.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        var th = event.target.closest('th[data-sort]');
        if (!th) return;
        event.preventDefault();
        setSort(th.getAttribute('data-sort'));
      });
    }

    if (els.activeFilters) {
      els.activeFilters.addEventListener('click', function (event) {
        var chip = event.target.closest('[data-chip-group]');
        if (!chip) return;
        var config = FILTER_CONFIG.find(function (c) { return c.key === chip.getAttribute('data-chip-group'); });
        if (!config) return;
        setFilterValue(chip.getAttribute('data-chip-group'), chip.getAttribute('data-chip-value'), false, config);
      });
    }

    if (els.tbody) {
      els.tbody.addEventListener('click', function (event) {
        var row = event.target.closest('[data-txn-id]');
        if (row) openDrawer(row.getAttribute('data-txn-id'));
      });

      els.tbody.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        var row = event.target.closest('[data-txn-id]');
        if (!row) return;
        event.preventDefault();
        openDrawer(row.getAttribute('data-txn-id'));
      });
    }
  }

  buildFilterBar();
  bindEvents();
  renderActiveChips();
  renderRows();
})();
