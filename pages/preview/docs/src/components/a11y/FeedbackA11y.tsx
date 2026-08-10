import { A11yGuide, A11yItem } from "./A11yGuide";

export function TooltipA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Supplementary only">
        Tooltips repeat or supplement visible labels — don't put essential information only in a tooltip.
      </A11yItem>
      <A11yItem title="Keyboard">
        Show tooltips on keyboard focus as well as hover. Hide on <code>Escape</code>.
      </A11yItem>
      <A11yItem title="Caret">
        Mark <code>.tds-tooltip__caret</code> as <code>aria-hidden="true"</code>.
      </A11yItem>
    </A11yGuide>
  );
}

export function AnnouncementA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Live region">
        Use <code>role="status"</code> or <code>aria-live="polite"</code> for dynamic announcements.
      </A11yItem>
      <A11yItem title="Dismiss">
        Dismiss buttons need <code>aria-label</code> naming what's being closed.
      </A11yItem>
      <A11yItem title="Severity">
        Don't rely on color alone — title and message text must convey severity.
      </A11yItem>
    </A11yGuide>
  );
}

export function DialogA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Modal semantics">
        Use <code>role="dialog"</code>, <code>aria-modal="true"</code>, and <code>aria-labelledby</code> on the title.
      </A11yItem>
      <A11yItem title="Focus trap">
        Trap focus inside the open dialog and return focus to the trigger on close.
      </A11yItem>
      <A11yItem title="Escape">
        Close on <code>Escape</code> unless the dialog requires an explicit decision.
      </A11yItem>
    </A11yGuide>
  );
}
