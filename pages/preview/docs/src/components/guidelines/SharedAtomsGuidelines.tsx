import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

export function FieldLabelGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Every field needs a visible label"
        lead={
          <p>
            Field labels identify what data to enter. Associate each label with its control via{" "}
            <code>htmlFor</code> and <code>id</code> — placeholder text is not a substitute.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <label className="tds-field-label" htmlFor="demo-label">
              Legal business name
            </label>
          }
          doCaption="Use specific labels that name the data being collected."
          dontPreview={<label className="tds-field-label">Input</label>}
          dontCaption="Avoid generic labels like Input or Field."
        />
      </GuidelineSection>
    </div>
  );
}

export function FieldCaptionGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Captions explain — they don't validate"
        lead={
          <p>
            Helper captions describe format or context in the default state. Keep validation errors
            separate in <code>.tds-field-validation</code>.
          </p>
        }
      >
        <DoDontPair
          doPreview={<span className="tds-field-caption">9-digit CRA business number</span>}
          doCaption="Captions stay visible before and after interaction."
          dontPreview={
            <span className="tds-field-validation tds-field-validation--error">Required field</span>
          }
          dontCaption="Don't use caption styling for error messages."
        />
      </GuidelineSection>
    </div>
  );
}

export function FieldValidationGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Show errors only after validation fails"
        lead={
          <p>
            Apply <code>.tds-field-validation--error</code> when a field fails validation and{" "}
            <code>--success</code> for confirmed valid input. Pair with <code>aria-invalid</code> on
            the native control.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <span className="tds-field-validation tds-field-validation--error">
              Enter a registered business name
            </span>
          }
          doCaption="Error copy describes what went wrong and how to fix it."
          dontPreview={
            <span className="tds-field-caption">Enter a registered business name</span>
          }
          dontCaption="Don't show error styling in the default empty state."
        />
      </GuidelineSection>
    </div>
  );
}

export function CaretGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Mark decorative carets as hidden"
        lead={
          <p>
            Carets indicate expandable menus on Select, ButtonMenu, and Tooltip. They are visual
            affordances — the control's accessible name carries meaning.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <span className="tds-caret tds-caret--default" aria-hidden="true">
              <svg viewBox="0 0 8 11" width="8" height="11" fill="currentColor">
                <path d="M0.07 3.47L3.47 0.07a0.25 0.25 0 0 1 .35 0L7.22 3.47a0.25 0.25 0 0 1-.18.43H0.25a0.25 0.25 0 0 1-.18-.43z" />
              </svg>
            </span>
          }
          doCaption="Set aria-hidden='true' on the caret SVG wrapper."
          dontPreview={<span className="tds-caret tds-caret--default" aria-label="Expand menu" />}
          dontCaption="Don't give carets their own accessible name."
        />
      </GuidelineSection>
    </div>
  );
}

export function DropdownPanelGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use the right menu type for the task"
        lead={
          <p>
            Dropdown panels support plain lists, single-select with checkmarks, multi-select with
            checkboxes, and leading icons or flags. Match the pattern to Select, FilterButton, or
            ButtonMenu.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-dropdown-panel" style={{ width: 220 }}>
              <button type="button" className="tds-action-list-item" role="menuitem">
                <span className="tds-action-list-item__label">Ontario</span>
              </button>
              <button type="button" className="tds-action-list-item tds-action-list-item--selected" role="menuitem">
                <span className="tds-action-list-item__label">British Columbia</span>
              </button>
            </div>
          }
          doCaption="Single-select menus show one selected row with a checkmark."
          dontPreview={
            <div className="tds-dropdown-panel" style={{ width: 220 }}>
              <button type="button" className="tds-btn tds-btn--primary tds-btn--sm">
                Submit
              </button>
            </div>
          }
          dontCaption="Don't mix primary action buttons inside menu panels."
        />
      </GuidelineSection>
    </div>
  );
}

export function TagGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Pick semantic tag types for status"
        lead={
          <p>
            Tags communicate status at a glance — positive, intermediate, negative, or default.
            Keep labels short (1–3 words) and use removable variants only when users can dismiss.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <span className="tds-tag tds-tag--md tds-tag--positive">Verified</span>
          }
          doCaption="Semantic colors map to verification outcomes users already know."
          dontPreview={
            <span className="tds-tag tds-tag--md tds-tag--positive">Status indicator green</span>
          }
          dontCaption="Don't encode color in the label text."
        />
      </GuidelineSection>
    </div>
  );
}
