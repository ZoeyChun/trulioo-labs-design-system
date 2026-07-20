export const NAV_ITEMS = [
  { id: "buttons", label: "Buttons", icon: "buttons" },
  { id: "inputs", label: "Inputs", icon: "inputs" },
  { id: "controls", label: "Controls", icon: "controls" },
  { id: "tags", label: "Tags", icon: "tags" },
  { id: "navigation", label: "Navigation", icon: "navigation" },
  { id: "disclosure", label: "Disclosure", icon: "disclosure" },
  { id: "data", label: "Data", icon: "data" },
  { id: "typography", label: "Typography", icon: "typography" },
  { id: "tokens", label: "Tokens", icon: "tokens" },
  { id: "tracker", label: "Tracker", icon: "tracker" },
] as const;

export type TabId = (typeof NAV_ITEMS)[number]["id"];

export const TAB_IDS = NAV_ITEMS.map((item) => item.id);

export const HERO_FEATURES = [
  {
    title: "Token-driven",
    body: "Colors, type, and spacing from tokens.css. Never hard-code hex values.",
  },
  {
    title: "Figma parity",
    body: "Every tds- class traces to a component in Trulioo ADS 2026.",
  },
  {
    title: "Copy & ship",
    body: "Grab the markup from each demo and drop it into your feature branch.",
  },
] as const;
