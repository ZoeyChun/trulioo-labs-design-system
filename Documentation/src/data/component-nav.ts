import tracker from "./component-tracker.json";
import { chapterIdForComponent } from "./component-chapters";
import type { PreviewShowcase } from "./showcases";

export type ComponentNavPage = {
  id: string;
  label: string;
  section: "components";
  icon?: string;
  badge?: "Beta" | "New" | "Deprecated";
  sortKey: string;
  description?: string;
};

export type ComponentNavGroup = {
  id: string;
  label: string;
  pages: ComponentNavPage[];
};

const GROUP_ORDER = [
  "Core Controls",
  "Form Inputs",
  "Navigation",
  "Data Display",
  "Feedback",
  "Containers",
  "Progress",
  "Scoring",
  "Shared Atoms",
  "Utility",
] as const;

export const COMPONENT_PAGE_IDS = tracker.components.map((c) => c.id) as readonly string[];

export function buildComponentNavGroups(): ComponentNavGroup[] {
  const byCategory = new Map<string, TrackerComponent[]>();

  for (const component of tracker.components) {
    const list = byCategory.get(component.category) ?? [];
    list.push(component);
    byCategory.set(component.category, list);
  }

  const groups: ComponentNavGroup[] = [];

  for (const category of GROUP_ORDER) {
    const components = byCategory.get(category);
    if (!components?.length) continue;

    groups.push({
      id: category.toLowerCase().replace(/\s+/g, "-"),
      label: category.toUpperCase(),
      pages: components.map((component) => componentToNavPage(component)),
    });
  }

  return groups;
}

type TrackerComponent = (typeof tracker.components)[number];

/** Showcase slug aliases → component ID when slug doesn't match component id. */
export const SHOWCASE_SLUG_ALIASES: Record<string, string> = {
  "dismiss-actions": "dismiss-action",
  breadcrumbs: "breadcrumb",
  "tab-item-states": "tab-item",
  "filter-tabs": "filter-tab",
  "nav-item-sizes": "nav-item",
  states: "text-input",
  "inset-variant": "text-input",
  caption: "field-caption",
  "field-label-validation": "field-label",
  "calendar-day-item-states": "date-picker",
  textarea: "textarea",
  "segmented-button": "segmented-control",
  "removable-tags": "tag",
  "tags-with-leading-visual": "tag",
  "sort-and-filter-buttons": "filter-button",
  "accordion-datafieldlist": "accordion",
  "table-header": "data-table",
  "column-header-cell": "data-table",
  "text-cell": "data-table",
  "row-header-checkbox-label-and-actions": "data-table",
  "table-footer": "data-table",
  "ownership-table": "data-table",
  "repositories-table": "data-table",
  "row-density": "data-table",
};

/** Slug prefix → exclusive owner (prevents cross-assignment within shared chapters). */
const SHOWCASE_SLUG_PREFIX_OWNERS: Record<string, string> = {
  "side-nav-": "side-nav",
  "dropdown-panel-": "dropdown-panel",
  "progress-indicator-": "progress-indicator",
  "text-input-": "text-input",
  "textarea-": "textarea",
  "segmented-control-": "segmented-control",
  "select-": "select",
  "date-picker-": "date-picker",
  "radio-card-": "radio-card",
  "counter-label-": "counter-label",
  "tag-": "tag",
  "table-": "data-table",
  "accordion-": "accordion",
  "dialog-": "dialog",
};

/** Generic button demos in the shared buttons chapter — owned by Button only. */
const BUTTON_SHOWCASE_SLUGS = new Set([
  "variants",
  "sizes",
  "states",
  "with-counter-and-icons",
  "loading",
]);

function componentDisplayName(component: TrackerComponent): string {
  return component.name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

function slugMatchesComponent(slug: string, componentId: string): boolean {
  if (slug === componentId || slug.startsWith(`${componentId}-`)) {
    return true;
  }
  const aliasTarget = SHOWCASE_SLUG_ALIASES[slug];
  return aliasTarget === componentId;
}

function scoreShowcaseForComponent(
  showcase: PreviewShowcase,
  component: TrackerComponent,
): number {
  const slug = showcase.slug.toLowerCase();
  const title = showcase.title.toLowerCase();
  const displayName = componentDisplayName(component);

  const aliasOwner = SHOWCASE_SLUG_ALIASES[slug];
  if (aliasOwner) {
    return aliasOwner === component.id ? 300 : 0;
  }

  for (const [prefix, ownerId] of Object.entries(SHOWCASE_SLUG_PREFIX_OWNERS)) {
    if (slug.startsWith(prefix)) {
      return ownerId === component.id ? 250 : 0;
    }
  }

  const prefixes =
    component.classPrefixes?.length > 0
      ? component.classPrefixes
      : [`tds-${component.id}`];

  let score = 0;

  if (slugMatchesComponent(slug, component.id)) {
    score += 200;
  }

  if (component.id === "button" && BUTTON_SHOWCASE_SLUGS.has(slug)) {
    score += 180;
  }

  if (title === displayName || title.startsWith(`${displayName} `)) {
    score += 120;
  }

  for (const prefix of prefixes) {
    if (showcase.api.includes(prefix)) score += 80 + prefix.length;
    if (showcase.html.includes(prefix)) score += 40 + prefix.length;
  }

  return score;
}

export function resolveShowcaseComponentId(showcase: PreviewShowcase): string | null {
  let bestId: string | null = null;
  let bestScore = 0;

  for (const component of tracker.components) {
    const score = scoreShowcaseForComponent(showcase, component);
    if (score > bestScore) {
      bestScore = score;
      bestId = component.id;
    }
  }

  return bestScore > 0 ? bestId : null;
}

export function buildComponentNavPages(): ComponentNavPage[] {
  return buildComponentNavGroups().flatMap((group) => group.pages);
}

function componentToNavPage(component: TrackerComponent): ComponentNavPage {
  const chapterId = chapterIdForComponent(component.id);
  return {
    id: component.id,
    label: component.name,
    section: "components",
    icon: chapterId,
    sortKey: component.name.toLowerCase(),
    description: component.notes ?? `${component.name} component from ${component.category}.`,
  };
}

export function findTrackerComponent(componentId: string): TrackerComponent | undefined {
  return tracker.components.find((c) => c.id === componentId);
}

export function isComponentPageId(pageId: string): boolean {
  return COMPONENT_PAGE_IDS.includes(pageId);
}

export function filterShowcasesForComponent(
  showcases: PreviewShowcase[],
  componentId: string
): PreviewShowcase[] {
  if (!findTrackerComponent(componentId)) return [];

  return showcases.filter(
    (showcase) => resolveShowcaseComponentId(showcase) === componentId,
  );
}

/** Legacy grouped chapter IDs → first component in that family. */
export const LEGACY_GROUPED_REDIRECTS: Record<string, string> = {
  buttons: "button",
  controls: "checkbox",
  inputs: "text-input",
  tags: "tag",
  navigation: "side-nav",
  disclosure: "dialog",
  data: "data-table",
};

export function resolveGroupedComponentRedirect(pageId: string): string | null {
  return LEGACY_GROUPED_REDIRECTS[pageId] ?? null;
}
