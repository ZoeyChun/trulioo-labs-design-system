/* Demo 3 — AI-powered Meridian search + interactive map (Leaflet).
   Typing "Meridian" plots same-name legal entities across jurisdictions
   (demo-2 world disambiguation) on a Leaflet world map. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var workspace = document.querySelector("[data-d3-workspace]");
  var mapEl = document.querySelector("[data-d3-kyb-map]");
  var mapHost = document.querySelector("[data-d3-kyb-leaflet]");
  var caption = document.querySelector("[data-d3-kyb-map-caption]");
  var mapNudge = document.querySelector("[data-d3-kyb-map-nudge]");
  if (!shell || !workspace || !mapHost || typeof L === "undefined") return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function countryCount(list) {
    var map = {};
    (list || []).forEach(function (c) {
      map[c.country || "United States"] = 1;
    });
    return Object.keys(map).length;
  }

  function matchCaption(list) {
    if (!list || !list.length) return "No matches";
    var nCountries = countryCount(list);
    if (nCountries === 1) {
      return (list[0].country || "United States") + " · " + list.length + " Meridian matches";
    }
    return list.length + " Meridian matches · " + nCountries + " countries";
  }

  /* Demo KYB dataset — US entities keep full ownership/report; other
     jurisdictions mirror demo-2 so country chips match the world map. */
  var MERIDIANS = [
    {
      id: "us-cap",
      name: "Meridian Capital LLC",
      country: "United States",
      cc: "US",
      city: "New York, NY",
      addr: "200 Vesey Street, New York, NY 10281",
      reg: "NY DOS 4417762",
      status: "Active",
      brief: "Investment firm · Incorporated 2013 · New York DOS filing.",
      verified: "Verified last 2 weeks ago",
      lat: 40.7128,
      lon: -74.0159,
      riskLevel: "low",
      ownership: [
        { name: "Helen Cho", type: "person", role: "Managing Member", pct: "55%", flagged: false, note: "Natural person UBO on NY DOS filing." },
        { name: "Meridian Capital GP LLC", type: "corp", role: "Member", pct: "45%", flagged: false, note: "Domestic LLC member; no further layer in filing." }
      ],
      risks: [],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Securities and investment activities (NAICS 523930)",
        industryNote: "Registered investment firm with an active New York DOS filing.",
        regDate: "Incorporated 2013 (New York)",
        legalForm: "Limited liability company",
        address: "200 Vesey Street, New York, NY 10281",
        sizing: "42 employees; authorized capital filed.",
        regNumber: "NY DOS 4417762",
        taxId: "EIN 13-4417762",
        phone: "+1 (212) 946-2100",
        email: "compliance@meridiancapital.example",
        sumA: "Meridian Capital LLC matched an active New York DOS filing with clear sanctions and adverse-media screens."
      }
    },
    {
      id: "us-global",
      name: "Meridian Global Partners Inc.",
      country: "United States",
      cc: "US",
      city: "Wilmington, DE",
      addr: "1209 Orange Street, Wilmington, DE 19801",
      reg: "DE File 5582014",
      status: "Active",
      brief: "Holding company · Delaware corporation · Registered agent address.",
      lat: 39.748,
      lon: -75.5466,
      riskLevel: "high",
      ownership: [
        { name: "Atlantic Nominee Services Ltd.", type: "corp", role: "Sole shareholder", pct: "100%", flagged: true, note: "BVI corporate shareholder — no natural person disclosed on the Delaware filing." },
        { name: "Registered Agent only", type: "corp", role: "Registered agent", pct: "—", flagged: true, note: "1209 Orange Street is a registered-agent address, not operating premises." }
      ],
      risks: [
        { id: "shell", label: "Shell / holding profile", severity: "high", evidence: "0 employees declared; holding-company NAICS; no trading presence on filing." },
        { id: "agent-addr", label: "Registered-agent address", severity: "medium", evidence: "Address matches a widely used Delaware registered-agent street." },
        { id: "opaque-ubo", label: "Opaque ownership", severity: "high", evidence: "Ownership stops at a BVI corporate shareholder with no natural person named." }
      ],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Holding company (NAICS 551112)",
        industryNote: "Delaware corporation using a registered-agent address.",
        regDate: "Incorporated Jun 14, 2017 (Delaware)",
        legalForm: "Corporation",
        address: "1209 Orange Street, Wilmington, DE 19801",
        sizing: "0 employees; shell holding structure.",
        regNumber: "DE File 5582014",
        taxId: "EIN 51-5582014",
        phone: "+1 (302) 555-0190",
        email: "filings@meridianglobal.example",
        sumA: "Meridian Global Partners Inc. is active in Delaware, but the filing shows a shell profile and ownership that stops at a BVI corporate shareholder."
      }
    },
    {
      id: "us-sf",
      name: "Meridian Analytics Inc.",
      country: "United States",
      cc: "US",
      city: "San Francisco, CA",
      addr: "525 Market Street, San Francisco, CA 94105",
      reg: "CA SOS C4129087",
      status: "Active",
      brief: "Data analytics · California SOS · Market Street office.",
      lat: 37.7897,
      lon: -122.3972,
      riskLevel: "low",
      ownership: [
        { name: "Priya Natarajan", type: "person", role: "CEO / Director", pct: "32%", flagged: false, note: "Listed director on California SOS statement." },
        { name: "North Bay Ventures Fund III", type: "corp", role: "Institutional shareholder", pct: "41%", flagged: false, note: "Venture fund; beneficial owners disclosed in fund filings." },
        { name: "Employee option pool", type: "corp", role: "Reserved", pct: "27%", flagged: false, note: "Unissued option pool — not a UBO." }
      ],
      risks: [],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "Local Series B coverage" },
      report: {
        industry: "Data processing and analytics (NAICS 518210)",
        industryNote: "California SOS entity with a Market Street office presence.",
        regDate: "Incorporated Mar 22, 2018 (California)",
        legalForm: "Corporation",
        address: "525 Market Street, San Francisco, CA 94105",
        sizing: "28 employees; Series B operating company.",
        regNumber: "CA SOS C4129087",
        taxId: "EIN 94-4129087",
        phone: "+1 (415) 555-0172",
        email: "hello@meridiananalytics.example",
        sumA: "Meridian Analytics Inc. is an active California operating company with identifiable directors and no sanctions hits."
      }
    },
    {
      id: "us-chi",
      name: "Meridian Industrial Holdings LLC",
      country: "United States",
      cc: "US",
      city: "Chicago, IL",
      addr: "233 S Wacker Drive, Chicago, IL 60606",
      reg: "IL SOS 04581276",
      status: "Active",
      brief: "Industrial holdings · Illinois LLC · Willis Tower address.",
      lat: 41.8789,
      lon: -87.6359,
      riskLevel: "medium",
      ownership: [
        { name: "Marcus Webb", type: "person", role: "Manager", pct: "60%", flagged: false, note: "Natural person manager on Illinois LLC filing." },
        { name: "Lakeshore Industrial Trust", type: "corp", role: "Member", pct: "40%", flagged: true, note: "Trust member — natural beneficiaries not listed on the SOS extract." }
      ],
      risks: [
        { id: "trust-layer", label: "Trust ownership layer", severity: "medium", evidence: "40% member is a trust without named beneficiaries on the Illinois extract." }
      ],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "1 civil contract dispute (closed)", positivePress: "None found" },
      report: {
        industry: "Industrial holding company (NAICS 551112)",
        industryNote: "Illinois LLC filing at Willis Tower.",
        regDate: "Formed Sep 9, 2015 (Illinois)",
        legalForm: "Limited liability company",
        address: "233 S Wacker Drive, Chicago, IL 60606",
        sizing: "12 employees; multi-subsidiary holding group.",
        regNumber: "IL SOS 04581276",
        taxId: "EIN 36-0458127",
        phone: "+1 (312) 555-0144",
        email: "ops@meridianindustrial.example",
        sumA: "Meridian Industrial Holdings LLC is active in Illinois. One trust membership layer needs follow-up for full UBO clarity."
      }
    },
    {
      id: "us-dal",
      name: "Meridian Energy Partners LP",
      country: "United States",
      cc: "US",
      city: "Dallas, TX",
      addr: "2200 Ross Avenue, Dallas, TX 75201",
      reg: "TX SOS 0804123456",
      status: "Active",
      brief: "Energy partnership · Texas SOS · Downtown Dallas.",
      lat: 32.7872,
      lon: -96.7985,
      riskLevel: "medium",
      ownership: [
        { name: "Meridian Energy GP LLC", type: "corp", role: "General partner", pct: "2%", flagged: false, note: "GP entity controlled by two Texas residents on SOS records." },
        { name: "Jordan Hale", type: "person", role: "Limited partner", pct: "49%", flagged: false, note: "Natural person LP." },
        { name: "Hale Family Holdings LP", type: "corp", role: "Limited partner", pct: "49%", flagged: true, note: "Related-party LP — review for circular ownership." }
      ],
      risks: [
        { id: "related-lp", label: "Related-party limited partner", severity: "medium", evidence: "Hale Family Holdings LP shares a controlling individual with an LP seat." }
      ],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Oil and gas partnership (NAICS 211120)",
        industryNote: "Texas limited partnership with downtown Dallas filing address.",
        regDate: "Formed Jan 18, 2016 (Texas)",
        legalForm: "Limited partnership",
        address: "2200 Ross Avenue, Dallas, TX 75201",
        sizing: "65 employees; upstream energy partnership.",
        regNumber: "TX SOS 0804123456",
        taxId: "EIN 75-0804123",
        phone: "+1 (214) 555-0188",
        email: "partners@meridianenergy.example",
        sumA: "Meridian Energy Partners LP matched an active Texas SOS filing. Related-party LP structure is the main follow-up item."
      }
    },
    /* --- International same-name entities (demo-2 world set) --- */
    {
      id: "uk-apex",
      name: "Meridian Apex Consulting Ltd.",
      country: "United Kingdom",
      cc: "GB",
      city: "London, UK",
      addr: "Suite 400, 1 King Street, London EC2V 8AU",
      reg: "Companies House 08842190",
      status: "Active",
      brief: "Management consultancy · England & Wales · Virtual office.",
      lat: 51.513,
      lon: -0.093,
      riskLevel: "high",
      ownership: [
        {
          name: "James Morton",
          type: "person",
          role: "Shareholder",
          pct: "65%",
          address: "71 Stevenson St, San Francisco",
          flagged: false,
          screeningLabel: "Clear"
        },
        {
          name: "Walter Decosta",
          type: "person",
          role: "Shareholder",
          pct: "35%",
          address: "71 Stevenson St, San Francisco",
          flagged: true,
          screeningLabel: "2 more entities connected"
        }
      ],
      officer: {
        givenName: "MARK",
        surname: "WILLIAMSON",
        fullName: "MARK WILLIAMSON",
        nationalId: "123415",
        dob: "1976-02-12",
        position: "CHIEF OPERATING OFFICER",
        designation: "Not provided",
        type: "Individual",
        status: "Active",
        beginDate: "2017-07-18",
        endDate: "2020-01-12",
        address1: "1 SW Bow Street, Portland, OR 97005-6453",
        address1Note: "Primary registered address",
        address2: "22 CALGARY AVENUE, Suite 400, Calgary, AB",
        address2Note: "Second address — partially visible, remainder not available"
      },
      risks: [
        { id: "shell", label: "Shell / no trading evidence", severity: "high", evidence: "0 employees; £1 capital; catch-all SIC; virtual office." }
      ],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Registered under SIC 70229",
        industryNote:
          "(management consultancy activities), a catch-all code.\nNo evidence of active trading, clients, or revenue.",
        regDate: "Incorporated 1 Feb 2019 (England & Wales)",
        legalForm: "Private company limited by shares",
        address:
          "Suite 400, 1 King Street, London EC2V 8AU - virtual office at a formations-agent suite; no operational premises.",
        sizing: "0 employees; $1 authorised / $1 paid-up capital.",
        regNumber: "BRN 11876542",
        taxId: "GB341209876",
        phone: "+1 280 794 0000",
        email: "info@meridianapexconsulting.co.uk",
        country: "United Kingdom",
        sumA: "Meridian Apex Consulting Ltd. is active at Companies House, but filings describe a shell profile with a virtual office and £1 of capital."
      }
    },
    {
      id: "uk-trade",
      name: "Meridian Trade Holdings Ltd.",
      country: "United Kingdom",
      cc: "GB",
      city: "London, UK",
      addr: "25 Bank Street, Canary Wharf, London E14 5JP",
      reg: "Companies House 11204887",
      status: "Active",
      brief: "Trade holding company · Incorporated 2018 · Canary Wharf.",
      lat: 51.505,
      lon: -0.019,
      riskLevel: "medium",
      ownership: [
        { name: "Claire Houghton", type: "person", role: "Director", pct: "60%", flagged: false, note: "Natural person director on Companies House." },
        { name: "Tradeco Nominees Ltd.", type: "corp", role: "Shareholder", pct: "40%", flagged: true, note: "Corporate shareholder layer." }
      ],
      risks: [
        { id: "nominee", label: "Nominee shareholder layer", severity: "medium", evidence: "40% held via a nominee company." }
      ],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Activities of holding companies (SIC 64209)",
        industryNote: "UK holding company with a Canary Wharf registered office.",
        regDate: "Incorporated 2018 (England & Wales)",
        legalForm: "Private company limited by shares",
        address: "25 Bank Street, Canary Wharf, London E14 5JP",
        sizing: "8 employees; authorised capital filed.",
        regNumber: "Companies House 11204887",
        taxId: "GB112048875",
        phone: "+44 20 7946 1120",
        email: "filings@meridiantrade.example",
        country: "United Kingdom",
        sumA: "Meridian Trade Holdings Ltd. is an active UK company; one nominee shareholder layer needs follow-up."
      }
    },
    {
      id: "uk-log",
      name: "Meridian Logistics (UK) Ltd.",
      country: "United Kingdom",
      cc: "GB",
      city: "Manchester, UK",
      addr: "14 Deansgate, Manchester M3 2BW",
      reg: "Companies House 06655321",
      status: "Dissolved",
      brief: "Former logistics company · Dissolved Mar 2023 · Manchester.",
      lat: 53.48,
      lon: -2.244,
      riskLevel: "medium",
      ownership: [
        { name: "Former directors struck off", type: "corp", role: "—", pct: "—", flagged: true, note: "Entity dissolved; prior officers no longer active on the register." }
      ],
      risks: [
        { id: "dissolved", label: "Dissolved entity", severity: "medium", evidence: "Companies House status Dissolved Mar 2023." }
      ],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Freight transport by road (SIC 49410)",
        industryNote: "Dissolved UK logistics company; not available for new verification.",
        regDate: "Dissolved Mar 2023 (England & Wales)",
        legalForm: "Private company limited by shares",
        address: "14 Deansgate, Manchester M3 2BW",
        sizing: "Dissolved — no active employees.",
        regNumber: "Companies House 06655321",
        taxId: "—",
        phone: "—",
        email: "—",
        country: "United Kingdom",
        sumA: "Meridian Logistics (UK) Ltd. was dissolved in March 2023 and should not be used for a live KYB check."
      }
    },
    {
      id: "sg-pac",
      name: "Meridian Pacific Pte. Ltd.",
      country: "Singapore",
      cc: "SG",
      city: "Singapore",
      addr: "10 Marina Boulevard, Singapore 018983",
      reg: "ACRA 201633214K",
      status: "Active",
      brief: "Pacific trading company · ACRA · Marina Bay.",
      lat: 1.29,
      lon: 103.851,
      riskLevel: "low",
      ownership: [
        { name: "Wei Lin Tan", type: "person", role: "Director", pct: "70%", flagged: false, note: "Local resident director on ACRA extract." },
        { name: "Pacific Gate Holdings", type: "corp", role: "Shareholder", pct: "30%", flagged: false, note: "Regional holding company." }
      ],
      risks: [],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Wholesale trade (SSIC 46900)",
        industryNote: "Singapore private limited company at Marina Boulevard.",
        regDate: "Incorporated 2016 (Singapore)",
        legalForm: "Private company limited by shares",
        address: "10 Marina Boulevard, Singapore 018983",
        sizing: "22 employees; paid-up capital filed.",
        regNumber: "ACRA 201633214K",
        taxId: "201633214K",
        phone: "+65 6123 4500",
        email: "ops@meridianpacific.example",
        country: "Singapore",
        sumA: "Meridian Pacific Pte. Ltd. matched an active ACRA filing with identifiable local directors."
      }
    },
    {
      id: "se-nordic",
      name: "Meridian Nordic AB",
      country: "Sweden",
      cc: "SE",
      city: "Stockholm, SE",
      addr: "Birger Jarlsgatan 57, 113 56 Stockholm",
      reg: "Bolagsverket 556912-4471",
      status: "Active",
      brief: "Nordic AB · Bolagsverket · Stockholm.",
      lat: 59.329,
      lon: 18.068,
      riskLevel: "low",
      ownership: [
        { name: "Erik Lindström", type: "person", role: "Board member", pct: "55%", flagged: false, note: "Natural person on Bolagsverket extract." },
        { name: "Nordic Growth Invest AB", type: "corp", role: "Shareholder", pct: "45%", flagged: false, note: "Swedish institutional shareholder." }
      ],
      risks: [],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Business consulting (SNI 70.220)",
        industryNote: "Swedish aktiebolag with Stockholm registered office.",
        regDate: "Incorporated 2011 (Sweden)",
        legalForm: "Aktiebolag (AB)",
        address: "Birger Jarlsgatan 57, 113 56 Stockholm",
        sizing: "15 employees; share capital filed.",
        regNumber: "Bolagsverket 556912-4471",
        taxId: "556912-4471",
        phone: "+46 8 555 010 20",
        email: "hello@meridiannordic.example",
        country: "Sweden",
        sumA: "Meridian Nordic AB is an active Swedish company with clear registry coverage."
      }
    },
    {
      id: "de-handel",
      name: "Meridian Handels GmbH",
      country: "Germany",
      cc: "DE",
      city: "Frankfurt, DE",
      addr: "Taunusanlage 12, 60325 Frankfurt am Main",
      reg: "HRB 102447 Frankfurt",
      status: "Active",
      brief: "Handels GmbH · Frankfurt commercial register.",
      lat: 50.11,
      lon: 8.682,
      riskLevel: "low",
      ownership: [
        { name: "Anna Keller", type: "person", role: "Geschäftsführerin", pct: "50%", flagged: false, note: "Managing director on Handelsregister." },
        { name: "Rhein Main Beteiligungs GmbH", type: "corp", role: "Gesellschafter", pct: "50%", flagged: false, note: "German corporate shareholder." }
      ],
      risks: [],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Wholesale trade (WZ 46.90)",
        industryNote: "German GmbH registered in Frankfurt am Main.",
        regDate: "Incorporated 2009 (Germany)",
        legalForm: "Gesellschaft mit beschränkter Haftung (GmbH)",
        address: "Taunusanlage 12, 60325 Frankfurt am Main",
        sizing: "31 employees; Stammkapital filed.",
        regNumber: "HRB 102447 Frankfurt",
        taxId: "DE812345678",
        phone: "+49 69 1234 5600",
        email: "kontakt@meridianhandel.example",
        country: "Germany",
        sumA: "Meridian Handels GmbH matched an active Frankfurt commercial-register filing."
      }
    },
    {
      id: "au-res",
      name: "Meridian Resources Pty Ltd",
      country: "Australia",
      cc: "AU",
      city: "Sydney, AU",
      addr: "1 Macquarie Place, Sydney NSW 2000",
      reg: "ACN 128 441 902",
      status: "Active",
      brief: "Resources Pty Ltd · ASIC · Sydney CBD.",
      lat: -33.868,
      lon: 151.209,
      riskLevel: "medium",
      ownership: [
        { name: "James O’Rourke", type: "person", role: "Director", pct: "40%", flagged: false, note: "Australian resident director." },
        { name: "Outback Resource Trust", type: "corp", role: "Shareholder", pct: "60%", flagged: true, note: "Trust shareholder — beneficiaries not listed on ASIC extract." }
      ],
      risks: [
        { id: "trust", label: "Trust ownership layer", severity: "medium", evidence: "60% held via a trust without named beneficiaries on the extract." }
      ],
      alerts: { adverseMedia: "None found", sanctions: "None found", litigation: "None found", positivePress: "None found" },
      report: {
        industry: "Mining support services (ANZSIC 1090)",
        industryNote: "Australian proprietary limited company in Sydney.",
        regDate: "Incorporated 2007 (Australia)",
        legalForm: "Proprietary limited company (Pty Ltd)",
        address: "1 Macquarie Place, Sydney NSW 2000",
        sizing: "48 employees; issued capital filed.",
        regNumber: "ACN 128 441 902",
        taxId: "ABN 12 128 441 902",
        phone: "+61 2 9250 1000",
        email: "contact@meridianresources.example",
        country: "Australia",
        sumA: "Meridian Resources Pty Ltd is active on ASIC. A trust ownership layer needs follow-up for full UBO clarity."
      }
    }
  ];

  /* Back-compat alias used by older call sites / mental model. */
  var MERIDIAN_US = MERIDIANS;

  var selectedBiz = null;
  var lastResults = [];

  var SF = { lat: 37.7749, lon: -122.4194, zoom: 13 };
  var map = null;
  var markersLayer = null;
  var locMarker = null;
  var activeId = null;
  var searchBusy = false;
  var awaitingCountry = false;

  function ensureMap() {
    if (map) {
      try {
        map.invalidateSize({ animate: false });
      } catch (e) {}
      return map;
    }
    if (!mapHost.offsetWidth || !mapHost.offsetHeight) {
      /* Defer until the map surface has real dimensions. */
      window.setTimeout(ensureMap, 80);
      return null;
    }
    map = L.map(mapHost, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true
    }).setView([SF.lat, SF.lon], SF.zoom);

    /* Esri Light Gray — free, no API key (Carto now requires one). */
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
      }
    ).addTo(map);

    markersLayer = L.layerGroup().addTo(map);

    var locIcon = L.divIcon({
      className: "d3-kyb-loc-icon",
      html:
        '<div class="d3-kyb-loc-marker" aria-hidden="true">' +
        '<span class="d3-kyb-loc-marker__pulse"></span>' +
        '<span class="d3-kyb-loc-marker__dot"></span>' +
        "</div>",
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    locMarker = L.marker([SF.lat, SF.lon], {
      icon: locIcon,
      interactive: false,
      keyboard: false
    }).addTo(map);

    window.setTimeout(function () {
      if (map) map.invalidateSize({ animate: false });
    }, 80);

    return map;
  }

  function setCaption(text) {
    if (caption) caption.textContent = text;
  }

  function clearBizMarkers() {
    if (markersLayer) markersLayer.clearLayers();
    activeId = null;
  }

  /* Replace the map with a search-setup empty state until jurisdiction is known.
     showHomeLocation must not run over this — it was restoring the SF pin. */
  function setAwaitingCountry(on, queryLabel) {
    awaitingCountry = !!on;
    var awaitEl = document.querySelector("[data-d3-kyb-map-await]");
    if (mapEl) mapEl.classList.toggle("is-awaiting-country", awaitingCountry);
    if (awaitEl) {
      /* "name": the user hasn't said which business yet; "country": we have a
         name and need the jurisdiction. The right panel reads this attribute. */
      awaitEl.setAttribute("data-d3-await-stage", queryLabel ? "country" : "name");
      awaitEl.setAttribute("data-d3-await-query", queryLabel || "");
      awaitEl.hidden = !awaitingCountry;
      var qEl = awaitEl.querySelector("[data-d3-kyb-map-await-query]");
      if (qEl) qEl.textContent = queryLabel || "this business";
    }
    if (awaitingCountry) {
      clearBizMarkers();
      if (map && locMarker && map.hasLayer(locMarker)) {
        try {
          map.removeLayer(locMarker);
        } catch (e) {}
      }
      setCaption("");
    }
  }

  function showHomeLocation(opts) {
    opts = opts || {};
    /* Don't bring SF back while chat is still collecting country. */
    if (awaitingCountry && !opts.force) return;
    var m = ensureMap();
    if (!m) {
      window.setTimeout(function () {
        showHomeLocation(opts);
      }, 100);
      return;
    }
    clearBizMarkers();
    if (locMarker && !m.hasLayer(locMarker)) locMarker.addTo(m);
    try {
      m.invalidateSize({ animate: false });
    } catch (e) {}
    /* Instant settle when a zoom-out will follow — avoids interrupting a fly. */
    if (opts.instant || reducedMotion) {
      m.setView([SF.lat, SF.lon], SF.zoom, { animate: false });
    } else {
      m.flyTo([SF.lat, SF.lon], SF.zoom, {
        duration: opts.duration != null ? opts.duration : 1.25,
        easeLinearity: 0.2
      });
    }
    if (!opts.keepAwaiting) setAwaitingCountry(false);
    setCaption("Ask TruAI to find a business");
  }

  /* Crossfade resume/report → map, then continue. */
  function transitionToMap(done) {
    var surface = workspace.getAttribute("data-d3-kyb-surface");
    if (surface === "map" || reducedMotion) {
      ensureMapSurface();
      if (typeof done === "function") done();
      return;
    }
    var detailEl = workspace.querySelector("[data-d3-kyb-detail]");
    if (mapEl) {
      mapEl.classList.add("is-entering");
      mapEl.setAttribute("aria-hidden", "false");
    }
    if (detailEl) detailEl.classList.add("is-leaving");
    ensureMap();
    window.setTimeout(function () {
      ensureMapSurface();
      if (mapEl) mapEl.classList.remove("is-entering");
      if (detailEl) detailEl.classList.remove("is-leaving");
      try {
        if (map) map.invalidateSize({ animate: false });
      } catch (e) {}
      if (typeof done === "function") done();
    }, 480);
  }

  function popupHtml(biz) {
    return (
      '<div class="d3-kyb-biz-popup">' +
      '<p class="d3-kyb-biz-popup__name"></p>' +
      '<p class="d3-kyb-biz-popup__meta"></p>' +
      '<p class="d3-kyb-biz-popup__brief"></p>' +
      '<button type="button" class="d3-kyb-biz-popup__btn" data-d3-kyb-select-biz="">Select business</button>' +
      "</div>"
    );
  }

  function fillPopup(el, biz) {
    el.querySelector(".d3-kyb-biz-popup__name").textContent = biz.name;
    el.querySelector(".d3-kyb-biz-popup__meta").textContent =
      biz.city + " · " + biz.status + " · " + biz.reg;
    el.querySelector(".d3-kyb-biz-popup__brief").textContent =
      biz.brief + " " + biz.addr;
    el.querySelector("[data-d3-kyb-select-biz]").setAttribute(
      "data-d3-kyb-select-biz",
      biz.id
    );
  }

  /* The map stays out of sight (right panel shows a skeleton / the waiting card)
     until there are matches to show on it. js/d3-kyb-canvas.js reads this. */
  function markMapReady() {
    if (workspace) workspace.setAttribute("data-d3-map-ready", "1");
  }

  function plotResults(items, captionText, opts) {
    opts = opts || {};
    markMapReady();
    /* null/undefined → full demo set; explicit [] keeps the map empty (filter wipe). */
    var list = items == null ? MERIDIAN_US.slice() : items.slice();
    lastResults = list.slice();
    var m = ensureMap();
    if (!m) {
      window.setTimeout(function () {
        plotResults(list, captionText, opts);
      }, 100);
      return;
    }
    if (mapNudge) mapNudge.hidden = true;
    clearBizMarkers();
    setCaption(captionText || (list.length ? "Matches · " + list.length : "No matches"));

    var bounds = [];
    list.forEach(function (biz) {
      bounds.push([biz.lat, biz.lon]);
      var icon = L.divIcon({
        className: "d3-kyb-biz-icon",
        html: '<button type="button" class="d3-kyb-biz-marker is-appearing" data-biz-id="' +
          biz.id +
          '" aria-label="' +
          biz.name.replace(/"/g, "") +
          '"></button>',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      var marker = L.marker([biz.lat, biz.lon], { icon: icon, opacity: reducedMotion ? 1 : 0 });
      var popup = L.popup({ maxWidth: 280, className: "d3-kyb-biz-leaflet-popup" });
      var wrap = document.createElement("div");
      wrap.innerHTML = popupHtml(biz);
      fillPopup(wrap, biz);
      popup.setContent(wrap);
      marker.bindPopup(popup);
      marker.on("click", function () {
        activeId = biz.id;
        markersLayer.eachLayer(function (layer) {
          var btn = layer.getElement() && layer.getElement().querySelector(".d3-kyb-biz-marker");
          if (btn) btn.classList.toggle("is-active", btn.getAttribute("data-biz-id") === biz.id);
        });
      });
      marker.on("popupopen", function () {
        var btn = wrap.querySelector("[data-d3-kyb-select-biz]");
        if (!btn || btn._d3Bound) return;
        btn._d3Bound = true;
        btn.addEventListener("click", function () {
          selectBusiness(biz);
        });
      });
      markersLayer.addLayer(marker);
      if (!reducedMotion) {
        window.setTimeout(function () {
          try {
            marker.setOpacity(1);
          } catch (e) {}
        }, 40);
      }
    });

    /* Hide current-location pin while match pins are shown. */
    if (locMarker && m.hasLayer(locMarker) && !opts.keepLoc) {
      m.removeLayer(locMarker);
      if (mapEl) mapEl.classList.remove("is-loc-fading");
    }

    m.invalidateSize({ animate: false });
    var flyDur = opts.flyDuration != null ? opts.flyDuration : 1.85;
    var ease = opts.easeLinearity != null ? opts.easeLinearity : 0.18;
    /* Single-country result sets frame tighter so the map reads as that market. */
    var maxZoom =
      opts.maxZoom != null
        ? opts.maxZoom
        : countryCount(list) === 1
          ? 7
          : 5;
    if (!opts.skipFit) {
      if (bounds.length === 1) {
        if (reducedMotion) m.setView(bounds[0], 12);
        else m.flyTo(bounds[0], 12, { duration: flyDur * 0.7, easeLinearity: ease });
      } else if (bounds.length) {
        if (reducedMotion) {
          m.fitBounds(bounds, { padding: [64, 64], maxZoom: maxZoom });
        } else {
          m.flyToBounds(bounds, {
            padding: [64, 64],
            maxZoom: maxZoom,
            duration: flyDur,
            easeLinearity: ease
          });
        }
      }
    }
    setCaption(captionText || matchCaption(list));
  }

  function plotMeridianResults() {
    revealMatches(MERIDIANS, matchCaption(MERIDIANS));
  }

  /* Crossfade to map → zoom out to matches (skip current-location pin). */
  function revealMatches(items, captionText, opts) {
    opts = opts || {};
    markMapReady();
    var list = items && items.length ? items.slice() : MERIDIANS.slice();
    lastResults = list.slice();
    var label = captionText || matchCaption(list);
    setAwaitingCountry(false);
    setCaption(label);
    transitionToMap(function () {
      var m = ensureMap();
      if (m) {
        /* Drop location pin; start world/region so flyToBounds reads as framing matches. */
        if (locMarker && m.hasLayer(locMarker)) m.removeLayer(locMarker);
        if (!reducedMotion && list.length) {
          try {
            if (countryCount(list) > 1) {
              m.setView([22, 12], 2, { animate: false });
            } else {
              var lat = 0;
              var lon = 0;
              list.forEach(function (b) {
                lat += b.lat;
                lon += b.lon;
              });
              m.setView([lat / list.length, lon / list.length], 4, { animate: false });
            }
          } catch (e) {}
        }
      }
      var plotOpts = {};
      for (var k in opts) {
        if (Object.prototype.hasOwnProperty.call(opts, k)) plotOpts[k] = opts[k];
      }
      plotOpts.flyDuration = opts.flyDuration != null ? opts.flyDuration : 1.75;
      plotOpts.keepLoc = false;
      plotResults(list, label, plotOpts);
    });
    return list;
  }

  /* Pull a country out of free text so “Meridian, United States” scopes the map. */
  var COUNTRY_PATTERNS = [
    { re: /\b(united states of america|united states|u\.?\s*s\.?\s*a\.?|u\.?\s*s\.?|america)\b/i, country: "United States", cc: "US" },
    { re: /\b(united kingdom|great britain|u\.?\s*k\.?|britain|england)\b/i, country: "United Kingdom", cc: "GB" },
    { re: /\b(canada)\b/i, country: "Canada", cc: "CA" },
    { re: /\b(netherlands|holland)\b/i, country: "Netherlands", cc: "NL" },
    { re: /\b(singapore|s\.?\s*g\.?)\b/i, country: "Singapore", cc: "SG" },
    { re: /\b(sweden|sverige)\b/i, country: "Sweden", cc: "SE" },
    { re: /\b(germany|deutschland|deutchland)\b/i, country: "Germany", cc: "DE" },
    { re: /\b(australia|a\.?\s*u\.?)\b/i, country: "Australia", cc: "AU" }
  ];

  function parsePlaceQuery(text) {
    var raw = String(text || "").trim();
    var country = null;
    var cc = null;
    var nameQuery = raw;
    for (var i = 0; i < COUNTRY_PATTERNS.length; i += 1) {
      var p = COUNTRY_PATTERNS[i];
      if (!p.re.test(raw)) continue;
      country = p.country;
      cc = p.cc;
      nameQuery = raw
        .replace(p.re, " ")
        .replace(/[,\u2013\u2014|/]+/g, " ")
        .replace(/\bin\b/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
      break;
    }
    return { raw: raw, nameQuery: nameQuery, country: country, cc: cc };
  }

  function matchesCountry(biz, country, cc) {
    if (!country && !cc) return true;
    var bizCc = String(biz.cc || "").toUpperCase();
    var wantCc = String(cc || "").toUpperCase();
    if (wantCc && bizCc === wantCc) return true;
    if (country && (biz.country || "") === country) return true;
    return false;
  }

  function findBusinesses(query, opts) {
    opts = opts || {};
    var place =
      query && typeof query === "object"
        ? query
        : parsePlaceQuery(query);
    var country = opts.country || place.country || null;
    var cc = opts.cc || place.cc || null;
    var q = String(place.nameQuery != null ? place.nameQuery : place.raw || "")
      .trim()
      .toLowerCase();

    var pool = MERIDIANS.filter(function (biz) {
      return matchesCountry(biz, country, cc);
    });
    if (!q) return pool.slice();

    return pool.filter(function (biz) {
      var hay = [
        biz.name,
        biz.city,
        /* Keep country tokens out of the haystack when already scoped —
           otherwise “United States” would re-match every US row by itself. */
        country || cc ? "" : biz.country,
        country || cc ? "" : biz.cc,
        addrOf(biz),
        biz.reg,
        biz.brief,
        biz.status
      ]
        .join(" ")
        .toLowerCase();
      if (hay.indexOf(q) !== -1) return true;
      return q.split(/\s+/).every(function (tok) {
        return tok.length < 2 || hay.indexOf(tok) !== -1;
      });
    });
  }

  function addrOf(biz) {
    return biz.addr || (biz.report && biz.report.address) || "";
  }

  function findById(id) {
    for (var i = 0; i < MERIDIANS.length; i += 1) {
      if (MERIDIANS[i].id === id) return MERIDIANS[i];
    }
    return null;
  }

  function findByName(name) {
    var q = String(name || "").trim().toLowerCase();
    if (!q) return null;
    var exact = null;
    var partials = [];
    MERIDIANS.forEach(function (biz) {
      var n = biz.name.toLowerCase();
      if (n === q) {
        exact = biz;
        return;
      }
      if (n.indexOf(q) !== -1 || q.indexOf(n) !== -1) {
        partials.push(biz);
        return;
      }
      var tokens = q.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
      if (tokens.length && tokens.every(function (t) { return n.indexOf(t) !== -1; })) {
        partials.push(biz);
      }
    });
    if (exact) return exact;
    /* Ambiguous brand tokens (e.g. “Meridian”) must not pick the first US hit. */
    if (partials.length === 1) return partials[0];
    return null;
  }

  function appendTurn(role, text) {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var section = document.createElement("section");
    section.className = "d1-turn d1-enter";
    if (role === "user") {
      section.innerHTML = '<div class="d1-user"><p></p></div>';
    } else {
      section.innerHTML = '<div class="d1-ai d1-block"><p></p></div>';
    }
    section.querySelector("p").textContent = text;
    thread.appendChild(section);
    thread.scrollTop = thread.scrollHeight;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Prefer demo-2 candidate panel (chips + cards + confirm) when agent is loaded. */
  function appendSuggestions(items) {
    if (!items || !items.length) return;
    if (window.D3KybAgent && typeof window.D3KybAgent.showMatches === "function") {
      window.D3KybAgent.showMatches(items, "Meridian");
      return;
    }
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var wrap = document.createElement("div");
    wrap.className = "d3-kyb-similar";
    wrap.setAttribute("role", "list");
    wrap.setAttribute("aria-label", "Similar companies");

    items.forEach(function (biz) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "d3-kyb-similar__card";
      card.setAttribute("role", "listitem");
      card.setAttribute("data-biz-id", biz.id);

      var verified = biz.verified
        ? '<div class="d3-kyb-similar__verified">' +
          '<i class="d3-kyb-similar__clock fa-regular fa-clock" aria-hidden="true"></i>' +
          "<span>" +
          escapeHtml(biz.verified) +
          "</span></div>"
        : "";

      card.innerHTML =
        '<div class="d3-kyb-similar__head">' +
        '<span class="d3-kyb-similar__name"></span>' +
        '<svg class="d3-fa-line d3-kyb-similar__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"/></svg>' +
        "</div>" +
        '<div class="d3-kyb-similar__field">' +
        '<span class="d3-kyb-similar__label">Address</span>' +
        '<span class="d3-kyb-similar__addr"></span>' +
        "</div>" +
        verified;

      card.querySelector(".d3-kyb-similar__name").textContent = biz.name;
      card.querySelector(".d3-kyb-similar__addr").textContent = biz.addr;
      card.addEventListener("click", function () {
        selectBusiness(biz);
      });
      wrap.appendChild(card);
    });

    thread.appendChild(wrap);
    thread.scrollTop = thread.scrollHeight;
  }

  function parkChat() {
    document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
    if (window.D3Nav) window.D3Nav.markChatActive();
  }

  function ensureMapSurface() {
    if (window.D3KybResume && window.D3KybResume.setSurface) {
      window.D3KybResume.setSurface("map");
    } else {
      workspace.setAttribute("data-d3-kyb-surface", "map");
    }
    window.setTimeout(function () {
      /* ensureMap() returns null when the host has no dimensions yet and
         re-schedules itself — dereferencing `map` here threw in that
         case. It sizes itself on the retry, so there is nothing to do. */
      var m = ensureMap();
      if (m) m.invalidateSize();
    }, 40);
  }

  function runSearch(queryText, opts) {
    opts = opts || {};
    if (searchBusy && !opts.force) return [];
    searchBusy = true;
    if (window.D3Nav) window.D3Nav.openKybChat({ map: true });
    parkChat();
    var q = queryText || "Meridian";
    var place = parsePlaceQuery(q);
    var needle = place.nameQuery || q;
    var matches = findBusinesses(place, { country: place.country, cc: place.cc });
    /* Brand-only fallback stays country-scoped when a country was named. */
    if (!matches.length && /meridian/i.test(needle || q)) {
      matches = findBusinesses(
        { nameQuery: "meridian", country: place.country, cc: place.cc, raw: q },
        { country: place.country, cc: place.cc }
      );
      if (!matches.length && !place.country) matches = MERIDIAN_US.slice();
    }
    lastResults = matches.slice();

    if (!opts.silent) {
      appendTurn("user", q);
      var scopeLabel = place.country ? " in " + place.country : "";
      var reply =
        matches.length === 0
          ? "I didn’t find any businesses matching “" +
            (needle || q) +
            "”" +
            scopeLabel +
            " in this demo dataset. Try “Meridian”" +
            (place.country ? " in " + place.country : "") +
            " or pick a country from the search landing."
          : !needle && place.country
            ? "Showing " +
              matches.length +
              " business" +
              (matches.length === 1 ? "" : "es") +
              " in " +
              place.country +
              ". Select a pin or refine by company name."
            : "I found " +
              matches.length +
              " business" +
              (matches.length === 1 ? "" : "es") +
              " matching “" +
              q +
              "”. Select a location on the map or a company below to verify.";
      /* No jurisdiction yet → ask for country; don't imply cross-border hit counts. */
      var needsCountry = !place.country && !place.cc && !!(needle || q);
      if (needsCountry) {
        ensureMapSurface();
        setAwaitingCountry(true, needle || q);
        window.setTimeout(function () {
          if (window.D3KybAgent && typeof window.D3KybAgent.askCountry === "function") {
            window.D3KybAgent.askCountry(needle || q);
          } else {
            appendTurn(
              "assistant",
              "Which country is “" +
                (needle || q) +
                "” registered in? Reply with the country — KYB searches run one jurisdiction at a time."
            );
          }
          searchBusy = false;
        }, opts.delay != null ? opts.delay : 420);
      } else if (matches.length) {
        revealMatches(matches, matchCaption(matches));
        window.setTimeout(function () {
          appendTurn("assistant", reply);
          if (matches.length) appendSuggestions(matches);
          searchBusy = false;
        }, opts.delay != null ? opts.delay : 420);
      } else {
        ensureMapSurface();
        /* Empty scoped search: keep the map on the named country if we can. */
        if (place.country || place.cc) {
          var countryPool = findBusinesses({ nameQuery: "", country: place.country, cc: place.cc, raw: q });
          if (countryPool.length) {
            plotResults([], place.country + " · no matches", { skipFit: false });
            var mEmpty = ensureMap();
            if (mEmpty && countryPool[0]) {
              var lat = 0;
              var lon = 0;
              countryPool.forEach(function (b) {
                lat += b.lat;
                lon += b.lon;
              });
              mEmpty.setView(
                [lat / countryPool.length, lon / countryPool.length],
                5,
                { animate: !reducedMotion }
              );
            }
          }
        }
        window.setTimeout(function () {
          appendTurn("assistant", reply);
          searchBusy = false;
        }, opts.delay != null ? opts.delay : 420);
      }
    } else {
      if (
        !place.country &&
        !place.cc &&
        !!(needle || q) &&
        window.D3KybAgent &&
        typeof window.D3KybAgent.askCountry === "function"
      ) {
        ensureMapSurface();
        setAwaitingCountry(true, needle || q);
        window.D3KybAgent.askCountry(needle || q);
      } else if (matches.length) {
        setAwaitingCountry(false);
        revealMatches(matches, "Matches · " + matches.length);
      } else {
        ensureMapSurface();
      }
      searchBusy = false;
    }
    return matches;
  }

  function runMeridianSearch(queryText) {
    return runSearch(queryText || "Meridian");
  }

  function highlightMarker(bizId) {
    if (!markersLayer) return;
    markersLayer.eachLayer(function (layer) {
      var btn = layer.getElement() && layer.getElement().querySelector(".d3-kyb-biz-marker");
      if (btn) btn.classList.toggle("is-active", !!bizId && btn.getAttribute("data-biz-id") === bizId);
    });
  }

  /* Zoom the world map onto the selected business, then resolve. */
  function focusBusiness(biz, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      if (!biz || biz.lat == null || biz.lon == null) {
        resolve(false);
        return;
      }
      ensureMapSurface();
      var m = ensureMap();
      if (!m) {
        window.setTimeout(function () {
          focusBusiness(biz, opts).then(resolve);
        }, 100);
        return;
      }

      /* Ensure the selected pin is on the map (direct verify may skip search). */
      var hasPin = false;
      if (markersLayer) {
        markersLayer.eachLayer(function (layer) {
          var btn = layer.getElement() && layer.getElement().querySelector(".d3-kyb-biz-marker");
          if (btn && btn.getAttribute("data-biz-id") === biz.id) hasPin = true;
        });
      }
      if (!hasPin) {
        var pool = lastResults.length ? lastResults.slice() : [biz];
        if (!pool.some(function (b) { return b.id === biz.id; })) pool = [biz].concat(pool);
        plotResults(pool, biz.city + " · " + biz.name, { skipFit: true });
      }

      activeId = biz.id;
      selectedBiz = biz;
      highlightMarker(biz.id);
      setCaption(biz.city + " · " + biz.name);

      try {
        m.closePopup();
      } catch (e) {}

      var zoom = opts.zoom != null ? opts.zoom : 12;
      var holdMs = opts.holdMs != null ? opts.holdMs : 380;
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        m.off("moveend", onMoveEnd);
        window.setTimeout(function () {
          resolve(true);
        }, holdMs);
      }
      function onMoveEnd() {
        finish();
      }

      if (reducedMotion) {
        m.setView([biz.lat, biz.lon], zoom, { animate: false });
        window.setTimeout(function () {
          resolve(true);
        }, 120);
        return;
      }

      m.on("moveend", onMoveEnd);
      m.flyTo([biz.lat, biz.lon], zoom, {
        duration: opts.duration != null ? opts.duration : 1.05,
        easeLinearity: 0.25
      });
      /* Safety if moveend never fires. */
      window.setTimeout(finish, 2200);
    });
  }

  /* Frame the map on a set of businesses (e.g. a city filter in the chat panel). */
  function focusBusinesses(items, opts) {
    opts = opts || {};
    var pts = (items || [])
      .filter(function (b) {
        return b && typeof b.lat === "number" && typeof b.lon === "number";
      })
      .map(function (b) {
        return [b.lat, b.lon];
      });
    if (!pts.length) return false;
    var m = ensureMap();
    if (!m) return false;
    try {
      m.invalidateSize({ animate: false });
    } catch (e) {}
    var maxZoom = opts.maxZoom != null ? opts.maxZoom : 12;
    if (pts.length === 1) {
      if (reducedMotion) m.setView(pts[0], maxZoom);
      else m.flyTo(pts[0], maxZoom, { duration: 1.05, easeLinearity: 0.25 });
    } else if (reducedMotion) {
      m.fitBounds(pts, { padding: [64, 64], maxZoom: maxZoom });
    } else {
      m.flyToBounds(pts, { padding: [64, 64], maxZoom: maxZoom, duration: 1.05, easeLinearity: 0.25 });
    }
    return true;
  }

  function selectBusiness(biz, opts) {
    opts = opts || {};
    if (!biz) return;
    /* Demo-2: map/card pick asks for Confirm before opening the report. */
    if (!opts.confirmed && window.D3KybAgent && window.D3KybAgent.confirmSelect) {
      parkChat();
      window.D3KybAgent.confirmSelect(biz);
      return;
    }
    selectedBiz = biz;
    activeId = biz.id;
    if (map) {
      try {
        map.closePopup();
      } catch (e) {}
    }
    parkChat();
    if (!opts.skipUserTurn) appendTurn("user", opts.userText || biz.name);
    /* Map → zoom to location → fade → progressive report. */
    if (window.D3KybReport && window.D3KybReport.reveal) {
      window.D3KybReport.reveal(biz);
      return;
    }
    appendTurn(
      "assistant",
      biz.name +
        " is an active United States company at " +
        biz.addr +
        ". Overview is ready whenever the report surface is available."
    );
  }

  function isMeridianQuery(text) {
    if (!text) return false;
    var t = String(text).trim();
    /* Exact-ish short search, not a full legal-entity selection. */
    if (/^meridian$/i.test(t)) return true;
    if (/^search\s+meridian$/i.test(t)) return true;
    if (/^find\s+meridian$/i.test(t)) return true;
    if (/meridian/i.test(t) && t.length <= 24 && !/\b(llc|inc|ltd|lp|partners|capital|analytics|industrial|energy|global)\b/i.test(t)) {
      return true;
    }
    return false;
  }

  function tryMeridianFromInput(input, event) {
    if (!input) return false;
    if (shell.getAttribute("data-d3-chat-mode") !== "kyb") return false;
    var text = input.value ? input.value.trim() : "";
    if (!isMeridianQuery(text)) return false;
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    input.value = "";
    runMeridianSearch(text);
    return true;
  }

  /* Meridian shortcut kept for backwards compatibility; KYB agent owns NL. */
  document.addEventListener(
    "submit",
    function (event) {
      if (window.D3KybAgent) return;
      var form = event.target;
      if (!form || !form.matches) return;
      if (!form.matches("[data-d1-form], [data-d3-pane-form]")) return;
      var input =
        form.querySelector("[data-d1-input]") ||
        form.querySelector("[data-d3-pane-input]");
      tryMeridianFromInput(input, event);
    },
    true
  );

  document.querySelectorAll("[data-d3-pane-input]").forEach(function (input) {
    input.addEventListener("keydown", function (event) {
      if (window.D3KybAgent) return;
      if (event.key !== "Enter" || event.shiftKey) return;
      if (tryMeridianFromInput(input, event)) return;
    });
  });

  document.addEventListener("d3-chat:send", function (event) {
    if (window.D3KybAgent) return;
    var detail = event.detail || {};
    if (detail.skipMapSearch) return;
    if (detail.agent && detail.agent !== "kyb") return;
    if (!isMeridianQuery(detail.text || "")) return;
    event.stopImmediatePropagation();
    runMeridianSearch(detail.text);
  });

  document.addEventListener("d3-kyb:map-ready", function () {
    ensureMap();
    showHomeLocation();
  });

  document.addEventListener("d3-view:kyb", function () {
    window.setTimeout(function () {
      if (workspace.getAttribute("data-d3-kyb-surface") === "map") {
        ensureMap();
        map.invalidateSize();
      }
    }, 60);
  });

  if (workspace.getAttribute("data-d3-kyb-surface") === "map") {
    window.setTimeout(function () {
      ensureMap();
      showHomeLocation();
    }, 100);
  }

  /* Manual workspace search is owned by d3-kyb-manual-search.js (demo-2 sync). */

  window.D3KybMapSearch = {
    runMeridianSearch: runMeridianSearch,
    runSearch: runSearch,
    showHomeLocation: showHomeLocation,
    selectBusiness: selectBusiness,
    focusBusiness: focusBusiness,
    focusBusinesses: focusBusinesses,
    highlightMarker: highlightMarker,
    findBusinesses: findBusinesses,
    findByName: findByName,
    findById: findById,
    parsePlaceQuery: parsePlaceQuery,
    plotResults: plotResults,
    revealMatches: revealMatches,
    ensureMapSurface: ensureMapSurface,
    setAwaitingCountry: setAwaitingCountry,
    getSelected: function () {
      return selectedBiz;
    },
    setSelected: function (biz) {
      selectedBiz = biz || null;
    },
    getLastResults: function () {
      return lastResults.slice();
    },
    businesses: MERIDIANS,
    matchCaption: matchCaption,
    countryCount: countryCount
  };
})();
