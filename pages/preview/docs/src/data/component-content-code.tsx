import type { ReactNode } from "react";
import {
  DatePickerCode,
  RadioCardCode,
  RadioCode,
  RadioGroupCode,
  SelectCode,
  TextInputCode,
  TextareaCode,
} from "../components/code/FormInputsCode";
import { ButtonCode } from "../components/code/ButtonCode";
import {
  ButtonGroupCode,
  ButtonMenuCode,
  CheckboxCode,
  DismissActionCode,
  IconButtonCode,
  SegmentedControlCode,
  SpinnerCode,
  SwitchCode,
} from "../components/code/CoreControlsCode";
import {
  BreadcrumbCode,
  FilterTab2Code,
  FilterTabCode,
  NavItemCode,
  NavListCode,
  SideNavCode,
  TabItemCode,
  TabsCode,
} from "../components/code/NavigationCode";
import { AccordionCode } from "../components/code/ContainersCode";
import {
  AnnouncementCode,
  DialogCode,
  TooltipCode,
} from "../components/code/FeedbackCode";
import {
  ListedProgressItemCode,
  ProgressIndicatorCode,
  StepProgressCode,
} from "../components/code/ProgressCode";
import {
  RiskCategoryCardCode,
  ScoreCardCode,
  ScoreGaugeCode,
} from "../components/code/ScoringCode";
import {
  FilterButtonCode,
  FontAwesomeIconCode,
  SortButtonCode,
} from "../components/code/UtilityCode";
import {
  ActionListItemCode,
  AiTagCode,
  CounterLabelCode,
  DataFieldCode,
  DataTableCode,
  DismissIssueBadgeCode,
  FlagIconCode,
  SectionHeaderCode,
  StatCardCode,
} from "../components/code/DataDisplayCode";
import {
  CaretCode,
  DropdownPanelCode,
  FieldCaptionCode,
  FieldLabelCode,
  FieldValidationCode,
  TagCode,
} from "../components/code/SharedAtomsCode";
import { GenericComponentCode } from "../components/fallbacks/ComponentPageFallbacks";
import { isComponentDocPage, type ComponentPageId } from "./navigation";

type CodeContentContext = {
  basePath: string;
};

const COMPONENT_CONTENT_CODE: Partial<Record<ComponentPageId, (ctx: CodeContentContext) => ReactNode>> = {
  button: (ctx) => <ButtonCode {...ctx} />,
  "icon-button": (ctx) => <IconButtonCode {...ctx} />,
  "button-group": (ctx) => <ButtonGroupCode {...ctx} />,
  "segmented-control": (ctx) => <SegmentedControlCode {...ctx} />,
  spinner: (ctx) => <SpinnerCode {...ctx} />,
  "button-menu": (ctx) => <ButtonMenuCode {...ctx} />,
  switch: (ctx) => <SwitchCode {...ctx} />,
  checkbox: (ctx) => <CheckboxCode {...ctx} />,
  "dismiss-action": (ctx) => <DismissActionCode {...ctx} />,
  "side-nav": (ctx) => <SideNavCode {...ctx} />,
  "nav-item": (ctx) => <NavItemCode {...ctx} />,
  "nav-list": (ctx) => <NavListCode {...ctx} />,
  tabs: (ctx) => <TabsCode {...ctx} />,
  "tab-item": (ctx) => <TabItemCode {...ctx} />,
  "filter-tab": (ctx) => <FilterTabCode {...ctx} />,
  "filter-tab-2": (ctx) => <FilterTab2Code {...ctx} />,
  breadcrumb: (ctx) => <BreadcrumbCode {...ctx} />,
  "text-input": (ctx) => <TextInputCode {...ctx} />,
  textarea: (ctx) => <TextareaCode {...ctx} />,
  select: (ctx) => <SelectCode {...ctx} />,
  "date-picker": (ctx) => <DatePickerCode {...ctx} />,
  radio: (ctx) => <RadioCode {...ctx} />,
  "radio-group": (ctx) => <RadioGroupCode {...ctx} />,
  "radio-card": (ctx) => <RadioCardCode {...ctx} />,
  tooltip: (ctx) => <TooltipCode {...ctx} />,
  announcement: (ctx) => <AnnouncementCode {...ctx} />,
  dialog: (ctx) => <DialogCode {...ctx} />,
  accordion: (ctx) => <AccordionCode {...ctx} />,
  "progress-indicator": (ctx) => <ProgressIndicatorCode {...ctx} />,
  "step-progress": (ctx) => <StepProgressCode {...ctx} />,
  "listed-progress-item": (ctx) => <ListedProgressItemCode {...ctx} />,
  "score-gauge": (ctx) => <ScoreGaugeCode {...ctx} />,
  "score-card": (ctx) => <ScoreCardCode {...ctx} />,
  "risk-category-card": (ctx) => <RiskCategoryCardCode {...ctx} />,
  "font-awesome-icon": (ctx) => <FontAwesomeIconCode {...ctx} />,
  "filter-button": (ctx) => <FilterButtonCode {...ctx} />,
  "sort-button": (ctx) => <SortButtonCode {...ctx} />,
  "field-label": (ctx) => <FieldLabelCode {...ctx} />,
  "field-caption": (ctx) => <FieldCaptionCode {...ctx} />,
  "field-validation": (ctx) => <FieldValidationCode {...ctx} />,
  caret: (ctx) => <CaretCode {...ctx} />,
  "dropdown-panel": (ctx) => <DropdownPanelCode {...ctx} />,
  tag: (ctx) => <TagCode {...ctx} />,
  "ai-tag": (ctx) => <AiTagCode {...ctx} />,
  "data-table": (ctx) => <DataTableCode {...ctx} />,
  "data-field": (ctx) => <DataFieldCode {...ctx} />,
  "counter-label": (ctx) => <CounterLabelCode {...ctx} />,
  "section-header": (ctx) => <SectionHeaderCode {...ctx} />,
  "dismiss-issue-badge": (ctx) => <DismissIssueBadgeCode {...ctx} />,
  "flag-icon": (ctx) => <FlagIconCode {...ctx} />,
  "action-list-item": (ctx) => <ActionListItemCode {...ctx} />,
  "stat-card": (ctx) => <StatCardCode {...ctx} />,
};

export function hasComponentContentCode(pageId: string): pageId is ComponentPageId {
  return isComponentDocPage(pageId);
}

export function renderComponentContentCode(
  pageId: ComponentPageId,
  ctx: CodeContentContext,
): ReactNode {
  const render = COMPONENT_CONTENT_CODE[pageId];
  return render ? render(ctx) : <GenericComponentCode componentId={pageId} {...ctx} />;
}
