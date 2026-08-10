import { CodeBlock } from "../CodeBlock";
import {
  CodeSection,
  ComponentCodeLayout,
  PropsTable,
} from "./CodePageLayout";

type CodePageProps = {
  basePath: string;
};

export function TextInputCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "sizes", label: "Sizes" },
    { id: "states", label: "States" },
    { id: "variants", label: "Variants" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          TextInput pulls in shared field atoms (label, caption, validation) via nested imports.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/text-input/text-input.css';`} />
        <CodeBlock
          code={`<div class="tds-text-input">
  <label class="tds-field-label" for="business-name">Business name</label>
  <div class="tds-text-input__field tds-text-input__field--lg">
    <input class="tds-text-input__native" id="business-name" type="text" placeholder="Acme Corp">
  </div>
</div>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            { name: ".tds-text-input", description: "Field wrapper with vertical gap between label, field, and footer.", type: "<div>", required: true },
            { name: ".tds-text-input__field", description: "Bordered container for the native input.", type: "<div>", required: true },
            { name: ".tds-text-input__native", description: "Borderless text input element.", type: "<input>", required: true },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Size classes"
          props={[
            { name: ".tds-text-input__field--sm", description: "28px height.", type: "sm | md | lg" },
            { name: ".tds-text-input__field--md", description: "32px height. Default when no size class.", type: "sm | md | lg", default: "Recommended default" },
            { name: ".tds-text-input__field--lg", description: "40px height. Primary KYB/KYC forms.", type: "sm | md | lg" },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="State modifiers"
          props={[
            { name: ".tds-text-input--invalid", description: "Error border and validation message styling.", type: "CSS class" },
            { name: ".tds-text-input--success", description: "Success validation styling.", type: "CSS class" },
            { name: ".tds-text-input--disabled", description: "Muted field with disabled native input.", type: "CSS class" },
            { name: ".tds-text-input--readonly", description: "Non-editable display of current value.", type: "CSS class" },
            { name: ".tds-text-input__field--focus", description: "Demo-only focus ring simulation.", type: "CSS class (demo only)" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Variants" id="variants">
        <PropsTable
          title="Boolean slots"
          props={[
            { name: ".tds-text-input--inset", description: "Recessed surface variant.", type: "CSS class" },
            { name: ".tds-text-input__leading-icon", description: "Leading visual inside the field.", type: "<span>" },
            { name: ".tds-text-input__trailing-action", description: "Icon button (e.g. clear) inside the field.", type: "<button>" },
            { name: ".tds-text-input__footer", description: "Row for caption + validation side by side.", type: "<div>" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function SelectCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "sizes", label: "Sizes" },
    { id: "states", label: "States" },
    { id: "menu", label: "Menu" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/select/select.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            { name: ".tds-select", description: "Select field wrapper.", type: "<div>", required: true },
            { name: ".tds-select__trigger", description: "Combobox button opening the menu.", type: "<button>", required: true },
            { name: ".tds-select__value", description: "Selected value text.", type: "<span>", required: true },
            { name: ".tds-select__trailing-group", description: "Caret and optional tag slot.", type: "<div>" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Trigger sizes"
          props={[
            { name: ".tds-select__trigger--sm", description: "28px trigger height.", type: "sm | md | lg" },
            { name: ".tds-select__trigger--md", description: "32px trigger height.", type: "sm | md | lg" },
            { name: ".tds-select__trigger--lg", description: "40px trigger height.", type: "sm | md | lg", default: "Recommended default" },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="State modifiers"
          props={[
            { name: ".tds-select--invalid", description: "Error styling with validation message.", type: "CSS class" },
            { name: ".tds-select--success", description: "Success validation styling.", type: "CSS class" },
            { name: ".tds-select--disabled", description: "Disabled trigger and label.", type: "CSS class" },
            { name: ".tds-select__placeholder", description: "Muted placeholder text on empty value.", type: "CSS class" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Menu" id="menu">
        <PropsTable
          title="Interactive menu"
          props={[
            { name: ".tds-select--interactive", description: "Enables click-to-open menu behavior.", type: "CSS class" },
            { name: ".tds-select__menu", description: "Hidden container for .tds-dropdown-panel.", type: "<div>" },
            { name: "data-menu-type", description: "Menu variant: text, multiSelect, icon, flag, recommended.", type: "HTML attribute" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function DatePickerCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "sizes", label: "Sizes" },
    { id: "range", label: "Range" },
    { id: "calendar", label: "Calendar day" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/date-picker/date-picker.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Single date picker"
          props={[
            { name: ".tds-date-picker", description: "Field wrapper with label and trigger.", type: "<div>", required: true },
            { name: ".tds-date-picker__field", description: "Button trigger opening the calendar.", type: "<button>", required: true },
            { name: ".tds-date-picker__value", description: "Formatted date or placeholder.", type: "<span>" },
            { name: ".tds-date-picker__calendar", description: "Popover calendar grid.", type: "<div>" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Field sizes"
          props={[
            { name: ".tds-date-picker__field--sm", description: "28px field height.", type: "sm | md | lg" },
            { name: ".tds-date-picker__field--md", description: "32px field height.", type: "sm | md | lg" },
            { name: ".tds-date-picker__field--lg", description: "40px field height.", type: "sm | md | lg", default: "Recommended default" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Range" id="range">
        <PropsTable
          title="Range picker"
          props={[
            { name: ".tds-date-picker-range", description: "Container linking start and end fields.", type: "<div>" },
            { name: ".tds-date-picker-range__fields", description: "Flex row of two date pickers.", type: "<div>" },
            { name: ".tds-date-picker-range--interactive", description: "Linked range selection behavior.", type: "CSS class" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Calendar day" id="calendar">
        <PropsTable
          title="Day cell modifiers"
          props={[
            { name: ".tds-date-picker__day--selected", description: "Selected day.", type: "CSS class" },
            { name: ".tds-date-picker__day--today", description: "Current date highlight.", type: "CSS class" },
            { name: ".tds-date-picker__day--in-range", description: "Day within a selected range.", type: "CSS class" },
            { name: ".tds-date-picker__day--disabled", description: "Unavailable day.", type: "CSS class" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function RadioCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "usage", label: "Usage" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/_shared/radio/radio.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            {
              name: ".tds-radio",
              description: "Styled native radio input. Always wrap in a label.",
              type: '<input type="radio">',
              required: true,
            },
          ]}
        />
      </CodeSection>

      <CodeSection title="Usage" id="usage">
        <CodeBlock
          code={`<fieldset>
  <legend>Entity type</legend>
  <label><input type="radio" name="entity-type" class="tds-radio" checked> Business</label>
  <label><input type="radio" name="entity-type" class="tds-radio"> Individual</label>
</fieldset>`}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function RadioGroupCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "markup", label: "Markup" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/radio-group/radio-group.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            { name: ".tds-radio-group", description: "Vertical stack of radio options.", type: "<div>", required: true },
            { name: ".tds-radio-group__item", description: "Label row wrapping radio + content.", type: "<label>", required: true },
            { name: ".tds-radio-group__label", description: "Primary option text.", type: "<div>" },
            { name: ".tds-radio-group__caption", description: "Secondary description.", type: "<div>" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Markup" id="markup">
        <CodeBlock
          code={`<div class="tds-radio-group">
  <label class="tds-radio-group__item">
    <input type="radio" name="verification-type" class="tds-radio" checked>
    <div class="tds-radio-group__content">
      <div class="tds-radio-group__label">Business verification</div>
      <div class="tds-radio-group__caption">Verify a registered entity</div>
    </div>
  </label>
</div>`}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function RadioCardCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "variants", label: "Variants" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/radio-card/radio-card.css';`} />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            { name: ".tds-radio-card", description: "Selectable card container.", type: "<div>", required: true },
            { name: ".tds-radio-card--selected", description: "Active card with teal border.", type: "CSS class" },
            { name: ".tds-radio-card__label", description: "Primary card title.", type: "<div>" },
            { name: ".tds-radio-card__description", description: "Supporting copy.", type: "<div>" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Variants" id="variants">
        <PropsTable
          title="Selection modes"
          props={[
            { name: "Single selection", description: "Embed .tds-radio inside each card. One selected per group.", type: "Pattern" },
            { name: "Multi selection", description: "Replace radio with .tds-checkbox for multi-select lists.", type: "Pattern" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function TextareaCode({ basePath }: CodePageProps) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
    { id: "states", label: "States" },
    { id: "variants", label: "Variants" },
  ];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <p className="tds-code-section__desc">
          Textarea pulls in shared field atoms (label, caption, validation) via nested imports.
        </p>
        <CodeBlock code={`@import 'trulioo-ds/Components/textarea/textarea.css';`} />
        <CodeBlock
          code={`<div class="tds-textarea">
  <label class="tds-field-label" for="reviewer-notes">Reviewer notes</label>
  <div class="tds-textarea__field">
    <textarea class="tds-textarea__native" id="reviewer-notes" rows="3" placeholder="Add context…"></textarea>
    <span class="tds-textarea__grip" aria-hidden="true"><!-- grip svg --></span>
  </div>
</div>`}
        />
      </CodeSection>

      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Required"
          props={[
            { name: ".tds-textarea", description: "Field wrapper with vertical gap between label, field, and footer.", type: "<div>", required: true },
            { name: ".tds-textarea__field", description: "Bordered container for the native textarea and grip.", type: "<div>", required: true },
            { name: ".tds-textarea__native", description: "Borderless textarea with vertical resize.", type: "<textarea>", required: true },
            { name: ".tds-textarea__grip", description: "Decorative resize affordance in the bottom-right corner.", type: "<span>" },
          ]}
        />
      </CodeSection>

      <CodeSection title="States" id="states">
        <PropsTable
          title="State modifiers"
          props={[
            { name: ".tds-textarea--invalid", description: "Error border and validation message styling.", type: "CSS class" },
            { name: ".tds-textarea--success", description: "Success validation styling.", type: "CSS class" },
            { name: ".tds-textarea--disabled", description: "Muted field with disabled native textarea and no resize.", type: "CSS class" },
          ]}
        />
      </CodeSection>

      <CodeSection title="Variants" id="variants">
        <PropsTable
          title="Layout options"
          props={[
            { name: ".tds-textarea--contrast", description: "Recessed contrast background for inset panels.", type: "CSS class" },
            { name: ".tds-textarea__footer", description: "Column stack for caption and validation below the field.", type: "<div>" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}
