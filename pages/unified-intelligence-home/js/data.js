var countries = [
  { flag:'🇺🇸', name:'United States', code:'US' },
  { flag:'🇬🇧', name:'United Kingdom', code:'GB' },
  { flag:'🇨🇦', name:'Canada', code:'CA' },
  { flag:'🇸🇬', name:'Singapore', code:'SG' },
  { flag:'🇦🇺', name:'Australia', code:'AU' },
  { flag:'🇩🇪', name:'Germany', code:'DE' },
  { flag:'🇳🇱', name:'Netherlands', code:'NL' },
];

var allCompanies = [
  { name:'Meridian Apex Consulting Ltd.', brn:'US-4892-LLC', address1:'71 Queen Victoria St', city:'San Francisco', state:'CA', postal:'94107', countryCode:'US', flag:'🇺🇸', country:'United States' },
  { name:'Pacific Ridge Financial Inc.', brn:'US-7731-INC', address1:'200 California St', city:'San Francisco', state:'CA', postal:'94111', countryCode:'US', flag:'🇺🇸', country:'United States' },
  { name:'Northgate Capital Group LLC', brn:'US-3341-LLC', address1:'350 Madison Ave', city:'New York', state:'NY', postal:'10017', countryCode:'US', flag:'🇺🇸', country:'United States' },
  { name:'Crown Bridge Advisory Ltd.', brn:'GB-0019283', address1:'14 Bishopsgate', city:'London', state:'England', postal:'EC2N 3AR', countryCode:'GB', flag:'🇬🇧', country:'United Kingdom' },
  { name:'Thornfield Asset Management Ltd.', brn:'GB-0037841', address1:'30 St Mary Axe', city:'London', state:'England', postal:'EC3A 8EP', countryCode:'GB', flag:'🇬🇧', country:'United Kingdom' },
  { name:'Maple Leaf Holdings Inc.', brn:'CA-8823-INC', address1:'100 King St W', city:'Toronto', state:'ON', postal:'M5X 1A9', countryCode:'CA', flag:'🇨🇦', country:'Canada' },
  { name:'Northern Reach Ventures Ltd.', brn:'CA-4491-LTD', address1:'1055 W Georgia St', city:'Vancouver', state:'BC', postal:'V6E 3P3', countryCode:'CA', flag:'🇨🇦', country:'Canada' },
  { name:'Raffles Bridge Capital Pte Ltd.', brn:'202301234K', address1:'1 Raffles Quay', city:'Singapore', state:'Singapore', postal:'048583', countryCode:'SG', flag:'🇸🇬', country:'Singapore' },
  { name:'Straits Compliance Group Pte Ltd.', brn:'201987654W', address1:'6 Battery Road', city:'Singapore', state:'Singapore', postal:'049909', countryCode:'SG', flag:'🇸🇬', country:'Singapore' },
  { name:'Southern Cross Finance Ltd.', brn:'AU-6612-PTY', address1:'1 Martin Place', city:'Sydney', state:'NSW', postal:'2000', countryCode:'AU', flag:'🇦🇺', country:'Australia' },
  { name:'Berliner Kapital GmbH', brn:'DE-HRB-12345', address1:'Unter den Linden 10', city:'Berlin', state:'Berlin', postal:'10117', countryCode:'DE', flag:'🇩🇪', country:'Germany' },
  { name:'Amsterdam Trade Holdings BV', brn:'NL-KVK-88234', address1:'Herengracht 420', city:'Amsterdam', state:'Noord-Holland', postal:'1017 BZ', countryCode:'NL', flag:'🇳🇱', country:'Netherlands' },
  { name:'Brightline Services Inc.', brn:'US-5520-INC', address1:'480 Mission St', city:'San Francisco', state:'CA', postal:'94105', countryCode:'US', flag:'🇺🇸', country:'United States', sampleKey:'standard' },
  { name:'Helix Tier Global Holdings Ltd.', brn:'GB-0084721', address1:'25 Canada Square', city:'London', state:'England', postal:'E14 5LQ', countryCode:'GB', flag:'🇬🇧', country:'United Kingdom', sampleKey:'complex' },
  { name:'Vantage Gate Trading Pte Ltd.', brn:'202411887M', address1:'8 Marina View', city:'Singapore', state:'Singapore', postal:'018960', countryCode:'SG', flag:'🇸🇬', country:'Singapore', sampleKey:'elevated' },
];

var cosByCountry = {};
allCompanies.forEach(function(c) {
  if (!cosByCountry[c.countryCode]) cosByCountry[c.countryCode] = [];
  cosByCountry[c.countryCode].push(c);
});

var assessmentFeatures = [
  'Horizon Risk Score',
  'Ownership analysis',
  'AML risk evaluation',
  'Deep research',
  'Ongoing monitoring',
];

var assessmentBasedOn = [
  'International operations',
  'Complex ownership structure',
];

var sampleEntities = {
  standard: {
    plan: {
      introMessage: 'Clean US registry records and straightforward ownership. I\'ve prepared a standard verification with baseline risk scoring.',
      estimatedTime: '28s',
      features: [
        'Horizon Risk Score',
        'Registry confirmation',
        'Document verification match',
      ],
      basedOn: [
        'Standard onboarding profile',
        'Single-jurisdiction registration',
        'No adverse signals detected',
      ],
    },
  },
  complex: {
    plan: {
      introMessage: 'Nested corporate layers and cross-border subsidiaries detected. I\'ve prepared enhanced ownership tracing and structure analysis.',
      estimatedTime: '54s',
      features: [
        'Ownership analysis',
        'UBO mapping',
        'Cross-border structure review',
        'Deep research',
        'Beneficial owner screening',
      ],
      basedOn: [
        'Multi-layer ownership structure',
        'Offshore subsidiary links',
        'Multi-jurisdiction footprint',
      ],
    },
  },
  elevated: {
    plan: {
      introMessage: 'Elevated AML signals and adverse media indicators surfaced. I\'ve prepared enhanced screening and ongoing monitoring.',
      estimatedTime: '46s',
      features: [
        'AML risk evaluation',
        'Adverse media screening',
        'Sanctions & PEP screening',
        'Horizon Risk Score',
        'Ongoing monitoring',
      ],
      basedOn: [
        'Elevated risk signals',
        'Adverse media indicators',
        'High-risk jurisdiction exposure',
      ],
    },
  },
};

function resolvePageUrl(relativeUrl, githubUrl) {
  if (typeof window === 'undefined') return githubUrl;
  if (window.location.protocol === 'file:') return relativeUrl;

  try {
    return new URL(relativeUrl, window.location.href).href;
  } catch (e) {
    return githubUrl;
  }
}

var kybResultsUrl = resolvePageUrl(
  '../KYB Results/index.html',
  'https://zoeychun.github.io/trulioo-labs-design-system/pages/KYB%20Results/index.html'
);

var personServiceUrls = {
  'document-verification': resolvePageUrl(
    '../document-verification/index.html',
    'https://zoeychun.github.io/trulioo-labs-design-system/pages/document-verification/index.html'
  ),
  'bank-verification': resolvePageUrl(
    '../bank-verification/index.html',
    'https://zoeychun.github.io/trulioo-labs-design-system/pages/bank-verification/index.html'
  ),
};

var kybHomeUrl = (function () {
  if (typeof window === 'undefined') return 'index.html';

  try {
    return new URL('index.html', window.location.href).href;
  } catch (e) {
    return 'index.html';
  }
})();
