/* Entity disambiguation for "Verify a business".

   Typing a name that matches more than one legal entity opens a resolution
   flow: the left column becomes a world map of every match, the panel asks
   which one, and each answer narrows both at once.

   Three deliberate departures from Figma node 951:91848, all for the same
   reason — the node's three results are the same company at the same
   address, which is the one thing a disambiguation screen cannot be:

     1. Candidates differ on what actually separates legal entities —
        jurisdiction, registration number, status — not just address.
     2. Pagination ("1-3 of 9") is replaced by narrowing. Paging through
        nine near-identical names is the problem, not the solution.
     3. The question comes before the rationale. The reasoning is still
        there, just not in the way of the decision.
*/
(function () {
  'use strict';

  /* Same projection as assets/world-dots.svg: equirectangular, lat clipped
     to ±83 so the frame is tighter than a full globe. */
  var MAP_W = 1000, MAP_H = 460, LAT_MAX = 83;
  function project(lon, lat) {
    return {
      x: (lon + 180) / 360 * MAP_W,
      y: (LAT_MAX - lat) / (2 * LAT_MAX) * MAP_H
    };
  }

  var CANDIDATES = [
    { id: 'uk-apex',   name: 'Meridian Apex Consulting Ltd.',
      country: 'United Kingdom', cc: 'GB', status: 'Active',
      reg: 'Companies House 08842190', inc: 'Incorporated 2014',
      addr: 'Suite 400, 1 King Street, London EC2V 8AU',
      note: 'Verified 2 weeks ago', lon: -0.093, lat: 51.513,
      report: {
        sic: 'Registered under SIC 70229',
        sicNote: '(management consultancy activities), a catch-all code. ' +
                 'No evidence of active trading, clients, or revenue.',
        incorporated: 'Incorporated 1 Feb 2019 (England & Wales)',
        legalForm: 'Private company limited by shares',
        address: 'Suite 400, 1 King Street, London EC2V 8AU — virtual office',
        regStatus: 'Active',
        sizing: '0 employees; £1 authorised / £1 paid-up capital.',
        regNumber: 'BRN 11876542',
        taxId: 'GB341209876',
        phone: '+44 20 7946 0000',
        email: 'info@meridianapexconsulting.co.uk',
        alerts: ['Adverse media', 'Sanctions', 'Litigation', 'Positive press'],
        summary: 'Registered and active, but the filings describe a shell: ' +
                 'a virtual office, a catch-all SIC code, no employees and ' +
                 '£1 of capital. Nothing adverse surfaced across media, ' +
                 'sanctions or litigation — the risk here is absence of ' +
                 'evidence, not presence of it.'
      } },

    { id: 'uk-trade',  name: 'Meridian Trade Holdings Ltd.',
      country: 'United Kingdom', cc: 'GB', status: 'Active',
      reg: 'Companies House 11204887', inc: 'Incorporated 2018',
      addr: '25 Bank Street, Canary Wharf, London E14 5JP',
      lon: -0.019, lat: 51.505 },

    { id: 'uk-log',    name: 'Meridian Logistics (UK) Ltd.',
      country: 'United Kingdom', cc: 'GB', status: 'Dissolved',
      reg: 'Companies House 06655321', inc: 'Dissolved Mar 2023',
      addr: '14 Deansgate, Manchester M3 2BW',
      lon: -2.244, lat: 53.480 },

    { id: 'us-cap',    name: 'Meridian Capital LLC',
      country: 'United States', cc: 'US', status: 'Active',
      reg: 'NY DOS 4417762', inc: 'Incorporated 2013',
      addr: '200 Vesey Street, New York, NY 10281',
      lon: -74.013, lat: 40.712 },

    { id: 'us-global', name: 'Meridian Global Partners Inc.',
      country: 'United States', cc: 'US', status: 'Active',
      reg: 'DE File 5582014', inc: 'Incorporated 2019',
      addr: '1209 Orange Street, Wilmington, DE 19801',
      lon: -75.546, lat: 39.744 },

    { id: 'sg-pac',    name: 'Meridian Pacific Pte. Ltd.',
      country: 'Singapore', cc: 'SG', status: 'Active',
      reg: 'ACRA 201633214K', inc: 'Incorporated 2016',
      addr: '10 Marina Boulevard, Singapore 018983',
      lon: 103.851, lat: 1.290 },

    { id: 'se-nordic', name: 'Meridian Nordic AB',
      country: 'Sweden', cc: 'SE', status: 'Active',
      reg: 'Bolagsverket 556912-4471', inc: 'Incorporated 2011',
      addr: 'Birger Jarlsgatan 57, 113 56 Stockholm',
      lon: 18.068, lat: 59.329 },

    { id: 'de-handel', name: 'Meridian Handels GmbH',
      country: 'Germany', cc: 'DE', status: 'Active',
      reg: 'HRB 102447 Frankfurt', inc: 'Incorporated 2009',
      addr: 'Taunusanlage 12, 60325 Frankfurt am Main',
      lon: 8.682, lat: 50.110 },

    { id: 'au-res',    name: 'Meridian Resources Pty Ltd',
      country: 'Australia', cc: 'AU', status: 'Active',
      reg: 'ACN 128 441 902', inc: 'Incorporated 2007',
      addr: '1 Macquarie Place, Sydney NSW 2000',
      lon: 151.209, lat: -33.868 }
  ];

  /* One country chip per jurisdiction in the result set (sorted by count),
     then Active only. Showing only UK/US made Active only "8" look wrong
     next to 3+2 — the other 4 actives live in SG/SE/DE/AU. */
  function buildFilters() {
    var byCc = {};
    CANDIDATES.forEach(function (c) {
      if (!byCc[c.cc]) {
        byCc[c.cc] = {
          id: String(c.cc).toLowerCase(),
          label: c.country,
          group: 'country',
          cc: c.cc,
          n: 0,
          test: (function (cc) {
            return function (x) { return x.cc === cc; };
          })(c.cc)
        };
      }
      byCc[c.cc].n += 1;
    });
    var countries = Object.keys(byCc).map(function (k) { return byCc[k]; })
      .sort(function (a, b) {
        return b.n - a.n || a.label.localeCompare(b.label);
      });
    return countries.concat([
      { id: 'active', label: 'Active only', group: 'status',
        test: function (c) { return c.status === 'Active'; } }
    ]);
  }

  /* Country chips are multi-select OR; status chips AND with that set. */
  var FILTERS = buildFilters();

  var dom = {};
  var state = { filters: [], focused: null };

  function isCountryFilter(f) {
    return f.group === 'country';
  }

  function applyFilters(list, filters) {
    var countryFs = filters.filter(isCountryFilter);
    var otherFs = filters.filter(function (f) { return !isCountryFilter(f); });
    return list.filter(function (c) {
      var countryOk = !countryFs.length || countryFs.some(function (f) { return f.test(c); });
      var otherOk = otherFs.every(function (f) { return f.test(c); });
      return countryOk && otherOk;
    });
  }

  function visible() {
    return applyFilters(CANDIDATES, state.filters);
  }

  /* Facet count on a chip: how many candidates match this facet given the
     rest of the selection. Sibling country chips are ignored so UK stays
     "3" (or "2" under Active only) even when US is also selected. */
  function facetCount(f) {
    var others = state.filters.filter(function (g) { return g !== f; });
    if (isCountryFilter(f)) {
      var nonCountry = others.filter(function (g) { return !isCountryFilter(g); });
      return CANDIDATES.filter(function (c) {
        return f.test(c) && nonCountry.every(function (g) { return g.test(c); });
      }).length;
    }
    var countryFs = others.filter(isCountryFilter);
    return CANDIDATES.filter(function (c) {
      var countryOk = !countryFs.length || countryFs.some(function (g) { return g.test(c); });
      return countryOk && f.test(c);
    }).length;
  }

  /* ---------- map ---------------------------------------------------- */

  /* Two companies can share a street, let alone a city. At any zoom their
     pins land on the same pixel and one hides the other, so co-located
     pins are fanned out around their shared point — displaced enough to
     be separately hoverable, close enough to still read as "here". */
  function spread(list) {
    var placed = list.map(function (c) {
      var p = project(c.lon, c.lat);
      return { c: c, x: p.x, y: p.y };
    });
    var MIN = 2.4;                                   // map units, pre-zoom
    var groups = [];
    placed.forEach(function (p) {
      var g = groups.filter(function (g) {
        return Math.hypot(g[0].x - p.x, g[0].y - p.y) < MIN;
      })[0];
      if (g) g.push(p); else groups.push([p]);
    });
    groups.forEach(function (g) {
      if (g.length < 2) return;
      var r = MIN * 0.9;
      g.forEach(function (p, i) {
        var a = (i / g.length) * Math.PI * 2 - Math.PI / 2;
        p.x += Math.cos(a) * r;
        p.y += Math.sin(a) * r;
        p.fanned = true;
      });
    });
    return placed;
  }

  function drawPins(list, opts) {
    opts = opts || {};
    var solo = !!opts.solo;
    dom.pins.innerHTML = '';
    spread(list).forEach(function (item, i) {
      var c = item.c;
      var p = { x: item.x, y: item.y };
      var pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'vb-pin' + (solo ? ' vb-pin--solo' : '');
      pin.dataset.id = c.id;
      pin.style.left = (p.x / MAP_W * 100) + '%';
      pin.style.top = (p.y / MAP_H * 100) + '%';
      pin.setAttribute('aria-label', c.name + ', ' + c.country);
      pin.style.setProperty('--vb-beat', (i % 5) * 0.4 + 's');
      pin.innerHTML =
        '<span class="vb-pin__halo" aria-hidden="true"></span>' +
        '<span class="vb-pin__marker" aria-hidden="true">' +
          '<svg viewBox="0 0 24 32" fill="none">' +
            '<path d="M12 0C5.925 0 1 4.925 1 11c0 7.875 9.188 19.406 10.125 20.531a1.15 1.15 0 0 0 1.75 0C13.812 30.406 23 18.875 23 11 23 4.925 18.075 0 12 0Z" fill="currentColor"/>' +
            '<circle cx="12" cy="11" r="4.25" fill="var(--surface-neutral-01)"/>' +
          '</svg>' +
        '</span>';
      pin.addEventListener('mouseenter', function () { focus(c.id); });
      pin.addEventListener('mouseleave', function () {
        if (pin.classList.contains('vb-pin--solo')) return;
        focus(null);
      });
      pin.addEventListener('click', function () { scrollToCard(c.id); });
      dom.pins.appendChild(pin);
    });
  }

  /* Confirm step: one candidate → one pin, zoomed in and held highlighted. */
  function isolateOnMap(c) {
    if (!c || !dom.pins || !dom.frame) return;
    drawPins([c], { solo: true });
    frameMap([c]);
    focus(c.id);
    if (dom.caption) {
      dom.caption.textContent = c.country + ' · 1 selected';
    }
  }

  function restoreMapList() {
    var list = visible();
    drawPins(list);
    frameMap(list);
    updateCaption();
    focus(null);
  }

  /* Frame the visible matches: centre on their mean position and scale by
     how tightly they cluster, so narrowing reads as zooming in. */
  function frameMap(list) {
    if (!list.length) return;
    var lons = list.map(function (c) { return c.lon; });
    var lats = list.map(function (c) { return c.lat; });
    var spanLon = Math.max.apply(null, lons) - Math.min.apply(null, lons);
    var spanLat = Math.max.apply(null, lats) - Math.min.apply(null, lats);

    /* Capped at 3.2. The dots are a fixed-resolution raster, so they grow
       with the zoom — past roughly 3x they stop reading as a map and start
       reading as blobs. A single selection uses a tighter floor so we
       actually land on the city rather than a whole-region crop. */
    var floor = list.length === 1 ? 14 : 26;
    var zoom = Math.min(3.2, Math.max(1, 160 / Math.max(spanLon, spanLat * 2, floor)));
    var cx = (Math.max.apply(null, lons) + Math.min.apply(null, lons)) / 2;
    var cy = (Math.max.apply(null, lats) + Math.min.apply(null, lats)) / 2;
    var c = project(cx, cy);

    /* `translate` is applied outside `scale`, so the shift needed to bring
       a point to centre grows with the zoom. Without the * zoom the map
       barely moves, the target region never reaches the middle, and its
       pins end up outside the clipped frame — they look like they vanish. */
    var fx = c.x / MAP_W, fy = c.y / MAP_H;
    dom.frame.style.setProperty('--vb-zoom', zoom.toFixed(2));
    dom.frame.style.setProperty('--vb-ox', ((0.5 - fx) * zoom * 100).toFixed(2) + '%');
    dom.frame.style.setProperty('--vb-oy', ((0.5 - fy) * zoom * 100).toFixed(2) + '%');
  }

  function focus(id) {
    state.focused = id;
    dom.pins.querySelectorAll('.vb-pin').forEach(function (p) {
      p.classList.toggle('vb-pin--on', p.dataset.id === id);
    });
    dom.thread.querySelectorAll('.ai-cand').forEach(function (card) {
      card.classList.toggle('ai-cand--on', card.dataset.id === id);
    });
  }

  function scrollToCard(id) {
    var card = dom.thread.querySelector('[data-id="' + id + '"]');
    if (card) card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  /* ---------- panel -------------------------------------------------- */

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch];
    });
  }

  /* Breadcrumbs live outside .vb-page so they remain on the map + report
     views. Pass a company name to append it as the current segment. */
  function setCrumbs(entityName) {
    var nav = dom.crumbs || document.getElementById('vb-crumbs');
    if (!nav) return;
    dom.crumbs = nav;

    var html =
      '<a href="../agent-hub/index.html" class="tds-breadcrumb-item">Agent hub</a>' +
      '<span class="tds-breadcrumb-divider" aria-hidden="true">/</span>';

    if (entityName) {
      html +=
        '<button type="button" class="tds-breadcrumb-item" id="vb-crumb-home">Verify a business</button>' +
        '<span class="tds-breadcrumb-divider" aria-hidden="true">/</span>' +
        '<span class="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">' +
        esc(entityName) +
        '</span>';
    } else {
      html +=
        '<span class="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">Verify a business</span>';
    }

    nav.innerHTML = html;
    dom.crumbCurrent = nav.querySelector('[aria-current]');

    var back = document.getElementById('vb-crumb-home');
    if (back) {
      back.addEventListener('click', function () {
        if (window.TruAIFlows && window.TruAIFlows.goBack) window.TruAIFlows.goBack();
        else reset();
      });
    }
  }

  function candidateCard(c) {
    return '' +
      '<button type="button" class="ai-cand" data-id="' + c.id + '">' +
        '<span class="ai-cand__head">' +
          '<span class="ai-cand__name">' + esc(c.name) + '</span>' +
          '<span class="ai-cand__go" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none"><path d="M13.47 4.72a.75.75 0 0 1 1.06 0l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H3.75a.75.75 0 0 1 0-1.5h15.19l-5.47-5.47a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>' +
          '</span>' +
        '</span>' +
        '<span class="ai-cand__facts">' +
          '<span class="ai-cand__fact"><b>Jurisdiction</b>' + esc(c.country) + '</span>' +
          '<span class="ai-cand__fact"><b>Status</b>' +
            '<span class="ai-cand__status ai-cand__status--' +
              (c.status === 'Active' ? 'ok' : 'off') + '">' + esc(c.status) + '</span>' +
          '</span>' +
          '<span class="ai-cand__fact ai-cand__fact--wide"><b>Registration</b>' + esc(c.reg) + '</span>' +
          '<span class="ai-cand__fact ai-cand__fact--wide"><b>Address</b>' + esc(c.addr) + '</span>' +
        '</span>' +
        (c.note ? '<span class="ai-cand__note">' + esc(c.note) + '</span>' : '') +
      '</button>';
  }

  function render() {
    var list = visible();
    var countries = {};
    list.forEach(function (c) { countries[c.country] = 1; });
    var nCountries = Object.keys(countries).length;

    var chips = FILTERS.map(function (f) {
      var on = state.filters.indexOf(f) !== -1;
      var n = facetCount(f);
      return '<button type="button" class="ai-chip' + (on ? ' ai-chip--on' : '') +
             '" data-filter="' + f.id + '"' +
             (n === 0 && !on ? ' disabled' : '') +
             '>' + esc(f.label) +
             '<span class="ai-chip__n">' + n + '</span></button>';
    }).join('');

    var filtered = state.filters.length > 0;
    var lead = list.length === 0
      ? 'No matches for these filters.'
      : list.length === 1
        ? 'One match left.'
        : filtered
          ? list.length + ' matches across ' + nCountries +
            (nCountries === 1 ? ' country' : ' countries') + '.'
          : 'Which “Meridian” should I check?';

    var sub = list.length === 0
      ? 'Clear a filter to see candidates again.'
      : list.length === 1
        ? 'Open it to run the KYB check.'
        : filtered
          ? 'Narrow further, or open a card to run the KYB check.'
          : list.length + ' legal entities share this name across ' + nCountries +
            (nCountries === 1 ? ' country' : ' countries') +
            '. They are unrelated companies, so picking the wrong one would attach ' +
            'ownership, registration and sanctions results to the wrong business.';

    dom.thread.innerHTML =
      '<p class="ai-said">Meridian</p>' +
      '<div class="ai-reply">' +
        '<p class="ai-reply__lead">' + lead + '</p>' +
        '<p class="ai-reply__sub">' + sub + '</p>' +
      '</div>' +
      '<div class="ai-chips">' + chips + '</div>' +
      '<div class="ai-cands">' + list.map(candidateCard).join('') + '</div>';

    dom.thread.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = FILTERS.filter(function (x) { return x.id === btn.dataset.filter; })[0];
        var i = state.filters.indexOf(f);
        if (i === -1) state.filters.push(f); else state.filters.splice(i, 1);
        render();
        drawPins(visible());
        frameMap(visible());
        updateCaption();
      });
    });

    dom.thread.querySelectorAll('.ai-cand').forEach(function (card) {
      card.addEventListener('mouseenter', function () { focus(card.dataset.id); });
      card.addEventListener('mouseleave', function () { focus(null); });
      card.addEventListener('focus', function () { focus(card.dataset.id); });
      card.addEventListener('click', function () {
        var c = CANDIDATES.filter(function (x) { return x.id === card.dataset.id; })[0];
        if (c) confirmInvestigate(c);
      });
    });
  }

  function updateCaption() {
    var list = visible();
    if (!list.length) {
      dom.caption.textContent = 'No matches';
      return;
    }
    var countries = {};
    list.forEach(function (c) { countries[c.country] = 1; });
    var n = Object.keys(countries).length;
    dom.caption.textContent = list.length + ' match' + (list.length === 1 ? '' : 'es') +
      ' in ' + n + (n === 1 ? ' country' : ' countries');
  }


  /* ---------- investigation --------------------------------------- */

  var STEPS = [
    'Pulling business registry records',
    'Parsing incorporation documents and ownership structure',
    'Cross-referencing 3 listed directors against OFAC, UN and EU lists',
    'Scanning adverse media, sanctions and litigation sources'
  ];

  var FIELDS = [
    ['Operations and industry', 'sic', 'sicNote'],
    ['Registration date',       'incorporated'],
    ['Legal form',              'legalForm'],
    ['Business address',        'address'],
    ['Registration status',     'regStatus'],
    ['Sizing',                  'sizing'],
    ['Registration number',     'regNumber'],
    ['TAX ID',                  'taxId']
  ];

  /* Hand-drawn icons, reused across the status field, Communication
     records and the News & alerts tags (Figma node 1121:51028). */
  var ICON_CHECK =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5Zm0 1.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5Zm3.47 4.78a.75.75 0 0 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 3.97-3.97Z" fill="currentColor"/></svg>';
  var ICON_PHONE =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.47 3.05a1.75 1.75 0 0 1 2.38.46l1.1 1.65a1.75 1.75 0 0 1-.12 2.14l-.98 1.12a.25.25 0 0 0-.03.29c.76 1.4 1.9 2.54 3.3 3.3a.25.25 0 0 0 .29-.03l1.12-.98a1.75 1.75 0 0 1 2.14-.12l1.65 1.1a1.75 1.75 0 0 1 .46 2.38l-.9 1.35a2.25 2.25 0 0 1-2.2.97c-3.5-.55-6.73-2.26-9.2-4.86-1.9-2-3.2-4.5-3.6-7.24a2.25 2.25 0 0 1 .97-2.2l1.35-.9Z" fill="currentColor"/></svg>';
  var ICON_ENVELOPE =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.75 5.25h14.5A1.75 1.75 0 0 1 21 7v10a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 17V7a1.75 1.75 0 0 1 1.75-1.75Zm.2 1.5 6.49 5.4a.85.85 0 0 0 1.08 0l6.49-5.4H4.95ZM4.5 8.1V17c0 .14.11.25.25.25h14.5a.25.25 0 0 0 .25-.25V8.1l-6.63 5.52a2.35 2.35 0 0 1-2.99 0L4.5 8.1Z" fill="currentColor"/></svg>';

  function reportShell(c, loading) {
    var rows = FIELDS.map(function (f) {
      var isStatus = f[1] === 'regStatus';
      var val;
      if (loading) {
        val = '<span class="vb-skel"></span>';
      } else if (isStatus && c.report) {
        val = '<span class="vb-fields__icon">' + ICON_CHECK + '</span>' + esc(c.report[f[1]]);
      } else {
        val = esc((c.report && c.report[f[1]]) || '—');
      }
      var note = (!loading && f[2] && c.report && c.report[f[2]])
        ? '<p class="vb-fields__note">' + esc(c.report[f[2]]) + '</p>' : '';
      return '<div class="vb-fields__cell' + (isStatus ? ' vb-fields__cell--status' : '') + '">' +
             '<dt>' + esc(f[0]) + '</dt>' +
             '<dd>' + val + '</dd>' + note + '</div>';
    });
    var grid = '';
    for (var i = 0; i < rows.length; i += 2) {
      grid += '<div class="vb-fields__row">' + rows[i] + (rows[i + 1] || '') + '</div>';
    }

    var tabs = ['Overview', 'Ownership / UBO', 'Web & Social Insights',
                'Match Signals', 'Raw Data', 'Sources'];
    var tabRow = tabs.map(function (t, i) {
      if (loading && i > 0) return '<span class="vb-tab vb-skel vb-skel--tab"></span>';
      return '<button type="button" class="vb-tab' + (i === 0 ? ' vb-tab--active' : '') +
             '" role="tab" aria-selected="' + (i === 0) + '">' + esc(t) + '</button>';
    }).join('');

    var below = (!loading && c.report)
      ? '<div class="vb-divider" role="presentation"></div>' +
        '<div class="vb-split">' +
          '<section class="vb-comms"><h3 class="vb-overview__title">Communication Records:</h3>' +
            '<dl class="vb-fields">' +
              '<div class="vb-fields__cell"><dt>Phone</dt>' +
                '<dd><span class="vb-fields__icon">' + ICON_PHONE + '</span>' + esc(c.report.phone) + '</dd></div>' +
              '<div class="vb-fields__cell"><dt>Email</dt>' +
                '<dd><span class="vb-fields__icon">' + ICON_ENVELOPE + '</span>' +
                '<a href="mailto:' + esc(c.report.email) + '">' + esc(c.report.email) + '</a></dd></div>' +
            '</dl>' +
          '</section>' +
          '<section class="vb-alerts"><h3 class="vb-overview__title">News &amp; Alerts:</h3>' +
            '<div class="vb-alerts__row">' + c.report.alerts.map(function (a) {
              return '<span class="vb-alert">' + ICON_CHECK + esc(a) + ': none found</span>';
            }).join('') + '</div>' +
          '</section>' +
        '</div>'
      : '';

    return '' +
      '<div class="vb-result__body">' +
        '<div class="vb-entity">' +
          '<div class="vb-entity__id">' +
            '<p class="vb-entity__name">' + esc(c.name) + '</p>' +
            '<span class="tds-tag tds-tag--positive tds-tag--sm">Verified</span>' +
          '</div>' +
        '</div>' +
        '<dl class="vb-meta">' +
          '<div class="vb-meta__cell"><dt>Country / Jurisdiction</dt><dd>' + esc(c.country) + '</dd></div>' +
          '<div class="vb-meta__cell"><dt>Transaction ID</dt><dd>8c2f4e7a-19bd-4f0…</dd></div>' +
          '<div class="vb-meta__cell"><dt>Date</dt><dd>17 Jun 2026, 2:14 PM</dd></div>' +
        '</dl>' +
        '<div class="vb-tabs" role="tablist" aria-label="Result sections">' + tabRow + '</div>' +
        '<div class="vb-hero">' +
          '<div class="vb-hero__photo">' +
            '<img src="assets/company-storefront.jpg" alt="Registered address exterior">' +
          '</div>' +
          '<div class="vb-hero__map" id="vb-result-map" role="application" ' +
            'aria-label="Map of registered address in ' + esc(c.country) + '"></div>' +
        '</div>' +
        '<section class="vb-overview">' +
          '<h3 class="vb-overview__title">Company Overview:</h3>' +
          '<dl class="vb-fields">' + grid + '</dl>' +
        '</section>' +
        below +
      '</div>';
  }

  /* Live map for the result overview. Carto Positron tiles are the free
     stand-in for Snazzy “Ultra Light with Labels” (same washed grey roads
     + labels, no Google key). Zoom controls are on; wheel zoom off so the
     page can still scroll. */
  var resultMap = null;
  var previewMap = null;

  function destroyResultMap() {
    if (resultMap) {
      resultMap.remove();
      resultMap = null;
    }
  }

  function mountLeafletMap(el, lat, lon, zoom) {
    if (!el || !window.L) return null;
    var map = L.map(el, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    var icon = L.divIcon({
      className: 'vb-map-marker-wrap',
      html: '<span class="vb-map-marker" aria-hidden="true">' +
            '<span class="vb-map-marker__halo"></span>' +
            '<span class="vb-map-marker__dot"></span></span>',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
    L.marker([lat, lon], { icon: icon, interactive: false }).addTo(map);
    map.setView([lat, lon], zoom == null ? 14 : zoom);
    window.setTimeout(function () { map.invalidateSize(); }, 60);
    window.setTimeout(function () { map.invalidateSize(); }, 320);
    return map;
  }

  function mountResultMap(c) {
    destroyResultMap();
    var el = document.getElementById('vb-result-map');
    if (!c || c.lat == null || c.lon == null) return;
    resultMap = mountLeafletMap(el, c.lat, c.lon, 14);
  }

  function mountPreviewMap() {
    var el = document.getElementById('vb-preview-map');
    if (!el || !window.L || previewMap) return;
    var lat = parseFloat(el.getAttribute('data-lat'));
    var lon = parseFloat(el.getAttribute('data-lon'));
    if (isNaN(lat) || isNaN(lon)) return;
    previewMap = mountLeafletMap(el, lat, lon, 13);
  }

  function panelProgress(c, done, pct) {
    return '' +
      '<p class="ai-said">Meridian</p>' +
      '<p class="ai-said">' + esc(c.name) + '</p>' +
      '<div class="ai-run">' +
        '<div class="ai-run__head"><span>Investigating</span><span>' + pct + '%</span></div>' +
        '<div class="ai-run__track"><i style="width:' + pct + '%"></i></div>' +
        '<ul class="ai-run__steps">' +
          STEPS.map(function (t, i) {
            var state = i < done ? 'done' : (i === done ? 'now' : 'wait');
            return '<li class="ai-step ai-step--' + state + '">' +
                   '<span class="ai-step__mark" aria-hidden="true"></span>' + esc(t) + '</li>';
          }).join('') +
        '</ul>' +
      '</div>';
  }

  /* Only Apex ships a full authored report. Every other map candidate
     needs a synthesized one or finish() throws on c.report.summary and
     the panel stays stuck at 100% with empty overview fields. */
  function ensureReport(c) {
    if (c.report) return c.report;
    var dissolved = c.status === 'Dissolved';
    c.report = {
      sic: 'Registered business',
      sicNote: dissolved
        ? 'Entity is no longer active on the registry.'
        : 'Matched against the local business registry.',
      incorporated: c.inc || 'See registry filings',
      legalForm: 'Limited company',
      address: c.addr || '—',
      regStatus: c.status || 'Active',
      sizing: 'See filings',
      regNumber: c.reg || '—',
      taxId: '—',
      phone: '—',
      email: '—',
      alerts: ['Adverse media', 'Sanctions', 'Litigation', 'Positive press'],
      summary: dissolved
        ? c.name + ' was found in the ' + c.country +
          ' registry but is recorded as dissolved. No active trading footprint ' +
          'was confirmed; treat any ongoing relationship with caution.'
        : c.name + ' was matched in the ' + c.country +
          ' business registry (' + (c.reg || 'registration on file') +
          ') and verified against available sanctions, adverse media and ' +
          'litigation sources. No adverse hits were returned.'
    };
    return c.report;
  }

  function panelReport(c) {
    var report = ensureReport(c);
    return '' +
      '<p class="ai-said">Meridian</p>' +
      '<p class="ai-said">' + esc(c.name) + '</p>' +
      '<div class="ai-report">' +
        '<h3 class="ai-report__name">' + esc(c.name) + '</h3>' +
        '<span class="tds-tag tds-tag--positive tds-tag--sm">Verified</span>' +
        '<h4 class="ai-report__h">Summary</h4>' +
        '<p class="ai-report__body">' + esc(report.summary) + '</p>' +
        '<div class="ai-ready">' +
          '<span>Verification report is ready</span>' +
          '<button type="button" class="ai-ready__btn">Export</button>' +
        '</div>' +
        '<h4 class="ai-report__h">Continue your investigation</h4>' +
        '<div class="ai-followups">' +
          ['Why is this entity high risk?',
           'Who ultimately owns this business?',
           'Has this entity ever traded?'].map(function (q) {
            return '<button type="button" class="ai-suggestion"><span>' + esc(q) + '</span>' +
                   '<span class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular" aria-hidden="true">' +
                   '<svg viewBox="0 0 24 24" fill="none"><path d="M13.47 4.72a.75.75 0 0 1 1.06 0l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H3.75a.75.75 0 0 1 0-1.5h15.19l-5.47-5.47a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg></span></button>';
          }).join('') +
        '</div>' +
      '</div>';
  }

  var runTimer = null;

  /* Selecting a candidate highlights it on the map and asks before running
     anything — picking the wrong "Meridian" is exactly the mistake this
     flow exists to prevent, so the check has to happen before the work
     starts, not after. */
  function confirmInvestigate(c) {
    isolateOnMap(c);
    scrollToCard(c.id);
    var said = '<p class="ai-said">' + esc(c.name) + '</p>';

    if (window.TruAIFlows) {
      window.TruAIFlows.pushHistory(function () {
        render();
        restoreMapList();
      });
      window.TruAIFlows.respondAfterThinking(dom.thread, said,
        'Looking up ' + c.name + '…', function () { showConfirmStep(c, said); });
    } else {
      showConfirmStep(c, said);
    }
  }

  function showConfirmStep(c, said) {
    isolateOnMap(c);
    dom.thread.innerHTML =
      said +
      '<div class="ai-reply">' +
        '<p class="ai-reply__lead">Run a KYB check on ' + esc(c.name) + '?</p>' +
        '<p class="ai-reply__sub">' + esc(c.country) + ' · ' + esc(c.reg) + '</p>' +
      '</div>' +
      '<div class="ai-confirm">' +
        '<button type="button" class="tds-btn tds-btn--primary tds-btn--md" data-confirm="yes">Confirm</button>' +
        '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md" data-confirm="no">Cancel</button>' +
      '</div>';
    dom.thread.scrollTop = dom.thread.scrollHeight;

    dom.thread.querySelector('[data-confirm="yes"]').addEventListener('click', function () {
      investigate(c);
    });
    dom.thread.querySelector('[data-confirm="no"]').addEventListener('click', function () {
      /* Cancelling and going back land on the same place (the candidate
         list), so cancel just replays the back history entry pushed by
         confirmInvestigate() above rather than duplicating that logic. */
      if (window.TruAIFlows) window.TruAIFlows.goBack();
      else { render(); restoreMapList(); }
    });
  }

  function investigate(c, opts) {
    opts = opts || {};
    var fromForm = !!opts.fromForm;

    if (window.TruAIFlows) {
      window.TruAIFlows.pushHistory(function () {
        if (runTimer) { window.clearTimeout(runTimer); runTimer = null; }
        document.body.classList.remove('vb-loading', 'vb-report-ready', 'vb-searching');
        destroyResultMap();
        if (dom.report) { dom.report.hidden = true; dom.report.innerHTML = ''; }
        if (dom.page) dom.page.hidden = false;
        if (dom.globe) dom.globe.setAttribute('aria-hidden', 'true');
        setCrumbs(null);
        if (fromForm) {
          dom.thread.hidden = true;
          dom.thread.innerHTML = '';
          if (dom.suggestions) dom.suggestions.hidden = false;
        } else {
          confirmInvestigate(c);
        }
      });
    }

    if (dom.page) dom.page.hidden = true;
    document.body.classList.remove('vb-searching');
    if (dom.globe) dom.globe.setAttribute('aria-hidden', 'true');
    dom.thread.hidden = false;
    if (dom.suggestions) dom.suggestions.hidden = true;

    document.body.classList.add('vb-loading');
    document.body.classList.remove('vb-report-ready');
    destroyResultMap();
    dom.report.hidden = false;
    dom.report.innerHTML = reportShell(c, true);
    mountResultMap(c);
    setCrumbs(c.name);

    var done = 0;
    dom.thread.innerHTML = panelProgress(c, 0, 0);
    dom.thread.scrollTop = 0;

    function tick() {
      done += 1;
      var pct = Math.round(done / STEPS.length * 100);
      dom.thread.innerHTML = panelProgress(c, done, pct);
      if (done < STEPS.length) {
        runTimer = window.setTimeout(tick, 900);
      } else {
        runTimer = window.setTimeout(function () { finish(c); }, 700);
      }
    }
    runTimer = window.setTimeout(tick, 800);
  }

  function finish(c) {
    ensureReport(c);
    document.body.classList.remove('vb-loading');
    document.body.classList.add('vb-report-ready');
    destroyResultMap();
    dom.report.innerHTML = reportShell(c, false);
    mountResultMap(c);
    dom.thread.innerHTML = panelReport(c);
    dom.thread.scrollTop = 0;
  }

  /* ---------- left-panel typeahead (BRR behavior) -------------------- */

  var MIN_QUERY_LEN = 3;
  var HINT_DEFAULT = 'Enter at least 3 characters to search for a business.';

  var COUNTRIES = [
    { code: 'gb', name: 'United Kingdom', registry: 'Companies House', broadTotal: 412 },
    { code: 'us', name: 'United States', registry: 'Secretary of State business registry', broadTotal: 1284 },
    { code: 'ca', name: 'Canada', registry: 'Corporations Canada', broadTotal: 296 },
    { code: 'au', name: 'Australia', registry: 'ASIC business registry', broadTotal: 188 },
    { code: 'de', name: 'Germany', registry: 'Handelsregister', broadTotal: 524 },
    { code: 'nl', name: 'Netherlands', registry: 'KVK business registry', broadTotal: 241 },
    { code: 'sg', name: 'Singapore', registry: 'ACRA business registry', broadTotal: 157 }
  ];

  var MERIDIAN_APEX = {
    id: 'meridian-apex',
    name: 'Meridian Apex Consulting Ltd.',
    country: 'United Kingdom',
    countryCode: 'gb',
    brn: '11876542',
    address1: 'Suite 4, 123 Formation House',
    city: 'London',
    state: 'England',
    postal: 'EC2A 4NE',
    sample: 'elevated',
    lon: -0.093,
    lat: 51.513
  };

  var SEARCH_POOL_BY_COUNTRY = {
    gb: [
      MERIDIAN_APEX,
      { id: 'meridian-global', name: 'Meridian Global Holdings Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0012847', address1: '14 Bishopsgate', city: 'London', state: 'England', postal: 'EC2N 3AR', sample: 'standard', lon: -0.082, lat: 51.515 },
      { id: 'meridian-capital', name: 'Meridian Capital Advisors Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0039182', address1: '30 St Mary Axe', city: 'London', state: 'England', postal: 'EC3A 8EP', sample: 'standard', lon: -0.081, lat: 51.514 },
      { id: 'meridian-east', name: 'Meridian East Trading Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0045621', address1: '85 Fleet Street', city: 'London', state: 'England', postal: 'EC4Y 1AE', sample: 'standard', lon: -0.105, lat: 51.514 },
      { id: 'meridian-bridge', name: 'Meridian Bridge Consulting Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0051093', address1: '22 Old Broad Street', city: 'London', state: 'England', postal: 'EC2N 1HQ', sample: 'standard', lon: -0.084, lat: 51.516 },
      { id: 'meridian-office', name: 'Meridian Office Solutions Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0067744', address1: '10 Finsbury Square', city: 'London', state: 'England', postal: 'EC2A 1AF', sample: 'standard', lon: -0.087, lat: 51.521 },
      { id: 'mercury-systems', name: 'Mercury Systems Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0073310', address1: '5 Canada Square', city: 'London', state: 'England', postal: 'E14 5AQ', sample: 'standard', lon: -0.019, lat: 51.505 },
      { id: 'mersey-industrial', name: 'Mersey Industrial Group Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0089021', address1: '1 Spinningfields', city: 'Manchester', state: 'England', postal: 'M3 3AP', sample: 'standard', lon: -2.250, lat: 53.479 },
      { id: 'merchant-row', name: 'Merchant Row Properties Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0091184', address1: '45 Gresham Street', city: 'London', state: 'England', postal: 'EC2V 7BG', sample: 'standard', lon: -0.093, lat: 51.516 },
      { id: 'meridian-north', name: 'Meridian North Services Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0104455', address1: '2 Snow Hill', city: 'London', state: 'England', postal: 'EC1A 2DH', sample: 'standard', lon: -0.104, lat: 51.518 },
      { id: 'meridian-works', name: 'Meridian Works Ltd.', country: 'United Kingdom', countryCode: 'gb', brn: 'GB-0112290', address1: '100 Liverpool Street', city: 'London', state: 'England', postal: 'EC2M 2AT', sample: 'standard', lon: -0.082, lat: 51.518 }
    ],
    us: [
      { id: 'meridian-partners-us', name: 'Meridian Partners Inc.', country: 'United States', countryCode: 'us', brn: 'US-7731-INC', address1: '200 California St', city: 'San Francisco', state: 'CA', postal: '94111', sample: 'standard', lon: -122.399, lat: 37.793 },
      { id: 'mercury-financial', name: 'Mercury Financial Group Inc.', country: 'United States', countryCode: 'us', brn: 'US-4410-INC', address1: '350 Madison Ave', city: 'New York', state: 'NY', postal: '10017', sample: 'standard', lon: -73.980, lat: 40.753 },
      { id: 'merchant-services', name: 'Merchant Services LLC', country: 'United States', countryCode: 'us', brn: 'US-9022-LLC', address1: '480 Mission St', city: 'San Francisco', state: 'CA', postal: '94105', sample: 'standard', lon: -122.397, lat: 37.790 },
      { id: 'meridian-ridge', name: 'Meridian Ridge Capital LLC', country: 'United States', countryCode: 'us', brn: 'US-1188-LLC', address1: '71 Stevenson St', city: 'San Francisco', state: 'CA', postal: '94105', sample: 'standard', lon: -122.400, lat: 37.789 },
      { id: 'meridian-coastal', name: 'Meridian Coastal Holdings Inc.', country: 'United States', countryCode: 'us', brn: 'US-5520-INC', address1: '101 California St', city: 'San Francisco', state: 'CA', postal: '94111', sample: 'standard', lon: -122.398, lat: 37.793 },
      { id: 'meridian-pacific', name: 'Meridian Pacific Advisors Inc.', country: 'United States', countryCode: 'us', brn: 'US-6631-INC', address1: '555 California St', city: 'San Francisco', state: 'CA', postal: '94104', sample: 'standard', lon: -122.404, lat: 37.793 },
      { id: 'mersey-logistics', name: 'Mersey Logistics Corp.', country: 'United States', countryCode: 'us', brn: 'US-7744-CORP', address1: '1 Market St', city: 'San Francisco', state: 'CA', postal: '94105', sample: 'standard', lon: -122.394, lat: 37.794 },
      { id: 'meridian-apex-us', name: 'Meridian Apex Consulting Inc.', country: 'United States', countryCode: 'us', brn: 'US-8891-INC', address1: '50 Fremont St', city: 'San Francisco', state: 'CA', postal: '94105', sample: 'elevated', lon: -122.395, lat: 37.791 }
    ]
  };

  var typeahead = {
    country: getCountryByCode('us'),
    selected: null,
    activeIndex: -1,
    menuOpen: false,
    visibleMatches: []
  };

  function byId(id) { return document.getElementById(id); }

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function getCountryByCode(code) {
    for (var i = 0; i < COUNTRIES.length; i++) {
      if (COUNTRIES[i].code === code) return COUNTRIES[i];
    }
    return COUNTRIES[1];
  }

  function nameMatches(name, query) {
    return normalize(name).indexOf(query) !== -1;
  }

  function getSearchTier(query) {
    if (query.indexOf('meridian apex') !== -1) return 'exact';
    if (query.indexOf('meridia') !== -1) return 'narrow';
    if (query.indexOf('mer') !== -1) return 'broad';
    return 'other';
  }

  function rankEntity(entity, query, tier) {
    var name = normalize(entity.name);
    var score = 0;
    if (name.indexOf(query) === 0) score += 100;
    else if (name.indexOf(query) !== -1) score += 50;
    if (name.indexOf('meridian apex') !== -1) score += 10;
    if (tier === 'narrow' && name.indexOf('meridian') !== -1) score += 20;
    if (tier === 'exact' && name.indexOf('meridian apex') !== -1) score += 200;
    return score;
  }

  function getRegistryPool() {
    return SEARCH_POOL_BY_COUNTRY[typeahead.country.code] || [];
  }

  function registryLabel() {
    return typeahead.country.registry;
  }

  function searchRegistry(query) {
    var q = normalize(query);
    if (q.length < MIN_QUERY_LEN) {
      return { tier: 'short', visible: [], total: 0, footer: '' };
    }

    var tier = getSearchTier(q);
    var catalog = getRegistryPool();
    var pool = catalog.filter(function (item) {
      return nameMatches(item.name, q);
    }).sort(function (a, b) {
      return rankEntity(b, q, tier) - rankEntity(a, q, tier);
    });

    if (!pool.length) {
      return {
        tier: tier,
        visible: [],
        total: 0,
        footer: 'No matches in ' + registryLabel() + ' for this search'
      };
    }

    if (tier === 'exact') {
      var exact = pool.filter(function (item) {
        return normalize(item.name).indexOf('meridian apex') !== -1;
      });
      var exactVisible = exact.length ? exact.slice(0, 1) : pool.slice(0, 1);
      return {
        tier: tier,
        visible: exactVisible,
        total: exactVisible.length,
        footer: exactVisible.length === 1 ? '1 match in ' + registryLabel() : ''
      };
    }

    if (tier === 'narrow') {
      var narrowPool = pool.filter(function (item) {
        return normalize(item.name).indexOf('meridian') !== -1;
      });
      var narrowVisible = (narrowPool.length ? narrowPool : pool).slice(0, 5);
      var narrowTotal = typeahead.country.broadTotal || narrowPool.length || narrowVisible.length;
      if (narrowPool.length) narrowTotal = Math.max(narrowPool.length, narrowTotal);
      return {
        tier: tier,
        visible: narrowVisible,
        total: narrowTotal,
        footer: narrowVisible.length
          ? 'Showing ' + narrowVisible.length + ' of ' + narrowTotal + ' matches — keep typing to refine'
          : ''
      };
    }

    if (tier === 'broad') {
      var broadVisible = pool.slice(0, 8);
      var broadTotal = typeahead.country.broadTotal || broadVisible.length;
      return {
        tier: tier,
        visible: broadVisible,
        total: broadTotal,
        footer: broadVisible.length
          ? 'Showing ' + broadVisible.length + ' of ' + broadTotal + ' matches — keep typing to refine'
          : ''
      };
    }

    var otherVisible = pool.slice(0, 6);
    var otherTotal = Math.max(otherVisible.length, 24);
    return {
      tier: tier,
      visible: otherVisible,
      total: otherTotal,
      footer: otherVisible.length
        ? 'Showing ' + otherVisible.length + ' of ' + otherTotal + ' matches — keep typing to refine'
        : 'No matches in ' + registryLabel() + ' for this search'
    };
  }

  function elevatedReport(entity) {
    var addr = [entity.address1, entity.city, entity.state, entity.postal].filter(Boolean).join(', ');
    return {
      sic: 'Registered under SIC 70229',
      sicNote: '(management consultancy activities), a catch-all code. ' +
               'No evidence of active trading, clients, or revenue.',
      incorporated: entity.countryCode === 'us'
        ? 'Incorporated in ' + (entity.state || 'the United States')
        : 'Incorporated 1 Feb 2019 (England & Wales)',
      legalForm: entity.countryCode === 'us'
        ? 'Corporation / LLC'
        : 'Private company limited by shares',
      address: addr || '—',
      regStatus: 'Active',
      sizing: entity.countryCode === 'us'
        ? '0 employees; $1 authorized / $1 paid-in capital.'
        : '0 employees; £1 authorised / £1 paid-up capital.',
      regNumber: 'BRN ' + (entity.brn || '—'),
      taxId: entity.countryCode === 'us' ? 'EIN 34-1209876' : 'GB341209876',
      phone: entity.countryCode === 'us' ? '+1 415 555 0142' : '+44 20 7946 0000',
      email: 'info@meridianapexconsulting.co.uk',
      alerts: ['Adverse media', 'Sanctions', 'Litigation', 'Positive press'],
      summary: 'Registered and active, but the filings describe a shell: ' +
               'a virtual office, a catch-all SIC code, no employees and ' +
               'minimal capital. Nothing adverse surfaced across media, ' +
               'sanctions or litigation — the risk here is absence of ' +
               'evidence, not presence of it.'
    };
  }

  function standardReport(entity) {
    var addr = [entity.address1, entity.city, entity.state, entity.postal].filter(Boolean).join(', ');
    return {
      sic: 'Registered business',
      sicNote: '',
      incorporated: 'See registry filings',
      legalForm: 'Limited company',
      address: addr || '—',
      regStatus: 'Active',
      sizing: 'See filings',
      regNumber: 'BRN ' + (entity.brn || '—'),
      taxId: '—',
      phone: '—',
      email: '—',
      alerts: ['Adverse media', 'Sanctions', 'Litigation', 'Positive press'],
      summary: entity.name + ' was matched in the ' + entity.country +
               ' business registry and verified against available sources.'
    };
  }

  function entityToCandidate(entity) {
    var addr = [entity.address1, entity.city, entity.state, entity.postal].filter(Boolean).join(', ');
    return {
      id: entity.id,
      name: entity.name,
      country: entity.country,
      cc: String(entity.countryCode || '').toUpperCase(),
      status: 'Active',
      reg: entity.brn,
      inc: '',
      addr: addr,
      lon: entity.lon != null ? entity.lon : 0,
      lat: entity.lat != null ? entity.lat : 0,
      report: entity.sample === 'elevated' ? elevatedReport(entity) : standardReport(entity)
    };
  }

  function fillPrefillFields(entity) {
    var brn = byId('vb-prefill-brn');
    var address = byId('vb-prefill-address');
    var city = byId('vb-prefill-city');
    var st = byId('vb-prefill-state');
    var postal = byId('vb-prefill-postal');
    if (brn) brn.value = entity.brn || '';
    if (address) address.value = entity.address1 || '';
    if (city) city.value = entity.city || '';
    if (st) st.value = entity.state || '';
    if (postal) postal.value = entity.postal || '';
  }

  function showPrefill(show) {
    var section = byId('vb-prefill');
    var lookup = byId('vb-lookup');
    if (section) section.hidden = !show;
    if (lookup) lookup.classList.toggle('vb-lookup--filled', !!show);
  }

  function updateSubmitButton() {
    var submit = byId('vb-submit-btn');
    if (!submit) return;
    if (typeahead.selected) submit.removeAttribute('aria-disabled');
    else submit.setAttribute('aria-disabled', 'true');
  }

  function updateSearchPlaceholder() {
    var input = byId('vb-q');
    var label = document.querySelector('label[for="vb-q"]');
    if (!input) return;
    var text = 'Search for ' + typeahead.country.name + ' business';
    input.placeholder = text;
    if (label) label.textContent = text;
  }

  function updateSearchHint(query) {
    var hint = byId('vb-search-hint');
    if (!hint) return;

    var q = normalize(query);
    if (typeahead.selected && q === normalize(typeahead.selected.name)) {
      hint.textContent = HINT_DEFAULT;
      hint.classList.remove('vb-search-hint--active');
      return;
    }

    if (!q.length) {
      hint.textContent = HINT_DEFAULT;
      hint.classList.remove('vb-search-hint--active');
      return;
    }

    if (q.length < MIN_QUERY_LEN) {
      hint.textContent =
        'Type ' +
        (MIN_QUERY_LEN - q.length) +
        ' more character' +
        (MIN_QUERY_LEN - q.length === 1 ? '' : 's') +
        '.';
      hint.classList.add('vb-search-hint--active');
      return;
    }

    hint.textContent = HINT_DEFAULT;
    hint.classList.remove('vb-search-hint--active');
  }

  function closeMenu() {
    var root = byId('vb-combobox');
    var list = byId('vb-search-list');
    var input = byId('vb-q');
    if (!root || !list || !input) return;

    root.classList.remove('tds-combobox--open');
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    typeahead.menuOpen = false;
    typeahead.activeIndex = -1;
    typeahead.visibleMatches = [];
  }

  function openMenu() {
    var root = byId('vb-combobox');
    var list = byId('vb-search-list');
    var input = byId('vb-q');
    if (!root || !list || !input) return;

    root.classList.add('tds-combobox--open');
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    typeahead.menuOpen = true;
  }

  function highlightActiveItem() {
    var options = byId('vb-search-options');
    if (!options) return;

    options.querySelectorAll('.tds-action-list-item').forEach(function (item, index) {
      item.classList.toggle('tds-action-list-item--active', index === typeahead.activeIndex);
      if (index === typeahead.activeIndex) item.setAttribute('aria-selected', 'true');
      else item.removeAttribute('aria-selected');
    });
  }

  function renderMenu(result) {
    var list = byId('vb-search-list');
    var options = byId('vb-search-options');
    var footer = byId('vb-search-footer');
    if (!list || !options || !footer) return;

    typeahead.visibleMatches = result.visible || [];

    if (!typeahead.visibleMatches.length) {
      options.innerHTML = '';
      footer.hidden = true;
      footer.textContent = '';
      closeMenu();
      return;
    }

    options.innerHTML = typeahead.visibleMatches.map(function (item, index) {
      return (
        '<button type="button" class="tds-action-list-item vb-combobox__option" role="option" data-index="' +
        index +
        '">' +
        '<span class="tds-action-list-item__content">' +
        '<span class="tds-action-list-item__label">' +
        esc(item.name) +
        '</span>' +
        '<span class="tds-action-list-item__description">' +
        esc(item.country) +
        '</span>' +
        '</span>' +
        '</button>'
      );
    }).join('');

    options.querySelectorAll('.vb-combobox__option').forEach(function (button) {
      button.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var index = Number(button.getAttribute('data-index'));
        if (typeahead.visibleMatches[index]) selectEntity(typeahead.visibleMatches[index]);
      });
    });

    if (result.footer) {
      footer.textContent = result.footer;
      footer.hidden = false;
    } else {
      footer.hidden = true;
      footer.textContent = '';
    }

    typeahead.activeIndex = 0;
    highlightActiveItem();
    openMenu();
  }

  function clearSelection() {
    typeahead.selected = null;
    showPrefill(false);
    updateSubmitButton();
  }

  function selectEntity(entity) {
    var input = byId('vb-q');
    if (!input || !entity) return;

    typeahead.selected = entity;
    input.value = entity.name;
    fillPrefillFields(entity);
    showPrefill(true);
    updateSubmitButton();
    closeMenu();
    updateSearchHint(entity.name);
    input.focus();
  }

  function onSearchInput() {
    var input = byId('vb-q');
    if (!input) return;

    if (typeahead.selected && input.value !== typeahead.selected.name) {
      clearSelection();
    }

    updateSearchHint(input.value);

    var result = searchRegistry(input.value);
    if (result.tier === 'short') {
      closeMenu();
      return;
    }

    if (!result.visible.length) {
      closeMenu();
      var hint = byId('vb-search-hint');
      if (hint) {
        hint.textContent = 'No matches found for this search.';
        hint.classList.add('vb-search-hint--active');
      }
      return;
    }

    renderMenu(result);
  }

  function selectActiveMatch() {
    if (!typeahead.visibleMatches.length) return;
    var index = typeahead.activeIndex >= 0 ? typeahead.activeIndex : 0;
    selectEntity(typeahead.visibleMatches[index]);
  }

  function moveActive(step) {
    if (!typeahead.menuOpen || !typeahead.visibleMatches.length) return;

    if (typeahead.activeIndex < 0) typeahead.activeIndex = 0;
    else {
      typeahead.activeIndex =
        (typeahead.activeIndex + step + typeahead.visibleMatches.length) %
        typeahead.visibleMatches.length;
    }

    highlightActiveItem();
  }

  function applyCountryChange(country) {
    if (!country || country.code === typeahead.country.code) return;

    typeahead.country = country;
    var trigger = byId('vb-country-trigger');
    if (trigger) trigger.setAttribute('aria-label', 'Country, ' + country.name);

    var input = byId('vb-q');
    if (input) input.value = '';
    updateSearchPlaceholder();
    clearSelection();
    updateSearchHint('');
    closeMenu();
  }

  function submitSelected() {
    var submit = byId('vb-submit-btn');
    if (!submit || submit.getAttribute('aria-disabled') === 'true' || !typeahead.selected) return;

    var candidate = entityToCandidate(typeahead.selected);
    closeMenu();
    investigate(candidate, { fromForm: true });
  }

  function initTypeahead() {
    var input = byId('vb-q');
    var submit = byId('vb-submit-btn');
    var root = byId('vb-combobox');
    var countryRoot = byId('vb-country-select');
    var searchField = byId('vb-search-field');

    if (countryRoot) {
      countryRoot.addEventListener('click', function () { closeMenu(); });
      countryRoot.addEventListener('tds-select:change', function (event) {
        var item = event.detail && event.detail.item;
        if (!item) return;
        var country = getCountryByCode(item.getAttribute('data-country-code'));
        if (country) applyCountryChange(country);
      });
    }

    if (window.TdsInteractiveSelect) {
      window.TdsInteractiveSelect.init(document);
    }

    if (input) {
      input.addEventListener('input', onSearchInput);
      input.addEventListener('focus', function () {
        if (window.TdsInteractiveSelect) window.TdsInteractiveSelect.closeAll();
        onSearchInput();
      });
      input.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (!typeahead.menuOpen) onSearchInput();
          else moveActive(1);
          return;
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          moveActive(-1);
          return;
        }
        if (event.key === 'Enter') {
          event.preventDefault();
          if (typeahead.menuOpen) selectActiveMatch();
          else submitSelected();
          return;
        }
        if (event.key === 'Escape') closeMenu();
      });
    }

    document.addEventListener('mousedown', function (event) {
      if (searchField && !searchField.contains(event.target)) {
        closeMenu();
        return;
      }
      if (
        root &&
        root.contains(event.target) &&
        countryRoot &&
        !countryRoot.contains(event.target) &&
        window.TdsInteractiveSelect
      ) {
        window.TdsInteractiveSelect.closeAll();
      }
    });

    if (submit) {
      submit.addEventListener('click', function (event) {
        event.preventDefault();
        submitSelected();
      });
    }

    updateSearchPlaceholder();
    updateSearchHint('');
    updateSubmitButton();
  }

  /* ---------- flow --------------------------------------------------- */

  var pageHideTimer = null;

  /* Tracks whether this session arrived via the prompt (home's "Start a
     new verification" → Business), so start() knows whether "back" from
     the candidate list should land on that prompt or on a plain reset —
     otherwise two different steps would both push "reset" and the first
     one's distinct state would be skipped on the way back. */
  var arrivedViaPrompt = false;

  function renderPromptState() {
    if (dom.suggestions) dom.suggestions.hidden = true;
    dom.thread.hidden = false;
    dom.thread.innerHTML =
      '<p class="ai-said">Business</p>' +
      '<div class="ai-reply">' +
        '<p class="ai-reply__lead">Hi, I’m your KYB agent.</p>' +
        '<p class="ai-reply__sub">What’s the business name?</p>' +
      '</div>';
  }

  /* Arriving here from the home page's "Start a new verification" →
     Business choice: the panel already asked the question and got an
     answer, so it shouldn't reset back to the generic suggestions — it
     should pick up with the next question. */
  function consumeIncomingFlow() {
    if (!window.TruAIFlows) return;
    var flowState = window.TruAIFlows.getFlow();
    if (!flowState || flowState.flow !== 'new-verification' || flowState.step !== 'ask-name') return;
    window.TruAIFlows.clearFlow();

    arrivedViaPrompt = true;
    renderPromptState();
    window.TruAIFlows.pushHistory(function () { reset(); });

    var panelField = document.getElementById('v2-ask');
    if (panelField) panelField.focus();
  }

  function start() {
    var panelField = document.getElementById('v2-ask');
    var query = ((panelField && panelField.value) || '').trim();
    if (!query) return;

    dom.thread.hidden = false;
    if (dom.suggestions) dom.suggestions.hidden = true;

    function reveal() {
      document.body.classList.add('vb-searching');
      if (pageHideTimer) window.clearTimeout(pageHideTimer);
      pageHideTimer = window.setTimeout(function () {
        if (dom.page) dom.page.hidden = true;
      }, 220);
      dom.globe.setAttribute('aria-hidden', 'false');

      render();
      drawPins(CANDIDATES);
      dom.frame.style.setProperty('--vb-zoom', '1');
      dom.frame.style.setProperty('--vb-ox', '0%');
      dom.frame.style.setProperty('--vb-oy', '0%');
      updateCaption();
      window.setTimeout(function () { frameMap(CANDIDATES); }, 520);
    }

    if (window.TruAIFlows) {
      window.TruAIFlows.pushHistory(
        arrivedViaPrompt ? renderPromptState : function () { reset(); });
      window.TruAIFlows.respondAfterThinking(dom.thread,
        '<p class="ai-said">' + esc(query) + '</p>',
        'Searching business registries for matches…', reveal);
    } else {
      reveal();
    }
  }

  function reset() {
    if (pageHideTimer) { window.clearTimeout(pageHideTimer); pageHideTimer = null; }
    if (dom.page) dom.page.hidden = false;
    document.body.classList.remove('vb-searching');
    if (dom.globe) dom.globe.setAttribute('aria-hidden', 'true');
    dom.thread.hidden = true;
    dom.thread.innerHTML = '';
    if (dom.suggestions) dom.suggestions.hidden = false;
    document.body.classList.remove('vb-loading', 'vb-report-ready');
    if (runTimer) { window.clearTimeout(runTimer); runTimer = null; }
    destroyResultMap();
    if (dom.report) { dom.report.hidden = true; dom.report.innerHTML = ''; }
    setCrumbs(null);
    state.filters = [];
    closeMenu();
  }

  function init() {
    dom.globe = document.getElementById('vb-globe');
    dom.frame = document.getElementById('vb-globe-frame');
    dom.pins = document.getElementById('vb-globe-pins');
    dom.caption = document.getElementById('vb-globe-caption');
    dom.thread = document.getElementById('ai-thread');
    dom.suggestions = document.getElementById('ai-suggestions');
    dom.report = document.getElementById('vb-report');
    dom.page = document.querySelector('.vb-page');
    dom.crumbs = document.getElementById('vb-crumbs');
    setCrumbs(null);
    if (!dom.globe || !dom.thread) return;

    initTypeahead();
    mountPreviewMap();

    /* AI panel composer still drives the map disambiguation path. */
    var panelField = document.getElementById('v2-ask');
    if (panelField) {
      panelField.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (panelField.value.trim()) start(); else reset();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('vb-searching')) reset();
    });

    if (window.TruAIFlows) window.TruAIFlows.initBackButton();
    consumeIncomingFlow();

    window.kybSearch = {
      start: start,
      reset: reset,
      candidates: CANDIDATES,
      submitSelected: submitSelected
    };
    document.documentElement.dataset.kyb = 'ready';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
