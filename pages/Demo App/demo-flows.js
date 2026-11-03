/**
 * Demo App — flow content.
 *
 * Each home card maps to a flow: an ordered list of "Select Flow" steps
 * (Figma 2258:54699 and 2258:54943). The screens are all the same template, so
 * adding an industry or product means adding an entry here, not new markup.
 *
 * Per step:
 *   section / note   the bottom-half heading and its supporting line
 *   options          the check cards; exactly one should be `recommended`
 *   heading          optional — defaults to the option picked on the step before
 *
 * The country shown on each step is session state, not flow data — see
 * demo-countries.js and the picker in demo-app.js.
 */
window.DA_FLOWS = {
  finance: {
    label: "Finance",
    steps: [
      {
        // Figma 2258:54699
        heading: "Finance",
        section: "Pick the journey",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        options: [
          {
            id: "checkout",
            icon: "credit-card",
            title: "Checkout",
            body: "Verify a shopper before completing a high-trust purchase or payout flow.",
            tags: ["~30 seconds", "LoA High"],
            duration: "around 30 seconds",
            recommended: true,
          },
          {
            id: "money-transfer",
            icon: "id-card",
            title: "Money Transfer",
            body: "Confirm identity before sending money to a new recipient or destination.",
            tags: ["~90 seconds", "LoA High"],
            duration: "around 90 seconds",
          },
        ],
      },
      {
        // Figma 2258:54943
        section: "Verification method",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        options: [
          {
            id: "eid",
            icon: "fingerprint",
            title: "Electronic ID Verification",
            body: "Use trusted digital identity sources for fast checks",
            tags: ["No document scan", "~30 seconds", "LoA High"],
            duration: "around 30 seconds",
            recommended: true,
          },
          {
            id: "kyc-docs",
            icon: "id-card",
            title: "KYC Docs Verification",
            body: "Verify identity with document and biometric checks",
            tags: ["NFC chip read", "~90 seconds", "LoA High"],
            duration: "around 90 seconds",
          },
          {
            id: "eudi",
            icon: "wallet",
            title: "EUDI Wallet",
            body: "Share only the details you choose, straight from your wallet.",
            tags: ["Nothing to scan", "~20 seconds", "You pick the data", "LoA High"],
            duration: "around 20 seconds",
          },
        ],
      },
    ],
  },
};
