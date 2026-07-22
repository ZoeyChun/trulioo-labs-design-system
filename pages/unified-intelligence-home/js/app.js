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

  var checkIcon = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M5.5 8l1.8 1.8L10.8 6.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var bulletIcon = '<svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="3"/></svg>';

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
    searchInput: document.getElementById('searchInput'),
    searchEntityChip: document.getElementById('searchEntityChip'),
    searchEntityName: document.getElementById('searchEntityName'),
    searchEntityClear: document.getElementById('searchEntityClear'),
    prefillSection: document.getElementById('prefillSection'),
    smartDrop: document.getElementById('smartDrop'),
    searchSubmit: document.getElementById('searchSubmit'),
    entityChipLabel: document.getElementById('entityChipLabel'),
    planEntityCaption: document.getElementById('planEntityCaption'),
    entityChipEdit: document.getElementById('entityChipEdit'),
    analyzingEntityLabel: document.getElementById('analyzingEntityLabel'),
    analyzingEntityCaption: document.getElementById('analyzingEntityCaption'),
    analyzingEntityEdit: document.getElementById('analyzingEntityEdit'),
    intelSteps: document.getElementById('intelSteps'),
    intelProgressFill: document.getElementById('intelProgressFill'),
    intelProgressLabel: document.getElementById('intelProgressLabel'),
    planFeatures: document.getElementById('planFeatures'),
    planBasedOn: document.getElementById('planBasedOn'),
    planIntroMessage: document.getElementById('planIntroMessage'),
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

  function getEntityCaption() {
    if (selFromSample && sampleChipLabel) {
      return 'Sample entity - ' + sampleChipLabel;
    }
    return 'Selected Business';
  }

  function updateEntityCaptions() {
    var caption = getEntityCaption();
    if (els.analyzingEntityCaption) els.analyzingEntityCaption.textContent = caption;
    if (els.planEntityCaption) els.planEntityCaption.textContent = caption;
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
    return {
      introMessage: 'I\'ve prepared from available entity intelligence for this business. Review or customize before starting.',
      estimatedTime: '38s',
      features: assessmentFeatures,
      basedOn: assessmentBasedOn,
    };
  }

  function getSampleCompany(sampleKey) {
    return allCompanies.find(function (c) { return c.sampleKey === sampleKey; }) || null;
  }

  function renderAssessmentPlan() {
    var plan = getPlanConfig();

    if (els.planIntroMessage) els.planIntroMessage.textContent = plan.introMessage;
    if (els.planEstimatedTime) els.planEstimatedTime.textContent = 'Estimated time: ' + plan.estimatedTime;

    els.planFeatures.innerHTML = plan.features.map(function (name) {
      return (
        '<div class="plan-check-row">' +
          checkIcon +
          '<span class="plan-check-label">' + name + '</span>' +
        '</div>'
      );
    }).join('');

    els.planBasedOn.innerHTML = plan.basedOn.map(function (name) {
      return (
        '<div class="plan-based-item">' +
          bulletIcon +
          '<span>' + name + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function syncSearchBarMode() {
    var hasEntity = bizPhase === 'entity' && !!selCmp;
    els.searchEntityChip.hidden = !hasEntity;
    els.searchInput.classList.toggle('is-hidden', hasEntity);
    els.searchRow.classList.toggle('has-entity-chip', hasEntity);
    if (hasEntity) {
      els.searchEntityName.textContent = businessLabel(selCmp, selCo);
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

    els.blockSearch.classList.toggle('hidden', !isBiz || analyzing || planReady);
    els.blockAnalyzing.classList.toggle('on', analyzing);
    els.blockConfigured.classList.toggle('on', planReady);
    els.personPanel.classList.toggle('on', !isBiz);

    els.trySample.classList.toggle('hidden', entitySelected || analyzing || planReady);
    els.prefillSection.classList.toggle('on', entitySelected);

    syncSearchBarMode();

    if (analyzing && selCmp) {
      els.analyzingEntityLabel.textContent = businessLabel(selCmp, selCo);
      updateEntityCaptions();
    }

    if (planReady && selCmp) {
      els.entityChipLabel.textContent = businessLabel(selCmp, selCo);
      updateEntityCaptions();
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

  function updateAnalyzingUI(activeStep) {
    if (!els.intelSteps) return;
    var steps = els.intelSteps.querySelectorAll('.intel-step');
    steps.forEach(function (el, i) {
      el.classList.remove('is-active', 'is-done');
      if (activeStep >= 3 || i < activeStep) el.classList.add('is-done');
      else if (i === activeStep) el.classList.add('is-active');
    });

    var pct = activeStep >= 3 ? 100 : Math.round(((activeStep + 1) / 3) * 100);
    if (els.intelProgressFill) els.intelProgressFill.style.width = pct + '%';
    if (els.intelProgressLabel) {
      els.intelProgressLabel.textContent = 'Processing ' + Math.min(activeStep + 1, 3) + ' of 3 steps...';
    }
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
    clearVoicePickList();
    els.smartDrop.classList.remove('open');
    if (els.intelProgressFill) els.intelProgressFill.style.width = '0%';
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
    els.searchInput.value = '';
    els.searchInput.placeholder = 'Search company...';
    els.smartDrop.classList.remove('open');
    syncLayout();
  }

  function pickCompany(c) {
    clearVoicePickList();
    selCmp = c;
    selFromSample = false;
    sampleChipLabel = '';
    activeSample = 'standard';
    if (!selCo) {
      selCo = countries.find(function (co) { return co.code === c.countryCode; }) || null;
    }
    els.searchInput.value = '';
    els.smartDrop.classList.remove('open');
    renderPrefill(c);
    bizPhase = 'entity';
    syncLayout();
  }

  function pickSampleEntity(c, sampleKey, chipLabel) {
    clearVoicePickList();
    selCmp = c;
    selCo = countries.find(function (co) { return co.code === c.countryCode; }) || null;
    activeSample = sampleKey;
    selFromSample = true;
    sampleChipLabel = chipLabel;
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
    setTimeout(function () { els.smartDrop.classList.remove('open'); }, 200);
  });

  els.searchSubmit.addEventListener('click', function () {
    if (bizPhase === 'entity') advanceToPlan();
    else if (els.smartDrop.classList.contains('open')) pickTopDropMatch();
  });

  els.searchEntityClear.addEventListener('click', function (e) {
    e.stopPropagation();
    resetBusiness();
    els.searchInput.focus();
  });

  els.entityChipEdit.addEventListener('click', function () {
    stopAnalyzing();
    if (selFromSample) {
      resetBusiness();
      els.searchInput.focus();
    } else {
      bizPhase = 'entity';
      syncLayout();
    }
  });

  if (els.analyzingEntityEdit) {
    els.analyzingEntityEdit.addEventListener('click', function () {
      stopAnalyzing();
      if (selFromSample) {
        resetBusiness();
        els.searchInput.focus();
      } else {
        bizPhase = 'entity';
        syncLayout();
      }
    });
  }

  els.startAssessmentBtn.addEventListener('click', submitAssessment);
  els.planStartOverBtn.addEventListener('click', resetBusiness);
  els.customizePlanBtn.addEventListener('click', function () {
    alert('Customize flow — coming in next frame.');
  });

  if (els.personServicesGrid) {
    els.personServicesGrid.querySelectorAll('.person-service-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        pickPersonService(btn.getAttribute('data-service'));
      });
    });
  }

  if (els.personStartAssessmentBtn) {
    els.personStartAssessmentBtn.addEventListener('click', function () {
      if (!selPersonService) return;
      alert('Person assessment flow — coming soon.');
    });
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
