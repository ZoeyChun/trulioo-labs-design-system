(function () {
  'use strict';

  var curType = 'business';
  var bizPhase = 'search';
  var selCo = null;
  var selCmp = null;
  var selPersonService = null;
  var activeSample = 'standard';
  var selFromSample = false;
  var sampleChipLabel = '';
  var voicePickList = [];
  var voicePickPending = false;
  var isListening = false;
  var recognition = null;
  var analyzingTimer = null;
  var ANALYZING_STEP_MS = 850;
  var businessInputEditing = false;
  var planCustomizing = false;
  var planSelectionReady = false;
  var planSelectedIds = [];
  var planFeaturePool = [];

  var planCheckIcon = '<svg class="plan-icon plan-icon--check" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor"/><path d="M4.6 8.1l2.1 2.1 4.9-5" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var planCircleIcon = '<svg class="plan-icon plan-icon--circle" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/></svg>';

  var els = {
    heroCard: document.getElementById('heroCard'),
    tabBusiness: document.getElementById('tabBusiness'),
    tabPerson: document.getElementById('tabPerson'),
    blockSearch: document.getElementById('blockSearch'),
    blockAnalyzing: document.getElementById('blockAnalyzing'),
    blockConfigured: document.getElementById('blockConfigured'),
    personPanel: document.getElementById('personPanel'),
    trySample: document.getElementById('trySample'),
    searchRow: document.getElementById('searchRow'),
    searchIco: document.getElementById('searchIco'),
    searchInput: document.getElementById('searchInput'),
    searchPills: document.getElementById('searchPills'),
    searchCountryChip: document.getElementById('searchCountryChip'),
    searchCountryFlag: document.getElementById('searchCountryFlag'),
    searchCountryName: document.getElementById('searchCountryName'),
    searchCountryClear: document.getElementById('searchCountryClear'),
    searchEntityChip: document.getElementById('searchEntityChip'),
    searchEntityName: document.getElementById('searchEntityName'),
    searchEntityClear: document.getElementById('searchEntityClear'),
    prefillSection: document.getElementById('prefillSection'),
    smartDrop: document.getElementById('smartDrop'),
    searchSubmit: document.getElementById('searchSubmit'),
    searchActions: document.getElementById('searchActions'),
    intelCanvas: document.getElementById('intelCanvas'),
    planFeatures: document.getElementById('planFeatures'),
    planAlsoAvailable: document.getElementById('planAlsoAvailable'),
    planAlsoAvailableSection: document.getElementById('planAlsoAvailableSection'),
    planDescription: document.getElementById('planDescription'),
    planEstimatedTime: document.getElementById('planEstimatedTime'),
    startAssessmentBtn: document.getElementById('startAssessmentBtn'),
    planStartOverBtn: document.getElementById('planStartOverBtn'),
    customizePlanBtn: document.getElementById('customizePlanBtn'),
    personServicesGrid: document.getElementById('personServicesGrid'),
    personStartAssessmentBtn: document.getElementById('personStartAssessmentBtn'),
    pfBrn: document.getElementById('pfBrn'),
    pfAddress1: document.getElementById('pfAddress1'),
    pfCity: document.getElementById('pfCity'),
    pfState: document.getElementById('pfState'),
    pfPostal: document.getElementById('pfPostal'),
  };

  function normalize(q) {
    return q.toLowerCase().trim().replace(/[.,']/g, '').replace(/\s+/g, ' ');
  }

  function businessLabel(company, country) {
    if (!company) return '';
    var cn = country ? country.name : company.country;
    return cn ? company.name + ' in ' + cn : company.name;
  }

  function clearVoicePickList() {
    voicePickList = [];
    voicePickPending = false;
  }

  function parseVoiceSelectionIndex(transcript) {
    var n = normalize(transcript);
    var words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, top: 1 };
    if (words[n]) return words[n];
    var m = n.match(/(?:number|option|pick|select)?\s*(\d+|one|two|three|four|five|six|first|second|third)/);
    if (m && words[m[1]]) return words[m[1]];
    if (m && /^\d+$/.test(m[1])) return parseInt(m[1], 10);
    if (/\bfirst\b|\btop\b|\b1st\b/.test(n)) return 1;
    if (/\bsecond\b|\b2nd\b/.test(n)) return 2;
    if (/\bthird\b|\b3rd\b/.test(n)) return 3;
    return null;
  }

  function parseCombinedCountryCompany(transcript) {
    var n = normalize(transcript);
    var sorted = countries.slice().sort(function (a, b) { return b.name.length - a.name.length; });

    var inMatch = n.match(/^(.+?)\s+(?:in|from|at)\s+(.+)$/);
    if (inMatch) {
      var coPart = inMatch[2].trim();
      var co = sorted.find(function (c) {
        var cn = normalize(c.name);
        return cn === coPart || cn.indexOf(coPart) === 0 || coPart.indexOf(cn) === 0;
      });
      if (co) return { country: co, companyQuery: inMatch[1].trim() };
    }

    for (var i = 0; i < sorted.length; i++) {
      var country = sorted[i];
      var cn = normalize(country.name);
      var idx = n.indexOf(cn);
      if (idx < 0) continue;
      var before = n.slice(0, idx).replace(/\s+(in|from|at)$/i, '').trim();
      var after = n.slice(idx + cn.length).replace(/^(in|from|at)\s+/i, '').trim();
      var companyQuery = before.length >= 2 ? before : (after.length >= 2 ? after : '');
      return { country: country, companyQuery: companyQuery };
    }
    return null;
  }

  function companiesInCountry(countryCode, query) {
    var pool = cosByCountry[countryCode] || [];
    var nq = normalize(query);
    if (!nq) return pool.slice();
    return pool.filter(function (c) {
      var nc = normalize(c.name);
      return nc.indexOf(nq) >= 0 || nq.indexOf(nc) >= 0 ||
        nq.split(' ').some(function (w) { return w.length > 3 && nc.indexOf(w) >= 0; });
    });
  }

  function getMatches(q) {
    var ql = q.toLowerCase().trim();
    var matchCo = [];
    var matchCm = [];
    if (selCo) {
      var pool = cosByCountry[selCo.code] || [];
      matchCm = ql ? pool.filter(function (c) { return c.name.toLowerCase().indexOf(ql) >= 0; }) : pool;
    } else {
      matchCo = countries.filter(function (c) { return c.name.toLowerCase().indexOf(ql) >= 0; });
      matchCm = allCompanies.filter(function (c) {
        return c.name.toLowerCase().indexOf(ql) >= 0 || c.country.toLowerCase().indexOf(ql) >= 0;
      });
    }
    return { countries: matchCo, companies: matchCm };
  }

  function voiceHintText(count) {
    if (count === 1) return 'One match found — confirming…';
    return '<strong>' + count + ' matches</strong> — Say "1", "2", "the first" · Tap a row · Enter = 1 · Listening again…';
  }

  function setReady(ready) {
    var bizReady = curType === 'business' && bizPhase === 'entity';
    els.searchSubmit.classList.toggle('ready', bizReady);

    if (els.personStartAssessmentBtn) {
      var personReady = curType === 'person' && !!selPersonService;
      els.personStartAssessmentBtn.disabled = !personReady;
      els.personStartAssessmentBtn.classList.toggle('btn-assessment--disabled', !personReady);
    }
  }

  function renderPrefill(company) {
    els.pfBrn.textContent = company.brn;
    els.pfAddress1.textContent = company.address1;
    els.pfCity.textContent = company.city;
    els.pfState.textContent = company.state;
    els.pfPostal.textContent = company.postal;
  }

  function getPlanConfig() {
    if (selFromSample && sampleEntities[activeSample]) {
      return sampleEntities[activeSample].plan;
    }
    return defaultAssessmentPlan;
  }

  function getSampleCompany(sampleKey) {
    return allCompanies.find(function (c) { return c.sampleKey === sampleKey; }) || null;
  }

  function resetPlanSelection() {
    planSelectionReady = false;
    planCustomizing = false;
    planSelectedIds = [];
    planFeaturePool = [];
  }

  function getFeatureById(id) {
    var plan = getPlanConfig();
    var i;
    for (i = 0; i < plan.features.length; i++) {
      if (plan.features[i].id === id) return plan.features[i];
    }
    return planOptionalCatalog[id] || null;
  }

  function ensurePlanSelection() {
    if (planSelectionReady) return;
    var plan = getPlanConfig();
    var alsoIds = plan.alsoAvailable || [];
    planSelectedIds = plan.features.map(function (feature) { return feature.id; });
    planFeaturePool = planSelectedIds.slice();
    alsoIds.forEach(function (id) {
      if (planFeaturePool.indexOf(id) === -1) planFeaturePool.push(id);
    });
    planSelectionReady = true;
  }

  function getAvailableFeatureIds() {
    return planFeaturePool.filter(function (id) {
      return planSelectedIds.indexOf(id) === -1;
    });
  }

  function renderPlanFeatureRow(feature, selected) {
    var badgeHtml = selected && feature.badge
      ? '<span class="plan-feature-badge">' + feature.badge + '</span>'
      : '';
    var icon = selected ? planCheckIcon : planCircleIcon;
    var rowClass = 'plan-feature-row' +
      (selected ? '' : ' plan-feature-row--available') +
      (planCustomizing ? ' plan-feature-row--editable' : '');

    if (planCustomizing) {
      return (
        '<button type="button" class="' + rowClass + '" data-feature-id="' + feature.id + '" aria-pressed="' + (selected ? 'true' : 'false') + '">' +
          icon +
          '<span class="plan-feature-label">' + feature.name + '</span>' +
          badgeHtml +
        '</button>'
      );
    }

    return (
      '<div class="' + rowClass + '">' +
        icon +
        '<span class="plan-feature-label">' + feature.name + '</span>' +
        badgeHtml +
      '</div>'
    );
  }

  function renderAssessmentPlan() {
    ensurePlanSelection();
    var plan = getPlanConfig();

    if (els.planEstimatedTime) els.planEstimatedTime.textContent = 'Estimated time: ' + plan.estimatedTime;
    if (els.planDescription) els.planDescription.textContent = plan.description;

    if (els.customizePlanBtn) {
      els.customizePlanBtn.textContent = planCustomizing ? 'Done' : 'Customize';
      els.customizePlanBtn.setAttribute('aria-expanded', planCustomizing ? 'true' : 'false');
    }

    if (els.blockConfigured) {
      els.blockConfigured.classList.toggle('is-customizing', planCustomizing);
    }

    var selectedFeatures = planSelectedIds.map(getFeatureById).filter(Boolean);
    els.planFeatures.innerHTML = selectedFeatures.map(function (feature) {
      return renderPlanFeatureRow(feature, true);
    }).join('');

    if (els.planAlsoAvailableSection) {
      els.planAlsoAvailableSection.hidden = !planCustomizing;
      els.planAlsoAvailableSection.classList.toggle('is-visible', planCustomizing);
    }

    if (els.planAlsoAvailable) {
      if (planCustomizing) {
        var availableFeatures = getAvailableFeatureIds().map(getFeatureById).filter(Boolean);
        els.planAlsoAvailable.innerHTML = availableFeatures.map(function (feature) {
          return renderPlanFeatureRow(feature, false);
        }).join('');
      } else {
        els.planAlsoAvailable.innerHTML = '';
      }
    }
  }

  function togglePlanFeature(id) {
    if (!planCustomizing || planFeaturePool.indexOf(id) === -1) return;
    var idx = planSelectedIds.indexOf(id);
    if (idx >= 0) {
      planSelectedIds.splice(idx, 1);
    } else {
      planSelectedIds.push(id);
    }
    renderAssessmentPlan();
  }

  function togglePlanCustomize() {
    planCustomizing = !planCustomizing;
    renderAssessmentPlan();
  }

  function syncSearchBarMode() {
    if (curType !== 'business') return;

    var submitted = bizPhase === 'analyzing' || bizPhase === 'plan';
    var entityReady = bizPhase === 'entity' && !!selCmp;
    var countryOnly = bizPhase === 'search' && !!selCo && !selCmp;
    var showEntity = !!selCmp && (entityReady || submitted);
    var showCountry = countryOnly;
    var hideInput = (showEntity || showCountry) && !businessInputEditing;

    if (els.searchEntityChip) {
      els.searchEntityChip.hidden = !showEntity;
      if (showEntity && selCmp && els.searchEntityName) {
        els.searchEntityName.textContent = selCmp.name;
      }
    }

    if (els.searchPills) els.searchPills.hidden = !showCountry;

    if (els.searchCountryChip) {
      els.searchCountryChip.hidden = !showCountry;
      if (showCountry && selCo) {
        if (els.searchCountryFlag) els.searchCountryFlag.textContent = selCo.flag;
        if (els.searchCountryName) els.searchCountryName.textContent = selCo.name;
      }
    }

    els.searchInput.classList.toggle('is-hidden', hideInput);
    els.searchRow.classList.toggle('has-entity-chip', showEntity);
    els.searchRow.classList.toggle('has-country-pill', showCountry);
    els.searchRow.classList.toggle('has-pills', showEntity || showCountry);
    els.searchRow.classList.toggle('is-entity-selected', entityReady);
    els.searchRow.classList.toggle('is-submitted', submitted);
    els.searchRow.classList.toggle('is-locked', submitted);

    if (els.searchActions) {
      els.searchActions.hidden = submitted;
    }
  }

  function syncLayout() {
    var isBiz = curType === 'business';
    var analyzing = isBiz && bizPhase === 'analyzing';
    var planReady = isBiz && bizPhase === 'plan';
    var entitySelected = isBiz && bizPhase === 'entity';

    els.tabBusiness.classList.toggle('active', isBiz);
    els.tabPerson.classList.toggle('active', !isBiz);
    els.tabBusiness.setAttribute('aria-selected', isBiz ? 'true' : 'false');
    els.tabPerson.setAttribute('aria-selected', isBiz ? 'false' : 'true');

    els.blockSearch.classList.toggle('hidden', !isBiz);
    els.blockAnalyzing.classList.toggle('on', analyzing);
    els.blockConfigured.classList.toggle('on', planReady);
    els.personPanel.classList.toggle('on', !isBiz);

    els.trySample.classList.toggle('hidden', entitySelected || analyzing || planReady);
    els.prefillSection.classList.toggle('on', entitySelected);

    syncSearchBarMode();

    if (planReady && selCmp) {
      renderAssessmentPlan();
    }

    setReady(entitySelected);
  }

  function stopAnalyzing() {
    if (analyzingTimer) {
      clearTimeout(analyzingTimer);
      analyzingTimer = null;
    }
  }

  function restartIntelCanvasAnimation() {
    if (!els.intelCanvas) return;
    els.intelCanvas.classList.add('is-restarting');
    void els.intelCanvas.offsetWidth;
    els.intelCanvas.classList.remove('is-restarting');
    els.intelCanvas.querySelectorAll('.intel-canvas__glow').forEach(function (el) {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  }

  function updateAnalyzingUI() {
    /* Visual is handled by CSS sweep animation on .intel-canvas */
  }

  function runAnalyzingSequence(step) {
    updateAnalyzingUI(step);
    if (step >= 3) {
      analyzingTimer = setTimeout(function () {
        bizPhase = 'plan';
        syncLayout();
      }, 450);
      return;
    }
    analyzingTimer = setTimeout(function () {
      runAnalyzingSequence(step + 1);
    }, ANALYZING_STEP_MS);
  }

  function beginAnalyzing() {
    stopAnalyzing();
    bizPhase = 'analyzing';
    resetPlanSelection();
    clearVoicePickList();
    els.smartDrop.classList.remove('open');
    restartIntelCanvasAnimation();
    syncLayout();
    requestAnimationFrame(function () {
      runAnalyzingSequence(0);
    });
  }

  function startAnalyzing() {
    if (!selCmp || bizPhase !== 'entity') return;
    beginAnalyzing();
  }

  function applyVoicePick(entry) {
    if (!entry) return;
    clearVoicePickList();
    if (entry.kind === 'country') pickCountry(entry.data);
    else if (entry.kind === 'company') pickCompany(entry.data);
  }

  function tryResolveVoicePickByNumber(transcript) {
    if (!voicePickList.length) return false;
    var idx = parseVoiceSelectionIndex(transcript);
    if (!idx || idx < 1 || idx > voicePickList.length) return false;
    applyVoicePick(voicePickList[idx - 1]);
    return true;
  }

  function buildDrop(q, opts) {
    opts = opts || {};
    els.smartDrop.innerHTML = '';
    clearVoicePickList();
    var m = opts.prefiltered || getMatches(q);
    var countriesList = m.countries || [];
    var companies = (m.companies || []).slice(0, 6);

    if (!countriesList.length && !companies.length) {
      els.smartDrop.classList.remove('open');
      return;
    }

    var pickEntries = [];
    countriesList.forEach(function (c) { pickEntries.push({ kind: 'country', data: c }); });
    companies.forEach(function (c) { pickEntries.push({ kind: 'company', data: c }); });

    if (opts.voice) {
      voicePickList = pickEntries.slice();
      voicePickPending = pickEntries.length > 1;
      var hint = document.createElement('div');
      hint.className = 'sdrop-voice-hint';
      hint.innerHTML = voiceHintText(pickEntries.length);
      els.smartDrop.appendChild(hint);
    }

    var num = 1;
    if (countriesList.length) {
      var sec = document.createElement('div');
      sec.className = 'sdrop-section';
      sec.innerHTML = '<div class="sdrop-lbl">Countries</div>';
      countriesList.forEach(function (c) {
        var item = document.createElement('div');
        item.className = 'sdrop-item' + (opts.voice ? ' voice-pick' : '');
        var numHtml = opts.voice ? '<span class="sdrop-num">' + num + '</span>' : '';
        item.innerHTML = numHtml + '<span class="sdrop-flag">' + c.flag + '</span><div class="sdrop-main"><div class="sdrop-name">' + c.name + '</div></div>';
        var pickIdx = num - 1;
        item.addEventListener('mousedown', function (e) {
          e.preventDefault();
          if (opts.voice && voicePickList[pickIdx]) applyVoicePick(voicePickList[pickIdx]);
          else { clearVoicePickList(); pickCountry(c); }
        });
        sec.appendChild(item);
        num++;
      });
      els.smartDrop.appendChild(sec);
    }

    if (companies.length) {
      var sec2 = document.createElement('div');
      sec2.className = 'sdrop-section';
      sec2.innerHTML = '<div class="sdrop-lbl">' + (selCo ? 'Companies in ' + selCo.name : 'Companies') + '</div>';
      companies.forEach(function (c) {
        var item = document.createElement('div');
        item.className = 'sdrop-item' + (opts.voice ? ' voice-pick' : '');
        var numHtml = opts.voice ? '<span class="sdrop-num">' + num + '</span>' : '';
        item.innerHTML =
          numHtml +
          '<div class="sdrop-ico"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="4" width="12" height="10" rx="1"/></svg></div>' +
          '<div class="sdrop-main"><div class="sdrop-name">' + c.name + '</div><div class="sdrop-sub">' + c.flag + ' ' + c.country + ' · ' + c.brn + '</div></div>';
        var pickIdx = num - 1;
        item.addEventListener('mousedown', function (e) {
          e.preventDefault();
          if (opts.voice && voicePickList[pickIdx]) applyVoicePick(voicePickList[pickIdx]);
          else { clearVoicePickList(); pickCompany(c); }
        });
        sec2.appendChild(item);
        num++;
      });
      els.smartDrop.appendChild(sec2);
    }

    els.smartDrop.classList.add('open');

    if (opts.voice && pickEntries.length === 1) {
      setTimeout(function () { applyVoicePick(pickEntries[0]); }, 450);
    } else if (opts.voice && pickEntries.length > 1) {
      setTimeout(function () { startVoiceSelectionListen(); }, 600);
    }
  }

  function pickTopDropMatch() {
    if (voicePickList.length) {
      applyVoicePick(voicePickList[0]);
      return true;
    }
    if (!els.smartDrop.classList.contains('open')) return false;
    var m = getMatches(els.searchInput.value);
    if (selCo && m.companies.length) { pickCompany(m.companies[0]); return true; }
    if (m.countries.length) { pickCountry(m.countries[0]); return true; }
    if (m.companies.length) { pickCompany(m.companies[0]); return true; }
    return false;
  }

  function tryResolveCombinedBusiness(q) {
    var parsed = parseCombinedCountryCompany(q);
    if (!parsed) return false;
    var co = parsed.country;
    var cq = parsed.companyQuery;

    if (!cq || cq.length < 2) {
      pickCountry(co);
      return true;
    }

    var matches = companiesInCountry(co.code, cq);
    if (matches.length === 0) {
      pickCountry(co);
      els.searchInput.value = cq;
      buildDrop(cq, { voice: true, prefiltered: { countries: [], companies: [] } });
      return true;
    }

    pickCountry(co);
    if (matches.length === 1) {
      setTimeout(function () { pickCompany(matches[0]); }, 300);
      return true;
    }

    els.searchInput.value = cq;
    buildDrop(cq, { voice: true, prefiltered: { countries: [], companies: matches } });
    return true;
  }

  function resolveVoiceInput(transcript) {
    var q = transcript.trim();
    if (q.length < 2) return;

    if (tryResolveVoicePickByNumber(q)) return;

    var nq = normalize(q);

    if (curType === 'person') return;

    if (bizPhase !== 'search') return;

    if (!selCo && tryResolveCombinedBusiness(q)) return;

    var m = getMatches(q);
    if (selCo) {
      var exactCm = m.companies.find(function (c) { return normalize(c.name) === nq; });
      if (exactCm) { pickCompany(exactCm); return; }
      if (m.companies.length === 1) { pickCompany(m.companies[0]); return; }
      buildDrop(q, { voice: true });
      return;
    }

    var exactCo = m.countries.find(function (c) { return normalize(c.name) === nq; });
    if (exactCo && !m.companies.length) { pickCountry(exactCo); return; }

    var exactCmp = m.companies.find(function (c) { return normalize(c.name) === nq; });
    if (exactCmp) { pickCompany(exactCmp); return; }

    buildDrop(q, { voice: true });
  }

  function pickCountry(c) {
    clearVoicePickList();
    selCo = c;
    businessInputEditing = true;
    els.searchInput.value = '';
    els.searchInput.placeholder = 'Search company...';
    els.smartDrop.classList.remove('open');
    syncLayout();
    els.searchInput.focus();
  }

  function pickCompany(c) {
    clearVoicePickList();
    selCmp = c;
    selFromSample = false;
    sampleChipLabel = '';
    activeSample = 'standard';
    businessInputEditing = false;
    if (!selCo) {
      selCo = countries.find(function (co) { return co.code === c.countryCode; }) || null;
    }
    els.searchInput.value = '';
    els.smartDrop.classList.remove('open');
    renderPrefill(c);
    bizPhase = 'entity';
    syncLayout();
  }

  function clearCompanyChip() {
    stopAnalyzing();
    selCmp = null;
    selFromSample = false;
    sampleChipLabel = '';
    bizPhase = 'search';
    businessInputEditing = true;
    els.searchInput.value = '';
    els.searchInput.placeholder = 'Search company...';
    els.smartDrop.classList.remove('open');
    syncLayout();
    els.searchInput.focus();
  }

  function pickSampleEntity(c, sampleKey, chipLabel) {
    clearVoicePickList();
    selCmp = c;
    selCo = countries.find(function (co) { return co.code === c.countryCode; }) || null;
    activeSample = sampleKey;
    selFromSample = true;
    sampleChipLabel = chipLabel;
    businessInputEditing = false;
    els.searchInput.value = '';
    els.smartDrop.classList.remove('open');
    beginAnalyzing();
  }

  function advanceToPlan() {
    startAnalyzing();
  }

  function pickPersonService(serviceId) {
    selPersonService = serviceId;
    if (els.personServicesGrid) {
      els.personServicesGrid.querySelectorAll('.person-service-option').forEach(function (btn) {
        var selected = btn.getAttribute('data-service') === serviceId;
        btn.classList.toggle('is-selected', selected);
        btn.setAttribute('aria-checked', selected ? 'true' : 'false');
      });
    }
    setReady(true);
  }

  function resetBusiness() {
    stopAnalyzing();
    selCo = null;
    selCmp = null;
    bizPhase = 'search';
    activeSample = 'standard';
    selFromSample = false;
    sampleChipLabel = '';
    businessInputEditing = false;
    resetPlanSelection();
    els.searchInput.value = '';
    els.searchInput.placeholder = 'Search company or country...';
    els.searchInput.classList.remove('is-hidden');
    els.smartDrop.classList.remove('open');
    clearVoicePickList();
    syncLayout();
  }

  function resetPerson() {
    selPersonService = null;
    if (els.personServicesGrid) {
      els.personServicesGrid.querySelectorAll('.person-service-option').forEach(function (btn) {
        btn.classList.remove('is-selected');
        btn.setAttribute('aria-checked', 'false');
      });
    }
    setReady(false);
  }

  function resetAll() {
    resetBusiness();
    resetPerson();
  }

  function setType(type) {
    curType = type;
    resetAll();
    syncLayout();
  }

  function buildKybResultsPayload() {
    return {
      name: selCmp.name,
      country: selCo ? selCo.name : selCmp.country,
      countryCode: selCmp.countryCode,
      brn: selCmp.brn,
      address1: selCmp.address1,
      city: selCmp.city,
      state: selCmp.state,
      postal: selCmp.postal,
      sample: selFromSample && activeSample ? activeSample : '',
    };
  }

  function buildKybResultsUrl() {
    if (!selCmp) return kybResultsUrl;
    var payload = buildKybResultsPayload();
    var params = new URLSearchParams(payload);
    Object.keys(payload).forEach(function (key) {
      if (!payload[key]) params.delete(key);
    });
    return kybResultsUrl + '?' + params.toString();
  }

  function submitAssessment() {
    if (!selCmp) return;
    try {
      sessionStorage.setItem('kybEntity', JSON.stringify(buildKybResultsPayload()));
      sessionStorage.setItem('kybHomeUrl', kybHomeUrl);
    } catch (e) { /* ignore quota / private mode */ }
    window.location.href = buildKybResultsUrl();
  }

  function submitPersonAssessment() {
    if (!selPersonService) return;
    var url = personServiceUrls[selPersonService];
    if (url) {
      window.location.href = url;
      return;
    }
    alert('Person assessment flow — coming soon.');
  }

  function activeInput() {
    return els.searchInput;
  }

  function setListening(on) {
    isListening = on;
    document.querySelectorAll('.voice-btn').forEach(function (btn) {
      btn.classList.toggle('listening', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function stopVoiceSearch() {
    if (recognition && isListening) {
      try { recognition.abort(); } catch (e) { recognition.stop(); }
    }
    setListening(false);
  }

  function startVoiceSelectionListen() {
    if (!voicePickPending || !voicePickList.length || isListening || !recognition) return;
    try { recognition.start(); } catch (e) { /* ignore */ }
  }

  els.tabBusiness.addEventListener('click', function () { setType('business'); });
  els.tabPerson.addEventListener('click', function () { setType('person'); });

  els.searchInput.addEventListener('input', function () {
    if (bizPhase !== 'search') return;
    clearVoicePickList();
    var q = els.searchInput.value.trim();
    if (q.length >= 2) buildDrop(q);
    else els.smartDrop.classList.remove('open');
  });

  els.searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      if (bizPhase === 'entity') {
        e.preventDefault();
        advanceToPlan();
        return;
      }
      if (els.smartDrop.classList.contains('open')) {
        e.preventDefault();
        pickTopDropMatch();
      }
    }
  });

  els.searchInput.addEventListener('blur', function () {
    setTimeout(function () {
      els.smartDrop.classList.remove('open');
      if (bizPhase === 'search' && selCo && !selCmp && !els.searchInput.value.trim()) {
        businessInputEditing = false;
        syncSearchBarMode();
      }
    }, 200);
  });

  els.searchRow.addEventListener('click', function (e) {
    if (bizPhase !== 'search' || !selCo || selCmp) return;
    if (e.target.closest('.search-token-clear') || e.target.closest('.submit-btn') || e.target.closest('.voice-btn')) return;
    businessInputEditing = true;
    syncSearchBarMode();
    els.searchInput.focus();
  });

  els.searchSubmit.addEventListener('click', function () {
    if (bizPhase === 'entity') advanceToPlan();
    else if (els.smartDrop.classList.contains('open')) pickTopDropMatch();
  });

  if (els.searchCountryClear) {
    els.searchCountryClear.addEventListener('click', function (e) {
      e.stopPropagation();
      resetBusiness();
      els.searchInput.focus();
    });
  }

  els.searchEntityClear.addEventListener('click', function (e) {
    e.stopPropagation();
    if (bizPhase === 'analyzing' || bizPhase === 'plan') {
      resetBusiness();
      return;
    }
    clearCompanyChip();
  });

  els.startAssessmentBtn.addEventListener('click', submitAssessment);
  els.planStartOverBtn.addEventListener('click', resetBusiness);
  els.customizePlanBtn.addEventListener('click', togglePlanCustomize);

  if (els.blockConfigured) {
    els.blockConfigured.addEventListener('click', function (e) {
      if (!planCustomizing) return;
      var btn = e.target.closest('[data-feature-id]');
      if (!btn) return;
      togglePlanFeature(btn.getAttribute('data-feature-id'));
    });
  }

  if (els.personServicesGrid) {
    els.personServicesGrid.querySelectorAll('.person-service-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        pickPersonService(btn.getAttribute('data-service'));
      });
    });
  }

  if (els.personStartAssessmentBtn) {
    els.personStartAssessmentBtn.addEventListener('click', submitPersonAssessment);
  }

  document.querySelectorAll('.sample-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var sample = chip.getAttribute('data-sample');
      var chipLabel = chip.textContent.trim();
      if (curType !== 'business') setType('business');
      else resetBusiness();
      var c = getSampleCompany(sample);
      if (c) pickSampleEntity(c, sample, chipLabel);
    });
  });

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function () { setListening(true); };
    recognition.onend = function () { setListening(false); };
    recognition.onerror = function (e) {
      setListening(false);
      if (e.error === 'not-allowed') {
        alert('Microphone access is required for voice search.');
      }
    };

    recognition.onresult = function (ev) {
      var interim = '';
      var finalText = '';
      for (var i = ev.resultIndex; i < ev.results.length; i++) {
        if (ev.results[i].isFinal) finalText += ev.results[i][0].transcript;
        else interim += ev.results[i][0].transcript;
      }

      var text = (finalText || interim).trim();
      activeInput().value = text;

      if (finalText.trim()) {
        if (voicePickPending && voicePickList.length && tryResolveVoicePickByNumber(finalText.trim())) {
          return;
        }
        resolveVoiceInput(finalText.trim());
      } else if (interim.trim().length >= 2 && !voicePickPending && bizPhase === 'search' && curType === 'business') {
        buildDrop(interim.trim());
      }
    };

    document.querySelectorAll('.voice-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (isListening) {
          stopVoiceSearch();
          return;
        }
        if (curType !== 'business' || bizPhase !== 'search') return;
        activeInput().focus();
        try { recognition.start(); } catch (err) { /* noop */ }
      });
    });
  } else {
    document.querySelectorAll('.voice-btn').forEach(function (btn) {
      btn.disabled = true;
      btn.title = 'Voice search not supported in this browser';
    });
  }

  renderAssessmentPlan();
  syncLayout();
})();
