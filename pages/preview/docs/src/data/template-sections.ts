import type { TemplateSectionId } from "./showcases";

export type DocTabId = TemplateSectionId | "changelog";

export type DocTabGroup = "primary" | "developer";

export type DocTab = {
  id: DocTabId;
  label: string;
  group: DocTabGroup;
};

/** Default tab when opening a component doc page or switching between components. */
export const DEFAULT_COMPONENT_DOC_TAB: DocTabId = "variants";

/** Zeroheight-aligned tabs with developer extras grouped separately. */
export const DOC_TABS: DocTab[] = [
  { id: "variants", label: "Design", group: "primary" },
  { id: "overview", label: "Guidelines", group: "primary" },
  { id: "a11y", label: "Accessibility", group: "primary" },
  { id: "changelog", label: "Change Log", group: "primary" },
  { id: "props", label: "Props", group: "developer" },
  { id: "code", label: "Code", group: "developer" },
];

export const DOC_TAB_LABELS = Object.fromEntries(
  DOC_TABS.map((tab) => [tab.id, tab.label])
) as Record<DocTabId, string>;

export const PRIMARY_DOC_TABS = DOC_TABS.filter((tab) => tab.group === "primary");
export const DEVELOPER_DOC_TABS = DOC_TABS.filter((tab) => tab.group === "developer");

/** @deprecated use DOC_TABS */
export const TEMPLATE_SECTIONS = DOC_TABS.map(({ id, label }) => ({ id, label }));

/** @deprecated use DOC_TAB_LABELS */
export const TEMPLATE_SECTION_LABELS = DOC_TAB_LABELS;
