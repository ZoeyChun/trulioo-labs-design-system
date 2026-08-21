(function () {
  'use strict';

  var DEMO_SCENARIOS = [
    {
      id: 'us-payments-onboarding',
      type: 'business',
      title: 'US payments company onboarding',
      description: 'A US payments company is reviewed before onboarding by verifying its registration, address, business status, and legal existence.',
      status: 'Verified · Low risk',
      statusTone: 'success',
      sample: 'standard',
    },
    {
      id: 'cross-border-ownership',
      type: 'business',
      title: 'Cross-border ownership investigation',
      description: 'A UK business owned through multiple layers requires identifying its ultimate owners.',
      status: '2 UBOs identified',
      statusTone: 'success',
      sample: 'complex',
    },
    {
      id: 'business-reputation-review',
      type: 'business',
      title: 'Business reputation and risk review',
      description: 'An established business is screened for sanctions, adverse media, regulatory actions, and reputation risks before approval.',
      status: 'Elevated risk detected',
      statusTone: 'warning',
      sample: 'elevated',
    },
    {
      id: 'business-credit-assessment',
      type: 'business',
      title: 'Business credit assessment',
      description: 'A lender evaluates a small business by reviewing its credit profile and financial health before issuing financing.',
      status: 'Credit profile verified',
      statusTone: 'success',
    },
    {
      id: 'business-bank-verification',
      type: 'business',
      title: 'Business bank account verification',
      description: 'A business links its operating bank account during onboarding to verify account ownership and support KYB verification.',
      status: 'Business account verified',
      statusTone: 'info',
    },
    {
      id: 'identity-device-risk',
      type: 'person',
      title: 'Device Intelligence',
      description: 'Evaluate a device for attributes, environment, and risk signals before approval.',
      status: 'Device signals ready',
      statusTone: 'info',
      url: '../device-intelligence/index.html',
    },
    {
      id: 'customer-digital-identity',
      type: 'person',
      title: 'Customer onboarding with digital identity',
      description: 'A customer verifies their identity using a trusted digital identity provider instead of uploading physical documents.',
      status: 'Verified · High confidence',
      statusTone: 'success',
    },
    {
      id: 'account-holder-bank',
      type: 'person',
      title: 'Account holder and bank verification',
      description: 'A customer links a bank account during onboarding to confirm account ownership and strengthen identity verification.',
      status: 'Bank account verified',
      statusTone: 'accent',
    },
    {
      id: 'identity-document-review',
      type: 'person',
      title: 'Identity verification with document review',
      description: 'A customer uploads a passport for verification, but the document requires additional authenticity checks before approval.',
      status: 'Manual review required',
      statusTone: 'warning',
    },
  ];

  var TYPE_ICONS = {
    business: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="2" y="4" width="12" height="10" rx="1"/><path d="M5 4V3a3 3 0 0 1 6 0v1"/></svg>',
    person: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="8" cy="5.5" r="2.5"/><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>',
  };

  var gridEl = document.getElementById('demoScenariosGrid');
  var filterButtons = document.querySelectorAll('[data-demo-filter]');
  var activeFilter = 'all';

  if (!gridEl) return;

  function renderCards() {
    gridEl.innerHTML = DEMO_SCENARIOS.map(function (scenario) {
      var typeLabel = scenario.type === 'business' ? 'Business' : 'Person';
      return (
        '<article class="demo-scenario-card" data-scenario-id="' + scenario.id + '" data-scenario-type="' + scenario.type + '">' +
          '<div class="demo-scenario-tag demo-scenario-tag--' + scenario.type + '">' + TYPE_ICONS[scenario.type] + '<span>' + typeLabel + '</span></div>' +
          '<div class="demo-scenario-body">' +
            '<h3 class="demo-scenario-title">' + scenario.title + '</h3>' +
            '<p class="demo-scenario-desc">' + scenario.description + '</p>' +
          '</div>' +
          '<div class="demo-scenario-divider" aria-hidden="true"></div>' +
          '<div class="demo-scenario-foot">' +
            '<span class="demo-scenario-status-dot demo-scenario-status-dot--' + scenario.statusTone + '" aria-hidden="true"></span>' +
            '<span class="demo-scenario-status">' + scenario.status + '</span>' +
            '<button class="demo-scenario-try" type="button" data-scenario-id="' + scenario.id + '">Try it now</button>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function applyFilter(filter) {
    activeFilter = filter;
    filterButtons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-demo-filter') === filter);
    });

    gridEl.querySelectorAll('.demo-scenario-card').forEach(function (card) {
      var type = card.getAttribute('data-scenario-type');
      var show = filter === 'all' || filter === type;
      card.hidden = !show;
    });
  }

  function findScenario(id) {
    return DEMO_SCENARIOS.find(function (s) { return s.id === id; });
  }

  function scrollToHero() {
    var hero = document.querySelector('.hero-zone');
    if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleTryScenario(id) {
    var scenario = findScenario(id);
    if (!scenario) return;

    if (scenario.url) {
      window.location.href = scenario.url;
      return;
    }

    scrollToHero();

    if (scenario.type === 'person') {
      var personTab = document.getElementById('tabPerson');
      if (personTab) personTab.click();
      return;
    }

    var businessTab = document.getElementById('tabBusiness');
    if (businessTab) businessTab.click();

    if (scenario.sample) {
      window.setTimeout(function () {
        var chip = document.querySelector('.sample-chip[data-sample="' + scenario.sample + '"]');
        if (chip) chip.click();
      }, 350);
    }
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-demo-filter') || 'all');
    });
  });

  gridEl.addEventListener('click', function (ev) {
    var btn = ev.target.closest('.demo-scenario-try');
    if (!btn) return;
    handleTryScenario(btn.getAttribute('data-scenario-id'));
  });

  renderCards();
  applyFilter('all');

  window.DemoScenarios = {
    scenarios: DEMO_SCENARIOS,
    setFilter: applyFilter,
    tryScenario: handleTryScenario,
  };
})();
