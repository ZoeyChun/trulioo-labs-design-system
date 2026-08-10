import { A11yGuide, A11yItem } from "./A11yGuide";

export function SideNavA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Landmark navigation">
        Wrap SideNav in <code>&lt;nav aria-label="Primary"&gt;</code> or ensure the aside has an
        accessible name. Collapsed icon buttons need descriptive <code>aria-label</code> values.
      </A11yItem>
      <A11yItem title="Expandable groups">
        Top-level items with nested content use <code>aria-expanded</code> on the trigger. Sub-items
        appear in a named region or list associated with the expanded parent.
      </A11yItem>
      <A11yItem title="Current page">
        Mark the active destination with <code>aria-current="page"</code> on both top-level and
        sub-items.
      </A11yItem>
      <A11yItem title="Collapse control">
        The collapse bar is a button with an <code>aria-label</code> that reflects the action
        (Collapse sidebar / Expand sidebar).
      </A11yItem>
      <A11yItem title="Tooltips">
        Collapsed-mode tooltips are supplementary — the icon button&apos;s <code>aria-label</code>{" "}
        must still name the destination.
      </A11yItem>
    </A11yGuide>
  );
}

export function NavItemA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Button semantics">
        Nav items are <code>&lt;button type="button"&gt;</code> elements. Use{" "}
        <code>aria-current="page"</code> on the active row.
      </A11yItem>
      <A11yItem title="Disabled items">
        Use the native <code>disabled</code> attribute or <code>aria-disabled="true"</code> with
        <code>.tds-nav-item--disabled</code> for unavailable destinations.
      </A11yItem>
      <A11yItem title="Descriptions">
        Secondary copy in <code>.tds-nav-item__description</code> is exposed as part of the
        button&apos;s accessible name when nested in <code>.tds-nav-item__content</code>.
      </A11yItem>
      <A11yItem title="Focus ring">
        Focus-visible uses <code>--border-focus</code> (2px teal) on the full row hit target.
      </A11yItem>
    </A11yGuide>
  );
}

export function NavListA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Group headings">
        Section headings (<code>.tds-nav-list__heading</code>) are visual labels. Consider{" "}
        <code>aria-labelledby</code> on the list region if headings must be announced with the
        group.
      </A11yItem>
      <A11yItem title="Collapsible sections">
        Collapse triggers toggle <code>aria-expanded</code>. Hide collapsed content with the{" "}
        <code>hidden</code> attribute so it is removed from the accessibility tree.
      </A11yItem>
      <A11yItem title="Keyboard">
        Each nav item is focusable via Tab. Enter and Space activate the row.
      </A11yItem>
    </A11yGuide>
  );
}

export function TabsA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Tab pattern">
        Apply <code>role="tablist"</code> on <code>.tds-tabs__list</code>,{" "}
        <code>role="tab"</code> on each tab, and <code>role="tabpanel"</code> on associated content
        regions. Link tabs to panels with <code>aria-controls</code> / <code>id</code>.
      </A11yItem>
      <A11yItem title="Selection state">
        Set <code>aria-selected="true"</code> on the active tab and{" "}
        <code>aria-selected="false"</code> on siblings.
      </A11yItem>
      <A11yItem title="Overflow controls">
        Scroll buttons need <code>aria-label</code> values (e.g. Scroll tabs left). Disable buttons
        when no further scroll is possible.
      </A11yItem>
      <A11yItem title="Keyboard">
        Implement arrow-key navigation between tabs per the WAI-ARIA tabs pattern. Home/End jump to
        first/last tab.
      </A11yItem>
    </A11yGuide>
  );
}

export function TabItemA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Tab role">
        Each tab item is a <code>role="tab"</code> button — not a link. Pair with a tablist parent
        and tabpanel content.
      </A11yItem>
      <A11yItem title="Disabled tabs">
        Use the native <code>disabled</code> attribute with <code>.tds-tab-item--disabled</code>.
        Disabled tabs are skipped in arrow-key navigation.
      </A11yItem>
      <A11yItem title="Counters">
        Counts inside <code>.tds-tab-item__counter</code> are part of the tab&apos;s accessible
        name — keep labels meaningful (e.g. Activity 14).
      </A11yItem>
      <A11yItem title="Indicator">
        The underline indicator is decorative — mark <code>aria-hidden="true"</code>.
      </A11yItem>
    </A11yGuide>
  );
}

export function FilterTabA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Filter tablist">
        Use <code>role="tablist"</code> on <code>.tds-filter-tabs</code> with an{" "}
        <code>aria-label</code> describing the filter dimension (e.g. Status filters).
      </A11yItem>
      <A11yItem title="Single selection">
        Only one pill has <code>aria-selected="true"</code> at a time. Update selection on
        activation and move focus to the selected pill if using roving tabindex.
      </A11yItem>
      <A11yItem title="Counters">
        Count badges are announced as part of the tab label. Update counts when filter results
        change and consider a live region for dynamic totals.
      </A11yItem>
    </A11yGuide>
  );
}

export function FilterTab2A11y() {
  return (
    <A11yGuide>
      <A11yItem title="Same semantics as FilterTabs">
        FilterTabsItem uses the same <code>role="tab"</code> pattern as the parent FilterTabs
        container. Follow the FilterTabs accessibility guidance.
      </A11yItem>
      <A11yItem title="Focus">
        Pills receive focus-visible styling on keyboard navigation. Ensure selected state is not
        conveyed by color alone — use <code>aria-selected</code>.
      </A11yItem>
    </A11yGuide>
  );
}

export function BreadcrumbA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Nav landmark">
        Wrap breadcrumbs in <code>&lt;nav aria-label="Breadcrumb"&gt;</code>. This distinguishes
        hierarchy navigation from primary app nav.
      </A11yItem>
      <A11yItem title="Current page">
        The current page uses <code>aria-current="page"</code> on a non-link element with{" "}
        <code>.tds-breadcrumb-item--current</code>.
      </A11yItem>
      <A11yItem title="Dividers">
        Slash dividers are decorative — set <code>aria-hidden="true"</code>.
      </A11yItem>
      <A11yItem title="Keyboard">
        Ancestor items are focusable links. Tab order follows DOM order left to right.
      </A11yItem>
    </A11yGuide>
  );
}
