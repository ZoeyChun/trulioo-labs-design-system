(function () {
  'use strict';

  var CHECK_SVG = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>';
  var TAG_REMOVE_SVG = '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6"/></svg>';
  var SORT_ICON_ASC = '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.2 9.8h7.6L8 4.6 4.2 9.8z"/></svg>';
  var SORT_ICON_DESC = '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.2 6.2h7.6L8 11.4 4.2 6.2z"/></svg>';
  var CHEVRON_RIGHT = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>';
  var MAX_PAGE_SIZE = 10;
  var MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DATE_RANGE_FIELDS_HTML =
    '<div class="tds-date-picker-range__fields">' +
      '<div class="tds-date-picker" data-date-picker-part="start">' +
        '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary tds-date-picker__field tds-date-picker__field--md history-date-filter__trigger" aria-haspopup="dialog" aria-expanded="false" aria-label="Filter by date">' +
          '<span class="history-date-filter__label" id="historyDateButtonLabel">Date</span>' +
          '<span class="tds-date-picker__value tds-date-picker__placeholder visually-hidden">mm/dd/yyyy</span>' +
          '<span class="tds-caret tds-caret--default history-date-filter__caret" aria-hidden="true">' +
            '<svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg>' +
          '</span>' +
          '<span class="history-date-filter__clear" hidden role="button" tabindex="0" aria-label="Clear date filter">' +
            '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>' +
          '</span>' +
        '</button>' +
      '</div>' +
      '<div class="tds-date-picker history-date-filter__end" data-date-picker-part="end">' +
        '<button type="button" class="tds-date-picker__field tds-date-picker__field--md" aria-haspopup="dialog" aria-expanded="false" tabindex="-1">' +
          '<span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>' +
        '</button>' +
      '</div>' +
    '</div>';

  var PRODUCT_ICONS = {
    'address-card': '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="7.5 7.5 17.0 17.0" fill="none" aria-hidden="true"><path d="M16.1875 8C16.7188 8 17.2188 8.21875 17.5938 8.59375L21.4062 12.4062C21.7812 12.7812 22 13.3125 22 13.8125V22C22 23.0938 21.0938 24 20 24H12C10.9062 24 10 23.0938 10 22V10C10 8.90625 10.9062 8 12 8H16.1875ZM12 9.5C11.7188 9.5 11.5 9.71875 11.5 10V22C11.5 22.2812 11.7188 22.5 12 22.5H20C20.2812 22.5 20.5 22.2812 20.5 22V14.5H17.75C16.5 14.5 15.5 13.5 15.5 12.25V9.5H12ZM17.1562 16.25C17.4062 15.9062 17.875 15.8438 18.1875 16.0938C18.5312 16.3125 18.5938 16.7812 18.375 17.125L15.9688 20.4062C15.8438 20.5938 15.6562 20.6875 15.4375 20.7188C15.2188 20.7188 15 20.625 14.8438 20.4688L13.7188 19.3125C13.4375 19.0312 13.4375 18.5312 13.7188 18.25C14.0312 17.9688 14.5 17.9688 14.7812 18.2812L15.2812 18.7812L17.1562 16.25ZM17 12.25C17 12.6562 17.3438 13 17.75 13H19.875L17 10.125V12.25Z" fill="currentColor"/></svg>',
    fingerprint: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="6.5 6.5 19.0 19.0" fill="none" aria-hidden="true"><path d="M8.5 21C8.5 21.2812 8.71875 21.5 9 21.5H10C10 20.125 11.125 19 12.5 19H14.5C15.875 19 17 20.125 17 21.5H23C23.2812 21.5 23.5 21.2812 23.5 21V13H8.5V21ZM9 9H23C24.0938 9 25 9.90625 25 11V21C25 22.0938 24.0938 23 23 23H9C7.90625 23 7 22.0938 7 21V11C7 9.90625 7.90625 9 9 9ZM13.5 17.75C12.5312 17.75 11.75 16.9688 11.75 16C11.75 15.0312 12.5312 14.25 13.5 14.25C14.4688 14.25 15.25 15.0312 15.25 16C15.25 16.9688 14.4688 17.75 13.5 17.75ZM18.75 14.5H21.25C21.6562 14.5 22 14.8438 22 15.25C22 15.6562 21.6562 16 21.25 16H18.75C18.3438 16 18 15.6562 18 15.25C18 14.8438 18.3438 14.5 18.75 14.5ZM18.75 17.5H21.25C21.6562 17.5 22 17.8438 22 18.25C22 18.6562 21.6562 19 21.25 19H18.75C18.3438 19 18 18.6562 18 18.25C18 17.8438 18.3438 17.5 18.75 17.5Z" fill="currentColor"/></svg>',
    building: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="6.5 6.5 18.0 19.0" fill="none" aria-hidden="true"><path d="M13.5 14.5C14.875 14.5 16 13.375 16 12C16 10.625 14.875 9.5 13.5 9.5C12.125 9.5 11 10.625 11 12C11 13.375 12.125 14.5 13.5 14.5ZM13.5 8C15.7188 8 17.5 9.78125 17.5 12C17.5 14.2188 15.7188 16 13.5 16C11.2812 16 9.5 14.2188 9.5 12C9.5 9.78125 11.2812 8 13.5 8ZM12.5 19C10.2812 19 8.5 20.7812 8.5 23V23.25C8.5 23.6562 8.15625 24 7.75 24C7.34375 24 7 23.6562 7 23.25V23C7 19.9688 9.46875 17.5 12.5 17.5H14.5C17.5312 17.5 20 19.9688 20 23V23.25C20 23.6562 19.6562 24 19.25 24C18.8438 24 18.5 23.6562 18.5 23.25V23C18.5 20.7812 16.7188 19 14.5 19H12.5ZM17.7188 15.5312C18.0625 15.125 18.3125 14.7188 18.5312 14.25C18.8125 14.4062 19.1562 14.5 19.5 14.5C20.5938 14.5 21.5 13.5938 21.5 12.5C21.5 11.4062 20.5938 10.5 19.5 10.5C19.25 10.5 19.0312 10.5312 18.8125 10.625C18.6875 10.125 18.5 9.65625 18.25 9.21875C18.6562 9.09375 19.0625 9 19.5 9C21.4375 9 23 10.5625 23 12.5C23 14.4375 21.4375 16 19.5 16C18.8438 16 18.25 15.8125 17.7188 15.5312ZM20.625 19.5938C20.2812 19 19.875 18.4688 19.4062 18H19.75C22.6562 18 25 20.3438 25 23.25C25 23.6562 24.6562 24 24.25 24C23.8438 24 23.5 23.6562 23.5 23.25C23.5 21.4688 22.2812 20 20.625 19.5938Z" fill="currentColor"/></svg>',
    'building-columns': '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="7.71875 7.4375 16.84375 17.0625" fill="none" aria-hidden="true"><path d="M16.4062 8.375L23.6562 13.125C23.9375 13.3125 24.0625 13.6562 23.9688 13.9688C23.875 14.2812 23.5938 14.5 23.25 14.5H22V19.5H22.25C22.6562 19.5 23 19.8438 23 20.25C23 20.6562 22.6562 21 22.25 21H9.75C9.34375 21 9 20.6562 9 20.25C9 19.8438 9.34375 19.5 9.75 19.5H10V14.5H8.75C8.40625 14.5 8.125 14.2812 8.03125 13.9688C7.9375 13.6562 8.0625 13.3125 8.34375 13.125L15.5938 8.375C15.8438 8.21875 16.1562 8.21875 16.4062 8.375ZM13.5 19.5V14.5H11.5V19.5H13.5ZM17 19.5V14.5H15V19.5H17ZM20.5 19.5V14.5H18.5V19.5H20.5ZM15.125 13C15.0625 12.8438 15 12.6875 15 12.5C15 11.9375 15.4375 11.5 16 11.5C16.5625 11.5 17 11.9375 17 12.5C17 12.6875 16.9375 12.8438 16.875 13H20.75L16 9.90625L11.25 13H15.125ZM8 23.25C8 22.8438 8.34375 22.5 8.75 22.5H23.25C23.6562 22.5 24 22.8438 24 23.25C24 23.6562 23.6562 24 23.25 24H8.75C8.34375 24 8 23.6562 8 23.25Z" fill="currentColor"/></svg>',
    mobile: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="4.5" y="1.5" width="7" height="13" rx="1.5"/><path d="M7 12.5h2"/></svg>'
  };

  var STATUS_TAG = {
    Verified: 'positive',
    Review: 'intermediate',
    Declined: 'negative',
    Completed: 'default'
  };

  var FILTER_CONFIG = [
    { key: 'productType', label: 'Product type', items: historyFilterGroups.productType },
    { key: 'status', label: 'Status', items: historyFilterGroups.status },
    { key: 'country', label: 'Country', items: historyFilterGroups.country }
  ];

  var state = {
    search: '',
    sortKey: 'date',
    sortDir: 'desc',
    page: 1,
    pageSize: 10,
    dateStart: null,
    dateEnd: null,
    productType: {},
    status: {},
    country: {}
  };

  var els = {
    filterBar: document.getElementById('historyFilterBar'),
    filterMenu: document.getElementById('historyFilterMenu'),
    activeFilters: document.getElementById('historyActiveFilters'),
    search: document.getElementById('historySearchInput'),
    thead: document.getElementById('historyTableHead'),
    tbody: document.getElementById('historyTableBody'),
    footer: document.getElementById('historyTableFooter'),
    dateRange: document.getElementById('historyDateRange')
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getGroupState(key) {
    return state[key] || {};
  }

  function selectedKeys(key) {
    return Object.keys(getGroupState(key)).filter(function (k) { return getGroupState(key)[k]; });
  }

  function parseDate(value) {
    return new Date(value).getTime();
  }

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function itemDateKey(item) {
    var d = new Date(item.date);
    if (isNaN(d.getTime())) return '';
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function parsePickerValue(el) {
    if (!el || el.classList.contains('tds-date-picker__placeholder')) return null;
    var text = el.textContent.trim();
    var parts = text.split('/');
    if (parts.length !== 3) return null;
    var month = Number(parts[0]);
    var day = Number(parts[1]);
    var year = Number(parts[2]);
    if (!year || !month || !day) return null;
    return year + '-' + pad2(month) + '-' + pad2(day);
  }

  function formatShortDay(iso, withYear) {
    var parts = String(iso || '').split('-');
    if (parts.length !== 3) return '';
    var year = parts[0];
    var month = Number(parts[1]) - 1;
    var day = Number(parts[2]);
    if (month < 0 || month > 11) return iso;
    var label = MONTH_SHORT[month] + ' ' + day;
    return withYear ? label + ', ' + year : label;
  }

  function formatDateRangeLabel(start, end) {
    if (!start) return 'Date';
    if (!end || end === start) return formatShortDay(start, true);
    var startYear = start.split('-')[0];
    var endYear = end.split('-')[0];
    if (startYear === endYear) {
      return formatShortDay(start, false) + ' – ' + formatShortDay(end, true);
    }
    return formatShortDay(start, true) + ' – ' + formatShortDay(end, true);
  }

  function matchesFilters(item) {
    var q = state.search.trim().toLowerCase();
    if (q) {
      var hay = [item.name, item.id, item.productType, item.country, item.status].join(' ').toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    if (selectedKeys('productType').length && selectedKeys('productType').indexOf(item.productType) === -1) return false;
    if (selectedKeys('status').length && selectedKeys('status').indexOf(item.status) === -1) return false;
    if (selectedKeys('country').length && selectedKeys('country').indexOf(item.country) === -1) return false;
    if (state.dateStart) {
      var day = itemDateKey(item);
      var start = state.dateStart;
      var end = state.dateEnd || state.dateStart;
      if (day < start || day > end) return false;
    }
    return true;
  }

  function compareText(a, b) {
    return String(a || '').localeCompare(String(b || ''), undefined, { sensitivity: 'base' });
  }

  function sortItems(items) {
    var dir = state.sortDir === 'asc' ? 1 : -1;
    var key = state.sortKey || 'date';
    return items.slice().sort(function (a, b) {
      var cmp = 0;
      if (key === 'date') cmp = parseDate(a.date) - parseDate(b.date);
      else if (key === 'transaction') {
        cmp = compareText(a.name, b.name);
        if (!cmp) cmp = compareText(a.id, b.id);
      } else if (key === 'productType') cmp = compareText(a.productType, b.productType);
      else if (key === 'country') cmp = compareText(a.country, b.country);
      else if (key === 'status') cmp = compareText(a.status, b.status);
      if (!cmp && key !== 'date') cmp = parseDate(a.date) - parseDate(b.date);
      if (!cmp) cmp = compareText(a.name, b.name);
      return cmp * dir;
    });
  }

  function filteredItems() {
    return sortItems(historyTransactions.filter(matchesFilters));
  }

  function statusTagClass(status) {
    return 'tds-tag tds-tag--md tds-tag--' + (STATUS_TAG[status] || 'default');
  }

  function productIcon(item) {
    return PRODUCT_ICONS[item.productIcon] || PRODUCT_ICONS.building;
  }

  function updateDateButtonUI() {
    var range = els.dateRange;
    if (!range) return;
    var label = range.querySelector('.history-date-filter__label');
    var clear = range.querySelector('.history-date-filter__clear');
    var selected = !!state.dateStart;
    range.classList.toggle('history-date-filter--selected', selected);
    if (label) label.textContent = formatDateRangeLabel(state.dateStart, state.dateEnd);
    if (clear) clear.hidden = !selected;
  }

  function syncDateFilterFromPicker() {
    var range = els.dateRange;
    if (!range) return;
    var startEl = range.querySelector('[data-date-picker-part="start"] .tds-date-picker__value');
    var endEl = range.querySelector('[data-date-picker-part="end"] .tds-date-picker__value');
    var start = parsePickerValue(startEl);
    var end = parsePickerValue(endEl);
    var nextStart = start || null;
    var nextEnd = end || start || null;
    if (state.dateStart === nextStart && state.dateEnd === nextEnd) {
      updateDateButtonUI();
      return;
    }
    state.dateStart = nextStart;
    state.dateEnd = nextEnd;
    state.page = 1;
    updateDateButtonUI();
    renderRows();
  }

  function resetDateFilter(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    state.dateStart = null;
    state.dateEnd = null;
    state.page = 1;
    var range = els.dateRange;
    if (range) {
      range.classList.remove('tds-date-picker-range--open', 'history-date-filter--selected');
      delete range.dataset.start;
      delete range.dataset.end;
      delete range.dataset.datePickerRangeBound;
      range.innerHTML = DATE_RANGE_FIELDS_HTML;
      if (window.initDatePickers) window.initDatePickers(range);
      bindDateFilter();
    }
    updateDateButtonUI();
    renderRows();
  }

  var dateFilterBound = false;

  function bindDateFilter() {
    var range = els.dateRange;
    if (!range) return;

    function onPickerChange() {
      window.setTimeout(syncDateFilterFromPicker, 0);
    }

    if (!dateFilterBound) {
      dateFilterBound = true;
      range.addEventListener('click', onPickerChange, true);
      range.addEventListener('mousedown', onPickerChange, true);
    }

    var clear = range.querySelector('.history-date-filter__clear');
    if (clear) {
      clear.addEventListener('click', resetDateFilter);
      clear.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        resetDateFilter(event);
      });
    }
  }

  function syncSortHeaders() {
    if (!els.thead) return;
    els.thead.querySelectorAll('th[data-sort]').forEach(function (th) {
      var key = th.getAttribute('data-sort');
      var active = key === state.sortKey;
      var icon = th.querySelector('.tds-data-table__sort-icon');
      th.setAttribute('aria-sort', active ? (state.sortDir === 'asc' ? 'ascending' : 'descending') : 'none');
      if (icon) icon.innerHTML = active && state.sortDir === 'asc' ? SORT_ICON_ASC : SORT_ICON_DESC;
    });
  }

  function toggleColumnSort(key) {
    if (!key) return;
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = key;
      state.sortDir = key === 'date' ? 'desc' : 'asc';
    }
    state.page = 1;
    syncSortHeaders();
    renderRows();
  }

  function pageSize() {
    return state.pageSize || MAX_PAGE_SIZE;
  }

  function estimatedRowHeight() {
    var row = els.tbody && els.tbody.querySelector('tr.history-table__row');
    if (row) return Math.ceil(row.getBoundingClientRect().height);
    return 60;
  }

  function computePageSize() {
    var block = document.querySelector('.history-table-block');
    var toolbar = document.querySelector('.history-toolbar');
    var chips = els.activeFilters;
    var thead = els.thead;
    if (!block) return MAX_PAGE_SIZE;

    var gap = parseFloat(window.getComputedStyle(block).rowGap || window.getComputedStyle(block).gap) || 16;
    var used = 0;
    var sections = 1;
    if (toolbar) {
      used += toolbar.getBoundingClientRect().height;
      sections += 1;
    }
    if (chips && !chips.hidden) {
      used += chips.getBoundingClientRect().height;
      sections += 1;
    }
    used += gap * Math.max(0, sections - 1);

    var footerH = els.footer && els.footer.offsetHeight ? els.footer.getBoundingClientRect().height : 48;
    var theadH = thead ? thead.getBoundingClientRect().height : 27;
    var available = block.clientHeight - used - footerH - theadH - 2;
    if (available <= 0) return MAX_PAGE_SIZE;
    return Math.max(1, Math.min(MAX_PAGE_SIZE, Math.floor(available / estimatedRowHeight())));
  }

  function syncPageSize() {
    var next = computePageSize();
    if (next === state.pageSize) return false;
    state.pageSize = next;
    var pages = pageCount(filteredItems().length);
    if (state.page > pages) state.page = pages;
    return true;
  }

  var fittingPageSize = false;

  function scheduleFit() {
    window.requestAnimationFrame(function () {
      if (fittingPageSize) return;
      if (!syncPageSize()) return;
      fittingPageSize = true;
      renderRows();
      fittingPageSize = false;
    });
  }

  function pageCount(total) {
    return Math.max(1, Math.ceil(total / pageSize()));
  }

  function renderFooter(total) {
    if (!els.footer) return;
    if (!total) {
      els.footer.innerHTML = '';
      return;
    }

    var pages = pageCount(total);
    if (state.page > pages) state.page = pages;
    var size = pageSize();
    var start = (state.page - 1) * size + 1;
    var end = Math.min(state.page * size, total);
    var pageButtons = '';
    for (var i = 1; i <= pages; i += 1) {
      pageButtons +=
        '<button type="button" class="tds-data-table__pagination-page' + (i === state.page ? ' tds-data-table__pagination-page--active' : '') + '" data-page="' + i + '"' + (i === state.page ? ' aria-current="page"' : '') + '>' + i + '</button>';
    }

    els.footer.innerHTML =
      '<div class="tds-data-table__footer-counter">' + start + '–' + end + ' of ' + total + '</div>' +
      '<div class="tds-data-table__footer-pagination">' +
        '<div class="tds-data-table__pagination">' +
          '<button type="button" class="tds-data-table__pagination-direction" data-page-dir="prev"' + (state.page === 1 ? ' disabled' : '') + '>' +
            '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M10 4l-4 4 4 4"/></svg> Previous' +
          '</button>' +
          '<div class="tds-data-table__pagination-pages">' + pageButtons + '</div>' +
          '<button type="button" class="tds-data-table__pagination-direction" data-page-dir="next"' + (state.page === pages ? ' disabled' : '') + '>' +
            'Next <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';
  }

  function renderRows() {
    if (!els.tbody) return;
    var visible = filteredItems();
    var total = visible.length;

    if (!total) {
      els.tbody.innerHTML = '<tr><td colspan="6" class="history-empty">No transactions match your search or filters.</td></tr>';
      renderFooter(0);
      return;
    }

    var pages = pageCount(total);
    if (state.page > pages) state.page = pages;
    var size = pageSize();
    var start = (state.page - 1) * size;
    var pageItems = visible.slice(start, start + size);

    els.tbody.innerHTML = pageItems.map(function (item, index) {
      var rowId = item.product + ':' + item.id + ':' + (start + index);
      return (
        '<tr class="history-table__row" tabindex="0" data-row-key="' + escapeHtml(rowId) + '" data-href="' + escapeHtml(item.href) + '" aria-label="Open ' + escapeHtml(item.name) + ' transaction">' +
          '<td class="tds-data-table__text-cell">' +
            '<span class="history-table__stack">' +
              '<span class="history-table__name">' + escapeHtml(item.name) + '</span>' +
              '<span class="history-table__id">' + escapeHtml(item.id) + '</span>' +
            '</span>' +
          '</td>' +
          '<td>' +
            '<span class="history-product">' +
              '<span class="history-product__icon" aria-hidden="true">' + productIcon(item) + '</span>' +
              '<span class="history-product__label">' + escapeHtml(item.productType) + '</span>' +
            '</span>' +
          '</td>' +
          '<td>' +
            '<span class="history-country">' +
              '<span class="history-country__flag" aria-hidden="true"><span class="fi fi-' + escapeHtml(item.countryCode) + '"></span></span>' +
              '<span class="history-country__name">' + escapeHtml(item.country) + '</span>' +
            '</span>' +
          '</td>' +
          '<td class="tds-data-table__text-cell">' + escapeHtml(item.dateLabel) + '</td>' +
          '<td><span class="tds-data-table__label-cell"><span class="' + statusTagClass(item.status) + '">' + escapeHtml(item.status) + '</span></span></td>' +
          '<td class="history-table__actions"><span class="history-table__chevron" aria-hidden="true">' + CHEVRON_RIGHT + '</span></td>' +
        '</tr>'
      );
    }).join('');

    renderFooter(total);
    if (!fittingPageSize) scheduleFit();
  }

  function findItemFromRow(row) {
    var href = row && row.getAttribute('data-href');
    if (!href) return null;
    var name = row.querySelector('.history-table__name');
    var id = row.querySelector('.history-table__id');
    var nameText = name ? name.textContent : '';
    var idText = id ? id.textContent : '';
    return historyTransactions.find(function (item) {
      return item.href === href && item.name === nameText && item.id === idText;
    }) || historyTransactions.find(function (item) { return item.href === href; });
  }

  function openTransaction(item) {
    if (!item) return;

    try {
      sessionStorage.setItem(
        'labsHistoryReturnUrl',
        new URL('history.html', window.location.href).href
      );
      if (item.product === 'eid') {
        sessionStorage.setItem('eid-demo-session', JSON.stringify({
          view: 'result',
          countryCode: item.countryCode,
          deviceIntelligence: false,
          simulated: true
        }));
      }
      if (item.product === 'bv') {
        sessionStorage.setItem('bv-session', JSON.stringify({
          view: 'result',
          state: {
            accountType: item.accountType,
            testEntity: true,
            selectedTestEntity: item.entityIndex,
            country: item.country
          },
          values: item.values || {}
        }));
      }
      if (item.product === 'di' && item.entityKey) {
        sessionStorage.setItem('di-entity', item.entityKey);
      }
      if (item.product === 'kyb') {
        sessionStorage.setItem('kybEntity', JSON.stringify({
          name: item.name,
          sample: item.sample || '',
          country: item.country,
          countryCode: item.countryCode
        }));
        sessionStorage.setItem('kybHomeUrl', new URL('history.html', window.location.href).href);
      }
    } catch (e) { /* demo-only */ }

    window.location.href = item.href;
  }

  function allSelectedCount() {
    return selectedKeys('productType').length + selectedKeys('status').length + selectedKeys('country').length;
  }

  function firstSelectedLabel() {
    var first;
    FILTER_CONFIG.some(function (config) {
      var keys = selectedKeys(config.key);
      if (!keys.length) return false;
      first = keys[0];
      return true;
    });
    return first || '';
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
        chips.push(
          '<span class="tds-tag tds-tag--md tds-tag--default tds-tag--removable">' +
            '<span>' + escapeHtml(value) + '</span>' +
            '<button type="button" class="tds-tag__remove" aria-label="Remove ' + escapeHtml(value) + ' filter" data-chip-group="' + config.key + '" data-chip-value="' + escapeHtml(value) + '">' + TAG_REMOVE_SVG + '</button>' +
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
    state.page = 1;
    syncFilterButton();
    renderActiveChips();
    renderRows();
  }

  function clearAllFilters() {
    FILTER_CONFIG.forEach(function (config) { state[config.key] = {}; });
    state.page = 1;
    syncFilterButton();
    renderActiveChips();
    renderRows();
  }

  function buildFilterMenu() {
    if (!els.filterMenu) return;
    els.filterMenu.innerHTML = FILTER_CONFIG.map(function (config) {
      var items = config.items.map(function (value) {
        return (
          '<button type="button" class="tds-action-list-item" role="menuitemcheckbox" data-filter-group="' + config.key + '" data-filter-value="' + escapeHtml(value) + '" aria-checked="false">' +
            '<span class="tds-action-list-item__label">' + escapeHtml(value) + '</span>' +
            '<span class="tds-action-list-item__trailing-visual" aria-hidden="true">' + CHECK_SVG + '</span>' +
          '</button>'
        );
      }).join('');
      return '<div class="history-filter-group"><p class="history-filter-group__label">' + escapeHtml(config.label) + '</p>' + items + '</div>';
    }).join('');
  }

  function bindEvents() {
    if (els.search) {
      els.search.addEventListener('input', function () {
        state.search = els.search.value;
        state.page = 1;
        renderRows();
      });
    }

    if (els.thead) {
      els.thead.addEventListener('click', function (event) {
        var th = event.target.closest('th[data-sort]');
        if (!th) return;
        toggleColumnSort(th.getAttribute('data-sort'));
      });
      els.thead.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        var th = event.target.closest('th[data-sort]');
        if (!th) return;
        event.preventDefault();
        toggleColumnSort(th.getAttribute('data-sort'));
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

    if (els.tbody) {
      els.tbody.addEventListener('click', function (event) {
        var row = event.target.closest('[data-href]');
        if (row) openTransaction(findItemFromRow(row));
      });
      els.tbody.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        var row = event.target.closest('[data-href]');
        if (!row) return;
        event.preventDefault();
        openTransaction(findItemFromRow(row));
      });
    }

    if (els.footer) {
      els.footer.addEventListener('click', function (event) {
        var pageBtn = event.target.closest('[data-page]');
        if (pageBtn) {
          state.page = Number(pageBtn.getAttribute('data-page')) || 1;
          renderRows();
          return;
        }
        var dirBtn = event.target.closest('[data-page-dir]');
        if (!dirBtn || dirBtn.disabled) return;
        var total = filteredItems().length;
        var pages = pageCount(total);
        if (dirBtn.getAttribute('data-page-dir') === 'prev') state.page = Math.max(1, state.page - 1);
        else state.page = Math.min(pages, state.page + 1);
        renderRows();
      });
    }
  }

  buildFilterMenu();
  bindEvents();
  if (window.TdsDropdownPanel) {
    var toolbarActions = document.querySelector('.history-toolbar__actions');
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
  syncSortHeaders();
  bindDateFilter();
  updateDateButtonUI();
  state.pageSize = computePageSize();
  renderRows();
  var resizeTimer = 0;
  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (syncPageSize()) renderRows();
    }, 100);
  });
})();
