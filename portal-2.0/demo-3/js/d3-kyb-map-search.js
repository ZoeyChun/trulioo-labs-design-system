/* Demo 3 — AI-powered Meridian search + interactive map (Leaflet).
   Typing "Meridian" in KYB chat zooms to a US-wide view and plots 5
   real business locations. Marker click → details; Select → KYB flow. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var workspace = document.querySelector("[data-d3-workspace]");
  var mapEl = document.querySelector("[data-d3-kyb-map]");
  var mapHost = document.querySelector("[data-d3-kyb-leaflet]");
  var caption = document.querySelector("[data-d3-kyb-map-caption]");
  var mapNudge = document.querySelector("[data-d3-kyb-map-nudge]");
  if (!shell || !workspace || !mapHost || typeof L === "undefined") return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Demo KYB dataset — grounded answers must only use these records. */
  var MERIDIAN_US = [
    {
      id: "us-cap",
      name: "Meridian Capital LLC",
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
    }
  ];

  var selectedBiz = null;
  var lastResults = [];

  var SF = { lat: 37.7749, lon: -122.4194, zoom: 13 };
  var map = null;
  var markersLayer = null;
  var locMarker = null;
  var activeId = null;
  var searchBusy = false;

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

  function showHomeLocation(opts) {
    opts = opts || {};
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
    setCaption("San Francisco · Ask TruAI to find a business");
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

  function plotResults(items, captionText, opts) {
    opts = opts || {};
    var list = items && items.length ? items : MERIDIAN_US;
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
    if (!opts.skipFit) {
      if (bounds.length === 1) {
        if (reducedMotion) m.setView(bounds[0], 12);
        else m.flyTo(bounds[0], 12, { duration: flyDur * 0.7, easeLinearity: ease });
      } else if (bounds.length) {
        if (reducedMotion) {
          m.fitBounds(bounds, { padding: [64, 64], maxZoom: 5 });
        } else {
          m.flyToBounds(bounds, {
            padding: [64, 64],
            maxZoom: 5,
            duration: flyDur,
            easeLinearity: ease
          });
        }
      }
    }
    setCaption(captionText || ("United States · " + list.length + " matches"));
  }

  function plotMeridianResults() {
    revealMatches(MERIDIAN_US, "United States · 5 Meridian matches");
  }

  /* Crossfade to map → zoom out to matches (skip current-location pin). */
  function revealMatches(items, captionText, opts) {
    opts = opts || {};
    var list = items && items.length ? items.slice() : MERIDIAN_US.slice();
    lastResults = list.slice();
    var label =
      captionText ||
      (list.length === MERIDIAN_US.length
        ? "United States · 5 Meridian matches"
        : "Matches · " + list.length);
    setCaption(label);
    transitionToMap(function () {
      var m = ensureMap();
      if (m) {
        /* Drop location pin; start closer so flyToBounds reads as a zoom-out. */
        if (locMarker && m.hasLayer(locMarker)) m.removeLayer(locMarker);
        if (!reducedMotion && list.length) {
          var lat = 0;
          var lon = 0;
          list.forEach(function (b) {
            lat += b.lat;
            lon += b.lon;
          });
          try {
            m.setView([lat / list.length, lon / list.length], 7, { animate: false });
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

  function findBusinesses(query) {
    var q = String(query || "").trim().toLowerCase();
    if (!q) return MERIDIAN_US.slice();
    return MERIDIAN_US.filter(function (biz) {
      var hay = [biz.name, biz.city, addrOf(biz), biz.reg, biz.brief, biz.status]
        .join(" ")
        .toLowerCase();
      return hay.indexOf(q) !== -1 || q.split(/\s+/).every(function (tok) {
        return tok.length < 2 || hay.indexOf(tok) !== -1;
      });
    });
  }

  function addrOf(biz) {
    return biz.addr || (biz.report && biz.report.address) || "";
  }

  function findById(id) {
    for (var i = 0; i < MERIDIAN_US.length; i += 1) {
      if (MERIDIAN_US[i].id === id) return MERIDIAN_US[i];
    }
    return null;
  }

  function findByName(name) {
    var q = String(name || "").trim().toLowerCase();
    if (!q) return null;
    var exact = null;
    var partial = null;
    MERIDIAN_US.forEach(function (biz) {
      var n = biz.name.toLowerCase();
      if (n === q) exact = biz;
      else if (n.indexOf(q) !== -1 || q.indexOf(n) !== -1) partial = partial || biz;
      else {
        var tokens = q.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
        if (tokens.length && tokens.every(function (t) { return n.indexOf(t) !== -1; })) {
          partial = partial || biz;
        }
      }
    });
    return exact || partial;
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

  /* Figma 1296:20860 — Similar companies cards in chat. */
  function appendSuggestions(items) {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread || !items || !items.length) return;
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
          '<img class="d3-kyb-similar__clock" src="assets/icons/clock.svg" alt="" width="16" height="16">' +
          "<span>" +
          escapeHtml(biz.verified) +
          "</span></div>"
        : "";

      card.innerHTML =
        '<div class="d3-kyb-similar__head">' +
        '<span class="d3-kyb-similar__name"></span>' +
        '<img class="d3-kyb-similar__arrow" src="assets/icons/arrow-right.svg" alt="" width="16" height="16">' +
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
      ensureMap();
      map.invalidateSize();
    }, 40);
  }

  function runSearch(queryText, opts) {
    opts = opts || {};
    if (searchBusy && !opts.force) return [];
    searchBusy = true;
    if (window.D3Nav) window.D3Nav.openKybChat({ map: true });
    parkChat();
    var q = queryText || "Meridian";
    var matches = findBusinesses(q.indexOf("meridian") !== -1 ? "meridian" : q);
    if (!matches.length && /meridian/i.test(q)) matches = MERIDIAN_US.slice();
    lastResults = matches.slice();

    if (!opts.silent) {
      appendTurn("user", q);
      var reply =
        matches.length === 0
          ? "I didn’t find any businesses matching “" +
            q +
            "” in this demo dataset. Try “Meridian” or a full legal name from the map results."
          : "I found " +
            matches.length +
            " business" +
            (matches.length === 1 ? "" : "es") +
            " matching “" +
            q +
            "”. Select a location on the map or a company below to verify.";
      /* Location first, then zoom out as matches land. */
      if (matches.length) {
        revealMatches(
          matches,
          matches.length === MERIDIAN_US.length
            ? "United States · 5 Meridian matches"
            : "Matches · " + matches.length
        );
      } else {
        ensureMapSurface();
      }
      window.setTimeout(function () {
        appendTurn("assistant", reply);
        if (matches.length) appendSuggestions(matches);
        searchBusy = false;
      }, opts.delay != null ? opts.delay : 420);
    } else {
      if (matches.length) {
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
      if (btn) btn.classList.toggle("is-active", btn.getAttribute("data-biz-id") === bizId);
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

  function selectBusiness(biz, opts) {
    opts = opts || {};
    if (!biz) return;
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

  /* Workspace search field on the resume landing. */
  var searchInput = workspace.querySelector("[data-d3-kyb-search]");
  if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {
      if (event.key !== "Enter") return;
      var text = searchInput.value ? searchInput.value.trim() : "";
      if (!text) return;
      event.preventDefault();
      searchInput.value = "";
      document.dispatchEvent(new CustomEvent("d3-chat:send", {
        detail: { text: text, agent: "kyb" },
        cancelable: true
      }));
    });
  }

  window.D3KybMapSearch = {
    runMeridianSearch: runMeridianSearch,
    runSearch: runSearch,
    showHomeLocation: showHomeLocation,
    selectBusiness: selectBusiness,
    focusBusiness: focusBusiness,
    findBusinesses: findBusinesses,
    findByName: findByName,
    findById: findById,
    plotResults: plotResults,
    revealMatches: revealMatches,
    ensureMapSurface: ensureMapSurface,
    getSelected: function () {
      return selectedBiz;
    },
    setSelected: function (biz) {
      selectedBiz = biz || null;
    },
    getLastResults: function () {
      return lastResults.slice();
    },
    businesses: MERIDIAN_US
  };
})();
