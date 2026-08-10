import { CodeBlock } from "../CodeBlock";
import { CodeSection, ComponentCodeLayout, PropsTable } from "./CodePageLayout";

type CodePageProps = { basePath: string };

function atomCode(
  basePath: string,
  cssFile: string,
  componentName: string,
  _baseClass: string,
  props: { name: string; description: string; type: string; required?: boolean; default?: string }[],
  example: string,
) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
  ];
  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/${cssFile}';`} />
        <CodeBlock code={example} />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable title={`${componentName} classes`} props={props} />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function FieldLabelCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "_shared/field-label/field-label.css", "FieldLabel", ".tds-field-label", [
    { name: ".tds-field-label", description: "Label above form fields.", type: "<label>", required: true },
    { name: ".tds-field-label__required", description: "Required asterisk.", type: "<span>" },
    { name: ".tds-field-label--disabled", description: "Muted label when field is disabled.", type: "CSS class" },
  ], `<label class="tds-field-label" for="business-name">Business name</label>`);
}

export function FieldCaptionCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "_shared/field-caption/field-caption.css", "FieldCaption", ".tds-field-caption", [
    { name: ".tds-field-caption", description: "Helper text below fields.", type: "<span>", required: true },
  ], `<span class="tds-field-caption">9-digit CRA business number</span>`);
}

export function FieldValidationCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "_shared/field-validation/field-validation.css", "FieldValidation", ".tds-field-validation", [
    { name: ".tds-field-validation", description: "Validation message row.", type: "<span>", required: true },
    { name: ".tds-field-validation--error", description: "Error state styling.", type: "CSS class" },
    { name: ".tds-field-validation--success", description: "Success state styling.", type: "CSS class" },
    { name: ".tds-field-validation__icon", description: "Leading status icon.", type: "<span>" },
  ], `<span class="tds-field-validation tds-field-validation--error">Enter a valid value</span>`);
}

export function CaretCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "_shared/caret/caret.css", "Caret", ".tds-caret", [
    { name: ".tds-caret", description: "Chevron wrapper for menu affordance.", type: "<span>", required: true },
    { name: ".tds-caret--default", description: "Standard up/down chevron pair.", type: "CSS class", default: "Default variant" },
  ], `<span class="tds-caret tds-caret--default" aria-hidden="true"><!-- SVG --></span>`);
}

export function DropdownPanelCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "_shared/dropdown-panel/dropdown-panel.css", "DropdownPanel", ".tds-dropdown-panel", [
    { name: ".tds-dropdown-panel", description: "Menu surface container.", type: "<div>", required: true },
    { name: ".tds-dropdown-panel__header", description: "Group heading with optional action.", type: "<div>" },
    { name: ".tds-dropdown-panel__divider", description: "Separator between groups.", type: "<hr>" },
    { name: ".tds-action-list-item", description: "Interactive menu row.", type: "<button>" },
  ], `<div class="tds-dropdown-panel" role="menu">\n  <button class="tds-action-list-item" role="menuitem">Option</button>\n</div>`);
}

export function TagCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "_shared/tag/tag.css", "Tag", ".tds-tag", [
    { name: ".tds-tag", description: "Base tag pill.", type: "<span>", required: true },
    { name: ".tds-tag--{sm|md|lg|xl}", description: "Size modifier.", type: "CSS class" },
    { name: ".tds-tag--{positive|negative|intermediate|default}", description: "Semantic color.", type: "CSS class" },
    { name: ".tds-tag--removable", description: "Adds remove button slot.", type: "CSS class" },
    { name: ".tds-tag__remove", description: "Dismiss button — requires aria-label.", type: "<button>" },
  ], `<span class="tds-tag tds-tag--md tds-tag--positive">Verified</span>`);
}
