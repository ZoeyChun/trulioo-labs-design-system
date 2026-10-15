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

  var FILTERS = [
    { id: 'gb',     label: 'United Kingdom', test: function (c) { return c.cc === 'GB'; } },
    { id: 'us',     label: 'United States',  test: function (c) { return c.cc === 'US'; } },
    { id: 'active', label: 'Active only',    test: function (c) { return c.status === 'Active'; } }
  ];

  var dom = {};
  var state = { filters: [], focused: null };

  function visible() {
    return CANDIDATES.filter(function (c) {
      return state.filters.every(function (f) { return f.test(c); });
    });
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

  function drawPins(list) {
    dom.pins.innerHTML = '';
    spread(list).forEach(function (item, i) {
      var c = item.c;
      var p = { x: item.x, y: item.y };
      var pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'vb-pin';
      pin.dataset.id = c.id;
      pin.style.left = (p.x / MAP_W * 100) + '%';
      pin.style.top = (p.y / MAP_H * 100) + '%';
      pin.setAttribute('aria-label', c.name + ', ' + c.country);
      pin.style.setProperty('--vb-beat', (i % 5) * 0.4 + 's');
      pin.innerHTML = '<span class="vb-pin__halo"></span><span class="vb-pin__dot"></span>';
      pin.addEventListener('mouseenter', function () { focus(c.id); });
      pin.addEventListener('mouseleave', function () { focus(null); });
      pin.addEventListener('click', function () { scrollToCard(c.id); });
      dom.pins.appendChild(pin);
    });
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
       reading as blobs. Enough to say "we are down to one region"; not a
       street map. Swapping in a real tile layer past this point is the
       natural next step, which is what the Figma does for its London view. */
    var zoom = Math.min(3.2, Math.max(1, 160 / Math.max(spanLon, spanLat * 2, 26)));
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
      var n = CANDIDATES.filter(function (c) {
        return state.filters.concat(on ? [] : [f]).every(function (g) { return g.test(c); });
      }).length;
      return '<button type="button" class="ai-chip' + (on ? ' ai-chip--on' : '') +
             '" data-filter="' + f.id + '">' + esc(f.label) +
             '<span class="ai-chip__n">' + n + '</span></button>';
    }).join('');

    var lead = list.length === 1
      ? 'One match left.'
      : 'Which ' + '“Meridian”' + ' should I check?';

    var sub = list.length === 1
      ? 'Open it to run the KYB check.'
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
        '<div class="vb-map"><img src="assets/map.png" alt="">' +
          '<span class="vb-map__pin" aria-hidden="true"></span></div>' +
        '<section class="vb-overview">' +
          '<h3 class="vb-overview__title">Company Overview:</h3>' +
          '<dl class="vb-fields">' + grid + '</dl>' +
        '</section>' +
        below +
      '</div>';
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

  function panelReport(c) {
    return '' +
      '<p class="ai-said">Meridian</p>' +
      '<p class="ai-said">' + esc(c.name) + '</p>' +
      '<div class="ai-report">' +
        '<h3 class="ai-report__name">' + esc(c.name) + '</h3>' +
        '<span class="tds-tag tds-tag--positive tds-tag--sm">Verified</span>' +
        '<h4 class="ai-report__h">Summary</h4>' +
        '<p class="ai-report__body">' + esc(c.report.summary) + '</p>' +
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
    focus(c.id);
    scrollToCard(c.id);
    var said = '<p class="ai-said">' + esc(c.name) + '</p>';

    if (window.TruAIFlows) {
      window.TruAIFlows.pushHistory(function () {
        focus(null);
        render();
      });
      window.TruAIFlows.respondAfterThinking(dom.thread, said,
        'Looking up ' + c.name + '…', function () { showConfirmStep(c, said); });
    } else {
      showConfirmStep(c, said);
    }
  }

  function showConfirmStep(c, said) {
    dom.thread.innerHTML =
      said +
      '<div class="ai-reply">' +
        '<p class="ai-reply__lead">Run a KYB check on ' + esc(c.name) + '?</p>' +
        '<p class="ai-reply__sub">' + esc(c.country) + ' · ' + esc(c.reg) + '</p>' +
      '</div>' +
      '<div class="ai-chips">' +
        '<button type="button" class="ai-chip" data-confirm="yes">Confirm</button>' +
        '<button type="button" class="ai-chip" data-confirm="no">Cancel</button>' +
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
      else { focus(null); render(); }
    });
  }

  function investigate(c) {
    if (window.TruAIFlows) {
      window.TruAIFlows.pushHistory(function () {
        if (runTimer) { window.clearTimeout(runTimer); runTimer = null; }
        document.body.classList.remove('vb-loading', 'vb-report-ready');
        dom.report.hidden = true;
        dom.report.innerHTML = '';
        confirmInvestigate(c);
      });
    }

    document.body.classList.add('vb-loading');
    document.body.classList.remove('vb-report-ready');
    dom.report.hidden = false;
    dom.report.innerHTML = reportShell(c, true);
    dom.crumbCurrent.textContent = c.name;

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
    document.body.classList.remove('vb-loading');
    document.body.classList.add('vb-report-ready');
    dom.report.innerHTML = reportShell(c, false);
    dom.thread.innerHTML = panelReport(c);
    /* No new history push here — investigate() already pushed one "back to
       confirm" entry for the whole run, and it's still correct once the
       report is showing: the user picked this entity, confirmed, and now
       back should undo the confirm, not the cancelled run. */
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
      '<div class="ai-reply"><p class="ai-reply__lead">What’s the business name?</p></div>';
  }

  /* Arriving here from the home page's "Start a new verification" →
     Business choice: the panel already asked the question and got an
     answer, so it shouldn't reset back to the generic suggestions — it
     should pick up with the next question. */
  function consumeIncomingFlow() {
    if (!window.TruAIFlows) return;
    var state = window.TruAIFlows.getFlow();
    if (!state || state.flow !== 'new-verification' || state.step !== 'ask-name') return;
    window.TruAIFlows.clearFlow();

    arrivedViaPrompt = true;
    renderPromptState();
    window.TruAIFlows.pushHistory(function () { reset(); });

    var panelField = document.getElementById('v2-ask');
    if (panelField) panelField.focus();
  }

  function start() {
    var panelField = document.getElementById('v2-ask');
    var pageField = document.getElementById('vb-q');
    var query = ((panelField && panelField.value) || (pageField && pageField.value) || '').trim();

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
      /* Open on the whole world, then settle onto the matches a beat later —
         the zoom is the point, so it needs somewhere to zoom from. */
      dom.frame.style.setProperty('--vb-zoom', '1');
      dom.frame.style.setProperty('--vb-ox', '0%');
      dom.frame.style.setProperty('--vb-oy', '0%');
      updateCaption();
      window.setTimeout(function () { frameMap(CANDIDATES); }, 520);
    }

    /* The left workspace (search form, no map yet) stays put until a
       result exists to show — the map appearing is the answer arriving,
       not a loading indicator for it. */
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
    dom.globe.setAttribute('aria-hidden', 'true');
    dom.thread.hidden = true;
    dom.thread.innerHTML = '';
    if (dom.suggestions) dom.suggestions.hidden = false;
    document.body.classList.remove('vb-loading', 'vb-report-ready');
    if (runTimer) { window.clearTimeout(runTimer); runTimer = null; }
    if (dom.report) { dom.report.hidden = true; dom.report.innerHTML = ''; }
    if (dom.crumbCurrent) dom.crumbCurrent.textContent = 'Verify a business';
    state.filters = [];
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
    dom.crumbCurrent = document.querySelector('.tds-breadcrumbs [aria-current]');
    if (!dom.globe || !dom.thread) return;

    /* Either field can start a lookup — the page's search box or the
       panel's composer. Both land in the same flow. */
    var pageField = document.getElementById('vb-q');
    var panelField = document.getElementById('v2-ask');

    [pageField, panelField].forEach(function (field) {
      if (!field) return;
      field.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (field.value.trim()) start(); else reset();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('vb-searching')) reset();
    });

    if (window.TruAIFlows) window.TruAIFlows.initBackButton();
    consumeIncomingFlow();

    /* Exposed so a demo script — or a test — can drive the flow without
       synthesising keystrokes. */
    window.kybSearch = { start: start, reset: reset, candidates: CANDIDATES };
    document.documentElement.dataset.kyb = 'ready';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
