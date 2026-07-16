/* Bank Verification — shared session + result config (form + result pages) */

(function (global) {
  "use strict";

  var SESSION_KEY = "bv-session";

  var PERSON_COUNTRIES = {
    "Argentina": { code: "AR", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "BankAccountNumber", routingField: null, requiresNationalId: false },
    "Australia": { code: "AU", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: false },
    "Brazil": { code: "BR", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "IBAN", routingField: null, requiresNationalId: true },
    "Chile": { code: "CL", nameSchema: "surname", optionalNameFields: ["MiddleName", "SecondSurname"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: true },
    "China": { code: "CN", nameSchema: "china", optionalNameFields: [], accountIdentifier: "BankAccountNumber", routingField: null, requiresNationalId: false },
    "Colombia": { code: "CO", nameSchema: "surname", optionalNameFields: ["MiddleName", "SecondSurname"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: true },
    "Ecuador": { code: "EC", nameSchema: "surname", optionalNameFields: ["MiddleName", "SecondSurname"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: true },
    "Egypt": { code: "EG", nameSchema: "logicOnly", optionalNameFields: [], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "France": { code: "FR", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "Germany": { code: "DE", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "Ghana": { code: "GH", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "India": { code: "IN", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: false },
    "Indonesia": { code: "ID", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "Italy": { code: "IT", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "Malaysia": { code: "MY", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "Mexico": { code: "MX", nameSchema: "surname", optionalNameFields: ["MiddleName", "SecondSurname"], accountIdentifier: "BankAccountNumber", routingField: null, requiresNationalId: false },
    "Nepal": { code: "NP", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "Netherlands": { code: "NL", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "Nigeria": { code: "NG", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "Norway": { code: "NO", nameSchema: "logicOnly", optionalNameFields: [], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "Pakistan": { code: "PK", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "Peru": { code: "PE", nameSchema: "surname", optionalNameFields: ["SecondSurname"], accountIdentifier: "BankAccountNumber", routingField: null, requiresNationalId: false },
    "Philippines": { code: "PH", nameSchema: "logicOnly", optionalNameFields: [], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "Saudi Arabia": { code: "SA", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "IBAN", routingField: null, requiresNationalId: true },
    "South Africa": { code: "ZA", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: false },
    "South Korea": { code: "KR", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: false },
    "Spain": { code: "ES", nameSchema: "surname", optionalNameFields: ["SecondSurname"], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "Thailand": { code: "TH", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "Turkey": { code: "TR", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "UAE": { code: "AE", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "IBAN", routingField: null, requiresNationalId: false },
    "Uganda": { code: "UG", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "United Kingdom": { code: "GB", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: false },
    "United States": { code: "US", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "ClearingSystemID", requiresNationalId: false },
    "Uruguay": { code: "UY", nameSchema: "standard", optionalNameFields: [], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false },
    "Vietnam": { code: "VN", nameSchema: "standard", optionalNameFields: ["MiddleName"], accountIdentifier: "BankAccountNumber", routingField: "BIC", requiresNationalId: false }
  };

  var BUSINESS_VARIANT_GROUPS = {
    pureIban: {
      requiredFields: ["BusinessName", "IBAN"],
      optionalFields: ["BusinessRegistrationNumber", "TaxIDNumber"]
    },
    pureIbanLogicOnly: {
      requiredFields: ["BusinessName", "IBAN"],
      optionalFields: ["BusinessRegistrationNumber", "TaxIDNumber"]
    },
    accountBic: {
      requiredFields: ["BusinessName", "BankAccountNumber", "BIC"],
      optionalFields: []
    },
    accountClearing: {
      requiredFields: ["BusinessName", "BankAccountNumber", "ClearingSystemID"],
      optionalFields: ["BIC"]
    },
    latinAmericaLocal: {
      requiredFields: ["BusinessName", "BankAccountNumber"],
      optionalFields: ["BusinessRegistrationNumber", "TaxIDNumber", "BIC", "ClearingSystemID"]
    },
    latinAmericaStrictId: {
      requiredFields: ["BusinessName", "BankAccountNumber"],
      optionalFields: ["BusinessRegistrationNumber", "TaxIDNumber", "BIC", "ClearingSystemID"],
      conditionalRequired: ["BusinessRegistrationNumber", "TaxIDNumber"]
    },
    strictIdentification: {
      requiredFields: ["BusinessName", "IBAN"],
      optionalFields: ["BusinessRegistrationNumber", "TaxIDNumber", "BankAccountNumber"],
      conditionalRequired: ["BusinessRegistrationNumber", "TaxIDNumber"]
    },
    chinaBusiness: {
      requiredFields: ["BusinessName", "BankAccountNumber", "BIC", "ClearingSystemID"],
      optionalFields: ["BusinessRegistrationNumber", "TaxIDNumber", "IBAN"]
    },
    ibanOrOther: {
      requiredFields: ["BusinessName"],
      optionalFields: ["IBAN", "BankAccountNumber", "BIC", "ClearingSystemID"],
      conditionalPaths: true
    }
  };

  var BUSINESS_COUNTRIES = {
    "Germany": { code: "DE", variantGroup: "pureIban" },
    "France": { code: "FR", variantGroup: "pureIban" },
    "Italy": { code: "IT", variantGroup: "pureIban" },
    "Netherlands": { code: "NL", variantGroup: "pureIban" },
    "Belgium": { code: "BE", variantGroup: "pureIban" },
    "Spain": { code: "ES", variantGroup: "pureIban" },
    "Portugal": { code: "PT", variantGroup: "pureIban" },
    "Austria": { code: "AT", variantGroup: "pureIban" },
    "Cyprus": { code: "CY", variantGroup: "pureIban" },
    "Croatia": { code: "HR", variantGroup: "pureIban" },
    "Estonia": { code: "EE", variantGroup: "pureIban" },
    "Finland": { code: "FI", variantGroup: "pureIban" },
    "Greece": { code: "GR", variantGroup: "pureIban" },
    "Ireland": { code: "IE", variantGroup: "pureIban" },
    "Latvia": { code: "LV", variantGroup: "pureIban" },
    "Lithuania": { code: "LT", variantGroup: "pureIban" },
    "Luxembourg": { code: "LU", variantGroup: "pureIban" },
    "Malta": { code: "MT", variantGroup: "pureIban" },
    "Slovakia": { code: "SK", variantGroup: "pureIban" },
    "Slovenia": { code: "SI", variantGroup: "pureIban" },
    "Bulgaria": { code: "BG", variantGroup: "pureIban" },
    "Turkey": { code: "TR", variantGroup: "pureIban" },
    "UAE": { code: "AE", variantGroup: "pureIban" },
    "Philippines": { code: "PH", variantGroup: "pureIbanLogicOnly" },
    "Norway": { code: "NO", variantGroup: "pureIbanLogicOnly" },
    "Egypt": { code: "EG", variantGroup: "pureIbanLogicOnly" },
    "Indonesia": { code: "ID", variantGroup: "accountBic", optionalFields: ["BusinessRegistrationNumber", "TaxIDNumber"] },
    "Vietnam": { code: "VN", variantGroup: "accountBic" },
    "Nigeria": { code: "NG", variantGroup: "accountBic" },
    "Nepal": { code: "NP", variantGroup: "accountBic" },
    "South Korea": { code: "KR", variantGroup: "accountBic" },
    "Malaysia": { code: "MY", variantGroup: "accountBic" },
    "Thailand": { code: "TH", variantGroup: "accountBic" },
    "Ghana": { code: "GH", variantGroup: "accountBic" },
    "Uganda": { code: "UG", variantGroup: "accountBic" },
    "United States": { code: "US", variantGroup: "accountClearing" },
    "India": { code: "IN", variantGroup: "accountClearing" },
    "Australia": { code: "AU", variantGroup: "accountClearing" },
    "South Africa": { code: "ZA", variantGroup: "accountClearing" },
    "Mexico": { code: "MX", variantGroup: "latinAmericaLocal" },
    "Argentina": { code: "AR", variantGroup: "latinAmericaLocal" },
    "Uruguay": { code: "UY", variantGroup: "latinAmericaLocal" },
    "Peru": { code: "PE", variantGroup: "latinAmericaLocal" },
    "Chile": { code: "CL", variantGroup: "latinAmericaStrictId" },
    "Colombia": { code: "CO", variantGroup: "latinAmericaStrictId" },
    "Ecuador": { code: "EC", variantGroup: "latinAmericaStrictId" },
    "Brazil": { code: "BR", variantGroup: "strictIdentification" },
    "Saudi Arabia": { code: "SA", variantGroup: "strictIdentification" },
    "China": { code: "CN", variantGroup: "chinaBusiness" },
    "Pakistan": { code: "PK", variantGroup: "ibanOrOther" },
    "United Kingdom": { code: "GB", variantGroup: "ibanOrOther" }
  };

  var COUNTRY_META = {
    "Argentina": { flag: "🇦🇷" },
    "Australia": { flag: "🇦🇺" },
    "Austria": { flag: "🇦🇹" },
    "Belgium": { flag: "🇧🇪" },
    "Brazil": { flag: "🇧🇷" },
    "Bulgaria": { flag: "🇧🇬" },
    "Chile": { flag: "🇨🇱" },
    "China": { flag: "🇨🇳" },
    "Colombia": { flag: "🇨🇴" },
    "Croatia": { flag: "🇭🇷" },
    "Cyprus": { flag: "🇨🇾" },
    "Ecuador": { flag: "🇪🇨" },
    "Egypt": { flag: "🇪🇬" },
    "Estonia": { flag: "🇪🇪" },
    "Finland": { flag: "🇫🇮" },
    "France": { flag: "🇫🇷" },
    "Germany": { flag: "🇩🇪" },
    "Ghana": { flag: "🇬🇭" },
    "Greece": { flag: "🇬🇷" },
    "India": { flag: "🇮🇳" },
    "Indonesia": { flag: "🇮🇩" },
    "Ireland": { flag: "🇮🇪" },
    "Italy": { flag: "🇮🇹" },
    "Latvia": { flag: "🇱🇻" },
    "Lithuania": { flag: "🇱🇹" },
    "Luxembourg": { flag: "🇱🇺" },
    "Malaysia": { flag: "🇲🇾" },
    "Malta": { flag: "🇲🇹" },
    "Mexico": { flag: "🇲🇽" },
    "Nepal": { flag: "🇳🇵" },
    "Netherlands": { flag: "🇳🇱" },
    "Nigeria": { flag: "🇳🇬" },
    "Norway": { flag: "🇳🇴" },
    "Pakistan": { flag: "🇵🇰" },
    "Peru": { flag: "🇵🇪" },
    "Philippines": { flag: "🇵🇭" },
    "Portugal": { flag: "🇵🇹" },
    "Saudi Arabia": { flag: "🇸🇦" },
    "Slovakia": { flag: "🇸🇰" },
    "Slovenia": { flag: "🇸🇮" },
    "South Africa": { flag: "🇿🇦" },
    "South Korea": { flag: "🇰🇷" },
    "Spain": { flag: "🇪🇸" },
    "Thailand": { flag: "🇹🇭" },
    "Turkey": { flag: "🇹🇷" },
    "UAE": { flag: "🇦🇪" },
    "Uganda": { flag: "🇺🇬" },
    "United Kingdom": { flag: "🇬🇧" },
    "United States": { flag: "🇺🇸" },
    "Uruguay": { flag: "🇺🇾" },
    "Vietnam": { flag: "🇻🇳" }
  };

  var COUNTRY_RESULT_META = {
    "Brazil": { bank: "Banco do Brasil", currency: "BRL", code: "BR", city: "São Paulo", state: "SP" },
    "South Korea": { bank: "Kookmin Bank", currency: "KRW", code: "KR", city: "Seoul", state: "Seoul" },
    "Mexico": { bank: "Banco Nacional de México", currency: "MXN", code: "MX", city: "Mexico City", state: "CDMX" },
    "United States": { bank: "Bank of America", currency: "USD", code: "US", city: "San Francisco", state: "California" },
    "France": { bank: "BNP Paribas", currency: "EUR", code: "FR", city: "Paris", state: "Île-de-France" },
    "Spain": { bank: "CaixaBank", currency: "EUR", code: "ES", city: "Madrid", state: "Madrid" },
    "Germany": { bank: "Deutsche Bank", currency: "EUR", code: "DE", city: "Berlin", state: "Berlin" },
    "Belgium": { bank: "KBC Bank", currency: "EUR", code: "BE", city: "Brussels", state: "Brussels" },
    "India": { bank: "HDFC Bank", currency: "INR", code: "IN", city: "Mumbai", state: "Maharashtra" }
  };

  var TEST_ENTITIES = {
    person: [
      { name: "Creator Payout", country: "United States", match: "Strong Match", tone: "positive",
        description: "Verify a creator\u2019s payout account.",
        values: { "First Name": "Jordan", "Middle Name": "Lee", "Last Name": "Rivera", "Bank Account Number": "US021000021987", "Clearing System ID": "USABA" } },
      { name: "Marketplace Withdrawal", country: "Brazil", match: "Partial Match", tone: "intermediate",
        description: "Verify a marketplace withdrawal account.",
        values: { "First Name": "Maria", "Middle Name": "Aparecida", "Last Name": "Silva", "National ID Number": "529.982.247-25", "IBAN": "BR15 0000 0000 0001 0094 5432 1001 2345 6789 C1" } },
      { name: "Freelancer Payment", country: "Mexico", match: "Strong Match", tone: "positive",
        description: "Verify a freelancer\u2019s payout account.",
        values: { "First Name": "Ana", "Middle Name": "Maria", "First Surname": "Gutierrez", "Second Surname": "Lopez", "Bank Account Number": "012180001002345678901" } },
      { name: "Payroll Disbursement", country: "France", match: "Strong Match", tone: "positive",
        description: "Verify a payroll disbursement account.",
        values: { "First Name": "Pierre", "Last Name": "Dupont", "IBAN": "FR14 2004 1010 0505 0001 3M02 606" } },
      { name: "Gig Worker Payout", country: "South Korea", match: "Partial Match", tone: "intermediate",
        description: "Verify a gig worker\u2019s payout account.",
        values: { "First Name": "Min-jun", "Middle Name": "Woo", "Last Name": "Kim", "Bank Account Number": "110-123-456789", "Clearing System ID": "KRABA" } },
      { name: "Failed Verification", country: "Spain", match: "No Match", tone: "negative",
        description: "Unable to verify the identity or bank account.",
        values: { "First Name": "Ana", "First Surname": "García", "Second Surname": "López", "IBAN": "ES91 2100 0418 4502 0005 1332" } }
    ],
    business: [
      { name: "Supplier Payment", country: "Germany", match: "Strong Match", tone: "positive",
        description: "Verify a supplier\u2019s payout account.",
        values: { "Business Name": "Müller GmbH", "IBAN": "DE89 3704 0044 0532 0130 00", "Business Registration Number": "HRB 123456", "Tax ID Number": "DE123456789" } },
      { name: "Vendor Settlement", country: "Belgium", match: "Partial Match", tone: "intermediate",
        description: "Verify a vendor before settlement.",
        values: { "Business Name": "Bruxelles SA", "IBAN": "BE68 5390 0754 7034", "Business Registration Number": "BE 0123.456.789", "Tax ID Number": "BE0123456789" } },
      { name: "Enterprise Payout", country: "United States", match: "Strong Match", tone: "positive",
        description: "Verify a business payout account.",
        values: { "Business Name": "Acme Corp Ltd", "Bank Account Number": "778812340091", "Clearing System ID": "USABA" } },
      { name: "Marketplace Withdrawal", country: "Indonesia", match: "Partial Match", tone: "intermediate",
        description: "Verify a marketplace withdrawal account.",
        values: {
          "Business Name": "Nusantara Trading",
          "Bank Account Number": "0012345678901",
          "BIC": "BMRIIDJA",
          "Business Registration Number": "31.234.567.8-901.000",
          "Tax ID Number": "01.234.567.8-901.000"
        } },
      { name: "Payroll Disbursement", country: "Brazil", match: "Strong Match", tone: "positive",
        description: "Verify a payroll disbursement account.",
        values: { "Business Name": "TechBrasil Ltda", "IBAN": "BR15 0000 0000 0001 0094 5432 1001 2345 6789 C1", "Business Registration Number": "12.345.678/0001-90", "Tax ID Number": "12.345.678/0001-90", "Bank Account Number": "1234567890" } },
      { name: "Failed Verification", country: "South Korea", match: "No Match", tone: "negative",
        description: "Unable to verify the business or bank account.",
        values: { "Business Name": "Seoul Ventures", "Bank Account Number": "220-456-789012", "BIC": "CZNBKRSE" } }
    ]
  };

  var GENERIC_FIELDS = {
    person: ["Full Name", "Account Number", "IBAN", "BIC / SWIFT Code"],
    business: ["Business Name", "Account Number", "IBAN", "BIC / SWIFT Code"]
  };

  var NO_COUNTRY_FIELDS = {
    person: ["First Name", "Last Name", "Bank Account Number"],
    business: ["Business Name", "Bank Account Number"]
  };

  var FIELD_KEY_LABELS = {
    FirstName: "First Name",
    LastName: "Last Name",
    MiddleName: "Middle Name",
    FirstSurname: "First Surname",
    SecondSurname: "Second Surname",
    GivenNames: "Given Names",
    Surname: "Surname",
    BusinessName: "Business Name",
    BusinessRegistrationNumber: "Business Registration Number",
    TaxIDNumber: "Tax ID Number",
    BankAccountNumber: "Bank Account Number",
    IBAN: "IBAN",
    BIC: "BIC",
    ClearingSystemID: "Clearing System ID",
    NationalId: "National ID Number"
  };

  var NAME_FIELDS = [
    "Full Name", "Business Name",
    "First Name", "Last Name", "Middle Name",
    "First Surname", "Second Surname",
    "Given Names", "Surname"
  ];
  var ACCOUNT_FIELDS = ["Bank Account Number", "Account Number", "IBAN", "BIC", "BIC / SWIFT Code", "Clearing System ID"];

  function isNameField(fieldLabel) {
    return NAME_FIELDS.indexOf(fieldLabel) !== -1;
  }

  function isAccountField(fieldLabel) {
    return ACCOUNT_FIELDS.indexOf(fieldLabel) !== -1;
  }

  function secondaryFields(fields) {
    return fields.filter(function (fieldLabel) {
      return !isNameField(fieldLabel) && !isAccountField(fieldLabel);
    });
  }

  function matchResult(match, tone, score, risk, kind) {
    return { match: match, tone: tone, score: score, risk: risk, kind: kind };
  }

  function personNameFieldKeys(config) {
    var optional = config.optionalNameFields || [];
    if (config.nameSchema === "standard") {
      var keys = ["FirstName"];
      if (optional.indexOf("MiddleName") !== -1) keys.push("MiddleName");
      keys.push("LastName");
      return keys;
    }
    if (config.nameSchema === "surname") {
      keys = ["FirstName"];
      if (optional.indexOf("MiddleName") !== -1) keys.push("MiddleName");
      keys.push("FirstSurname");
      if (optional.indexOf("SecondSurname") !== -1) keys.push("SecondSurname");
      return keys;
    }
    if (config.nameSchema === "china") return ["GivenNames", "Surname"];
    return [];
  }

  function buildPersonFields(countryName) {
    var config = PERSON_COUNTRIES[countryName];
    if (!config) return NO_COUNTRY_FIELDS.person.slice();
    var fields = personNameFieldKeys(config).map(function (key) {
      return FIELD_KEY_LABELS[key];
    });
    if (config.requiresNationalId) fields.push(FIELD_KEY_LABELS.NationalId);
    fields.push(FIELD_KEY_LABELS[config.accountIdentifier]);
    if (config.routingField) fields.push(FIELD_KEY_LABELS[config.routingField]);
    return fields;
  }

  function buildPersonRequiredFields(countryName) {
    var config = PERSON_COUNTRIES[countryName];
    if (!config) return NO_COUNTRY_FIELDS.person.slice();
    var required = [];
    if (config.nameSchema === "standard") {
      required.push(FIELD_KEY_LABELS.FirstName, FIELD_KEY_LABELS.LastName);
    } else if (config.nameSchema === "surname") {
      required.push(FIELD_KEY_LABELS.FirstName, FIELD_KEY_LABELS.FirstSurname);
    } else if (config.nameSchema === "china") {
      required.push(FIELD_KEY_LABELS.GivenNames, FIELD_KEY_LABELS.Surname);
    }
    if (config.requiresNationalId) required.push(FIELD_KEY_LABELS.NationalId);
    required.push(FIELD_KEY_LABELS[config.accountIdentifier]);
    if (config.routingField) required.push(FIELD_KEY_LABELS[config.routingField]);
    return required;
  }

  function personCountryNames() {
    return Object.keys(PERSON_COUNTRIES);
  }

  function businessVariantFieldKeys(variantGroup) {
    var group = BUSINESS_VARIANT_GROUPS[variantGroup];
    if (!group) return ["BusinessName", "BankAccountNumber"];
    if (variantGroup === "ibanOrOther") {
      return ["BusinessName", "IBAN", "BankAccountNumber", "BIC", "ClearingSystemID"];
    }
    var keys = group.requiredFields.slice();
    group.optionalFields.forEach(function (key) {
      if (keys.indexOf(key) === -1) keys.push(key);
    });
    return keys;
  }

  function businessFieldKeys(config) {
    var keys = businessVariantFieldKeys(config.variantGroup);
    (config.optionalFields || []).forEach(function (key) {
      if (keys.indexOf(key) === -1) keys.push(key);
    });
    return keys;
  }

  function buildBusinessFields(countryName) {
    var config = BUSINESS_COUNTRIES[countryName];
    if (!config) return NO_COUNTRY_FIELDS.business.slice();
    return businessFieldKeys(config).map(function (key) {
      return FIELD_KEY_LABELS[key];
    });
  }

  function buildBusinessRequiredFields(countryName) {
    var config = BUSINESS_COUNTRIES[countryName];
    if (!config) return NO_COUNTRY_FIELDS.business.slice();
    var group = BUSINESS_VARIANT_GROUPS[config.variantGroup];
    return group.requiredFields.map(function (key) {
      return FIELD_KEY_LABELS[key];
    });
  }

  function businessCountryNames() {
    return Object.keys(BUSINESS_COUNTRIES);
  }

  function getExtraValidationErrors(accountType, country, values) {
    if (accountType !== "business" || !country) return [];
    var config = BUSINESS_COUNTRIES[country];
    if (!config) return [];
    var group = BUSINESS_VARIANT_GROUPS[config.variantGroup];
    var errors = [];

    if (group.conditionalRequired) {
      var hasOne = group.conditionalRequired.some(function (key) {
        return !!(values[FIELD_KEY_LABELS[key]] || "").trim();
      });
      if (!hasOne) {
        errors.push({
          code: "conditional_required",
          message: "Business Registration Number or Tax ID Number is required."
        });
      }
    }

    if (group.conditionalPaths) {
      var iban = (values["IBAN"] || "").trim();
      var account = (values["Bank Account Number"] || "").trim();
      var bic = (values["BIC"] || "").trim();
      var clearing = (values["Clearing System ID"] || "").trim();
      var hasIbanPath = !!iban;
      var hasLocalBicPath = !!account && !!bic;
      var hasLocalClearingPath = !!account && !!clearing;
      if (!hasIbanPath && !hasLocalBicPath && !hasLocalClearingPath) {
        errors.push({
          code: "conditional_path",
          message: "Provide IBAN, or Bank Account Number with BIC, or Bank Account Number with Clearing System ID."
        });
      }
    }

    return errors;
  }

  function getCountryResultMeta(country) {
    if (COUNTRY_RESULT_META[country]) return COUNTRY_RESULT_META[country];
    var cfg = PERSON_COUNTRIES[country] || BUSINESS_COUNTRIES[country];
    return {
      bank: "—",
      currency: "—",
      code: cfg ? cfg.code : "—",
      city: "—",
      state: "—"
    };
  }

  function requiredFieldsForCountry(accountType, country) {
    if (!country) return NO_COUNTRY_FIELDS[accountType].slice();
    if (accountType === "person") return buildPersonRequiredFields(country);
    return buildBusinessRequiredFields(country);
  }

  function fieldsForCountry(accountType, country) {
    if (!country) return NO_COUNTRY_FIELDS[accountType].slice();
    if (accountType === "person") return buildPersonFields(country);
    return buildBusinessFields(country);
  }

  function entityFlag(country) {
    return COUNTRY_META[country] ? COUNTRY_META[country].flag : "";
  }

  function saveSession(session) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function loadSession() {
    try {
      var raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function showFormView() {
    var formView = document.getElementById("bv-form-view");
    var resultView = document.getElementById("bv-result-view");
    if (!formView || !resultView) return;
    formView.hidden = false;
    resultView.hidden = true;
    document.title = "Bank Verification — Trulioo Labs";
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  function showResultView() {
    var formView = document.getElementById("bv-form-view");
    var resultView = document.getElementById("bv-result-view");
    if (!formView || !resultView) return;
    formView.hidden = true;
    resultView.hidden = false;
    document.title = "Bank Verification Results — Trulioo Labs";
    history.replaceState(null, "", location.pathname + location.search + "#result");
  }

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function displayName(values, accountType) {
    if (accountType === "business") return values["Business Name"] || "Unknown Business";
    if (values["Full Name"]) return values["Full Name"];
    if (values["Given Names"] || values["Surname"]) {
      return [values["Given Names"], values["Surname"]].filter(Boolean).join(" ");
    }
    if (values["First Name"] && values["First Surname"]) {
      return [
        values["First Name"],
        values["Middle Name"],
        values["First Surname"],
        values["Second Surname"]
      ].filter(Boolean).join(" ");
    }
    if (values["First Name"] || values["Last Name"]) {
      return [values["First Name"], values["Middle Name"], values["Last Name"]].filter(Boolean).join(" ");
    }
    return "Unknown Individual";
  }

  function inferMatch(values) {
    var acct = (values["Bank Account Number"] || values["Account Number"] || values["IBAN"] || "").toUpperCase();
    if (acct.indexOf("NOMATCH") !== -1 || acct.indexOf("PARTIAL") !== -1) {
      return matchResult("No Match", "negative", 12, "high", "negative");
    }

    var nameFail = NAME_FIELDS.some(function (field) {
      return (values[field] || "").toUpperCase().indexOf("NOMATCH") !== -1;
    });
    if (nameFail) {
      return matchResult("No Match", "negative", 12, "high", "negative");
    }

    var secondaryPartial = Object.keys(values).some(function (key) {
      if (isNameField(key) || isAccountField(key)) return false;
      return (values[key] || "").toUpperCase().indexOf("PARTIAL") !== -1;
    });
    if (secondaryPartial) {
      return matchResult("Partial Match", "intermediate", 61, "medium", "intermediate");
    }

    return matchResult("Strong Match", "positive", 92, "low", "positive");
  }

  function matchFromEntity(entity) {
    var score = entity.match === "Strong Match" ? 92 : entity.match === "Partial Match" ? 61 : 12;
    return matchResult(
      entity.match,
      entity.tone,
      score,
      entity.tone === "positive" ? "low" : entity.tone === "intermediate" ? "medium" : "high",
      entity.tone === "positive" ? "positive" : entity.tone === "intermediate" ? "intermediate" : "negative"
    );
  }

  function fieldResultKind(fieldLabel, matchInfo, countryFields) {
    var secondaries = secondaryFields(countryFields);

    if (matchInfo.match === "Strong Match") return "positive";

    if (matchInfo.match === "No Match") {
      if (isNameField(fieldLabel) || isAccountField(fieldLabel)) return "negative";
      return "positive";
    }

    // Partial Match — identity + account must exact-match; only secondary fields may fail.
    if (isNameField(fieldLabel) || isAccountField(fieldLabel)) return "positive";
    if (secondaries.length && fieldLabel === secondaries[0]) return "negative";
    return "positive";
  }

  function buildFieldDetail(fieldLabel, value, kind, matchLevel) {
    if (!value) return null;
    if (kind === "negative") {
      return { input: value, returned: null };
    }
    if (kind === "positive" && ACCOUNT_FIELDS.indexOf(fieldLabel) !== -1 && matchLevel === "Strong Match") {
      return null;
    }
    if (kind === "positive") {
      return { input: value, returned: value };
    }
    return null;
  }

  function buildFieldMatches(values, matchInfo, accountType, country) {
    var fields = fieldsForCountry(accountType, country);

    return fields.map(function (fieldLabel) {
      var kind = fieldResultKind(fieldLabel, matchInfo, fields);
      var value = values[fieldLabel] || "";
      return {
        signal: fieldLabel,
        detail: buildFieldDetail(fieldLabel, value, kind, matchInfo.match),
        result: kind === "negative" ? "No match" : "Match",
        kind: kind
      };
    });
  }

  function buildAppended(values, matchInfo, country, accountType, meta) {
    var rows = [
      { label: accountType === "business" ? "Business Name" : "Full Name", value: displayName(values, accountType) }
    ];
    if (values["Bank Account Number"] || values["Account Number"]) {
      rows.push({ label: "Account Number", value: values["Bank Account Number"] || values["Account Number"] });
    }
    rows.push(
      { label: "Bank Name", value: meta.bank },
      { label: "Local Currency", value: meta.currency },
      { label: "City", value: meta.city },
      { label: "State", value: meta.state }
    );
    if (values["IBAN"]) rows.push({ label: "IBAN", value: values["IBAN"] });
    rows.push({ label: "Confidence Score", value: (matchInfo.score / 100).toFixed(2) });
    rows.push({ label: "Country", value: meta.code });
    return rows;
  }

  function buildTruAi(name, matchInfo) {
    if (matchInfo.match === "Strong Match") {
      return name + "\u2019s bank account has been verified. No additional steps required.";
    }
    if (matchInfo.match === "Partial Match") {
      return "Some discrepancies were detected for " + name + "\u2019s bank account. Manual review is recommended.";
    }
    return "Could not confirm account ownership for " + name + ". Review the field match results below.";
  }

  function buildResultConfig(session) {
    var st = session.state;
    var values = Object.assign({}, session.values);
    var entity = null;

    if (st.testEntity && st.selectedTestEntity != null) {
      entity = TEST_ENTITIES[st.accountType][st.selectedTestEntity];
      values = Object.assign({}, entity.values, values);
    }

    var country = st.country || (entity && entity.country) || "United States";
    var meta = getCountryResultMeta(country);
    var matchInfo = entity ? matchFromEntity(entity) : inferMatch(values);
    var name = displayName(values, st.accountType);
    var fieldMatches = buildFieldMatches(values, matchInfo, st.accountType, country);
    var matchCount = fieldMatches.filter(function (r) { return r.kind === "positive"; }).length;
    var txnId = uuid();

    return {
      displayName: name,
      country: country,
      countryFlag: entityFlag(country),
      match: matchInfo.match,
      tone: matchInfo.tone,
      score: matchInfo.score,
      risk: matchInfo.risk,
      transactionId: txnId,
      testEntity: entity,
      testEntityIndex: st.selectedTestEntity,
      testEntityMode: !!(st.testEntity && st.selectedTestEntity != null),
      accountType: st.accountType,
      matchCount: matchCount,
      truAi: buildTruAi(name, matchInfo),
      fieldMatches: fieldMatches,
      appended: buildAppended(values, matchInfo, country, st.accountType, meta),
      raw: {
        transactionId: txnId,
        verificationStatus: matchInfo.match,
        matchScore: matchInfo.score / 100,
        country: meta.code,
        accountType: st.accountType,
        input: values,
        appended: buildAppended(values, matchInfo, country, st.accountType, meta)
      }
    };
  }

  function applyTestEntityToSession(session, index) {
    var entity = TEST_ENTITIES[session.state.accountType][index];
    session.state.selectedTestEntity = index;
    session.state.country = entity.country;
    session.values = Object.assign({}, entity.values);
    saveSession(session);
    return session;
  }

  function sortedEntityEntries(entities, selectedIndex) {
    var entries = entities.map(function (ent, i) { return { ent: ent, index: i }; });
    if (selectedIndex == null) return entries;
    entries.sort(function (a, b) {
      if (a.index === selectedIndex) return -1;
      if (b.index === selectedIndex) return 1;
      return a.index - b.index;
    });
    return entries;
  }

  function buildTestEntityOption(ent, index, isSelected, onSelect) {
    var opt = document.createElement("button");
    opt.type = "button";
    opt.className = "bv-option bv-option--entity" + (isSelected ? " bv-option--selected" : "");
    opt.setAttribute("role", "option");
    opt.setAttribute("aria-selected", String(isSelected));

    var optFlag = document.createElement("span");
    optFlag.className = "bv-option__flag";
    optFlag.setAttribute("aria-hidden", "true");
    optFlag.textContent = entityFlag(ent.country);

    var textWrap = document.createElement("span");
    textWrap.className = "bv-option__text";

    var name = document.createElement("span");
    name.className = "bv-option__label";
    name.textContent = ent.name;
    bindEllipsisTooltip(name, ent.name);

    textWrap.appendChild(name);

    var otag = document.createElement("span");
    otag.className = "tds-tag tds-tag--" + ent.tone + " tds-tag--sm";
    otag.textContent = ent.match;

    opt.appendChild(optFlag);
    opt.appendChild(textWrap);
    opt.appendChild(otag);

    opt.addEventListener("mousedown", function (e) {
      e.preventDefault();
      onSelect(index);
    });

    return opt;
  }

  function fillTestEntityTriggerContent(trigger, textWrap, entity) {
    textWrap.textContent = "";

    var value = document.createElement("span");
    value.className = "tds-select__value" + (entity ? "" : " tds-select__placeholder");
    value.textContent = entity ? entity.name : "Select test entity";
    textWrap.appendChild(value);

    if (entity) {
      bindEllipsisTooltip(value, entity.name);
    }
  }

  var tooltipEl = null;

  function ensureTooltip() {
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "bv-floating-tooltip";
      tooltipEl.setAttribute("role", "tooltip");
      tooltipEl.hidden = true;
      document.body.appendChild(tooltipEl);
    }
    return tooltipEl;
  }

  function bindEllipsisTooltip(el, text) {
    if (!el || !text) return;
    el.addEventListener("mouseenter", function () {
      if (el.scrollWidth <= el.clientWidth + 1) return;
      var tip = ensureTooltip();
      tip.textContent = text;
      tip.hidden = false;
      var rect = el.getBoundingClientRect();
      tip.style.left = Math.max(8, rect.left) + "px";
      tip.style.top = rect.top + "px";
      tip.style.transform = "translateY(calc(-100% - 6px))";
    });
    el.addEventListener("mouseleave", function () {
      if (tooltipEl) tooltipEl.hidden = true;
    });
  }

  function bindTooltip(el, text) {
    if (!el || !text) return;
    function show() {
      var tip = ensureTooltip();
      tip.textContent = text;
      tip.hidden = false;
      var rect = el.getBoundingClientRect();
      tip.style.left = Math.max(8, rect.left + rect.width / 2) + "px";
      tip.style.top = rect.top + "px";
      tip.style.transform = "translate(-50%, calc(-100% - 6px))";
    }
    function hide() {
      if (tooltipEl) tooltipEl.hidden = true;
    }
    el.addEventListener("mouseenter", show);
    el.addEventListener("focus", show);
    el.addEventListener("mouseleave", hide);
    el.addEventListener("blur", hide);
  }

  function initAppNavToggle() {
    var shell = document.getElementById("app-shell");
    var overlay = document.getElementById("app-sidenav-overlay");
    if (!shell || !overlay) return;

    var toggles = shell.querySelectorAll(".app-nav-toggle");
    if (!toggles.length) return;

    function setOpen(open) {
      shell.classList.toggle("app-shell--nav-open", open);
      toggles.forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      });
      overlay.hidden = !open;
      overlay.setAttribute("aria-hidden", String(!open));
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        setOpen(!shell.classList.contains("app-shell--nav-open"));
      });
    });
    overlay.addEventListener("click", function () {
      setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && shell.classList.contains("app-shell--nav-open")) {
        setOpen(false);
      }
    });
    window.matchMedia("(min-width: 769px)").addEventListener("change", function (query) {
      if (query.matches) setOpen(false);
    });
  }

  global.BVShared = {
    SESSION_KEY: SESSION_KEY,
    PERSON_COUNTRIES: PERSON_COUNTRIES,
    BUSINESS_COUNTRIES: BUSINESS_COUNTRIES,
    COUNTRY_META: COUNTRY_META,
    GENERIC_FIELDS: GENERIC_FIELDS,
    TEST_ENTITIES: TEST_ENTITIES,
    personCountryNames: personCountryNames,
    businessCountryNames: businessCountryNames,
    fieldsForCountry: fieldsForCountry,
    requiredFieldsForCountry: requiredFieldsForCountry,
    getExtraValidationErrors: getExtraValidationErrors,
    entityFlag: entityFlag,
    saveSession: saveSession,
    loadSession: loadSession,
    buildResultConfig: buildResultConfig,
    applyTestEntityToSession: applyTestEntityToSession,
    sortedEntityEntries: sortedEntityEntries,
    buildTestEntityOption: buildTestEntityOption,
    fillTestEntityTriggerContent: fillTestEntityTriggerContent,
    bindEllipsisTooltip: bindEllipsisTooltip,
    bindTooltip: bindTooltip,
    initAppNavToggle: initAppNavToggle,
    showFormView: showFormView,
    showResultView: showResultView
  };
})(window);
