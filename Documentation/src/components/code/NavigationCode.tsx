import { CodeBlock } from "../CodeBlock";
import {
  CodeSection,
  ComponentCodeLayout,
  PropsTable,
} from "./CodePageLayout";

type CodePageProps = {
  basePath: string;
};

export function SideNavCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "modes", label: "Modes" },
    { id: "parts", label: "Sub-parts" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Import the side-nav entry stylesheet. NavItem and NavList styles load via nested imports.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/side-nav/side-nav.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          description="SideNav is an aside landmark containing header, main navigation, and footer regions."
          props={[
            {
              name: ".tds-side-nav",
              description: "Root sidebar container. Pair with --expanded or --collapsed.",
              type: "<aside>",
              required: true,
            },
            {
              name: ".tds-side-nav__header",
              description: "Brand logo and product name row.",
              type: "<div>",
              required: true,
            },
            {
              name: ".tds-side-nav__main",
              description: "Primary navigation stack or icon rail.",
              type: "<div>",
              required: true,
            },
            {
              name: ".tds-side-nav__footer",
              description: "User profile and secondary actions.",
              type: "<div>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Modes" id="modes">
        <PropsTable
          title="Layout modifiers"
          props={[
            {
              name: ".tds-side-nav--expanded",
              description: "Full-width rail with labels, nested groups, and profile details.",
              type: "expanded | collapsed",
            },
            {
              name: ".tds-side-nav--collapsed",
              description: "72px icon rail. Icon buttons replace labeled nav items.",
              type: "expanded | collapsed",
            },
            {
              name: ".tds-side-nav__icon-rail",
              description: "Container for collapsed-mode icon buttons.",
              type: "<div>",
            },
            {
              name: ".tds-side-nav__tooltip",
              description: "Inverse tooltip shown on hover in collapsed mode.",
              type: "<span>",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sub-parts" id="parts">
        <PropsTable
          title="Nested elements"
          props={[
            {
              name: ".tds-side-nav__nav-item",
              description: "Top-level navigation button with icon, label, and optional chevron.",
              type: "<button>",
            },
            {
              name: ".tds-side-nav__sub-item",
              description: "Nested item under an expanded nav group.",
              type: "<button>",
            },
            {
              name: ".tds-side-nav__section-title",
              description: "Uppercase group label inside sub-nav.",
              type: "<div>",
            },
            {
              name: ".tds-side-nav__profile",
              description: "User card with avatar, name, and email.",
              type: "<button>",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function NavItemCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "sizes", label: "Sizes" },
    { id: "states", label: "States" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          NavItem styles live under side-nav. Import via the nav-item entry or the side-nav bundle.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/side-nav/nav-item/nav-item.css';`} />
        <CodeBlock
          code={`<button type="button" class="tds-nav-item tds-nav-item--md tds-nav-item--active" aria-current="page">
  <span class="tds-nav-item__current-selection" aria-hidden="true"></span>
  <span>Dashboard</span>
</button>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-nav-item",
              description: "Full-width interactive row in nav lists and dropdown panels.",
              type: "<button>",
              required: true,
            },
            {
              name: ".tds-nav-item__content",
              description: "Stacked label and description layout.",
              type: "<div>",
            },
            {
              name: ".tds-nav-item__current-selection",
              description: "Leading-edge active indicator bar.",
              type: "<span>",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Size classes"
          props={[
            {
              name: ".tds-nav-item--sm",
              description: "30px row height. Nested lists and compact panels.",
              type: "sm | md | lg",
            },
            {
              name: ".tds-nav-item--md",
              description: "34px row height. Default for sidebars.",
              type: "sm | md | lg",
              default: "Recommended default",
            },
            {
              name: ".tds-nav-item--lg",
              description: "38px row height. Spacious panels only.",
              type: "sm | md | lg",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="State modifiers"
          props={[
            {
              name: ".tds-nav-item--active",
              description: "Selected row styling. Pair with aria-current='page'.",
              type: "CSS class",
            },
            {
              name: "disabled",
              description: "Native attribute for unavailable destinations.",
              type: "HTML attribute",
            },
            {
              name: ".tds-nav-item--disabled",
              description: "Visual disabled styling when using aria-disabled.",
              type: "CSS class",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function NavListCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "structure", label: "Structure" },
    { id: "collapse", label: "Collapsible" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/side-nav/nav-list/nav-list.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-nav-list",
              description: "Vertical stack of headings, nav items, and dividers.",
              type: "<div>",
              required: true,
            },
            {
              name: ".tds-nav-list__heading",
              description: "Uppercase section label.",
              type: "<div>",
            },
            {
              name: ".tds-nav-list__divider",
              description: "Horizontal rule between groups.",
              type: "<div>",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Structure" id="structure">
        <CodeBlock
          code={`<div class="tds-nav-list">
  <div class="tds-nav-list__heading">Workspace</div>
  <button type="button" class="tds-nav-item tds-nav-item--active">Dashboard</button>
  <button type="button" class="tds-nav-item">Verifications</button>
  <div class="tds-nav-list__divider"></div>
  <div class="tds-nav-list__heading">Settings</div>
  <button type="button" class="tds-nav-item">Preferences</button>
</div>`}
        />
      </CodeSection>

      <CodeSection title="Collapsible" id="collapse">
        <PropsTable
          title="Collapse classes"
          props={[
            {
              name: ".tds-nav-list__collapse-trigger",
              description: "Expand/collapse button for grouped items. Toggle aria-expanded.",
              type: "<button>",
            },
            {
              name: ".tds-nav-list__collapse-content",
              description: "Container for nested nav items. Use hidden when collapsed.",
              type: "<div>",
            },
            {
              name: ".tds-nav-list__collapse-icon",
              description: "Chevron indicating expanded/collapsed state.",
              type: "<span>",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function TabsCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "overflow", label: "Overflow scroll" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/tabs/tabs.css';`} />
        <CodeBlock
          code={`<div class="tds-tabs">
  <div class="tds-tabs__row">
    <div class="tds-tabs__list" role="tablist">
      <button type="button" class="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true">
        <span class="tds-tab-item__content">Overview</span>
        <span class="tds-tab-item__indicator" aria-hidden="true"></span>
      </button>
    </div>
  </div>
  <div class="tds-tabs__divider" aria-hidden="true"></div>
</div>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-tabs",
              description: "Tab bar container with row and divider.",
              type: "<div>",
              required: true,
            },
            {
              name: ".tds-tabs__list",
              description: "Flex row of tab items. Apply role='tablist'.",
              type: "<div>",
              required: true,
            },
            {
              name: ".tds-tabs__divider",
              description: "Full-width 1px rule below the tab row.",
              type: "<div>",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Overflow scroll" id="overflow">
        <PropsTable
          title="Scroll modifiers"
          props={[
            {
              name: ".tds-tabs--scrollable",
              description: "Enables horizontal scroll when tabs overflow the container.",
              type: "CSS class",
            },
            {
              name: ".tds-tabs__overflow-btn",
              description: "Left/right scroll control. Include aria-label.",
              type: "<button>",
            },
            {
              name: ".tds-tabs__overflow-btn--elevated",
              description: "Right button with gradient fade for 4+ tabs.",
              type: "CSS class",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function TabItemCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "states", label: "States" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/tabs/tab-item/tab-item.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-tab-item",
              description: "Tab button with role='tab' and aria-selected.",
              type: "<button>",
              required: true,
            },
            {
              name: ".tds-tab-item__content",
              description: "Visible tab label at label/md medium.",
              type: "<span>",
              required: true,
            },
            {
              name: ".tds-tab-item__indicator",
              description: "3px underline slot — include on every tab for consistent height.",
              type: "<span>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="State modifiers"
          props={[
            {
              name: ".tds-tab-item--active",
              description: "Filled teal indicator and selected typography.",
              type: "CSS class",
            },
            {
              name: ".tds-tab-item--disabled",
              description: "Muted styling. Pair with disabled attribute.",
              type: "CSS class",
            },
            {
              name: ".tds-tab-item__counter",
              description: "Inline count badge inside the label.",
              type: "<span>",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function FilterTabCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "selection", label: "Selection" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/filter-tab/filter-tab.css';`} />
        <CodeBlock
          code={`<div class="tds-filter-tabs" role="tablist" aria-label="Status filters">
  <button type="button" class="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
    All <span class="tds-counter tds-counter--secondary tds-counter--sm">12</span>
  </button>
  <button type="button" class="tds-filter-tab" role="tab" aria-selected="false">Active</button>
</div>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-filter-tabs",
              description: "Inline-flex container for filter pills.",
              type: "<div>",
              required: true,
            },
            {
              name: ".tds-filter-tab",
              description: "Individual pill button with role='tab'.",
              type: "<button>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Selection" id="selection">
        <PropsTable
          title="Selected state"
          props={[
            {
              name: ".tds-filter-tab--selected",
              description: "Interactive fill with inverse label typography.",
              type: "CSS class",
            },
            {
              name: 'aria-selected="true"',
              description: "Preferred ARIA pattern for the active filter pill.",
              type: "HTML attribute",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function FilterTab2Code({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "markup", label: "Markup" },
    { id: "states", label: "States" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          FilterTabsItem shares CSS with FilterTabs — import the same stylesheet.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/filter-tab/filter-tab.css';`} />
      </CodeSection>

      <CodeSection title="Markup" id="markup">
        <CodeBlock
          code={`<button type="button" class="tds-filter-tab" role="tab" aria-selected="false">
  Draft
</button>`}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="Pill states"
          props={[
            {
              name: ".tds-filter-tab--selected",
              description: "Selected pill with interactive fill.",
              type: "CSS class",
            },
            {
              name: ":hover",
              description: "Surface hover on unselected pills; interactive-hover on selected.",
              type: "Pseudo-class",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function BreadcrumbCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "markup", label: "Markup" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/breadcrumb/breadcrumb.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-breadcrumbs",
              description: "Flex row container. Wrap in nav with aria-label.",
              type: "<nav>",
              required: true,
            },
            {
              name: ".tds-breadcrumb-item",
              description: "Ancestor link or current page text.",
              type: "<a> | <span>",
              required: true,
            },
            {
              name: ".tds-breadcrumb-divider",
              description: "Slash separator between items. aria-hidden='true'.",
              type: "<span>",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Markup" id="markup">
        <CodeBlock
          code={`<nav class="tds-breadcrumbs" aria-label="Breadcrumb">
  <a href="#" class="tds-breadcrumb-item">Entities</a>
  <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
  <span class="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">Acme Corp</span>
</nav>`}
        />
        <PropsTable
          title="Current page"
          props={[
            {
              name: ".tds-breadcrumb-item--current",
              description: "Non-link current page in default text color.",
              type: "CSS class",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}
