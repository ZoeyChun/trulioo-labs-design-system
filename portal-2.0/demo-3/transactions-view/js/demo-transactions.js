/* Demo 3 — Transactions table data.

   This portal is the KYB product, so the table lists business verifications
   only, across the three business products: Business Essentials, Business
   Insights and Business Complete. It replaces the shared demo dataset
   (pages/user-testing/transaction-history/transaction-history-data.js, which
   other pages still use) for Demo 3 — load it right after that file.

   The two Apex rows reuse the transaction ids of the KYB landing's recent
   transactions, so the same checks appear in both places. */
window.UT_TRANSACTIONS = [
  {
    "name": "Northwind Traders Ltd",
    "trid": "7bebf297-b8a5-5964-ba0b-ea937fcbc37b",
    "detail": "Registry, UBOs and sanctions clear",
    "outcome": {
      "label": "Verified",
      "tone": "positive"
    },
    "date": "16 Mar 2026, 10:42",
    "dateNumeric": "03/16/2026, 10:42",
    "dateDay": "16 Mar 2026",
    "dateTime": "10:42",
    "product": "Business Complete",
    "country": "United Kingdom",
    "countryCode": "gb",
    "score": {
      "value": "12/100",
      "label": "Low Risk",
      "tone": "positive"
    },
    "source": "API",
    "type": "Live"
  },
  {
    "name": "Kestrel Freight GmbH",
    "trid": "0759b082-ed37-506b-966d-fd4b42dbcdcf",
    "detail": "Adverse media to review",
    "outcome": {
      "label": "Review",
      "tone": "intermediate"
    },
    "date": "15 Mar 2026, 16:05",
    "dateNumeric": "03/15/2026, 16:05",
    "dateDay": "15 Mar 2026",
    "dateTime": "16:05",
    "product": "Business Insights",
    "country": "Germany",
    "countryCode": "de",
    "score": {
      "value": "54/100",
      "label": "Medium Risk",
      "tone": "intermediate"
    },
    "source": "Portal",
    "type": "Live"
  },
  {
    "name": "Lumen Health Partners",
    "trid": "15ae2ec1-9ce9-5e0a-b4a7-ac980e47ffec",
    "detail": "Registry match confirmed",
    "outcome": {
      "label": "Verified",
      "tone": "positive"
    },
    "date": "15 Mar 2026, 09:20",
    "dateNumeric": "03/15/2026, 09:20",
    "dateDay": "15 Mar 2026",
    "dateTime": "09:20",
    "product": "Business Essentials",
    "country": "United States",
    "countryCode": "us",
    "score": null,
    "source": "Portal",
    "type": "Live"
  },
  {
    "name": "Harbor Point Capital LLC",
    "trid": "8f70dde0-955d-57ba-8855-170e93040c3f",
    "detail": "Ownership could not be confirmed",
    "outcome": {
      "label": "Not Verified",
      "tone": "negative"
    },
    "date": "14 Mar 2026, 14:31",
    "dateNumeric": "03/14/2026, 14:31",
    "dateDay": "14 Mar 2026",
    "dateTime": "14:31",
    "product": "Business Complete",
    "country": "United States",
    "countryCode": "us",
    "score": {
      "value": "81/100",
      "label": "High Risk",
      "tone": "negative"
    },
    "source": "API",
    "type": "Live"
  },
  {
    "name": "Sakura Robotics KK",
    "trid": "f9af70b3-1526-5c4a-bc86-20b08bb31a24",
    "detail": "Registry and financials matched",
    "outcome": {
      "label": "Verified",
      "tone": "positive"
    },
    "date": "14 Mar 2026, 11:12",
    "dateNumeric": "03/14/2026, 11:12",
    "dateDay": "14 Mar 2026",
    "dateTime": "11:12",
    "product": "Business Insights",
    "country": "Japan",
    "countryCode": "jp",
    "score": {
      "value": "22/100",
      "label": "Low Risk",
      "tone": "positive"
    },
    "source": "API",
    "type": "Live"
  },
  {
    "name": "Meridian Capital LLC",
    "trid": "bb74413f-2802-5c2a-a877-bbc373e47290",
    "detail": "Registry match, no sanctions hits",
    "outcome": {
      "label": "Verified",
      "tone": "positive"
    },
    "date": "13 Mar 2026, 15:48",
    "dateNumeric": "03/13/2026, 15:48",
    "dateDay": "13 Mar 2026",
    "dateTime": "15:48",
    "product": "Business Complete",
    "country": "United States",
    "countryCode": "us",
    "score": {
      "value": "9/100",
      "label": "Low Risk",
      "tone": "positive"
    },
    "source": "Portal",
    "type": "Live"
  },
  {
    "name": "Blue Fjord Shipping AS",
    "trid": "707a288a-6bb9-5793-a85a-d097aaf72cdc",
    "detail": "Awaiting registry response",
    "statusIcon": "in-progress",
    "outcome": {
      "label": "In Progress",
      "tone": "signals-intermediate"
    },
    "date": "13 Mar 2026, 10:02",
    "dateNumeric": "03/13/2026, 10:02",
    "dateDay": "13 Mar 2026",
    "dateTime": "10:02",
    "product": "Business Essentials",
    "country": "Norway",
    "countryCode": "no",
    "score": null,
    "source": "API",
    "type": "Live"
  },
  {
    "name": "Apex Nordic Logistics AB",
    "trid": "a7bc12e4-91f0-4c2d-8e55-3b1d9a0f6c28",
    "detail": "Registry matched, ownership parsed",
    "outcome": {
      "label": "Verified",
      "tone": "positive"
    },
    "date": "12 Mar 2026, 09:00",
    "dateNumeric": "03/12/2026, 09:00",
    "dateDay": "12 Mar 2026",
    "dateTime": "09:00",
    "product": "Business Insights",
    "country": "Sweden",
    "countryCode": "se",
    "score": null,
    "source": "Portal",
    "type": "Live"
  },
  {
    "name": "Apex Dynamics LLC",
    "trid": "c4e81a92-3b70-4f1e-9d26-8a5c0e1b47d3",
    "detail": "Registered address mismatch",
    "outcome": {
      "label": "Not Verified",
      "tone": "negative"
    },
    "date": "12 Mar 2026, 09:00",
    "dateNumeric": "03/12/2026, 09:00",
    "dateDay": "12 Mar 2026",
    "dateTime": "09:00",
    "product": "Business Essentials",
    "country": "United States",
    "countryCode": "us",
    "score": null,
    "source": "Portal",
    "type": "Live"
  },
  {
    "name": "Orchid Textiles Pvt Ltd",
    "trid": "3c3149ff-b7b1-5169-81ff-04712a2198e1",
    "detail": "Manual review required",
    "outcome": {
      "label": "Review",
      "tone": "intermediate"
    },
    "date": "11 Mar 2026, 17:20",
    "dateNumeric": "03/11/2026, 17:20",
    "dateDay": "11 Mar 2026",
    "dateTime": "17:20",
    "product": "Business Essentials",
    "country": "India",
    "countryCode": "in",
    "score": null,
    "source": "Workflow",
    "type": "Live"
  },
  {
    "name": "Cobalt Analytics Inc.",
    "trid": "8ae9f1fe-9ad9-5ec0-92ca-bb3975ea7f2e",
    "detail": "UBO screening complete",
    "outcome": {
      "label": "Verified",
      "tone": "positive"
    },
    "date": "11 Mar 2026, 12:09",
    "dateNumeric": "03/11/2026, 12:09",
    "dateDay": "11 Mar 2026",
    "dateTime": "12:09",
    "product": "Business Complete",
    "country": "Canada",
    "countryCode": "ca",
    "score": {
      "value": "47/100",
      "label": "Medium Risk",
      "tone": "intermediate"
    },
    "source": "API",
    "type": "Live"
  },
  {
    "name": "Meridian Apex Consulting Ltd.",
    "trid": "8e9c61ed-0c66-5df4-9c56-25cfd39b756f",
    "detail": "Adverse media flagged",
    "outcome": {
      "label": "Review",
      "tone": "intermediate"
    },
    "date": "10 Mar 2026, 10:55",
    "dateNumeric": "03/10/2026, 10:55",
    "dateDay": "10 Mar 2026",
    "dateTime": "10:55",
    "product": "Business Insights",
    "country": "United Kingdom",
    "countryCode": "gb",
    "score": {
      "value": "58/100",
      "label": "Medium Risk",
      "tone": "intermediate"
    },
    "source": "Portal",
    "type": "Demo"
  },
  {
    "name": "Sunrise Retail Group",
    "trid": "facf9197-14a7-5bdd-8d93-edad7e5261f8",
    "detail": "Search not completed",
    "statusIcon": "abandoned",
    "outcome": {
      "label": "Abandoned",
      "tone": "signals"
    },
    "date": "09 Mar 2026, 13:40",
    "dateNumeric": "03/09/2026, 13:40",
    "dateDay": "09 Mar 2026",
    "dateTime": "13:40",
    "product": "Business Essentials",
    "country": "Australia",
    "countryCode": "au",
    "score": null,
    "source": "API",
    "type": "Live"
  },
  {
    "name": "Vanguard Global Shipping",
    "trid": "3cc29889-af40-50c9-9f1b-ec1bf71b48b9",
    "detail": "Sanctions screening hit",
    "outcome": {
      "label": "Not Verified",
      "tone": "negative"
    },
    "date": "08 Mar 2026, 10:15",
    "dateNumeric": "03/08/2026, 10:15",
    "dateDay": "08 Mar 2026",
    "dateTime": "10:15",
    "product": "Business Complete",
    "country": "Singapore",
    "countryCode": "sg",
    "score": {
      "value": "78/100",
      "label": "High Risk",
      "tone": "negative"
    },
    "source": "API",
    "type": "Live"
  },
  {
    "name": "Aurora Pharma BV",
    "trid": "2bb227cc-eefb-5787-956f-486237a0c986",
    "detail": "Registry and ownership matched",
    "outcome": {
      "label": "Verified",
      "tone": "positive"
    },
    "date": "06 Mar 2026, 14:02",
    "dateNumeric": "03/06/2026, 14:02",
    "dateDay": "06 Mar 2026",
    "dateTime": "14:02",
    "product": "Business Insights",
    "country": "Netherlands",
    "countryCode": "nl",
    "score": {
      "value": "18/100",
      "label": "Low Risk",
      "tone": "positive"
    },
    "source": "Portal",
    "type": "Live"
  },
  {
    "name": "Delta Ventures Ltda",
    "trid": "84fa0141-8e85-5bb0-a6c9-fd632c48fcca",
    "detail": "Awaiting analyst review",
    "outcome": {
      "label": "Pending Review",
      "tone": "intermediate"
    },
    "date": "05 Mar 2026, 11:30",
    "dateNumeric": "03/05/2026, 11:30",
    "dateDay": "05 Mar 2026",
    "dateTime": "11:30",
    "product": "Business Essentials",
    "country": "Brazil",
    "countryCode": "br",
    "score": null,
    "source": "Workflow",
    "type": "Demo"
  }
];
