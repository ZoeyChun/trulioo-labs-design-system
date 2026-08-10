import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";
import { SideNavAnatomySpecimen } from "./SideNavAnatomySpecimen";

const sideNavPins = [
  { number: 1, direction: "right" as const, selector: ".tds-side-nav__brand-logo", anchor: { y: 0.5 } },
  { number: 2, direction: "right" as const, selector: ".ds-anatomy-side-nav__home", anchor: { y: 0.5 } },
  { number: 3, direction: "right" as const, selector: ".tds-side-nav__nav-item--active", anchor: { y: 0.5 } },
  { number: 4, direction: "left" as const, selector: ".tds-side-nav__section-title", anchor: { y: 0.5 } },
  { number: 5, direction: "left" as const, selector: ".tds-side-nav__sub-item--selected", anchor: { y: 0.5 } },
  { number: 6, direction: "right" as const, selector: ".tds-side-nav__divider", anchor: { y: 0.5 } },
  { number: 7, direction: "right" as const, selector: ".tds-side-nav__collapse-bar", anchor: { y: 0.5 } },
  { number: 8, direction: "right" as const, selector: ".tds-side-nav__profile", anchor: { y: 0.5 } },
];

export function SideNavAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Expanded workspace rail with brand header, Home + expandable Labs group, KYB/KYC sub-nav sections, collapse control, and profile footer."
      api=".tds-side-nav · __brand-logo · __nav-item · __sub-item · __section-title · __collapse-bar · __profile"
      tag="Figma 1187:10323"
      parts={[
        {
          number: 1,
          name: "Brand logo",
          api: ".tds-side-nav__brand-logo",
          detail:
            "Trulioo Labs wordmark in expanded mode. The logo mark (.tds-side-nav__logo) replaces it when collapsed.",
        },
        {
          number: 2,
          name: "Nav item",
          api: ".tds-side-nav__nav-item",
          detail: "Top-level destination with icon and label — e.g. Home.",
        },
        {
          number: 3,
          name: "Expandable group",
          api: ".tds-side-nav__nav-group",
          detail: "Active nav item with chevron that reveals nested sub-nav. aria-expanded='true' when open.",
        },
        {
          number: 4,
          name: "Section title",
          api: ".tds-side-nav__section-title",
          detail: "Uppercase group label inside sub-nav — KYB, KYC, etc.",
        },
        {
          number: 5,
          name: "Sub-item",
          api: ".tds-side-nav__sub-item",
          detail: "Nested destination under a section. --selected marks the current page.",
        },
        {
          number: 6,
          name: "Divider",
          api: ".tds-side-nav__divider",
          detail: "Separates unrelated sub-nav sections within an expanded group.",
        },
        {
          number: 7,
          name: "Collapse bar",
          api: ".tds-side-nav__collapse-bar",
          detail: "Toggles expanded ↔ collapsed. Pair icon with Hide Sidebar label.",
        },
        {
          number: 8,
          name: "Profile footer",
          api: ".tds-side-nav__profile",
          detail: "Avatar, name, email, and chevron — or avatar-only when collapsed.",
        },
      ]}
    >
      <AnatomyPinLayer pins={sideNavPins} className="ds-anatomy-diagram--side-nav">
        <SideNavAnatomySpecimen />
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const navItemPins = [
  { number: 1, direction: "left" as const, selector: ".tds-nav-item__current-selection" },
  { number: 2, direction: "top" as const, selector: ".tds-nav-item__content" },
  { number: 3, direction: "right" as const, selector: ".tds-nav-item__trailing-visual" },
];

export function NavItemAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Single row in a nav list or dropdown panel. Supports label, description, leading/trailing visuals, and active indicator."
      api=".tds-nav-item · __content · __current-selection"
      parts={[
        {
          number: 1,
          name: "Current selection bar",
          api: ".tds-nav-item__current-selection",
          detail: "3px teal bar on the leading edge for active items.",
        },
        {
          number: 2,
          name: "Label",
          api: ".tds-nav-item__label",
          detail: "Primary row text. Use __description for secondary copy.",
        },
        {
          number: 3,
          name: "Trailing visual",
          api: ".tds-nav-item__trailing-visual",
          detail: "Chevron or icon hinting at nested content or external navigation.",
        },
      ]}
    >
      <AnatomyPinLayer pins={navItemPins}>
        <div className="tds-dropdown-panel" style={{ width: 260 }}>
          <button type="button" className="tds-nav-item tds-nav-item--md tds-nav-item--active">
            <span className="tds-nav-item__current-selection" aria-hidden="true" />
            <div className="tds-nav-item__content">
              <span className="tds-nav-item__label">Entities</span>
              <span className="tds-nav-item__description">Manage business entities</span>
            </div>
            <span className="tds-nav-item__trailing-visual">
              <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </span>
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const navListPins = [
  { number: 1, direction: "top" as const, selector: ".tds-nav-list__heading:first-of-type" },
  { number: 2, direction: "right" as const, selector: ".tds-nav-item" },
  { number: 3, direction: "bottom" as const, selector: ".tds-nav-list__divider" },
];

export function NavListAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Grouped list container for sidebar and panel navigation with headings, dividers, and collapsible sections."
      api=".tds-nav-list · __heading · __collapse-trigger"
      parts={[
        {
          number: 1,
          name: "Group heading",
          api: ".tds-nav-list__heading",
          detail: "Uppercase label/sm section title.",
        },
        {
          number: 2,
          name: "Nav item row",
          api: ".tds-nav-item",
          detail: "Interactive destination inside the list.",
        },
        {
          number: 3,
          name: "Divider",
          api: ".tds-nav-list__divider",
          detail: "Separates unrelated groups within the same list.",
        },
      ]}
    >
      <AnatomyPinLayer pins={navListPins}>
        <div className="card" style={{ maxWidth: 240, padding: 0 }}>
          <div className="tds-nav-list">
            <div className="tds-nav-list__heading">Workspace</div>
            <button type="button" className="tds-nav-item tds-nav-item--active">
              <span className="tds-nav-item__current-selection" aria-hidden="true" />
              <span>Dashboard</span>
            </button>
            <div className="tds-nav-list__divider" />
            <div className="tds-nav-list__heading">Settings</div>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const tabsPins = [
  { number: 1, direction: "bottom" as const, selector: ".tds-tabs__list", anchor: { x: 0.22 } },
  { number: 2, direction: "top" as const, selector: ".tds-tab-item--active", anchor: { x: 0.22 } },
  { number: 3, direction: "bottom" as const, selector: ".tds-tabs__divider", anchor: { x: 0.72 } },
];

export function TabsAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Horizontal tab bar with optional overflow scroll controls and a full-width divider beneath the row."
      api=".tds-tabs · __list · __divider · __overflow-btn"
      parts={[
        {
          number: 1,
          name: "Tab list",
          api: ".tds-tabs__list",
          detail: "Flex row of TabItem buttons. role='tablist' on the container.",
        },
        {
          number: 2,
          name: "Tab item",
          api: ".tds-tab-item",
          detail: "Individual tab with label and indicator slot.",
        },
        {
          number: 3,
          name: "Divider",
          api: ".tds-tabs__divider",
          detail: "1px rule spanning the full tab bar width.",
        },
      ]}
    >
      <AnatomyPinLayer pins={tabsPins}>
        <div className="tds-tabs">
          <div className="tds-tabs__row">
            <div className="tds-tabs__list" role="tablist">
              <button type="button" className="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true">
                <span className="tds-tab-item__content">Overview</span>
                <span className="tds-tab-item__indicator" aria-hidden="true" />
              </button>
              <button type="button" className="tds-tab-item" role="tab" aria-selected="false">
                <span className="tds-tab-item__content">Documents</span>
                <span className="tds-tab-item__indicator" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="tds-tabs__divider" aria-hidden="true" />
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const tabItemPins = [
  { number: 1, direction: "top" as const, selector: ".tds-tab-item__content", anchor: { x: 0.22 } },
  { number: 2, direction: "bottom" as const, selector: ".tds-tab-item__indicator", anchor: { x: 0.32 } },
  { number: 3, direction: "top" as const, selector: ".tds-tab-item__counter", anchor: { x: 0.5 } },
];

export function TabItemAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Interactive tab control with label, optional counter badge, and 3px underline indicator."
      api=".tds-tab-item · __content · __indicator · __counter"
      parts={[
        {
          number: 1,
          name: "Label",
          api: ".tds-tab-item__content",
          detail: "Tab text at label/md medium. May include a counter inline.",
        },
        {
          number: 2,
          name: "Indicator",
          api: ".tds-tab-item__indicator",
          detail: "3px teal underline on active tab. Empty slot on inactive tabs for height.",
        },
        {
          number: 3,
          name: "Counter",
          api: ".tds-tab-item__counter",
          detail: "Optional count badge inside the label for actionable totals.",
        },
      ]}
    >
      <AnatomyPinLayer pins={tabItemPins}>
        <button type="button" className="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true">
          <span className="tds-tab-item__content">
            Activity <span className="tds-tab-item__counter">14</span>
          </span>
          <span className="tds-tab-item__indicator" aria-hidden="true" />
        </button>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const filterTabPins = [
  { number: 1, direction: "top" as const, selector: ".tds-filter-tabs", anchor: { x: 0.12 } },
  { number: 2, direction: "bottom" as const, selector: ".tds-filter-tab--selected", anchor: { x: 0.38 } },
  { number: 3, direction: "top" as const, selector: ".tds-filter-tab--selected .tds-counter", anchor: { x: 0.5 } },
];

export function FilterTabAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Pill-shaped filter control inside a FilterTabs container. Selected state uses interactive fill."
      api=".tds-filter-tabs · .tds-filter-tab · .tds-counter"
      tag="Figma 844:6968"
      parts={[
        {
          number: 1,
          name: "Filter container",
          api: ".tds-filter-tabs",
          detail: "Inline-flex row with gap-8. role='tablist' for filter semantics.",
        },
        {
          number: 2,
          name: "Filter pill",
          api: ".tds-filter-tab",
          detail: "Individual filter button. --selected or aria-selected='true' when active.",
        },
        {
          number: 3,
          name: "Counter",
          api: ".tds-counter--secondary.tds-counter--sm",
          detail: "Optional count badge paired with the pill label.",
        },
      ]}
    >
      <AnatomyPinLayer pins={filterTabPins}>
        <div className="tds-filter-tabs" role="tablist">
          <button type="button" className="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
            All <span className="tds-counter tds-counter--secondary tds-counter--sm">12</span>
          </button>
          <button type="button" className="tds-filter-tab" role="tab" aria-selected="false">
            Active
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const filterTab2Pins = [
  { number: 1, direction: "bottom" as const, selector: ".tds-filter-tab:not(.tds-filter-tab--selected)", anchor: { x: 0.5 } },
  { number: 2, direction: "top" as const, selector: ".tds-filter-tab--selected", anchor: { x: 0.5 } },
];

export function FilterTab2Anatomy() {
  return (
    <ComponentAnatomyCard
      desc="FilterTabsItem is the atomic pill — same markup as .tds-filter-tab, composed inside FilterTabs."
      api=".tds-filter-tab · .tds-filter-tab--selected"
      tag="Figma 346:10174"
      parts={[
        {
          number: 1,
          name: "Pill button",
          api: ".tds-filter-tab",
          detail: "role='tab' button with label text and optional counter.",
        },
        {
          number: 2,
          name: "Selected state",
          api: ".tds-filter-tab--selected",
          detail: "Interactive fill with inverse label typography.",
        },
      ]}
    >
      <AnatomyPinLayer pins={filterTab2Pins} className="ds-anatomy-diagram--inline">
        <div className="tds-filter-tabs" role="tablist">
          <button type="button" className="tds-filter-tab" role="tab" aria-selected="false">
            Draft
          </button>
          <button type="button" className="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
            Active
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const breadcrumbPins = [
  { number: 1, direction: "bottom" as const, selector: ".tds-breadcrumbs a.tds-breadcrumb-item", anchor: { x: 0.5 } },
  { number: 2, direction: "bottom" as const, selector: ".tds-breadcrumb-divider", anchor: { x: 0.5 } },
  { number: 3, direction: "bottom" as const, selector: ".tds-breadcrumb-item--current", anchor: { x: 0.5 } },
];

export function BreadcrumbAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Hierarchical path with linked ancestors, slash dividers, and a non-interactive current page."
      api=".tds-breadcrumbs · .tds-breadcrumb-item · .tds-breadcrumb-divider"
      tag="Figma 1596:23587"
      parts={[
        {
          number: 1,
          name: "Link item",
          api: "a.tds-breadcrumb-item",
          detail: "Ancestor pages in teal body/xs with hover underline.",
        },
        {
          number: 2,
          name: "Divider",
          api: ".tds-breadcrumb-divider",
          detail: "Slash separator in icon-faint. Mark aria-hidden='true'.",
        },
        {
          number: 3,
          name: "Current page",
          api: ".tds-breadcrumb-item--current",
          detail: "Non-link span with default text and aria-current='page'.",
        },
      ]}
    >
      <AnatomyPinLayer pins={breadcrumbPins} className="ds-anatomy-diagram--inline">
        <nav className="tds-breadcrumbs" aria-label="Breadcrumb">
          <a href="#" className="tds-breadcrumb-item">
            Entities
          </a>
          <span className="tds-breadcrumb-divider" aria-hidden="true">
            /
          </span>
          <span className="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">
            Acme Corp
          </span>
        </nav>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
