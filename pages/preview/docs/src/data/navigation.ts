/** Top-level doc sections (Salesforce-style). */
export type NavSectionId = "getting-started" | "foundations" | "components";

export type PageId =
  | "overview"
  | "tracker"
  | "migration"
  | "typography"
  | "tokens"
  | "buttons"
  | "controls"
  | "data"
  | "disclosure"
  | "inputs"
  | "navigation"
  | "tags";

export type LifecycleBadge = "Beta" | "New" | "Deprecated";

export type NavPage = {
  id: PageId;
  label: string;
  section: NavSectionId;
  icon?: string;
  badge?: LifecycleBadge;
  sortKey: string;
  description?: string;
};

export type NavSection = {
  id: NavSectionId;
  label: string;
  pages: NavPage[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    pages: [
      {
        id: "overview",
        label: "Overview",
        section: "getting-started",
        icon: "overview",
        sortKey: "overview",
        description: "Welcome to the Trulioo Design System component reference.",
      },
      {
        id: "tracker",
        label: "Component Tracker",
        section: "getting-started",
        icon: "tracker",
        badge: "Beta",
        sortKey: "tracker",
        description: "Implementation status, Figma parity, and adoption across preview, BV, and DV.",
      },
      {
        id: "migration",
        label: "Migration Guide",
        section: "getting-started",
        icon: "migration",
        sortKey: "migration",
        description: "URL redirects, page splits, and link updates from the classic preview.",
      },
    ],
  },
  {
    id: "foundations",
    label: "Foundations",
    pages: [
      {
        id: "typography",
        label: "Typography",
        section: "foundations",
        icon: "typography",
        sortKey: "typography",
        description: "Type scale, weights, and text utility classes from tokens.css.",
      },
      {
        id: "tokens",
        label: "Design Tokens",
        section: "foundations",
        icon: "tokens",
        sortKey: "tokens",
        description: "Color, spacing, radius, elevation, and semantic CSS custom properties.",
      },
    ],
  },
  {
    id: "components",
    label: "Components",
    pages: [
      {
        id: "buttons",
        label: "Buttons",
        section: "components",
        icon: "buttons",
        sortKey: "buttons",
        description: "Button, IconButton, ButtonGroup, FilterButton, and related controls.",
      },
      {
        id: "controls",
        label: "Controls",
        section: "components",
        icon: "controls",
        sortKey: "controls",
        description: "Checkbox, radio, switch, slider, and form control primitives.",
      },
      {
        id: "data",
        label: "Data",
        section: "components",
        icon: "data",
        sortKey: "data",
        description: "Data tables, section headers, pagination, and dense entity lists.",
      },
      {
        id: "disclosure",
        label: "Disclosure",
        section: "components",
        icon: "disclosure",
        badge: "New",
        sortKey: "disclosure",
        description: "Accordion, Dialog, and progressive disclosure patterns for KYB flows.",
      },
      {
        id: "inputs",
        label: "Inputs",
        section: "components",
        icon: "inputs",
        sortKey: "inputs",
        description: "Text inputs, selects, comboboxes, date pickers, and field composites.",
      },
      {
        id: "navigation",
        label: "Navigation",
        section: "components",
        icon: "navigation",
        sortKey: "navigation",
        description: "Side nav, tabs, breadcrumbs, and wayfinding components.",
      },
      {
        id: "tags",
        label: "Tags",
        section: "components",
        icon: "tags",
        sortKey: "tags",
        description: "Tags, counters, badges, and status indicators.",
      },
    ],
  },
];

export const ALL_PAGES: NavPage[] = NAV_SECTIONS.flatMap((s) => s.pages);
export const PAGE_IDS = ALL_PAGES.map((p) => p.id) as PageId[];

export const LEGACY_TAB_IDS = [
  "buttons",
  "inputs",
  "controls",
  "tags",
  "navigation",
  "disclosure",
  "data",
  "typography",
  "tokens",
  "tracker",
] as const;

export type LegacyTabId = (typeof LEGACY_TAB_IDS)[number];

export const LEGACY_HASH_REDIRECTS: Record<LegacyTabId, string> = {
  buttons: "#/components/buttons",
  inputs: "#/components/inputs",
  controls: "#/components/controls",
  tags: "#/components/tags",
  navigation: "#/components/navigation",
  disclosure: "#/components/disclosure",
  data: "#/components/data",
  typography: "#/foundations/typography",
  tokens: "#/foundations/tokens",
  tracker: "#/getting-started/tracker",
};

export type AppRoute =
  | { type: "home" }
  | { type: "page"; section: NavSectionId; pageId: PageId };

export function pageToPath(section: NavSectionId, pageId: PageId): string {
  return `#/${section}/${pageId}`;
}

export function findPage(pageId: PageId): NavPage | undefined {
  return ALL_PAGES.find((p) => p.id === pageId);
}

export function parseRouteFromHash(): AppRoute {
  const raw = window.location.hash.replace(/^#/, "");

  if (!raw || raw === "home" || raw === "/") {
    return { type: "home" };
  }

  const normalized = raw.startsWith("/") ? raw.slice(1) : raw;
  const parts = normalized.split("/").filter(Boolean);

  if (parts.length === 2) {
    const [section, pageId] = parts;
    if (
      NAV_SECTIONS.some((s) => s.id === section) &&
      PAGE_IDS.includes(pageId as PageId)
    ) {
      return {
        type: "page",
        section: section as NavSectionId,
        pageId: pageId as PageId,
      };
    }
  }

  if (LEGACY_TAB_IDS.includes(normalized as LegacyTabId)) {
    const redirect = LEGACY_HASH_REDIRECTS[normalized as LegacyTabId];
    const [, section, pageId] = redirect.match(/#\/([^/]+)\/([^/]+)/) ?? [];
    if (section && pageId) {
      return {
        type: "page",
        section: section as NavSectionId,
        pageId: pageId as PageId,
      };
    }
  }

  return { type: "home" };
}

export function resolveLegacyRedirect(): string | null {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw.startsWith("/")) return null;
  if (LEGACY_TAB_IDS.includes(raw as LegacyTabId)) {
    return LEGACY_HASH_REDIRECTS[raw as LegacyTabId];
  }
  return null;
}

export const CONTENT_PAGE_IDS = [
  "buttons",
  "inputs",
  "controls",
  "tags",
  "navigation",
  "disclosure",
  "data",
  "typography",
  "tokens",
] as const;

export type ContentPageId = (typeof CONTENT_PAGE_IDS)[number];

export function isContentPage(pageId: PageId): pageId is ContentPageId {
  return (CONTENT_PAGE_IDS as readonly string[]).includes(pageId);
}

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

export type TabId = ContentPageId | "tracker";
export const NAV_ITEMS = ALL_PAGES.filter(
  (p) => isContentPage(p.id) || p.id === "tracker"
).map((p) => ({
  id: p.id as TabId,
  label: p.label,
  icon: p.icon ?? p.id,
}));
export const TAB_IDS = NAV_ITEMS.map((item) => item.id);
