import { CONTENT_PAGES, type ContentPageId } from "./content-pages";
import {
  buildComponentNavPages,
  COMPONENT_PAGE_IDS,
  isComponentPageId,
  resolveGroupedComponentRedirect,
} from "./component-nav";

/** Top-level doc sections (zeroheight-style top nav). */
export type NavSectionId = "getting-started" | "foundations" | "components" | "content";

export type GettingStartedPageId = "overview" | "tracker";
export type FoundationPageId = "typography" | "tokens";
export type LegacyGroupedPageId =
  | "buttons"
  | "inputs"
  | "controls"
  | "tags"
  | "navigation"
  | "disclosure"
  | "data";

export type ComponentPageId = (typeof COMPONENT_PAGE_IDS)[number];

export type PageId =
  | GettingStartedPageId
  | FoundationPageId
  | ContentPageId
  | ComponentPageId;

export type LifecycleBadge = "Beta" | "New" | "Deprecated";

/** When true, Content section pages are visible in nav but not navigable. */
export const CONTENT_SECTION_LOCKED = true;

export type NavPage = {
  id: string;
  label: string;
  section: NavSectionId;
  icon?: string;
  badge?: LifecycleBadge;
  locked?: boolean;
  sortKey: string;
  description?: string;
};

export type NavSection = {
  id: NavSectionId;
  label: string;
  pages: NavPage[];
};

const GETTING_STARTED_PAGES: NavPage[] = [
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
];

const FOUNDATION_PAGES: NavPage[] = [
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
];

const CONTENT_NAV_PAGES: NavPage[] = CONTENT_PAGES.map((page) => ({
  id: page.id,
  label: page.title,
  section: "content" as const,
  icon: "overview",
  sortKey: page.id,
  description: page.description,
  locked: CONTENT_SECTION_LOCKED,
}));

const COMPONENT_PAGES = buildComponentNavPages();

export const NAV_SECTIONS: NavSection[] = [
  { id: "getting-started", label: "Getting Started", pages: GETTING_STARTED_PAGES },
  { id: "foundations", label: "Foundations", pages: FOUNDATION_PAGES },
  { id: "components", label: "Components", pages: COMPONENT_PAGES },
  { id: "content", label: "Content", pages: CONTENT_NAV_PAGES },
];

export const TOP_NAV_SECTIONS = NAV_SECTIONS.map(({ id, label }) => ({ id, label }));

export const ALL_PAGES: NavPage[] = NAV_SECTIONS.flatMap((s) => s.pages);
export const PAGE_IDS = ALL_PAGES.map((p) => p.id);

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
  buttons: "#/components/button",
  inputs: "#/components/text-input",
  controls: "#/components/checkbox",
  tags: "#/components/tag",
  navigation: "#/components/side-nav",
  disclosure: "#/components/dialog",
  data: "#/components/data-table",
  typography: "#/foundations/typography",
  tokens: "#/foundations/tokens",
  tracker: "#/getting-started/tracker",
};

export type AppRoute =
  | { type: "home" }
  | { type: "page"; section: NavSectionId; pageId: string };

export function pageToPath(section: NavSectionId, pageId: string): string {
  return `#/${section}/${pageId}`;
}

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroQuickLink = {
  title: string;
  body: string;
  tag: string;
  path: string;
};

/** Live stats shown on the docs homepage (sync with component-tracker.json when rebuilding). */
export const HERO_STATS: HeroStat[] = [
  { value: "50", label: "components" },
  { value: "100%", label: "Figma parity" },
  { value: "8", label: "product demos" },
];

/** Role-oriented entry points on the homepage. */
export const HERO_QUICK_LINKS: HeroQuickLink[] = [
  {
    tag: "Designer",
    title: "Browse design tokens",
    body: "Color, spacing, radius, elevation, and semantic CSS custom properties.",
    path: pageToPath("foundations", "tokens"),
  },
  {
    tag: "Engineer",
    title: "Start building with CSS",
    body: "Copy-ready HTML, class references, and live demos for every component.",
    path: pageToPath("components", "text-input"),
  },
  {
    tag: "PM · Stakeholder",
    title: "Track adoption",
    body: "See which components ship in each product and where coverage gaps remain.",
    path: pageToPath("getting-started", "tracker"),
  },
];

/** Technical principles shown on Getting Started → Overview. */
export const OVERVIEW_PRINCIPLES = [
  {
    title: "CSS-only delivery",
    body: "Static tds- stylesheets and HTML demos with no framework lock-in. Import tokens.css and component CSS in any stack.",
  },
  {
    title: "Figma ↔ code parity",
    body: "Component names, variants, and tokens map 1:1 to the Trulioo ADS 2026 Figma file.",
  },
  {
    title: "Measured adoption",
    body: "The component tracker scans pages/ demos so teams can see what's built and where it's used in real flows.",
  },
] as const;

/** @deprecated use HERO_QUICK_LINKS on the homepage */
export const HERO_FEATURES = OVERVIEW_PRINCIPLES;

export function findPage(pageId: string): NavPage | undefined {
  return ALL_PAGES.find((p) => p.id === pageId);
}

export function isNavPageLocked(page: NavPage): boolean {
  return page.locked === true;
}

export function isLockedRoute(route: AppRoute): boolean {
  if (route.type !== "page") return false;
  const page = findPage(route.pageId);
  return page ? isNavPageLocked(page) : route.section === "content" && CONTENT_SECTION_LOCKED;
}

/** Redirect target when a locked page is requested directly. */
export function resolveLockedRouteRedirect(route: AppRoute): string | null {
  if (!isLockedRoute(route)) return null;
  return pageToPath("getting-started", "overview");
}

export function findNavSection(sectionId: NavSectionId): NavSection | undefined {
  return NAV_SECTIONS.find((s) => s.id === sectionId);
}

export function firstPageInSection(sectionId: NavSectionId): NavPage | undefined {
  return findNavSection(sectionId)?.pages[0];
}

export function activeSectionFromRoute(route: AppRoute): NavSectionId {
  if (route.type === "page") return route.section;
  return "getting-started";
}

export type ParsedHash = {
  routePath: string;
  anchor?: string;
};

export function parseHashWithAnchor(hash: string): ParsedHash {
  const raw = hash.replace(/^#/, "");
  if (!raw) return { routePath: "" };

  const anchorIdx = raw.indexOf("#");
  if (anchorIdx === -1) {
    const route = raw.startsWith("/") ? raw : `/${raw}`;
    return { routePath: `#${route}` };
  }

  const routePart = raw.slice(0, anchorIdx);
  const anchor = raw.slice(anchorIdx + 1);
  const route = routePart.startsWith("/") ? routePart : `/${routePart}`;
  return { routePath: `#${route}`, anchor: anchor || undefined };
}

export function parseRouteFromPath(routePath: string): AppRoute {
  const raw = routePath.replace(/^#\/?/, "");

  if (!raw || raw === "home") {
    return { type: "home" };
  }

  const parts = raw.split("/").filter(Boolean);

  if (parts.length === 2) {
    const [section, pageId] = parts;
    const navSection = NAV_SECTIONS.find((s) => s.id === section);
    if (navSection?.pages.some((p) => p.id === pageId)) {
      return {
        type: "page",
        section: section as NavSectionId,
        pageId,
      };
    }

    if (section === "components") {
      const redirect = resolveGroupedComponentRedirect(pageId);
      if (redirect) {
        return { type: "page", section: "components", pageId: redirect };
      }
    }
  }

  if (LEGACY_TAB_IDS.includes(raw as LegacyTabId)) {
    const redirect = LEGACY_HASH_REDIRECTS[raw as LegacyTabId];
    const [, section, pageId] = redirect.match(/#\/([^/]+)\/([^/]+)/) ?? [];
    if (section && pageId) {
      return {
        type: "page",
        section: section as NavSectionId,
        pageId,
      };
    }
  }

  return { type: "home" };
}

export function parseRouteFromHash(): AppRoute {
  const { routePath } = parseHashWithAnchor(window.location.hash);
  return parseRouteFromPath(routePath);
}

export function resolveLegacyRedirect(): string | null {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return null;

  const normalized = raw.startsWith("/") ? raw.slice(1) : raw;
  if (normalized === "getting-started/migration") {
    return pageToPath("getting-started", "overview");
  }

  if (raw.startsWith("/")) return null;
  if (LEGACY_TAB_IDS.includes(raw as LegacyTabId)) {
    return LEGACY_HASH_REDIRECTS[raw as LegacyTabId];
  }
  return null;
}

export const FOUNDATION_PAGE_IDS = ["typography", "tokens"] as const;
export type FoundationContentPageId = (typeof FOUNDATION_PAGE_IDS)[number];

export function isFoundationPage(pageId: string): pageId is FoundationContentPageId {
  return (FOUNDATION_PAGE_IDS as readonly string[]).includes(pageId);
}

export function isComponentDocPage(pageId: string): pageId is ComponentPageId {
  return isComponentPageId(pageId);
}

export function isContentGuidelinePage(pageId: string): pageId is ContentPageId {
  return CONTENT_PAGES.some((p) => p.id === pageId);
}

export function isPreviewDemoPage(pageId: string): boolean {
  return isFoundationPage(pageId) || isComponentDocPage(pageId);
}

/** @deprecated use isPreviewDemoPage */
export function isContentPage(pageId: string): boolean {
  return isPreviewDemoPage(pageId);
}

export { isComponentPageId, COMPONENT_PAGE_IDS };
