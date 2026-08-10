import { CodeBlock } from "../CodeBlock";
import {
  CodeSection,
  ComponentCodeLayout,
  PropsTable,
} from "./CodePageLayout";

type CodePageProps = {
  basePath: string;
};

export function IconButtonCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "variants", label: "Variants" },
    { id: "sizes", label: "Sizes" },
    { id: "states", label: "States" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Import the icon-button stylesheet. Spinner styles are pulled in for loading states.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/icon-button/icon-button.css';`} />
        <CodeBlock
          code={`<button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary" aria-label="Download report">
  <span class="tds-icon-btn__icon" aria-hidden="true"><!-- 16×16 SVG --></span>
</button>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          description="Every icon button must include the base class, a size modifier, and an aria-label."
          props={[
            {
              name: ".tds-icon-btn",
              description:
                "Base icon button. Square hit area with centered icon. Always pair with aria-label.",
              type: "<button>",
              required: true,
            },
            {
              name: ".tds-icon-btn__icon",
              description: "Icon wrapper spanning 16×16. Contains a single SVG.",
              type: "<span>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Variants" id="variants">
        <PropsTable
          title="Variant classes"
          props={[
            {
              name: ".tds-icon-btn--primary",
              description: "Solid teal fill. Use for the dominant icon action in a toolbar.",
              type: "primary | secondary | danger | invisible",
            },
            {
              name: ".tds-icon-btn--secondary",
              description: "Bordered button. Default when no variant class is present.",
              type: "primary | secondary | danger | invisible",
              default: "Applied when no variant class is present",
            },
            {
              name: ".tds-icon-btn--danger",
              description: "Red styling for destructive icon actions (delete, remove).",
              type: "primary | secondary | danger | invisible",
            },
            {
              name: ".tds-icon-btn--invisible",
              description: "No border, teal icon. Selected state in button groups.",
              type: "primary | secondary | danger | invisible",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Size classes"
          props={[
            {
              name: ".tds-icon-btn--sm",
              description: "24×24 hit area. Use in table toolbars and compact rows.",
              type: "sm | md | lg",
            },
            {
              name: ".tds-icon-btn--md",
              description: "32×32 hit area. Default for standard toolbars and dialogs.",
              type: "sm | md | lg",
              default: "Recommended default",
            },
            {
              name: ".tds-icon-btn--lg",
              description: "40×40 hit area. Use in page-level headers and full-screen overlays.",
              type: "sm | md | lg",
            },
            {
              name: ".tds-icon-btn--circular",
              description: "Fully round border-radius. Combine with any size and variant.",
              type: "CSS class",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="State modifiers"
          props={[
            {
              name: "disabled",
              description: "Native attribute. Removes from tab order and applies muted styling.",
              type: "HTML attribute",
            },
            {
              name: ".tds-icon-btn--inactive",
              description: "Visually muted but still focusable. Shows a selected-but-unavailable state.",
              type: "CSS class",
            },
            {
              name: ".tds-icon-btn--loading",
              description:
                "Replaces .tds-icon-btn__icon with .tds-spinner--xs. Pair with aria-busy='true'.",
              type: "CSS class",
            },
            {
              name: ".tds-icon-btn--focus",
              description: "Simulates focus ring for documentation demos. Not for production.",
              type: "CSS class (demo only)",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function ButtonGroupCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "composition", label: "Composition" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Import button-group CSS along with button and/or icon-button styles for child elements.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/button-group/button-group.css';`} />
        <CodeBlock
          code={`<div class="tds-button-group" role="group" aria-label="View mode">
  <button type="button" class="tds-btn tds-btn--sm tds-btn--invisible">Summary</button>
  <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary">Owners</button>
  <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary">Documents</button>
</div>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-button-group",
              description:
                "Flex container that visually connects 2–5 child buttons. Apply role='group' and a descriptive aria-label.",
              type: "<div>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Composition" id="composition">
        <PropsTable
          title="Child elements"
          props={[
            {
              name: ".tds-btn",
              description: "Text button segments. Selected segment uses .tds-btn--invisible.",
              type: "<button>",
            },
            {
              name: ".tds-icon-btn",
              description: "Icon-only segments. Selected segment uses .tds-icon-btn--invisible.",
              type: "<button>",
            },
            {
              name: "role='group'",
              description: "Identifies the container as a related set of controls.",
              type: "HTML attribute",
            },
            {
              name: "aria-label",
              description: "Names the group's purpose (e.g. 'View mode', 'Date range').",
              type: "HTML attribute",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function SegmentedControlCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "sizes", label: "Sizes" },
    { id: "modes", label: "Modes" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Import segmented-control styles for compact mutually exclusive toggles.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/segmented-control/segmented-control.css';`} />
        <CodeBlock
          code={`<div class="tds-segmented-control" role="group" aria-label="Date range">
  <button type="button" class="tds-segmented-control__item" aria-pressed="false">
    <span class="tds-segmented-control__label">Day</span>
  </button>
  <button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" aria-pressed="true">
    <span class="tds-segmented-control__label">Week</span>
  </button>
  <button type="button" class="tds-segmented-control__item" aria-pressed="false">
    <span class="tds-segmented-control__label">Month</span>
  </button>
</div>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-segmented-control",
              description: "Neutral track container for 2–6 segment buttons. Apply role='group' and aria-label.",
              type: "<div>",
              required: true,
            },
            {
              name: ".tds-segmented-control__item",
              description: "Individual segment button. Toggle .tds-segmented-control__item--selected or aria-pressed.",
              type: "<button>",
              required: true,
            },
            {
              name: ".tds-segmented-control__label",
              description: "Visible text label inside text-mode segments.",
              type: "<span>",
            },
            {
              name: ".tds-segmented-control__icon",
              description: "Optional leading icon inside a segment.",
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
              name: ".tds-segmented-control--sm",
              description: "28px segment height with xs label typography.",
              type: "default | sm",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Modes" id="modes">
        <PropsTable
          title="Layout modes"
          props={[
            {
              name: ".tds-segmented-control--icon-only",
              description: "Square icon-only segments. Each button requires aria-label.",
              type: "CSS class",
            },
            {
              name: 'aria-pressed="true|false"',
              description: "Reflects selected segment for assistive technology.",
              type: "HTML attribute",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function SpinnerCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "sizes", label: "Sizes" },
    { id: "block", label: "Spinner block" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Import spinner styles. Used standalone or embedded inside buttons and icon buttons.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/spinner/spinner.css';`} />
        <CodeBlock
          code={`<span class="tds-spinner tds-spinner--md" role="status" aria-label="Loading"></span>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-spinner",
              description:
                "Animated loading ring. Always pair with a size modifier. Add role='status' and aria-label when standalone.",
              type: "<span>",
              required: true,
            },
            {
              name: ".tds-spinner--negative",
              description: "Red tone variant for error or destructive loading contexts.",
              type: "CSS class",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Size classes"
          props={[
            {
              name: ".tds-spinner--xs",
              description: "12px. Use inside icon buttons (.tds-icon-btn--loading).",
              type: "xs | sm | md | lg | xl",
            },
            {
              name: ".tds-spinner--sm",
              description: "16px. Use inside text buttons (.tds-btn--loading).",
              type: "xs | sm | md | lg | xl",
            },
            {
              name: ".tds-spinner--md",
              description: "24px. Default for inline section loading.",
              type: "xs | sm | md | lg | xl",
              default: "Recommended default",
            },
            {
              name: ".tds-spinner--lg",
              description: "32px. Page-section loading indicators.",
              type: "xs | sm | md | lg | xl",
            },
            {
              name: ".tds-spinner--xl",
              description: "48px. Full-page or modal loading states.",
              type: "xs | sm | md | lg | xl",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Spinner block" id="block">
        <PropsTable
          title="Block layout"
          props={[
            {
              name: ".tds-spinner-block",
              description: "Vertical stack of spinner + label for page-level waits.",
              type: "<div>",
            },
            {
              name: ".tds-spinner-block__label",
              description: "Descriptive loading text below the spinner.",
              type: "<span>",
            },
            {
              name: ".tds-spinner-block--{sm|md|lg|xl}",
              description: "Controls label font size to match spinner scale.",
              type: "sm | md | lg | xl",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function ButtonMenuCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "structure", label: "Structure" },
    { id: "attributes", label: "ARIA attributes" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Import button-menu, button, dropdown-panel, and action-list-item styles.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/button-menu/button-menu.css';`} />
        <CodeBlock
          code={`<div class="tds-button-menu">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary"
    aria-haspopup="menu" aria-expanded="false">
    More actions
  </button>
</div>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-button-menu",
              description:
                "Relative container wrapping the trigger button and dropdown panel. Positions the panel 4px below the trigger.",
              type: "<div>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Structure" id="structure">
        <PropsTable
          title="Child elements"
          props={[
            {
              name: ".tds-btn",
              description: "Trigger button that opens/closes the menu.",
              type: "<button>",
            },
            {
              name: ".tds-dropdown-panel",
              description: "Floating menu panel with role='menu'.",
              type: "<div>",
            },
            {
              name: ".tds-action-list-item",
              description: "Individual menu action with role='menuitem'.",
              type: "<button>",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="ARIA attributes" id="attributes">
        <PropsTable
          title="Accessibility"
          props={[
            {
              name: 'aria-haspopup="menu"',
              description: "On the trigger button. Indicates a menu will open.",
              type: "HTML attribute",
            },
            {
              name: 'aria-expanded="true|false"',
              description: "On the trigger. Reflects whether the menu is open.",
              type: "HTML attribute",
            },
            {
              name: 'role="menu"',
              description: "On the dropdown panel container.",
              type: "HTML attribute",
            },
            {
              name: 'role="menuitem"',
              description: "On each action list item inside the panel.",
              type: "HTML attribute",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function SwitchCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "sizes", label: "Sizes" },
    { id: "states", label: "States" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">Import the switch stylesheet for toggle controls.</p>
        <CodeBlock code={`@import 'trulioo-ds/Components/switch/switch.css';`} />
        <CodeBlock
          code={`<label class="tds-switch">
  <span class="tds-switch__label-group">Enable monitoring</span>
  <div class="tds-switch__track tds-switch__track--md tds-switch__track--on"
    role="switch" aria-checked="true">
    <span class="tds-switch__indicator" aria-hidden="true"></span>
    <span class="tds-switch__handle" aria-hidden="true"></span>
  </div>
</label>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-switch",
              description: "Label wrapper connecting text label to the track control.",
              type: "<label>",
              required: true,
            },
            {
              name: ".tds-switch__track",
              description: "Interactive track with role='switch' and aria-checked.",
              type: "<div>",
              required: true,
            },
            {
              name: ".tds-switch__indicator",
              description: "Left segment showing ON state fill.",
              type: "<span>",
              required: true,
            },
            {
              name: ".tds-switch__handle",
              description: "Draggable pill handle.",
              type: "<span>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Track sizes"
          props={[
            {
              name: ".tds-switch__track--md",
              description: "64×32 track. Default for form settings and panels.",
              type: "md | sm",
              default: "Recommended default",
            },
            {
              name: ".tds-switch__track--sm",
              description: "48×24 track. Compact settings rows and table headers.",
              type: "md | sm",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="State modifiers"
          props={[
            {
              name: ".tds-switch__track--on",
              description: "Static ON state for demos. In production, use aria-checked='true'.",
              type: "CSS class",
            },
            {
              name: 'aria-checked="true|false"',
              description: "Reflects toggle state on the track element.",
              type: "HTML attribute",
            },
            {
              name: ".tds-switch--disabled",
              description: "On the label wrapper. Mutes track and prevents interaction.",
              type: "CSS class",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function CheckboxCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "states", label: "States" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Import checkbox styles. Apply to native input elements for full keyboard and screen reader support.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/checkbox/checkbox.css';`} />
        <CodeBlock
          code={`<label>
  <input type="checkbox" class="tds-checkbox" />
  Include inactive businesses
</label>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-checkbox",
              description:
                "Styled native checkbox input. 16×16 with border-radius sm. Always wrap in a <label>.",
              type: '<input type="checkbox">',
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="State selectors"
          props={[
            {
              name: ":checked",
              description: "Teal fill with checkmark icon via CSS pseudo-element.",
              type: "CSS pseudo-class",
            },
            {
              name: ":indeterminate",
              description: "Teal fill with horizontal bar. Set via JavaScript on the input element.",
              type: "CSS pseudo-class",
            },
            {
              name: ":disabled",
              description: "Muted fill and border. Label text should also use disabled color.",
              type: "CSS pseudo-class",
            },
            {
              name: ":focus-visible",
              description: "2px teal focus ring via ::before pseudo-element.",
              type: "CSS pseudo-class",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function DismissActionCode({ basePath }: CodePageProps) {
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
          Import dismiss-action styles for modal, drawer, and panel close buttons.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/dismiss-action/dismiss-action.css';`} />
        <CodeBlock
          code={`<button type="button" class="tds-dismiss tds-dismiss--md" aria-label="Close verification panel">
  <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <path d="M4 4l8 8M12 4l-8 8"/>
  </svg>
</button>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-dismiss",
              description:
                "Transparent icon-only close button. Requires aria-label naming the dismissed content.",
              type: "<button>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Size classes"
          props={[
            {
              name: ".tds-dismiss--sm",
              description: "24×24. Compact toasts and inline banners.",
              type: "sm | md | lg",
            },
            {
              name: ".tds-dismiss--md",
              description: "28×28. Default for modals and side panels.",
              type: "sm | md | lg",
              default: "Recommended default",
            },
            {
              name: ".tds-dismiss--lg",
              description: "32×32. Full-screen overlays and large dialogs.",
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
              name: "disabled",
              description: "Native attribute. Muted icon color and not-allowed cursor.",
              type: "HTML attribute",
            },
            {
              name: ".tds-dismiss--selected",
              description: "Highlighted background for active/selected dismiss state.",
              type: "CSS class",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}
