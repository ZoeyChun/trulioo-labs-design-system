import { A11yGuide, A11yItem } from "./A11yGuide";

export function FieldLabelA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Label association">
        Link every label to its control with <code>htmlFor</code> and matching <code>id</code>.
      </A11yItem>
      <A11yItem title="Required fields">
        Indicate required fields visually and programmatically — don't rely on color alone.
      </A11yItem>
    </A11yGuide>
  );
}

export function FieldCaptionA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Describedby">
        Link captions to inputs with <code>aria-describedby</code> when they add essential context.
      </A11yItem>
      <A11yItem title="Errors vs hints">
        Move error text to <code>.tds-field-validation</code> and update <code>aria-describedby</code> on failure.
      </A11yItem>
    </A11yGuide>
  );
}

export function FieldValidationA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Invalid state">
        Set <code>aria-invalid="true"</code> on the control when showing error validation.
      </A11yItem>
      <A11yItem title="Icons">
        Validation icons are decorative — use <code>aria-hidden="true"</code>.
      </A11yItem>
    </A11yGuide>
  );
}

export function CaretA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Decorative">
        Carets are visual only. Mark <code>aria-hidden="true"</code> — the parent button carries the label.
      </A11yItem>
    </A11yGuide>
  );
}

export function DropdownPanelA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Menu semantics">
        Use <code>role="menu"</code> on the panel and <code>role="menuitem"</code> on rows, or listbox for selects.
      </A11yItem>
      <A11yItem title="Keyboard">
        Arrow keys navigate items; Escape closes the panel and returns focus to the trigger.
      </A11yItem>
      <A11yItem title="Focus trap">
        Keep focus inside the open panel until dismissed in modal-style menus.
      </A11yItem>
    </A11yGuide>
  );
}

export function TagA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Remove button">
        Removable tags need <code>aria-label</code> on <code>.tds-tag__remove</code> (e.g. "Remove Verified").
      </A11yItem>
      <A11yItem title="Status">
        Don't rely on color alone — tag text must convey meaning.
      </A11yItem>
    </A11yGuide>
  );
}
