import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

function PreviewRow({ children }: { children: React.ReactNode }) {
  return <div className="tds-guideline-button-row">{children}</div>;
}

function TextInputField({
  label = "Business name",
  placeholder = "Acme Corp",
  value,
  invalid = false,
  caption,
}: {
  label?: string;
  placeholder?: string;
  value?: string;
  invalid?: boolean;
  caption?: string;
}) {
  return (
    <div className={`tds-text-input${invalid ? " tds-text-input--invalid" : ""}`} style={{ maxWidth: 320 }}>
      <label className="tds-field-label">{label}</label>
      <div className="tds-text-input__field tds-text-input__field--lg">
        <input
          className="tds-text-input__native"
          type="text"
          placeholder={placeholder}
          defaultValue={value}
          aria-invalid={invalid || undefined}
        />
      </div>
      {invalid && (
        <span className="tds-field-validation tds-field-validation--error">
          Enter a registered business name
        </span>
      )}
      {caption && !invalid && <span className="tds-field-caption">{caption}</span>}
    </div>
  );
}

export function TextInputGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Pair every field with a visible label"
        lead={
          <p>
            Text inputs collect free-form data in KYB and KYC flows. Every field needs a{" "}
            <code>.tds-field-label</code> associated via <code>htmlFor</code> / <code>id</code> so
            screen readers announce purpose before the user types.
          </p>
        }
      >
        <DoDontPair
          doPreview={<TextInputField label="Legal business name" caption="As registered with the jurisdiction" />}
          doCaption="Use specific labels that name the data being collected."
          dontPreview={<TextInputField label="Input" />}
          dontCaption="Don't use generic labels like Input or Field."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Separate helper text from validation errors"
        lead={
          <p>
            Captions explain format or context; validation messages describe what went wrong. Use{" "}
            <code>.tds-field-caption</code> for hints and <code>.tds-field-validation--error</code>{" "}
            only after failed validation.
          </p>
        }
      >
        <DoDontPair
          doPreview={<TextInputField label="Registration number" caption="9-digit CRA business number" />}
          doCaption="Captions stay visible in the default state."
          dontPreview={<TextInputField label="Registration number" invalid caption="9-digit CRA business number" />}
          dontCaption="Don't show error styling before the user submits or blurs the field."
        />
      </GuidelineSection>
    </div>
  );
}

const caretSvg = (
  <span className="tds-caret tds-caret--default" aria-hidden="true">
    <svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor" />
      <path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor" />
    </svg>
  </span>
);

function SelectTrigger({ value, placeholder = "Select province" }: { value?: string; placeholder?: string }) {
  return (
    <div className="tds-select" style={{ maxWidth: 320 }}>
      <label className="tds-field-label">Province</label>
      <div className="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
        <span className={`tds-select__value${value ? "" : " tds-select__placeholder"}`}>
          {value ?? placeholder}
        </span>
        <div className="tds-select__trailing-group">{caretSvg}</div>
      </div>
    </div>
  );
}

export function SelectGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use Select when options are known upfront"
        lead={
          <p>
            Select triggers open a DropdownPanel menu for choosing one (or many) predefined values
            — country, province, verification package. Use TextInput when the value is free-form.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SelectTrigger value="Ontario" />}
          doCaption="Selected value replaces placeholder text in .tds-select__value."
          dontPreview={<TextInputField label="Province" value="Ontario" />}
          dontCaption="Don't use a text field when users must pick from a fixed list."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Match trigger size to surrounding fields"
        lead={
          <p>
            Align Select height with adjacent TextInputs in the same form row — typically{" "}
            <code>--lg</code> (40px) for primary KYB forms and <code>--md</code> for compact filters.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SelectTrigger />}
          doCaption="Large triggers pair with large text inputs in entity detail forms."
          dontPreview={
            <div className="tds-select" style={{ maxWidth: 320 }}>
              <label className="tds-field-label">Province</label>
              <div className="tds-select__trigger tds-select__trigger--sm" role="combobox" aria-expanded="false">
                <span className="tds-select__value tds-select__placeholder">Select</span>
                <div className="tds-select__trailing-group">{caretSvg}</div>
              </div>
            </div>
          }
          dontCaption="Don't use sm triggers in full-width form layouts unless space is constrained."
        />
      </GuidelineSection>
    </div>
  );
}

function DatePickerField({ value, placeholder = "mm/dd/yyyy" }: { value?: string; placeholder?: string }) {
  const calendarIcon = (
    <span className="tds-date-picker__icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    </span>
  );
  return (
    <div className="tds-date-picker" style={{ maxWidth: 240 }}>
      <label className="tds-field-label">Incorporation date</label>
      <button type="button" className="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false">
        {calendarIcon}
        <span className={`tds-date-picker__value${value ? "" : " tds-date-picker__placeholder"}`}>
          {value ?? placeholder}
        </span>
      </button>
    </div>
  );
}

export function DatePickerGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Prefer the calendar over typed dates"
        lead={
          <p>
            Date pickers reduce format errors for incorporation dates, document expiry, and
            reporting ranges. The trigger opens a calendar dialog — avoid separate day/month/year
            dropdowns unless required by locale.
          </p>
        }
      >
        <DoDontPair
          doPreview={<DatePickerField value="03/13/2021" />}
          doCaption="Filled state shows the selected date in the trigger."
          dontPreview={<TextInputField label="Incorporation date" placeholder="mm/dd/yyyy" caption="Use MM/DD/YYYY" />}
          dontCaption="Don't rely on typed dates when a calendar picker is available."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Use range pickers for reporting windows"
        lead={
          <p>
            Range mode links start and end fields to one calendar with in-range highlighting. Use
            for audit periods and activity filters.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-date-picker-range" style={{ maxWidth: 480 }}>
              <div className="tds-date-picker-range__fields">
                <DatePickerField value="03/01/2021" />
                <DatePickerField value="03/20/2021" />
              </div>
            </div>
          }
          doCaption="Start and end fields share one calendar popover."
          dontPreview={
            <PreviewRow>
              <DatePickerField />
              <DatePickerField />
            </PreviewRow>
          }
          dontCaption="Don't use two independent pickers without range linkage — selection UX breaks."
        />
      </GuidelineSection>
    </div>
  );
}

export function RadioGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Group radios with a shared name"
        lead={
          <p>
            Radio buttons are mutually exclusive. Every option in a set shares the same{" "}
            <code>name</code> attribute so only one can be selected.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                <input type="radio" name="entity-type-do" className="tds-radio" defaultChecked /> Business
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                <input type="radio" name="entity-type-do" className="tds-radio" /> Individual
              </label>
            </PreviewRow>
          }
          doCaption="Wrap each option in a label for a larger hit target."
          dontPreview={
            <PreviewRow>
              <input type="radio" name="a" className="tds-radio" /> Business{" "}
              <input type="radio" name="b" className="tds-radio" /> Individual
            </PreviewRow>
          }
          dontCaption="Don't use different name values — both options become selectable."
        />
      </GuidelineSection>
    </div>
  );
}

export function RadioGroupGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use stacked groups for 3–5 options with context"
        lead={
          <p>
            Radio groups add optional captions under each label — ideal for verification type
            pickers where users need a sentence of explanation per option.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="card" style={{ maxWidth: 360 }}>
              <div className="tds-radio-group">
                <label className="tds-radio-group__item">
                  <input type="radio" name="rg-do" className="tds-radio" defaultChecked />
                  <div className="tds-radio-group__content">
                    <div className="tds-radio-group__label">Business verification</div>
                    <div className="tds-radio-group__caption">Verify a registered entity</div>
                  </div>
                </label>
                <label className="tds-radio-group__item">
                  <input type="radio" name="rg-do" className="tds-radio" />
                  <div className="tds-radio-group__content">
                    <div className="tds-radio-group__label">Individual verification</div>
                    <div className="tds-radio-group__caption">Verify a single person</div>
                  </div>
                </label>
              </div>
            </div>
          }
          doCaption="Each row is a label wrapping the radio and content stack."
          dontPreview={
            <PreviewRow>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="radio" name="rg-dont" className="tds-radio" /> Business verification — Verify a registered entity
              </label>
            </PreviewRow>
          }
          dontCaption="Don't cram caption copy inline — use .tds-radio-group__caption."
        />
      </GuidelineSection>
    </div>
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

export function RadioCardGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use cards for high-consideration single choices"
        lead={
          <p>
            Radio cards present 2–4 options with icon, title, and description. The entire card is
            clickable — use for plan tiers, verification packages, and onboarding paths.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-radio-card tds-radio-card--selected" style={{ maxWidth: 280 }}>
              <input type="radio" name="plan-do" className="tds-radio" defaultChecked />
              <div className="tds-radio-card__content">
                <div className="tds-radio-card__label-row">
                  <span className="tds-radio-card__icon">{faceIcon}</span>
                  <div className="tds-radio-card__label">Standard KYB</div>
                </div>
                <div className="tds-radio-card__description">Basic entity verification with document checks</div>
              </div>
            </div>
          }
          doCaption="Selected card uses .tds-radio-card--selected with a checked radio inside."
          dontPreview={
            <div className="tds-radio-group" style={{ maxWidth: 280 }}>
              <label className="tds-radio-group__item">
                <input type="radio" name="plan-dont" className="tds-radio" />
                <div className="tds-radio-group__content">
                  <div className="tds-radio-group__label">Standard KYB</div>
                </div>
              </label>
            </div>
          }
          dontCaption="Don't use plain radio rows when options need icons and paragraph descriptions."
        />
      </GuidelineSection>
    </div>
  );
}

const textareaGrip = (
  <span className="tds-textarea__grip" aria-hidden="true">
    <svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 0.5 0.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M4.5 2.5 2.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  </span>
);

function TextareaField({
  label = "Notes",
  placeholder = "Add context for the reviewer…",
  rows = 3,
  invalid = false,
  caption,
}: {
  label?: string;
  placeholder?: string;
  rows?: number;
  invalid?: boolean;
  caption?: string;
}) {
  return (
    <div className={`tds-textarea${invalid ? " tds-textarea--invalid" : ""}`} style={{ maxWidth: 320 }}>
      <label className="tds-field-label">{label}</label>
      <div className="tds-textarea__field">
        <textarea
          className="tds-textarea__native"
          rows={rows}
          placeholder={placeholder}
          aria-invalid={invalid || undefined}
          readOnly
        />
        {textareaGrip}
      </div>
      {invalid && (
        <span className="tds-field-validation tds-field-validation--error">
          Enter at least 20 characters
        </span>
      )}
      {caption && !invalid && <span className="tds-field-caption">{caption}</span>}
    </div>
  );
}

export function TextareaGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use Textarea for multi-line content"
        lead={
          <p>
            Textareas collect longer free-form text — reviewer notes, compliance comments, and
            policy excerpts. Use TextInput when a single line is enough.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <TextareaField
              label="Reviewer notes"
              caption="Visible to internal reviewers only"
            />
          }
          doCaption="Reserve Textarea for content that may span multiple lines."
          dontPreview={
            <TextareaField label="Country code" placeholder="CA" rows={1} />
          }
          dontCaption="Don't use Textarea for short, single-value fields. TextInput is the right fit."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Reuse TextInput label and validation patterns"
        lead={
          <p>
            Textarea shares <code>.tds-field-label</code>, <code>.tds-field-caption</code>, and{" "}
            <code>.tds-field-validation</code> with TextInput. Keep helper text separate from
            error messages and apply <code>.tds-textarea--invalid</code> only after validation fails.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <TextareaField
              label="Sanctions screening notes"
              caption="Summarize findings for the audit trail"
            />
          }
          doCaption="Pair labels with captions in the default state; show errors only when needed."
          dontPreview={<TextareaField label="Sanctions screening notes" invalid caption="Optional" />}
          dontCaption="Don't mix error styling with helper captions before the user submits."
        />
      </GuidelineSection>
    </div>
  );
}
