import { A11yGuide, A11yItem } from "./A11yGuide";

export function AiTagA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Decorative icon">
        Mark <code>.tds-ai-tag__icon</code> with <code>aria-hidden="true"</code> — the label carries meaning.
      </A11yItem>
      <A11yItem title="Interactive badges">
        When rendered as a link or button, ensure the visible label describes the AI feature destination.
      </A11yItem>
    </A11yGuide>
  );
}

export function DataTableA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Table semantics">
        Use native <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, and{" "}
        <code>scope="col"</code> on column headers.
      </A11yItem>
      <A11yItem title="Sortable columns">
        Set <code>aria-sort="ascending"</code>, <code>"descending"</code>, or <code>"none"</code> on sortable{" "}
        <code>th</code> elements and update on sort change.
      </A11yItem>
      <A11yItem title="Row selection">
        Checkbox columns need explicit <code>aria-label</code> on each control (e.g. "Select row 1").
      </A11yItem>
    </A11yGuide>
  );
}

export function DataFieldA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Label association">
        Pair <code>.tds-data-field__label</code> with its value using a definition list or{" "}
        <code>aria-labelledby</code> when the field is announced as a unit.
      </A11yItem>
      <A11yItem title="Empty states">
        Use visible placeholder text for missing data — don't leave values blank without explanation.
      </A11yItem>
    </A11yGuide>
  );
}

export function CounterLabelA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Supplementary counts">
        Counters supplement a parent label — ensure the parent text names what is being counted.
      </A11yItem>
      <A11yItem title="Color meaning">
        Don't rely on counter color alone; the parent context should convey status.
      </A11yItem>
    </A11yGuide>
  );
}

export function SectionHeaderA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Heading level">
        Use an appropriate heading element or <code>role="heading"</code> with{" "}
        <code>aria-level</code> for <code>.tds-section-header__title</code>.
      </A11yItem>
      <A11yItem title="Actions">
        Buttons in <code>__right</code> need visible labels or <code>aria-label</code> when icon-only.
      </A11yItem>
    </A11yGuide>
  );
}

export function DismissIssueBadgeA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Accessible name">
        Every dismiss button needs <code>aria-label</code> describing what is dismissed (e.g. "Dismiss issue").
      </A11yItem>
      <A11yItem title="Focus visible">
        Dismiss badges use <code>:focus-visible</code> — don't remove the focus ring in consuming apps.
      </A11yItem>
    </A11yGuide>
  );
}

export function FlagIconA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Country name">
        Flags are decorative without text — add visible country name or <code>aria-label</code> on the flag.
      </A11yItem>
      <A11yItem title="Role">
        Use <code>role="img"</code> with <code>aria-label</code> when the flag stands alone without adjacent text.
      </A11yItem>
    </A11yGuide>
  );
}

export function ActionListItemA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Menu semantics">
        Rows inside a menu use <code>role="menuitem"</code>; multi-select rows may use checkbox inputs inside{" "}
        <code>label.tds-action-list-item</code>.
      </A11yItem>
      <A11yItem title="Selection state">
        Set <code>aria-selected="true"</code> or <code>aria-checked</code> on the active row for screen readers.
      </A11yItem>
      <A11yItem title="Disabled rows">
        Apply <code>.tds-action-list-item--disabled</code> with <code>aria-disabled="true"</code> and skip from tab order.
      </A11yItem>
    </A11yGuide>
  );
}

export function StatCardA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Metric readability">
        The value in <code>.tds-stat-card__value</code> must be readable text — not color alone.
      </A11yItem>
      <A11yItem title="Footer icon">
        Trend icons in <code>.tds-stat-card__icon</code> are decorative — use <code>aria-hidden="true"</code>; the{" "}
        description text conveys the trend.
      </A11yItem>
    </A11yGuide>
  );
}
