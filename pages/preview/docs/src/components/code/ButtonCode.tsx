import { CodeBlock } from "../CodeBlock";
import {
  CodeSection,
  ComponentCodeLayout,
  PropsTable,
} from "./CodePageLayout";

const BUTTON_SECTIONS = [
  { id: "install", label: "Install" },
  { id: "base", label: "Base class" },
  { id: "variants", label: "Variants" },
  { id: "sizes", label: "Sizes" },
  { id: "states", label: "States" },
  { id: "slots", label: "Child slots" },
  { id: "modifiers", label: "Modifiers" },
];

type ButtonCodeProps = {
  basePath: string;
};

export function ButtonCode({ basePath }: ButtonCodeProps) {
  return (
    <ComponentCodeLayout basePath={basePath} navItems={BUTTON_SECTIONS}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Import the button stylesheet. The spinner dependency is included automatically.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/button/button.css';`} />
        <CodeBlock
          code={`<button class="tds-btn tds-btn--md tds-btn--primary">
  Submit verification
</button>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          description="Every button element must include the base class and a size modifier."
          props={[
            {
              name: ".tds-btn",
              description:
                "Base button class. Sets display, alignment, gap, border-radius, font, cursor, and transition. Required on every button or anchor rendered as a button.",
              type: "<button> | <a>",
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Variants" id="variants">
        <p className="tds-code-section__desc">
          The visual style of the button. Controls background, border, and text color across all
          interaction states (hover, focus, active, disabled).
        </p>
        <PropsTable
          title="Variant classes"
          props={[
            {
              name: ".tds-btn--primary",
              description:
                "Solid teal fill with inverse text. Use for the single most important action on the page.",
              type: "primary | secondary | danger | invisible",
            },
            {
              name: ".tds-btn--secondary",
              description:
                "Bordered button on a neutral surface. The default variant when no variant class is applied.",
              type: "primary | secondary | danger | invisible",
              default: "Applied when no variant class is present",
            },
            {
              name: ".tds-btn--danger",
              description:
                "Red border at rest, red fill on hover. Reserve for destructive or irreversible actions (delete, remove, revoke).",
              type: "primary | secondary | danger | invisible",
            },
            {
              name: ".tds-btn--invisible",
              description:
                "No border, teal text. Use for low-emphasis actions in toolbars or alongside primary buttons.",
              type: "primary | secondary | danger | invisible",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <p className="tds-code-section__desc">
          Controls height, padding, and font size. One size class is required alongside the base
          class.
        </p>
        <PropsTable
          title="Size classes"
          props={[
            {
              name: ".tds-btn--sm",
              description:
                "Small button. 24px height, xs font size. Use in table rows, cards, and compact layouts.",
              type: "sm | md | lg",
            },
            {
              name: ".tds-btn--md",
              description:
                "Medium button. 32px height, sm font size. Default for toolbars, dialogs, and inline actions.",
              type: "sm | md | lg",
              default: "Recommended default",
            },
            {
              name: ".tds-btn--lg",
              description:
                "Large button. 42px height, sm font size. Use for page-level CTAs and full-width form submissions.",
              type: "sm | md | lg",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <p className="tds-code-section__desc">
          State classes and attributes that override the visual appearance. These can be combined
          with any variant.
        </p>
        <PropsTable
          title="State modifiers"
          props={[
            {
              name: "disabled",
              description:
                "Disables the button and removes it from the tab order. Use the native HTML attribute, not a class. Applies muted colors and not-allowed cursor.",
              type: "HTML attribute",
            },
            {
              name: ".tds-btn--inactive",
              description:
                "Visually muted but still in the DOM and tab order. Unlike disabled, the button remains interactive. Use when an action is contextually unavailable but the user should see it exists.",
              type: "CSS class",
            },
            {
              name: ".tds-btn--loading",
              description:
                'Disables pointer events and sets cursor to wait. Pair with a .tds-spinner child and aria-busy="true" to communicate the loading state.',
              type: "CSS class",
            },
            {
              name: 'aria-busy="true"',
              description:
                "Announce loading state to assistive technology. Add alongside .tds-btn--loading.",
              type: "HTML attribute",
            },
            {
              name: ".tds-btn--focus",
              description:
                "Simulates the :focus-visible ring for static demos and documentation screenshots. Not for production use.",
              type: "CSS class (demo only)",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Child slots" id="slots">
        <p className="tds-code-section__desc">
          Structured child elements placed inside the button. Icon slots accept a single 16x16 SVG
          or icon component.
        </p>
        <PropsTable
          title="Slot classes"
          props={[
            {
              name: ".tds-btn__leading-icon",
              description:
                "Icon slot before the label. Wraps a 16x16 SVG. Use for actions with strong icon association (download, add, search).",
              type: "<span> wrapping <svg>",
            },
            {
              name: ".tds-btn__trailing-icon",
              description:
                "Icon slot after the label. Typically a chevron or external-link indicator.",
              type: "<span> wrapping <svg>",
            },
            {
              name: ".tds-btn__counter",
              description:
                "Pill-shaped counter badge. Displays a numeric count inside the button (e.g. notification count, result count).",
              type: "<span> with text content",
            },
            {
              name: ".tds-spinner",
              description:
                "Loading spinner placed as a direct child of the button. Use .tds-spinner--sm for md/lg buttons and .tds-spinner--xs for sm buttons.",
              type: "<span> (from spinner.css)",
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Modifiers" id="modifiers">
        <PropsTable
          title="Layout modifiers"
          props={[
            {
              name: ".tds-btn--align-start",
              description:
                "Left-aligns button content instead of center. Use in dropdown triggers or full-width contexts where start-alignment matches the surrounding text.",
              type: "CSS class",
            },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}
