import { A11yGuide, A11yItem } from "./A11yGuide";

export function IconButtonA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Accessible name">
        Every icon button must have an <code>aria-label</code> describing the action. Without
        visible text, the label is the only name screen readers receive.
      </A11yItem>
      <A11yItem title="Keyboard">
        Icon buttons are focusable with <code>Tab</code> and activated with <code>Enter</code> or{" "}
        <code>Space</code>. Disabled buttons are removed from tab order.
      </A11yItem>
      <A11yItem title="Focus ring">
        A 2px teal ring (<code>--border-focus</code>) appears on <code>:focus-visible</code> for
        all variants.
      </A11yItem>
      <A11yItem title="Loading state">
        Add <code>aria-busy="true"</code> alongside <code>.tds-icon-btn--loading</code>. The
        spinner is decorative — keep the <code>aria-label</code> describing the action.
      </A11yItem>
      <A11yItem title="Touch target">
        Minimum hit areas are 24px (sm), 32px (md), and 40px (lg), meeting WCAG 2.2 target size
        requirements.
      </A11yItem>
    </A11yGuide>
  );
}

export function ButtonGroupA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Group semantics">
        Apply <code>role="group"</code> and a descriptive <code>aria-label</code> on{" "}
        <code>.tds-button-group</code> so assistive technology announces the set's purpose.
      </A11yItem>
      <A11yItem title="Selection state">
        Indicate the selected segment with <code>aria-pressed="true"</code> on the active button,
        or use a roving <code>tabindex</code> pattern for radio-like behavior.
      </A11yItem>
      <A11yItem title="Keyboard">
        Each segment is individually focusable and activatable with <code>Enter</code> or{" "}
        <code>Space</code>. Arrow keys can move focus between segments in a roving tabindex
        implementation.
      </A11yItem>
      <A11yItem title="Focus ring">
        Focus-visible styling applies to each child button independently.
      </A11yItem>
    </A11yGuide>
  );
}

export function SpinnerA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Standalone spinners">
        Add <code>role="status"</code> and <code>aria-label="Loading"</code> (or specific copy)
        when the spinner is the sole loading indicator on the page.
      </A11yItem>
      <A11yItem title="Embedded spinners">
        Spinners inside buttons use <code>aria-hidden="true"</code>. The parent button communicates
        state via <code>aria-busy="true"</code>.
      </A11yItem>
      <A11yItem title="Spinner block">
        The <code>.tds-spinner-block__label</code> provides visible loading text. Mark the spinner
        itself <code>aria-hidden="true"</code> and expose the label to assistive technology.
      </A11yItem>
      <A11yItem title="Motion">
        Respect <code>prefers-reduced-motion</code> in consuming apps. The CSS animation can be
        paused or replaced with a static indicator.
      </A11yItem>
    </A11yGuide>
  );
}

export function ButtonMenuA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Trigger attributes">
        The trigger button needs <code>aria-haspopup="menu"</code> and{" "}
        <code>aria-expanded</code> toggled between <code>true</code> and <code>false</code>.
      </A11yItem>
      <A11yItem title="Menu semantics">
        The dropdown panel uses <code>role="menu"</code>. Each item uses{" "}
        <code>role="menuitem"</code>.
      </A11yItem>
      <A11yItem title="Keyboard">
        <code>Enter</code> or <code>Space</code> opens the menu. <code>Escape</code> closes it.
        Arrow keys navigate between menu items when open.
      </A11yItem>
      <A11yItem title="Focus management">
        Return focus to the trigger when the menu closes. Trap is not required for action menus
        but focus should not be lost.
      </A11yItem>
    </A11yGuide>
  );
}

export function SwitchA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Role and state">
        The track element uses <code>role="switch"</code> with <code>aria-checked</code> toggled
        between <code>true</code> and <code>false</code>.
      </A11yItem>
      <A11yItem title="Label association">
        Wrap the switch in a <code>&lt;label&gt;</code> so clicking the text toggles the control.
        The label should describe the ON state.
      </A11yItem>
      <A11yItem title="Keyboard">
        The track is focusable and toggled with <code>Space</code>. Do not use <code>Enter</code>{" "}
        unless implementing a button-like pattern.
      </A11yItem>
      <A11yItem title="Disabled">
        Apply <code>.tds-switch--disabled</code> on the label and <code>aria-disabled="true"</code>{" "}
        on the track. Remove from tab order if the setting is permanently unavailable.
      </A11yItem>
    </A11yGuide>
  );
}

export function CheckboxA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Native input">
        Use a real <code>&lt;input type="checkbox"&gt;</code> with <code>.tds-checkbox</code>.
        Native inputs provide built-in keyboard and screen reader support.
      </A11yItem>
      <A11yItem title="Label association">
        Wrap the checkbox and label text in a <code>&lt;label&gt;</code> element, or associate via{" "}
        <code>htmlFor</code>/<code>id</code>.
      </A11yItem>
      <A11yItem title="Indeterminate">
        Set <code>element.indeterminate = true</code> in JavaScript. Screen readers announce
        "partially checked" for the indeterminate state.
      </A11yItem>
      <A11yItem title="Focus ring">
        A 2px teal ring appears on <code>:focus-visible</code> via the checkbox's{" "}
        <code>::before</code> pseudo-element.
      </A11yItem>
      <A11yItem title="Group labels">
        For checkbox groups (e.g. status filters), use <code>fieldset</code> and{" "}
        <code>legend</code> to name the group.
      </A11yItem>
    </A11yGuide>
  );
}

export function DismissActionA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Accessible name">
        Always include <code>aria-label</code> naming what's being closed (e.g.{" "}
        <code>aria-label="Close verification panel"</code>). The X icon is decorative.
      </A11yItem>
      <A11yItem title="Keyboard">
        Dismiss buttons are focusable with <code>Tab</code> and activated with <code>Enter</code>{" "}
        or <code>Space</code>.
      </A11yItem>
      <A11yItem title="Focus ring">
        A 1px teal border appears on <code>:focus-visible</code> for all sizes.
      </A11yItem>
      <A11yItem title="Placement">
        Position in the top-right of the container being dismissed. Consistent placement helps
        keyboard and screen reader users predict the close action location.
      </A11yItem>
    </A11yGuide>
  );
}

export function SegmentedControlA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Group semantics">
        Apply <code>role="group"</code> and a descriptive <code>aria-label</code> on{" "}
        <code>.tds-segmented-control</code> so assistive technology announces the set's purpose.
      </A11yItem>
      <A11yItem title="Selection state">
        Set <code>aria-pressed="true"</code> on the active segment (or use{" "}
        <code>.tds-segmented-control__item--selected</code> with matching pressed state in JS).
      </A11yItem>
      <A11yItem title="Icon-only segments">
        Each icon-only button needs its own <code>aria-label</code> (e.g.{" "}
        <code>aria-label="Grid view"</code>). Hide decorative icons with <code>aria-hidden="true"</code>.
      </A11yItem>
      <A11yItem title="Keyboard">
        Each segment is focusable and activatable with <code>Enter</code> or <code>Space</code>.
        Arrow-key roving tabindex is recommended when segments behave like a radio group.
      </A11yItem>
      <A11yItem title="Focus ring">
        A 2px teal focus ring appears on <code>:focus-visible</code> for both selected and unselected
        segments.
      </A11yItem>
    </A11yGuide>
  );
}
