/* Marks transaction pages for Demo 1 drawer embed and seeds result state. */
(function () {
  var params = new URLSearchParams(window.location.search);
  if (!params.has("embed")) return;

  document.documentElement.classList.add("d1-tx-embed");
  window.__D1_TX_EMBED__ = true;

  var path = window.location.pathname || "";

  /* Device Intelligence: skip the analyzing delay. */
  if (path.indexOf("/device-intelligence/") !== -1) {
    try {
      sessionStorage.setItem("di-entity", params.get("entity") === "low" ? "low" : "high");
    } catch (e) {}
  }

  /* Bank Verification: seed a failed business result so #result can render. */
  if (path.indexOf("/bank-verification/") !== -1) {
    try {
      var session = {
        view: "result",
        state: {
          accountType: "business",
          country: "South Korea",
          testEntity: true,
          selectedTestEntity: 5
        },
        values: {
          "Business Name": "Seoul Ventures",
          "Bank Account Number": "220-456-789012",
          BIC: "CZNBKRSE"
        }
      };
      sessionStorage.setItem("bv-session", JSON.stringify(session));
      if (window.location.hash !== "#result") {
        history.replaceState(null, "", window.location.pathname + window.location.search + "#result");
      }
    } catch (e2) {}
  }
})();
