import { A11yGuide, A11yItem } from "./A11yGuide";

export function TextInputA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Label association">
        Every input needs a visible <code>.tds-field-label</code> linked via <code>htmlFor</code> and{" "}
        <code>id</code>. Placeholder text is not a substitute for a label.
      </A11yItem>
      <A11yItem title="Validation">
        On error, set <code>aria-invalid="true"</code> on the native input and reference the error
        message with <code>aria-describedby</code>. Icons in validation are decorative.
      </A11yItem>
      <A11yItem title="Disabled and read-only">
        Use the native <code>disabled</code> attribute for unavailable fields. Read-only fields keep
        focus but prevent editing — use <code>readonly</code> on the input.
      </A11yItem>
      <A11yItem title="Focus ring">
        Focus-visible styling applies to <code>.tds-text-input__field</code> with a 2px teal ring.
      </A11yItem>
    </A11yGuide>
  );
}

export function SelectA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Combobox pattern">
        The trigger uses <code>role="combobox"</code>, <code>aria-expanded</code>, and{" "}
        <code>aria-haspopup="listbox"</code>. Link the label with <code>aria-labelledby</code>.
      </A11yItem>
      <A11yItem title="Keyboard">
        Implement Arrow keys, Enter, and Escape for menu navigation in consuming apps. Focus returns
        to the trigger when the menu closes.
      </A11yItem>
      <A11yItem title="Selected value">
        Announce the current selection in the trigger text — don't rely on visual styling alone.
      </A11yItem>
    </A11yGuide>
  );
}

export function DatePickerA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Dialog semantics">
        The calendar opens as a dialog (<code>aria-haspopup="dialog"</code>). Trap focus inside the
        calendar while open and restore focus to the trigger on close.
      </A11yItem>
      <A11yItem title="Day grid">
        Day buttons need accessible names (e.g. March 13, 2021). Mark outside-month days and
        disabled days appropriately.
      </A11yItem>
      <A11yItem title="Range selection">
        Announce the selected range start and end. Highlight in-range days visually and programmatically.
      </A11yItem>
    </A11yGuide>
  );
}

export function RadioA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Grouping">
        Related radios share a <code>name</code> attribute. Wrap the set in a <code>fieldset</code>{" "}
        with <code>legend</code> when the group needs a collective label.
      </A11yItem>
      <A11yItem title="Keyboard">
        Arrow keys move between options in the same group. Tab moves into and out of the group.
      </A11yItem>
      <A11yItem title="Labels">
        Wrap each radio in a <code>label</code> so clicking the text toggles selection.
      </A11yItem>
    </A11yGuide>
  );
}

export function RadioGroupA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Row labels">
        Each <code>.tds-radio-group__item</code> is a label — the caption is part of the accessible
        name for that option.
      </A11yItem>
      <A11yItem title="Disabled options">
        Use the native <code>disabled</code> attribute on unavailable radios. Apply{" "}
        <code>.tds-radio-group__item--disabled</code> for visual styling.
      </A11yItem>
    </A11yGuide>
  );
}

export function RadioCardA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Card activation">
        The entire card should toggle the embedded radio. Ensure the radio remains focusable and
        receives keyboard events.
      </A11yItem>
      <A11yItem title="Selection state">
        Apply <code>.tds-radio-card--selected</code> alongside <code>:checked</code> on the radio.
        Don't rely on border color alone.
      </A11yItem>
      <A11yItem title="Multi-select variant">
        When using checkboxes inside cards, each card is an independent toggle — not a radio group.
      </A11yItem>
    </A11yGuide>
  );
}

export function TextareaA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Label association">
        Every textarea needs a visible <code>.tds-field-label</code> linked via <code>htmlFor</code> and{" "}
        <code>id</code>. Placeholder text is not a substitute for a label.
      </A11yItem>
      <A11yItem title="Validation">
        On error, set <code>aria-invalid="true"</code> on the native textarea and reference the error
        message with <code>aria-describedby</code>.
      </A11yItem>
      <A11yItem title="Resize grip">
        The corner grip is decorative — mark it <code>aria-hidden="true"</code>. Native textarea resize
        remains available unless the field is disabled.
      </A11yItem>
      <A11yItem title="Focus ring">
        Focus-visible styling applies to <code>.tds-textarea__field</code> with a 2px teal ring via{" "}
        <code>:focus-within</code>.
      </A11yItem>
    </A11yGuide>
  );
}
