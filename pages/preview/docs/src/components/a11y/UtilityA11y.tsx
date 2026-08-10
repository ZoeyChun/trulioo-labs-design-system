import { A11yGuide, A11yItem } from "./A11yGuide";

export function FontAwesomeIconA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Decorative icons">
        Mark purely decorative icons <code>aria-hidden="true"</code>.
      </A11yItem>
      <A11yItem title="Meaningful icons">
        Icon-only controls need <code>aria-label</code> on the interactive element, not the icon alone.
      </A11yItem>
    </A11yGuide>
  );
}

export function FilterButtonA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Expanded state">
        Toggle <code>aria-expanded</code> on the trigger when the dropdown panel opens.
      </A11yItem>
      <A11yItem title="Menu semantics">
        Use <code>role="menu"</code> on the panel and <code>role="menuitem"</code> on options, or listbox for single-select.
      </A11yItem>
      <A11yItem title="Clear">
        Clear control needs an accessible name (e.g. <code>aria-label="Clear filters"</code>).
      </A11yItem>
    </A11yGuide>
  );
}

export function SortButtonA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Expanded state">
        Toggle <code>aria-expanded</code> on the trigger when the sort menu opens.
      </A11yItem>
      <A11yItem title="Sort state">
        Announce the active sort column and direction in the trigger label or <code>aria-label</code>.
      </A11yItem>
      <A11yItem title="Keyboard">
        Arrow keys navigate menu items; <code>Escape</code> closes the panel.
      </A11yItem>
    </A11yGuide>
  );
}
