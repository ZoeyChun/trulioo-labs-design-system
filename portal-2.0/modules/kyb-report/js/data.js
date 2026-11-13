/* Meridian Capital LLC sample — self-contained (no demo-3 runtime). */
(function (global) {
  "use strict";

  var MERIDIAN = {
    id: "us-cap",
    name: "Meridian Capital LLC",
    country: "United States",
    cc: "US",
    city: "New York, NY",
    addr: "200 Vesey Street, New York, NY 10281",
    reg: "NY DOS 4417762",
    status: "Active",
    verifyStatus: "Verified",
    riskLevel: "high",
    ownership: [
      {
        name: "James Morton",
        type: "person",
        role: "COO",
        pct: "65%",
        flagged: true,
        note: "No national ID"
      },
      {
        name: "Steven",
        type: "person",
        role: "Shareholder",
        pct: "35%",
        flagged: true,
        note: "No national ID"
      }
    ],
    risks: [
      {
        id: "shell",
        label: "Shell / holding profile",
        severity: "high",
        evidence: "0 employees; $0 revenue."
      },
      {
        id: "ubo",
        label: "Unverified UBO",
        severity: "high",
        evidence: "No national ID for either officer."
      }
    ],
    alerts: {
      adverseMedia: "None found",
      sanctions: "None found",
      litigation: "None found",
      positivePress: "None found"
    },
    matchSignals: {
      verified: false,
      rule: "Verification Rule: KYB Standard: 1 Records Match (BRN)",
      metrics: { fields: "9 fields", sources: "4 of 7 datasources" },
      rows: [
        {
          id: "business-name",
          field: "Business Name",
          input: "Meridian Capital LLC",
          status: "no-match",
          sources: "1/4 matched",
          sourceRows: [
            { name: "Business Documents 323100", status: "no-match" },
            {
              name: "Business Insights 344568",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Business Name", value: "Meridian Capital LLC" },
                    { label: "Business Registration Number", value: "NY DOS 4417762" },
                    { label: "Tax ID Number", value: "13-4417762" },
                    { label: "DUNS Number", value: "084421903" },
                    { label: "Jurisdiction of Incorporation", value: "New York" }
                  ]
                },
                {
                  title: "Address 1",
                  fields: [
                    { label: "Address Line 1", value: "200 Vesey Street" },
                    { label: "Building Number", value: "200" },
                    { label: "Street Name", value: "Vesey" },
                    { label: "Street Type", value: "Street" },
                    { label: "City", value: "New York" },
                    { label: "State Province", value: "New York" },
                    { label: "Postal Code", value: "10281" }
                  ]
                }
              ]
            },
            { name: "Business Insights 773174", status: "no-match" },
            { name: "Ownership Tree 480052", status: "no-match" }
          ]
        },
        {
          id: "tax-id",
          field: "Tax ID Number",
          input: "13-4417762",
          status: "match",
          sources: "2/4 matched",
          sourceRows: [
            { name: "Business Documents 323100", status: "missing" },
            {
              name: "Business Insights 344568",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Business Name", value: "Meridian Capital LLC" },
                    { label: "Tax ID Number", value: "13-4417762" },
                    { label: "DUNS Number", value: "084421903" },
                    { label: "Business Registration Number", value: "NY DOS 4417762" },
                    { label: "Jurisdiction of Incorporation", value: "New York" }
                  ]
                }
              ]
            },
            {
              name: "Business Insights 773174",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Tax ID Number", value: "13-4417762" },
                    { label: "Business Name", value: "Meridian Capital LLC" }
                  ]
                }
              ]
            },
            { name: "Ownership Tree 480052", status: "missing" }
          ]
        },
        {
          id: "duns",
          field: "DUNS Number",
          input: "084421903",
          status: "match",
          sources: "2/4 matched",
          sourceRows: [
            { name: "Business Documents 323100", status: "missing" },
            {
              name: "Business Insights 344568",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "DUNS Number", value: "084421903" },
                    { label: "Business Name", value: "Meridian Capital LLC" },
                    { label: "Business Registration Number", value: "NY DOS 4417762" }
                  ]
                }
              ]
            },
            {
              name: "Business Insights 773174",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [{ label: "DUNS Number", value: "084421903" }]
                }
              ]
            },
            { name: "Ownership Tree 480052", status: "no-match" }
          ]
        },
        {
          id: "brn",
          field: "Business Registration Number",
          input: "NY DOS 4417762",
          status: "match",
          sources: "3/4 matched",
          sourceRows: [
            {
              name: "Business Documents 323100",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Business Registration Number", value: "NY DOS 4417762" },
                    { label: "Business Name", value: "Meridian Capital LLC" },
                    { label: "Jurisdiction of Incorporation", value: "New York" }
                  ]
                }
              ]
            },
            {
              name: "Business Insights 344568",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Business Registration Number", value: "NY DOS 4417762" },
                    { label: "Tax ID Number", value: "13-4417762" },
                    { label: "DUNS Number", value: "084421903" }
                  ]
                }
              ]
            },
            {
              name: "Business Insights 773174",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Business Registration Number", value: "NY DOS 4417762" }
                  ]
                }
              ]
            },
            { name: "Ownership Tree 480052", status: "missing" }
          ]
        },
        {
          id: "jurisdiction",
          field: "Jurisdiction of Incorporation",
          input: "New York",
          status: "match",
          sources: "3/4 matched",
          sourceRows: [
            { name: "Business Documents 323100", status: "missing" },
            {
              name: "Business Insights 344568",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Jurisdiction of Incorporation", value: "New York" },
                    { label: "Business Name", value: "Meridian Capital LLC" },
                    { label: "Date of Incorporation", value: "14 Jun 2013" }
                  ]
                },
                {
                  title: "Address 1",
                  fields: [
                    { label: "Address Line 1", value: "200 Vesey Street" },
                    { label: "City", value: "New York" },
                    { label: "State Province", value: "New York" },
                    { label: "Postal Code", value: "10281" }
                  ]
                }
              ]
            },
            {
              name: "Business Insights 773174",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Jurisdiction of Incorporation", value: "New York" }
                  ]
                }
              ]
            },
            {
              name: "Ownership Tree 480052",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Jurisdiction of Incorporation", value: "New York" },
                    { label: "Business Name", value: "Meridian Capital LLC" }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "date-of-incorporation",
          field: "Date of Incorporation",
          input: "14 Jun 2013",
          status: "match",
          sources: "2/4 matched",
          sourceRows: [
            { name: "Business Documents 323100", status: "missing" },
            {
              name: "Business Insights 344568",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [
                    { label: "Date of Incorporation", value: "14 Jun 2013" },
                    { label: "Jurisdiction of Incorporation", value: "New York" },
                    { label: "Business Name", value: "Meridian Capital LLC" }
                  ]
                }
              ]
            },
            {
              name: "Business Insights 773174",
              status: "match",
              sections: [
                {
                  title: "Basic Information",
                  fields: [{ label: "Date of Incorporation", value: "14 Jun 2013" }]
                }
              ]
            },
            { name: "Ownership Tree 480052", status: "missing" }
          ]
        },
        {
          id: "street-name",
          field: "Street Name",
          input: "Vesey",
          status: "derived",
          sources: "Derived from Address Line 1",
          sourceRows: [
            { name: "Business Documents 323100", status: "missing" },
            {
              name: "Business Insights 344568",
              status: "derived",
              sections: [
                {
                  title: "Address 1",
                  fields: [
                    { label: "Address Line 1", value: "200 Vesey Street" },
                    { label: "Street Name", value: "Vesey" },
                    { label: "Street Type", value: "Street" }
                  ]
                }
              ]
            },
            { name: "Business Insights 773174", status: "derived" },
            { name: "Ownership Tree 480052", status: "missing" }
          ]
        },
        {
          id: "city",
          field: "City",
          input: "New York",
          status: "no-match",
          sources: "0/4 matched",
          sourceRows: [
            { name: "Business Documents 323100", status: "no-match" },
            { name: "Business Insights 344568", status: "no-match" },
            { name: "Business Insights 773174", status: "no-match" },
            { name: "Ownership Tree 480052", status: "no-match" }
          ]
        },
        {
          id: "state-province",
          field: "State Province",
          input: "NY",
          status: "match",
          sources: "3/4 matched",
          sourceRows: [
            { name: "Business Documents 323100", status: "missing" },
            {
              name: "Business Insights 344568",
              status: "match",
              sections: [
                {
                  title: "Address 1",
                  fields: [
                    { label: "Address Line 1", value: "200 Vesey Street" },
                    { label: "Building Number", value: "200" },
                    { label: "Street Name", value: "Vesey" },
                    { label: "Street Type", value: "Street" },
                    { label: "City", value: "New York" },
                    { label: "State Province", value: "New York" },
                    { label: "Postal Code", value: "10281" }
                  ]
                }
              ]
            },
            {
              name: "Business Insights 773174",
              status: "match",
              sections: [
                {
                  title: "Address 1",
                  fields: [
                    { label: "State Province", value: "New York" },
                    { label: "City", value: "New York" }
                  ]
                }
              ]
            },
            {
              name: "Ownership Tree 480052",
              status: "match",
              sections: [
                {
                  title: "Address 1",
                  fields: [{ label: "State Province", value: "New York" }]
                }
              ]
            }
          ]
        }
      ]
    },
    report: {
      industry: "Securities and investment activities (NAICS 523930)",
      industryNote: "Registered investment firm with an active New York DOS filing.",
      regDate: "Incorporated 2013 (New York)",
      legalForm: "Limited liability company",
      address: "200 Vesey Street, New York, NY 10281",
      sizing: "0 employees; $0 reported revenue.",
      regNumber: "NY DOS 4417762",
      taxId: "EIN 13-4417762",
      phone: "+1 (212) 946-2100",
      email: "compliance@meridiancapital.example",
      sumA:
        "Meridian Capital LLC matched an active New York DOS filing, but ownership and financial signals still require manual review."
    }
  };

  function resolve(overrides) {
    var out = Object.assign({}, MERIDIAN, overrides || {});
    if (overrides && overrides.report) {
      out.report = Object.assign({}, MERIDIAN.report, overrides.report);
    }
    return out;
  }

  global.KybReportData = {
    meridian: MERIDIAN,
    resolve: resolve
  };
})(typeof window !== "undefined" ? window : globalThis);
