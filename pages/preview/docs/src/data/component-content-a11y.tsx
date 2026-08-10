import type { ReactNode } from "react";
import { A11yGuide, A11yItem } from "../components/a11y/A11yGuide";
import {
  ButtonGroupA11y,
  ButtonMenuA11y,
  CheckboxA11y,
  DismissActionA11y,
  IconButtonA11y,
  SegmentedControlA11y,
  SpinnerA11y,
  SwitchA11y,
} from "../components/a11y/CoreControlsA11y";
import {
  DatePickerA11y,
  RadioA11y,
  RadioCardA11y,
  RadioGroupA11y,
  SelectA11y,
  TextInputA11y,
  TextareaA11y,
} from "../components/a11y/FormInputsA11y";
import {
  BreadcrumbA11y,
  FilterTab2A11y,
  FilterTabA11y,
  NavItemA11y,
  NavListA11y,
  SideNavA11y,
  TabItemA11y,
  TabsA11y,
} from "../components/a11y/NavigationA11y";
import { AccordionA11y } from "../components/a11y/ContainersA11y";
import {
  AnnouncementA11y,
  DialogA11y,
  TooltipA11y,
} from "../components/a11y/FeedbackA11y";
import {
  ListedProgressItemA11y,
  ProgressIndicatorA11y,
  StepProgressA11y,
} from "../components/a11y/ProgressA11y";
import {
  RiskCategoryCardA11y,
  ScoreCardA11y,
  ScoreGaugeA11y,
} from "../components/a11y/ScoringA11y";
import {
  FilterButtonA11y,
  FontAwesomeIconA11y,
  SortButtonA11y,
} from "../components/a11y/UtilityA11y";
import {
  ActionListItemA11y,
  AiTagA11y,
  CounterLabelA11y,
  DataFieldA11y,
  DataTableA11y,
  DismissIssueBadgeA11y,
  FlagIconA11y,
  SectionHeaderA11y,
  StatCardA11y,
} from "../components/a11y/DataDisplayA11y";
import {
  CaretA11y,
  DropdownPanelA11y,
  FieldCaptionA11y,
  FieldLabelA11y,
  FieldValidationA11y,
  TagA11y,
} from "../components/a11y/SharedAtomsA11y";
import { GenericComponentA11y } from "../components/fallbacks/ComponentPageFallbacks";
import { isComponentDocPage, type ComponentPageId } from "./navigation";

function ButtonA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Keyboard">
        Buttons are focusable with <code>Tab</code> and activated with <code>Enter</code> or{" "}
        <code>Space</code>. Disabled buttons (<code>.tds-btn--inactive</code>) are removed from
        tab order via the <code>disabled</code> attribute.
      </A11yItem>
      <A11yItem title="Focus ring">
        A 2px teal ring (<code>--border-focus</code>) appears on <code>:focus-visible</code>. The
        ring offset keeps it visible against all variant backgrounds.
      </A11yItem>
      <A11yItem title="Accessible labels">
        Icon-only buttons must include <code>aria-label</code> describing the action (e.g.{" "}
        <code>aria-label="Close"</code>). Buttons with visible text labels do not need{" "}
        <code>aria-label</code>.
      </A11yItem>
      <A11yItem title="Loading state">
        When a button enters loading state, add <code>aria-disabled="true"</code> and keep the
        label visible for screen readers. The spinner is decorative (
        <code>aria-hidden="true"</code>).
      </A11yItem>
      <A11yItem title="Color contrast">
        Primary and danger variants meet WCAG AA contrast (4.5:1) for text against their fill.
        Secondary and invisible variants meet AA against <code>--surface-neutral-01</code>.
      </A11yItem>
      <A11yItem title="Touch target">
        Minimum hit area is 32px (small), 36px (medium), and 44px (large). All sizes meet the
        WCAG 2.2 minimum of 24 &times; 24px.
      </A11yItem>
    </A11yGuide>
  );
}

const COMPONENT_CONTENT_A11Y: Partial<Record<ComponentPageId, () => ReactNode>> = {
  button: () => <ButtonA11y />,
  "icon-button": () => <IconButtonA11y />,
  "button-group": () => <ButtonGroupA11y />,
  "segmented-control": () => <SegmentedControlA11y />,
  spinner: () => <SpinnerA11y />,
  "button-menu": () => <ButtonMenuA11y />,
  switch: () => <SwitchA11y />,
  checkbox: () => <CheckboxA11y />,
  "dismiss-action": () => <DismissActionA11y />,
  "side-nav": () => <SideNavA11y />,
  "nav-item": () => <NavItemA11y />,
  "nav-list": () => <NavListA11y />,
  tabs: () => <TabsA11y />,
  "tab-item": () => <TabItemA11y />,
  "filter-tab": () => <FilterTabA11y />,
  "filter-tab-2": () => <FilterTab2A11y />,
  breadcrumb: () => <BreadcrumbA11y />,
  "text-input": () => <TextInputA11y />,
  textarea: () => <TextareaA11y />,
  select: () => <SelectA11y />,
  "date-picker": () => <DatePickerA11y />,
  radio: () => <RadioA11y />,
  "radio-group": () => <RadioGroupA11y />,
  "radio-card": () => <RadioCardA11y />,
  tooltip: () => <TooltipA11y />,
  announcement: () => <AnnouncementA11y />,
  dialog: () => <DialogA11y />,
  accordion: () => <AccordionA11y />,
  "progress-indicator": () => <ProgressIndicatorA11y />,
  "step-progress": () => <StepProgressA11y />,
  "listed-progress-item": () => <ListedProgressItemA11y />,
  "score-gauge": () => <ScoreGaugeA11y />,
  "score-card": () => <ScoreCardA11y />,
  "risk-category-card": () => <RiskCategoryCardA11y />,
  "font-awesome-icon": () => <FontAwesomeIconA11y />,
  "filter-button": () => <FilterButtonA11y />,
  "sort-button": () => <SortButtonA11y />,
  "field-label": () => <FieldLabelA11y />,
  "field-caption": () => <FieldCaptionA11y />,
  "field-validation": () => <FieldValidationA11y />,
  caret: () => <CaretA11y />,
  "dropdown-panel": () => <DropdownPanelA11y />,
  tag: () => <TagA11y />,
  "ai-tag": () => <AiTagA11y />,
  "data-table": () => <DataTableA11y />,
  "data-field": () => <DataFieldA11y />,
  "counter-label": () => <CounterLabelA11y />,
  "section-header": () => <SectionHeaderA11y />,
  "dismiss-issue-badge": () => <DismissIssueBadgeA11y />,
  "flag-icon": () => <FlagIconA11y />,
  "action-list-item": () => <ActionListItemA11y />,
  "stat-card": () => <StatCardA11y />,
};

export function hasComponentContentA11y(pageId: string): pageId is ComponentPageId {
  return isComponentDocPage(pageId);
}

export function renderComponentContentA11y(pageId: ComponentPageId): ReactNode {
  const render = COMPONENT_CONTENT_A11Y[pageId];
  return render ? render() : <GenericComponentA11y componentId={pageId} />;
}
