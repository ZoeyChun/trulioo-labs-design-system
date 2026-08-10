import type { ReactNode } from "react";
import {
  ButtonGroupAnatomy,
  ButtonMenuAnatomy,
  CheckboxAnatomy,
  DismissActionAnatomy,
  IconButtonAnatomy,
  SegmentedControlAnatomy,
  SpinnerAnatomy,
  SwitchAnatomy,
} from "../components/anatomy/CoreControlsAnatomy";
import {
  DatePickerAnatomy,
  RadioAnatomy,
  RadioCardAnatomy,
  RadioGroupAnatomy,
  SelectAnatomy,
  TextInputAnatomy,
  TextareaAnatomy,
} from "../components/anatomy/FormInputsAnatomy";
import { ButtonAnatomy } from "../components/anatomy/ButtonAnatomy";
import {
  BreadcrumbAnatomy,
  FilterTab2Anatomy,
  FilterTabAnatomy,
  NavItemAnatomy,
  NavListAnatomy,
  SideNavAnatomy,
  TabItemAnatomy,
  TabsAnatomy,
} from "../components/anatomy/NavigationAnatomy";
import { AccordionAnatomy } from "../components/anatomy/ContainersAnatomy";
import {
  AnnouncementAnatomy,
  DialogAnatomy,
  TooltipAnatomy,
} from "../components/anatomy/FeedbackAnatomy";
import {
  ListedProgressItemAnatomy,
  ProgressIndicatorAnatomy,
  StepProgressAnatomy,
} from "../components/anatomy/ProgressAnatomy";
import {
  RiskCategoryCardAnatomy,
  ScoreCardAnatomy,
  ScoreGaugeAnatomy,
} from "../components/anatomy/ScoringAnatomy";
import {
  FilterButtonAnatomy,
  FontAwesomeIconAnatomy,
  SortButtonAnatomy,
} from "../components/anatomy/UtilityAnatomy";
import {
  ActionListItemAnatomy,
  AiTagAnatomy,
  CounterLabelAnatomy,
  DataFieldAnatomy,
  DataTableAnatomy,
  DismissIssueBadgeAnatomy,
  FlagIconAnatomy,
  SectionHeaderAnatomy,
  StatCardAnatomy,
} from "../components/anatomy/DataDisplayAnatomy";
import {
  CaretAnatomy,
  DropdownPanelAnatomy,
  FieldCaptionAnatomy,
  FieldLabelAnatomy,
  FieldValidationAnatomy,
  TagAnatomy,
} from "../components/anatomy/SharedAtomsAnatomy";
import { isComponentDocPage, type ComponentPageId } from "./navigation";

const COMPONENT_ANATOMY: Partial<Record<ComponentPageId, () => ReactNode>> = {
  button: () => <ButtonAnatomy />,
  "icon-button": () => <IconButtonAnatomy />,
  "button-group": () => <ButtonGroupAnatomy />,
  "segmented-control": () => <SegmentedControlAnatomy />,
  spinner: () => <SpinnerAnatomy />,
  "button-menu": () => <ButtonMenuAnatomy />,
  switch: () => <SwitchAnatomy />,
  checkbox: () => <CheckboxAnatomy />,
  "dismiss-action": () => <DismissActionAnatomy />,
  "side-nav": () => <SideNavAnatomy />,
  "nav-item": () => <NavItemAnatomy />,
  "nav-list": () => <NavListAnatomy />,
  tabs: () => <TabsAnatomy />,
  "tab-item": () => <TabItemAnatomy />,
  "filter-tab": () => <FilterTabAnatomy />,
  "filter-tab-2": () => <FilterTab2Anatomy />,
  breadcrumb: () => <BreadcrumbAnatomy />,
  "text-input": () => <TextInputAnatomy />,
  textarea: () => <TextareaAnatomy />,
  select: () => <SelectAnatomy />,
  "date-picker": () => <DatePickerAnatomy />,
  radio: () => <RadioAnatomy />,
  "radio-group": () => <RadioGroupAnatomy />,
  "radio-card": () => <RadioCardAnatomy />,
  tooltip: () => <TooltipAnatomy />,
  announcement: () => <AnnouncementAnatomy />,
  dialog: () => <DialogAnatomy />,
  accordion: () => <AccordionAnatomy />,
  "progress-indicator": () => <ProgressIndicatorAnatomy />,
  "step-progress": () => <StepProgressAnatomy />,
  "listed-progress-item": () => <ListedProgressItemAnatomy />,
  "score-gauge": () => <ScoreGaugeAnatomy />,
  "score-card": () => <ScoreCardAnatomy />,
  "risk-category-card": () => <RiskCategoryCardAnatomy />,
  "font-awesome-icon": () => <FontAwesomeIconAnatomy />,
  "filter-button": () => <FilterButtonAnatomy />,
  "sort-button": () => <SortButtonAnatomy />,
  "field-label": () => <FieldLabelAnatomy />,
  "field-caption": () => <FieldCaptionAnatomy />,
  "field-validation": () => <FieldValidationAnatomy />,
  caret: () => <CaretAnatomy />,
  "dropdown-panel": () => <DropdownPanelAnatomy />,
  tag: () => <TagAnatomy />,
  "ai-tag": () => <AiTagAnatomy />,
  "data-table": () => <DataTableAnatomy />,
  "data-field": () => <DataFieldAnatomy />,
  "counter-label": () => <CounterLabelAnatomy />,
  "section-header": () => <SectionHeaderAnatomy />,
  "dismiss-issue-badge": () => <DismissIssueBadgeAnatomy />,
  "flag-icon": () => <FlagIconAnatomy />,
  "action-list-item": () => <ActionListItemAnatomy />,
  "stat-card": () => <StatCardAnatomy />,
};

export function hasComponentAnatomy(pageId: string): pageId is ComponentPageId {
  return isComponentDocPage(pageId) && pageId in COMPONENT_ANATOMY;
}

export function renderComponentAnatomy(pageId: ComponentPageId): ReactNode {
  const render = COMPONENT_ANATOMY[pageId];
  return render ? render() : null;
}
