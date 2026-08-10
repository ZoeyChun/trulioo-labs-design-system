import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

export function FieldLabelAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Label text above form fields with optional required indicator."
      api=".tds-field-label · __required"
      parts={[
        { number: 1, name: "Label text", api: ".tds-field-label", detail: "Primary label at label/md. Pair with htmlFor on the control." },
        { number: 2, name: "Required marker", api: ".tds-field-label__required", detail: "Optional asterisk for required fields." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-field-label", anchor: { y: 0.5 } },
          { number: 2, direction: "top", selector: ".tds-field-label__required" },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <label className="tds-field-label">
          Business name <span className="tds-field-label__required" aria-hidden="true">*</span>
        </label>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function FieldCaptionAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Helper text below fields — format hints, not validation errors."
      api=".tds-field-caption"
      parts={[
        { number: 1, name: "Caption", api: ".tds-field-caption", detail: "Body/xs description text below the field container." },
      ]}
    >
      <AnatomyPinLayer
        pins={[{ number: 1, direction: "right", selector: ".tds-field-caption", anchor: { y: 0.5 } }]}
        className="ds-anatomy-diagram--inline"
      >
        <span className="tds-field-caption">As registered with the jurisdiction</span>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function FieldValidationAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Inline validation message with icon for error or success states."
      api=".tds-field-validation · --error · --success"
      parts={[
        { number: 1, name: "Icon", api: ".tds-field-validation__icon", detail: "Decorative status icon — aria-hidden on the SVG." },
        { number: 2, name: "Message", api: ".tds-field-validation", detail: "Error or success copy describing validation outcome." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "left", selector: ".tds-field-validation__icon", anchor: { y: 0.5 } },
          { number: 2, direction: "right", selector: ".tds-field-validation", anchor: { y: 0.5 } },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <span className="tds-field-validation tds-field-validation--error">
          <span className="tds-field-validation__icon" aria-hidden="true">!</span>
          Enter a registered business name
        </span>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function CaretAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Directional chevron used on Select triggers, menus, and tooltips."
      api=".tds-caret · --default"
      parts={[
        { number: 1, name: "Caret", api: ".tds-caret", detail: "8×11 SVG chevron. Mark aria-hidden='true'." },
      ]}
    >
      <AnatomyPinLayer
        pins={[{ number: 1, direction: "right", selector: ".tds-caret", anchor: { y: 0.5 } }]}
        className="ds-anatomy-diagram--inline"
      >
        <span className="tds-caret tds-caret--default" aria-hidden="true">
          <svg viewBox="0 0 8 11" width="8" height="11" fill="none">
            <path d="M0.074 3.47L3.47 0.073a.25.25 0 0 1 .354 0L7.22 3.47a.25.25 0 0 1-.177.427H.25A.25.25 0 0 1 .074 3.47z" fill="currentColor" />
            <path d="M0.074 7.32L3.47 10.72a.25.25 0 0 0 .354 0L7.22 7.32a.25.25 0 0 0-.177-.427H.25A.25.25 0 0 0 .074 7.32z" fill="currentColor" />
          </svg>
        </span>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function DropdownPanelAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Floating menu surface with optional header, dividers, and action list items."
      api=".tds-dropdown-panel · __header · __divider"
      tag="Figma 320:21652"
      parts={[
        { number: 1, name: "Panel container", api: ".tds-dropdown-panel", detail: "Elevated surface with border-radius and shadow." },
        { number: 2, name: "Group heading", api: ".tds-dropdown-panel__header", detail: "Optional caption header with optional Clear all link." },
        { number: 3, name: "Menu item", api: ".tds-action-list-item", detail: "Interactive row — single or multi-select variants." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-dropdown-panel", anchor: { y: 0.35 } },
          { number: 2, direction: "top", selector: ".tds-dropdown-panel__header" },
          { number: 3, direction: "right", selector: ".tds-action-list-item--selected", anchor: { y: 0.5 } },
        ]}
      >
        <div className="tds-dropdown-panel" style={{ width: 240 }}>
          <div className="tds-dropdown-panel__header">Provinces</div>
          <button type="button" className="tds-action-list-item" role="menuitem">
            <span className="tds-action-list-item__label">Ontario</span>
          </button>
          <button type="button" className="tds-action-list-item tds-action-list-item--selected" role="menuitem">
            <span className="tds-action-list-item__label">British Columbia</span>
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function TagAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Compact status pill with semantic color variants and optional remove control."
      api=".tds-tag · --md · --positive · __remove"
      tag="Figma 331:8199"
      parts={[
        { number: 1, name: "Label", api: ".tds-tag", detail: "Tag text at label/sm inside the pill." },
        { number: 2, name: "Leading visual", api: ".tds-tag__leading-visual", detail: "Optional icon or avatar prefix." },
        { number: 3, name: "Remove button", api: ".tds-tag__remove", detail: "Dismiss control on removable tags — needs aria-label." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "top", selector: ".tds-tag", anchor: { x: 0.5 } },
          { number: 2, direction: "left", selector: ".tds-tag__leading-visual", anchor: { y: 0.5 } },
          { number: 3, direction: "right", selector: ".tds-tag__remove", anchor: { y: 0.5 } },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <span className="tds-tag tds-tag--md tds-tag--positive tds-tag--removable">
          <span className="tds-tag__leading-visual" aria-hidden="true">✓</span>
          Verified
          <button type="button" className="tds-tag__remove" aria-label="Remove Verified">
            ×
          </button>
        </span>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
