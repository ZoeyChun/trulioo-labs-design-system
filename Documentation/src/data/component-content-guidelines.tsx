import type { ReactNode } from "react";
import {
  ButtonGroupGuidelines,
  CheckboxGuidelines,
  DismissActionGuidelines,
  IconButtonGuidelines,
  SegmentedControlGuidelines,
  SpinnerGuidelines,
  SwitchGuidelines,
} from "../components/guidelines/CoreControlsGuidelines";
import {
  BreadcrumbGuidelines,
  FilterTab2Guidelines,
  FilterTabGuidelines,
  NavItemGuidelines,
  NavListGuidelines,
  SideNavGuidelines,
  TabItemGuidelines,
  TabsGuidelines,
} from "../components/guidelines/NavigationGuidelines";
import { ButtonGuidelines } from "../components/guidelines/ButtonGuidelines";
import { ButtonMenuGuidelines } from "../components/guidelines/ButtonMenuGuidelines";
import { AccordionGuidelines } from "../components/guidelines/ContainersGuidelines";
import {
  AnnouncementGuidelines,
  DialogGuidelines,
  TooltipGuidelines,
} from "../components/guidelines/FeedbackGuidelines";
import {
  DatePickerGuidelines,
  RadioCardGuidelines,
  RadioGroupGuidelines,
  RadioGuidelines,
  SelectGuidelines,
  TextInputGuidelines,
  TextareaGuidelines,
} from "../components/guidelines/FormInputsGuidelines";
import {
  ListedProgressItemGuidelines,
  ProgressIndicatorGuidelines,
  StepProgressGuidelines,
} from "../components/guidelines/ProgressGuidelines";
import {
  RiskCategoryCardGuidelines,
  ScoreCardGuidelines,
  ScoreGaugeGuidelines,
} from "../components/guidelines/ScoringGuidelines";
import {
  FilterButtonGuidelines,
  FontAwesomeIconGuidelines,
  SortButtonGuidelines,
} from "../components/guidelines/UtilityGuidelines";
import {
  ActionListItemGuidelines,
  AiTagGuidelines,
  CounterLabelGuidelines,
  DataFieldGuidelines,
  DataTableGuidelines,
  DismissIssueBadgeGuidelines,
  FlagIconGuidelines,
  SectionHeaderGuidelines,
  StatCardGuidelines,
} from "../components/guidelines/DataDisplayGuidelines";
import {
  CaretGuidelines,
  DropdownPanelGuidelines,
  FieldCaptionGuidelines,
  FieldLabelGuidelines,
  FieldValidationGuidelines,
  TagGuidelines,
} from "../components/guidelines/SharedAtomsGuidelines";
import { GenericComponentGuidelines } from "../components/fallbacks/ComponentPageFallbacks";
import { isComponentDocPage, type ComponentPageId } from "./navigation";

const COMPONENT_CONTENT_GUIDELINES: Partial<Record<ComponentPageId, () => ReactNode>> = {
  button: () => <ButtonGuidelines />,
  "icon-button": () => <IconButtonGuidelines />,
  "button-group": () => <ButtonGroupGuidelines />,
  "segmented-control": () => <SegmentedControlGuidelines />,
  spinner: () => <SpinnerGuidelines />,
  "button-menu": () => <ButtonMenuGuidelines />,
  switch: () => <SwitchGuidelines />,
  checkbox: () => <CheckboxGuidelines />,
  "dismiss-action": () => <DismissActionGuidelines />,
  "side-nav": () => <SideNavGuidelines />,
  "nav-item": () => <NavItemGuidelines />,
  "nav-list": () => <NavListGuidelines />,
  tabs: () => <TabsGuidelines />,
  "tab-item": () => <TabItemGuidelines />,
  "filter-tab": () => <FilterTabGuidelines />,
  "filter-tab-2": () => <FilterTab2Guidelines />,
  breadcrumb: () => <BreadcrumbGuidelines />,
  "text-input": () => <TextInputGuidelines />,
  textarea: () => <TextareaGuidelines />,
  select: () => <SelectGuidelines />,
  "date-picker": () => <DatePickerGuidelines />,
  radio: () => <RadioGuidelines />,
  "radio-group": () => <RadioGroupGuidelines />,
  "radio-card": () => <RadioCardGuidelines />,
  tooltip: () => <TooltipGuidelines />,
  announcement: () => <AnnouncementGuidelines />,
  dialog: () => <DialogGuidelines />,
  accordion: () => <AccordionGuidelines />,
  "progress-indicator": () => <ProgressIndicatorGuidelines />,
  "step-progress": () => <StepProgressGuidelines />,
  "listed-progress-item": () => <ListedProgressItemGuidelines />,
  "score-gauge": () => <ScoreGaugeGuidelines />,
  "score-card": () => <ScoreCardGuidelines />,
  "risk-category-card": () => <RiskCategoryCardGuidelines />,
  "font-awesome-icon": () => <FontAwesomeIconGuidelines />,
  "filter-button": () => <FilterButtonGuidelines />,
  "sort-button": () => <SortButtonGuidelines />,
  "field-label": () => <FieldLabelGuidelines />,
  "field-caption": () => <FieldCaptionGuidelines />,
  "field-validation": () => <FieldValidationGuidelines />,
  caret: () => <CaretGuidelines />,
  "dropdown-panel": () => <DropdownPanelGuidelines />,
  tag: () => <TagGuidelines />,
  "ai-tag": () => <AiTagGuidelines />,
  "data-table": () => <DataTableGuidelines />,
  "data-field": () => <DataFieldGuidelines />,
  "counter-label": () => <CounterLabelGuidelines />,
  "section-header": () => <SectionHeaderGuidelines />,
  "dismiss-issue-badge": () => <DismissIssueBadgeGuidelines />,
  "flag-icon": () => <FlagIconGuidelines />,
  "action-list-item": () => <ActionListItemGuidelines />,
  "stat-card": () => <StatCardGuidelines />,
};

export function hasComponentContentGuidelines(pageId: string): pageId is ComponentPageId {
  return isComponentDocPage(pageId);
}

export function renderComponentContentGuidelines(pageId: ComponentPageId): ReactNode {
  const render = COMPONENT_CONTENT_GUIDELINES[pageId];
  return render ? render() : <GenericComponentGuidelines componentId={pageId} />;
}
