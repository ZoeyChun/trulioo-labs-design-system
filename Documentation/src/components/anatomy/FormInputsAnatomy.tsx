import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

const textInputPins = [
  { number: 1, direction: "top" as const, selector: "[data-anatomy='text-input'] .tds-field-label" },
  { number: 2, direction: "right" as const, selector: "[data-anatomy='text-input'] .tds-text-input__field" },
  {
    number: 3,
    direction: "left" as const,
    selector: "[data-anatomy='text-input'] .tds-text-input__native",
    anchor: { y: 0.5 },
  },
  { number: 4, direction: "bottom" as const, selector: "[data-anatomy='text-input'] .tds-field-caption" },
];

export function TextInputAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Composite field with label, bordered input container, native input, and optional footer for caption or validation."
      api=".tds-text-input · __field · __native · __footer"
      tag="Figma 96:3268"
      parts={[
        { number: 1, name: "Field label", api: ".tds-field-label", detail: "Associated label above the input container." },
        { number: 2, name: "Field container", api: ".tds-text-input__field", detail: "Bordered box with inset shadow. Size via --sm | --md | --lg." },
        { number: 3, name: "Native input", api: ".tds-text-input__native", detail: "Borderless input filling the container width." },
        { number: 4, name: "Validation", api: ".tds-field-validation", detail: "Error or success message below the field." },
      ]}
    >
      <AnatomyPinLayer pins={textInputPins} className="ds-anatomy-diagram--field">
        <div className="tds-text-input" data-anatomy="text-input">
          <label className="tds-field-label">Business name</label>
          <div className="tds-text-input__field tds-text-input__field--lg">
            <input className="tds-text-input__native" type="text" placeholder="Acme Corp" readOnly />
          </div>
          <span className="tds-field-caption">As registered with the jurisdiction</span>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const caret = (
  <span className="tds-caret tds-caret--default" aria-hidden="true">
    <svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor" />
      <path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor" />
    </svg>
  </span>
);

const selectPins = [
  { number: 1, direction: "right" as const, selector: "[data-anatomy='select'] .tds-select__trigger" },
  {
    number: 2,
    direction: "left" as const,
    selector: "[data-anatomy='select'] [data-anatomy-part='select-value']",
    anchor: { y: 0.5 },
  },
  { number: 3, direction: "top" as const, selector: "[data-anatomy='select'] .tds-select__trailing-group" },
  {
    number: 4,
    direction: "right" as const,
    selector: "[data-anatomy='select'] .tds-dropdown-panel",
    anchor: { y: 0.35 },
  },
];

export function SelectAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Dropdown trigger with value slot, optional leading visuals, and caret in the trailing group."
      api=".tds-select · __trigger · __value · __menu"
      tag="Figma 96:1624"
      parts={[
        { number: 1, name: "Trigger", api: ".tds-select__trigger", detail: "Combobox button opening the menu. role='combobox' + aria-expanded." },
        { number: 2, name: "Value", api: ".tds-select__value", detail: "Selected text or .tds-select__placeholder when empty." },
        { number: 3, name: "Caret", api: ".tds-caret", detail: "Chevron indicating expandable menu." },
        { number: 4, name: "Menu", api: ".tds-select__menu", detail: "Hidden panel containing .tds-dropdown-panel." },
      ]}
    >
      <AnatomyPinLayer pins={selectPins} className="ds-anatomy-diagram--field-sm">
        <div className="tds-select tds-select--open tds-guideline-select-anatomy" data-anatomy="select">
          <label className="tds-field-label">Province</label>
          <button
            type="button"
            className="tds-select__trigger tds-select__trigger--lg"
            role="combobox"
            aria-expanded="true"
            aria-haspopup="listbox"
          >
            <span className="tds-select__value">
              <span data-anatomy-part="select-value">Ontario</span>
            </span>
            <div className="tds-select__trailing-group">{caret}</div>
          </button>
          <div className="tds-select__menu" role="listbox">
            <div className="tds-dropdown-panel">
              <div className="tds-action-list-item tds-action-list-item--selected" role="option" aria-selected="true">
                <span className="tds-action-list-item__label">Ontario</span>
              </div>
              <div className="tds-action-list-item" role="option">
                <span className="tds-action-list-item__label">British Columbia</span>
              </div>
              <div className="tds-action-list-item" role="option">
                <span className="tds-action-list-item__label">Alberta</span>
              </div>
              <div className="tds-action-list-item" role="option">
                <span className="tds-action-list-item__label">Quebec</span>
              </div>
            </div>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const datePickerChevronLeft = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 8L10 3L10.7 3.7L6.4 8L10.7 12.3L10 13L5 8Z" fill="currentColor" />
  </svg>
);

const datePickerChevronRight = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11 8L6 3L5.3 3.7L9.6 8L5.3 12.3L6 13L11 8Z" fill="currentColor" />
  </svg>
);

const datePickerPins = [
  { number: 1, direction: "right" as const, selector: "[data-anatomy='date-picker'] .tds-date-picker__field" },
  { number: 2, direction: "top" as const, selector: "[data-anatomy='date-picker'] .tds-date-picker__icon" },
  {
    number: 3,
    direction: "top" as const,
    selector: "[data-anatomy='date-picker'] [data-anatomy-part='date-value']",
  },
  { number: 4, direction: "top" as const, selector: "[data-anatomy='date-picker'] .tds-date-picker__day--selected" },
];

export function DatePickerAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Calendar trigger with icon, formatted date value, and popover calendar grid."
      api=".tds-date-picker · __field · __calendar · __day"
      tag="Figma 1632:29292"
      parts={[
        { number: 1, name: "Trigger field", api: ".tds-date-picker__field", detail: "Button opening the calendar dialog." },
        { number: 2, name: "Calendar icon", api: ".tds-date-picker__icon", detail: "Leading calendar glyph." },
        { number: 3, name: "Date value", api: ".tds-date-picker__value", detail: "Formatted date or placeholder." },
        { number: 4, name: "Day cell", api: ".tds-date-picker__day", detail: "Individual day in the calendar grid." },
      ]}
    >
      <AnatomyPinLayer pins={datePickerPins} className="ds-anatomy-diagram--field-sm">
        <div className="tds-date-picker tds-date-picker--open tds-guideline-date-picker-anatomy" data-anatomy="date-picker">
          <label className="tds-field-label">Incorporation date</label>
          <button
            type="button"
            className="tds-date-picker__field tds-date-picker__field--lg"
            aria-haspopup="dialog"
            aria-expanded="true"
          >
            <span className="tds-date-picker__icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
                <path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </span>
            <span className="tds-date-picker__value">
              <span data-anatomy-part="date-value">03/13/2021</span>
            </span>
          </button>
          <div className="tds-date-picker__calendar" role="dialog" aria-label="Choose date">
            <div className="tds-date-picker__header">
              <button type="button" className="tds-date-picker__nav" aria-label="Previous month" tabIndex={-1}>
                {datePickerChevronLeft}
              </button>
              <div className="tds-date-picker__title">
                <span className="tds-date-picker__month">March</span>
                <span className="tds-date-picker__year">2021</span>
              </div>
              <button type="button" className="tds-date-picker__nav" aria-label="Next month" tabIndex={-1}>
                {datePickerChevronRight}
              </button>
            </div>
            <div className="tds-date-picker__weekdays" aria-hidden="true">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <span key={`${day}-${index}`} className="tds-date-picker__day tds-date-picker__day--weekday">
                  {day}
                </span>
              ))}
            </div>
            <div className="tds-date-picker__weeks">
              <div className="tds-date-picker__week">
                <button type="button" className="tds-date-picker__day tds-date-picker__day--outside" tabIndex={-1}>28</button>
                {[1, 2, 3, 4, 5, 6].map((day) => (
                  <button key={day} type="button" className="tds-date-picker__day" tabIndex={-1}>{day}</button>
                ))}
              </div>
              <div className="tds-date-picker__week">
                {[7, 8, 9, 10, 11, 12].map((day) => (
                  <button key={day} type="button" className="tds-date-picker__day" tabIndex={-1}>{day}</button>
                ))}
                <button type="button" className="tds-date-picker__day tds-date-picker__day--selected" tabIndex={-1}>13</button>
              </div>
              <div className="tds-date-picker__week">
                {[14, 15, 16, 17, 18, 19, 20].map((day) => (
                  <button key={day} type="button" className="tds-date-picker__day" tabIndex={-1}>{day}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const radioPins = [
  { number: 1, direction: "top" as const, selector: "[data-anatomy='radio'] .tds-radio" },
  { number: 2, direction: "bottom" as const, selector: "[data-anatomy='radio-label']" },
];

export function RadioAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="16×16 circular control for mutually exclusive selection within a named group."
      api=".tds-radio"
      tag="Figma 100:4253"
      parts={[
        { number: 1, name: "Radio input", api: ".tds-radio", detail: "Native input[type=radio] with custom styling." },
        { number: 2, name: "Label", api: "<label>", detail: "Visible text associated with the control." },
      ]}
    >
      <AnatomyPinLayer pins={radioPins}>
        <label data-anatomy="radio" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <input type="radio" name="anatomy-radio" className="tds-radio" defaultChecked readOnly />
          <span data-anatomy="radio-label">Business entity</span>
        </label>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const radioGroupPins = [
  { number: 1, direction: "left" as const, selector: "[data-anatomy='radio-group']", anchor: { y: 0.45 } },
  { number: 2, direction: "top" as const, selector: ".tds-radio-group__label", anchor: { x: 0.05 } },
  { number: 3, direction: "bottom" as const, selector: ".tds-radio-group__caption", anchor: { x: 0.05 } },
];

export function RadioGroupAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Vertical stack of labeled radio rows with optional caption per option."
      api=".tds-radio-group · __item · __label · __caption"
      tag="Figma 100:4222"
      parts={[
        { number: 1, name: "Group container", api: ".tds-radio-group", detail: "Vertical flex stack of options." },
        { number: 2, name: "Item row", api: ".tds-radio-group__item", detail: "Label wrapping radio + content." },
        { number: 3, name: "Caption", api: ".tds-radio-group__caption", detail: "Secondary description under the label." },
      ]}
    >
      <AnatomyPinLayer pins={radioGroupPins} className="ds-anatomy-diagram--inline">
        <div className="tds-radio-group" data-anatomy="radio-group">
          <label className="tds-radio-group__item">
            <input type="radio" name="anatomy-rg" className="tds-radio" defaultChecked readOnly />
            <div className="tds-radio-group__content">
              <div className="tds-radio-group__label">Business verification</div>
              <div className="tds-radio-group__caption">Verify a registered entity</div>
            </div>
          </label>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const faceIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="6.5" r="1" fill="currentColor" />
    <circle cx="10.5" cy="6.5" r="1" fill="currentColor" />
    <path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const radioCardPins = [
  { number: 1, direction: "right" as const, selector: "[data-anatomy='radio-card']" },
  { number: 2, direction: "left" as const, selector: "[data-anatomy='radio-card'] .tds-radio" },
  { number: 3, direction: "bottom" as const, selector: "[data-anatomy='radio-card'] .tds-radio-card__description" },
];

export function RadioCardAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Bordered selectable card with embedded radio, icon, label, and optional description."
      api=".tds-radio-card · __content · __description"
      tag="Figma 359:3332"
      parts={[
        { number: 1, name: "Card container", api: ".tds-radio-card", detail: "Clickable bordered card. --selected when active." },
        { number: 2, name: "Radio control", api: ".tds-radio", detail: "Hidden or visible radio reflecting selection." },
        { number: 3, name: "Description", api: ".tds-radio-card__description", detail: "Supporting copy below the label row." },
      ]}
    >
      <AnatomyPinLayer pins={radioCardPins} className="ds-anatomy-diagram--field-sm">
        <div className="tds-radio-card tds-radio-card--selected" data-anatomy="radio-card">
          <input type="radio" name="anatomy-rc" className="tds-radio" defaultChecked readOnly />
          <div className="tds-radio-card__content">
            <div className="tds-radio-card__label-row">
              <span className="tds-radio-card__icon">{faceIcon}</span>
              <div className="tds-radio-card__label">Standard KYB</div>
            </div>
            <div className="tds-radio-card__description">Basic entity verification</div>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const textareaGripSvg = (
  <span className="tds-textarea__grip" aria-hidden="true">
    <svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 0.5 0.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M4.5 2.5 2.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  </span>
);

const textareaPins = [
  { number: 1, direction: "top" as const, selector: "[data-anatomy='textarea'] .tds-field-label" },
  {
    number: 2,
    direction: "right" as const,
    selector: "[data-anatomy='textarea'] .tds-textarea__field",
    anchor: { y: 0.35 },
  },
  {
    number: 3,
    direction: "left" as const,
    selector: "[data-anatomy='textarea'] .tds-textarea__native",
    anchor: { y: 0.25 },
  },
  {
    number: 4,
    direction: "bottom" as const,
    selector: "[data-anatomy='textarea'] .tds-textarea__grip",
  },
];

export function TextareaAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Multi-line field with label, bordered container, native textarea, resize grip, and optional footer."
      api=".tds-textarea · __field · __native · __grip · __footer"
      tag="Figma 3358:26529"
      parts={[
        { number: 1, name: "Field label", api: ".tds-field-label", detail: "Associated label above the textarea container." },
        { number: 2, name: "Field container", api: ".tds-textarea__field", detail: "Bordered box with inset shadow and focus ring." },
        { number: 3, name: "Native textarea", api: ".tds-textarea__native", detail: "Borderless textarea with vertical resize." },
        { number: 4, name: "Resize grip", api: ".tds-textarea__grip", detail: "Decorative corner grip hinting at resize affordance." },
      ]}
    >
      <AnatomyPinLayer pins={textareaPins} className="ds-anatomy-diagram--field">
        <div className="tds-textarea" data-anatomy="textarea">
          <label className="tds-field-label">Reviewer notes</label>
          <div className="tds-textarea__field">
            <textarea className="tds-textarea__native" rows={3} placeholder="Add context…" readOnly />
            {textareaGripSvg}
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
